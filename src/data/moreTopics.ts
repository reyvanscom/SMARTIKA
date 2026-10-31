import { Topic } from '../types/curriculum';

export const ADDITIONAL_TOPICS: Topic[] = [
  // ------------------------------------------
  // KELAS 7 - BROWSER DAN SEARCH ENGINE
  // ------------------------------------------
  {
    id: 'k7-bse',
    grade: 7,
    title: 'Browser dan Search Engine',
    category: 'Teknologi Informasi dan Komunikasi (TIK)',
    shortDesc: 'Menavigasi web secara efektif, memahami URL, dan menguasai teknik pencarian informasi cerdas dengan kata kunci terarah.',
    learningObjectives: [
      'Membedakan peran Web Browser dan Search Engine (Mesin Pencari).',
      'Memahami struktur URL (Protokol, Domain, Path).',
      'Menggunakan kata kunci efektif dan operator boolean (AND, OR, tanda petik).',
      'Mengevaluasi hasil pencarian web berdasarkan relevansi dan otoritas situs.'
    ],
    apersepsi: {
      imagePromptDesc: 'Ilustrasi pencarian web interaktif dengan bilah URL dan kaca pembesar menelusuri miliaran dokumen digital.',
      videoTitle: 'Bagaimana Robot Google Mengindeks 50 Miliar Halaman Web?',
      videoDuration: '04:12',
      videoThumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
      videoDescription: 'Menjelajahi cara kerja web crawler yang menjelajahi hyperlink di seluruh dunia untuk membangun indeks pencarian raksasa.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=BNHR6IQJGZs',
      realLifeStory: 'Ahmad mencari informasi tentang "tata cara membuat pupuk kompos dari daun kering di Kroya". Ia mengetik "pupuk" saja di Google dan mendapatkan 20 juta hasil, kebanyakan adalah toko pupuk kimia di luar pulau. Sementara temannya, Sarah, mengetik "cara membuat pupuk kompos daun kering" dan langsung menemukan panduan praktis di halaman pertama dalam 5 detik. Mengapa pemilihan kata kunci membuat perbedaan sebesar itu?',
      triggerQuestions: [
        'Apa yang membedakan software browser (Chrome/Edge) dengan situs mesin pencari (Google/Bing)?',
        'Mengapa menambahkan tanda kutip ("...") pada kata pencarian bisa menyaring ribuan hasil yang tidak relevan?',
        'Bagaimana mesin pencari mengetahui halaman mana yang paling berbobot untuk ditaruh di urutan paling atas?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Perangkat lunak yang berfungsi untuk menjelajahi dan menampilkan halaman website di internet adalah...',
        options: [
          { label: 'A', text: 'Web Browser' },
          { label: 'B', text: 'Search Engine' },
          { label: 'C', text: 'Antivirus' },
          { label: 'D', text: 'Spreadsheet' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Web Browser',
        recommendation: 'Pelajari perbedaan Web Browser sebagai aplikasi pembuka web.'
      },
      {
        id: 2,
        question: 'Manakah di bawah ini yang merupakan contoh Search Engine (mesin pencari)?',
        options: [
          { label: 'A', text: 'Google, Bing, DuckDuckGo' },
          { label: 'B', text: 'Google Chrome, Firefox, Safari' },
          { label: 'C', text: 'Windows, Linux, macOS' },
          { label: 'D', text: 'Word, Excel, PowerPoint' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Search Engine',
        recommendation: 'Kenali contoh mesin pencari informasi di internet.'
      },
      {
        id: 3,
        question: 'Pada alamat web "https://smpn5kroya.sch.id", bagian "https" menunjukkan...',
        options: [
          { label: 'A', text: 'Protokol komunikasi aman' },
          { label: 'B', text: 'Nama pemilik laptop' },
          { label: 'C', text: 'Password rahasia' },
          { label: 'D', text: 'Nama file foto' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Struktur URL',
        recommendation: 'Pahami komponen URL: Protokol, Domain, dan Path.'
      },
      {
        id: 4,
        question: 'Untuk mencari frasa yang persis sama persis di mesin pencari tanpa variasi kata lain, kita menggunakan tanda...',
        options: [
          { label: 'A', text: 'Tanda petik ("...")' },
          { label: 'B', text: 'Tanda tanya (?)' },
          { label: 'C', text: 'Tanda kurung ()' },
          { label: 'D', text: 'Tanda koma (,)' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Operator Pencarian',
        recommendation: 'Gunakan tanda petik untuk pencarian frasa eksak.'
      },
      {
        id: 5,
        question: 'Program otomatis mesin pencari yang bertugas menjelajahi miliaran tautan link di internet siang dan malam disebut...',
        options: [
          { label: 'A', text: 'Web Crawler / Spider' },
          { label: 'B', text: 'Web Driver' },
          { label: 'C', text: 'Keylogger' },
          { label: 'D', text: 'Firewall' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Web Crawler',
        recommendation: 'Pahami cara kerja crawler mesin pencari.'
      }
    ],
    materi: {
      overview: 'Web Browser adalah gerbang pintu masuk menuju jagat internet, sementara Search Engine adalah pustakawan super cerdas yang mengindeks dan menuntun kita ke informasi yang tepat di antara miliaran situs web.',
      keyConcepts: [
        {
          title: '1. Perbedaan Browser dan Mesin Pencari',
          explanation: 'Browser adalah aplikasi yang terpasang di komputer/HP, sedangkan Search Engine adalah situs web layanan pencarian.',
          bulletPoints: [
            'Browser: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari.',
            'Search Engine: Google Search, Bing, DuckDuckGo, Yahoo Search.'
          ],
          iconName: 'Compass'
        },
        {
          title: '2. Anatomi URL (Uniform Resource Locator)',
          explanation: 'Alamat unik sebuah sumber daya di internet.',
          bulletPoints: [
            'Protokol: https:// (Hypertext Transfer Protocol Secure).',
            'Subdomain & Domain: smpn5kroya.sch.id (Nama identitas situs).',
            'Path/Jalur: /berita/prestasi (Lokasi dokumen spesifik).'
          ],
          iconName: 'Link'
        },
        {
          title: '3. Trik Pencarian Cerdas (Search Operators)',
          explanation: 'Operator khusus untuk mempersempit hasil pencarian.',
          bulletPoints: [
            '"frasa tepat": Mencari urutan kata yang persis sama.',
            'site:sch.id kata kunci: Membatasi pencarian hanya pada domain sekolah.',
            'filetype:pdf kata kunci: Mencari dokumen berformat PDF saja.'
          ],
          iconName: 'Search'
        }
      ],
      comparisonTable: {
        title: 'Komparasi Web Browser vs Mesin Pencari',
        headers: ['Aspek', 'Web Browser', 'Search Engine (Mesin Pencari)'],
        rows: [
          ['Definisi', 'Aplikasi peramban web di perangkat', 'Layanan penelusuran web berbasis server'],
          ['Tugas Utama', 'Menerjemahkan kode HTML/CSS/JS menjadi tampilan visual', 'Mengindeks, merangking, dan menyajikan tautan relevan'],
          ['Instalasi', 'Perlu diinstall atau bawaan OS', 'Dapat diakses melalui browser tanpa instalasi'],
          ['Contoh', 'Chrome, Edge, Firefox, Safari', 'Google.com, Bing.com, DuckDuckGo.com']
        ]
      },
      dailyLifeExamples: [
        'Mencari resep makanan khas Kroya di Google dengan kata kunci "resep mendoan khas Banyumas filetype:pdf".',
        'Menyimpan halaman web penting ke menu Bookmark di browser agar mudah dibuka kembali.'
      ],
      schoolExamples: [
        'Siswa kelas 7 mencari artikel jurnal tentang ekosistem mangrove di Google Cendekia (Google Scholar).'
      ],
      tahukahKamu: 'Google memproses lebih dari 8,5 miliar pencarian setiap harinya, atau sekitar 99.000 pencarian setiap detiknya di seluruh dunia!',
      faktaMenarik: 'Mesin pencari DuckDuckGo terkenal karena mengutamakan privasi pengguna dengan tidak pernah menyimpan riwayat pencarian atau melacak lokasi pengguna.',
      infoPenting: 'Gunakan mode Incognito (Penyamaran) pada browser jika kamu mengakses internet di komputer umum agar riwayat penelusuran dan kata sandi tidak tersimpan otomatis.',
      commonMistakes: [
        'Mengetik kata sandi di kotak pencarian Google alih-alih di form login yang semestinya.',
        'Menganggap hasil pencarian di urutan paling atas selalu merupakan informasi paling benar (bisa jadi merupakan iklan berbayar/Ads).'
      ],
      summary: [
        'Browser menampilkan halaman web; Search Engine mengindeks informasi.',
        'URL terdiri dari protokol, domain, dan direktori path.',
        'Operator pencarian menghemat waktu dan menghasilkan referensi akurat.'
      ],
      formativeCheck: [
        {
          question: 'Operator apa yang digunakan jika kamu hanya ingin mencari file presentasi PowerPoint tentang Berpikir Komputasional?',
          options: ['filetype:pptx "berpikir komputasional"', 'download:all "komputasi"', 'save:powerpoint', 'google:ppt'],
          answerIndex: 0,
          explanation: 'Benar! Operator filetype:pptx secara khusus menyaring hasil pencarian ke format file presentasi PowerPoint.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Interaktif: Anatomi URL & Komponen Web',
      scenario: 'Pilah elemen-elemen dari tautan "https://smpn5kroya.sch.id/materi/informatika" ke dalam komponen URL yang tepat!',
      instructions: 'Cocokkan bagian URL dengan fungsinya.',
      data: {
        items: [
          { id: 'url-1', text: 'https://', correctCategory: 'Protokol Aman' },
          { id: 'url-2', text: 'smpn5kroya.sch.id', correctCategory: 'Nama Domain' },
          { id: 'url-3', text: '/materi/informatika', correctCategory: 'Direktori Path Dokumen' }
        ],
        categories: ['Protokol Aman', 'Nama Domain', 'Direktori Path Dokumen']
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Tebak Ikon & Operator Web',
      description: 'Cocokkan fungsi operator pencarian dengan kegunaannya!',
      questions: [
        {
          id: 1,
          question: 'Operator pencarian "site:gov" berfungsi untuk...',
          options: ['Membatasi pencarian hanya di situs pemerintah', 'Mencari video musik', 'Membuka YouTube', 'Menghapus riwayat'],
          correctIndex: 0,
          clue: 'Membatasi ke domain situs tertentu.'
        },
        {
          id: 2,
          question: 'Fitur browser untuk menyimpan tautan favorit agar mudah diakses nanti dinamakan...',
          options: ['Bookmark / Favorit', 'Downloads', 'History', 'Incognito'],
          correctIndex: 0,
          clue: 'Tanda bintang di pojok kanan bilah alamat.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Manakah pasangan yang benar antara Web Browser dan pembuatnya?',
        options: [
          { label: 'A', text: 'Chrome dibuat oleh Google' },
          { label: 'B', text: 'Safari dibuat oleh Microsoft' },
          { label: 'C', text: 'Edge dibuat oleh Apple' },
          { label: 'D', text: 'Firefox dibuat oleh Facebook' }
        ],
        correctAnswer: 'A',
        explanation: 'Chrome dikembangkan oleh Google, Edge oleh Microsoft, Safari oleh Apple, Firefox oleh Mozilla.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Bagian dari jendela browser yang menampilkan alamat situs web yang sedang dibuka disebut...',
        options: [
          { label: 'A', text: 'Address Bar (Bilah Alamat)' },
          { label: 'B', text: 'Status Bar' },
          { label: 'C', text: 'Taskbar' },
          { label: 'D', text: 'Scrollbar' }
        ],
        correctAnswer: 'A',
        explanation: 'Address Bar adalah tempat mengetikkan atau melihat alamat URL.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Jika kamu mencari artikel di Google dengan mengetik: "revolusi industri" -inggris, tanda minus (-) berfungsi untuk...',
        options: [
          { label: 'A', text: 'Mengecualikan hasil yang memuat kata "inggris"' },
          { label: 'B', text: 'Mencari halaman berbahasa Inggris' },
          { label: 'C', text: 'Mengurangi ukuran font' },
          { label: 'D', text: 'Membuat halaman menjadi offline' }
        ],
        correctAnswer: 'A',
        explanation: 'Tanda minus (-) di depan kata mengecualikan halaman yang memuat kata tersebut dari hasil pencarian.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 4,
        question: 'Apa fungsi dari "Cache" pada web browser?',
        options: [
          { label: 'A', text: 'Menyimpan salinan sementara elemen website (seperti gambar) agar saat dibuka kembali loading lebih cepat' },
          { label: 'B', text: 'Menghapus virus di laptop' },
          { label: 'C', text: 'Mengunci browser agar tidak bisa dipakai' },
          { label: 'D', text: 'Mengirim email otomatis' }
        ],
        correctAnswer: 'A',
        explanation: 'Cache menyimpan data statis lokal untuk mempercepat pemuatan halaman web di kunjungan berikutnya.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 5,
        question: 'Kombinasi tombol pintasan (shortcut) keyboard yang paling umum untuk membuka tab baru di web browser adalah...',
        options: [
          { label: 'A', text: 'Ctrl + T' },
          { label: 'B', text: 'Ctrl + P' },
          { label: 'C', text: 'Ctrl + S' },
          { label: 'D', text: 'Alt + F4' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + T (New Tab) membuka tab peramban baru.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 6,
        question: 'Apa risiko membuka website yang memiliki peringatan "Not Secure" (HTTP biasa tanpa gembok HTTPS) saat memasukkan data password?',
        options: [
          { label: 'A', text: 'Data password dikirim dalam bentuk teks polos yang rentan disadap pihak lain di jaringan' },
          { label: 'B', text: 'Komputer pasti meledak' },
          { label: 'C', text: 'Keyboard tidak bisa mengetik angka' },
          { label: 'D', text: 'Layar monitor menjadi hitam putih' }
        ],
        correctAnswer: 'A',
        explanation: 'Koneksi HTTP tidak dienkripsi sehingga rentan penyadapan transmisi data.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 7,
        question: 'Fitur "History" pada browser mencatat...',
        options: [
          { label: 'A', text: 'Daftar riwayat semua situs web yang pernah dikunjungi sebelumnya di perangkat tersebut' },
          { label: 'B', text: 'Daftar semua nilai ulangan siswa' },
          { label: 'C', text: 'Daftar aplikasi di Android' },
          { label: 'D', text: 'Nomor telepon teman' }
        ],
        correctAnswer: 'A',
        explanation: 'History adalah riwayat jejak penelusuran situs web.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 8,
        question: 'Di hasil pencarian Google, entri yang memiliki label kecil "Sponsored" atau "Iklan" menandakan bahwa...',
        options: [
          { label: 'A', text: 'Pemilik situs membayar kepada Google agar situsnya berada di urutan teratas untuk kata kunci tersebut' },
          { label: 'B', text: 'Situs tersebut dijamin 100% oleh kementerian pendidikan' },
          { label: 'C', text: 'Situs tersebut tidak boleh diklik' },
          { label: 'D', text: 'Situs tersebut adalah situs buatan Google sendiri' }
        ],
        correctAnswer: 'A',
        explanation: 'Label Bersponsor menandakan tautan iklan berbayar Google Ads.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 9,
        question: 'Mengapa menggunakan kata kunci yang spesifik seperti "resep bakso sapi kenyal banyumas" lebih baik dibanding hanya mengetik "bakso"?',
        options: [
          { label: 'A', text: 'Menyaring jutaan data tidak relevan dan langsung mengarahkan ke hasil yang sesuai kebutuhan' },
          { label: 'B', text: 'Membuat kuota internet lebih banyak' },
          { label: 'C', text: 'Menghindari biaya tagihan Google' },
          { label: 'D', text: 'Supaya browser tidak cepat panas' }
        ],
        correctAnswer: 'A',
        explanation: 'Spesifisitas query mempersempit ruang pencarian ke dokumen yang paling relevan.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Tombol panah melingkar (Reload / Refresh) pada browser berfungsi untuk...',
        options: [
          { label: 'A', text: 'Memuat ulang halaman web dari server untuk mendapatkan data terbaru' },
          { label: 'B', text: 'Menutup aplikasi' },
          { label: 'C', text: 'Memutar layar komputer 360 derajat' },
          { label: 'D', text: 'Menghapus seluruh file di hard disk' }
        ],
        correctAnswer: 'A',
        explanation: 'Reload/Refresh mengambil kembali konten terbaru dari server web.',
        competencyLevel: 'Pemahaman (LOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Mesin pencari mengumpulkan halaman web di seluruh dunia menggunakan program yang disebut...',
        options: [
          { label: 'A', text: 'Crawler / Spider' },
          { label: 'B', text: 'Firewall' },
          { label: 'C', text: 'Driver' },
          { label: 'D', text: 'Processor' }
        ],
        correctAnswer: 'A',
        explanation: 'Web Crawler mengumpulkan dan mengindeks dokumen web.',
        points: 10
      },
      {
        id: 2,
        question: 'Domain tingkat atas yang diperuntukkan bagi lembaga organisasi nirlaba adalah...',
        options: [
          { label: 'A', text: '.org' },
          { label: 'B', text: '.com' },
          { label: 'C', text: '.net' },
          { label: 'D', text: '.biz' }
        ],
        correctAnswer: 'A',
        explanation: '.org ditujukan untuk organisasi non-profit.',
        points: 10
      },
      {
        id: 3,
        question: 'Ekstensi browser (Browser Extension / Add-on) berfungsi untuk...',
        options: [
          { label: 'A', text: 'Menambahkan fitur khusus pada browser (seperti penerjemah bahasa atau pemblokir iklan)' },
          { label: 'B', text: 'Memperpanjang kabel stopkontak' },
          { label: 'C', text: 'Memperbesar fisik laptop' },
          { label: 'D', text: 'Mengganti speaker' }
        ],
        correctAnswer: 'A',
        explanation: 'Extension menambah kemampuan fungsi tambahan pada peramban web.',
        points: 10
      },
      {
        id: 4,
        question: 'Sintaks pencarian: "pencemaran air" site:kemkes.go.id akan menghasilkan...',
        options: [
          { label: 'A', text: 'Dokumen tentang pencemaran air khusus dari situs resmi Kementerian Kesehatan RI' },
          { label: 'B', text: 'Dokumen dari seluruh website di dunia' },
          { label: 'C', text: 'Pencarian foto makanan' },
          { label: 'D', text: 'Pesan error' }
        ],
        correctAnswer: 'A',
        explanation: 'Operator site: membatasi pencarian hanya pada domain spesifik tersebut.',
        points: 10
      },
      {
        id: 5,
        question: 'Tanda "S" pada protokol HTTPS adalah singkatan dari...',
        options: [
          { label: 'A', text: 'Secure' },
          { label: 'B', text: 'System' },
          { label: 'C', text: 'Simple' },
          { label: 'D', text: 'Standard' }
        ],
        correctAnswer: 'A',
        explanation: 'HTTPS = Hypertext Transfer Protocol Secure.',
        points: 10
      },
      {
        id: 6,
        question: 'Pintasan keyboard untuk membuka riwayat penelusuran (History) pada Google Chrome adalah...',
        options: [
          { label: 'A', text: 'Ctrl + H' },
          { label: 'B', text: 'Ctrl + J' },
          { label: 'C', text: 'Ctrl + F' },
          { label: 'D', text: 'Ctrl + Shift + Esc' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + H membuka halaman History penelusuran.',
        points: 10
      },
      {
        id: 7,
        question: 'Pintasan keyboard untuk membuka daftar unduhan (Downloads) pada Chrome adalah...',
        options: [
          { label: 'A', text: 'Ctrl + J' },
          { label: 'B', text: 'Ctrl + H' },
          { label: 'C', text: 'Ctrl + N' },
          { label: 'D', text: 'Ctrl + W' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + J membuka tab Downloads.',
        points: 10
      },
      {
        id: 8,
        question: 'Mengapa hasil pencarian Google bagi dua orang yang berbeda pada kata kunci yang sama bisa sedikit berbeda?',
        options: [
          { label: 'A', text: 'Karena Google mempersonalisasi hasil berdasarkan lokasi geografis dan riwayat aktivitas akun pengguna' },
          { label: 'B', text: 'Karena warna laptop berbeda' },
          { label: 'C', text: 'Karena komputer yang satu rusak' },
          { label: 'D', text: 'Hanya kesalahan teknis acak' }
        ],
        correctAnswer: 'A',
        explanation: 'Personalisasi mesin pencari memanfaatkan lokasi dan preferensi relevansi pengguna.',
        points: 10
      },
      {
        id: 9,
        question: 'Jika ingin mencari kata atau kalimat tertentu di dalam satu halaman web yang sedang aktif terbuka, tombol pintasan yang digunakan adalah...',
        options: [
          { label: 'A', text: 'Ctrl + F (Find)' },
          { label: 'B', text: 'Ctrl + Z' },
          { label: 'C', text: 'Ctrl + X' },
          { label: 'D', text: 'Ctrl + C' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + F membuka kotak pencarian teks (Find on page).',
        points: 10
      },
      {
        id: 10,
        question: 'Pernyataan mana yang benar mengenai etika mengutip materi dari hasil pencarian web untuk tugas sekolah?',
        options: [
          { label: 'A', text: 'Selalu mencantumkan sumber nama penulis, judul artikel, URL web, dan tanggal akses dalam daftar pustaka' },
          { label: 'B', text: 'Menyalin seluruh teks secara mentah dan mengakuinya sebagai karya pribadi' },
          { label: 'C', text: 'Mengubah nama penulis menjadi nama sendiri' },
          { label: 'D', text: 'Tidak perlu izin dan tidak perlu sumber' }
        ],
        correctAnswer: 'A',
        explanation: 'Menyertakan sitasi sumber adalah kepatuhan etika akademik dan penghargaan hak cipta.',
        points: 10
      }
    ]
  },

  // ------------------------------------------
  // KELAS 7 - APLIKASI PENGOLAH LEMBAR KERJA - GOOGLE SHEETS
  // ------------------------------------------
  {
    id: 'k7-gsheet',
    grade: 7,
    title: 'Aplikasi Lembar Kerja – Google Sheets',
    category: 'Analisis Data & Spreadsheet',
    shortDesc: 'Mengolah data numerik secara kolaboratif: baris, kolom, sel, dan rumus statistik dasar SUM, AVERAGE, MIN, MAX, COUNT, dan IF.',
    learningObjectives: [
      'Memahami struktur dasar spreadsheet: Baris (Row), Kolom (Column), dan Sel (Cell).',
      'Menggunakan fungsi statistik dasar: =SUM(), =AVERAGE(), =MAX(), =MIN(), =COUNT().',
      'Membuat rumus logika sederhana =IF() untuk kelulusan kriteria.',
      'Menyajikan data dalam bentuk grafik batang dan diagram lingkaran interaktif.'
    ],
    apersepsi: {
      imagePromptDesc: 'Tampilan antarmuka spreadsheet modern dengan sel-sel tabel angka berwarna dan formula bar aktif.',
      videoTitle: 'Bagaimana Toko Ritel Mengelola 10.000 Transaksi Harian dalam Hitungan Detik?',
      videoDuration: '04:00',
      videoThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      videoDescription: 'Melihat bagaimana formula spreadsheet otomatis menghitung keuntungan, persediaan barang, dan menyusun laporan visual.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=FIkZ1sPmKNw',
      realLifeStory: 'Wali kelas 7 di SMPN 5 Kroya harus menghitung nilai akhir dari 32 siswa untuk 10 mata pelajaran beserta ranking dan rata-rata kelas. Jika dihitung manual dengan kalkulator tangan, dibutuhkan waktu 4 jam dan sangat rawan salah ketik. Dengan Google Sheets, seluruh perhitungan selesai hanya dalam waktu 30 detik melalui satu formula yang disalin ke bawah. Bagaimana keajaiban rumus spreadsheet bekerja?',
      triggerQuestions: [
        'Mengapa penulisan rumus dalam spreadsheet selalu wajib diawali dengan tanda sama dengan (=)?',
        'Apa bedanya menulis =SUM(A1:A5) dengan mengetik =A1+A2+A3+A4+A5?',
        'Bagaimana rumus =IF() bisa secara otomatis menentukan siswa Lulus atau Remidi?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Pertemuan antara kolom C dan baris ke-5 pada lembar kerja spreadsheet membentuk alamat sel...',
        options: [
          { label: 'A', text: 'C5' },
          { label: 'B', text: '5C' },
          { label: 'C', text: 'C:5' },
          { label: 'D', text: 'Row-Column' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Alamat Sel',
        recommendation: 'Alamat sel diawali huruf kolom lalu nomor baris (misal C5).'
      },
      {
        id: 2,
        question: 'Setiap penulisan rumus (formula) atau fungsi di Google Sheets harus selalu diawali dengan simbol...',
        options: [
          { label: 'A', text: 'Sama dengan (=)' },
          { label: 'B', text: 'Tanda pagar (#)' },
          { label: 'C', text: 'Tanda seru (!)' },
          { label: 'D', text: 'Tanda tambah (+)' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Aturan Rumus',
        recommendation: 'Semua rumus spreadsheet wajib dimulai dengan tanda sama dengan (=).'
      },
      {
        id: 3,
        question: 'Fungsi yang digunakan untuk mencari nilai rata-rata dari sekumpulan data angka adalah...',
        options: [
          { label: 'A', text: '=AVERAGE()' },
          { label: 'B', text: '=SUM()' },
          { label: 'C', text: '=MAX()' },
          { label: 'D', text: '=COUNT()' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Fungsi Statistik',
        recommendation: 'Gunakan fungsi =AVERAGE() untuk menghitung rata-rata.'
      },
      {
        id: 4,
        question: 'Fungsi yang digunakan untuk menjumlahkan seluruh angka dalam rentang sel adalah...',
        options: [
          { label: 'A', text: '=SUM()' },
          { label: 'B', text: '=MIN()' },
          { label: 'C', text: '=COUNT()' },
          { label: 'D', text: '=IF()' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Fungsi SUM',
        recommendation: '=SUM() untuk penjumlahan total angka.'
      },
      {
        id: 5,
        question: 'Rentang sel (range) dari sel B2 sampai sel B10 dituliskan dengan notasi...',
        options: [
          { label: 'A', text: 'B2:B10' },
          { label: 'B', text: 'B2-B10' },
          { label: 'C', text: 'B2 to B10' },
          { label: 'D', text: 'B2/B10' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Range Sel',
        recommendation: 'Range sel dipisahkan dengan tanda titik dua (:).'
      }
    ],
    materi: {
      overview: 'Google Sheets adalah aplikasi pengolah lembar kerja (spreadsheet) berbasis komputasi awan (cloud) yang memungkinkan beberapa pengguna bekerja sama secara real-time untuk mengatur, menghitung, dan memvisualisasikan data.',
      keyConcepts: [
        {
          title: '1. Anatomi Spreadsheet: Kolom, Baris, Sel, dan Rentang',
          explanation: 'Struktur dasar matriks tabel spreadsheet.',
          bulletPoints: [
            'Kolom (Column): Bagian vertikal ditandai huruf (A, B, C...).',
            'Baris (Row): Bagian horizontal ditandai angka (1, 2, 3...).',
            'Sel (Cell): Titik temu kolom dan baris (misal: B4).',
            'Range (Rentang): Kumpulan beberapa sel (misal: A1:D10).'
          ],
          iconName: 'Grid'
        },
        {
          title: '2. Rumus Statistik Dasar Populer',
          explanation: 'Fungsi matematika yang paling sering digunakan.',
          bulletPoints: [
            '=SUM(rentang): Menghitung jumlah total nilai.',
            '=AVERAGE(rentang): Menghitung nilai rata-rata.',
            '=MAX(rentang): Mencari nilai tertinggi.',
            '=MIN(rentang): Mencari nilai terendah.',
            '=COUNT(rentang): Menghitung banyaknya sel yang berisi angka.'
          ],
          iconName: 'Calculator'
        },
        {
          title: '3. Fungsi Logika Bersyarat =IF()',
          explanation: 'Mengembalikan nilai berbeda berdasarkan evaluasi kondisi logika.',
          bulletPoints: [
            'Sintaks: =IF(kondisi_logika; nilai_jika_benar; nilai_jika_salah)',
            'Contoh: =IF(C2>=75; "TUNTAS"; "REMIDI")'
          ],
          iconName: 'GitBranch'
        }
      ],
      comparisonTable: {
        title: 'Ringkasan Formula Utama Google Sheets',
        headers: ['Formula', 'Fungsi Utama', 'Contoh Penulisan', 'Hasil Contoh'],
        rows: [
          ['=SUM()', 'Menjumlahkan angka', '=SUM(C2:C6)', 'Menjumlahkan total nilai 5 siswa'],
          ['=AVERAGE()', 'Rata-rata hitung', '=AVERAGE(C2:C6)', 'Mendapatkan nilai rerata kelas'],
          ['=MAX()', 'Nilai maksimum', '=MAX(C2:C6)', 'Mencari nilai tertinggi ulangan'],
          ['=MIN()', 'Nilai minimum', '=MIN(C2:C6)', 'Mencari nilai terendah ulangan'],
          ['=IF()', 'Keputusan logika', '=IF(C2>=75; "LULUS"; "REMIDI")', 'Menentukan status tuntas otomatis']
        ]
      },
      dailyLifeExamples: [
        'Mencatat pembukuan uang saku harian dan menabung di Google Sheets.',
        'Mengelola daftar belanja bazar kelas bersama anggota kelompok secara kolaboratif online.'
      ],
      schoolExamples: [
        'Membuat tabel daftar nilai ulangan Informatika kelas 7 dan menghasilkan grafik distribusi perolehan nilai.'
      ],
      tahukahKamu: 'Keunggulan utama Google Sheets dibanding program spreadsheet lama adalah fitur kolaborasi langsung: 50 orang dapat mengedit satu file yang sama di waktu yang sama tanpa takut file bentrok!',
      faktaMenarik: 'Google Sheets memiliki riwayat versi (Version History). Jika salah satu temanmu tidak sengaja menghapus tabel, kamu bisa mengembalikan data ke versi 10 menit yang lalu dengan satu kali klik!',
      infoPenting: 'Perhatikan tanda pemisah argumen formula: sebagian komputer menggunakan koma (,) dan sebagian menggunakan titik koma (;) tergantung pengaturan bahasa wilayah (Locale).',
      commonMistakes: [
        'Lupa menuliskan tanda sama dengan (=) di awal, sehingga spreadsheet menganggap rumus hanya sebagai teks biasa.',
        'Salah memilih rentang sel sehingga sel total ikut terhitung ke dalam rumus rata-rata.'
      ],
      summary: [
        'Sel adalah pertemuan kolom dan baris.',
        'Fungsi dasar: SUM, AVERAGE, MAX, MIN, COUNT, dan IF.',
        'Simbol titik dua (:) menunjukkan rentang berkelanjutan.'
      ],
      formativeCheck: [
        {
          question: 'Jika sel A1 = 80, A2 = 90, dan A3 = 70, maka hasil dari =AVERAGE(A1:A3) adalah...',
          options: ['80', '240', '90', '70'],
          answerIndex: 0,
          explanation: 'Benar! (80 + 90 + 70) / 3 = 240 / 3 = 80.'
        }
      ]
    },
    simulasi: {
      type: 'formula-tester',
      title: 'Lab Interaktif: Simulator Rumus Spreadsheet Nilai Siswa',
      scenario: 'Berikut adalah tabel nilai 3 siswa: Budi (85), Siti (90), Dimas (75). Uji rumus spreadsheet untuk mencari Total dan Rata-rata!',
      instructions: 'Pilih formula yang tepat untuk melihat hasil kalkulasi instan di lembar kerja.',
      data: {
        table: [
          { nama: 'Budi', nilai: 85 },
          { nama: 'Siti', nilai: 90 },
          { nama: 'Dimas', nilai: 75 }
        ],
        formulas: [
          { label: 'Total Nilai: =SUM(B2:B4)', result: '250' },
          { label: 'Rata-rata: =AVERAGE(B2:B4)', result: '83.33' },
          { label: 'Nilai Tertinggi: =MAX(B2:B4)', result: '90' },
          { label: 'Nilai Terendah: =MIN(B2:B4)', result: '75' }
        ]
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Tebak Rumus Kilat Spreadsheet',
      description: 'Cocokkan kebutuhan perhitungan dengan formula Google Sheets yang tepat!',
      questions: [
        {
          id: 1,
          question: 'Kebutuhan: Mencari nilai ulangan paling tinggi dari sel D2 sampai D30. Rumus yang tepat adalah...',
          options: ['=MAX(D2:D30)', '=SUM(D2:D30)', '=HIGHEST(D2:D30)', '=TOP(D2:D30)'],
          correctIndex: 0,
          clue: 'MAX adalah singkatan dari Maximum.'
        },
        {
          id: 2,
          question: 'Kebutuhan: Menghitung berapa banyak siswa yang mengumpulkan tugas (menghitung jumlah sel berisi angka). Rumus yang tepat adalah...',
          options: ['=COUNT(C2:C35)', '=SUM(C2:C35)', '=TOTAL(C2:C35)', '=NUMBER(C2:C35)'],
          correctIndex: 0,
          clue: 'COUNT menghitung kuantitas data numerik.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Pada Google Sheets, penulisan rumus =SUM(A1:A4) setara dengan penulisan...',
        options: [
          { label: 'A', text: '=A1 + A2 + A3 + A4' },
          { label: 'B', text: '=A1 * A4' },
          { label: 'C', text: '=A1 - A4' },
          { label: 'D', text: '=A1 / A4' }
        ],
        correctAnswer: 'A',
        explanation: 'Fungsi SUM menjumlahkan seluruh sel dalam rentang A1 hingga A4.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Jika kamu ingin mengetahui nilai ujian terendah dari seluruh siswa kelas 7A, fungsi yang digunakan adalah...',
        options: [
          { label: 'A', text: '=MIN()' },
          { label: 'B', text: '=MAX()' },
          { label: 'C', text: '=SUM()' },
          { label: 'D', text: '=LOWEST()' }
        ],
        correctAnswer: 'A',
        explanation: '=MIN() mengembalikan nilai minimum terkecil dari suatu rentang.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Perhatikan formula: =IF(B2>=80; "TUNTAS"; "REMIDI"). Jika nilai sel B2 adalah 78, maka output yang muncul adalah...',
        options: [
          { label: 'A', text: 'REMIDI' },
          { label: 'B', text: 'TUNTAS' },
          { label: 'C', text: '80' },
          { label: 'D', text: 'Error' }
        ],
        correctAnswer: 'A',
        explanation: 'Karena 78 tidak lebih besar atau sama dengan 80 (False), maka yang ditampilkan adalah nilai jika salah ("REMIDI").',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 4,
        question: 'Fitur "Fill Handle" (menarik kotak kecil di sudut kanan bawah sel aktif ke bawah) berfungsi untuk...',
        options: [
          { label: 'A', text: 'Menyalin rumus atau pola data secara otomatis ke sel di bawahnya' },
          { label: 'B', text: 'Menghapus isi seluruh tabel' },
          { label: 'C', text: 'Mengubah format font menjadi miring' },
          { label: 'D', text: 'Menutup jendela browser' }
        ],
        correctAnswer: 'A',
        explanation: 'Fill handle menduplikasi formula atau urutan data secara cerdas.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Kelebihan utama Google Sheets berbasis cloud dibandingkan software spreadsheet desktop tanpa koneksi internet adalah...',
        options: [
          { label: 'A', text: 'Dapat diedit bersama oleh beberapa orang secara real-time dan tersimpan otomatis ke Google Drive' },
          { label: 'B', text: 'Tidak membutuhkan daya baterai' },
          { label: 'C', text: 'Hanya bisa dibuka di hari Minggu' },
          { label: 'D', text: 'Tidak ada baris dan kolom' }
        ],
        correctAnswer: 'A',
        explanation: 'Cloud spreadsheet memungkinkan kolaborasi live dan autosave otomatis.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Tipe grafik visual yang paling cocok digunakan untuk melihat perbandingan nilai rata-rata antar 5 kelas paralel di SMPN 5 Kroya adalah...',
        options: [
          { label: 'A', text: 'Grafik Kolom / Batang (Column / Bar Chart)' },
          { label: 'B', text: 'Diagram pencar titik acak' },
          { label: 'C', text: 'Peta dunia' },
          { label: 'D', text: 'Tabel tanpa garis' }
        ],
        correctAnswer: 'A',
        explanation: 'Grafik batang sangat ideal untuk membandingkan kategori diskrit antar kelas.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 7,
        question: 'Jika sebuah sel menampilkan pesan error "#DIV/0!", penyebabnya adalah...',
        options: [
          { label: 'A', text: 'Terjadi pembagian dengan angka nol atau membagi sel kosong' },
          { label: 'B', text: 'Nama fungsi salah ketik' },
          { label: 'C', text: 'Kolom kurang lebar' },
          { label: 'D', text: 'Komputer kehilangan sinyal internet' }
        ],
        correctAnswer: 'A',
        explanation: '#DIV/0! muncul saat terjadi pembagian dengan angka 0 yang secara matematika tidak terdefinisi.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Jika kolom kurang lebar untuk menampilkan angka panjang sehingga muncul simbol "###", cara mengatasinya adalah...',
        options: [
          { label: 'A', text: 'Menggeser batas kanan kolom agar lebih lebar atau klik ganda pada garis pembatas kolom' },
          { label: 'B', text: 'Menghapus angka tersebut' },
          { label: 'C', text: 'Mematikan laptop' },
          { label: 'D', text: 'Mengganti warna teks menjadi putih' }
        ],
        correctAnswer: 'A',
        explanation: 'Simbol pagar berulang menandakan lebar kolom tidak mencukupi untuk menampilkan format angka.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 9,
        question: 'Operasi perkalian dalam rumus spreadsheet dilambangkan dengan simbol...',
        options: [
          { label: 'A', text: 'Bintang (*)' },
          { label: 'B', text: 'Huruf x' },
          { label: 'C', text: 'Titik dua (:)' },
          { label: 'D', text: 'Tanda panah (^)' }
        ],
        correctAnswer: 'A',
        explanation: 'Perkalian menggunakan operator tanda bintang (*).',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 10,
        question: 'Operasi pembagian dalam rumus spreadsheet dilambangkan dengan simbol...',
        options: [
          { label: 'A', text: 'Garis miring (/)' },
          { label: 'B', text: 'Titik dua (:)' },
          { label: 'C', text: 'Tanda persen (%)' },
          { label: 'D', text: 'Tanda minus (-)' }
        ],
        correctAnswer: 'A',
        explanation: 'Pembagian menggunakan operator garis miring (slash /).',
        competencyLevel: 'Pemahaman (LOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Pertemuan baris ke-3 dengan kolom D diidentifikasi sebagai sel...',
        options: [
          { label: 'A', text: 'D3' },
          { label: 'B', text: '3D' },
          { label: 'C', text: 'D-3' },
          { label: 'D', text: 'Row-D' }
        ],
        correctAnswer: 'A',
        explanation: 'Format alamat sel selalu Huruf Kolom + Angka Baris = D3.',
        points: 10
      },
      {
        id: 2,
        question: 'Fungsi untuk menjumlahkan isi sel B1 hingga B5 adalah...',
        options: [
          { label: 'A', text: '=SUM(B1:B5)' },
          { label: 'B', text: '=ADD(B1:B5)' },
          { label: 'C', text: '=TOTAL(B1:B5)' },
          { label: 'D', text: '=PLUS(B1:B5)' }
        ],
        correctAnswer: 'A',
        explanation: '=SUM(B1:B5) adalah sintaks resmi penjumlahan.',
        points: 10
      },
      {
        id: 3,
        question: 'Jika sel A1=10 dan A2=5, hasil formula =A1^2 - A2 adalah...',
        options: [
          { label: 'A', text: '95' },
          { label: 'B', text: '15' },
          { label: 'C', text: '25' },
          { label: 'D', text: '5' }
        ],
        correctAnswer: 'A',
        explanation: '10^2 - 5 = 100 - 5 = 95 (^ adalah pangkat).',
        points: 10
      },
      {
        id: 4,
        question: 'Fungsi yang digunakan untuk menghitung jumlah sel yang terisi data teks maupun angka adalah...',
        options: [
          { label: 'A', text: '=COUNTA()' },
          { label: 'B', text: '=COUNT()' },
          { label: 'C', text: '=SUM()' },
          { label: 'D', text: '=AVERAGE()' }
        ],
        correctAnswer: 'A',
        explanation: 'COUNTA menghitung sel yang tidak kosong (teks maupun angka).',
        points: 10
      },
      {
        id: 5,
        question: 'Kombinasi tombol untuk membatalkan kesalahan tindakan terakhir (Undo) di Google Sheets adalah...',
        options: [
          { label: 'A', text: 'Ctrl + Z' },
          { label: 'B', text: 'Ctrl + Y' },
          { label: 'C', text: 'Ctrl + C' },
          { label: 'D', text: 'Ctrl + V' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + Z adalah perintah Undo.',
        points: 10
      },
      {
        id: 6,
        question: 'Fungsi untuk menggabungkan dua atau lebih teks dari sel berbeda menjadi satu teks utuh adalah...',
        options: [
          { label: 'A', text: '=CONCATENATE() atau simbol &' },
          { label: 'B', text: '=JOIN_ALL()' },
          { label: 'C', text: '=MERGE_TEXT()' },
          { label: 'D', text: '=SUM()' }
        ],
        correctAnswer: 'A',
        explanation: 'CONCATENATE atau tanda ampersand (&) menggabungkan string teks.',
        points: 10
      },
      {
        id: 7,
        question: 'Tanda pemisah rentang berkelanjutan dalam formula spreadsheet adalah...',
        options: [
          { label: 'A', text: 'Titik dua (:)' },
          { label: 'B', text: 'Titik koma (;)' },
          { label: 'C', text: 'Tanda tambah (+)' },
          { label: 'D', text: 'Tanda bintang (*)' }
        ],
        correctAnswer: 'A',
        explanation: 'Titik dua melambangkan range kontinu.',
        points: 10
      },
      {
        id: 8,
        question: 'Perhatikan formula: =IF(D2="L"; "Laki-laki"; "Perempuan"). Jika sel D2 berisi huruf "P", hasil rumus adalah...',
        options: [
          { label: 'A', text: 'Perempuan' },
          { label: 'B', text: 'Laki-laki' },
          { label: 'C', text: 'L' },
          { label: 'D', text: 'False' }
        ],
        correctAnswer: 'A',
        explanation: 'Karena D2 bukan "L", maka mengambil argumen nilai jika salah ("Perempuan").',
        points: 10
      },
      {
        id: 9,
        question: 'Fitur "Format Bersyarat" (Conditional Formatting) berfungsi untuk...',
        options: [
          { label: 'A', text: 'Mengubah warna latar belakang sel secara otomatis sesuai aturan isi nilainya (misal merah jika nilai < 70)' },
          { label: 'B', text: 'Menghapus data di hari libur' },
          { label: 'C', text: 'Mengirim WhatsApp otomatis' },
          { label: 'D', text: 'Mengunci keyboard' }
        ],
        correctAnswer: 'A',
        explanation: 'Conditional formatting memberi gaya visual sel secara dinamis berbasis aturan logika.',
        points: 10
      },
      {
        id: 10,
        question: 'Manakah tindakan paling aman saat membagikan link Google Sheets tugas kelompok ke teman sekelas?',
        options: [
          { label: 'A', text: 'Membagikan dengan akses "Editor" hanya kepada email akun belajar teman kelompok, dan memberi "Viewer" untuk yang lain' },
          { label: 'B', text: 'Membagikan akses Editor publik ke seluruh dunia di media sosial' },
          { label: 'C', text: 'Menghapus file dari drive' },
          { label: 'D', text: 'Mengganti password email menjadi 123456' }
        ],
        correctAnswer: 'A',
        explanation: 'Menerapkan hak akses terarah (Least Privilege) menjaga integritas data dokumen dari vandalisme.',
        points: 10
      }
    ]
  }
];
