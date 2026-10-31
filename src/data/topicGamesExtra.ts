import { TopicGamePack } from './interactiveGamesData';

export const EXTRA_TOPIC_GAMES: Record<string, TopicGamePack> = {
  // ==========================================
  // KELAS 7 - KOMPONEN & CARA KERJA KOMPUTER
  // ==========================================
  'k7-komputer': {
    battleBot: [
      {
        id: 1,
        scenario: 'Siswa mengetik laporan menggunakan keyboard dan mengklik tombol mouse di layar.',
        question: 'Kedua perangkat tersebut dalam siklus IPO tergolong ke dalam bagian...',
        options: [
          { label: 'A', text: 'Perangkat Masukan (Input Device)' },
          { label: 'B', text: 'Perangkat Pemrosesan (Processing Device)' },
          { label: 'C', text: 'Perangkat Keluaran (Output Device)' },
          { label: 'D', text: 'Perangkat Penyimpanan (Storage)' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Keyboard dan mouse memasukkan perintah dan data dari manusia ke dalam komputer.'
      },
      {
        id: 2,
        scenario: 'Komputer sedang menghitung rumus matematika ribuan angka dalam hitungan milidetik.',
        question: 'Komponen apakah yang dijuluki sebagai "otak utama komputer" untuk memproses data tersebut?',
        options: [
          { label: 'A', text: 'CPU / Processor' },
          { label: 'B', text: 'Kabel Monitor' },
          { label: 'C', text: 'Kipas Casing' },
          { label: 'D', text: 'Mouse Pad' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'CPU (Central Processing Unit) adalah otak pemrosesan seluruh instruksi komputasi.'
      },
      {
        id: 3,
        scenario: 'Guru meminta hasil tugas dicetak ke lembaran kertas untuk ditempel di majalah dinding.',
        question: 'Perangkat apakah yang bertugas mengeluarkan hasil pemrosesan ke media fisik kertas?',
        options: [
          { label: 'A', text: 'Printer (Perangkat Keluaran / Output)' },
          { label: 'B', text: 'Scanner' },
          { label: 'C', text: 'Microphone' },
          { label: 'D', text: 'RAM' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Printer mengubah data digital menjadi cetakan fisik pada kertas.'
      },
      {
        id: 4,
        scenario: 'Saat listrik sekolah tiba-tiba padam, data yang sedang diketik belum disimpan ke SSD/Harddisk.',
        question: 'Memori apakah yang sifatnya sementara (volatile) dan isinya langsung hilang jika listrik mati?',
        options: [
          { label: 'A', text: 'RAM (Random Access Memory)' },
          { label: 'B', text: 'SSD NVMe' },
          { label: 'C', text: 'Flashdisk' },
          { label: 'D', text: 'CD-ROM' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'RAM bersifat volatile, hanya menyimpan data sementara saat komputer menyala.'
      },
      {
        id: 5,
        scenario: 'Komputer lemot karena ruang penyimpanan penuh dengan file video dan foto lama.',
        question: 'Komponen manakah yang sebaiknya di-upgrade atau dibersihkan agar penyimpanan lega?',
        options: [
          { label: 'A', text: 'Penyimpanan Permanen (SSD / Harddisk)' },
          { label: 'B', text: 'Kabel Listrik' },
          { label: 'C', text: 'Mouse Optik' },
          { label: 'D', text: 'Webcam' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'SSD dan Harddisk adalah media penyimpanan data permanen (secondary storage).'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'PROCESSOR',
        scrambled: 'S S O R C P E R O',
        clue: 'Otak pemroses data utama pada motherboard komputer.',
        dailyContext: 'Komponen yang memiliki kecepatan gigahertz (GHz).'
      },
      {
        id: 2,
        word: 'KEYBOARD',
        scrambled: 'D R A O B Y E K',
        clue: 'Papan ketik tombol huruf dan angka untuk memasukkan teks ke komputer.',
        dailyContext: 'Digunakan mengetik tugas makalah di laboratorium SMPN 5 Kroya.'
      },
      {
        id: 3,
        word: 'MONITOR',
        scrambled: 'T O R I N O M',
        clue: 'Layar penampil visual hasil pengolahan data komputer.',
        dailyContext: 'Menampilkan antarmuka desktop, jendela aplikasi, dan video.'
      },
      {
        id: 4,
        word: 'MEMORI',
        scrambled: 'R I M O M E',
        clue: 'Tempat penampungan data sementara atau permanen dalam komputer.',
        dailyContext: 'RAM dan ROM termasuk dalam bagian ini.'
      },
      {
        id: 5,
        word: 'STORAGE',
        scrambled: 'E G A R O T S',
        clue: 'Media penyimpanan file secara tetap seperti SSD dan Flashdisk.',
        dailyContext: 'Tempat menyimpan video tugas sekolah agar tidak hilang.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'CPU / Processor Intel / AMD',
        clue: 'Lempengan chip silikon persegi berlapis pin emas dengan kipas pendingin.',
        dailyContext: 'Otak utama yang menjalankan sistem operasi dan jutaan perhitungan.',
        iconName: 'Cpu',
        visualTag: 'Hardware Proses',
        options: ['CPU / Processor', 'Speaker', 'Kabel Mouse', 'Flashdisk'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Keyboard Komputer',
        clue: 'Perangkat berisi susunan tombol huruf QWERTY, angka, dan tombol fungsi.',
        dailyContext: 'Alat input untuk mengetik dokumen dan perintah pintasan.',
        iconName: 'Keyboard',
        visualTag: 'Hardware Input',
        options: ['Keyboard', 'Monitor', 'Printer', 'Proyektor'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Monitor Layar Datar',
        clue: 'Layar lebar yang memancarkan piksel warna menampilkan desktop.',
        dailyContext: 'Perangkat output visual tempat kita melihat kursor dan aplikasi.',
        iconName: 'Monitor',
        visualTag: 'Hardware Output',
        options: ['Monitor', 'Microphone', 'Mouse', 'Scanner'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'SSD NVMe / Harddisk',
        clue: 'Kartu memori cepat atau piringan magnetik tempat menyimpan OS dan game.',
        dailyContext: 'Menyimpan ribuan file tugas sekolah secara permanen.',
        iconName: 'HardDrive',
        visualTag: 'Hardware Storage',
        options: ['SSD / Penyimpanan', 'Keyboard', 'Webcam', 'Kabel LAN'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Printer Warna Inkjet',
        clue: 'Mesin pencetak dengan tinta cair yang mencetak dokumen ke kertas HVS.',
        dailyContext: 'Mencetak tugas portofolio siswa kelas 7 untuk dinilai guru.',
        iconName: 'Printer',
        visualTag: 'Hardware Output',
        options: ['Printer', 'Mouse', 'Processor', 'RAM'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'hw-1',
        title: 'Keyboard QWERTY & Mouse Optik',
        description: 'Menerima ketikan jari naskah dan klik kursor tangan pengguna lalu mengirim sinyal biner ke komputer.',
        iconType: 'Keyboard',
        correctCategory: 'Perangkat Masukan (Input)',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'hw-2',
        title: 'Scanner Dokumen & Kamera Webcam',
        description: 'Memindai lembaran tugas kertas dan menangkap rekaman video wajah siswa menjadi data digital.',
        iconType: 'Keyboard',
        correctCategory: 'Perangkat Masukan (Input)',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'hw-3',
        title: 'Processor CPU Core i5 (ALU & CU)',
        description: 'Mengeksekusi logika instruksi, melakukan kalkulasi aritmatika, dan mengatur jalannya seluruh sistem.',
        iconType: 'Cpu',
        correctCategory: 'Perangkat Pemrosesan (Process)',
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
      },
      {
        id: 'hw-4',
        title: 'Memori RAM 16GB DDR4 (Volatile)',
        description: 'Menampung sementara data aplikasi dan tab browser yang sedang berjalan aktif saat komputer menyala.',
        iconType: 'Cpu',
        correctCategory: 'Perangkat Pemrosesan (Process)',
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
      },
      {
        id: 'hw-5',
        title: 'Layar Monitor LED & Smart IFP',
        description: 'Memancarkan jutaan piksel warna untuk menampilkan jendela desktop dan naskah kepada mata siswa.',
        iconType: 'Monitor',
        correctCategory: 'Perangkat Keluaran (Output)',
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300'
      },
      {
        id: 'hw-6',
        title: 'Printer Warna Inkjet & Speaker Lab',
        description: 'Mencetak naskah portofolio ke kertas fisik dan mengeluarkan suara narasi materi guru.',
        iconType: 'Printer',
        correctCategory: 'Perangkat Keluaran (Output)',
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300'
      },
      {
        id: 'hw-7',
        title: 'SSD M.2 NVMe 512GB (Non-Volatile)',
        description: 'Menyimpan sistem operasi Windows dan file tugas sekolah secara permanen tanpa takut listrik mati.',
        iconType: 'HardDrive',
        correctCategory: 'Perangkat Penyimpanan (Storage)',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      },
      {
        id: 'hw-8',
        title: 'Flashdisk USB 64GB Portabel',
        description: 'Media penyimpanan portabel yang dibawa siswa di saku untuk memindahkan tugas antarkomputer.',
        iconType: 'HardDrive',
        correctCategory: 'Perangkat Penyimpanan (Storage)',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      }
    ],
    simulationCategories: ['Perangkat Masukan (Input)', 'Perangkat Pemrosesan (Process)', 'Perangkat Keluaran (Output)', 'Perangkat Penyimpanan (Storage)']
  },

  // ==========================================
  // KELAS 7 - BROWSER DAN SEARCH ENGINE
  // ==========================================
  'k7-bse': {
    battleBot: [
      {
        id: 1,
        scenario: 'Siswa ingin mencari tugas materi informatika di internet.',
        question: 'Aplikasi manakah yang berfungsi sebagai peramban (browser) untuk membuka web?',
        options: [
          { label: 'A', text: 'Google Chrome / Mozilla Firefox / Microsoft Edge' },
          { label: 'B', text: 'Kalkulator Windows' },
          { label: 'C', text: 'Notepad' },
          { label: 'D', text: 'VLC Media Player' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Web browser adalah perangkat lunak untuk menjelajah dan menampilkan halaman web.'
      },
      {
        id: 2,
        scenario: 'Pencarian di Google menghasilkan jutaan halaman yang terlalu umum dan tidak fokus.',
        question: 'Trik operator pencarian apa yang digunakan agar Google mencari frasa persis?',
        options: [
          { label: 'A', text: 'Mengapit kata kunci dengan tanda petik ganda "..."' },
          { label: 'B', text: 'Mengetik dengan huruf besar semua' },
          { label: 'C', text: 'Menekan tombol spasi 10 kali' },
          { label: 'D', text: 'Menghapus riwayat browser' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Tanda petik "kata kunci persis" mengunci urutan kata agar hasil pencarian sangat akurat.'
      },
      {
        id: 3,
        scenario: 'Siswa hanya ingin mengunduh bahan materi berbentuk file PDF dari situs resmi sekolah.',
        question: 'Sintaks pencarian Google manakah yang paling tepat?',
        options: [
          { label: 'A', text: 'materi informatika filetype:pdf site:smpn5kroya.sch.id' },
          { label: 'B', text: 'cari pdf dong google tolong' },
          { label: 'C', text: 'smpn 5 kroya download gratis mp3' },
          { label: 'D', text: 'buka buku sekarang juga' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Operator filetype:pdf dan site: memfilter ekstensi file dan domain sumber secara presisi.'
      },
      {
        id: 4,
        scenario: 'Pada alamat web "https://smpn5kroya.sch.id", terdapat ikon gembok terkunci di samping kiri.',
        question: 'Apakah arti dari ikon gembok dan protokol https:// tersebut?',
        options: [
          { label: 'A', text: 'Koneksi ke web terenkripsi aman menggunakan sertifikat SSL/TLS' },
          { label: 'B', text: 'Website sedang dikunci dan tidak bisa dibuka' },
          { label: 'C', text: 'Pengguna harus membayar biaya langganan' },
          { label: 'D', text: 'Komputer terkena virus' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'HTTPS dan gembok menandakan saluran komunikasi data dienkripsi dengan aman.'
      },
      {
        id: 5,
        scenario: 'Domain sekolah Indonesia menggunakan akhiran ".sch.id".',
        question: 'Mengapa domain ini jauh lebih kredibel dibanding blog gratisan (.blogspot / .xyz)?',
        options: [
          { label: 'A', text: 'Pendaftarannya wajib melampirkan SK izin operasional sekolah resmi dari dinas' },
          { label: 'B', text: 'Domain ini bisa dibuat siapa saja tanpa syarat' },
          { label: 'C', text: 'Domain ini otomatis memberi pulsa kepada siswa' },
          { label: 'D', text: 'Domain ini hanya bisa dibuka di hari libur' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Domain .sch.id diawasi oleh PANDI dan mewajibkan legalitas resmi sekolah.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'BROWSER',
        scrambled: 'R E S W O R B',
        clue: 'Aplikasi pembuka halaman situs web di internet.',
        dailyContext: 'Contohnya Google Chrome, Firefox, Safari, dan Edge.'
      },
      {
        id: 2,
        word: 'DOMAIN',
        scrambled: 'M A I N O D',
        clue: 'Nama alamat unik suatu website di internet (misalnya kemdikbud.go.id).',
        dailyContext: 'Identitas alamat resmi lembaga di dunia maya.'
      },
      {
        id: 3,
        word: 'SEARCH',
        scrambled: 'H C R A E S',
        clue: 'Fungsi pencarian untuk menemukan data dan artikel.',
        dailyContext: 'Fitur utama pada mesin pencari Google.'
      },
      {
        id: 4,
        word: 'KREDIBEL',
        scrambled: 'B E L D I K E R',
        clue: 'Sumber informasi yang dapat dipercaya keaslian dan validitasnya.',
        dailyContext: 'Syarat mutlak bahan bacaan untuk tugas riset sekolah.'
      },
      {
        id: 5,
        word: 'PROTOKOL',
        scrambled: 'K O L T O R O P',
        clue: 'Aturan standar komunikasi data (misalnya HTTP dan HTTPS).',
        dailyContext: 'Menentukan cara data dikirim antara komputer dan server web.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Google Chrome Web Browser',
        clue: 'Ikon lingkaran warna merah, kuning, hijau dengan lingkaran biru di tengah.',
        dailyContext: 'Peramban web paling populer untuk membuka internet.',
        iconName: 'Globe',
        visualTag: 'Web Browser',
        options: ['Google Chrome', 'Microsoft Word', 'Photoshop', 'Kalkulator'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Ikon Gembok SSL HTTPS',
        clue: 'Simbol gembok hijau/abu-abu di samping kiri bilah alamat URL situs web.',
        dailyContext: 'Tanda bahwa transfer data di situs tersebut terenkripsi aman.',
        iconName: 'Lock',
        visualTag: 'Keamanan URL',
        options: ['Gembok HTTPS / SSL', 'Pintu Terbuka', 'Kunci Rusak', 'Peringatan Bahaya'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Mesin Pencari Google',
        clue: 'Bilah kotak putih panjang dengan tombol cari bergambar kaca pembesar.',
        dailyContext: 'Alat bantu menemukan jutaan artikel tugas sekolah.',
        iconName: 'Search',
        visualTag: 'Search Engine',
        options: ['Mesin Pencari / Search Engine', 'Pemutar Musik', 'Game Online', 'Antivirus'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Dokumen PDF Buku Digital',
        clue: 'Ikon lembaran merah bertuliskan PDF resmi rujukan kurikulum.',
        dailyContext: 'Format file buku paket kurikulum merdeka dari Kemdikbud.',
        iconName: 'FileText',
        visualTag: 'Filetype PDF',
        options: ['File Buku Digital PDF', 'Lagu MP3', 'Aplikasi Virus', 'Kaset Jadul'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Domain Resmi Sekolah .sch.id',
        clue: 'Lambang gedung sekolah dengan tulisan smpn5kroya.sch.id.',
        dailyContext: 'Portal informasi resmi kegiatan dan nilai siswa di internet.',
        iconName: 'School',
        visualTag: 'Domain .sch.id',
        options: ['Domain Resmi Sekolah', 'Blog Gosip Anonim', 'Iklan Judi', 'Game Bajakan'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'bse-1',
        title: 'https:// (Hypertext Transfer Protocol Secure)',
        description: 'Protokol komunikasi terenkripsi aman melindungi data dari penyadapan.',
        iconType: 'Lock',
        correctCategory: 'Protokol Keamanan (SSL)',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'bse-2',
        title: 'smpn5kroya (Nama Subdomain Organisasi)',
        description: 'Nama unik identitas sekolah SMP Negeri 5 Kroya di dunia internet.',
        iconType: 'School',
        correctCategory: 'Nama Subdomain / Instansi',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'bse-3',
        title: '.sch.id (Top-Level Domain Resmi Sekolah)',
        description: 'Ekstensi domain resmi khusus sekolah di bawah naungan Kemendikbud.',
        iconType: 'Building2',
        correctCategory: 'Domain Resmi (.sch.id / .go.id)',
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300'
      },
      {
        id: 'bse-4',
        title: '/materi/informatika-kelas-7 (Jalur Direktori)',
        description: 'Alamat folder penyimpanan spesifik dokumen yang dituju pengguna.',
        iconType: 'BookOpenCheck',
        correctCategory: 'Jalur Folder / Halaman (Path)',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      }
    ],
    simulationCategories: ['Protokol Keamanan (SSL)', 'Nama Subdomain / Instansi', 'Domain Resmi (.sch.id / .go.id)', 'Jalur Folder / Halaman (Path)']
  },

  // ==========================================
  // KELAS 8 - JARINGAN KOMPUTER & INTERNET
  // ==========================================
  'k8-jaringan': {
    battleBot: [
      {
        id: 1,
        scenario: 'Laboratorium komputer sekolah menghubungkan 30 PC siswa ke satu Switch pusat.',
        question: 'Topologi jaringan apakah yang menggunakan Switch/Hub sebagai pusat konsentrator?',
        options: [
          { label: 'A', text: 'Topologi Star (Bintang)' },
          { label: 'B', text: 'Topologi Ring (Cincin)' },
          { label: 'C', text: 'Topologi Bus (Garis Lurus)' },
          { label: 'D', text: 'Topologi Acak' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Topologi Star menghubungkan semua node ke perangkat sentral seperti Switch.'
      },
      {
        id: 2,
        scenario: 'Siswa ingin memeriksa apakah laptopnya terhubung ke server sekolah dengan IP 192.168.1.1.',
        question: 'Perintah terminal/CMD manakah yang digunakan untuk menguji konektivitas pengiriman paket?',
        options: [
          { label: 'A', text: 'ping 192.168.1.1' },
          { label: 'B', text: 'format C:' },
          { label: 'C', text: 'delete windows' },
          { label: 'D', text: 'restart monitor' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Perintah PING mengirim paket ICMP echo request untuk memastikan koneksi aktif.'
      },
      {
        id: 3,
        scenario: 'Satu kabel komputer siswa putus di topologi Star.',
        question: 'Apa yang terjadi pada 29 komputer siswa lainnya yang terhubung ke switch?',
        options: [
          { label: 'A', text: 'Tetap menyala dan terhubung normal tanpa terganggu' },
          { label: 'B', text: 'Semua komputer langsung mati' },
          { label: 'C', text: 'Internet seluruh kecamatan padam' },
          { label: 'D', text: 'Switch langsung meledak' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Kelebihan utama topologi Star: jika 1 kabel client putus, jaringan lain tidak terganggu.'
      },
      {
        id: 4,
        scenario: 'Jaringan komputer dalam satu ruangan lab sekolah tergolong skala geografis...',
        question: 'Istilah apakah yang tepat untuk jaringan area lokal dalam satu gedung?',
        options: [
          { label: 'A', text: 'LAN (Local Area Network)' },
          { label: 'B', text: 'WAN (Wide Area Network)' },
          { label: 'C', text: 'MAN (Metropolitan Area Network)' },
          { label: 'D', text: 'PAN (Personal Area Network)' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'LAN mencakup jaringan dalam lingkup kecil seperti ruangan, lab, atau gedung sekolah.'
      },
      {
        id: 5,
        scenario: 'Perangkat ini bertugas menghubungkan jaringan lokal LAN sekolah ke jaringan internet luar.',
        question: 'Perangkat pintar pengarah lalu lintas data antar jaringan yang berbeda ini adalah...',
        options: [
          { label: 'A', text: 'Router' },
          { label: 'B', text: 'Kabel Flashdisk' },
          { label: 'C', text: 'Speaker' },
          { label: 'D', text: 'Mouse Pad' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Router merutekan paket data antar jaringan yang berbeda alamat subnet (LAN ke Internet).'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'TOPOLOGI',
        scrambled: 'I G O L O P O T',
        clue: 'Bentuk tata susunan geometris antarkomputer dalam suatu jaringan.',
        dailyContext: 'Contohnya topologi Star, Bus, Ring, dan Mesh.'
      },
      {
        id: 2,
        word: 'SWITCH',
        scrambled: 'H C T I W S',
        clue: 'Perangkat konsentrator cerdas penerus paket data berdasarkan MAC address.',
        dailyContext: 'Penghubung kabel LAN semua PC di lab komputer SMPN 5 Kroya.'
      },
      {
        id: 3,
        word: 'ROUTER',
        scrambled: 'R E T U O R',
        clue: 'Perangkat pengarah rute paket data antara jaringan LAN sekolah dan internet.',
        dailyContext: 'Mengatur pembagian bandwidth dan sambungan internet sekolah.'
      },
      {
        id: 4,
        word: 'PAKET',
        scrambled: 'T E K A P',
        clue: 'Unit pecahan data digital yang dikirimkan melalui saluran jaringan.',
        dailyContext: 'File dipecah menjadi ribuan paket data saat dikirim lewat internet.'
      },
      {
        id: 5,
        word: 'SERVER',
        scrambled: 'R E V R E S',
        clue: 'Komputer pusat bertenaga tinggi yang melayani permintaan komputer client.',
        dailyContext: 'Tempat menyimpan bank soal ujian ANBK dan file perpustakaan digital.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Switch Jaringan LAN',
        clue: 'Kotak hitam persegi panjang dengan puluhan port RJ45 dan lampu indikator LED berkedip hijau.',
        dailyContext: 'Konsentrator kabel LAN di sudut laboratorium komputer.',
        iconName: 'Layers',
        visualTag: 'Hardware Switch',
        options: ['Switch Jaringan', 'Televisi', 'Papan Catur', 'Kulkas'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Router Wi-Fi & Internet Gateway',
        clue: 'Perangkat dengan antena pemancar sinyal nirkabel dan lampu internet WAN.',
        dailyContext: 'Membagikan akses internet nirkabel ke laptop guru dan siswa.',
        iconName: 'Wifi',
        visualTag: 'Router Gateway',
        options: ['Router Wi-Fi', 'Radio Kuno', 'Mesin Ketik', 'Jam Dinding'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Topologi Bintang (Star Network)',
        clue: 'Bagan diagram dengan satu titik Switch pusat di tengah dikelilingi kabel ke PC client.',
        dailyContext: 'Struktur jaringan paling populer dan andal di sekolah modern.',
        iconName: 'Sparkles',
        visualTag: 'Topologi Star',
        options: ['Topologi Star', 'Topologi Bus', 'Kabel Berantakan', 'Sistem Tata Surya'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Kabel UTP & Konektor RJ45',
        clue: 'Kabel biru berisi 8 kawat tembaga berpilin dengan kepala konektor plastik bening pengunci.',
        dailyContext: 'Kabel penghubung komputer ke switch di lab komputer.',
        iconName: 'Power',
        visualTag: 'Kabel LAN UTP',
        options: ['Kabel LAN RJ45', 'Tali Tambang', 'Kabel Earphone', 'Tali Sepatu'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Uji Koneksi PING Terminal',
        clue: 'Layar hitam terminal menampilkan balasan Reply from 192.168.1.1 time=2ms.',
        dailyContext: 'Memastikan koneksi jaringan aktif tanpa kehilangan paket data.',
        iconName: 'Terminal',
        visualTag: 'Console Ping',
        options: ['Uji Ping Koneksi', 'Game Balap', 'Aplikasi Menggambar', 'Kalkulator'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'net-1',
        title: 'Switch Konsentrator Pusat (IP: 192.168.1.1)',
        description: 'Menerima dan meneruskan frame data ke port komputer tujuan secara efisien.',
        iconType: 'Layers',
        correctCategory: 'Perangkat Pusat (Core Network)',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'net-2',
        title: 'PC Siswa 01 & Laptop Guru (Client)',
        description: 'Perangkat pengguna akhir yang meminta layanan atau file dari jaringan.',
        iconType: 'Monitor',
        correctCategory: 'Perangkat Ujung (Client Host)',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'net-3',
        title: 'Printer Bersama Lab (Shared Peripheral)',
        description: 'Perangkat cetak bersama yang bisa diakses oleh 30 komputer melalui jaringan LAN.',
        iconType: 'Printer',
        correctCategory: 'Sumber Daya Bersama (Shared Resource)',
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300'
      },
      {
        id: 'net-4',
        title: 'Router Gateway Sekolah (192.168.1.254)',
        description: 'Gerbang penghubung yang meneruskan paket dari lab sekolah menuju internet luas.',
        iconType: 'Wifi',
        correctCategory: 'Gerbang Luar (Internet Gateway)',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      }
    ],
    simulationCategories: ['Perangkat Pusat (Core Network)', 'Perangkat Ujung (Client Host)', 'Sumber Daya Bersama (Shared Resource)', 'Gerbang Luar (Internet Gateway)']
  },

  // ==========================================
  // KELAS 8 - EXCEL & PENGOLAH DATA
  // ==========================================
  'k8-excel': {
    battleBot: [
      {
        id: 1,
        scenario: 'Siswa ingin menjumlahkan seluruh nilai ulangan dari sel B2 sampai sel B10.',
        question: 'Formula spreadsheet manakah yang paling tepat dan otomatis?',
        options: [
          { label: 'A', text: '=SUM(B2:B10)' },
          { label: 'B', text: '=AVERAGE(B2:B10)' },
          { label: 'C', text: '=MAX(B2:B10)' },
          { label: 'D', text: '=COUNT(B2:B10)' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Fungsi =SUM() digunakan untuk menjumlahkan sekumpulan angka dalam rentang sel.'
      },
      {
        id: 2,
        scenario: 'Guru ingin menghitung rata-rata nilai kelas 8 untuk rapor semester.',
        question: 'Formula manakah yang menghitung nilai rata-rata secara akurat?',
        options: [
          { label: 'A', text: '=AVERAGE(C2:C35)' },
          { label: 'B', text: '=SUM(C2:C35)' },
          { label: 'C', text: '=MIN(C2:C35)' },
          { label: 'D', text: '=IF(C2:C35)' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: '=AVERAGE() menjumlahkan seluruh nilai dan membaginya dengan banyaknya data.'
      },
      {
        id: 3,
        scenario: 'Koperasi sekolah ingin menentukan apakah siswa LULUS jika nilai >= 75 dan REMIDIAL jika < 75.',
        question: 'Fungsi logika bersyarat manakah yang digunakan?',
        options: [
          { label: 'A', text: '=IF(B2>=75; "LULUS"; "REMIDIAL")' },
          { label: 'B', text: '=LOOKUP(B2)' },
          { label: 'C', text: '=SUM(B2; 75)' },
          { label: 'D', text: '=MAX(B2)' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Fungsi =IF(syarat; jika_benar; jika_salah) menguji kondisi logika.'
      },
      {
        id: 4,
        scenario: 'Saat menyalin rumus ke bawah, alamat sel $A$1 tidak boleh bergeser atau berubah.',
        question: 'Tanda apakah yang digunakan untuk mengunci sel menjadi alamat mutlak (absolut)?',
        options: [
          { label: 'A', text: 'Tanda Dolar ($)' },
          { label: 'B', text: 'Tanda Bintang (*)' },
          { label: 'C', text: 'Tanda Pagar (#)' },
          { label: 'D', text: 'Tanda Seru (!)' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Tanda $ mengunci baris dan kolom agar tidak berubah saat rumus disalin (contoh: $A$1).'
      },
      {
        id: 5,
        scenario: 'Kasir koperasi ingin mencari nama barang dan harga berdasarkan kode barang BRG-01 pada tabel vertikal.',
        question: 'Fungsi pencarian vertikal tabel manakah yang digunakan?',
        options: [
          { label: 'A', text: '=VLOOKUP()' },
          { label: 'B', text: '=HLOOKUP()' },
          { label: 'C', text: '=COUNTIF()' },
          { label: 'D', text: '=CONCATENATE()' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: '=VLOOKUP() (Vertical Lookup) mencari data pada kolom pertama tabel referensi tegak.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'FORMULA',
        scrambled: 'M U L A R O F',
        clue: 'Persamaan matematis yang diawali tanda sama dengan (=) untuk menghitung nilai.',
        dailyContext: 'Wajib diawali tanda = sebelum menulis fungsi seperti SUM atau AVERAGE.'
      },
      {
        id: 2,
        word: 'AVERAGE',
        scrambled: 'E G A R E V A',
        clue: 'Fungsi spreadsheet untuk menghitung nilai rata-rata sekumpulan angka.',
        dailyContext: 'Digunakan guru menghitung rata-rata nilai kelas.'
      },
      {
        id: 3,
        word: 'VLOOKUP',
        scrambled: 'P U K O O L V',
        clue: 'Fungsi pencarian referensi data secara vertikal berdasarkan kata kunci.',
        dailyContext: 'Mencari harga barang otomatis di kasir koperasi sekolah.'
      },
      {
        id: 4,
        word: 'ABSOLUT',
        scrambled: 'T U L O S B A',
        clue: 'Penguncian alamat sel menggunakan simbol dolar ($) agar tidak bergeser.',
        dailyContext: 'Menjaga persentase diskon di sel $B$1 tetap saat disalin ke ratusan baris.'
      },
      {
        id: 5,
        word: 'SPREADSHEET',
        scrambled: 'E E T H S D A E R P S',
        clue: 'Program lembar kerja berbentuk baris dan kolom untuk pengolahan angka.',
        dailyContext: 'Microsoft Excel dan Google Sheets adalah contoh populernya.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Tabel Lembar Kerja Spreadsheet',
        clue: 'Kisi-kisi sel berlabel huruf kolom (A, B, C) dan angka baris (1, 2, 3).',
        dailyContext: 'Antarmuka utama Microsoft Excel dan Google Sheets.',
        iconName: 'FileSpreadsheet',
        visualTag: 'Lembar Kerja Excel',
        options: ['Spreadsheet / Excel', 'Photoshop', 'Game Edukasi', 'Pemutar Video'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Fungsi Penjumlahan =SUM()',
        clue: 'Simbol huruf Yunani Sigma (Σ) yang menjumlahkan puluhan sel angka sekaligus.',
        dailyContext: 'Menghitung total uang kas kelas dalam sekejap.',
        iconName: 'Sparkles',
        visualTag: 'Formula =SUM()',
        options: ['Fungsi =SUM()', 'Fungsi Hapus', 'Kalkulator Rusak', 'Huruf Biasa'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Kunci Sel Absolut $A$1',
        clue: 'Ikon gembok pelindung sel dengan lambang dolar hijau mengunci alamat sel.',
        dailyContext: 'Mengunci referensi sel agar formula tidak error saat di-drag.',
        iconName: 'Lock',
        visualTag: 'Sel Absolut $',
        options: ['Sel Absolut ($A$1)', 'Uang Belanja', 'Gembok Pintu', 'Kartu Diskon'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Fungsi Pencarian =VLOOKUP()',
        clue: 'Kaca pembesar yang mencari kode barang pada kolom pertama tabel referensi.',
        dailyContext: 'Sistem kasir otomatis koperasi sekolah SMPN 5 Kroya.',
        iconName: 'Search',
        visualTag: 'Formula =VLOOKUP()',
        options: ['Formula =VLOOKUP()', 'Kamera Foto', 'Spidol Warna', 'Koran Bekas'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Kondisi Logika =IF()',
        clue: 'Diagram percabangan dua arah: Jika Nilai >= 75 (Lulus) atau (Remidial).',
        dailyContext: 'Menentukan status kelulusan rapor siswa secara otomatis.',
        iconName: 'Split',
        visualTag: 'Logika =IF()',
        options: ['Fungsi Logika =IF()', 'Jalan Buntu', 'Rambu Dilarang Masuk', 'Perempatan Jalan'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'xls-1',
        title: '=SUM(C2:C5) - Total Penjualan Koperasi',
        description: 'Menjumlahkan seluruh omset belanja barang koperasi secara otomatis.',
        iconType: 'Sparkles',
        correctCategory: 'Fungsi Statistik Matematika',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'xls-2',
        title: '=AVERAGE(B2:B30) - Rata-Rata Nilai Siswa',
        description: 'Menghitung nilai rata-rata sekelas untuk evaluasi pembelajaran guru.',
        iconType: 'BookOpenCheck',
        correctCategory: 'Fungsi Statistik Matematika',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'xls-3',
        title: '=IF(B2>=75; "Tuntas"; "Remidi") - Status Siswa',
        description: 'Menguji kondisi nilai ambang batas KKM untuk menentukan status kelulusan.',
        iconType: 'Split',
        correctCategory: 'Fungsi Logika Bersyarat',
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300'
      },
      {
        id: 'xls-4',
        title: '=VLOOKUP("BRG-01"; $A$2:$C$10; 3; FALSE)',
        description: 'Mencari harga barang dari tabel referensi koperasi menggunakan kode.',
        iconType: 'Search',
        correctCategory: 'Fungsi Pencarian & Referensi',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      }
    ],
    simulationCategories: ['Fungsi Statistik Matematika', 'Fungsi Logika Bersyarat', 'Fungsi Pencarian & Referensi']
  },

  // ==========================================
  // KELAS 9 - DASAR PEMROGRAMAN
  // ==========================================
  'k9-pemrograman': {
    battleBot: [
      {
        id: 1,
        scenario: 'Robot ingin bergerak maju 3 langkah lalu berputar ke kanan.',
        question: 'Runtutan instruksi berurutan dari awal sampai akhir ini disebut...',
        options: [
          { label: 'A', text: 'Algoritma Sekuensial (Runtunan Terurut)' },
          { label: 'B', text: 'Perulangan Tak Hingga (Infinite Loop)' },
          { label: 'C', text: 'Error Sintaks' },
          { label: 'D', text: 'Format Memori' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Algoritma sekuensial mengeksekusi perintah baris demi baris secara berurutan.'
      },
      {
        id: 2,
        scenario: 'Robot memeriksa sensor: "JIKA di depan ada jurang, MAKA berhenti, SELAIN ITU maju".',
        question: 'Struktur logika pemrograman apakah yang digunakan pada skenario ini?',
        options: [
          { label: 'A', text: 'Percabangan Kondisional (IF - ELSE)' },
          { label: 'B', text: 'Perulangan FOR' },
          { label: 'C', text: 'Variabel Tetap' },
          { label: 'D', text: 'Komentar Program' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'IF-ELSE memilih jalur eksekusi berdasarkan pemenuhan kondisi benar/salah.'
      },
      {
        id: 3,
        scenario: 'Robot diperintahkan mencetak kata "SPENMAKRO" sebanyak 10 kali tanpa menulis 10 baris manual.',
        question: 'Struktur pemrograman manakah yang paling efisien digunakan?',
        options: [
          { label: 'A', text: 'Perulangan (Looping FOR / WHILE)' },
          { label: 'B', text: 'Percabangan Tunggal' },
          { label: 'C', text: 'Mematikan Program' },
          { label: 'D', text: 'Menghapus File' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Looping mengulang blok instruksi yang sama sejumlah kali yang ditentukan.'
      },
      {
        id: 4,
        scenario: 'Di dalam kode program terdapat kode: "skor = 10; skor = skor + 5".',
        question: 'Berapakah nilai akhir yang disimpan di dalam wadah memori (variabel) skor?',
        options: [
          { label: 'A', text: '15' },
          { label: 'B', text: '10' },
          { label: 'C', text: '5' },
          { label: 'D', text: '50' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Variabel skor diperbarui nilainya dengan menambahkan 10 + 5 = 15.'
      },
      {
        id: 5,
        scenario: 'Program tiba-tiba macet karena ada perulangan yang kondisinya selalu benar selamanya.',
        question: 'Fenomena kesalahan logika pemrograman ini dikenal dengan istilah...',
        options: [
          { label: 'A', text: 'Infinite Loop (Perulangan Tanpa Henti)' },
          { label: 'B', text: 'Sintaks Sukses' },
          { label: 'C', text: 'Kompilasi Selesai' },
          { label: 'D', text: 'Hemat Daya' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Infinite loop terjadi saat kondisi berhenti perulangan tidak pernah tercapai.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'VARIABEL',
        scrambled: 'B E L A I R A V',
        clue: 'Wadah dalam memori untuk menyimpan nilai data yang dapat berubah.',
        dailyContext: 'Contohnya variabel skor_game = 100.'
      },
      {
        id: 2,
        word: 'LOOPING',
        scrambled: 'P I N G L O O',
        clue: 'Proses mengeksekusi blok kode berulang kali sampai batas tertentu.',
        dailyContext: 'Mengulang langkah robot 5 kali ke depan.'
      },
      {
        id: 3,
        word: 'KONDISI',
        scrambled: 'S I D I N O K',
        clue: 'Pernyataan bernilai Benar (True) atau Salah (False) dalam percabangan IF.',
        dailyContext: 'Memeriksa apakah skor siswa memenuhi syarat kelulusan.'
      },
      {
        id: 4,
        word: 'DEBUGGING',
        scrambled: 'G I N G B U G E D',
        clue: 'Proses melacak dan memperbaiki kesalahan (bug) pada baris kode program.',
        dailyContext: 'Mencari penyebab karakter game tidak bisa melompat.'
      },
      {
        id: 5,
        word: 'FUNGSI',
        scrambled: 'S I G N U F',
        clue: 'Kumpulan blok kode terorganisir yang melakukan tugas spesifik berulang.',
        dailyContext: 'Membuat blok gerak_robot() yang bisa dipanggil kapan saja.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Blok Kode Visual (Blockly / Scratch)',
        clue: 'Potongan puzzle warna-warni yang saling mengunci membentuk program logika.',
        dailyContext: 'Media seru belajar pemrograman untuk siswa SMP tanpa mengetik sintaks rumit.',
        iconName: 'Code2',
        visualTag: 'Block Coding',
        options: ['Block Coding / Scratch', 'Game Balap Mobil', 'Kertas HVS', 'Kalkulator Biasa'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Robot Navigasi Labirin',
        clue: 'Karakter robot cerdas yang bergerak langkah demi langkah menghindari rintangan.',
        dailyContext: 'Objek yang dikendalikan oleh instruksi coding siswa.',
        iconName: 'Bot',
        visualTag: 'Robot Runner',
        options: ['Robot Algoritma', 'Mobil Mogok', 'Sepeda Ontel', 'Pohon Kelapa'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Percabangan Logika IF-ELSE',
        clue: 'Rambu penunjuk arah bercabang dua: JIKA Ada Bintang -> Ambil, SELAIN ITU -> Maju.',
        dailyContext: 'Mengambil keputusan cerdas di dalam permainan game.',
        iconName: 'Split',
        visualTag: 'Logika IF-ELSE',
        options: ['Percabangan IF-ELSE', 'Lampu Merah Rusak', 'Pagar Besi', 'Jembatan Putus'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Perulangan Putaran (Looping)',
        clue: 'Anak panah melingkar memutar bertuliskan "Ulangi 4 Kali".',
        dailyContext: 'Membuat karakter robot berputar mengelilingi kotak.',
        iconName: 'Repeat',
        visualTag: 'Looping Iterasi',
        options: ['Perulangan Loop', 'Baling-baling Rusak', 'Roda Pedati', 'Jam Mati'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Misi Berhasil (Finish Target)',
        clue: 'Bendera hijau berkibar dengan bintang emas lambang keberhasilan program.',
        dailyContext: 'Robot mencapai titik akhir sesuai algoritma yang dirancang siswa.',
        iconName: 'Award',
        visualTag: 'Program Tuntas',
        options: ['Target Finish Sukses', 'Kartu Merah', 'Kabel Putus', 'Error Sistem'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'code-1',
        title: 'MULAI dan Inisialisasi Posisi Robot (x=0, y=0)',
        description: 'Langkah awal wajib untuk menyetel titik mula dan skor awal sistem.',
        iconType: 'Power',
        correctCategory: 'Inisialisasi & Mulai Program',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'code-2',
        title: 'MAJU 3 Langkah & PUTAR KANAN 90°',
        description: 'Instruksi aksi gerak berurutan mengarahkan robot menuju bintang emas.',
        iconType: 'ArrowRight',
        correctCategory: 'Instruksi Aksi Sekuensial',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'code-3',
        title: 'JIKA Sensor Menemukan Bintang MAKA skor = skor + 50',
        description: 'Menguji kondisi lingkungan untuk mengeksekusi bonus hadiah koin.',
        iconType: 'Split',
        correctCategory: 'Percabangan Kondisi (IF)',
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
      },
      {
        id: 'code-4',
        title: 'ULANGI 3 Kali: MAJU dan HINDARI RINTANGAN',
        description: 'Mengeksekusi perulangan aksi agar kode lebih hemat dan ringkas.',
        iconType: 'Repeat',
        correctCategory: 'Perulangan (Looping)',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      }
    ],
    simulationCategories: ['Inisialisasi & Mulai Program', 'Instruksi Aksi Sekuensial', 'Percabangan Kondisi (IF)', 'Perulangan (Looping)']
  },

  // ==========================================
  // KELAS 9 - KEAMANAN DIGITAL & SIBER
  // ==========================================
  'k9-keamanan-digital': {
    battleBot: [
      {
        id: 1,
        scenario: 'Siswa membuat kata sandi untuk akun belajar: "123456" atau "tanggal lahir".',
        question: 'Mengapa kata sandi tersebut sangat berbahaya dan mudah diretas?',
        options: [
          { label: 'A', text: 'Terlalu pendek, mudah ditebak robot kamus peretas (brute-force) dalam sekejap' },
          { label: 'B', text: 'Karena angka 1 sampai 6 adalah angka sial' },
          { label: 'C', text: 'Karena Google tidak suka angka genap' },
          { label: 'D', text: 'Karena keyboard akan rusak' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Kata sandi pendek & tanggal lahir bisa dibobol peretas otomatis dalam waktu kurang dari 1 detik.'
      },
      {
        id: 2,
        scenario: 'Penyusup siber mengirimkan tautan palsu yang mirip halaman login Google untuk mencuri sandi.',
        question: 'Serangan penipuan rekayasa sosial memancing data korban ini disebut...',
        options: [
          { label: 'A', text: 'Phishing (Memancing Kredensial)' },
          { label: 'B', text: 'Defragmentasi Disk' },
          { label: 'C', text: 'Kompresi File ZIP' },
          { label: 'D', text: 'Screenshot Layar' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Phishing adalah taktik peretas membuat halaman palsu untuk mencuri username & password.'
      },
      {
        id: 3,
        scenario: 'Agar akun tetap aman meski peretas berhasil menebak kata sandi kita.',
        question: 'Fitur keamanan tambahan apakah yang wajib diaktifkan pada akun email belajar?',
        options: [
          { label: 'A', text: 'Autentikasi Dua Langkah (2FA / Two-Factor Authentication)' },
          { label: 'B', text: 'Menghapus foto profil' },
          { label: 'C', text: 'Mengganti nama akun menjadi anonim' },
          { label: 'D', text: 'Mematikan internet selamanya' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: '2FA mewajibkan konfirmasi lewat kode OTP di ponsel asli pemilik akun.'
      },
      {
        id: 4,
        scenario: 'Masuk pesan WhatsApp dari nomor tak dikenal mengirim file dengan ekstensi ".apk" berkedok undangan.',
        question: 'Tindakan paling cerdas yang wajib dilakukan siswa SMP adalah...',
        options: [
          { label: 'A', text: 'Jangan pernah mengeklik/menginstal file tersebut, segera hapus dan blokir pengirim' },
          { label: 'B', text: 'Langsung mengklik instal karena penasaran siapa yang mengundang' },
          { label: 'C', text: 'Mengirimkan file tersebut ke semua teman sekelas' },
          { label: 'D', text: 'Membuka di laptop guru' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'File .apk dari nomor tak dikenal adalah malware Trojan yang bisa mencuri SMS dan data perbankan.'
      },
      {
        id: 5,
        scenario: 'Di dinding pertahanan jaringan sekolah terdapat sistem penyaring lalu lintas data mencurigakan.',
        question: 'Sistem perisai keamanan siber yang memblokir akses ilegal ini disebut...',
        options: [
          { label: 'A', text: 'Firewall (Dinding Api Pengaman)' },
          { label: 'B', text: 'Termometer Digital' },
          { label: 'C', text: 'Kipas Angin Komputer' },
          { label: 'D', text: 'Kabel VGA' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Firewall memonitor dan memfilter lalu lintas jaringan masuk dan keluar berdasarkan aturan keamanan.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'FIREWALL',
        scrambled: 'L A W E R I F',
        clue: 'Perisai dinding pelindung yang memblokir serangan siber mencurigakan.',
        dailyContext: 'Mencegah virus dan hacker menyusup ke lab komputer sekolah.'
      },
      {
        id: 2,
        word: 'PHISHING',
        scrambled: 'G N I H S I H P',
        clue: 'Trik penipuan tautan palsu untuk memancing kata sandi korban.',
        dailyContext: 'Email palsu mengaku dari bank atau kepala sekolah.'
      },
      {
        id: 3,
        word: 'ENKRIPSI',
        scrambled: 'I S P I R K N E',
        clue: 'Pengacakan kode data menjadi bentuk rahasia agar aman saat dikirim.',
        dailyContext: 'Membuat pesan WhatsApp hanya bisa dibaca pengirim dan penerima.'
      },
      {
        id: 4,
        word: 'MALWARE',
        scrambled: 'E R A W L A M',
        clue: 'Perangkat lunak jahat yang dirancang merusak atau mencuri data sistem.',
        dailyContext: 'Virus, worm, trojan, dan ransomware termasuk dalam kelompok ini.'
      },
      {
        id: 5,
        word: 'PASSWORD',
        scrambled: 'D R O W S S A P',
        clue: 'Kata sandi rahasia untuk membuka kunci akses akun digital.',
        dailyContext: 'Wajib kombinasi huruf besar, kecil, angka, dan simbol unik.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Perisai Firewall Siber',
        clue: 'Simbol perisai baja bersinar menahan panah serangan virus dan paket berbahaya.',
        dailyContext: 'Sistem pengaman jaringan laboratorium komputer SMPN 5 Kroya.',
        iconName: 'ShieldCheck',
        visualTag: 'Firewall Perisai',
        options: ['Firewall Siber', 'Pintu Gerbang', 'Roda Pedati', 'Kacamata Hitam'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Verifikasi Dua Langkah (2FA)',
        clue: 'Gambar gembok sandi yang diperkuat dengan kode OTP di layar smartphone.',
        dailyContext: 'Melindungi akun belajar dari peretas meski sandi sudah bocor.',
        iconName: 'SmartphoneNfc',
        visualTag: 'Keamanan 2FA',
        options: ['Autentikasi 2FA', 'Kalkulator', 'Kamera Selfie', 'Game Online'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Umpan Penipuan Phishing',
        clue: 'Mata pancing kail dengan amplop surat email palsu yang mencurigakan.',
        dailyContext: 'Waspada tautan palsu yang meminta input password.',
        iconName: 'AlertTriangle',
        visualTag: 'Bahaya Phishing',
        options: ['Serangan Phishing', 'Umpan Ikan Lele', 'Surat Undangan Pesta', 'Kado Ulang Tahun'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Kata Sandi Kuat (Strong Password)',
        clue: 'Indikator garis hijau penuh 100% dengan kombinasi huruf, angka, dan simbol.',
        dailyContext: 'Contoh: Spenm@kr0_Sm@rt2026! yang butuh ribuan tahun untuk dibobol.',
        iconName: 'Key',
        visualTag: 'Kata Sandi Kuat',
        options: ['Kata Sandi Kuat', 'Sandi Lemah 123456', 'Nomor Rumah', 'Nama Hewan'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Peringatan Malware Berbahaya',
        clue: 'Tanda seru segitiga merah dengan tengkorak robot peringatan virus.',
        dailyContext: 'Muncul saat pengguna hendak mendownload file asing berbahaya.',
        iconName: 'AlertOctagon',
        visualTag: 'Malware Threat',
        options: ['Bahaya Malware / Virus', 'Diskon Belanja', 'Lampu Tidur', 'Kado Gratis'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'sec-1',
        title: 'Kata Sandi: "P@ssw0rd_Spenmakro2026!"',
        description: 'Panjang 22 karakter berisi huruf besar, kecil, angka, dan simbol (butuh 500 juta tahun dibobol).',
        iconType: 'Key',
        correctCategory: 'Perilaku Sangat Aman (Best Practice)',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'sec-2',
        title: 'Aktifkan 2FA & Jangan Berikan Kode OTP ke Siapa Pun',
        description: 'Mewajibkan konfirmasi ganda saat login di perangkat baru demi perlindungan maksimal.',
        iconType: 'ShieldCheck',
        correctCategory: 'Perilaku Sangat Aman (Best Practice)',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'sec-3',
        title: 'Mengeklik Link "Undangan.apk" dari Nomor WA Tak Dikenal',
        description: 'Mengunduh file eksekusi asing yang bisa menginstal trojan pencuri SMS dan OTP.',
        iconType: 'AlertOctagon',
        correctCategory: 'Ancaman Berbahaya (Harus Ditolak)',
        color: 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
      },
      {
        id: 'sec-4',
        title: 'Menggunakan Password "123456" untuk Semua Akun Sosial',
        description: 'Sandi sangat lemah yang langsung dibobol peretas kamus dalam hitungan 0.001 detik.',
        iconType: 'AlertTriangle',
        correctCategory: 'Ancaman Berbahaya (Harus Ditolak)',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      }
    ],
    simulationCategories: ['Perilaku Sangat Aman (Best Practice)', 'Ancaman Berbahaya (Harus Ditolak)']
  },

  // ==========================================
  // KELAS 8 - KONEKSI PERANGKAT DIGITAL
  // ==========================================
  'k8-koneksi': {
    battleBot: [
      {
        id: 1,
        scenario: 'Siswa ingin mendengarkan musik saat joging tanpa terganggu kabel yang menjuntai.',
        question: 'Teknologi nirkabel jarak dekat (WPAN) apakah yang menghubungkan earphone TWS ke smartphone?',
        options: [
          { label: 'A', text: 'Bluetooth' },
          { label: 'B', text: 'Kabel VGA' },
          { label: 'C', text: 'Satelit Luar Angkasa' },
          { label: 'D', text: 'Kabel Listrik PLN' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Bluetooth adalah standar nirkabel jarak dekat (sekitar 10 meter) untuk aksesori personal.'
      },
      {
        id: 2,
        scenario: 'Siswa ingin memindahkan file video tugas 10 Gigabyte dari ponsel ke laptop dengan kecepatan paling stabil.',
        question: 'Media koneksi manakah yang paling cepat dan bebas interferensi sinyal?',
        options: [
          { label: 'A', text: 'Kabel USB (Koneksi Kabel Berkecepatan Tinggi)' },
          { label: 'B', text: 'Inframerah jadul' },
          { label: 'C', text: 'Surat pos' },
          { label: 'D', text: 'Sms biasa' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Koneksi kabel USB memiliki laju transfer gigabit yang jauh lebih stabil daripada sinyal radio nirkabel.'
      },
      {
        id: 3,
        scenario: 'Di perpustakaan, 50 siswa sekaligus ingin mengakses internet cepat dengan jangkauan satu ruangan besar.',
        question: 'Teknologi jaringan lokal nirkabel manakah yang ideal digunakan?',
        options: [
          { label: 'A', text: 'Wi-Fi (Wireless Fidelity)' },
          { label: 'B', text: 'Kabel Antena TV' },
          { label: 'C', text: 'Walkie Talkie' },
          { label: 'D', text: 'Radio FM' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Wi-Fi (IEEE 802.11) menyediakan bandwidth besar untuk banyak perangkat di area lokal.'
      },
      {
        id: 4,
        scenario: 'Saat menyalakan hotspot pribadi (Tethering) di smartphone untuk laptop teman.',
        question: 'Langkah keamanan apa yang wajib dilakukan agar kuota internetmu tidak disedot orang asing?',
        options: [
          { label: 'A', text: 'Memasang kata sandi keamanan WPA2/WPA3 pada hotspot' },
          { label: 'B', text: 'Membiarkan hotspot terbuka (Open) tanpa sandi' },
          { label: 'C', text: 'Mematikan layar HP' },
          { label: 'D', text: 'Menghapus nama hotspot' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Sandi WPA2/WPA3 mengunci akses tethering hanya untuk orang yang kamu izinkan.'
      },
      {
        id: 5,
        scenario: 'Ketika berada di kafe atau tempat umum dengan Wi-Fi publik gratis tanpa sandi.',
        question: 'Tindakan apa yang berisiko tinggi dan harus dihindari saat terhubung ke Wi-Fi publik?',
        options: [
          { label: 'A', text: 'Melakukan transaksi perbankan atau memasukkan nomor kartu kredit penting' },
          { label: 'B', text: 'Membaca artikel berita sekolah' },
          { label: 'C', text: 'Mengecek jadwal pelajaran' },
          { label: 'D', text: 'Menutup browser' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Wi-Fi publik tanpa sandi rawan serangan Man-in-the-Middle yang menyadap lalu lintas data.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'BLUETOOTH',
        scrambled: 'H T O O T E U L B',
        clue: 'Koneksi nirkabel jarak pendek untuk menghubungkan aksesoris ponsel.',
        dailyContext: 'Menghubungkan speaker nirkabel dan smartwatch ke smartphone.'
      },
      {
        id: 2,
        word: 'TETHERING',
        scrambled: 'G N I R E H T E T',
        clue: 'Berbagi koneksi internet smartphone ke perangkat laptop atau tablet lain.',
        dailyContext: 'Membagikan kuota data saat teman kehabisan paket internet di sekolah.'
      },
      {
        id: 3,
        word: 'HOTSPOT',
        scrambled: 'T O P S T O H',
        clue: 'Titik pancar sinyal nirkabel tempat pengguna dapat terhubung ke internet.',
        dailyContext: 'Hotspot Wi-Fi di area lobi perpustakaan SMPN 5 Kroya.'
      },
      {
        id: 4,
        word: 'PAIRING',
        scrambled: 'G N I R I A P',
        clue: 'Proses penyandingan dua perangkat Bluetooth sebelum saling bertukar data.',
        dailyContext: 'Menyandingkan earphone baru ke ponsel untuk pertama kali.'
      },
      {
        id: 5,
        word: 'NIRKABEL',
        scrambled: 'L E B A K R I N',
        clue: 'Istilah bahasa Indonesia untuk teknologi wireless tanpa menggunakan kabel fisik.',
        dailyContext: 'Wi-Fi dan Bluetooth bekerja secara nirkabel melalui gelombang radio.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Koneksi Nirkabel Bluetooth',
        clue: 'Simbol huruf B runcing bergaya rune Nordik warna biru khas teknologi pairing.',
        dailyContext: 'Ikon di bilah pengaturan cepat ponsel untuk menyambung TWS.',
        iconName: 'Radio',
        visualTag: 'Bluetooth Icon',
        options: ['Bluetooth', 'Kabel LAN', 'Baterai Lemah', 'Mode Pesawat'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Kabel USB Tipe-C',
        clue: 'Kabel fisik dengan kepala konektor pipih bolak-balik transfer data cepat.',
        dailyContext: 'Menyambungkan ponsel ke laptop untuk backup foto dan video.',
        iconName: 'Power',
        visualTag: 'Kabel USB-C',
        options: ['Kabel USB-C', 'Tali Sepatu', 'Kabel Antena', 'Selang Air'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Sinyal Wi-Fi Bergelombang',
        clue: 'Ikon titik pancar dengan tiga lengkungan gelombang radio yang memancar ke atas.',
        dailyContext: 'Indikator kekuatan sinyal internet di sudut kanan atas layar.',
        iconName: 'Wifi',
        visualTag: 'Sinyal Wi-Fi',
        options: ['Sinyal Wi-Fi', 'Pelangi', 'Kipas Tangan', 'Rambu Bahaya'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Hotspot Portabel Ponsel',
        clue: 'Ikon lingkaran bertingkat memancarkan sinyal hotspot ke laptop sekitar.',
        dailyContext: 'Berbagi koneksi kuota data saat kerja kelompok di luar kelas.',
        iconName: 'SmartphoneNfc',
        visualTag: 'Hotspot Ponsel',
        options: ['Tethering Hotspot', 'Kamera Ponsel', 'Lampu Senter', 'Kalkulator'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Earphone Nirkabel TWS',
        clue: 'Dua earbud kecil tanpa kabel yang tersimpan di dalam wadah pengisi daya oval.',
        dailyContext: 'Mendengarkan materi podcast audio pembelajaran tanpa kabel kusut.',
        iconName: 'Sparkles',
        visualTag: 'Perangkat TWS',
        options: ['Earphone TWS Bluetooth', 'Kacamata Hitam', 'Jam Tangan', 'Kapur Tulis'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'conn-1',
        title: 'Earphone TWS & Smartwatch ke Ponsel',
        description: 'Jarak pendek 1-10 meter, hemat daya baterai, cocok untuk aksesori personal.',
        iconType: 'Radio',
        correctCategory: 'Koneksi Bluetooth (Nirkabel Jarak Dekat)',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'conn-2',
        title: 'Laptop Siswa ke Hotspot Perpustakaan',
        description: 'Bandwidth tinggi puluhan Mbps untuk streaming video materi dan unduh tugas.',
        iconType: 'Wifi',
        correctCategory: 'Koneksi Wi-Fi (Nirkabel Area Lokal)',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'conn-3',
        title: 'Transfer File Video 15GB ke Laptop',
        description: 'Koneksi fisik kawat tembaga/serat dengan kecepatan gigabit paling stabil tanpa lag.',
        iconType: 'Power',
        correctCategory: 'Koneksi Kabel USB (Fisik Berkecepatan Tinggi)',
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300'
      },
      {
        id: 'conn-4',
        title: 'Berbagi Kuota Data HP ke Tablet Teman',
        description: 'Mengaktifkan pemancar nirkabel tethering bersandi WPA2 di smartphone.',
        iconType: 'SmartphoneNfc',
        correctCategory: 'Koneksi Wi-Fi (Nirkabel Area Lokal)',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      }
    ],
    simulationCategories: ['Koneksi Bluetooth (Nirkabel Jarak Dekat)', 'Koneksi Wi-Fi (Nirkabel Area Lokal)', 'Koneksi Kabel USB (Fisik Berkecepatan Tinggi)']
  },

  // ==========================================
  // KELAS 8 - MEMBEDAKAN FAKTA, OPINI, DAN HOAKS
  // ==========================================
  'k8-fakta-hoaks': {
    battleBot: [
      {
        id: 1,
        scenario: 'Pernyataan berbunyi: "SMP Negeri 5 Kroya berlokasi di Kabupaten Cilacap, Jawa Tengah".',
        question: 'Pernyataan yang dapat diverifikasi secara objektif dengan data resmi ini adalah...',
        options: [
          { label: 'A', text: 'Fakta Terverifikasi' },
          { label: 'B', text: 'Opini Subjektif' },
          { label: 'C', text: 'Hoaks Berbahaya' },
          { label: 'D', text: 'Kabar Angin' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Fakta adalah peristiwa nyata yang didukung bukti dan dokumen resmi.'
      },
      {
        id: 2,
        scenario: 'Pernyataan berbunyi: "Menurut saya, pelajaran Informatika adalah mata pelajaran paling menyenangkan di sekolah".',
        question: 'Pernyataan yang memuat kata "menurut saya" dan penilaian perasaan pribadi tergolong...',
        options: [
          { label: 'A', text: 'Opini (Pandangan Pribadi)' },
          { label: 'B', text: 'Fakta Ilmiah Mutlak' },
          { label: 'C', text: 'Undang-Undang Resmi' },
          { label: 'D', text: 'Rumus Fisika' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Opini mencerminkan perasaan atau penilaian subjektif yang bisa berbeda pada tiap orang.'
      },
      {
        id: 3,
        scenario: 'Pesan berantai beredar: "Air rebusan mi instan mengandung lilin berbahaya yang bikin usus membatu!".',
        question: 'Setelah dicek di laman resmi BPOM, klaim ini terbukti palsu. Pernyataan ini adalah...',
        options: [
          { label: 'A', text: 'Hoaks (Kabar Bohong yang Menyesatkan)' },
          { label: 'B', text: 'Fakta Kedokteran' },
          { label: 'C', text: 'Peraturan Menteri' },
          { label: 'D', text: 'Instruksi Guru' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Hoaks adalah informasi yang direkayasa untuk menipu dan menimbulkan keresahan publik.'
      },
      {
        id: 4,
        scenario: 'Artikel internet menggunakan judul clickbait: "HEBOH! Jangan Makan Buah Ini Kalau Mau Selamat!".',
        question: 'Ciri-ciri judul sensasional dengan huruf kapital berlebih dan tanda seru biasanya menandakan...',
        options: [
          { label: 'A', text: 'Artikel umpan klik (clickbait) berkualitas rendah dan rawan informasi menyesatkan' },
          { label: 'B', text: 'Jurnal kedokteran resmi dunia' },
          { label: 'C', text: 'Surat edaran menteri' },
          { label: 'D', text: 'Kamus bahasa baku' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Clickbait mengeksploitasi emosi pembaca demi iklan, sering kali isinya tidak sesuai judul.'
      },
      {
        id: 5,
        scenario: 'Untuk memastikan apakah suatu berita viral itu fakta atau hoaks di Indonesia.',
        question: 'Layanan dan portal resmi cek fakta manakah yang terpercaya untuk dijadikan rujukan?',
        options: [
          { label: 'A', text: 'Portal CekFakta.com dan situs AduanKonten.id dari Kominfo' },
          { label: 'B', text: 'Komentar netizen di kolom TikTok' },
          { label: 'C', text: 'Grup obrolan game' },
          { label: 'D', text: 'Status WA orang asing' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'CekFakta.com dikelola koalisi jurnalis dan Mafindo dengan verifikasi bukti ilmiah.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'FAKTA',
        scrambled: 'T A K A F',
        clue: 'Hal atau keadaan nyata yang benar-benar ada dan terbukti secara objektif.',
        dailyContext: 'Berdasarkan data angka, waktu, dan dokumen resmi.'
      },
      {
        id: 2,
        word: 'OPINI',
        scrambled: 'N I P I O',
        clue: 'Pendapat, pikiran, atau pandangan subjektif seseorang mengenai suatu hal.',
        dailyContext: 'Komentar orang terhadap bagus tidaknya desain poster sekolah.'
      },
      {
        id: 3,
        word: 'HOAKS',
        scrambled: 'S K A O H',
        clue: 'Kabar bohong atau informasi rekayasa yang sengaja disebarkan untuk menyesatkan.',
        dailyContext: 'Pesan viral bohong yang harus kita tangkal dengan literasi digital.'
      },
      {
        id: 4,
        word: 'VERIFIKASI',
        scrambled: 'I S A K I F I R E V',
        clue: 'Tindakan memeriksa kebenaran laporan atau dokumen sebelum memercayainya.',
        dailyContext: 'Mengecek keaslian rilis surat edaran ke website resmi dinas pendidikan.'
      },
      {
        id: 5,
        word: 'LITERASI',
        scrambled: 'S A R I T E L I',
        clue: 'Kemampuan menganalisis, memahami, dan mengevaluasi informasi secara kritis.',
        dailyContext: 'Fondasi utama siswa cerdas agar tidak mudah termakan isu palsu.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Stempel Cek Fakta Valid',
        clue: 'Ikon stempel lingkaran hijau dengan tanda centang bertuliskan FAKTA TERVERIFIKASI.',
        dailyContext: 'Label artikel yang sudah diuji kebenarannya oleh tim pemeriksa fakta.',
        iconName: 'CheckCircle2',
        visualTag: 'Fakta Valid',
        options: ['Fakta Terverifikasi', 'Kabar Hoaks', 'Iklan Belanja', 'Game Online'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Tanda Peringatan Hoaks Merah',
        clue: 'Tanda silang merah tebal dengan kata HOAKS tercetak besar.',
        dailyContext: 'Label klarifikasi untuk berita palsu yang beredar di media sosial.',
        iconName: 'AlertOctagon',
        visualTag: 'Label Hoaks',
        options: ['Kabar Hoaks Palsu', 'Buku Pelajaran', 'Sertifikat Prestasi', 'Piala Emas'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Gelembung Opini & Pendapat',
        clue: 'Dua balon percakapan obrolan warna-warni yang mewakili pandangan pribadi.',
        dailyContext: 'Menunjukkan kesan atau penilaian seseorang terhadap suatu karya.',
        iconName: 'MessageSquareWarning',
        visualTag: 'Opini Subjektif',
        options: ['Opini Subjektif', 'Hukum Alam', 'Data Sensus', 'Rumus Matematika'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Kaca Pembesar Investigasi Detektif',
        clue: 'Kaca pembesar menyorot dokumen teks untuk memeriksa keaslian tanda tangan dan cap.',
        dailyContext: 'Menyelidiki keaslian surat pengumuman yang viral di internet.',
        iconName: 'Search',
        visualTag: 'Investigasi Data',
        options: ['Investigasi Bukti', 'Kacamata Renang', 'Kamera Rusak', 'Piring Kaca'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Judul Clickbait Sensasional',
        clue: 'Teks berkedip merah penuh tanda seru bertuliskan "HEBOH! LIHAT SEKARANG!".',
        dailyContext: 'Trik memancing klik dari situs berita abal-abal pemburu cuan.',
        iconName: 'AlertTriangle',
        visualTag: 'Clickbait Sensasional',
        options: ['Umpan Klik (Clickbait)', 'Jurnal Penelitian', 'Buku Kamus', 'Pidato Resmi'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'fh-1',
        title: 'SMP Negeri 5 Kroya Memiliki Laboratorium Komputer dengan 32 PC',
        description: 'Bisa dibuktikan dan diverifikasi langsung melalui inventaris resmi sekolah.',
        iconType: 'CheckCircle2',
        correctCategory: 'Fakta (Dapat Diverifikasi Objektif)',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'fh-2',
        title: 'Menurut Saya, Desain Halaman Belajar Ini Paling Keren di Kabupaten Cilacap',
        description: 'Pandangan subjektif perasaan seseorang yang tidak bisa diukur mutlak sama.',
        iconType: 'MessageSquareWarning',
        correctCategory: 'Opini (Pandangan / Penilaian Subjektif)',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'fh-3',
        title: 'Sebarkan Pesan Ini ke 20 Grup WA, Maka Saldo Rekeningmu Bertambah 5 Juta!',
        description: 'Klaim rekayasa mustahil tanpa dasar logika untuk memicu spam berantai.',
        iconType: 'AlertOctagon',
        correctCategory: 'Hoaks (Kabar Bohong Menyesatkan)',
        color: 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
      },
      {
        id: 'fh-4',
        title: 'Matahari Terbit dari Arah Timur Berdasarkan Rotasi Bumi',
        description: 'Kebenaran ilmiah yang telah dibuktikan melalui hukum fisika dan astronomi.',
        iconType: 'BookOpenCheck',
        correctCategory: 'Fakta (Dapat Diverifikasi Objektif)',
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300'
      }
    ],
    simulationCategories: ['Fakta (Dapat Diverifikasi Objektif)', 'Opini (Pandangan / Penilaian Subjektif)', 'Hoaks (Kabar Bohong Menyesatkan)']
  },

  // ==========================================
  // KELAS 7 - GOOGLE DOCS & PENGOLAH KATA
  // ==========================================
  'k7-gdoc': {
    battleBot: [
      {
        id: 1,
        scenario: 'Tiga siswa ingin mengerjakan satu dokumen makalah kelompok bersamaan dari rumah masing-masing.',
        question: 'Fitur utama aplikasi berbasis komputasi awan (Google Docs) yang memungkinkan hal ini adalah...',
        options: [
          { label: 'A', text: 'Kolaborasi Daring Real-Time' },
          { label: 'B', text: 'Pencetakan Offline' },
          { label: 'C', text: 'Format Harddisk' },
          { label: 'D', text: 'Koneksi Kabel LAN' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Google Docs memungkinkan banyak pengguna mengedit dokumen yang sama secara bersamaan.'
      },
      {
        id: 2,
        scenario: 'Siswa ingin membagikan tautan dokumen tugas ke teman sekelas agar hanya bisa membaca tanpa bisa mengubah teks.',
        question: 'Tingkat hak akses (sharing permission) manakah yang harus dipilih?',
        options: [
          { label: 'A', text: 'Viewer (Pelihat / Lihat Saja)' },
          { label: 'B', text: 'Editor (Pengedit)' },
          { label: 'C', text: 'Owner (Pemilik Penuh)' },
          { label: 'D', text: 'Admin Domain' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Akses Viewer hanya mengizinkan pengguna membaca dokumen tanpa hak mengubah atau menghapus teks.'
      },
      {
        id: 3,
        scenario: 'Guru ingin memberikan koreksi dan catatan revisi pada paragraf tertentu tanpa langsung menghapus kalimat siswa.',
        question: 'Fitur apakah yang paling tepat digunakan oleh guru?',
        options: [
          { label: 'A', text: 'Beri Komentar (Add Comment) & Mode Saran (Suggesting)' },
          { label: 'B', text: 'Menghapus file secara permanen' },
          { label: 'C', text: 'Mengunci komputer siswa' },
          { label: 'D', text: 'Memotong kabel keyboard' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Komentar dan Mode Saran memungkinkan catatan perbaikan ditinjau sebelum disetujui.'
      },
      {
        id: 4,
        scenario: 'Secara tidak sengaja, teman sekelompok menghapus satu halaman penuh dari tugas makalah.',
        question: 'Fitur penyelamat apakah di Google Docs yang dapat mengembalikan dokumen ke menit sebelumnya?',
        options: [
          { label: 'A', text: 'Riwayat Versi (Version History)' },
          { label: 'B', text: 'Menginstal ulang Windows' },
          { label: 'C', text: 'Membeli laptop baru' },
          { label: 'D', text: 'Menyerah dan menangis' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Version History mencatat semua perubahan dari waktu ke waktu dan bisa dipulihkan kapan saja.'
      },
      {
        id: 5,
        scenario: 'Sebelum dikirim ke Google Classroom, guru meminta dokumen diubah ke format yang tidak mudah berantakan saat dibuka di HP.',
        question: 'Format ekspor file standar apakah yang paling ideal untuk laporan tugas akhir?',
        options: [
          { label: 'A', text: 'PDF (Portable Document Format)' },
          { label: 'B', text: 'File Gambar BMP' },
          { label: 'C', text: 'Audio MP3' },
          { label: 'D', text: 'Ekstensi .exe' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Format PDF mempertahankan tata letak huruf, margin, dan gambar di semua jenis perangkat.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'DOKUMEN',
        scrambled: 'N E M U K O D',
        clue: 'Berkas ketikan yang memuat teks, tabel, dan gambar untuk laporan tugas.',
        dailyContext: 'Dibuat menggunakan aplikasi Google Docs atau Microsoft Word.'
      },
      {
        id: 2,
        word: 'KOLABORASI',
        scrambled: 'I S A R O B A L O K',
        clue: 'Bekerja bersama secara serentak dalam satu berkas kerja daring.',
        dailyContext: 'Mengerjakan tugas kelompok bersama teman dari rumah masing-masing.'
      },
      {
        id: 3,
        word: 'KOMENTAR',
        scrambled: 'R A T N E M O K',
        clue: 'Catatan pinggir untuk memberi saran atau revisi pada kalimat tugas.',
        dailyContext: 'Umpan balik dari guru di samping paragraf tulisan siswa.'
      },
      {
        id: 4,
        word: 'PARAGRAF',
        scrambled: 'F A R G A R A P',
        clue: 'Bagian tulisan yang terdiri dari beberapa kalimat dengan satu ide pokok.',
        dailyContext: 'Diatur tata letaknya menggunakan rata kiri, tengah, atau rata kanan-kiri.'
      },
      {
        id: 5,
        word: 'MARGIN',
        scrambled: 'N I G R A M',
        clue: 'Batas jarak tepi antara teks tulisan dengan pinggiran kertas halaman.',
        dailyContext: 'Pengaturan batas atas, bawah, kiri, dan kanan halaman dokumen.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Ikon Google Docs (Pengolah Dokumen)',
        clue: 'Lembaran kertas warna biru dengan lipatan sudut kanan atas dan garis-garis teks putih.',
        dailyContext: 'Aplikasi pengolah dokumen andalan untuk tugas Bahasa Indonesia dan Informatika.',
        iconName: 'FileText',
        visualTag: 'Google Docs',
        options: ['Google Docs', 'Google Sheets', 'Google Slides', 'Kamera'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Tombol Bagikan (Share Button)',
        clue: 'Tombol biru terang dengan ikon gembok atau orang bertuliskan "Share / Bagikan".',
        dailyContext: 'Mengatur hak akses teman atau guru sebelum membagikan link tugas.',
        iconName: 'Sparkles',
        visualTag: 'Tombol Share',
        options: ['Tombol Bagikan Dokumen', 'Tombol Hapus', 'Tombol Matikan PC', 'Tombol Volume'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Mode Saran (Suggesting Mode)',
        clue: 'Ikon pensil hijau dengan garis coret dan teks usulan perbaikan kalimat.',
        dailyContext: 'Memberikan saran perbaikan tanpa langsung mengubah tulisan teman.',
        iconName: 'BookOpenCheck',
        visualTag: 'Mode Saran',
        options: ['Mode Saran Kalimat', 'Spidol Permanen', 'Penghapus Papan', 'Gunting Kertas'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Riwayat Versi (Version History)',
        clue: 'Ikon jam dinding dengan daftar catatan riwayat waktu penyimpanan otomatis.',
        dailyContext: 'Mengembalikan teks yang tak sengaja terhapus teman sekelompok.',
        iconName: 'RotateCcw',
        visualTag: 'Version History',
        options: ['Riwayat Versi Dokumen', 'Alarm Bangun Pagi', 'Stopwatch Lari', 'Kalender Dinding'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Ekspor Dokumen ke Format PDF',
        clue: 'Ikon lembaran merah dengan huruf PDF menandakan file siap cetak.',
        dailyContext: 'Format laporan final yang diunggah ke tugas Google Classroom.',
        iconName: 'FileText',
        visualTag: 'Ekspor PDF',
        options: ['Ekspor Format PDF', 'File Lagu MP3', 'Aplikasi Virus', 'Gambar Buram'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'doc-1',
        title: 'Hak Akses: Viewer (Lihat Saja)',
        description: 'Penerima hanya dapat membaca dan menyalin teks, tidak bisa mengubah isi tugas.',
        iconType: 'Eye',
        correctCategory: 'Hak Akses Dokumen Daring',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      },
      {
        id: 'doc-2',
        title: 'Hak Akses: Commenter (Pemberi Saran)',
        description: 'Dapat membaca dan menyematkan catatan revisi tanpa mengubah teks asli secara langsung.',
        iconType: 'MessageSquareWarning',
        correctCategory: 'Hak Akses Dokumen Daring',
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
      },
      {
        id: 'doc-3',
        title: 'Hak Akses: Editor (Pengedit Penuh)',
        description: 'Dapat mengetik, memformat tabel, menghapus, dan menyisipkan gambar secara leluasa.',
        iconType: 'CheckCircle2',
        correctCategory: 'Hak Akses Dokumen Daring',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'doc-4',
        title: 'Riwayat Versi: Pulihkan Catatan Kemarin',
        description: 'Menyelamatkan tugas kelompok yang rusak akibat salah ketik tanpa panik.',
        iconType: 'RotateCcw',
        correctCategory: 'Fitur Pemulihan & Riwayat',
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
      }
    ],
    simulationCategories: ['Hak Akses Dokumen Daring', 'Fitur Pemulihan & Riwayat']
  },

  // ==========================================
  // KELAS 9 - RUANG PUBLIK VIRTUAL
  // ==========================================
  'k9-ruang-publik-virtual': {
    battleBot: [
      {
        id: 1,
        scenario: 'Siswa kelas 9 menemukan postingan hoaks yang memicu kepanikan di media sosial.',
        question: 'Tindakan apa yang mencerminkan mindfulness digital sebelum bereaksi terhadap postingan tersebut?',
        options: [
          { label: 'A', text: 'Memeriksa kebenaran informasi di portal berita resmi dan tidak ikut membagikannya' },
          { label: 'B', text: 'Langsung membagikan ke 10 grup WhatsApp keluarga' },
          { label: 'C', text: 'Mengetik komentar caci maki dengan huruf kapital semua' },
          { label: 'D', text: 'Membuat akun palsu baru untuk menyebarkan kabar tersebut' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Mindfulness digital melatih kita untuk berpikir kritis (Think Before You Post) dan memvalidasi kebenaran fakta.'
      },
      {
        id: 2,
        scenario: 'Di kolom komentar forum diskusi, ada teman yang berbeda pendapat mengenai hasil presentasi.',
        question: 'Prinsip toleransi digital yang paling tepat dipraktikkan adalah...',
        options: [
          { label: 'A', text: 'Menghargai perbedaan sudut pandang dengan bahasa yang santun dan terbuka untuk berdiskusi' },
          { label: 'B', text: 'Memaksa teman tersebut harus mengikuti pendapat kita' },
          { label: 'C', text: 'Melakukan perundungan siber (cyberbullying) bersama anggota kelompok lain' },
          { label: 'D', text: 'Menyebarkan identitas pribadi teman tersebut tanpa izin' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Toleransi digital adalah kesediaan menerima dan menghargai keragaman pendapat serta budaya di dunia maya.'
      },
      {
        id: 3,
        scenario: 'Kelompok 1 ingin menampilkan simulasi gedung sekolah 3D di mana pengguna seolah-olah masuk sepenuhnya ke dunia maya.',
        question: 'Teknologi imersif apakah yang digunakan untuk menciptakan pengalaman dunia maya penuh tersebut?',
        options: [
          { label: 'A', text: 'Virtual Reality (VR)' },
          { label: 'B', text: 'Pesan Singkat SMS' },
          { label: 'C', text: 'Radio FM Analog' },
          { label: 'D', text: 'Kabel Telepon Rumah' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Virtual Reality (VR) membawa pengguna sepenuhnya masuk ke dalam dunia maya 3D melalui headset khusus.'
      },
      {
        id: 4,
        scenario: 'Saat mengerjakan tugas kelompok di Google Workspace, ada anggota yang salah menghapus paragraf laporan.',
        question: 'Langkah cerdas apa yang harus dilakukan sesuai etika kolaborasi digital?',
        options: [
          { label: 'A', text: 'Menenangkan tim dan memulihkan teks melalui fitur Riwayat Versi (Version History)' },
          { label: 'B', text: 'Memarahi teman tersebut di grup WhatsApp kelas dengan huruf kapital' },
          { label: 'C', text: 'Menghapus seluruh file tugas kelompok' },
          { label: 'D', text: 'Mengundurkan diri dari kelompok' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Fitur Version History di platform kolaborasi daring menyimpan rekaman perubahan sehingga dokumen mudah dipulihkan.'
      },
      {
        id: 5,
        scenario: 'Siswa ingin mengirimkan pesan konfirmasi pengumpulan tugas kepada guru Informatika.',
        question: 'Etika penulisan pesan digital yang paling sopan dan berkarakter adalah...',
        options: [
          { label: 'A', text: 'Menyampaikan salam hormat, menyebutkan identitas nama & kelas, menjelaskan maksud dengan sopan, dan berterima kasih' },
          { label: 'B', text: 'Mengirim huruf "P" berkali-kali sampai dibalas' },
          { label: 'C', text: 'Mengirim pesan di jam tidur malam tanpa salam' },
          { label: 'D', text: 'Menggunakan singkatan gaul yang tidak dimengerti oleh guru' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Etika berkirim pesan kepada guru mencakup salam santun, perkenalan identitas, pesan ringkas jelas, dan ucapan terima kasih.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'METAVERSE',
        scrambled: 'E S R E V A T E M',
        clue: 'Dunia simulasi digital bersama tempat orang berinteraksi melalui avatar.',
        dailyContext: 'Masa depan ruang publik virtual tempat orang bekerja, belanja, dan bermain.'
      },
      {
        id: 2,
        word: 'TOLERANSI',
        scrambled: 'I S N A R E L O T',
        clue: 'Sikap menghargai perbedaan pendapat dan budaya di ruang digital.',
        dailyContext: 'Kunci menjaga persaudaraan saat berdiskusi di grup kelas SMPN 5 Kroya.'
      },
      {
        id: 3,
        word: 'KOLABORASI',
        scrambled: 'I S A R O B A L O K',
        clue: 'Bekerja sama menyelesaikan tugas secara daring melalui platform digital.',
        dailyContext: 'Menyusun laporan praktikum bersama teman di Google Docs.'
      },
      {
        id: 4,
        word: 'ANONIMITAS',
        scrambled: 'S A T I M I N O N A',
        clue: 'Karakteristik ruang maya saat pengguna memakai identitas atau nama samaran.',
        dailyContext: 'Sering disalahgunakan oknum untuk menyebarkan kebencian tanpa rasa tanggung jawab.'
      },
      {
        id: 5,
        word: 'EMPATI',
        scrambled: 'I T A P M E',
        clue: 'Kemampuan memahami dan merasakan perasaan orang lain di media digital.',
        dailyContext: 'Berpikir sebelum mengetik komentar agar tidak melukai hati teman sekelas.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Virtual Reality (VR)',
        clue: 'Kacamata headset 3D yang membawa pengguna masuk sepenuhnya ke lingkungan digital.',
        dailyContext: 'Perangkat teknologi imersif yang dipakai untuk simulasi laboratorium maya.',
        iconName: 'Tv',
        visualTag: 'Virtual Reality',
        options: ['Virtual Reality (VR)', 'Kabel LAN RJ45', 'Kabel USB-C', 'Printer Warna Inkjet'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Augmented Reality (AR)',
        clue: 'Kamera ponsel yang memproyeksikan objek 3D interaktif ke atas meja nyata.',
        dailyContext: 'Teknologi pada game Pokemon Go atau filter animasi media sosial.',
        iconName: 'SmartphoneNfc',
        visualTag: 'Augmented Reality',
        options: ['Augmented Reality (AR)', 'Monitor Tabung Kuno', 'Proyektor Kuno', 'Mesin Tik Manual'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Platform Kolaborasi Google Workspace',
        clue: 'Aplikasi pengolah dokumen teks yang diedit bersama secara simultan oleh banyak anggota tim.',
        dailyContext: 'Tempat siswa SMPN 5 Kroya mengetik naskah laporan tugas kelompok.',
        iconName: 'FileText',
        visualTag: 'Google Docs Kolaborasi',
        options: ['Google Docs', 'Speaker Pasif', 'Kipas Casing CPU', 'Baterai Jam Dinding'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Ruang Chat & Konferensi Video',
        clue: 'Aplikasi panggilan tatap muka digital untuk diskusi kelompok jarak jauh.',
        dailyContext: 'Digunakan saat koordinasi belajar kelompok dari rumah masing-masing.',
        iconName: 'Laptop',
        visualTag: 'Konferensi Daring',
        options: ['Laptop / Komputer', 'Televisi Hitam Putih', 'Walkie Talkie Tua', 'Kawat Tembaga'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Etika Mindfulness & Anti-Cyberbullying',
        clue: 'Perisai hijau perlindungan diri dan sikap santun menghormati privasi orang lain.',
        dailyContext: 'Karakter utama siswa melek teknologi di era digital.',
        iconName: 'ShieldCheck',
        visualTag: 'Mindfulness Digital',
        options: ['Fakta Terverifikasi', 'Kabar Hoaks Palsu', 'Serangan Phishing', 'Bahaya Malware / Virus'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'rpv-1',
        title: 'Etika: Bertanya kepada Guru dengan Salam & Format Santun',
        description: 'Menyapa dengan sopan, menyebutkan nama dan kelas, serta menyampaikan maksud dengan jelas.',
        iconType: 'CheckCircle2',
        correctCategory: 'Etika Terpuji',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'rpv-2',
        title: 'Pelanggaran: Mengunggah Nomor HP & Foto Pribadi Teman Tanpa Izin',
        description: 'Menyebarkan data privasi orang lain di media sosial publik dapat memicu kejahatan siber.',
        iconType: 'AlertTriangle',
        correctCategory: 'Pelanggaran Etika',
        color: 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
      },
      {
        id: 'rpv-3',
        title: 'Mindfulness: Think Before You Post & Saring Sebelum Sharing',
        description: 'Memikirkan dampak positif dan memverifikasi kebenaran informasi sebelum menekan tombol kirim.',
        iconType: 'ShieldCheck',
        correctCategory: 'Mindfulness Digital',
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
      },
      {
        id: 'rpv-4',
        title: 'Kolaborasi: Membagi Tugas Kelompok Secara Adil di Google Docs',
        description: 'Setiap anggota tim memiliki tanggung jawab materi dan saling memberikan saran konstruktif.',
        iconType: 'Users',
        correctCategory: 'Etika Terpuji',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      }
    ],
    simulationCategories: ['Etika Terpuji', 'Pelanggaran Etika', 'Mindfulness Digital']
  },

  // ==========================================
  // KELAS 8: REKAM JEJAK DIGITAL, TOLERANSI & EMPATI, DAN PERUNDUNGAN DI DUNIA DIGITAL
  // ==========================================
  'k8-rekam-jejak-digital': {
    battleBot: [
      {
        id: 1,
        scenario: 'Robot lawan menyerang dengan data palsu dari masa lalu yang sengaja disebarkan untuk merusak reputasi siswa.',
        question: 'Jejak data yang kita tinggalkan di internet dan sangat sulit dihapus permanen disebut...',
        options: [
          { label: 'A', text: 'Rekam Jejak Digital (Digital Footprint)' },
          { label: 'B', text: 'Cache Memori Sederhana' },
          { label: 'C', text: 'Kabel Motherboard' },
          { label: 'D', text: 'Wallpaper Desktop' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Rekam jejak digital mencatat setiap postingan, komentar, dan aktivitas internet seseorang secara permanen.'
      },
      {
        id: 2,
        scenario: 'Lawan mengirimkan pesan chat dengan SELURUH HURUF KAPITAL dan kata-kata kasar bernada mengancam.',
        question: 'Dalam kaidah etika netiket internasional, mengetik dengan huruf kapital penuh diartikan sebagai...',
        options: [
          { label: 'A', text: 'Berteriak dan memarahi lawan bicara dengan emosi kasar' },
          { label: 'B', text: 'Menunjukkan rasa kagum dan hormat' },
          { label: 'C', text: 'Menghemat bandwidth data internet' },
          { label: 'D', text: 'Mempercepat pengiriman pesan' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Huruf kapital penuh mencerminkan teriakan dan nada marah yang melanggar etika netiket santun.'
      },
      {
        id: 3,
        scenario: 'Lawan melancarkan trik siber dengan membuat akun palsu meniru nama dan foto profil ketua OSIS untuk menyebar fitnah.',
        question: 'Jenis perundungan digital di mana pelaku menyamar sebagai orang lain ini disebut...',
        options: [
          { label: 'A', text: 'Impersonation (Penyamaran Identitas)' },
          { label: 'B', text: 'Coding Python' },
          { label: 'C', text: 'Sorting Data' },
          { label: 'D', text: 'Sharing Wi-Fi' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Impersonation adalah kejahatan membuat akun palsu untuk merusak martabat dan nama baik korban.'
      },
      {
        id: 4,
        scenario: 'Tameng pertahanan robot aktif jika kamu dapat menyebutkan rumus saringan sebelum memposting sesuatu di internet.',
        question: 'Rumus saringan 5 kata emas sebelum menekan tombol kirim atau posting adalah...',
        options: [
          { label: 'A', text: 'T.H.I.N.K. (True, Helpful, Inspiring, Necessary, Kind)' },
          { label: 'B', text: 'S.T.O.P. (Sleep, Travel, Open, Play)' },
          { label: 'C', text: 'F.A.S.T. (Food, Air, Speed, Technology)' },
          { label: 'D', text: 'G.A.M.E. (Go, Action, Move, Enter)' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'T.H.I.N.K. melatih kita memastikan pesan itu Benar, Bermanfaat, Menginspirasi, Perlu, dan Santun.'
      },
      {
        id: 5,
        scenario: 'Sebuah akun anonim terus mengirim stiker ejekan fisik ke teman di grup obrolan.',
        question: 'Langkah penyelamat siber yang tepat untuk menghentikan perundungan tersebut adalah...',
        options: [
          { label: 'A', text: 'Amankan bukti tangkapan layar, blokir pelaku, dan laporkan ke guru BK' },
          { label: 'B', text: 'Ikut membalas dengan kata-kata kotor' },
          { label: 'C', text: 'Mematikan listrik seluruh sekolah' },
          { label: 'D', text: 'Menghapus buku catatan Informatika' }
        ],
        correctIndex: 0,
        damage: 25,
        explanation: 'Tindakan 4L: Laporkan, Lampirkan bukti screenshot, Lepaskan diri, dan Lindungi teman yang dirundung.'
      }
    ],
    wordScramble: [
      {
        id: 1,
        word: 'NETIKET',
        scrambled: 'T E K I T E N',
        clue: 'Etika kesantunan dan tata krama dalam menggunakan jaringan internet.',
        dailyContext: 'Membiasakan salam dan bahasa sopan saat mengirim pesan di WhatsApp kelas.'
      },
      {
        id: 2,
        word: 'FOOTPRINT',
        scrambled: 'T N I R P T O O F',
        clue: 'Jejak digital (digital ...) yang tertinggal setelah beraktivitas di dunia maya.',
        dailyContext: 'Bekas riwayat pencarian dan komentar yang tersimpan abadi di server.'
      },
      {
        id: 3,
        word: 'TOLERANSI',
        scrambled: 'I S N A R E L O T',
        clue: 'Sikap menghargai perbedaan pandangan dan keberagaman budaya di internet.',
        dailyContext: 'Tidak menghujat teman yang memiliki pilihan berbeda saat diskusi daring.'
      },
      {
        id: 4,
        word: 'EMPATI',
        scrambled: 'I T A P M E',
        clue: 'Kemampuan merasakan dampak emosional tulisan kita terhadap hati orang lain.',
        dailyContext: 'Membayangkan perasaan teman sebelum memposting lelucon tentang fisiknya.'
      },
      {
        id: 5,
        word: 'CYBERBULLYING',
        scrambled: 'G N I Y L L U B R E B Y C',
        clue: 'Perundungan atau intimidasi kejam berulang melalui media digital.',
        dailyContext: 'Mengirimkan stiker ejekan dan kata kasar berulang yang merusak mental teman.'
      }
    ],
    pictureGuess: [
      {
        id: 1,
        title: 'Rekam Jejak Digital Abadi',
        clue: 'Jejak data yang tertinggal bagaikan bekas langkah kaki yang membekas selamanya.',
        dailyContext: 'Setiap unggahan foto dan komentar yang tersimpan di internet.',
        iconName: 'Footprints',
        visualTag: 'Digital Footprint',
        options: ['Rekam Jejak Digital', 'Kabel LAN Putus', 'Keyboard Gaming', 'Printer Kertas'],
        correctIndex: 0
      },
      {
        id: 2,
        title: 'Tameng Anti-Cyberbullying',
        clue: 'Perlindungan diri dan kawan dari ancaman perundungan serta teror siber.',
        dailyContext: 'Menjadi pembela berani (upstander) saat melihat teman dirundung siber.',
        iconName: 'ShieldCheck',
        visualTag: 'Anti-Bullying Shield',
        options: ['Tameng Anti-Cyberbullying', 'Buku Resep Masak', 'Kamera Analog Kuno', 'Tiket Bioskop'],
        correctIndex: 0
      },
      {
        id: 3,
        title: 'Hati Empati Digital',
        clue: 'Sikap peduli dan memahami perasaan orang lain di balik layar perangkat maya.',
        dailyContext: 'Memberi kata-kata penyemangat bagi teman yang sedang bersedih di medsos.',
        iconName: 'HeartHandshake',
        visualTag: 'Empati & Toleransi',
        options: ['Empati & Toleransi Digital', 'Kabel Charger Rusak', 'Monitor Tabung', 'Kartu Merah Sepakbola'],
        correctIndex: 0
      },
      {
        id: 4,
        title: 'Saringan Emas T.H.I.N.K.',
        clue: 'Penyaring pesan sebelum dikirim: True, Helpful, Inspiring, Necessary, Kind.',
        dailyContext: 'Mengecek apakah tulisan kita bermanfaat dan santun sebelum memposting status.',
        iconName: 'Sparkles',
        visualTag: 'Prinsip T.H.I.N.K.',
        options: ['Saringan T.H.I.N.K.', 'Obeng Komputer', 'Solder Elektronika', 'Kipas Pendingin'],
        correctIndex: 0
      },
      {
        id: 5,
        title: 'Netiket Komunikasi Santun',
        clue: 'Tata krama berkirim pesan kepada bapak/ibu guru dan sesama teman.',
        dailyContext: 'Mengawali chat dengan salam, nama, kelas, dan bahasa hormat.',
        iconName: 'MessageSquareWarning',
        visualTag: 'Netiket Santun',
        options: ['Etika Netiket Santun', 'Spam Huruf Kapital', 'Stiker Ejekan', 'Hoaks Berantai'],
        correctIndex: 0
      }
    ],
    visualSimulationCards: [
      {
        id: 'rjd-1',
        title: 'Netiket: Menyapa Guru dengan Salam & Format Identitas Lengkap',
        description: 'Mengirimkan pesan pada jam kerja dengan bahasa hormat dan tujuan yang jelas.',
        iconType: 'CheckCircle2',
        correctCategory: 'Etika Terpuji',
        color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
      },
      {
        id: 'rjd-2',
        title: 'Cyberbullying: Mengedit Foto Teman Menjadi Bahan Olok-Olokan Grup',
        description: 'Menyebarkan meme ejekan wajah teman yang menyebabkan korban menangis malu.',
        iconType: 'AlertTriangle',
        correctCategory: 'Pelanggaran Etika',
        color: 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
      },
      {
        id: 'rjd-3',
        title: 'Mindfulness: Uji 5 Saringan T.H.I.N.K. Sebelum Menekan Tombol Unggah',
        description: 'Memastikan informasi itu benar, bermanfaat, menginspirasi, perlu, dan santun.',
        iconType: 'ShieldCheck',
        correctCategory: 'Mindfulness Digital',
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300'
      },
      {
        id: 'rjd-4',
        title: 'Upstander: Membela & Menguatkan Teman yang Menjadi Korban Rundung Siber',
        description: 'Mengamankan bukti tangkapan layar dan mendampingi korban melapor ke guru BK.',
        iconType: 'HeartHandshake',
        correctCategory: 'Etika Terpuji',
        color: 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300'
      }
    ],
    simulationCategories: ['Etika Terpuji', 'Pelanggaran Etika', 'Mindfulness Digital']
  }
};


