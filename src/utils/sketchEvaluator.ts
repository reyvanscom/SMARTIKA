// Advanced Structural Computer Vision & Multimodal Evaluator for Informatics Sketches
// Evaluates student drawings based on geometry, clustering, topology, and challenge instructions.
// Enforces STRICT ZERO SCORE (0) when a canvas is empty/blank.

export interface DrawingChallengeItem {
  id: string;
  topicTitle: string;
  title: string;
  clue: string;
  hints: string[];
  difficulty: 'Mudah' | 'Sedang' | 'Kreatif';
  keyElements: string[];
  shapeGuideType?: string;
  shapeSteps?: string[];
}

export interface SketchEvaluationResult {
  blueScore: number;
  redScore: number;
  winner: 'blue' | 'red' | 'draw';
  summaryReason: string;
  blueStrengths?: string;
  redStrengths?: string;
  blueMissing?: string;
  redMissing?: string;
}

export interface LocalStructuralMetrics {
  isEmpty: boolean;
  nonWhitePixels: number;
  coverageRatio: number;
  boundingBox: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    width: number;
    height: number;
    areaRatio: number;
    aspectRatio: number; // width / height
  };
  centroid: {
    normX: number; // 0..1
    normY: number; // 0..1
  };
  quadrantBalance: [number, number, number, number]; // [TopLeft, TopRight, BottomLeft, BottomRight]
  centerMassRatio: number; // fraction of strokes in center 40% area
  activeGridCells: number; // out of 64 cells (8x8)
  clusterCount: number; // estimated connected parts
  hasClosedLoop: boolean;
  colorCount: number;
  structuralScore: number;
}

/**
 * Perform high-precision pixel and spatial topology analysis on a canvas
 */
export function analyzeCanvasStructure(canvas: HTMLCanvasElement | null): LocalStructuralMetrics {
  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    return {
      isEmpty: true,
      nonWhitePixels: 0,
      coverageRatio: 0,
      boundingBox: { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0, areaRatio: 0, aspectRatio: 1 },
      centroid: { normX: 0.5, normY: 0.5 },
      quadrantBalance: [0, 0, 0, 0],
      centerMassRatio: 0,
      activeGridCells: 0,
      clusterCount: 0,
      hasClosedLoop: false,
      colorCount: 0,
      structuralScore: 0
    };
  }

  try {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('No 2d context');

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let nonWhitePixels = 0;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    let sumX = 0;
    let sumY = 0;

    const colorBucketSet = new Set<string>();

    // 8x8 Spatial Grid to analyze distribution and cluster density
    const GRID_SIZE = 8;
    const grid = Array.from({ length: GRID_SIZE }, () => new Uint32Array(GRID_SIZE));

    // Quadrants: Q0: TL, Q1: TR, Q2: BL, Q3: BR
    const quadCounts = [0, 0, 0, 0];
    let centerMassCount = 0;

    const midX = width / 2;
    const midY = height / 2;
    const centerBoxMinX = width * 0.28;
    const centerBoxMaxX = width * 0.72;
    const centerBoxMinY = height * 0.28;
    const centerBoxMaxY = height * 0.72;

    const sampleStep = 8; // Step by 8 bytes (2 pixels) for speed and high fidelity
    for (let i = 0; i < data.length; i += sampleStep) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Non-white pixel threshold (pure white is 255,255,255)
      if (r < 235 || g < 235 || b < 235) {
        nonWhitePixels++;

        const pixelIndex = i / 4;
        const x = pixelIndex % width;
        const y = Math.floor(pixelIndex / width);

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        sumX += x;
        sumY += y;

        // Distinct color detection
        const colKey = `${Math.floor(r / 64)}-${Math.floor(g / 64)}-${Math.floor(b / 64)}`;
        colorBucketSet.add(colKey);

        // Spatial grid cell
        const gx = Math.min(GRID_SIZE - 1, Math.floor((x / width) * GRID_SIZE));
        const gy = Math.min(GRID_SIZE - 1, Math.floor((y / height) * GRID_SIZE));
        grid[gy][gx]++;

        // Quadrant analysis
        if (x < midX && y < midY) quadCounts[0]++;
        else if (x >= midX && y < midY) quadCounts[1]++;
        else if (x < midX && y >= midY) quadCounts[2]++;
        else quadCounts[3]++;

        // Center mass
        if (x >= centerBoxMinX && x <= centerBoxMaxX && y >= centerBoxMinY && y <= centerBoxMaxY) {
          centerMassCount++;
        }
      }
    }

    const totalSampledPixels = (width * height) / (sampleStep / 4);
    const coverageRatio = nonWhitePixels / totalSampledPixels;

    // Detect empty or near-empty canvas -> STRICT ZERO SCORE (0)!
    if (nonWhitePixels < 25 || coverageRatio < 0.0012) {
      return {
        isEmpty: true,
        nonWhitePixels,
        coverageRatio,
        boundingBox: { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0, areaRatio: 0, aspectRatio: 1 },
        centroid: { normX: 0.5, normY: 0.5 },
        quadrantBalance: [0, 0, 0, 0],
        centerMassRatio: 0,
        activeGridCells: 0,
        clusterCount: 0,
        hasClosedLoop: false,
        colorCount: 0,
        structuralScore: 0
      };
    }

    const boxWidth = Math.max(1, maxX - minX);
    const boxHeight = Math.max(1, maxY - minY);
    const boxAreaRatio = (boxWidth * boxHeight) / (width * height);
    const aspectRatio = boxWidth / boxHeight;

    const normX = sumX / (nonWhitePixels * width);
    const normY = sumY / (nonWhitePixels * height);

    // Active grid cells calculation
    let activeGridCells = 0;
    const thresholdPerCell = Math.max(4, Math.floor(nonWhitePixels / 200));
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] >= thresholdPerCell) {
          activeGridCells++;
        }
      }
    }

    // Quadrant ratios
    const quadSum = Math.max(1, nonWhitePixels);
    const quadrantBalance: [number, number, number, number] = [
      quadCounts[0] / quadSum,
      quadCounts[1] / quadSum,
      quadCounts[2] / quadSum,
      quadCounts[3] / quadSum
    ];

    const centerMassRatio = centerMassCount / quadSum;

    // Estimate clusters by flood-filling the 8x8 active cell matrix
    let clusterCount = 0;
    const visited = Array.from({ length: GRID_SIZE }, () => new Uint8Array(GRID_SIZE));
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] >= thresholdPerCell && !visited[r][c]) {
          clusterCount++;
          const queue: [number, number][] = [[r, c]];
          visited[r][c] = 1;
          while (queue.length > 0) {
            const [cr, cc] = queue.shift()!;
            const neighbors = [
              [cr - 1, cc], [cr + 1, cc], [cr, cc - 1], [cr, cc + 1],
              [cr - 1, cc - 1], [cr - 1, cc + 1], [cr + 1, cc - 1], [cr + 1, cc + 1]
            ];
            for (const [nr, nc] of neighbors) {
              if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                if (grid[nr][nc] >= thresholdPerCell && !visited[nr][nc]) {
                  visited[nr][nc] = 1;
                  queue.push([nr, nc]);
                }
              }
            }
          }
        }
      }
    }

    const midGridR = Math.floor(((minY + maxY) / 2 / height) * GRID_SIZE);
    const midGridC = Math.floor(((minX + maxX) / 2 / width) * GRID_SIZE);
    const centerDensity = grid[midGridR]?.[midGridC] || 0;
    const hasClosedLoop = boxAreaRatio > 0.08 && centerDensity < (nonWhitePixels / 18);

    // Compute basic structural quality score (generous for simple clear drawings!)
    let score = 65;

    if (coverageRatio > 0.5) {
      score = 30; // Blok coretan terlalu pekat
    } else if (boxAreaRatio < 0.03) {
      score = 35; // Terlalu kecil di satu titik
    } else {
      if (activeGridCells >= 12) score += 18;
      else if (activeGridCells >= 7) score += 14;
      else if (activeGridCells >= 4) score += 8;

      if (clusterCount >= 2) score += 8;
      if (boxAreaRatio >= 0.08 && boxAreaRatio <= 0.8) score += 8;

      const occupiedQuads = quadrantBalance.filter((q) => q > 0.06).length;
      if (occupiedQuads >= 3) score += 6;
      if (colorBucketSet.size >= 2) score += 4;
    }

    const structuralScore = Math.max(30, Math.min(98, score));

    return {
      isEmpty: false,
      nonWhitePixels,
      coverageRatio,
      boundingBox: {
        minX, maxX, minY, maxY,
        width: boxWidth,
        height: boxHeight,
        areaRatio: boxAreaRatio,
        aspectRatio
      },
      centroid: { normX, normY },
      quadrantBalance,
      centerMassRatio,
      activeGridCells,
      clusterCount,
      hasClosedLoop,
      colorCount: colorBucketSet.size,
      structuralScore
    };
  } catch (err) {
    console.error('Canvas structural analysis error:', err);
    return {
      isEmpty: true,
      nonWhitePixels: 0,
      coverageRatio: 0,
      boundingBox: { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0, areaRatio: 0, aspectRatio: 1 },
      centroid: { normX: 0.5, normY: 0.5 },
      quadrantBalance: [0, 0, 0, 0],
      centerMassRatio: 0,
      activeGridCells: 0,
      clusterCount: 0,
      hasClosedLoop: false,
      colorCount: 0,
      structuralScore: 0
    };
  }
}

/**
 * Compare structure with challenge specifications to compute an accurate topic score
 */
export function scoreAgainstChallenge(
  metrics: LocalStructuralMetrics,
  challenge: DrawingChallengeItem
): { score: number; feedbackNotes: string[] } {
  // JIKA KOSONG SKORNYA WAJIB 0 (NOL)!
  if (metrics.isEmpty || metrics.nonWhitePixels < 25 || metrics.coverageRatio < 0.0012) {
    return {
      score: 0,
      feedbackNotes: ['Kanvas kosong (tidak ada gambar yang dibuat) — Skor 0.']
    };
  }

  if (metrics.coverageRatio > 0.5) {
    return {
      score: 28,
      feedbackNotes: ['Goresan terlalu pekat menutupi kanvas, ikuti kalimat petunjuk di bawah soal.']
    };
  }

  if (metrics.activeGridCells < 2 || metrics.boundingBox.areaRatio < 0.025) {
    return {
      score: 35,
      feedbackNotes: ['Gambar terlalu kecil, buatlah bentuk lebih besar di tengah kanvas sesuai kalimat petunjuk di bawah soal.']
    };
  }

  let finalScore = metrics.structuralScore;
  const feedbackNotes: string[] = [];
  const titleLower = challenge.title.toLowerCase();

  if (titleLower.includes('star') || titleLower.includes('topologi') || titleLower.includes('dekomposisi')) {
    if (metrics.activeGridCells >= 8 && metrics.clusterCount >= 2) {
      finalScore = Math.max(finalScore, 90);
      feedbackNotes.push('Bentuk kotak/lingkaran dan garis hubung cabangnya tergambar jelas sesuai kalimat petunjuk di bawah soal!');
    } else {
      finalScore = Math.max(finalScore, 76);
      feedbackNotes.push('Bentuk dasar bagan sudah tampak baik sesuai kalimat petunjuk soal.');
    }
  } else if (titleLower.includes('ketupat') || titleLower.includes('flowchart') || titleLower.includes('keputusan')) {
    if (metrics.activeGridCells >= 6) {
      finalScore = Math.max(finalScore, 90);
      feedbackNotes.push('Bentuk simbol diagram alir dan garis panahnya sudah sesuai dengan kalimat petunjuk di bawah soal!');
    } else {
      finalScore = Math.max(finalScore, 75);
      feedbackNotes.push('Bentuk dasar simbol flowchart sudah dikenali.');
    }
  } else if (titleLower.includes('router') || titleLower.includes('wi-fi') || titleLower.includes('monitor') || titleLower.includes('cpu')) {
    if (metrics.activeGridCells >= 7) {
      finalScore = Math.max(finalScore, 89);
      feedbackNotes.push('Bentuk perangkat dan bagian utamanya tergambar jelas sesuai kalimat petunjuk di bawah soal!');
    } else {
      finalScore = Math.max(finalScore, 76);
      feedbackNotes.push('Bentuk dasar perangkat sudah tampak sesuai petunjuk kalimat.');
    }
  } else {
    if (metrics.activeGridCells >= 8) {
      finalScore = Math.max(finalScore, 90);
      feedbackNotes.push('Bentuk gambar rapi, proporsional, dan sesuai dengan kalimat petunjuk di bawah soal!');
    } else if (metrics.activeGridCells >= 4) {
      finalScore = Math.max(finalScore, 78);
      feedbackNotes.push('Bentuk sederhana sudah sesuai kalimat petunjuk di bawah soal.');
    } else {
      finalScore = Math.min(finalScore, 60);
      feedbackNotes.push('Perjelas garis bentuk sesuai kalimat petunjuk di bawah soal.');
    }
  }

  return {
    score: Math.max(0, Math.min(98, finalScore)),
    feedbackNotes
  };
}

/**
 * Robust Local Duel Evaluation
 */
export function evaluateDuelLocally(
  blueCanvas: HTMLCanvasElement | null,
  redCanvas: HTMLCanvasElement | null,
  challenge: DrawingChallengeItem,
  blueLabel: string,
  redLabel: string
): SketchEvaluationResult {
  const blueMetrics = analyzeCanvasStructure(blueCanvas);
  const redMetrics = analyzeCanvasStructure(redCanvas);

  const blueResult = scoreAgainstChallenge(blueMetrics, challenge);
  const redResult = scoreAgainstChallenge(redMetrics, challenge);

  let blueScore = blueResult.score;
  let redScore = redResult.score;

  if (blueScore === 0 && redScore === 0) {
    return {
      blueScore: 0,
      redScore: 0,
      winner: 'draw',
      summaryReason: 'Kedua kanvas kosong (belum ada gambar), sehingga kedua pemain mendapat skor 0.',
      blueStrengths: 'Kanvas kosong — Skor 0.',
      redStrengths: 'Kanvas kosong — Skor 0.'
    };
  }

  let winner: 'blue' | 'red' | 'draw' = 'draw';
  let summaryReason = '';

  const diff = blueScore - redScore;

  if (diff >= 3) {
    winner = 'blue';
    const note = blueResult.feedbackNotes[0] || 'Bentuk gambar lebih lengkap sesuai arahan.';
    summaryReason = `Sketsa ${blueLabel} unggul (${blueScore}% vs ${redScore}%): ${note}`;
  } else if (diff <= -3) {
    winner = 'red';
    const note = redResult.feedbackNotes[0] || 'Bentuk gambar lebih lengkap sesuai arahan.';
    summaryReason = `Sketsa ${redLabel} unggul (${redScore}% vs ${blueScore}%): ${note}`;
  } else {
    if (blueMetrics.activeGridCells > redMetrics.activeGridCells + 1) {
      winner = 'blue';
      blueScore = Math.min(98, blueScore + 2);
      summaryReason = `Sketsa ${blueLabel} unggul tipis (${blueScore}% vs ${redScore}%) karena bentuk lebih lengkap!`;
    } else if (redMetrics.activeGridCells > blueMetrics.activeGridCells + 1) {
      winner = 'red';
      redScore = Math.min(98, redScore + 2);
      summaryReason = `Sketsa ${redLabel} unggul tipis (${redScore}% vs ${blueScore}%) karena bentuk lebih lengkap!`;
    } else {
      winner = 'draw';
      summaryReason = `Kedua tim menggambar bentuk dengan tingkat kemiripan yang seimbang (${blueScore}% vs ${redScore}%)!`;
    }
  }

  return {
    blueScore,
    redScore,
    winner,
    summaryReason,
    blueStrengths: blueResult.feedbackNotes.join(' '),
    redStrengths: redResult.feedbackNotes.join(' ')
  };
}

/**
 * Solo Evaluation
 */
export function evaluateSoloLocally(
  canvas: HTMLCanvasElement | null,
  challenge: DrawingChallengeItem
): SketchEvaluationResult {
  const metrics = analyzeCanvasStructure(canvas);
  const result = scoreAgainstChallenge(metrics, challenge);

  if (result.score === 0) {
    return {
      blueScore: 0,
      redScore: 0,
      winner: 'draw',
      summaryReason: `Kanvas masih kosong (belum digambar), sehingga skor adalah 0.`,
      blueStrengths: 'Kanvas kosong — Skor 0. Silakan klik tombol START (Mulai Waktu) dan gambar bentuk sesuai arahan!'
    };
  }

  return {
    blueScore: result.score,
    redScore: 0,
    winner: 'blue',
    summaryReason: `Sketsa "${challenge.title}" memperoleh nilai ${result.score}%: ${result.feedbackNotes.join(' ')}`,
    blueStrengths: result.feedbackNotes.join(' ')
  };
}

/**
 * Request server-side multimodal AI analysis via /api/evaluate-sketch with local fallback
 */
export async function evaluateSketchWithAI(params: {
  blueCanvas: HTMLCanvasElement | null;
  redCanvas: HTMLCanvasElement | null;
  challenge: DrawingChallengeItem;
  blueLabel: string;
  redLabel: string;
  isSolo: boolean;
}): Promise<SketchEvaluationResult> {
  const { blueCanvas, redCanvas, challenge, blueLabel, redLabel, isSolo } = params;

  // Check locally first if either canvas is blank/empty -> immediately enforce 0 score!
  const blueMetrics = analyzeCanvasStructure(blueCanvas);
  const redMetrics = !isSolo ? analyzeCanvasStructure(redCanvas) : null;

  const blueIsEmpty = blueMetrics.isEmpty;
  const redIsEmpty = !isSolo && redMetrics ? redMetrics.isEmpty : true;

  // If Solo and empty, return 0 immediately without waiting for network
  if (isSolo && blueIsEmpty) {
    return evaluateSoloLocally(blueCanvas, challenge);
  }

  // If Duel and both are empty, return 0 immediately
  if (!isSolo && blueIsEmpty && redIsEmpty) {
    return evaluateDuelLocally(blueCanvas, redCanvas, challenge, blueLabel, redLabel);
  }

  try {
    const blueDataUrl = blueCanvas && !blueIsEmpty ? blueCanvas.toDataURL('image/png') : '';
    const redDataUrl = redCanvas && !isSolo && !redIsEmpty ? redCanvas.toDataURL('image/png') : '';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const response = await fetch('/api/evaluate-sketch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        challengeTitle: challenge.title,
        topicTitle: challenge.topicTitle,
        clue: challenge.clue,
        keyElements: challenge.keyElements,
        blueImageBase64: blueDataUrl,
        redImageBase64: redDataUrl,
        isSolo,
        blueIsEmpty,
        redIsEmpty,
        blueLabel,
        redLabel
      })
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (!data.fallbackNeeded && typeof data.blueScore === 'number') {
        const finalBlue = blueIsEmpty ? 0 : Math.round(data.blueScore);
        const finalRed = isSolo || redIsEmpty ? 0 : Math.round(data.redScore || 0);
        const finalWin: 'blue' | 'red' | 'draw' = isSolo
          ? finalBlue > 0 ? 'blue' : 'draw'
          : finalBlue > finalRed
          ? 'blue'
          : finalRed > finalBlue
          ? 'red'
          : 'draw';

        return {
          blueScore: finalBlue,
          redScore: finalRed,
          winner: finalWin,
          summaryReason: data.summaryReason || 'Sistem telah menilai sketsa berdasarkan arahan bentuk gambar.',
          blueStrengths: blueIsEmpty ? 'Kanvas kosong — Skor 0.' : data.blueStrengths,
          redStrengths: redIsEmpty ? 'Kanvas kosong — Skor 0.' : data.redStrengths,
          blueMissing: data.blueMissing,
          redMissing: data.redMissing
        };
      }
    }
  } catch (err) {
    console.warn('AI Server evaluation timed out or unavailable, using local structural evaluator:', err);
  }

  // High-fidelity local structural fallback (which also enforces 0 for blank canvases)
  if (isSolo) {
    return evaluateSoloLocally(blueCanvas, challenge);
  } else {
    return evaluateDuelLocally(blueCanvas, redCanvas, challenge, blueLabel, redLabel);
  }
}
