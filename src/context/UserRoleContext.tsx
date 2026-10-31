import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { hashTeacherPin, sanitizePlainText } from '../utils/securityHelper';
import { syncAppConfigToFirestore } from '../firebase';
import { saveStudentScoreToDatabase } from '../utils/studentDatabase';
import { APP_ASSETS } from '../constants/assets';

export type UserRole = 'student' | 'teacher' | 'guest';
export type EditorTabType =
  | 'apersepsi'
  | 'asesmen-awal'
  | 'materi'
  | 'video'
  | 'gambar'
  | 'simulasi'
  | 'pbl'
  | 'tebak-gambar'
  | 'kuis'
  | 'asesmen-akhir'
  | 'refleksi-sertifikat'
  | 'keamanan';

export interface StudentProfile {
  name: string;
  className: string;
  studentNumber: string;
}

interface UserRoleContextType {
  role: UserRole;
  studentProfile: StudentProfile;
  updateStudentProfile: (partial: Partial<StudentProfile>) => void;
  isTeacher: boolean;
  showTeacherAnswerKeys: boolean;
  toggleTeacherAnswerKeys: () => void;
  isLiveEditMode: boolean;
  toggleLiveEditMode: () => void;
  loginAsStudent: (profile: StudentProfile) => void;
  loginAsTeacher: (pin: string) => { success: boolean; errorMsg?: string; remainingLockoutSec?: number };
  updateTeacherPin: (currentPin: string, newPin: string) => { success: boolean; message: string };
  hasCustomPin: boolean;
  lockoutRemainingSec: number;
  loginAsGuest: () => void;
  logoutRole: () => void;
  isRoleModalOpen: boolean;
  openRoleModal: () => void;
  closeRoleModal: () => void;
  isEditorModalOpen: boolean;
  openEditorModal: (tab?: EditorTabType) => void;
  closeEditorModal: () => void;
  editorActiveTab: EditorTabType;
  setEditorActiveTab: (tab: EditorTabType) => void;
}

// Password default utama guru adalah 'smart123'
const DEFAULT_TEACHER_PIN_HASH = hashTeacherPin('smart123');

const TEACHER_SESSION_DURATION_MS = 30 * 60 * 1000; // 30 menit auto-lock sesi guru
const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 30 * 1000; // 30 detik kunci sementara jika salah 3x

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Role persistence: gunakan sessionStorage untuk sesi guru agar aman saat tab ditutup
  const [role, setRole] = useState<UserRole>(() => {
    try {
      const teacherSessionExp = sessionStorage.getItem('smart_info_teacher_exp');
      const savedRole = localStorage.getItem('smart_info_role');
      if (savedRole === 'teacher') {
        if (teacherSessionExp && Date.now() < Number(teacherSessionExp)) {
          return 'teacher';
        }
        return 'student';
      }
      if (savedRole === 'student' || savedRole === 'guest') {
        return savedRole;
      }
      return 'student';
    } catch {
      return 'student';
    }
  });

  // Student profile persistence (default kosong sampai diisi oleh user)
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      localStorage.removeItem('smart_info_student_profile');
      const saved = localStorage.getItem('smart_info_student_profile_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          name: sanitizePlainText(parsed.name || '', 80),
          className: sanitizePlainText(parsed.className || '', 30),
          studentNumber: sanitizePlainText(parsed.studentNumber || '', 15)
        };
      }
      return {
        name: '',
        className: '',
        studentNumber: ''
      };
    } catch {
      return {
        name: '',
        className: '',
        studentNumber: ''
      };
    }
  });

  // Active PIN hash synced with the main application database (default: hash of 'smart123')
  const [activePinHash, setActivePinHash] = useState<string>(() => {
    try {
      return localStorage.getItem('smart_info_teacher_pin_hash_v2') || DEFAULT_TEACHER_PIN_HASH;
    } catch {
      return DEFAULT_TEACHER_PIN_HASH;
    }
  });
  const [hasCustomPin, setHasCustomPin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('smart_info_teacher_pin_hash_v2');
      return Boolean(saved && saved !== DEFAULT_TEACHER_PIN_HASH);
    } catch {
      return false;
    }
  });

  // Fetch latest password hash from main database on mount and when role modal opens
  const syncPinFromDatabase = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/state');
      if (!res.ok) return;
      const data = await res.json();
      if (data && typeof data.pinHash === 'string' && data.pinHash) {
        setActivePinHash(data.pinHash);
        setHasCustomPin(Boolean(data.hasCustomPin));
        try {
          localStorage.setItem('smart_info_teacher_pin_hash_v2', data.pinHash);
        } catch {}
      }
    } catch {
      // Offline fallback uses activePinHash
    }
  }, []);

  useEffect(() => {
    syncPinFromDatabase();
    const interval = setInterval(syncPinFromDatabase, 10000);
    return () => clearInterval(interval);
  }, [syncPinFromDatabase]);

  // Brute-force protection state
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number>(0);
  const [lockoutRemainingSec, setLockoutRemainingSec] = useState<number>(0);

  // Countdown timer untuk brute-force lockout
  useEffect(() => {
    if (lockoutUntil <= Date.now()) {
      setLockoutRemainingSec(0);
      return;
    }
    const updateTimer = () => {
      const rem = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (rem <= 0) {
        setLockoutRemainingSec(0);
        setFailedAttempts(0);
      } else {
        setLockoutRemainingSec(rem);
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Auto-lock sesi guru jika tidak aktif selama 30 menit
  useEffect(() => {
    if (role !== 'teacher') return;

    const refreshSession = () => {
      try {
        sessionStorage.setItem('smart_info_teacher_exp', String(Date.now() + TEACHER_SESSION_DURATION_MS));
      } catch {}
    };

    const checkSession = () => {
      try {
        const exp = Number(sessionStorage.getItem('smart_info_teacher_exp') || 0);
        if (Date.now() > exp) {
          setRole('student');
          setShowTeacherAnswerKeys(false);
          setIsEditorModalOpen(false);
        }
      } catch {}
    };

    refreshSession();
    window.addEventListener('click', refreshSession);
    window.addEventListener('keydown', refreshSession);
    const interval = setInterval(checkSession, 15000);

    return () => {
      window.removeEventListener('click', refreshSession);
      window.removeEventListener('keydown', refreshSession);
      clearInterval(interval);
    };
  }, [role]);

  // Teacher answer keys toggle (default true for teacher if not explicitly set to false)
  const [showTeacherAnswerKeys, setShowTeacherAnswerKeys] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('smart_info_show_answer_keys');
      if (saved === null) return role === 'teacher';
      return saved === 'true';
    } catch {
      return role === 'teacher';
    }
  });

  // Live Inline Edit mode for Teacher (click any text/image on screen to edit)
  const [isLiveEditMode, setIsLiveEditMode] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('smart_info_live_edit_mode') === 'true';
    } catch {
      return false;
    }
  });

  // Modals state
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editorActiveTab, setEditorActiveTab] = useState<EditorTabType>('apersepsi');

  const isTeacher = role === 'teacher';

  useEffect(() => {
    if (isRoleModalOpen || isEditorModalOpen) {
      syncPinFromDatabase();
    }
  }, [isRoleModalOpen, isEditorModalOpen, syncPinFromDatabase]);

  useEffect(() => {
    try {
      localStorage.setItem('smart_info_role', role);
    } catch {}
  }, [role]);

  useEffect(() => {
    try {
      localStorage.setItem('smart_info_student_profile_v2', JSON.stringify(studentProfile));
    } catch {}
  }, [studentProfile]);

  useEffect(() => {
    try {
      sessionStorage.setItem('smart_info_show_answer_keys', String(showTeacherAnswerKeys));
    } catch {}
  }, [showTeacherAnswerKeys]);

  useEffect(() => {
    try {
      sessionStorage.setItem('smart_info_live_edit_mode', String(isLiveEditMode));
    } catch {}
  }, [isLiveEditMode]);

  const toggleTeacherAnswerKeys = () => {
    if (!isTeacher) return;
    setShowTeacherAnswerKeys((prev) => !prev);
  };

  const toggleLiveEditMode = () => {
    if (!isTeacher) return;
    setIsLiveEditMode((prev) => !prev);
  };

  const updateStudentProfile = (partial: Partial<StudentProfile>) => {
    setStudentProfile((prev) => {
      const updated = {
        name: partial.name !== undefined ? sanitizePlainText(partial.name, 80) : prev.name,
        className: partial.className !== undefined ? sanitizePlainText(partial.className, 30) : prev.className,
        studentNumber: partial.studentNumber !== undefined ? sanitizePlainText(partial.studentNumber, 15) : prev.studentNumber
      };
      if (updated.name.trim()) {
        saveStudentScoreToDatabase({
          studentName: updated.name,
          className: updated.className,
          studentNumber: updated.studentNumber,
          topicId: 'umum',
          topicTitle: 'Identitas Profil Siswa',
          activityType: 'profil',
          activityName: 'Update Profil Siswa',
          score: 0,
          maxScore: 100,
          mode: 'individu',
          details: 'Siswa memperbarui identitas profil'
        }).catch(() => {});
      }
      return updated;
    });
  };

  const loginAsStudent = (profile: StudentProfile) => {
    const cleanProfile = {
      name: sanitizePlainText(profile.name, 80),
      className: sanitizePlainText(profile.className, 30),
      studentNumber: sanitizePlainText(profile.studentNumber, 15)
    };
    setStudentProfile(cleanProfile);
    if (cleanProfile.name.trim()) {
      saveStudentScoreToDatabase({
        studentName: cleanProfile.name,
        className: cleanProfile.className,
        studentNumber: cleanProfile.studentNumber,
        topicId: 'umum',
        topicTitle: 'Identitas Profil Siswa',
        activityType: 'profil',
        activityName: 'Login Siswa Aktif',
        score: 0,
        maxScore: 100,
        mode: 'individu',
        details: 'Siswa masuk ke aplikasi pembelajaran'
      }).catch(() => {});
    }
    setRole('student');
    setShowTeacherAnswerKeys(false);
    setIsLiveEditMode(false);
    setIsRoleModalOpen(false);
  };

  const verifyPinInternal = (pin: string): boolean => {
    const inputHash = hashTeacherPin(pin);
    return inputHash === activePinHash;
  };

  const loginAsTeacher = (pin: string) => {
    if (lockoutUntil > Date.now()) {
      const rem = Math.ceil((lockoutUntil - Date.now()) / 1000);
      return {
        success: false,
        errorMsg: `Terlalu banyak percobaan gagal. Silakan tunggu ${rem} detik.`,
        remainingLockoutSec: rem
      };
    }

    if (verifyPinInternal(pin)) {
      setFailedAttempts(0);
      setLockoutUntil(0);
      try {
        sessionStorage.setItem('smart_info_teacher_exp', String(Date.now() + TEACHER_SESSION_DURATION_MS));
        sessionStorage.setItem('smart_info_show_answer_keys', 'true');
      } catch {}
      setRole('teacher');
      setShowTeacherAnswerKeys(true);
      setIsRoleModalOpen(false);
      return { success: true };
    }

    const nextAttempts = failedAttempts + 1;
    setFailedAttempts(nextAttempts);

    if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
      const until = Date.now() + LOCKOUT_DURATION_MS;
      setLockoutUntil(until);
      return {
        success: false,
        errorMsg: 'Batas percobaan password terlampaui. Akses dikunci selama 30 detik demi keamanan.',
        remainingLockoutSec: 30
      };
    }

    return {
      success: false,
      errorMsg: `Password Guru tidak valid (${MAX_FAILED_ATTEMPTS - nextAttempts} kesempatan tersisa).`
    };
  };

  const updateTeacherPin = (currentPin: string, newPin: string): { success: boolean; message: string } => {
    if (!verifyPinInternal(currentPin)) {
      return { success: false, message: 'Password saat ini yang Anda masukkan tidak sesuai.' };
    }
    const cleanNew = newPin.trim();
    if (cleanNew.length < 4 || cleanNew.length > 30) {
      return { success: false, message: 'Password baru minimal harus terdiri dari 4 hingga 30 karakter.' };
    }
    const newHash = hashTeacherPin(cleanNew);
    setActivePinHash(newHash);
    setHasCustomPin(newHash !== DEFAULT_TEACHER_PIN_HASH);
    try {
      localStorage.setItem('smart_info_teacher_pin_hash_v2', newHash);
    } catch {}

    // Persist new password globally to main server database & Firestore
    fetch('/api/cms/update-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPin, newPin: cleanNew })
    })
      .then((r) => r.json())
      .then((res) => {
        if (res && res.ok && res.pinHash) {
          setActivePinHash(res.pinHash);
          setHasCustomPin(Boolean(res.hasCustomPin));
          try {
            localStorage.setItem('smart_info_teacher_pin_hash_v2', res.pinHash);
          } catch {}
        }
      })
      .catch(() => {});

    let savedTeacherProfile = {
      teacherName: APP_ASSETS.teacherName,
      teacherNIP: APP_ASSETS.teacherNIP,
      teacherRole: APP_ASSETS.teacherRole,
      schoolName: APP_ASSETS.schoolName,
      schoolAddress: APP_ASSETS.schoolAddress
    };
    try {
      const rawProf = localStorage.getItem('smart_info_teacher_profile');
      if (rawProf) {
        savedTeacherProfile = { ...savedTeacherProfile, ...JSON.parse(rawProf) };
      }
    } catch {}

    syncAppConfigToFirestore({
      pinHash: newHash,
      ...savedTeacherProfile
    }).catch(() => {});

    return {
      success: true,
      message: 'Password Guru berhasil diperbarui secara menyeluruh dan tersimpan ke database utama aplikasi!'
    };
  };

  const loginAsGuest = () => {
    setRole('guest');
    setShowTeacherAnswerKeys(false);
    setIsLiveEditMode(false);
    setIsRoleModalOpen(false);
  };

  const logoutRole = () => {
    try {
      sessionStorage.removeItem('smart_info_teacher_exp');
      sessionStorage.removeItem('smart_info_show_answer_keys');
      sessionStorage.removeItem('smart_info_live_edit_mode');
    } catch {}
    setRole('student');
    setShowTeacherAnswerKeys(false);
    setIsLiveEditMode(false);
    setIsEditorModalOpen(false);
  };

  const openRoleModal = () => setIsRoleModalOpen(true);
  const closeRoleModal = () => setIsRoleModalOpen(false);

  const openEditorModal = (tab: EditorTabType = 'apersepsi') => {
    if (!isTeacher) return;
    setEditorActiveTab(tab);
    setIsEditorModalOpen(true);
  };
  const closeEditorModal = () => setIsEditorModalOpen(false);

  return (
    <UserRoleContext.Provider
      value={{
        role,
        studentProfile,
        updateStudentProfile,
        isTeacher,
        showTeacherAnswerKeys,
        toggleTeacherAnswerKeys,
        isLiveEditMode,
        toggleLiveEditMode,
        loginAsStudent,
        loginAsTeacher,
        updateTeacherPin,
        hasCustomPin,
        lockoutRemainingSec,
        loginAsGuest,
        logoutRole,
        isRoleModalOpen,
        openRoleModal,
        closeRoleModal,
        isEditorModalOpen,
        openEditorModal,
        closeEditorModal,
        editorActiveTab,
        setEditorActiveTab
      }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = (): UserRoleContextType => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
