import { Topic } from '../types/curriculum';

export interface IfpClassificationCard {
  id: string;
  sentence: string;
  shortContext: string;
  iconName: string;
  correctCategory: string;
  studentHint: string;
  title?: string;
  description?: string;
  iconType?: string;
  hint?: string;
}

export interface IfpCategoryBucket {
  name: string;
  badge: string;
  emoji: string;
  description: string;
  themeColor: 'emerald' | 'sky' | 'amber' | 'purple' | 'rose' | 'teal';
}

export interface TopicIfpClassificationPack {
  title: string;
  subtitle: string;
  teacherGuide: string;
  categories: IfpCategoryBucket[];
  cards: IfpClassificationCard[];
  scenario?: string;
}

/**
 * Database Soal Klasifikasi IFP (Interactive Flat Panel) Layar Sentuh Kelas
 * Dirancang khusus dengan:
 * 1. Bahasa SANGAT SEDERHANA, ceria, dan mudah dipahami anak SMP.
 * 2. Kalimat kehidupan sehari-hari anak sekolah (Budi, Siti, Doni, Rian, Guru, WA kelas, HP, Lab).
 * 3. Menyenangkan, penuh warna, dan pas untuk giliran siswa maju ke depan layar sentuh!
 */
export const DEDICATED_IFP_CLASSIFICATIONS: Record<string, TopicIfpClassificationPack> = {
  // ==========================================
  // KELAS 7: KOMPONEN KOMPUTER
  // ==========================================
  'k7-komputer': {
    title: 'Papan Klasifikasi Perangkat Komputer di Sekolah',
    subtitle: 'Ayo maju ke layar IFP! Cocokkan kalimat aksi komputer di bawah ini ke keranjang perangkat yang benar!',
    teacherGuide: 'Ajak siswa satu per satu menyentuh kartu kalimat di bawah, lalu sentuh keranjang warna di atas yang tepat.',
    categories: [
      {
        name: 'Perangkat Masukan (Input)',
        badge: 'Input 📥',
        emoji: '⌨️',
        description: 'Alat untuk mengetik, mengklik, atau memasukkan perintah',
        themeColor: 'sky'
      },
      {
        name: 'Perangkat Pemrosesan (Proses)',
        badge: 'Proses ⚙️',
        emoji: '🧠',
        description: 'Otak komputer yang menghitung dan mengolah data',
        themeColor: 'purple'
      },
      {
        name: 'Perangkat Keluaran (Output)',
        badge: 'Output 📤',
        emoji: '🖥️',
        description: 'Alat penampil gambar, pemutar suara, atau pencetak kertas',
        themeColor: 'emerald'
      },
      {
        name: 'Penyimpanan Data (Storage)',
        badge: 'Simpan 💾',
        emoji: '📁',
        description: 'Tempat menyimpan file tugas agar aman tidak hilang',
        themeColor: 'amber'
      }
    ],
    cards: [
      {
        id: 'komp-1',
        sentence: 'Budi mengetik nama teman sekelompok memakai Keyboard di lab komputer.',
        shortContext: 'Mengetik Tugas',
        iconName: 'Keyboard',
        correctCategory: 'Perangkat Masukan (Input)',
        studentHint: 'Keyboard memasukkan ketikan huruf ke dalam komputer.'
      },
      {
        id: 'komp-2',
        sentence: 'Siti melihat foto hasil karya tugas kelompok yang tampil di Layar Monitor.',
        shortContext: 'Melihat Tampilan',
        iconName: 'Monitor',
        correctCategory: 'Perangkat Keluaran (Output)',
        studentHint: 'Monitor menampilkan hasil visual di layar.'
      },
      {
        id: 'komp-3',
        sentence: 'Pak Guru mencetak lembar soal ujian ke kertas HVS menggunakan Printer.',
        shortContext: 'Mencetak Kertas',
        iconName: 'Printer',
        correctCategory: 'Perangkat Keluaran (Output)',
        studentHint: 'Printer mencetak hasil komputer ke media fisik kertas.'
      },
      {
        id: 'komp-4',
        sentence: 'Processor (otak komputer) menghitung ribuan nilai rapor siswa dalam sekejap.',
        shortContext: 'Otak Pengolah',
        iconName: 'Cpu',
        correctCategory: 'Perangkat Pemrosesan (Proses)',
        studentHint: 'Processor memproses semua hitungan dan perintah di komputer.'
      },
      {
        id: 'komp-5',
        sentence: 'Doni mencolokkan Flashdisk ke komputer untuk menyalin file video praktikum.',
        shortContext: 'Simpan File',
        iconName: 'HardDrive',
        correctCategory: 'Penyimpanan Data (Storage)',
        studentHint: 'Flashdisk menyimpan file data secara aman.'
      },
      {
        id: 'komp-6',
        sentence: 'Rian menggeser kursor dan mengklik tombol Mulai Belajar memakai Mouse optik.',
        shortContext: 'Klik Kursor',
        iconName: 'Mouse',
        correctCategory: 'Perangkat Masukan (Input)',
        studentHint: 'Mouse menggerakkan kursor dan memasukkan klik perintah.'
      },
      {
        id: 'komp-7',
        sentence: 'Siswa mendengarkan penjelasan audio bahasa Inggris lewat Headphone suara.',
        shortContext: 'Mendengar Suara',
        iconName: 'Radio',
        correctCategory: 'Perangkat Keluaran (Output)',
        studentHint: 'Speaker dan Headphone mengeluarkan suara dari komputer.'
      },
      {
        id: 'komp-8',
        sentence: 'SSD di dalam laptop menyimpan sistem Windows dan semua game selamanya.',
        shortContext: 'Memori Permanen',
        iconName: 'HardDrive',
        correctCategory: 'Penyimpanan Data (Storage)',
        studentHint: 'SSD menyimpan data secara permanen walau komputer dimatikan.'
      }
    ]
  },

  // ==========================================
  // KELAS 7: BERPIKIR KOMPUTASIONAL (BK)
  // ==========================================
  'k7-bk': {
    title: 'Papan Detektif: 4 Pilar Berpikir Cerdas Komputasional',
    subtitle: 'Ayo maju ke depan! Cocokkan cara cerdas memecahkan masalah ini ke pilar yang paling tepat!',
    teacherGuide: 'Siswa menyentuh kartu kejadian sehari-hari, lalu memilih pilar BK yang cocok.',
    categories: [
      {
        name: 'Dekomposisi (Bagi Tugas)',
        badge: 'Pecah Tugas 🧩',
        emoji: '✂️',
        description: 'Membagi tugas besar jadi bagian-bagian kecil yang mudah',
        themeColor: 'sky'
      },
      {
        name: 'Pengenalan Pola (Cari Kesamaan)',
        badge: 'Cari Pola 🔍',
        emoji: '👀',
        description: 'Melihat kebiasaan berulang atau pola yang selalu sama',
        themeColor: 'purple'
      },
      {
        name: 'Abstraksi (Pilih yang Penting)',
        badge: 'Pilih Penting 🎯',
        emoji: '⭐',
        description: 'Hanya fokus pada inti penting, abaikan detail yang sepele',
        themeColor: 'amber'
      },
      {
        name: 'Algoritma (Urutan Langkah)',
        badge: 'Urutan Kerja 📝',
        emoji: '🚶‍♂️',
        description: 'Menyusun langkah berurutan dari awal sampai selesai',
        themeColor: 'emerald'
      }
    ],
    cards: [
      {
        id: 'bk-1',
        sentence: 'Membagi pembuatan vlog sekolah: Rian menulis naskah, Siti mengambil video, Budi mengedit.',
        shortContext: 'Kerja Kelompok',
        iconName: 'Users',
        correctCategory: 'Dekomposisi (Bagi Tugas)',
        studentHint: 'Membagi masalah besar jadi tugas-tugas kecil mandiri.'
      },
      {
        id: 'bk-2',
        sentence: 'Mengetahui bahwa setiap jam 06.40 gerbang depan sekolah selalu macet ramai.',
        shortContext: 'Pengamatan Tiap Hari',
        iconName: 'Clock',
        correctCategory: 'Pengenalan Pola (Cari Kesamaan)',
        studentHint: 'Melihat pola yang selalu berulang di waktu yang sama.'
      },
      {
        id: 'bk-3',
        sentence: 'Menggambar denah jalan ke sekolah hanya garis jalan utamanya saja tanpa menggambar pohon.',
        shortContext: 'Gambar Peta Rute',
        iconName: 'MapPin',
        correctCategory: 'Abstraksi (Pilih yang Penting)',
        studentHint: 'Membuang detail tidak penting agar mudah dibaca.'
      },
      {
        id: 'bk-4',
        sentence: 'Langkah mencuci tangan: basahi air, usap sabun, gosok sela jari, lalu bilas bersih.',
        shortContext: 'Cara Cuci Tangan',
        iconName: 'CheckCircle2',
        correctCategory: 'Algoritma (Urutan Langkah)',
        studentHint: 'Langkah teratur berurutan dari nomor 1 sampai selesai.'
      },
      {
        id: 'bk-5',
        sentence: 'Membedah buku pelajaran 100 halaman menjadi target membaca 5 halaman setiap sore.',
        shortContext: 'Target Belajar',
        iconName: 'BookOpenCheck',
        correctCategory: 'Dekomposisi (Bagi Tugas)',
        studentHint: 'Membagi target besar jadi bagian kecil harian.'
      },
      {
        id: 'bk-6',
        sentence: 'Mengingat bahwa soal ujian nomor 3 caranya mirip sekali dengan latihan kemarin.',
        shortContext: 'Ingat Cara Mirip',
        iconName: 'Lightbulb',
        correctCategory: 'Pengenalan Pola (Cari Kesamaan)',
        studentHint: 'Mengenali kemiripan bentuk soal dari pengalaman sebelumnya.'
      }
    ]
  },

  // ==========================================
  // KELAS 8: REKAM JEJAK DIGITAL & ANTI-CYBERBULLYING
  // ==========================================
  'k8-rekam-jejak-digital': {
    title: 'Papan Etika Medsos: Jejak Positif vs Bahaya Cyberbullying',
    subtitle: 'Ayo maju ke layar IFP! Cocokkan perilaku pergaulan digital anak sekolah ini ke keranjang yang benar!',
    teacherGuide: 'Siswa bergantian maju menyentuh kalimat tindakan, lalu memilih keranjang etika yang tepat.',
    categories: [
      {
        name: 'Perilaku Digital Santun (Bagus 👍)',
        badge: 'Jejak Positif 🌟',
        emoji: '👍',
        description: 'Sopan, santun, menjaga privasi, dan merawat nama baik diri',
        themeColor: 'emerald'
      },
      {
        name: 'Empati & Peduli Teman (Keren ❤️)',
        badge: 'Empati Teman 🥰',
        emoji: '❤️',
        description: 'Menghargai perbedaan pendapat dan menolong teman yang sedih',
        themeColor: 'sky'
      },
      {
        name: 'Cyberbullying / Dilarang (Hindari ❌)',
        badge: 'Dilarang! 🛑',
        emoji: '❌',
        description: 'Mengejek, mengancam, memfitnah, dan menyakiti hati teman',
        themeColor: 'rose'
      }
    ],
    cards: [
      {
        id: 'rjd-ifp-1',
        sentence: 'Menyapa Bapak/Ibu Guru lewat WhatsApp dengan salam sopan dan menyebutkan nama serta kelas.',
        shortContext: 'Chat ke Guru',
        iconName: 'MessageSquareWarning',
        correctCategory: 'Perilaku Digital Santun (Bagus 👍)',
        studentHint: 'Netiket santun yang wajib dibiasakan seluruh siswa.'
      },
      {
        id: 'rjd-ifp-2',
        sentence: 'Mengirimkan pesan japri penyemangat kepada teman yang sedang sedih setelah mendapat komentar jahat.',
        shortContext: 'Menghibur Teman',
        iconName: 'HeartHandshake',
        correctCategory: 'Empati & Peduli Teman (Keren ❤️)',
        studentHint: 'Empati digital membuat teman merasa diperhatikan dan tidak sendirian.'
      },
      {
        id: 'rjd-ifp-3',
        sentence: 'Mengedit foto wajah teman menjadi jelek lalu disebarkan di grup kelas sampai temannya menangis.',
        shortContext: 'Ejekan Foto',
        iconName: 'AlertOctagon',
        correctCategory: 'Cyberbullying / Dilarang (Hindari ❌)',
        studentHint: 'Tindakan pelecehan yang merusak mental teman dan melanggar aturan.'
      },
      {
        id: 'rjd-ifp-4',
        sentence: 'Mengecek kebenaran berita ke wali kelas sebelum membagikannya ke grup obrolan agar tidak sebar hoaks.',
        shortContext: 'Saring Sebelum Sebar',
        iconName: 'ShieldCheck',
        correctCategory: 'Perilaku Digital Santun (Bagus 👍)',
        studentHint: 'Saringan T.H.I.N.K. huruf T (True/Benar) menjaga jemari dari hoaks.'
      },
      {
        id: 'rjd-ifp-5',
        sentence: 'Membuat akun palsu tanpa nama untuk mengirim kata-kata kotor dan ancaman teror ke adik kelas.',
        shortContext: 'Akun Palsu Kotor',
        iconName: 'AlertTriangle',
        correctCategory: 'Cyberbullying / Dilarang (Hindari ❌)',
        studentHint: 'Impersonation dan ancaman siber adalah pelanggaran hukum berat.'
      },
      {
        id: 'rjd-ifp-6',
        sentence: 'Mendengarkan dan menghargai teman yang punya ide berbeda saat musyawarah tugas kelompok di chat.',
        shortContext: 'Hargai Pendapat',
        iconName: 'Users',
        correctCategory: 'Empati & Peduli Teman (Keren ❤️)',
        studentHint: 'Toleransi digital menerima keberagaman ide dengan lapang dada.'
      },
      {
        id: 'rjd-ifp-7',
        sentence: 'Berani menegur teman pembuat stiker ejekan dan segera melaporkannya ke guru BK (Upstander).',
        shortContext: 'Membela Korban',
        iconName: 'ShieldCheck',
        correctCategory: 'Empati & Peduli Teman (Keren ❤️)',
        studentHint: 'Pahlawan siber berani bersuara membela teman yang dizalimi.'
      },
      {
        id: 'rjd-ifp-8',
        sentence: 'Mengeluarkan teman dari grup belajar kelas secara sengaja agar dia bingung dan tidak tahu PR.',
        shortContext: 'Pengucilan Sengaja',
        iconName: 'XCircle',
        correctCategory: 'Cyberbullying / Dilarang (Hindari ❌)',
        studentHint: 'Exclusion (pengucilan digital) termasuk jenis cyberbullying.'
      }
    ]
  },

  // ==========================================
  // KELAS 8: JARINGAN KOMPUTER & INTERNET
  // ==========================================
  'k8-jaringan': {
    title: 'Papan Klasifikasi Jalur Komunikasi Data & Internet',
    subtitle: 'Ayo maju ke depan IFP! Cocokkan perangkat dan aktivitas berikut ke jenis jaringannya!',
    teacherGuide: 'Siswa maju dan memilih apakah menggunakan kabel LAN, gelombang Wi-Fi, atau Internet Global.',
    categories: [
      {
        name: 'Jaringan Kabel (LAN)',
        badge: 'Pakai Kabel 🔌',
        emoji: '🔌',
        description: 'Terhubung lewat kabel UTP/LAN, sangat cepat dan tahan gangguan',
        themeColor: 'sky'
      },
      {
        name: 'Jaringan Nirkabel (Wi-Fi / Bluetooth)',
        badge: 'Tanpa Kabel 📶',
        emoji: '📶',
        description: 'Terhubung lewat gelombang udara bebas tanpa kabel fisik',
        themeColor: 'emerald'
      },
      {
        name: 'Internet Dunia (Global Web)',
        badge: 'Jaringan Dunia 🌐',
        emoji: '🌍',
        description: 'Menghubungkan komputer melintasi kota, pulau, dan antarnegara',
        themeColor: 'purple'
      }
    ],
    cards: [
      {
        id: 'net-1',
        sentence: 'Menghubungkan 30 komputer PC di lab sekolah memakai kabel UTP warna biru ke Switch hub.',
        shortContext: 'Lab Komputer',
        iconName: 'Network',
        correctCategory: 'Jaringan Kabel (LAN)',
        studentHint: 'Kabel UTP fisik adalah ciri utama jaringan LAN kabel.'
      },
      {
        id: 'net-2',
        sentence: 'Menyambungkan HP ke speaker musik di kelas tanpa kabel memakai Bluetooth.',
        shortContext: 'Putar Musik',
        iconName: 'SmartphoneNfc',
        correctCategory: 'Jaringan Nirkabel (Wi-Fi / Bluetooth)',
        studentHint: 'Bluetooth mentransmisikan data audio lewat gelombang nirkabel.'
      },
      {
        id: 'net-3',
        sentence: 'Mencari artikel materi tentang Robotika dari situs web luar negeri di mesin pencari Google.',
        shortContext: 'Riset Tugas',
        iconName: 'Globe',
        correctCategory: 'Internet Dunia (Global Web)',
        studentHint: 'Mencari info antarnegara memanfaatkan jaringan internet sedunia.'
      },
      {
        id: 'net-4',
        sentence: 'Laptop guru tersambung otomatis ke sinyal Wi-Fi ruang guru untuk input nilai rapor.',
        shortContext: 'Wi-Fi Sekolah',
        iconName: 'Wifi',
        correctCategory: 'Jaringan Nirkabel (Wi-Fi / Bluetooth)',
        studentHint: 'Wi-Fi adalah jaringan nirkabel lokal tanpa kabel colokan.'
      },
      {
        id: 'net-5',
        sentence: 'Server utama ujian sekolah menyalurkan soal lewat kabel fiber optik berkecepatan tinggi.',
        shortContext: 'Server Ujian',
        iconName: 'Cpu',
        correctCategory: 'Jaringan Kabel (LAN)',
        studentHint: 'Kabel fiber optik fisik menyalurkan sinyal cahaya kabel.'
      },
      {
        id: 'net-6',
        sentence: 'Melakukan panggilan video Google Meet dengan saudara yang tinggal di luar kota.',
        shortContext: 'Video Call Jauh',
        iconName: 'Radio',
        correctCategory: 'Internet Dunia (Global Web)',
        studentHint: 'Video call lintas pulau memerlukan koneksi internet global.'
      }
    ]
  },

  // ==========================================
  // KELAS 9: KEAMANAN DATA & LITERASI SIBER
  // ==========================================
  'k9-keamanan-digital': {
    title: 'Papan Klasifikasi: Tindakan Aman vs Bahaya Siber',
    subtitle: 'Ayo maju ke depan! Bedakan mana kebiasaan aman dan mana yang berbahaya saat berinternet!',
    teacherGuide: 'Siswa menyentuh kartu kebiasaan, lalu menaruhnya di keranjang Aman atau Bahaya.',
    categories: [
      {
        name: 'Kebiasaan Aman & Terlindungi (Keren 🔒)',
        badge: 'Sangat Aman 🛡️',
        emoji: '🔒',
        description: 'Menjaga kata sandi rahasia, data terlindungi, dan terbebas dari peretasan',
        themeColor: 'emerald'
      },
      {
        name: 'Kebiasaan Berbahaya (Rawan Retas ⚠️)',
        badge: 'Bahaya Retas 🚨',
        emoji: '⚠️',
        description: 'Ceroboh, mudah ditipu, dan bisa menyebabkan data pribadi dicuri',
        themeColor: 'rose'
      }
    ],
    cards: [
      {
        id: 'sec-1',
        sentence: 'Membuat kata sandi kuat gabungan huruf besar, angka, dan simbol seperti "Spenmakro#2026!".',
        shortContext: 'Bikin Password',
        iconName: 'Lock',
        correctCategory: 'Kebiasaan Aman & Terlindungi (Keren 🔒)',
        studentHint: 'Kombinasi sandi kuat sulit ditebak oleh pencuri data.'
      },
      {
        id: 'sec-2',
        sentence: 'Mengeklik tautan mencurigakan "Selamat Anda dapat HP gratis!" dari nomor asing di WhatsApp.',
        shortContext: 'Klik Link Asing',
        iconName: 'AlertTriangle',
        correctCategory: 'Kebiasaan Berbahaya (Rawan Retas ⚠️)',
        studentHint: 'Jebakan phishing mencuri akun melalui tautan hadiah palsu.'
      },
      {
        id: 'sec-3',
        sentence: 'Menuliskan password akun email sekolah di papan tulis kelas agar tidak lupa.',
        shortContext: 'Tulis Sandi Terbuka',
        iconName: 'AlertOctagon',
        correctCategory: 'Kebiasaan Berbahaya (Rawan Retas ⚠️)',
        studentHint: 'Sandi rahasia tidak boleh dilihat oleh orang lain.'
      },
      {
        id: 'sec-4',
        sentence: 'Selalu menekan tombol Logout (Keluar) setelah selesai membuka akun di komputer umum warnet.',
        shortContext: 'Keluar Akun',
        iconName: 'CheckCircle2',
        correctCategory: 'Kebiasaan Aman & Terlindungi (Keren 🔒)',
        studentHint: 'Logout menutup sesi akun agar tidak dibuka pengguna berikutnya.'
      },
      {
        id: 'sec-5',
        sentence: 'Mengaktifkan verifikasi 2 langkah (2FA) yang mengirim kode PIN ke nomor HP saat login.',
        shortContext: 'Kunci Ganda 2FA',
        iconName: 'ShieldCheck',
        correctCategory: 'Kebiasaan Aman & Terlindungi (Keren 🔒)',
        studentHint: 'Kunci pengaman ganda melindungi akun meski password diketahui orang.'
      },
      {
        id: 'sec-6',
        sentence: 'Memberitahukan nomor kode rahasia OTP SMS kepada orang asing yang menelepon mengaku polisi.',
        shortContext: 'Bagi Kode OTP',
        iconName: 'AlertTriangle',
        correctCategory: 'Kebiasaan Berbahaya (Rawan Retas ⚠️)',
        studentHint: 'Kode OTP bersifat rahasia dan tidak boleh dibagikan kepada siapapun!'
      }
    ]
  },

  // ==========================================
  // KELAS 9: RUANG PUBLIK VIRTUAL
  // ==========================================
  'k9-ruang-publik-virtual': {
    title: 'Papan Klasifikasi: Ruang Maya Virtual vs Ruang Fisik Nyata',
    subtitle: 'Ayo maju ke layar IFP! Cocokkan kegiatan siswa di bawah ini ke jenis ruang tempat beraktivitas!',
    teacherGuide: 'Siswa bergantian maju untuk menentukan apakah aktivitas berlangsung di dunia maya atau nyata.',
    categories: [
      {
        name: 'Ruang Publik Virtual (Dunia Maya 🌐)',
        badge: 'Dunia Maya 💻',
        emoji: '🌐',
        description: 'Bertemu, ngobrol, dan berkolaborasi lewat aplikasi internet di layar HP/Laptop',
        themeColor: 'sky'
      },
      {
        name: 'Ruang Fisik Nyata (Dunia Nyata 🏫)',
        badge: 'Dunia Nyata 🏢',
        emoji: '🏫',
        description: 'Bertemu langsung bertatap muka di tempat nyata seperti taman atau kelas',
        themeColor: 'emerald'
      }
    ],
    cards: [
      {
        id: 'rpv-ifp-1',
        sentence: 'Diskusi tugas kelompok bareng teman lewat Google Meet dari rumah masing-masing pada sore hari.',
        shortContext: 'Video Call Belajar',
        iconName: 'Monitor',
        correctCategory: 'Ruang Publik Virtual (Dunia Maya 🌐)',
        studentHint: 'Pertemuan lewat jaringan internet tanpa hadir di lokasi fisik.'
      },
      {
        id: 'rpv-ifp-2',
        sentence: 'Duduk melingkar bersama teman di gazebo perpustakaan sekolah membaca buku bersama.',
        shortContext: 'Di Perpustakaan',
        iconName: 'School',
        correctCategory: 'Ruang Fisik Nyata (Dunia Nyata 🏫)',
        studentHint: 'Hadir secara fisik di gedung perpustakaan sekolah.'
      },
      {
        id: 'rpv-ifp-3',
        sentence: 'Mengetik dan menyunting naskah laporan praktikum bersamaan di Google Docs secara daring.',
        shortContext: 'Ketik Bersama Cloud',
        iconName: 'FileText',
        correctCategory: 'Ruang Publik Virtual (Dunia Maya 🌐)',
        studentHint: 'Kolaborasi naskah di ruang kerja virtual Google Cloud.'
      },
      {
        id: 'rpv-ifp-4',
        sentence: 'Berbaris tertib dan hormat bendera bersama seluruh siswa di halaman sekolah saat upacara Senin.',
        shortContext: 'Upacara Bendera',
        iconName: 'Building2',
        correctCategory: 'Ruang Fisik Nyata (Dunia Nyata 🏫)',
        studentHint: 'Kegiatan fisik langsung di lapangan upacara sekolah.'
      },
      {
        id: 'rpv-ifp-5',
        sentence: 'Bermain game bareng teman dan membangun istana virtual bersama di Roblox atau Minecraft.',
        shortContext: 'Main Game Bareng',
        iconName: 'Gamepad2',
        correctCategory: 'Ruang Publik Virtual (Dunia Maya 🌐)',
        studentHint: 'Dunia 3D simulasi maya di dalam jaringan game.'
      },
      {
        id: 'rpv-ifp-6',
        sentence: 'Bermain sepak bola dan saling mengoper bola di lapangan olahraga sekolah saat jam istirahat.',
        shortContext: 'Main Bola',
        iconName: 'Heart',
        correctCategory: 'Ruang Fisik Nyata (Dunia Nyata 🏫)',
        studentHint: 'Aktivitas fisik nyata di lapangan sekolah.'
      }
    ]
  }
};

/**
 * Helper Universal untuk Mengambil Data Klasifikasi IFP Semua Topik
 * Jika topik belum terdaftar di preset, generator otomatis ini akan membuat
 * 3 keranjang ceria dan 6 kalimat sehari-hari yang sangat mudah dipahami anak!
 */
export function getTopicIfpClassificationData(topic: Topic): TopicIfpClassificationPack {
  if (DEDICATED_IFP_CLASSIFICATIONS[topic.id]) {
    return DEDICATED_IFP_CLASSIFICATIONS[topic.id];
  }

  // Cek apakah di topic.simulasi.data ada kategori dan item kustom
  const sim = topic.simulasi;
  if (sim?.type === 'categorize' && sim?.data?.items && sim?.data?.categories) {
    const cats: IfpCategoryBucket[] = sim.data.categories.map((cName: string, idx: number) => {
      const colors: ('emerald' | 'sky' | 'amber' | 'purple' | 'rose')[] = ['emerald', 'sky', 'amber', 'purple', 'rose'];
      const emojis = ['🌟', '💡', '⚙️', '🔍', '🎯'];
      return {
        name: cName,
        badge: cName.split(' ')[0] || `Grup ${idx + 1}`,
        emoji: emojis[idx % emojis.length],
        description: `Keranjang kelompok untuk ${cName}`,
        themeColor: colors[idx % colors.length]
      };
    });

    const cards: IfpClassificationCard[] = sim.data.items.map((it: any, idx: number) => ({
      id: it.id || `card-${idx + 1}`,
      sentence: it.text || it.title || `Contoh aktivitas materi ${topic.title}`,
      shortContext: `Kasus ${idx + 1}`,
      iconName: it.iconType || 'Lightbulb',
      correctCategory: it.correctCategory,
      studentHint: `Pilihlah keranjang yang tepat sesuai konsep materi ${topic.title}.`
    }));

    return {
      title: `Papan Klasifikasi Interaktif: ${topic.title}`,
      subtitle: 'Ayo maju ke depan kelas! Cocokkan setiap kalimat cerita nyata di bawah ke keranjang yang sesuai!',
      teacherGuide: 'Ajak siswa menyentuh satu kartu kalimat, lalu menyentuh keranjang kategori yang cocok.',
      categories: cats,
      cards: cards
    };
  }

  // Fallback Universal Berdasarkan Judul dan Materi Topik (Bahasa Sederhana Anak SMP)
  const t = topic.title.toLowerCase();

  if (t.includes('dokumen') || t.includes('word') || t.includes('docs')) {
    return {
      title: 'Papan Klasifikasi Fitur Aplikasi Pengolah Dokumen',
      subtitle: 'Ayo maju ke layar IFP! Cocokkan kegiatan mengetik naskah di bawah ini ke menu yang benar!',
      teacherGuide: 'Siswa maju menyentuh kalimat kegiatan, lalu memilih tombol menu dokumen yang pas.',
      categories: [
        {
          name: 'Format Tulisan (Font & Paragraf)',
          badge: 'Format Huruf ✍️',
          emoji: '✍️',
          description: 'Menebalkan, mengubah warna, dan merapikan baris tulisan',
          themeColor: 'sky'
        },
        {
          name: 'Sisipkan Gambar & Tabel',
          badge: 'Tabel & Foto 🖼️',
          emoji: '🖼️',
          description: 'Memasukkan foto ilustrasi atau kotak daftar nilai',
          themeColor: 'emerald'
        },
        {
          name: 'Simpan & Kolaborasi Daring',
          badge: 'Bagi & Simpan 👥',
          emoji: '☁️',
          description: 'Menyimpan di cloud dan mengetik bersama teman kelompok',
          themeColor: 'purple'
        }
      ],
      cards: [
        {
          id: 'doc-1',
          sentence: 'Menebalkan judul tugas makalah memakai tombol Bold (Ctrl + B) agar terlihat tegas.',
          shortContext: 'Tebalkan Judul',
          iconName: 'FileText',
          correctCategory: 'Format Tulisan (Font & Paragraf)',
          studentHint: 'Bold mengatur ketebalan huruf teks.'
        },
        {
          id: 'doc-2',
          sentence: 'Memasukkan foto kegiatan praktikum IPA ke tengah halaman laporan tugas.',
          shortContext: 'Pasang Foto',
          iconName: 'Image',
          correctCategory: 'Sisipkan Gambar & Tabel',
          studentHint: 'Menu Insert Image memasukkan foto ke dokumen.'
        },
        {
          id: 'doc-3',
          sentence: 'Siti menulis komentar memberi saran perbaikan pada paragraf yang diketik oleh Budi.',
          shortContext: 'Komentar Tugas',
          iconName: 'Users',
          correctCategory: 'Simpan & Kolaborasi Daring',
          studentHint: 'Fitur komentar memudahkan diskusi kerja kelompok.'
        },
        {
          id: 'doc-4',
          sentence: 'Mengubah format paragraf menjadi rata sisi kiri dan kanan (Justify) agar rapi seperti buku.',
          shortContext: 'Ratakan Teks',
          iconName: 'FileText',
          correctCategory: 'Format Tulisan (Font & Paragraf)',
          studentHint: 'Justify meratakan teks di kedua tepi halaman.'
        },
        {
          id: 'doc-5',
          sentence: 'Membuat kotak tabel 3 kolom untuk menuliskan nama teman, tugas, dan nomor HP.',
          shortContext: 'Kotak Tabel',
          iconName: 'Table',
          correctCategory: 'Sisipkan Gambar & Tabel',
          studentHint: 'Menu Insert Table membuat baris dan kolom tabel.'
        },
        {
          id: 'doc-6',
          sentence: 'Membagikan link dokumen ke teman sekelompok dengan akses "Editor" agar bisa mengetik bersama.',
          shortContext: 'Bagi Link Cloud',
          iconName: 'Globe',
          correctCategory: 'Simpan & Kolaborasi Daring',
          studentHint: 'Fitur Share memungkinkan kolaborasi waktu nyata.'
        }
      ]
    };
  }

  if (t.includes('excel') || t.includes('spreadsheet') || t.includes('sheet') || t.includes('lembar kerja')) {
    return {
      title: 'Papan Klasifikasi Pengolah Angka & Spreadsheet',
      subtitle: 'Ayo maju ke layar IFP! Cocokkan tugas hitung dan data ini ke alat spreadsheet yang tepat!',
      teacherGuide: 'Siswa maju memilih kartu persoalan angka, lalu memilih rumus atau alat yang tepat.',
      categories: [
        {
          name: 'Rumus Berhitung Otomatis (SUM / AVERAGE)',
          badge: 'Hitung Angka ➕',
          emoji: '🧮',
          description: 'Menjumlahkan total uang kas atau menghitung nilai rata-rata',
          themeColor: 'emerald'
        },
        {
          name: 'Urutkan & Saring Data (Sort & Filter)',
          badge: 'Urutkan Data 🔍',
          emoji: '📊',
          description: 'Merapikan daftar nama dari A ke Z atau menyaring siswa lulus',
          themeColor: 'sky'
        },
        {
          name: 'Diagram & Grafik Visual',
          badge: 'Bagan Grafik 📈',
          emoji: '📉',
          description: 'Mengubah angka tabel menjadi gambar grafik batang atau lingkaran',
          themeColor: 'purple'
        }
      ],
      cards: [
        {
          id: 'xls-1',
          sentence: 'Menghitung total seluruh uang kas kelas yang terkumpul selama satu bulan memakai rumus =SUM.',
          shortContext: 'Total Uang Kas',
          iconName: 'FileSpreadsheet',
          correctCategory: 'Rumus Berhitung Otomatis (SUM / AVERAGE)',
          studentHint: 'SUM digunakan untuk menjumlahkan sekumpulan angka.'
        },
        {
          id: 'xls-2',
          sentence: 'Merapikan daftar nama siswa kelas dari urutan huruf A sampai Z secara otomatis.',
          shortContext: 'Urutkan Abjad',
          iconName: 'ArrowUpDown',
          correctCategory: 'Urutkan & Saring Data (Sort & Filter)',
          studentHint: 'Sort A-Z merapikan urutan teks berdasarkan alfabet.'
        },
        {
          id: 'xls-3',
          sentence: 'Mengubah tabel perolehan suara pemilihan ketua OSIS menjadi diagram lingkaran penuh warna.',
          shortContext: 'Bagan Lingkaran',
          iconName: 'PieChart',
          correctCategory: 'Diagram & Grafik Visual',
          studentHint: 'Chart/Grafik menyajikan angka secara visual.'
        },
        {
          id: 'xls-4',
          sentence: 'Menghitung nilai rata-rata ulangan harian Informatika seluruh kelas memakai rumus =AVERAGE.',
          shortContext: 'Nilai Rata-rata',
          iconName: 'Calculator',
          correctCategory: 'Rumus Berhitung Otomatis (SUM / AVERAGE)',
          studentHint: 'AVERAGE menghitung nilai rata-rata sekumpulan data.'
        },
        {
          id: 'xls-5',
          sentence: 'Menampilkan hanya siswa yang mendapatkan nilai di atas 80 menggunakan tombol corong Filter.',
          shortContext: 'Saring Nilai 80',
          iconName: 'Filter',
          correctCategory: 'Urutkan & Saring Data (Sort & Filter)',
          studentHint: 'Filter menyaring data berdasarkan syarat tertentu.'
        },
        {
          id: 'xls-6',
          sentence: 'Membuat diagram batang tinggi-rendah untuk membandingkan jumlah buku yang dipinjam di perpus.',
          shortContext: 'Diagram Batang',
          iconName: 'BarChart',
          correctCategory: 'Diagram & Grafik Visual',
          studentHint: 'Diagram batang memudahkan perbandingan jumlah.'
        }
      ]
    };
  }

  // Standar Universal Sangat Ceria (Mudah untuk Anak-Anak)
  return {
    title: `Papan Klasifikasi Pintar: ${topic.title}`,
    subtitle: 'Ayo maju ke layar IFP! Cocokkan kartu tindakan sehari-hari di bawah ini ke keranjang yang pas!',
    teacherGuide: 'Siswa bergantian maju menyentuh kartu cerita, lalu menaruhnya di keranjang yang tepat.',
    categories: [
      {
        name: 'Tindakan Tepat & Bermanfaat (Jempol 👍)',
        badge: 'Tindakan Tepat ⭐',
        emoji: '👍',
        description: 'Cara yang benar, aman, dan membawa manfaat saat belajar materi ini',
        themeColor: 'emerald'
      },
      {
        name: 'Penerapan Praktik di Sekolah (Bisa Dicoba 💻)',
        badge: 'Praktik Sekolah 🏫',
        emoji: '💻',
        description: 'Langkah nyata yang dipraktikkan siswa saat belajar di kelas atau lab',
        themeColor: 'sky'
      },
      {
        name: 'Tindakan Keliru yang Dihindari (Hati-Hati ⚠️)',
        badge: 'Harus Dihindari 🛑',
        emoji: '⚠️',
        description: 'Kebiasaan salah, ceroboh, atau merugikan yang wajib dihindari',
        themeColor: 'rose'
      }
    ],
    cards: [
      {
        id: 'uni-1',
        sentence: `Membaca petunjuk dan memahami konsep utama ${topic.title} sebelum mulai mengerjakan tugas.`,
        shortContext: 'Pahami Petunjuk',
        iconName: 'BookOpenCheck',
        correctCategory: 'Tindakan Tepat & Bermanfaat (Jempol 👍)',
        studentHint: 'Memahami konsep dasar membuat belajar jauh lebih lancar.'
      },
      {
        id: 'uni-2',
        sentence: `Mempraktikkan materi ${topic.title} bersama teman sekelompok di laboratorium sekolah.`,
        shortContext: 'Praktik di Lab',
        iconName: 'Users',
        correctCategory: 'Penerapan Praktik di Sekolah (Bisa Dicoba 💻)',
        studentHint: 'Praktik langsung mengasah keterampilan nyata.'
      },
      {
        id: 'uni-3',
        sentence: 'Mengerjakan tugas secara asal-asalan tanpa membaca panduan dan langsung menyalin milik teman.',
        shortContext: 'Menyontek Asal',
        iconName: 'AlertTriangle',
        correctCategory: 'Tindakan Keliru yang Dihindari (Hati-Hati ⚠️)',
        studentHint: 'Menyontek tanpa paham merugikan diri sendiri di masa depan.'
      },
      {
        id: 'uni-4',
        sentence: 'Bertanya secara santun kepada guru Informatika saat menemukan bagian materi yang belum dipahami.',
        shortContext: 'Tanya ke Guru',
        iconName: 'HelpCircle',
        correctCategory: 'Tindakan Tepat & Bermanfaat (Jempol 👍)',
        studentHint: 'Malu bertanya sesat di jalan, berani bertanya itu hebat!'
      },
      {
        id: 'uni-5',
        sentence: 'Menjaga dan merawat perangkat komputer sekolah dengan tidak makan atau minum di dekat meja lab.',
        shortContext: 'Disiplin di Lab',
        iconName: 'ShieldCheck',
        correctCategory: 'Penerapan Praktik di Sekolah (Bisa Dicoba 💻)',
        studentHint: 'Disiplin menjaga fasilitas belajar agar awet dan nyaman digunakan.'
      },
      {
        id: 'uni-6',
        sentence: 'Mematikan komputer sekolah secara paksa dengan mencabut kabel listrik dari stopkontak.',
        shortContext: 'Cabut Paksa Kabel',
        iconName: 'Power',
        correctCategory: 'Tindakan Keliru yang Dihindari (Hati-Hati ⚠️)',
        studentHint: 'Mematikan paksa dapat merusak sistem operasi dan perangkat keras.'
      }
    ]
  };
}
