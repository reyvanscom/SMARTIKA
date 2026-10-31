import React, { useState, useEffect, useRef } from 'react';
import {
  Edit3,
  Image as ImageIcon,
  Upload,
  Check,
  X,
  Trash2,
  Sparkles,
  Eye,
  EyeOff,
  Sliders,
  UserCheck
} from 'lucide-react';
import { useUserRole, EditorTabType } from '../../context/UserRoleContext';
import { useCurriculumOverrides } from '../../context/CurriculumOverridesContext';
import { useTeacherProfile } from '../../context/TeacherProfileContext';
import {
  extractYouTubeId,
  fetchYouTubeOEmbedInfo,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
} from '../../utils/youtubeHelper';

interface TeacherModuleToolbarProps {
  topicId: string;
  moduleKey: string;
  moduleTitle: string;
  editorTab: EditorTabType;
}

/**
 * Toolbar Guru + Slot Gambar Kustom di Setiap Modul (Apersepsi s/d Sertifikat).
 * Juga merender gambar kustom modul untuk Siswa jika Guru telah menambahkannya.
 */
export const TeacherModuleToolbar: React.FC<TeacherModuleToolbarProps> = ({
  topicId,
  moduleKey,
  moduleTitle,
  editorTab,
}) => {
  const {
    isTeacher,
    openEditorModal,
    showTeacherAnswerKeys,
    toggleTeacherAnswerKeys,
    isLiveEditMode,
    toggleLiveEditMode,
  } = useUserRole();
  const { teacherProfile, openEditModal, isCustomized } = useTeacherProfile();
  const { overrides, saveModuleBannerImage, saveTopicOverride } = useCurriculumOverrides();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [urlPromptOpen, setUrlPromptOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');

  const override = overrides[topicId] || {};
  const bannerKey = `${topicId}::${moduleKey}`;
  const customBannerUrl =
    override.moduleBannerImages?.[bannerKey] ||
    override.moduleBannerImages?.[moduleKey] ||
    '';

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        saveModuleBannerImage(topicId, bannerKey, reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  if (!isTeacher && !customBannerUrl) {
    return null;
  }

  return (
    <div className="mb-6 space-y-4 print:hidden">
      {isTeacher && (
        <div
          data-live-editor-ignore="true"
          className="bg-gradient-to-r from-amber-50 via-orange-50/90 to-amber-50 dark:from-amber-950/60 dark:via-slate-900 dark:to-amber-950/60 border-2 border-amber-300 dark:border-amber-700/80 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-200 bg-amber-200/80 dark:bg-amber-900/70 px-2 py-0.5 rounded-md">
                  Mode Guru • {moduleTitle}
                </span>
                {isLiveEditMode && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md animate-pulse">
                    Klik Teks / Gambar di Layar untuk Edit Langsung
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium mt-0.5">
                Edit teks, gambar, soal & jawaban bagian ini atau tampilkan jawaban yang seharusnya.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Toggle Kunci Jawaban Seharusnya */}
            <button
              type="button"
              onClick={toggleTeacherAnswerKeys}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all border shadow-sm cursor-pointer ${
                showTeacherAnswerKeys
                  ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-100'
              }`}
              title="Tampilkan atau sembunyikan jawaban yang seharusnya (Kunci Jawaban Guru)"
            >
              {showTeacherAnswerKeys ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              <span>
                {showTeacherAnswerKeys
                  ? 'Kunci Jawaban: TAMPIL'
                  : 'Tampilkan Kunci Jawaban'}
              </span>
            </button>

            {/* Toggle Live Inline Edit (Klik teks/gambar manapun) */}
            <button
              type="button"
              onClick={toggleLiveEditMode}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all border shadow-sm cursor-pointer ${
                isLiveEditMode
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300'
                  : 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50'
              }`}
              title="Aktifkan agar bisa klik teks atau gambar manapun di layar untuk langsung mengeditnya"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>
                {isLiveEditMode
                  ? 'Mode Klik & Edit: AKTIF'
                  : 'Edit Langsung di Layar'}
              </span>
            </button>

            {/* Tambah / Ganti Gambar di Bagian Ini */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-white dark:bg-slate-800 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 transition-all shadow-sm cursor-pointer"
              title="Unggah gambar ilustrasi/materi pada bagian halaman ini"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>
                {customBannerUrl ? 'Ganti Gambar Bagian Ini' : '+ Gambar Bagian Ini'}
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => {
                setTempImageUrl(customBannerUrl);
                setUrlPromptOpen(!urlPromptOpen);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              title="Masukkan URL Gambar untuk bagian ini"
            >
              URL Gambar
            </button>

            {/* Ubah Nama Guru & NIP */}
            <button
              type="button"
              onClick={openEditModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 transition-all shadow-sm cursor-pointer"
              title="Ubah Nama Guru & NIP pada seluruh LKPD dan dokumen pembelajaran"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{isCustomized ? `Guru: ${teacherProfile.teacherName.split(',')[0]}` : 'Ubah Guru & NIP'}</span>
            </button>

            {/* Buka Modal CMS Editor Lengkap pada Tab Modul Ini */}
            <button
              type="button"
              onClick={() => openEditorModal(editorTab)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Edit Konten & Soal {moduleTitle}</span>
            </button>
          </div>

          {urlPromptOpen && (
            <div className="w-full pt-2 mt-2 border-t border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
                placeholder="Tempel URL gambar (https://...) atau Data URL..."
                className="flex-1 px-3 py-2 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-white"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    const trimmed = tempImageUrl.trim();
                    const ytId = extractYouTubeId(trimmed);
                    if (ytId) {
                      const cleanWatch = getYouTubeWatchUrl(ytId);
                      saveTopicOverride(topicId, { customVideoUrl: cleanWatch });
                      const info = await fetchYouTubeOEmbedInfo(ytId);
                      if (info?.title) {
                        saveTopicOverride(topicId, {
                          customVideoUrl: cleanWatch,
                          customVideoTitle: info.title,
                          ...(info.authorName
                            ? { customVideoDescription: `Video pembelajaran dari kanal YouTube ${info.authorName}` }
                            : {}),
                        });
                      }
                      setUrlPromptOpen(false);
                      return;
                    }
                    saveModuleBannerImage(topicId, bannerKey, trimmed);
                    setUrlPromptOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
                >
                  Simpan
                </button>
                {customBannerUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      saveModuleBannerImage(topicId, bannerKey, '');
                      setTempImageUrl('');
                      setUrlPromptOpen(false);
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-100 text-rose-700 text-xs font-bold hover:bg-rose-200"
                  >
                    Hapus
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setUrlPromptOpen(false)}
                  className="px-2.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tampilan Gambar / Video Kustom Bagian Ini (Dilihat Siswa & Guru) */}
      {customBannerUrl && (
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md group">
          {extractYouTubeId(customBannerUrl) ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                key={extractYouTubeId(customBannerUrl)}
                src={getYouTubeEmbedUrl(extractYouTubeId(customBannerUrl)!)}
                title={`Video ${moduleTitle}`}
                className="w-full h-full border-0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={customBannerUrl}
              alt={`Visual ${moduleTitle}`}
              className="w-full max-h-[380px] object-contain mx-auto bg-slate-950"
            />
          )}
          {isTeacher && (
            <div
              data-live-editor-ignore="true"
              className="absolute top-3 right-3 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity"
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-bold border border-white/20 hover:bg-indigo-600 flex items-center gap-1.5 shadow-lg cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" /> Ganti Gambar
              </button>
              <button
                type="button"
                onClick={() => saveModuleBannerImage(topicId, bannerKey, '')}
                className="p-1.5 rounded-xl bg-rose-600/90 text-white hover:bg-rose-500 shadow-lg cursor-pointer"
                title="Hapus Gambar Bagian Ini"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface LiveInlineEditorOverlayProps {
  topicId: string;
  activeModule: string;
}

/**
 * Komponen Overlay Global untuk Mode Edit Langsung di Layar (`isLiveEditMode`).
 * Memungkinkan Guru mengeklik teks atau gambar APAPUN di halaman (dari Apersepsi s/d Sertifikat)
 * untuk langsung mengubah tulisannya atau mengganti gambarnya.
 */
export const LiveInlineEditorOverlay: React.FC<LiveInlineEditorOverlayProps> = ({
  topicId,
  activeModule,
}) => {
  const { isTeacher, isLiveEditMode, toggleLiveEditMode } = useUserRole();
  const { overrides, saveInlineText, saveInlineImage, saveTopicOverride } = useCurriculumOverrides();

  const [editingTarget, setEditingTarget] = useState<{
    type: 'text' | 'image';
    key: string;
    currentValue: string;
    element: HTMLElement;
    label: string;
  } | null>(null);

  const [draftValue, setDraftValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const override = overrides[topicId] || {};

  // Terapkan semua perubahan inlineTextMap & inlineImageMap ke elemen DOM setiap kali modul atau override berubah
  useEffect(() => {
    const applyOverridesToDom = () => {
      const mainEl = document.querySelector('main');
      if (!mainEl) return;

      const textMap = override.inlineTextMap || {};
      const imageMap = override.inlineImageMap || {};

      // Terapkan perubahan teks berbasis original text signature secara aman untuk Virtual DOM React
      if (Object.keys(textMap).length > 0) {
        const textElements = mainEl.querySelectorAll(
          'h1, h2, h3, h4, h5, p, span, li, blockquote, label, td, th'
        );
        textElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.closest('[data-live-editor-ignore="true"]')) return;
          // Hanya ubah node teks tunggal agar tidak merusak struktur child Virtual DOM React
          if (
            htmlEl.children.length > 0 ||
            htmlEl.childNodes.length !== 1 ||
            htmlEl.firstChild?.nodeType !== Node.TEXT_NODE
          ) {
            return;
          }

          const currentNodeVal = htmlEl.firstChild.nodeValue || '';
          const origText =
            htmlEl.getAttribute('data-orig-text') || currentNodeVal.trim();
          if (!origText) return;
          if (!htmlEl.getAttribute('data-orig-text')) {
            htmlEl.setAttribute('data-orig-text', origText);
          }

          const key = `${activeModule}::${origText.slice(0, 140)}`;
          const fallbackKey = origText.slice(0, 140);
          const replacement = textMap[key] ?? textMap[fallbackKey];
          if (replacement !== undefined && htmlEl.firstChild.nodeValue !== replacement) {
            htmlEl.firstChild.nodeValue = replacement;
          }
        });
      }

      // Terapkan perubahan gambar
      if (Object.keys(imageMap).length > 0) {
        const imgElements = mainEl.querySelectorAll('img');
        imgElements.forEach((img, idx) => {
          if (img.closest('[data-live-editor-ignore="true"]')) return;
          const origSrc =
            img.getAttribute('data-orig-src') ||
            img.getAttribute('src') ||
            `img-${idx}`;
          if (!img.getAttribute('data-orig-src')) {
            img.setAttribute('data-orig-src', origSrc);
          }
          const key = `${activeModule}::img::${img.alt || idx}`;
          const replacement = imageMap[key] ?? imageMap[origSrc];
          if (replacement && img.src !== replacement) {
            img.src = replacement;
          }
        });
      }
    };

    const timer = setTimeout(applyOverridesToDom, 80);
    return () => clearTimeout(timer);
  }, [topicId, activeModule, override.inlineTextMap, override.inlineImageMap]);

  // Tangkap klik pada teks atau gambar saat isLiveEditMode aktif
  useEffect(() => {
    if (!isTeacher || !isLiveEditMode) return;

    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest('[data-live-editor-ignore="true"]')) return;

      if (target.tagName === 'IMG') {
        target.style.outline = '3px dashed #f59e0b';
        target.style.outlineOffset = '3px';
        target.style.cursor = 'pointer';
        return;
      }

      const editable = target.closest(
        'h1, h2, h3, h4, h5, p, span, li, blockquote, td, th'
      ) as HTMLElement | null;
      if (editable && !editable.closest('[data-live-editor-ignore="true"]')) {
        editable.style.outline = '2px dashed #6366f1';
        editable.style.outlineOffset = '2px';
        editable.style.cursor = 'text';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      target.style.outline = '';
      target.style.outlineOffset = '';
      const editable = target.closest(
        'h1, h2, h3, h4, h5, p, span, li, blockquote, td, th'
      ) as HTMLElement | null;
      if (editable) {
        editable.style.outline = '';
        editable.style.outlineOffset = '';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest('[data-live-editor-ignore="true"]')) return;

      // Jika klik gambar
      if (target.tagName === 'IMG') {
        e.preventDefault();
        e.stopPropagation();
        const imgEl = target as HTMLImageElement;
        const allImgs = Array.from(mainEl.querySelectorAll('img'));
        const idx = allImgs.indexOf(imgEl);
        const key = `${activeModule}::img::${imgEl.alt || idx}`;
        setEditingTarget({
          type: 'image',
          key,
          currentValue: imgEl.src,
          element: imgEl,
          label: imgEl.alt || `Gambar #${idx + 1}`,
        });
        setDraftValue(imgEl.src);
        return;
      }

      // Jika klik elemen teks
      const editable = target.closest(
        'h1, h2, h3, h4, h5, p, span, li, blockquote, td, th'
      ) as HTMLElement | null;
      if (!editable) return;

      const hasComplexChildren = Array.from(editable.children).some((c) =>
        ['DIV', 'P', 'UL', 'OL', 'TABLE', 'SECTION', 'BUTTON', 'SVG'].includes(c.tagName)
      );
      if (hasComplexChildren) return;

      const currentText = editable.innerText.trim();
      if (!currentText) return;

      e.preventDefault();
      e.stopPropagation();

      const origText = editable.getAttribute('data-orig-text') || currentText;
      if (!editable.getAttribute('data-orig-text')) {
        editable.setAttribute('data-orig-text', origText);
      }

      const key = `${activeModule}::${origText.slice(0, 140)}`;
      setEditingTarget({
        type: 'text',
        key,
        currentValue: currentText,
        element: editable,
        label: `<${editable.tagName.toLowerCase()}> pada bagian ${activeModule}`,
      });
      setDraftValue(currentText);
    };

    mainEl.addEventListener('mouseover', handleMouseOver, true);
    mainEl.addEventListener('mouseout', handleMouseOut, true);
    mainEl.addEventListener('click', handleClick, true);

    return () => {
      mainEl.removeEventListener('mouseover', handleMouseOver, true);
      mainEl.removeEventListener('mouseout', handleMouseOut, true);
      mainEl.removeEventListener('click', handleClick, true);
    };
  }, [isTeacher, isLiveEditMode, activeModule]);

  const handleSave = async () => {
    if (!editingTarget) return;
    const ytId = extractYouTubeId(draftValue);
    if (ytId) {
      const cleanWatch = getYouTubeWatchUrl(ytId);
      saveTopicOverride(topicId, { customVideoUrl: cleanWatch });
      const info = await fetchYouTubeOEmbedInfo(ytId);
      if (info?.title) {
        saveTopicOverride(topicId, {
          customVideoUrl: cleanWatch,
          customVideoTitle: info.title,
          ...(info.authorName
            ? { customVideoDescription: `Video pembelajaran dari kanal YouTube ${info.authorName}` }
            : {}),
        });
      }
      setEditingTarget(null);
      return;
    }
    if (editingTarget.type === 'text') {
      if (
        editingTarget.element.children.length === 0 &&
        editingTarget.element.childNodes.length === 1 &&
        editingTarget.element.firstChild?.nodeType === Node.TEXT_NODE
      ) {
        editingTarget.element.firstChild.nodeValue = draftValue;
      }
      saveInlineText(topicId, editingTarget.key, draftValue);
    } else {
      (editingTarget.element as HTMLImageElement).src = draftValue;
      saveInlineImage(topicId, editingTarget.key, draftValue);
    }
    setEditingTarget(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDraftValue(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  if (!isTeacher) return null;

  return (
    <>
      {/* Banner Indikator Saat Mode Edit Langsung Aktif */}
      {isLiveEditMode && (
        <div
          data-live-editor-ignore="true"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-indigo-950/95 text-white px-5 py-2.5 rounded-2xl shadow-2xl border-2 border-indigo-400 flex items-center gap-3 backdrop-blur-md print:hidden"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="text-xs font-bold">
            <span className="text-amber-300 font-black">
              MODE EDIT LANGSUNG AKTIF:
            </span>{' '}
            Klik teks atau gambar manapun di layar untuk langsung mengubahnya!
          </div>
          <button
            type="button"
            onClick={toggleLiveEditMode}
            className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-colors cursor-pointer"
          >
            Selesai Edit Layar
          </button>
        </div>
      )}

      {/* Modal Popover saat Teks atau Gambar Diklik */}
      {editingTarget && (
        <div
          data-live-editor-ignore="true"
          className="fixed inset-0 z-[90] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 print:hidden"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-indigo-200 dark:border-indigo-800 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  {editingTarget.type === 'text' ? (
                    <Edit3 className="w-4 h-4" />
                  ) : (
                    <ImageIcon className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm">
                    {editingTarget.type === 'text'
                      ? 'Edit Teks Bagian Ini'
                      : 'Ganti Gambar Bagian Ini'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {editingTarget.label}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingTarget(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editingTarget.type === 'text' ? (
              <div className="space-y-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Isi Teks Baru:
                </label>
                <textarea
                  rows={5}
                  value={draftValue}
                  onChange={(e) => setDraftValue(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-950 focus:border-indigo-500 focus:outline-none text-sm font-medium text-slate-800 dark:text-white leading-relaxed"
                  autoFocus
                />
              </div>
            ) : (
              <div className="space-y-4">
                {draftValue && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 p-2">
                    <img
                      src={draftValue}
                      alt="Preview"
                      className="max-h-48 mx-auto object-contain rounded-xl"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs border border-indigo-200 dark:border-indigo-800 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" /> Unggah File Gambar dari Perangkat
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Atau Tempel URL Gambar:
                  </label>
                  <input
                    type="text"
                    value={draftValue}
                    onChange={(e) => setDraftValue(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingTarget(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Check className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
