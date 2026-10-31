import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  FileSpreadsheet,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Hash,
  Lightbulb,
  Plus,
  Trash2,
  Edit3,
  Calculator,
  Table,
  Check,
  AlertCircle,
  Store,
  GraduationCap,
  BarChart3,
  ArrowRight,
  Award,
  Zap,
  Copy,
  Layers,
  X,
  TrendingUp,
  Info
} from 'lucide-react';

interface SpreadsheetSimulationProps {
  topicTitle: string;
}

export interface TableRowData {
  row: number;
  colA: string;
  colB: string;
  colC: number;
  colD: number;
  colEFormula?: string;
}

export interface FormulaResult {
  result: string | number;
  type: 'currency' | 'number' | 'text' | 'boolean';
  explanation: string;
  referencedCells: string[];
  error?: string;
  calcSteps?: string[];
}

export const SpreadsheetSimulation: React.FC<SpreadsheetSimulationProps> = ({ topicTitle }) => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();

  // Mode dataset: 'koperasi' | 'nilai'
  const [activeSheet, setActiveSheet] = useState<'koperasi' | 'nilai'>('koperasi');

  // Mode View: 'sheet' | 'tantangan' | 'grafik'
  const [activeTab, setActiveTab] = useState<'sheet' | 'tantangan' | 'grafik'>('sheet');

  // Initial datasets
  const initialKoperasiData: TableRowData[] = [
    { row: 2, colA: 'BRG-01', colB: 'Buku Tulis SPENMAKRO', colC: 4000, colD: 5 },
    { row: 3, colA: 'BRG-02', colB: 'Penggaris Segitiga', colC: 2500, colD: 8 },
    { row: 4, colA: 'BRG-03', colB: 'Pulpen Gel Biru', colC: 3000, colD: 10 },
    { row: 5, colA: 'BRG-04', colB: 'Penghapus Pensil', colC: 1500, colD: 4 },
    { row: 6, colA: 'BRG-05', colB: 'Pensil 2B Ujian', colC: 2000, colD: 12 }
  ];

  const initialNilaiData: TableRowData[] = [
    { row: 2, colA: 'NIS-01', colB: 'Ahmad Faris', colC: 85, colD: 78 },
    { row: 3, colA: 'NIS-02', colB: 'Dinda Kirana', colC: 92, colD: 90 },
    { row: 4, colA: 'NIS-03', colB: 'Bagas Pratama', colC: 70, colD: 68 },
    { row: 5, colA: 'NIS-04', colB: 'Siti Rahmawati', colC: 88, colD: 84 },
    { row: 6, colA: 'NIS-05', colB: 'Rizky Ananda', colC: 65, colD: 72 }
  ];

  const [tableData, setTableData] = useState<TableRowData[]>(initialKoperasiData);

  // Selected cell state
  const [selectedCell, setSelectedCell] = useState<{ col: 'A' | 'B' | 'C' | 'D' | 'E'; row: number }>({
    col: 'C',
    row: 2
  });

  // Current formula typed by user in fx bar
  const [formulaInput, setFormulaInput] = useState<string>('=SUM(C2:C6)');

  // Selected cell inline editor state
  const [editingCellTarget, setEditingCellTarget] = useState<{ col: 'A' | 'B' | 'C' | 'D'; row: number } | null>(null);
  const [inlineEditValue, setInlineEditValue] = useState<string>('');
  const inlineInputRef = useRef<HTMLInputElement>(null);

  // Completed challenges tracker
  const [completedMissions, setCompletedMissions] = useState<Record<number, boolean>>({});

  // Sheet column configurations
  const sheetConfig = activeSheet === 'koperasi'
    ? {
        title: 'Koperasi Siswa SMPN 5 Kroya (Data Barang & Penjualan)',
        colAHeader: 'A (Kode)',
        colBHeader: 'B (Nama Barang)',
        colCHeader: 'C (Harga Satuan Rp)',
        colDHeader: 'D (Jumlah Stok)',
        colEHeader: 'E (Subtotal =C*D)',
        isCurrencyC: true,
        unitD: 'pcs',
        defaultFormula: '=SUM(C2:C6)',
        chartLabel: 'Harga Barang (Rp)',
        chartUnit: 'Rp'
      }
    : {
        title: 'Daftar Nilai Siswa Kelas 7 / 8 (Rapor Informatika)',
        colAHeader: 'A (NISN)',
        colBHeader: 'B (Nama Siswa)',
        colCHeader: 'C (Nilai Tugas)',
        colDHeader: 'D (Nilai UTS)',
        colEHeader: 'E (Rata-Rata =(C+D)/2)',
        isCurrencyC: false,
        unitD: 'poin',
        defaultFormula: '=AVERAGE(C2:C6)',
        chartLabel: 'Nilai Rata-Rata',
        chartUnit: 'poin'
      };

  // Convert tableData to key-value grid map (e.g. { A2: 'BRG-01', C2: 4000, ... })
  const gridMap = useMemo(() => {
    const map: Record<string, string | number> = {};
    tableData.forEach((row) => {
      map[`A${row.row}`] = row.colA;
      map[`B${row.row}`] = row.colB;
      map[`C${row.row}`] = row.colC;
      map[`D${row.row}`] = row.colD;
      map[`E${row.row}`] = activeSheet === 'koperasi'
        ? row.colC * row.colD
        : Math.round(((row.colC + row.colD) / 2) * 10) / 10;
    });
    return map;
  }, [tableData, activeSheet]);

  // Focus inline input when active
  useEffect(() => {
    if (editingCellTarget && inlineInputRef.current) {
      inlineInputRef.current.focus();
      inlineInputRef.current.select();
    }
  }, [editingCellTarget]);

  // Helper function to resolve cell or range into list of cell keys
  const expandRangeOrCells = (expr: string): string[] => {
    const tokens = expr.split(/[,;]/).map((t) => t.trim().toUpperCase());
    const result: string[] = [];

    tokens.forEach((token) => {
      const rangeMatch = token.match(/^([A-E])([0-9]+)\s*:\s*([A-E])([0-9]+)$/);
      if (rangeMatch) {
        const startCol = rangeMatch[1].charCodeAt(0);
        const startRow = parseInt(rangeMatch[2], 10);
        const endCol = rangeMatch[3].charCodeAt(0);
        const endRow = parseInt(rangeMatch[4], 10);

        const colMin = Math.min(startCol, endCol);
        const colMax = Math.max(startCol, endCol);
        const rowMin = Math.min(startRow, endRow);
        const rowMax = Math.max(startRow, endRow);

        for (let c = colMin; c <= colMax; c++) {
          const colLetter = String.fromCharCode(c);
          for (let r = rowMin; r <= rowMax; r++) {
            result.push(`${colLetter}${r}`);
          }
        }
      } else if (/^[A-E][0-9]+$/.test(token)) {
        result.push(token);
      }
    });

    return result;
  };

  // Advanced & Tolerant Formula Parser and Evaluator
  const evaluation = useMemo<FormulaResult>(() => {
    const raw = formulaInput.trim();
    if (!raw) {
      return {
        result: '-',
        type: 'text',
        explanation: 'Silakan ketik formula spreadsheet di bilah rumus di atas atau klik salah satu tombol rumus cepat.',
        referencedCells: []
      };
    }

    if (!raw.startsWith('=')) {
      return {
        result: raw,
        type: 'text',
        explanation: 'Catatan penting: Di Google Sheets, teks atau angka yang tidak diawali tanda sama dengan (=) dianggap sebagai data statis biasa, bukan rumus komputasi.',
        referencedCells: []
      };
    }

    const clean = raw.substring(1).trim();

    // 1. IF Formula: e.g. =IF(kondisi, jika_benar, jika_salah)
    const ifMatch = clean.match(/^IF\s*\(([\s\S]*)\)$/i);
    if (ifMatch) {
      const inner = ifMatch[1].trim();
      // Split by comma or semicolon outside quotes
      const parts: string[] = [];
      let cur = '';
      let inQuote = false;
      for (let i = 0; i < inner.length; i++) {
        const ch = inner[i];
        if (ch === '"' || ch === "'") {
          inQuote = !inQuote;
          cur += ch;
        } else if ((ch === ';' || ch === ',') && !inQuote) {
          parts.push(cur.trim());
          cur = '';
        } else {
          cur += ch;
        }
      }
      if (cur) parts.push(cur.trim());

      if (parts.length < 3) {
        return {
          result: '#ERROR!',
          type: 'text',
          explanation: 'Rumus IF memerlukan 3 parameter: =IF(kondisi, "NilaiJikaBenar", "NilaiJikaSalah"). Contoh: =IF(C2>=75, "Tuntas", "Remidi")',
          referencedCells: [],
          error: 'Parameter IF belum lengkap'
        };
      }

      const condExpr = parts[0];
      const trueVal = parts[1].replace(/^["']|["']$/g, '');
      const falseVal = parts[2].replace(/^["']|["']$/g, '');

      // Parse comparison: Cell Op Target (e.g. C2 >= 75 or D2 < 5 or C2 == D2)
      const compMatch = condExpr.match(/([A-E][0-9]+)\s*(>=|<=|>|<|==|=|!=|<>)\s*([A-E][0-9]+|[0-9.]+|["'][^"']+["'])/i);
      if (!compMatch) {
        return {
          result: '#VALUE!',
          type: 'text',
          explanation: `Kondisi perbandingan "${condExpr}" tidak dikenali. Gunakan contoh: C2>=75 atau D2<5.`,
          referencedCells: [],
          error: 'Format kondisi perbandingan keliru'
        };
      }

      const leftKey = compMatch[1].toUpperCase();
      const op = compMatch[2] === '=' ? '==' : compMatch[2] === '<>' ? '!=' : compMatch[2];
      const rawRight = compMatch[3].replace(/^["']|["']$/g, '');
      const isRightCell = /^[A-E][0-9]+$/i.test(rawRight);
      const rightKey = isRightCell ? rawRight.toUpperCase() : '';

      const leftVal = gridMap[leftKey] !== undefined ? gridMap[leftKey] : 0;
      const rightVal = isRightCell ? (gridMap[rightKey] !== undefined ? gridMap[rightKey] : 0) : rawRight;

      const numLeft = typeof leftVal === 'number' ? leftVal : parseFloat(String(leftVal));
      const numRight = typeof rightVal === 'number' ? rightVal : parseFloat(String(rightVal));

      let isTrue = false;
      if (!isNaN(numLeft) && !isNaN(numRight)) {
        if (op === '>=') isTrue = numLeft >= numRight;
        else if (op === '<=') isTrue = numLeft <= numRight;
        else if (op === '>') isTrue = numLeft > numRight;
        else if (op === '<') isTrue = numLeft < numRight;
        else if (op === '==' || op === '=') isTrue = numLeft === numRight;
        else if (op === '!=' || op === '<>') isTrue = numLeft !== numRight;
      } else {
        const strLeft = String(leftVal).toLowerCase();
        const strRight = String(rightVal).toLowerCase();
        if (op === '==' || op === '=') isTrue = strLeft === strRight;
        else if (op === '!=' || op === '<>') isTrue = strLeft !== strRight;
      }

      const outcome = isTrue ? trueVal : falseVal;
      const refCells = isRightCell ? [leftKey, rightKey] : [leftKey];

      return {
        result: outcome,
        type: 'text',
        explanation: `Uji kondisi IF: Apakah sel ${leftKey} (${leftVal}) ${op} ${isRightCell ? `${rightKey} (${rightVal})` : rightVal}? Jawabannya: ${isTrue ? 'BENAR (TRUE)' : 'SALAH (FALSE)'}. Karena itu rumus menghasilkan "${outcome}".`,
        referencedCells: refCells
      };
    }

    // 2. COUNTIF: =COUNTIF(range, criteria)
    const countifMatch = clean.match(/^COUNTIF\s*\(([\s\S]*)\)$/i);
    if (countifMatch) {
      const parts = countifMatch[1].split(/[,;]/).map((s) => s.trim());
      if (parts.length >= 2) {
        const rangeStr = parts[0];
        const criteria = parts[1].replace(/^["']|["']$/g, '');
        const cells = expandRangeOrCells(rangeStr);

        const opMatch = criteria.match(/^(>=|<=|>|<|==|=|!=|<>)?\s*([0-9.]+|.+)$/);
        const op = opMatch && opMatch[1] ? (opMatch[1] === '=' ? '==' : opMatch[1]) : '==';
        const targetVal = opMatch ? parseFloat(opMatch[2]) : NaN;

        let matchCount = 0;
        cells.forEach((k) => {
          const val = parseFloat(String(gridMap[k] ?? 'NaN'));
          if (!isNaN(val) && !isNaN(targetVal)) {
            if (op === '>=' && val >= targetVal) matchCount++;
            else if (op === '<=' && val <= targetVal) matchCount++;
            else if (op === '>' && val > targetVal) matchCount++;
            else if (op === '<' && val < targetVal) matchCount++;
            else if (op === '==' && val === targetVal) matchCount++;
            else if (op === '!=' && val !== targetVal) matchCount++;
          } else if (String(gridMap[k]).toLowerCase() === criteria.toLowerCase()) {
            matchCount++;
          }
        });

        return {
          result: matchCount,
          type: 'number',
          explanation: `Fungsi COUNTIF memeriksa rentang ${rangeStr} yang memenuhi syarat "${criteria}". Ditemukan ${matchCount} sel yang sesuai kriteria.`,
          referencedCells: cells
        };
      }
    }

    // 3. VLOOKUP: =VLOOKUP("BRG-02", A2:D6, 2, FALSE)
    const vlookupMatch = clean.match(/^VLOOKUP\s*\(\s*["']?([^"',;]+)["']?\s*[,;]\s*([A-E][0-9]+\s*:\s*[A-E][0-9]+)\s*[,;]\s*([0-9]+)/i);
    if (vlookupMatch) {
      const searchKey = vlookupMatch[1].trim().toLowerCase();
      const rangeStr = vlookupMatch[2].trim();
      const colIndex = parseInt(vlookupMatch[3], 10);
      const cells = expandRangeOrCells(rangeStr);

      const rangeMatch = rangeStr.match(/^([A-E])([0-9]+)\s*:\s*([A-E])([0-9]+)$/i);
      if (rangeMatch) {
        const startColLetter = rangeMatch[1].toUpperCase();
        const startRow = parseInt(rangeMatch[2], 10);
        const endRow = parseInt(rangeMatch[4], 10);

        let matchedRow = -1;
        let foundValue: string | number | null = null;
        const refList: string[] = [];

        for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
          const lookupCellKey = `${startColLetter}${r}`;
          refList.push(lookupCellKey);
          const cellVal = String(gridMap[lookupCellKey] ?? '').toLowerCase();
          if (cellVal === searchKey || cellVal.includes(searchKey)) {
            matchedRow = r;
            const targetColCharCode = startColLetter.charCodeAt(0) + (colIndex - 1);
            const targetColLetter = String.fromCharCode(targetColCharCode);
            const targetCellKey = `${targetColLetter}${r}`;
            foundValue = gridMap[targetCellKey] ?? '';
            refList.push(targetCellKey);
            break;
          }
        }

        if (foundValue !== null && foundValue !== '') {
          const isCurr = typeof foundValue === 'number' && activeSheet === 'koperasi' && colIndex === 3;
          return {
            result: isCurr ? `Rp ${foundValue.toLocaleString('id-ID')}` : foundValue,
            type: typeof foundValue === 'number' ? 'number' : 'text',
            explanation: `VLOOKUP mencari "${searchKey}" pada kolom pertama (${startColLetter}). Ditemukan pada baris ${matchedRow}, lalu mengambil data pada kolom ke-${colIndex}: "${foundValue}".`,
            referencedCells: refList
          };
        } else {
          return {
            result: '#N/A (Tidak Ditemukan)',
            type: 'text',
            explanation: `Data kunci "${searchKey}" tidak ditemukan pada kolom ${startColLetter} rentang baris ${startRow}:${endRow}.`,
            referencedCells: refList,
            error: 'Kunci pencarian tidak ada'
          };
        }
      }
    }

    // 4. Standard Aggregation Functions: SUM, AVERAGE, MAX, MIN, COUNT, COUNTA, PRODUCT, MEDIAN, ROUND
    const aggMatch = clean.match(/^(SUM|AVERAGE|MAX|MIN|COUNT|COUNTA|PRODUCT|MEDIAN|ROUND)\s*\(([\s\S]*)\)$/i);
    if (aggMatch) {
      const funcName = aggMatch[1].toUpperCase();
      const innerArgs = aggMatch[2].trim();
      const cellKeys = expandRangeOrCells(innerArgs);

      // Collect numeric values
      const numericValues: number[] = [];
      const textValues: (string | number)[] = [];

      cellKeys.forEach((key) => {
        const v = gridMap[key];
        if (v !== undefined && v !== null && v !== '') {
          textValues.push(v);
          const num = typeof v === 'number' ? v : parseFloat(String(v).replace(/[^0-9.-]/g, ''));
          if (!isNaN(num)) numericValues.push(num);
        }
      });

      if (funcName === 'COUNT' || funcName === 'COUNTA') {
        const countRes = funcName === 'COUNT' ? numericValues.length : textValues.length;
        return {
          result: countRes,
          type: 'number',
          explanation: `Fungsi ${funcName} menghitung kuantitas data pada ${cellKeys.length} sel yang dipilih: didapatkan ${countRes} data terisi.`,
          referencedCells: cellKeys
        };
      }

      if (numericValues.length === 0) {
        return {
          result: '#REF!',
          type: 'text',
          explanation: `Tidak ditemukan angka pada sel ${innerArgs}. Pastikan sel yang dirujuk adalah kolom angka (misal Kolom C atau D).`,
          referencedCells: cellKeys,
          error: 'Sel tidak mengandung angka'
        };
      }

      const isCurr = activeSheet === 'koperasi' && cellKeys.some((k) => k.startsWith('C') || k.startsWith('E'));
      let resNum = 0;
      let expl = '';

      if (funcName === 'SUM') {
        resNum = numericValues.reduce((a, b) => a + b, 0);
        expl = `Menjumlahkan ${numericValues.length} angka (${numericValues.map((n) => isCurr ? `Rp ${n.toLocaleString('id-ID')}` : n).join(' + ')}). Hasil Total = ${isCurr ? `Rp ${resNum.toLocaleString('id-ID')}` : resNum}`;
      } else if (funcName === 'AVERAGE') {
        const sum = numericValues.reduce((a, b) => a + b, 0);
        resNum = Math.round((sum / numericValues.length) * 10) / 10;
        expl = `Menghitung rata-rata dari ${numericValues.length} nilai: (${numericValues.join(' + ')}) ÷ ${numericValues.length} = ${isCurr ? `Rp ${resNum.toLocaleString('id-ID')}` : resNum}`;
      } else if (funcName === 'MAX') {
        resNum = Math.max(...numericValues);
        expl = `Mencari nilai tertinggi (paling besar) dari rentang sel: angka maksimum adalah ${isCurr ? `Rp ${resNum.toLocaleString('id-ID')}` : resNum}.`;
      } else if (funcName === 'MIN') {
        resNum = Math.min(...numericValues);
        expl = `Mencari nilai terendah (paling kecil) dari rentang sel: angka minimum adalah ${isCurr ? `Rp ${resNum.toLocaleString('id-ID')}` : resNum}.`;
      } else if (funcName === 'PRODUCT') {
        resNum = numericValues.reduce((a, b) => a * b, 1);
        expl = `Mengalikan seluruh angka rentang: ${numericValues.join(' × ')} = ${resNum}`;
      } else if (funcName === 'MEDIAN') {
        const sorted = [...numericValues].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        resNum = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
        expl = `Nilai tengah (Median) dari data terurut [${sorted.join(', ')}] adalah ${resNum}.`;
      } else if (funcName === 'ROUND') {
        resNum = Math.round(numericValues[0]);
        expl = `Membulatkan angka ${numericValues[0]} ke bilangan bulat terdekat: ${resNum}.`;
      }

      return {
        result: isCurr ? `Rp ${resNum.toLocaleString('id-ID')}` : resNum,
        type: isCurr ? 'currency' : 'number',
        explanation: expl,
        referencedCells: cellKeys
      };
    }

    // 5. General Arithmetic Expression Evaluator:
    // Supports formulas like: =C2*D2, =(C2+D2)/2, =C2+C3+C4, =C2*0.1, =C2+D2+1000, =C2*D2-500
    // Find all cell tokens like A2, C3, D5, E2
    const cellTokenRegex = /\b([A-E][0-9]+)\b/gi;
    const refCellsFound: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = cellTokenRegex.exec(clean)) !== null) {
      const cUpper = match[1].toUpperCase();
      if (!refCellsFound.includes(cUpper)) {
        refCellsFound.push(cUpper);
      }
    }

    // Replace cell names with their numeric values
    let mathExpr = clean.toUpperCase();
    let containsValidCells = false;

    for (const cKey of refCellsFound) {
      const val = gridMap[cKey];
      if (val !== undefined) {
        const numVal = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ''));
        const safeNum = isNaN(numVal) ? 0 : numVal;
        mathExpr = mathExpr.replace(new RegExp(`\\b${cKey}\\b`, 'g'), String(safeNum));
        containsValidCells = true;
      }
    }

    // Replace % with /100
    mathExpr = mathExpr.replace(/([0-9.]+)%/g, '($1/100)');

    // Check if expression is a valid arithmetic string
    if (/^[0-9.\s\+\-\*\/\(\)]+$/.test(mathExpr) && (containsValidCells || /[\+\-\*\/]/.test(mathExpr))) {
      try {
        // Safe evaluation of mathematical expressions
        // eslint-disable-next-line no-new-func
        const evaluated = Function(`"use strict"; return (${mathExpr});`)();
        if (typeof evaluated === 'number' && !isNaN(evaluated) && isFinite(evaluated)) {
          const rounded = Math.round(evaluated * 100) / 100;
          const isCurr = activeSheet === 'koperasi' && refCellsFound.some((c) => c.startsWith('C') || c.startsWith('E'));
          const formatted = isCurr ? `Rp ${rounded.toLocaleString('id-ID')}` : rounded;

          return {
            result: formatted,
            type: isCurr ? 'currency' : 'number',
            explanation: `Kalkulasi ekspresi aritmatika: rumus ${clean} dihitung menjadi (${mathExpr}) = ${formatted}.`,
            referencedCells: refCellsFound
          };
        }
      } catch (err) {
        // Fall through to error
      }
    }

    // 6. Direct Single Cell Reference: =C2 or =B3
    if (/^[A-E][0-9]+$/i.test(clean)) {
      const cellKey = clean.toUpperCase();
      const val = gridMap[cellKey];
      if (val !== undefined) {
        const isCurr = activeSheet === 'koperasi' && (cellKey.startsWith('C') || cellKey.startsWith('E')) && typeof val === 'number';
        return {
          result: isCurr ? `Rp ${val.toLocaleString('id-ID')}` : val,
          type: typeof val === 'number' ? 'number' : 'text',
          explanation: `Merujuk langsung isi nilai sel ${cellKey} yaitu: "${val}".`,
          referencedCells: [cellKey]
        };
      }
    }

    // Unrecognized or syntax error
    return {
      result: '#NAME? (Rumus Belum Dikenal)',
      type: 'text',
      explanation: `Rumus "=${clean}" belum dikenali. Contoh rumus Google Sheets yang valid: =SUM(C2:C6), =AVERAGE(C2:C6), =MAX(C2:C6), =MIN(C2:C6), =C2*D2, =(C2+D2)/2, atau =IF(C2>=75, "Tuntas", "Remidi").`,
      referencedCells: refCellsFound,
      error: 'Format rumus belum tepat'
    };
  }, [formulaInput, gridMap, activeSheet]);

  // Bottom Summary calculations (Total, Rata-Rata, Tertinggi, Terendah)
  const summaries = useMemo(() => {
    const colCValues = tableData.map((d) => d.colC);
    const colDValues = tableData.map((d) => d.colD);
    const colEValues = tableData.map((d) =>
      activeSheet === 'koperasi' ? d.colC * d.colD : Math.round(((d.colC + d.colD) / 2) * 10) / 10
    );

    const sumC = colCValues.reduce((a, b) => a + b, 0);
    const avgC = colCValues.length > 0 ? Math.round((sumC / colCValues.length) * 10) / 10 : 0;
    const maxC = colCValues.length > 0 ? Math.max(...colCValues) : 0;
    const minC = colCValues.length > 0 ? Math.min(...colCValues) : 0;

    const sumD = colDValues.reduce((a, b) => a + b, 0);
    const avgD = colDValues.length > 0 ? Math.round((sumD / colDValues.length) * 10) / 10 : 0;

    const sumE = colEValues.reduce((a, b) => a + b, 0);
    const avgE = colEValues.length > 0 ? Math.round((sumE / colEValues.length) * 10) / 10 : 0;

    return {
      sumC,
      avgC,
      maxC,
      minC,
      sumD,
      avgD,
      sumE,
      avgE
    };
  }, [tableData, activeSheet]);

  // Handle switching datasets
  const handleSwitchSheet = (sheet: 'koperasi' | 'nilai') => {
    playClick();
    setActiveSheet(sheet);
    setEditingCellTarget(null);
    if (sheet === 'koperasi') {
      setTableData(initialKoperasiData);
      setFormulaInput('=SUM(C2:C6)');
      setSelectedCell({ col: 'C', row: 2 });
    } else {
      setTableData(initialNilaiData);
      setFormulaInput('=AVERAGE(C2:C6)');
      setSelectedCell({ col: 'C', row: 2 });
    }
  };

  // Add new row to table
  const handleAddRow = () => {
    playClick();
    const nextRow = tableData.length > 0 ? tableData[tableData.length - 1].row + 1 : 2;
    if (activeSheet === 'koperasi') {
      const newRow: TableRowData = {
        row: nextRow,
        colA: `BRG-0${tableData.length + 1}`,
        colB: 'Barang Tambahan Koperasi',
        colC: 3500,
        colD: 6
      };
      setTableData([...tableData, newRow]);
    } else {
      const newRow: TableRowData = {
        row: nextRow,
        colA: `NIS-0${tableData.length + 1}`,
        colB: 'Siswa Baru',
        colC: 80,
        colD: 75
      };
      setTableData([...tableData, newRow]);
    }
    playSuccess();
  };

  // Delete last row
  const handleDeleteLastRow = () => {
    if (tableData.length <= 2) return;
    playClick();
    setTableData(tableData.slice(0, tableData.length - 1));
  };

  // Reset to initial
  const handleResetData = () => {
    playClick();
    if (activeSheet === 'koperasi') {
      setTableData(initialKoperasiData);
      setFormulaInput('=SUM(C2:C6)');
    } else {
      setTableData(initialNilaiData);
      setFormulaInput('=AVERAGE(C2:C6)');
    }
    setEditingCellTarget(null);
    setSelectedCell({ col: 'C', row: 2 });
    playSuccess();
  };

  // Cell click: select and show address in Name Box
  const handleCellSelect = (col: 'A' | 'B' | 'C' | 'D' | 'E', row: number) => {
    playClick();
    setSelectedCell({ col, row });
    if (editingCellTarget && (editingCellTarget.col !== col || editingCellTarget.row !== row)) {
      handleSaveInlineEdit();
    }
  };

  // Double click cell or press Enter to edit directly inside cell
  const handleStartInlineEdit = (col: 'A' | 'B' | 'C' | 'D', row: number) => {
    setSelectedCell({ col, row });
    setEditingCellTarget({ col, row });
    const cellKey = `${col}${row}`;
    setInlineEditValue(String(gridMap[cellKey] ?? ''));
  };

  // Save inline cell edit
  const handleSaveInlineEdit = () => {
    if (!editingCellTarget) return;
    const { col, row } = editingCellTarget;
    const rowIndex = tableData.findIndex((item) => item.row === row);
    if (rowIndex === -1) {
      setEditingCellTarget(null);
      return;
    }

    const updated = [...tableData];
    if (col === 'A') {
      updated[rowIndex].colA = inlineEditValue.trim() || updated[rowIndex].colA;
    } else if (col === 'B') {
      updated[rowIndex].colB = inlineEditValue.trim() || updated[rowIndex].colB;
    } else if (col === 'C') {
      const val = parseFloat(inlineEditValue.replace(/[^0-9.-]/g, ''));
      updated[rowIndex].colC = isNaN(val) ? 0 : val;
    } else if (col === 'D') {
      const val = parseFloat(inlineEditValue.replace(/[^0-9.-]/g, ''));
      updated[rowIndex].colD = isNaN(val) ? 0 : val;
    }

    setTableData(updated);
    setEditingCellTarget(null);
    playSuccess();
  };

  // Preset formula applicator
  const applyPresetFormula = (formulaStr: string) => {
    playClick();
    setFormulaInput(formulaStr);
    playSuccess();
  };

  // Celebration with fanfare & confetti
  const handleRunCelebration = () => {
    if (evaluation.error) {
      playError();
      return;
    }
    playFanfare();
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
  };

  // Check if cell is referenced by current active formula
  const isCellReferenced = (col: string, row: number) => {
    const key = `${col}${row}`;
    return evaluation.referencedCells.includes(key);
  };

  // Interactive Missions / Tantangan Praktik Siswa
  const studentMissions = [
    {
      id: 1,
      title: 'Misi 1: Menghitung Total Nilai / Harga dengan =SUM()',
      targetFormula: activeSheet === 'koperasi' ? `=SUM(C2:C${tableData[tableData.length - 1].row})` : `=SUM(C2:C${tableData[tableData.length - 1].row})`,
      instruction: activeSheet === 'koperasi'
        ? `Ketik rumus =SUM(C2:C${tableData[tableData.length - 1].row}) di bilah rumus untuk menjumlahkan seluruh harga barang koperasi!`
        : `Ketik rumus =SUM(C2:C${tableData[tableData.length - 1].row}) untuk menghitung total seluruh poin nilai tugas siswa!`,
      hint: '=SUM(C2:C6)',
      check: () => formulaInput.toUpperCase().startsWith('=SUM(') && evaluation.referencedCells.length >= 3
    },
    {
      id: 2,
      title: 'Misi 2: Mencari Nilai Rata-Rata Kelas dengan =AVERAGE()',
      targetFormula: `=AVERAGE(C2:C${tableData[tableData.length - 1].row})`,
      instruction: 'Gunakan fungsi =AVERAGE(C2:C6) untuk mengetahui rata-rata data pada kolom C secara otomatis.',
      hint: '=AVERAGE(C2:C6)',
      check: () => formulaInput.toUpperCase().startsWith('=AVERAGE(') && evaluation.referencedCells.length >= 3
    },
    {
      id: 3,
      title: 'Misi 3: Menghitung Perkalian Dua Sel Langsung (=C2*D2)',
      targetFormula: '=C2*D2',
      instruction: 'Ketik rumus aritmatika =C2*D2 untuk mengalikan harga/nilai baris 2 dengan jumlah stoknya.',
      hint: '=C2*D2',
      check: () => formulaInput.toUpperCase().includes('C2*D2') || formulaInput.toUpperCase().includes('D2*C2')
    },
    {
      id: 4,
      title: 'Misi 4: Logika Kelulusan Otomatis dengan =IF()',
      targetFormula: activeSheet === 'koperasi'
        ? '=IF(D2>=5, "Stok Cukup", "Pesan Lagi")'
        : '=IF(C2>=75, "TUNTAS", "REMIDI")',
      instruction: activeSheet === 'koperasi'
        ? 'Gunakan rumus =IF(D2>=5, "Stok Cukup", "Pesan Lagi") untuk menguji stok barang.'
        : 'Gunakan rumus =IF(C2>=75, "TUNTAS", "REMIDI") untuk menentukan kelulusan siswa Ahmad berdasarkan KKM 75.',
      hint: activeSheet === 'koperasi' ? '=IF(D2>=5, "Stok Cukup", "Pesan Lagi")' : '=IF(C2>=75, "TUNTAS", "REMIDI")',
      check: () => formulaInput.toUpperCase().startsWith('=IF(') && evaluation.referencedCells.includes(activeSheet === 'koperasi' ? 'D2' : 'C2')
    },
    {
      id: 5,
      title: 'Misi 5: Mengubah Data Sel dan Membuktikan Auto-Recalculate',
      targetFormula: 'Edit langsung angka sel',
      instruction: 'Ubah salah satu angka di tabel (misal klik dua kali pada sel C2 atau D2, ganti angkanya, lalu tekan Enter). Amati hasil rumus yang langsung berubah seketika!',
      hint: 'Klik dua kali sel tabel untuk mengedit!',
      check: () => true
    }
  ];

  const verifyMission = (missionId: number) => {
    playClick();
    const mission = studentMissions.find((m) => m.id === missionId);
    if (mission && mission.check()) {
      setCompletedMissions((prev) => ({ ...prev, [missionId]: true }));
      playFanfare();
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    } else {
      playError();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Simulation Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-emerald-600 via-teal-600 to-green-700 text-white shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Laboratorium Interaktif Pengolah Lembar Kerja (Google Sheets)</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/40 text-white font-mono font-bold border border-emerald-300/40">
              Versi Kurikulum Merdeka SMP
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black">
          Simulator Cerdas: Edit Data Sel, Olah Tabel, & Eksekusi Rumus Live
        </h2>

        <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl leading-relaxed">
          Kamu dapat <strong>mengklik dua kali sel tabel mana pun untuk mengubah angka dan namanya secara langsung</strong>,
          mengetik rumus di bilah <strong>fx</strong>, dan melihat seluruh hasil kalkulasi serta grafik berubah seketika
          sesuai data inputan terbarumu!
        </p>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => {
              playClick();
              setActiveTab('sheet');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'sheet'
                ? 'bg-white text-emerald-800 shadow-md scale-105'
                : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>1. Lembar Kerja & Rumus Live</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveTab('tantangan');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'tantangan'
                ? 'bg-white text-emerald-800 shadow-md scale-105'
                : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>2. Misi Praktik Olah Data ({Object.keys(completedMissions).length}/5 Tuntas)</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveTab('grafik');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'grafik'
                ? 'bg-white text-emerald-800 shadow-md scale-105'
                : 'bg-emerald-700/60 text-white hover:bg-emerald-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>3. Visualisasi Grafik Dinamis</span>
          </button>
        </div>
      </div>

      {/* Dataset Sheet Switcher Tabs & Table Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => handleSwitchSheet('koperasi')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeSheet === 'koperasi'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Sheet 1: Koperasi Sekolah (Barang & Kas)</span>
          </button>

          <button
            onClick={() => handleSwitchSheet('nilai')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeSheet === 'nilai'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Sheet 2: Daftar Nilai Rapor Siswa</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={handleAddRow}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-xl font-bold hover:bg-emerald-100 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Baris</span>
          </button>

          <button
            onClick={handleDeleteLastRow}
            disabled={tableData.length <= 2}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Baris</span>
          </button>

          <button
            onClick={handleResetData}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* BILAH RUMUS GOOGLE SHEETS ASLI (Name Box + fx Formula Bar) */}
      <div className="p-3.5 rounded-3xl border-2 border-emerald-500/70 bg-white dark:bg-slate-900 shadow-md space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Name Box (Alamat Sel Aktif) */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-black text-sm text-emerald-700 dark:text-emerald-300 shadow-inner min-w-[70px] text-center"
              title="Kotak Nama (Name Box): Menunjukkan alamat sel yang sedang aktif terpilih"
            >
              {selectedCell.col}{selectedCell.row}
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-600 text-white font-mono font-black text-sm shadow-xs">
              fx
            </div>
          </div>

          {/* Formula Bar Input */}
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={formulaInput}
                onChange={(e) => setFormulaInput(e.target.value)}
                placeholder="Ketik rumus spreadsheet, misal: =SUM(C2:C6), =C2*D2, =(C2+D2)/2"
                className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
              {formulaInput && (
                <button
                  onClick={() => setFormulaInput('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={handleRunCelebration}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Hitung Rumus</span>
            </button>
          </div>
        </div>

        {/* Quick Helper Formula Shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Pintasan Rumus Cepat:</span>
          </span>

          {activeSheet === 'koperasi' ? (
            <>
              <button
                onClick={() => applyPresetFormula(`=SUM(C2:C${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =SUM(Total Harga)
              </button>
              <button
                onClick={() => applyPresetFormula(`=SUM(D2:D${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =SUM(Total Stok)
              </button>
              <button
                onClick={() => applyPresetFormula(`=AVERAGE(C2:C${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =AVERAGE(Harga)
              </button>
              <button
                onClick={() => applyPresetFormula(`=MAX(C2:C${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =MAX(Termahal)
              </button>
              <button
                onClick={() => applyPresetFormula(`=MIN(C2:C${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =MIN(Termurah)
              </button>
              <button
                onClick={() => applyPresetFormula('=C2*D2')}
                className="px-2.5 py-1 text-xs rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-700 font-mono font-bold hover:bg-sky-100 transition-colors"
              >
                =C2*D2 (Subtotal Baris 2)
              </button>
              <button
                onClick={() => applyPresetFormula('=IF(D2>=5, "Stok Cukup", "Pesan Lagi")')}
                className="px-2.5 py-1 text-xs rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-mono font-bold hover:bg-amber-100 transition-colors"
              >
                =IF(Uji Stok)
              </button>
              <button
                onClick={() => applyPresetFormula(`=VLOOKUP("BRG-03", A2:D${tableData[tableData.length - 1].row}, 2)`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700 font-mono font-bold hover:bg-purple-100 transition-colors"
              >
                =VLOOKUP(Cari Nama)
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => applyPresetFormula(`=AVERAGE(C2:C${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =AVERAGE(Rata-Rata Tugas)
              </button>
              <button
                onClick={() => applyPresetFormula(`=AVERAGE(D2:D${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =AVERAGE(Rata-Rata UTS)
              </button>
              <button
                onClick={() => applyPresetFormula('=(C2+D2)/2')}
                className="px-2.5 py-1 text-xs rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-700 font-mono font-bold hover:bg-sky-100 transition-colors"
              >
                =(C2+D2)/2 (Rata-Rata Ahmad)
              </button>
              <button
                onClick={() => applyPresetFormula(`=MAX(C2:C${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =MAX(Tertinggi)
              </button>
              <button
                onClick={() => applyPresetFormula(`=MIN(C2:C${tableData[tableData.length - 1].row})`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 font-mono font-bold hover:bg-emerald-100 transition-colors"
              >
                =MIN(Terendah)
              </button>
              <button
                onClick={() => applyPresetFormula('=IF(C2>=75, "TUNTAS KKM", "REMIDI")')}
                className="px-2.5 py-1 text-xs rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-mono font-bold hover:bg-amber-100 transition-colors"
              >
                =IF(Uji KKM 75)
              </button>
              <button
                onClick={() => applyPresetFormula(`=COUNTIF(C2:C${tableData[tableData.length - 1].row}, ">=75")`)}
                className="px-2.5 py-1 text-xs rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700 font-mono font-bold hover:bg-indigo-100 transition-colors"
              >
                =COUNTIF(Siswa Tuntas)
              </button>
            </>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LEMBAR KERJA UTAMA GOOGLE SHEETS & LIVE CALCULATION                */}
      {/* ========================================================================= */}
      {activeTab === 'sheet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SPREADSHEET TABLE (Col 8) */}
          <div className="lg:col-span-8 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  {sheetConfig.title}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  <strong>Klik 2x sel</strong> untuk mengedit angka/nama secara langsung!
                </span>
              </div>
            </div>

            {/* In-Cell Active Edit Alert Helper */}
            {editingCellTarget && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex flex-wrap items-center justify-between gap-2 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs">
                  <Edit3 className="w-4 h-4 text-emerald-600 animate-bounce" />
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">
                    Sedang mengedit sel <strong className="font-mono text-emerald-700 dark:text-emerald-300 text-sm">{editingCellTarget.col}{editingCellTarget.row}</strong>:
                  </span>
                  <span className="text-slate-500 text-[11px]">Tekan Enter atau klik Simpan untuk memperbarui</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveInlineEdit}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Simpan</span>
                  </button>
                  <button
                    onClick={() => setEditingCellTarget(null)}
                    className="px-3 py-1 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-xs hover:bg-slate-100"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* SPREADSHEET GRID TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <table className="w-full text-xs text-left border-collapse select-none">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {/* Header Row Index */}
                    <th className="p-2 border border-slate-200 dark:border-slate-700 text-center w-12 bg-slate-200 dark:bg-slate-700 font-black">
                      #
                    </th>
                    <th className={`p-2 border border-slate-200 dark:border-slate-700 text-center font-bold ${
                      selectedCell.col === 'A' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800' : ''
                    }`}>
                      {sheetConfig.colAHeader}
                    </th>
                    <th className={`p-2 border border-slate-200 dark:border-slate-700 font-bold ${
                      selectedCell.col === 'B' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800' : ''
                    }`}>
                      {sheetConfig.colBHeader}
                    </th>
                    <th className={`p-2 border border-slate-200 dark:border-slate-700 text-right font-bold ${
                      selectedCell.col === 'C' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800' : ''
                    }`}>
                      {sheetConfig.colCHeader}
                    </th>
                    <th className={`p-2 border border-slate-200 dark:border-slate-700 text-center font-bold ${
                      selectedCell.col === 'D' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800' : ''
                    }`}>
                      {sheetConfig.colDHeader}
                    </th>
                    <th className={`p-2 border border-slate-200 dark:border-slate-700 text-right font-bold text-emerald-700 dark:text-emerald-300 ${
                      selectedCell.col === 'E' ? 'bg-emerald-100 dark:bg-emerald-950' : ''
                    }`}>
                      {sheetConfig.colEHeader}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((item) => {
                    const isSelA = selectedCell.col === 'A' && selectedCell.row === item.row;
                    const isSelB = selectedCell.col === 'B' && selectedCell.row === item.row;
                    const isSelC = selectedCell.col === 'C' && selectedCell.row === item.row;
                    const isSelD = selectedCell.col === 'D' && selectedCell.row === item.row;
                    const isSelE = selectedCell.col === 'E' && selectedCell.row === item.row;

                    const isRefA = isCellReferenced('A', item.row);
                    const isRefB = isCellReferenced('B', item.row);
                    const isRefC = isCellReferenced('C', item.row);
                    const isRefD = isCellReferenced('D', item.row);
                    const isRefE = isCellReferenced('E', item.row);

                    const isEditingA = editingCellTarget?.col === 'A' && editingCellTarget.row === item.row;
                    const isEditingB = editingCellTarget?.col === 'B' && editingCellTarget.row === item.row;
                    const isEditingC = editingCellTarget?.col === 'C' && editingCellTarget.row === item.row;
                    const isEditingD = editingCellTarget?.col === 'D' && editingCellTarget.row === item.row;

                    const subtotal = activeSheet === 'koperasi'
                      ? item.colC * item.colD
                      : Math.round(((item.colC + item.colD) / 2) * 10) / 10;

                    return (
                      <tr
                        key={item.row}
                        className={`transition-colors ${
                          selectedCell.row === item.row ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        {/* Row Index # */}
                        <td className={`p-2 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold text-slate-500 bg-slate-100/70 dark:bg-slate-800/60 ${
                          selectedCell.row === item.row ? 'bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-900 font-black' : ''
                        }`}>
                          {item.row}
                        </td>

                        {/* Col A (Kode / NISN) */}
                        <td
                          onClick={() => handleCellSelect('A', item.row)}
                          onDoubleClick={() => handleStartInlineEdit('A', item.row)}
                          className={`p-2 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold cursor-pointer transition-all ${
                            isSelA ? 'ring-2 ring-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/70' : ''
                          } ${isRefA ? 'bg-emerald-200/60 dark:bg-emerald-900/50 border-dashed border-emerald-500 ring-1 ring-emerald-400' : ''}`}
                        >
                          {isEditingA ? (
                            <input
                              ref={inlineInputRef}
                              type="text"
                              value={inlineEditValue}
                              onChange={(e) => setInlineEditValue(e.target.value)}
                              onBlur={handleSaveInlineEdit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveInlineEdit();
                                if (e.key === 'Escape') setEditingCellTarget(null);
                              }}
                              className="w-full px-1.5 py-0.5 rounded border border-emerald-500 bg-white dark:bg-slate-900 text-center font-mono text-xs font-bold focus:outline-none"
                            />
                          ) : (
                            <span>{item.colA}</span>
                          )}
                        </td>

                        {/* Col B (Nama) */}
                        <td
                          onClick={() => handleCellSelect('B', item.row)}
                          onDoubleClick={() => handleStartInlineEdit('B', item.row)}
                          className={`p-2 border border-slate-200 dark:border-slate-700 font-medium cursor-pointer transition-all ${
                            isSelB ? 'ring-2 ring-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/70' : ''
                          } ${isRefB ? 'bg-emerald-200/60 dark:bg-emerald-900/50 border-dashed border-emerald-500 ring-1 ring-emerald-400' : ''}`}
                        >
                          {isEditingB ? (
                            <input
                              ref={inlineInputRef}
                              type="text"
                              value={inlineEditValue}
                              onChange={(e) => setInlineEditValue(e.target.value)}
                              onBlur={handleSaveInlineEdit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveInlineEdit();
                                if (e.key === 'Escape') setEditingCellTarget(null);
                              }}
                              className="w-full px-1.5 py-0.5 rounded border border-emerald-500 bg-white dark:bg-slate-900 text-xs font-bold focus:outline-none"
                            />
                          ) : (
                            <div className="flex items-center justify-between gap-1 group">
                              <span className="truncate">{item.colB}</span>
                              <Edit3
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartInlineEdit('B', item.row);
                                }}
                                className="w-3 h-3 text-slate-400 opacity-40 group-hover:opacity-100 hover:text-emerald-600 transition-opacity"
                              />
                            </div>
                          )}
                        </td>

                        {/* Col C (Harga / Nilai Tugas) */}
                        <td
                          onClick={() => handleCellSelect('C', item.row)}
                          onDoubleClick={() => handleStartInlineEdit('C', item.row)}
                          className={`p-2 border border-slate-200 dark:border-slate-700 text-right font-mono font-bold cursor-pointer transition-all ${
                            isSelC ? 'ring-2 ring-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/70' : ''
                          } ${isRefC ? 'bg-emerald-200/60 dark:bg-emerald-900/50 border-dashed border-emerald-500 ring-1 ring-emerald-400 text-emerald-950 dark:text-emerald-100 font-black' : ''}`}
                        >
                          {isEditingC ? (
                            <input
                              ref={inlineInputRef}
                              type="number"
                              value={inlineEditValue}
                              onChange={(e) => setInlineEditValue(e.target.value)}
                              onBlur={handleSaveInlineEdit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveInlineEdit();
                                if (e.key === 'Escape') setEditingCellTarget(null);
                              }}
                              className="w-full px-1.5 py-0.5 rounded border border-emerald-500 bg-white dark:bg-slate-900 text-right font-mono text-xs font-bold focus:outline-none"
                            />
                          ) : (
                            <div className="flex items-center justify-end gap-1.5 group">
                              <Edit3
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartInlineEdit('C', item.row);
                                }}
                                className="w-3 h-3 text-slate-400 opacity-40 group-hover:opacity-100 hover:text-emerald-600 transition-opacity"
                              />
                              <span>
                                {sheetConfig.isCurrencyC
                                  ? `Rp ${item.colC.toLocaleString('id-ID')}`
                                  : `${item.colC} poin`}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Col D (Stok / UTS) */}
                        <td
                          onClick={() => handleCellSelect('D', item.row)}
                          onDoubleClick={() => handleStartInlineEdit('D', item.row)}
                          className={`p-2 border border-slate-200 dark:border-slate-700 text-center font-mono font-bold cursor-pointer transition-all ${
                            isSelD ? 'ring-2 ring-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/70' : ''
                          } ${isRefD ? 'bg-emerald-200/60 dark:bg-emerald-900/50 border-dashed border-emerald-500 ring-1 ring-emerald-400 text-emerald-950 dark:text-emerald-100 font-black' : ''}`}
                        >
                          {isEditingD ? (
                            <input
                              ref={inlineInputRef}
                              type="number"
                              value={inlineEditValue}
                              onChange={(e) => setInlineEditValue(e.target.value)}
                              onBlur={handleSaveInlineEdit}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveInlineEdit();
                                if (e.key === 'Escape') setEditingCellTarget(null);
                              }}
                              className="w-full px-1.5 py-0.5 rounded border border-emerald-500 bg-white dark:bg-slate-900 text-center font-mono text-xs font-bold focus:outline-none"
                            />
                          ) : (
                            <div className="flex items-center justify-center gap-1.5 group">
                              <span>{item.colD} {sheetConfig.unitD}</span>
                              <Edit3
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartInlineEdit('D', item.row);
                                }}
                                className="w-3 h-3 text-slate-400 opacity-40 group-hover:opacity-100 hover:text-emerald-600 transition-opacity"
                              />
                            </div>
                          )}
                        </td>

                        {/* Col E (Auto-Calculated Formula Result) */}
                        <td
                          onClick={() => handleCellSelect('E', item.row)}
                          className={`p-2 border border-slate-200 dark:border-slate-700 text-right font-mono font-bold cursor-pointer transition-all ${
                            isSelE ? 'ring-2 ring-emerald-500 bg-emerald-100/70 dark:bg-emerald-950/70' : ''
                          } ${isRefE ? 'bg-emerald-200/60 dark:bg-emerald-900/50 border-dashed border-emerald-500 ring-1 ring-emerald-400 font-black' : 'bg-slate-50/50 dark:bg-slate-800/30 text-slate-800 dark:text-slate-200'}`}
                        >
                          {sheetConfig.isCurrencyC ? (
                            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              <span>{subtotal}</span>
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                subtotal >= 75
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
                              }`}>
                                {subtotal >= 75 ? 'Tuntas' : 'Remidi'}
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* BOTTOM SUMMARY ROW (Auto-Computed Google Sheets Totals) */}
                <tfoot>
                  <tr className="bg-emerald-100/70 dark:bg-emerald-950/60 font-mono font-black text-slate-900 dark:text-white border-t-2 border-emerald-500">
                    <td className="p-2 border border-slate-300 dark:border-slate-700 text-center text-emerald-800 dark:text-emerald-300">
                      Σ
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-700 font-sans font-bold text-emerald-900 dark:text-emerald-200">
                      TOTAL (SUM)
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-700 text-right text-emerald-900 dark:text-emerald-200">
                      {sheetConfig.isCurrencyC ? `Rp ${summaries.sumC.toLocaleString('id-ID')}` : `${summaries.sumC} poin`}
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-700 text-center text-emerald-900 dark:text-emerald-200">
                      {summaries.sumD} {sheetConfig.unitD}
                    </td>
                    <td className="p-2 border border-slate-300 dark:border-slate-700 text-right text-emerald-950 dark:text-emerald-100 font-extrabold">
                      {sheetConfig.isCurrencyC ? `Rp ${summaries.sumE.toLocaleString('id-ID')}` : `${summaries.avgE} (Rata-rata)`}
                    </td>
                  </tr>

                  {/* Average Summary Sub-row */}
                  <tr className="bg-slate-100/90 dark:bg-slate-800/80 font-mono text-[11px] text-slate-600 dark:text-slate-300 border-b border-slate-300 dark:border-slate-700">
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 text-center text-slate-400">
                      x̄
                    </td>
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 font-sans font-semibold">
                      RATA-RATA (AVERAGE)
                    </td>
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 text-right">
                      {sheetConfig.isCurrencyC ? `Rp ${summaries.avgC.toLocaleString('id-ID')}` : `${summaries.avgC}`}
                    </td>
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 text-center">
                      {summaries.avgD} {sheetConfig.unitD}
                    </td>
                    <td className="p-1.5 border border-slate-200 dark:border-slate-700 text-right font-bold text-slate-700 dark:text-slate-200">
                      Max: {sheetConfig.isCurrencyC ? `Rp ${summaries.maxC.toLocaleString('id-ID')}` : summaries.maxC}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Visual Guide / Petunjuk Interaksi Sel */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Karakteristik & Keunggulan Pengolah Lembar Kerja (Google Sheets):</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                <li>
                  <strong>Bilah fx (Formula Bar)</strong> mengevaluasi rumus secara live. Rumus wajib dimulai dengan tanda <code>=</code>.
                </li>
                <li>
                  Sel dengan <strong>latar hijau bergaris putus-putus</strong> menunjukkan sel data yang sedang dibaca oleh rumus aktif.
                </li>
                <li>
                  Ketika kamu mengubah angka pada sel apa pun di tabel, seluruh <strong>Subtotal baris</strong>, <strong>Baris Total (SUM)</strong>, dan <strong>Hasil Rumus Live</strong> di sebelah kanan akan seketika terhitung ulang otomatis (<em>Auto-Recalculate</em>).
                </li>
              </ul>
            </div>
          </div>

          {/* LIVE FORMULA EVALUATION CARD (Col 4) */}
          <div className="lg:col-span-4 p-5 rounded-3xl border-2 border-emerald-500/70 bg-emerald-50/40 dark:bg-emerald-950/30 space-y-4 flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Hasil Eksekusi Rumus Live</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold animate-pulse">
                  Auto-Recalculate
                </span>
              </div>

              {/* Big Output Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-400 dark:border-emerald-700 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Hasil Komputasi Sistem:</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600">
                    Tipe: {evaluation.type}
                  </span>
                </div>

                <div
                  className={`text-2xl sm:text-3xl font-black font-mono break-words ${
                    evaluation.error ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {evaluation.result}
                </div>

                <div className="text-[11px] text-slate-400 font-mono mt-1 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                  Formula Aktif: <strong className="text-slate-800 dark:text-slate-200">{formulaInput}</strong>
                </div>
              </div>

              {/* Step-by-Step Logic Breakdown */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Penjelasan Langkah Perhitungan:</span>
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                  {evaluation.explanation}
                </p>
              </div>

              {/* Referenced Cells Tags */}
              {evaluation.referencedCells.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                    Sel & Nilai yang Dilibatkan ({evaluation.referencedCells.length} sel):
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
                    {evaluation.referencedCells.map((c) => (
                      <span
                        key={c}
                        onClick={() => {
                          const col = c.charAt(0) as 'A' | 'B' | 'C' | 'D' | 'E';
                          const row = parseInt(c.substring(1), 10);
                          handleCellSelect(col, row);
                        }}
                        className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-mono text-[11px] font-bold border border-emerald-300 dark:border-emerald-700 cursor-pointer hover:bg-emerald-200"
                        title="Klik untuk memilih sel ini"
                      >
                        {c}: {String(gridMap[c] ?? '-')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Celebrate Button */}
            <div className="pt-2">
              <button
                onClick={handleRunCelebration}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Verifikasi & Rayakan Hasil Eksekusi!</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MISI TANTANGAN PRAKTIK OLAH DATA (CHALLENGE MODE)                   */}
      {/* ========================================================================= */}
      {activeTab === 'tantangan' && (
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-6 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Misi Tantangan Olah Data Google Sheets Siswa SMP</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Selesaikan 5 misi praktik perhitungan di bawah ini untuk menguji kemahiran rumus spreadsheetmu!
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-xs font-bold text-emerald-800 dark:text-emerald-200">
              Progres: {Object.keys(completedMissions).length} / {studentMissions.length} Misi Tuntas
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentMissions.map((m) => {
              const isDone = completedMissions[m.id];
              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    isDone
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {m.title}
                      </span>
                      {isDone ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>TUNTAS</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                          Belum Diuji
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {m.instruction}
                    </p>

                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                      Petunjuk Rumus: <strong>{m.hint}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        applyPresetFormula(m.targetFormula);
                        setActiveTab('sheet');
                      }}
                      className="flex-1 py-1.5 px-3 rounded-xl border border-emerald-400 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-50 transition-colors"
                    >
                      Terapkan ke Bilah fx
                    </button>

                    <button
                      onClick={() => verifyMission(m.id)}
                      className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Verifikasi Misi
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VISUALISASI DIAGRAM BATANG DINAMIS (LIVE BAR CHART)                */}
      {/* ========================================================================= */}
      {activeTab === 'grafik' && (
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-6 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <span>Visualisasi Grafik Data Live: {sheetConfig.chartLabel}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Diagram batang ini secara otomatis terhubung langsung dengan tabel. Setiap kali kamu mengubah angka di lembar kerja, tinggi diagram akan berubah seketika!
              </p>
            </div>

            <button
              onClick={() => {
                playClick();
                setActiveTab('sheet');
              }}
              className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 flex items-center gap-1.5"
            >
              <Table className="w-3.5 h-3.5" />
              <span>Kembali ke Tabel untuk Edit Data</span>
            </button>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>{activeSheet === 'koperasi' ? 'Nama Barang (Kolom B)' : 'Nama Siswa (Kolom B)'}</span>
              <span>{activeSheet === 'koperasi' ? 'Harga Satuan (Kolom C)' : 'Nilai Tugas & UTS (Kolom C & D)'}</span>
            </div>

            {/* Bars List */}
            <div className="space-y-4">
              {tableData.map((item) => {
                const maxVal = activeSheet === 'koperasi'
                  ? Math.max(...tableData.map((d) => d.colC), 1)
                  : 100;

                const percentC = Math.min(100, Math.round((item.colC / maxVal) * 100));
                const percentD = Math.min(100, Math.round((item.colD / (activeSheet === 'koperasi' ? 20 : 100)) * 100));

                return (
                  <div key={item.row} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {item.colA}: {item.colB}
                      </span>
                      <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                        {activeSheet === 'koperasi'
                          ? `Rp ${item.colC.toLocaleString('id-ID')} (${item.colD} pcs)`
                          : `Tugas: ${item.colC} | UTS: ${item.colD}`}
                      </span>
                    </div>

                    {/* Bar visualization */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-6 rounded-xl overflow-hidden flex">
                      <div
                        style={{ width: `${percentC}%` }}
                        className="bg-linear-to-r from-emerald-500 to-teal-500 h-full flex items-center justify-end pr-2 text-[10px] font-mono font-bold text-white transition-all duration-500 shadow-sm"
                      >
                        {percentC > 20 && `${activeSheet === 'koperasi' ? `Rp ${item.colC.toLocaleString('id-ID')}` : item.colC}`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
