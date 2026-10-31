import { Topic } from '../types/curriculum';

export const REKAM_JEJAK_DIGITAL_TOPIC: Topic = {
  id: 'k8-rekam-jejak-digital',
  grade: 8,
  title: 'Rekam Jejak Digital, Toleransi & Empati, dan Perundungan di Dunia Digital',
  category: 'Dampak Sosial Informatika (DSI)',
  shortDesc: 'Memahami pentingnya menjaga rekam jejak digital, mengamalkan sikap toleransi dan empati dalam komunikasi digital, serta mengetahui dampak dan cara mencegah perundungan siber (cyberbullying).',
  learningObjectives: [
    'Memahami pentingnya menjaga rekam jejak digital (digital footprint) baik aktif maupun pasif.',
    'Mengamalkan sikap toleransi dan empati dalam komunikasi digital sehari-hari.',
    'Mengetahui dampak psikologis, sosial, dan hukum dari perundungan digital (cyberbullying) serta cara efektif mencegah dan menanganinya.'
  ],
  apersepsi: {
    imagePromptDesc: 'Siswa SMP kelas 8 sedang mengamati jejak kaki digital bercahaya di laptop, dihiasi tameng keamanan siber dan ikon hati empati digital yang hangat dan bersahabat.',
    videoTitle: 'Jejak Digital & Bahaya Cyberbullying di Kalangan Remaja - Kurikulum Merdeka',
    videoDuration: '05:40',
    videoThumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    videoDescription: 'Menjelaskan konsep jejak digital abadi, etika netiket di media sosial, serta bahaya perundungan siber dan cara menghadapinya secara bijak.',
    defaultVideoUrl: 'https://www.youtube.com/watch?v=OttRV5ykP7A',
    realLifeStory: 'Setiap aksi kita di internet meninggalkan bekas digital yang disebut rekam jejak digital. Misalnya, komentar di media sosial, foto yang diunggah, atau informasi akun kita. Rekam jejak ini bisa dilihat banyak orang jika tidak dilindungi. Selain itu, interaksi di dunia maya terkadang memancing konflik, terutama jika kita tidak saling menghormati. Oleh karena itu, penting untuk menggunakan internet dengan etika: toleran terhadap perbedaan, empati terhadap orang lain, dan menghindari sikap menganiaya secara online.',
    triggerQuestions: [
      'Mengapa komentar negatif atau foto konyol yang pernah kita unggah bertahun-tahun lalu bisa ditemukan kembali dan berdampak buruk bagi masa depan kita?',
      'Apa perbedaan mendasar antara bercanda akrab antarteman dengan perundungan digital (cyberbullying) yang merusak mental teman?',
      'Bagaimana prinsip saringan T-H-I-N-K dan empati digital dapat mencegah perselisihan di grup media sosial atau WhatsApp kelas?'
    ]
  },
  asesmenAwal: [
    {
      id: 1,
      question: 'Segala jejak atau riwayat data yang tertinggal setelah seseorang menggunakan internet (seperti riwayat pencarian, unggahan foto, dan komentar) disebut...',
      options: [
        { label: 'A', text: 'Rekam Jejak Digital (Digital Footprint)' },
        { label: 'B', text: 'Topologi Jaringan' },
        { label: 'C', text: 'Siklus Pemrosesan Komputer' },
        { label: 'D', text: 'Sistem Operasi Komputer' }
      ],
      correctAnswer: 'A',
      conceptTag: 'Definisi Rekam Jejak Digital',
      recommendation: 'Rekam jejak digital adalah bekas riwayat aktivitas kita selama berselancar di internet.'
    },
    {
      id: 2,
      question: 'Manakah di bawah ini yang merupakan contoh rekam jejak digital PASIF?',
      options: [
        { label: 'A', text: 'Alamat IP dan riwayat pencarian web yang dicatat secara otomatis oleh sistem server' },
        { label: 'B', text: 'Mengunggah video vlog di YouTube secara sengaja' },
        { label: 'C', text: 'Menulis komentar ucapan selamat ulang tahun di akun Instagram teman' },
        { label: 'D', text: 'Mengisi formulir pendaftaran lomba daring' }
      ],
      correctAnswer: 'A',
      conceptTag: 'Rekam Jejak Pasif vs Aktif',
      recommendation: 'Jejak pasif ditinggalkan di latar belakang tanpa tindakan sadar langsung dari pengguna.'
    },
    {
      id: 3,
      question: 'Etika kesantunan dan tata krama dalam berkomunikasi dan berinteraksi di dunia internet dikenal dengan istilah...',
      options: [
        { label: 'A', text: 'Netiket (Network Etiquette)' },
        { label: 'B', text: 'Algoritma Komputasi' },
        { label: 'C', text: 'Firewall Antivirus' },
        { label: 'D', text: 'Bandwidth Jaringan' }
      ],
      correctAnswer: 'A',
      conceptTag: 'Etika Digital (Netiket)',
      recommendation: 'Netiket adalah panduan moral dan sopan santun saat berkomunikasi di internet.'
    },
    {
      id: 4,
      question: 'Kemampuan untuk memahami perasaan orang lain saat berinteraksi melalui media digital tanpa melihat ekspresi wajah secara langsung disebut...',
      options: [
        { label: 'A', text: 'Empati Digital' },
        { label: 'B', text: 'Plagiarisme' },
        { label: 'C', text: 'Trolling Siber' },
        { label: 'D', text: 'Phishing Akun' }
      ],
      correctAnswer: 'A',
      conceptTag: 'Empati di Dunia Digital',
      recommendation: 'Empati digital membantu kita memikirkan dampak tulisan kita terhadap hati orang lain.'
    },
    {
      id: 5,
      question: 'Tindakan mengirimkan pesan bernada hinaan, ancaman, atau membuat stiker ejekan wajah teman secara terus-menerus di grup chat termasuk bentuk...',
      options: [
        { label: 'A', text: 'Perundungan Digital (Cyberbullying)' },
        { label: 'B', text: 'Bercanda Sehat' },
        { label: 'C', text: 'Kolaborasi Digital' },
        { label: 'D', text: 'Literasi Informasi' }
      ],
      correctAnswer: 'A',
      conceptTag: 'Perundungan Digital (Cyberbullying)',
      recommendation: 'Cyberbullying adalah tindakan agresif berulang yang sengaja menyakiti pihak lain di ruang siber.'
    }
  ],
  materi: {
    overview: 'Di era internet dan media sosial, setiap ketikan jemari kita meninggalkan jejak permanen. Bab 4 ini membekali peserta didik Kelas VIII dengan pemahaman mendalam tentang Rekam Jejak Digital (Digital Footprint), pembiasaan Etika Digital (Netiket), pemupukan sikap Toleransi dan Empati di dunia maya, serta strategi komprehensif melawan dan mencegah Perundungan Digital (Cyberbullying).',
    keyConcepts: [
      {
        title: '1. Etika Digital (Netiket)',
        explanation: 'Netiket (Network Etiquette) adalah aturan tata krama, etika kesantunan, dan norma kesopanan yang berlaku saat berinteraksi di internet. Di dunia maya, kita tetap berkomunikasi dengan manusia nyata yang memiliki perasaan, martabat, dan harga diri.',
        bulletPoints: [
          'Ingat Manusia di Balik Layar: Selalu perlakukan orang lain sebagaimana kita ingin diperlakukan di dunia nyata.',
          'Gunakan Bahasa Santun: Hindari kata makian, sarkasme berlebihan, dan bahasa yang merendahkan suku, agama, atau fisik.',
          'Hindari Huruf Kapital Penuh: Menulis kalimat dengan SELURUH HURUF BESAR dianggap sebagai tindakan berteriak dan marah secara kasar.',
          'Hormati Privasi Orang Lain: Jangan menyebarkan nomor telepon, alamat rumah, atau tangkapan layar chat pribadi teman tanpa izin tertulis.',
          'Tata Krama Chat ke Guru: Mulailah dengan salam, sebutkan nama dan kelas, sampaikan maksud dengan sopan, dan akhiri dengan terima kasih.'
        ],
        iconName: 'MessageSquareWarning'
      },
      {
        title: '2. Rekam Jejak Digital (Digital Footprint)',
        explanation: 'Rekam jejak digital adalah seluruh jejak data yang tertinggal setelah kita melakukan aktivitas di internet. Jejak ini bagaikan tato permanen yang sangat sulit dihapus, tersimpan di server penyedia layanan, dan dapat dilacak oleh orang lain.',
        bulletPoints: [
          'Jejak Digital Aktif: Data yang sengaja kita buat dan publikasikan (unggahan foto di Instagram/TikTok, komentar, status WhatsApp, tweet, dan email).',
          'Jejak Digital Pasif: Data yang terekam secara otomatis di latar belakang tanpa tindakan sengaja pengguna (alamat IP komputer, riwayat situs yang dikunjungi, pelacakan cookies iklan, dan koordinat GPS gawai).',
          'Dampak Jangka Panjang: Jejak digital negatif dapat menghancurkan reputasi, menghambat seleksi beasiswa sekolah lanjutan, hingga peluang kerja di masa depan.',
          'Cara Merawat Jejak Positif: Berpikir sebelum memposting, hapus akun yang tidak terpakai, gunakan pengaturan privasi akun privat, dan bagikan karya-karya prestasi atau edukatif.'
        ],
        iconName: 'Globe'
      },
      {
        title: '3. Toleransi dan Empati di Dunia Digital',
        explanation: 'Dunia digital mempertemukan jutaan orang dengan latar belakang berbeda. Menjaga kerukunan membutuhkan dua pilar utama: Toleransi Digital dan Empati Digital.',
        bulletPoints: [
          'Toleransi Digital: Sikap terbuka, sabar, dan menghargai keberagaman pendapat, budaya, pandangan hidup, serta tingkat kemahiran teknologi orang lain tanpa menghakimi.',
          'Empati Digital: Kemampuan menempatkan diri pada posisi orang lain serta merasakan dampak emosional dari ketikan komentar atau pesan kita sebelum menekan tombol kirim.',
          'Saringan Emas T.H.I.N.K.: Uji pesan kita dengan 5 pertanyaan: True (Benarkah?), Helpful (Bermanfaatkah?), Inspiring (Menginspirasikah?), Necessary (Perlukah?), dan Kind (Santunkah?).',
          'Jeda Sebelum Menanggapi: Jangan membalas komentar saat sedang dikuasai amarah atau emosi sesaat. Tarik napas, tenangkan diri, atau tinggalkan gawai sejenak.'
        ],
        iconName: 'HeartHandshake'
      },
      {
        title: '4. Perundungan di Dunia Digital (Cyberbullying)',
        explanation: 'Cyberbullying adalah perlakuan kejam, intimidasi, penghinaan, atau penganiayaan yang dilakukan secara sengaja dan berulang-ulang menggunakan media elektronik atau media sosial terhadap orang lain yang dianggap lebih lemah.',
        bulletPoints: [
          'Bentuk-Bentuk Cyberbullying: Harassment (pesan ancaman/ejekan berulang), Flaming (adu amarah dengan kata-kata kasar), Denigration (memfitnah dan menyebarkan rumor jahat), Impersonation (membuat akun palsu meniru korban untuk merusak reputasi), Outing (menyebarkan rahasia/foto memalukan orang lain), dan Exclusion (mengucilkan teman sengaja dari grup kelas).',
          'Dampak Buruk: Korban mengalami stres berat, trauma, penurunan prestasi belajar, kecemasan sosial, hingga enggan berangkat ke sekolah.',
          '5 Langkah Tegas Melawan Cyberbullying: (1) Jangan membalas provokasi pelaku, (2) Ambil tangkapan layar (screenshot) sebagai barang bukti, (3) Blokir akun pelaku, (4) Laporkan (report) ke platform medsos, dan (5) Ceritakan ke orang tua atau guru BK di sekolah.'
        ],
        iconName: 'ShieldCheck'
      }
    ],
    comparisonTable: {
      title: 'Tabel Perbandingan: Rekam Jejak Digital Aktif vs Rekam Jejak Digital Pasif',
      headers: ['Aspek Pembeda', 'Rekam Jejak Digital Aktif', 'Rekam Jejak Digital Pasif'],
      rows: [
        ['Kesadaran Pengguna', 'Ditinggalkan secara sadar, sengaja, dan terencana oleh pengguna', 'Ditinggalkan tanpa sengaja atau disadari pengguna di latar belakang sistem'],
        ['Contoh Tindakan', 'Mengunggah video TikTok, menulis komentar di status teman, mengirim email tugas', 'Alamat IP koneksi internet, data cookies penjelajahan, koordinat lokasi GPS'],
        ['Cara Pengumpulan', 'Melalui formulir pendaftaran, tombol posting, dan kolom interaksi pengguna', 'Melalui sensor gawai pintar, log pelacak server web, dan algoritma analitik'],
        ['Tingkat Kontrol', 'Pengguna memiliki kontrol penuh untuk memposting atau menahan konten', 'Memerlukan pengaturan privasi peramban, cookie policy, atau mode incognito'],
        ['Dampak Utama', 'Membentuk reputasi pribadi, citra diri, dan kesan sosial di masyarakat', 'Membentuk profil preferensi iklan produk dan pemetaan demografi digital']
      ]
    },
    flowDiagram: {
      title: 'Alur Saringan T.H.I.N.K. Sebelum Menekan Tombol Posting / Kirim Komentar',
      steps: [
        { step: 1, title: 'T - True (Benar?)', desc: 'Pastikan informasi yang ingin diunggah didasari fakta valid, bukan kabar burung atau hoaks tanpa bukti.' },
        { step: 2, title: 'H - Helpful (Bermanfaat?)', desc: 'Pikirkan apakah tulisan kita memberikan manfaat, solusi positif, atau meringankan beban orang lain.' },
        { step: 3, title: 'I - Inspiring (Menginspirasi?)', desc: 'Periksa apakah konten menyebarkan semangat kebaikan, kreativitas, atau justru memicu pertengkaran.' },
        { step: 4, title: 'N - Necessary (Perlu?)', desc: 'Pertimbangkan apakah informasi ini benar-benar penting diketahui publik atau sebaiknya disimpan pribadi.' },
        { step: 5, title: 'K - Kind (Santun & Ramah?)', desc: 'Pastikan kata-kata yang dipilih tidak menyinggung perasaan, menghina fisik, atau mencela orang lain.' }
      ]
    },
    dailyLifeExamples: [
      'Memikirkan dampak masa depan sebelum mengunggah foto kegiatan ekstrakurikuler ke media sosial Instagram.',
      'Menyapa dan mengucapkan terima kasih saat mengirim pesan konfirmasi tugas kepada guru Informatika di WhatsApp.',
      'Menolak ikut menertawakan atau membagikan stiker ejekan foto wajah teman yang sengaja diedit jelek di grup chat.',
      'Menghormati teman sekelas yang memiliki perbedaan suku atau pandangan saat berdiskusi di kolom komentar media sosial.',
      'Melakukan verifikasi fakta sebelum menyebarkan kabar viral di grup keluarga agar tidak menjadi penyebar berita bohong.'
    ],
    schoolExamples: [
      'Siswa Kelas VIII SMPN 5 Kroya membuat kesepakatan bersama norma komunikasi grup WhatsApp kelas yang santun dan bebas ejekan.',
      'Bimbingan Konseling (BK) dan OSIS menyelenggarakan kampanye poster siber "Stop Cyberbullying, Sebarkan Kebaikan Digital".',
      'Praktik di Laboratorium Komputer: Memeriksa pengaturan privasi akun Google dan menghapus riwayat penjelajahan di peramban.',
      'Guru Informatika (Bapak Rifani, S.Kom) mengajak siswa menganalisis studi kasus nyata tentang etika rekam jejak digital pelajar.'
    ],
    tahukahKamu: 'Studi literasi digital membuktikan bahwa lebih dari 70% perusahaan dan universitas dunia kini melakukan pemeriksaan rekam jejak digital (social media background check) terhadap calon pelamar sebelum menerima mereka!',
    faktaMenarik: 'Menulis pesan dengan HURUF BESAR SEMUA di internet (seperti "KAMU SALAH!") dalam standar etika netiket internasional diterjemahkan sama dengan berteriak dengan nada emosi tinggi di depan muka lawan bicara.',
    infoPenting: 'Jejak digital bersifat abadi. Meskipun kamu menekan tombol "Hapus Postingan", kemungkinan besar konten tersebut sudah diunduh, dicatat oleh mesin arsip web, atau ditangkap layar (screenshot) oleh orang lain. Selalu terapkan saringan T.H.I.N.K.!',
    commonMistakes: [
      'Menganggap bercandaan kasar di media sosial adalah hal sepele padahal sudah tergolong perundungan siber (cyberbullying).',
      'Menyebarkan rahasia atau tangkapan layar percakapan pribadi teman ke grup umum hanya untuk mencari sensasi atau tawa.',
      'Memakai akun samaran palsu (fake account) dengan anggapan identitasnya tidak akan pernah bisa dilacak oleh aparat penegak hukum.',
      'Membalas serangan cyberbullying dengan makian kasar yang sama sehingga memperkeruh konflik dan merusak jejak digital sendiri.',
      'Mengabaikan teman yang sedang dirundung siber karena takut ikut menjadi sasaran para pelaku.'
    ],
    summary: [
      'Rekam jejak digital adalah jejak data permanen yang ditinggalkan pengguna internet, terdiri dari jejak aktif (unggahan sengaja) dan pasif (rekaman otomatis sistem).',
      'Etika digital (Netiket) merupakan panduan moral dan sopan santun yang wajib diterapkan agar interaksi daring berlangsung aman, damai, dan bermartabat.',
      'Toleransi dan empati digital menjadi kunci pencegah konflik di tengah keberagaman pengguna internet melalui saringan T.H.I.N.K. (True, Helpful, Inspiring, Necessary, Kind).',
      'Perundungan digital (cyberbullying) menimbulkan dampak traumatis bagi korban dan dapat dikenai sanksi hukum UU ITE.',
      'Strategi efektif menghadapi cyberbullying adalah tidak membalas dendam, mengamankan bukti tangkapan layar, memblokir pelaku, dan segera melapor kepada orang tua atau guru.'
    ],
    formativeCheck: [
      {
        question: 'Manakah tindakan di bawah ini yang paling tepat mencerminkan penerapan saringan T.H.I.N.K. sebelum mengunggah sesuatu?',
        options: [
          'Memastikan tulisan kita benar, bermanfaat, menginspirasi, perlu, serta disampaikan dengan bahasa santun',
          'Langsung memposting kabar heboh selagi hangat tanpa perlu membaca isinya terlebih dahulu',
          'Mengunggah foto konyol teman yang sedang tertidur di kelas agar mendapat banyak like',
          'Menulis sindiran dengan huruf kapital penuh di status agar orang yang dituju merasa tersindir'
        ],
        answerIndex: 0,
        explanation: 'Saringan T.H.I.N.K. (True, Helpful, Inspiring, Necessary, Kind) memastikan konten yang kita bagikan bernilai positif dan aman bagi reputasi digital.'
      },
      {
        question: 'Apabila kamu menyaksikan teman sekelas menjadi korban perundungan siber di grup media sosial, langkah berani dan terpuji yang harus kamu lakukan adalah...',
        options: [
          'Mendukung korban secara moral, tidak ikut membagikan ejekan, dan melaporkan kejadian kepada guru atau pihak berwenang',
          'Ikut memberikan komentar tertawa agar dianggap kompak oleh teman-teman lain',
          'Menghapus aplikasi media sosial dan membiarkan korban sendirian menanggung derita',
          'Menyerang pelaku balik dengan kata-kata kotor dan ancaman fisik'
        ],
        answerIndex: 0,
        explanation: 'Menjadi pembela yang berani (upstander) dengan memberi dukungan moral kepada korban dan melapor ke guru adalah wujud nyata empati digital.'
      }
    ]
  },
  simulasi: {
    type: 'categorize',
    title: 'Simulasi Pemilahan Kasus Etika & Rekam Jejak Digital Siswa',
    scenario: 'Pilah skenario aksi siswa sehari-hari ke dalam 3 wadah kategori: Rekam Jejak Positif & Netiket, Toleransi & Empati Digital, atau Pelanggaran / Cyberbullying Berbahaya.',
    instructions: 'Baca dengan cermat setiap skenario peristiwa digital. Geser atau klik tombol kategori yang paling tepat untuk menguji integritas dan kecerdasan digitalmu!',
    data: {
      categories: [
        'Rekam Jejak Positif & Netiket',
        'Toleransi & Empati Digital',
        'Pelanggaran / Cyberbullying Berbahaya'
      ],
      items: [
        {
          id: 'k8r-1',
          text: 'Meminta izin secara santun kepada teman sebelum mengunggah foto bersama ke akun Instagram kelas.',
          correctCategory: 'Rekam Jejak Positif & Netiket',
          explanation: 'Menghormati privasi dan meminta izin mencerminkan etika netiket yang sangat baik.'
        },
        {
          id: 'k8r-2',
          text: 'Mengedit foto wajah teman menjadi hewan lalu menyebarkannya di grup WhatsApp hingga teman tersebut menangis malu.',
          correctCategory: 'Pelanggaran / Cyberbullying Berbahaya',
          explanation: 'Tindakan ini termasuk pelecehan dan pencemaran nama baik yang merugikan mental korban.'
        },
        {
          id: 'k8r-3',
          text: 'Menghargai teman yang memiliki pendapat berbeda saat diskusi daring tanpa menyerang atau menghakimi pribadinya.',
          correctCategory: 'Toleransi & Empati Digital',
          explanation: 'Menerima perbedaan pandangan dengan lapang dada adalah perwujudan toleransi digital sejati.'
        },
        {
          id: 'k8r-4',
          text: 'Membuat akun media sosial palsu anonim untuk mengirim pesan teror ancaman dan kata kotor ke akun adik kelas.',
          correctCategory: 'Pelanggaran / Cyberbullying Berbahaya',
          explanation: 'Impersonation dan harassment adalah bentuk cyberbullying serius yang melanggar hukum siber.'
        },
        {
          id: 'k8r-5',
          text: 'Menghapus riwayat penjelajahan dan mengaktifkan otentikasi dua faktor (2FA) pada akun email sekolah.',
          correctCategory: 'Rekam Jejak Positif & Netiket',
          explanation: 'Langkah proaktif merawat kebersihan dan keamanan rekam jejak digital pribadi.'
        },
        {
          id: 'k8r-6',
          text: 'Mengirimkan pesan japri penyemangat kepada teman yang sedang sedih setelah menerima komentar jahat di internet.',
          correctCategory: 'Toleransi & Empati Digital',
          explanation: 'Empati digital mendorong kita peduli dan menguatkan sesama pengguna ruang siber.'
        }
      ]
    }
  },
  miniGame: {
    type: 'detective',
    title: 'Misi Detektif Siber: Penyelidik Jejak Digital & Tameng Netiket',
    description: 'Pecahkan 5 teka-teki studi kasus pergaulan digital pelajar SMP untuk mengumpulkan lencana Penjaga Etika Siber!',
    questions: [
      {
        id: 1,
        question: 'Detektif menemukan akun siswa yang ditolak saat seleksi beasiswa karena foto masa lalu merokok yang ia unggah di media sosial 2 tahun lalu. Kasus ini membuktikan bahwa...',
        options: [
          'Rekam jejak digital bersifat permanen dan berdampak nyata bagi reputasi di masa depan',
          'Sistem seleksi beasiswa mengalami gangguan teknis',
          'Semua data di internet pasti otomatis hilang setelah 6 bulan',
          'Foto di internet tidak pernah bisa dilihat oleh orang luar'
        ],
        correctIndex: 0,
        clue: 'Perhatikan sifat keabadian jejak digital di internet.',
        category: 'Rekam Jejak Digital'
      },
      {
        id: 2,
        question: 'Ketika seorang teman mengirim chat panjang ke gurunya tanpa salam dan menggunakan huruf kapital semua: "TUGAS SAYA SUDAH DINILAI BELUM?!", pelanggaran netiket apa yang terjadi?',
        options: [
          'Kurang sopan, tidak ada salam pembuka, dan penggunaan huruf kapital terkesan membentak',
          'Ponsel guru kehabisan memori penyimpanan',
          'Format file tugas tidak sesuai ekstensi PDF',
          'Pesan tersebut sudah sesuai aturan netiket resmi'
        ],
        correctIndex: 0,
        clue: 'Huruf kapital penuh diartikan sebagai berteriak kasar.',
        category: 'Netiket Komunikasi'
      },
      {
        id: 3,
        question: 'Sebelum membagikan kabar viral tentang kecelakaan teman sekolah, Detektif memeriksa kebenaran kabar tersebut ke pihak wali kelas. Saringan T.H.I.N.K. huruf apa yang diterapkan?',
        options: [
          'Huruf T - True (Memastikan informasi benar-benar fakta dan bukan hoaks)',
          'Huruf N - Noisy (Membuat suasana semakin ramai)',
          'Huruf I - Ignore (Mengabaikan semua pesan)',
          'Huruf K - Kill (Menghapus akun ponsel)'
        ],
        correctIndex: 0,
        clue: 'T adalah singkatan dari kata True (Benar).',
        category: 'Saringan T.H.I.N.K.'
      },
      {
        id: 4,
        question: 'Seorang siswa dikeluarkan dari grup belajar kelas secara sepihak dan diabaikan saat bertanya materi tugas. Jenis cyberbullying ini disebut...',
        options: [
          'Exclusion (Pengucilan sengaja secara digital)',
          'Flaming (Adu kata kasar)',
          'Phishing (Pencurian sandi akun)',
          'Trolling (Membuat lelucon kocak)'
        ],
        correctIndex: 0,
        clue: 'Exclusion berarti mengucilkan atau mengeluarkan seseorang dari kelompok.',
        category: 'Jenis Cyberbullying'
      },
      {
        id: 5,
        question: 'Tindakan pertama yang paling cerdas dan aman ketika kamu menerima pesan perundungan dari akun tidak dikenal di media sosial adalah...',
        options: [
          'Tangkap layar (screenshot) sebagai bukti, blokir akunnya, dan laporkan ke orang tua/guru',
          'Membalas dengan kata-kata yang jauh lebih kotor',
          'Menantang pelaku untuk berkelahi di luar gerbang sekolah',
          'Menghapus akun ponsel dan tidak mau bersekolah lagi'
        ],
        correctIndex: 0,
        clue: 'Amankan bukti fisik digital sebelum memblokir dan melapor.',
        category: 'Pencegahan Cyberbullying'
      }
    ]
  },
  kuis: [
    {
      id: 1,
      question: 'Data penjelajahan situs, alamat IP, dan preferensi pencarian yang terekam secara otomatis oleh server peramban tanpa tindakan sadar pengguna tergolong ke dalam...',
      options: [
        { label: 'A', text: 'Rekam Jejak Digital Pasif' },
        { label: 'B', text: 'Rekam Jejak Digital Aktif' },
        { label: 'C', text: 'Kejahatan Siber Phishing' },
        { label: 'D', text: 'Perangkat Lunak Open Source' }
      ],
      correctAnswer: 'A',
      explanation: 'Rekam jejak pasif adalah jejak data yang terkumpul tanpa disadari pengguna saat menggunakan layanan internet.',
      competencyLevel: 'Pemahaman (LOTS)'
    },
    {
      id: 2,
      question: 'Perhatikan kalimat berikut: "Dasar lambat! Mengerjakan tugas begini saja tidak bisa, keluar saja dari kelompok!". Kalimat tersebut di dunia maya melanggar prinsip...',
      options: [
        { label: 'A', text: 'Netiket dan Empati Digital' },
        { label: 'B', text: 'Konektivitas Jaringan Nirkabel' },
        { label: 'C', text: 'Efisiensi Algoritma Komputasi' },
        { label: 'D', text: 'Penyimpanan Basis Data Cloud' }
      ],
      correctAnswer: 'A',
      explanation: 'Kalimat merendahkan dan kasar melanggar etika kesantunan (netiket) serta tidak memiliki empati terhadap teman sekelas.',
      competencyLevel: 'Penerapan (MOTS)'
    },
    {
      id: 3,
      question: 'Mengapa menggunakan saringan T.H.I.N.K. sebelum memposting status dapat mencegah seseorang terjerat kasus hukum dan konflik sosial?',
      options: [
        { label: 'A', text: 'Karena saringan T.H.I.N.K. menguji kebenaran, manfaat, inspirasi, urgensi, dan kesantunan konten sebelum dipublikasikan' },
        { label: 'B', text: 'Karena saringan T.H.I.N.K. otomatis mematikan jaringan internet pelaku' },
        { label: 'C', text: 'Karena saringan T.H.I.N.K. mengubah teks menjadi kode biner terenkripsi' },
        { label: 'D', text: 'Karena saringan T.H.I.N.K. menghapus seluruh riwayat peramban secara otomatis' }
      ],
      correctAnswer: 'A',
      explanation: 'T.H.I.N.K. membiasakan pengguna berpikir matang dan kritis sebelum menyebarkan konten ke ranah publik.',
      competencyLevel: 'Penalaran (HOTS)'
    },
    {
      id: 4,
      question: 'Tindakan membuat akun palsu menggunakan foto dan nama teman sekolah, lalu mengunggah status berisi kata-kata tidak senonoh untuk merusak nama baiknya termasuk kategori...',
      options: [
        { label: 'A', text: 'Impersonation (Penyamaran identitas untuk mencemarkan nama baik)' },
        { label: 'B', text: 'Trickery (Tipuan data sederhana)' },
        { label: 'C', text: 'Netiket Positif' },
        { label: 'D', text: 'Mindfulness Belajar' }
      ],
      correctAnswer: 'A',
      explanation: 'Impersonation adalah tindakan menyamar sebagai korban untuk menyebarkan konten buruk demi merusak reputasi korban.',
      competencyLevel: 'Penerapan (MOTS)'
    },
    {
      id: 5,
      question: 'Jika seorang siswa menjadi korban cyberbullying hingga merasa cemas dan enggan masuk sekolah, tindakan paling tepat yang harus dilakukan pihak sekolah adalah...',
      options: [
        { label: 'A', text: 'Memberikan pendampingan konseling bagi korban, menindak tegas pelaku secara mendidik, dan mengedukasi seluruh siswa' },
        { label: 'B', text: 'Menyalahkan korban karena bermain media sosial' },
        { label: 'C', text: 'Mendiamkan masalah agar tidak menjadi perbincangan umum' },
        { label: 'D', text: 'Mengeluarkan korban dari sekolah demi menjaga nama baik institusi' }
      ],
      correctAnswer: 'A',
      explanation: 'Pendampingan psikologis korban dan penanganan terarah bagi pelaku penting untuk memutus rantai perundungan di lingkungan sekolah.',
      competencyLevel: 'Penalaran (HOTS)'
    }
  ],
  asesmenAkhir: [
    {
      id: 1,
      question: 'Jejak data yang tercipta secara otomatis saat kita mengakses internet, seperti riwayat pencarian web, cookies browser, dan lokasi IP pengguna disebut...',
      options: [
        { label: 'A', text: 'Rekam Jejak Digital Pasif' },
        { label: 'B', text: 'Rekam Jejak Digital Aktif' },
        { label: 'C', text: 'Perangkat Lunak Berbayar' },
        { label: 'D', text: 'Alamat Email Terverifikasi' }
      ],
      correctAnswer: 'A',
      explanation: 'Rekam jejak pasif tercipta tanpa tindakan sengaja dari pengguna di latar belakang aktivitas internet.',
      points: 10
    },
    {
      id: 2,
      question: 'Contoh nyata tindakan yang menghasilkan rekam jejak digital AKTIF adalah...',
      options: [
        { label: 'A', text: 'Mengunggah video presentasi tugas sekolah ke platform YouTube' },
        { label: 'B', text: 'Server web mencatat alamat IP komputer saat membaca berita' },
        { label: 'C', text: 'GPS gawai merekam rute perjalanan secara otomatis' },
        { label: 'D', text: 'Situs toko online mencatat riwayat produk yang dilihat' }
      ],
      correctAnswer: 'A',
      explanation: 'Mengunggah video adalah tindakan sadar dan disengaja oleh pengguna, sehingga merupakan jejak aktif.',
      points: 10
    },
    {
      id: 3,
      question: 'Istilah "Netiket" merupakan gabungan dari dua kata bahasa Inggris, yaitu...',
      options: [
        { label: 'A', text: 'Network dan Etiquette' },
        { label: 'B', text: 'Internet dan Ticket' },
        { label: 'C', text: 'Netizen dan Market' },
        { label: 'D', text: 'Networking dan Kit' }
      ],
      correctAnswer: 'A',
      explanation: 'Netiket berasal dari Network Etiquette, yaitu aturan etika sopan santun dalam jaringan internet.',
      points: 10
    },
    {
      id: 4,
      question: 'Mengapa dalam etika komunikasi digital kita dilarang mengetik seluruh pesan menggunakan HURUF KAPITAL BESAR?',
      options: [
        { label: 'A', text: 'Karena diartikan sama dengan berteriak dan memarahi lawan bicara secara kasar' },
        { label: 'B', text: 'Karena menghabiskan kuota internet dua kali lebih banyak' },
        { label: 'C', text: 'Karena membuat baterai gawai cepat panas' },
        { label: 'D', text: 'Karena server internet menolak pengiriman huruf besar' }
      ],
      correctAnswer: 'A',
      explanation: 'Dalam konvensi netiket internasional, seluruh huruf kapital mencerminkan kemarahan dan teriakan kasar.',
      points: 10
    },
    {
      id: 5,
      question: 'Sikap menerima keberagaman suku, agama, pandangan hidup, serta gaya komunikasi pengguna internet lain tanpa mencela disebut...',
      options: [
        { label: 'A', text: 'Toleransi Digital' },
        { label: 'B', text: 'Plagiarisme Siber' },
        { label: 'C', text: 'Phishing Komputasi' },
        { label: 'D', text: 'Spamming Massal' }
      ],
      correctAnswer: 'A',
      explanation: 'Toleransi digital adalah keterbukaan hati dalam menghargai perbedaan sesama warga internet.',
      points: 10
    },
    {
      id: 6,
      question: 'Dalam saringan T.H.I.N.K., huruf "K" merupakan singkatan dari kata...',
      options: [
        { label: 'A', text: 'Kind (Apakah pesan ini santun, ramah, dan tidak menyakiti orang lain?)' },
        { label: 'B', text: 'Knowledge (Apakah pesan ini berupa ensiklopedia ilmiah?)' },
        { label: 'C', text: 'Key (Apakah pesan ini memiliki kata sandi rahasia?)' },
        { label: 'D', text: 'Kick (Apakah pesan ini bisa menendang orang dari grup?)' }
      ],
      correctAnswer: 'A',
      explanation: 'K mewakili Kind, memastikan bahasa yang kita pilih ramah dan berbelas kasih.',
      points: 10
    },
    {
      id: 7,
      question: 'Bentuk perundungan digital di mana pelaku menyebarkan rahasia pribadi, foto aib, atau tangkapan layar percakapan pribadi korban tanpa izin disebut...',
      options: [
        { label: 'A', text: 'Outing (Penyebaran rahasia pribadi)' },
        { label: 'B', text: 'Cyberstalking (Penguntitan fisik)' },
        { label: 'C', text: 'Filtering (Penyaringan konten)' },
        { label: 'D', text: 'Streaming (Penyiaran langsung)' }
      ],
      correctAnswer: 'A',
      explanation: 'Outing adalah tindakan jahat menyebarkan informasi privat atau memalukan milik orang lain ke publik.',
      points: 10
    },
    {
      id: 8,
      question: 'Dampak buruk perundungan siber (cyberbullying) bagi kesehatan mental korban yang sering terjadi adalah...',
      options: [
        { label: 'A', text: 'Mengalami depresi, rasa takut berlebih, penurunan nilai, dan menarik diri dari pergaulan' },
        { label: 'B', text: 'Menjadi semakin mahir merakit perangkat keras komputer' },
        { label: 'C', text: 'Memperoleh banyak tawaran kerja sama iklan media sosial' },
        { label: 'D', text: 'Meningkatkan kecepatan koneksi internet di rumah' }
      ],
      correctAnswer: 'A',
      explanation: 'Cyberbullying dapat menimbulkan trauma emosional berat dan merusak perkembangan belajar siswa.',
      points: 10
    },
    {
      id: 9,
      question: 'Langkah pertama yang paling tepat dan krusial dilakukan saat menjadi sasaran cyberbullying adalah...',
      options: [
        { label: 'A', text: 'Menyimpan tangkapan layar (screenshot) sebagai bukti otentik sebelum memblokir pelaku' },
        { label: 'B', text: 'Membalas dendam dengan menghina keluarga pelaku' },
        { label: 'C', text: 'Membanting dan merusak ponsel sendiri' },
        { label: 'D', text: 'Mengunggah video tantangan berkelahi' }
      ],
      correctAnswer: 'A',
      explanation: 'Tangkapan layar adalah bukti digital penting untuk penanganan guru BK, pihak sekolah, maupun aparat hukum.',
      points: 10
    },
    {
      id: 10,
      question: 'Bagaimana cara terbaik seorang pelajar SMP menjaga agar rekam jejak digitalnya di internet tetap bersih dan bernilai positif?',
      options: [
        { label: 'A', text: 'Menerapkan saringan T.H.I.N.K., membagikan konten karya berprestasi, dan tidak terlibat ujaran kebencian' },
        { label: 'B', text: 'Mengunggah semua keluh kesah dan kemarahan pribadi ke status publik' },
        { label: 'C', text: 'Selalu ikut berkomentar negatif pada setiap isu viral di media sosial' },
        { label: 'D', text: 'Meminjamkan akun dan kata sandi pribadi ke sembarang orang' }
      ],
      correctAnswer: 'A',
      explanation: 'Berpikir kritis sebelum memposting dan menyebarkan kebaikan akan membangun reputasi digital yang membanggakan.',
      points: 10
    }
  ]
};
