import React, { useState } from 'react';
import { Topic } from '../../types/curriculum';
import { PblScenario } from '../../data/pblScenariosData';
import { APP_ASSETS } from '../../constants/assets';
import { useTeacherProfile } from '../../context/TeacherProfileContext';
import { printHtmlDocument } from '../../utils/printHelper';
import { escapeHtml } from '../../utils/securityHelper';
import { Printer, X, Check, Copy, Sparkles, Award, UserCheck, Edit3 } from 'lucide-react';

interface LkpdPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic;
  scenario: PblScenario;
  studentName: string;
  studentClass?: string;
  selectedRole: string;
  studentProblemStatement: string;
  inspectedClues: Record<string, boolean>;
  selectedCauses: string[];
  investigationNotes: string;
  selectedActionIds: string[];
  solutionSummary: string;
  calculatedScore: number;
}

export const LkpdPrintModal: React.FC<LkpdPrintModalProps> = ({
  isOpen,
  onClose,
  topic,
  scenario,
  studentName,
  studentClass,
  selectedRole,
  studentProblemStatement,
  inspectedClues,
  selectedCauses,
  investigationNotes,
  selectedActionIds,
  solutionSummary,
  calculatedScore
}) => {
  const { teacherProfile, openEditModal, isCustomized } = useTeacherProfile();
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  if (!isOpen) return null;

  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const displayClass = studentClass?.trim() || `${topic.grade}`;

  const generateFullHtml = () => {
    const matchedRecommended = scenario.recommendedActions
      .filter((a) => selectedActionIds.includes(a.id))
      .map((a) => `<li><strong>${escapeHtml(a.title)}</strong> (${escapeHtml(a.category)}): ${escapeHtml(a.desc)}</li>`);

    const customActionItems = selectedActionIds
      .filter((item) => !scenario.recommendedActions.some((a) => a.id === item))
      .map((item) => `<li>${escapeHtml(item)}</li>`);

    const actionsHtml = [...customActionItems, ...matchedRecommended].join('');

    const causesHtml = selectedCauses.map((c) => `<li>${escapeHtml(c)}</li>`).join('');

    return `
      <div class="text-center" style="margin-bottom: 16px; padding-top: 4px;">
        <h3 style="margin: 0; font-size: 13pt; font-weight: 800; text-transform: uppercase; text-decoration: underline;">
          LEMBAR KERJA PESERTA DIDIK (LKPD) — PROBLEM-BASED LEARNING
        </h3>
        <p style="margin: 3px 0 0; font-size: 9.5pt; font-weight: 600; color: #475569;">
          MATA PELAJARAN INFORMATIKA · KELAS ${escapeHtml(displayClass)} · KURIKULUM MERDEKA
        </p>
      </div>

      <table style="margin-bottom: 16px; font-size: 9.5pt; border: 1.5px solid #0f172a;">
        <tr>
          <td style="width: 22%; font-weight: bold; background: #f8fafc;">Kelompok / Peran:</td>
          <td style="width: 48%; font-weight: bold;">${escapeHtml(selectedRole ? `Tim ${selectedRole}` : 'Kelompok Siswa')}</td>
          <td style="width: 15%; font-weight: bold; background: #f8fafc;">Kelas:</td>
          <td style="width: 15%;">${escapeHtml(displayClass)}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background: #f8fafc; vertical-align: top;">
            Anggota Kelompok:<br/>
            <span style="font-size: 7.5pt; font-weight: normal; color: #64748b;">(Ruang s.d. 6 Orang)</span>
          </td>
          <td colspan="3">
            <table style="width: 100%; border: 0; border-collapse: collapse; font-size: 8.5pt;">
              <tr>
                <td style="border: 0; padding: 2px 4px 2px 0; width: 50%;">1. ....................................................</td>
                <td style="border: 0; padding: 2px 0 2px 4px; width: 50%;">2. ....................................................</td>
              </tr>
              <tr>
                <td style="border: 0; padding: 2px 4px 2px 0;">3. ....................................................</td>
                <td style="border: 0; padding: 2px 0 2px 4px;">4. ....................................................</td>
              </tr>
              <tr>
                <td style="border: 0; padding: 2px 4px 2px 0;">5. ....................................................</td>
                <td style="border: 0; padding: 2px 0 2px 4px;">6. ....................................................</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="font-weight: bold; background: #f8fafc;">Materi:</td>
          <td>${escapeHtml(topic.title)}</td>
          <td style="font-weight: bold; background: #f8fafc;">Tanggal:</td>
          <td>${escapeHtml(dateStr)}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background: #f8fafc;">Skor Penyelidikan:</td>
          <td colspan="3"><strong style="color: #047857; font-size: 10.5pt;">${Number(calculatedScore) || 100} / 100 Poin</strong> · Predikat Sangat Baik (Tuntas Berpikir Kritis)</td>
        </tr>
      </table>

      <div style="margin-bottom: 15px;">
        <h4 style="margin: 0 0 6px; font-size: 11pt; color: #b91c1c; border-bottom: 1.5px solid #fca5a5; padding-bottom: 3px;">
          Langkah 1: Identifikasi Kasus Nyata di Lapangan
        </h4>
        <p style="margin: 0 0 4px; font-size: 9.5pt; font-style: italic; color: #334155;">
          <strong>Kasus:</strong> ${escapeHtml(scenario.headline)} (${escapeHtml(scenario.location)})
        </p>
        <p style="margin: 0 0 6px; font-size: 9pt; color: #475569; background: #f8fafc; padding: 6px 10px; border-left: 3px solid #cbd5e1;">
          ${escapeHtml(scenario.contextStory)}
        </p>
        <p style="margin: 4px 0 0; font-size: 9.5pt;">
          <strong>Fokus Masalah Kelompok:</strong> ${escapeHtml(studentProblemStatement || scenario.drivingQuestion)}
        </p>
      </div>

      <div style="margin-bottom: 15px;">
        <h4 style="margin: 0 0 6px; font-size: 11pt; color: #0369a1; border-bottom: 1.5px solid #7dd3fc; padding-bottom: 3px;">
          Langkah 2: Penyelidikan & Fakta Bukti Digital
        </h4>
        <p style="margin: 0 0 4px; font-size: 9.5pt;"><strong>Penyebab Sebenarnya yang Berhasil Ditemukan:</strong></p>
        <ul style="margin: 0 0 6px; padding-left: 20px; font-size: 9pt;">
          ${causesHtml || '<li>Dianalisis melalui kartu bukti penyelidikan kelompok.</li>'}
        </ul>
        <p style="margin: 4px 0 0; font-size: 9.5pt;">
          <strong>Catatan Temuan Tim:</strong> ${escapeHtml(investigationNotes || 'Seluruh bukti fisik dan digital telah diperiksa dan dicocokkan dengan kaidah sains informatika.')}
        </p>
      </div>

      <div style="margin-bottom: 15px;">
        <h4 style="margin: 0 0 6px; font-size: 11pt; color: #047857; border-bottom: 1.5px solid #86efac; padding-bottom: 3px;">
          Langkah 3: Rencana Solusi Nyata & Hasil Karya
        </h4>
        <p style="margin: 0 0 4px; font-size: 9.5pt;">
          <strong>Karya / Produk Solutif:</strong> ${escapeHtml(scenario.deliverableName)}
        </p>
        <ul style="margin: 0 0 6px; padding-left: 20px; font-size: 9pt;">
          ${actionsHtml || '<li>Menerapkan langkah praktis pencegahan dan edukasi di lingkungan sekolah.</li>'}
        </ul>
        <p style="margin: 4px 0 0; font-size: 9.5pt;">
          <strong>Uraian Penerapan Solusi:</strong> ${escapeHtml(solutionSummary || 'Solusi diterapkan secara kolaboratif bersama guru dan teman sekelas.')}
        </p>
      </div>

      <div style="margin-bottom: 15px;">
        <h4 style="margin: 0 0 6px; font-size: 11pt; color: #d97706; border-bottom: 1.5px solid #fde68a; padding-bottom: 3px;">
          Langkah 4: Refleksi 8 Dimensi Profil Lulusan (Kemendikdasmen)
        </h4>
        <p style="margin: 0 0 6px; font-size: 9pt; font-style: italic; color: #334155; background: #fffbeb; padding: 8px 12px; border-radius: 6px;">
          "${scenario.reflectionPrompt}"
        </p>
        <div style="margin-top: 6px; font-size: 8.5pt; color: #475569; background: #f8fafc; padding: 6px 10px; border-radius: 6px; border: 1px dashed #cbd5e1;">
          <strong>Ceklis Dimensi Profil Lulusan yang Berkembang (Beri tanda centang [✓]):</strong>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: 4px;">
            <span>[ ] Keimanan & Ketaqwaan</span>
            <span>[ ] Kewargaan</span>
            <span>[ ] Penalaran Kritis</span>
            <span>[ ] Kreativitas</span>
            <span>[ ] Kolaborasi</span>
            <span>[ ] Kemandirian</span>
            <span>[ ] Kesehatan</span>
            <span>[ ] Komunikasi</span>
          </div>
        </div>
      </div>

      <div class="signature-grid">
        <div>
          <p style="margin: 0; font-size: 9.5pt;">Mengetahui,<br />Orang Tua / Wali Siswa,</p>
          <div class="signature-space"></div>
          <p style="margin: 0; font-weight: bold; text-decoration: underline; font-size: 10pt;">( .................................................. )</p>
          <p style="margin: 2px 0 0; font-size: 8.5pt; color: #64748b;">Tanda Tangan & Nama Terang</p>
        </div>

        <div>
          <p style="margin: 0; font-size: 9.5pt;">Kroya, ${dateStr}<br />Guru Mata Pelajaran Informatika,</p>
          <div class="signature-space"></div>
          <p style="margin: 0; font-weight: bold; text-decoration: underline; font-size: 10pt;">${escapeHtml(teacherProfile.teacherName)}</p>
          <p style="margin: 2px 0 0; font-size: 8.5pt; color: #64748b;">NIP. ${escapeHtml(teacherProfile.teacherNIP)}</p>
        </div>
      </div>
    `;
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    await printHtmlDocument({
      title: `LKPD-PBL-${topic.id.toUpperCase()}-${studentName || 'Siswa'}`,
      contentHtml: generateFullHtml(),
      landscape: false
    });
    setIsPrinting(false);
  };

  const handleCopyText = () => {
    const text = `
LEMBAR KERJA PESERTA DIDIK (LKPD) - MODEL PROBLEM-BASED LEARNING (PBL)
MATA PELAJARAN INFORMATIKA - KURIKULUM MERDEKA

Kelompok / Tim: ${selectedRole || 'Kelompok Siswa'} | Kelas: ${displayClass}
Anggota Kelompok (1 s.d. 6):
1. ....................   2. ....................
3. ....................   4. ....................
5. ....................   6. ....................
Materi: ${topic.title} | Tanggal: ${dateStr}
Skor Penyelidikan: ${calculatedScore || 100} / 100 Poin

--- 1. IDENTIFIKASI KASUS NYATA ---
Kasus: ${scenario.headline} (${scenario.location})
Deskripsi: ${scenario.contextStory}
Fokus Masalah: ${studentProblemStatement || scenario.drivingQuestion}

--- 2. FAKTA & BUKTI LAPANGAN ---
Penyebab Sebenarnya:
${selectedCauses.map((c) => `- ${c}`).join('\n')}
Catatan Penyelidikan: ${investigationNotes || 'Penyelidikan bukti diselesaikan.'}

--- 3. SOLUSI & HASIL KARYA ---
Hasil Karya: ${scenario.deliverableName}
Rincian Solusi: ${solutionSummary || 'Solusi terintegrasi direkomendasikan.'}

--- 4. REFLEKSI DIRI ---
Refleksi: ${scenario.reflectionPrompt}

Guru Pengampu: ${teacherProfile.teacherName} (NIP. ${teacherProfile.teacherNIP})
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                Pratinjau Lembar Kerja Peserta Didik (LKPD Resmi)
              </h3>
              <p className="text-[11px] text-slate-500">
                Format standar dokumen resmi cetak A4 SMP Negeri 5 Kroya
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openEditModal}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                isCustomized
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-600'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
              }`}
              title="Ubah Nama Guru & NIP agar guru lain bisa menggunakan LKPD ini"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{isCustomized ? `Guru: ${teacherProfile.teacherName.split(',')[0]}` : 'Ubah Guru & NIP'}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
            </button>

            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="px-4 py-1.5 text-xs font-black text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isPrinting ? 'Menyiapkan...' : 'Cetak / Unduh PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live A4 Document Preview */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-200 dark:bg-slate-950 flex justify-center">
          <div className="w-full max-w-2xl bg-white text-slate-900 p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-300 space-y-5 text-xs leading-relaxed font-sans">
            {/* Document Title (Tanpa Kop Surat Logo Sekolah) */}
            <div className="text-center pt-1 pb-1">
              <span className="font-black text-sm underline uppercase tracking-wider block text-slate-950">
                LEMBAR KERJA PESERTA DIDIK (LKPD) — PROBLEM-BASED LEARNING
              </span>
              <span className="text-[11px] font-bold text-slate-700">
                Mata Pelajaran Informatika · Kelas {displayClass} · Kurikulum Merdeka
              </span>
            </div>

            {/* Student Identity Table (Tanpa Nama Peserta Didik & No Absen, Anggota Kelompok 6 Orang) */}
            <table className="w-full text-[11px] border-collapse border border-slate-900">
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold bg-slate-50 w-1/4">Kelompok / Peran:</td>
                  <td className="border border-slate-300 p-2 font-bold w-1/4 text-sky-800">{selectedRole ? `Tim ${selectedRole}` : 'Kelompok Siswa'}</td>
                  <td className="border border-slate-300 p-2 font-bold bg-slate-50 w-1/4">Kelas:</td>
                  <td className="border border-slate-300 p-2 w-1/4 font-semibold">{displayClass}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold bg-slate-50 align-top">
                    <div>Anggota Kelompok:</div>
                    <span className="text-[9.5px] font-normal text-slate-500">(Ruang 1 s.d. 6 Orang)</span>
                  </td>
                  <td colSpan={3} className="border border-slate-300 p-2 text-[10px] text-slate-700">
                    <div className="grid grid-cols-2 gap-1.5">
                      <span>1. ........................................................</span>
                      <span>2. ........................................................</span>
                      <span>3. ........................................................</span>
                      <span>4. ........................................................</span>
                      <span>5. ........................................................</span>
                      <span>6. ........................................................</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold bg-slate-50">Materi:</td>
                  <td className="border border-slate-300 p-2">{topic.title}</td>
                  <td className="border border-slate-300 p-2 font-bold bg-slate-50">Tanggal:</td>
                  <td className="border border-slate-300 p-2">{dateStr}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold bg-slate-50">Nilai Investigasi:</td>
                  <td colSpan={3} className="border border-slate-300 p-2">
                    <strong className="text-emerald-700 font-mono text-sm">{calculatedScore || 100} / 100 Poin</strong> · Sangat Baik (Tuntas Pemecahan Masalah)
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 5 Langkah Sintaks Terisi */}
            <div className="space-y-4 pt-1">
              <div>
                <h5 className="font-black text-rose-700 border-b border-rose-200 pb-1 text-xs uppercase">
                  1. Kasus Nyata di Lapangan
                </h5>
                <p className="font-semibold text-slate-800 mt-1">
                  {scenario.headline} ({scenario.location})
                </p>
                <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-1">
                  {scenario.contextStory}
                </p>
                <p className="text-[11px] mt-1">
                  <strong>Rumusan Masalah Kelompok:</strong> {studentProblemStatement || scenario.drivingQuestion}
                </p>
              </div>

              <div>
                <h5 className="font-black text-sky-700 border-b border-sky-200 pb-1 text-xs uppercase">
                  2. Temuan Bukti & Akar Penyebab
                </h5>
                <div className="mt-1 text-[11px]">
                  <strong>Penyebab Sebenarnya yang Teridentifikasi:</strong>
                  <ul className="list-disc pl-5 mt-0.5 space-y-0.5 text-slate-700">
                    {selectedCauses.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                  <p className="mt-1">
                    <strong>Catatan Penyelidikan:</strong> {investigationNotes || 'Semua bukti telah diperiksa sesuai data lapangan.'}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-black text-emerald-700 border-b border-emerald-200 pb-1 text-xs uppercase">
                  3. Karya Solusi & Rencana Aksi Nyata
                </h5>
                <p className="text-[11px] mt-1 font-bold text-slate-800">
                  Produk Hasil Karya: {scenario.deliverableName}
                </p>
                <p className="text-[11px] mt-1 text-slate-700">
                  <strong>Rencana Tindakan:</strong> {solutionSummary || 'Menerapkan langkah praktis pencegahan dan edukasi di lingkungan sekolah.'}
                </p>
              </div>

              <div>
                <h5 className="font-black text-amber-700 border-b border-amber-200 pb-1 text-xs uppercase">
                  4. Refleksi 8 Dimensi Profil Lulusan (Kemendikdasmen)
                </h5>
                <p className="text-[11px] italic bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 text-slate-800 mt-1">
                  "{scenario.reflectionPrompt}"
                </p>
                <div className="mt-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-600">
                  <span className="font-bold block text-slate-700 mb-1">Ceklis 8 Dimensi Profil Lulusan yang Dilatih:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[10px]">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">☑ Keimanan & Ketaqwaan</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">☑ Kewargaan</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">☑ Penalaran Kritis</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">☑ Kreativitas</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">☑ Kolaborasi</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">☑ Kemandirian</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">☑ Kesehatan</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200">☑ Komunikasi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Block */}
            <div className="grid grid-cols-2 pt-6 text-center text-[11px]">
              <div>
                <p>Mengetahui,<br />Orang Tua / Wali Siswa,</p>
                <div className="h-14"></div>
                <p className="font-bold underline">( .................................................. )</p>
                <p className="text-[10px] text-slate-500">Tanda Tangan & Nama Terang</p>
              </div>

              <div className="relative group p-2 rounded-xl hover:bg-amber-50/50 transition-colors">
                <p>Kroya, {dateStr}<br />Guru Mata Pelajaran Informatika,</p>
                <div className="h-12"></div>
                <div className="flex items-center justify-center gap-1.5">
                  <p className="font-bold underline">{teacherProfile.teacherName}</p>
                  <button
                    onClick={openEditModal}
                    className="p-1 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-medium transition-all shadow-2xs cursor-pointer"
                    title="Ubah Nama Guru & NIP"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">NIP. {teacherProfile.teacherNIP}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Dokumen ini siap dicetak langsung via printer laboratorium atau disimpan sebagai berkas PDF.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
