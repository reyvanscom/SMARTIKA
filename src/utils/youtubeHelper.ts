/**
 * Helper untuk mengekstrak ID Video YouTube (11 karakter) secara akurat
 * dari berbagai format URL YouTube (watch?v=, youtu.be/, shorts/, live/, embed/,
 * youtube-nocookie.com, m.youtube.com, tautan bagikan WhatsApp/HP, kode <iframe>, maupun ID langsung).
 */
export function extractYouTubeId(rawInput?: string | null): string | null {
  if (!rawInput || typeof rawInput !== 'string') return null;

  // Bersihkan karakter tak terlihat (zero-width space, LTR/RTL mark dari copy-paste WhatsApp/HP)
  const cleanedInput = rawInput
    .replace(/[\u200B-\u200F\u202A-\u202E\uFEFF]/g, '')
    .trim();
  if (!cleanedInput) return null;

  // 1. Jika guru menempelkan kode HTML <iframe ... src="...">
  const iframeSrcMatch = cleanedInput.match(/src=["']([^"']+)["']/i);
  let targetStr = iframeSrcMatch ? iframeSrcMatch[1].trim() : cleanedInput;

  // Coba decode jika URL ter-encode (misal hasil salin dari redirect pencarian)
  try {
    if (targetStr.includes('%2F') || targetStr.includes('%3F') || targetStr.includes('%3D')) {
      targetStr = decodeURIComponent(targetStr);
    }
  } catch {
    // Abaikan jika gagal decode
  }

  // Jika teks mengandung kalimat pengantar (misal dari tombol Share HP/WA: "Tonton video ini https://youtu.be/...")
  const embeddedUrlMatch = targetStr.match(/https?:\/\/[^\s"'<>]+/i);
  if (embeddedUrlMatch) {
    targetStr = embeddedUrlMatch[0].trim();
  }

  // 2. Jika input sudah berupa 11 karakter ID YouTube murni
  if (/^[a-zA-Z0-9_-]{11}$/.test(targetStr)) {
    return targetStr;
  }

  // 3. Gunakan URL parser standar agar parameter ?v= atau path selalu diambil dengan tepat
  try {
    const normalizedUrl =
      targetStr.startsWith('http://') || targetStr.startsWith('https://')
        ? targetStr
        : `https://${targetStr}`;
    const urlObj = new URL(normalizedUrl);
    const host = urlObj.hostname
      .toLowerCase()
      .replace(/^www\./, '')
      .replace(/^m\./, '');

    // Jika link redirect google.com/url?url=...
    const redirectedUrl = urlObj.searchParams.get('url') || urlObj.searchParams.get('q');
    if (redirectedUrl && redirectedUrl !== targetStr) {
      const fromRedirect = extractYouTubeId(redirectedUrl);
      if (fromRedirect) return fromRedirect;
    }

    if (host === 'youtu.be') {
      const firstSegment = urlObj.pathname.split('/').filter(Boolean)[0] || '';
      const cleanSegment = firstSegment.slice(0, 11);
      if (/^[a-zA-Z0-9_-]{11}$/.test(cleanSegment)) {
        return cleanSegment;
      }
    }

    if (
      host === 'youtube.com' ||
      host === 'youtube-nocookie.com' ||
      host === 'music.youtube.com' ||
      host.endsWith('.youtube.com')
    ) {
      // Cek query param ?v= atau ?vi= terlebih dahulu
      const vParam = urlObj.searchParams.get('v') || urlObj.searchParams.get('vi');
      if (vParam) {
        const cleanV = vParam.trim().slice(0, 11);
        if (/^[a-zA-Z0-9_-]{11}$/.test(cleanV)) {
          return cleanV;
        }
      }

      // Cek jika ada attribution_link (?u=/watch?v=...)
      const uParam = urlObj.searchParams.get('u');
      if (uParam) {
        const fromU = extractYouTubeId(uParam);
        if (fromU) return fromU;
      }

      // Cek path /embed/ID, /shorts/ID, /live/ID, /v/ID, /e/ID, /watch/ID
      const segments = urlObj.pathname.split('/').filter(Boolean);
      const prefixIdx = segments.findIndex((s) =>
        ['embed', 'shorts', 'live', 'v', 'e', 'watch'].includes(s.toLowerCase())
      );
      if (prefixIdx !== -1 && segments[prefixIdx + 1]) {
        const candidate = segments[prefixIdx + 1].slice(0, 11);
        if (/^[a-zA-Z0-9_-]{11}$/.test(candidate)) {
          return candidate;
        }
      }
    }
  } catch {
    // Lanjut ke fallback regex jika bukan URL standar
  }

  // 4. Fallback Regex untuk menangkap ID 11 karakter dari berbagai pola tautan YouTube
  const regexPatterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})(?:[^a-zA-Z0-9_-]|$)/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})(?:[^a-zA-Z0-9_-]|$)/,
    /youtube(?:-nocookie)?\.com\/(?:embed|shorts|live|v|e|watch)\/([a-zA-Z0-9_-]{11})(?:[^a-zA-Z0-9_-]|$)/,
  ];

  for (const pattern of regexPatterns) {
    const match = targetStr.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Menghasilkan URL embed resmi YouTube yang kompatibel di semua mode (Mode Guru & Mode Siswa/Biasa).
 */
export function getYouTubeEmbedUrl(videoUrlOrId?: string | null): string {
  const ytId = extractYouTubeId(videoUrlOrId);
  if (!ytId) return '';
  return `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&playsinline=1`;
}

/**
 * Menghasilkan URL watch standar YouTube untuk tombol buka langsung di tab baru.
 */
export function getYouTubeWatchUrl(videoUrlOrId?: string | null): string {
  const ytId = extractYouTubeId(videoUrlOrId);
  if (!ytId) return '';
  return `https://www.youtube.com/watch?v=${ytId}`;
}

/**
 * Mengambil informasi judul asli video YouTube menggunakan oEmbed publik
 * agar saat Guru mengganti link YouTube, judul video juga otomatis menyesuaikan.
 */
export async function fetchYouTubeOEmbedInfo(
  videoUrlOrId: string
): Promise<{ title?: string; authorName?: string; thumbnailUrl?: string } | null> {
  const ytId = extractYouTubeId(videoUrlOrId);
  if (!ytId) return null;

  const cleanWatchUrl = `https://www.youtube.com/watch?v=${ytId}`;
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(cleanWatchUrl)}&format=json`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: typeof data.title === 'string' ? data.title : undefined,
      authorName: typeof data.author_name === 'string' ? data.author_name : undefined,
      thumbnailUrl: `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`,
    };
  } catch {
    return null;
  }
}
