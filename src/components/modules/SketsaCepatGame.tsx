import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Topic } from '../../types/curriculum';
import { soundManager } from '../../utils/soundSystem';
import { useUserRole } from '../../context/UserRoleContext';
import { useCurriculumOverrides } from '../../context/CurriculumOverridesContext';
import {
  saveStudentScoreToDatabase,
  getSavedDuelPlayerNames
} from '../../utils/studentDatabase';
import confetti from 'canvas-confetti';
import {
  Palette,
  PenTool,
  Eraser,
  Undo2,
  RotateCcw,
  Download,
  Play,
  Pause,
  Clock,
  Trophy,
  Sparkles,
  CheckCircle2,
  Shuffle,
  ArrowRight,
  Swords,
  Bot,
  Zap,
  Volume2,
  VolumeX
} from 'lucide-react';
import {
  evaluateSketchWithAI,
  analyzeCanvasStructure,
  SketchEvaluationResult
} from '../../utils/sketchEvaluator';

export type ShapeGuideType =
  | 'tree-boxes'
  | 'three-shapes'
  | 'flowchart-3'
  | 'diamond-arrow'
  | 'loop-circle'
  | 'bar-3'
  | 'venn-2'
  | 'funnel'
  | 'pie-circle'
  | 'cylinder-db'
  | 'grid-table'
  | 'cpu-chip'
  | 'monitor'
  | 'flashdisk'
  | 'mouse'
  | 'keyboard'
  | 'magnifier'
  | 'check-badge'
  | 'warning-triangle'
  | 'router-wifi'
  | 'star-network'
  | 'cloud-arrow'
  | 'padlock'
  | 'shield-check'
  | 'puzzle-block'
  | 'terminal-box'
  | 'bug-beetle'
  | 'folder-doc';

export interface DrawingChallenge {
  id: string;
  topicTitle: string;
  title: string;
  clue: string;
  hints: string[];
  difficulty: 'Mudah' | 'Sedang' | 'Kreatif';
  keyElements: string[];
  shapeGuideType: ShapeGuideType;
  shapeSteps: string[];
}

/**
 * Bank Soal Sketsa Gambar Sesuai Materi Topik (10 Soal per Topik)
 * Tidak menampilkan bocoran gambar visual di kanvas maupun di layar;
 * seluruh petunjuk disajikan melalui kalimat deskriptif di bawah soal.
 */
export const getTopicDrawingChallenges = (topic: Topic): DrawingChallenge[] => {
  const tid = (topic.id || '').toLowerCase();
  const title = (topic.title || '').toLowerCase();

  // =========================================================================
  // 1. KELAS 7: Berpikir Komputasional (k7-bk)
  // =========================================================================
  if (tid === 'k7-bk' || tid.includes('bk') || title.includes('komputasional')) {
    return [
      {
        id: 'bk-1',
        topicTitle: 'Berpikir Komputasional',
        title: 'Pengenalan Pola: Deret Segitiga, Persegi, dan Lingkaran',
        clue: 'Gambarlah 3 bangun datar berjejer mendatar dari kiri ke kanan, yaitu 1 segitiga di kiri, 1 kotak persegi di tengah, dan 1 lingkaran bulat di sebelah kanan.',
        hints: ['Segitiga di kiri', 'Persegi di tengah', 'Lingkaran di kanan'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga', 'Kotak persegi', 'Lingkaran'],
        shapeGuideType: 'three-shapes',
        shapeSteps: ['Buat 1 segitiga di sisi kiri', 'Buat 1 persegi di bagian tengah', 'Buat 1 lingkaran di sisi kanan']
      },
      {
        id: 'bk-2',
        topicTitle: 'Berpikir Komputasional',
        title: 'Bagan Dekomposisi Masalah (1 Masalah Utama Dipecah Jadi 3 Bagian)',
        clue: 'Gambarlah 1 kotak persegi panjang di bagian atas sebagai masalah utama, lalu tarik 3 garis cabang ke bawah menuju 3 kotak kecil yang berjejer di bawahnya.',
        hints: ['1 kotak di atas', '3 garis cabang', '3 kotak di bawah'],
        difficulty: 'Mudah',
        keyElements: ['1 Kotak atas', 'Garis cabang', '3 Kotak bawah'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak utama di atas tengah', 'Tarik 3 garis cabang ke arah bawah', 'Gambar 3 kotak bagian di ujung garis bawah']
      },
      {
        id: 'bk-3',
        topicTitle: 'Berpikir Komputasional',
        title: 'Urutan Algoritma 3 Langkah (Mulai ➔ Proses ➔ Selesai)',
        clue: 'Gambarlah bentuk oval di sebelah kiri (Mulai), tarik garis panah ke kanan menuju bentuk kotak persegi panjang di tengah (Proses), lalu tarik panah lagi ke bentuk oval di kanan (Selesai).',
        hints: ['Oval kiri', 'Panah ke kotak tengah', 'Panah ke oval kanan'],
        difficulty: 'Mudah',
        keyElements: ['Oval Mulai', 'Kotak Proses', 'Oval Selesai'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar oval di kiri', 'Tarik garis panah ke kotak di tengah', 'Tarik garis panah ke oval di kanan']
      },
      {
        id: 'bk-4',
        topicTitle: 'Berpikir Komputasional',
        title: 'Abstraksi: Corong Penyaring Informasi Penting',
        clue: 'Gambarlah bentuk corong penyaring (segitiga terbalik yang lebar di atas dan menyempit menjadi pipa lurus di bawah) dengan beberapa titik bulat kecil di atas corong.',
        hints: ['Segitiga terbalik', 'Pipa kecil di bawah', 'Titik-titik di atas'],
        difficulty: 'Mudah',
        keyElements: ['Corong segitiga terbalik', 'Pipa bawah', 'Titik informasi'],
        shapeGuideType: 'funnel',
        shapeSteps: ['Gambar segitiga terbalik lebar di tengah', 'Tambahkan saluran pipa pendek di ujung bawah', 'Beri 3 bulatan kecil di atas mulut corong']
      },
      {
        id: 'bk-5',
        topicTitle: 'Berpikir Komputasional',
        title: 'Simbol Logika Keputusan (Belah Ketupat & 2 Panah Cabang)',
        clue: 'Gambarlah 1 bangun belah ketupat (diamond) di tengah kanvas, lalu tambahkan 2 garis anak panah yang keluar dari sudut kiri dan sudut kanannya.',
        hints: ['Belah ketupat di tengah', 'Panah keluar ke kiri', 'Panah keluar ke kanan'],
        difficulty: 'Mudah',
        keyElements: ['Belah ketupat', 'Panah kiri', 'Panah kanan'],
        shapeGuideType: 'diamond-arrow',
        shapeSteps: ['Gambar belah ketupat di tengah', 'Tarik garis panah keluar ke kiri', 'Tarik garis panah keluar ke kanan']
      },
      {
        id: 'bk-6',
        topicTitle: 'Berpikir Komputasional',
        title: 'Pola Perulangan Siklus (Panah Melingkar)',
        clue: 'Gambarlah satu garis melengkung memutar hampir membentuk lingkaran penuh, lalu beri ujung kepala panah segitiga di ujung garisnya.',
        hints: ['Garis melingkar', 'Ujung kepala panah'],
        difficulty: 'Mudah',
        keyElements: ['Garis melingkar', 'Kepala panah'],
        shapeGuideType: 'loop-circle',
        shapeSteps: ['Buat garis melengkung bundar di tengah', 'Tambahkan kepala panah lancip di ujung garisnya']
      },
      {
        id: 'bk-7',
        topicTitle: 'Berpikir Komputasional',
        title: 'Pengurutan Data (3 Balok dari Pendek ke Tinggi)',
        clue: 'Gambarlah satu garis alas mendatar di bawah, lalu dirikan 3 kotak batang secara berurutan dari ukuran paling pendek di kiri, sedang di tengah, hingga paling tinggi di kanan.',
        hints: ['Garis alas mendatar', 'Batang pendek, sedang, tinggi'],
        difficulty: 'Mudah',
        keyElements: ['Garis alas', '3 Batang bertingkat'],
        shapeGuideType: 'bar-3',
        shapeSteps: ['Tarik garis lurus mendatar sebagai alas', 'Gambar kotak pendek di kiri & sedang di tengah', 'Gambar kotak paling tinggi di sebelah kanan']
      },
      {
        id: 'bk-8',
        topicTitle: 'Berpikir Komputasional',
        title: 'Denah Rute Sederhana (Abstraksi Peta Jalan)',
        clue: 'Gambarlah lingkaran kecil di kiri bawah (Titik Berangkat), hubungkan dengan garis jalan berbelok siku menuju tanda bintang atau kotak sekolah di kanan atas.',
        hints: ['Lingkaran titik awal', 'Garis jalur berbelok', 'Kotak tujuan'],
        difficulty: 'Mudah',
        keyElements: ['Titik awal', 'Garis rute', 'Kotak tujuan'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar lingkaran kecil di kiri bawah', 'Tarik garis jalan berbelok ke kanan atas', 'Gambar kotak gedung di ujung kanan atas']
      },
      {
        id: 'bk-9',
        topicTitle: 'Berpikir Komputasional',
        title: 'Matriks Kotak Pola 3x3 (Papan Grid)',
        clue: 'Gambarlah 1 kotak persegi besar di tengah, kemudian bagi bagian dalamnya menggunakan 2 garis mendatar dan 2 garis tegak sehingga membentuk 9 kotak kecil.',
        hints: ['Kotak besar', '2 garis mendatar', '2 garis tegak'],
        difficulty: 'Mudah',
        keyElements: ['Kotak persegi', 'Garis pembagi 3x3'],
        shapeGuideType: 'grid-table',
        shapeSteps: ['Gambar persegi besar di tengah', 'Tarik 2 garis mendatar di dalamnya', 'Tarik 2 garis tegak memotong garis mendatar']
      },
      {
        id: 'bk-10',
        topicTitle: 'Berpikir Komputasional',
        title: 'Klasifikasi Himpunan Pola (2 Lingkaran Berdampingan)',
        clue: 'Gambarlah 2 lingkaran besar di kiri dan kanan, lalu isi lingkaran kiri dengan 3 titik kecil dan lingkaran kanan dengan 3 garis kecil.',
        hints: ['2 lingkaran besar', 'Isi titik di kiri', 'Isi garis di kanan'],
        difficulty: 'Mudah',
        keyElements: ['2 Lingkaran kelompok', 'Simbol isi kelompok'],
        shapeGuideType: 'venn-2',
        shapeSteps: ['Gambar 2 lingkaran besar', 'Beri 3 titik di dalam lingkaran kiri', 'Beri 3 garis pendek di dalam lingkaran kanan']
      }
    ];
  }

  // =========================================================================
  // 2. KELAS 7: Informasi Digital & Kredibilitas Sumber (k7-idk)
  // =========================================================================
  if (tid === 'k7-idk' || title.includes('informasi digital') || title.includes('kredibilitas')) {
    return [
      {
        id: 'idk-1',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Simbol Sumber Kredibel (Perisai & Tanda Centang)',
        clue: 'Gambarlah bentuk perisai tameng yang lebar di bagian atas dan meruncing di bagian bawah, lalu buat tanda centang (✓) besar di tengah perisai tersebut.',
        hints: ['Bentuk perisai', 'Tanda centang di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Perisai tameng', 'Tanda centang'],
        shapeGuideType: 'shield-check',
        shapeSteps: ['Gambar garis luar perisai tameng', 'Buat tanda centang (✓) tegas di bagian tengahnya']
      },
      {
        id: 'idk-2',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Gembok Keamanan Situs Resmi (HTTPS)',
        clue: 'Gambarlah 1 kotak persegi di bawah sebagai badan gembok, tambahkan lengkungan huruf U terbalik di atasnya sebagai pengait, dan buat bulatan lubang kunci di tengah kotak.',
        hints: ['Kotak badan gembok', 'Lengkungan U terbalik di atas', 'Lubang kunci di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak gembok', 'Lengkungan pengait', 'Lubang kunci'],
        shapeGuideType: 'padlock',
        shapeSteps: ['Gambar kotak persegi untuk badan gembok', 'Tambahkan lengkungan U terbalik di sisi atas', 'Buat titik/lingkaran kecil di tengah kotak']
      },
      {
        id: 'idk-3',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Kaca Pembesar Verifikasi Sumber Informasi',
        clue: 'Gambarlah 1 lingkaran bulat sebagai lensa kaca pembesar, lalu tarik 1 garis lurus tebal miring ke arah kanan bawah sebagai gagang pegangannya.',
        hints: ['Lingkaran lensa', 'Garis gagang miring'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran lensa', 'Gagang miring'],
        shapeGuideType: 'magnifier',
        shapeSteps: ['Gambar 1 lingkaran bulat agak ke tengah atas', 'Tarik garis tebal miring dari tepi lingkaran ke kanan bawah']
      },
      {
        id: 'idk-4',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Dokumen Digital (E-Book / File Artikel Resmi)',
        clue: 'Gambarlah kotak persegi panjang berdiri seperti lembaran kertas dengan lipatan segitiga kecil di pojok kanan atas dan 3 garis mendatar di dalamnya sebagai barisan teks.',
        hints: ['Persegi panjang tegak', 'Lipatan pojok atas', '3 garis teks mendatar'],
        difficulty: 'Mudah',
        keyElements: ['Kotak lembaran dokumen', '3 garis teks'],
        shapeGuideType: 'folder-doc',
        shapeSteps: ['Gambar persegi panjang berdiri', 'Buat lipatan segitiga kecil di sudut atas', 'Tarik 3 garis mendatar sejajar di tengah halaman']
      },
      {
        id: 'idk-5',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Rambu Peringatan Situs Meragukan / Clickbait (!)',
        clue: 'Gambarlah sebuah segitiga sama sisi berukuran besar di tengah kanvas, kemudian gambar tanda seru (!) berupa garis tegak dan titik bulat di bagian tengah segitiga.',
        hints: ['Segitiga besar', 'Garis tegak & titik tanda seru'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga peringatan', 'Tanda seru !'],
        shapeGuideType: 'warning-triangle',
        shapeSteps: ['Gambar segitiga besar di tengah', 'Buat garis lurus tegak di dalamnya', 'Beri titik bulat di bawah garis tegak tersebut']
      },
      {
        id: 'idk-6',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Lencana Centang Informasi Terverifikasi',
        clue: 'Gambarlah 1 lingkaran bulat besar di tengah kanvas, lalu buat simbol centang (✓) yang jelas tepat di dalam lingkaran tersebut.',
        hints: ['Lingkaran besar', 'Simbol centang di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', 'Simbol centang'],
        shapeGuideType: 'check-badge',
        shapeSteps: ['Gambar lingkaran besar utuh', 'Buat goresan tanda centang (✓) di tengah lingkaran']
      },
      {
        id: 'idk-7',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Informasi Digital Berbentuk Video (Layar & Tombol Play)',
        clue: 'Gambarlah 1 kotak persegi panjang mendatar seperti layar video, lalu gambar bentuk segitiga menghadap ke kanan (simbol Play ▶) tepat di tengah kotak.',
        hints: ['Persegi panjang mendatar', 'Segitiga Play menghadap kanan'],
        difficulty: 'Mudah',
        keyElements: ['Kotak layar video', 'Segitiga Play'],
        shapeGuideType: 'monitor',
        shapeSteps: ['Gambar kotak persegi panjang melebar', 'Gambar segitiga menghadap ke kanan di pusat kotak']
      },
      {
        id: 'idk-8',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Penyimpanan Informasi di Awan Digital (Cloud)',
        clue: 'Gambarlah bentuk awan bergelombang dengan alas datar di bagian bawah, lalu tambahkan anak panah lurus mengarah ke atas di bagian tengah awan.',
        hints: ['Lengkungan awan', 'Panah ke atas'],
        difficulty: 'Mudah',
        keyElements: ['Bentuk awan', 'Panah unggah'],
        shapeGuideType: 'cloud-arrow',
        shapeSteps: ['Gambar lengkungan awan di tengah kanvas', 'Gambar garis tegak berujung panah ke atas di dalamnya']
      },
      {
        id: 'idk-9',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Saringan "Saring Sebelum Sharing" (Corong Filter)',
        clue: 'Gambarlah bentuk corong (mulut lebar di atas dan pipa sempit di bawah) untuk melambangkan penyaringan informasi sebelum disebarkan.',
        hints: ['Mulut corong lebar di atas', 'Saluran pipa di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Bentuk corong saringan'],
        shapeGuideType: 'funnel',
        shapeSteps: ['Gambar bagian atas corong berbentuk V lebar', 'Sambungkan dengan pipa lurus pendek di bagian bawah']
      },
      {
        id: 'idk-10',
        topicTitle: 'Informasi Digital & Kredibilitas',
        title: 'Map Folder Koleksi Sumber Pustaka Digital',
        clue: 'Gambarlah kotak persegi panjang mendatar menyerupai map folder dengan tonjolan tab kecil di sisi kiri atas dan 2 garis lurus mendatar di bagian tengahnya.',
        hints: ['Kotak map folder', 'Tab kecil di kiri atas', '2 garis isi di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Kotak map folder', 'Tab atas', 'Garis dokumen'],
        shapeGuideType: 'folder-doc',
        shapeSteps: ['Gambar kotak persegi panjang mendatar', 'Tambahkan tonjolan tab di kiri atas', 'Buat 2 garis mendatar di dalam kotak']
      }
    ];
  }

  // =========================================================================
  // 3. KELAS 7: Browser dan Search Engine (k7-bse)
  // =========================================================================
  if (tid === 'k7-bse' || title.includes('browser') || title.includes('search engine')) {
    return [
      {
        id: 'bse-1',
        topicTitle: 'Browser dan Search Engine',
        title: 'Kaca Pembesar Mesin Pencari (Search Icon)',
        clue: 'Gambarlah 1 lingkaran bulat sebagai kaca pembesar pencarian, lalu tarik 1 garis lurus miring ke kanan bawah sebagai tangkai pegangannya.',
        hints: ['Lingkaran kaca', 'Tangkai miring ke kanan bawah'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', 'Garis tangkai'],
        shapeGuideType: 'magnifier',
        shapeSteps: ['Gambar lingkaran bulat di tengah', 'Tarik garis miring dari tepi kanan bawah lingkaran']
      },
      {
        id: 'bse-2',
        topicTitle: 'Browser dan Search Engine',
        title: 'Jendela Web Browser dengan Bilah Alamat URL',
        clue: 'Gambarlah 1 kotak persegi panjang besar, beri 1 garis mendatar di bagian atas untuk memisahkan bilah alamat (address bar), dan tambahkan 3 titik tombol di pojok kiri atas.',
        hints: ['Kotak jendela besar', 'Garis bilah atas', '3 titik di kiri atas'],
        difficulty: 'Mudah',
        keyElements: ['Kotak browser', 'Bilah atas', '3 titik kontrol'],
        shapeGuideType: 'terminal-box',
        shapeSteps: ['Gambar kotak persegi panjang besar', 'Tarik 1 garis mendatar di dekat sisi atas', 'Beri 3 bulatan kecil di pojok kiri atas']
      },
      {
        id: 'bse-3',
        topicTitle: 'Browser dan Search Engine',
        title: 'Kotak Pencarian Kata Kunci (Search Bar)',
        clue: 'Gambarlah 1 persegi panjang memanjang secara mendatar dengan ujung melengkung (lonjong), lalu gambar lingkaran kecil kaca pembesar di ujung sebelah kanannya.',
        hints: ['Kotak memanjang mendatar', 'Lingkaran kecil di ujung kanan'],
        difficulty: 'Mudah',
        keyElements: ['Kotak kolom cari', 'Ikon kaca pembesar'],
        shapeGuideType: 'keyboard',
        shapeSteps: ['Gambar persegi panjang memanjang di tengah', 'Gambar lingkaran kecil bertangkai di sisi dalamnya sebelah kanan']
      },
      {
        id: 'bse-4',
        topicTitle: 'Browser dan Search Engine',
        title: 'Gembok Keamanan Protokol HTTPS pada URL',
        clue: 'Gambarlah kotak persegi untuk badan gembok dengan lengkungan huruf U terbalik di bagian atasnya sebagai simbol situs web yang aman.',
        hints: ['Kotak badan gembok', 'Lengkungan pengait di atas'],
        difficulty: 'Mudah',
        keyElements: ['Kotak gembok', 'Lengkungan atas'],
        shapeGuideType: 'padlock',
        shapeSteps: ['Gambar kotak persegi di tengah bawah', 'Gambar lengkungan huruf U terbalik menempel di atas kotak']
      },
      {
        id: 'bse-5',
        topicTitle: 'Browser dan Search Engine',
        title: 'Tombol Navigasi Back & Forward Browser (2 Panah)',
        clue: 'Gambarlah 2 anak panah mendatar secara berdampingan: 1 panah menunjuk ke arah kiri (Back) dan 1 panah menunjuk ke arah kanan (Forward).',
        hints: ['Panah ke kiri', 'Panah ke kanan'],
        difficulty: 'Mudah',
        keyElements: ['Panah kiri', 'Panah kanan'],
        shapeGuideType: 'diamond-arrow',
        shapeSteps: ['Gambar garis mendatar dengan ujung panah ke kiri', 'Di sebelahnya gambar garis mendatar dengan ujung panah ke kanan']
      },
      {
        id: 'bse-6',
        topicTitle: 'Browser dan Search Engine',
        title: 'Tombol Reload / Refresh Halaman Web',
        clue: 'Gambarlah garis melengkung memutar membentuk lingkaran hampir penuh dengan ujung anak panah segitiga di ujungnya (simbol muat ulang halaman).',
        hints: ['Garis melingkar', 'Kepala panah di ujungnya'],
        difficulty: 'Mudah',
        keyElements: ['Garis melingkar', 'Kepala panah'],
        shapeGuideType: 'loop-circle',
        shapeSteps: ['Gambar garis melingkar hampir penuh', 'Tambahkan segitiga kepala panah pada ujung garisnya']
      },
      {
        id: 'bse-7',
        topicTitle: 'Browser dan Search Engine',
        title: 'Operator Boolean IRIsan Pencarian (Diagram Venn AND)',
        clue: 'Gambarlah 2 lingkaran besar yang saling berpotongan di bagian tengah, lalu arsir bagian tengah perpotongannya untuk melambangkan operator pencarian AND.',
        hints: ['2 lingkaran berpotongan', 'Arsiran di bagian tengah'],
        difficulty: 'Mudah',
        keyElements: ['2 Lingkaran beririsan', 'Arsiran tengah'],
        shapeGuideType: 'venn-2',
        shapeSteps: ['Gambar lingkaran pertama di kiri', 'Gambar lingkaran kedua memotong lingkaran pertama', 'Beri garis-garis arsir di bagian tengah perpotongan']
      },
      {
        id: 'bse-8',
        topicTitle: 'Browser dan Search Engine',
        title: 'Simbol Unduh Berkas dari Browser (Awan & Panah Turun)',
        clue: 'Gambarlah bentuk awan di bagian atas, lalu tarik garis anak panah lurus mengarah ke bawah menuju sebuah garis datar penampung di bawahnya.',
        hints: ['Bentuk awan di atas', 'Panah lurus ke bawah'],
        difficulty: 'Mudah',
        keyElements: ['Awan', 'Panah ke bawah'],
        shapeGuideType: 'cloud-arrow',
        shapeSteps: ['Gambar bentuk awan di bagian atas', 'Tarik garis panah menunjuk ke bawah di tengahnya']
      },
      {
        id: 'bse-9',
        topicTitle: 'Browser dan Search Engine',
        title: 'Jaring Tautan Web (Hyperlink 1 Halaman ke 3 Halaman)',
        clue: 'Gambarlah 1 kotak halaman web di atas, lalu tarik 3 garis panah menyebar ke 3 kotak halaman web lainnya di bagian bawah.',
        hints: ['1 kotak di atas', '3 garis panah cabang', '3 kotak di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak pusat atas', '3 garis tautan', '3 kotak bawah'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di bagian atas', 'Tarik 3 garis ke arah bawah', 'Gambar 3 kotak di ujung bawah setiap garis']
      },
      {
        id: 'bse-10',
        topicTitle: 'Browser dan Search Engine',
        title: 'Bola Dunia Internet (World Wide Web)',
        clue: 'Gambarlah 1 lingkaran besar seperti bola dunia, lalu tambahkan 1 garis lurus tegak, 1 garis lurus mendatar, dan 2 garis lengkung yang membelah bagian dalamnya.',
        hints: ['Lingkaran besar', 'Garis tegak & mendatar di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran bola dunia', 'Garis lintang dan bujur'],
        shapeGuideType: 'pie-circle',
        shapeSteps: ['Gambar 1 lingkaran bulat besar', 'Tarik garis tegak dan garis mendatar melewati titik pusat', 'Tambahkan garis lengkung di sisi kiri dan kanan dalam lingkaran']
      }
    ];
  }

  // =========================================================================
  // 4. KELAS 7: Aplikasi Pengolah Dokumen – Google Dokumen (k7-gdoc)
  // =========================================================================
  if (tid === 'k7-gdoc' || title.includes('dokumen') || title.includes('google docs')) {
    return [
      {
        id: 'gdoc-1',
        topicTitle: 'Google Dokumen',
        title: 'Halaman Dokumen dengan Judul Heading & Paragraf',
        clue: 'Gambarlah 1 kotak persegi panjang berdiri seperti kertas, buat 1 kotak judul tebal di bagian atas dalam kertas, dan 4 garis lurus mendatar di bawahnya sebagai baris kalimat.',
        hints: ['Kotak kertas berdiri', 'Judul tebal di atas', '4 garis mendatar di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak halaman', 'Judul atas', 'Garis-garis paragraf'],
        shapeGuideType: 'folder-doc',
        shapeSteps: ['Gambar persegi panjang tegak', 'Buat persegi panjang kecil mendatar di atas untuk Judul', 'Tarik 4 garis mendatar sejajar di bawahnya']
      },
      {
        id: 'gdoc-2',
        topicTitle: 'Google Dokumen',
        title: 'Ikon Perataan Teks Rata Kiri-Kanan (Justify)',
        clue: 'Gambarlah 5 garis lurus mendatar yang disusun bertumpuk dari atas ke bawah dengan panjang ujung kiri dan ujung kanan yang sama rata.',
        hints: ['5 garis mendatar sejajar', 'Panjang kiri dan kanan sama rata'],
        difficulty: 'Mudah',
        keyElements: ['Garis-garis sejajar rata kiri-kanan'],
        shapeGuideType: 'grid-table',
        shapeSteps: ['Tarik garis mendatar pertama yang panjang', 'Tarik 4 garis mendatar lagi di bawahnya dengan panjang persis sama']
      },
      {
        id: 'gdoc-3',
        topicTitle: 'Google Dokumen',
        title: 'Tabel Data 3x3 di Dalam Dokumen',
        clue: 'Gambarlah sebuah persegi besar, kemudian buat 2 garis lurus mendatar dan 2 garis lurus tegak di dalamnya sehingga membentuk tabel berisi 9 kotak sel.',
        hints: ['Kotak persegi luar', '2 garis mendatar', '2 garis tegak'],
        difficulty: 'Mudah',
        keyElements: ['Bingkai kotak', 'Garis baris', 'Garis kolom'],
        shapeGuideType: 'grid-table',
        shapeSteps: ['Gambar kotak besar di tengah', 'Buat 2 garis mendatar membagi baris', 'Buat 2 garis tegak membagi kolom']
      },
      {
        id: 'gdoc-4',
        topicTitle: 'Google Dokumen',
        title: 'Penyimpanan Otomatis ke Google Drive (Awan & Panah)',
        clue: 'Gambarlah bentuk awan penyimpanan cloud di tengah kanvas, lalu gambar anak panah menghadap ke atas di bagian dalamnya.',
        hints: ['Lengkungan awan', 'Panah mengarah ke atas'],
        difficulty: 'Mudah',
        keyElements: ['Awan cloud', 'Panah ke atas'],
        shapeGuideType: 'cloud-arrow',
        shapeSteps: ['Gambar bentuk awan dengan bagian bawah rata', 'Gambar garis panah menunjuk ke atas di tengah awan']
      },
      {
        id: 'gdoc-5',
        topicTitle: 'Google Dokumen',
        title: 'Struktur Hierarki Heading 1 ke Heading 2 (Bagan Bab)',
        clue: 'Gambarlah 1 kotak Bab Utama (Heading 1) di bagian atas, lalu tarik 3 garis penghubung ke bawah menuju 3 kotak Sub-bab (Heading 2).',
        hints: ['1 kotak di atas', '3 garis cabang ke bawah', '3 kotak di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak Heading 1', 'Garis cabang', '3 Kotak Heading 2'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di bagian atas', 'Tarik 3 garis cabang ke bawah', 'Gambar 3 kotak sejajar di bagian bawah']
      },
      {
        id: 'gdoc-6',
        topicTitle: 'Google Dokumen',
        title: 'Tombol Undo / Batalkan Ketikan (Panah Melengkung Balik)',
        clue: 'Gambarlah garis yang melengkung memutar balik ke arah kiri atas disertai ujung kepala panah segitiga untuk melambangkan perintah Undo (Ctrl + Z).',
        hints: ['Garis lengkung memutar balik', 'Ujung panah di kiri'],
        difficulty: 'Mudah',
        keyElements: ['Lengkungan balik', 'Kepala panah'],
        shapeGuideType: 'loop-circle',
        shapeSteps: ['Buat garis lengkung setengah lingkaran', 'Tambahkan kepala panah segitiga di ujung kirinya']
      },
      {
        id: 'gdoc-7',
        topicTitle: 'Google Dokumen',
        title: 'Daftar Berbutir (Bulleted List: 3 Titik & 3 Garis)',
        clue: 'Gambarlah 3 bulatan kecil berurutan dari atas ke bawah di sisi kiri, lalu di sebelah kanan tiap bulatan tarik 1 garis lurus mendatar.',
        hints: ['3 titik bulat di kiri', '3 garis mendatar di kanan'],
        difficulty: 'Mudah',
        keyElements: ['3 Titik bullet', '3 Garis teks'],
        shapeGuideType: 'folder-doc',
        shapeSteps: ['Buat 3 titik bulatan berjejer ke bawah di kiri', 'Tarik garis lurus mendatar di samping kanan masing-masing titik']
      },
      {
        id: 'gdoc-8',
        topicTitle: 'Google Dokumen',
        title: 'Ikon Komentar Kolaborasi (Balon Percakapan & Tanda +)',
        clue: 'Gambarlah kotak persegi panjang dengan lancipan segitiga kecil di bagian bawahnya seperti balon percakapan komik, lalu beri tanda tambah (+) di tengahnya.',
        hints: ['Kotak balon percakapan', 'Lancipan di bawah', 'Tanda + di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Balon chat', 'Tanda tambah'],
        shapeGuideType: 'terminal-box',
        shapeSteps: ['Gambar kotak dengan ekor segitiga di bawah', 'Buat tanda tambah (+) di tengah kotak tersebut']
      },
      {
        id: 'gdoc-9',
        topicTitle: 'Google Dokumen',
        title: 'Orientasi Kertas Portrait vs Landscape (2 Kotak)',
        clue: 'Gambarlah 2 persegi panjang berdampingan: 1 persegi panjang berdiri tegak (Portrait) di sebelah kiri dan 1 persegi panjang rebah mendatar (Landscape) di sebelah kanan.',
        hints: ['Kotak tegak di kiri', 'Kotak mendatar di kanan'],
        difficulty: 'Mudah',
        keyElements: ['Kotak tegak', 'Kotak mendatar'],
        shapeGuideType: 'three-shapes',
        shapeSteps: ['Gambar persegi panjang berdiri di sisi kiri', 'Gambar persegi panjang melebar di sisi kanan']
      },
      {
        id: 'gdoc-10',
        topicTitle: 'Google Dokumen',
        title: 'Batas Halaman Baru / Page Break (2 Lembar & Garis Putus-Putus)',
        clue: 'Gambarlah 1 kotak halaman di atas dan 1 kotak halaman di bawah, dipisahkan oleh garis mendatar putus-putus di bagian tengahnya.',
        hints: ['Kotak atas', 'Garis putus-putus di tengah', 'Kotak bawah'],
        difficulty: 'Mudah',
        keyElements: ['2 Kotak lembar', 'Garis putus-putus'],
        shapeGuideType: 'folder-doc',
        shapeSteps: ['Gambar kotak persegi panjang di bagian atas', 'Buat garis putus-putus mendatar di tengah', 'Gambar kotak persegi panjang kedua di bawahnya']
      }
    ];
  }

  // =========================================================================
  // 5. KELAS 7: Aplikasi Presentasi – Google Slides (k7-gslide)
  // =========================================================================
  if (tid === 'k7-gslide' || title.includes('presentasi') || title.includes('slides')) {
    return [
      {
        id: 'gsl-1',
        topicTitle: 'Google Slides',
        title: 'Bingkai Slide Presentasi dengan Tombol Play (Slideshow)',
        clue: 'Gambarlah 1 persegi panjang lebar seperti layar presentasi, lalu gambar segitiga menghadap ke kanan (simbol Play ▶) tepat di tengah layar.',
        hints: ['Persegi panjang lebar', 'Segitiga menghadap ke kanan di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak slide', 'Segitiga Play'],
        shapeGuideType: 'monitor',
        shapeSteps: ['Gambar persegi panjang mendatar berukuran besar', 'Gambar segitiga menghadap ke kanan di tengahnya']
      },
      {
        id: 'gsl-2',
        topicTitle: 'Google Slides',
        title: 'Tata Letak Slide 2 Kolom (Gambar di Kiri & Teks di Kanan)',
        clue: 'Gambarlah 1 persegi panjang besar sebagai slide, di sisi dalamnya sebelah kiri gambar 1 kotak untuk tempat foto, dan di sebelah kanan tarik 3 garis mendatar untuk poin teks.',
        hints: ['Bingkai slide besar', 'Kotak gambar di kiri dalam', '3 garis teks di kanan dalam'],
        difficulty: 'Mudah',
        keyElements: ['Bingkai slide', 'Kotak visual kiri', 'Garis poin kanan'],
        shapeGuideType: 'terminal-box',
        shapeSteps: ['Gambar persegi panjang luar yang lebar', 'Gambar kotak kecil di paruh kiri dalam', 'Tarik 3 garis mendatar di paruh kanan dalam']
      },
      {
        id: 'gsl-3',
        topicTitle: 'Google Slides',
        title: 'Layar Proyektor Presentasi di Kelas',
        clue: 'Gambarlah kotak layar lebar dengan batang penggantung mendatar di atasnya dan tiang kaki penyangga segitiga di bagian bawahnya.',
        hints: ['Kotak layar lebar', 'Tiang kaki di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak layar proyektor', 'Tiang penyangga'],
        shapeGuideType: 'monitor',
        shapeSteps: ['Gambar persegi panjang lebar untuk layar', 'Tarik garis tiang ke bawah dari tengah layar', 'Tambahkan 2 kaki miring di ujung bawah tiang']
      },
      {
        id: 'gsl-4',
        topicTitle: 'Google Slides',
        title: 'Alur Transisi 3 Slide Berurutan',
        clue: 'Gambarlah 3 kotak persegi panjang kecil berjejer dari kiri ke kanan yang saling dihubungkan dengan 2 garis anak panah.',
        hints: ['3 kotak berjejer', 'Panah penghubung antar kotak'],
        difficulty: 'Mudah',
        keyElements: ['3 Kotak slide', '2 Panah transisi'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar kotak Slide 1 di kiri', 'Tarik panah ke kotak Slide 2 di tengah', 'Tarik panah ke kotak Slide 3 di kanan']
      },
      {
        id: 'gsl-5',
        topicTitle: 'Google Slides',
        title: 'Grafik Batang Visual pada Slide Presentasi',
        clue: 'Gambarlah garis siku berbentuk huruf L sebagai sumbu grafik, kemudian gambar 3 batang kotak berdiri dengan tinggi meningkat di dalamnya.',
        hints: ['Garis sumbu L', '3 batang vertikal'],
        difficulty: 'Mudah',
        keyElements: ['Sumbu L', '3 Batang grafik'],
        shapeGuideType: 'bar-3',
        shapeSteps: ['Gambar garis tegak dan mendatar membentuk huruf L', 'Gambar 3 kotak batang berdiri di atas garis mendatar']
      },
      {
        id: 'gsl-6',
        topicTitle: 'Google Slides',
        title: 'Diagram Lingkaran (Pie Chart) pada Slide',
        clue: 'Gambarlah 1 lingkaran besar di tengah kanvas, lalu tarik 3 garis lurus dari titik pusat menuju tepi lingkaran sehingga terbagi menjadi 3 bagian juring.',
        hints: ['Lingkaran besar', '3 garis jari-jari dari pusat'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', '3 Garis pembagi pusat'],
        shapeGuideType: 'pie-circle',
        shapeSteps: ['Gambar lingkaran bulat besar', 'Tarik 3 garis dari titik tengah ke pinggir lingkaran']
      },
      {
        id: 'gsl-7',
        topicTitle: 'Google Slides',
        title: 'Bagan Organisasi Slide (1 Judul & 3 Poin Cabang)',
        clue: 'Gambarlah 1 kotak topik di bagian atas, lalu tarik 3 garis cabang ke arah bawah menuju 3 kotak poin penjelasan.',
        hints: ['1 kotak atas', '3 garis cabang', '3 kotak bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak atas', 'Garis cabang', '3 Kotak bawah'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di atas', 'Tarik 3 garis ke bawah', 'Gambar 3 kotak berjejer di bawah']
      },
      {
        id: 'gsl-8',
        topicTitle: 'Google Slides',
        title: 'Elemen Bentuk Dasar Slide (Shapes: Segitiga, Kotak, Lingkaran)',
        clue: 'Gambarlah 3 ikon bentuk dasar yang sering disisipkan ke dalam slide presentasi secara berdampingan: 1 segitiga, 1 persegi, dan 1 lingkaran.',
        hints: ['Segitiga', 'Persegi', 'Lingkaran'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga', 'Persegi', 'Lingkaran'],
        shapeGuideType: 'three-shapes',
        shapeSteps: ['Gambar segitiga di kiri', 'Gambar persegi di tengah', 'Gambar lingkaran di kanan']
      },
      {
        id: 'gsl-9',
        topicTitle: 'Google Slides',
        title: 'Slide Judul Utama (Title Slide)',
        clue: 'Gambarlah persegi panjang besar sebagai bingkai slide, lalu di bagian tengahnya buat 1 kotak panjang untuk Judul Besar dan 1 garis pendek di bawahnya untuk Subjudul.',
        hints: ['Bingkai persegi panjang', 'Kotak judul di tengah', 'Garis subjudul di bawahnya'],
        difficulty: 'Mudah',
        keyElements: ['Bingkai slide', 'Kotak judul tengah'],
        shapeGuideType: 'terminal-box',
        shapeSteps: ['Gambar persegi panjang besar', 'Gambar persegi panjang lebih kecil tepat di tengahnya', 'Tarik 1 garis mendatar di bawah kotak tengah']
      },
      {
        id: 'gsl-10',
        topicTitle: 'Google Slides',
        title: 'Penyimpanan Presentasi di Cloud',
        clue: 'Gambarlah bentuk awan dengan garis alas mendatar, lalu tambahkan simbol centang (✓) atau panah ke atas di tengah awan tersebut.',
        hints: ['Bentuk awan', 'Panah/centang di dalam awan'],
        difficulty: 'Mudah',
        keyElements: ['Awan cloud', 'Panah di tengah'],
        shapeGuideType: 'cloud-arrow',
        shapeSteps: ['Gambar bentuk awan di tengah kanvas', 'Tambahkan panah mengarah ke atas di dalam awan']
      }
    ];
  }

  // =========================================================================
  // 6. KELAS 7: Sistem Komputer & Perangkat Keras (k7-komputer / k7-sk)
  // =========================================================================
  if (
    tid === 'k7-komputer' ||
    (tid.includes('komputer') && !tid.includes('jaringan')) ||
    title.includes('perangkat keras') ||
    title.includes('hardware') ||
    (title.includes('sistem komputer') && !tid.includes('jaringan'))
  ) {
    return [
      {
        id: 'sk-1',
        topicTitle: 'Sistem Komputer',
        title: 'Perangkat Output: Layar Monitor Komputer',
        clue: 'Gambarlah 1 kotak persegi panjang mendatar sebagai layar monitor, tambahkan garis leher penyangga pendek di bawah tengah, dan garis alas datar di paling bawah.',
        hints: ['Kotak persegi panjang layar', 'Tiang leher bawah', 'Alas kaki mendatar'],
        difficulty: 'Mudah',
        keyElements: ['Kotak layar', 'Tiang penyangga', 'Alas monitor'],
        shapeGuideType: 'monitor',
        shapeSteps: ['Gambar persegi panjang besar untuk layar', 'Buat tiang pendek di tengah bawah layar', 'Tarik garis mendatar untuk dudukan kaki']
      },
      {
        id: 'sk-2',
        topicTitle: 'Sistem Komputer',
        title: 'Perangkat Input: Mouse Komputer',
        clue: 'Gambarlah bangun lonjong (oval berdiri), beri 1 garis mendatar di sepertiga bagian atas, dan 1 garis tegak pendek di tengah atas untuk membagi tombol klik kiri dan kanan.',
        hints: ['Oval berdiri', 'Garis mendatar di atas', 'Garis pembagi tombol kiri-kanan'],
        difficulty: 'Mudah',
        keyElements: ['Badan oval mouse', 'Garis tombol klik'],
        shapeGuideType: 'mouse',
        shapeSteps: ['Gambar bentuk oval tegak di tengah', 'Tarik garis mendatar di sepertiga atas oval', 'Tarik garis tegak dari puncak oval ke garis mendatar tadi']
      },
      {
        id: 'sk-3',
        topicTitle: 'Sistem Komputer',
        title: 'Perangkat Pemroses: Chip Processor (CPU)',
        clue: 'Gambarlah 1 kotak persegi di tengah dengan 1 kotak kecil di dalamnya, lalu tambahkan garis-garis pendek berjejer di keempat sisi luarnya sebagai kaki pin prosesor.',
        hints: ['Kotak persegi tengah', 'Kotak kecil di dalam', 'Garis-garis kaki pin di 4 sisi'],
        difficulty: 'Mudah',
        keyElements: ['Kotak CPU', 'Pin di keempat sisi'],
        shapeGuideType: 'cpu-chip',
        shapeSteps: ['Gambar kotak persegi di tengah', 'Gambar kotak lebih kecil di dalamnya', 'Beri 3 garis pendek di sisi atas, bawah, kiri, dan kanan luar kotak']
      },
      {
        id: 'sk-4',
        topicTitle: 'Sistem Komputer',
        title: 'Perangkat Penyimpanan: Flashdisk USB',
        clue: 'Gambarlah 1 persegi panjang mendatar berukuran sedang untuk badan flashdisk, lalu tempelkan 1 kotak lebih kecil di ujung kanannya sebagai kepala konektor USB.',
        hints: ['Persegi panjang badan', 'Kotak kecil colokan USB di ujung'],
        difficulty: 'Mudah',
        keyElements: ['Badan flashdisk', 'Kepala konektor USB'],
        shapeGuideType: 'flashdisk',
        shapeSteps: ['Gambar persegi panjang untuk badan utama', 'Gambar kotak lebih kecil menempel di sisi kanannya']
      },
      {
        id: 'sk-5',
        topicTitle: 'Sistem Komputer',
        title: 'Perangkat Input: Papan Ketik Keyboard',
        clue: 'Gambarlah 1 persegi panjang lebar mendatar, isi bagian atas dalamnya dengan deretan garis/kotak tombol kecil, dan buat 1 garis panjang di bagian bawah tengah untuk tombol Spasi.',
        hints: ['Persegi panjang lebar', 'Deretan tombol kecil', 'Tombol spasi panjang di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Bingkai keyboard', 'Tombol kecil', 'Tombol spasi'],
        shapeGuideType: 'keyboard',
        shapeSteps: ['Gambar persegi panjang melebar', 'Buat barisan garis putus-putus di bagian atas dalam', 'Buat 1 garis panjang mendatar di bawah untuk Spasi']
      },
      {
        id: 'sk-6',
        topicTitle: 'Sistem Komputer',
        title: 'Siklus Kerja Komputer IPO (Input ➔ Proses ➔ Output)',
        clue: 'Gambarlah 3 bangun berurutan dari kiri ke kanan yang dihubungkan panah: kotak Input di kiri ➔ kotak Proses di tengah ➔ kotak Output di kanan.',
        hints: ['Kotak kiri', 'Panah ke kotak tengah', 'Panah ke kotak kanan'],
        difficulty: 'Mudah',
        keyElements: ['3 Kotak berurutan', '2 Panah penghubung'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar bentuk pertama di sisi kiri', 'Tarik panah ke kotak kedua di tengah', 'Tarik panah ke bentuk ketiga di sisi kanan']
      },
      {
        id: 'sk-7',
        topicTitle: 'Sistem Komputer',
        title: 'Perangkat Penyimpanan: Tabung Harddisk / Storage Data',
        clue: 'Gambarlah bangun tabung silinder tegak (bentuk oval mendatar di bagian atas, dua garis lurus tegak di sisi kiri-kanan, dan garis melengkung di alas bawah).',
        hints: ['Oval mendatar di atas', '2 garis tegak di samping', 'Alas melengkung di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Tabung silinder penyimpanan'],
        shapeGuideType: 'cylinder-db',
        shapeSteps: ['Gambar oval mendatar di bagian atas', 'Tarik 2 garis lurus ke bawah dari ujung kiri & kanan oval', 'Hubungkan ujung bawahnya dengan garis lengkung']
      },
      {
        id: 'sk-8',
        topicTitle: 'Sistem Komputer',
        title: 'Pembagian Sistem Komputer (Hardware, Software, Brainware)',
        clue: 'Gambarlah 1 kotak besar di bagian atas (Sistem Komputer), lalu tarik 3 garis cabang ke bawah menuju 3 kotak sejajar (Hardware, Software, dan Brainware).',
        hints: ['1 kotak induk di atas', '3 garis cabang', '3 kotak di bawah'],
        difficulty: 'Mudah',
        keyElements: ['1 Kotak atas', '3 Garis cabang', '3 Kotak bawah'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di bagian atas tengah', 'Tarik 3 garis cabang ke bawah', 'Gambar 3 kotak sejajar di bagian bawah']
      },
      {
        id: 'sk-9',
        topicTitle: 'Sistem Komputer',
        title: 'Tombol Daya / Power Komputer',
        clue: 'Gambarlah 1 lingkaran bulat yang sedikit terbuka di bagian puncaknya, lalu tarik 1 garis lurus tegak tepat di bagian tengah atas celah lingkaran tersebut.',
        hints: ['Lingkaran terbuka di atas', '1 garis tegak di tengah atas'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran simbol power', 'Garis tegak tengah'],
        shapeGuideType: 'loop-circle',
        shapeSteps: ['Gambar lingkaran besar dengan sedikit celah di atas', 'Tarik 1 garis lurus tegak di bagian tengah atas']
      },
      {
        id: 'sk-10',
        topicTitle: 'Sistem Komputer',
        title: 'Keping Memori RAM (Persegi Panjang dengan 4 Chip Kotak)',
        clue: 'Gambarlah 1 persegi panjang memanjang secara mendatar, lalu gambar 4 kotak kecil berjejer rapi di bagian dalamnya sebagai chip memori RAM.',
        hints: ['Persegi panjang memanjang', '4 kotak kecil berjejer di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Papan persegi panjang RAM', '4 Kotak chip'],
        shapeGuideType: 'keyboard',
        shapeSteps: ['Gambar persegi panjang memanjang mendatar', 'Gambar 4 kotak persegi kecil berjejer di dalamnya']
      }
    ];
  }

  // =========================================================================
  // 7. KELAS 7: Himpunan Data & Analisis Data Dasar (k7-hd / k7-ad)
  // =========================================================================
  if (tid === 'k7-hd' || tid.includes('hd') || title.includes('himpunan')) {
    return [
      {
        id: 'hd-1',
        topicTitle: 'Himpunan Data',
        title: 'Diagram Venn (2 Lingkaran Himpunan Saling Beririsan)',
        clue: 'Gambarlah 2 lingkaran besar di kiri dan kanan yang saling berpotongan (tumpang tindih) di bagian tengah kanvas.',
        hints: ['Lingkaran kiri', 'Lingkaran kanan memotong lingkaran kiri'],
        difficulty: 'Mudah',
        keyElements: ['2 Lingkaran berpotongan'],
        shapeGuideType: 'venn-2',
        shapeSteps: ['Gambar 1 lingkaran besar di sebelah kiri tengah', 'Gambar 1 lingkaran besar di sebelah kanan sehingga memotong lingkaran pertama']
      },
      {
        id: 'hd-2',
        topicTitle: 'Himpunan Data',
        title: 'Diagram Batang Statistik (3 Batang Vertikal)',
        clue: 'Gambarlah garis sumbu berbentuk huruf L (garis tegak di kiri dan mendatar di bawah), lalu dirikan 3 kotak batang vertikal dengan tinggi berbeda.',
        hints: ['Garis sumbu L', '3 kotak batang vertikal'],
        difficulty: 'Mudah',
        keyElements: ['Garis sumbu L', '3 Batang tegak'],
        shapeGuideType: 'bar-3',
        shapeSteps: ['Buat garis tegak dan mendatar membentuk siku huruf L', 'Gambar 3 kotak batang berdiri berjejer di atas garis mendatar']
      },
      {
        id: 'hd-3',
        topicTitle: 'Himpunan Data',
        title: 'Diagram Lingkaran / Pie Chart Proporsi Data',
        clue: 'Gambarlah 1 lingkaran bulat besar di tengah kanvas, kemudian bagi bagian dalamnya dengan 3 garis lurus yang ditarik dari titik pusat ke tepi lingkaran.',
        hints: ['Lingkaran bulat besar', '3 garis pembagi dari titik pusat'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran utuh', '3 Garis jari-jari'],
        shapeGuideType: 'pie-circle',
        shapeSteps: ['Gambar 1 lingkaran bulat besar', 'Tarik 3 garis lurus dari pusat lingkaran ke arah tepi luar']
      },
      {
        id: 'hd-4',
        topicTitle: 'Himpunan Data',
        title: 'Corong Penyaring Data (Data Filtering)',
        clue: 'Gambarlah bentuk corong segitiga terbalik di bagian atas yang menyambung dengan pipa sempit lurus di bagian bawahnya.',
        hints: ['Segitiga terbalik di atas', 'Pipa lurus kecil di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Corong segitiga terbalik', 'Saluran pipa bawah'],
        shapeGuideType: 'funnel',
        shapeSteps: ['Gambar bentuk V lebar (segitiga terbalik) di bagian atas', 'Tambahkan 2 garis tegak pendek sebagai pipa di ujung bawahnya']
      },
      {
        id: 'hd-5',
        topicTitle: 'Himpunan Data',
        title: 'Tabung Penyimpanan Basis Data (Database Cylinder)',
        clue: 'Gambarlah bentuk tabung silinder tegak: buat oval mendatar di atas, tarik 2 garis tegak di sisi kiri dan kanan ke bawah, lalu tutup alasnya dengan garis lengkung.',
        hints: ['Oval di atas', '2 garis tegak samping', 'Garis lengkung di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Oval atas', 'Garis dinding tabung', 'Lengkungan bawah'],
        shapeGuideType: 'cylinder-db',
        shapeSteps: ['Gambar oval mendatar di bagian atas', 'Tarik 2 garis lurus tegak ke bawah dari ujung kiri-kanan oval', 'Tutup bagian bawah dengan garis melengkung']
      },
      {
        id: 'hd-6',
        topicTitle: 'Himpunan Data',
        title: 'Tabel Matriks Data Baris dan Kolom (Grid 3x3)',
        clue: 'Gambarlah 1 kotak persegi besar, lalu tarik 2 garis mendatar dan 2 garis tegak di dalamnya sehingga terbagi menjadi 3 baris dan 3 kolom.',
        hints: ['Kotak persegi besar', '2 garis mendatar', '2 garis tegak'],
        difficulty: 'Mudah',
        keyElements: ['Kotak tabel', 'Garis baris & kolom'],
        shapeGuideType: 'grid-table',
        shapeSteps: ['Gambar kotak persegi besar', 'Buat 2 garis lurus mendatar di dalam kotak', 'Buat 2 garis lurus tegak memotong garis mendatar']
      },
      {
        id: 'hd-7',
        topicTitle: 'Himpunan Data',
        title: 'Pengelompokan 3 Jenis Objek Data (Segitiga, Kotak, Lingkaran)',
        clue: 'Gambarlah 3 bentuk berbeda secara berurutan dari kiri ke kanan untuk mewakili kategori data: 1 segitiga, 1 persegi, dan 1 lingkaran.',
        hints: ['Segitiga di kiri', 'Persegi di tengah', 'Lingkaran di kanan'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga', 'Persegi', 'Lingkaran'],
        shapeGuideType: 'three-shapes',
        shapeSteps: ['Gambar segitiga di sebelah kiri', 'Gambar kotak persegi di tengah', 'Gambar lingkaran di sebelah kanan']
      },
      {
        id: 'hd-8',
        topicTitle: 'Himpunan Data',
        title: 'Hierarki Kategori Data (1 Induk & 3 Sub-Data)',
        clue: 'Gambarlah 1 kotak induk data di bagian atas, lalu tarik 3 garis cabang ke bawah menuju 3 kotak kategori anak yang berjejer mendatar.',
        hints: ['1 kotak atas', '3 garis cabang', '3 kotak bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak induk', 'Garis cabang', '3 Kotak anak'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di bagian atas tengah', 'Tarik 3 garis menyebar ke bawah', 'Gambar 3 kotak di ujung bawah setiap garis']
      },
      {
        id: 'hd-9',
        topicTitle: 'Himpunan Data',
        title: 'Alur Pengolahan Data (Data Mentah ➔ Olah Data ➔ Informasi)',
        clue: 'Gambarlah bentuk oval di kiri, tarik panah ke kanan menuju kotak persegi panjang di tengah, lalu tarik panah lagi ke bentuk oval di sebelah kanan.',
        hints: ['Oval kiri', 'Panah ke kotak tengah', 'Panah ke oval kanan'],
        difficulty: 'Mudah',
        keyElements: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar oval di sisi kiri', 'Hubungkan garis panah ke kotak di tengah', 'Hubungkan garis panah ke oval di sisi kanan']
      },
      {
        id: 'hd-10',
        topicTitle: 'Himpunan Data',
        title: 'Siklus Pembaruan Data Berkala (Panah Melingkar)',
        clue: 'Gambarlah garis melingkar hampir satu putaran penuh dengan ujung kepala panah segitiga untuk menggambarkan siklus pembaruan data.',
        hints: ['Garis melingkar', 'Kepala panah di ujung'],
        difficulty: 'Mudah',
        keyElements: ['Garis melingkar', 'Kepala panah'],
        shapeGuideType: 'loop-circle',
        shapeSteps: ['Buat garis melengkung bundar', 'Tambahkan segitiga kepala panah di ujung garis']
      }
    ];
  }

  // =========================================================================
  // 8. KELAS 8: Jaringan Komputer & Internet (k8-jaringan / k8-jk / k8-koneksi)
  // =========================================================================
  if (
    tid === 'k8-jaringan' ||
    tid === 'k8-koneksi' ||
    tid.includes('jaringan') ||
    tid.includes('koneksi') ||
    title.includes('jaringan') ||
    title.includes('koneksi') ||
    title.includes('internet')
  ) {
    return [
      {
        id: 'jk-1',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Perangkat Router Wi-Fi Berantena Ganda',
        clue: 'Gambarlah 1 kotak persegi panjang mendatar di bagian bawah sebagai bodi router, tarik 2 garis antena miring ke atas, dan buat 2 garis lengkung gelombang sinyal di tengah atas.',
        hints: ['Kotak mendatar di bawah', '2 tiang antena ke atas', 'Lengkungan sinyal Wi-Fi'],
        difficulty: 'Mudah',
        keyElements: ['Kotak router', '2 Antena', 'Gelombang sinyal'],
        shapeGuideType: 'router-wifi',
        shapeSteps: ['Gambar persegi panjang mendatar di bawah', 'Tarik 2 garis antena ke atas dari sisi kiri dan kanan kotak', 'Buat 2 garis lengkung sinyal di antara kedua antena']
      },
      {
        id: 'jk-2',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Topologi Bintang / Star (1 Switch Pusat & 4 Node Komputer)',
        clue: 'Gambarlah 1 kotak kecil di pusat tengah sebagai Switch, lalu tarik 4 garis lurus menyebar ke 4 sudut menuju 4 lingkaran kecil sebagai komputer klien.',
        hints: ['1 kotak di tengah', '4 garis menyebar ke sudut', '4 lingkaran di ujung garis'],
        difficulty: 'Mudah',
        keyElements: ['Kotak Switch tengah', '4 Garis kabel', '4 Lingkaran komputer'],
        shapeGuideType: 'star-network',
        shapeSteps: ['Gambar 1 kotak persegi di pusat tengah', 'Tarik 4 garis lurus ke arah 4 pojok', 'Gambar 1 lingkaran bulat di setiap ujung garis tersebut']
      },
      {
        id: 'jk-3',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Komputasi Awan & Unggah Data (Cloud Upload)',
        clue: 'Gambarlah bentuk awan bergelombang dengan alas mendatar di tengah kanvas, lalu buat 1 garis anak panah lurus mengarah ke atas di bagian tengahnya.',
        hints: ['Lengkungan awan', 'Anak panah ke atas'],
        difficulty: 'Mudah',
        keyElements: ['Bentuk awan', 'Panah ke atas'],
        shapeGuideType: 'cloud-arrow',
        shapeSteps: ['Gambar garis lengkung awan yang lebar', 'Gambar garis tegak berujung panah ke atas di tengah awan']
      },
      {
        id: 'jk-4',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Gembok Enkripsi Keamanan Jaringan HTTPS',
        clue: 'Gambarlah 1 kotak persegi untuk badan gembok, tambahkan lengkungan huruf U terbalik di bagian atasnya, dan beri titik lubang kunci di tengah kotak.',
        hints: ['Kotak persegi bawah', 'Lengkungan U terbalik di atas', 'Titik lubang kunci'],
        difficulty: 'Mudah',
        keyElements: ['Kotak gembok', 'Lengkungan pengait', 'Lubang kunci'],
        shapeGuideType: 'padlock',
        shapeSteps: ['Gambar kotak persegi di tengah bawah', 'Tambahkan lengkungan U terbalik di sisi atasnya', 'Beri bulatan kecil di tengah kotak']
      },
      {
        id: 'jk-5',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Topologi Cincin / Ring (Jaringan Melingkar)',
        clue: 'Gambarlah 1 lingkaran besar sebagai jalur kabel cincin dengan ujung anak panah melingkar untuk menunjukkan aliran paket data satu arah.',
        hints: ['Lingkaran jalur kabel', 'Kepala panah melingkar'],
        difficulty: 'Mudah',
        keyElements: ['Jalur melingkar', 'Panah aliran data'],
        shapeGuideType: 'loop-circle',
        shapeSteps: ['Gambar garis melingkar besar di tengah kanvas', 'Tambahkan kepala panah segitiga mengikuti arah putaran lingkaran']
      },
      {
        id: 'jk-6',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Alur Transmisi Paket Data (Pengirim ➔ Router ➔ Penerima)',
        clue: 'Gambarlah lingkaran Pengirim di sebelah kiri, tarik garis panah ke kotak Router di tengah, lalu tarik garis panah lagi ke lingkaran Penerima di sebelah kanan.',
        hints: ['Lingkaran kiri', 'Kotak di tengah', 'Lingkaran kanan'],
        difficulty: 'Mudah',
        keyElements: ['Node kiri', 'Kotak tengah', 'Node kanan'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar bulatan di sebelah kiri', 'Tarik panah ke kotak persegi di tengah', 'Tarik panah ke bulatan di sebelah kanan']
      },
      {
        id: 'jk-7',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Indikator Kekuatan Sinyal Seluler (3 Bar Batang Bertingkat)',
        clue: 'Gambarlah garis alas mendatar di bawah, lalu buat 3 batang vertikal berjejer dari ukuran pendek di kiri, sedang di tengah, hingga tinggi penuh di kanan.',
        hints: ['Garis alas', 'Batang pendek, sedang, tinggi'],
        difficulty: 'Mudah',
        keyElements: ['3 Batang sinyal bertingkat'],
        shapeGuideType: 'bar-3',
        shapeSteps: ['Buat garis alas di bawah', 'Gambar batang pendek di kiri dan sedang di tengah', 'Gambar batang paling tinggi di sisi kanan']
      },
      {
        id: 'jk-8',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Hierarki Jaringan (1 Server Pusat Membagi ke 3 Komputer Klien)',
        clue: 'Gambarlah 1 kotak Server di bagian atas tengah, lalu tarik 3 garis kabel bercabang ke bawah menuju 3 kotak komputer klien yang berjejer.',
        hints: ['1 kotak server di atas', '3 garis kabel ke bawah', '3 kotak klien di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak Server atas', '3 Garis cabang', '3 Kotak Klien bawah'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di bagian atas', 'Tarik 3 garis cabang ke arah bawah', 'Gambar 3 kotak sejajar di ujung bawah garis']
      },
      {
        id: 'jk-9',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Perisai Firewall Pelindung Jaringan',
        clue: 'Gambarlah bentuk perisai tameng pelindung di tengah kanvas, lalu tambahkan simbol centang (✓) di bagian dalam perisai tersebut.',
        hints: ['Garis tepi perisai tameng', 'Simbol centang di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Perisai tameng', 'Tanda centang'],
        shapeGuideType: 'shield-check',
        shapeSteps: ['Gambar bentuk perisai yang meruncing di bagian bawah', 'Gambar tanda centang (✓) di tengah perisai']
      },
      {
        id: 'jk-10',
        topicTitle: 'Jaringan Komputer & Internet',
        title: 'Konektor Kabel LAN RJ-45 Sederhana',
        clue: 'Gambarlah 1 persegi panjang besar sebagai kepala konektor, lalu tempelkan 1 kotak lebih kecil di ujung kanannya sebagai pengunci pin tembaga.',
        hints: ['Persegi panjang badan konektor', 'Kotak ujung pin di samping'],
        difficulty: 'Mudah',
        keyElements: ['Badan konektor', 'Ujung pin kotak'],
        shapeGuideType: 'flashdisk',
        shapeSteps: ['Gambar persegi panjang mendatar di tengah', 'Tambahkan kotak lebih kecil yang menempel di sisi kanannya']
      }
    ];
  }

  // =========================================================================
  // 9. KELAS 8: Fakta vs Hoaks & Literasi Digital (k8-fakta-hoaks)
  // =========================================================================
  if (
    tid === 'k8-fakta-hoaks' ||
    tid.includes('fakta') ||
    tid.includes('hoaks') ||
    title.includes('hoaks') ||
    title.includes('literasi')
  ) {
    return [
      {
        id: 'fh-1',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Kaca Pembesar Investigasi Cek Fakta',
        clue: 'Gambarlah 1 lingkaran bulat besar sebagai lensa kaca pembesar, lalu tarik 1 garis lurus miring ke kanan bawah sebagai gagang pegangannya.',
        hints: ['Lingkaran lensa', 'Garis gagang miring'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran kaca', 'Gagang pegangan'],
        shapeGuideType: 'magnifier',
        shapeSteps: ['Gambar lingkaran bulat di tengah atas', 'Tarik garis lurus miring ke arah kanan bawah untuk gagang']
      },
      {
        id: 'fh-2',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Lencana Fakta Terverifikasi (Lingkaran & Tanda Centang)',
        clue: 'Gambarlah 1 lingkaran bulat besar di tengah kanvas, kemudian buat tanda centang (✓) yang tegas di bagian dalam lingkaran.',
        hints: ['Lingkaran luar', 'Tanda centang ✓ di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', 'Simbol centang'],
        shapeGuideType: 'check-badge',
        shapeSteps: ['Gambar lingkaran besar utuh', 'Buat tanda centang (✓) di tengah lingkaran']
      },
      {
        id: 'fh-3',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Rambu Segitiga Peringatan Bahaya Hoaks (!)',
        clue: 'Gambarlah bentuk segitiga sama sisi yang besar di tengah kanvas, lalu gambar tanda seru (!) berupa garis tegak dan titik bulat di bagian tengahnya.',
        hints: ['Segitiga besar', 'Tanda seru (!) di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga', 'Tanda seru !'],
        shapeGuideType: 'warning-triangle',
        shapeSteps: ['Gambar segitiga besar di tengah', 'Tarik garis lurus tegak di dalamnya dan beri titik di bawahnya']
      },
      {
        id: 'fh-4',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Perisai Tameng Anti-Disinformasi',
        clue: 'Gambarlah bentuk perisai tameng pelindung (atas mendatar lebar, bawah meruncing) dengan simbol centang (✓) tepat di tengahnya.',
        hints: ['Bentuk perisai tameng', 'Tanda centang di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Perisai tameng', 'Centang'],
        shapeGuideType: 'shield-check',
        shapeSteps: ['Gambar garis tepi perisai tameng', 'Tambahkan tanda centang (✓) di tengah perisai']
      },
      {
        id: 'fh-5',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Corong Penyaring "Saring Sebelum Sharing"',
        clue: 'Gambarlah bentuk corong penyaring (segitiga terbalik lebar di atas dengan saluran pipa kecil di bawah) untuk menyaring berita bohong.',
        hints: ['Segitiga terbalik di atas', 'Pipa kecil di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Corong filter berita'],
        shapeGuideType: 'funnel',
        shapeSteps: ['Gambar segitiga terbalik lebar di bagian atas', 'Sambungkan ujung bawahnya dengan saluran pipa lurus']
      },
      {
        id: 'fh-6',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Perbandingan Berita Silang (Cross-Check 2 Sumber)',
        clue: 'Gambarlah 2 lingkaran besar yang saling berpotongan di bagian tengah seperti Diagram Venn untuk mencari kesamaan fakta dari dua media berita.',
        hints: ['Lingkaran sumber A di kiri', 'Lingkaran sumber B memotong di kanan'],
        difficulty: 'Mudah',
        keyElements: ['2 Lingkaran beririsan'],
        shapeGuideType: 'venn-2',
        shapeSteps: ['Gambar lingkaran pertama di sisi kiri', 'Gambar lingkaran kedua di sisi kanan sehingga berpotongan di tengah']
      },
      {
        id: 'fh-7',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Alur Verifikasi Berita (Baca ➔ Cek Sumber ➔ Bagikan)',
        clue: 'Gambarlah 3 bangun berurutan dari kiri ke kanan yang dihubungkan panah: Oval di kiri ➔ Kotak di tengah ➔ Oval di kanan.',
        hints: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
        difficulty: 'Mudah',
        keyElements: ['Oval', 'Kotak', 'Garis panah'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar oval di sisi kiri', 'Tarik garis panah ke kotak di tengah', 'Tarik garis panah ke oval di sisi kanan']
      },
      {
        id: 'fh-8',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Dokumen Artikel Berita Resmi Beridentitas Penulis',
        clue: 'Gambarlah kotak persegi panjang seperti halaman berita, lalu buat 3 garis lurus mendatar di dalamnya untuk judul, nama penulis, dan isi berita.',
        hints: ['Kotak halaman berita', '3 garis mendatar di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Kotak dokumen', 'Garis teks berita'],
        shapeGuideType: 'folder-doc',
        shapeSteps: ['Gambar persegi panjang di tengah kanvas', 'Buat 3 garis lurus mendatar sejajar di bagian dalamnya']
      },
      {
        id: 'fh-9',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Gembok Keamanan Portal Resmi Pemerintah (.go.id)',
        clue: 'Gambarlah 1 kotak persegi untuk badan gembok dengan lengkungan huruf U terbalik di bagian atasnya.',
        hints: ['Kotak badan gembok', 'Lengkungan pengait di atas'],
        difficulty: 'Mudah',
        keyElements: ['Kotak gembok', 'Lengkungan atas'],
        shapeGuideType: 'padlock',
        shapeSteps: ['Gambar kotak persegi di bawah', 'Tambahkan lengkungan huruf U terbalik di atas kotak']
      },
      {
        id: 'fh-10',
        topicTitle: 'Fakta vs Hoaks',
        title: 'Percabangan Keputusan: Fakta (Bagikan) atau Hoaks (Hapus)',
        clue: 'Gambarlah 1 bangun belah ketupat di tengah kanvas dengan 2 garis anak panah yang keluar ke arah kiri dan kanan.',
        hints: ['Belah ketupat di tengah', 'Panah kiri dan panah kanan'],
        difficulty: 'Mudah',
        keyElements: ['Belah ketupat', '2 Panah cabang'],
        shapeGuideType: 'diamond-arrow',
        shapeSteps: ['Gambar belah ketupat di tengah', 'Tarik garis panah ke kiri dan garis panah ke kanan']
      }
    ];
  }

  // =========================================================================
  // 10. KELAS 8: Rekam Jejak Digital, Toleransi & Perundungan (k8-rekam-jejak-digital)
  // =========================================================================
  if (
    tid === 'k8-rekam-jejak-digital' ||
    tid.includes('jejak') ||
    title.includes('jejak digital') ||
    title.includes('perundungan') ||
    title.includes('toleransi')
  ) {
    return [
      {
        id: 'rjd-1',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Perisai Pelindung Anti-Cyberbullying',
        clue: 'Gambarlah bentuk perisai tameng pelindung yang lebar di atas dan lancip di bawah, lalu beri tanda centang (✓) di bagian tengahnya.',
        hints: ['Bentuk perisai tameng', 'Tanda centang di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Perisai tameng', 'Tanda centang'],
        shapeGuideType: 'shield-check',
        shapeSteps: ['Gambar garis tepi perisai tameng di tengah', 'Buat tanda centang (✓) di dalam perisai']
      },
      {
        id: 'rjd-2',
        topicTitle: 'Rekamacie Jejak Digital & Anti-Perundungan',
        title: 'Gembok Privasi Data Pribadi Akun Medsos',
        clue: 'Gambarlah 1 kotak persegi untuk badan gembok, lengkungan huruf U terbalik di atasnya, dan bulatan kecil lubang kunci di tengah kotak.',
        hints: ['Kotak persegi', 'Lengkungan U terbalik di atas', 'Lubang kunci'],
        difficulty: 'Mudah',
        keyElements: ['Kotak gembok', 'Lengkungan atas', 'Lubang kunci'],
        shapeGuideType: 'padlock',
        shapeSteps: ['Gambar kotak persegi di bawah', 'Tambahkan lengkungan U terbalik di atasnya', 'Gambar titik bulat di tengah kotak']
      },
      {
        id: 'rjd-3',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Rambu Peringatan Stop Komentar Jahat / Bullying (!)',
        clue: 'Gambarlah 1 segitiga besar di tengah kanvas, kemudian buat tanda seru (!) tegak tepat di dalam segitiga tersebut.',
        hints: ['Segitiga besar', 'Tanda seru (!) di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga peringatan', 'Tanda seru'],
        shapeGuideType: 'warning-triangle',
        shapeSteps: ['Gambar segitiga sama sisi yang besar', 'Gambar garis tegak dan titik bulat (!) di tengahnya']
      },
      {
        id: 'rjd-4',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Lencana Komentar Positif & Santun (Lingkaran Centang)',
        clue: 'Gambarlah 1 lingkaran bulat besar di tengah kanvas, lalu tambahkan tanda centang (✓) sebagai simbol komentar yang sopan dan berempati.',
        hints: ['Lingkaran besar', 'Tanda centang di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', 'Simbol centang'],
        shapeGuideType: 'check-badge',
        shapeSteps: ['Gambar lingkaran bulat besar', 'Gambar tanda centang (✓) di tengah lingkaran']
      },
      {
        id: 'rjd-5',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Saringan Etika T-H-I-N-K Sebelum Mengunggah Status',
        clue: 'Gambarlah bentuk corong penyaring (segitiga terbalik di atas dan pipa kecil di bawah) untuk menyaring perkataan sebelum diunggah ke internet.',
        hints: ['Segitiga terbalik di atas', 'Pipa lurus di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Corong filter etika'],
        shapeGuideType: 'funnel',
        shapeSteps: ['Gambar segitiga terbalik lebar di atas', 'Tambahkan pipa lurus pendek di ujung bawahnya']
      },
      {
        id: 'rjd-6',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Alur Penanganan Cyberbullying (Screenshot ➔ Blokir ➔ Lapor)',
        clue: 'Gambarlah 3 bentuk berurutan dari kiri ke kanan yang dihubungkan panah: Oval (Screenshot Bukti) ➔ Kotak (Blokir Pelaku) ➔ Oval (Lapor Guru/Ortu).',
        hints: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
        difficulty: 'Mudah',
        keyElements: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar oval di sebelah kiri', 'Tarik panah ke kotak di tengah', 'Tarik panah ke oval di sebelah kanan']
      },
      {
        id: 'rjd-7',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Jejak Digital Aktif vs Pasif (2 Cabang dari 1 Kotak)',
        clue: 'Gambarlah 1 kotak induk di bagian atas (Jejak Digital), lalu tarik garis cabang ke bawah menuju kotak-kotak bagian di bawahnya.',
        hints: ['Kotak atas', 'Garis cabang ke bawah', 'Kotak-kotak di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak atas', 'Garis cabang', 'Kotak bawah'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di bagian atas', 'Tarik garis cabang ke arah bawah', 'Gambar kotak-kotak di ujung garis bawah']
      },
      {
        id: 'rjd-8',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Irisan Toleransi & Empati Digital (Diagram 2 Lingkaran)',
        clue: 'Gambarlah 2 lingkaran besar yang saling berpotongan di tengah untuk melambangkan pertemuan sikap Toleransi dan Empati di dunia maya.',
        hints: ['Lingkaran kiri', 'Lingkaran kanan memotong lingkaran kiri'],
        difficulty: 'Mudah',
        keyElements: ['2 Lingkaran berpotongan'],
        shapeGuideType: 'venn-2',
        shapeSteps: ['Gambar 1 lingkaran di sisi kiri', 'Gambar 1 lingkaran lagi di sisi kanan sehingga beririsan di tengah']
      },
      {
        id: 'rjd-9',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Kaca Pembesar Pelacakan Rekam Jejak Digital',
        clue: 'Gambarlah 1 lingkaran bulat sebagai lensa kaca pembesar dengan 1 garis gagang miring ke arah kanan bawah.',
        hints: ['Lingkaran lensa', 'Garis gagang miring'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran kaca', 'Gagang miring'],
        shapeGuideType: 'magnifier',
        shapeSteps: ['Gambar lingkaran bulat di tengah atas', 'Tarik garis lurus miring ke kanan bawah']
      },
      {
        id: 'rjd-10',
        topicTitle: 'Rekam Jejak Digital & Anti-Perundungan',
        title: 'Layar Bukti Tangkapan Layar (Screenshot Chat)',
        clue: 'Gambarlah 1 persegi panjang besar seperti layar HP/monitor dengan 2 baris kotak pesan di bagian dalamnya sebagai bukti tangkapan layar.',
        hints: ['Persegi panjang layar', '2 garis/kotak pesan di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Bingkai layar', 'Garis pesan di dalam'],
        shapeGuideType: 'terminal-box',
        shapeSteps: ['Gambar persegi panjang besar di tengah', 'Buat 2 garis/kotak mendatar di bagian dalamnya']
      }
    ];
  }

  // =========================================================================
  // 11. KELAS 8: Lembar Kerja Pengolah Data – Microsoft Excel (k8-excel)
  // =========================================================================
  if (
    tid === 'k8-excel' ||
    tid.includes('excel') ||
    title.includes('excel') ||
    title.includes('lembar kerja') ||
    title.includes('spreadsheet')
  ) {
    return [
      {
        id: 'xl-1',
        topicTitle: 'Microsoft Excel',
        title: 'Tabel Lembar Kerja Sel Baris & Kolom (Grid 3x3)',
        clue: 'Gambarlah 1 kotak persegi besar di tengah kanvas, lalu tarik 2 garis mendatar (baris) dan 2 garis tegak (kolom) sehingga membentuk 9 sel tabel Excel.',
        hints: ['Kotak persegi besar', '2 garis mendatar', '2 garis tegak'],
        difficulty: 'Mudah',
        keyElements: ['Kotak tabel', 'Garis baris', 'Garis kolom'],
        shapeGuideType: 'grid-table',
        shapeSteps: ['Gambar kotak persegi besar', 'Tarik 2 garis mendatar di dalam kotak', 'Tarik 2 garis tegak memotong garis mendatar']
      },
      {
        id: 'xl-2',
        topicTitle: 'Microsoft Excel',
        title: 'Gembok Pengunci Sel Absolut ($A$1)',
        clue: 'Gambarlah 1 kotak persegi di bawah sebagai badan gembok dengan lengkungan huruf U terbalik di atasnya untuk melambangkan penguncian alamat sel absolut ($A$1).',
        hints: ['Kotak badan gembok', 'Lengkungan U terbalik di atas'],
        difficulty: 'Mudah',
        keyElements: ['Kotak gembok', 'Lengkungan atas'],
        shapeGuideType: 'padlock',
        shapeSteps: ['Gambar kotak persegi di tengah bawah', 'Tambahkan lengkungan huruf U terbalik di atas kotak']
      },
      {
        id: 'xl-3',
        topicTitle: 'Microsoft Excel',
        title: 'Grafik Batang Analisis Nilai Siswa (Column Chart)',
        clue: 'Gambarlah garis siku berbentuk huruf L sebagai sumbu X dan Y, lalu gambar 3 batang kotak vertikal dengan tinggi bertingkat dari kiri ke kanan.',
        hints: ['Garis sumbu L', '3 batang vertikal bertingkat'],
        difficulty: 'Mudah',
        keyElements: ['Garis sumbu L', '3 Batang grafik'],
        shapeGuideType: 'bar-3',
        shapeSteps: ['Buat garis tegak dan mendatar membentuk huruf L', 'Gambar 3 kotak batang berdiri di atas sumbu mendatar']
      },
      {
        id: 'xl-4',
        topicTitle: 'Microsoft Excel',
        title: 'Diagram Lingkaran Persentase Anggaran (Pie Chart)',
        clue: 'Gambarlah 1 lingkaran bulat besar, kemudian tarik 3 garis lurus dari titik pusat menuju tepi lingkaran untuk membagi persentase data.',
        hints: ['Lingkaran besar', '3 garis pembagi dari pusat'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', '3 Garis pusat'],
        shapeGuideType: 'pie-circle',
        shapeSteps: ['Gambar lingkaran bulat besar di tengah', 'Tarik 3 garis dari titik tengah ke tepi lingkaran']
      },
      {
        id: 'xl-5',
        topicTitle: 'Microsoft Excel',
        title: 'Ikon Fitur Sort & Filter Data (Corong Penyaring)',
        clue: 'Gambarlah bentuk corong segitiga terbalik yang lebar di atas dan menyempit menjadi pipa lurus di bagian bawahnya (ikon Filter pada tab Data Excel).',
        hints: ['Segitiga terbalik lebar di atas', 'Pipa lurus di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Bentuk corong filter'],
        shapeGuideType: 'funnel',
        shapeSteps: ['Gambar segitiga terbalik di bagian atas', 'Sambungkan dengan pipa lurus pendek di ujung bawah']
      },
      {
        id: 'xl-6',
        topicTitle: 'Microsoft Excel',
        title: 'Percabangan Logika Fungsi =IF(Tes_Logika; Benar; Salah)',
        clue: 'Gambarlah 1 bangun belah ketupat (diamond) di tengah kanvas dengan 2 garis anak panah keluar ke sisi kiri (Benar) dan sisi kanan (Salah).',
        hints: ['Belah ketupat di tengah', 'Panah kiri (Benar) & kanan (Salah)'],
        difficulty: 'Mudah',
        keyElements: ['Belah ketupat logika IF', '2 Panah cabang'],
        shapeGuideType: 'diamond-arrow',
        shapeSteps: ['Gambar belah ketupat di tengah kanvas', 'Tarik panah keluar ke kiri dan panah keluar ke kanan']
      },
      {
        id: 'xl-7',
        topicTitle: 'Microsoft Excel',
        title: 'Alur Fungsi =VLOOKUP (Kunci Cari ➔ Tabel Referensi ➔ Hasil)',
        clue: 'Gambarlah bentuk oval di kiri (Nilai Kunci), tarik garis panah ke kotak di tengah (Tabel Referensi), lalu tarik panah ke oval di kanan (Hasil Lookup).',
        hints: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
        difficulty: 'Mudah',
        keyElements: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar oval di sebelah kiri', 'Hubungkan panah ke kotak di tengah', 'Hubungkan panah ke oval di sebelah kanan']
      },
      {
        id: 'xl-8',
        topicTitle: 'Microsoft Excel',
        title: 'Bilah Rumus Excel (Formula Bar)',
        clue: 'Gambarlah 1 kotak persegi panjang lebar di tengah kanvas, lalu buat tanda panah siku (>) dan garis datar (_) di dalamnya seperti bilah input rumus.',
        hints: ['Persegi panjang lebar', 'Simbol > dan _ di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Kotak bilah rumus', 'Simbol input'],
        shapeGuideType: 'terminal-box',
        shapeSteps: ['Gambar persegi panjang besar mendatar', 'Buat tanda panah siku (>) dan garis datar (_) di dalamnya']
      },
      {
        id: 'xl-9',
        topicTitle: 'Microsoft Excel',
        title: 'Kaca Pembesar Pencarian Data (Find & Select)',
        clue: 'Gambarlah 1 lingkaran bulat sebagai kaca pembesar dengan 1 garis lurus miring ke kanan bawah sebagai gagang pegangannya.',
        hints: ['Lingkaran kaca', 'Gagang miring ke kanan bawah'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', 'Garis gagang'],
        shapeGuideType: 'magnifier',
        shapeSteps: ['Gambar 1 lingkaran bulat di tengah atas', 'Tarik garis lurus miring ke kanan bawah']
      },
      {
        id: 'xl-10',
        topicTitle: 'Microsoft Excel',
        title: 'Tabung Penyimpanan File Workbook (.xlsx)',
        clue: 'Gambarlah bentuk tabung silinder (oval mendatar di atas, 2 garis tegak di samping kiri-kanan, dan garis lengkung di bagian bawah).',
        hints: ['Oval atas', '2 garis samping tegak', 'Lengkungan bawah'],
        difficulty: 'Mudah',
        keyElements: ['Tabung silinder data'],
        shapeGuideType: 'cylinder-db',
        shapeSteps: ['Gambar oval mendatar di bagian atas', 'Tarik 2 garis lurus tegak ke bawah', 'Tutup bagian bawah dengan garis lengkung']
      }
    ];
  }

  // =========================================================================
  // 12. KELAS 9: Algoritma & Dasar Pemrograman (k9-pemrograman / k9-ap)
  // =========================================================================
  if (
    tid === 'k9-pemrograman' ||
    tid.includes('pemrograman') ||
    title.includes('pemrograman') ||
    title.includes('coding')
  ) {
    return [
      {
        id: 'ap-1',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Simbol Flowchart Keputusan / Decision (IF-ELSE)',
        clue: 'Gambarlah 1 bangun belah ketupat (diamond) di tengah kanvas, lalu tarik 2 garis anak panah keluar dari sudut kiri (Ya/True) dan sudut kanan (Tidak/False).',
        hints: ['Belah ketupat di tengah', 'Panah cabang kiri dan kanan'],
        difficulty: 'Mudah',
        keyElements: ['Belah ketupat', '2 Panah cabang'],
        shapeGuideType: 'diamond-arrow',
        shapeSteps: ['Gambar belah ketupat (diamond) di tengah', 'Tarik garis panah ke kiri dan garis panah ke kanan']
      },
      {
        id: 'ap-2',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Diagram Alir 3 Tahap (Mulai ➔ Proses ➔ Selesai)',
        clue: 'Gambarlah bentuk oval di kiri (Terminator Mulai), tarik panah ke kanan menuju kotak persegi panjang di tengah (Proses), lalu tarik panah ke oval di kanan (Selesai).',
        hints: ['Oval kiri', 'Kotak persegi panjang tengah', 'Oval kanan'],
        difficulty: 'Mudah',
        keyElements: ['Oval Mulai', 'Kotak Proses', 'Oval Selesai'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar oval di sebelah kiri', 'Hubungkan panah ke kotak di tengah', 'Hubungkan panah ke oval di sebelah kanan']
      },
      {
        id: 'ap-3',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Layar Terminal Eksekusi Kode Python (>_)',
        clue: 'Gambarlah 1 kotak persegi panjang besar menyerupai layar monitor koding, lalu gambar simbol kurung siku kanan (>) dan garis bawah (_) di dalamnya.',
        hints: ['Kotak persegi panjang besar', 'Simbol > dan _ di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Kotak layar terminal', 'Tanda >_'],
        shapeGuideType: 'terminal-box',
        shapeSteps: ['Gambar kotak persegi panjang besar', 'Buat tanda panah siku (>) di sisi kiri dalam', 'Buat garis datar (_) di sebelah kanannya']
      },
      {
        id: 'ap-4',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Balok Puzzle Pemrograman Visual (Blok Scratch / Blockly)',
        clue: 'Gambarlah 1 kotak persegi panjang mendatar dengan tonjolan sambungan puzzle kecil di sisi atas dan lekukan di sisi bawahnya.',
        hints: ['Persegi panjang mendatar', 'Tonjolan/lekukan puzzle di sisi atas & bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak balok koding', 'Tonjolan kait puzzle'],
        shapeGuideType: 'puzzle-block',
        shapeSteps: ['Gambar persegi panjang mendatar', 'Buat tonjolan kecil di tengah sisi atas dan lekukan di sisi bawah']
      },
      {
        id: 'ap-5',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Serangga Bug Program (proses Debugging)',
        clue: 'Gambarlah 1 bentuk oval tegak di tengah sebagai badan serangga bug, beri garis belahan di tengahnya, lalu tambahkan 3 garis kaki di sisi kiri dan 3 garis kaki di sisi kanan.',
        hints: ['Oval tegak di tengah', '3 kaki di kiri & 3 kaki di kanan'],
        difficulty: 'Mudah',
        keyElements: ['Badan oval', '6 Garis kaki'],
        shapeGuideType: 'bug-beetle',
        shapeSteps: ['Gambar bentuk oval tegak di tengah', 'Tarik garis lurus membelah tengah oval', 'Gambar 3 garis kaki di kiri dan 3 garis kaki di kanan']
      },
      {
        id: 'ap-6',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Siklus Perulangan Kode (FOR / WHILE Loop)',
        clue: 'Gambarlah 1 garis melingkar hampir penuh dengan ujung anak panah segitiga yang menunjuk kembali ke pangkalnya untuk melambangkan perulangan (Loop).',
        hints: ['Garis melingkar bulat', 'Kepala panah di ujungnya'],
        difficulty: 'Mudah',
        keyElements: ['Garis melingkar', 'Ujung panah'],
        shapeGuideType: 'loop-circle',
        shapeSteps: ['Buat garis melengkung hampir membentuk lingkaran penuh', 'Tambahkan segitiga kepala panah di ujung garis']
      },
      {
        id: 'ap-7',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Struktur Percabangan Pohon Keputusan (1 Induk ke 3 Cabang)',
        clue: 'Gambarlah 1 kotak fungsi utama di bagian atas, lalu tarik 3 garis cabang ke arah bawah menuju 3 kotak sub-program yang berjejer di bawahnya.',
        hints: ['1 kotak di atas', '3 garis cabang ke bawah', '3 kotak di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak induk atas', '3 Garis cabang', '3 Kotak bawah'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di bagian atas tengah', 'Tarik 3 garis cabang ke bawah', 'Gambar 3 kotak sejajar di ujung bawah']
      },
      {
        id: 'ap-8',
        topicTitle: 'Algoritma & Pemrograman',
        title: '3 Tipe Bentuk Objek Variabel (Segitiga, Kotak, Lingkaran)',
        clue: 'Gambarlah 3 bentuk bangun datar sederhana berjejer dari kiri ke kanan, yaitu 1 segitiga, 1 persegi, dan 1 lingkaran.',
        hints: ['Segitiga di kiri', 'Persegi di tengah', 'Lingkaran di kanan'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga', 'Persegi', 'Lingkaran'],
        shapeGuideType: 'three-shapes',
        shapeSteps: ['Gambar segitiga di sebelah kiri', 'Gambar persegi di tengah', 'Gambar lingkaran di sebelah kanan']
      },
      {
        id: 'ap-9',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Tabel Nilai Array / Matriks 2 Dimensi (Grid 3x3)',
        clue: 'Gambarlah 1 kotak persegi besar, lalu bagi bagian dalamnya dengan 2 garis mendatar dan 2 garis tegak sehingga membentuk 9 elemen kotak matriks.',
        hints: ['Kotak besar', '2 garis mendatar', '2 garis tegak'],
        difficulty: 'Mudah',
        keyElements: ['Kotak matriks', 'Garis pembagi 3x3'],
        shapeGuideType: 'grid-table',
        shapeSteps: ['Gambar kotak persegi besar di tengah', 'Buat 2 garis mendatar di dalamnya', 'Buat 2 garis tegak memotong garis mendatar']
      },
      {
        id: 'ap-10',
        topicTitle: 'Algoritma & Pemrograman',
        title: 'Lencana Program Berhasil Tanpa Error (Lingkaran Centang)',
        clue: 'Gambarlah 1 lingkaran bulat besar di tengah kanvas, lalu gambar tanda centang (✓) di dalamnya sebagai simbol kode berhasil dijalankan (Compile Success).',
        hints: ['Lingkaran besar', 'Tanda centang ✓ di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', 'Tanda centang'],
        shapeGuideType: 'check-badge',
        shapeSteps: ['Gambar 1 lingkaran bulat besar', 'Gambar tanda centang (✓) tegas di tengah lingkaran']
      }
    ];
  }

  // =========================================================================
  // 13. KELAS 9: Keamanan Digital & Siber (k9-keamanan-digital)
  // =========================================================================
  if (
    tid === 'k9-keamanan-digital' ||
    tid.includes('keamanan') ||
    title.includes('keamanan') ||
    title.includes('siber')
  ) {
    return [
      {
        id: 'kd-1',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Perisai Tameng Antivirus & Pertahanan Siber',
        clue: 'Gambarlah bentuk perisai tameng pelindung (bagian atas lebar mendatar dan bagian bawah meruncing), lalu gambar tanda centang (✓) di tengahnya.',
        hints: ['Garis tepi perisai tameng', 'Tanda centang ✓ di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Perisai tameng', 'Tanda centang'],
        shapeGuideType: 'shield-check',
        shapeSteps: ['Gambar bentuk perisai tameng di tengah kanvas', 'Gambar tanda centang (✓) di dalam perisai']
      },
      {
        id: 'kd-2',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Gembok Enkripsi Kata Sandi Kuat',
        clue: 'Gambarlah 1 kotak persegi untuk badan gembok, tambahkan lengkungan huruf U terbalik di atasnya, dan beri bulatan lubang kunci di tengah kotak.',
        hints: ['Kotak persegi', 'Lengkungan pengait di atas', 'Titik lubang kunci'],
        difficulty: 'Mudah',
        keyElements: ['Kotak gembok', 'Lengkungan atas', 'Lubang kunci'],
        shapeGuideType: 'padlock',
        shapeSteps: ['Gambar kotak persegi di bawah', 'Gambar lengkungan huruf U terbalik di atas kotak', 'Beri lingkaran kecil di tengah kotak']
      },
      {
        id: 'kd-3',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Rambu Peringatan Serangan Phishing / Malware (!)',
        clue: 'Gambarlah bentuk segitiga sama sisi berukuran besar di tengah kanvas, lalu tambahkan tanda seru (!) tegak di bagian tengahnya.',
        hints: ['Segitiga besar', 'Tanda seru (!) di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga', 'Tanda seru'],
        shapeGuideType: 'warning-triangle',
        shapeSteps: ['Gambar segitiga besar di tengah', 'Gambar garis tegak dan titik bulat (!) di dalamnya']
      },
      {
        id: 'kd-4',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Kaca Pembesar Audit Forensik Keamanan Digital',
        clue: 'Gambarlah 1 lingkaran bulat sebagai lensa kaca pembesar beserta 1 garis lurus miring ke kanan bawah sebagai gagang pegangannya.',
        hints: ['Lingkaran bulat', 'Garis gagang miring'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran kaca', 'Gagang pegangan'],
        shapeGuideType: 'magnifier',
        shapeSteps: ['Gambar lingkaran bulat di tengah atas', 'Tarik garis lurus miring dari tepi lingkaran ke kanan bawah']
      },
      {
        id: 'kd-5',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Dinding Bata Pelindung Firewall (Grid Kotak)',
        clue: 'Gambarlah 1 persegi besar seperti tembok pertahanan, lalu bagi bagian dalamnya dengan 2 garis mendatar dan 2 garis tegak menyerupai susunan bata Firewall.',
        hints: ['Kotak tembok besar', '2 garis mendatar', '2 garis tegak'],
        difficulty: 'Mudah',
        keyElements: ['Kotak dinding firewall', 'Garis petak bata'],
        shapeGuideType: 'grid-table',
        shapeSteps: ['Gambar kotak persegi besar', 'Tarik 2 garis mendatar di dalamnya', 'Tarik 2 garis tegak memotong garis mendatar']
      },
      {
        id: 'kd-6',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Cadangan Data Aman di Cloud (Cloud Backup)',
        clue: 'Gambarlah bentuk awan bergelombang dengan alas datar di tengah kanvas, lalu tambahkan anak panah lurus mengarah ke atas di bagian tengahnya.',
        hints: ['Lengkungan awan', 'Panah ke atas di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Bentuk awan', 'Panah backup'],
        shapeGuideType: 'cloud-arrow',
        shapeSteps: ['Gambar lengkungan awan di tengah', 'Gambar garis panah menunjuk ke atas di dalam awan']
      },
      {
        id: 'kd-7',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Serangga Malware / Bug Penyusup Sistem',
        clue: 'Gambarlah 1 oval tegak di tengah sebagai badan bug/malware, beri garis belahan tengah, serta 3 garis kaki di sisi kiri dan 3 garis kaki di sisi kanan.',
        hints: ['Oval badan di tengah', '3 kaki kiri & 3 kaki kanan'],
        difficulty: 'Mudah',
        keyElements: ['Badan oval', '6 Garis kaki'],
        shapeGuideType: 'bug-beetle',
        shapeSteps: ['Gambar bentuk oval tegak di tengah', 'Buat garis belahan tengah', 'Tambahkan 3 garis kaki di kiri dan 3 garis kaki di kanan']
      },
      {
        id: 'kd-8',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Alur Otentikasi Dua Faktor / 2FA (Login ➔ Kode OTP ➔ Masuk)',
        clue: 'Gambarlah bentuk oval di kiri (Login Sandi), tarik garis panah ke kotak di tengah (Kode OTP), lalu tarik panah ke oval di kanan (Akses Diterima).',
        hints: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
        difficulty: 'Mudah',
        keyElements: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
        shapeGuideType: 'flowchart-3',
        shapeSteps: ['Gambar oval di sebelah kiri', 'Hubungkan panah ke kotak di tengah', 'Hubungkan panah ke oval di sebelah kanan']
      },
      {
        id: 'kd-9',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Corong Penyaring Email Spam (Spam Filter)',
        clue: 'Gambarlah bentuk corong segitiga terbalik yang lebar di atas dan menyempit menjadi pipa lurus di bawah untuk menyaring email berbahaya.',
        hints: ['Segitiga terbalik lebar di atas', 'Pipa kecil di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Corong filter spam'],
        shapeGuideType: 'funnel',
        shapeSteps: ['Gambar segitiga terbalik di atas', 'Tambahkan saluran pipa lurus di ujung bawahnya']
      },
      {
        id: 'kd-10',
        topicTitle: 'Keamanan Digital & Siber',
        title: 'Lencana Verifikasi Keamanan Akun (Lingkaran Centang)',
        clue: 'Gambarlah 1 lingkaran bulat besar di tengah kanvas, kemudian buat simbol centang (✓) yang jelas tepat di tengah lingkaran tersebut.',
        hints: ['Lingkaran besar', 'Tanda centang ✓ di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', 'Simbol centang'],
        shapeGuideType: 'check-badge',
        shapeSteps: ['Gambar lingkaran bulat besar', 'Buat tanda centang (✓) tegas di tengah lingkaran']
      }
    ];
  }

  // =========================================================================
  // 14. KELAS 9: Ruang Publik Virtual (k9-ruang-publik-virtual)
  // =========================================================================
  if (
    tid === 'k9-ruang-publik-virtual' ||
    tid.includes('ruang-publik') ||
    title.includes('ruang publik') ||
    title.includes('virtual')
  ) {
    return [
      {
        id: 'rpv-1',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Jejaring Ruang Diskusi Virtual (1 Ruang Pusat & 4 Peserta)',
        clue: 'Gambarlah 1 kotak ruang diskusi di pusat tengah kanvas, lalu tarik 4 garis lurus ke arah 4 sudut menuju 4 lingkaran kecil sebagai peserta daring.',
        hints: ['1 kotak di tengah', '4 garis cabang', '4 lingkaran di sudut'],
        difficulty: 'Mudah',
        keyElements: ['Kotak pusat', '4 Garis hubung', '4 Lingkaran peserta'],
        shapeGuideType: 'star-network',
        shapeSteps: ['Gambar 1 kotak persegi di tengah', 'Tarik 4 garis lurus menyebar ke 4 sudut', 'Gambar lingkaran kecil di setiap ujung garis']
      },
      {
        id: 'rpv-2',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Layar Konferensi Video Daring (Grid Kamera Peserta)',
        clue: 'Gambarlah 1 kotak persegi besar sebagai layar rapat virtual, lalu bagi bagian dalamnya dengan garis mendatar dan garis tegak sehingga membentuk petak-petak peserta.',
        hints: ['Kotak layar besar', 'Garis pembagi mendatar & tegak'],
        difficulty: 'Mudah',
        keyElements: ['Kotak layar', 'Garis petak peserta'],
        shapeGuideType: 'grid-table',
        shapeSteps: ['Gambar persegi besar di tengah kanvas', 'Buat garis mendatar dan garis tegak yang membagi bagian dalamnya']
      },
      {
        id: 'rpv-3',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Awan Kolaborasi Ruang Kerja Bersama (Cloud Workspace)',
        clue: 'Gambarlah bentuk awan besar dengan alas mendatar, lalu gambar anak panah menghadap ke atas di tengahnya sebagai simbol berbagi karya di ruang virtual.',
        hints: ['Lengkungan awan', 'Panah ke atas di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Bentuk awan', 'Panah ke atas'],
        shapeGuideType: 'cloud-arrow',
        shapeSteps: ['Gambar lengkungan awan di tengah kanvas', 'Gambar garis panah menunjuk ke atas di dalamnya']
      },
      {
        id: 'rpv-4',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Perisai Etika & Mindfulness di Ruang Publik Virtual',
        clue: 'Gambarlah bentuk perisai tameng yang lebar di atas dan meruncing di bawah, lalu tambahkan tanda centang (✓) di bagian tengahnya.',
        hints: ['Bentuk perisai tameng', 'Tanda centang di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Perisai etika', 'Tanda centang'],
        shapeGuideType: 'shield-check',
        shapeSteps: ['Gambar garis tepi perisai tameng', 'Buat tanda centang (✓) di tengah perisai']
      },
      {
        id: 'rpv-5',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Pertemuan Dua Komunitas Daring (Diagram 2 Lingkaran Beririsan)',
        clue: 'Gambarlah 2 lingkaran besar di kiri dan kanan yang saling berpotongan di tengah kanvas untuk menggambarkan interaksi lintas komunitas di ruang virtual.',
        hints: ['Lingkaran kiri', 'Lingkaran kanan memotong di tengah'],
        difficulty: 'Mudah',
        keyElements: ['2 Lingkaran beririsan'],
        shapeGuideType: 'venn-2',
        shapeSteps: ['Gambar 1 lingkaran di kiri', 'Gambar 1 lingkaran di kanan sehingga saling memotong di tengah']
      },
      {
        id: 'rpv-6',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Monitor Komputer Akses Dunia Maya',
        clue: 'Gambarlah 1 persegi panjang mendatar sebagai layar monitor, lengkap dengan tiang penyangga pendek dan garis alas datar di bawahnya.',
        hints: ['Persegi panjang layar', 'Tiang leher bawah', 'Garis alas datar'],
        difficulty: 'Mudah',
        keyElements: ['Kotak layar', 'Tiang kaki penyangga'],
        shapeGuideType: 'monitor',
        shapeSteps: ['Gambar persegi panjang untuk layar', 'Tambahkan garis tiang pendek dan garis alas di bawah tengah layar']
      },
      {
        id: 'rpv-7',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Gembok Keamanan Akun Ruang Virtual',
        clue: 'Gambarlah 1 kotak persegi untuk badan gembok dan 1 lengkungan huruf U terbalik di bagian atasnya.',
        hints: ['Kotak badan gembok', 'Lengkungan pengait di atas'],
        difficulty: 'Mudah',
        keyElements: ['Kotak gembok', 'Lengkungan atas'],
        shapeGuideType: 'padlock',
        shapeSteps: ['Gambar kotak persegi di bawah', 'Tambahkan lengkungan huruf U terbalik di sisi atasnya']
      },
      {
        id: 'rpv-8',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Pembagian Tim Kolaborasi Online (1 Ketua & 3 Divisi)',
        clue: 'Gambarlah 1 kotak koordinator di bagian atas, lalu tarik 3 garis cabang ke bawah menuju 3 kotak anggota tim yang berjejer mendatar.',
        hints: ['1 kotak di atas', '3 garis cabang', '3 kotak di bawah'],
        difficulty: 'Mudah',
        keyElements: ['Kotak atas', '3 Garis cabang', '3 Kotak bawah'],
        shapeGuideType: 'tree-boxes',
        shapeSteps: ['Gambar 1 kotak di bagian atas', 'Tarik 3 garis cabang ke bawah', 'Gambar 3 kotak di ujung bawah setiap garis']
      },
      {
        id: 'rpv-9',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Rambu Peringatan Bahaya Hoaks & Konflik di Ruang Publik (!)',
        clue: 'Gambarlah bentuk segitiga besar di tengah kanvas, kemudian beri tanda seru (!) tegak tepat di bagian tengahnya.',
        hints: ['Segitiga besar', 'Tanda seru (!) di tengah'],
        difficulty: 'Mudah',
        keyElements: ['Segitiga peringatan', 'Tanda seru'],
        shapeGuideType: 'warning-triangle',
        shapeSteps: ['Gambar segitiga besar di tengah', 'Gambar garis tegak dan titik bulat (!) di dalamnya']
      },
      {
        id: 'rpv-10',
        topicTitle: 'Ruang Publik Virtual',
        title: 'Lencana Warga Digital Beretika Baik (Lingkaran Centang)',
        clue: 'Gambarlah 1 lingkaran bulat besar di tengah kanvas dengan tanda centang (✓) tegas di bagian dalamnya.',
        hints: ['Lingkaran besar', 'Tanda centang ✓ di dalam'],
        difficulty: 'Mudah',
        keyElements: ['Lingkaran', 'Simbol centang'],
        shapeGuideType: 'check-badge',
        shapeSteps: ['Gambar lingkaran bulat besar', 'Buat tanda centang (✓) di tengah lingkaran']
      }
    ];
  }

  // =========================================================================
  // 15. DEFAULT / TOPIK KUSTOM GURU: 10 Soal Kontekstual Sesuai Judul Materi
  // =========================================================================
  return [
    {
      id: 'gen-1',
      topicTitle: topic.title,
      title: `Bagan Konsep Utama Materi ${topic.title}`,
      clue: 'Gambarlah 1 kotak utama di bagian atas, lalu tarik 3 garis cabang ke arah bawah menuju 3 kotak kecil yang berjejer di bawahnya.',
      hints: ['1 kotak di atas', '3 garis cabang', '3 kotak di bawah'],
      difficulty: 'Mudah',
      keyElements: ['Kotak atas', '3 Garis cabang', '3 Kotak bawah'],
      shapeGuideType: 'tree-boxes',
      shapeSteps: ['Gambar 1 kotak di atas tengah', 'Tarik 3 garis cabang ke bawah', 'Gambar 3 kotak sejajar di bawah']
    },
    {
      id: 'gen-2',
      topicTitle: topic.title,
      title: `Alur Kerja 3 Tahap pada ${topic.title}`,
      clue: 'Gambarlah bentuk oval di sebelah kiri, tarik garis panah ke kotak persegi panjang di tengah, lalu tarik panah lagi ke bentuk oval di sebelah kanan.',
      hints: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
      difficulty: 'Mudah',
      keyElements: ['Oval kiri', 'Kotak tengah', 'Oval kanan'],
      shapeGuideType: 'flowchart-3',
      shapeSteps: ['Gambar oval di kiri', 'Tarik panah ke kotak di tengah', 'Tarik panah ke oval di kanan']
    },
    {
      id: 'gen-3',
      topicTitle: topic.title,
      title: `Layar Monitor Pembelajaran ${topic.title}`,
      clue: 'Gambarlah kotak persegi panjang untuk layar monitor komputer, dilengkapi tiang penyangga pendek dan garis alas datar di bawahnya.',
      hints: ['Kotak persegi panjang', 'Tiang kaki penyangga'],
      difficulty: 'Mudah',
      keyElements: ['Kotak layar', 'Tiang penyangga'],
      shapeGuideType: 'monitor',
      shapeSteps: ['Gambar kotak persegi panjang', 'Tambahkan garis tiang dan alas di bawahnya']
    },
    {
      id: 'gen-4',
      topicTitle: topic.title,
      title: `Penyimpanan Cloud Materi ${topic.title}`,
      clue: 'Gambarlah bentuk awan sederhana dengan alas datar, lalu buat 1 garis anak panah mengarah ke atas di bagian tengahnya.',
      hints: ['Lengkungan awan', 'Panah ke atas'],
      difficulty: 'Mudah',
      keyElements: ['Bentuk awan', 'Panah ke atas'],
      shapeGuideType: 'cloud-arrow',
      shapeSteps: ['Gambar lengkungan awan', 'Gambar panah mengarah ke atas di tengahnya']
    },
    {
      id: 'gen-5',
      topicTitle: topic.title,
      title: `Map Folder Dokumentasi ${topic.title}`,
      clue: 'Gambarlah kotak persegi panjang seperti map folder dengan tonjolan tab kecil di kiri atas dan 2 garis mendatar di bagian dalamnya.',
      hints: ['Kotak map folder', '2 garis isi berkas'],
      difficulty: 'Mudah',
      keyElements: ['Kotak folder', 'Garis dokumen'],
      shapeGuideType: 'folder-doc',
      shapeSteps: ['Gambar persegi panjang dengan tab di kiri atas', 'Beri 2 garis mendatar di tengahnya']
    },
    {
      id: 'gen-6',
      topicTitle: topic.title,
      title: `Perisai Keamanan & Etika ${topic.title}`,
      clue: 'Gambarlah bentuk perisai tameng yang lebar di atas dan lancip di bawah, lalu buat tanda centang (✓) di tengahnya.',
      hints: ['Bentuk perisai', 'Tanda centang di tengah'],
      difficulty: 'Mudah',
      keyElements: ['Perisai tameng', 'Tanda centang'],
      shapeGuideType: 'shield-check',
      shapeSteps: ['Gambar garis luar perisai tameng', 'Buat tanda centang (✓) di tengahnya']
    },
    {
      id: 'gen-7',
      topicTitle: topic.title,
      title: `Kaca Pembesar Analisis ${topic.title}`,
      clue: 'Gambarlah 1 lingkaran bulat sebagai lensa kaca pembesar dengan 1 garis lurus miring ke kanan bawah sebagai gagangnya.',
      hints: ['Lingkaran kaca', 'Gagang miring'],
      difficulty: 'Mudah',
      keyElements: ['Lingkaran', 'Garis gagang'],
      shapeGuideType: 'magnifier',
      shapeSteps: ['Gambar lingkaran bulat', 'Tarik garis miring ke kanan bawah']
    },
    {
      id: 'gen-8',
      topicTitle: topic.title,
      title: `Grafik Batang Data ${topic.title}`,
      clue: 'Gambarlah garis siku berbentuk huruf L, lalu dirikan 3 batang kotak vertikal dari pendek, sedang, hingga tinggi.',
      hints: ['Garis sumbu L', '3 batang vertikal'],
      difficulty: 'Mudah',
      keyElements: ['Garis sumbu L', '3 Batang tegak'],
      shapeGuideType: 'bar-3',
      shapeSteps: ['Gambar garis siku L', 'Gambar 3 kotak batang berdiri di atasnya']
    },
    {
      id: 'gen-9',
      topicTitle: topic.title,
      title: `Tabel Matriks Evaluasi ${topic.title}`,
      clue: 'Gambarlah 1 kotak persegi besar, lalu bagi bagian dalamnya menggunakan 2 garis mendatar dan 2 garis tegak.',
      hints: ['Kotak persegi besar', '2 garis mendatar & 2 garis tegak'],
      difficulty: 'Mudah',
      keyElements: ['Kotak tabel', 'Garis baris & kolom'],
      shapeGuideType: 'grid-table',
      shapeSteps: ['Gambar kotak persegi besar', 'Tarik 2 garis mendatar dan 2 garis tegak di dalamnya']
    },
    {
      id: 'gen-10',
      topicTitle: topic.title,
      title: `Lencana Ketuntasan Belajar ${topic.title}`,
      clue: 'Gambarlah 1 lingkaran bulat besar di tengah kanvas dengan tanda centang (✓) tegas di bagian dalamnya.',
      hints: ['Lingkaran besar', 'Tanda centang ✓'],
      difficulty: 'Mudah',
      keyElements: ['Lingkaran', 'Simbol centang'],
      shapeGuideType: 'check-badge',
      shapeSteps: ['Gambar lingkaran bulat besar', 'Buat tanda centang (✓) di tengah lingkaran']
    }
  ];
};

const COLOR_PALETTE = [
  { label: 'Hitam', value: '#0f172a' },
  { label: 'Biru', value: '#2563eb' },
  { label: 'Merah', value: '#dc2626' },
  { label: 'Hijau', value: '#16a34a' },
  { label: 'Kuning', value: '#eab308' },
  { label: 'Oranye', value: '#ea580c' },
  { label: 'Ungu', value: '#9333ea' }
];

const BRUSH_SIZES = [
  { label: 'Halus', value: 3 },
  { label: 'Sedang', value: 7 },
  { label: 'Tebal', value: 14 }
];

interface DrawingPadProps {
  canvasId: string;
  title: string;
  teamColor: 'blue' | 'red' | 'purple';
  isLocked: boolean;
  hasStartedRound: boolean;
  onStartRoundTimer: () => void;
  roundIndex: number;
  currentRoundNumber: number;
  totalRoundsNumber: number;
  promptChallenge: DrawingChallenge;
  showPromptInPad?: boolean;
  onFinishFast?: () => void;
  fastBonusPoints?: number;
  onStrokeCountChange: (count: number) => void;
  onCanvasRefReady: (canvas: HTMLCanvasElement | null) => void;
  onNextRound?: () => void;
  isMatchOver?: boolean;
}

const DrawingPad: React.FC<DrawingPadProps> = ({
  canvasId,
  title,
  teamColor,
  isLocked,
  hasStartedRound,
  onStartRoundTimer,
  roundIndex,
  currentRoundNumber,
  totalRoundsNumber,
  promptChallenge,
  showPromptInPad = false,
  onFinishFast,
  fastBonusPoints,
  onStrokeCountChange,
  onCanvasRefReady,
  onNextRound,
  isMatchOver
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedColor, setSelectedColor] = useState<string>(
    teamColor === 'blue' ? '#2563eb' : teamColor === 'red' ? '#dc2626' : '#0f172a'
  );
  const [brushSize, setBrushSize] = useState<number>(7);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const [userStrokesCount, setUserStrokesCount] = useState<number>(0);
  const isDrawingRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Sync canvas resolution 1:1 with container to guarantee ZERO drift
  const syncCanvasResolution = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width === targetW && canvas.height === targetH) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    let hasContent = false;
    if (tempCtx && canvas.width > 0 && canvas.height > 0) {
      tempCtx.drawImage(canvas, 0, 0);
      hasContent = true;
    }

    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);

    if (hasContent && tempCanvas.width > 0 && tempCanvas.height > 0) {
      ctx.drawImage(tempCanvas, 0, 0, targetW, targetH);
    }

    const snapshot = ctx.getImageData(0, 0, targetW, targetH);
    setStrokeHistory([snapshot]);
  }, []);

  useEffect(() => {
    syncCanvasResolution();
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      syncCanvasResolution();
    });
    ro.observe(container);

    if (canvasRef.current) {
      onCanvasRefReady(canvasRef.current);
    }

    return () => ro.disconnect();
  }, [syncCanvasResolution, onCanvasRefReady]);

  // Otomatis bersihkan kanvas & reset riwayat saat ronde baru dimulai
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const blankSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory([blankSnapshot]);
    setUserStrokesCount(0);
    onStrokeCountChange(0);

    setIsEraser(false);
    setSelectedColor(
      teamColor === 'blue' ? '#2563eb' : teamColor === 'red' ? '#dc2626' : '#0f172a'
    );
  }, [roundIndex, teamColor, onStrokeCountChange]);

  const saveStateToHistory = (nextStrokeCount: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory((prev) => [...prev.slice(-20), snapshot]);
    setUserStrokesCount(nextStrokeCount);
    onStrokeCountChange(nextStrokeCount);
  };

  const handleUndo = () => {
    if (isLocked || !hasStartedRound) return;
    const canvas = canvasRef.current;
    if (!canvas || strokeHistory.length <= 1) return;
    soundManager.playClick();

    const newHistory = [...strokeHistory];
    newHistory.pop();
    const previousSnapshot = newHistory[newHistory.length - 1];

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx || !previousSnapshot) return;

    ctx.putImageData(previousSnapshot, 0, 0);
    setStrokeHistory(newHistory);
    const nextCount = Math.max(0, newHistory.length - 1);
    setUserStrokesCount(nextCount);
    onStrokeCountChange(nextCount);
  };

  const handleClear = () => {
    if (isLocked || !hasStartedRound) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    soundManager.playClick();

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const blankSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory([blankSnapshot]);
    setUserStrokesCount(0);
    onStrokeCountChange(0);
  };

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    return {
      x: (e.clientX - rect.left) * dpr,
      y: (e.clientY - rect.top) * dpr
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isLocked || !hasStartedRound) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}

    isDrawingRef.current = true;
    const coords = getCanvasCoords(e);
    lastPointRef.current = coords;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const effectiveWidth = (isEraser ? brushSize * 2.5 : brushSize) * dpr;

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, effectiveWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? '#ffffff' : selectedColor;
    ctx.fill();
  };

  const drawMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isLocked || !hasStartedRound || !lastPointRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const currentCoords = getCanvasCoords(e);
    const dpr = window.devicePixelRatio || 1;
    const effectiveWidth = (isEraser ? brushSize * 2.5 : brushSize) * dpr;

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(currentCoords.x, currentCoords.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = effectiveWidth;
    ctx.strokeStyle = isEraser ? '#ffffff' : selectedColor;
    ctx.stroke();

    lastPointRef.current = currentCoords;
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;

    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    }

    const nextCount = isEraser ? userStrokesCount : userStrokesCount + 1;
    saveStateToHistory(nextCount);
  };

  const borderColor =
    teamColor === 'blue'
      ? 'border-sky-500/80 shadow-sky-500/10'
      : teamColor === 'red'
      ? 'border-rose-500/80 shadow-rose-500/10'
      : 'border-purple-500/80 shadow-purple-500/10';

  const badgeBg =
    teamColor === 'blue'
      ? 'bg-sky-600 text-white'
      : teamColor === 'red'
      ? 'bg-rose-600 text-white'
      : 'bg-purple-600 text-white';

  return (
    <div
      className={`flex flex-col justify-between p-2 sm:p-3 rounded-2xl bg-slate-900 border-2 ${borderColor} shadow-xl select-none h-full min-h-0 w-full`}
    >
      {/* Header Pad: Title & Undo/Clear Actions */}
      <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider truncate ${badgeBg}`}>
            {title}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
              userStrokesCount > 0
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {userStrokesCount > 0 ? `✏️ ${userStrokesCount} Goresan` : 'Kanvas Kosong (Skor 0)'}
          </span>
          {fastBonusPoints !== undefined && fastBonusPoints > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-black">
              ⚡ +{fastBonusPoints} Bonus Cepat!
            </span>
          )}
          {isLocked && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
              🔒 Selesai
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {onFinishFast && !isLocked && hasStartedRound && userStrokesCount > 0 && (
            <button
              type="button"
              onClick={onFinishFast}
              className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
              title="Kunci gambar lebih cepat untuk mendapat Bonus Kecepatan Poin!"
            >
              <Zap className="w-3 h-3" />
              <span>Selesai Cepat!</span>
            </button>
          )}
          <button
            type="button"
            disabled={isLocked || !hasStartedRound || strokeHistory.length <= 1}
            onClick={handleUndo}
            className="p-1 sm:px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] font-bold flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-all"
            title="Batalkan goresan terakhir (Undo)"
          >
            <Undo2 className="w-3 h-3" />
            <span className="hidden sm:inline">Undo</span>
          </button>
          <button
            type="button"
            disabled={isLocked || !hasStartedRound}
            onClick={handleClear}
            className="p-1 sm:px-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-500/40 text-[10px] font-bold flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-all"
            title="Bersihkan kanvas seluruhnya"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Hapus</span>
          </button>
        </div>
      </div>

      {/* Soal Sketsa & Kalimat Petunjuk di Bawah Soal (Tanpa Bocoran Gambar) */}
      {showPromptInPad && (
        <div
          className={`mt-1.5 p-2.5 rounded-xl border text-left shrink-0 space-y-1 ${
            teamColor === 'blue'
              ? 'bg-sky-950/60 border-sky-500/40 text-sky-100'
              : 'bg-rose-950/60 border-rose-500/40 text-rose-100'
          }`}
        >
          <div className="flex items-center justify-between gap-1 text-[10px] font-black uppercase tracking-wider">
            <span className={teamColor === 'blue' ? 'text-sky-300' : 'text-rose-300'}>
              🎯 SOAL RONDE {currentRoundNumber}/{totalRoundsNumber} ({title}):
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-black text-white leading-snug">
            "{promptChallenge.title}"
          </h4>
          <p className="text-[11px] text-amber-200 font-semibold leading-snug">
            📝 {promptChallenge.clue}
          </p>
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            {promptChallenge.shapeSteps.map((step, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-slate-900/90 border border-white/15 text-[9px] text-emerald-300 font-bold"
              >
                • {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Main Canvas Area: Murni Kanvas Putih Tanpa Gambar Bocoran di Dalamnya */}
      <div
        ref={containerRef}
        className={`relative flex-1 min-h-[140px] sm:min-h-[175px] my-1 bg-white rounded-xl overflow-hidden border border-slate-700 shadow-inner w-full ${
          isLocked || !hasStartedRound ? 'pointer-events-none' : ''
        }`}
      >
        <canvas
          id={canvasId}
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={drawMove}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          className="w-full h-full block cursor-crosshair touch-none select-none"
          style={{ touchAction: 'none' }}
        />

        {/* Overlay Sebelum Klik Tombol START (Hanya Teks Kalimat Soal & Tombol START, Tanpa Gambar) */}
        {!hasStartedRound && !isLocked && (
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center pointer-events-auto z-20">
            <div className="bg-slate-900/95 border-2 border-emerald-400 rounded-2xl p-4 max-w-md shadow-2xl space-y-2.5">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                  Soal Ronde {currentRoundNumber} dari {totalRoundsNumber} · Materi {promptChallenge.topicTitle}
                </span>
                <h4 className="text-xs sm:text-sm font-black text-white leading-snug">
                  "{promptChallenge.title}"
                </h4>
                <p className="text-[11px] text-amber-200 leading-relaxed pt-0.5">
                  {promptChallenge.clue}
                </p>
              </div>

              <button
                type="button"
                onClick={onStartRoundTimer}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>START · MULAI WAKTU MENGGAMBAR!</span>
              </button>
              <p className="text-[10px] text-slate-300">
                ⚠️ Baca kalimat di bawah soal lalu gambarlah di kanvas. Jika kanvas kosong, skor otomatis <strong>0 (Nol)</strong>.
              </p>
            </div>
          </div>
        )}

        {isLocked && (
          <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center pointer-events-auto z-20 gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900/95 text-white font-bold text-xs border border-white/20 shadow-lg flex items-center gap-1.5">
              <span>🔒</span>
              <span>Kanvas Terkunci · Selesai Menggambar</span>
            </span>
            {onNextRound && (
              <button
                type="button"
                onClick={onNextRound}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-xl border-2 border-purple-300 ring-4 ring-purple-500/30 flex items-center gap-2 cursor-pointer active:scale-95 animate-pulse"
                title="Lanjut ke Soal Ronde Selanjutnya"
              >
                <span>{isMatchOver ? 'Tampilkan Hasil Akhir' : 'Lanjut ke Soal Berikutnya →'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Tool Palette: Color, Eraser, & Brush Size */}
      <div className="pt-1.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-1 text-xs shrink-0">
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={isLocked || !hasStartedRound}
            onClick={() => setIsEraser(false)}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition-all ${
              !isEraser
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <PenTool className="w-3 h-3" />
            <span>Kuas</span>
          </button>

          <button
            type="button"
            disabled={isLocked || !hasStartedRound}
            onClick={() => setIsEraser(true)}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition-all ${
              isEraser
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eraser className="w-3 h-3" />
            <span>Hapus</span>
          </button>

          <div className="flex items-center gap-1 pl-1">
            {COLOR_PALETTE.map((c) => {
              const isSelected = !isEraser && selectedColor === c.value;
              return (
                <button
                  key={c.label}
                  type="button"
                  disabled={isLocked || !hasStartedRound}
                  onClick={() => {
                    setSelectedColor(c.value);
                    setIsEraser(false);
                  }}
                  title={c.label}
                  className={`w-5 h-5 rounded-full border transition-transform active:scale-90 cursor-pointer ${
                    isSelected
                      ? 'scale-115 border-white ring-2 ring-purple-400 z-10'
                      : 'border-slate-700 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-slate-400 hidden xl:inline">Tebal:</span>
          {BRUSH_SIZES.map((b) => (
            <button
              key={b.label}
              type="button"
              disabled={isLocked || !hasStartedRound}
              onClick={() => setBrushSize(b.value)}
              className={`px-1.5 py-0.5 rounded-md text-[9px] font-black transition-all ${
                brushSize === b.value
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SketsaCepatGameProps {
  topic: Topic;
  mode: 'individu' | 'duel' | 'kelompok';
  totalRounds?: number;
  onSelectRounds?: (rounds: number) => void;
  shuffleTick?: number;
  blueLabel: string;
  redLabel: string;
  onTriggerCombat: (
    isCorrect: boolean,
    customPoints?: number,
    customDamage?: number,
    teamOverride?: 'blue' | 'red'
  ) => void;
  renderGameControlButtons: () => React.ReactNode;
}

export const SketsaCepatGame: React.FC<SketsaCepatGameProps> = ({
  topic,
  mode,
  totalRounds: propTotalRounds,
  onSelectRounds,
  shuffleTick = 0,
  blueLabel,
  redLabel,
  onTriggerCombat,
  renderGameControlButtons
}) => {
  const isSolo = mode === 'individu';
  const { studentProfile } = useUserRole();
  const { overrides } = useCurriculumOverrides();
  const topicOverride = overrides[topic.id];

  // Jumlah ronde mengikuti ronde yang dipilih (3, 5, 7, atau 10 ronde)
  const [internalTotalRounds, setInternalTotalRounds] = useState<number>(propTotalRounds || 3);
  const totalRounds = propTotalRounds || internalTotalRounds;

  useEffect(() => {
    if (propTotalRounds && propTotalRounds !== internalTotalRounds) {
      setInternalTotalRounds(propTotalRounds);
    }
  }, [propTotalRounds, internalTotalRounds]);

  const [currentRound, setCurrentRound] = useState<number>(1);
  const [blueWins, setBlueWins] = useState<number>(0);
  const [redWins, setRedWins] = useState<number>(0);
  const [drawRounds, setDrawRounds] = useState<number>(0);
  const [isMatchOver, setIsMatchOver] = useState<boolean>(false);
  const [roundHistory, setRoundHistory] = useState<
    Array<{
      round: number;
      challengeTitle: string;
      blueScore: number;
      redScore: number;
      winner: 'blue' | 'red' | 'draw';
    }>
  >([]);

  const [sessionSeed, setSessionSeed] = useState<number>(0);
  const [resetCounter, setResetCounter] = useState<number>(0);

  const sketsaPackSignature = useMemo(() => {
    const customSketsa = topicOverride?.customMiniGameQuestions?.['sketsa-cepat'] || [];
    const customWords = topicOverride?.customWordScramble || [];
    const sketsaSig = customSketsa
      .map((q) => `${q.scenario}:${q.question}:${(q.options || []).map((o) => o.text).join('|')}`)
      .join(';;');
    const wordsSig = customWords.map((w) => `${w.word}:${w.clue}`).join(';;');
    return `${topic.id}__${topic.title}__${sketsaSig}__${wordsSig}`;
  }, [topic.id, topic.title, topicOverride?.customMiniGameQuestions, topicOverride?.customWordScramble]);

  // Bank soal sesuai materi topik aktif (mendukung sinkronisasi database Mode Guru), dipotong tepat sebanyak `totalRounds` ronde yang dipilih!
  const { sessionBlueDeck, sessionRedDeck } = useMemo(() => {
    const baseTopicQuestions = getTopicDrawingChallenges(topic);
    const customSketsa = topicOverride?.customMiniGameQuestions?.['sketsa-cepat'];
    const customWords = topicOverride?.customWordScramble;

    let allTopicQuestions: DrawingChallenge[] = baseTopicQuestions;

    if (Array.isArray(customSketsa) && customSketsa.length > 0) {
      allTopicQuestions = customSketsa.map((q, idx) => {
        const baseFallback = baseTopicQuestions[idx % Math.max(1, baseTopicQuestions.length)];
        const stepList = q.options
          .slice(0, 3)
          .map((o) => o.text.trim())
          .filter(Boolean);
        return {
          id: `custom-sketsa-${idx + 1}`,
          topicTitle: topic.title,
          title: q.scenario || `Tantangan Sketsa #${idx + 1}`,
          clue: q.question || baseFallback?.clue || 'Gambarlah ilustrasi sesuai instruksi soal.',
          hints: stepList.length > 0 ? stepList : baseFallback?.hints || ['Buat bentuk utama'],
          difficulty: 'Sedang',
          keyElements: [
            q.options[3]?.text || q.options[0]?.text || baseFallback?.keyElements?.[0] || 'Bentuk Utama'
          ],
          shapeGuideType: baseFallback?.shapeGuideType || 'three-shapes',
          shapeSteps:
            stepList.length > 0
              ? stepList
              : baseFallback?.shapeSteps || ['Gambar bentuk utama di tengah kanvas']
        };
      });
    } else if (Array.isArray(customWords) && customWords.length > 0) {
      allTopicQuestions = customWords.map((w, idx) => {
        const baseFallback = baseTopicQuestions[idx % Math.max(1, baseTopicQuestions.length)];
        return {
          id: `word-sketsa-${idx + 1}`,
          topicTitle: topic.title,
          title: `${w.word}: ${w.dailyContext || topic.title}`,
          clue: w.clue || baseFallback?.clue || `Gambarlah sketsa yang menggambarkan konsep ${w.word}.`,
          hints: baseFallback?.hints || [`Bentuk utama ${w.word}`, 'Detail pendukung'],
          difficulty: 'Sedang',
          keyElements: [w.word],
          shapeGuideType: baseFallback?.shapeGuideType || 'three-shapes',
          shapeSteps: [
            `Gambar bentuk utama yang mewakili ${w.word}`,
            `Tambahkan elemen pendukung sesuai petunjuk: ${w.clue.slice(0, 50)}`,
            `Pastikan proporsi sketsa jelas di tengah kanvas`
          ]
        };
      });
    }

    const seedOffset = (shuffleTick + sessionSeed) % Math.max(1, allTopicQuestions.length);

    // Putar urutan berdasarkan seed agar saat diacak mendapat variasi soal sesuai materi
    const rotated = allTopicQuestions.map(
      (_, idx) => allTopicQuestions[(idx + seedOffset) % allTopicQuestions.length]
    );

    // Pastikan panjang deck persis sesuai jumlah ronde yang dipilih (misal 3, 5, 7, atau 10 soal)
    const blueDeck: DrawingChallenge[] = [];
    for (let i = 0; i < totalRounds; i++) {
      blueDeck.push(rotated[i % rotated.length]);
    }

    // Untuk mode Duel / Kelompok, Pemain 2 mendapat soal berbeda yang juga berkaitan dengan materi
    const redOffset = Math.max(1, Math.floor(rotated.length / 2));
    const redDeck: DrawingChallenge[] = [];
    for (let i = 0; i < totalRounds; i++) {
      redDeck.push(rotated[(i + redOffset) % rotated.length]);
    }

    return {
      sessionBlueDeck: blueDeck,
      sessionRedDeck: redDeck
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id, sketsaPackSignature, totalRounds, shuffleTick, sessionSeed]);

  const currentChallenge =
    sessionBlueDeck[(currentRound - 1) % Math.max(1, sessionBlueDeck.length)];
  const redChallenge = currentChallenge;

  // Pilihan Waktu: 15s, 20s, 30s — WAKTU TIDAK JALAN SEBELUM KLIK TOMBOL START!
  const [timerDuration, setTimerDuration] = useState<15 | 20 | 30>(20);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [hasStartedRound, setHasStartedRound] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [blueLockedEarly, setBlueLockedEarly] = useState<boolean>(false);
  const [redLockedEarly, setRedLockedEarly] = useState<boolean>(false);
  const [blueFastBonus, setBlueFastBonus] = useState<number>(0);
  const [redFastBonus, setRedFastBonus] = useState<number>(0);
  const [blueStrokes, setBlueStrokes] = useState<number>(0);
  const [redStrokes, setRedStrokes] = useState<number>(0);
  const [isMusicOn, setIsMusicOn] = useState<boolean>(() => soundManager.isMiniGameMusicActive());

  // Status Penilaian Otomatis oleh Sistem
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<SketchEvaluationResult | null>(null);

  // Reset otomatis saat topik, jumlah ronde, shuffleTick, atau durasi waktu berganti
  useEffect(() => {
    setCurrentRound(1);
    setResetCounter(0);
    setBlueWins(0);
    setRedWins(0);
    setDrawRounds(0);
    setIsMatchOver(false);
    setRoundHistory([]);
    setTimeLeft(timerDuration);
    setHasStartedRound(false);
    setIsTimerRunning(false);
    setIsFinished(false);
    setBlueLockedEarly(false);
    setRedLockedEarly(false);
    setBlueFastBonus(0);
    setRedFastBonus(0);
    setBlueStrokes(0);
    setRedStrokes(0);
    setEvaluationResult(null);
    setIsAnalyzing(false);
  }, [topic.id, totalRounds, shuffleTick, timerDuration]);

  // References to canvases
  const singleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const blueCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const redCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleStartRoundTimer = () => {
    soundManager.playClick();
    setHasStartedRound(true);
    setIsTimerRunning(true);
  };

  const handleTogglePauseTimer = () => {
    soundManager.playClick();
    if (!hasStartedRound) {
      setHasStartedRound(true);
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning((prev) => !prev);
    }
  };

  // Penilaian Otomatis oleh Sistem (Menjamin Skor 0 Jika Kanvas Kosong & Menyimpan Skor Siswa ke Database)
  const executeAutoSystemEvaluation = useCallback(async () => {
    setIsAnalyzing(true);
    soundManager.playTick();

    const minDelay = new Promise((resolve) => setTimeout(resolve, 250));

    try {
      const targetBlueCanvas = isSolo ? singleCanvasRef.current : blueCanvasRef.current;
      const targetRedCanvas = isSolo ? null : redCanvasRef.current;

      // Periksa apakah kanvas benar-benar kosong (0 goresan atau piksel kosong)
      const blueStruct = analyzeCanvasStructure(targetBlueCanvas);
      const redStruct = !isSolo ? analyzeCanvasStructure(targetRedCanvas) : null;

      const isBlueBlank = blueStrokes === 0 || blueStruct.isEmpty;
      const isRedBlank = !isSolo ? redStrokes === 0 || (redStruct ? redStruct.isEmpty : true) : true;

      const [result] = await Promise.all([
        evaluateSketchWithAI({
          blueCanvas: targetBlueCanvas,
          redCanvas: targetRedCanvas,
          challenge: currentChallenge,
          blueLabel,
          redLabel,
          isSolo
        }),
        minDelay
      ]);

      // ATURAN MUTLAK: Jika kosong skornya WAJIB 0 (tidak mendapat bonus kecepatan)
      const adjustedBlueScore = isBlueBlank
        ? 0
        : Math.min(100, result.blueScore + Math.round(blueFastBonus / 4));
      const adjustedRedScore =
        isSolo || isRedBlank
          ? 0
          : Math.min(100, result.redScore + Math.round(redFastBonus / 4));

      const finalWinner: 'blue' | 'red' | 'draw' = isSolo
        ? adjustedBlueScore > 0
          ? 'blue'
          : 'draw'
        : adjustedBlueScore > adjustedRedScore
        ? 'blue'
        : adjustedRedScore > adjustedBlueScore
        ? 'red'
        : 'draw';

      const finalResult: SketchEvaluationResult = {
        ...result,
        blueScore: adjustedBlueScore,
        redScore: adjustedRedScore,
        winner: finalWinner,
        summaryReason:
          isSolo && isBlueBlank
            ? 'Kanvas masih kosong (tidak ada gambar yang dibuat), sehingga skornya adalah 0.'
            : !isSolo && isBlueBlank && isRedBlank
            ? 'Kedua kanvas kosong (belum ada gambar), sehingga skor kedua tim adalah 0.'
            : result.summaryReason,
        blueStrengths: isBlueBlank
          ? 'Kanvas kosong — Skor 0. Klik tombol START dan gambarlah sesuai kalimat di bawah soal!'
          : result.blueStrengths,
        redStrengths: isRedBlank
          ? 'Kanvas kosong — Skor 0. Klik tombol START dan gambarlah sesuai kalimat di bawah soal!'
          : result.redStrengths
      };

      setEvaluationResult(finalResult);
      setIsAnalyzing(false);

      if (adjustedBlueScore > 0 || adjustedRedScore > 0) {
        soundManager.playFanfare();
        confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
      } else {
        soundManager.playError();
      }

      // Catat skor dan akumulasi kemenangan ronde
      if (finalResult.winner === 'blue' && adjustedBlueScore > 0) {
        setBlueWins((prev) => prev + 1);
      } else if (finalResult.winner === 'red' && adjustedRedScore > 0) {
        setRedWins((prev) => prev + 1);
      } else {
        setDrawRounds((prev) => prev + 1);
      }

      setRoundHistory((prev) => [
        ...prev,
        {
          round: currentRound,
          challengeTitle: currentChallenge.title,
          blueScore: finalResult.blueScore,
          redScore: finalResult.redScore,
          winner: finalResult.winner
        }
      ]);

      // Simpan Nama Siswa & Skor Sketsa ke Database Utama Aplikasi
      const duelNames = getSavedDuelPlayerNames();
      const p1Name = studentProfile.name || duelNames.player1Name || blueLabel || 'Siswa SMPN 5 Kroya';
      const p1Class = studentProfile.className || duelNames.player1Class || 'Kelas VII/VIII/IX';

      saveStudentScoreToDatabase({
        studentName: p1Name,
        className: p1Class,
        studentNumber: studentProfile.studentNumber || '-',
        topicId: topic.id,
        topicTitle: topic.title,
        activityType: 'mini-game',
        activityName: `Sketsa Cepat: ${currentChallenge.title}`,
        score: finalResult.blueScore,
        maxScore: 100,
        mode,
        details: `Ronde ${currentRound}/${totalRounds} · Skor Sketsa ${finalResult.blueScore}%`
      }).catch(() => {});

      if (!isSolo) {
        const p2Name = duelNames.player2Name || redLabel || 'Pemain 2';
        const p2Class = duelNames.player2Class || p1Class;
        saveStudentScoreToDatabase({
          studentName: p2Name,
          className: p2Class,
          studentNumber: '-',
          topicId: topic.id,
          topicTitle: topic.title,
          activityType: 'mini-game',
          activityName: `Sketsa Cepat: ${redChallenge.title}`,
          score: finalResult.redScore,
          maxScore: 100,
          mode,
          details: `Ronde ${currentRound}/${totalRounds} · Skor Sketsa ${finalResult.redScore}%`
        }).catch(() => {});
      }

      if (currentRound >= totalRounds) {
        setIsMatchOver(true);
        if (adjustedBlueScore > 0 || adjustedRedScore > 0) {
          setTimeout(() => {
            confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } });
          }, 350);
        }
      }

      // Berikan poin ke sistem Arena sesuai skor (Jika 0 maka poin 0!)
      if (isSolo) {
        if (finalResult.blueScore === 0) {
          onTriggerCombat(false, 0, 0, 'blue');
        } else {
          onTriggerCombat(
            true,
            Math.round(finalResult.blueScore * 1.2) + blueFastBonus,
            30,
            'blue'
          );
        }
      } else {
        if (finalResult.blueScore === 0 && finalResult.redScore === 0) {
          onTriggerCombat(false, 0, 0, 'blue');
        } else if (finalResult.winner === 'blue') {
          onTriggerCombat(true, finalResult.blueScore + blueFastBonus, 35, 'blue');
        } else if (finalResult.winner === 'red') {
          onTriggerCombat(true, finalResult.redScore + redFastBonus, 35, 'red');
        } else {
          onTriggerCombat(true, finalResult.blueScore + blueFastBonus, 20, 'blue');
          setTimeout(
            () => onTriggerCombat(true, finalResult.redScore + redFastBonus, 20, 'red'),
            250
          );
        }
      }
    } catch (err) {
      console.error('Error in executeAutoSystemEvaluation:', err);
      setIsAnalyzing(false);
    }
  }, [
    isSolo,
    currentChallenge,
    redChallenge,
    blueLabel,
    redLabel,
    currentRound,
    totalRounds,
    blueFastBonus,
    redFastBonus,
    blueStrokes,
    redStrokes,
    studentProfile,
    topic.id,
    topic.title,
    mode,
    onTriggerCombat
  ]);

  // Countdown Timer Effect (Hanya berjalan setelah tombol START diklik)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (hasStartedRound && isTimerRunning && timeLeft > 0 && !isFinished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsFinished(true);
            setIsTimerRunning(false);
            executeAutoSystemEvaluation();
            return 0;
          }
          if (prev <= 5) {
            soundManager.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasStartedRound, isTimerRunning, timeLeft, isFinished, executeAutoSystemEvaluation]);

  const handleStartNewMatch = () => {
    soundManager.playClick();
    setCurrentRound(1);
    setSessionSeed((prev) => prev + 1);
    setResetCounter(0);
    setBlueWins(0);
    setRedWins(0);
    setDrawRounds(0);
    setIsMatchOver(false);
    setRoundHistory([]);
    setTimeLeft(timerDuration);
    setHasStartedRound(false);
    setIsTimerRunning(false);
    setIsFinished(false);
    setBlueLockedEarly(false);
    setRedLockedEarly(false);
    setBlueFastBonus(0);
    setRedFastBonus(0);
    setBlueStrokes(0);
    setRedStrokes(0);
    setEvaluationResult(null);
    setIsAnalyzing(false);
  };

  const handleNextChallenge = () => {
    soundManager.playClick();
    if (currentRound < totalRounds) {
      setCurrentRound((prev) => prev + 1);
    } else {
      handleStartNewMatch();
      return;
    }
    setResetCounter(0);
    setTimeLeft(timerDuration);
    setHasStartedRound(false);
    setIsTimerRunning(false);
    setIsFinished(false);
    setBlueLockedEarly(false);
    setRedLockedEarly(false);
    setBlueFastBonus(0);
    setRedFastBonus(0);
    setBlueStrokes(0);
    setRedStrokes(0);
    setEvaluationResult(null);
    setIsAnalyzing(false);
  };

  const handleShuffleCurrentQuestion = () => {
    soundManager.playClick();
    setSessionSeed((prev) => prev + 1);
    setResetCounter((prev) => prev + 1);
    setTimeLeft(timerDuration);
    setHasStartedRound(false);
    setIsTimerRunning(false);
    setIsFinished(false);
    setBlueLockedEarly(false);
    setRedLockedEarly(false);
    setBlueFastBonus(0);
    setRedFastBonus(0);
    setBlueStrokes(0);
    setRedStrokes(0);
    setEvaluationResult(null);
    setIsAnalyzing(false);
  };

  const handleRestartCurrentRound = () => {
    soundManager.playClick();
    setResetCounter((prev) => prev + 1);
    if (evaluationResult) {
      if (evaluationResult.winner === 'blue' && evaluationResult.blueScore > 0)
        setBlueWins((prev) => Math.max(0, prev - 1));
      else if (evaluationResult.winner === 'red' && evaluationResult.redScore > 0)
        setRedWins((prev) => Math.max(0, prev - 1));
      else setDrawRounds((prev) => Math.max(0, prev - 1));
      setRoundHistory((prev) => prev.slice(0, -1));
    }
    setIsMatchOver(false);
    setTimeLeft(timerDuration);
    setHasStartedRound(false);
    setIsTimerRunning(false);
    setIsFinished(false);
    setBlueLockedEarly(false);
    setRedLockedEarly(false);
    setBlueFastBonus(0);
    setRedFastBonus(0);
    setBlueStrokes(0);
    setRedStrokes(0);
    setEvaluationResult(null);
    setIsAnalyzing(false);
  };

  const handleSelectTotalRounds = (rounds: number) => {
    soundManager.playClick();
    setInternalTotalRounds(rounds);
    if (onSelectRounds) {
      onSelectRounds(rounds);
    }
  };

  const handleFinishEarly = () => {
    soundManager.playClick();
    if (blueStrokes > 0 && hasStartedRound) {
      setBlueFastBonus(Math.max(5, timeLeft * 2));
    } else {
      setBlueFastBonus(0);
    }
    setIsFinished(true);
    setIsTimerRunning(false);
    setTimeLeft(0);
    executeAutoSystemEvaluation();
  };

  const handleTeamFinishEarly = (team: 'blue' | 'red') => {
    soundManager.playClick();
    const hasDrawn = team === 'blue' ? blueStrokes > 0 : redStrokes > 0;
    const speedBonus = hasDrawn && hasStartedRound ? Math.max(10, timeLeft * 3) : 0;
    if (team === 'blue') {
      setBlueLockedEarly(true);
      setBlueFastBonus(speedBonus);
      if (redLockedEarly) {
        setIsFinished(true);
        setIsTimerRunning(false);
        setTimeLeft(0);
        setTimeout(() => executeAutoSystemEvaluation(), 100);
      }
    } else {
      setRedLockedEarly(true);
      setRedFastBonus(speedBonus);
      if (blueLockedEarly) {
        setIsFinished(true);
        setIsTimerRunning(false);
        setTimeLeft(0);
        setTimeout(() => executeAutoSystemEvaluation(), 100);
      }
    }
  };

  const handleDownloadCanvas = (canvas: HTMLCanvasElement | null, filename: string) => {
    if (!canvas) return;
    soundManager.playClick();
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const timerPercentage = Math.max(0, Math.min(100, (timeLeft / timerDuration) * 100));
  const timerColor = !hasStartedRound
    ? 'text-sky-300 bg-sky-500/20 border-sky-400/50'
    : timeLeft <= 5
    ? 'text-rose-400 bg-rose-500/20 border-rose-500/50'
    : timeLeft <= 10
    ? 'text-amber-400 bg-amber-500/20 border-amber-500/50'
    : 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50';

  return (
    <div className="h-full min-h-0 flex flex-col justify-between gap-2 overflow-y-auto pb-16">
      {/* =================================================================== */}
      {/* 1. HEADER: SOAL SKETSA SESUAI MATERI & RONDE (TANPA GAMBAR CONTOH)  */}
      {/* =================================================================== */}
      <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-950 border-2 border-emerald-500/50 text-white shadow-xl flex flex-col gap-2 shrink-0 select-none">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Label Materi & Indikator Soal Sesuai Ronde */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Soal Ronde {currentRound} / {totalRounds}
              </span>
            </span>

            {/* Indikator Nomor Soal Sesuai Jumlah Ronde yang Dipilih */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-xl border border-slate-800">
              {Array.from({ length: totalRounds }).map((_, idx) => {
                const rNum = idx + 1;
                const isDone = rNum < currentRound || (rNum === currentRound && isFinished);
                const isCurrent = rNum === currentRound && !isFinished;
                return (
                  <span
                    key={rNum}
                    className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-emerald-500 text-slate-950 scale-110 shadow-xs'
                        : isDone
                        ? 'bg-indigo-600/50 text-indigo-200 border border-indigo-400/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                    title={`Soal Ronde ${rNum}`}
                  >
                    {rNum}
                  </span>
                );
              })}
            </div>

            <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-bold">
              Materi: {topic.title} ({totalRounds} Soal)
            </span>

            {!isSolo ? (
              <span className="px-2.5 py-0.5 rounded-lg bg-purple-600/30 border border-purple-400 text-purple-200 text-[11px] font-black flex items-center gap-1.5 shadow-xs">
                <Swords className="w-3.5 h-3.5 text-amber-300" />
                <span>Skor Seri: 🔵 {blueWins} - {redWins} 🔴 · Kosong = Skor 0</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-200 text-[10px] font-bold">
                Kosong = Skor 0 · Baca Kalimat di Bawah Soal!
              </span>
            )}
          </div>

          {/* Kontrol Ronde, Waktu, Tombol START Waktu & Musik */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Tombol Musik Mini Game */}
            <button
              type="button"
              onClick={() => {
                const next = soundManager.toggleMiniGameMusic('sketsa-cepat');
                setIsMusicOn(next);
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 border cursor-pointer transition-all ${
                isMusicOn
                  ? 'bg-pink-600/30 border-pink-400 text-pink-200'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
              title="Nyalakan / Matikan Musik Mini Game Sketsa"
            >
              {isMusicOn ? <Volume2 className="w-3.5 h-3.5 text-pink-300" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isMusicOn ? 'Musik: ON' : 'Musik: OFF'}</span>
            </button>

            {/* Pemilih Waktu 15s / 20s / 30s */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 pl-1.5 hidden sm:inline">Waktu:</span>
              {([15, 20, 30] as const).map((sec) => (
                <button
                  key={sec}
                  type="button"
                  disabled={hasStartedRound && !isFinished}
                  onClick={() => {
                    soundManager.playClick();
                    setTimerDuration(sec);
                    setTimeLeft(sec);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                    timerDuration === sec
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>

            {/* TOMBOL START / PAUSE WAKTU */}
            {!isFinished && (
              <button
                type="button"
                onClick={handleTogglePauseTimer}
                className={`px-3 py-1 rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md ${
                  !hasStartedRound
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 ring-2 ring-emerald-300 animate-pulse'
                    : isTimerRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
                title={!hasStartedRound ? 'Klik untuk memulai hitungan waktu menggambar' : 'Jeda / Lanjutkan Waktu'}
              >
                {!hasStartedRound ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>START WAKTU</span>
                  </>
                ) : isTimerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Lanjut Waktu</span>
                  </>
                )}
              </button>
            )}

            <div className={`px-2.5 py-1 rounded-xl border flex items-center gap-1.5 font-mono font-black text-xs sm:text-sm ${timerColor}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>

            {/* TOMBOL SELANJUTNYA / NEXT PERMANEN DI HEADER IFP */}
            {isFinished && !isAnalyzing && (
              <button
                type="button"
                onClick={handleNextChallenge}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg ring-2 ring-purple-300 animate-pulse flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="Lanjut ke Ronde Berikutnya (Mudah dijangkau di layar IFP)"
              >
                {isMatchOver ? (
                  <>
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>Hasil Akhir ({totalRounds} Ronde)</span>
                  </>
                ) : (
                  <>
                    <span>Lanjut Ronde {currentRound + 1} &rarr;</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}

            {renderGameControlButtons()}
          </div>
        </div>

        {/* Kotak Soal Sketsa Tunggal di Atas (Satu Soal Sama untuk Semua Pemain — Yang Dinilai Hasil Gambarnya) */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/95 border border-emerald-500/40 space-y-1 text-left">
          <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>
                SOAL SKETSA KE-{currentRound} DARI {totalRounds} RONDE · MATERI {topic.title}:
              </span>
            </div>
            {!isSolo && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[9px] font-extrabold">
                ⚔️ Soal Sama untuk Kedua Tim · Yang Dinilai Hasil Gambarnya!
              </span>
            )}
          </div>

          {/* Judul Soal */}
          <h2 className="text-xs sm:text-sm font-black text-white leading-snug">
            "{currentChallenge.title}"
          </h2>

          {/* Kalimat Petunjuk di Bawah Soal (Tanpa Menampilkan Gambar di Manapun) */}
          <p className="text-[11px] sm:text-xs text-amber-200 font-semibold leading-snug">
            📝 {currentChallenge.clue}
          </p>

          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            {currentChallenge.shapeSteps.map((step, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-950 border border-emerald-500/30 text-[10px] font-bold text-emerald-300"
              >
                Langkah {idx + 1}: {step}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Bar Timer */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              !hasStartedRound
                ? 'bg-sky-400'
                : timeLeft <= 5
                ? 'bg-rose-500'
                : timeLeft <= 10
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. AREA GAMBAR: DUEL KANAN & KIRI TERPISAH (ATAU SOLO DI TENGAH)    */}
      {/* =================================================================== */}
      <div className="flex-1 min-h-0">
        {isSolo ? (
          <div className="h-full min-h-[300px] max-w-4xl mx-auto">
            <DrawingPad
              canvasId="solo-canvas"
              title={studentProfile.name ? `Kanvas: ${studentProfile.name}` : 'Area Gambar Siswa'}
              teamColor="purple"
              isLocked={isFinished}
              hasStartedRound={hasStartedRound}
              onStartRoundTimer={handleStartRoundTimer}
              roundIndex={currentRound * 10000 + sessionSeed * 100 + resetCounter}
              currentRoundNumber={currentRound}
              totalRoundsNumber={totalRounds}
              promptChallenge={currentChallenge}
              showPromptInPad={false}
              onFinishFast={handleFinishEarly}
              fastBonusPoints={blueFastBonus}
              onStrokeCountChange={setBlueStrokes}
              onCanvasRefReady={(c) => {
                singleCanvasRef.current = c;
              }}
              onNextRound={isFinished && !isAnalyzing ? handleNextChallenge : undefined}
              isMatchOver={isMatchOver}
            />
          </div>
        ) : (
          <div className="h-full min-h-[340px] grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 items-stretch relative">
            {/* AREA KIRI: Tim Biru */}
            <div className="h-full min-h-0 flex flex-col">
              <DrawingPad
                canvasId="blue-team-canvas"
                title={`🔵 KIRI: ${blueLabel}`}
                teamColor="blue"
                isLocked={isFinished || blueLockedEarly}
                hasStartedRound={hasStartedRound}
                onStartRoundTimer={handleStartRoundTimer}
                roundIndex={currentRound * 10000 + sessionSeed * 100 + resetCounter}
                currentRoundNumber={currentRound}
                totalRoundsNumber={totalRounds}
                promptChallenge={currentChallenge}
                showPromptInPad={false}
                onFinishFast={() => handleTeamFinishEarly('blue')}
                fastBonusPoints={blueFastBonus}
                onStrokeCountChange={setBlueStrokes}
                onCanvasRefReady={(c) => {
                  blueCanvasRef.current = c;
                }}
                onNextRound={isFinished && !isAnalyzing ? handleNextChallenge : undefined}
                isMatchOver={isMatchOver}
              />
            </div>

            {/* AREA KANAN: Tim Merah */}
            <div className="h-full min-h-0 flex flex-col">
              <DrawingPad
                canvasId="red-team-canvas"
                title={`🔴 KANAN: ${redLabel}`}
                teamColor="red"
                isLocked={isFinished || redLockedEarly}
                hasStartedRound={hasStartedRound}
                onStartRoundTimer={handleStartRoundTimer}
                roundIndex={currentRound * 10000 + sessionSeed * 100 + resetCounter}
                currentRoundNumber={currentRound}
                totalRoundsNumber={totalRounds}
                promptChallenge={currentChallenge}
                showPromptInPad={false}
                onFinishFast={() => handleTeamFinishEarly('red')}
                fastBonusPoints={redFastBonus}
                onStrokeCountChange={setRedStrokes}
                onCanvasRefReady={(c) => {
                  redCanvasRef.current = c;
                }}
                onNextRound={isFinished && !isAnalyzing ? handleNextChallenge : undefined}
                isMatchOver={isMatchOver}
              />
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* 2.5 TOMBOL SELANJUTNYA MELAYANG DI BAWAH KANVAS (AKSES TOUCHSCREEN IFP) */}
      {/* =================================================================== */}
      {isFinished && !isAnalyzing && (
        <div className="sticky bottom-0 z-40 p-2.5 sm:p-3 rounded-2xl bg-slate-950/95 border-2 border-purple-500 text-white shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-2.5 animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 sm:p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/40">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-spin" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-white">
                {isMatchOver ? '🏆 Pertandingan Selesai!' : `🎉 Soal Ronde ${currentRound} Telah Dinilai!`}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-purple-200">
                {isMatchOver
                  ? `Seluruh ${totalRounds} ronde telah tuntas dan skor tersimpan di database.`
                  : `Lanjut ke Soal Ronde ${currentRound + 1} dari ${totalRounds}?`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRestartCurrentRound}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 border border-slate-600"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Gambar Ulang</span>
            </button>
            <button
              type="button"
              onClick={handleNextChallenge}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-xl border-2 border-purple-300 ring-4 ring-purple-500/30 flex items-center gap-2 cursor-pointer active:scale-95 animate-pulse"
              title="Tombol Selanjutnya (Mudah dijangkau di layar IFP)"
            >
              {isMatchOver ? (
                <>
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>Mainkan Ronde Baru ({totalRounds} Ronde)</span>
                </>
              ) : (
                <>
                  <span>Lanjut ke Soal Ronde {currentRound + 1} ({currentRound + 1}/{totalRounds})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. FOOTER: STATUS AKTIF / HASIL PENILAIAN OTOMATIS OLEH SISTEM     */}
      {/* =================================================================== */}
      <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md shrink-0 select-none">
        {!isFinished ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  hasStartedRound ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
                }`}
              />
              <span>
                {!hasStartedRound ? (
                  <>
                    <strong>Menunggu START (Soal {currentRound}/{totalRounds}):</strong> Baca <em>kalimat petunjuk di bawah soal</em>, lalu klik <strong>START WAKTU</strong> untuk mulai menggambar!
                  </>
                ) : (
                  <>
                    <strong>Waktu Berjalan ({timeLeft}s):</strong> Gambarlah sesuai kalimat petunjuk di bawah soal. (Jika kosong, skor otomatis <strong>0</strong>).
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!hasStartedRound && (
                <button
                  type="button"
                  onClick={handleStartRoundTimer}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>START Waktu ({timerDuration}s)</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleShuffleCurrentQuestion}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer active:scale-95 border border-slate-300 dark:border-slate-700"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Ganti Soal</span>
              </button>
              <button
                type="button"
                onClick={handleFinishEarly}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Nilai Sekarang</span>
              </button>
            </div>
          </div>
        ) : isAnalyzing ? (
          <div className="flex flex-col items-center justify-center gap-1.5 py-2.5 text-center">
            <div className="flex items-center gap-2 text-indigo-500">
              <Bot className="w-5 h-5 animate-spin" />
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 animate-pulse">
              🤖 Sistem Menilai Kesesuaian Sketsa & Menyimpan Skor ke Database...
            </span>
          </div>
        ) : (
          <div className="space-y-2.5 animate-in fade-in">
            {isMatchOver && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/25 via-purple-500/25 to-sky-500/25 border-2 border-amber-400 text-center space-y-1 shadow-lg animate-in zoom-in-95">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
                  <h2 className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-300 uppercase tracking-wider">
                    {isSolo
                      ? `🎉 SELESAI ${totalRounds} RONDE! Seluruh Soal Materi "${topic.title}" Telah Dituntaskan!`
                      : blueWins > redWins
                      ? `🏆 HASIL AKHIR (${totalRounds} RONDE): ${blueLabel} JUARA PERTANDINGAN! (${blueWins} - ${redWins})`
                      : redWins > blueWins
                      ? `🏆 HASIL AKHIR (${totalRounds} RONDE): ${redLabel} JUARA PERTANDINGAN! (${redWins} - ${blueWins})`
                      : `🤝 HASIL AKHIR (${totalRounds} RONDE): PERTANDINGAN SELESAI SERI! (${blueWins} - ${redWins})`}
                  </h2>
                  <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/40">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Hasil Penilaian Ronde {currentRound}/{totalRounds}:</span>
                    <span className="text-amber-500 font-extrabold">
                      {isSolo
                        ? `Skor Sketsa: ${evaluationResult?.blueScore ?? 0}% (Tersimpan di Database)`
                        : evaluationResult?.winner === 'blue' && (evaluationResult?.blueScore ?? 0) > 0
                        ? `🏆 ${blueLabel} Menang Ronde Ini!`
                        : evaluationResult?.winner === 'red' && (evaluationResult?.redScore ?? 0) > 0
                        ? `🏆 ${redLabel} Menang Ronde Ini!`
                        : '🤝 Ronde Ini Seri!'}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {evaluationResult?.summaryReason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRestartCurrentRound}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 border border-slate-300 dark:border-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                  <span>Gambar Ulang</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextChallenge}
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  {isMatchOver ? (
                    <>
                      <Trophy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Mainkan Pertandingan Baru ({totalRounds} Ronde)</span>
                    </>
                  ) : (
                    <>
                      <span>Lanjut ke Soal Ronde {currentRound + 1} ({currentRound + 1}/{totalRounds})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Skor Komparasi */}
            {!isSolo ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  className={`p-2 rounded-xl border flex flex-col gap-1 ${
                    evaluationResult?.winner === 'blue' && (evaluationResult?.blueScore ?? 0) > 0
                      ? 'bg-sky-100 dark:bg-sky-950/50 border-sky-500 ring-2 ring-sky-400/50 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sky-600 dark:text-sky-300">🔵 {blueLabel}:</span>
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {evaluationResult?.blueScore ?? 0}%
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadCanvas(blueCanvasRef.current, `Sketsa_${blueLabel}`)}
                      className="p-1 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-[10px] font-bold cursor-pointer"
                      title="Unduh PNG"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                  {evaluationResult?.blueStrengths && (
                    <div className="text-[10px] text-sky-800 dark:text-sky-300/90 bg-sky-50 dark:bg-sky-900/30 p-1 rounded border border-sky-200 dark:border-sky-800/50 line-clamp-2">
                      💡 {evaluationResult.blueStrengths}
                    </div>
                  )}
                </div>

                <div
                  className={`p-2 rounded-xl border flex flex-col gap-1 ${
                    evaluationResult?.winner === 'red' && (evaluationResult?.redScore ?? 0) > 0
                      ? 'bg-rose-100 dark:bg-rose-950/50 border-rose-500 ring-2 ring-rose-400/50 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-rose-600 dark:text-rose-300">🔴 {redLabel}:</span>
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {evaluationResult?.redScore ?? 0}%
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadCanvas(redCanvasRef.current, `Sketsa_${redLabel}`)}
                      className="p-1 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-[10px] font-bold cursor-pointer"
                      title="Unduh PNG"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                  {evaluationResult?.redStrengths && (
                    <div className="text-[10px] text-rose-800 dark:text-rose-300/90 bg-rose-50 dark:bg-rose-900/30 p-1 rounded border border-rose-200 dark:border-rose-800/50 line-clamp-2">
                      💡 {evaluationResult.redStrengths}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-400 flex flex-col gap-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-purple-800 dark:text-purple-200">
                    Nilai Sketsa Ronde {currentRound}/{totalRounds}:{' '}
                    <strong className="text-sm font-black">{evaluationResult?.blueScore ?? 0}%</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownloadCanvas(singleCanvasRef.current, `Sketsa_${currentChallenge.title}`)}
                    className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Unduh PNG</span>
                  </button>
                </div>
                {evaluationResult?.blueStrengths && (
                  <div className="text-[10px] text-purple-700 dark:text-purple-300 bg-purple-100/50 dark:bg-purple-900/30 p-1 rounded border border-purple-200 dark:border-purple-800/50">
                    💡 {evaluationResult.blueStrengths}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
