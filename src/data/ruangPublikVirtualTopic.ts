import { Topic } from '../types/curriculum';

export const RUANG_PUBLIK_VIRTUAL_TOPIC: Topic = {
  id: 'k9-ruang-publik-virtual',
  grade: 9,
  title: 'Ruang Publik Virtual',
  category: 'Dampak Sosial Informatika (DSI)',
  shortDesc: 'Memahami konsep ruang publik virtual, evolusi teknologi digital, etika berkomunikasi, mindfulness digital (toleransi & empati), serta kolaborasi digital efektif.',
  learningObjectives: [
    'Menjelaskan pengertian, karakteristik, dan evolusi ruang publik virtual dari masa ke masa.',
    'Mengidentifikasi berbagai jenis ruang publik virtual berbasis platform internet dan teknologi imersif (VR, AR, MR, Metaverse).',
    'Menganalisis dampak positif dan dampak negatif kehadiran ruang publik virtual bagi masyarakat.',
    'Menerapkan etika berkomunikasi digital dan prinsip mindfulness digital (toleransi dan empati digital) dalam pergaulan daring.',
    'Mempraktikkan cara kolaborasi digital yang produktif menggunakan berbagai platform dan mengatasi tantangan kerja bersama.'
  ],
  apersepsi: {
    imagePromptDesc: 'Siswa SMP kelas 9 sedang berkolaborasi dalam ruang virtual 3D dan konferensi video, saling berdiskusi santai dan bertukar ide secara santun.',
    videoTitle: 'Etika & Ruang Publik Virtual di Era Digital - Kurikulum Merdeka',
    videoDuration: '05:30',
    videoThumbnail: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&auto=format&fit=crop&q=80',
    videoDescription: 'Menjelaskan bagaimana internet mengubah cara manusia berkumpul, berdiskusi, dan bekerja bersama dari forum konvensional hingga ruang virtual modern.',
    defaultVideoUrl: 'https://www.youtube.com/watch?v=kYc5B_sZ7eE',
    realLifeStory: 'Dulu di era awal internet Indonesia, masyarakat berkomunikasi lewat mIRC, Friendster, dan KakaoTalk. Kini siswa SMPN 5 Kroya berinteraksi di Instagram, TikTok, WhatsApp grup kelas, hingga bermain bersama di Roblox. Ruang berkumpul fisik seperti taman atau kafe kini memiliki wujud digital di layar gawai kita. Namun, apakah semua yang kita temui di dunia maya selalu aman? Mengapa kita perlu menerapkan kesadaran penuh (mindfulness) dan etika saat berpendapat di ruang publik virtual?',
    triggerQuestions: [
      'Jika di dunia nyata kita memiliki taman kota dan perpustakaan sebagai tempat berkumpul, apa saja bentuk ruang publik tersebut di dunia maya?',
      'Mengapa seseorang di media sosial sering kali lebih berani berkomentar kasar dibanding saat berbicara tatap muka langsung?',
      'Bagaimana cara kita tetap produktif berkolaborasi dalam tugas kelompok daring tanpa merugikan privasi dan kesehatan mental teman?'
    ]
  },
  asesmenAwal: [
    {
      id: 1,
      question: 'Pengertian yang paling tepat mengenai ruang publik virtual adalah...',
      options: [
        { label: 'A', text: 'Ruang atau tempat di dunia digital yang memungkinkan orang berkomunikasi, berbagi informasi, dan beraktivitas sosial melalui internet' },
        { label: 'B', text: 'Ruangan fisik di laboratorium komputer sekolah yang dilengkapi pendingin ruangan' },
        { label: 'C', text: 'Satu-satunya situs web pribadi yang dikunci dan tidak boleh dilihat oleh orang lain' },
        { label: 'D', text: 'Perangkat keras kabel jaringan yang menghubungkan server antarkota' }
      ],
      correctAnswer: 'A',
      conceptTag: 'Definisi Ruang Publik Virtual',
      recommendation: 'Ruang publik virtual adalah ruang maya di internet tempat masyarakat saling berinteraksi sosial.'
    },
    {
      id: 2,
      question: 'Karakteristik ruang publik virtual di mana pengguna sering kali menggunakan identitas virtual yang berbeda dari identitas aslinya disebut...',
      options: [
        { label: 'A', text: 'Aksesibilitas' },
        { label: 'B', text: 'Anonimitas' },
        { label: 'C', text: 'Interaktivitas' },
        { label: 'D', text: 'Dinamika' }
      ],
      correctAnswer: 'B',
      conceptTag: 'Karakteristik Ruang Publik Virtual',
      recommendation: 'Anonimitas memungkinkan pengguna memakai nama samaran atau avatar berbeda dari identitas asli.'
    },
    {
      id: 3,
      question: 'Teknologi imersif yang menggabungkan elemen grafis digital 3D dengan dunia nyata pengguna (misalnya pada game Pokemon Go atau filter Instagram) adalah...',
      options: [
        { label: 'A', text: 'Augmented Reality (AR)' },
        { label: 'B', text: 'Virtual Reality (VR)' },
        { label: 'C', text: 'E-Commerce' },
        { label: 'D', text: 'Forum Diskusi' }
      ],
      correctAnswer: 'A',
      conceptTag: 'Teknologi Imersif (AR)',
      recommendation: 'AR menggabungkan objek digital ke dalam lingkungan dunia nyata.'
    },
    {
      id: 4,
      question: 'Sikap sadar, bijak, dan bertanggung jawab ketika menggunakan teknologi digital serta mempertimbangkan dampak sebelum memposting sesuatu dikenal sebagai...',
      options: [
        { label: 'A', text: 'Cyberbullying' },
        { label: 'B', text: 'Trolling' },
        { label: 'C', text: 'Mindfulness Digital' },
        { label: 'D', text: 'Plagiarisme' }
      ],
      correctAnswer: 'C',
      conceptTag: 'Mindfulness Digital',
      recommendation: 'Mindfulness digital melatih kesadaran penuh dan empati dalam berinteraksi di dunia maya.'
    },
    {
      id: 5,
      question: 'Tindakan yang mencerminkan etika berkolaborasi daring yang baik saat mengerjakan tugas kelompok adalah...',
      options: [
        { label: 'A', text: 'Menghargai pendapat anggota tim dan menyepakati pembagian tugas secara adil' },
        { label: 'B', text: 'Menghapus ketikan teman tanpa izin karena dianggap kurang bagus' },
        { label: 'C', text: 'Menyerahkan seluruh pengetikan dokumen hanya kepada satu orang teman' },
        { label: 'D', text: 'Menggunakan huruf kapital semua saat berdiskusi di chat kelompok' }
      ],
      correctAnswer: 'A',
      conceptTag: 'Etika Kolaborasi Digital',
      recommendation: 'Kolaborasi digital menuntut rasa saling menghargai, komunikasi teratur, dan pembagian tugas adil.'
    }
  ],
  materi: {
    overview: 'Perkembangan internet telah menciptakan ruang publik virtual sebagai wadah berkumpul, bertukar informasi, dan berkolaborasi tanpa terhalang batas geografis. Pelajari konsep dasar, evolusi platform, etika komunikasi, kesadaran mindfulness digital, serta strategi kolaborasi daring yang produktif dan bertanggung jawab.',
    keyConcepts: [
      {
        title: 'A. Pengertian & Karakteristik Ruang Publik Virtual',
        explanation: 'Ruang publik virtual adalah ruang atau tempat di dunia digital yang memungkinkan orang untuk berkomunikasi, berbagi informasi, dan melakukan berbagai aktivitas sosial melalui internet. Bersifat maya (tidak terlihat secara fisik), memiliki fungsi seperti taman atau kafe di dunia nyata namun dengan jangkauan global tanpa batas geografis.',
        bulletPoints: [
          'Evolusi Digital: Masa Ditinggalkan (Kakao, Line, Friendster, Bukalapak, OLX) -> Masa Saat Ini (Instagram, TikTok, Shopee, WhatsApp, AR) -> Masa Direncanakan (Virtual Reality, Mixed Reality) -> Masa Akan Datang (Metaverse).',
          'Aksesibilitas: Dapat diakses kapan saja dan di mana saja selama ada koneksi internet.',
          'Anonimitas: Pengguna sering kali menggunakan identitas virtual yang berbeda dari identitas asli mereka.',
          'Interaktivitas: Interaksi dua arah secara real-time melalui teks, suara, gambar, atau video.',
          'Dinamika: Isi dan bentuk terus berubah dan berkembang seiring tren teknologi dan preferensi pengguna.',
          'Global: Melampaui batas geografis, menghubungkan beragam budaya dan latar belakang.'
        ],
        iconName: 'Globe'
      },
      {
        title: 'B. Dampak Positif & Negatif Ruang Publik Virtual',
        explanation: 'Kehadiran ruang publik virtual membawa efisiensi dan peluang besar, namun juga menuntut kewaspadaan terhadap risiko sosial jika tidak digunakan secara bijak.',
        bulletPoints: [
          'Dampak Positif: Memperluas jaringan sosial, memudahkan akses informasi cepat, mendorong inovasi & kreativitas, memfasilitasi pembelajaran jarak jauh, dan membentuk komunitas positif.',
          'Dampak Negatif: Penyebaran informasi palsu (hoaks), ancaman terhadap privasi data pribadi, ketergantungan teknologi (nomophobia), cyberbullying & ujaran kebencian, serta risiko isolasi sosial di dunia nyata.'
        ],
        iconName: 'ShieldCheck'
      },
      {
        title: 'C. Jenis-Jenis Ruang Publik Virtual',
        explanation: 'Ruang publik virtual terbagi menjadi dua kategori utama: Berbasis Platform Internet Umum dan Berbasis Teknologi Imersif.',
        bulletPoints: [
          'Media Sosial: Facebook, Instagram, X (Twitter), TikTok (berbagi konten & jejaring sosial).',
          'Forum Diskusi: Brainly, Quora (tanya jawab dan pertukaran ide topik tertentu).',
          'Blog & Wiki: WordPress, Blogger (tulisan berkala pribadi); Wikipedia (disunting bersama oleh banyak orang).',
          'Game Online & Chat: Mobile Legends, Minecraft, Roblox, WhatsApp, Telegram.',
          'Platform Kelas & Kolaborasi: Google Classroom, Google Workspace, Microsoft Teams.',
          'Teknologi Imersif (VR): Virtual Reality (lingkungan maya 3D penuh, misal Meta Quest, Pico 4, Google Cardboard).',
          'Teknologi Imersif (AR): Augmented Reality (menggabungkan elemen digital dengan dunia nyata, misal Pokemon Go, filter Instagram).',
          'Mixed Reality (MR) & Metaverse: Kombinasi VR & AR yang saling berinteraksi (Microsoft HoloLens) dan dunia simulasi bersama yang luas untuk bekerja, bermain, dan belanja.'
        ],
        iconName: 'Layers'
      },
      {
        title: 'D. Etika Berkomunikasi di Ruang Publik Virtual',
        explanation: 'Etika digital adalah kumpulan prinsip dan aturan yang mengatur perilaku seseorang ketika menggunakan teknologi digital dan internet agar terhindar dari konflik, kesalahpahaman, dan kerugian hukum.',
        bulletPoints: [
          'Alasan Penting: Menjaga privasi data diri & orang lain, menghormati orang lain, menggunakan informasi secara bijak, dan berkomunikasi sopan.',
          '10 Perilaku Etika Digital Baik: Bersikap sopan & santun; Berpikir sebelum memposting (Think Before You Post); Gunakan bahasa baik; Hindari plagiarisme; Periksa kebenaran informasi sebelum membagikan (anti hoaks).',
          'Lanjutan 10 Etika: Minta izin sebelum posting foto/data pribadi orang lain; Jangan terpancing komentar negatif; Hindari penggunaan HURUF KAPITAL berlebihan (dianggap berteriak); Tulis pesan ke guru dengan salam & format santun; Gunakan perangkat secara seimbang (tidak kecanduan).'
        ],
        iconName: 'MessageSquareWarning'
      },
      {
        title: 'E. Mindfulness Digital: Toleransi & Empati Digital',
        explanation: 'Mindfulness digital adalah sikap sadar, bijak, dan bertanggung jawab ketika menggunakan teknologi digital. Membantu seseorang untuk berpikir sebelum bertindak di dunia digital, menjaga etika, serta menghargai orang lain.',
        bulletPoints: [
          'Toleransi Digital: Sikap menerima dan menghargai perbedaan pendapat, budaya, gaya komunikasi (singkat vs formal), kemampuan teknologi yang beragam, serta preferensi privasi orang lain.',
          'Empati Digital: Kemampuan memahami perasaan orang lain saat berinteraksi melalui media digital tanpa bisa melihat ekspresi wajah atau bahasa tubuh secara langsung.',
          'Penerapan Empati: Memahami suasana hati orang lain sebelum merespons, berkomunikasi dengan kata-kata positif, menghargai sudut pandang berbeda, memberikan dukungan bagi teman yang kesusahan, dan menghindari perilaku negatif (cyberbullying, trolling, ejekan kasar).'
        ],
        iconName: 'HeartHandshake'
      },
      {
        title: 'F. Kolaborasi Efektif di Ruang Publik Virtual',
        explanation: 'Kolaborasi digital adalah kegiatan bekerja sama dengan orang lain melalui platform digital untuk menyelesaikan tugas atau mencapai tujuan bersama secara efisien tanpa harus berada di lokasi fisik yang sama.',
        bulletPoints: [
          'Platform Populer: Google Workspace (Google Docs, Sheets, Drive, Meet), Microsoft 365 / Teams, Zoom, Slack.',
          '7 Kunci Sukses Kolaborasi: Menentukan tujuan bersama; Menyepakati pembagian tugas yang jelas & adil; Berkomunikasi secara teratur; Mengadakan pertemuan berkala terencana; Menggunakan platform yang tepat; Menghargai masukan ide anggota tim; Menjaga keseimbangan aktivitas layar (istirahat mata).',
          '3 Tantangan Utama: Perbedaan zona waktu anggota tim, ketergantungan pada kestabilan koneksi internet, dan potensi kesalahpahaman komunikasi jika instruksi tidak ditulis dengan jelas.'
        ],
        iconName: 'Users'
      }
    ],
    comparisonTable: {
      title: 'Tabel Perbandingan: Dimensi Ruang Publik Konvensional vs Ruang Publik Virtual',
      headers: ['Aspek Pembeda', 'Ruang Publik Nyata / Fisik', 'Ruang Publik Virtual'],
      rows: [
        ['Wujud Tempat', 'Fisik berwujud nyata (taman, pasar, kafe, perpustakaan)', 'Maya / digital berupa kode data di jaringan internet'],
        ['Jangkauan Wilayah', 'Terbatas oleh jarak geografis dan lokasi sekitar', 'Global melintasi kota, pulau, bahkan antarnegara'],
        ['Waktu Kunjungan', 'Dibatasi jam operasional buka dan tutup tempat', 'Dapat diakses 24 jam nonstop setiap hari'],
        ['Identitas Pengguna', 'Tatap muka langsung, wajah dan suara terlihat jelas', 'Dapat menggunakan profil avatar atau nama samaran (anonim)'],
        ['Media Komunikasi', 'Ucapan lisan langsung dan gerak tubuh alami', 'Teks, suara digital, panggilan video, stiker, dan avatar 3D'],
        ['Penyimpanan Jejak', 'Percakapan berlalu seiring waktu tanpa rekaman', 'Tinggalkan jejak digital (chat, riwayat log, riwayat versi)']
      ]
    },
    flowDiagram: {
      title: 'Alur Penerapan Mindfulness Digital Sebelum Mengunggah / Merespons Konten',
      steps: [
        { step: 1, title: 'Amati Konten', desc: 'Membaca atau melihat informasi dengan tenang dan utuh tanpa langsung bereaksi emosional.' },
        { step: 2, title: 'Validasi Fakta', desc: 'Memeriksa apakah sumber informasi kredibel dan bukan merupakan berita bohong (hoaks).' },
        { step: 3, title: 'Gunakan Empati', desc: 'Membayangkan dampak kata-kata atau postingan kita terhadap perasaan orang lain.' },
        { step: 4, title: 'Pilih Bahasa Santun', desc: 'Mengetik pesan dengan bahasa baik, sopan, tanpa huruf kapital berlebihan, dan menghindari kata kasar.' },
        { step: 5, title: 'Bagikan / Selesaikan', desc: 'Mengirimkan pesan positif yang bermanfaat dan mendukung kebaikan bersama di ruang digital.' }
      ]
    },
    dailyLifeExamples: [
      'Grup WhatsApp kelas 9 SMPN 5 Kroya yang dimanfaatkan untuk koordinasi piket kelas dan berbagi informasi pengumuman sekolah.',
      'Siswa mengerjakan laporan kelompok praktikum IPA secara bersamaan di Google Docs dari rumah masing-masing pada sore hari.',
      'Menggunakan filter kamera Instagram (Augmented Reality) yang menambahkan kacamata 3D lucu di wajah saat berfoto bersama teman.',
      'Belajar topik sejarah candi Indonesia secara imersif menggunakan kacamata Virtual Reality (VR) di laboratorium sekolah.',
      'Menanyakan materi sulit di forum tanya-jawab Brainly atau Quora dan saling membantu menjawab soal teman lain dengan sopan.'
    ],
    schoolExamples: [
      'Guru Informatika (Bapak Rifani, S.Kom) membagikan tugas di Google Classroom dan membuka ruang diskusi daring antarpeserta didik.',
      'Penyusunan jadwal kegiatan ekstrakurikuler Pramuka secara terpadu menggunakan lembar kerja kolaboratif Google Sheets.',
      'Kampanye sekolah anti-cyberbullying dengan poster digital edukasi yang disebarkan di portal web resmi smpn5kroya.sch.id.',
      'Diskusi kelompok persiapan Asesmen Sumatif Akhir Semester menggunakan video conference Google Meet saat belajar mandiri di rumah.'
    ],
    tahukahKamu: 'Istilah "Metaverse" pertama kali dicetuskan dalam novel fiksi ilmiah Snow Crash tahun 1992 oleh Neal Stephenson, menggambarkan dunia realitas virtual bersama tempat orang berinteraksi melalui avatar 3D. Kini konsep tersebut benar-benar diwujudkan oleh teknologi modern!',
    faktaMenarik: 'Mengetik pesan dengan SELURUH HURUF KAPITAL di internet dalam etika netiket digital internasional dianggap sama dengan BERTERIAK DENGAN EMOSI KASAR kepada lawan bicara.',
    infoPenting: 'Jejak digital (digital footprint) yang kita tinggalkan di ruang publik virtual bersifat abadi dan sulit dihapus sepenuhnya. Selalu terapkan prinsip THINK (Is it True, Helpful, Inspiring, Necessary, Kind) sebelum memposting sesuatu!',
    commonMistakes: [
      'Menganggap ruang publik virtual sebagai ruang privat bebas aturan sehingga seenaknya menghujat atau mencela orang lain.',
      'Menyebarkan tautan atau berita heboh ke grup chat tanpa mengecek kebenaran sumber beritanya terlebih dahulu.',
      'Mengabaikan pembagian tugas saat kerja kelompok daring dan hanya mengandalkan satu orang teman untuk menyelesaikan dokumen.',
      'Mengunggah foto atau nomor telepon pribadi teman ke media sosial umum tanpa meminta izin yang bersangkutan.',
      'Terlalu lama menatap layar gawai tanpa jeda istirahat sehingga memicu kelelahan fisik, mata kering, dan stres digital.'
    ],
    summary: [
      'Ruang publik virtual adalah wadah digital di internet tempat manusia berkomunikasi, bertukar gagasan, dan berkolaborasi secara luas.',
      'Karakteristik utamanya meliputi aksesibilitas tinggi, adanya anonimitas, interaktivitas dua arah, dinamika tren yang cepat, dan sifatnya yang global.',
      'Platform digital berkembang dari forum teks sederhana menuju teknologi imersif seperti Augmented Reality (AR), Virtual Reality (VR), dan Metaverse.',
      'Pemanfaatan ruang publik virtual harus dibentengi dengan etika berkomunikasi santun dan sikap mindfulness digital (toleransi dan empati digital).',
      'Kolaborasi digital yang sukses menuntut tujuan jelas, pembagian tugas adil, komunikasi rutin, rasa saling menghargai, serta manajemen waktu layar yang seimbang.'
    ],
    formativeCheck: [
      {
        question: 'Manakah di bawah ini yang membedakan ruang publik virtual dengan ruang fisik nyata?',
        options: [
          'Ruang virtual memiliki jangkauan tanpa batas geografis dan dapat diakses kapan saja',
          'Ruang virtual selalu memerlukan izin bertemu langsung tatap muka',
          'Ruang virtual hanya bisa diakses oleh orang dalam satu RT',
          'Ruang virtual tidak pernah mengalami perubahan tren teknologi'
        ],
        answerIndex: 0,
        explanation: 'Ruang virtual melampaui batasan jarak fisik dan dapat diakses fleksibel selama terhubung internet.'
      },
      {
        question: 'Sikap yang benar saat mendapati teman berbeda pendapat di grup diskusi daring adalah...',
        options: [
          'Menerapkan toleransi digital dengan menghargai sudut pandangnya secara santun',
          'Langsung mengeluarkan teman tersebut dari grup obrolan',
          'Menyerang pribadinya dengan kata-kata kasar dan huruf kapital',
          'Mengajak anggota lain untuk merundung (cyberbullying) teman tersebut'
        ],
        answerIndex: 0,
        explanation: 'Toleransi digital mengajarkan kita menerima dan menghargai keragaman pemikiran di dunia maya.'
      }
    ]
  },
  simulasi: {
    type: 'categorize',
    title: 'Simulasi Studi Kasus & Klasifikasi Etika Ruang Publik Virtual',
    scenario: 'Pilah tindakan dan situasi ke dalam kategori yang tepat: Etika Terpuji, Pelanggaran Etika Siber, atau Sikap Mindfulness Digital.',
    instructions: 'Baca setiap skenario studi kasus sehari-hari siswa SMP, kemudian tentukan keputusan terbaik yang mencerminkan kecakapan digital siswa berkarakter.',
    data: {
      categories: ['Etika Terpuji', 'Pelanggaran Etika', 'Mindfulness Digital']
    }
  },
  miniGame: {
    type: 'detective',
    title: 'Detektif Ruang Publik Virtual',
    description: 'Bantu Robot Edukasi memecahkan tantangan interaksi di ruang publik virtual, uji pengetahuan di Battle Bot, dan tebak istilah digital!',
    questions: [
      {
        id: 1,
        question: 'Teknologi yang menggabungkan elemen grafik digital dengan dunia nyata pada kamera ponsel adalah...',
        options: ['Augmented Reality (AR)', 'Virtual Reality (VR)', 'Hardware CPU', 'Topologi Star'],
        correctIndex: 0
      }
    ]
  },
  kuis: [
    {
      id: 1,
      question: 'Ruang publik virtual memiliki fungsi yang serupa dengan taman atau kafe di dunia nyata karena...',
      options: [
        { label: 'A', text: 'Menjadi tempat berkumpul, berdiskusi, dan berinteraksi sosial antarmanusia' },
        { label: 'B', text: 'Menjual makanan dan minuman secara fisik' },
        { label: 'C', text: 'Memiliki tanaman bunga yang harus disiram setiap pagi' },
        { label: 'D', text: 'Hanya dapat dikunjungi jika berjalan kaki' }
      ],
      correctAnswer: 'A',
      explanation: 'Ruang publik virtual adalah padanan digital dari tempat berkumpul sosial di dunia nyata.',
      competencyLevel: 'Pemahaman (LOTS)'
    },
    {
      id: 2,
      question: 'Karakteristik ruang publik virtual yang menunjukkan bahwa bentuk dan isinya terus berubah mengikuti tren teknologi disebut...',
      options: [
        { label: 'A', text: 'Dinamika' },
        { label: 'B', text: 'Aksesibilitas' },
        { label: 'C', text: 'Anonimitas' },
        { label: 'D', text: 'Statik' }
      ],
      correctAnswer: 'A',
      explanation: 'Dinamika berarti isi dan bentuk ruang publik virtual terus berkembang seiring preferensi pengguna.',
      competencyLevel: 'Pemahaman (LOTS)'
    },
    {
      id: 3,
      question: 'Platform seperti Wikipedia yang memuat artikel ensiklopedia yang dapat disunting bersama oleh banyak pengguna tergolong jenis...',
      options: [
        { label: 'A', text: 'Wiki' },
        { label: 'B', text: 'E-Commerce' },
        { label: 'C', text: 'Virtual Reality' },
        { label: 'D', text: 'Aplikasi Chatting' }
      ],
      correctAnswer: 'A',
      explanation: 'Wiki adalah situs web kolaboratif yang isinya dapat disunting bersama oleh komunitas pengguna.',
      competencyLevel: 'Pemahaman (LOTS)'
    },
    {
      id: 4,
      question: 'Perbedaan mendasar antara Virtual Reality (VR) dan Augmented Reality (AR) adalah...',
      options: [
        { label: 'A', text: 'VR membawa pengguna sepenuhnya masuk dunia maya 3D, sedangkan AR menyisipkan elemen digital ke dunia nyata' },
        { label: 'B', text: 'VR hanya berupa teks tulisan, sedangkan AR berupa panggilan suara saja' },
        { label: 'C', text: 'AR memerlukan headset tertutup penuh, sedangkan VR tidak memakai alat apapun' },
        { label: 'D', text: 'VR sudah punah ditinggalkan, sedangkan AR baru akan dibuat di masa depan' }
      ],
      correctAnswer: 'A',
      explanation: 'VR memutus kontak fisik dan membawa pengguna ke dunia maya penuh, sedangkan AR memperkaya dunia nyata dengan objek digital.',
      competencyLevel: 'Penerapan (MOTS)'
    },
    {
      id: 5,
      question: 'Salah satu dampak negatif ruang publik virtual yang berupa tindakan perundungan atau ejekan kasar secara berulang di dunia maya adalah...',
      options: [
        { label: 'A', text: 'Cyberbullying' },
        { label: 'B', text: 'E-Learning' },
        { label: 'C', text: 'Coding' },
        { label: 'D', text: 'Brainstorming' }
      ],
      correctAnswer: 'A',
      explanation: 'Cyberbullying adalah perundungan di dunia maya yang sangat merugikan kesehatan mental korban.',
      competencyLevel: 'Pemahaman (LOTS)'
    },
    {
      id: 6,
      question: 'Mengapa dalam etika komunikasi digital kita dilarang menggunakan huruf kapital semua saat mengetik pesan?',
      options: [
        { label: 'A', text: 'Karena diartikan sebagai ekspresi marah atau berteriak kepada lawan bicara' },
        { label: 'B', text: 'Karena membuat memori HP penerima cepat penuh' },
        { label: 'C', text: 'Karena huruf kapital menghabiskan kuota internet dua kali lipat' },
        { label: 'D', text: 'Karena keyboard ponsel akan otomatis terkunci' }
      ],
      correctAnswer: 'A',
      explanation: 'Dalam etika netiket digital, mengetik dengan huruf kapital seluruhnya dianggap berteriak dengan emosi tidak sopan.',
      competencyLevel: 'Penalaran (HOTS)'
    },
    {
      id: 7,
      question: 'Rani melihat temannya sedang bersedih di status media sosial. Sebelum mengirim komentar, Rani memikirkan kata-kata penghibur yang tidak menyinggung perasaannya. Sikap Rani mencerminkan...',
      options: [
        { label: 'A', text: 'Empati digital' },
        { label: 'B', text: 'Plagiarisme digital' },
        { label: 'C', text: 'Anonimitas palsu' },
        { label: 'D', text: 'Cyberstalking' }
      ],
      correctAnswer: 'A',
      explanation: 'Empati digital adalah kemampuan memahami dan merasakan situasi emosional orang lain di dunia maya.',
      competencyLevel: 'Penerapan (MOTS)'
    },
    {
      id: 8,
      question: 'Berikut ini yang merupakan platform kolaborasi digital untuk mengedit dokumen teks bersama secara simultan di cloud adalah...',
      options: [
        { label: 'A', text: 'Google Docs' },
        { label: 'B', text: 'Kalkulator bawaan Windows' },
        { label: 'C', text: 'Pemutar musik MP3 offline' },
        { label: 'D', text: 'Game solitaire offline' }
      ],
      correctAnswer: 'A',
      explanation: 'Google Docs memungkinkan anggota tim menyunting teks dokumen bersama secara real-time.',
      competencyLevel: 'Pemahaman (LOTS)'
    },
    {
      id: 9,
      question: 'Dalam kerja kelompok daring tugas Informatika, tindakan apa yang paling tepat untuk mengatasi tantangan perbedaan koneksi internet antaranggota?',
      options: [
        { label: 'A', text: 'Menyepakati tenggat waktu bertahap dan membagi tugas secara jelas agar anggota yang sinyalnya lambat tetap bisa berkontribusi' },
        { label: 'B', text: 'Langsung mencoret nama teman yang internetnya lambat dari lembar tugas' },
        { label: 'C', text: 'Memaksa semua anggota untuk membeli router Wi-Fi baru' },
        { label: 'D', text: 'Membatalkan seluruh tugas kelompok' }
      ],
      correctAnswer: 'A',
      explanation: 'Kerja sama yang baik mencari solusi toleran dan inklusif terhadap keterbatasan koneksi anggota tim.',
      competencyLevel: 'Penalaran (HOTS)'
    },
    {
      id: 10,
      question: 'Dunia simulasi digital bersama di mana pengguna dapat bekerja, bersosialisasi, bermain, hingga berbelanja menggunakan avatar digital yang diproyeksikan sebagai masa depan ruang publik virtual adalah...',
      options: [
        { label: 'A', text: 'Metaverse' },
        { label: 'B', text: 'Friendster' },
        { label: 'C', text: 'Buku teks cetak' },
        { label: 'D', text: 'Papan tulis kapur' }
      ],
      correctAnswer: 'A',
      explanation: 'Metaverse dirancang sebagai ekosistem dunia virtual terpadu tempat manusia beraktivitas secara simultan.',
      competencyLevel: 'Pemahaman (LOTS)'
    }
  ],
  asesmenAkhir: [
    {
      id: 1,
      question: 'Ruang publik virtual didefinisikan sebagai ruang atau tempat di dunia digital yang memungkinkan masyarakat untuk...',
      options: [
        { label: 'A', text: 'Berkomunikasi, berbagi informasi, dan beraktivitas sosial secara daring melalui internet' },
        { label: 'B', text: 'Menyimpan perangkat keras server di gedung laboratorium tertutup' },
        { label: 'C', text: 'Membeli komputer dengan harga murah di toko elektronik' },
        { label: 'D', text: 'Menghapus jaringan internet di seluruh wilayah' }
      ],
      correctAnswer: 'A',
      explanation: 'Ruang publik virtual adalah media tempat terjadinya komunikasi dan aktivitas sosial melalui internet.',
      points: 10
    },
    {
      id: 2,
      question: 'Manakah urutan evolusi ruang publik digital yang tepat dari masa lalu hingga masa depan sesuai sketsa revolusi digital?',
      options: [
        { label: 'A', text: 'Masa Ditinggalkan (Kakao/Friendster) -> Masa Saat Ini (Instagram/WhatsApp) -> Direncanakan (VR/MR) -> Masa Datang (Metaverse)' },
        { label: 'B', text: 'Metaverse -> Friendster -> WhatsApp -> Telegram' },
        { label: 'C', text: 'Virtual Reality -> Kakao -> Mesin Ketik -> Telepon Kabel' },
        { label: 'D', text: 'TikTok -> Friendster -> Buku Ensiklopedia -> Surat Kabar' }
      ],
      correctAnswer: 'A',
      explanation: 'Bagan revolusi digital bergerak dari media sosial awal, platform populer saat ini, teknologi imersif VR/MR, menuju Metaverse.',
      points: 10
    },
    {
      id: 3,
      question: 'Ciri ruang publik virtual di mana informasi dan diskusi dapat melibatkan orang-orang dari berbagai penjuru negara dan latar belakang budaya adalah karakteristik...',
      options: [
        { label: 'A', text: 'Global' },
        { label: 'B', text: 'Anonimitas' },
        { label: 'C', text: 'Lokal' },
        { label: 'D', text: 'Terisolasi' }
      ],
      correctAnswer: 'A',
      explanation: 'Karakteristik global menunjukkan ruang publik virtual melampaui batas-batas teritorial dan geografis negara.',
      points: 10
    },
    {
      id: 4,
      question: 'Tindakan yang merupakan contoh penerapan "Mindfulness Digital" dalam kehidupan sehari-hari siswa kelas 9 adalah...',
      options: [
        { label: 'A', text: 'Berpikir kritis sebelum membagikan informasi agar tidak menjadi penyebar berita bohong (hoaks)' },
        { label: 'B', text: 'Membalas komentar ejekan dengan kata-kata yang jauh lebih kasar' },
        { label: 'C', text: 'Bermain game daring tanpa henti hingga melupakan waktu salat dan istirahat' },
        { label: 'D', text: 'Menyebarkan foto aib teman di media sosial untuk bercanda' }
      ],
      correctAnswer: 'A',
      explanation: 'Mindfulness digital menuntut kesadaran penuh akan dampak dari setiap tindakan dan informasi yang kita bagikan.',
      points: 10
    },
    {
      id: 5,
      question: 'Salah satu tantangan etika terbesar di ruang publik virtual yang muncul akibat adanya fasilitas nama samaran (anonimitas) adalah...',
      options: [
        { label: 'A', text: 'Meningkatnya keberanian oknum pengguna untuk menyebarkan ujaran kebencian dan perundungan karena merasa identitas aslinya tersembunyi' },
        { label: 'B', text: 'Komputer menjadi lebih lambat saat memuat halaman web' },
        { label: 'C', text: 'Baterai perangkat seluler menjadi lebih cepat habis' },
        { label: 'D', text: 'Harga paket data internet menjadi naik drastis' }
      ],
      correctAnswer: 'A',
      explanation: 'Anonimitas sering kali disalahgunakan oleh pihak tidak bertanggung jawab untuk berbuat jahat tanpa takut ketahuan.',
      points: 10
    },
    {
      id: 6,
      question: 'Perangkat teknologi seperti Microsoft HoloLens yang menggabungkan elemen grafis digital dan dunia nyata sehingga keduanya dapat berinteraksi secara bersamaan disebut...',
      options: [
        { label: 'A', text: 'Mixed Reality (MR)' },
        { label: 'B', text: 'Radio Analog' },
        { label: 'C', text: 'Mesin Fax' },
        { label: 'D', text: 'Proyektor Slide Kuno' }
      ],
      correctAnswer: 'A',
      explanation: 'Mixed Reality (MR) adalah perpaduan interaktif antara elemen dunia nyata dengan grafis digital maya.',
      points: 10
    },
    {
      id: 7,
      question: 'Dalam etika berkirim pesan kepada bapak/ibu guru melalui aplikasi chat, format yang paling tepat dan sopan adalah...',
      options: [
        { label: 'A', text: 'Mengucapkan salam, memperkenalkan diri dengan nama dan kelas, menyampaikan maksud dengan santun, serta mengucapkan terima kasih' },
        { label: 'B', text: 'Mengetik "P" berkali-kali sampai guru membalas pesan' },
        { label: 'C', text: 'Langsung bertanya tanpa salam dengan huruf kapital semua' },
        { label: 'D', text: 'Mengirimkan stiker meme lucu saat jam tengah malam' }
      ],
      correctAnswer: 'A',
      explanation: 'Format etis berkirim pesan kepada guru mencakup salam hormat, identitas diri yang jelas, maksud sopan, dan salam penutup.',
      points: 10
    },
    {
      id: 8,
      question: 'Sikap "Toleransi Digital" tercermin ketika seorang pengguna internet...',
      options: [
        { label: 'A', text: 'Menghargai keberagaman budaya, sudut pandang, dan tingkat kemampuan teknologi pengguna lain yang berbeda dengannya' },
        { label: 'B', text: 'Memaksa semua orang di kolom komentar untuk menyetujui pendapat pribadinya' },
        { label: 'C', text: 'Melaporkan akun teman yang memiliki hobi berbeda' },
        { label: 'D', text: 'Membajak akun teman sekelas untuk mengganti foto profilnya' }
      ],
      correctAnswer: 'A',
      explanation: 'Toleransi digital adalah kesediaan menerima dan menghargai keberagaman latar belakang orang lain di dunia maya.',
      points: 10
    },
    {
      id: 9,
      question: 'Fitur "Riwayat Versi" (Version History) pada platform kolaborasi Google Workspace sangat bermanfaat bagi tim kerja karena...',
      options: [
        { label: 'A', text: 'Dapat melihat siapa yang mengedit dokumen dan memulihkan kembali teks jika terjadi kesalahan penghapusan yang tidak sengaja' },
        { label: 'B', text: 'Mengubah warna tampilan layar monitor secara acak' },
        { label: 'C', text: 'Mempercepat kecepatan internet sekolah secara otomatis' },
        { label: 'D', text: 'Menghapus seluruh file tugas di komputer' }
      ],
      correctAnswer: 'A',
      explanation: 'Riwayat versi mencatat jejak perubahan dan memungkinkan pemulihan dokumen secara aman.',
      points: 10
    },
    {
      id: 10,
      question: 'Tujuan utama menjaga keseimbangan antara aktivitas di ruang publik virtual dengan kehidupan nyata (digital wellbeing) adalah...',
      options: [
        { label: 'A', text: 'Mencegah kecanduan gawai, menjaga kesehatan mata dan mental, serta memelihara interaksi sosial yang sehat dengan keluarga dan masyarakat sekitar' },
        { label: 'B', text: 'Agar baterai smartphone tidak perlu diisi daya selama satu bulan' },
        { label: 'C', text: 'Menghindari biaya tagihan listrik rumah' },
        { label: 'D', text: 'Membuat akun media sosial memiliki pengikut (followers) terbanyak' }
      ],
      correctAnswer: 'A',
      explanation: 'Keseimbangan digital menjamin kesehatan mental, kesehatan fisik, serta keharmonisan hubungan sosial di dunia nyata.',
      points: 10
    }
  ]
};
