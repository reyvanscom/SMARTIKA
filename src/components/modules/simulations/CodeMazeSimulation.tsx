import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  Code2,
  FileCode,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  HelpCircle,
  Lightbulb,
  Check,
  Zap,
  Layers,
  Compass,
  Star,
  Flag,
  Bot,
  BookOpen,
  GitBranch,
  Repeat,
  Edit3,
  Eye,
  Cpu,
  Bug,
  Cat,
  FileText,
  Sliders,
  StepForward,
   Eraser,
  Copy
} from 'lucide-react';

// ============================================================================
// PARSER & TRANSPILER PSEUDOCODE -> PYTHON + INTERPRETER + FLOWCHART NODES
// ============================================================================

export interface FlowchartNodeItem {
  id: string;
  type: 'start' | 'declare' | 'input' | 'process' | 'decision' | 'loop' | 'output' | 'end';
  label: string;
  subLabel?: string;
  branchYes?: string;
  branchNo?: string;
}

export interface TranspiledResult {
  programName: string;
  pythonCode: string;
  detectedInputs: { name: string; type: 'int' | 'float' | 'str' }[];
  outputLines: string[];
  finalVariables: Record<string, string | number>;
  flowchartNodes: FlowchartNodeItem[];
  errorMessage: string | null;
}

export function compileAndRunStudentPseudocode(
  rawPseudocode: string,
  inputValues: Record<string, string>
): TranspiledResult {
  const lines = rawPseudocode
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('//') && !l.startsWith('#'));

  let programName = 'Program_Latihan_Siswa';
  const varTypes: Record<string, 'int' | 'float' | 'str'> = {};
  const detectedInputs: { name: string; type: 'int' | 'float' | 'str' }[] = [];
  const pythonLines: string[] = [];
  const flowchartNodes: FlowchartNodeItem[] = [
    { id: 'node-start', type: 'start', label: 'MULAI (Start)' }
  ];

  let section: 'none' | 'judul' | 'deklarasi' | 'implementasi' = 'none';
  let indentLevel = 0;
  const pyIndent = (lvl: number) => '    '.repeat(Math.max(0, lvl));

  // Pass 1: Identify Program Title, Declarations, Inputs, and Build Python Code + Flowchart
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const upper = line.toUpperCase();

    if (upper === 'JUDUL' || upper.startsWith('JUDUL:')) {
      section = 'judul';
      const after = line.replace(/^judul\s*:?\s*/i, '').trim();
      if (after) {
        programName = after.replace(/^program\s+/i, '').replace(/\s+/g, '_');
      }
      continue;
    }
    if (upper === 'DEKLARASI' || upper.startsWith('DEKLARASI:')) {
      section = 'deklarasi';
      continue;
    }
    if (upper === 'IMPLEMENTASI' || upper.startsWith('IMPLEMENTASI:') || upper === 'ALGORITMA' || upper === 'DESKRIPSI') {
      section = 'implementasi';
      continue;
    }

    if (section === 'judul' || upper.startsWith('PROGRAM ')) {
      programName = line.replace(/^program\s+/i, '').trim().replace(/\s+/g, '_') || 'Program_Siswa';
      if (section === 'judul') section = 'none';
      continue;
    }

    // Check variable declaration: e.g. "var alas, tinggi, luas : float;" or "alas, tinggi : integer"
    if (section === 'deklarasi' || /^var\s+/i.test(line) || (line.includes(':') && !upper.startsWith('PRINT') && !upper.startsWith('IF') && !upper.startsWith('FOR'))) {
      const cleaned = line.replace(/^var\s+/i, '').replace(/;$/, '').trim();
      const parts = cleaned.split(':');
      if (parts.length === 2) {
        const names = parts[0]
          .split(',')
          .map((n) => n.trim())
          .filter(Boolean);
        const rawType = parts[1].trim().toLowerCase();
        const mappedType: 'int' | 'float' | 'str' =
          rawType.includes('float') || rawType.includes('real') || rawType.includes('double')
            ? 'float'
            : rawType.includes('int') || rawType.includes('angka') || rawType.includes('bulat')
            ? 'int'
            : 'str';

        names.forEach((n) => {
          varTypes[n] = mappedType;
        });

        const defaultVal = mappedType === 'float' ? '0.0' : mappedType === 'int' ? '0' : '""';
        pythonLines.push(`${pyIndent(indentLevel)}# Deklarasi variabel (${rawType})`);
        pythonLines.push(`${pyIndent(indentLevel)}${names.join(', ')} = ${names.map(() => defaultVal).join(', ')}`);
        flowchartNodes.push({
          id: `node-decl-${i}`,
          type: 'declare',
          label: `Deklarasi: ${names.join(', ')}`,
          subLabel: `Tipe: ${rawType}`
        });
        continue;
      }
    }

    // Handle ENDIF / ENDFOR / END REPEAT / ELSE
    if (upper === 'ENDIF' || upper === 'END IF' || upper === 'ENDFOR' || upper === 'END FOR' || upper === 'END REPEAT' || upper === 'ENDREPEAT' || upper === 'ENDWHILE') {
      indentLevel = Math.max(0, indentLevel - 1);
      continue;
    }

    if (upper === 'ELSE' || upper.startsWith('ELSE ')) {
      const prevIndent = Math.max(0, indentLevel - 1);
      pythonLines.push(`${pyIndent(prevIndent)}else:`);
      const inlineElseCmd = line.replace(/^else\s*/i, '').trim();
      if (inlineElseCmd) {
        // will be processed inline if needed
        lines.splice(i + 1, 0, inlineElseCmd);
      }
      continue;
    }

    // Handle INPUT(x) or BACA(x) or INPUT x
    const inputMatch = line.match(/^(?:INPUT|BACA|READ)\s*\(?\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)?;?$/i);
    if (inputMatch) {
      const varName = inputMatch[1];
      const vType = varTypes[varName] || 'float';
      if (!detectedInputs.some((d) => d.name === varName)) {
        detectedInputs.push({ name: varName, type: vType });
      }
      if (vType === 'int') {
        pythonLines.push(`${pyIndent(indentLevel)}${varName} = int(input("Masukkan ${varName}: "))`);
      } else if (vType === 'float') {
        pythonLines.push(`${pyIndent(indentLevel)}${varName} = float(input("Masukkan ${varName}: "))`);
      } else {
        pythonLines.push(`${pyIndent(indentLevel)}${varName} = input("Masukkan ${varName}: ")`);
      }
      flowchartNodes.push({
        id: `node-in-${i}`,
        type: 'input',
        label: `INPUT (${varName})`,
        subLabel: `Nilai uji: ${inputValues[varName] ?? '10'}`
      });
      continue;
    }

    // Handle FOR i = 1 TO 10 DO
    const forMatch = line.match(/^FOR\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+?)\s+TO\s+(.+?)(?:\s+DO)?$/i);
    if (forMatch) {
      const iterVar = forMatch[1];
      const startExpr = forMatch[2].trim();
      const endExpr = forMatch[3].trim();
      pythonLines.push(`${pyIndent(indentLevel)}for ${iterVar} in range(${startExpr}, ${endExpr} + 1):`);
      flowchartNodes.push({
        id: `node-for-${i}`,
        type: 'loop',
        label: `FOR ${iterVar} = ${startExpr} TO ${endExpr}`,
        subLabel: 'Perulangan Terhitung (Loop)'
      });
      indentLevel++;
      continue;
    }

    // Handle REPEAT n TIMES
    const repeatMatch = line.match(/^REPEAT\s+(\d+)\s+TIMES$/i);
    if (repeatMatch) {
      const count = repeatMatch[1];
      pythonLines.push(`${pyIndent(indentLevel)}for _ in range(${count}):`);
      flowchartNodes.push({
        id: `node-rep-${i}`,
        type: 'loop',
        label: `REPEAT ${count} TIMES`,
        subLabel: 'Perulangan Blok'
      });
      indentLevel++;
      continue;
    }

    // Handle IF condition THEN
    const ifMatch = line.match(/^IF\s+(.+?)\s+THEN(.*)$/i);
    if (ifMatch) {
      const condRaw = ifMatch[1].trim();
      const trailingCmd = ifMatch[2].trim();
      const pyCond = condRaw
        .replace(/\bAND\b/gi, 'and')
        .replace(/\bOR\b/gi, 'or')
        .replace(/\bMOD\b/gi, '%')
        .replace(/(?<![<>!=])=(?!=)/g, '==');
      pythonLines.push(`${pyIndent(indentLevel)}if ${pyCond}:`);
      flowchartNodes.push({
        id: `node-if-${i}`,
        type: 'decision',
        label: `IF ${condRaw} ?`,
        subLabel: 'Percabangan Logika (True / False)'
      });
      indentLevel++;
      if (trailingCmd) {
        lines.splice(i + 1, 0, trailingCmd);
      }
      continue;
    }

    // Handle PRINT(...) or TAMPILKAN(...) or CETAK(...) or OUTPUT(...)
    const printMatch = line.match(/^(?:PRINT|TAMPILKAN|CETAK|OUTPUT|WRITE)\s*\(?(.+?)\)?\s*;?$/i);
    if (printMatch) {
      let expr = printMatch[1].trim();
      // Remove outer parens if balanced
      if (expr.startsWith('(') && expr.endsWith(')')) {
        expr = expr.slice(1, -1).trim();
      }
      pythonLines.push(`${pyIndent(indentLevel)}print(${expr})`);
      flowchartNodes.push({
        id: `node-out-${i}`,
        type: 'output',
        label: `PRINT (${expr})`
      });
      continue;
    }

    // Handle Unplugged Robot & Scratch commands from the textbook
    const robotMaju = line.match(/^MAJU\s*\(?\s*(\d+)\s*\)?$/i);
    if (robotMaju) {
      pythonLines.push(`${pyIndent(indentLevel)}robot.maju(${robotMaju[1]})`);
      flowchartNodes.push({
        id: `node-rob-${i}`,
        type: 'process',
        label: `MAJU (${robotMaju[1]} langkah)`
      });
      continue;
    }
    if (/^HADAP_(KIRI|KANAN)$/i.test(line)) {
      const arah = line.toUpperCase().includes('KIRI') ? 'kiri' : 'kanan';
      pythonLines.push(`${pyIndent(indentLevel)}robot.hadap_${arah}()`);
      flowchartNodes.push({
        id: `node-rob-${i}`,
        type: 'process',
        label: line.toUpperCase()
      });
      continue;
    }
    const ambilMatch = line.match(/^AMBIL\s*\(?\s*([a-zA-Z0-9_ ]+)\s*\)?$/i);
    if (ambilMatch) {
      pythonLines.push(`${pyIndent(indentLevel)}robot.ambil("${ambilMatch[1].trim()}")`);
      flowchartNodes.push({
        id: `node-rob-${i}`,
        type: 'process',
        label: `AMBIL (${ambilMatch[1].trim()})`
      });
      continue;
    }
    if (/^SIMPAN$/i.test(line)) {
      pythonLines.push(`${pyIndent(indentLevel)}robot.simpan()`);
      flowchartNodes.push({
        id: `node-rob-${i}`,
        type: 'process',
        label: 'SIMPAN objek'
      });
      continue;
    }
    const moveStepsMatch = line.match(/^MOVE\s+(\d+)\s+STEPS$/i);
    if (moveStepsMatch) {
      pythonLines.push(`${pyIndent(indentLevel)}sprite.move(${moveStepsMatch[1]})`);
      flowchartNodes.push({
        id: `node-spr-${i}`,
        type: 'process',
        label: `MOVE ${moveStepsMatch[1]} STEPS`
      });
      continue;
    }
    const turnDegMatch = line.match(/^TURN\s+(\d+)\s+DEGREES$/i);
    if (turnDegMatch) {
      pythonLines.push(`${pyIndent(indentLevel)}sprite.turn(${turnDegMatch[1]})`);
      flowchartNodes.push({
        id: `node-spr-${i}`,
        type: 'process',
        label: `TURN ${turnDegMatch[1]} DEGREES`
      });
      continue;
    }

    // Handle assignment: e.g. luas = 0.5 * alas * tinggi or luas <- 0.5 * alas * tinggi
    const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:=|<-|:=)\s*(.+?);?$/);
    if (assignMatch) {
      const targetVar = assignMatch[1].trim();
      const expr = assignMatch[2].trim().replace(/\bMOD\b/gi, '%');
      pythonLines.push(`${pyIndent(indentLevel)}${targetVar} = ${expr}`);
      flowchartNodes.push({
        id: `node-proc-${i}`,
        type: 'process',
        label: `${targetVar} = ${expr}`
      });
      continue;
    }
  }

  flowchartNodes.push({ id: 'node-end', type: 'end', label: 'SELESAI (End)' });

  const headerPython = [
    `# ==========================================`,
    `# Program Python: ${programName}`,
    `# Dikonversi otomatis dari Pseudocode Siswa`,
    `# ==========================================`
  ];
  const fullPythonCode = [...headerPython, ...(pythonLines.length > 0 ? pythonLines : ['# Tulis pseudocode di panel kiri'])].join('\n');

  // Pass 2: Safe Execution Engine to produce real output ("Hasil Jadinya")
  const env: Record<string, any> = {};
  const outputLines: string[] = [];
  let errorMessage: string | null = null;

  // Initialize declared variables
  Object.entries(varTypes).forEach(([vName, vType]) => {
    env[vName] = vType === 'str' ? '' : 0;
  });

  const evalExpression = (exprRaw: string, scope: Record<string, any>): any => {
    const trimmed = exprRaw.trim().replace(/;$/, '');
    // String literal
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    // Comma-separated print arguments e.g. "Luas =", luas
    if (trimmed.includes(',')) {
      const parts = trimmed.split(',').map((p) => evalExpression(p, scope));
      return parts.join(' ');
    }
    // Replace variable names with values from scope
    let jsExpr = trimmed
      .replace(/\bAND\b/gi, '&&')
      .replace(/\bOR\b/gi, '||')
      .replace(/\bMOD\b/gi, '%');

    // Replace single = in conditions if needed
    jsExpr = jsExpr.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (match) => {
      if (match === 'true' || match === 'false' || match === 'Math') return match;
      if (match in scope) {
        const val = scope[match];
        return typeof val === 'string' ? JSON.stringify(val) : String(val);
      }
      return JSON.stringify(match);
    });

    try {
      // eslint-disable-next-line no-new-func
      return Function(`"use strict"; return (${jsExpr});`)();
    } catch {
      return trimmed;
    }
  };

  const evalCondition = (condRaw: string, scope: Record<string, any>): boolean => {
    let jsCond = condRaw
      .trim()
      .replace(/\bAND\b/gi, '&&')
      .replace(/\bOR\b/gi, '||')
      .replace(/\bMOD\b/gi, '%')
      .replace(/(?<![<>!=])=(?!=)/g, '===');

    jsCond = jsCond.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (match) => {
      if (match === 'true' || match === 'false') return match;
      if (match in scope) {
        const val = scope[match];
        return typeof val === 'string' ? JSON.stringify(val) : String(val);
      }
      return '0';
    });

    try {
      // eslint-disable-next-line no-new-func
      return Boolean(Function(`"use strict"; return (${jsCond});`)());
    } catch {
      return false;
    }
  };

  // Recursive block runner for lines[start..end]
  const executeBlock = (blockLines: string[], scope: Record<string, any>) => {
    let idx = 0;
    while (idx < blockLines.length) {
      const line = blockLines[idx];
      const upper = line.toUpperCase();

      // Skip structural headers & declarations
      if (
        upper === 'JUDUL' ||
        upper.startsWith('JUDUL:') ||
        upper.startsWith('PROGRAM ') ||
        upper === 'DEKLARASI' ||
        upper.startsWith('DEKLARASI:') ||
        upper === 'IMPLEMENTASI' ||
        upper.startsWith('IMPLEMENTASI:') ||
        upper === 'ALGORITMA' ||
        /^var\s+/i.test(line) ||
        (line.includes(':') && !upper.startsWith('PRINT') && !upper.startsWith('IF') && !upper.startsWith('FOR'))
      ) {
        idx++;
        continue;
      }

      // INPUT
      const inMatch = line.match(/^(?:INPUT|BACA|READ)\s*\(?\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)?;?$/i);
      if (inMatch) {
        const vName = inMatch[1];
        const rawUserVal = inputValues[vName] !== undefined && inputValues[vName] !== '' ? inputValues[vName] : '10';
        const vType = varTypes[vName] || 'float';
        if (vType === 'str' || isNaN(Number(rawUserVal))) {
          scope[vName] = rawUserVal;
        } else if (vType === 'int') {
          scope[vName] = parseInt(rawUserVal, 10);
        } else {
          scope[vName] = parseFloat(rawUserVal);
        }
        outputLines.push(`> Input ${vName} = ${scope[vName]}`);
        idx++;
        continue;
      }

      // FOR loop
      const forMatch = line.match(/^FOR\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+?)\s+TO\s+(.+?)(?:\s+DO)?$/i);
      if (forMatch) {
        const iterVar = forMatch[1];
        const startVal = Number(evalExpression(forMatch[2], scope)) || 1;
        const endVal = Math.min(Number(evalExpression(forMatch[3], scope)) || 1, startVal + 50); // cap 50 iterations
        // Find matching ENDFOR
        let depth = 1;
        let endIdx = idx + 1;
        while (endIdx < blockLines.length && depth > 0) {
          const u = blockLines[endIdx].toUpperCase();
          if (u.startsWith('FOR ')) depth++;
          if (u === 'ENDFOR' || u === 'END FOR') depth--;
          if (depth > 0) endIdx++;
        }
        const body = blockLines.slice(idx + 1, endIdx);
        for (let k = startVal; k <= endVal; k++) {
          scope[iterVar] = k;
          executeBlock(body, scope);
        }
        idx = endIdx + 1;
        continue;
      }

      // REPEAT n TIMES
      const repMatch = line.match(/^REPEAT\s+(\d+)\s+TIMES$/i);
      if (repMatch) {
        const times = Math.min(parseInt(repMatch[1], 10) || 1, 50);
        let depth = 1;
        let endIdx = idx + 1;
        while (endIdx < blockLines.length && depth > 0) {
          const u = blockLines[endIdx].toUpperCase();
          if (u.startsWith('REPEAT ')) depth++;
          if (u === 'END REPEAT' || u === 'ENDREPEAT') depth--;
          if (depth > 0) endIdx++;
        }
        const body = blockLines.slice(idx + 1, endIdx);
        for (let k = 1; k <= times; k++) {
          executeBlock(body, scope);
        }
        idx = endIdx + 1;
        continue;
      }

      // IF ... THEN ... ELSE ... ENDIF
      const ifMatch = line.match(/^IF\s+(.+?)\s+THEN$/i);
      if (ifMatch) {
        const cond = ifMatch[1];
        let depth = 1;
        let elseIdx = -1;
        let endIfIdx = idx + 1;
        while (endIfIdx < blockLines.length && depth > 0) {
          const u = blockLines[endIfIdx].toUpperCase();
          if (u.startsWith('IF ')) depth++;
          else if ((u === 'ELSE' || u.startsWith('ELSE ')) && depth === 1) {
            elseIdx = endIfIdx;
          } else if (u === 'ENDIF' || u === 'END IF') {
            depth--;
          }
          if (depth > 0) endIfIdx++;
        }
        const condResult = evalCondition(cond, scope);
        if (condResult) {
          const trueBody = blockLines.slice(idx + 1, elseIdx !== -1 ? elseIdx : endIfIdx);
          executeBlock(trueBody, scope);
        } else if (elseIdx !== -1) {
          const falseBody = blockLines.slice(elseIdx + 1, endIfIdx);
          executeBlock(falseBody, scope);
        }
        idx = endIfIdx + 1;
        continue;
      }

      // PRINT
      const prMatch = line.match(/^(?:PRINT|TAMPILKAN|CETAK|OUTPUT|WRITE)\s*\(?(.+?)\)?\s*;?$/i);
      if (prMatch) {
        let rawArg = prMatch[1].trim();
        if (rawArg.startsWith('(') && rawArg.endsWith(')')) {
          rawArg = rawArg.slice(1, -1).trim();
        }
        const val = evalExpression(rawArg, scope);
        outputLines.push(String(val));
        idx++;
        continue;
      }

      // Robot / Sprite commands
      const robMaju = line.match(/^MAJU\s*\(?\s*(\d+)\s*\)?$/i);
      if (robMaju) {
        outputLines.push(`🤖 Robot maju ${robMaju[1]} langkah ke depan`);
        idx++;
        continue;
      }
      if (/^HADAP_(KIRI|KANAN)$/i.test(line)) {
        outputLines.push(`🤖 Robot berputar ${line.toUpperCase()}`);
        idx++;
        continue;
      }
      const robAmbil = line.match(/^AMBIL\s*\(?\s*([a-zA-Z0-9_ ]+)\s*\)?$/i);
      if (robAmbil) {
        outputLines.push(`🤖 Robot mengambil objek: ${robAmbil[1].trim()}`);
        idx++;
        continue;
      }
      if (/^SIMPAN$/i.test(line)) {
        outputLines.push(`🤖 Robot menyimpan objek di titik tujuan!`);
        idx++;
        continue;
      }
      const sprMove = line.match(/^MOVE\s+(\d+)\s+STEPS$/i);
      if (sprMove) {
        scope.posisi_sprite = (Number(scope.posisi_sprite) || 0) + Number(sprMove[1]);
        idx++;
        continue;
      }
      const sprTurn = line.match(/^TURN\s+(\d+)\s+DEGREES$/i);
      if (sprTurn) {
        outputLines.push(`🐱 Sprite berbalik arah ${sprTurn[1]}°`);
        idx++;
        continue;
      }

      // Assignment
      const asMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:=|<-|:=)\s*(.+?);?$/);
      if (asMatch) {
        const target = asMatch[1].trim();
        const val = evalExpression(asMatch[2], scope);
        scope[target] = typeof val === 'number' && !Number.isInteger(val) ? Number(val.toFixed(2)) : val;
        idx++;
        continue;
      }

      idx++;
    }
  };

  try {
    executeBlock(lines, env);
  } catch (err: any) {
    errorMessage = err?.message || 'Kesalahan sintaks pseudocode';
  }

  return {
    programName,
    pythonCode: fullPythonCode,
    detectedInputs,
    outputLines,
    finalVariables: env,
    flowchartNodes,
    errorMessage
  };
}

// ============================================================================
// DATA KASUS BUKU INFORMATIKA KELAS 9 (SESUAI PDF)
// ============================================================================

interface BookCaseStudy {
  id: 'sekuensial' | 'percabangan' | 'perulangan' | 'robot-unplugged' | 'scratch-kucing';
  badge: string;
  title: string;
  subtitle: string;
  bookPage: string;
  caseDescription: string;
  pseudocodeStructure: {
    judul: string;
    deklarasi: string[];
    implementasi: string[];
  };
  rawPseudocode: string;
}

const BOOK_CASES: BookCaseStudy[] = [
  {
    id: 'sekuensial',
    badge: '6.a Perhitungan Sederhana (Sekuensial)',
    title: 'Program Hitung_Luas_Segitiga',
    subtitle: 'Instruksi dieksekusi berurutan dari baris pertama hingga terakhir',
    bookPage: 'Halaman 1 Buku Materi',
    caseDescription: 'Menghitung luas segitiga berdasarkan input alas dan tinggi dengan rumus luas = 0.5 * alas * tinggi.',
    pseudocodeStructure: {
      judul: 'Program Hitung_Luas_Segitiga',
      deklarasi: ['var alas, tinggi, luas : float;'],
      implementasi: [
        'INPUT (alas)',
        'INPUT (tinggi)',
        'luas = 0.5 * alas * tinggi',
        'PRINT (luas)'
      ]
    },
    rawPseudocode: `Judul
Program Hitung_Luas_Segitiga
Deklarasi
var alas, tinggi, luas : float;
Implementasi
INPUT (alas)
INPUT (tinggi)
luas = 0.5 * alas * tinggi
PRINT (luas)`
  },
  {
    id: 'percabangan',
    badge: '6.b Struktur Pengkondisian (IF-THEN-ELSE)',
    title: 'Program Cek_Syarat_KTP',
    subtitle: 'Program memilih satu tindakan berdasarkan syarat kondisi usia >= 17',
    bookPage: 'Halaman 1 Buku Materi',
    caseDescription: 'Menentukan apakah seseorang sudah wajib memiliki KTP berdasarkan batas usia minimal 17 tahun.',
    pseudocodeStructure: {
      judul: 'Program Cek_Syarat_KTP',
      deklarasi: ['var usia : integer;'],
      implementasi: [
        'INPUT (usia)',
        'IF usia >= 17 THEN',
        '  PRINT ("Wajib memiliki KTP")',
        'ELSE',
        '  PRINT ("Belum wajib memiliki KTP")',
        'ENDIF'
      ]
    },
    rawPseudocode: `Judul
Program Cek_Syarat_KTP
Deklarasi
var usia : integer;
Implementasi
INPUT (usia)
IF usia >= 17 THEN
  PRINT ("Wajib memiliki KTP")
ELSE
  PRINT ("Belum wajib memiliki KTP")
ENDIF`
  },
  {
    id: 'perulangan',
    badge: '6.c Struktur Perulangan (FOR-TO-DO)',
    title: 'Program Perulangan_Teks',
    subtitle: 'Menjalankan perintah berulang kali secara otomatis tanpa duplikasi kode',
    bookPage: 'Halaman 2 Buku Materi',
    caseDescription: 'Menampilkan kalimat "Saya belajar Informatika" sebanyak 10 kali ke layar menggunakan variabel penghitung i.',
    pseudocodeStructure: {
      judul: 'Program Perulangan_Teks',
      deklarasi: ['var i : integer;'],
      implementasi: [
        'FOR i = 1 TO 10 DO',
        '  PRINT ("Saya belajar Informatika")',
        'ENDFOR'
      ]
    },
    rawPseudocode: `Judul
Program Perulangan_Teks
Deklarasi
var i : integer;
Implementasi
FOR i = 1 TO 10 DO
  PRINT ("Saya belajar Informatika")
ENDFOR`
  },
  {
    id: 'robot-unplugged',
    badge: 'C.1 Pemrograman Unplugged',
    title: 'Program Ambil_Buku_Meja (Robot Manusia)',
    subtitle: 'Simulasi Peran: Programmer, Robot & Analyst (Debugging)',
    bookPage: 'Halaman 2 - 3 Buku Materi',
    caseDescription: 'Mengarahkan Robot Manusia berjalan melewati rintangan untuk mengambil Buku di atas meja lalu menyimpannya.',
    pseudocodeStructure: {
      judul: 'Program Ambil_Buku_Meja',
      deklarasi: ['// Kosa Kata: MAJU(n), HADAP_KIRI, HADAP_KANAN, AMBIL(benda), SIMPAN'],
      implementasi: [
        'MAJU (5)',
        'HADAP_KIRI',
        'MAJU (2)',
        'AMBIL (Buku)',
        'HADAP_KANAN',
        'MAJU (3)',
        'SIMPAN'
      ]
    },
    rawPseudocode: `Judul
Program Ambil_Buku_Meja
Implementasi
MAJU (5)
HADAP_KIRI
MAJU (2)
AMBIL (Buku)
HADAP_KANAN
MAJU (3)
SIMPAN`
  },
  {
    id: 'scratch-kucing',
    badge: 'C.2 Pemrograman Visual Scratch',
    title: 'Program Petualangan_Sprite (Si Kucing)',
    subtitle: 'Translasi Pseudocode Nested Loop ke Blok Visual Scratch',
    bookPage: 'Halaman 3 - 4 Buku Materi',
    caseDescription: 'Sprite Kucing berjalan 10 langkah ke kanan mengambil energi, berbalik 180 derajat, kembali ke titik aman, diulang 3 kali lalu berkata "Misi Selesai!".',
    pseudocodeStructure: {
      judul: 'Program Petualangan_Sprite',
      deklarasi: ['var i : integer;'],
      implementasi: [
        'PRINT ("Mulai Petualangan!")',
        'FOR i = 1 TO 3 DO',
        '  REPEAT 10 TIMES',
        '    MOVE 10 STEPS',
        '  END REPEAT',
        '  TURN 180 DEGREES',
        '  REPEAT 10 TIMES',
        '    MOVE 10 STEPS',
        '  END REPEAT',
        '  TURN 180 DEGREES',
        'END FOR',
        'PRINT ("Misi Selesai!")'
      ]
    },
    rawPseudocode: `Judul
Program Petualangan_Sprite
Deklarasi
var i : integer;
Implementasi
PRINT ("Mulai Petualangan!")
FOR i = 1 TO 3 DO
  REPEAT 10 TIMES
    MOVE 10 STEPS
  END REPEAT
  TURN 180 DEGREES
  REPEAT 10 TIMES
    MOVE 10 STEPS
  END REPEAT
  TURN 180 DEGREES
END FOR
PRINT ("Misi Selesai!")`
  }
];

export const CodeMazeSimulation: React.FC = () => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();

  // 4 Tab Utama Sesuai Permintaan User & Buku Kelas 9:
  // 1. 'buku-pseudocode': Simulasi Buku (Pseudocode + Bahasa Pemrograman Asli Python/Scratch + Hasilnya)
  // 2. 'flowchart-sim': Simulasi Diagram Alir (Flowchart Interaktif & Tracer)
  // 3. 'lembar-latihan': Lembar Kosong Latihan Siswa (Tulis Pseudocode -> Tampil Python & Hasil Jadi)
  // 4. 'pseudocode-maze': Labirin Robot Interaktif
  const [activeSubMode, setActiveSubMode] = useState<
    'buku-pseudocode' | 'flowchart-sim' | 'lembar-latihan' | 'pseudocode-maze'
  >('buku-pseudocode');

  const [showPdfPreviewModal, setShowPdfPreviewModal] = useState(false);

  // =========================================================================
  // STATE TAB 1: SIMULASI BUKU (5 KASUS BUKU KELAS 9)
  // =========================================================================
  const [selectedBookCaseId, setSelectedBookCaseId] = useState<BookCaseStudy['id']>('sekuensial');
  const activeBookCase = useMemo(
    () => BOOK_CASES.find((c) => c.id === selectedBookCaseId) || BOOK_CASES[0],
    [selectedBookCaseId]
  );

  // Parameter interaktif untuk Kasus 1 (Segitiga), Kasus 2 (KTP), Kasus 3 (Loop), Kasus 4 (Robot), Kasus 5 (Scratch)
  const [segitigaAlas, setSegitigaAlas] = useState<number>(12);
  const [segitigaTinggi, setSegitigaTinggi] = useState<number>(8);
  const [ktpUsia, setKtpUsia] = useState<number>(17);
  const [loopCount, setLoopCount] = useState<number>(10);
  const [loopText, setLoopText] = useState<string>('Saya belajar Informatika');

  // State Simulasi Robot Manusia (Kasus 4 Buku)
  const [robotStepIndex, setRobotStepIndex] = useState<number>(-1);
  const [robotHasBugMode, setRobotHasBugMode] = useState<boolean>(false);
  const [analystBugAlert, setAnalystBugAlert] = useState<string | null>(null);

  // State Simulasi Scratch Si Kucing (Kasus 5 Buku)
  const [scratchRunning, setScratchRunning] = useState<boolean>(false);
  const [scratchRound, setScratchRound] = useState<number>(0); // 1..3
  const [scratchCatX, setScratchCatX] = useState<number>(0); // 0..100
  const [scratchCatFacing, setScratchCatFacing] = useState<'right' | 'left'>('right');
  const [scratchSayBubble, setScratchSayBubble] = useState<string>('Klik Bendera Hijau untuk mulai!');
  const [scratchEnergyCollected, setScratchEnergyCollected] = useState<number>(0);

  const runScratchCatSimulation = () => {
    if (scratchRunning) return;
    playClick();
    setScratchRunning(true);
    setScratchRound(1);
    setScratchCatX(0);
    setScratchCatFacing('right');
    setScratchEnergyCollected(0);
    setScratchSayBubble('Mulai Petualangan!');

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step <= 6) {
        // Round 1: go right then left
        if (step <= 3) {
          setScratchCatFacing('right');
          setScratchCatX(step * 33);
          if (step === 3) setScratchEnergyCollected(1);
        } else {
          setScratchCatFacing('left');
          setScratchCatX((6 - step) * 33);
        }
        setScratchRound(1);
      } else if (step <= 12) {
        // Round 2
        const s = step - 6;
        if (s <= 3) {
          setScratchCatFacing('right');
          setScratchCatX(s * 33);
          if (s === 3) setScratchEnergyCollected(2);
        } else {
          setScratchCatFacing('left');
          setScratchCatX((6 - s) * 33);
        }
        setScratchRound(2);
      } else if (step <= 18) {
        // Round 3
        const s = step - 12;
        if (s <= 3) {
          setScratchCatFacing('right');
          setScratchCatX(s * 33);
          if (s === 3) setScratchEnergyCollected(3);
        } else {
          setScratchCatFacing('left');
          setScratchCatX((6 - s) * 33);
        }
        setScratchRound(3);
      } else {
        clearInterval(interval);
        setScratchCatFacing('right');
        setScratchCatX(0);
        setScratchSayBubble('Misi Selesai! ⚡3 Energi Terkumpul!');
        setScratchRunning(false);
        playFanfare();
      }
    }, 320);
  };

  // =========================================================================
  // STATE TAB 2: SIMULASI DIAGRAM ALIR (FLOWCHART INTERAKTIF)
  // =========================================================================
  const [flowchartPreset, setFlowchartPreset] = useState<'sekuensial' | 'percabangan' | 'perulangan'>('sekuensial');
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);
  const [isFlowPlaying, setIsFlowPlaying] = useState<boolean>(false);

  const activeFlowchartSteps = useMemo(() => {
    if (flowchartPreset === 'sekuensial') {
      const hasilLuas = Number((0.5 * segitigaAlas * segitigaTinggi).toFixed(2));
      return [
        {
          id: 'start',
          shape: 'terminator',
          title: 'MULAI (Start)',
          subtitle: 'Simbol Terminator (Oval): Titik awal diagram alir',
          pseudoLine: 'Judul: Program Hitung_Luas_Segitiga',
          pythonLine: '# Program Hitung_Luas_Segitiga dimulai',
          memoryState: 'Memori siap'
        },
        {
          id: 'decl',
          shape: 'preparation',
          title: 'var alas, tinggi, luas : float',
          subtitle: 'Simbol Preparation (Segi Enam): Deklarasi variabel bertipe desimal (float)',
          pseudoLine: 'var alas, tinggi, luas : float;',
          pythonLine: 'alas, tinggi, luas = 0.0, 0.0, 0.0',
          memoryState: 'alas = 0.0 | tinggi = 0.0 | luas = 0.0'
        },
        {
          id: 'input',
          shape: 'io',
          title: `INPUT (alas = ${segitigaAlas}, tinggi = ${segitigaTinggi})`,
          subtitle: 'Simbol Input/Output (Jajar Genjang): Membaca nilai masukan pengguna',
          pseudoLine: 'INPUT (alas) & INPUT (tinggi)',
          pythonLine: `alas = float(input()) # ${segitigaAlas}\ntinggi = float(input()) # ${segitigaTinggi}`,
          memoryState: `alas = ${segitigaAlas} | tinggi = ${segitigaTinggi}`
        },
        {
          id: 'process',
          shape: 'process',
          title: `luas = 0.5 * alas * tinggi`,
          subtitle: 'Simbol Process (Persegi Panjang): Perhitungan aritmatika CPU',
          pseudoLine: 'luas = 0.5 * alas * tinggi',
          pythonLine: `luas = 0.5 * ${segitigaAlas} * ${segitigaTinggi} # ${hasilLuas}`,
          memoryState: `alas = ${segitigaAlas} | tinggi = ${segitigaTinggi} | luas = ${hasilLuas}`
        },
        {
          id: 'output',
          shape: 'io',
          title: `PRINT (luas) ➔ ${hasilLuas}`,
          subtitle: 'Simbol Input/Output (Jajar Genjang): Menampilkan hasil ke layar',
          pseudoLine: 'PRINT (luas)',
          pythonLine: `print(luas) # Output: ${hasilLuas}`,
          memoryState: `Layar menampilkan: ${hasilLuas}`
        },
        {
          id: 'end',
          shape: 'terminator',
          title: 'SELESAI (End)',
          subtitle: 'Simbol Terminator (Oval): Program berhenti',
          pseudoLine: '// Akhir Program',
          pythonLine: '# Eksekusi selesai',
          memoryState: `Status: Sukses (Hasil = ${hasilLuas})`
        }
      ];
    }

    if (flowchartPreset === 'percabangan') {
      const wajib = ktpUsia >= 17;
      return [
        {
          id: 'start',
          shape: 'terminator',
          title: 'MULAI (Start)',
          subtitle: 'Simbol Terminator (Oval): Titik awal program Cek_Syarat_KTP',
          pseudoLine: 'Judul: Program Cek_Syarat_KTP',
          pythonLine: '# Program Cek_Syarat_KTP dimulai',
          memoryState: 'Memori siap'
        },
        {
          id: 'decl',
          shape: 'preparation',
          title: 'var usia : integer',
          subtitle: 'Simbol Preparation (Segi Enam): Deklarasi variabel bilangan bulat',
          pseudoLine: 'var usia : integer;',
          pythonLine: 'usia = 0',
          memoryState: 'usia = 0'
        },
        {
          id: 'input',
          shape: 'io',
          title: `INPUT (usia = ${ktpUsia})`,
          subtitle: 'Simbol Input/Output (Jajar Genjang): Memasukkan data usia warga',
          pseudoLine: 'INPUT (usia)',
          pythonLine: `usia = int(input("Masukkan usia: ")) # ${ktpUsia}`,
          memoryState: `usia = ${ktpUsia}`
        },
        {
          id: 'decision',
          shape: 'decision',
          title: `Apakah usia >= 17 ? (${ktpUsia} >= 17 ➔ ${wajib ? 'YA / TRUE' : 'TIDAK / FALSE'})`,
          subtitle: 'Simbol Decision (Belah Ketupat): Menguji kondisi logika IF',
          pseudoLine: 'IF usia >= 17 THEN ... ELSE ...',
          pythonLine: `if usia >= 17: # Bernilai ${wajib ? 'True' : 'False'}`,
          memoryState: `Evaluasi ${ktpUsia} >= 17 adalah ${wajib ? 'BENAR (Jalur YA)' : 'SALAH (Jalur TIDAK)'}`
        },
        {
          id: 'branch-out',
          shape: 'io',
          title: wajib ? 'PRINT ("Wajib memiliki KTP") [Jalur YA]' : 'PRINT ("Belum wajib memiliki KTP") [Jalur TIDAK]',
          subtitle: wajib
            ? 'Cabang THEN dieksekusi karena kondisi bernilai TRUE'
            : 'Cabang ELSE dieksekusi karena kondisi bernilai FALSE',
          pseudoLine: wajib ? 'PRINT ("Wajib memiliki KTP")' : 'PRINT ("Belum wajib memiliki KTP")',
          pythonLine: wajib ? '    print("Wajib memiliki KTP")' : '    print("Belum wajib memiliki KTP")',
          memoryState: `Output: "${wajib ? 'Wajib memiliki KTP' : 'Belum wajib memiliki KTP'}"`
        },
        {
          id: 'end',
          shape: 'terminator',
          title: 'SELESAI (End)',
          subtitle: 'Simbol Terminator (Oval): Percabangan bertemu kembali di titik akhir',
          pseudoLine: 'ENDIF',
          pythonLine: '# Selesai',
          memoryState: 'Program Berakhir'
        }
      ];
    }

    // Perulangan (Looping)
    return [
      {
        id: 'start',
        shape: 'terminator',
        title: 'MULAI (Start)',
        subtitle: 'Simbol Terminator (Oval): Titik awal Program Perulangan_Teks',
        pseudoLine: 'Judul: Program Perulangan_Teks',
        pythonLine: '# Program Perulangan_Teks',
        memoryState: 'Memori siap'
      },
      {
        id: 'decl',
        shape: 'preparation',
        title: 'var i : integer = 1',
        subtitle: 'Inisialisasi variabel penghitung iterasi (i mulai dari 1)',
        pseudoLine: 'var i : integer;',
        pythonLine: 'for i in range(1, 11):',
        memoryState: 'i = 1, batas = 10'
      },
      {
        id: 'decision',
        shape: 'decision',
        title: `Apakah i <= ${loopCount} ? (Ulangi Selama TRUE)`,
        subtitle: 'Simbol Decision (Belah Ketupat): Mengecek apakah i sudah mencapai batas',
        pseudoLine: `FOR i = 1 TO ${loopCount} DO`,
        pythonLine: `for i in range(1, ${loopCount + 1}):`,
        memoryState: `Selama i <= ${loopCount}, masuk ke blok perintah cetak`
      },
      {
        id: 'output',
        shape: 'io',
        title: `PRINT ("${loopText}")`,
        subtitle: 'Simbol Output (Jajar Genjang): Mencetak teks di setiap putaran ke-i',
        pseudoLine: `  PRINT ("${loopText}")`,
        pythonLine: `    print("${loopText}")`,
        memoryState: `Tercetak sebanyak ${loopCount} kali ke layar`
      },
      {
        id: 'increment',
        shape: 'process',
        title: 'i = i + 1 (Kembali ke Pengujian Kondisi Loop)',
        subtitle: 'Simbol Process: Menaikkan nilai i lalu panah kembali ke Belah Ketupat',
        pseudoLine: 'ENDFOR',
        pythonLine: '# Otomatis lanjut ke nilai i berikutnya',
        memoryState: `i bertambah 1 setiap putaran hingga i = ${loopCount + 1}`
      },
      {
        id: 'end',
        shape: 'terminator',
        title: 'SELESAI (End)',
        subtitle: `Saat i > ${loopCount} (FALSE), keluar dari perulangan menuju Selesai`,
        pseudoLine: '// Loop selesai',
        pythonLine: '# Selesai mencetak seluruh perulangan',
        memoryState: `Total ${loopCount} baris berhasil ditampilkan!`
      }
    ];
  }, [flowchartPreset, segitigaAlas, segitigaTinggi, ktpUsia, loopCount, loopText]);

  useEffect(() => {
    setActiveFlowStep(0);
    setIsFlowPlaying(false);
  }, [flowchartPreset]);

  useEffect(() => {
    if (!isFlowPlaying) return;
    const timer = setTimeout(() => {
      if (activeFlowStep < activeFlowchartSteps.length - 1) {
        setActiveFlowStep((prev) => prev + 1);
      } else {
        setIsFlowPlaying(false);
        playSuccess();
      }
    }, 1100);
    return () => clearTimeout(timer);
  }, [isFlowPlaying, activeFlowStep, activeFlowchartSteps.length]);

  // =========================================================================
  // STATE TAB 3: LEMBAR KOSONG LATIHAN SISWA (PSEUDOCODE -> PYTHON & HASIL)
  // =========================================================================
  const [studentEditorMode, setStudentEditorMode] = useState<'structured' | 'free'>('structured');
  const [studentJudul, setStudentJudul] = useState<string>('Program Hitung_Luas_Segitiga');
  const [studentDeklarasi, setStudentDeklarasi] = useState<string>('var alas, tinggi, luas : float;');
  const [studentImplementasi, setStudentImplementasi] = useState<string>(
    `INPUT (alas)\nINPUT (tinggi)\nluas = 0.5 * alas * tinggi\nPRINT ("Luas Segitiga adalah:")\nPRINT (luas)`
  );
  const [studentFreeCode, setStudentFreeCode] = useState<string>(
    `Judul\nProgram Hitung_Luas_Segitiga\nDeklarasi\nvar alas, tinggi, luas : float;\nImplementasi\nINPUT (alas)\nINPUT (tinggi)\nluas = 0.5 * alas * tinggi\nPRINT ("Luas Segitiga adalah:")\nPRINT (luas)`
  );

  // Nilai input uji coba untuk variabel INPUT(...) yang ditulis siswa
  const [studentInputValues, setStudentInputValues] = useState<Record<string, string>>({
    alas: '10',
    tinggi: '6',
    usia: '17',
    nilai: '85',
    panjang: '8',
    lebar: '5',
    sisi: '4'
  });

  const combinedStudentPseudocode = useMemo(() => {
    if (studentEditorMode === 'free') {
      return studentFreeCode;
    }
    return `Judul\n${studentJudul}\nDeklarasi\n${studentDeklarasi}\nImplementasi\n${studentImplementasi}`;
  }, [studentEditorMode, studentJudul, studentDeklarasi, studentImplementasi, studentFreeCode]);

  const transpiledStudent = useMemo(
    () => compileAndRunStudentPseudocode(combinedStudentPseudocode, studentInputValues),
    [combinedStudentPseudocode, studentInputValues]
  );

  const insertSnippetToStudentEditor = (snippet: string, targetSection: 'deklarasi' | 'implementasi' = 'implementasi') => {
    playClick();
    if (studentEditorMode === 'free') {
      setStudentFreeCode((prev) => (prev.trim() ? `${prev}\n${snippet}` : snippet));
    } else if (targetSection === 'deklarasi') {
      setStudentDeklarasi((prev) => (prev.trim() ? `${prev}\n${snippet}` : snippet));
    } else {
      setStudentImplementasi((prev) => (prev.trim() ? `${prev}\n${snippet}` : snippet));
    }
  };

  const handleClearStudentSheet = () => {
    playClick();
    setStudentJudul('Program Latihan_Mandiri');
    setStudentDeklarasi('var angka1, angka2, hasil : float;');
    setStudentImplementasi('');
    setStudentFreeCode(`Judul\nProgram Latihan_Mandiri\nDeklarasi\nvar angka1, angka2, hasil : float;\nImplementasi\n`);
  };

  const loadTemplateToStudentSheet = (templateId: 'kosong' | 'segitiga' | 'ktp' | 'loop' | 'keliling' | 'kelulusan') => {
    playClick();
    if (templateId === 'kosong') {
      setStudentJudul('Program Karya_Siswa');
      setStudentDeklarasi('var x, y, total : float;');
      setStudentImplementasi('INPUT (x)\nINPUT (y)\ntotal = x + y\nPRINT (total)');
      setStudentFreeCode(
        `Judul\nProgram Karya_Siswa\nDeklarasi\nvar x, y, total : float;\nImplementasi\nINPUT (x)\nINPUT (y)\ntotal = x + y\nPRINT (total)`
      );
      setStudentInputValues((prev) => ({ ...prev, x: '15', y: '25' }));
    } else if (templateId === 'segitiga') {
      setStudentJudul('Program Hitung_Luas_Segitiga');
      setStudentDeklarasi('var alas, tinggi, luas : float;');
      setStudentImplementasi('INPUT (alas)\nINPUT (tinggi)\nluas = 0.5 * alas * tinggi\nPRINT (luas)');
      setStudentFreeCode(BOOK_CASES[0].rawPseudocode);
    } else if (templateId === 'ktp') {
      setStudentJudul('Program Cek_Syarat_KTP');
      setStudentDeklarasi('var usia : integer;');
      setStudentImplementasi(
        'INPUT (usia)\nIF usia >= 17 THEN\n  PRINT ("Wajib memiliki KTP")\nELSE\n  PRINT ("Belum wajib memiliki KTP")\nENDIF'
      );
      setStudentFreeCode(BOOK_CASES[1].rawPseudocode);
    } else if (templateId === 'loop') {
      setStudentJudul('Program Perulangan_Teks');
      setStudentDeklarasi('var i : integer;');
      setStudentImplementasi('FOR i = 1 TO 10 DO\n  PRINT ("Saya belajar Informatika")\nENDFOR');
      setStudentFreeCode(BOOK_CASES[2].rawPseudocode);
    } else if (templateId === 'keliling') {
      setStudentJudul('Program Luas_Persegi_Panjang');
      setStudentDeklarasi('var panjang, lebar, luas : float;');
      setStudentImplementasi('INPUT (panjang)\nINPUT (lebar)\nluas = panjang * lebar\nPRINT ("Luas Persegi Panjang:")\nPRINT (luas)');
      setStudentFreeCode(
        `Judul\nProgram Luas_Persegi_Panjang\nDeklarasi\nvar panjang, lebar, luas : float;\nImplementasi\nINPUT (panjang)\nINPUT (lebar)\nluas = panjang * lebar\nPRINT ("Luas Persegi Panjang:")\nPRINT (luas)`
      );
    } else if (templateId === 'kelulusan') {
      setStudentJudul('Program Cek_Kelulusan_Nilai');
      setStudentDeklarasi('var nilai : integer;');
      setStudentImplementasi(
        'INPUT (nilai)\nIF nilai >= 75 THEN\n  PRINT ("LULUS TUNTAS")\nELSE\n  PRINT ("BELUM TUNTAS / REMIDI")\nENDIF'
      );
      setStudentFreeCode(
        `Judul\nProgram Cek_Kelulusan_Nilai\nDeklarasi\nvar nilai : integer;\nImplementasi\nINPUT (nilai)\nIF nilai >= 75 THEN\n  PRINT ("LULUS TUNTAS")\nELSE\n  PRINT ("BELUM TUNTAS / REMIDI")\nENDIF`
      );
    }
  };

  // =========================================================================
  // STATE TAB 4: LABIRIN ROBOT INTERAKTIF (EXISTING + ENHANCED)
  // =========================================================================
  interface InstructionBlock {
    id: string;
    action: 'MOVE' | 'TURN_RIGHT' | 'TURN_LEFT' | 'COLLECT' | 'IF_OBSTACLE';
    label: string;
    pseudocode: string;
    flowchartSymbol: 'Proses' | 'Keputusan' | 'Aksi';
  }

  const availableInstructions: {
    action: InstructionBlock['action'];
    label: string;
    pseudocode: string;
    flowchart: 'Proses' | 'Keputusan' | 'Aksi';
  }[] = [
    { action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchart: 'Proses' },
    { action: 'TURN_RIGHT', label: 'HADAP_KANAN', pseudocode: 'HADAP_KANAN', flowchart: 'Proses' },
    { action: 'TURN_LEFT', label: 'HADAP_KIRI', pseudocode: 'HADAP_KIRI', flowchart: 'Proses' },
    { action: 'COLLECT', label: 'AMBIL (Buku)', pseudocode: 'AMBIL (Buku)', flowchart: 'Aksi' },
    { action: 'IF_OBSTACLE', label: 'IF Rintangan THEN Belok', pseudocode: 'IF ada_kursi THEN HADAP_KANAN', flowchart: 'Keputusan' }
  ];

  const levels = [
    {
      id: 1,
      title: 'Level 1: Proyek Mini Robot Manusia — Ambil Buku di Meja',
      starPos: { x: 1, y: 1 },
      goalPos: { x: 2, y: 2 },
      obstaclePos: null,
      initialDirection: 'E' as 'N' | 'E' | 'S' | 'W',
      recommendedMaxBlocks: 9,
      hint: 'MAJU(1) -> HADAP_KANAN -> MAJU(1) -> AMBIL(Buku) -> MAJU(1) -> HADAP_KIRI -> MAJU(1)'
    },
    {
      id: 2,
      title: 'Level 2: Menghindari Kursi Rintangan (Debugging Jalur Robot)',
      starPos: { x: 2, y: 0 },
      goalPos: { x: 3, y: 3 },
      obstaclePos: { x: 1, y: 0 },
      initialDirection: 'S' as 'N' | 'E' | 'S' | 'W',
      recommendedMaxBlocks: 10,
      hint: 'Robot menghadap Selatan. Karena di (1,0) ada kursi, jalan memutar lalu ambil buku!'
    }
  ];

  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const currentLevel = levels[currentLevelIdx];

  const [studentProgram, setStudentProgram] = useState<InstructionBlock[]>([
    { id: 'step-1', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
    { id: 'step-2', action: 'TURN_RIGHT', label: 'HADAP_KANAN', pseudocode: 'HADAP_KANAN', flowchartSymbol: 'Proses' },
    { id: 'step-3', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
    { id: 'step-4', action: 'COLLECT', label: 'AMBIL (Buku)', pseudocode: 'AMBIL (Buku)', flowchartSymbol: 'Aksi' }
  ]);

  const [robotPos, setRobotPos] = useState<{ x: number; y: number; dir: 'N' | 'E' | 'S' | 'W' }>({
    x: 0,
    y: 0,
    dir: 'E'
  });
  const [starCollected, setStarCollected] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeExecIdx, setActiveExecIdx] = useState<number | null>(null);
  const [runLog, setRunLog] = useState<string[]>([]);
  const [mazeResult, setMazeResult] = useState<'idle' | 'success' | 'failed' | 'hit_obstacle'>('idle');

  useEffect(() => {
    resetMazeArena();
  }, [currentLevelIdx]);

  const resetMazeArena = () => {
    setRobotPos({ x: 0, y: 0, dir: currentLevel.initialDirection });
    setStarCollected(false);
    setIsExecuting(false);
    setActiveExecIdx(null);
    setMazeResult('idle');
    setRunLog([]);
  };

  const handleAddInstruction = (inst: typeof availableInstructions[0]) => {
    playClick();
    if (isExecuting) return;
    setStudentProgram((prev) => [
      ...prev,
      {
        id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        action: inst.action,
        label: inst.label,
        pseudocode: inst.pseudocode,
        flowchartSymbol: inst.flowchart
      }
    ]);
  };

  const handleRemoveInstruction = (idx: number) => {
    playClick();
    if (isExecuting) return;
    setStudentProgram((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleMoveBlock = (idx: number, dir: -1 | 1) => {
    playClick();
    if (isExecuting) return;
    const target = idx + dir;
    if (target < 0 || target >= studentProgram.length) return;
    const copy = [...studentProgram];
    const temp = copy[idx];
    copy[idx] = copy[target];
    copy[target] = temp;
    setStudentProgram(copy);
  };

  const runStudentAlgorithm = () => {
    if (isExecuting || studentProgram.length === 0) return;
    playClick();
    resetMazeArena();
    setIsExecuting(true);

    let currX = 0;
    let currY = 0;
    let currDir: 'N' | 'E' | 'S' | 'W' = currentLevel.initialDirection;
    let gotStar = false;
    const logs: string[] = ['▶ MULAI: Eksekusi Pseudocode Robot...'];
    setRunLog([...logs]);

    const turnRightMap: Record<'N' | 'E' | 'S' | 'W', 'N' | 'E' | 'S' | 'W'> = { N: 'E', E: 'S', S: 'W', W: 'N' };
    const turnLeftMap: Record<'N' | 'E' | 'S' | 'W', 'N' | 'E' | 'S' | 'W'> = { N: 'W', W: 'S', S: 'E', E: 'N' };

    studentProgram.forEach((block, index) => {
      setTimeout(() => {
        setActiveExecIdx(index);

        if (block.action === 'MOVE') {
          let nextX = currX;
          let nextY = currY;
          if (currDir === 'E') nextX = Math.min(3, currX + 1);
          if (currDir === 'W') nextX = Math.max(0, currX - 1);
          if (currDir === 'S') nextY = Math.min(3, currY + 1);
          if (currDir === 'N') nextY = Math.max(0, currY - 1);

          if (currentLevel.obstaclePos && nextX === currentLevel.obstaclePos.x && nextY === currentLevel.obstaclePos.y) {
            logs.push(`❌ Baris ${index + 1}: BUG! Robot menabrak kursi di (${nextX},${nextY})!`);
            setRunLog([...logs]);
            setMazeResult('hit_obstacle');
            playError();
            return;
          }

          currX = nextX;
          currY = nextY;
          setRobotPos({ x: currX, y: currY, dir: currDir });
          logs.push(`✓ Baris ${index + 1}: MAJU (1) ke petak (${currX}, ${currY})`);
        } else if (block.action === 'TURN_RIGHT') {
          currDir = turnRightMap[currDir];
          setRobotPos({ x: currX, y: currY, dir: currDir });
          logs.push(`↻ Baris ${index + 1}: HADAP_KANAN (Arah: ${currDir})`);
        } else if (block.action === 'TURN_LEFT') {
          currDir = turnLeftMap[currDir];
          setRobotPos({ x: currX, y: currY, dir: currDir });
          logs.push(`↺ Baris ${index + 1}: HADAP_KIRI (Arah: ${currDir})`);
        } else if (block.action === 'COLLECT') {
          if (currX === currentLevel.starPos.x && currY === currentLevel.starPos.y) {
            gotStar = true;
            setStarCollected(true);
            logs.push(`📘 Baris ${index + 1}: AMBIL (Buku) berhasil di meja!`);
            playSuccess();
          } else {
            logs.push(`⚠ Baris ${index + 1}: Tidak ada buku di petak (${currX},${currY})!`);
          }
        } else if (block.action === 'IF_OBSTACLE') {
          let checkX = currX;
          let checkY = currY;
          if (currDir === 'E') checkX += 1;
          if (currDir === 'W') checkX -= 1;
          if (currDir === 'S') checkY += 1;
          if (currDir === 'N') checkY -= 1;

          const hasRockAhead =
            currentLevel.obstaclePos && checkX === currentLevel.obstaclePos.x && checkY === currentLevel.obstaclePos.y;
          if (hasRockAhead) {
            currDir = turnRightMap[currDir];
            setRobotPos({ x: currX, y: currY, dir: currDir });
            logs.push(`🔀 Baris ${index + 1}: Kondisi TRUE (Ada Kursi) -> HADAP_KANAN`);
          } else {
            logs.push(`➡ Baris ${index + 1}: Kondisi FALSE (Jalur Aman) -> Lanjut`);
          }
        }

        setRunLog([...logs]);

        if (index === studentProgram.length - 1) {
          setTimeout(() => {
            setIsExecuting(false);
            setActiveExecIdx(null);
            if (currX === currentLevel.goalPos.x && currY === currentLevel.goalPos.y) {
              setMazeResult('success');
              logs.push(
                gotStar
                  ? '🎉 SEMPURNA! Robot mengambil Buku & menyimpannya di titik akhir!'
                  : '✅ SAMPAI FINISH! Tetapi Buku belum diambil.'
              );
              setRunLog([...logs]);
              playFanfare();
              try {
                confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
              } catch {}
            } else {
              setMazeResult('failed');
              logs.push(
                `❌ BELUM SAMPAI: Robot berhenti di (${currX},${currY}), target SIMPAN di (${currentLevel.goalPos.x},${currentLevel.goalPos.y}).`
              );
              setRunLog([...logs]);
              playError();
            }
          }, 500);
        }
      }, (index + 1) * 650);
    });
  };

  const loadSampleSolution = () => {
    playClick();
    if (currentLevelIdx === 0) {
      setStudentProgram([
        { id: 's1', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's2', action: 'TURN_RIGHT', label: 'HADAP_KANAN', pseudocode: 'HADAP_KANAN', flowchartSymbol: 'Proses' },
        { id: 's3', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's4', action: 'COLLECT', label: 'AMBIL (Buku)', pseudocode: 'AMBIL (Buku)', flowchartSymbol: 'Aksi' },
        { id: 's5', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's6', action: 'TURN_LEFT', label: 'HADAP_KIRI', pseudocode: 'HADAP_KIRI', flowchartSymbol: 'Proses' },
        { id: 's7', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' }
      ]);
    } else {
      setStudentProgram([
        { id: 's1', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's2', action: 'TURN_LEFT', label: 'HADAP_KIRI', pseudocode: 'HADAP_KIRI', flowchartSymbol: 'Proses' },
        { id: 's3', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's4', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's5', action: 'TURN_LEFT', label: 'HADAP_KIRI', pseudocode: 'HADAP_KIRI', flowchartSymbol: 'Proses' },
        { id: 's6', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's7', action: 'COLLECT', label: 'AMBIL (Buku)', pseudocode: 'AMBIL (Buku)', flowchartSymbol: 'Aksi' },
        { id: 's8', action: 'TURN_RIGHT', label: 'HADAP_KANAN', pseudocode: 'HADAP_KANAN', flowchartSymbol: 'Proses' },
        { id: 's9', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's10', action: 'TURN_RIGHT', label: 'HADAP_KANAN', pseudocode: 'HADAP_KANAN', flowchartSymbol: 'Proses' },
        { id: 's11', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's12', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' },
        { id: 's13', action: 'MOVE', label: 'MAJU (1)', pseudocode: 'MAJU (1)', flowchartSymbol: 'Proses' }
      ]);
    }
    resetMazeArena();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-xl overflow-hidden">
      {/* HEADER UTAMA STUDIO DASAR PEMROGRAMAN KELAS 9 */}
      <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 p-5 sm:p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shrink-0">
              <Code2 className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950">
                  Kelas 9 • Dasar Pemrograman (Sesuai Buku)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setShowPdfPreviewModal(true);
                  }}
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-white flex items-center gap-1 transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Lihat Lembar Buku Asli (PDF)</span>
                </button>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight mt-1">
                Laboratorium Pseudocode, Bahasa Pemrograman Python, Flowchart &amp; Scratch
              </h3>
              <p className="text-xs text-indigo-100 mt-0.5">
                Pelajari penulisan Pseudocode terstruktur (Judul, Deklarasi, Implementasi), kode asli Python, Diagram Alir, hingga Lembar Kosong Latihan Siswa.
              </p>
            </div>
          </div>
        </div>

        {/* 4 TAB NAVIGASI UTAMA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/15">
          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveSubMode('buku-pseudocode');
            }}
            className={`px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer text-left ${
              activeSubMode === 'buku-pseudocode'
                ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <div>
              <div className="leading-tight">1. Simulasi Buku &amp; Kode Asli</div>
              <div className="text-[10px] opacity-80 font-medium">Pseudocode ➔ Python / Scratch &amp; Hasil</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveSubMode('flowchart-sim');
            }}
            className={`px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer text-left ${
              activeSubMode === 'flowchart-sim'
                ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <GitBranch className="w-4 h-4 shrink-0" />
            <div>
              <div className="leading-tight">2. Simulasi Diagram Alir</div>
              <div className="text-[10px] opacity-80 font-medium">Flowchart Interaktif &amp; Animasi Alur</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveSubMode('lembar-latihan');
            }}
            className={`px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer text-left ${
              activeSubMode === 'lembar-latihan'
                ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Edit3 className="w-4 h-4 shrink-0" />
            <div>
              <div className="leading-tight">3. Lembar Kosong Latihan</div>
              <div className="text-[10px] opacity-80 font-medium">Tulis Pseudocode ➔ Python &amp; Hasil Jadi</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveSubMode('pseudocode-maze');
            }}
            className={`px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer text-left ${
              activeSubMode === 'pseudocode-maze'
                ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Bot className="w-4 h-4 shrink-0" />
            <div>
              <div className="leading-tight">4. Arena Labirin Robot</div>
              <div className="text-[10px] opacity-80 font-medium">Uji Baris Instruksi Robot di Peta</div>
            </div>
          </button>
        </div>
      </div>

      {/* MODAL PREVIEW PDF BUKU ASLI */}
      {showPdfPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden border border-slate-300 dark:border-slate-700 shadow-2xl">
            <div className="p-4 bg-indigo-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span className="font-black text-sm">
                  Referensi Buku Materi Kelas 9: Penerapan Pseudocode, Unplugged Robot &amp; Scratch
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPdfPreviewModal(false)}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white cursor-pointer"
              >
                Tutup Lembar Buku
              </button>
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-950">
              <iframe
                src="/assets/aistudio/pseuducode_9333764e.pdf"
                title="Buku Materi Pseudocode Kelas 9"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 1: SIMULASI BUKU (PSEUDOCODE + BAHASA ASLI PYTHON/SCRATCH + HASIL) */}
      {/* ===================================================================== */}
      {activeSubMode === 'buku-pseudocode' && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Sub-Navigasi 5 Kasus Buku */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Pilih Materi &amp; Studi Kasus dari Buku Informatika Kelas 9:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {BOOK_CASES.map((bc) => {
                const isSelected = bc.id === selectedBookCaseId;
                return (
                  <button
                    key={bc.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSelectedBookCaseId(bc.id);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/90 dark:bg-indigo-950/60 dark:border-indigo-400 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                      {bc.badge}
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-white mt-1 block leading-snug">
                      {bc.title}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 block">
                      📖 {bc.bookPage}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info Box Kasus Aktif */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-black uppercase">
                  {activeBookCase.badge}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  ({activeBookCase.bookPage})
                </span>
              </div>
              <h4 className="text-base font-black text-slate-900 dark:text-white mt-1">
                {activeBookCase.title} — <span className="font-semibold text-sm text-slate-600 dark:text-slate-300">{activeBookCase.subtitle}</span>
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                <strong>Kasus Buku:</strong> {activeBookCase.caseDescription}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                playClick();
                if (selectedBookCaseId === 'sekuensial') loadTemplateToStudentSheet('segitiga');
                else if (selectedBookCaseId === 'percabangan') loadTemplateToStudentSheet('ktp');
                else if (selectedBookCaseId === 'perulangan') loadTemplateToStudentSheet('loop');
                setActiveSubMode('lembar-latihan');
              }}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Uji &amp; Edit di Lembar Latihan</span>
            </button>
          </div>

          {/* KONTEN 3 KOLOM: 1. PSEUDOCODE BUKU | 2. BAHASA PEMROGRAMAN ASLI (PYTHON/SCRATCH) | 3. INPUT & HASIL EKSEKUSI */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* KOLOM 1: PENULISAN PSEUDOCODE SESUAI STRUKTUR BUKU (4 Kolom) */}
            <div className="lg:col-span-4 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    1. Penulisan Pseudocode (Format Buku)
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                  3 Bagian Utama
                </span>
              </div>

              <div className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs">
                {/* Bagian Judul */}
                <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20">
                  <div className="text-[10px] font-sans font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                    Bagian 1: Judul
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {activeBookCase.pseudocodeStructure.judul}
                  </div>
                </div>

                {/* Bagian Deklarasi */}
                <div className="p-3.5 bg-sky-50/50 dark:bg-sky-950/20">
                  <div className="text-[10px] font-sans font-black uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-1">
                    Bagian 2: Deklarasi (Variabel &amp; Tipe Data)
                  </div>
                  {activeBookCase.pseudocodeStructure.deklarasi.map((d, i) => (
                    <div key={i} className="text-sky-900 dark:text-sky-200 font-semibold">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Bagian Implementasi */}
                <div className="p-3.5 bg-emerald-50/40 dark:bg-emerald-950/20">
                  <div className="text-[10px] font-sans font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1.5">
                    Bagian 3: Implementasi (Langkah Algoritma)
                  </div>
                  <div className="space-y-1">
                    {activeBookCase.pseudocodeStructure.implementasi.map((line, i) => (
                      <div
                        key={i}
                        className="px-2 py-1 rounded bg-white/80 dark:bg-slate-900/80 border border-emerald-200/70 dark:border-emerald-900/50 text-slate-900 dark:text-emerald-100 font-bold"
                      >
                        <span className="text-slate-400 mr-2 select-none">{i + 1}.</span>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM 2: TAMPILAN BAHASA PEMROGRAMAN ASLI (PYTHON & SCRATCH) (4 Kolom) */}
            <div className="lg:col-span-4 rounded-2xl border-2 border-indigo-300 dark:border-indigo-800 bg-slate-950 text-slate-100 overflow-hidden shadow-sm">
              <div className="bg-indigo-950 px-4 py-3 border-b border-indigo-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    2. Bahasa Pemrograman Asli (Python)
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  main.py
                </span>
              </div>

              <div className="p-4 font-mono text-xs space-y-1.5 leading-relaxed overflow-x-auto">
                {selectedBookCaseId === 'sekuensial' && (
                  <>
                    <div className="text-slate-400"># Program Hitung_Luas_Segitiga (Python 3)</div>
                    <div className="text-slate-400"># 1. Input nilai alas dan tinggi bertipe float</div>
                    <div>
                      <span className="text-sky-300">alas</span> = <span className="text-amber-300">float</span>(
                      <span className="text-emerald-300">input</span>(
                      <span className="text-rose-300">"Masukkan alas: "</span>)) <span className="text-slate-500"># {segitigaAlas}</span>
                    </div>
                    <div>
                      <span className="text-sky-300">tinggi</span> = <span className="text-amber-300">float</span>(
                      <span className="text-emerald-300">input</span>(
                      <span className="text-rose-300">"Masukkan tinggi: "</span>)) <span className="text-slate-500"># {segitigaTinggi}</span>
                    </div>
                    <div className="text-slate-400 pt-1"># 2. Proses perhitungan rumus luas</div>
                    <div>
                      <span className="text-sky-300">luas</span> = <span className="text-purple-300">0.5</span> *{' '}
                      <span className="text-sky-300">alas</span> * <span className="text-sky-300">tinggi</span>
                    </div>
                    <div className="text-slate-400 pt-1"># 3. Tampilkan hasil ke layar</div>
                    <div>
                      <span className="text-emerald-300">print</span>(<span className="text-sky-300">luas</span>)
                    </div>
                  </>
                )}

                {selectedBookCaseId === 'percabangan' && (
                  <>
                    <div className="text-slate-400"># Program Cek_Syarat_KTP (Python 3)</div>
                    <div>
                      <span className="text-sky-300">usia</span> = <span className="text-amber-300">int</span>(
                      <span className="text-emerald-300">input</span>(
                      <span className="text-rose-300">"Masukkan usia: "</span>)) <span className="text-slate-500"># {ktpUsia}</span>
                    </div>
                    <div className="pt-1">
                      <span className="text-pink-400 font-bold">if</span> <span className="text-sky-300">usia</span> &gt;={' '}
                      <span className="text-purple-300">17</span>:
                    </div>
                    <div
                      className={`pl-4 py-0.5 rounded ${
                        ktpUsia >= 17 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : 'opacity-50'
                      }`}
                    >
                      <span className="text-emerald-300">print</span>(
                      <span className="text-amber-200">"Wajib memiliki KTP"</span>)
                    </div>
                    <div>
                      <span className="text-pink-400 font-bold">else</span>:
                    </div>
                    <div
                      className={`pl-4 py-0.5 rounded ${
                        ktpUsia < 17 ? 'bg-amber-500/20 border-l-2 border-amber-400' : 'opacity-50'
                      }`}
                    >
                      <span className="text-emerald-300">print</span>(
                      <span className="text-amber-200">"Belum wajib memiliki KTP"</span>)
                    </div>
                  </>
                )}

                {selectedBookCaseId === 'perulangan' && (
                  <>
                    <div className="text-slate-400"># Program Perulangan_Teks (Python 3)</div>
                    <div className="text-slate-400"># Mengulang sebanyak {loopCount} kali (1 s.d {loopCount})</div>
                    <div>
                      <span className="text-pink-400 font-bold">for</span> <span className="text-sky-300">i</span>{' '}
                      <span className="text-pink-400 font-bold">in</span>{' '}
                      <span className="text-emerald-300">range</span>(<span className="text-purple-300">1</span>,{' '}
                      <span className="text-purple-300">{loopCount + 1}</span>):
                    </div>
                    <div className="pl-4 bg-indigo-500/20 border-l-2 border-indigo-400 py-1 rounded">
                      <span className="text-emerald-300">print</span>(
                      <span className="text-amber-200">"{loopText}"</span>)
                    </div>
                  </>
                )}

                {selectedBookCaseId === 'robot-unplugged' && (
                  <>
                    <div className="text-slate-400"># Program Ambil_Buku_Meja (Python Robot API)</div>
                    <div>
                      <span className="text-sky-300">robot</span>.maju(<span className="text-purple-300">5</span>)
                    </div>
                    <div>
                      <span className="text-sky-300">robot</span>.hadap_kiri()
                    </div>
                    <div>
                      <span className="text-sky-300">robot</span>.maju(<span className="text-purple-300">2</span>)
                    </div>
                    <div>
                      <span className="text-sky-300">robot</span>.ambil(<span className="text-amber-200">"Buku"</span>)
                    </div>
                    <div>
                      <span className="text-sky-300">robot</span>.hadap_kanan()
                    </div>
                    <div>
                      <span className="text-sky-300">robot</span>.maju(<span className="text-purple-300">3</span>)
                    </div>
                    <div>
                      <span className="text-sky-300">robot</span>.simpan()
                    </div>
                  </>
                )}

                {selectedBookCaseId === 'scratch-kucing' && (
                  <div className="space-y-2 font-sans">
                    <div className="text-[11px] font-bold text-amber-300 mb-1">
                      Susunan Blok Visual Scratch (Halaman 4 Buku):
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs shadow-xs">
                      🏁 when green flag clicked
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs">
                      🔄 set rotation style [left-right]
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs">
                      💬 say "Mulai Petualangan!" for (2) seconds
                    </div>
                    <div className="p-2 rounded-xl bg-amber-600/90 text-white font-bold text-xs space-y-1.5 border-l-4 border-amber-300">
                      <div>🔁 repeat (3)</div>
                      <div className="p-2 rounded-lg bg-amber-700 space-y-1 ml-2">
                        <div>🔁 repeat (10)</div>
                        <div className="px-2.5 py-1 rounded bg-blue-600 ml-3">➡ move (10) steps</div>
                        <div className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 ml-3">⏱ wait (0.1) seconds</div>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-blue-600 ml-2">↩ turn ↻ (180) degrees</div>
                      <div className="p-2 rounded-lg bg-amber-700 space-y-1 ml-2">
                        <div>🔁 repeat (10)</div>
                        <div className="px-2.5 py-1 rounded bg-blue-600 ml-3">➡ move (10) steps</div>
                        <div className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 ml-3">⏱ wait (0.1) seconds</div>
                      </div>
                      <div className="px-2.5 py-1 rounded bg-blue-600 ml-2">↩ turn ↻ (180) degrees</div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs">
                      💬 say "Misi Selesai!" for (2) seconds
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* KOLOM 3: INPUT INTERAKTIF & HASIL EKSEKUSI PROGRAM (4 Kolom) */}
            <div className="lg:col-span-4 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <div className="bg-emerald-700 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    3. Uji Input &amp; Hasil Eksekusi
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-bold">
                  Live Output
                </span>
              </div>

              <div className="p-4 space-y-4">
                {/* KASUS 1: LUAS SEGITIGA */}
                {selectedBookCaseId === 'sekuensial' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <label className="text-[10px] font-black uppercase text-slate-500 block">
                          INPUT (alas) : float
                        </label>
                        <input
                          type="number"
                          value={segitigaAlas}
                          onChange={(e) => setSegitigaAlas(Number(e.target.value) || 0)}
                          className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-300 font-mono text-sm font-black text-indigo-700 dark:text-indigo-300"
                        />
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <label className="text-[10px] font-black uppercase text-slate-500 block">
                          INPUT (tinggi) : float
                        </label>
                        <input
                          type="number"
                          value={segitigaTinggi}
                          onChange={(e) => setSegitigaTinggi(Number(e.target.value) || 0)}
                          className="w-full mt-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-300 font-mono text-sm font-black text-indigo-700 dark:text-indigo-300"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs space-y-1 border border-slate-800">
                      <div className="text-slate-400 text-[10px]">$ python3 hitung_luas_segitiga.py</div>
                      <div>Masukkan alas: {segitigaAlas}</div>
                      <div>Masukkan tinggi: {segitigaTinggi}</div>
                      <div className="text-amber-300 font-bold pt-1">
                        Proses: luas = 0.5 * {segitigaAlas} * {segitigaTinggi}
                      </div>
                      <div className="text-sm font-black text-white bg-emerald-600/30 border border-emerald-500/50 px-2.5 py-1.5 rounded mt-1">
                        HASIL PRINT (luas) = {Number((0.5 * segitigaAlas * segitigaTinggi).toFixed(2))}
                      </div>
                    </div>
                  </>
                )}

                {/* KASUS 2: CEK SYARAT KTP */}
                {selectedBookCaseId === 'percabangan' && (
                  <>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-slate-700 dark:text-slate-200">
                          INPUT (usia) : integer
                        </label>
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-xs font-black">
                          {ktpUsia} Tahun
                        </span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={30}
                        value={ktpUsia}
                        onChange={(e) => setKtpUsia(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>10 Thn (SMP)</span>
                        <span className="text-emerald-600">17 Thn (Batas KTP)</span>
                        <span>30 Thn</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs space-y-1.5 border border-slate-800">
                      <div className="text-slate-400 text-[10px]">$ python3 cek_syarat_ktp.py</div>
                      <div className="text-sky-300">Masukkan usia: {ktpUsia}</div>
                      <div className="text-slate-300">
                        Uji Kondisi: Apakah {ktpUsia} &gt;= 17 ?{' '}
                        <span className={ktpUsia >= 17 ? 'text-emerald-400 font-black' : 'text-rose-400 font-black'}>
                          {ktpUsia >= 17 ? 'TRUE (Benar)' : 'FALSE (Salah)'}
                        </span>
                      </div>
                      <div
                        className={`p-2.5 rounded-lg font-black text-sm ${
                          ktpUsia >= 17
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        }`}
                      >
                        {ktpUsia >= 17 ? '🪪 Wajib memiliki KTP' : '⏳ Belum wajib memiliki KTP'}
                      </div>
                    </div>
                  </>
                )}

                {/* KASUS 3: PERULANGAN TEKS */}
                {selectedBookCaseId === 'perulangan' && (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <label className="text-[10px] font-black text-slate-500 block">Batas TO (N)</label>
                        <input
                          type="number"
                          min={1}
                          max={20}
                          value={loopCount}
                          onChange={(e) => setLoopCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                          className="w-full mt-1 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-indigo-300 font-mono text-xs font-black"
                        />
                      </div>
                      <div className="col-span-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <label className="text-[10px] font-black text-slate-500 block">Teks PRINT</label>
                        <input
                          type="text"
                          value={loopText}
                          onChange={(e) => setLoopText(e.target.value)}
                          className="w-full mt-1 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-indigo-300 font-mono text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 max-h-48 overflow-y-auto space-y-1">
                      <div className="text-slate-400 text-[10px]">$ python3 perulangan_teks.py</div>
                      {Array.from({ length: loopCount }).map((_, idx) => (
                        <div key={idx} className="text-emerald-400 flex items-center gap-2">
                          <span className="text-slate-500 text-[10px] w-10">[i={idx + 1}]</span>
                          <span>{loopText}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* KASUS 4: UNPLUGGED ROBOT MANUSIA */}
                {selectedBookCaseId === 'robot-unplugged' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800">
                        <strong className="text-indigo-700 dark:text-indigo-300 block">1. Programmer</strong>
                        Menulis Pseudocode
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                        <strong className="text-emerald-700 dark:text-emerald-300 block">2. Robot</strong>
                        Bergerak Kaku Sesuai Kode
                      </div>
                      <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800">
                        <strong className="text-rose-700 dark:text-rose-300 block">3. Analyst</strong>
                        Teriak "BUG!" &amp; Debug
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playClick();
                          setAnalystBugAlert(null);
                          setRobotHasBugMode(false);
                          setRobotStepIndex((prev) => (prev < 6 ? prev + 1 : 0));
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black cursor-pointer"
                      >
                        ▶ Jalankan Langkah Robot ({robotStepIndex + 2 > 7 ? 1 : robotStepIndex + 2}/7)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playError();
                          setRobotHasBugMode(true);
                          setAnalystBugAlert(
                            '🚨 ANALYST TERIAK: "BUG!" — Pada baris ke-2 tertulis HADAP_KANAN padahal meja buku ada di sebelah KIRI! Robot menabrak kursi! Solusi Debugging: Ubah menjadi HADAP_KIRI.'
                          );
                        }}
                        className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
                      >
                        <Bug className="w-3.5 h-3.5" />
                        <span>Simulasi "BUG!"</span>
                      </button>
                    </div>

                    {analystBugAlert ? (
                      <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-950/70 border-2 border-rose-500 text-rose-900 dark:text-rose-200 text-xs font-bold">
                        {analystBugAlert}
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs space-y-1">
                        <div>🤖 Status Robot Manusia:</div>
                        {activeBookCase.pseudocodeStructure.implementasi.map((cmd, idx) => (
                          <div
                            key={idx}
                            className={`px-2 py-0.5 rounded ${
                              idx === robotStepIndex
                                ? 'bg-amber-400 text-slate-950 font-black'
                                : idx < robotStepIndex
                                ? 'text-emerald-400'
                                : 'text-slate-500'
                            }`}
                          >
                            {idx <= robotStepIndex ? '✓ ' : '• '} Baris {idx + 1}: {cmd}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* KASUS 5: SCRATCH PETUALANGAN SPRITE SI KUCING */}
                {selectedBookCaseId === 'scratch-kucing' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={runScratchCatSimulation}
                        disabled={scratchRunning}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Flag className="w-4 h-4 fill-emerald-300" />
                        <span>{scratchRunning ? 'Sprite Berjalan...' : 'Klik Bendera Hijau (Mulai)'}</span>
                      </button>
                      <span className="text-xs font-black text-indigo-700 dark:text-indigo-300">
                        Putaran FOR i = {scratchRound}/3 | ⚡ {scratchEnergyCollected}
                      </span>
                    </div>

                    {/* Panggung Stage Scratch */}
                    <div className="relative h-36 rounded-2xl bg-gradient-to-b from-sky-200 to-emerald-200 dark:from-sky-950 dark:to-emerald-950 border-2 border-slate-300 dark:border-slate-700 overflow-hidden p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[10px] font-black text-slate-700 dark:text-slate-200">
                        <span className="px-2 py-0.5 rounded bg-white/80 dark:bg-slate-900/80">
                          🏠 Titik Aman (Tengah)
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-300 text-slate-950">
                          ⚡ Bola Energi (Tepi Kanan)
                        </span>
                      </div>

                      {/* Speech Bubble */}
                      <div className="mx-auto px-3 py-1 rounded-full bg-white text-slate-900 text-xs font-black shadow-sm border border-slate-300">
                        💬 {scratchSayBubble}
                      </div>

                      {/* Track Kucing */}
                      <div className="relative h-10 flex items-center">
                        <div
                          className="transition-all duration-300 flex items-center gap-1"
                          style={{
                            marginLeft: `${Math.min(78, Math.max(2, scratchCatX * 0.75))}%`,
                            transform: scratchCatFacing === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
                          }}
                        >
                          <span className="text-3xl select-none">🐱</span>
                        </div>
                        <div className="absolute right-2 text-2xl animate-pulse select-none">⚡</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: SIMULASI DIAGRAM ALIR (FLOWCHART INTERAKTIF)                   */}
      {/* ===================================================================== */}
      {activeSubMode === 'flowchart-sim' && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Pilihan Jenis Flowchart & Kontrol Animasi */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-slate-500 mr-1">Pilih Diagram Alir:</span>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setFlowchartPreset('sekuensial');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                  flowchartPreset === 'sekuensial'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                1. Flowchart Sekuensial (Luas Segitiga)
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setFlowchartPreset('percabangan');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                  flowchartPreset === 'percabangan'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                2. Flowchart Percabangan (Cek KTP)
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setFlowchartPreset('perulangan');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                  flowchartPreset === 'perulangan'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                3. Flowchart Perulangan (Loop Teks)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setActiveFlowStep(0);
                  setIsFlowPlaying(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Animasi Alur Otomatis</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsFlowPlaying(false);
                  setActiveFlowStep((prev) => (prev + 1) % activeFlowchartSteps.length);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 cursor-pointer"
              >
                <StepForward className="w-3.5 h-3.5" />
                <span>Langkah ({activeFlowStep + 1}/{activeFlowchartSteps.length})</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* KANVAS DIAGRAM ALIR VISUAL (7 Kolom) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex flex-col items-center space-y-2">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Visualisasi Simbol Standar Diagram Alir (Flowchart)
                </span>
                <span className="text-[11px] text-slate-500">Klik simbol untuk melompat ke langkah tersebut</span>
              </div>

              {activeFlowchartSteps.map((node, index) => {
                const isActive = index === activeFlowStep;
                const isPassed = index < activeFlowStep;

                // Bentuk simbol flowchart standar
                let shapeClasses = 'rounded-xl';
                let badgeShape = 'Persegi Panjang (Proses)';
                if (node.shape === 'terminator') {
                  shapeClasses = 'rounded-full px-8';
                  badgeShape = 'Oval / Terminator';
                } else if (node.shape === 'io') {
                  shapeClasses = '-skew-x-12 rounded-lg';
                  badgeShape = 'Jajar Genjang (Input/Output)';
                } else if (node.shape === 'decision') {
                  shapeClasses = 'rounded-2xl border-dashed';
                  badgeShape = 'Belah Ketupat (Keputusan IF/FOR)';
                } else if (node.shape === 'preparation') {
                  shapeClasses = 'rounded-tr-2xl rounded-bl-2xl';
                  badgeShape = 'Segi Enam (Preparation / Deklarasi)';
                }

                return (
                  <React.Fragment key={node.id}>
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setIsFlowPlaying(false);
                        setActiveFlowStep(index);
                      }}
                      className={`w-full max-w-md p-3.5 border-2 transition-all cursor-pointer text-center relative ${shapeClasses} ${
                        isActive
                          ? 'border-amber-500 bg-amber-100 dark:bg-amber-950/80 text-slate-950 dark:text-white shadow-lg scale-[1.03] ring-4 ring-amber-400/30'
                          : isPassed
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className={node.shape === 'io' ? 'skew-x-12' : ''}>
                        <div className="text-[10px] font-black uppercase tracking-wider opacity-75">
                          [{index + 1}] {badgeShape}
                        </div>
                        <div className="text-xs sm:text-sm font-black mt-0.5 font-mono">{node.title}</div>
                      </div>
                    </button>

                    {index < activeFlowchartSteps.length - 1 && (
                      <div className="flex flex-col items-center py-0.5">
                        <ArrowDown
                          className={`w-5 h-5 ${
                            isActive || isPassed ? 'text-emerald-500 animate-bounce' : 'text-slate-400'
                          }`}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* PANEL INSPEKTOR SINKRONISASI FLOWCHART <-> PSEUDOCODE <-> PYTHON (5 Kolom) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white text-xs font-black">
                    Langkah Aktif #{activeFlowStep + 1} dari {activeFlowchartSteps.length}
                  </span>
                  {flowchartPreset === 'percabangan' && (
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <span>Ubah Usia:</span>
                      <input
                        type="number"
                        value={ktpUsia}
                        onChange={(e) => setKtpUsia(Number(e.target.value) || 0)}
                        className="w-16 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-indigo-400 font-mono text-center font-black"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    {activeFlowchartSteps[activeFlowStep]?.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {activeFlowchartSteps[activeFlowStep]?.subtitle}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">
                      Baris Pseudocode yang Sesuai:
                    </div>
                    <div className="font-mono text-xs font-bold text-slate-900 dark:text-white mt-1">
                      {activeFlowchartSteps[activeFlowStep]?.pseudoLine}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800">
                    <div className="text-[10px] font-black uppercase text-indigo-400">
                      Kode Bahasa Python Asli:
                    </div>
                    <pre className="font-mono text-xs font-bold mt-1 whitespace-pre-wrap">
                      {activeFlowchartSteps[activeFlowStep]?.pythonLine}
                    </pre>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">
                      Kondisi Memori &amp; Variabel Saat Ini:
                    </div>
                    <div className="font-mono text-xs font-bold text-emerald-950 dark:text-emerald-200 mt-1">
                      {activeFlowchartSteps[activeFlowStep]?.memoryState}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabel Keterangan Simbol Standar Flowchart */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Kamus Simbol Standar Diagram Alir (Flowchart):
                </h5>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-bold text-[10px]">
                      Oval
                    </span>
                    <span>
                      <strong>Terminator:</strong> Menandai awal (MULAI) dan akhir (SELESAI) program.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold text-[10px]">
                      Segi Enam
                    </span>
                    <span>
                      <strong>Preparation:</strong> Deklarasi variabel &amp; pemberian nilai awal.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 -skew-x-12 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                      Jajar Genjang
                    </span>
                    <span>
                      <strong>Input / Output:</strong> Perintah <code>INPUT(...)</code> dan <code>PRINT(...)</code>.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold text-[10px]">
                      Persegi Panjang
                    </span>
                    <span>
                      <strong>Process:</strong> Perhitungan rumus matematika (misal: <code>luas = 0.5 * a * t</code>).
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded border border-dashed border-rose-500 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                      Belah Ketupat
                    </span>
                    <span>
                      <strong>Decision:</strong> Pengujian kondisi <code>IF ... THEN ... ELSE</code> atau <code>FOR</code>.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: LEMBAR KOSONG LATIHAN SISWA (PSEUDOCODE -> PYTHON & HASIL JADI) */}
      {/* ===================================================================== */}
      {activeSubMode === 'lembar-latihan' && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Top Bar Template & Mode Lembar Latihan */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-indigo-50 to-sky-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border border-indigo-200 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-600 text-white">
                Workspace Latihan Mandiri Siswa
              </span>
              <h4 className="text-base font-black text-slate-900 dark:text-white mt-1">
                Lembar Kosong Latihan Menulis Pseudocode ➔ Otomatis Jadi Bahasa Python &amp; Hasil Eksekusi
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Ketik sendiri pseudocode-mu (atau klik tombol kata kunci di bawah), lalu lihat terjemahan Bahasa Python asli dan hasil jadinya secara langsung!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleClearStudentSheet}
                className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Kosongkan Lembar</span>
              </button>
              <button
                type="button"
                onClick={() => loadTemplateToStudentSheet('segitiga')}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:border-indigo-500 cursor-pointer"
              >
                Contoh: Luas Segitiga
              </button>
              <button
                type="button"
                onClick={() => loadTemplateToStudentSheet('ktp')}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:border-indigo-500 cursor-pointer"
              >
                Contoh: Syarat KTP
              </button>
              <button
                type="button"
                onClick={() => loadTemplateToStudentSheet('kelulusan')}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:border-indigo-500 cursor-pointer"
              >
                Latihan: Cek Kelulusan
              </button>
              <button
                type="button"
                onClick={() => loadTemplateToStudentSheet('loop')}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:border-indigo-500 cursor-pointer"
              >
                Contoh: Loop 10x
              </button>
            </div>
          </div>

          {/* TOMBOL BANTU CEPAT SINTAKS PSEUDOCODE (RAMAH LAYAR SENTUH / IFP) */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                ⚡ Tombol Sisipkan Cepat Kata Kunci Pseudocode (Klik untuk menambahkan ke lembar):
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStudentEditorMode('structured')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer ${
                    studentEditorMode === 'structured'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Mode 3 Kotak Buku
                </button>
                <button
                  type="button"
                  onClick={() => setStudentEditorMode('free')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer ${
                    studentEditorMode === 'free'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Mode Lembar Bebas
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => insertSnippetToStudentEditor('var x, y, hasil : float;', 'deklarasi')}
                className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold cursor-pointer"
              >
                + var x, y : float;
              </button>
              <button
                type="button"
                onClick={() => insertSnippetToStudentEditor('INPUT (alas)', 'implementasi')}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold cursor-pointer"
              >
                + INPUT (variabel)
              </button>
              <button
                type="button"
                onClick={() => insertSnippetToStudentEditor('luas = 0.5 * alas * tinggi', 'implementasi')}
                className="px-2.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold cursor-pointer"
              >
                + Rumus Hitung (=)
              </button>
              <button
                type="button"
                onClick={() => insertSnippetToStudentEditor('PRINT (luas)', 'implementasi')}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold cursor-pointer"
              >
                + PRINT (hasil)
              </button>
              <button
                type="button"
                onClick={() =>
                  insertSnippetToStudentEditor(
                    'IF nilai >= 75 THEN\n  PRINT ("Lulus")\nELSE\n  PRINT ("Remidi")\nENDIF',
                    'implementasi'
                  )
                }
                className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-black cursor-pointer"
              >
                + IF ... THEN ... ELSE ... ENDIF
              </button>
              <button
                type="button"
                onClick={() =>
                  insertSnippetToStudentEditor(
                    'FOR i = 1 TO 5 DO\n  PRINT ("Belajar Coding")\nENDFOR',
                    'implementasi'
                  )
                }
                className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold cursor-pointer"
              >
                + FOR i = 1 TO 5 DO ... ENDFOR
              </button>
            </div>
          </div>

          {/* 3 PANEL UTAMA LEMBAR LATIHAN: 1. EDITOR PSEUDOCODE SISWA | 2. KODE BAHASA PYTHON ASLI | 3. HASIL JADI & UJI INPUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* PANEL 1: LEMBAR TULIS PSEUDOCODE SISWA (5 Kolom) */}
            <div className="lg:col-span-5 rounded-2xl border-2 border-indigo-400 dark:border-indigo-700 bg-white dark:bg-slate-900 overflow-hidden shadow-md">
              <div className="bg-indigo-700 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    1. Lembar Tulis Pseudocode Siswa
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-bold">
                  Ketik di Sini
                </span>
              </div>

              {studentEditorMode === 'structured' ? (
                <div className="p-4 space-y-3.5">
                  {/* Kotak 1: Judul */}
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                      Judul Program (Tanpa Spasi / Gunakan Underscore _):
                    </label>
                    <input
                      type="text"
                      value={studentJudul}
                      onChange={(e) => setStudentJudul(e.target.value)}
                      placeholder="Contoh: Program Hitung_Luas_Segitiga"
                      className="w-full px-3 py-2 rounded-xl bg-amber-50/60 dark:bg-slate-950 border border-amber-300 dark:border-amber-800 font-mono text-xs font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Kotak 2: Deklarasi */}
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-400 block mb-1">
                      Deklarasi Variabel &amp; Tipe Data (integer / float / string):
                    </label>
                    <textarea
                      rows={2}
                      value={studentDeklarasi}
                      onChange={(e) => setStudentDeklarasi(e.target.value)}
                      placeholder="Contoh: var alas, tinggi, luas : float;"
                      className="w-full px-3 py-2 rounded-xl bg-sky-50/60 dark:bg-slate-950 border border-sky-300 dark:border-sky-800 font-mono text-xs font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Kotak 3: Implementasi */}
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                      Implementasi Algoritma (INPUT, Proses Hitung, IF/FOR, PRINT):
                    </label>
                    <textarea
                      rows={8}
                      value={studentImplementasi}
                      onChange={(e) => setStudentImplementasi(e.target.value)}
                      placeholder={`INPUT (alas)\nINPUT (tinggi)\nluas = 0.5 * alas * tinggi\nPRINT (luas)`}
                      className="w-full px-3 py-2.5 rounded-xl bg-emerald-50/40 dark:bg-slate-950 border-2 border-emerald-300 dark:border-emerald-800 font-mono text-xs font-bold text-slate-900 dark:text-white leading-relaxed"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <label className="text-[11px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-1.5">
                    Lembar Kosong Bebas (Tulis Judul, Deklarasi, dan Implementasi):
                  </label>
                  <textarea
                    rows={14}
                    value={studentFreeCode}
                    onChange={(e) => setStudentFreeCode(e.target.value)}
                    placeholder={`Judul\nProgram Latihan_Siswa\nDeklarasi\nvar a, b, hasil : float;\nImplementasi\nINPUT (a)\nINPUT (b)\nhasil = a * b\nPRINT (hasil)`}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-indigo-300 dark:border-indigo-800 font-mono text-xs font-bold text-slate-900 dark:text-white leading-relaxed"
                  />
                </div>
              )}
            </div>

            {/* PANEL 2: HASIL KONVERSI BAHASA PYTHON ASLI (3 Kolom) */}
            <div className="lg:col-span-3 rounded-2xl border-2 border-slate-700 bg-slate-950 text-slate-100 overflow-hidden shadow-md">
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    2. Kode Bahasa Python
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                  Auto-Python
                </span>
              </div>

              <div className="p-4">
                <pre className="font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {transpiledStudent.pythonCode}
                </pre>
              </div>
            </div>

            {/* PANEL 3: INPUT UJI COBA & HASIL JADINYA (4 Kolom) */}
            <div className="lg:col-span-4 rounded-2xl border-2 border-emerald-400 dark:border-emerald-700 bg-white dark:bg-slate-900 overflow-hidden shadow-md">
              <div className="bg-emerald-700 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    3. Hasil Jadi Program Python
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-bold">
                  Output Nyata
                </span>
              </div>

              <div className="p-4 space-y-4">
                {/* Kotak Input Variabel Otomatis jika ada perintah INPUT(...) */}
                {transpiledStudent.detectedInputs.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-2">
                    <div className="text-[11px] font-black uppercase text-amber-800 dark:text-amber-300">
                      ⌨ Masukkan Nilai Uji untuk Perintah INPUT():
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {transpiledStudent.detectedInputs.map((inp) => (
                        <div key={inp.name}>
                          <label className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 block">
                            INPUT ({inp.name}) :
                          </label>
                          <input
                            type="text"
                            value={studentInputValues[inp.name] ?? '10'}
                            onChange={(e) =>
                              setStudentInputValues((prev) => ({
                                ...prev,
                                [inp.name]: e.target.value
                              }))
                            }
                            className="w-full mt-0.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-amber-400 font-mono text-xs font-black text-slate-900 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layar Terminal Hasil Eksekusi */}
                <div className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs border border-slate-800 space-y-1.5 min-h-[140px]">
                  <div className="text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                    $ python3 {transpiledStudent.programName.toLowerCase()}.py
                  </div>

                  {transpiledStudent.errorMessage ? (
                    <div className="text-rose-400 font-bold">
                      ⚠ Error: {transpiledStudent.errorMessage}
                    </div>
                  ) : transpiledStudent.outputLines.length === 0 ? (
                    <div className="text-slate-400 italic">
                      Tambahkan perintah PRINT(...) pada pseudocode untuk menampilkan hasil ke layar.
                    </div>
                  ) : (
                    transpiledStudent.outputLines.map((line, i) => (
                      <div
                        key={i}
                        className={
                          line.startsWith('>')
                            ? 'text-sky-300'
                            : 'text-emerald-300 font-bold bg-emerald-950/50 px-2 py-0.5 rounded'
                        }
                      >
                        {line}
                      </div>
                    ))
                  )}
                </div>

                {/* Status Akhir Variabel di Memori */}
                {Object.keys(transpiledStudent.finalVariables).length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] font-black uppercase text-slate-500 mb-1.5">
                      📦 Nilai Akhir Variabel di Memori Komputer:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(transpiledStudent.finalVariables).map(([k, v]) => (
                        <span
                          key={k}
                          className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-mono text-xs font-black"
                        >
                          {k} = {String(v)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mini Flowchart Otomatis dari Pseudocode Siswa */}
                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50">
                  <div className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-300 mb-2">
                    🔄 Alur Diagram Alir (Flowchart) dari Pseudocode-mu:
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {transpiledStudent.flowchartNodes.map((fn, idx) => (
                      <React.Fragment key={fn.id}>
                        <span
                          className={`px-2 py-1 text-[10px] font-mono font-bold border ${
                            fn.type === 'start' || fn.type === 'end'
                              ? 'rounded-full bg-slate-800 text-white border-slate-700'
                              : fn.type === 'input' || fn.type === 'output'
                              ? 'rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300'
                              : fn.type === 'decision' || fn.type === 'loop'
                              ? 'rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-300'
                              : 'rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300'
                          }`}
                        >
                          {fn.label}
                        </span>
                        {idx < transpiledStudent.flowchartNodes.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: ARENA LABIRIN ROBOT MANUSIA (EXISTING ENHANCED)                */}
      {/* ===================================================================== */}
      {activeSubMode === 'pseudocode-maze' && (
        <div className="p-5 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-indigo-50/70 dark:bg-indigo-950/30 p-4 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/50">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Pilih Misi Simulasi Robot:
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                {currentLevel.title}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              {levels.map((lvl, idx) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => {
                    playClick();
                    setCurrentLevelIdx(idx);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    currentLevelIdx === idx
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Level {lvl.id}
                </button>
              ))}
              <button
                type="button"
                onClick={loadSampleSolution}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-200 transition-all cursor-pointer"
              >
                💡 Contoh Solusi
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-amber-400" />
                    Peta Kelas 4x4 (0,0 s/d 3,3)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px]">
                    Posisi: ({robotPos.x},{robotPos.y}) • Arah: {robotPos.dir}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 aspect-square max-w-[300px] mx-auto bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  {Array.from({ length: 16 }).map((_, cellIdx) => {
                    const x = cellIdx % 4;
                    const y = Math.floor(cellIdx / 4);
                    const isRobotHere = robotPos.x === x && robotPos.y === y;
                    const isStarHere = currentLevel.starPos.x === x && currentLevel.starPos.y === y && !starCollected;
                    const isGoalHere = currentLevel.goalPos.x === x && currentLevel.goalPos.y === y;
                    const isObstacleHere =
                      currentLevel.obstaclePos && currentLevel.obstaclePos.x === x && currentLevel.obstaclePos.y === y;

                    return (
                      <div
                        key={cellIdx}
                        className={`relative rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isRobotHere
                            ? 'bg-indigo-600/40 border-indigo-400 ring-2 ring-indigo-400/50'
                            : isGoalHere
                            ? 'bg-emerald-950/60 border-emerald-500/60'
                            : isObstacleHere
                            ? 'bg-rose-950/60 border-rose-700/60'
                            : 'bg-slate-900 border-slate-800'
                        }`}
                      >
                        <span className="absolute top-1 left-1.5 text-[9px] font-mono text-slate-500">
                          {x},{y}
                        </span>

                        {isObstacleHere && <span className="text-xl">🪑</span>}
                        {isStarHere && <span className="text-xl animate-bounce">📘</span>}
                        {isGoalHere && !isRobotHere && <span className="text-xl">📥</span>}

                        {isRobotHere && (
                          <div className="flex flex-col items-center">
                            <Bot className="w-7 h-7 text-amber-300" />
                            <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-1 rounded mt-0.5">
                              {robotPos.dir === 'E'
                                ? '→'
                                : robotPos.dir === 'S'
                                ? '↓'
                                : robotPos.dir === 'W'
                                ? '←'
                                : '↑'}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={runStudentAlgorithm}
                    disabled={isExecuting || studentProgram.length === 0}
                    className="flex-1 py-2.5 px-4 rounded-xl font-black text-xs bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>{isExecuting ? 'Mengeksekusi...' : 'Jalankan Pseudocode'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      resetMazeArena();
                    }}
                    className="py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2.5">
                <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider block">
                  1. Klik Kosa Kata Instruksi Buku untuk Ditambahkan:
                </span>
                <div className="flex flex-wrap gap-2">
                  {availableInstructions.map((inst, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddInstruction(inst)}
                      disabled={isExecuting}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 hover:border-indigo-500 text-slate-800 dark:text-slate-100 flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{inst.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                    2. Susunan Pseudocode Robot ({studentProgram.length} Baris)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setStudentProgram([]);
                      resetMazeArena();
                    }}
                    className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Hapus Semua
                  </button>
                </div>

                <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1">
                  {studentProgram.map((blk, idx) => (
                    <div
                      key={blk.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                        activeExecIdx === idx
                          ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-500 ring-2 ring-amber-400'
                          : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono text-xs font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-mono font-black text-slate-800 dark:text-slate-100">
                          {blk.pseudocode}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveBlock(idx, -1)}
                          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveBlock(idx, 1)}
                          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveInstruction(idx)}
                          className="p-1 rounded hover:bg-rose-100 text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {runLog.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] space-y-1 max-h-32 overflow-y-auto">
                    {runLog.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
