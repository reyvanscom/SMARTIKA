import { Topic, Grade } from '../types/curriculum';
import { TOPICS as BASE_TOPICS } from './curriculumData';
import { ADDITIONAL_TOPICS } from './moreTopics';
import { COMPREHENSIVE_TOPICS } from './moreCurriculumTopics';
import { GRADE_FINAL_TOPICS } from './gradeFinalTopics';
import { RUANG_PUBLIK_VIRTUAL_TOPIC } from './ruangPublikVirtualTopic';
import { REKAM_JEJAK_DIGITAL_TOPIC } from './rekamJejakDigitalTopic';
import { randomizeTopicQuestions } from '../utils/questionRandomizer';

// Additional topics for full curriculum coverage
const REMAINING_TOPICS: Topic[] = [
  // KELAS 7 - Google Dokumen
  {
    id: 'k7-gdoc',
    grade: 7,
    title: 'Aplikasi Pengolah Dokumen – Google Dokumen',
    category: 'Teknologi Informasi dan Komunikasi (TIK)',
    shortDesc: 'Menyusun dokumen teks rapi, memformat paragraf, kolaborasi penulisan naskah bersama, dan manajemen riwayat versi dokumen.',
    learningObjectives: [
      'Memahami fitur antarmuka dan fungsi pengolah kata Google Dokumen.',
      'Memformat teks: font, heading hierarki, perataan paragraf, dan spasi.',
      'Menyisipkan tabel, gambar ilustrasi, dan daftar berbutir/bernomor.',
      'Menerapkan kolaborasi online dengan fitur komentar dan saran revisi.'
    ],
    apersepsi: {
      imagePromptDesc: 'Dua siswa SMP sedang mengetik naskah laporan bersama di laptop dengan kursor warna-warni yang bergerak berdampingan.',
      videoTitle: 'Tutorial Google Docs - Cara Memulai Menggunakan Google Dokumen',
      videoDuration: '04:15',
      videoThumbnail: 'https://i.ytimg.com/vi/4iX8gMugOgw/hqdefault.jpg',
      videoDescription: 'Melihat proses pembuatan dokumen kolaboratif di mana setiap anggota tim mengedit bagian tugasnya secara simultan di cloud.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=4iX8gMugOgw',
      realLifeStory: 'Regu Pramuka SMPN 5 Kroya sedang membuat proposal perkemahan sabtu-minggu. Anggota regu tinggal di desa yang berbeda-beda. Dulu, mereka harus saling meminjam flashdisk sehingga sering tertukar file mana yang paling baru (proposal_final, proposal_final_banget_revisi2). Sekarang dengan Google Docs, mereka menulis bersama di satu dokumen sambil berdiskusi lewat kolom komentar. Apa keuntungan terbesarnya?',
      triggerQuestions: [
        'Mengapa menggunakan gaya judul (Heading 1, Heading 2) jauh lebih baik dibanding sekadar memperbesar ukuran font secara manual?',
        'Bagaimana cara memulihkan tulisan yang terhapus kemarin di Google Dokumen?',
        'Apa bedanya membagikan dokumen dengan izin "Pengakses lihat-saja" (Viewer) dibanding "Editor"?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Pintasan keyboard untuk menebalkan teks yang dipilih pada pengolah dokumen adalah...',
        options: [
          { label: 'A', text: 'Ctrl + B' },
          { label: 'B', text: 'Ctrl + I' },
          { label: 'C', text: 'Ctrl + U' },
          { label: 'D', text: 'Ctrl + S' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Format Teks',
        recommendation: 'Ctrl + B (Bold) untuk menebalkan huruf.'
      },
      {
        id: 2,
        question: 'Pengaturan perataan paragraf yang membuat baris teks rata di sisi kiri dan sisi kanan sekaligus adalah...',
        options: [
          { label: 'A', text: 'Justify (Rata Kiri-Kanan)' },
          { label: 'B', text: 'Align Left' },
          { label: 'C', text: 'Center' },
          { label: 'D', text: 'Align Right' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Perataan Teks',
        recommendation: 'Justify meratakan teks di kedua margin.'
      },
      {
        id: 3,
        question: 'Fitur yang secara otomatis membuat daftar isi terstruktur berdasarkan judul bab dan sub-bab adalah...',
        options: [
          { label: 'A', text: 'Heading Styles (Gaya Judul)' },
          { label: 'B', text: 'WordArt' },
          { label: 'C', text: 'Emoji' },
          { label: 'D', text: 'Watermark' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Daftar Isi Otomatis',
        recommendation: 'Gunakan Heading 1, 2, 3 untuk hierarki bab dan daftar isi.'
      },
      {
        id: 4,
        question: 'Fitur yang memungkinkan orang lain memberikan masukan perbaikan tanpa langsung mengubah naskah asli penulis adalah...',
        options: [
          { label: 'A', text: 'Mode Saran (Suggesting) & Komentar' },
          { label: 'B', text: 'Cut & Delete' },
          { label: 'C', text: 'Format Clear' },
          { label: 'D', text: 'Print' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Mode Saran',
        recommendation: 'Mode Suggesting sangat aman untuk revisi editorial.'
      },
      {
        id: 5,
        question: 'Di mana file Google Dokumen tersimpan saat kita sedang mengetik?',
        options: [
          { label: 'A', text: 'Tersimpan otomatis di Google Drive cloud' },
          { label: 'B', text: 'Di dalam baterai laptop' },
          { label: 'C', text: 'Di dalam kabel monitor' },
          { label: 'D', text: 'Hanya di kertas printer' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Cloud Storage',
        recommendation: 'Google Docs autosave langsung ke cloud drive.'
      }
    ],
    materi: {
      overview: 'Google Dokumen adalah aplikasi pengolah kata berbasis cloud dari Google yang mendukung pembuatan, pengeditan, pemformatan, dan kolaborasi dokumen teks secara real-time tanpa risiko kehilangan data.',
      keyConcepts: [
        {
          title: '1. Pemformatan Teks dan Paragraf Terstandar',
          explanation: 'Membuat dokumen resmi yang mudah dibaca dan berstandar profesional.',
          bulletPoints: [
            'Font: Gunakan font formal (Arial, Times New Roman, atau Plus Jakarta Sans) ukuran 11-12pt.',
            'Spasi Baris: Spasi 1.15 atau 1.5 untuk kenyamanan mata pembaca.',
            'Heading: Terapkan Heading 1 untuk Judul Bab, Heading 2 untuk Sub-bab.'
          ],
          iconName: 'FileText'
        },
        {
          title: '2. Penyisipan Elemen Visual (Tabel & Gambar)',
          explanation: 'Memperkaya dokumen dengan representasi visual dan data matriks.',
          bulletPoints: [
            'Tabel: Mengatur data perbandingan baris dan kolom.',
            'Gambar: Menata pembungkus teks (Wrap Text) agar teks mengalir rapi di sekitar gambar.'
          ],
          iconName: 'Image'
        },
        {
          title: '3. Fitur Kolaborasi dan Riwayat Versi',
          explanation: 'Bekerja sama secara efisien dengan sesama siswa.',
          bulletPoints: [
            'Komentar: Menandai teks tertentu dan menyebut teman dengan "@nama".',
            'Riwayat Versi (Version History): Melihat siapa yang mengedit dan kapan revisi dilakukan.'
          ],
          iconName: 'Users'
        }
      ],
      comparisonTable: {
        title: 'Tingkatan Hak Akses Berbagi Google Dokumen',
        headers: ['Tingkat Akses', 'Kemampuan Pengguna', 'Waktu Penggunaan yang Tepat'],
        rows: [
          ['Viewer (Melihat)', 'Hanya membaca dan mencetak, tidak bisa mengedit atau berkomentar', 'Membagikan materi naskah final atau pengumuman resmi sekolah'],
          ['Commenter (Pemberi Komentar)', 'Bisa membaca dan memberi komentar/saran revisi, tidak bisa mengubah teks asli', 'Mengirim draf tugas ke guru untuk koreksi masukan'],
          ['Editor (Pengedit)', 'Bisa mengedit teks langsung, menambah/menghapus gambar dan tabel', 'Kerja kelompok aktif bersama teman sekelompok']
        ]
      },
      dailyLifeExamples: [
        'Menulis cerpen bersama teman sekelas untuk mading sekolah.',
        'Membuat surat undangan rapat pengurus OSIS SMPN 5 Kroya.'
      ],
      schoolExamples: [
        'Mengerjakan makalah proyek kokurikuler (Penguatan 8 Dimensi Profil Lulusan) secara kolaboratif.'
      ],
      tahukahKamu: 'Google Dokumen memiliki fitur Voice Typing (Dikte Suara). Kamu cukup berbicara di mikrofon, dan suaramu akan otomatis diubah menjadi ketikan teks dalam bahasa Indonesia!',
      faktaMenarik: 'Google Dokumen dapat mengunduh file dalam berbagai format: Microsoft Word (.docx), PDF (.pdf), hingga halaman web (.html) dengan sekali klik.',
      infoPenting: 'Hindari membuat seluruh dokumen menjadi huruf tebal atau warna-warni kontras tinggi karena membuat mata cepat lelah dan terkesan tidak profesional.',
      commonMistakes: [
        'Menekan tombol Enter berkali-kali untuk pindah ke halaman baru alih-alih menggunakan fitur "Insert Page Break" (Ctrl + Enter).',
        'Lupa mengatur hak akses berbagi sehingga saat link dikirimkan ke guru, guru tidak dapat membukanya.'
      ],
      summary: [
        'Format teks dengan hierarki Heading.',
        'Manfaatkan kolaborasi komentar dan riwayat versi.',
        'Atur izin berbagi (Viewer, Commenter, Editor) dengan tepat.'
      ],
      formativeCheck: [
        {
          question: 'Tombol pintasan apa yang paling tepat untuk berpindah ke halaman baru secara bersih tanpa menekan Enter berkali-kali?',
          options: ['Ctrl + Enter (Page Break)', 'Shift + Space', 'Alt + Tab', 'Ctrl + Z'],
          answerIndex: 0,
          explanation: 'Benar! Ctrl + Enter membuat Page Break sehingga teks bab berikutnya selalu berada di awal halaman baru.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Interaktif: Hak Akses Berbagi Dokumen',
      scenario: 'Pilih jenis izin berbagi yang paling tepat untuk 3 situasi di bawah ini!',
      instructions: 'Kelompokkan skenario ke tingkat izin: Viewer, Commenter, atau Editor.',
      data: {
        items: [
          { id: 'doc-1', text: 'Mengirim draf naskah tugas ke Guru untuk dinilai dan diberi masukan.', correctCategory: 'Commenter' },
          { id: 'doc-2', text: 'Bekerja bersama 3 teman regu menyusun proposal pentas seni.', correctCategory: 'Editor' },
          { id: 'doc-3', text: 'Membagikan jadwal ujian akhir ke seluruh siswa satu angkatan.', correctCategory: 'Viewer' }
        ],
        categories: ['Viewer', 'Commenter', 'Editor']
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Tebak Pintasan Keyboard Dokumen',
      description: 'Cocokkan pintasan keyboard dengan fungsinya di pengolah kata!',
      questions: [
        {
          id: 1,
          question: 'Pintasan untuk mencetak dokumen (Print) ke mesin pencetak adalah...',
          options: ['Ctrl + P', 'Ctrl + C', 'Ctrl + V', 'Ctrl + X'],
          correctIndex: 0,
          clue: 'P untuk Print.'
        },
        {
          id: 2,
          question: 'Pintasan untuk menyalin teks yang diblok (Copy) adalah...',
          options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + Z', 'Ctrl + A'],
          correctIndex: 0,
          clue: 'C untuk Copy.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Fungsi utama dari penggunaan Heading 1, Heading 2, dan Heading 3 adalah...',
        options: [
          { label: 'A', text: 'Membangun struktur hierarki dokumen yang rapi dan otomatis terbaca pada daftar isi' },
          { label: 'B', text: 'Mengubah warna monitor komputer' },
          { label: 'C', text: 'Menghapus dokumen secara otomatis' },
          { label: 'D', text: 'Mengunci koneksi internet' }
        ],
        correctAnswer: 'A',
        explanation: 'Heading styles menentukan struktur navigasi dan daftar isi otomatis dokumen.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Pintasan keyboard untuk menempelkan teks hasil salinan (Paste) adalah...',
        options: [
          { label: 'A', text: 'Ctrl + V' },
          { label: 'B', text: 'Ctrl + C' },
          { label: 'C', text: 'Ctrl + X' },
          { label: 'D', text: 'Ctrl + P' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + V adalah perintah Paste.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Jika kamu ingin melihat siapa yang mengedit dokumen pada jam 14.30 kemarin, fitur yang harus kamu buka adalah...',
        options: [
          { label: 'A', text: 'Riwayat Versi (Version History)' },
          { label: 'B', text: 'Pengaturan Cetak' },
          { label: 'C', text: 'Kotak Sampah' },
          { label: 'D', text: 'Pemeriksa Ejaan' }
        ],
        correctAnswer: 'A',
        explanation: 'Version History mencatat setiap suntingan dengan nama kontributor dan stempel waktu.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 4,
        question: 'Perataan paragraf "Align Center" (Rata Tengah) paling cocok digunakan untuk...',
        options: [
          { label: 'A', text: 'Judul dokumen, sampul makalah, atau puisi' },
          { label: 'B', text: 'Seluruh isi paragraf buku paket tebal' },
          { label: 'C', text: 'Daftar pustaka berbaris' },
          { label: 'D', text: 'Tabel data angka' }
        ],
        correctAnswer: 'A',
        explanation: 'Rata tengah ideal untuk judul utama atau bait puisi yang pendek.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Format file standar yang sering digunakan saat mengunduh dokumen agar tata letak dan tampilannya tidak berubah di semua perangkat adalah...',
        options: [
          { label: 'A', text: 'Portable Document Format (.pdf)' },
          { label: 'B', text: '.txt' },
          { label: 'C', text: '.zip' },
          { label: 'D', text: '.mp3' }
        ],
        correctAnswer: 'A',
        explanation: 'PDF mengunci tata letak visual di semua sistem operasi dan printer.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 6,
        question: 'Pintasan keyboard untuk membatalkan perintah salah terakhir (Undo) adalah...',
        options: [
          { label: 'A', text: 'Ctrl + Z' },
          { label: 'B', text: 'Ctrl + Y' },
          { label: 'C', text: 'Ctrl + S' },
          { label: 'D', text: 'Ctrl + A' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + Z adalah Undo.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Fitur "Word Count" pada pengolah dokumen menampilkan informasi tentang...',
        options: [
          { label: 'A', text: 'Jumlah kata, karakter, dan halaman dokumen' },
          { label: 'B', text: 'Harga laptop' },
          { label: 'C', text: 'Nama pemilik WiFi' },
          { label: 'D', text: 'Suhu baterai' }
        ],
        correctAnswer: 'A',
        explanation: 'Word Count menghitung statistik kata dan huruf.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 8,
        question: 'Bagaimana cara menambahkan catatan kaki (Footnote) yang berisi sumber kutipan di bagian bawah halaman?',
        options: [
          { label: 'A', text: 'Menu Sisipkan (Insert) -> Catatan Kaki (Footnote)' },
          { label: 'B', text: 'Mengetik angka manual di keyboard' },
          { label: 'C', text: 'Menggambar kotak di Paint' },
          { label: 'D', text: 'Menghapus halaman' }
        ],
        correctAnswer: 'A',
        explanation: 'Insert Footnote secara otomatis menomori dan menempatkan catatan kaki di margin bawah.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 9,
        question: 'Mengapa teks paragraf isi dokumen resmi sekolah sebaiknya menggunakan spasi baris 1.15 atau 1.5 daripada spasi tunggal 1.0 yang sangat rapat?',
        options: [
          { label: 'A', text: 'Meningkatkan kenyamanan membaca dan memudahkan pembaca menelusuri baris teks tanpa terlewat' },
          { label: 'B', text: 'Agar tinta printer cepat habis' },
          { label: 'C', text: 'Supaya ukuran file menjadi gigabyte' },
          { label: 'D', text: 'Agar teks menjadi bahasa asing' }
        ],
        correctAnswer: 'A',
        explanation: 'Line spacing yang proporsional meningkatkan keterbacaan (readability).',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Tindakan yang paling bijak saat menemukan kesalahan ketik pada naskah teman di dokumen bersama kelompok adalah...',
        options: [
          { label: 'A', text: 'Mengaktifkan mode "Saran" (Suggesting) atau meninggalkan komentar konstruktif yang sopan' },
          { label: 'B', text: 'Menghapus seluruh tulisan teman tanpa izin' },
          { label: 'C', text: 'Mengejek teman di media sosial' },
          { label: 'D', text: 'Keluar dari kelompok' }
        ],
        correctAnswer: 'A',
        explanation: 'Mode Suggesting dan komentar sopan mencerminkan etika kolaborasi digital positif.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Pintasan keyboard untuk memotong (Cut) teks yang dipilih adalah...',
        options: [
          { label: 'A', text: 'Ctrl + X' },
          { label: 'B', text: 'Ctrl + C' },
          { label: 'C', text: 'Ctrl + V' },
          { label: 'D', text: 'Ctrl + Z' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + X adalah pintasan Cut.',
        points: 10
      },
      {
        id: 2,
        question: 'Perataan teks yang menyamakan ujung baris kiri dan kanan disebut...',
        options: [
          { label: 'A', text: 'Justify' },
          { label: 'B', text: 'Left' },
          { label: 'C', text: 'Center' },
          { label: 'D', text: 'Right' }
        ],
        correctAnswer: 'A',
        explanation: 'Justify meratakan kedua sisi margin.',
        points: 10
      },
      {
        id: 3,
        question: 'Untuk menyisipkan batas halaman baru (Page Break), tombol pintasannya adalah...',
        options: [
          { label: 'A', text: 'Ctrl + Enter' },
          { label: 'B', text: 'Ctrl + Shift' },
          { label: 'C', text: 'Alt + Enter' },
          { label: 'D', text: 'Shift + Enter' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + Enter menyisipkan Page Break.',
        points: 10
      },
      {
        id: 4,
        question: 'Hak akses berbagi dokumen yang hanya mengizinkan membaca tanpa mengubah teks adalah...',
        options: [
          { label: 'A', text: 'Viewer' },
          { label: 'B', text: 'Editor' },
          { label: 'C', text: 'Owner' },
          { label: 'D', text: 'Administrator' }
        ],
        correctAnswer: 'A',
        explanation: 'Viewer hanya dapat melihat naskah.',
        points: 10
      },
      {
        id: 5,
        question: 'Format ekstensi file asli Microsoft Word yang kompatibel dengan Google Dokumen adalah...',
        options: [
          { label: 'A', text: '.docx' },
          { label: 'B', text: '.xlsx' },
          { label: 'C', text: '.pptx' },
          { label: 'D', text: '.mp4' }
        ],
        correctAnswer: 'A',
        explanation: '.docx adalah format dokumen Microsoft Word.',
        points: 10
      },
      {
        id: 6,
        question: 'Fitur "Header" pada halaman pengolah kata muncul di bagian...',
        options: [
          { label: 'A', text: 'Margin atas setiap halaman' },
          { label: 'B', text: 'Margin bawah setiap halaman' },
          { label: 'C', text: 'Tengah layar monitor' },
          { label: 'D', text: 'Hanya di halaman terakhir' }
        ],
        correctAnswer: 'A',
        explanation: 'Header berada di margin atas setiap lembar.',
        points: 10
      },
      {
        id: 7,
        question: 'Fitur "Footer" pada halaman pengolah kata muncul di bagian...',
        options: [
          { label: 'A', text: 'Margin bawah setiap halaman (biasanya untuk nomor halaman)' },
          { label: 'B', text: 'Pojok kiri atas' },
          { label: 'C', text: 'Di dalam tabel' },
          { label: 'D', text: 'Di luar dokumen' }
        ],
        correctAnswer: 'A',
        explanation: 'Footer berada di margin bawah untuk penomoran halaman.',
        points: 10
      },
      {
        id: 8,
        question: 'Daftar rincian yang ditandai dengan simbol titik atau lingkaran kecil disebut daftar...',
        options: [
          { label: 'A', text: 'Berbutir (Bulleted List)' },
          { label: 'B', text: 'Bernomor (Numbered List)' },
          { label: 'C', text: 'Tabel' },
          { label: 'D', text: 'Bagan' }
        ],
        correctAnswer: 'A',
        explanation: 'Bulleted list menggunakan simbol butir (bullet).',
        points: 10
      },
      {
        id: 9,
        question: 'Pintasan keyboard untuk memilih seluruh isi dokumen (Select All) adalah...',
        options: [
          { label: 'A', text: 'Ctrl + A' },
          { label: 'B', text: 'Ctrl + S' },
          { label: 'C', text: 'Ctrl + D' },
          { label: 'D', text: 'Ctrl + F' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + A memilih seluruh teks.',
        points: 10
      },
      {
        id: 10,
        question: 'Keuntungan utama menggunakan Google Dokumen untuk pembelajaran kolaboratif di SMP adalah...',
        options: [
          { label: 'A', text: 'Memungkinkan siswa belajar gotong royong menulis, mengoreksi, dan bertukar ide secara transparan' },
          { label: 'B', text: 'Mengharuskan siswa tidak saling bicara' },
          { label: 'C', text: 'Membuat nilai siswa otomatis bernilai 100 tanpa belajar' },
          { label: 'D', text: 'Menghapus tugas sekolah' }
        ],
        correctAnswer: 'A',
        explanation: 'Google Dokumen memfasilitasi kerja sama tim yang akuntabel dan kolaboratif.',
        points: 10
      }
    ]
  },

  // KELAS 8 - Microsoft Excel
  {
    id: 'k8-excel',
    grade: 8,
    title: 'Konsep Lembar Kerja Pengolah Data – Microsoft Excel',
    category: 'Analisis Data Tingkat Lanjut',
    shortDesc: 'Menguasai referensi sel relatif dan mutlak ($A$1), fungsi logika lanjutan IF bertingkat, dan pencarian data VLOOKUP/HLOOKUP.',
    learningObjectives: [
      'Membedakan referensi sel Relatif (A1) dan Referensi Mutlak/Absolut ($A$1).',
      'Menggunakan fungsi pencarian data =VLOOKUP() dan =HLOOKUP().',
      'Menerapkan fungsi logika IF bertingkat (Nested IF) untuk kriteria nilai.',
      'Membuat grafik data dan mengunci sel untuk akurasi formula saat disalin.'
    ],
    apersepsi: {
      imagePromptDesc: 'Lembar kerja spreadsheet profesional dengan tabel data terstruktur, rumus VLOOKUP aktif, dan grafik penjualan tren.',
      videoTitle: 'Belajar Excel dari Nol - Tutorial Rumus Excel Dasar Pemula',
      videoDuration: '05:20',
      videoThumbnail: 'https://i.ytimg.com/vi/6WgvzCU3TI8/hqdefault.jpg',
      videoDescription: 'Menemukan rahasia di balik rumus dan fungsi spreadsheet: bagaimana sel, formula, dan penguncian sel bekerja dengan akurat.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=6WgvzCU3TI8',
      realLifeStory: 'Koperasi Siswa SMPN 5 Kroya menjual 50 jenis alat tulis. Setiap ada pembelian, petugas harus menghitung harga setelah diskon 10%. Besaran persentase diskon disimpan di satu sel tertentu ($B$1). Ketika rumus disalin ke bawah tanpa tanda dolar ($), hasilnya menjadi rusak dan bernilai nol di baris kedua. Mengapa tanda dolar ($) pada rumus Excel begitu sakti?',
      triggerQuestions: [
        'Kapan kita wajib menambahkan tanda dolar ($) pada alamat sel dalam rumus Excel?',
        'Apa yang terjadi jika kita tidak mengunci sel acuan saat menarik fill handle ke bawah?',
        'Bagaimana fungsi =VLOOKUP() bisa menghemat waktu dibanding mencari nama siswa satu per satu secara manual?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Simbol yang digunakan di Microsoft Excel untuk mengunci baris atau kolom agar alamat sel tidak bergeser saat disalin adalah simbol...',
        options: [
          { label: 'A', text: 'Dolar ($)' },
          { label: 'B', text: 'Persen (%)' },
          { label: 'C', text: 'Bintang (*)' },
          { label: 'D', text: 'Pagar (#)' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Absolute Reference',
        recommendation: 'Tanda $ digunakan untuk absolute referencing (misal $A$1).'
      },
      {
        id: 2,
        question: 'Fungsi Excel yang digunakan untuk mencari data pada kolom pertama sebuah tabel referensi secara vertikal adalah...',
        options: [
          { label: 'A', text: '=VLOOKUP()' },
          { label: 'B', text: '=HLOOKUP()' },
          { label: 'C', text: '=SUM()' },
          { label: 'D', text: '=COUNT()' }
        ],
        correctAnswer: 'A',
        conceptTag: 'VLOOKUP',
        recommendation: 'VLOOKUP = Vertical Lookup.'
      },
      {
        id: 3,
        question: 'Tombol fungsi (F key) pada keyboard yang digunakan untuk mengubah referensi sel menjadi absolut ($) secara cepat adalah...',
        options: [
          { label: 'A', text: 'F4' },
          { label: 'B', text: 'F1' },
          { label: 'C', text: 'F5' },
          { label: 'D', text: 'F12' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Shortcut F4',
        recommendation: 'Tekan F4 untuk toggle tanda $ pada rumus Excel.'
      },
      {
        id: 4,
        question: 'Jika rumus di sel C1 adalah =A1+B1, lalu disalin (copy) ke sel C2, maka rumus di sel C2 akan berubah menjadi...',
        options: [
          { label: 'A', text: '=A2+B2' },
          { label: 'B', text: '=A1+B1' },
          { label: 'C', text: '=$A$1+$B$1' },
          { label: 'D', text: '=C1+C2' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Relative Reference',
        recommendation: 'Referensi relatif otomatis bergeser mengikuti perpindahan baris.'
      },
      {
        id: 5,
        question: 'Fungsi =HLOOKUP() digunakan untuk mencari data pada tabel yang disusun secara...',
        options: [
          { label: 'A', text: 'Horizontal (Mendatar per baris)' },
          { label: 'B', text: 'Vertikal (Tegak per kolom)' },
          { label: 'C', text: 'Diagonal' },
          { label: 'D', text: 'Acak' }
        ],
        correctAnswer: 'A',
        conceptTag: 'HLOOKUP',
        recommendation: 'HLOOKUP = Horizontal Lookup.'
      }
    ],
    materi: {
      overview: 'Microsoft Excel adalah aplikasi pengolah lembar kerja canggih yang dilengkapi fitur pemodelan data, referensi sel mutlak/relatif, analisis formula logika bertingkat, dan lookup tabel referensi.',
      keyConcepts: [
        {
          title: '1. Referensi Relatif vs Referensi Absolut ($)',
          explanation: 'Memahami bagaimana alamat sel berperilaku saat rumus disalin.',
          bulletPoints: [
            'Referensi Relatif (A1): Alamat sel otomatis bergeser menyesuaikan letak baris/kolom baru.',
            'Referensi Absolut Mutlak ($A$1): Alamat kolom dan baris dikunci permanen, tidak pernah bergeser.',
            'Referensi Semi-Absolut ($A1 atau A$1): Hanya kolom atau baris tertentu yang dikunci.'
          ],
          iconName: 'Lock'
        },
        {
          title: '2. Fungsi Pencarian =VLOOKUP()',
          explanation: 'Mencari nilai kunci pada kolom paling kiri dan mengambil nilai dari kolom ke-N pada baris yang sama.',
          bulletPoints: [
            'Sintaks: =VLOOKUP(nilai_kunci; tabel_referensi; indeks_kolom; [range_lookup])',
            'Gunakan FALSE atau 0 pada range_lookup untuk pencarian yang tepat sama (exact match).'
          ],
          iconName: 'Search'
        },
        {
          title: '3. Fungsi IF Bertingkat (Nested IF)',
          explanation: 'Menentukan predikat nilai berdasarkan rentang multi-kondisi.',
          bulletPoints: [
            'Contoh predikat nilai: =IF(C2>=90; "A"; IF(C2>=80; "B"; IF(C2>=70; "C"; "D")))'
          ],
          iconName: 'GitBranch'
        }
      ],
      comparisonTable: {
        title: 'Komparasi Jenis Referensi Sel di Excel',
        headers: ['Format Sel', 'Jenis Referensi', 'Jika Disalin ke Bawah', 'Jika Disalin ke Samping'],
        rows: [
          ['A1', 'Relatif Murni', 'Baris bertambah (A2, A3)', 'Kolom bertambah (B1, C1)'],
          ['$A$1', 'Absolut Mutlak', 'Tetap $A$1', 'Tetap $A$1'],
          ['$A1', 'Kolom Absolut, Baris Relatif', 'Baris bertambah ($A2, $A3)', 'Kolom tetap ($A1, $A1)'],
          ['A$1', 'Kolom Relatif, Baris Absolut', 'Baris tetap (A$1, A$1)', 'Kolom bertambah (B$1, C$1)']
        ]
      },
      dailyLifeExamples: [
        'Menghitung pajak PPN 11% yang tersimpan di satu sel acuan untuk 100 struk barang belanjaan.',
        'Mencari nama barang otomatis berdasarkan kode SKU di kasir minimarket.'
      ],
      schoolExamples: [
        'Menentukan predikat nilai rapor (Sangat Baik, Baik, Cukup, Kurang) menggunakan rumus IF bertingkat di buku nilai guru Informatika.'
      ],
      tahukahKamu: 'Satu lembar kerja (worksheet) Microsoft Excel modern memiliki kapasitas 1.048.576 baris dan 16.384 kolom, mampu menampung lebih dari 17 miliar sel data!',
      faktaMenarik: 'Formula VLOOKUP adalah salah satu formula yang paling banyak digunakan di dunia korporasi dan bisnis di seluruh dunia selama lebih dari 3 dekade.',
      infoPenting: 'Pada rumus VLOOKUP, nilai yang dicari (lookup_value) HARUS berada di kolom pertama dari rentang tabel referensi.',
      commonMistakes: [
        'Lupa mengunci tabel referensi pada VLOOKUP dengan tanda $ (misal $A$2:$D$50), sehingga saat rumus disalin ke bawah, tabel referensinya ikut tergeser ke bawah.',
        'Menggunakan TRUE alih-alih FALSE pada argumen pencarian eksak VLOOKUP.'
      ],
      summary: [
        'Tanda $ mengunci alamat sel agar tidak bergeser saat disalin.',
        'VLOOKUP mencari data vertikal dari tabel acuan.',
        'IF bertingkat memecahkan masalah evaluasi multi-kondisi.'
      ],
      formativeCheck: [
        {
          question: 'Jika rumus =$A$1 * B2 disalin dari sel C2 ke sel C3, rumus di sel C3 akan menjadi...',
          options: ['=$A$1 * B3', '=$A$2 * B3', '=A2 * B2', '=$A$1 * B2'],
          answerIndex: 0,
          explanation: 'Benar! $A$1 terkunci sehingga tetap $A$1, sedangkan B2 bertambah menjadi B3.'
        }
      ]
    },
    simulasi: {
      type: 'formula-tester',
      title: 'Lab Interaktif: Simulator VLOOKUP Kasir Koperasi Sekolah',
      scenario: 'Tabel Referensi: Kode BRG-01 = Buku Tulis (Rp 4.000), BRG-02 = Penggaris (Rp 2.500), BRG-03 = Pulpen (Rp 3.000). Uji formula VLOOKUP!',
      instructions: 'Pilih kode barang untuk melihat bagaimana formula =VLOOKUP() memanggil nama dan harga secara instan.',
      data: {
        table: [
          { kode: 'BRG-01', nama: 'Buku Tulis SPENMAKRO', harga: 4000 },
          { kode: 'BRG-02', nama: 'Penggaris Segitiga', harga: 2500 },
          { kode: 'BRG-03', nama: 'Pulpen Gel Biru', harga: 3000 }
        ],
        formulas: [
          { label: 'Cari Nama: =VLOOKUP("BRG-01"; $A$2:$C$4; 2; FALSE)', result: 'Buku Tulis SPENMAKRO' },
          { label: 'Cari Harga: =VLOOKUP("BRG-03"; $A$2:$C$4; 3; FALSE)', result: 'Rp 3.000' }
        ]
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Tebak Rumus Absolut & Lookup',
      description: 'Cocokkan formula Excel dengan kegunaannya!',
      questions: [
        {
          id: 1,
          question: 'Formula untuk mengunci sel D5 secara mutlak adalah...',
          options: ['$D$5', 'D$5', '$D5', 'D5$'],
          correctIndex: 0,
          clue: 'Kedua tanda dolar mengunci kolom dan baris.'
        },
        {
          id: 2,
          question: 'Untuk mencari nama siswa di kolom ke-3 berdasarkan NISN di kolom 1 menggunakan...',
          options: ['=VLOOKUP(NISN; Tabel; 3; FALSE)', '=COUNT()', '=SUM()', '=MAX()'],
          correctIndex: 0,
          clue: 'Angka 3 menunjukkan indeks kolom ke-3.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Apa fungsi tanda dolar ($) pada penulisan alamat sel $B$3 di Excel?',
        options: [
          { label: 'A', text: 'Mengunci kolom B dan baris 3 agar tidak bergeser saat formula disalin ke sel lain' },
          { label: 'B', text: 'Mengubah format angka menjadi mata uang Dolar Amerika' },
          { label: 'C', text: 'Menghapus sel tersebut' },
          { label: 'D', text: 'Membuat font menjadi tebal' }
        ],
        correctAnswer: 'A',
        explanation: 'Tanda $ berfungsi sebagai pengunci referensi absolut.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Pada rumus =VLOOKUP(A2; $E$2:$G$20; 3; FALSE), angka 3 menunjukkan...',
        options: [
          { label: 'A', text: 'Nomor indeks kolom dari tabel referensi yang nilainya ingin diambil' },
          { label: 'B', text: 'Jumlah baris yang dihapus' },
          { label: 'C', text: 'Jumlah perkalian' },
          { label: 'D', text: 'Jumlah lembar kerja' }
        ],
        correctAnswer: 'A',
        explanation: 'Argumen ketiga VLOOKUP adalah Col_index_num (nomor kolom output data).',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 3,
        question: 'Mengapa argumen keempat pada VLOOKUP sebaiknya diisi FALSE atau 0?',
        options: [
          { label: 'A', text: 'Agar Excel hanya mencari data yang persis cocok (Exact Match) dan tidak mengira-ngira' },
          { label: 'B', text: 'Agar rumus menghasilkan pesan error' },
          { label: 'C', text: 'Agar komputer cepat mati' },
          { label: 'D', text: 'Agar tabel menjadi warna merah' }
        ],
        correctAnswer: 'A',
        explanation: 'FALSE menjamin pencarian presisi eksak tanpa nilai perkiraan.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 4,
        question: 'Jika kamu menuliskan rumus =IF(B2>=90; "A"; IF(B2>=75; "B"; "C")), berapakah predikat untuk siswa dengan nilai B2 = 85?',
        options: [
          { label: 'A', text: 'B' },
          { label: 'B', text: 'A' },
          { label: 'C', text: 'C' },
          { label: 'D', text: 'False' }
        ],
        correctAnswer: 'A',
        explanation: '85 tidak >= 90 (melompat ke kondisi 2), dan 85 >= 75 bernilai Benar, maka menghasilkan "B".',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Simbol error "#N/A" pada rumus VLOOKUP menandakan bahwa...',
        options: [
          { label: 'A', text: 'Nilai kunci yang dicari tidak ditemukan di kolom pertama tabel referensi' },
          { label: 'B', text: 'Komputer kehabisan memori' },
          { label: 'C', text: 'Layar monitor mati' },
          { label: 'D', text: 'Keyboard rusak' }
        ],
        correctAnswer: 'A',
        explanation: '#N/A (Not Available) muncul saat nilai pencarian tidak ada dalam tabel.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Fungsi Excel untuk membulatkan angka desimal ke jumlah digit tertentu di belakang koma adalah...',
        options: [
          { label: 'A', text: '=ROUND()' },
          { label: 'B', text: '=SUM()' },
          { label: 'C', text: '=COUNT()' },
          { label: 'D', text: '=LEN()' }
        ],
        correctAnswer: 'A',
        explanation: '=ROUND(angka; digit) membulatkan angka desimal.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Fitur "Freeze Panes" (Bekukan Panel) di Excel sangat berguna untuk...',
        options: [
          { label: 'A', text: 'Mengunci baris judul tabel agar tetap terlihat saat lembar kerja digulir jauh ke bawah' },
          { label: 'B', text: 'Mendinginkan suhu laptop' },
          { label: 'C', text: 'Menghapus baris yang kosong' },
          { label: 'D', text: 'Menyimpan file ke flashdisk' }
        ],
        correctAnswer: 'A',
        explanation: 'Freeze Panes mengunci header baris/kolom saat menavigasi ribuan baris data.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 8,
        question: 'Fungsi =COUNTIF(C2:C40; ">=75") berguna untuk...',
        options: [
          { label: 'A', text: 'Menghitung berapa banyak siswa yang nilainya mencapai 75 ke atas' },
          { label: 'B', text: 'Menjumlahkan seluruh nilai siswa' },
          { label: 'C', text: 'Mencari nilai rata-rata' },
          { label: 'D', text: 'Mengalikan nilai dengan 75' }
        ],
        correctAnswer: 'A',
        explanation: 'COUNTIF menghitung frekuensi sel yang memenuhi kriteria tertentu.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 9,
        question: 'Apa perbedaan mendasar antara VLOOKUP dan HLOOKUP?',
        options: [
          { label: 'A', text: 'VLOOKUP mencari tabel berdasarkan kolom vertikal, sedangkan HLOOKUP mencari berdasarkan baris horizontal' },
          { label: 'B', text: 'VLOOKUP untuk huruf, HLOOKUP untuk angka' },
          { label: 'C', text: 'VLOOKUP hanya untuk HP' },
          { label: 'D', text: 'Tidak ada perbedaan sama sekali' }
        ],
        correctAnswer: 'A',
        explanation: 'VLOOKUP = Vertical (kolom), HLOOKUP = Horizontal (baris).',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 10,
        question: 'Mengapa penguasaan spreadsheet Excel dan Google Sheets sangat dicari di dunia kerja modern?',
        options: [
          { label: 'A', text: 'Karena memungkinkan otomasi pengolahan data besar, analisis akurat, dan pelaporan efisien tanpa hitungan manual' },
          { label: 'B', text: 'Karena tidak ada program lain di komputer' },
          { label: 'C', text: 'Agar bisa bermain game gratis' },
          { label: 'D', text: 'Hanya untuk membuang waktu' }
        ],
        correctAnswer: 'A',
        explanation: 'Spreadsheet adalah alat analitik data fundamental di setiap industri modern.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Alamat sel $C$10 merupakan contoh referensi...',
        options: [
          { label: 'A', text: 'Absolut Mutlak' },
          { label: 'B', text: 'Relatif' },
          { label: 'C', text: 'Semi Absolut Kolom' },
          { label: 'D', text: 'Semi Absolut Baris' }
        ],
        correctAnswer: 'A',
        explanation: 'Kedua komponen dikunci tanda $ sehingga bersifat absolut mutlak.',
        points: 10
      },
      {
        id: 2,
        question: 'Jika rumus di sel B2 adalah =A2*$D$1, lalu ditarik ke sel B3, rumusnya berubah menjadi...',
        options: [
          { label: 'A', text: '=A3*$D$1' },
          { label: 'B', text: '=A3*$D$2' },
          { label: 'C', text: '=A2*$D$1' },
          { label: 'D', text: '=B2*$D$1' }
        ],
        correctAnswer: 'A',
        explanation: 'A2 relatif menjadi A3, $D$1 absolut tetap $D$1.',
        points: 10
      },
      {
        id: 3,
        question: 'Fungsi VLOOKUP mencari nilai acuan pada bagian...',
        options: [
          { label: 'A', text: 'Kolom paling kiri tabel referensi' },
          { label: 'B', text: 'Kolom paling kanan' },
          { label: 'C', text: 'Baris paling bawah' },
          { label: 'D', text: 'Sel sembarang di luar tabel' }
        ],
        correctAnswer: 'A',
        explanation: 'Nilai kunci harus berada di kolom pertama (kiri) tabel referensi.',
        points: 10
      },
      {
        id: 4,
        question: 'Sintaks fungsi IF di Excel yang benar adalah...',
        options: [
          { label: 'A', text: '=IF(tes_logika; nilai_jika_benar; nilai_jika_salah)' },
          { label: 'B', text: '=IF(nilai_benar; tes_logika; nilai_salah)' },
          { label: 'C', text: '=IF(kondisi)' },
          { label: 'D', text: '=IF(salah; benar)' }
        ],
        correctAnswer: 'A',
        explanation: 'Urutan baku: Logical_test, Value_if_true, Value_if_false.',
        points: 10
      },
      {
        id: 5,
        question: 'Fungsi untuk menjumlahkan data dengan kriteria kondisi tertentu adalah...',
        options: [
          { label: 'A', text: '=SUMIF()' },
          { label: 'B', text: '=COUNT()' },
          { label: 'C', text: '=AVERAGE()' },
          { label: 'D', text: '=MAXIF()' }
        ],
        correctAnswer: 'A',
        explanation: '=SUMIF() menjumlahkan sel yang memenuhi kriteria.',
        points: 10
      },
      {
        id: 6,
        question: 'Pintasan keyboard untuk mengaktifkan mode edit langsung pada sebuah sel aktif adalah...',
        options: [
          { label: 'A', text: 'F2' },
          { label: 'B', text: 'F5' },
          { label: 'C', text: 'F7' },
          { label: 'D', text: 'F11' }
        ],
        correctAnswer: 'A',
        explanation: 'F2 membuka sel untuk pengeditan kursor langsung.',
        points: 10
      },
      {
        id: 7,
        question: 'Jika formula menghasilkan error "#REF!", artinya adalah...',
        options: [
          { label: 'A', text: 'Alamat sel yang dirujuk formula telah terhapus atau tidak valid' },
          { label: 'B', text: 'Hasil perhitungan terlalu besar' },
          { label: 'C', text: 'Salah penulisan nama fungsi' },
          { label: 'D', text: 'Tabel berwarna biru' }
        ],
        correctAnswer: 'A',
        explanation: '#REF! (Invalid Reference) terjadi saat sel acuan telah dihapus.',
        points: 10
      },
      {
        id: 8,
        question: 'Jika formula menghasilkan error "#NAME?", artinya adalah...',
        options: [
          { label: 'A', text: 'Nama fungsi salah ketik (misal =SUMM alih-alih =SUM)' },
          { label: 'B', text: 'Data tidak ditemukan' },
          { label: 'C', text: 'Pembagian dengan nol' },
          { label: 'D', text: 'Komputer tidak punya nama' }
        ],
        correctAnswer: 'A',
        explanation: '#NAME? muncul saat Excel tidak mengenali nama formula yang diketik.',
        points: 10
      },
      {
        id: 9,
        question: 'Fungsi logika yang menghasilkan TRUE jika SALAH SATU dari beberapa kondisi bernilai benar adalah...',
        options: [
          { label: 'A', text: '=OR()' },
          { label: 'B', text: '=AND()' },
          { label: 'C', text: '=NOT()' },
          { label: 'D', text: '=XOR()' }
        ],
        correctAnswer: 'A',
        explanation: 'Fungsi OR bernilai TRUE cukup jika minimal salah satu syarat terpenuhi.',
        points: 10
      },
      {
        id: 10,
        question: 'Fitur "Sort & Filter" pada tab Data di Excel digunakan untuk...',
        options: [
          { label: 'A', text: 'Mengurutkan data dan menyaring data berdasarkan nilai tertentu' },
          { label: 'B', text: 'Menggambar bentuk lingkaran' },
          { label: 'C', text: 'Mengunci file dengan kata sandi' },
          { label: 'D', text: 'Menghapus lembar kerja' }
        ],
        correctAnswer: 'A',
        explanation: 'Sort & Filter adalah alat manajemen data utama spreadsheet.',
        points: 10
      }
    ]
  }
];

// Combine all topics into unified curriculum with randomized answer positions
const RAW_ALL_TOPICS: Topic[] = [
  ...GRADE_FINAL_TOPICS,
  ...BASE_TOPICS,
  ...ADDITIONAL_TOPICS,
  ...REMAINING_TOPICS,
  ...COMPREHENSIVE_TOPICS,
  RUANG_PUBLIK_VIRTUAL_TOPIC,
  REKAM_JEJAK_DIGITAL_TOPIC
];

export const ALL_TOPICS: Topic[] = RAW_ALL_TOPICS.map(randomizeTopicQuestions);

export const ALL_TOPIC_MAP: Record<string, Topic> = ALL_TOPICS.reduce((acc, topic) => {
  acc[topic.id] = topic;
  return acc;
}, {} as Record<string, Topic>);

export function getTopicsByGrade(grade: Grade): Topic[] {
  return ALL_TOPICS.filter((t) => t.grade === grade);
}

export function getTopicById(id: string): Topic | undefined {
  return ALL_TOPIC_MAP[id] || ALL_TOPICS[0];
}

