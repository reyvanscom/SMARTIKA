/**
 * Utilitas Keamanan Aplikasi (Security & Sanitization Helper)
 * Melindungi input pengguna dari XSS, memvalidasi URL gambar, dan mengamankan PIN Guru.
 */

/**
 * Escape karakter HTML berbahaya untuk mencegah Cross-Site Scripting (XSS)
 * terutama saat mencetak dokumen HTML (LKPD / Sertifikat).
 */
export function escapeHtml(unsafe: string | undefined | null): string {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Membersihkan teks input biasa dari tag script/HTML berbahaya dan membatasi panjang karakter.
 */
export function sanitizePlainText(input: string | undefined | null, maxLength = 250): string {
  if (!input) return '';
  return String(input)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .slice(0, maxLength);
}

/**
 * Memvalidasi apakah URL gambar aman untuk ditampilkan (mencegah javascript: atau data:text/html).
 */
export function isSafeImageUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  // Izinkan path lokal internal aplikasi
  if (trimmed.startsWith('/src/') || trimmed.startsWith('/assets/') || trimmed.startsWith('/public/')) {
    return true;
  }

  // Izinkan data URL khusus image yang aman
  if (/^data:image\/(png|jpeg|jpg|webp|gif);base64,[a-zA-Z0-9+/=]+$/i.test(trimmed)) {
    return true;
  }

  // Izinkan protokol HTTPS / HTTP standar
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Hash sederhana satu arah (SHA-like deterministic hash + salt) untuk menyimpan PIN Guru
 * agar tidak tersimpan sebagai teks biasa (plaintext) di localStorage.
 */
export function hashTeacherPin(pin: string): string {
  const clean = pin.trim().toLowerCase();
  const salted = `spenmakro_secure_salt_2025::${clean}::informatika`;
  let h1 = 0xdeadbeef ^ salted.length;
  let h2 = 0x41c6ce57 ^ salted.length;
  for (let i = 0, ch; i < salted.length; i++) {
    ch = salted.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 'sec_' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}
