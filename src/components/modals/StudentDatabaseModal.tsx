import React, { useState, useEffect } from 'react';
import {
  StudentDatabaseRecord,
  fetchAllStudentRecordsFromDb,
  saveStudentScoreToDatabase,
  deleteStudentRecordFromDatabase,
  getSavedDuelPlayerNames,
  saveDuelPlayerNames
} from '../../utils/studentDatabase';
import { useUserRole } from '../../context/UserRoleContext';
import { soundManager } from '../../utils/soundSystem';
import {
  Database,
  Trophy,
  UserCheck,
  Users,
  Trash2,
  RefreshCw,
  X,
  CheckCircle2,
  Gamepad2,
  Search
} from 'lucide-react';

interface StudentDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
  topicTitle: string;
  currentMode?: 'individu' | 'duel' | 'kelompok';
  onNamesUpdated?: (p1Name: string, p2Name: string) => void;
}

export const StudentDatabaseModal: React.FC<StudentDatabaseModalProps> = ({
  isOpen,
  onClose,
  topicId,
  topicTitle,
  currentMode = 'individu',
  onNamesUpdated
}) => {
  const { studentProfile, updateStudentProfile, isTeacher } = useUserRole();
  const [records, setRecords] = useState<StudentDatabaseRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedBanner, setSavedBanner] = useState<string>('');

  const initialDuel = getSavedDuelPlayerNames();
  const [p1Name, setP1Name] = useState<string>(studentProfile.name || initialDuel.player1Name || '');
  const [p1Class, setP1Class] = useState<string>(studentProfile.className || initialDuel.player1Class || 'VII-A');
  const [p1Number, setP1Number] = useState<string>(studentProfile.studentNumber || '');
  const [p2Name, setP2Name] = useState<string>(initialDuel.player2Name || '');
  const [p2Class, setP2Class] = useState<string>(initialDuel.player2Class || 'VII-A');

  const loadRecords = async () => {
    setIsLoading(true);
    const data = await fetchAllStudentRecordsFromDb();
    setRecords(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      const d = getSavedDuelPlayerNames();
      setP1Name(studentProfile.name || d.player1Name || '');
      setP1Class(studentProfile.className || d.player1Class || 'VII-A');
      setP1Number(studentProfile.studentNumber || '');
      setP2Name(d.player2Name || '');
      setP2Class(d.player2Class || studentProfile.className || 'VII-A');
      loadRecords();
    }
  }, [isOpen, studentProfile]);

  if (!isOpen) return null;

  const handleSaveStudentIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    const cleanP1 = p1Name.trim() || 'Siswa 1';
    const cleanClass1 = p1Class.trim() || 'VII-A';
    const cleanNum1 = p1Number.trim() || '-';
    const cleanP2 = p2Name.trim() || (currentMode !== 'individu' ? 'Siswa 2' : '');
    const cleanClass2 = p2Class.trim() || cleanClass1;

    updateStudentProfile({
      name: cleanP1,
      className: cleanClass1,
      studentNumber: cleanNum1
    });

    saveDuelPlayerNames({
      player1Name: cleanP1,
      player1Class: cleanClass1,
      player2Name: cleanP2,
      player2Class: cleanClass2
    });

    if (onNamesUpdated) {
      onNamesUpdated(cleanP1, cleanP2);
    }

    await saveStudentScoreToDatabase({
      studentName: cleanP1,
      className: cleanClass1,
      studentNumber: cleanNum1,
      topicId,
      topicTitle,
      activityType: 'profil',
      activityName: 'Registrasi Siswa Aktif',
      score: 100,
      maxScore: 100,
      mode: currentMode,
      details: `Siswa aktif mempelajari materi ${topicTitle}`
    });

    if (currentMode !== 'individu' && cleanP2) {
      await saveStudentScoreToDatabase({
        studentName: cleanP2,
        className: cleanClass2,
        studentNumber: '-',
        topicId,
        topicTitle,
        activityType: 'profil',
        activityName: 'Registrasi Pemain 2 (Duel/Kelompok)',
        score: 100,
        maxScore: 100,
        mode: currentMode,
        details: `Pemain 2 aktif pada materi ${topicTitle}`
      });
    }

    await loadRecords();
    setSavedBanner('Nama siswa berhasil disimpan ke Database Utama!');
    setTimeout(() => setSavedBanner(''), 3000);
  };

  const handleDeleteRecord = async (recordId: string) => {
    soundManager.playClick();
    const updated = await deleteStudentRecordFromDatabase({ recordId });
    setRecords(updated);
  };

  const handleClearAll = async () => {
    soundManager.playClick();
    const updated = await deleteStudentRecordFromDatabase({ clearAll: true });
    setRecords(updated);
  };

  const filteredRecords = records.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      r.studentName.toLowerCase().includes(q) ||
      r.className.toLowerCase().includes(q) ||
      r.activityName.toLowerCase().includes(q) ||
      r.topicTitle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 select-none animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border-2 border-indigo-500/60 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-white/15 backdrop-blur-xs">
              <Database className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider">
                Database Siswa & Papan Skor Aplikasi
              </h2>
              <p className="text-[11px] text-indigo-100">
                Data nama siswa, kelas, skor Mini Game, Kuis, dan Asesmen tersimpan otomatis ke Database Utama
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Form Input Nama Siswa / Pemain */}
          <form
            onSubmit={handleSaveStudentIdentity}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-300 uppercase">
                <UserCheck className="w-4 h-4" />
                <span>Identitas Siswa yang Menggunakan Aplikasi (Tersimpan ke Database)</span>
              </div>
              {savedBanner && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{savedBanner}</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  {currentMode === 'individu' ? 'Nama Lengkap Siswa:' : 'Nama Pemain 1 (Biru):'}
                </label>
                <input
                  type="text"
                  required
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  placeholder="Ketik nama siswa..."
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Kelas:
                </label>
                <input
                  type="text"
                  value={p1Class}
                  onChange={(e) => setP1Class(e.target.value)}
                  placeholder="Contoh: VII-A / VIII-B / IX-C"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  No. Absen:
                </label>
                <input
                  type="text"
                  value={p1Number}
                  onChange={(e) => setP1Number(e.target.value)}
                  placeholder="Contoh: 12"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {currentMode !== 'individu' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <label className="block text-[11px] font-bold text-rose-600 dark:text-rose-300 mb-1">
                    <Users className="w-3.5 h-3.5 inline mr-1" />
                    Nama Pemain 2 / Tim Merah (Lawan Duel):
                  </label>
                  <input
                    type="text"
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    placeholder="Ketik nama Pemain 2 / Tim Merah..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-rose-600 dark:text-rose-300 mb-1">
                    Kelas Pemain 2:
                  </label>
                  <input
                    type="text"
                    value={p2Class}
                    onChange={(e) => setP2Class(e.target.value)}
                    placeholder="Contoh: VII-A"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Nama Siswa ke Database</span>
              </button>
            </div>
          </form>

          {/* Daftar Riwayat Skor Siswa di Database */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  Riwayat Siswa & Skor Tersimpan ({filteredRecords.length} Data)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama / kelas / game..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={loadRecords}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 cursor-pointer"
                  title="Muat ulang data dari database"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>

                {isTeacher && records.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    title="Hapus semua riwayat skor siswa (Khusus Guru)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reset Data</span>
                  </button>
                )}
              </div>
            </div>

            {filteredRecords.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
                <Gamepad2 className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Belum ada data skor siswa yang tercatat.
                </p>
                <p className="text-[11px] text-slate-400">
                  Isi nama siswa di atas lalu mainkan Mini Game atau Kuis, maka skor akan otomatis tersimpan di sini!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black uppercase text-[10px]">
                      <th className="py-2.5 px-3">Nama Siswa</th>
                      <th className="py-2.5 px-3">Kelas</th>
                      <th className="py-2.5 px-3">Materi</th>
                      <th className="py-2.5 px-3">Aktivitas / Mini Game</th>
                      <th className="py-2.5 px-3 text-center">Skor</th>
                      <th className="py-2.5 px-3">Waktu</th>
                      {isTeacher && <th className="py-2.5 px-2 text-center">Aksi</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredRecords.map((rec) => (
                      <tr
                        key={rec.recordId}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <td className="py-2 px-3 font-extrabold text-slate-900 dark:text-white">
                          {rec.studentName}
                          {rec.studentNumber && rec.studentNumber !== '-' ? (
                            <span className="ml-1 text-[10px] text-slate-400">(#{rec.studentNumber})</span>
                          ) : null}
                        </td>
                        <td className="py-2 px-3 font-bold text-indigo-600 dark:text-indigo-300">
                          {rec.className}
                        </td>
                        <td className="py-2 px-3 text-slate-600 dark:text-slate-300 truncate max-w-[140px]">
                          {rec.topicTitle}
                        </td>
                        <td className="py-2 px-3">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">
                            {rec.activityName}
                          </span>
                          {rec.details && (
                            <span className="text-[10px] text-slate-400 block">{rec.details}</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-lg font-black text-xs inline-block ${
                              rec.score > 0
                                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {rec.score}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(rec.updatedAt).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        {isTeacher && (
                          <td className="py-2 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteRecord(rec.recordId)}
                              className="p-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-500 cursor-pointer"
                              title="Hapus baris ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
