import React, { useState, useEffect } from 'react';
import { useUserRole } from '../../context/UserRoleContext';
import { useTheme } from '../../context/ThemeContext';
import {
  User,
  GraduationCap,
  ShieldCheck,
  X,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ isOpen, onClose }) => {
  const {
    role,
    studentProfile,
    loginAsStudent,
    loginAsTeacher,
    loginAsGuest,
    lockoutRemainingSec
  } = useUserRole();
  const { playClick, playSuccess, playError } = useTheme();

  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'guest'>(
    role === 'teacher' ? 'teacher' : 'student'
  );

  // Student Form State (semua diketik mandiri oleh siswa/user)
  const [studentName, setStudentName] = useState(studentProfile.name || '');
  const [studentClass, setStudentClass] = useState(studentProfile.className || '');
  const [studentNumber, setStudentNumber] = useState(studentProfile.studentNumber || '');

  // Sync saat profil berubah atau modal dibuka
  useEffect(() => {
    if (isOpen) {
      setStudentName(studentProfile.name || '');
      setStudentClass(studentProfile.className || '');
      setStudentNumber(studentProfile.studentNumber || '');
    }
  }, [isOpen, studentProfile]);

  // Teacher Form State
  const [teacherPin, setTeacherPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinErrorMsg, setPinErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentClass.trim()) return;
    playSuccess();
    loginAsStudent({
      name: studentName.trim(),
      className: studentClass.trim(),
      studentNumber: studentNumber.trim()
    });
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemainingSec > 0) {
      playError();
      return;
    }
    const result = loginAsTeacher(teacherPin);
    if (result.success) {
      playSuccess();
      setPinErrorMsg(null);
      setTeacherPin('');
    } else {
      playError();
      setPinErrorMsg(result.errorMsg || 'PIN yang dimasukkan tidak valid.');
    }
  };

  const handleGuestSubmit = () => {
    playClick();
    loginAsGuest();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Identitas & Peran Pengguna
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Isi data siswa atau masuk ke Mode Guru yang terlindungi
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher Tabs */}
        <div className="p-2 bg-slate-100 dark:bg-slate-800/80 mx-5 sm:mx-6 mt-4 rounded-2xl grid grid-cols-3 gap-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveTab('student');
            }}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Siswa</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveTab('teacher');
            }}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'teacher'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Guru</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setActiveTab('guest');
            }}
            className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'guest'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Tamu</span>
          </button>
        </div>

        {/* TAB 1: FORM SISWA */}
        {activeTab === 'student' && (
          <form onSubmit={handleStudentSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nama Lengkap Siswa:
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Nama lengkap siswa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Kelas:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={30}
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="Kelas"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    No. Presensi / Absen:
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    placeholder="Nomor presensi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 flex items-start gap-2 leading-relaxed">
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>
                Nama, kelas, dan nomor presensi akan otomatis terisi pada <strong>LKPD</strong>, <strong>Asesmen Akhir</strong>, dan <strong>Sertifikat Digital</strong>.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Simpan Identitas Siswa & Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 2: FORM GURU (TERSINKRONISASI DATABASE UTAMA & PROTEKSI BRUTE-FORCE) */}
        {activeTab === 'teacher' && (
          <form onSubmit={handleTeacherSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Otentikasi Keamanan Guru Pengampu</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Database Sync
                </span>
              </div>
              <ul className="text-[11px] text-amber-700 dark:text-amber-200 space-y-1 list-disc list-inside">
                <li>Semua perubahan <strong>materi, tautan YouTube, gambar, dan password</strong> otomatis tersimpan ke <strong>Database Utama</strong></li>
                <li>Dilengkapi <strong>Proteksi Anti-Brute Force</strong> (terkunci otomatis jika salah 3x)</li>
                <li>Sesi guru otomatis terkunci kembali jika tidak aktif selama 30 menit</li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Masukkan Password Guru:</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  Tersimpan Terenkripsi di Database
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  autoFocus
                  disabled={lockoutRemainingSec > 0}
                  value={teacherPin}
                  onChange={(e) => {
                    setTeacherPin(e.target.value);
                    setPinErrorMsg(null);
                  }}
                  placeholder={
                    lockoutRemainingSec > 0
                      ? `Terkunci sementara (${lockoutRemainingSec} detik)...`
                      : 'Masukkan password Guru...'
                  }
                  className={`w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm font-mono font-bold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 disabled:opacity-50 ${
                    pinErrorMsg || lockoutRemainingSec > 0
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500'
                  }`}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPin((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title={showPin ? 'Sembunyikan PIN' : 'Tampilkan PIN'}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {(pinErrorMsg || lockoutRemainingSec > 0) && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 flex items-center gap-2 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    {lockoutRemainingSec > 0
                      ? `Akses dikunci sementara demi keamanan. Silakan tunggu ${lockoutRemainingSec} detik.`
                      : pinErrorMsg}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={lockoutRemainingSec > 0}
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-2xl font-black text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {lockoutRemainingSec > 0
                  ? `Tunggu ${lockoutRemainingSec} Detik`
                  : 'Verifikasi PIN & Buka Mode Guru'}
              </span>
            </button>
          </form>
        )}

        {/* TAB 3: TAMU / GUEST */}
        {activeTab === 'guest' && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Mode Kelas IFP / Peninjau Cepat (Read-Only)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mode aman tanpa hak edit untuk penggunaan layar sentuh kelas (IFP) secara bersama-sama atau peninjauan oleh tamu/pengawas. Seluruh materi terlindungi dari perubahan tidak sengaja.
              </p>
            </div>

            <button
              onClick={handleGuestSubmit}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-2xl font-black text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Masuk Mode Kelas / Tamu (Aman)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
