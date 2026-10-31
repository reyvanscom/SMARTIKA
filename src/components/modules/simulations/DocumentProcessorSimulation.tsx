import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  FileText,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Heading1,
  Table as TableIcon,
  Users,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  History,
  Download,
  Check
} from 'lucide-react';

export const DocumentProcessorSimulation: React.FC = () => {
  const { playClick, playSuccess, playFanfare } = useTheme();

  // Formatting States
  const [isTitleHeading1, setIsTitleHeading1] = useState(false);
  const [isTitleCenter, setIsTitleCenter] = useState(false);
  const [isProposalBold, setIsProposalBold] = useState(false);
  const [isParagraphJustify, setIsParagraphJustify] = useState(false);
  const [hasTableInserted, setHasTableInserted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Collaborative Avatar Presence
  const [collaboratorActive, setCollaboratorActive] = useState(true);

  // Scoring
  const criteria = [
    { label: 'Jadikan Judul Proposal sebagai "Heading 1"', met: isTitleHeading1 },
    { label: 'Atur Posisi Judul Menjadi "Rata Tengah (Center)"', met: isTitleCenter },
    { label: 'Tebalkan (Bold) Nama Lembaga "SMP Negeri 5 Kroya"', met: isProposalBold },
    { label: 'Ubah Paragraf Isi Menjadi "Rata Kiri-Kanan (Justify)"', met: isParagraphJustify },
    { label: 'Sisipkan "Tabel Rencana Kegiatan"', met: hasTableInserted }
  ];

  const metCount = criteria.filter((c) => c.met).length;
  const score = Math.round((metCount / criteria.length) * 100);

  const checkCompletion = () => {
    if (metCount === criteria.length) {
      playFanfare();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    playClick();
    setIsTitleHeading1(false);
    setIsTitleCenter(false);
    setIsProposalBold(false);
    setIsParagraphJustify(false);
    setHasTableInserted(false);
    setShowHistory(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner Utama */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-blue-600 via-sky-600 to-indigo-700 text-white shadow-xl space-y-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Laboratorium Studio Google Dokumen</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-xl text-xs font-bold">
            <Users className="w-4 h-4 text-emerald-300" />
            <span>Mode Kolaborasi Online Aktif</span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">
          Interactive Document Editor & Cloud Collaboration Studio
        </h2>
        <p className="text-xs sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
          Uji keterampilan memformat dokumen resmi: ubah draf berantakan menjadi proposal Pramuka yang rapi, profesional, dan siap diajukan ke Kepala Sekolah!
        </p>
      </div>

      {/* SIMULASI GOOGLE DOCS CANVAS */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
        {/* Toolbar Dokumen Interaktif */}
        <div className="p-2.5 sm:p-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Heading 1 Button */}
            <button
              onClick={() => {
                playClick();
                setIsTitleHeading1(!isTitleHeading1);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                isTitleHeading1
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Gaya Judul Heading 1"
            >
              <Heading1 className="w-3.5 h-3.5" />
              <span>Heading 1</span>
            </button>

            {/* Bold Button */}
            <button
              onClick={() => {
                playClick();
                setIsProposalBold(!isProposalBold);
              }}
              className={`p-2 rounded-xl transition-all ${
                isProposalBold
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Tebalkan Teks (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>

            {/* Align Center Button */}
            <button
              onClick={() => {
                playClick();
                setIsTitleCenter(!isTitleCenter);
              }}
              className={`p-2 rounded-xl transition-all ${
                isTitleCenter
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Rata Tengah Judul"
            >
              <AlignCenter className="w-4 h-4" />
            </button>

            {/* Align Justify Button */}
            <button
              onClick={() => {
                playClick();
                setIsParagraphJustify(!isParagraphJustify);
              }}
              className={`p-2 rounded-xl transition-all ${
                isParagraphJustify
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Rata Kiri-Kanan (Justify) Paragraf"
            >
              <AlignJustify className="w-4 h-4" />
            </button>

            {/* Insert Table Button */}
            <button
              onClick={() => {
                playClick();
                setHasTableInserted(!hasTableInserted);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                hasTableInserted
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Sisipkan Tabel Rencana Kegiatan"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{hasTableInserted ? 'Hapus Tabel' : '+ Sisipkan Tabel'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Version History Toggle */}
            <button
              onClick={() => {
                playClick();
                setShowHistory(!showHistory);
              }}
              className="px-2.5 py-1.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1"
            >
              <History className="w-3.5 h-3.5" />
              <span>Riwayat Versi</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              title="Reset Dokumen"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lembar Halaman Kertas Dokumen */}
        <div className="p-6 sm:p-10 bg-slate-50 dark:bg-slate-950 flex justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 p-8 sm:p-12 shadow-2xl rounded-sm min-h-[480px] space-y-6 relative">
            {/* Kursor Kolaborasi Siti */}
            {collaboratorActive && (
              <div className="absolute top-12 right-12 flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-300 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Siti (Editor Online)</span>
              </div>
            )}

            {/* Judul Dokumen */}
            <div className={`space-y-1 ${isTitleCenter ? 'text-center' : 'text-left'}`}>
              <div
                className={`font-black text-slate-900 dark:text-white transition-all ${
                  isTitleHeading1 ? 'text-2xl sm:text-3xl' : 'text-base font-normal text-slate-600'
                }`}
              >
                PROPOSAL KEGIATAN PERKEMAHAN SABTU-MINGGU (PERSAMI)
              </div>

              <div
                className={`text-sm text-slate-800 dark:text-slate-200 transition-all ${
                  isProposalBold ? 'font-black tracking-wider uppercase' : 'font-normal'
                }`}
              >
                GUGUS DEPAN PRAMUKA SMP NEGERI 5 KROYA - TAHUN 2026
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Paragraf Isi Proposal */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                A. Latar Belakang & Tujuan
              </h3>
              <p
                className={`text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-all ${
                  isParagraphJustify ? 'text-justify' : 'text-left'
                }`}
              >
                Gerakan Pramuka merupakan wadah pembinaan generasi muda yang bertujuan menumbuhkan kedisiplinan, kemandirian, dan semangat gotong royong. Melalui kegiatan Persami ini, seluruh anggota Pramuka Penggalang SMP Negeri 5 Kroya diharapkan mampu mengasah keterampilan navigasi kompas, pertolongan pertama, dan pemecahan masalah secara kolaboratif.
              </p>
            </div>

            {/* Tabel Kegiatan yang disisipkan */}
            {hasTableInserted && (
              <div className="space-y-2 animate-in fade-in">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  B. Jadwal Pelaksanaan Kegiatan
                </h3>
                <div className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 font-bold border-b">
                      <tr>
                        <th className="p-2 border-r">Waktu</th>
                        <th className="p-2 border-r">Nama Kegiatan</th>
                        <th className="p-2">Penanggung Jawab</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      <tr>
                        <td className="p-2 border-r font-mono">07.30 - 08.30</td>
                        <td className="p-2 border-r">Upacara Pembukaan</td>
                        <td className="p-2">Kak Pembina</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r font-mono">09.00 - 12.00</td>
                        <td className="p-2 border-r">Lomba Sandi & Semaphore</td>
                        <td className="p-2">Regu Elang & Melati</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r font-mono">19.30 - 21.00</td>
                        <td className="p-2 border-r">Api Unggun & Pentas Seni</td>
                        <td className="p-2">Panitia Bersama</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel Riwayat Versi (Jika dibuka) */}
        {showHistory && (
          <div className="p-4 bg-slate-100 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 text-xs space-y-2 animate-in fade-in">
            <span className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
              Riwayat Versi Dokumen Cloud:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border">
                <span className="font-bold block text-blue-600">Versi 3 (Saat ini)</span>
                <span className="text-[11px] text-slate-400">Diedit oleh Kamu barusan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border">
                <span className="font-bold block text-slate-700 dark:text-slate-300">Versi 2</span>
                <span className="text-[11px] text-slate-400">Siti menambahkan paragraf tujuan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border">
                <span className="font-bold block text-slate-700 dark:text-slate-300">Versi 1 (Draf Awal)</span>
                <span className="text-[11px] text-slate-400">Rian membuat berkas proposal</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CHECKLIST KELAYAKAN PROPOSAL RESMI */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Taraf Kelayakan Format Dokumen Resmi:
            </h3>
            <span className="text-xs text-slate-500">
              {metCount} dari {criteria.length} Kriteria Format Terpenuhi
            </span>
          </div>
          <span className="text-3xl font-black font-mono text-blue-600">{score}%</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
          {criteria.map((c, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border flex items-center gap-2 text-xs font-semibold ${
                c.met
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  c.met ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}
              >
                {c.met ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className="leading-tight">{c.label}</span>
            </div>
          ))}
        </div>

        {score === 100 && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-900 dark:text-emerald-200 text-xs font-medium text-center animate-in zoom-in-95">
            🎉 <strong>Proposal Sempurna!</strong> Dokumen kini memiliki hierarki judul Heading 1 rata tengah, nama lembaga tercetak tebal, paragraf justify yang rapi, serta tabel rincian kegiatan yang jelas. Dokumen siap dicetak dan dibagikan secara kolaboratif!
          </div>
        )}
      </div>
    </div>
  );
};
