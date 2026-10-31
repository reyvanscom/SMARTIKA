import { randomizeTopicGamePack } from '../utils/questionRandomizer';

/**
 * Database Soal Mini Games & Simulasi Visual IFP
 * Berisi 3 Jenis Mini Game dengan 5 Soal Sehari-hari per Topik:
 * 1. Pertarungan Robot Edukasi (Battle Bot Arena) - Individu, Duel, Kelompok
 * 2. Tebak Kata Informatika (Word Scramble)
 * 3. Tebak Gambar & Visual Clue (Picture Guessing)
 */

export interface BattleBotQuestion {
  id: number;
  scenario: string;
  question: string;
  options: { label: string; text: string }[];
  correctIndex: number;
  damage: number;
  explanation: string;
}

export interface WordScrambleQuestion {
  id: number;
  word: string; // The correct target word
  clue: string;
  dailyContext: string;
  scrambled: string;
}

export interface PictureGuessQuestion {
  id: number;
  title: string;
  clue: string;
  dailyContext: string;
  iconName: string;
  visualTag: string;
  options: string[];
  correctIndex: number;
  customImageUrl?: string;
}

export interface VisualSimulationCard {
  id: string;
  title: string;
  description: string;
  iconType: string;
  correctCategory: string;
  color: string;
}

import { EXTRA_TOPIC_GAMES } from './topicGamesExtra';
import { RobotRaceQuestion, getTopicRobotRaceQuestions } from './robotRaceQuestionsData';
export type { RobotRaceQuestion };

export interface TopicGamePack {
  battleBot: BattleBotQuestion[];
  robotRace?: RobotRaceQuestion[];
  wordScramble: WordScrambleQuestion[];
  pictureGuess: PictureGuessQuestion[];
  visualSimulationCards: VisualSimulationCard[];
  simulationCategories: string[];
}

export const TOPIC_GAMES_REGISTRY: Record<string, TopicGamePack> = {
  // ==========================================
  // KELAS 7 - INFORMASI DIGITAL & KREDIBILITAS
  // ==========================================
  'k7-idk': {
    battleBot: [
      {
        id: 1,
        scenario: 'Robot Virus Hoaks menyerang dengan mengirim pesan berantai: "Sebarkan ke 10 grup atau HP-mu meledak!".',
        question: 'Tindakan pertahanan apa yang harus dilakukan Robot Penjaga Edukasi?',
        options: [
          { label: 'A', text: 'Mengabaikan dan menghapus pesan, tidak menyebarkannya ke siapa pun' },
          { label: 'B', text: 'Menyebarkannya ke 20 grup agar lebih aman' },
          { label: 'C', text: 'Menangis dan mematikan HP selamanya' },
          { label: 'D', text: 'Mengirim pulsa ke nomor pengirim' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Pesan ancaman berantai adalah trik hoaks klasik! Jangan pernah menyebarkannya.'
      },
      {
        id: 2,
        scenario: 'Lawan mengeluarkan artikel kesehatan dengan judul: "HEBOH! Makan Kulit Salak Bikin Pintar Coding!".',
        question: 'Bagaimana cara Robot Pintar membongkar kelemahan artikel tersebut?',
        options: [
          { label: 'A', text: 'Mengecek apakah ada nama dokter/peneliti resmi dan riset medis di situs Kemenkes' },
          { label: 'B', text: 'Langsung membeli 5 kg buah salak di pasar' },
          { label: 'C', text: 'Mengunggahnya ke status WhatsApp' },
          { label: 'D', text: 'Membuat video TikTok makan kulit salak' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Klaim luar biasa memerlukan bukti uji klinis dari lembaga resmi, bukan judul heboh.'
      },
      {
        id: 3,
        scenario: 'Siswa kelas 7 sedang mencari jadwal libur semester resmi dari SMP Negeri 5 Kroya.',
        question: 'Situs dengan domain manakah yang memiliki perisai pertahanan kredibilitas tertinggi?',
        options: [
          { label: 'A', text: 'smpn5kroya.sch.id (Domain resmi sekolah Indonesia)' },
          { label: 'B', text: 'kabar-kroya-gratis.blogspot.com' },
          { label: 'C', text: 'bocoran-libur-kroya.xyz' },
          { label: 'D', text: 'info-rahasia-sekolah.fun' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Domain .sch.id hanya diberikan kepada sekolah resmi berizin Kemendikbud.'
      },
      {
        id: 4,
        scenario: 'Lawan melancarkan serangan "Sumber Palsu" dengan mencantumkan "Sumber: Google" di tugas makalah.',
        question: 'Mengapa serangan ini gagal dan ditolak oleh Guru Informatika?',
        options: [
          { label: 'A', text: 'Google adalah mesin pencari, bukan penulis atau pemilik asli artikel' },
          { label: 'B', text: 'Google berbayar Rp 100.000 per klik' },
          { label: 'C', text: 'Google tidak boleh dibuka di hari Senin' },
          { label: 'D', text: 'Google hanya berisi peta jalan' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Sitasi yang sah harus mencantumkan nama penulis, judul artikel, dan situs pembuatnya.'
      },
      {
        id: 5,
        scenario: 'Bos Robot Clickbait mengeluarkan jurus pop-up penuh iklan judi dan obat peninggi badan.',
        question: 'Langkah pamungkas apa yang menunjukkan kecakapan literasi digital siswa SMP?',
        options: [
          { label: 'A', text: 'Segera menutup tab situs tersebut dan mencari referensi di portal edukasi terpercaya' },
          { label: 'B', text: 'Mengeklik semua iklan yang berkedip' },
          { label: 'C', text: 'Memasukkan nomor rekening orang tua' },
          { label: 'D', text: 'Membiarkan laptop terbuka sepanjang malam' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Situs penuh pop-up iklan komersial agresif menandakan situs berkualitas rendah dan rawan malware.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'KREDIBEL',
        scrambled: 'B E L D I K E R',
        clue: 'Sifat suatu sumber informasi yang dapat dipercaya dan diakui kebenarannya.',
        dailyContext: 'Saat mencari artikel tugas IPA di internet, kamu harus memilih situs yang...'
      },
      {
        id: 2,
        word: 'KEYWORD',
        scrambled: 'D R O W Y E K',
        clue: 'Kata kunci pencarian yang diketik di mesin pencari Google.',
        dailyContext: 'Agar tugas cepat ketemu, Budi mengetikkan ... yang tepat di kolom pencarian.'
      },
      {
        id: 3,
        word: 'DOMAIN',
        scrambled: 'N A M O I D',
        clue: 'Nama alamat resmi suatu website, misalnya .sch.id atau .go.id.',
        dailyContext: 'Situs resmi sekolah SMP Negeri 5 Kroya menggunakan akhiran ... sch.id.'
      },
      {
        id: 4,
        word: 'DIGITAL',
        scrambled: 'L A T I G I D',
        clue: 'Bentuk informasi dalam format elektronik berupa kode biner di HP/komputer.',
        dailyContext: 'Foto tugas, rekaman suara guru, dan modul PDF termasuk informasi...'
      },
      {
        id: 5,
        word: 'SITASI',
        scrambled: 'T I S I A S',
        clue: 'Mencantumkan sumber rujukan penulis secara jujur di akhir laporan tugas.',
        dailyContext: 'Agar tidak menjiplak (plagiat), Siti menuliskan ... buku referensinya.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Situs Resmi Sekolah (.sch.id)',
        clue: 'Ikon perisai centang hijau dengan alamat domain resmi sekolah berizin Kemendikbud.',
        dailyContext: 'Tempat paling aman untuk mengecek pengumuman libur semester SMPN 5 Kroya.',
        iconName: 'ShieldCheck',
        visualTag: 'Domain .sch.id',
        options: ['Situs Resmi Sekolah', 'Blog Gratisan', 'Status Medsos', 'Email Spam'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Artikel Umpan Klik (Clickbait)',
        clue: 'Tanda seru merah besar dengan judul heboh: "KAGET! SEMUA SISWA SMP MENANGIS!".',
        dailyContext: 'Judul berlebihan yang sengaja dibuat untuk memancing klik iklan semata.',
        iconName: 'AlertTriangle',
        visualTag: 'Judul Clickbait',
        options: ['Artikel Clickbait', 'Jurnal Ilmiah', 'Buku Paket', 'Kamus Resmi'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Modul Digital PDF',
        clue: 'Ikon dokumen buku digital berwarna merah dengan teks yang rapi dan terstruktur.',
        dailyContext: 'Bahan bacaan Informatika yang dikirim Bapak Guru ke HP peserta didik.',
        iconName: 'FileText',
        visualTag: 'Dokumen E-Book',
        options: ['Teks Digital / PDF', 'Rekaman Suara', 'Koran Kertas Bekas', 'Kaset Pita'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Gembok Keamanan Web (HTTPS)',
        clue: 'Simbol gembok hijau terkunci di samping kolom alamat URL browser.',
        dailyContext: 'Menandakan koneksi data antara HP-mu dan server website terenkripsi dengan aman.',
        iconName: 'Lock',
        visualTag: 'Protokol HTTPS',
        options: ['Koneksi Aman HTTPS', 'Peringatan Virus', 'Baterai Lemah', 'Mode Pesawat'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Podcast Edukasi (Audio Digital)',
        clue: 'Headphone dan gelombang suara suara rekaman guru menjelaskan materi.',
        dailyContext: 'Mendengarkan materi penjelasan pelajaran sambil beristirahat di rumah.',
        iconName: 'Headphones',
        visualTag: 'Audio Digital',
        options: ['Audio Digital / Podcast', 'Video Animasi', 'Poster Cetak', 'Batu Prasasti'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'c1',
        title: 'Portal Kemendikbudristek (kemdikbud.go.id)',
        description: 'Situs resmi pemerintah memuat kurikulum, silabus, dan buku teks resmi.',
        iconType: 'Building2',
        correctCategory: 'Sumber Terpercaya',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'c2',
        title: 'Blogspot Tanpa Nama: "Cara Cepat Kaya"',
        description: 'Artikel anonim tanpa pengarang dengan judul heboh dan link belanja mencurigakan.',
        iconType: 'AlertOctagon',
        correctCategory: 'Sumber Meragukan',
        color: 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
      },
      {
        id: 'c3',
        title: 'Website SMP Negeri 5 Kroya (smpn5kroya.sch.id)',
        description: 'Portal resmi sekolah yang dikelola oleh tim guru dan tenaga kependidikan.',
        iconType: 'School',
        correctCategory: 'Sumber Terpercaya',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'c4',
        title: 'Pesan Berantai WhatsApp: "Forward ke 20 Orang!"',
        description: 'Pesan broadcast tanpa sumber jelas yang mengancam jika tidak dibagikan.',
        iconType: 'MessageSquareWarning',
        correctCategory: 'Sumber Meragukan',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      },
      {
        id: 'c5',
        title: 'Kamus Besar Bahasa Indonesia (kbbi.kemdikbud.go.id)',
        description: 'Rujukan resmi kosakata baku bahasa Indonesia oleh Badan Bahasa.',
        iconType: 'BookOpenCheck',
        correctCategory: 'Sumber Terpercaya',
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300'
      },
      {
        id: 'c6',
        title: 'Akun TikTok Anonim: "Bocoran Jawaban Ujian 100%"',
        description: 'Video potongan suara robot tanpa identitas yang meminta transfer pulsa.',
        iconType: 'SmartphoneNfc',
        correctCategory: 'Sumber Meragukan',
        color: 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300'
      }
    ],
    simulationCategories: ['Sumber Terpercaya', 'Sumber Meragukan']
  },

  // ==========================================
  // KELAS 7 - BERPIKIR KOMPUTASIONAL
  // ==========================================
  'k7-bk': {
    battleBot: [
      {
        id: 1,
        scenario: 'Robot sedang menghadapi tumpukan buku perpustakaan yang berantakan di SMPN 5 Kroya.',
        question: 'Pilar Berpikir Komputasional manakah yang memecah tugas besar ini menjadi menyusun buku IPA, Matematika, dan Bahasa?',
        options: [
          { label: 'A', text: 'Dekomposisi (Memecah masalah besar jadi bagian kecil)' },
          { label: 'B', text: 'Pengenalan Pola' },
          { label: 'C', text: 'Abstraksi' },
          { label: 'D', text: 'Algoritma' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Dekomposisi adalah teknik memecah masalah kompleks menjadi sub-masalah yang lebih mudah dikerjakan.'
      },
      {
        id: 2,
        scenario: 'Lawan mengeluarkan kode acak berulang: 2, 4, 6, 8, 10, ...',
        question: 'Pilar apakah yang digunakan Robot untuk mengenali bahwa ini adalah bilangan genap kelipatan 2?',
        options: [
          { label: 'A', text: 'Pengenalan Pola (Pattern Recognition)' },
          { label: 'B', text: 'Dekomposisi' },
          { label: 'C', text: 'Abstraksi' },
          { label: 'D', text: 'Format Harddisk' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Pengenalan pola mencari kesamaan atau tren dalam data.'
      },
      {
        id: 3,
        scenario: 'Saat membuat denah rute dari rumah ke SMPN 5 Kroya, detail warna cat rumah tetangga diabaikan.',
        question: 'Fokus hanya pada jalan utama dan persimpangan penting merupakan penerapan dari...',
        options: [
          { label: 'A', text: 'Abstraksi (Menyaring informasi penting dan membuang yang tak relevan)' },
          { label: 'B', text: 'Dekomposisi' },
          { label: 'C', text: 'Pengenalan Pola' },
          { label: 'D', text: 'Algoritma' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Abstraksi menyaring hal-hal yang tidak penting agar fokus pada inti masalah.'
      },
      {
        id: 4,
        scenario: 'Resep membuat teh manis hangat: 1. Rebus air, 2. Masukkan teh, 3. Tambah gula, 4. Aduk.',
        question: 'Langkah terurut dan sistematis dari awal sampai akhir ini disebut...',
        options: [
          { label: 'A', text: 'Algoritma (Urutan langkah terstruktur menyelesaikan masalah)' },
          { label: 'B', text: 'Abstraksi' },
          { label: 'C', text: 'Dekomposisi' },
          { label: 'D', text: 'Restart HP' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Algoritma adalah deretan instruksi prosedural yang logis dan terurut.'
      },
      {
        id: 5,
        scenario: 'Bos Robot Error menyerang dengan algoritma terbalik: meminum teh sebelum air direbus!',
        question: 'Apa akibat jika suatu algoritma tidak disusun secara runtut dan benar?',
        options: [
          { label: 'A', text: 'Tujuan gagal tercapai dan komputer menghasilkan kesalahan (error)' },
          { label: 'B', text: 'Komputer menjadi lebih pintar' },
          { label: 'C', text: 'Listrik sekolah mati' },
          { label: 'D', text: 'Teh menjadi es krim' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Komputer memerlukan instruksi terurut yang presisi agar berjalan dengan benar.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'ALGORITMA',
        scrambled: 'A T M I R O G L A',
        clue: 'Urutan langkah logis dan terstruktur untuk menyelesaikan suatu masalah.',
        dailyContext: 'Seperti resep memasak mi instan dari membuka bungkus sampai menyajikan.'
      },
      {
        id: 2,
        word: 'ABSTRAKSI',
        scrambled: 'S I K A R T S B A',
        clue: 'Mengabaikan hal tidak penting dan fokus pada informasi utama saja.',
        dailyContext: 'Melihat peta jalur bus sekolah tanpa peduli warna genteng rumah di pinggir jalan.'
      },
      {
        id: 3,
        word: 'POLA',
        scrambled: 'L O P A',
        clue: 'Bentuk kesamaan atau keteraturan yang berulang dalam data.',
        dailyContext: 'Menebak jam datang kereta api di Stasiun Kroya berdasarkan jadwal harian.'
      },
      {
        id: 4,
        word: 'LOGIKA',
        scrambled: 'A K I G O L',
        clue: 'Cara berpikir lurus, tepat, dan masuk akal.',
        dailyContext: 'Membantu siswa memecahkan teka-teki praktikum Informatika.'
      },
      {
        id: 5,
        word: 'MASALAH',
        scrambled: 'S A L A M A H',
        clue: 'Kondisi yang memerlukan solusi pemecahan komputasional.',
        dailyContext: 'Tumpukan tugas yang ingin diatur jadwal penyelesaiannya secara rapi.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Dekomposisi Masalah',
        clue: 'Ikon kotak besar yang dipecah rapi menjadi 4 kubus kecil yang teratur.',
        dailyContext: 'Membagi tugas kelompok: ada yang mencari materi, mendesain slide, dan presentasi.',
        iconName: 'LayoutGrid',
        visualTag: 'Dekomposisi',
        options: ['Dekomposisi', 'Abstraksi', 'Pengenalan Pola', 'Coding'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Pengenalan Pola',
        clue: 'Ikon sidik jari digital dengan garis kurva khas yang berulang dan cocok.',
        dailyContext: 'Mengenali kebiasaan jam belajar teman agar bisa belajar kelompok bersama.',
        iconName: 'Fingerprint',
        visualTag: 'Pattern Recognition',
        options: ['Pengenalan Pola', 'Dekomposisi', 'Reset Komputer', 'Hapus File'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Diagram Alur Algoritma',
        clue: 'Bagan panah alur bertingkat dari Start -> Langkah 1 -> Langkah 2 -> Finish.',
        dailyContext: 'Petunjuk praktikum merakit robot sederhana di lab Informatika.',
        iconName: 'GitBranch',
        visualTag: 'Flowchart Algoritma',
        options: ['Algoritma / Flowchart', 'Abstraksi', 'Data Grafis', 'Peta Buta'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Penyaringan Data (Abstraksi)',
        clue: 'Ikon corong filter yang menyaring kerikil kotoran dan menghasilkan air jernih.',
        dailyContext: 'Menyusun rangkuman catatan hanya poin-poin terpenting sebelum ujian.',
        iconName: 'Filter',
        visualTag: 'Abstraksi',
        options: ['Abstraksi', 'Algoritma', 'Dekomposisi', 'Pola'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Solusi Terprogram',
        clue: 'Ikon lampu bohlam menyala terang di atas roda gigi mesin teknologi.',
        dailyContext: 'Menemukan cara tercepat menghitung rata-rata nilai sekelas menggunakan rumus.',
        iconName: 'Lightbulb',
        visualTag: 'Solusi Cerdas',
        options: ['Solusi Masalah', 'Error Sistem', 'Virus Komputer', 'Kabel Putus'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'bk-1',
        title: 'Membagi Tugas Piket Kelas (Menyapu, Mengepel, Menghapus Papan)',
        description: 'Memecah tanggung jawab kebersihan kelas menjadi tugas-tugas spesifik tiap siswa.',
        iconType: 'Split',
        correctCategory: 'Dekomposisi',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'bk-2',
        title: 'Melihat Jadwal Pelajaran Berulang Setiap Hari Senin',
        description: 'Mengenali bahwa upacara bendera dan mapel Informatika selalu ada di hari Senin.',
        iconType: 'Repeat',
        correctCategory: 'Pengenalan Pola',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'bk-3',
        title: 'Hanya Menggambar Garis Jalan pada Denah Undangan Ulang Tahun',
        description: 'Mengabaikan gambar warung dan pohon agar tamu mudah membaca arah jalan.',
        iconType: 'MapPin',
        correctCategory: 'Abstraksi',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      },
      {
        id: 'bk-4',
        title: 'Urutan Menyalakan Komputer: Sambung Listrik -> Tombol CPU -> Tombol Monitor',
        description: 'Langkah berurutan wajib agar komputer menyala normal tanpa korsleting.',
        iconType: 'Power',
        correctCategory: 'Algoritma',
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
      }
    ],
    simulationCategories: ['Dekomposisi', 'Pengenalan Pola', 'Abstraksi', 'Algoritma']
  },
  ...EXTRA_TOPIC_GAMES
};

/**
 * Fallback generator so every single topic in Class 7, 8, 9 gets 5 questions per game!
 */
function getRawTopicGamePack(topicId: string, topicTitle: string, grade: number): TopicGamePack {
  if (TOPIC_GAMES_REGISTRY[topicId]) {
    return TOPIC_GAMES_REGISTRY[topicId];
  }

  // Smart mapping by title keywords to ensure exact topic match
  const titleLower = topicTitle.toLowerCase();
  if (titleLower.includes('komputer') || titleLower.includes('hardware') || titleLower.includes('perangkat keras')) {
    return TOPIC_GAMES_REGISTRY['k7-komputer'];
  }
  if (titleLower.includes('browser') || titleLower.includes('search') || titleLower.includes('mesin pencari') || titleLower.includes('url')) {
    return TOPIC_GAMES_REGISTRY['k7-bse'];
  }
  if (titleLower.includes('jaringan') || titleLower.includes('lan') || titleLower.includes('topologi')) {
    return TOPIC_GAMES_REGISTRY['k8-jaringan'];
  }
  if (titleLower.includes('excel') || titleLower.includes('spreadsheet') || titleLower.includes('lembar kerja') || titleLower.includes('rumus')) {
    return TOPIC_GAMES_REGISTRY['k8-excel'];
  }
  if (titleLower.includes('pemrograman') || titleLower.includes('coding') || titleLower.includes('algoritma game')) {
    return TOPIC_GAMES_REGISTRY['k9-pemrograman'];
  }
  if (titleLower.includes('keamanan') || titleLower.includes('siber') || titleLower.includes('password') || titleLower.includes('sandi')) {
    return TOPIC_GAMES_REGISTRY['k9-keamanan-digital'];
  }
  if (titleLower.includes('koneksi') || titleLower.includes('bluetooth') || titleLower.includes('tethering')) {
    return TOPIC_GAMES_REGISTRY['k8-koneksi'];
  }
  if (titleLower.includes('fakta') || titleLower.includes('opini') || titleLower.includes('hoaks')) {
    return TOPIC_GAMES_REGISTRY['k8-fakta-hoaks'];
  }
  if (titleLower.includes('dokumen') || titleLower.includes('docs') || titleLower.includes('pengolah kata')) {
    return TOPIC_GAMES_REGISTRY['k7-gdoc'];
  }
  if (titleLower.includes('informasi digital') || titleLower.includes('kredibilitas')) {
    return TOPIC_GAMES_REGISTRY['k7-idk'];
  }
  if (titleLower.includes('komputasional') || titleLower.includes('dekomposisi')) {
    return TOPIC_GAMES_REGISTRY['k7-bk'];
  }

  // Realistic contextual generation for any other topic
  return {
    battleBot: [
      {
        id: 1,
        scenario: `Robot Pembelajar menghadapi tantangan pemahaman materi "${topicTitle}".`,
        question: `Dalam kehidupan sehari-hari siswa kelas ${grade}, pemahaman materi ini sangat berguna untuk...`,
        options: [
          { label: 'A', text: 'Menyelesaikan tugas sekolah secara kritis, mandiri, dan bertanggung jawab' },
          { label: 'B', text: 'Bermain game online sampai larut malam' },
          { label: 'C', text: 'Menghindari belajar di sekolah' },
          { label: 'D', text: 'Menghapus data penting teman sekelas' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Mempelajari konsep Informatika melatih nalar kritis dan pemecahan masalah.'
      },
      {
        id: 2,
        scenario: `Robot Lawan mengirimkan data yang tidak teratur dan belum terverifikasi.`,
        question: `Langkah terbaik yang dilakukan siswa berkarakter Profil Lulusan Kemendikdasmen adalah...`,
        options: [
          { label: 'A', text: 'Menganalisis dan memilah informasi dengan teliti sebelum digunakan' },
          { label: 'B', text: 'Langsung menyebarkan tanpa membaca isinya' },
          { label: 'C', text: 'Menyalahkan teman sekelas' },
          { label: 'D', text: 'Mematikan layar komputer' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Sikap teliti dan kritis adalah kunci keberhasilan belajar teknologi.'
      },
      {
        id: 3,
        scenario: `Tantangan kolaborasi tim praktikum Informatika di SMP Negeri 5 Kroya.`,
        question: `Bagaimana cara tim membagi peran agar simulasi berhasil dengan nilai maksimal?`,
        options: [
          { label: 'A', text: 'Berdiskusi bersama, berbagi tugas sesuai keahlian, dan saling membantu' },
          { label: 'B', text: 'Menyerahkan semua pekerjaan hanya kepada satu ketua kelompok' },
          { label: 'C', text: 'Bermusuhan dan saling mengejek' },
          { label: 'D', text: 'Tidur di ruang kelas' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Kerja sama tim yang solid menghasilkan karya inovasi yang hebat!'
      },
      {
        id: 4,
        scenario: `Muncul gangguan sinyal error pada sistem robot digital.`,
        question: `Pemeriksaan pertama yang harus dilakukan sesuai prosedur pemecahan masalah adalah...`,
        options: [
          { label: 'A', text: 'Mengecek alur instruksi langkah demi langkah dari kondisi awal' },
          { label: 'B', text: 'Memukul perangkat komputer' },
          { label: 'C', text: 'Mencabut semua kabel secara paksa' },
          { label: 'D', text: 'Menghapus sistem operasi' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Debugging komputasional dilakukan secara tenang dan sistematis.'
      },
      {
        id: 5,
        scenario: `Pertempuran akhir melawan Bos Ketidaktahuan!`,
        question: `Kunci utama menjadi siswa yang cerdas dan beretika di era digital adalah...`,
        options: [
          { label: 'A', text: 'Menggunakan teknologi untuk kebaikan, terus belajar, dan berakhlak mulia' },
          { label: 'B', text: 'Memamerkan kecanggihan gadget di media sosial' },
          { label: 'C', text: 'Menggunakan internet untuk mencurangi ujian' },
          { label: 'D', text: 'Menolak semua perkembangan teknologi baru' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Teknologi adalah alat, tetapi budi pekerti dan integritas adalah yang utama!'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'INFORMATIKA',
        scrambled: 'A T I K A M R O F N I',
        clue: 'Ilmu mengenai pengolahan data dan teknologi komputasi.',
        dailyContext: 'Mata pelajaran asyik di SMP Negeri 5 Kroya yang dipandu Bapak Rifani.'
      },
      {
        id: 2,
        word: 'KOLABORASI',
        scrambled: 'I S A R O B A L O K',
        clue: 'Bekerja sama dalam tim untuk mencapai tujuan tugas bersama.',
        dailyContext: 'Mengerjakan proyek presentasi bersama teman sebangku di lab komputer.'
      },
      {
        id: 3,
        word: 'INOVASI',
        scrambled: 'I S A V O N I',
        clue: 'Penciptaan ide baru yang bermanfaat untuk mempermudah hidup.',
        dailyContext: 'Membuat media pembelajaran interaktif yang seru di layar sentuh IFP.'
      },
      {
        id: 4,
        word: 'KOMPUTASI',
        scrambled: 'I S A T U P M O K',
        clue: 'Proses perhitungan dan pengolahan data secara otomatis oleh mesin.',
        dailyContext: 'Kemampuan berpikir logis untuk memecahkan soal-soal matematika dan logika.'
      },
      {
        id: 5,
        word: 'INTERAKTIF',
        scrambled: 'F I T K A R E T N I',
        clue: 'Sifat media belajar yang saling merespons aksi sentuhan pengguna.',
        dailyContext: 'Tombol yang ditekan langsung bersuara dan menghitung skor otomatis.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Komputer & Laptop Edukasi',
        clue: 'Perangkat teknologi utama untuk mengetik tugas dan belajar coding.',
        dailyContext: 'Digunakan siswa di laboratorium komputer SMPN 5 Kroya.',
        iconName: 'Laptop',
        visualTag: 'Hardware Komputer',
        options: ['Laptop / Komputer', 'Radio Kuno', 'Televisi Hitam Putih', 'Papan Tulis'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Layar Sentuh Interaktif (IFP)',
        clue: 'Layar lebar canggih di depan kelas yang bisa disentuh dengan jari oleh banyak siswa.',
        dailyContext: 'Media pembelajaran masa kini untuk simulasi dan kuis bareng di kelas.',
        iconName: 'Tv',
        visualTag: 'Interactive Flat Panel',
        options: ['Layar Sentuh IFP', 'Spidol Biasa', 'Kapur Tulis', 'Koran Bekas'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Jaringan Internet & Wi-Fi',
        clue: 'Gelombang nirkabel yang menghubungkan seluruh dunia dalam sekejap.',
        dailyContext: 'Digunakan untuk mencari materi riset perpustakaan digital.',
        iconName: 'Wifi',
        visualTag: 'Koneksi Wi-Fi',
        options: ['Wi-Fi / Internet', 'Kabel Tali Rafia', 'Senter', 'Kamera Analog'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Piala Prestasi Belajar',
        clue: 'Lambang penghargaan emas bagi siswa yang tekun dan tuntas belajar.',
        dailyContext: 'Hasil dari ketekunan mengerjakan asesmen dan kuis Informatika.',
        iconName: 'Trophy',
        visualTag: 'Prestasi Juara',
        options: ['Prestasi Belajar', 'Kartu Merah', 'Peringatan Denda', 'Error Sistem'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Robot Edukasi Cerdas',
        clue: 'Karakter robot sahabat siswa yang membantu menjawab pertanyaan belajar.',
        dailyContext: 'Ikon maskot SMART INFORMATIKA.',
        iconName: 'Bot',
        visualTag: 'Robot Edukasi',
        options: ['Robot Edukasi', 'Mesin Jahit', 'Mobil Mogok', 'Kipas Angin'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'gen-1',
        title: `Konsep Dasar: ${topicTitle}`,
        description: 'Pahami definisi inti dan fungsi utama konsep ini.',
        iconType: 'Lightbulb',
        correctCategory: 'Konsep Inti',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'gen-2',
        title: 'Penerapan di Kehidupan Nyata',
        description: 'Digunakan saat mengoperasikan perangkat dan aplikasi sehari-hari.',
        iconType: 'Sparkles',
        correctCategory: 'Penerapan Nyata',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'gen-3',
        title: 'Etika & Keamanan Penggunaan',
        description: 'Selalu bersikap sopan, berhati-hati, dan menjaga data pribadi.',
        iconType: 'ShieldCheck',
        correctCategory: 'Etika & Keamanan',
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
      },
      {
        id: 'gen-4',
        title: 'Kesalahan Umum yang Dihindari',
        description: 'Tindakan gegabah tanpa membaca petunjuk instruksi terlebih dahulu.',
        iconType: 'AlertTriangle',
        correctCategory: 'Hindari Kesalahan',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      }
    ],
    simulationCategories: ['Konsep Inti', 'Penerapan Nyata', 'Etika & Keamanan', 'Hindari Kesalahan']
  };
}

/**
 * Public accessor that returns topic game packs with randomized answer choices
 */
export function getTopicGamePack(topicId: string, topicTitle: string, grade: number): TopicGamePack {
  const rawPack = getRawTopicGamePack(topicId, topicTitle, grade);
  const raceQuestions = getTopicRobotRaceQuestions(topicId, topicTitle, grade);
  return randomizeTopicGamePack(
    {
      ...rawPack,
      robotRace: raceQuestions
    },
    topicId
  );
}
