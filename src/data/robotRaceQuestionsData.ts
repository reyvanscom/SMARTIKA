/**
 * Database Soal Khusus Mini Game: BALAPAN ROBOT 3D (Robot Race 3D)
 * Seluruh soal di file ini BERBEDA dari soal Pertarungan Robot (battleBot),
 * Tebak Kata (wordScramble), maupun Tebak Gambar (pictureGuess).
 * Dirancang kontekstual untuk Kelas 7, 8, dan 9 SMP Negeri 5 Kroya.
 */

export interface RobotRaceQuestion {
  id: number;
  sectorName: string;
  scenario: string;
  question: string;
  options: { label: string; text: string }[];
  correctIndex: number;
  boostPower: number;
  explanation: string;
}

export const ROBOT_RACE_QUESTIONS_REGISTRY: Record<string, RobotRaceQuestion[]> = {
  // =========================================================================
  // KELAS 7
  // =========================================================================
  'k7-idk': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Siber Kroya',
      scenario: 'Robot Pembalap menerima foto viral jembatan rusak yang diklaim terjadi hari ini, padahal cuaca di foto tampak bersalju.',
      question: 'Fitur apakah yang paling tepat digunakan untuk melacak kapan dan di mana foto itu pertama kali diunggah di internet?',
      options: [
        { label: 'A', text: 'Reverse Image Search (Pencarian Gambar Terbalik seperti Google Lens)' },
        { label: 'B', text: 'Kalkulator Ilmiah Windows' },
        { label: 'C', text: 'Pemutar Musik MP3' },
        { label: 'D', text: 'Pengaturan Kecerahan Layar Monitor' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Reverse Image Search melacak jejak asli foto di internet untuk membuktikan apakah foto lama dipakai ulang untuk hoaks.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Domain Resmi',
      scenario: 'Saat melaju di lintasan data, Robot harus memilih jalur portal data statistik penduduk resmi milik pemerintah Indonesia.',
      question: 'Ekstensi domain manakah yang menunjukkan lembaga resmi pemerintahan Republik Indonesia?',
      options: [
        { label: 'A', text: '.go.id (contoh: bps.go.id atau kominfo.go.id)' },
        { label: 'B', text: '.com (commercial bebas)' },
        { label: 'C', text: '.org (organisasi umum)' },
        { label: 'D', text: '.net (network umum)' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Domain .go.id (Government of Indonesia) dikhususkan secara ketat untuk instansi resmi pemerintah Indonesia.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Opini vs Fakta',
      scenario: 'Di layar sirkuit muncul dua kalimat: (1) "SMPN 5 Kroya terletak di Kabupaten Cilacap" dan (2) "Menurutku warna biru adalah warna paling keren di dunia".',
      question: 'Mengapa kalimat pertama disebut sebagai FAKTA sedangkan kalimat kedua adalah OPINI?',
      options: [
        { label: 'A', text: 'Kalimat pertama dapat dibuktikan kebenarannya secara objektif di peta, sedangkan kalimat kedua bersifat selera pribadi' },
        { label: 'B', text: 'Kalimat pertama lebih pendek daripada kalimat kedua' },
        { label: 'C', text: 'Kalimat kedua ditulis menggunakan huruf kapital' },
        { label: 'D', text: 'Semua kalimat di internet otomatis menjadi fakta' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Fakta memiliki bukti data terverifikasi secara objektif, sementara opini bergantung pada sudut pandang/perasaan seseorang.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Pencarian Presisi',
      scenario: 'Robot ingin mencari dokumen berformat PDF tentang "Kurikulum Merdeka" di mesin pencari secara cepat tanpa membuka situs satu per satu.',
      question: 'Operator pencarian manakah yang menghasilkan file PDF secara langsung?',
      options: [
        { label: 'A', text: 'Kurikulum Merdeka filetype:pdf' },
        { label: 'B', text: 'Kurikulum Merdeka @@@pdf' },
        { label: 'C', text: 'hapus:pdf Kurikulum Merdeka' },
        { label: 'D', text: 'warna:merah Kurikulum Merdeka' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Operator filetype:pdf menyaring hasil mesin pencari agar hanya menampilkan dokumen berformat PDF.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Sprint Garis Finish',
      scenario: 'Menjelang garis finish, muncul berita mengejutkan yang baru tayang 1 menit lalu dari akun anonim tanpa bukti foto maupun narasumber.',
      question: 'Prinsip "Saring Sebelum Sharing" manakah yang wajib diambil agar Robot selamat sampai garis finish?',
      options: [
        { label: 'A', text: 'Menahan diri untuk tidak meneruskan pesan dan menunggu konfirmasi dari media berita terverifikasi' },
        { label: 'B', text: 'Langsung membagikan ke semua grup kelas supaya jadi orang pertama yang update' },
        { label: 'C', text: 'Menambahkan bumbu cerita karangan sendiri agar makin seru' },
        { label: 'D', text: 'Memarahi teman yang tidak mau ikut menyebarkan' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Menahan jari dan memverifikasi ke media kredibel adalah kunci menghentikan rantai penyebaran disinformasi.'
    }
  ],

  'k7-bse': [
    {
      id: 1,
      sectorName: 'Sektor 1: Lintasan Pustaka Kemendikdasmen',
      scenario: 'Siswa ingin mengunduh Buku Sekolah Elektronik (BSE) resmi tanpa dipungut biaya.',
      question: 'Apa keuntungan utama buku digital berformat PDF dibandingkan buku cetak tebal saat dibawa belajar?',
      options: [
        { label: 'A', text: 'Dapat menyimpan puluhan buku pelajaran dalam satu perangkat ringan tanpa membebani tas sekolah' },
        { label: 'B', text: 'Buku digital bisa berubah menjadi makanan ringan' },
        { label: 'C', text: 'Buku digital tidak membutuhkan layar untuk dibaca' },
        { label: 'D', text: 'Buku digital otomatis mengerjakan PR tanpa dibaca' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Portabilitas tinggi memungkinkan ribuan halaman referensi dibawa di satu gawai atau laptop.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Navigasi Cepat',
      scenario: 'Buku Informatika digital memiliki 280 halaman, dan guru meminta siswa langsung membuka pembahasan "Jaringan Komputer".',
      question: 'Fitur pembaca PDF manakah yang memungkinkan kita melompat antar-bab hanya dengan satu klik?',
      options: [
        { label: 'A', text: 'Panel Daftar Isi Interaktif (Table of Contents / Outline)' },
        { label: 'B', text: 'Tombol Volume Suara' },
        { label: 'C', text: 'Kabel Pengisi Daya' },
        { label: 'D', text: 'Screen Saver' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Outline / Daftar Isi interaktif pada e-book mempunyai hyperlink langsung menuju halaman bab terkait.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Zona Kesehatan Mata',
      scenario: 'Membaca buku elektronik terlalu dekat di ruangan gelap membuat mata cepat lelah dan perih.',
      question: 'Aturan ergonomis "20-20-20" saat membaca layar digital yang benar adalah...',
      options: [
        { label: 'A', text: 'Setiap 20 menit membaca layar, istirahatkan mata selama 20 detik dengan melihat objek sejauh 20 kaki (6 meter)' },
        { label: 'B', text: 'Membaca 20 buku dalam waktu 20 detik dengan 20 lampu' },
        { label: 'C', text: 'Menatap layar dari jarak 2 milimeter selama 20 jam' },
        { label: 'D', text: 'Mematikan laptop selama 20 hari setiap membaca 1 kalimat' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Aturan 20-20-20 merelaksasi otot fokus mata agar terhindar dari Digital Eye Strain (kelelahan mata digital).'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Gerbang Lisensi Buku',
      scenario: 'Pada halaman hak cipta BSE tertulis bahwa buku tersebut dimiliki oleh Kementerian Pendidikan dan boleh diunduh bebas oleh pelajar.',
      question: 'Tindakan manakah yang MELANGGAR hukum atas Buku Sekolah Elektronik tersebut?',
      options: [
        { label: 'A', text: 'Menghapus nama penulis asli lalu mencetak dan menjualnya secara komersial demi keuntungan pribadi' },
        { label: 'B', text: 'Mengunduhnya ke tablet untuk belajar menghadapi ujian' },
        { label: 'C', text: 'Membagikan tautan resmi SIBI kepada teman sekelas' },
        { label: 'D', text: 'Membacanya bersama kelompok belajar di perpustakaan' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Buku BSE bebas digunakan untuk pendidikan, namun dilarang diplagiat atau dikomersialkan secara ilegal.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Garis Finish Literasi',
      scenario: 'Saat membaca BSE, kamu menemukan istilah asing "Algoritma" dan ingin memberi catatan arti kata tersebut di samping paragraf.',
      question: 'Alat anotasi digital apakah yang berfungsi menempelkan catatan teks kecil pada halaman e-book?',
      options: [
        { label: 'A', text: 'Sticky Note / Add Comment (Catatan Tempel Digital)' },
        { label: 'B', text: 'Format Harddisk' },
        { label: 'C', text: 'Task Manager' },
        { label: 'D', text: 'Firewall Blocker' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Sticky Note digital memudahkan siswa menyisipkan rangkuman atau arti istilah tanpa merusak teks buku.'
    }
  ],

  'k7-gdoc': [
    {
      id: 1,
      sectorName: 'Sektor 1: Start Pintasan Naskah',
      scenario: 'Saat mengetik laporan di Google Dokumen, kamu tidak sengaja menghapus satu paragraf penting.',
      question: 'Kombinasi tombol keyboard apakah yang paling cepat untuk membatalkan penghapusan tersebut (Undo)?',
      options: [
        { label: 'A', text: 'Ctrl + Z' },
        { label: 'B', text: 'Ctrl + P' },
        { label: 'C', text: 'Alt + F4' },
        { label: 'D', text: 'Shift + Delete' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Ctrl + Z (Undo) mengembalikan tindakan terakhir yang baru saja dilakukan di pengolah kata.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Tata Letak Halaman',
      scenario: 'Kelompokmu ingin membuat tabel jadwal piket kelas yang lebar sehingga membutuhkan kertas memanjang ke samping.',
      question: 'Pengaturan orientasi halaman (Page Orientation) apakah yang harus dipilih di menu File > Page Setup?',
      options: [
        { label: 'A', text: 'Landscape (Mendatar / Melebar)' },
        { label: 'B', text: 'Portrait (Tegak)' },
        { label: 'C', text: 'Diagonal' },
        { label: 'D', text: 'Subscript' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Orientasi Landscape memutar bidang halaman menjadi melebar secara horizontal.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Jalur Kolaborasi Awan',
      scenario: 'Ketua kelompok ingin membagikan link Google Dokumen kepada guru hanya untuk dibaca dan diberi komentar, tanpa bisa dihapus isinya.',
      question: 'Hak akses (Permission) manakah yang paling tepat diberikan saat klik tombol Bagikan (Share)?',
      options: [
        { label: 'A', text: 'Pemberi Komentar (Commenter)' },
        { label: 'B', text: 'Editor Penuh (Editor)' },
        { label: 'C', text: 'Transfer Kepemilikan (Owner)' },
        { label: 'D', text: 'Blokir Akses' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Peran Commenter mengizinkan pembaca memberi catatan dan saran revisi tanpa mengubah teks utama secara langsung.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Terowongan Riwayat Versi',
      scenario: 'Seorang anggota tim tidak sengaja menimpa isi bab pendahuluan kemarin sore.',
      question: 'Fitur Google Dokumen manakah yang dapat melihat siapa yang mengedit dan memulihkan dokumen ke kondisi kemarin?',
      options: [
        { label: 'A', text: 'Version History (Riwayat Versi)' },
        { label: 'B', text: 'Word Count (Jumlah Kata)' },
        { label: 'C', text: 'Spell Check (Pemeriksa Ejaan)' },
        { label: 'D', text: 'Page Break' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Version History mencatat setiap perubahan dari waktu ke waktu beserta nama akun pengeditnya.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Dokumen Standar',
      scenario: 'Guru meminta naskah laporan akhir dikirim dalam format dokumen portabel yang tata letaknya terkunci rapi saat dibuka di HP maupun komputer.',
      question: 'Pilihan menu File > Download manakah yang harus dipilih?',
      options: [
        { label: 'A', text: 'PDF Document (.pdf)' },
        { label: 'B', text: 'Audio MP3 (.mp3)' },
        { label: 'C', text: 'Aplikasi Eksekusi (.exe)' },
        { label: 'D', text: 'Gambar Ikon (.ico)' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Format PDF menjaga font, margin, dan posisi gambar tetap presisi di semua perangkat.'
    }
  ],

  'k7-gsheet': [
    {
      id: 1,
      sectorName: 'Sektor 1: Lintasan Koordinat Sel',
      scenario: 'Robot Pembalap berada di perpotongan antara Kolom D dan Baris ke-8 pada lembar kerja Google Spreadsheet.',
      question: 'Bagaimana penulisan alamat sel (Cell Address) yang benar untuk posisi tersebut?',
      options: [
        { label: 'A', text: 'D8' },
        { label: 'B', text: '8D' },
        { label: 'C', text: 'D-8-D' },
        { label: 'D', text: 'Baris8KolomD' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Alamat sel selalu diawali huruf kolom diikuti nomor baris, yaitu D8.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Operator Matematika',
      scenario: 'Kamu ingin mengalikan jumlah barang di sel B2 dengan harga satuan di sel C2.',
      question: 'Simbol operator apakah yang digunakan untuk perkalian di dalam rumus Google Spreadsheet?',
      options: [
        { label: 'A', text: 'Tanda bintang ( * ), contoh: =B2*C2' },
        { label: 'B', text: 'Huruf X besar, contoh: =B2XC2' },
        { label: 'C', text: 'Tanda titik dua ( : ), contoh: =B2:C2' },
        { label: 'D', text: 'Tanda pagar ( # ), contoh: =B2#C2' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Dalam komputasi spreadsheet, tanda asterisk (*) digunakan sebagai operator perkalian.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Fungsi Statistik',
      scenario: 'Bendahara kelas ingin mencari nilai tertinggi dari daftar nilai ujian Informatika di rentang sel E2 sampai E32.',
      question: 'Rumus fungsi apakah yang paling tepat diketikkan?',
      options: [
        { label: 'A', text: '=MAX(E2:E32)' },
        { label: 'B', text: '=MIN(E2:E32)' },
        { label: 'C', text: '=SUM(E2:E32)' },
        { label: 'D', text: '=COUNT(E2:E32)' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Fungsi MAX mengambil angka paling besar (maksimum) dari sekumpulan data.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Urutan Data',
      scenario: 'Daftar nama siswa di tabel masih acak dan guru meminta agar diurutkan sesuai abjad dari A sampai Z.',
      question: 'Fitur Google Spreadsheet manakah yang harus digunakan?',
      options: [
        { label: 'A', text: 'Sort Range A to Z (Urutkan Rentang A ke Z)' },
        { label: 'B', text: 'Merge Cells (Gabungkan Sel)' },
        { label: 'C', text: 'Wrap Text (Kemas Teks)' },
        { label: 'D', text: 'Delete Row (Hapus Baris)' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Sort Range A to Z menyusun baris data secara alfabetis naik (ascending).'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Sprint Visualisasi Grafik',
      scenario: 'Kamu ingin menampilkan perbandingan persentase pemilih kandidat ketua OSIS dalam bentuk lingkaran terbagi.',
      question: 'Jenis grafik (Chart) apakah yang paling cocok untuk menunjukkan porsi persentase terhadap total 100%?',
      options: [
        { label: 'A', text: 'Pie Chart (Diagram Lingkaran)' },
        { label: 'B', text: 'Scatter Plot' },
        { label: 'C', text: 'Tabel Teks Polos' },
        { label: 'D', text: 'Peta Geografi' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Pie Chart sangat ideal untuk memvisualisasikan proporsi bagian terhadap keseluruhan.'
    }
  ],

  'k7-gslide': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Desain Visual',
      scenario: 'Kelompokmu membuat slide presentasi dengan latar belakang warna kuning terang dan teks berwarna putih pucat.',
      question: 'Mengapa kombinasi warna tersebut harus dihindari saat ditampilkan di layar IFP kelas?',
      options: [
        { label: 'A', text: 'Tingkat kontras terlalu rendah sehingga tulisan sulit dibaca oleh audiens dari bangku belakang' },
        { label: 'B', text: 'Warna kuning membuat laptop menjadi berat' },
        { label: 'C', text: 'Google Slide melarang penggunaan warna cerah' },
        { label: 'D', text: 'File presentasi akan berubah menjadi hitam putih' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Kontras tinggi (latar gelap teks terang, atau latar terang teks gelap) wajib dijaga demi keterbacaan.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Transisi vs Animasi',
      scenario: 'Siswa ingin memberikan efek gerak bergeser saat berpindah dari Slide 1 ke Slide 2.',
      question: 'Fitur apakah yang mengatur efek perpindahan antar-halaman slide tersebut?',
      options: [
        { label: 'A', text: 'Slide Transition (Transisi Slide)' },
        { label: 'B', text: 'Font Size (Ukuran Huruf)' },
        { label: 'C', text: 'Master Table' },
        { label: 'D', text: 'Spell Checker' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Transisi mengatur perpindahan antar-slide, sedangkan Animasi mengatur gerak objek di dalam satu slide.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Catatan Pembicara',
      scenario: 'Saat tampil presentasi, kamu tidak ingin menyalin seluruh naskah panjang ke layar slide, tetapi tetap butuh contekan poin bicara.',
      question: 'Bagian Google Slide manakah yang hanya terlihat oleh presenter dan tidak muncul di layar audiens saat mode Presenter View?',
      options: [
        { label: 'A', text: 'Speaker Notes (Catatan Pembicara di bagian bawah slide)' },
        { label: 'B', text: 'Judul Utama Slide' },
        { label: 'C', text: 'Background Image' },
        { label: 'D', text: 'Nomor Halaman Slide' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Speaker Notes membantu presenter mengingat detail penjelasan sementara slide tetap ringkas.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Pintasan Tayang',
      scenario: 'Semua anggota kelompok sudah siap di depan kelas dan ingin langsung menayangkan slide ke layar penuh.',
      question: 'Tombol pintasan apakah yang digunakan untuk memulai mode Presentasi (Slideshow) di Google Slide?',
      options: [
        { label: 'A', text: 'Ctrl + F5 (atau klik tombol Slideshow)' },
        { label: 'B', text: 'Ctrl + C' },
        { label: 'C', text: 'Ctrl + V' },
        { label: 'D', text: 'Alt + Tab' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Ctrl + F5 langsung menayangkan presentasi Google Slide dalam tampilan layar penuh.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Presentasi Efektif',
      scenario: 'Seorang siswa memasukkan 12 efek suara ledakan dan animasi berputar di setiap kalimat pada satu slide.',
      question: 'Apa dampak buruk dari penggunaan animasi yang berlebihan tersebut?',
      options: [
        { label: 'A', text: 'Mengalihkan perhatian audiens dari inti materi dan memperlambat waktu penyampaian' },
        { label: 'B', text: 'Membuat nilai presentasi otomatis menjadi 100' },
        { label: 'C', text: 'Menghapus koneksi Wi-Fi sekolah' },
        { label: 'D', text: 'Menambah kapasitas RAM komputer' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Animasi yang efektif harus fungsional dan secukupnya agar pesan materi tetap menjadi fokus utama.'
    }
  ],

  'k7-bk': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Dekomposisi',
      scenario: 'Panitia OSIS SMPN 5 Kroya ingin menyelenggarakan acara Pentas Seni sekolah yang besar dan kompleks.',
      question: 'Manakah contoh penerapan pilar DEKOMPOSISI yang tepat dalam kepanitiaan tersebut?',
      options: [
        { label: 'A', text: 'Membagi tugas besar menjadi seksi acara, seksi perlengkapan, seksi konsumsi, dan seksi dokumentasi' },
        { label: 'B', text: 'Menyuruh satu orang siswa mengerjakan seluruh acara sendirian' },
        { label: 'C', text: 'Membatalkan acara karena terlihat sulit' },
        { label: 'D', text: 'Menyalin jadwal ujian sekolah tahun lalu' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Dekomposisi memecah persoalan besar menjadi bagian-bagian kecil yang lebih mudah dikelola.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Pengenalan Pola',
      scenario: 'Di sirkuit balap terdapat deret kode energi: 3, 6, 12, 24, ..., 96.',
      question: 'Berdasarkan Pengenalan Pola (Pattern Recognition), berapakah angka yang tepat untuk mengisi titik-titik tersebut?',
      options: [
        { label: 'A', text: '48 (karena pola setiap suku dikalikan 2)' },
        { label: 'B', text: '30' },
        { label: 'C', text: '36' },
        { label: 'D', text: '50' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Polanya adalah penggandaan (×2): 3×2=6, 6×2=12, 12×2=24, maka 24×2=48.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Abstraksi',
      scenario: 'Saat menggambar denah lokasi ruang laboratorium komputer untuk tamu sekolah, kamu hanya menggambar jalur koridor dan nama gedung tanpa menggambar jumlah rumput di taman.',
      question: 'Pilar berpikir komputasional apakah yang sedang kamu terapkan?',
      options: [
        { label: 'A', text: 'Abstraksi (Menyaring informasi penting dan mengabaikan detail yang tidak relevan)' },
        { label: 'B', text: 'Instalasi Hardware' },
        { label: 'C', text: 'Enkripsi Sandi' },
        { label: 'D', text: 'Kompilasi Biner' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Abstraksi memfokuskan perhatian pada informasi esensial (jalur gedung) dan membuang detail pengganggu (jumlah rumput).'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Urutan Algoritma',
      scenario: 'Robot Koki diminta membuat teh manis hangat. Jika langkah "Tuang air panas ke gelas" ditaruh SETELAH langkah "Minum teh sampai habis", hasilnya kacau.',
      question: 'Hal ini membuktikan bahwa dalam menyusun ALGORITMA, hal yang sangat krusial adalah...',
      options: [
        { label: 'A', text: 'Urutan langkah yang logis, sistematis, dan tidak terbalik' },
        { label: 'B', text: 'Harga gelas yang mahal' },
        { label: 'C', text: 'Warna sendok yang digunakan' },
        { label: 'D', text: 'Panjang kalimat instruksi' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Algoritma harus memiliki urutan langkah (sequence) yang tepat agar menghasilkan output yang benar.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Pencarian Efisien',
      scenario: 'Kamu mencari kata "Komputasi" di dalam Kamus Besar Bahasa Indonesia yang halamannya sudah urut abjad A-Z dengan cara membuka halaman tengah terlebih dahulu.',
      question: 'Metode pencarian membelah dua bagian secara berulang pada data terurut ini dalam Informatika dikenal dengan konsep...',
      options: [
        { label: 'A', text: 'Binary Search (Pencarian Bagi Dua)' },
        { label: 'B', text: 'Random Guessing (Tebak Acak)' },
        { label: 'C', text: 'Format Disk' },
        { label: 'D', text: 'Spamming' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Binary Search jauh lebih cepat dibanding mengecek halaman satu per satu dari halaman pertama.'
    }
  ],

  'k7-hd': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Jejak Digital',
      scenario: 'Semua komentar, foto yang diunggah, dan riwayat pencarian di internet akan terekam dan sulit dihapus sepenuhnya.',
      question: 'Rekaman aktivitas pengguna yang tertinggal di dunia maya tersebut dinamakan...',
      options: [
        { label: 'A', text: 'Jejak Digital (Digital Footprint)' },
        { label: 'B', text: 'Memori RAM' },
        { label: 'C', text: 'Bandwidth Kuota' },
        { label: 'D', text: 'Resolusi Layar' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Jejak digital terbagi menjadi jejak aktif (unggahan kita) dan pasif (riwayat kunjungan/IP).'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Wi-Fi Publik',
      scenario: 'Saat berada di taman kota, kamu menemukan jaringan Wi-Fi gratis tanpa kata sandi bernama "Free_WiFi_Cepat".',
      question: 'Tindakan manakah yang PALING AMAN dilakukan saat terhubung ke Wi-Fi publik terbuka?',
      options: [
        { label: 'A', text: 'Tidak melakukan transaksi perbankan atau login akun penting yang berisi data rahasia' },
        { label: 'B', text: 'Membagikan seluruh password email di grup chat' },
        { label: 'C', text: 'Mematikan antivirus dan firewall laptop' },
        { label: 'D', text: 'Mengunduh file .exe dari pop-up tidak dikenal' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Wi-Fi publik terbuka rawan penyadapan paket data (sniffing) oleh pihak tidak bertanggung jawab.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Izin Aplikasi',
      scenario: 'Kamu menginstal aplikasi "Senter Sederhana" di HP, tetapi aplikasi itu meminta izin mengakses Daftar Kontak, Kamera, Mikrofon, dan Lokasi GPS.',
      question: 'Sikap cerdas apa yang harus diambil demi keamanan privasi?',
      options: [
        { label: 'A', text: 'Menolak izin yang tidak masuk akal tersebut dan membatalkan instalasi aplikasi' },
        { label: 'B', text: 'Langsung menekan tombol Izinkan Semua tanpa membaca' },
        { label: 'C', text: 'Memberikan foto KTP orang tua ke dalam aplikasi senter' },
        { label: 'D', text: 'Menyuruh teman ikut menginstal aplikasi mencurigakan itu' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Aplikasi hanya boleh meminta izin (permission) yang relevan dengan fungsi utamanya.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Komputer Lab Sekolah',
      scenario: 'Kamu baru saja selesai mengerjakan tugas dengan akun Google Drive pribadimu di komputer laboratorium sekolah.',
      question: 'Langkah wajib sebelum meninggalkan kursi laboratorium agar akunmu tidak dipakai orang berikutnya adalah...',
      options: [
        { label: 'A', text: 'Melakukan Logout (Keluar) dari akun dan menutup jendela peramban' },
        { label: 'B', text: 'Menekan tombol Simpan Kata Sandi Otomatis di browser lab' },
        { label: 'C', text: 'Mencabut kabel mouse komputer' },
        { label: 'D', text: 'Mematikan lampu ruangan saja' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Selalu Logout dari perangkat bersama agar sesi login tidak disalahgunakan pengguna selanjutnya.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Perlindungan Akun',
      scenario: 'Agar akun belajar tetap aman meskipun kata sandi bocor, sistem mengirimkan kode 6 digit ke nomor HP pemilik asli saat login di perangkat baru.',
      question: 'Lapisan keamanan ganda ini dikenal dengan istilah...',
      options: [
        { label: 'A', text: 'Two-Factor Authentication (2FA / Autentikasi Dua Faktor)' },
        { label: 'B', text: 'Auto-Complete Password' },
        { label: 'C', text: 'Airplane Mode' },
        { label: 'D', text: 'Screen Mirroring' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: '2FA menggabungkan sesuatu yang kamu tahu (password) dan sesuatu yang kamu miliki (kode OTP di HP).'
    }
  ],

  'k7-komputer': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Papan Induk',
      scenario: 'Di dalam casing komputer terdapat papan sirkuit utama tempat CPU, RAM, dan kartu grafis ditancapkan agar bisa saling berkomunikasi.',
      question: 'Komponen papan sirkuit utama tersebut dinamakan...',
      options: [
        { label: 'A', text: 'Motherboard (Mainboard)' },
        { label: 'B', text: 'Power Supply Unit' },
        { label: 'C', text: 'Touchpad' },
        { label: 'D', text: 'Heatsink Fan' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Motherboard adalah papan induk penghubung seluruh komponen perangkat keras internal komputer.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Grafis 3D',
      scenario: 'Saat memainkan Arena Robot 3D, komputer membutuhkan komponen khusus untuk mengolah bayangan, tekstur, dan objek tiga dimensi dengan mulus.',
      question: 'Komponen pemroses grafis tersebut dikenal dengan singkatan...',
      options: [
        { label: 'A', text: 'GPU / VGA Card (Graphics Processing Unit)' },
        { label: 'B', text: 'LAN Card' },
        { label: 'C', text: 'Sound Card' },
        { label: 'D', text: 'Floppy Disk' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'GPU dirancang khusus untuk mempercepat perhitungan visual 2D dan 3D menuju layar monitor.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Perangkat Lunak',
      scenario: 'Windows, Linux Ubuntu, macOS, dan Android bertugas mengelola perangkat keras agar aplikasi lain bisa berjalan.',
      question: 'Keempat perangkat lunak fundamental tersebut tergolong sebagai...',
      options: [
        { label: 'A', text: 'Sistem Operasi (Operating System)' },
        { label: 'B', text: 'Perangkat Keras Masukan' },
        { label: 'C', text: 'Aplikasi Permainan' },
        { label: 'D', text: 'Kabel Jaringan' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Sistem Operasi menjembatani pengguna (brainware), aplikasi (software), dan mesin fisik (hardware).'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Layar Sentuh IFP',
      scenario: 'Layar Interactive Flat Panel (IFP) di depan kelas menampilkan gambar sekaligus menerima perintah sentuhan jari siswa.',
      question: 'Oleh karena itu, layar sentuh (Touchscreen) dikategorikan sebagai perangkat...',
      options: [
        { label: 'A', text: 'Hibrida Input dan Output sekaligus (I/O Device)' },
        { label: 'B', text: 'Perangkat Penyimpanan Kaset' },
        { label: 'C', text: 'Pendingin Prosesor' },
        { label: 'D', text: 'Pencetak Kertas' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Panel kaca menerima sentuhan (Input) dan panel layar menampilkan gambar visual (Output).'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Pilar Brainware',
      scenario: 'Komputer tercanggih sekalipun tidak akan bermanfaat tanpa adanya manusia yang memprogram, mengoperasikan, dan merawatnya.',
      question: 'Unsur manusia pengguna komputer dalam sistem komputasi disebut sebagai...',
      options: [
        { label: 'A', text: 'Brainware' },
        { label: 'B', text: 'Hardware' },
        { label: 'C', text: 'Firmware' },
        { label: 'D', text: 'Malware' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Tiga elemen utama sistem komputer yang tak terpisahkan adalah Hardware, Software, dan Brainware.'
    }
  ],

  // =========================================================================
  // KELAS 8
  // =========================================================================
  'k8-fakta-hoaks': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Foto Manipulasi',
      scenario: 'Beredar video seorang tokoh masyarakat berbicara aneh, namun gerakan bibirnya tampak tidak sinkron dan berkedip tidak wajar.',
      question: 'Teknologi rekayasa kecerdasan buatan yang memalsukan wajah atau suara seseorang dalam video disebut...',
      options: [
        { label: 'A', text: 'Deepfake' },
        { label: 'B', text: 'Screenshot' },
        { label: 'C', text: 'Hyperlink' },
        { label: 'D', text: 'Cloud Backup' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Deepfake menggunakan AI untuk memanipulasi wajah dan suara sehingga perlu diverifikasi dari sumber aslinya.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Konteks Salah',
      scenario: 'Sebuah foto asli kemacetan tahun 2019 diunggah ulang pada tahun ini dengan keterangan palsu "Macet parah pagi ini akibat jembatan ambruk!".',
      question: 'Jenis disinformasi yang menggunakan foto asli tetapi ditempelkan pada peristiwa yang salah disebut...',
      options: [
        { label: 'A', text: 'False Context (Konteks yang Menyesatkan)' },
        { label: 'B', text: 'Fakta Ilmiah' },
        { label: 'C', text: 'Jurnal Akademik' },
        { label: 'D', text: 'Laporan Cuaca Resmi' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Meskipun fotonya asli (tidak diedit), penggunaannya pada waktu/peristiwa berbeda merupakan hoaks False Context.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Umpan Klik',
      scenario: 'Sebuah artikel berjudul "MENGGEGERKAN! Jangan Buka Pintu Rumah Jam 12 Siang, Nomor 4 Bikin Merinding!", tetapi isi beritanya hanya tips mengunci pintu biasa.',
      question: 'Teknik pembuatan judul sensasional yang memancing rasa penasaran berlebihan tersebut dinamakan...',
      options: [
        { label: 'A', text: 'Clickbait (Umpan Klik)' },
        { label: 'B', text: 'Peer Review' },
        { label: 'C', text: 'Ensiklopedia' },
        { label: 'D', text: 'Bibliografi' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Clickbait sengaja mendramatisasi judul demi mengejar jumlah klik iklan.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Verifikasi Resmi',
      scenario: 'Kamu menerima pesan tentang lowongan beasiswa sekolah yang mencurigakan dan ingin mengecek apakah itu penipuan atau bukan.',
      question: 'Portal cek fakta manakah yang dikelola secara resmi di Indonesia untuk memeriksa kebenaran isu viral?',
      options: [
        { label: 'A', text: 'TurnBackHoax.id (MAFINDO) dan CekFakta.com' },
        { label: 'B', text: 'Komentar anonim di media sosial' },
        { label: 'C', text: 'Status WhatsApp orang tak dikenal' },
        { label: 'D', text: 'Game online' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'TurnBackHoax.id dan CekFakta.com adalah rujukan kolaborasi pemeriksa fakta terverifikasi di Indonesia.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Literasi Kritis',
      scenario: 'Sebelum mempercayai sebuah berita, siswa SMPN 5 Kroya menerapkan rumus 5W + 1H.',
      question: 'Pertanyaan "Who" dan "When" dalam pemeriksaan berita bertujuan untuk memastikan...',
      options: [
        { label: 'A', text: 'Siapa sumber/penulis resminya dan kapan peristiwa tersebut benar-benar terjadi' },
        { label: 'B', text: 'Berapa harga kuota internet dan merek HP pembaca' },
        { label: 'C', text: 'Warna desain situs dan jenis hurufnya' },
        { label: 'D', text: 'Jumlah emoji di dalam pesan' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Memeriksa kredibilitas narasumber (Who) dan tanggal kejadian (When) mencegah kita tertipu berita basi atau fiktif.'
    }
  ],

  'k8-jaringan': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Skala Jaringan',
      scenario: 'Dua puluh komputer di dalam satu ruang Laboratorium Informatika SMPN 5 Kroya dihubungkan menggunakan switch dan kabel UTP.',
      question: 'Jaringan komputer yang mencakup area lokal terbatas seperti satu ruangan atau gedung sekolah disebut...',
      options: [
        { label: 'A', text: 'LAN (Local Area Network)' },
        { label: 'B', text: 'WAN (Wide Area Network antarbenua)' },
        { label: 'C', text: 'MAN (Metropolitan Area Network antarkota)' },
        { label: 'D', text: 'Satelit Orbit Luar Angkasa' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'LAN menghubungkan perangkat dalam satu area lokal seperti rumah, laboratorium, atau gedung sekolah.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Perangkat Pengarah',
      scenario: 'Paket data dari jaringan lokal sekolah ingin dikirimkan keluar menuju jaringan internet global.',
      question: 'Perangkat keras jaringan apakah yang bertugas menentukan rute terbaik pengiriman paket data antar-jaringan yang berbeda?',
      options: [
        { label: 'A', text: 'Router' },
        { label: 'B', text: 'Speaker Aktif' },
        { label: 'C', text: 'Plotter' },
        { label: 'D', text: 'Barcode Scanner' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Router mengarahkan (routing) paket data dari satu jaringan ke jaringan lainnya.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Identitas Perangkat',
      scenario: 'Setiap komputer yang terhubung ke jaringan memiliki alamat numerik unik seperti 192.168.1.10 agar paket data tidak salah alamat.',
      question: 'Alamat numerik unik pada protokol jaringan tersebut dinamakan...',
      options: [
        { label: 'A', text: 'IP Address (Internet Protocol Address)' },
        { label: 'B', text: 'Kode Pos Kecamatan' },
        { label: 'C', text: 'Nomor Induk Siswa' },
        { label: 'D', text: 'Ukuran Resolusi Layar' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'IP Address adalah identitas logis setiap perangkat untuk mengirim dan menerima data di jaringan.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Serat Cahaya',
      scenario: 'Koneksi internet tulang punggung (backbone) masa kini mampu mentransmisikan data super cepat menggunakan pantulan cahaya di dalam serat kaca.',
      question: 'Media transmisi kabel berkecepatan tinggi tersebut dikenal dengan nama...',
      options: [
        { label: 'A', text: 'Kabel Fiber Optik (Optical Fiber)' },
        { label: 'B', text: 'Kabel Tembaga Telepon Rumah' },
        { label: 'C', text: 'Kawat Jemuran' },
        { label: 'D', text: 'Kabel Audio AUX' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Fiber Optik menghantarkan data menggunakan sinyal cahaya sehingga tahan gangguan elektromagnetik dan sangat cepat.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Kecepatan Lebar Pita',
      scenario: 'Laboratorium komputer meningkatkan kapasitas koneksi internetnya dari 50 Mbps menjadi 200 Mbps agar 32 siswa bisa streaming video belajar serentak.',
      question: 'Kapasitas maksimum jumlah data yang dapat dikirimkan melalui jalur jaringan dalam satu detik disebut...',
      options: [
        { label: 'A', text: 'Bandwidth' },
        { label: 'B', text: 'Brightness' },
        { label: 'C', text: 'Motherboard' },
        { label: 'D', text: 'Screensaver' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Bandwidth diibaratkan lebar jalan raya; makin besar Mbps-nya, makin banyak data yang mengalir tiap detik.'
    }
  ],

  'k8-koneksi': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Berbagi Koneksi',
      scenario: 'Saat belajar kelompok di luar kelas, laptop temanmu membutuhkan koneksi internet dan kamu menyalakan fitur berbagi kuota dari smartphone-mu.',
      question: 'Fitur menjadikan ponsel sebagai titik akses Wi-Fi portabel tersebut dinamakan...',
      options: [
        { label: 'A', text: 'Tethering / Mobile Hotspot' },
        { label: 'B', text: 'Mode Pesawat (Airplane Mode)' },
        { label: 'C', text: 'Format Factory Reset' },
        { label: 'D', text: 'Defragment Disk' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Tethering (Hotspot Seluler) membagikan koneksi data seluler ponsel ke perangkat lain via Wi-Fi, Bluetooth, atau USB.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Sandi Wi-Fi',
      scenario: 'Ketika mengatur Mobile Hotspot di HP, kamu diminta memilih jenis keamanan (Security) jaringan.',
      question: 'Protokol enkripsi manakah yang direkomendasikan agar jaringan hotspot-mu tidak dibobol orang asing?',
      options: [
        { label: 'A', text: 'WPA2-Personal atau WPA3-Personal dengan kata sandi kuat' },
        { label: 'B', text: 'Open / Tanpa Password sama sekali' },
        { label: 'C', text: 'Password "12345678"' },
        { label: 'D', text: 'Mematikan fitur keamanan router' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'WPA2/WPA3 mengenkripsi trafik nirkabel sehingga hanya pengguna dengan sandi sah yang dapat terhubung.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Jarak Pendek',
      scenario: 'Kamu ingin menghubungkan mouse nirkabel (wireless) dan headset TWS ke laptop dalam jarak 2 meter dengan konsumsi baterai sangat hemat.',
      question: 'Teknologi koneksi nirkabel jarak pendek apakah yang paling tepat digunakan?',
      options: [
        { label: 'A', text: 'Bluetooth' },
        { label: 'B', text: 'Satelit VSAT' },
        { label: 'C', text: 'Gelombang Radio AM' },
        { label: 'D', text: 'Kabel Koaksial TV' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Bluetooth ideal untuk Personal Area Network (PAN) jarak dekat dengan daya listrik rendah.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Uji Koneksi',
      scenario: 'Komputer sudah terhubung ke Wi-Fi sekolah, tetapi halaman web tidak mau terbuka. Teknisi ingin mengetes apakah server tujuan merespons paket data.',
      question: 'Perintah dasar di Command Prompt / Terminal untuk menguji keterhubungan dan waktu respons (latensi ms) jaringan adalah...',
      options: [
        { label: 'A', text: 'ping (contoh: ping google.com)' },
        { label: 'B', text: 'del *.*' },
        { label: 'C', text: 'mkdir folder_baru' },
        { label: 'D', text: 'shutdown -s' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Perintah ping mengirim paket ICMP Echo Request untuk mengukur apakah host tujuan aktif dan seberapa cepat responsnya.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Keamanan Situs',
      scenario: 'Saat mengakses portal ujian sekolah di peramban, terdapat ikon gembok tertutup di sebelah kiri alamat URL.',
      question: 'Protokol apakah yang menjamin bahwa komunikasi data antara browser siswa dan server web telah dienkripsi dengan aman?',
      options: [
        { label: 'A', text: 'HTTPS (Hypertext Transfer Protocol Secure)' },
        { label: 'B', text: 'HTTP tanpa huruf S' },
        { label: 'C', text: 'FTP Terbuka' },
        { label: 'D', text: 'Telnet Polos' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'HTTPS menggunakan enkripsi TLS/SSL sehingga data login dan jawaban ujian tidak dapat disadap di tengah jalan.'
    }
  ],

  'k8-excel': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Logika Percabangan',
      scenario: 'Guru ingin membuat kolom otomatis di Spreadsheet: jika nilai di sel C4 >= 75 maka tertulis "TUNTAS", selain itu "REMEDIAL".',
      question: 'Penulisan rumus fungsi logika IF yang benar adalah...',
      options: [
        { label: 'A', text: '=IF(C4>=75; "TUNTAS"; "REMEDIAL")' },
        { label: 'B', text: '=SUM(C4>=75; "TUNTAS")' },
        { label: 'C', text: '=AVERAGE("TUNTAS"; "REMEDIAL")' },
        { label: 'D', text: '=MAX(C4="TUNTAS")' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Fungsi IF menguji kondisi logika (C4>=75) lalu menghasilkan nilai jika benar ("TUNTAS") dan nilai jika salah ("REMEDIAL").'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Hitung Bersyarat',
      scenario: 'Pada kolom D2:D35 tertulis kehadiran siswa ("Hadir", "Sakit", "Izin"). Ketua kelas ingin menghitung berapa banyak siswa yang berstatus "Hadir".',
      question: 'Fungsi spreadsheet apakah yang digunakan untuk menghitung jumlah sel yang memenuhi satu kriteria tertentu?',
      options: [
        { label: 'A', text: '=COUNTIF(D2:D35; "Hadir")' },
        { label: 'B', text: '=SUM(D2:D35)' },
        { label: 'C', text: '=MIN(D2:D35)' },
        { label: 'D', text: '=PROPER(D2:D35)' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'COUNTIF menggabungkan COUNT (menghitung cacah sel) dan IF (berdasarkan syarat tertentu).'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Jumlah Bersyarat',
      scenario: 'Panitia koperasi mencatat penjualan barang dan ingin menjumlahkan total rupiah KHUSUS untuk kategori "Alat Tulis" saja.',
      question: 'Fungsi manakah yang menjumlahkan angka berdasarkan kriteria tertentu?',
      options: [
        { label: 'A', text: 'SUMIF' },
        { label: 'B', text: 'COUNTA' },
        { label: 'C', text: 'LEFT' },
        { label: 'D', text: 'CONCATENATE' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'SUMIF menjumlahkan nilai numerik pada rentang yang cocok dengan syarat kriteria yang ditentukan.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Kunci Referensi Sel',
      scenario: 'Saat menyalin rumus ke bawah, kamu ingin alamat sel diskon di $F$1 tetap terkunci dan tidak ikut bergeser menjadi F2, F3.',
      question: 'Penggunaan tanda dolar ($F$1) untuk mengunci posisi baris dan kolom dalam spreadsheet disebut...',
      options: [
        { label: 'A', text: 'Referensi Sel Absolut (Absolute Cell Reference)' },
        { label: 'B', text: 'Format Mata Uang Dollar' },
        { label: 'C', text: 'Pesan Error Rumus' },
        { label: 'D', text: 'Filter Tabel Otomatis' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Tanda $ (bisa ditekan dengan tombol F4) mengunci alamat sel secara absolut saat rumus disalin (autofill).'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Pencarian Tabel',
      scenario: 'Kamu memiliki tabel daftar kode buku secara vertikal dan ingin menampilkan judul buku otomatis saat kodenya diketik.',
      question: 'Fungsi pencarian data secara tegak lurus (vertikal) pada tabel referensi disebut...',
      options: [
        { label: 'A', text: 'VLOOKUP (Vertical Lookup)' },
        { label: 'B', text: 'LOWER' },
        { label: 'C', text: 'ROUND' },
        { label: 'D', text: 'NOW' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'VLOOKUP mencari nilai kunci di kolom paling kiri tabel lalu mengambil data dari kolom di sebelahnya pada baris yang sama.'
    }
  ],

  'k8-digital-etika': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Hak Cipta Karya',
      scenario: 'Temanmu mengambil lukisan digital karya seniman lain dari internet, menghapus tanda tangan pemiliknya, lalu mengakuinya sebagai karyanya sendiri.',
      question: 'Perbuatan tidak terpuji menjiplak dan mengakui karya orang lain sebagai milik sendiri disebut...',
      options: [
        { label: 'A', text: 'Plagiarisme' },
        { label: 'B', text: 'Apresiasi Seni' },
        { label: 'C', text: 'Sitasi Ilmiah' },
        { label: 'D', text: 'Kolaborasi Terbuka' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Plagiarisme melanggar etika akademik dan Undang-Undang Hak Cipta.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Lisensi Creative Commons',
      scenario: 'Saat mencari musik latar untuk video proyek kelas, kamu menemukan musik berlisensi "CC BY" (Creative Commons Attribution).',
      question: 'Apa arti dari lisensi CC BY tersebut?',
      options: [
        { label: 'A', text: 'Boleh digunakan secara gratis asalkan wajib mencantumkan nama pembuat aslinya (atribusi)' },
        { label: 'B', text: 'Dilarang didengarkan oleh siapa pun' },
        { label: 'C', text: 'Harus membayar denda Rp 10 juta' },
        { label: 'D', text: 'Boleh diklaim bahwa kita yang menciptakan lagunya' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Kode BY pada Creative Commons mewajibkan pengguna menyebutkan kredit/pencipta asli karya tersebut.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Anti-Perundungan',
      scenario: 'Di kolom komentar media sosial, ada beberapa akun yang mengejek fisik seorang siswa hingga korban merasa sedih dan takut ke sekolah.',
      question: 'Jika kamu melihat kejadian perundungan siber (Cyberbullying) tersebut, langkah paling bijak sebagai teman yang peduli adalah...',
      options: [
        { label: 'A', text: 'Tidak ikut mengejek, memberi dukungan moral pada korban, menyimpan bukti tangkapan layar, dan melapor ke Guru BK/orang tua' },
        { label: 'B', text: 'Ikut menertawakan di kolom komentar agar dianggap gaul' },
        { label: 'C', text: 'Membagikan postingan ejekan tersebut ke grup lain' },
        { label: 'D', text: 'Meretas HP semua orang di sekolah' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Menjadi Upstander (pembela kebaikan) dengan mendampingi korban dan melapor ke pihak berwenang memutus rantai cyberbullying.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Tata Krama Pesan',
      scenario: 'Kamu ingin mengirim pesan WhatsApp kepada Bapak/Ibu Guru untuk menanyakan tugas yang belum jelas.',
      question: 'Manakah contoh etika komunikasi digital (Netiket) yang paling sopan saat menghubungi guru?',
      options: [
        { label: 'A', text: 'Menghubungi di jam wajar, mengucap salam, menyebutkan nama lengkap & kelas, lalu menyampaikan keperluan dengan bahasa santun' },
        { label: 'B', text: 'Menelepon berkali-kali pada pukul 12 malam tanpa menyebut nama' },
        { label: 'C', text: 'Mengetik dengan HURUF KAPITAL SEMUA dan tanda seru banyak' },
        { label: 'D', text: 'Mengirim stiker tidak sopan tanpa teks apa pun' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Salam, identitas diri (nama & kelas), waktu yang pantas, serta bahasa santun adalah standar adab berkomunikasi digital.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Privasi Foto Teman',
      scenario: 'Kamu memotret suasana diskusi kelas, namun ada temanmu yang terlihat kurang siap di foto tersebut dan meminta agar fotonya tidak diunggah ke publik.',
      question: 'Sikap menghormati privasi digital yang tepat adalah...',
      options: [
        { label: 'A', text: 'Menghargai permintaannya dengan tidak mengunggah foto tersebut tanpa persetujuan (consent) temanmu' },
        { label: 'B', text: 'Tetap mengunggahnya diam-diam karena itu HP milikmu' },
        { label: 'C', text: 'Menjadikan foto itu stiker ejekan di grup kelas' },
        { label: 'D', text: 'Mencetak foto itu di spanduk jalan raya' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Mengunggah wajah atau data orang lain ke ruang publik memerlukan izin (consent) demi menghormati privasi.'
    }
  ],

  // =========================================================================
  // KELAS 9
  // =========================================================================
  'k9-pemrograman': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Variabel & Tipe Data',
      scenario: 'Dalam memprogram Robot Balap, kamu menyimpan data `kecepatan = 120` (angka bulat) dan `namaRobot = "MechaKroya"` (teks).',
      question: 'Pasangan tipe data yang tepat untuk nilai `120` dan `"MechaKroya"` secara berturut-turut adalah...',
      options: [
        { label: 'A', text: 'Integer (Bilangan Bulat) dan String (Teks)' },
        { label: 'B', text: 'Boolean dan Audio' },
        { label: 'C', text: 'Folder dan Monitor' },
        { label: 'D', text: 'Pixel dan Kabel' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Integer merepresentasikan angka bulat tanpa desimal, sedangkan String merepresentasikan deretan karakter teks.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Struktur Perulangan',
      scenario: 'Robot perlu melangkah maju sebanyak 50 kali di lintasan lurus tanpa harus menuliskan perintah `maju()` sampai 50 baris.',
      question: 'Struktur kontrol pemrograman manakah yang berfungsi menjalankan blok kode secara berulang-ulang?',
      options: [
        { label: 'A', text: 'Looping / Perulangan (seperti For Loop atau While Loop)' },
        { label: 'B', text: 'Komentar Kode (Comment)' },
        { label: 'C', text: 'Penghapusan Variabel' },
        { label: 'D', text: 'Shutdown Sistem' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Looping (For/While) mengeksekusi instruksi berulang secara efisien selama kondisi terpenuhi.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Sensor Percabangan',
      scenario: 'Sensor depan robot membaca jarak rintangan: `JIKA jarak < 10 cm MAKA belokKanan() JIKA TIDAK MAKA jalanLurus()`.',
      question: 'Pengambilan keputusan berdasarkan syarat benar atau salah (True/False) ini disebut struktur...',
      options: [
        { label: 'A', text: 'Percabangan / Kondisional (If - Else)' },
        { label: 'B', text: 'Deklarasi Konstanta' },
        { label: 'C', text: 'Instalasi Driver' },
        { label: 'D', text: 'Kompresi File ZIP' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Struktur kondisional If-Else mengarahkan alur program sesuai hasil evaluasi kondisi Boolean.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Operator Logika',
      scenario: 'Gerbang turbo hanya akan terbuka jika `baterai > 50` DAN `lintasanAman == true`.',
      question: 'Pada operator logika AND (DAN), kapan hasil akhirnya bernilai BENAR (True)?',
      options: [
        { label: 'A', text: 'Hanya jika KEDUA syarat tersebut sama-sama bernilai Benar (True)' },
        { label: 'B', text: 'Jika kedua syarat bernilai Salah (False)' },
        { label: 'C', text: 'Tanpa melihat nilai syarat sama sekali' },
        { label: 'D', text: 'Jika baterai habis total' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Operator logika AND mengharuskan seluruh kondisi penyusunnya bernilai True agar menghasilkan True.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Pelacakan Bug',
      scenario: 'Program robot sudah selesai ditulis, namun saat dijalankan robot malah berputar di tempat karena salah tanda `<` menjadi `>`.',
      question: 'Proses mencari, menganalisis, dan memperbaiki kesalahan (bug) pada kode program disebut...',
      options: [
        { label: 'A', text: 'Debugging' },
        { label: 'B', text: 'Phishing' },
        { label: 'C', text: 'Streaming' },
        { label: 'D', text: 'Browsing' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Debugging adalah keterampilan penting programmer untuk menguji dan memperbaiki kesalahan sintaks maupun logika.'
    }
  ],

  'k9-keamanan-digital': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Sandi Geser',
      scenario: 'Dalam kriptografi klasik Caesar Cipher dengan pergeseran +2 (A->C, B->D, C->E), Robot menerima pesan terenkripsi.',
      question: 'Jika kata asli (Plaintext) adalah "DATA", maka hasil enkripsinya (Ciphertext) dengan geser +2 adalah...',
      options: [
        { label: 'A', text: 'FCVC' },
        { label: 'B', text: 'BCVC' },
        { label: 'C', text: 'EBUB' },
        { label: 'D', text: 'ZAZA' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'D(+2)=F, A(+2)=C, T(+2)=V, A(+2)=C sehingga DATA menjadi FCVC.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Malware Penyandera',
      scenario: 'Sebuah komputer tiba-tiba seluruh file dokumennya terkunci secara paksa dan muncul layar tuntutan uang tebusan dari peretas.',
      question: 'Jenis program jahat (Malware) yang mengenkripsi dan menyandera data korban demi meminta tebusan disebut...',
      options: [
        { label: 'A', text: 'Ransomware' },
        { label: 'B', text: 'Antivirus Resmi' },
        { label: 'C', text: 'Firewall Pertahanan' },
        { label: 'D', text: 'Google Classroom' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Ransomware mengunci data korban; cara pencegahan terbaiknya adalah rutin melakukan Backup berkala dan tidak membuka file asing.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Rekayasa Sosial',
      scenario: 'Seorang penipu menelepon dan berpura-pura menjadi petugas bank yang panik agar korban menyebutkan kode rahasia OTP.',
      question: 'Teknik manipulasi psikologis untuk mengelabui manusia agar menyerahkan data rahasia secara sukarela disebut...',
      options: [
        { label: 'A', text: 'Social Engineering (Rekayasa Sosial)' },
        { label: 'B', text: 'Hardware Upgrade' },
        { label: 'C', text: 'Data Sorting' },
        { label: 'D', text: 'Cloud Computing' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Social Engineering menyerang celah psikologis manusia (rasa takut, panik, atau tergiur hadiah), bukan celah mesin.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Tembok Pertahanan',
      scenario: 'Jaringan laboratorium sekolah memasang sistem keamanan yang memantau dan menyaring lalu lintas data masuk/keluar berdasarkan aturan keamanan.',
      question: 'Sistem pertahanan jaringan yang bertindak layaknya satpam penjaga gerbang trafik data tersebut adalah...',
      options: [
        { label: 'A', text: 'Firewall' },
        { label: 'B', text: 'Clipboard' },
        { label: 'C', text: 'Recycle Bin' },
        { label: 'D', text: 'Screensaver' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Firewall memblokir akses jaringan tidak sah sembari mengizinkan komunikasi data yang aman.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Cadangan Data',
      scenario: 'Agar tugas proyek akhir kelas 9 tetap aman meskipun flashdisk rusak atau laptop terkena gangguan, siswa menyimpannya di dua tempat berbeda.',
      question: 'Kebiasaan membuat salinan cadangan data secara berkala di media penyimpanan terpisah dinamakan...',
      options: [
        { label: 'A', text: 'Data Backup (Pencadangan Data)' },
        { label: 'B', text: 'Overclocking' },
        { label: 'C', text: 'Spamming' },
        { label: 'D', text: 'Formatting' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Backup 3-2-1 memastikan data penting selalu dapat dipulihkan (restore) kapan pun terjadi insiden.'
    }
  ],

  'k9-pers-digital': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Struktur Berita',
      scenario: 'Tim Redaksi Majalah Dinding Digital SMPN 5 Kroya menulis berita kegiatan pramuka dengan menempatkan informasi paling penting di paragraf paling atas.',
      question: 'Gaya penulisan jurnalistik yang mendahulukan inti terpenting di awal berita lalu diikuti detail pendukung disebut...',
      options: [
        { label: 'A', text: 'Piramida Terbalik (Inverted Pyramid)' },
        { label: 'B', text: 'Lingkaran Acak' },
        { label: 'C', text: 'Paragraf Rahasia' },
        { label: 'D', text: 'Teks Tanpa Judul' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Struktur Piramida Terbalik memudahkan pembaca langsung menangkap inti berita (Lead) di paragraf pertama.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Etika Wawancara',
      scenario: 'Wartawan siswa ingin menulis laporan tentang prestasi tim voli sekolah dalam turnamen kabupaten.',
      question: 'Mengapa jurnalis harus mewawancarai narasumber yang kredibel (seperti pelatih dan kapten tim) secara langsung?',
      options: [
        { label: 'A', text: 'Agar berita akurat berdasarkan fakta tangan pertama dan bukan sekadar rumor atau karangan' },
        { label: 'B', text: 'Agar berita menjadi sangat panjang walaupun isinya bohong' },
        { label: 'C', text: 'Untuk menyembunyikan hasil pertandingan' },
        { label: 'D', text: 'Supaya tidak perlu menulis tanggal kejadian' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Verifikasi dan wawancara narasumber kompeten adalah fondasi akurasi karya jurnalistik.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Keberimbangan Berita',
      scenario: 'Dalam meliput sebuah diskusi pendapat di sekolah, jurnalis siswa memberikan kesempatan bicara yang adil kepada kedua belah pihak.',
      question: 'Prinsip jurnalistik yang menyajikan liputan secara adil dan berimbang dari kedua sisi disebut...',
      options: [
        { label: 'A', text: 'Cover Both Sides (Keberimbangan Berita)' },
        { label: 'B', text: 'Clickbait Sensasional' },
        { label: 'C', text: 'Plagiarisme Naskah' },
        { label: 'D', text: 'Hoaks Berantai' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Cover Both Sides menjaga objektivitas dan ketidakberpihakan pers.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Keterangan Foto',
      scenario: 'Setiap foto dokumentasi yang dimuat di portal berita sekolah wajib dilengkapi kalimat singkat di bawah foto yang menjelaskan kejadian dan waktu pemotretan.',
      question: 'Teks keterangan penjelas di bawah foto jurnalistik tersebut dinamakan...',
      options: [
        { label: 'A', text: 'Caption Foto (Takarir)' },
        { label: 'B', text: 'Watermark Iklan' },
        { label: 'C', text: 'Source Code' },
        { label: 'D', text: 'Footer Halaman' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Caption foto (Takarir) menjelaskan konteks 5W+1H dari peristiwa visual yang tertangkap kamera.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Penyuntingan Naskah',
      scenario: 'Sebelum artikel berita sekolah dipublikasikan ke situs web, pemimpin redaksi memeriksa ulang ejaan bahasa Indonesia (EYD/PUEBI) dan keakuratan data.',
      question: 'Tahap pemeriksaan dan perbaikan naskah sebelum terbit ini disebut proses...',
      options: [
        { label: 'A', text: 'Editing / Penyuntingan Redaksi' },
        { label: 'B', text: 'Hacking Server' },
        { label: 'C', text: 'Uninstalling' },
        { label: 'D', text: 'Booting' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Penyuntingan memastikan karya jurnalistik bebas dari salah ketik, kalimat ambigu, maupun kesalahan fakta.'
    }
  ],

  'k9-ruang-publik-virtual': [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Algoritma Lini Masa',
      scenario: 'Saat kamu sering menonton video eksperimen sains di media sosial, beranda akunmu makin dipenuhi rekomendasi video sains serupa.',
      question: 'Kondisi ketika algoritma hanya menyodorkan informasi yang sejalan dengan minat kita sehingga mempersempit sudut pandang lain disebut...',
      options: [
        { label: 'A', text: 'Filter Bubble / Echo Chamber (Gelembung Penyaring)' },
        { label: 'B', text: 'Hardware Overheat' },
        { label: 'C', text: 'Blue Screen of Death' },
        { label: 'D', text: 'Local Area Network' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Memahami Filter Bubble membantu kita tetap terbuka membaca perspektif yang beragam dan objektif.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Data Pribadi Sensitif',
      scenario: 'Tren stiker di media sosial mengajak pengguna mengunggah foto kartu pelajar lengkap dengan Nomor Induk, alamat rumah, dan nama ibu kandung.',
      question: 'Mengapa kita harus menolak mengikuti tren yang memamerkan data sensitif di ruang publik virtual?',
      options: [
        { label: 'A', text: 'Data pribadi sensitif rawan disalahgunakan pelaku kejahatan untuk pencurian identitas (Identity Theft) dan penipuan' },
        { label: 'B', text: 'Karena memori server media sosial akan langsung penuh' },
        { label: 'C', text: 'Karena foto kartu pelajar tidak berwarna-warni' },
        { label: 'D', text: 'Karena kamera HP tidak bisa memotret kartu' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Menjaga kerahasiaan data pribadi (PII) di ruang publik virtual adalah benteng utama dari kejahatan siber.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Manajemen Waktu Layar',
      scenario: 'Terlalu asyik menggulir video pendek (scrolling) tanpa henti hingga lupa waktu belajar dan kurang tidur di malam hari.',
      question: 'Langkah konkret pengendalian diri (Digital Wellbeing) manakah yang paling sehat diterapkan siswa?',
      options: [
        { label: 'A', text: 'Mengaktifkan pengingat batas waktu layar (Screen Time Limit) dan menyimpan HP di luar kamar saat jam tidur' },
        { label: 'B', text: 'Membawa 3 charger agar bisa main HP 24 jam nonstop' },
        { label: 'C', text: 'Menonton layar sambil mematikan semua lampu kamar sampai pagi' },
        { label: 'D', text: 'Membuat 10 akun media sosial baru setiap hari' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Digital Wellbeing menyeimbangkan pemanfaatan teknologi dengan kesehatan fisik, waktu belajar, dan interaksi sosial nyata.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Portofolio Positif',
      scenario: 'Seorang siswa kelas 9 rutin mengunggah dokumentasi proyek robotika, karya desain grafis, dan rangkuman belajarnya di blog edukasi.',
      question: 'Manfaat jangka panjang dari membangun jejak digital positif di ruang publik virtual adalah...',
      options: [
        { label: 'A', text: 'Menjadi portofolio prestasi yang menginspirasi orang lain dan mendukung pendaftaran beasiswa di masa depan' },
        { label: 'B', text: 'Membuat kuota internet menjadi gratis selamanya' },
        { label: 'C', text: 'Menggantikan fungsi prosesor di dalam laptop' },
        { label: 'D', text: 'Menghapus semua mata pelajaran di sekolah' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Ruang publik virtual dapat dimanfaatkan secara produktif sebagai rekam jejak karya dan kolaborasi positif.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Finish Warga Digital Beretika',
      scenario: 'Di grup diskusi daring terjadi perbedaan pendapat antar-siswa mengenai pemilihan tema acara kelulusan.',
      question: 'Ciri warga digital (Digital Citizen) yang dewasa dalam menyampaikan pendapat di ruang publik virtual adalah...',
      options: [
        { label: 'A', text: 'Menyampaikan argumen dengan sopan, fokus pada solusi bersama, dan menghormati pendapat teman tanpa menyerang pribadi' },
        { label: 'B', text: 'Menyebarkan data pribadi teman yang berbeda pendapat (Doxing)' },
        { label: 'C', text: 'Mengeluarkan kata-kata kasar dan provokatif' },
        { label: 'D', text: 'Membuat akun palsu untuk memfitnah teman' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Musyawarah santun dan saling menghargai di dunia maya mencerminkan 8 Dimensi Profil Lulusan Kemendikdasmen (Kewargaan & Komunikasi).'
    }
  ],

  // ==========================================
  // KELAS 8: REKAM JEJAK DIGITAL, TOLERANSI & EMPATI, DAN PERUNDUNGAN DI DUNIA DIGITAL
  // ==========================================
  'k8-rekam-jejak-digital': [
    {
      id: 1,
      sectorName: 'Sektor 1: Lintasan Jejak Abadi',
      scenario: 'Robot Pembalap melaju cepat dan mendeteksi data riwayat pencarian yang tersimpan di server peramban tanpa disadari penggunanya.',
      question: 'Jenis rekam jejak digital yang terekam secara otomatis di latar belakang sistem ini disebut...',
      options: [
        { label: 'A', text: 'Rekam Jejak Digital Pasif' },
        { label: 'B', text: 'Unggahan Status Medsos Aktif' },
        { label: 'C', text: 'Kabel Motherboard Komputer' },
        { label: 'D', text: 'Layar Monitor Sentuh' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Rekam jejak pasif tercatat otomatis oleh server, cookies, dan log sistem.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Netiket Santun',
      scenario: 'Muncul pesan terik di radio komunikasi sirkuit balap yang diketik menggunakan huruf kapital semua dengan nada emosi tinggi.',
      question: 'Mengapa dalam etika netiket internasional kita dilarang mengetik pesan dengan HURUF KAPITAL SEMUA?',
      options: [
        { label: 'A', text: 'Karena diartikan sama dengan berteriak dan marah secara kasar kepada lawan bicara' },
        { label: 'B', text: 'Karena membuat mesin robot kehabisan oli' },
        { label: 'C', text: 'Karena menghabiskan kuota internet lebih banyak' },
        { label: 'D', text: 'Karena font kapital tidak terbaca oleh komputer' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Huruf kapital penuh melambangkan teriakan marah yang melanggar etika kesantunan daring.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Saringan T.H.I.N.K.',
      scenario: 'Sebelum membagikan kabar perlombaan antar-sekolah, Robot harus mengaktifkan saringan 5 kata emas.',
      question: 'Dalam rumus T.H.I.N.K., apakah makna dari huruf T dan H?',
      options: [
        { label: 'A', text: 'T - True (Benarkah?) dan H - Helpful (Bermanfaatkah?)' },
        { label: 'B', text: 'T - Tired (Lelah) dan H - Heavy (Berat)' },
        { label: 'C', text: 'T - Target dan H - Hazard' },
        { label: 'D', text: 'T - Test dan H - Hobby' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'T.H.I.N.K. memastikan informasi itu Benar (True) dan Bermanfaat (Helpful) bagi orang lain.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Tameng Anti-Cyberbullying',
      scenario: 'Di sirkuit terdapat rintangan akun anonim yang mengirimkan stiker ejekan dan kata hinaan secara berulang kepada pembalap pemula.',
      question: 'Tindakan awal paling tepat yang mencerminkan kecerdasan literasi siber untuk menghadapi cyberbullying adalah...',
      options: [
        { label: 'A', text: 'Mengambil tangkapan layar (screenshot) bukti, memblokir pelaku, dan melapor ke guru/orang tua' },
        { label: 'B', text: 'Membalas dengan kata-kata yang jauh lebih kotor' },
        { label: 'C', text: 'Menabrakkan diri keluar lintasan' },
        { label: 'D', text: 'Membiarkan pelaku terus menghina tanpa melapor' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Screenshot adalah bukti otentik penting untuk penegakan tata tertib dan perlindungan korban.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Sprint Garis Finish Empati Digital',
      scenario: 'Robot melesat menuju garis finish dengan membawa komitmen menjaga nama baik diri dan sekolah di internet.',
      question: 'Bagaimana cara terbaik seorang pelajar SMP menjaga agar rekam jejak digitalnya bernilai positif dan membanggakan?',
      options: [
        { label: 'A', text: 'Membagikan karya prestasi, bertutur kata santun, bertoleransi, dan tidak menyebar kebencian' },
        { label: 'B', text: 'Sering membuat status kemarahan pribadi di akun publik' },
        { label: 'C', text: 'Ikut meramaikan komentar jahat pada isu viral' },
        { label: 'D', text: 'Menyerahkan akun pribadi kepada orang asing' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Jejak digital yang positif dibangun melalui karya nyata, kesantunan, dan empati dalam berinteraksi.'
    }
  ]
};

/**
 * Fallback generator jika ada topik masa depan yang belum terdaftar di registry
 */
export function getTopicRobotRaceQuestions(topicId: string, topicTitle: string, grade: number): RobotRaceQuestion[] {
  if (ROBOT_RACE_QUESTIONS_REGISTRY[topicId]) {
    return ROBOT_RACE_QUESTIONS_REGISTRY[topicId];
  }

  return [
    {
      id: 1,
      sectorName: 'Sektor 1: Gerbang Sirkuit Informatika',
      scenario: `Robot Pembalap memulai akselerasi pada materi ${topicTitle} Kelas ${grade}.`,
      question: `Apa tujuan utama mempelajari konsep ${topicTitle} secara mendalam bagi siswa SMP?`,
      options: [
        { label: 'A', text: 'Membangun kecakapan berpikir logis, terstruktur, dan mampu memecahkan masalah teknologi secara bertanggung jawab' },
        { label: 'B', text: 'Agar bisa bermain game tanpa batas waktu' },
        { label: 'C', text: 'Menghindari kerja sama dengan teman sekelas' },
        { label: 'D', text: 'Mengganti seluruh buku tulis dengan mesin' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Informatika melatih pola pikir komputasional dan literasi teknologi yang bermanfaat di kehidupan nyata.'
    },
    {
      id: 2,
      sectorName: 'Sektor 2: Tikungan Efisiensi Sistem',
      scenario: 'Di tengah lintasan balap, Robot harus memilih cara paling efisien untuk menyelesaikan tugas proyek.',
      question: 'Manakah langkah kerja yang mencerminkan prinsip efisiensi dalam Informatika?',
      options: [
        { label: 'A', text: 'Merencanakan alur kerja secara berurutan, memeriksa kelengkapan data, dan mengevaluasi hasil secara teliti' },
        { label: 'B', text: 'Mengerjakan secara acak tanpa membaca petunjuk' },
        { label: 'C', text: 'Menunggu komputer menyala sendiri tanpa ditekan tombol power' },
        { label: 'D', text: 'Menyalin pekerjaan orang lain tanpa memahami isinya' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Perencanaan terstruktur dan evaluasi sistematis menghasilkan solusi yang cepat dan akurat.'
    },
    {
      id: 3,
      sectorName: 'Sektor 3: Terowongan Keamanan Siber',
      scenario: 'Muncul rintangan tautan asing di lintasan sirkuit saat Robot sedang mengunduh bahan belajar.',
      question: 'Tindakan pencegahan manakah yang menjaga perangkat tetap aman selama belajar daring?',
      options: [
        { label: 'A', text: 'Hanya mengakses sumber resmi terpercaya dan menjaga kerahasiaan kata sandi akun belajar' },
        { label: 'B', text: 'Menuliskan password akun di papan tulis kelas' },
        { label: 'C', text: 'Mengeklik seluruh iklan berkedip di layar' },
        { label: 'D', text: 'Mematikan sistem keamanan peramban' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Keamanan digital dimulai dari disiplin menjaga kredensial akun dan memverifikasi sumber unduhan.'
    },
    {
      id: 4,
      sectorName: 'Sektor 4: Jembatan Kolaborasi Tim',
      scenario: 'Tim Robot Biru dan Tim Robot Merah berkolaborasi menyusun laporan digital di kelas.',
      question: 'Sikap kolaborasi digital yang baik saat bekerja dalam satu dokumen bersama adalah...',
      options: [
        { label: 'A', text: 'Berbagi peran secara adil, memberi komentar yang membangun, dan menghargai kontribusi setiap anggota' },
        { label: 'B', text: 'Menghapus bagian tulisan teman tanpa izin' },
        { label: 'C', text: 'Membiarkan ketua kelompok bekerja sendirian' },
        { label: 'D', text: 'Mengunci dokumen agar anggota tim lain tidak bisa masuk' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Kolaborasi digital yang sehat membutuhkan pembagian peran dan komunikasi yang saling menghormati.'
    },
    {
      id: 5,
      sectorName: 'Sektor 5: Sprint Garis Finish',
      scenario: `Robot Pembalap tinggal selangkah lagi melintasi garis finish materi ${topicTitle}.`,
      question: 'Setelah menuntaskan materi ini, bagaimana cara terbaik mengamalkannya di SMP Negeri 5 Kroya?',
      options: [
        { label: 'A', text: 'Menggunakan ilmu yang didapat untuk membantu tugas sekolah, berkarya kreatif, dan menjaga etika digital' },
        { label: 'B', text: 'Melupakan seluruh materi begitu keluar ruangan' },
        { label: 'C', text: 'Menggunakan teknologi untuk menjahili teman' },
        { label: 'D', text: 'Menyimpan ilmu sendirian dan enggan berbagi' }
      ],
      correctIndex: 0,
      boostPower: 25,
      explanation: 'Ilmu yang bermanfaat adalah ilmu yang diamalkan secara positif dan beretika.'
    }
  ];
}
