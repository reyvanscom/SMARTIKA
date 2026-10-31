import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { APP_ASSETS } from '../constants/assets';
import { hashTeacherPin, sanitizePlainText } from '../utils/securityHelper';
import { syncAppConfigToFirestore } from '../firebase';
import { UserCheck, X, Check, RotateCcw, ShieldCheck } from 'lucide-react';

export interface TeacherProfile {
  teacherName: string;
  teacherNIP: string;
  teacherRole: string;
  schoolName: string;
  schoolAddress: string;
}

interface TeacherProfileContextType {
  teacherProfile: TeacherProfile;
  updateTeacherProfile: (partial: Partial<TeacherProfile>) => void;
  resetTeacherProfile: () => void;
  isCustomized: boolean;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
}

const STORAGE_KEY = 'smart_info_teacher_profile';

const DEFAULT_PROFILE: TeacherProfile = {
  teacherName: APP_ASSETS.teacherName,
  teacherNIP: APP_ASSETS.teacherNIP,
  teacherRole: APP_ASSETS.teacherRole,
  schoolName: APP_ASSETS.schoolName,
  schoolAddress: APP_ASSETS.schoolAddress
};

const TeacherProfileContext = createContext<TeacherProfileContextType | undefined>(undefined);

export const TeacherProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<TeacherProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROFILE,
          ...parsed
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved teacher profile:', e);
    }
    return DEFAULT_PROFILE;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchTeacherProfileFromDb = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/state');
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.ok && data.teacherProfile && typeof data.teacherProfile === 'object') {
        const merged: TeacherProfile = {
          ...DEFAULT_PROFILE,
          ...data.teacherProfile
        };
        setProfile(merged);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch {}
      }
    } catch {
      // Offline fallback uses local profile
    }
  }, []);

  useEffect(() => {
    fetchTeacherProfileFromDb();
  }, [fetchTeacherProfileFromDb]);

  const isCustomized =
    profile.teacherName !== DEFAULT_PROFILE.teacherName ||
    profile.teacherNIP !== DEFAULT_PROFILE.teacherNIP;

  const updateTeacherProfile = (partial: Partial<TeacherProfile>) => {
    setProfile((prev) => {
      const sanitized: TeacherProfile = {
        teacherName: partial.teacherName !== undefined ? sanitizePlainText(partial.teacherName) : prev.teacherName,
        teacherNIP: partial.teacherNIP !== undefined ? sanitizePlainText(partial.teacherNIP) : prev.teacherNIP,
        teacherRole: partial.teacherRole !== undefined ? sanitizePlainText(partial.teacherRole) : prev.teacherRole,
        schoolName: partial.schoolName !== undefined ? sanitizePlainText(partial.schoolName) : prev.schoolName,
        schoolAddress: partial.schoolAddress !== undefined ? sanitizePlainText(partial.schoolAddress) : prev.schoolAddress
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      } catch (e) {
        console.warn('Failed to save teacher profile:', e);
      }

      fetch('/api/cms/teacher-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherProfile: sanitized })
      }).catch(() => {});

      const pinHash = localStorage.getItem('smart_info_teacher_pin_hash_v2') || hashTeacherPin('smart123');
      syncAppConfigToFirestore({
        pinHash,
        ...sanitized
      }).catch(() => {});

      return sanitized;
    });
  };

  const resetTeacherProfile = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setProfile(DEFAULT_PROFILE);
    fetch('/api/cms/teacher-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reset: true })
    }).catch(() => {});
  };

  return (
    <TeacherProfileContext.Provider
      value={{
        teacherProfile: profile,
        updateTeacherProfile,
        resetTeacherProfile,
        isCustomized,
        isEditModalOpen,
        openEditModal: () => setIsEditModalOpen(true),
        closeEditModal: () => setIsEditModalOpen(false)
      }}
    >
      {children}
      <TeacherProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentProfile={profile}
        onSave={updateTeacherProfile}
        onReset={resetTeacherProfile}
        isCustomized={isCustomized}
      />
    </TeacherProfileContext.Provider>
  );
};

export const useTeacherProfile = (): TeacherProfileContextType => {
  const context = useContext(TeacherProfileContext);
  if (!context) {
    throw new Error('useTeacherProfile must be used within a TeacherProfileProvider');
  }
  return context;
};

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: TeacherProfile;
  onSave: (partial: Partial<TeacherProfile>) => void;
  onReset: () => void;
  isCustomized: boolean;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSave,
  onReset,
  isCustomized
}) => {
  const [name, setName] = useState(currentProfile.teacherName);
  const [nip, setNip] = useState(currentProfile.teacherNIP);
  const [roleTitle, setRoleTitle] = useState(currentProfile.teacherRole);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(currentProfile.teacherName);
      setNip(currentProfile.teacherNIP);
      setRoleTitle(currentProfile.teacherRole);
      setSavedNotice(false);
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      teacherName: name.trim() || DEFAULT_PROFILE.teacherName,
      teacherNIP: nip.trim() || '-',
      teacherRole: roleTitle.trim() || DEFAULT_PROFILE.teacherRole
    });
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    onReset();
    setName(DEFAULT_PROFILE.teacherName);
    setNip(DEFAULT_PROFILE.teacherNIP);
    setRoleTitle(DEFAULT_PROFILE.teacherRole);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Ubah Identitas Guru Pengampu
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Otomatis tersimpan ke database utama & diterapkan ke semua LKPD dan sertifikat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Tersimpan di Database Utama Aplikasi</span>
            </div>
            <p className="text-[11px] text-sky-800 dark:text-sky-300 leading-relaxed">
              Jika bapak/ibu guru lain mengampu mata pelajaran ini, cukup masukkan nama dan NIP Anda di sini. Perubahan langsung tersimpan di database utama aplikasi.
            </p>
          </div>

          {/* Nama Guru */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Nama Lengkap Guru (beserta Gelar):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="contoh: Muhammad Rif'ani, S.Kom."
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
            />
          </div>

          {/* NIP Guru */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Nomor Induk Pegawai (NIP):
            </label>
            <input
              type="text"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              placeholder="contoh: 19910916 202421 1 010 (atau tanda - jika belum ada)"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-mono"
            />
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              Isi dengan tanda <kbd className="px-1 rounded bg-slate-200 dark:bg-slate-700">-</kbd> jika guru honorer/GTT belum memiliki NIP resmi.
            </span>
          </div>

          {/* Jabatan / Peran */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Peran / Jabatan Guru:
            </label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="contoh: Guru Informatika SMP Negeri 5 Kroya"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
            />
          </div>

          {/* Live Preview Signature Badge */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
              Pratinjau Tanda Tangan LKPD:
            </span>
            <div className="font-bold text-slate-900 dark:text-white underline text-sm">
              {name || 'Nama Belum Diisi'}
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-[11px] font-mono">
              NIP. {nip || '-'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
            {isCustomized ? (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Guru Utama</span>
              </button>
            ) : (
              <span className="text-[11px] text-slate-400 italic">
                Menggunakan profil bawaan
              </span>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                {savedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>Tersimpan di Database!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Simpan ke Database Utama</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
