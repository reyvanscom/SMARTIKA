import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Topic } from '../../types/curriculum';
import { getTopicPblScenario } from '../../data/pblScenariosData';
import { APP_ASSETS } from '../../constants/assets';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { useTeacherProfile } from '../../context/TeacherProfileContext';
import { printHtmlDocument } from '../../utils/printHelper';
import { escapeHtml } from '../../utils/securityHelper';
import confetti from 'canvas-confetti';
import {
  Save,
  Printer,
  RotateCcw,
  CheckCircle2,
  Users,
  User,
  Plus,
  Trash2,
  Key,
  Star,
  Edit3,
  HelpCircle,
  Lightbulb,
  FileText,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Undo2,
  Palette,
  Eraser,
  Pen
} from 'lucide-react';

interface LkpdDigitalInteractiveViewProps {
  topic: Topic;
  onNext: () => void;
  onBackToDashboard: () => void;
  onSwitchToPrint: () => void;
}

interface ObservationRow {
  id: string;
  item: string;
  functionOrDetail: string;
  notes: string;
}

interface PblInteractiveSketchPadProps {
  initialDataUrl?: string;
  onSaveSketch: (dataUrl: string) => void;
}

const PblInteractiveSketchPad: React.FC<PblInteractiveSketchPadProps> = ({
  initialDataUrl,
  onSaveSketch
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState<string>('#0f172a');
  const [isEraser, setIsEraser] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const historyRef = useRef<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(280, Math.floor(rect.width || 340));
    const height = 180;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (initialDataUrl && initialDataUrl.startsWith('data:image')) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        setHasDrawn(true);
        historyRef.current = [ctx.getImageData(0, 0, width, height)];
      };
      img.src = initialDataUrl;
    } else {
      historyRef.current = [ctx.getImageData(0, 0, width, height)];
    }
  }, []);

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = isEraser ? '#ffffff' : penColor;
    ctx.lineWidth = isEraser ? 16 : 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const moveDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
      const ctx = canvas.getContext('2d');
      if (ctx) {
        historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        if (historyRef.current.length > 20) historyRef.current.shift();
      }
      onSaveSketch(canvas.toDataURL('image/png'));
    }
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
    setHasDrawn(false);
    onSaveSketch('');
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || historyRef.current.length <= 1) return;
    historyRef.current.pop();
    const prev = historyRef.current[historyRef.current.length - 1];
    if (prev) {
      ctx.putImageData(prev, 0, 0);
      onSaveSketch(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="space-y-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/60 p-2 select-none">
      <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
        <div className="flex items-center gap-1">
          <span className="font-bold text-slate-700 dark:text-slate-300 text-[10px] uppercase">Warna:</span>
          {[
            { c: '#0f172a', label: 'Hitam' },
            { c: '#0284c7', label: 'Biru' },
            { c: '#dc2626', label: 'Merah' },
            { c: '#16a34a', label: 'Hijau' }
          ].map((item) => (
            <button
              key={item.c}
              type="button"
              onClick={() => {
                setIsEraser(false);
                setPenColor(item.c);
              }}
              style={{ backgroundColor: item.c }}
              className={`w-5 h-5 rounded-full border transition-transform ${
                !isEraser && penColor === item.c
                  ? 'ring-2 ring-teal-500 scale-110 border-white'
                  : 'border-slate-400 opacity-80'
              }`}
              title={item.label}
            />
          ))}
          <button
            type="button"
            onClick={() => setIsEraser((prev) => !prev)}
            className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 ${
              isEraser
                ? 'bg-amber-500 text-slate-950 border-amber-600 ring-1 ring-amber-400'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
            }`}
          >
            <Eraser className="w-3 h-3" />
            <span>Hapus</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={historyRef.current.length <= 1}
            onClick={handleUndo}
            className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 text-[10px] font-bold flex items-center gap-1 disabled:opacity-40"
            title="Undo goresan"
          >
            <Undo2 className="w-3 h-3" />
            <span>Undo</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-[10px] font-bold flex items-center gap-1"
            title="Bersihkan kanvas"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full h-[180px] rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600 bg-white relative cursor-crosshair shadow-inner"
        style={{ touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={startDraw}
          onPointerMove={moveDraw}
          onPointerUp={endDraw}
          onPointerCancel={endDraw}
          className="w-full h-full block touch-none"
        />
        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-400 text-xs italic">
            ✏️ Area Sketsa / Bagan Alur (Goreskan stylus, jari sentuh, atau mouse di sini)
          </div>
        )}
      </div>
    </div>
  );
};

export const LkpdDigitalInteractiveView: React.FC<LkpdDigitalInteractiveViewProps> = ({
  topic,
  onNext,
  onBackToDashboard,
  onSwitchToPrint
}) => {
  const { playClick, playSuccess } = useTheme();
  const { isTeacher } = useUserRole();
  const { teacherProfile, isCustomized } = useTeacherProfile();

  const storageKey = `spenmakro_lkpd_digital_${topic.id}`;
  const pblScenario = useMemo(() => getTopicPblScenario(topic.id, topic.title, topic.grade, topic.category), [topic]);

  // Identitas Pengerjaan
  const [workMode, setWorkMode] = useState<'kelompok' | 'individu'>('kelompok');
  const [groupName, setGroupName] = useState<string>('Kelompok 1');
  const [studentName, setStudentName] = useState<string>('');
  const [className, setClassName] = useState<string>(`Kelas ${topic.grade}`);
  const [date, setDate] = useState<string>(() => {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  const [members, setMembers] = useState<string[]>([
    '1. ',
    '2. ',
    '3. ',
    '4. ',
    '5. ',
    '6. '
  ]);

  // Aktivitas 1: Konsep Utama (Map concept id -> text)
  const [conceptAnswers, setConceptAnswers] = useState<Record<string, string>>({});

  // Aktivitas 2: Tabel Observasi & Pengamatan Nyata
  const [observationRows, setObservationRows] = useState<ObservationRow[]>(() => {
    return (topic.materi.keyConcepts.slice(0, 3) || []).map((kc, idx) => ({
      id: `obs-${idx}`,
      item: kc.title,
      functionOrDetail: '',
      notes: ''
    }));
  });

  // Aktivitas 3: Kasus PBL Kelompok (Sesuai LKPD Cetak Tahap 1 s.d. 4)
  const [pblAnswers, setPblAnswers] = useState({
    problemIdentification: '',
    rootCauses: '',
    solutionSteps: '',
    flowchartOrSketch: '',
    sketchDataUrl: '',
    finalConclusion: ''
  });

  // Aktivitas 4: Latihan Soal Uraian / Esai
  const essayQuestions = useMemo(() => {
    return [
      ...(topic.apersepsi.triggerQuestions.slice(0, 2).map((q, idx) => ({
        id: `essay-trig-${idx}`,
        no: idx + 1,
        question: q,
        hint: 'Hubungkan dengan contoh nyata di lingkungan sekolah atau rumah.',
        answerKey:
          idx === 0
            ? `Konsep ${topic.materi.keyConcepts[0]?.title || topic.title}: ${topic.materi.keyConcepts[0]?.explanation || ''}`
            : `Langkah penerapan praktis: ${topic.materi.keyConcepts[1]?.explanation || ''}`
      }))),
      ...(topic.materi.formativeCheck.slice(0, 1).map((fc, idx) => ({
        id: `essay-form-${idx}`,
        no: 3 + idx,
        question: `${fc.question} Jelaskan alasan dan argumenmu secara runtut!`,
        hint: 'Tinjau kembali ringkasan materi pembelajaran yang telah dibaca.',
        answerKey: `${fc.options[fc.answerIndex]}. Pembahasan: ${fc.explanation}`
      }))),
      ...(topic.kuis.slice(0, 2).map((kq, idx) => {
        const correctOpt = kq.options.find((o) => o.label === kq.correctAnswer);
        return {
          id: `essay-kuis-${idx}`,
          no: 4 + idx,
          question: `${kq.question.replace(/\.\.\.$/, '?')} Jelaskan mengapa hal ini sangat penting dalam Informatika!`,
          hint: `Tingkat Bernalar: ${kq.competencyLevel}`,
          answerKey: `${correctOpt ? correctOpt.text : ''}. Pembahasan: ${kq.explanation}`
        };
      }))
    ];
  }, [topic]);

  const [essayAnswers, setEssayAnswers] = useState<Record<string, string>>({});

  // Refleksi Diri
  const [reflectionStars, setReflectionStars] = useState<number>(5);
  const [reflectionUnderstood, setReflectionUnderstood] = useState<string>('');
  const [reflectionNeedsWork, setReflectionNeedsWork] = useState<string>('');

  // Status & UI States
  const [showAnswerKeys, setShowAnswerKeys] = useState<boolean>(() => isTeacher);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isCompletedSubmitted, setIsCompletedSubmitted] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Sync answer keys visibility whenever teacher mode is active
  useEffect(() => {
    if (isTeacher) {
      setShowAnswerKeys(true);
    }
  }, [isTeacher]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.workMode) setWorkMode(data.workMode);
        if (data.groupName) setGroupName(data.groupName);
        if (data.studentName) setStudentName(data.studentName);
        if (data.className) setClassName(data.className);
        if (data.date) setDate(data.date);
        if (Array.isArray(data.members)) setMembers(data.members);
        if (data.conceptAnswers) setConceptAnswers(data.conceptAnswers);
        if (data.pblAnswers) {
          setPblAnswers({
            problemIdentification: data.pblAnswers.problemIdentification || '',
            rootCauses: data.pblAnswers.rootCauses || '',
            solutionSteps: data.pblAnswers.solutionSteps || '',
            flowchartOrSketch: data.pblAnswers.flowchartOrSketch || data.pblAnswers.finalConclusion || '',
            sketchDataUrl: data.pblAnswers.sketchDataUrl || '',
            finalConclusion: data.pblAnswers.finalConclusion || ''
          });
        }
        if (typeof data.reflectionStars === 'number') setReflectionStars(data.reflectionStars);
        if (data.reflectionUnderstood) setReflectionUnderstood(data.reflectionUnderstood);
        if (data.reflectionNeedsWork) setReflectionNeedsWork(data.reflectionNeedsWork);
        if (data.isCompletedSubmitted) setIsCompletedSubmitted(data.isCompletedSubmitted);
        if (data.lastSavedTime) setLastSavedTime(data.lastSavedTime);
      }
    } catch (e) {
      console.warn('Gagal memuat draft LKPD:', e);
    }
  }, [storageKey]);

  // Auto-save to localStorage whenever values change
  const saveToStorage = () => {
    try {
      const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const payload = {
        workMode,
        groupName,
        studentName,
        className,
        date,
        members,
        conceptAnswers,
        observationRows,
        pblAnswers,
        essayAnswers,
        reflectionStars,
        reflectionUnderstood,
        reflectionNeedsWork,
        isCompletedSubmitted,
        lastSavedTime: nowStr
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
      setLastSavedTime(nowStr);
    } catch (e) {
      console.warn('Gagal auto-save LKPD:', e);
    }
  };

  // Debounced auto-save
  useEffect(() => {
    const handler = setTimeout(() => {
      saveToStorage();
    }, 700);
    return () => clearTimeout(handler);
  }, [
    workMode,
    groupName,
    studentName,
    className,
    date,
    members,
    conceptAnswers,
    observationRows,
    pblAnswers,
    essayAnswers,
    reflectionStars,
    reflectionUnderstood,
    reflectionNeedsWork,
    isCompletedSubmitted
  ]);

  // Calculate Completion Progress
  const progressStats = useMemo(() => {
    let totalFields = 0;
    let filledFields = 0;

    // Concepts
    topic.materi.keyConcepts.forEach((kc) => {
      totalFields++;
      if (conceptAnswers[kc.title]?.trim()) filledFields++;
    });

    // Observations
    observationRows.forEach((row) => {
      totalFields += 2;
      if (row.functionOrDetail?.trim()) filledFields++;
      if (row.notes?.trim()) filledFields++;
    });

    // PBL (Tahap 1 s.d. 4)
    totalFields += 4;
    if (pblAnswers.problemIdentification?.trim()) filledFields++;
    if (pblAnswers.rootCauses?.trim()) filledFields++;
    if (pblAnswers.solutionSteps?.trim()) filledFields++;
    if (pblAnswers.flowchartOrSketch?.trim() || pblAnswers.sketchDataUrl || pblAnswers.finalConclusion?.trim()) filledFields++;

    // Essay
    essayQuestions.forEach((eq) => {
      totalFields++;
      if (essayAnswers[eq.id]?.trim()) filledFields++;
    });

    // Reflection
    totalFields += 2;
    if (reflectionUnderstood?.trim()) filledFields++;
    if (reflectionNeedsWork?.trim()) filledFields++;

    const percent = Math.min(100, Math.round((filledFields / Math.max(1, totalFields)) * 100));
    return { totalFields, filledFields, percent };
  }, [topic, conceptAnswers, observationRows, pblAnswers, essayQuestions, essayAnswers, reflectionUnderstood, reflectionNeedsWork]);

  // Handlers for dynamic members
  const updateMember = (index: number, val: string) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  // Handlers for Observations
  const updateObservationRow = (id: string, field: 'item' | 'functionOrDetail' | 'notes', val: string) => {
    setObservationRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const addObservationRow = () => {
    playClick();
    setObservationRows((prev) => [
      ...prev,
      {
        id: `obs-custom-${Date.now()}`,
        item: '',
        functionOrDetail: '',
        notes: ''
      }
    ]);
  };

  const removeObservationRow = (id: string) => {
    playClick();
    setObservationRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Handle Complete Submission
  const handleSubmitLkpd = () => {
    playSuccess();
    setIsCompletedSubmitted(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    saveToStorage();
  };

  // Handle Reset Form
  const handleConfirmReset = () => {
    playClick();
    setConceptAnswers({});
    setObservationRows(
      (topic.materi.keyConcepts.slice(0, 3) || []).map((kc, idx) => ({
        id: `obs-${idx}`,
        item: kc.title,
        functionOrDetail: '',
        notes: ''
      }))
    );
    setPblAnswers({
      problemIdentification: '',
      rootCauses: '',
      solutionSteps: '',
      flowchartOrSketch: '',
      sketchDataUrl: '',
      finalConclusion: ''
    });
    setEssayAnswers({});
    setReflectionUnderstood('');
    setReflectionNeedsWork('');
    setIsCompletedSubmitted(false);
    setShowResetConfirm(false);
    localStorage.removeItem(storageKey);
    setLastSavedTime(null);
  };

  // Khusus Mode Guru: Isi Otomatis Contoh Jawaban Ideal ke Semua Aktivitas
  const handleFillAllModelAnswers = () => {
    playSuccess();

    // 1. Konsep Utama
    const filledConcepts: Record<string, string> = {};
    topic.materi.keyConcepts.forEach((kc, idx) => {
      const eg =
        topic.materi.dailyLifeExamples[idx] ||
        topic.materi.schoolExamples[idx] ||
        kc.bulletPoints[0] ||
        'Diterapkan secara kontekstual dalam sistem teknologi informasi.';
      filledConcepts[kc.title] = `${kc.explanation}\nContoh penerapan nyata: ${eg}`;
    });
    setConceptAnswers(filledConcepts);

    // 2. Baris Observasi
    if (topic.materi.comparisonTable && topic.materi.comparisonTable.rows.length > 0) {
      setObservationRows(
        topic.materi.comparisonTable.rows.map((row, idx) => ({
          id: `obs-model-${idx}`,
          item: row[0] || `Komponen ${idx + 1}`,
          functionOrDetail: row[1] || 'Fungsi utama dalam pemrosesan sistem.',
          notes: row[2] || 'Sangat berpengaruh terhadap efisiensi kinerja dan keamanan.'
        }))
      );
    } else {
      setObservationRows(
        topic.materi.keyConcepts.map((kc, idx) => ({
          id: `obs-model-${idx}`,
          item: kc.title,
          functionOrDetail: kc.explanation,
          notes:
            topic.materi.dailyLifeExamples[idx] ||
            kc.bulletPoints[0] ||
            'Mendukung keteraturan data dan mempermudah operasional sehari-hari.'
        }))
      );
    }

    // 3. Kasus PBL
    const pblRootCauses = pblScenario.potentialCauses.filter((c) => c.isRootCause);
    setPblAnswers({
      problemIdentification: `Kasus "${pblScenario.headline}": Terjadi kendala utama terkait ${pblScenario.drivingQuestion}`,
      rootCauses: pblRootCauses.map((rc, i) => `${i + 1}. ${rc.text} (${rc.explanation})`).join('\n'),
      solutionSteps:
        `Rencana Karya & Produk Solusi (${pblScenario.deliverableName}):\n` +
        pblScenario.recommendedActions.map((ra, i) => `${i + 1}. ${ra.title} (${ra.category}): ${ra.desc}`).join('\n'),
      flowchartOrSketch: `Bagan Alur Solusi ${pblScenario.deliverableName}:\n1. Identifikasi input data dan variabel masalah di ${pblScenario.location}.\n2. Pemodelan logika pemecahan masalah dan pembuatan flowchart alur kerja.\n3. Implementasi solusi menggunakan prinsip berpikir komputasional.\n4. Pengujian dan validasi hasil karya bersama guru dan rekan kelas.`,
      sketchDataUrl: '',
      finalConclusion: `Solusi pembuatan ${pblScenario.deliverableName} berhasil mengatasi kendala di ${pblScenario.location} secara efektif dengan menerapkan cara berpikir komputasional.`
    });

    // 4. Soal Esai
    const filledEssays: Record<string, string> = {};
    essayQuestions.forEach((eq) => {
      filledEssays[eq.id] = eq.answerKey;
    });
    setEssayAnswers(filledEssays);

    // 5. Refleksi
    setReflectionStars(5);
    setReflectionUnderstood(
      `Memahami seluruh konsep inti pada materi ${topic.title} serta dapat menerapkannya dalam analisis dan pemecahan kasus nyata.`
    );
    setReflectionNeedsWork(
      `Konsisten memperluas wawasan inovasi digital dan berkolaborasi dalam proyek informatika sekolah.`
    );
  };

  // Generate Printable HTML of Completed Digital LKPD
  const handlePrintFilledDocument = async () => {
    playClick();
    setIsExporting(true);

    try {
      const identityHtml =
        workMode === 'kelompok'
          ? `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 9pt; margin-bottom: 12px; border: 1.5px solid #0f766e; padding: 10px; border-radius: 6px; background: #f0fdfa;">
            <div>
              <strong>Nama Kelompok:</strong> ${escapeHtml(groupName || 'Kelompok')}<br/>
              <strong>Kelas:</strong> ${escapeHtml(className)}<br/>
              <strong>Tanggal:</strong> ${escapeHtml(date)}
            </div>
            <div>
              <strong>Anggota Kelompok:</strong>
              <div style="margin-top: 3px; font-size: 8.5pt;">
                ${members
                  .filter((m) => m.replace(/^\d+\.\s*/, '').trim() !== '')
                  .map((m) => `<div>${escapeHtml(m)}</div>`)
                  .join('') || '<em>Belum diisi</em>'}
              </div>
            </div>
          </div>
        `
          : `
          <div style="font-size: 9.5pt; margin-bottom: 12px; border: 1.5px solid #0f766e; padding: 10px; border-radius: 6px; background: #f0fdfa;">
            <strong>Nama Peserta Didik:</strong> ${escapeHtml(studentName || 'Peserta Didik')}<br/>
            <strong>Kelas:</strong> ${escapeHtml(className)} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Tanggal:</strong> ${escapeHtml(date)}
          </div>
        `;

      // Concepts HTML
      const conceptsHtml = topic.materi.keyConcepts
        .map((kc, idx) => {
          const ans = conceptAnswers[kc.title]?.trim() || '<em>(Tidak ada jawaban)</em>';
          return `
          <div style="margin-bottom: 10px; border-left: 3px solid #0d9488; padding-left: 8px;">
            <div style="font-weight: bold; font-size: 9.5pt; color: #134e4a;">
              ${idx + 1}. ${escapeHtml(kc.title)}
            </div>
            <div style="font-size: 8pt; color: #64748b; margin-bottom: 4px;">
              ${escapeHtml(kc.explanation)}
            </div>
            <div style="font-size: 9pt; background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 4px; white-space: pre-wrap; color: #0f172a;">
              <strong>Uraian Pemahaman:</strong><br/>
              ${escapeHtml(ans)}
            </div>
          </div>
        `;
        })
        .join('');

      // Observation rows HTML
      const obsHtml = observationRows
        .map(
          (r, idx) => `
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; font-weight: bold;">${idx + 1}</td>
          <td style="border: 1px solid #cbd5e1; padding: 6px; font-weight: bold; color: #0f766e;">${escapeHtml(r.item || '-')}</td>
          <td style="border: 1px solid #cbd5e1; padding: 6px; white-space: pre-wrap;">${escapeHtml(r.functionOrDetail || '-')}</td>
          <td style="border: 1px solid #cbd5e1; padding: 6px; white-space: pre-wrap;">${escapeHtml(r.notes || '-')}</td>
        </tr>
      `
        )
        .join('');

      // Essay HTML
      const essayHtml = essayQuestions
        .map((eq) => {
          const ans = essayAnswers[eq.id]?.trim() || '<em>(Belum dijawab)</em>';
          return `
          <div style="margin-bottom: 12px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 8px;">
            <div style="font-weight: bold; font-size: 9.5pt; color: #1e293b;">
              Soal ${eq.no}: ${escapeHtml(eq.question)}
            </div>
            <div style="font-size: 9pt; background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 10px; border-radius: 4px; margin-top: 4px; white-space: pre-wrap;">
              <strong>Jawaban:</strong><br/>
              ${escapeHtml(ans)}
            </div>
          </div>
        `;
        })
        .join('');

      const fullHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8"/>
  <title>LKPD Digital Terisi - ${escapeHtml(topic.title)}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 15mm 18mm 15mm; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 9.5pt; line-height: 1.4; color: #0f172a; margin: 0; padding: 0; }
    .kop-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; border-bottom: 2.5px solid #000; padding-bottom: 6px; }
    .kop-logo { width: 65px; height: 65px; object-fit: contain; }
    .kop-text { text-align: center; }
    .kop-text h2 { margin: 0; font-size: 13pt; font-weight: 800; letter-spacing: 0.5px; }
    .kop-text h3 { margin: 1px 0; font-size: 11pt; font-weight: 700; color: #0d9488; }
    .kop-text p { margin: 0; font-size: 8pt; color: #475569; }
    .doc-title { text-align: center; margin: 10px 0 12px; }
    .doc-title h1 { margin: 0; font-size: 12pt; font-weight: 800; text-transform: uppercase; color: #0f766e; }
    .doc-title p { margin: 2px 0 0; font-size: 9pt; color: #64748b; }
    .section-title { background: #0f766e; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 9.5pt; margin: 14px 0 8px; text-transform: uppercase; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 9pt; }
    th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 6px; font-weight: bold; text-align: left; }
    .signature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; page-break-inside: avoid; text-align: center; font-size: 9pt; }
  </style>
</head>
<body>
  <table class="kop-table">
    <tr>
      <td style="width: 75px; vertical-align: middle; text-align: center;">
        <img src="${APP_ASSETS.logo}" class="kop-logo" alt="Logo SMPN 5 Kroya"/>
      </td>
      <td class="kop-text">
        <h2>PEMERINTAH KABUPATEN CILACAP</h2>
        <h3>SMP NEGERI 5 KROYA</h3>
        <p>Jl. Lettu Supartno No. 22 Kroya Cilacap | Media Pembelajaran Interaktif Informatika</p>
      </td>
      <td style="width: 75px; vertical-align: middle; text-align: center;">
        <span style="display: inline-block; padding: 4px 6px; border: 1.5px solid #0d9488; border-radius: 6px; font-size: 7.5pt; font-weight: bold; color: #0d9488; text-transform: uppercase;">
          KURIKULUM<br/>MERDEKA
        </span>
      </td>
    </tr>
  </table>

  <div class="doc-title">
    <h1>LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL</h1>
    <p>Topik: <strong>${escapeHtml(topic.title)}</strong> (Kelas ${topic.grade} — Fase D)</p>
  </div>

  ${identityHtml}

  <!-- AKTIVITAS 1 -->
  <div class="section-title">Aktivitas 1 — Pemahaman Konsep Utama</div>
  ${conceptsHtml}

  <!-- AKTIVITAS 2 -->
  <div class="section-title">Aktivitas 2 — Tabel Observasi &amp; Pengamatan Nyata</div>
  <table>
    <thead>
      <tr>
        <th style="width: 35px; text-align: center;">No</th>
        <th style="width: 25%;">Komponen / Kasus</th>
        <th style="width: 35%;">Fungsi / Temuan Nyata</th>
        <th>Hasil Analisis / Manfaat</th>
      </tr>
    </thead>
    <tbody>
      ${obsHtml}
    </tbody>
  </table>

  <!-- AKTIVITAS 3 — PEMECAHAN KASUS NYATA & DISKUSI KELOMPOK (PBL TAHAP 1 S.D. 4) -->
  <div class="section-title">Aktivitas 3 — Pemecahan Kasus Nyata &amp; Diskusi Kelompok (PBL Tahap 1 s.d. 4)</div>
  <div style="background: #fff1f2; border: 1.5px solid #fda4af; padding: 8px 12px; border-radius: 4px; margin-bottom: 8px; font-size: 8.8pt; line-height: 1.42;">
    <div style="font-weight: 800; font-size: 9.5pt; color: #9f1239; margin-bottom: 3px;">
      KASUS LAPANGAN: ${escapeHtml(pblScenario.headline)} (${escapeHtml(pblScenario.location)})
    </div>
    <p style="margin: 0 0 4px; color: #0f172a;">
      ${escapeHtml(pblScenario.contextStory)}
    </p>
    <div style="font-weight: 800; color: #881337; margin-bottom: 3px;">
      Pertanyaan Utama Masalah: "${escapeHtml(pblScenario.drivingQuestion)}"
    </div>
  </div>
  <table>
    <tr>
      <td style="width: 32%; font-weight: bold; border: 1px solid #cbd5e1; padding: 7px; background: #f8fafc; vertical-align: top;">
        1. Identifikasi Masalah Utama<br/>
        <span style="font-weight: normal; font-size: 8pt; color: #475569;">
          Apa masalah utama yang terjadi pada kasus di atas dan siapa saja pihak yang terdampak?
        </span>
      </td>
      <td style="border: 1px solid #cbd5e1; padding: 7px; vertical-align: top;">
        ${escapeHtml(pblAnswers.problemIdentification || '-')}
      </td>
    </tr>
    <tr>
      <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 7px; background: #f8fafc; vertical-align: top;">
        2. Analisis Akar Penyebab<br/>
        <span style="font-weight: normal; font-size: 8pt; color: #475569;">
          Mengapa masalah tersebut bisa terjadi? Sebutkan dan jelaskan minimal 2 penyebab utamanya!
        </span>
      </td>
      <td style="border: 1px solid #cbd5e1; padding: 7px; vertical-align: top;">
        ${escapeHtml(pblAnswers.rootCauses || '-')}
      </td>
    </tr>
    <tr>
      <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 7px; background: #f8fafc; vertical-align: top;">
        3. Solusi &amp; Langkah Nyata Kelompok<br/>
        <span style="font-weight: normal; font-size: 8pt; color: #475569;">
          Tuliskan langkah-langkah solusi kelompokmu untuk membuat karya: <strong>${escapeHtml(pblScenario.deliverableName)}</strong>
        </span>
      </td>
      <td style="border: 1px solid #cbd5e1; padding: 7px; vertical-align: top;">
        ${escapeHtml(pblAnswers.solutionSteps || '-')}
      </td>
    </tr>
    <tr>
      <td style="font-weight: bold; border: 1px solid #cbd5e1; padding: 7px; background: #f8fafc; vertical-align: top;">
        4. Kotak Sketsa / Bagan Alur Solusi / Poster Mini<br/>
        <span style="font-weight: normal; font-size: 8pt; color: #475569;">
          Gambarkan bagan alur langkah penyelesaian, tabel rumus, atau poster slogan solusi kelompokmu!
        </span>
      </td>
      <td style="border: 1px solid #cbd5e1; padding: 7px; vertical-align: top;">
        ${pblAnswers.sketchDataUrl ? `<div style="margin-bottom: 6px;"><img src="${pblAnswers.sketchDataUrl}" style="max-width: 100%; max-height: 200px; border: 1px dashed #94a3b8; border-radius: 4px; display: block;" alt="Sketsa Solusi"/></div>` : ''}
        <div>${escapeHtml(pblAnswers.flowchartOrSketch || pblAnswers.finalConclusion || '-')}</div>
      </td>
    </tr>
  </table>

  <!-- AKTIVITAS 4 -->
  <div class="section-title">Aktivitas 4 — Latihan Soal Uraian / Esai</div>
  ${essayHtml}

  <!-- REFLEKSI -->
  <div class="section-title">Refleksi Belajar &amp; Pengesahan</div>
  <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px; font-size: 9pt; background: #fffbeb;">
    <div><strong>Kepuasan Pemahaman Belajar:</strong> ${reflectionStars} dari 5 Bintang</div>
    <div style="margin-top: 4px;"><strong>Hal yang paling dipahami:</strong> ${escapeHtml(reflectionUnderstood || '-')}</div>
    <div style="margin-top: 4px;"><strong>Hal yang perlu dipelajari lagi:</strong> ${escapeHtml(reflectionNeedsWork || '-')}</div>
  </div>

  <div class="signature-grid">
    <div>
      <p style="margin-bottom: 45px;">
        Kroya, ${escapeHtml(date)}<br/>
        <strong>Ketua / Perwakilan Pengisi:</strong>
      </p>
      <p style="text-decoration: underline; font-weight: bold; margin: 0;">
        ( ${escapeHtml(workMode === 'kelompok' ? groupName : studentName || 'Peserta Didik')} )
      </p>
      <span style="font-size: 8pt; color: #64748b;">Peserta Didik SMP Negeri 5 Kroya</span>
    </div>
    <div>
      <p style="margin-bottom: 45px;">
        Mengetahui,<br/>
        <strong>Guru Mata Pelajaran Informatika:</strong>
      </p>
      <p style="text-decoration: underline; font-weight: bold; margin: 0;">
        ${escapeHtml(teacherProfile.teacherName)}
      </p>
      <span style="font-size: 8pt; color: #64748b;">NIP. ${escapeHtml(teacherProfile.teacherNIP)}</span>
    </div>
  </div>
</body>
</html>`;

      await printHtmlDocument({
        title: `LKPD-Digital-Terisi-Kelas${topic.grade}-${topic.id.toUpperCase()}`,
        contentHtml: fullHtml,
        landscape: false
      });
    } catch (e) {
      console.error('Error exporting filled LKPD:', e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* ========================================================================= */}
      {/* 1. HEADER UTAMA DENGAN INDIKATOR PROGRES & TOMBOL AKSI                   */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 select-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 text-[10px] font-black uppercase tracking-wider">
                  Mode Digital Interaktif
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                  Kelas {topic.grade} SMPN 5 Kroya
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
                LKPD Digital: {topic.title}
              </h1>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onSwitchToPrint}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 border border-slate-300 dark:border-slate-700"
              title="Beralih ke format siap cetak manual kertas A4"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Buka Versi Cetak A4</span>
            </button>

            <button
              type="button"
              onClick={handlePrintFilledDocument}
              disabled={isExporting}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Cetak atau simpan LKPD yang telah kamu ketik ke PDF resmi"
            >
              <Printer className="w-4 h-4" />
              <span>{isExporting ? 'Menyiapkan...' : 'Cetak / Unduh Jawaban'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-400 hover:text-rose-600 border border-slate-200 dark:border-slate-700 cursor-pointer"
              title="Bersihkan seluruh form LKPD"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Status Auto-save */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-200">
                Kemajuan Pengisian:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-teal-500 text-white font-mono text-[11px] font-black">
                {progressStats.percent}% Selesai
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                ({progressStats.filledFields} dari {progressStats.totalFields} bagian terisi)
              </span>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {lastSavedTime ? `Tersimpan otomatis pk ${lastSavedTime}` : 'Otomatis tersimpan'}
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${progressStats.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-slate-900 dark:text-white">
                Bersihkan Semua Jawaban?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tindakan ini akan mengosongkan seluruh teks isian LKPD yang sudah kamu ketik di aplikasi ini.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-1.5 rounded-xl text-xs font-black bg-rose-600 text-white hover:bg-rose-500 shadow-md"
              >
                Ya, Bersihkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BANNER KHUSUS MODE GURU: KUNCI JAWABAN & PEDOMAN PENSKORAN               */}
      {/* ========================================================================= */}
      {isTeacher && (
        <div className="p-4 sm:p-5 rounded-3xl bg-linear-to-r from-amber-500/15 via-amber-500/10 to-emerald-500/15 border-2 border-amber-500/50 shadow-lg space-y-3.5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black shadow-md shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                    👑 Mode Guru Aktif
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[11px] font-black border border-amber-500/30">
                    {showAnswerKeys ? 'Kunci Jawaban Ditampilkan' : 'Kunci Jawaban Disembunyikan'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                  Kunci jawaban ideal, kisi-kisi pemahaman konsep, dan pedoman penskoran kini aktif pada setiap aktivitas di versi aplikasi ini.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setShowAnswerKeys((prev) => !prev);
                }}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                  showAnswerKeys
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>{showAnswerKeys ? 'Sembunyikan Kunci' : 'Tampilkan Kunci'}</span>
              </button>

              <button
                type="button"
                onClick={handleFillAllModelAnswers}
                className="px-4 py-2 rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                title="Isi seluruh form LKPD dengan contoh jawaban ideal untuk demonstrasi atau review guru"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Isi Otomatis Jawaban Ideal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FORM IDENTITAS PENGERJAAN (INDIVIDU / KELOMPOK)                        */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              Identitas Pengerjaan LKPD
            </h2>
          </div>

          {/* Mode Switcher: Kelompok vs Individu */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                playClick();
                setWorkMode('kelompok');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                workMode === 'kelompok'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Mode Kelompok
            </button>
            <button
              type="button"
              onClick={() => {
                playClick();
                setWorkMode('individu');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                workMode === 'individu'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Mode Individu
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {workMode === 'kelompok' ? (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Nama / Nomor Kelompok:
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Contoh: Kelompok 1 (Cyber Guard)"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-teal-500"
              />
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Nama Lengkap Siswa:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Tuliskan nama lengkapmu..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-teal-500"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Kelas:
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Contoh: 7A / 8B / 9C"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-teal-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
              Tanggal Pengerjaan:
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-teal-500"
            />
          </div>
        </div>

        {/* Input Anggota Kelompok 1 - 6 jika mode kelompok */}
        {workMode === 'kelompok' && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
              Daftar Anggota Kelompok (Maksimal 6 Siswa):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {members.map((m, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono font-bold text-slate-400 w-5">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={m.replace(/^\d+\.\s*/, '')}
                    onChange={(e) => updateMember(idx, `${idx + 1}. ${e.target.value}`)}
                    placeholder={`Nama Anggota ${idx + 1}...`}
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. AKTIVITAS 1: PEMAHAMAN KONSEP UTAMA                                    */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-white font-mono text-[10px] font-black">
            AKTIVITAS 1
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
            Memahami &amp; Menjelaskan Konsep Kunci Materi
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Tuliskan pemahamanmu mengenai setiap konsep kunci materi berikut dengan menggunakan kalimatmu sendiri beserta contoh penerapannya:
        </p>

        <div className="space-y-4">
          {topic.materi.keyConcepts.map((kc, idx) => (
            <div
              key={`kc-${idx}-${kc.title}`}
              className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="text-teal-600 dark:text-teal-400">#{idx + 1}</span>
                    <span>{kc.title}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {kc.explanation}
                  </p>
                </div>
                {conceptAnswers[kc.title]?.trim() && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Terisi</span>
                  </span>
                )}
              </div>

              <textarea
                rows={3}
                value={conceptAnswers[kc.title] || ''}
                onChange={(e) =>
                  setConceptAnswers((prev) => ({
                    ...prev,
                    [kc.title]: e.target.value
                  }))
                }
                placeholder={`Tuliskan pemahamanmu tentang ${kc.title} dan contohnya di sini...`}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500 focus:ring-1 focus:ring-teal-500"
              />

              {/* Kunci Jawaban & Pedoman Guru */}
              {isTeacher && showAnswerKeys && (
                <div className="mt-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-xs text-amber-950 dark:text-amber-100 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                      <Key className="w-3.5 h-3.5 text-amber-600" />
                      Kunci &amp; Pedoman Penskoran Guru #{idx + 1}:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        const eg =
                          topic.materi.dailyLifeExamples[idx] ||
                          topic.materi.schoolExamples[idx] ||
                          kc.bulletPoints[0] ||
                          'Diterapkan dalam pemanfaatan teknologi informasi sehari-hari.';
                        setConceptAnswers((prev) => ({
                          ...prev,
                          [kc.title]: `${kc.explanation}\nContoh penerapan nyata: ${eg}`
                        }));
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold hover:bg-amber-300 transition-colors cursor-pointer"
                      title="Salin jawaban ideal ke kolom isian siswa"
                    >
                      Salin ke Kolom Siswa &darr;
                    </button>
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    <strong>Penjelasan Ideal:</strong> {kc.explanation}
                  </div>
                  {kc.bulletPoints && kc.bulletPoints.length > 0 && (
                    <div className="text-[11px] leading-relaxed">
                      <strong>Poin Kunci yang Diharapkan:</strong>
                      <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                        {kc.bulletPoints.map((bp, bIdx) => (
                          <li key={bIdx}>{bp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {topic.materi.dailyLifeExamples[idx] && (
                    <div className="text-[11px] text-amber-800 dark:text-amber-300">
                      <strong>Contoh Penerapan Nyata:</strong> {topic.materi.dailyLifeExamples[idx]}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. AKTIVITAS 2: TABEL OBSERVASI & PENGAMATAN NYATA                         */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-sky-600 text-white font-mono text-[10px] font-black">
              AKTIVITAS 2
            </span>
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              Tabel Analisis &amp; Pengamatan Nyata
            </h2>
          </div>

          <button
            type="button"
            onClick={addObservationRow}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-sky-100 dark:bg-sky-950/60 hover:bg-sky-200 text-sky-800 dark:text-sky-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 border border-sky-300 dark:border-sky-800"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Baris Observasi</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          Lakukan analisis terhadap contoh penerapan materi di lingkungan sekolah atau perangkat yang kamu ketahui:
        </p>

        {/* Kunci Jawaban & Pedoman Tabel Observasi (Mode Guru) */}
        {isTeacher && showAnswerKeys && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-xs text-amber-950 dark:text-amber-100 space-y-2.5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                <Key className="w-3.5 h-3.5 text-amber-600" />
                Pedoman Pengisian Tabel Observasi Guru:
              </span>
              <button
                type="button"
                onClick={() => {
                  playSuccess();
                  if (topic.materi.comparisonTable && topic.materi.comparisonTable.rows.length > 0) {
                    setObservationRows(
                      topic.materi.comparisonTable.rows.map((row, idx) => ({
                        id: `obs-model-${idx}`,
                        item: row[0] || `Komponen ${idx + 1}`,
                        functionOrDetail: row[1] || 'Fungsi operasional utama dalam sistem.',
                        notes: row[2] || 'Manfaat efisiensi dan stabilitas.'
                      }))
                    );
                  } else {
                    setObservationRows(
                      topic.materi.keyConcepts.map((kc, idx) => ({
                        id: `obs-model-${idx}`,
                        item: kc.title,
                        functionOrDetail: kc.explanation,
                        notes:
                          topic.materi.dailyLifeExamples[idx] ||
                          kc.bulletPoints[0] ||
                          'Mendukung keteraturan data dan mempermudah operasional sehari-hari.'
                      }))
                    );
                  }
                }}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold hover:bg-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
              >
                Terapkan Contoh Isian ke Tabel &darr;
              </button>
            </div>
            <div className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
              Siswa diharapkan mampu menuliskan komponen/objek riil beserta fungsi teknis dan analisis manfaatnya secara logis:
              <ul className="list-disc pl-4 mt-1 space-y-0.5">
                {(topic.materi.comparisonTable?.rows || topic.materi.keyConcepts).slice(0, 3).map((item, idx) => {
                  const name = Array.isArray(item) ? item[0] : item.title;
                  const desc = Array.isArray(item) ? item[1] : item.explanation;
                  return (
                    <li key={idx}>
                      <strong>{name}:</strong> {desc}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <th className="p-2.5 font-bold w-12 text-center">No</th>
                <th className="p-2.5 font-bold w-1/4">Komponen / Objek Diamati</th>
                <th className="p-2.5 font-bold w-1/3">Fungsi &amp; Cara Kerja Nyata</th>
                <th className="p-2.5 font-bold">Analisis / Catatan Manfaat</th>
                <th className="p-2.5 font-bold w-10 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {observationRows.map((r, idx) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-2 text-center font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={r.item}
                      onChange={(e) => updateObservationRow(r.id, 'item', e.target.value)}
                      placeholder="Nama komponen..."
                      className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      rows={2}
                      value={r.functionOrDetail}
                      onChange={(e) => updateObservationRow(r.id, 'functionOrDetail', e.target.value)}
                      placeholder="Fungsi dan cara kerja..."
                      className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      rows={2}
                      value={r.notes}
                      onChange={(e) => updateObservationRow(r.id, 'notes', e.target.value)}
                      placeholder="Analisis manfaat..."
                      className="w-full p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                  </td>
                  <td className="p-2 text-center">
                    {observationRows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeObservationRow(r.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Hapus baris ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. AKTIVITAS 3: PEMECAHAN KASUS NYATA & DISKUSI KELOMPOK (PBL TAHAP 1 S.D. 4) */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-mono text-[10px] font-black">
              AKTIVITAS 3
            </span>
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              Aktivitas 3 — Pemecahan Kasus Nyata &amp; Diskusi Kelompok (PBL Tahap 1 s.d. 4)
            </h2>
          </div>
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-lg border border-rose-200 dark:border-rose-900/40">
            Sesuai Format LKPD Cetak (Tahap 1 s.d. 4)
          </span>
        </div>

        {/* Kotak Skenario Kasus */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-800 dark:text-rose-300 uppercase tracking-wide">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>KASUS LAPANGAN: {pblScenario.headline} ({pblScenario.location})</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {pblScenario.contextStory}
          </p>
          <div className="p-2.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-rose-200 dark:border-rose-800/80 text-xs font-bold text-rose-900 dark:text-rose-200">
            Pertanyaan Utama Masalah: "{pblScenario.drivingQuestion}"
          </div>

          {/* Kisi-Kisi Arahan Diskusi Kelompok (Sesuai LKPD Cetak) */}
          {pblScenario.whatWeNeedToLearn && pblScenario.whatWeNeedToLearn.length > 0 && (
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-rose-200/80 dark:border-rose-800/60 text-xs space-y-1">
              <span className="font-extrabold text-rose-900 dark:text-rose-300 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Kisi-Kisi Arahan Diskusi Kelompok:</span>
              </span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-700 dark:text-slate-300 text-[11.5px]">
                {pblScenario.whatWeNeedToLearn.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Kunci Jawaban & Pedoman PBL (Mode Guru) */}
        {isTeacher && showAnswerKeys && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-xs text-amber-950 dark:text-amber-100 space-y-2.5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                <Key className="w-3.5 h-3.5 text-amber-600" />
                Pedoman Kunci Jawaban Kasus PBL Guru (Tahap 1 s.d. 4):
              </span>
              <button
                type="button"
                onClick={() => {
                  playSuccess();
                  const pblRootCauses = pblScenario.potentialCauses.filter((c) => c.isRootCause);
                  setPblAnswers((prev) => ({
                    ...prev,
                    problemIdentification: `Kasus "${pblScenario.headline}": Terjadi kendala utama terkait ${pblScenario.drivingQuestion}. Pihak yang terdampak meliputi siswa, guru, dan warga sekolah di ${pblScenario.location}.`,
                    rootCauses: pblRootCauses.map((rc, i) => `${i + 1}. ${rc.text} (${rc.explanation})`).join('\n'),
                    solutionSteps:
                      `Langkah Pembuatan Karya Solutif (${pblScenario.deliverableName}):\n` +
                      pblScenario.recommendedActions.map((ra, i) => `${i + 1}. ${ra.title} (${ra.category}): ${ra.desc}`).join('\n'),
                    flowchartOrSketch: `Rancangan Bagan Alur & Poster Mini (${pblScenario.deliverableName}):\n1. Input: Identifikasi masalah di ${pblScenario.location}\n2. Proses: Menerapkan solusi ${pblScenario.recommendedActions[0]?.title || 'tindakan solutif'}\n3. Output: Karya nyata "${pblScenario.deliverableName}"\n4. Slogan: "Cerdas Berteknologi, Solutif Mengatasi Masalah!"`,
                    finalConclusion: `Solusi pembuatan ${pblScenario.deliverableName} berhasil mengatasi kendala di ${pblScenario.location} secara tepat sasaran dengan menerapkan prinsip pemikiran komputasional.`
                  }));
                }}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold hover:bg-amber-300 transition-colors cursor-pointer self-start sm:self-auto"
              >
                Salin Pedoman ke 4 Tahapan PBL &darr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px]">
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-900/40">
                <div className="font-bold text-amber-800 dark:text-amber-400 mb-0.5">1. Identifikasi Masalah Utama:</div>
                <p className="text-slate-700 dark:text-slate-300">{pblScenario.headline} di {pblScenario.location}. Fokus: {pblScenario.drivingQuestion}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-900/40">
                <div className="font-bold text-amber-800 dark:text-amber-400 mb-0.5">2. Akar Masalah yang Diharapkan:</div>
                <ul className="list-disc pl-3.5 space-y-0.5 text-slate-700 dark:text-slate-300">
                  {pblScenario.potentialCauses.filter((c) => c.isRootCause).map((rc, i) => (
                    <li key={i}><strong>{rc.text}:</strong> {rc.explanation}</li>
                  ))}
                </ul>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-900/40">
                <div className="font-bold text-amber-800 dark:text-amber-400 mb-0.5">
                  3. Solusi &amp; Langkah Nyata ({pblScenario.deliverableName}):
                </div>
                <ul className="list-disc pl-3.5 space-y-0.5 text-slate-700 dark:text-slate-300">
                  {pblScenario.recommendedActions.map((ra, i) => (
                    <li key={i}><strong>{ra.title}:</strong> {ra.desc}</li>
                  ))}
                </ul>
              </div>
              <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-900/40">
                <div className="font-bold text-amber-800 dark:text-amber-400 mb-0.5">4. Bagan Alur / Poster Mini:</div>
                <p className="text-slate-700 dark:text-slate-300">
                  Membuat diagram alir tahap penyelesaian dan slogan poster kampanye produk solutif secara komunikatif.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4 Form Isian Terstruktur Sesuai LKPD Cetak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tahap 1 */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center text-[10px] font-black">
                  1
                </span>
                <span>1. Identifikasi Masalah Utama</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                Apa masalah utama yang terjadi pada kasus di atas dan siapa saja pihak yang terdampak?
              </p>
            </div>
            <textarea
              rows={4}
              value={pblAnswers.problemIdentification}
              onChange={(e) => setPblAnswers((prev) => ({ ...prev, problemIdentification: e.target.value }))}
              placeholder="Contoh: Masalah utama yang terjadi adalah... Pihak yang terdampak meliputi siswa, guru, dan warga sekolah..."
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500"
            />
          </div>

          {/* Tahap 2 */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center text-[10px] font-black">
                  2
                </span>
                <span>2. Analisis Akar Penyebab</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                Mengapa masalah tersebut bisa terjadi? Sebutkan dan jelaskan minimal 2 penyebab utamanya!
              </p>
            </div>
            <textarea
              rows={4}
              value={pblAnswers.rootCauses}
              onChange={(e) => setPblAnswers((prev) => ({ ...prev, rootCauses: e.target.value }))}
              placeholder="Tuliskan minimal 2 faktor penyebab masalah (faktor teknis, perilaku pengguna, atau sistem)..."
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500"
            />
          </div>

          {/* Tahap 3 */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center text-[10px] font-black">
                  3
                </span>
                <span>3. Solusi &amp; Langkah Nyata Kelompok</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                Tuliskan langkah-langkah solusi kelompokmu untuk membuat karya: <strong>{pblScenario.deliverableName}</strong>
              </p>
            </div>
            <textarea
              rows={4}
              value={pblAnswers.solutionSteps}
              onChange={(e) => setPblAnswers((prev) => ({ ...prev, solutionSteps: e.target.value }))}
              placeholder="Langkah-langkah terstruktur pembuatan karya solutif dan tindakan kelompok..."
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500"
            />
          </div>

          {/* Tahap 4 (Sesuai LKPD Cetak: Kotak Sketsa / Bagan Alur Solusi / Poster Mini) */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                  <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center text-[10px] font-black">
                    4
                  </span>
                  <span>4. Kotak Sketsa / Bagan Alur Solusi / Poster Mini</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                Gambarkan bagan alur langkah penyelesaian, tabel rumus, atau poster slogan solusi kelompokmu! (Goreskan pada kanvas digital di bawah dan/atau tuliskan rincian alur &amp; slogan solusinya di kolom teks)
              </p>
            </div>

            {/* Kanvas Sketsa Digital Tahap 4 */}
            <PblInteractiveSketchPad
              initialDataUrl={pblAnswers.sketchDataUrl}
              onSaveSketch={(dataUrl) => {
                setPblAnswers((prev) => ({ ...prev, sketchDataUrl: dataUrl }));
              }}
            />

            <textarea
              rows={3}
              value={pblAnswers.flowchartOrSketch || pblAnswers.finalConclusion || ''}
              onChange={(e) => setPblAnswers((prev) => ({ ...prev, flowchartOrSketch: e.target.value }))}
              placeholder="Uraian langkah diagram alir, rumus, atau slogan kampanye poster mini kelompok..."
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. AKTIVITAS 4: LATIHAN SOAL URAIAN / ESAI                                */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-mono text-[10px] font-black">
              AKTIVITAS 4
            </span>
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              Latihan Soal Uraian / Esai Penalaran
            </h2>
          </div>

          {isTeacher && (
            <button
              type="button"
              onClick={() => {
                playClick();
                setShowAnswerKeys((prev) => !prev);
              }}
              className="self-start sm:self-auto px-3 py-1 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-500/40 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-amber-500" />
              <span>{showAnswerKeys ? 'Sembunyikan Kunci Guru' : 'Lihat Kunci Jawaban Guru'}</span>
            </button>
          )}
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          Jawablah pertanyaan uraian di bawah ini secara lengkap dengan bahasa yang santun dan bernalar kritis:
        </p>

        <div className="space-y-4">
          {essayQuestions.map((eq) => (
            <div
              key={eq.id}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Soal #{eq.no}: {eq.question}
                  </h3>
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                    💡 Petunjuk: {eq.hint}
                  </span>
                </div>
                {essayAnswers[eq.id]?.trim() && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold shrink-0">
                    Terjawab
                  </span>
                )}
              </div>

              <textarea
                rows={3}
                value={essayAnswers[eq.id] || ''}
                onChange={(e) =>
                  setEssayAnswers((prev) => ({
                    ...prev,
                    [eq.id]: e.target.value
                  }))
                }
                placeholder={`Ketikkan uraian jawabanmu untuk soal nomor ${eq.no}...`}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500 focus:ring-1 focus:ring-teal-500"
              />

              {/* Kunci Jawaban Guru (Mode Guru) */}
              {isTeacher && showAnswerKeys && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-[11px] text-amber-950 dark:text-amber-100 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                      <Key className="w-3.5 h-3.5 text-amber-600" />
                      <span>Kunci Jawaban &amp; Pedoman Penskoran Guru:</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setEssayAnswers((prev) => ({
                          ...prev,
                          [eq.id]: eq.answerKey
                        }));
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold hover:bg-amber-300 transition-colors cursor-pointer"
                      title="Salin jawaban ideal ke kolom isian siswa"
                    >
                      Salin ke Isian Siswa &darr;
                    </button>
                  </div>
                  <p className="leading-relaxed bg-white/70 dark:bg-slate-900/70 p-2 rounded-lg border border-amber-200 dark:border-amber-900/40 font-mono text-[10.5px]">
                    {eq.answerKey}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. REFLEKSI DIRI & TANDA TANGAN PENGERJAAN                                */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="px-2.5 py-1 rounded-xl bg-amber-600 text-white font-mono text-[10px] font-black">
            REFLEKSI
          </span>
          <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
            Refleksi Diri &amp; Komitmen Belajar
          </h2>
        </div>

        <div className="space-y-3">
          {/* Rating Bintang */}
          <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Bagaimana tingkat pemahamanmu terhadap materi ini hari ini?
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pilih 1 sampai 5 bintang sesuai rasa kepuasan belajarmu
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    playClick();
                    setReflectionStars(star);
                  }}
                  className="p-1 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= reflectionStars
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-900 dark:text-white">
                Hal yang paling saya / kelompok pahami hari ini:
              </label>
              <textarea
                rows={2}
                value={reflectionUnderstood}
                onChange={(e) => setReflectionUnderstood(e.target.value)}
                placeholder="Tuliskan konsep atau bagian yang paling kamu kuasai..."
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-900 dark:text-white">
                Hal yang masih membingungkan / ingin dipelajari lagi:
              </label>
              <textarea
                rows={2}
                value={reflectionNeedsWork}
                onChange={(e) => setReflectionNeedsWork(e.target.value)}
                placeholder="Tuliskan bagian materi yang masih ingin kamu tanyakan ke guru..."
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-teal-500"
              />
            </div>
          </div>

          {/* Pedoman Penskoran Refleksi Guru */}
          {isTeacher && showAnswerKeys && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-[11px] text-amber-950 dark:text-amber-100 flex items-start gap-2 animate-fadeIn">
              <Key className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Pedoman Guru:</strong> Refleksi dinilai berdasarkan kejujuran refleksi diri dan kemampuan metakognisi peserta didik. Ketercapaian pemahaman minimal bintang 4 menandakan kesiapan melanjutkan ke tahap asesmen sumatif.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. FOOTER AKSI PENYELESAIAN LKPD                                         */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
              {isCompletedSubmitted ? '✅ LKPD Berhasil Dituntaskan!' : 'Selesai Mengisi LKPD?'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Kamu bisa mengunduh hasilnya dalam bentuk PDF atau langsung lanjut ke modul berikutnya.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {!isCompletedSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitLkpd}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Tandai Selesai &amp; Simpan</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePrintFilledDocument}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil LKPD Saya</span>
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Lanjut Modul Mini Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};
