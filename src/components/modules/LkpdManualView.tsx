import React, { useState, useMemo } from 'react';
import { Topic } from '../../types/curriculum';
import { TOPICS, TOPIC_MAP } from '../../data/curriculumData';
import { getTopicPblScenario } from '../../data/pblScenariosData';
import { useTheme } from '../../context/ThemeContext';
import { useUserRole } from '../../context/UserRoleContext';
import { printHtmlDocument } from '../../utils/printHelper';
import { escapeHtml } from '../../utils/securityHelper';
import { useTeacherProfile } from '../../context/TeacherProfileContext';
import { LkpdDigitalInteractiveView } from './LkpdDigitalInteractiveView';
import {
  Printer,
  ArrowLeft,
  ArrowRight,
  PenTool,
  ClipboardList,
  Key,
  Sliders,
  CheckSquare,
  Square,
  AlertCircle,
  FileCheck,
  Users,
  UserCheck,
  Edit3,
  BookOpen,
  Layers,
  Check
} from 'lucide-react';

interface LkpdManualViewProps {
  topic: Topic;
  onNext: () => void;
  onBackToDashboard: () => void;
}

export interface ActivitySelection {
  act1_concepts: boolean;    // Aktivitas 1: Memahami & Menuliskan Konsep Utama
  act2_observation: boolean; // Aktivitas 2: Tabel Analisis & Pengamatan Nyata
  act3_pbl: boolean;         // Aktivitas 3: Pemecahan Kasus Nyata & Diskusi Kelompok (PBL s.d. Tahap 4)
  act4_essay: boolean;       // Aktivitas 4: Latihan Soal Uraian / Esai Tulis Tangan (5 Soal)
}

type LineStyle = 'dotted' | 'ruled' | 'box';
type IdentityMode = 'blank' | 'prefilled';
type PageFitMode = 'one-sheet-per-activity' | 'combined-sheet';
type PaperSizeMode = 'F4' | 'A4';

export const LkpdManualView: React.FC<LkpdManualViewProps> = ({
  topic,
  onNext,
  onBackToDashboard
}) => {
  const { playClick, playSuccess } = useTheme();
  const { isTeacher, showTeacherAnswerKeys, toggleTeacherAnswerKeys, studentProfile } = useUserRole();
  const { teacherProfile, openEditModal, isCustomized } = useTeacherProfile();

  // Mode Pilihan LKPD: Versi Cetak (F4/A4 Tulis Tangan) atau Versi Digital (Diisi di Aplikasi)
  const [lkpdMode, setLkpdMode] = useState<'cetak' | 'interaktif'>('cetak');

  // Pilihan Ukuran Kertas Cetak: Default F4 / Folio (215 x 330 mm) Satu Halaman Penuh
  const [paperSize, setPaperSize] = useState<PaperSizeMode>('F4');

  // Pilihan Materi Kurikulum yang Ingin Dicetak (Bisa 1 Materi atau Multi-Materi)
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([topic.id]);
  const [previewTopicId, setPreviewTopicId] = useState<string>(topic.id);
  const [topicSelectionMode, setTopicSelectionMode] = useState<'single' | 'multiple'>('single');

  // Mode Tata Letak Lembar:
  // 'one-sheet-per-activity' = 1 Materi Aktivitas = 1 Halaman Penuh F4
  const [pageFitMode, setPageFitMode] = useState<PageFitMode>('one-sheet-per-activity');

  // Activity selection state: User bebas memilih 1 materi/aktivitas saja (misal PBL saja) atau semuanya
  const [activities, setActivities] = useState<ActivitySelection>({
    act1_concepts: false,
    act2_observation: false,
    act3_pbl: true,
    act4_essay: false
  });

  const [lineStyle, setLineStyle] = useState<LineStyle>('dotted');
  const [lineCount, setLineCount] = useState<number>(5);
  const [identityMode, setIdentityMode] = useState<IdentityMode>('blank');
  const [selectedGroupNumber, setSelectedGroupNumber] = useState<string>('Kelompok 1');
  const [customGroupName, setCustomGroupName] = useState('');
  const [customStudentName, setCustomStudentName] = useState(studentProfile.name || '');
  const [customClass, setCustomClass] = useState(studentProfile.className || `Kelas ${topic.grade}`);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isPrintingKey, setIsPrintingKey] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);

  const getRomanGrade = (grade: number) =>
    grade === 7 ? 'VII' : grade === 8 ? 'VIII' : 'IX';

  // Build 5 Essay Questions for any Topic
  const buildTopicEssayQuestions = (t: Topic) => [
    ...(t.apersepsi.triggerQuestions.slice(0, 2).map((q, idx) => ({
      no: idx + 1,
      question: q,
      hint: 'Hubungkan dengan pengalaman sehari-hari atau contoh di lingkungan sekolah.',
      answerKey:
        idx === 0
          ? `Siswa menjelaskan alasan utama sesuai konsep ${t.materi.keyConcepts[0]?.title || t.title}: ${t.materi.keyConcepts[0]?.explanation || ''}`
          : `Siswa menguraikan langkah atau dampak praktis sesuai konsep ${t.materi.keyConcepts[1]?.title || t.title}: ${t.materi.keyConcepts[1]?.explanation || ''}`
    }))),
    ...(t.materi.formativeCheck.slice(0, 1).map((fc, idx) => ({
      no: 3 + idx,
      question: `${fc.question} Jelaskan alasanmu secara lengkap!`,
      hint: 'Ingat kembali penjelasan pada bagian Materi Pembelajaran.',
      answerKey: `${fc.options[fc.answerIndex]}. Pembahasan: ${fc.explanation}`
    }))),
    ...(t.kuis.slice(0, 2).map((kq, idx) => {
      const correctOpt = kq.options.find((o) => o.label === kq.correctAnswer);
      return {
        no: 4 + idx,
        question: `${kq.question.replace(/\.\.\.$/, '?')} Mengapa hal tersebut penting dalam Informatika?`,
        hint: `Level Kompetensi: ${kq.competencyLevel}`,
        answerKey: `${correctOpt ? correctOpt.text : ''}. Alasan: ${kq.explanation}`
      };
    }))
  ];

  // Topik yang sedang ditampilkan pada pratinjau
  const previewTopic = TOPIC_MAP[previewTopicId] || topic;
  const pblScenario = getTopicPblScenario(
    previewTopic.id,
    previewTopic.title,
    previewTopic.grade,
    previewTopic.category
  );
  const romanGrade = getRomanGrade(previewTopic.grade);
  const essayQuestions = buildTopicEssayQuestions(previewTopic);

  // Daftar topik terpilih yang akan dicetak
  const selectedTopicsList = useMemo(() => {
    const list = TOPICS.filter((t) => selectedTopicIds.includes(t.id));
    return list.length > 0 ? list : [topic];
  }, [selectedTopicIds, topic]);

  // Handlers pemilihan materi kurikulum
  const handleSelectTopic = (targetId: string) => {
    playClick();
    if (topicSelectionMode === 'single') {
      setSelectedTopicIds([targetId]);
      setPreviewTopicId(targetId);
    } else {
      setSelectedTopicIds((prev) => {
        const exists = prev.includes(targetId);
        if (exists) {
          if (prev.length === 1) return prev;
          const next = prev.filter((id) => id !== targetId);
          if (previewTopicId === targetId) {
            setPreviewTopicId(next[0]);
          }
          return next;
        } else {
          setPreviewTopicId(targetId);
          return [...prev, targetId];
        }
      });
    }
  };

  const handleSelectOnlyCurrentTopic = () => {
    playClick();
    setTopicSelectionMode('single');
    setSelectedTopicIds([topic.id]);
    setPreviewTopicId(topic.id);
  };

  const handleSelectGradeTopics = (grade: number) => {
    playClick();
    setTopicSelectionMode('multiple');
    const ids = TOPICS.filter((t) => t.grade === grade).map((t) => t.id);
    setSelectedTopicIds(ids);
    if (ids.length > 0) setPreviewTopicId(ids[0]);
  };

  const handleSelectAllCurriculumTopics = () => {
    playClick();
    setTopicSelectionMode('multiple');
    setSelectedTopicIds(TOPICS.map((t) => t.id));
    setPreviewTopicId(topic.id);
  };

  // Count selected core activities (1 to 4)
  const coreSelectedCount = [
    activities.act1_concepts,
    activities.act2_observation,
    activities.act3_pbl,
    activities.act4_essay
  ].filter(Boolean).length;

  const hasAnyActivitySelected = coreSelectedCount > 0;

  // Toggle single activity
  const toggleActivity = (key: keyof ActivitySelection) => {
    playClick();
    setActivities((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Preset selections (Pilih 1 Materi Aktivitas atau Semua)
  const selectOnlyAct1 = () => {
    playClick();
    setActivities({
      act1_concepts: true,
      act2_observation: false,
      act3_pbl: false,
      act4_essay: false
    });
  };

  const selectOnlyAct2 = () => {
    playClick();
    setActivities({
      act1_concepts: false,
      act2_observation: true,
      act3_pbl: false,
      act4_essay: false
    });
  };

  const selectOnlyAct3Pbl = () => {
    playClick();
    setActivities({
      act1_concepts: false,
      act2_observation: false,
      act3_pbl: true,
      act4_essay: false
    });
  };

  const selectOnlyAct4Essay = () => {
    playClick();
    setActivities({
      act1_concepts: false,
      act2_observation: false,
      act3_pbl: false,
      act4_essay: true
    });
  };

  const selectAll = () => {
    playClick();
    setActivities({
      act1_concepts: true,
      act2_observation: true,
      act3_pbl: true,
      act4_essay: true
    });
  };

  // Helper to render handwriting lines for HTML print (Ukuran proporsional penuh F4, mudah ditulis siswa)
  const buildPrintLinesHtml = (
    count: number,
    style: LineStyle = lineStyle,
    rowHeightPx = paperSize === 'F4' ? 27 : 23
  ) => {
    if (style === 'box') {
      const heightPx = Math.max(64, count * rowHeightPx);
      return `<div style="border: 1.5px dashed #475569; border-radius: 6px; height: ${heightPx}px; margin-top: 4px; background: #ffffff;"></div>`;
    }
    const borderType = style === 'dotted' ? '1.5px dotted #475569' : '1.2px solid #64748b';
    let html = '<div style="margin-top: 2px;">';
    for (let i = 0; i < count; i++) {
      html += `<div style="border-bottom: ${borderType}; height: ${rowHeightPx}px; width: 100%;"></div>`;
    }
    html += '</div>';
    return html;
  };

  // Helper to render handwriting lines in React preview
  const renderPreviewLines = (count: number, style: LineStyle = lineStyle) => {
    const rowH = paperSize === 'F4' ? 27 : 23;
    if (style === 'box') {
      return (
        <div
          className="border-2 border-dashed border-slate-500 rounded-lg bg-white mt-1.5"
          style={{ height: `${Math.max(64, count * rowH)}px` }}
        />
      );
    }
    return (
      <div className="mt-1 space-y-0">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            style={{ height: `${rowH}px` }}
            className={`w-full ${
              style === 'dotted'
                ? 'border-b-[1.5px] border-dotted border-slate-600'
                : 'border-b border-slate-500'
            }`}
          />
        ))}
      </div>
    );
  };

  // ============================================================================
  // HEADER RINGKAS & KOTAK IDENTITAS DIPERKECIL (TANPA TUJUAN, PETUNJUK, & TTD)
  // Ukuran teks jelas dan proporsional untuk kertas F4 penuh
  // ============================================================================
  const buildCompactHeaderAndIdentityHtml = (
    targetTopic: Topic,
    activityBadge?: string
  ) => {
    const isBlank = identityMode === 'blank';
    const tGradeRoman = getRomanGrade(targetTopic.grade);

    const groupOrStudentDisplay = isBlank
      ? '......................................................................'
      : escapeHtml(
          [customGroupName.trim() || selectedGroupNumber, customStudentName.trim()]
            .filter(Boolean)
            .join(' / ')
        );

    const classVal =
      isBlank || !customClass.trim()
        ? `Kelas ${targetTopic.grade} ........`
        : escapeHtml(customClass.trim());

    const dateVal = isBlank
      ? '.................... 202...'
      : new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });

    return `
      <div style="flex-shrink: 0; margin-bottom: 8px;">
        <!-- JUDUL LKPD 1 BARIS JELAS & TEGAS -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2.5px solid #0f172a; padding-bottom: 5px; margin-bottom: 6px;">
          <div style="font-size: 11.5pt; font-weight: 900; text-transform: uppercase; color: #0f172a; letter-spacing: 0.3px;">
            LKPD INFORMATIKA KELAS ${tGradeRoman} — MATERI: ${escapeHtml(targetTopic.title.toUpperCase())}
          </div>
          ${
            activityBadge
              ? `<div style="font-size: 8.5pt; font-weight: 800; background: #0f172a; color: #ffffff; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">${escapeHtml(activityBadge)}</div>`
              : ''
          }
        </div>

        <!-- KOTAK IDENTITAS SISWA / KELOMPOK DIPERKECIL (2 BARIS TERBACA JELAS) -->
        <table style="width: 100%; border-collapse: collapse; font-size: 9.5pt; border: 1.5px solid #0f172a;">
          <tr>
            <td style="width: 18%; font-weight: 800; background: #f1f5f9; padding: 4px 8px; border: 1px solid #94a3b8;">
              Kelompok / Siswa
            </td>
            <td style="width: 34%; font-weight: bold; padding: 4px 8px; border: 1px solid #94a3b8;">
              ${groupOrStudentDisplay}
            </td>
            <td style="width: 13%; font-weight: 800; background: #f1f5f9; padding: 4px 8px; border: 1px solid #94a3b8;">
              Kelas / Tgl
            </td>
            <td style="width: 22%; padding: 4px 8px; border: 1px solid #94a3b8;">
              ${classVal} / ${dateVal}
            </td>
            <td rowspan="2" style="width: 13%; text-align: center; vertical-align: middle; background: #f8fafc; border-left: 1.5px solid #0f172a; padding: 4px;">
              <div style="font-size: 8pt; font-weight: 900; text-transform: uppercase; color: #0f172a;">NILAI</div>
              <div style="border: 1.5px solid #0f172a; border-radius: 4px; height: 28px; width: 58px; margin: 2px auto 0; background: #ffffff; line-height: 28px; font-size: 8pt; font-weight: bold; color: #64748b;">
                .... / 100
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-weight: 800; background: #f1f5f9; padding: 4px 8px; border: 1px solid #94a3b8;">
              Anggota (1–6)
            </td>
            <td colspan="3" style="padding: 4px 8px; border: 1px solid #94a3b8; font-size: 8.8pt; line-height: 1.35;">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 10px;">
                <span>1. ........................................</span>
                <span>2. ........................................</span>
                <span>3. ........................................</span>
                <span>4. ........................................</span>
                <span>5. ........................................</span>
                <span>6. ........................................</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    `;
  };

  const buildFooterStripHtml = (targetTopic: Topic, label: string) => `
    <div style="flex-shrink: 0; border-top: 1.5px solid #0f172a; padding-top: 4px; margin-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 8.5pt; color: #334155; font-weight: 600;">
      <span>LKPD Informatika SMP Kelas ${getRomanGrade(targetTopic.grade)} — ${escapeHtml(targetTopic.title)}</span>
      <span>${escapeHtml(label)}</span>
    </div>
  `;

  // ============================================================================
  // GENERATOR MASING-MASING BAGIAN MATERI (PENUH 1 HALAMAN F4 TANPA SISA KOSONG)
  // ============================================================================

  // 1. Aktivitas 1: Konsep Utama Materi (Penuh 1 Halaman F4)
  const buildAct1ConceptsHtml = (targetTopic: Topic) => {
    const kcCount = targetTopic.materi.keyConcepts.length;
    const perRowLines =
      paperSize === 'F4'
        ? kcCount <= 3
          ? Math.max(lineCount + 2, 7)
          : Math.max(lineCount + 1, 6)
        : Math.max(lineCount, 4);

    const conceptsHtml = targetTopic.materi.keyConcepts
      .map(
        (kc, idx) => `
        <tr>
          <td style="width: 5%; text-align: center; font-weight: 800; vertical-align: top; padding: 8px 6px; font-size: 10pt;">${idx + 1}</td>
          <td style="width: 33%; vertical-align: top; padding: 8px 10px;">
            <div style="font-weight: 800; font-size: 10pt; color: #0f172a; margin-bottom: 4px;">${escapeHtml(kc.title.replace(/^\d+\.\s*/, ''))}</div>
            <div style="font-size: 9pt; color: #334155; line-height: 1.4;">
              <strong>Kisi-Kisi Konsep:</strong> ${escapeHtml(kc.bulletPoints[0] || kc.explanation)}
            </div>
          </td>
          <td style="width: 62%; vertical-align: top; padding: 8px 10px;">
            <div style="font-size: 8.8pt; color: #475569; font-style: italic; margin-bottom: 2px;">
              Tuliskan penjelasan dengan bahasamu sendiri beserta contoh penerapannya:
            </div>
            ${buildPrintLinesHtml(perRowLines)}
          </td>
        </tr>
      `
      )
      .join('');

    // Baris Kesimpulan Materi agar tabel mengisi penuh 100% sampai bagian bawah halaman F4
    const summaryRowHtml = `
      <tr>
        <td style="width: 5%; text-align: center; font-weight: 800; vertical-align: top; padding: 8px 6px; font-size: 10pt;">${kcCount + 1}</td>
        <td style="width: 33%; vertical-align: top; padding: 8px 10px; background: #f8fafc;">
          <div style="font-weight: 800; font-size: 10pt; color: #0f172a; margin-bottom: 4px;">Kesimpulan &amp; Manfaat Utama Materi</div>
          <div style="font-size: 9pt; color: #334155; line-height: 1.4;">
            Simpulkan apa manfaat mempelajari materi <strong>${escapeHtml(targetTopic.title)}</strong> bagi aktivitas belajar atau kehidupan sehari-hari!
          </div>
        </td>
        <td style="width: 62%; vertical-align: top; padding: 8px 10px;">
          <div style="font-size: 8.8pt; color: #475569; font-style: italic; margin-bottom: 2px;">
            Tuliskan kesimpulan kelompok/siswamu secara lengkap:
          </div>
          ${buildPrintLinesHtml(Math.max(4, perRowLines - 1))}
        </td>
      </tr>
    `;

    return `
      <div class="lkpd-body-fill">
        <div style="flex-shrink: 0; margin-bottom: 8px;">
          <h4 style="margin: 0 0 6px; font-size: 10.5pt; background: #0f172a; color: #ffffff; padding: 6px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.3px;">
            AKTIVITAS 1 — MEMAHAMI &amp; MENULISKAN KONSEP UTAMA MATERI
          </h4>
          <div style="padding: 6px 10px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 9.5pt; color: #1e293b; line-height: 1.4;">
            <strong>Pengantar Materi:</strong> ${escapeHtml(targetTopic.materi.overview)}
          </div>
        </div>
        <table class="lkpd-table-fill" style="font-size: 9.8pt; border: 1.5px solid #0f172a;">
          <thead>
            <tr>
              <th style="width: 5%; text-align: center; padding: 7px 6px; background: #e2e8f0; border: 1px solid #64748b;">No</th>
              <th style="width: 33%; padding: 7px 10px; background: #e2e8f0; border: 1px solid #64748b;">Konsep Kunci &amp; Kisi-Kisi</th>
              <th style="width: 62%; padding: 7px 10px; background: #e2e8f0; border: 1px solid #64748b;">Penjelasan Siswa &amp; Contoh Nyata (Tulis Tangan)</th>
            </tr>
          </thead>
          <tbody>
            ${conceptsHtml}
            ${summaryRowHtml}
          </tbody>
        </table>
      </div>
    `;
  };

  // 2. Aktivitas 2: Tabel Eksplorasi & Pengamatan (Penuh 1 Halaman F4)
  const buildAct2ObservationHtml = (targetTopic: Topic) => {
    const hasComparison = Boolean(targetTopic.materi.comparisonTable);
    const compLines = paperSize === 'F4' ? Math.max(3, lineCount - 1) : Math.max(2, lineCount - 2);
    const obsLines =
      paperSize === 'F4'
        ? hasComparison
          ? Math.max(4, lineCount)
          : Math.max(6, lineCount + 2)
        : Math.max(3, lineCount - 1);

    const comparisonRowsHtml = targetTopic.materi.comparisonTable
      ? targetTopic.materi.comparisonTable.rows
          .map(
            (row, rIdx) => `
          <tr>
            <td style="width: 6%; text-align: center; font-weight: 800; padding: 6px 6px; font-size: 9.8pt;">${rIdx + 1}</td>
            <td style="width: 32%; font-weight: 800; padding: 6px 10px; font-size: 9.8pt; vertical-align: top;">${escapeHtml(row[0] || '')}</td>
            <td style="width: 62%; padding: 6px 10px; vertical-align: top;">
              <div style="font-size: 8.5pt; color: #475569; font-style: italic;">Analisis Ciri Utama / Fungsi / Perbedaan (Tulis Tangan):</div>
              ${buildPrintLinesHtml(compLines)}
            </td>
          </tr>
        `
          )
          .join('')
      : '';

    const obsRowCount = hasComparison ? 3 : 4;
    let obsRowsHtml = '';
    for (let i = 0; i < obsRowCount; i++) {
      obsRowsHtml += `
        <tr>
          <td style="text-align: center; font-weight: 800; padding: 6px 6px; font-size: 9.8pt; vertical-align: top;">${i + 1}</td>
          <td style="padding: 6px 10px; vertical-align: top;">
            ${
              i === 0
                ? `<div style="font-size: 8.5pt; color: #475569; font-style: italic;">Contoh 1 (Petunjuk: ${escapeHtml(
                    targetTopic.materi.schoolExamples[0] || targetTopic.materi.dailyLifeExamples[0] || ''
                  )})</div>`
                : `<div style="font-size: 8.5pt; color: #475569; font-style: italic;">Temuan Pengamatan ${i + 1}:</div>`
            }
            ${buildPrintLinesHtml(obsLines)}
          </td>
          <td style="padding: 6px 10px; vertical-align: top;">
            <div style="font-size: 8.5pt; color: #475569; font-style: italic;">Cara Kerja / Manfaatnya:</div>
            ${buildPrintLinesHtml(obsLines)}
          </td>
        </tr>
      `;
    }

    return `
      <div class="lkpd-body-fill">
        <div style="flex-shrink: 0;">
          <h4 style="margin: 0 0 6px; font-size: 10.5pt; background: #0369a1; color: #ffffff; padding: 6px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.3px;">
            AKTIVITAS 2 — TABEL EKSPLORASI &amp; PENGAMATAN DI SEKOLAH / RUMAH
          </h4>
        </div>
        ${
          comparisonRowsHtml
            ? `
          <div style="flex: 1 1 auto; display: flex; flex-direction: column; margin-bottom: 8px;">
            <p style="margin: 0 0 4px; font-size: 9.8pt; font-weight: 800; color: #0f172a;">
              Tugas 2A: Analisis Perbandingan — ${escapeHtml(targetTopic.materi.comparisonTable?.title || '')}
            </p>
            <table class="lkpd-table-fill" style="font-size: 9.5pt; border: 1.5px solid #0f172a;">
              <thead>
                <tr>
                  <th style="width: 6%; text-align: center; padding: 6px; background: #e0f2fe; border: 1px solid #64748b;">No</th>
                  <th style="width: 32%; padding: 6px 10px; background: #e0f2fe; border: 1px solid #64748b;">${escapeHtml(targetTopic.materi.comparisonTable?.headers[0] || 'Komponen / Aspek')}</th>
                  <th style="width: 62%; padding: 6px 10px; background: #e0f2fe; border: 1px solid #64748b;">Hasil Analisis &amp; Perbandinganmu (Tulis Tangan)</th>
                </tr>
              </thead>
              <tbody>
                ${comparisonRowsHtml}
              </tbody>
            </table>
          </div>
        `
            : ''
        }
        <div style="flex: 1 1 auto; display: flex; flex-direction: column;">
          <p style="margin: 0 0 4px; font-size: 9.8pt; font-weight: 800; color: #0f172a;">
            Tugas ${comparisonRowsHtml ? '2B' : '2'}: Amatilah penerapan materi "${escapeHtml(targetTopic.title)}" di lingkungan sekolah atau rumahmu, lalu catat ${obsRowCount} temuanmu!
          </p>
          <table class="lkpd-table-fill" style="font-size: 9.5pt; border: 1.5px solid #0f172a;">
            <thead>
              <tr>
                <th style="width: 6%; text-align: center; padding: 6px; background: #e0f2fe; border: 1px solid #64748b;">No</th>
                <th style="width: 44%; padding: 6px 10px; background: #e0f2fe; border: 1px solid #64748b;">Bentuk Penerapan / Contoh yang Ditemukan</th>
                <th style="width: 50%; padding: 6px 10px; background: #e0f2fe; border: 1px solid #64748b;">Manfaat atau Cara Kerjanya (Tulis Tangan)</th>
              </tr>
            </thead>
            <tbody>
              ${obsRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  // 3. Aktivitas 3: Kasus PBL Kelompok (LENGKAP SAMPAI TAHAP 4 & PENUH 1 HALAMAN F4)
  const buildAct3PblHtml = (targetTopic: Topic) => {
    const tScenario = getTopicPblScenario(
      targetTopic.id,
      targetTopic.title,
      targetTopic.grade,
      targetTopic.category
    );
    const pblGuidingHtml = tScenario.whatWeNeedToLearn
      .map((item) => `<li style="margin-bottom: 2px;">${escapeHtml(item)}</li>`)
      .join('');

    const stage12Lines = paperSize === 'F4' ? Math.max(5, lineCount) : Math.max(3, lineCount - 1);
    const stage3Lines = paperSize === 'F4' ? Math.max(6, lineCount + 1) : Math.max(4, lineCount);
    const sketchBoxHeight = paperSize === 'F4' ? 215 : 125;

    return `
      <div class="lkpd-body-fill">
        <div style="flex-shrink: 0; margin-bottom: 8px;">
          <h4 style="margin: 0 0 6px; font-size: 10.5pt; background: #be123c; color: #ffffff; padding: 6px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.3px;">
            AKTIVITAS 3 — PEMECAHAN KASUS NYATA &amp; DISKUSI KELOMPOK (PBL TAHAP 1 S.D. 4)
          </h4>
          <div style="border: 1.5px solid #fda4af; background: #fff1f2; padding: 8px 12px; border-radius: 6px; font-size: 9.5pt; line-height: 1.42;">
            <div style="font-weight: 900; font-size: 10pt; color: #9f1239; margin-bottom: 3px;">
              KASUS LAPANGAN: ${escapeHtml(tScenario.headline)} (${escapeHtml(tScenario.location)})
            </div>
            <p style="margin: 0 0 4px; color: #0f172a;">
              ${escapeHtml(tScenario.contextStory)}
            </p>
            <div style="font-weight: 800; color: #881337; margin-bottom: 3px;">
              Pertanyaan Utama Masalah: "${escapeHtml(tScenario.drivingQuestion)}"
            </div>
            <div style="font-size: 8.8pt; color: #334155;">
              <strong>Kisi-Kisi Arahan Diskusi Kelompok:</strong>
              <ul style="margin: 2px 0 0; padding-left: 18px;">
                ${pblGuidingHtml}
              </ul>
            </div>
          </div>
        </div>

        <table class="lkpd-table-fill" style="font-size: 9.8pt; border: 1.5px solid #0f172a;">
          <tbody>
            <tr>
              <td style="width: 31%; font-weight: 800; background: #f8fafc; vertical-align: top; padding: 8px 10px; border: 1px solid #64748b;">
                <div style="font-size: 10pt; color: #0f172a; margin-bottom: 4px;">1. Identifikasi Masalah Utama</div>
                <span style="font-weight: normal; font-size: 8.8pt; color: #334155; line-height: 1.38; display: block;">
                  Apa masalah utama yang terjadi pada kasus di atas dan siapa saja pihak yang terdampak?
                </span>
              </td>
              <td style="width: 69%; vertical-align: top; padding: 8px 10px; border: 1px solid #64748b;">
                ${buildPrintLinesHtml(stage12Lines)}
              </td>
            </tr>
            <tr>
              <td style="font-weight: 800; background: #f8fafc; vertical-align: top; padding: 8px 10px; border: 1px solid #64748b;">
                <div style="font-size: 10pt; color: #0f172a; margin-bottom: 4px;">2. Analisis Akar Penyebab</div>
                <span style="font-weight: normal; font-size: 8.8pt; color: #334155; line-height: 1.38; display: block;">
                  Mengapa masalah tersebut bisa terjadi? Sebutkan dan jelaskan minimal 2 penyebab utamanya!
                </span>
              </td>
              <td style="vertical-align: top; padding: 8px 10px; border: 1px solid #64748b;">
                ${buildPrintLinesHtml(stage12Lines)}
              </td>
            </tr>
            <tr>
              <td style="font-weight: 800; background: #f8fafc; vertical-align: top; padding: 8px 10px; border: 1px solid #64748b;">
                <div style="font-size: 10pt; color: #0f172a; margin-bottom: 4px;">3. Solusi &amp; Langkah Nyata Kelompok</div>
                <span style="font-weight: normal; font-size: 8.8pt; color: #334155; line-height: 1.38; display: block;">
                  Tuliskan langkah-langkah solusi kelompokmu untuk membuat karya: <strong>${escapeHtml(tScenario.deliverableName)}</strong>
                </span>
              </td>
              <td style="vertical-align: top; padding: 8px 10px; border: 1px solid #64748b;">
                ${buildPrintLinesHtml(stage3Lines)}
              </td>
            </tr>
            <tr>
              <td style="font-weight: 800; background: #f8fafc; vertical-align: top; padding: 8px 10px; border: 1px solid #64748b;">
                <div style="font-size: 10pt; color: #0f172a; margin-bottom: 4px;">4. Kotak Sketsa / Bagan Alur Solusi / Poster Mini</div>
                <span style="font-weight: normal; font-size: 8.8pt; color: #334155; line-height: 1.38; display: block;">
                  Gambarkan bagan alur langkah penyelesaian, tabel rumus, atau poster slogan solusi kelompokmu di kotak samping!
                </span>
              </td>
              <td style="vertical-align: top; padding: 8px 10px; border: 1px solid #64748b;">
                <div style="border: 1.8px dashed #64748b; border-radius: 6px; height: ${sketchBoxHeight}px; min-height: ${sketchBoxHeight}px; background: #ffffff; padding: 6px 10px; font-size: 8.8pt; color: #64748b;">
                  Area Gambar Bagan Alur / Sketsa Poster Solusi Tulis Tangan:
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  };

  // 4. Aktivitas 4: Latihan Soal Uraian / Esai (Lengkap 5 Soal Penuh 1 Halaman F4)
  const buildAct4EssayHtml = (targetTopic: Topic) => {
    const tEssayQuestions = buildTopicEssayQuestions(targetTopic);
    const essayLines = paperSize === 'F4' ? Math.max(5, lineCount) : Math.max(3, lineCount - 1);

    const essayHtml = tEssayQuestions
      .map(
        (eq) => `
        <div style="flex: 1 1 auto; display: flex; flex-direction: column; justify-content: space-between; border: 1.2px solid #94a3b8; border-radius: 6px; padding: 7px 12px; margin-bottom: 7px; background: #ffffff; page-break-inside: avoid;">
          <div>
            <div style="font-weight: 800; font-size: 10pt; color: #0f172a; line-height: 1.35;">
              ${eq.no}. ${escapeHtml(eq.question)}
            </div>
            <div style="font-size: 8.8pt; color: #475569; font-style: italic; margin-top: 2px;">
              Petunjuk: ${escapeHtml(eq.hint)}
            </div>
          </div>
          <div style="padding-left: 6px; margin-top: 2px;">
            ${buildPrintLinesHtml(essayLines)}
          </div>
        </div>
      `
      )
      .join('');

    return `
      <div class="lkpd-body-fill">
        <div style="flex-shrink: 0; margin-bottom: 6px;">
          <h4 style="margin: 0; font-size: 10.5pt; background: #047857; color: #ffffff; padding: 6px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.3px;">
            AKTIVITAS 4 — LATIHAN SOAL URAIAN / ESAI TULIS TANGAN (5 SOAL)
          </h4>
        </div>
        <div style="flex: 1 1 auto; display: flex; flex-direction: column; justify-content: space-between;">
          ${essayHtml}
        </div>
      </div>
    `;
  };

  // ============================================================================
  // MASTER GENERATOR HTML LKPD SISWA (1 HALAMAN PENUH F4 TANPA SISA KOSONG)
  // ============================================================================
  const generateStudentLkpdHtml = () => {
    const pagesHtml: string[] = [];

    selectedTopicsList.forEach((targetTopic) => {
      const activeKeys: (keyof ActivitySelection)[] = (
        ['act1_concepts', 'act2_observation', 'act3_pbl', 'act4_essay'] as (keyof ActivitySelection)[]
      ).filter((k) => activities[k]);

      if (pageFitMode === 'one-sheet-per-activity' || activeKeys.length === 1) {
        activeKeys.forEach((key) => {
          let actHtml = '';
          let badge = '';
          if (key === 'act1_concepts') {
            actHtml = buildAct1ConceptsHtml(targetTopic);
            badge = 'Aktivitas 1: Konsep Materi';
          } else if (key === 'act2_observation') {
            actHtml = buildAct2ObservationHtml(targetTopic);
            badge = 'Aktivitas 2: Tabel Pengamatan';
          } else if (key === 'act3_pbl') {
            actHtml = buildAct3PblHtml(targetTopic);
            badge = 'Aktivitas 3: Kasus PBL (Tahap 1–4)';
          } else if (key === 'act4_essay') {
            actHtml = buildAct4EssayHtml(targetTopic);
            badge = 'Aktivitas 4: Soal Uraian';
          }

          pagesHtml.push(`
            <div class="lkpd-full-page">
              ${buildCompactHeaderAndIdentityHtml(targetTopic, badge)}
              ${actHtml}
              ${buildFooterStripHtml(targetTopic, badge)}
            </div>
          `);
        });
      } else {
        const combinedContent = [
          activities.act1_concepts ? buildAct1ConceptsHtml(targetTopic) : '',
          activities.act2_observation ? buildAct2ObservationHtml(targetTopic) : '',
          activities.act3_pbl ? buildAct3PblHtml(targetTopic) : '',
          activities.act4_essay ? buildAct4EssayHtml(targetTopic) : ''
        ].join('');

        pagesHtml.push(`
          <div style="width: 100%; box-sizing: border-box;">
            ${buildCompactHeaderAndIdentityHtml(targetTopic, 'LKPD Gabungan')}
            ${combinedContent}
            ${buildFooterStripHtml(targetTopic, 'LKPD Gabungan')}
          </div>
        `);
      }
    });

    return pagesHtml
      .map((sheetHtml, idx) => {
        const isLast = idx === pagesHtml.length - 1;
        const pageBreakStyle = isLast
          ? 'page-break-after: auto; break-after: auto;'
          : 'page-break-after: always; break-after: page;';
        return `<div style="${pageBreakStyle}">${sheetHtml}</div>`;
      })
      .join('');
  };

  // ============================================================================
  // GENERATOR KUNCI JAWABAN GURU
  // ============================================================================
  const generateSingleTopicTeacherRubricHtml = (targetTopic: Topic) => {
    const tScenario = getTopicPblScenario(
      targetTopic.id,
      targetTopic.title,
      targetTopic.grade,
      targetTopic.category
    );
    const tRomanGrade = getRomanGrade(targetTopic.grade);
    const tEssayQuestions = buildTopicEssayQuestions(targetTopic);

    const conceptsKeyHtml = targetTopic.materi.keyConcepts
      .map(
        (kc, idx) => `
        <tr>
          <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
          <td style="font-weight: bold;">${escapeHtml(kc.title)}</td>
          <td>
            <div>${escapeHtml(kc.explanation)}</div>
            <ul style="margin: 2px 0 0; padding-left: 14px;">
              ${kc.bulletPoints.map((bp) => `<li>${escapeHtml(bp)}</li>`).join('')}
            </ul>
          </td>
        </tr>
      `
      )
      .join('');

    const rootCausesHtml = tScenario.potentialCauses
      .filter((c) => c.isRootCause)
      .map((c) => `<li><strong>${escapeHtml(c.text)}</strong> — ${escapeHtml(c.explanation)}</li>`)
      .join('');

    const actionsKeyHtml = tScenario.recommendedActions
      .map((a) => `<li><strong>${escapeHtml(a.title)} (${escapeHtml(a.category)}):</strong> ${escapeHtml(a.desc)}</li>`)
      .join('');

    const essayKeyHtml = tEssayQuestions
      .map(
        (eq) => `
        <tr>
          <td style="text-align: center; font-weight: bold; width: 6%;">${eq.no}</td>
          <td style="width: 42%; font-weight: bold;">${escapeHtml(eq.question)}</td>
          <td style="width: 52%; color: #065f46; background: #ecfdf5;">${escapeHtml(eq.answerKey)}</td>
        </tr>
      `
      )
      .join('');

    return `
      <div class="text-center" style="margin-bottom: 10px; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">
        <h3 style="margin: 0; font-size: 12pt; font-weight: 800; text-transform: uppercase;">
          KUNCI JAWABAN &amp; RUBRIK PENILAIAN LKPD: ${escapeHtml(targetTopic.title.toUpperCase())}
        </h3>
        <p style="margin: 2px 0 0; font-size: 9pt; font-weight: 600;">
          Kelas ${tRomanGrade} · Kategori: ${escapeHtml(targetTopic.category)} · Guru Pengampu: ${escapeHtml(teacherProfile.teacherName)}
        </p>
      </div>

      ${
        activities.act1_concepts
          ? `
      <h4 style="margin: 8px 0 4px; font-size: 9.5pt; color: #0f172a; text-transform: uppercase;">
        Pedoman Jawaban Aktivitas 1 (Konsep Utama Materi)
      </h4>
      <table style="font-size: 8.5pt; margin-bottom: 10px;">
        <thead>
          <tr>
            <th style="width: 6%;">No</th>
            <th style="width: 30%;">Konsep Kunci</th>
            <th style="width: 64%;">Kunci Penjelasan &amp; Poin Penting</th>
          </tr>
        </thead>
        <tbody>
          ${conceptsKeyHtml}
        </tbody>
      </table>
      `
          : ''
      }

      ${
        activities.act3_pbl
          ? `
      <h4 style="margin: 8px 0 4px; font-size: 9.5pt; color: #be123c; text-transform: uppercase;">
        Pedoman Jawaban Aktivitas 3 (Studi Kasus PBL Kelompok — Tahap 1 s.d. 4)
      </h4>
      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 6px; font-size: 8.5pt; margin-bottom: 10px;">
        <p style="margin: 0 0 3px;"><strong>1. Identifikasi Masalah (${escapeHtml(tScenario.headline)}):</strong> ${escapeHtml(tScenario.drivingQuestion)}</p>
        <p style="margin: 0 0 3px;"><strong>2. Analisis Akar Penyebab:</strong></p>
        <ul style="margin: 0 0 6px; padding-left: 16px;">${rootCausesHtml}</ul>
        <p style="margin: 0 0 3px;"><strong>3 &amp; 4. Solusi Nyata &amp; Sketsa Karya (${escapeHtml(tScenario.deliverableName)}):</strong></p>
        <ul style="margin: 0; padding-left: 16px;">${actionsKeyHtml}</ul>
      </div>
      `
          : ''
      }

      ${
        activities.act4_essay
          ? `
      <h4 style="margin: 8px 0 4px; font-size: 9.5pt; color: #047857; text-transform: uppercase;">
        Kunci Jawaban Aktivitas 4 (Soal Uraian Tulis Tangan)
      </h4>
      <table style="font-size: 8.5pt; margin-bottom: 10px;">
        <thead>
          <tr>
            <th>No</th>
            <th>Pertanyaan Uraian</th>
            <th>Pedoman Jawaban Benar</th>
          </tr>
        </thead>
        <tbody>
          ${essayKeyHtml}
        </tbody>
      </table>
      `
          : ''
      }
    `;
  };

  const generateTeacherRubricHtml = () => {
    return selectedTopicsList
      .map((t, idx) => {
        const isLast = idx === selectedTopicsList.length - 1;
        const pageBreakStyle = isLast
          ? 'page-break-after: auto; break-after: auto;'
          : 'page-break-after: always; break-after: page;';
        return `<div style="${pageBreakStyle}">${generateSingleTopicTeacherRubricHtml(t)}</div>`;
      })
      .join('');
  };

  const handlePrintStudentLkpd = async () => {
    if (!hasAnyActivitySelected) {
      return;
    }
    playClick();
    setIsPrinting(true);
    const titleLabel =
      selectedTopicsList.length === 1
        ? `LKPD-${paperSize}-${selectedTopicsList[0].id.toUpperCase()}`
        : `LKPD-${paperSize}-${selectedTopicsList.length}-Materi`;
    await printHtmlDocument({
      title: titleLabel,
      contentHtml: generateStudentLkpdHtml(),
      landscape: false,
      paperSize
    });
    setIsPrinting(false);
    setHasPrinted(true);
    playSuccess();
  };

  const handlePrintTeacherKey = async () => {
    playClick();
    setIsPrintingKey(true);
    await printHtmlDocument({
      title: `KUNCI-LKPD-GURU-${paperSize}`,
      contentHtml: generateTeacherRubricHtml(),
      landscape: false,
      paperSize
    });
    setIsPrintingKey(false);
  };

  // Total sheets estimate
  const totalPrintedSheets =
    pageFitMode === 'one-sheet-per-activity'
      ? selectedTopicsList.length * Math.max(1, coreSelectedCount)
      : selectedTopicsList.length;

  const previewKcCount = previewTopic.materi.keyConcepts.length;
  const previewAct1Lines =
    paperSize === 'F4'
      ? previewKcCount <= 3
        ? Math.max(lineCount + 2, 7)
        : Math.max(lineCount + 1, 6)
      : Math.max(lineCount, 4);
  const previewStage12Lines = paperSize === 'F4' ? Math.max(5, lineCount) : Math.max(3, lineCount - 1);
  const previewStage3Lines = paperSize === 'F4' ? Math.max(6, lineCount + 1) : Math.max(4, lineCount);
  const previewSketchHeight = paperSize === 'F4' ? 215 : 125;
  const previewEssayLines = paperSize === 'F4' ? Math.max(5, lineCount) : Math.max(3, lineCount - 1);

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <button
          onClick={() => {
            playClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Materi</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {isTeacher && (
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleTeacherAnswerKeys();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                showTeacherAnswerKeys
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>{showTeacherAnswerKeys ? 'Kunci Jawaban LKPD: TAMPIL' : 'Lihat Kunci Jawaban LKPD (Guru)'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              playClick();
              openEditModal();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border ${
              isCustomized
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-600'
                : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
            }`}
            title="Ubah nama guru dan NIP pada LKPD untuk guru lain"
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{isCustomized ? `Guru: ${teacherProfile.teacherName.split(',')[0]}` : 'Ubah Nama Guru & NIP'}</span>
          </button>

          <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-200 dark:border-teal-800">
            1 Halaman Penuh Kertas {paperSize} · Tanpa Ruang Kosong di Bawah
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PILIHAN MODE LKPD: VERSI CETAK (F4/A4 TULIS TANGAN) vs VERSI DIGITAL       */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-2xl max-w-xl mx-auto shadow-inner border border-slate-300 dark:border-slate-700 print:hidden select-none">
        <button
          type="button"
          onClick={() => {
            playClick();
            setLkpdMode('cetak');
          }}
          className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            lkpdMode === 'cetak'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Versi Cetak (Penuh Kertas {paperSize})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            setLkpdMode('interaktif');
          }}
          className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            lkpdMode === 'interaktif'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Versi Diisi di Aplikasi</span>
        </button>
      </div>

      {lkpdMode === 'interaktif' ? (
        <LkpdDigitalInteractiveView
          topic={previewTopic}
          onNext={onNext}
          onBackToDashboard={onBackToDashboard}
          onSwitchToPrint={() => {
            playClick();
            setLkpdMode('cetak');
          }}
        />
      ) : (
        <>
          {/* Header & Configuration Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6 print:hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  <FileCheck className="w-4 h-4" />
                  <span>Ukuran Proporsional Penuh Kertas F4 (215 × 330 mm) · Tidak Menyisakan Ruang Kosong di Bawah</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Cetak Lembar Kerja Peserta Didik (LKPD) Penuh 1 Halaman {paperSize}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                  Tata letak LKPD telah disesuaikan agar <strong>teks jelas terbaca</strong> dan <strong>mengisi 1 halaman penuh kertas F4 (Folio) dari atas sampai batas bawah tanpa menyisakan ruang kosong</strong>. Kotak identitas siswa ringkas di bagian atas dan kolom jawaban (termasuk <strong>Tahap 1 s.d. 4 PBL</strong>) tampil lega.
                </p>
              </div>

              {/* Primary Print CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handlePrintStudentLkpd}
                  disabled={isPrinting || !hasAnyActivitySelected}
                  className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-lg transition-all active:scale-95 cursor-pointer ${
                    hasAnyActivitySelected
                      ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span>
                    {isPrinting
                      ? `Menyiapkan ${paperSize}...`
                      : hasAnyActivitySelected
                      ? `Cetak LKPD ${paperSize} Penuh (${totalPrintedSheets} Lembar)`
                      : 'Pilih Materi Tugas Dahulu'}
                  </span>
                </button>

                {isTeacher && (
                  <button
                    type="button"
                    onClick={handlePrintTeacherKey}
                    disabled={isPrintingKey || !hasAnyActivitySelected}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                    title="Khusus Guru: Cetak Kunci Jawaban & Pedoman Penskoran untuk materi terpilih"
                  >
                    <Key className="w-4 h-4" />
                    <span>{isPrintingKey ? 'Menyiapkan...' : 'Cetak Kunci Guru'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* LANGKAH 1: PILIH MATERI POKOK KURIKULUM YANG INGIN DICETAK                */}
            {/* ========================================================================= */}
            <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/20 border-2 border-sky-200 dark:border-sky-900/60 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    1. Pilih Topik Materi Pokok yang Ingin Dicetak:
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white font-mono text-xs font-bold">
                    {selectedTopicsList.length} Topik Terpilih
                  </span>
                </div>

                {/* Mode Pilih 1 Materi vs Multi-Materi & Preset Kelas */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setTopicSelectionMode('single');
                      setSelectedTopicIds([previewTopic.id]);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      topicSelectionMode === 'single'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Pilih 1 Topik
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setTopicSelectionMode('multiple');
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                      topicSelectionMode === 'multiple'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Pilih Beberapa Topik
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    type="button"
                    onClick={handleSelectOnlyCurrentTopic}
                    className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-sky-600 hover:text-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
                  >
                    Topik Aktif Ini
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectGradeTopics(7)}
                    className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-sky-600 hover:text-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
                  >
                    Semua Kelas 7
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectGradeTopics(8)}
                    className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-sky-600 hover:text-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
                  >
                    Semua Kelas 8
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectGradeTopics(9)}
                    className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-sky-600 hover:text-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
                  >
                    Semua Kelas 9
                  </button>
                  <button
                    type="button"
                    onClick={handleSelectAllCurriculumTopics}
                    className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-teal-600 hover:text-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
                  >
                    Semua 7 Topik
                  </button>
                </div>
              </div>

              {/* Daftar 7 Materi Kurikulum (Kelas 7, 8, 9) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {TOPICS.map((item) => {
                  const isSelected = selectedTopicIds.includes(item.id);
                  const isPreviewed = previewTopic.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectTopic(item.id)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 select-none ${
                        isSelected
                          ? 'border-sky-600 dark:border-sky-400 bg-white dark:bg-slate-900 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded font-mono ${
                            item.grade === 7
                              ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                              : item.grade === 8
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          KELAS {item.grade}
                        </span>
                        <div className="flex items-center gap-1">
                          {isPreviewed && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                              Aktif
                            </span>
                          )}
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* LANGKAH 2: PILIH MATERI AKTIVITAS LKPD (1 MATERI = 1 HALAMAN F4 PENUH)    */}
            {/* ========================================================================= */}
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border-2 border-teal-200 dark:border-teal-900/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    2. Pilih Materi Aktivitas yang Dicetak (1 Aktivitas = 1 Halaman Penuh {paperSize}):
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-600 text-white font-mono text-xs font-bold">
                    {coreSelectedCount} Aktivitas Terpilih
                  </span>
                </div>

                {/* Quick Preset Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] font-semibold mr-1">
                    Pilih 1 Materi (1 Halaman Penuh):
                  </span>
                  <button
                    type="button"
                    onClick={selectOnlyAct1}
                    className={`px-2.5 py-1 rounded-lg border font-bold transition-colors cursor-pointer ${
                      activities.act1_concepts && coreSelectedCount === 1
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white dark:bg-slate-800 hover:bg-slate-900 hover:text-white border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Hanya Akt 1 (Konsep)
                  </button>
                  <button
                    type="button"
                    onClick={selectOnlyAct2}
                    className={`px-2.5 py-1 rounded-lg border font-bold transition-colors cursor-pointer ${
                      activities.act2_observation && coreSelectedCount === 1
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white dark:bg-slate-800 hover:bg-sky-600 hover:text-white border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Hanya Akt 2 (Tabel)
                  </button>
                  <button
                    type="button"
                    onClick={selectOnlyAct3Pbl}
                    className={`px-2.5 py-1 rounded-lg border font-bold transition-colors cursor-pointer ${
                      activities.act3_pbl && coreSelectedCount === 1
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white dark:bg-slate-800 hover:bg-rose-600 hover:text-white border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Hanya Akt 3 (PBL Tahap 1–4)
                  </button>
                  <button
                    type="button"
                    onClick={selectOnlyAct4Essay}
                    className={`px-2.5 py-1 rounded-lg border font-bold transition-colors cursor-pointer ${
                      activities.act4_essay && coreSelectedCount === 1
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-slate-800 hover:bg-emerald-600 hover:text-white border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Hanya Akt 4 (5 Soal Uraian)
                  </button>
                  <button
                    type="button"
                    onClick={selectAll}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-teal-600 hover:text-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors cursor-pointer"
                  >
                    Semua 4 Aktivitas
                  </button>
                </div>
              </div>

              {/* Interactive Checkbox Cards for the 4 Core Activities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Card Aktivitas 1 */}
                <div
                  onClick={() => toggleActivity('act1_concepts')}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                    activities.act1_concepts
                      ? 'border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="mt-0.5">
                    {activities.act1_concepts ? (
                      <CheckSquare className="w-4 h-4 text-slate-900 dark:text-white" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono">
                        AKTIVITAS 1
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Konsep Utama
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      Lengkap {previewTopic.materi.keyConcepts.length} konsep kunci + kesimpulan (1 Halaman Penuh {paperSize}).
                    </p>
                  </div>
                </div>

                {/* Card Aktivitas 2 */}
                <div
                  onClick={() => toggleActivity('act2_observation')}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                    activities.act2_observation
                      ? 'border-sky-600 dark:border-sky-500 bg-white dark:bg-slate-900 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="mt-0.5">
                    {activities.act2_observation ? (
                      <CheckSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-sky-600 text-white font-mono">
                        AKTIVITAS 2
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Tabel Pengamatan
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      Lengkap Tugas 2A perbandingan &amp; Tugas 2B observasi (1 Halaman Penuh {paperSize}).
                    </p>
                  </div>
                </div>

                {/* Card Aktivitas 3 */}
                <div
                  onClick={() => toggleActivity('act3_pbl')}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                    activities.act3_pbl
                      ? 'border-rose-600 dark:border-rose-500 bg-white dark:bg-slate-900 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="mt-0.5">
                    {activities.act3_pbl ? (
                      <CheckSquare className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-rose-600 text-white font-mono">
                        AKTIVITAS 3
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Kasus PBL (Tahap 1–4)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      Lengkap Masalah, Penyebab, Solusi, &amp; Tahap 4 Kotak Sketsa (1 Halaman Penuh {paperSize}).
                    </p>
                  </div>
                </div>

                {/* Card Aktivitas 4 */}
                <div
                  onClick={() => toggleActivity('act4_essay')}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-2.5 select-none ${
                    activities.act4_essay
                      ? 'border-emerald-600 dark:border-emerald-500 bg-white dark:bg-slate-900 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="mt-0.5">
                    {activities.act4_essay ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-600 text-white font-mono">
                        AKTIVITAS 4
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        5 Soal Uraian / Esai
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      Lengkap 5 soal penalaran HOTS dengan baris tulis tangan (1 Halaman Penuh {paperSize}).
                    </p>
                  </div>
                </div>
              </div>

              {!hasAnyActivitySelected && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Silakan pilih minimal 1 aktivitas di atas untuk menampilkan dan mencetak lembar kerja {paperSize}.</span>
                </div>
              )}
            </div>

            {/* Pilihan Ukuran Kertas (F4/A4), Nomor Kelompok, Format Baris & Jumlah Baris Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              {/* Pilihan Ukuran Kertas Cetak: F4 Penuh (Default) vs A4 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5 text-teal-600" />
                  <span>Ukuran Kertas Cetak:</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setPaperSize('F4');
                      setLineCount(5);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                      paperSize === 'F4'
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    F4 / Folio Penuh
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setPaperSize('A4');
                      setLineCount(4);
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      paperSize === 'A4'
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    A4 Penuh
                  </button>
                </div>
              </div>

              {/* Pilihan Nomor Kelompok (1 s/d 6) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-600" />
                  <span>Pilih / Tulis Nomor Kelompok:</span>
                </label>
                <div className="grid grid-cols-6 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    const label = `Kelompok ${num}`;
                    const isSelected = selectedGroupNumber === label;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          playClick();
                          setSelectedGroupNumber(label);
                          setCustomGroupName(label);
                        }}
                        className={`py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-teal-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        K-{num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Format Baris Tulis Tangan */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-sky-600" />
                  <span>Format Baris Tulis Tangan:</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setLineStyle('dotted');
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      lineStyle === 'dotted'
                        ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Titik-Titik
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setLineStyle('ruled');
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      lineStyle === 'ruled'
                        ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Garis Lurus
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setLineStyle('box');
                    }}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      lineStyle === 'box'
                        ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Kotak Kosong
                  </button>
                </div>
              </div>

              {/* Jumlah Baris Jawaban */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Jumlah Baris Jawaban:</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  {[4, 5, 6].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => {
                        playClick();
                        setLineCount(cnt);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        lineCount === cnt
                          ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {cnt} Baris {cnt === 5 ? '(Penuh F4)' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Opsi Kolom Identitas: Kosong vs Isi Kelompok/Siswa/Kelas */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setIdentityMode('blank');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    identityMode === 'blank'
                      ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Kosongkan Identitas (Diisi Tulis Tangan Siswa)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setIdentityMode('prefilled');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    identityMode === 'prefilled'
                      ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Pra-Ketik Nama Kelompok / Siswa &amp; Kelas
                </button>
              </div>

              {identityMode === 'prefilled' && (
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={customGroupName}
                    onChange={(e) => setCustomGroupName(e.target.value)}
                    placeholder="Nama / No. Kelompok"
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={customStudentName}
                    onChange={(e) => setCustomStudentName(e.target.value)}
                    placeholder="Nama Siswa (Opsional)"
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={customClass}
                    onChange={(e) => setCustomClass(e.target.value)}
                    placeholder="Kelas (contoh: VII A)"
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB SWITCHER PRATINJAU JIKA MEMILIH LEBIH DARI 1 TOPIK MATERI             */}
          {/* ========================================================================= */}
          {selectedTopicsList.length > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-sky-900 text-white shadow-md print:hidden">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Layers className="w-4 h-4 text-sky-300 shrink-0" />
                <span>Pratinjau Topik Materi Terpilih:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedTopicsList.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setPreviewTopicId(t.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      previewTopic.id === t.id
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-sky-800 hover:bg-sky-700 text-sky-100'
                    }`}
                  >
                    {idx + 1}. {t.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* LIVE FULL-PAGE F4 PRINTABLE WORKSHEET PREVIEW                             */}
          {/* Proporsional 215mm x 330mm, Huruf Jelas, Penuh Sampai Bawah Tanpa Kosong  */}
          {/* ========================================================================= */}
          <div className="bg-slate-200/80 dark:bg-slate-950 p-4 sm:p-8 rounded-3xl border border-slate-300 dark:border-slate-800 flex justify-center overflow-x-auto">
            <div
              className={`w-full ${
                paperSize === 'F4' ? 'max-w-[215mm] min-h-[330mm]' : 'max-w-[210mm] min-h-[297mm]'
              } bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-300 flex flex-col justify-between gap-3 text-[13px] leading-relaxed font-sans`}
            >
              {/* TOP SECTION: JUDUL LKPD & KOTAK IDENTITAS DIPERKECIL */}
              <div className="space-y-2.5 shrink-0">
                {/* 1. JUDUL LKPD 1 BARIS JELAS */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-[2.5px] border-slate-900 pb-2">
                  <h2 className="text-sm sm:text-base font-black uppercase tracking-wide text-slate-950">
                    LKPD INFORMATIKA KELAS {romanGrade} — MATERI: {previewTopic.title.toUpperCase()}
                  </h2>
                </div>

                {/* 2. KOTAK IDENTITAS SISWA / KELOMPOK DIPERKECIL (2 BARIS JELAS TERBACA) */}
                <table className="w-full border-collapse border-2 border-slate-900 text-xs">
                  <tbody>
                    <tr>
                      <td className="w-[18%] bg-slate-100 font-extrabold px-2.5 py-1.5 border border-slate-400">
                        Kelompok / Siswa
                      </td>
                      <td className="w-[34%] font-bold px-2.5 py-1.5 border border-slate-400 text-slate-900">
                        {identityMode === 'blank'
                          ? '..................................................................'
                          : [customGroupName.trim() || selectedGroupNumber, customStudentName.trim()]
                              .filter(Boolean)
                              .join(' / ')}
                      </td>
                      <td className="w-[13%] bg-slate-100 font-extrabold px-2.5 py-1.5 border border-slate-400">
                        Kelas / Tgl
                      </td>
                      <td className="w-[22%] px-2.5 py-1.5 border border-slate-400 text-slate-800">
                        {identityMode === 'blank' || !customClass.trim()
                          ? `Kelas ${previewTopic.grade} ...... / ............`
                          : `${customClass} / ${new Date().toLocaleDateString('id-ID')}`}
                      </td>
                      <td
                        rowSpan={2}
                        className="w-[13%] bg-slate-50 border-l-2 border-slate-900 px-2 py-1.5 text-center align-middle"
                      >
                        <div className="text-[10px] font-black uppercase text-slate-900">NILAI</div>
                        <div className="mt-1 mx-auto w-16 h-7 bg-white border-2 border-slate-900 rounded flex items-center justify-center text-[10px] text-slate-500 font-bold font-mono">
                          .... / 100
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-slate-100 font-extrabold px-2.5 py-1.5 border border-slate-400">
                        Anggota (1–6)
                      </td>
                      <td colSpan={3} className="px-2.5 py-1.5 border border-slate-400 text-[11.5px] text-slate-800">
                        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                          <span>1. ........................................</span>
                          <span>2. ........................................</span>
                          <span>3. ........................................</span>
                          <span>4. ........................................</span>
                          <span>5. ........................................</span>
                          <span>6. ........................................</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* MIDDLE SECTION: FILL 100% HEIGHT OF F4 PAGE */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                {/* JIKA TIDAK ADA AKTIVITAS YANG DIPILIH */}
                {!hasAnyActivitySelected && (
                  <div className="p-8 my-auto text-center border-2 border-dashed border-rose-300 rounded-2xl bg-rose-50/50 space-y-2">
                    <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                    <div className="font-bold text-slate-900 text-sm">
                      Belum Ada Materi Aktivitas yang Dipilih
                    </div>
                    <button
                      type="button"
                      onClick={selectOnlyAct3Pbl}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Tampilkan Aktivitas 3 (PBL Tahap 1–4)
                    </button>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* AKTIVITAS 1: KONSEP UTAMA MATERI (PENUH 1 HALAMAN F4)                     */}
                {/* ========================================================================= */}
                {activities.act1_concepts && (
                  <div className="flex-1 flex flex-col justify-between gap-2.5 animate-in fade-in">
                    <div className="space-y-2 shrink-0">
                      <div className="bg-slate-900 text-white px-3.5 py-1.5 rounded font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-between">
                        <span>AKTIVITAS 1 — MEMAHAMI &amp; MENULISKAN KONSEP UTAMA MATERI</span>
                      </div>
                      <p className="text-xs text-slate-800 bg-slate-50 px-3 py-2 rounded border border-slate-300 leading-relaxed">
                        <strong>Pengantar Materi:</strong> {previewTopic.materi.overview}
                      </p>
                    </div>

                    <table className="w-full flex-1 border-collapse border-2 border-slate-900 text-xs">
                      <thead>
                        <tr className="bg-slate-200 text-slate-950">
                          <th className="border border-slate-600 p-2 w-10 text-center font-black">No</th>
                          <th className="border border-slate-600 p-2 w-1/3 text-left font-black">
                            Konsep Kunci &amp; Kisi-Kisi
                          </th>
                          <th className="border border-slate-600 p-2 text-left font-black">
                            Penjelasan Siswa &amp; Contoh Nyata (Tulis Tangan)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewTopic.materi.keyConcepts.map((kc, idx) => (
                          <tr key={idx}>
                            <td className="border border-slate-500 p-2.5 text-center font-extrabold align-top text-xs">
                              {idx + 1}
                            </td>
                            <td className="border border-slate-500 p-2.5 align-top space-y-1">
                              <div className="font-extrabold text-slate-950 text-xs">
                                {kc.title.replace(/^\d+\.\s*/, '')}
                              </div>
                              <div className="text-[11.5px] text-slate-700 leading-snug">
                                <strong>Kisi-Kisi Konsep:</strong> {kc.bulletPoints[0] || kc.explanation}
                              </div>
                              {isTeacher && showTeacherAnswerKeys && (
                                <div className="mt-1.5 p-2 rounded bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-900">
                                  <strong>Kunci Guru:</strong> {kc.explanation}
                                </div>
                              )}
                            </td>
                            <td className="border border-slate-500 p-2.5 align-top">
                              <span className="text-[11px] text-slate-500 italic block">
                                Tuliskan penjelasan dengan bahasamu sendiri beserta contoh penerapannya:
                              </span>
                              {renderPreviewLines(previewAct1Lines)}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="border border-slate-500 p-2.5 text-center font-extrabold align-top text-xs">
                            {previewKcCount + 1}
                          </td>
                          <td className="border border-slate-500 p-2.5 align-top bg-slate-50 space-y-1">
                            <div className="font-extrabold text-slate-950 text-xs">
                              Kesimpulan &amp; Manfaat Utama Materi
                            </div>
                            <div className="text-[11.5px] text-slate-700 leading-snug">
                              Simpulkan manfaat mempelajari materi <strong>{previewTopic.title}</strong> bagi aktivitas belajar atau kehidupan sehari-hari!
                            </div>
                          </td>
                          <td className="border border-slate-500 p-2.5 align-top">
                            <span className="text-[11px] text-slate-500 italic block">
                              Tuliskan kesimpulan kelompok/siswamu secara lengkap:
                            </span>
                            {renderPreviewLines(Math.max(4, previewAct1Lines - 1))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* AKTIVITAS 2: TABEL PENGAMATAN (PENUH 1 HALAMAN F4)                        */}
                {/* ========================================================================= */}
                {activities.act2_observation && (
                  <div className="flex-1 flex flex-col justify-between gap-3 animate-in fade-in">
                    <div className="bg-sky-700 text-white px-3.5 py-1.5 rounded font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-between shrink-0">
                      <span>AKTIVITAS 2 — TABEL EKSPLORASI &amp; PENGAMATAN DI SEKOLAH / RUMAH</span>
                    </div>

                    {previewTopic.materi.comparisonTable && (
                      <div className="flex-1 flex flex-col space-y-1.5">
                        <p className="text-xs font-extrabold text-slate-900">
                          Tugas 2A: Tabel Analisis — {previewTopic.materi.comparisonTable.title}
                        </p>
                        <table className="w-full flex-1 border-collapse border-2 border-slate-900 text-xs">
                          <thead>
                            <tr className="bg-sky-100 text-slate-950">
                              <th className="border border-slate-500 p-2 w-10 text-center font-black">No</th>
                              <th className="border border-slate-500 p-2 w-1/3 text-left font-black">
                                {previewTopic.materi.comparisonTable.headers[0] || 'Komponen'}
                              </th>
                              <th className="border border-slate-500 p-2 text-left font-black">
                                Hasil Analisis / Ciri Utama / Perbedaan (Tulis Tangan)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {previewTopic.materi.comparisonTable.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                <td className="border border-slate-500 p-2 text-center font-extrabold align-top">
                                  {rIdx + 1}
                                </td>
                                <td className="border border-slate-500 p-2 font-extrabold align-top">
                                  {row[0]}
                                  {isTeacher && showTeacherAnswerKeys && (
                                    <div className="mt-1 font-normal text-[11px] text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200">
                                      <strong>Kunci:</strong> {row.slice(1).join(' · ')}
                                    </div>
                                  )}
                                </td>
                                <td className="border border-slate-500 p-2 align-top">
                                  {renderPreviewLines(paperSize === 'F4' ? Math.max(3, lineCount - 1) : Math.max(2, lineCount - 2))}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="flex-1 flex flex-col space-y-1.5">
                      <p className="text-xs font-extrabold text-slate-900">
                        Tugas {previewTopic.materi.comparisonTable ? '2B' : '2'}: Amatilah penerapan materi "{previewTopic.title}" di lingkungan sekolah atau rumahmu, lalu tuliskan temuanmu!
                      </p>
                      <table className="w-full flex-1 border-collapse border-2 border-slate-900 text-xs">
                        <thead>
                          <tr className="bg-sky-100 text-slate-950">
                            <th className="border border-slate-500 p-2 w-10 text-center font-black">No</th>
                            <th className="border border-slate-500 p-2 w-5/12 text-left font-black">
                              Bentuk Penerapan / Contoh yang Ditemukan
                            </th>
                            <th className="border border-slate-500 p-2 text-left font-black">
                              Manfaat atau Cara Kerjanya (Tulis Tangan)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(previewTopic.materi.comparisonTable ? [0, 1, 2] : [0, 1, 2, 3]).map((idx) => {
                            const obsRowLines =
                              paperSize === 'F4'
                                ? previewTopic.materi.comparisonTable
                                  ? Math.max(4, lineCount)
                                  : Math.max(6, lineCount + 2)
                                : Math.max(3, lineCount - 1);
                            return (
                              <tr key={idx}>
                                <td className="border border-slate-500 p-2 text-center font-extrabold align-top">
                                  {idx + 1}
                                </td>
                                <td className="border border-slate-500 p-2 align-top">
                                  {idx === 0 ? (
                                    <span className="text-[11px] text-slate-600 italic block">
                                      Contoh 1 (Petunjuk: {previewTopic.materi.schoolExamples[0] || previewTopic.materi.dailyLifeExamples[0]})
                                    </span>
                                  ) : (
                                    <span className="text-[11px] text-slate-500 italic block">
                                      Temuan Pengamatan {idx + 1}:
                                    </span>
                                  )}
                                  {renderPreviewLines(obsRowLines)}
                                </td>
                                <td className="border border-slate-500 p-2 align-top">
                                  <span className="text-[11px] text-slate-500 italic block">
                                    Cara Kerja / Manfaatnya:
                                  </span>
                                  {renderPreviewLines(obsRowLines)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* AKTIVITAS 3: PBL KELOMPOK (LENGKAP SAMPAI TAHAP 4 PENUH 1 HALAMAN F4)     */}
                {/* ========================================================================= */}
                {activities.act3_pbl && (
                  <div className="flex-1 flex flex-col justify-between gap-2.5 animate-in fade-in">
                    <div className="space-y-2 shrink-0">
                      <div className="bg-rose-700 text-white px-3.5 py-1.5 rounded font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-between">
                        <span>AKTIVITAS 3 — PEMECAHAN KASUS NYATA &amp; DISKUSI KELOMPOK (PBL TAHAP 1 S.D. 4)</span>
                      </div>

                      <div className="p-3 rounded-lg bg-rose-50 border-2 border-rose-200 space-y-1.5 text-xs leading-snug">
                        <div className="font-black text-rose-900 text-[13px]">
                          KASUS LAPANGAN: {pblScenario.headline} ({pblScenario.location})
                        </div>
                        <p className="text-slate-900 leading-relaxed">{pblScenario.contextStory}</p>
                        <div className="font-extrabold text-rose-950">
                          Pertanyaan Utama Masalah: "{pblScenario.drivingQuestion}"
                        </div>
                        <div className="pt-0.5 text-[11.5px]">
                          <span className="font-bold text-slate-800 block">Kisi-Kisi Arahan Diskusi Kelompok:</span>
                          <ul className="list-disc pl-5 text-slate-800 space-y-0.5">
                            {pblScenario.whatWeNeedToLearn.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <table className="w-full flex-1 border-collapse border-2 border-slate-900 text-xs">
                      <tbody>
                        <tr>
                          <td className="border border-slate-500 p-3 w-[31%] bg-slate-50 align-top">
                            <div className="font-extrabold text-slate-950 text-[13px]">
                              1. Identifikasi Masalah Utama
                            </div>
                            <p className="text-[11.5px] text-slate-700 mt-1 leading-snug">
                              Apa masalah utama yang terjadi pada kasus di atas dan siapa saja pihak yang terdampak?
                            </p>
                          </td>
                          <td className="border border-slate-500 p-3 align-top">
                            {renderPreviewLines(previewStage12Lines)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-500 p-3 bg-slate-50 align-top">
                            <div className="font-extrabold text-slate-950 text-[13px]">
                              2. Analisis Akar Penyebab
                            </div>
                            <p className="text-[11.5px] text-slate-700 mt-1 leading-snug">
                              Mengapa masalah tersebut bisa terjadi? Sebutkan dan jelaskan minimal 2 penyebab utamanya!
                            </p>
                            {isTeacher && showTeacherAnswerKeys && (
                              <div className="mt-1.5 p-2 rounded bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-900">
                                <strong>Kunci Penyebab (Guru):</strong>
                                <ul className="list-disc pl-4 mt-0.5">
                                  {pblScenario.potentialCauses
                                    .filter((c) => c.isRootCause)
                                    .map((c) => (
                                      <li key={c.id}>{c.text}</li>
                                    ))}
                                </ul>
                              </div>
                            )}
                          </td>
                          <td className="border border-slate-500 p-3 align-top">
                            {renderPreviewLines(previewStage12Lines)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-500 p-3 bg-slate-50 align-top">
                            <div className="font-extrabold text-slate-950 text-[13px]">
                              3. Solusi &amp; Langkah Nyata Kelompok
                            </div>
                            <p className="text-[11.5px] text-slate-700 mt-1 leading-snug">
                              Tuliskan langkah-langkah solusi kelompokmu untuk membuat karya:{' '}
                              <strong>{pblScenario.deliverableName}</strong>
                            </p>
                            {isTeacher && showTeacherAnswerKeys && (
                              <div className="mt-1.5 p-2 rounded bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-900">
                                <strong>Kunci Solusi (Guru):</strong>
                                <ul className="list-disc pl-4 mt-0.5">
                                  {pblScenario.recommendedActions.map((a) => (
                                    <li key={a.id}>{a.title}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </td>
                          <td className="border border-slate-500 p-3 align-top">
                            {renderPreviewLines(previewStage3Lines)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-500 p-3 bg-slate-50 align-top">
                            <div className="font-extrabold text-slate-950 text-[13px]">
                              4. Kotak Sketsa / Bagan Alur Solusi / Poster Mini
                            </div>
                            <p className="text-[11.5px] text-slate-700 mt-1 leading-snug">
                              Gambarkan bagan alur langkah penyelesaian, tabel rumus, atau poster slogan solusi kelompokmu di kotak samping!
                            </p>
                          </td>
                          <td className="border border-slate-500 p-3 align-top">
                            <div
                              style={{ height: `${previewSketchHeight}px` }}
                              className="border-2 border-dashed border-slate-500 rounded-lg p-2.5 text-xs text-slate-500 bg-white"
                            >
                              Area Gambar Bagan Alur / Sketsa Poster Solusi Tulis Tangan:
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* AKTIVITAS 4: SOAL URAIAN (LENGKAP 5 SOAL PENUH 1 HALAMAN F4)              */}
                {/* ========================================================================= */}
                {activities.act4_essay && (
                  <div className="flex-1 flex flex-col justify-between gap-2.5 animate-in fade-in">
                    <div className="bg-emerald-700 text-white px-3.5 py-1.5 rounded font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-between shrink-0">
                      <span>AKTIVITAS 4 — LATIHAN SOAL URAIAN / ESAI TULIS TANGAN (5 SOAL)</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between gap-2.5">
                      {essayQuestions.map((eq) => (
                        <div
                          key={eq.no}
                          className="flex-1 flex flex-col justify-between p-3 rounded-lg border border-slate-400 bg-white space-y-1"
                        >
                          <div>
                            <div className="font-extrabold text-slate-950 text-[13px]">
                              {eq.no}. {eq.question}
                            </div>
                            <div className="text-[11.5px] text-slate-600 italic">Petunjuk: {eq.hint}</div>
                            {isTeacher && showTeacherAnswerKeys && (
                              <div className="mt-1 p-2 rounded bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-900">
                                <strong>Pedoman Jawaban (Mode Guru):</strong> {eq.answerKey}
                              </div>
                            )}
                          </div>
                          {renderPreviewLines(previewEssayLines)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* BOTTOM FOOTER STRIP */}
              <div className="border-t-2 border-slate-900 pt-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-700 shrink-0">
                <span>
                  LKPD Informatika SMP Kelas {romanGrade} — {previewTopic.title}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Action & Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 print:hidden">
            <button
              type="button"
              onClick={() => {
                playClick();
                onBackToDashboard();
              }}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              &larr; Kembali ke Menu Materi
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePrintStudentLkpd}
                disabled={isPrinting || !hasAnyActivitySelected}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 cursor-pointer ${
                  hasAnyActivitySelected
                    ? 'bg-teal-600 hover:bg-teal-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Printer className="w-4 h-4" />
                <span>
                  {hasPrinted
                    ? `Cetak Ulang LKPD ${paperSize} Penuh (${totalPrintedSheets} Lembar)`
                    : `Cetak LKPD ${paperSize} Penuh (${totalPrintedSheets} Lembar)`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  onNext();
                }}
                className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Lanjut ke Aktivitas Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
