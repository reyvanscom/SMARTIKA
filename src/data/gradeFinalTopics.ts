import { Topic } from '../types/curriculum';

export const GRADE_FINAL_TOPICS: Topic[] = [
  // =========================================================================
  // KELAS 7 - INFORMASI DIGITAL DAN KREDIBILITAS SUMBER INFORMASI (VERSI SEDERHANA SMP)
  // =========================================================================
  {
    id: 'k7-idk',
    grade: 7,
    title: 'Informasi Digital dan Kredibilitas Sumber Informasi',
    category: 'Literasi Digital SMP',
    shortDesc: 'Belajar memahami pengertian, manfaat, jenis-jenis, cara mencari informasi di internet, dan cara mudah memilih sumber yang terpercaya untuk tugas sekolah.',
    learningObjectives: [
      'Memahami pengertian informasi digital dalam kehidupan sehari-hari.',
      'Menyebutkan berbagai manfaat informasi digital bagi pelajar SMP.',
      'Mengenal jenis-jenis informasi digital (teks, gambar, audio, dan video).',
      'Mempraktikkan cara mencari informasi di internet menggunakan kata kunci yang tepat.',
      'Mengetahui ciri-ciri sumber informasi yang terpercaya (kredibel) dan yang meragukan.'
    ],
    apersepsi: {
      imagePromptDesc: 'Dua siswa SMP berseragam rapi sedang berdiskusi di depan laptop di perpustakaan sekolah, membandingkan dua halaman web untuk tugas Informatika.',
      videoTitle: 'Kenapa Orang Cerdas Pun Bisa Termakan Hoax? (Edukasi Kredibilitas Informasi)',
      videoDuration: '04:12',
      videoThumbnail: 'https://i.ytimg.com/vi/EUiVtW-45Ss/hqdefault.jpg',
      videoDescription: 'Panduan seru untuk anak SMP: memahami psikologi kenapa informasi palsu cepat menyebar dan cara kritis menyaring sumber berita terpercaya.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=EUiVtW-45Ss',
      realLifeStory: 'Suatu hari di kelas 7 SMP Negeri 5 Kroya, Rizky dan Nisa mendapat tugas membuat laporan tentang "Hewan Langka di Indonesia". Rizky langsung mengeklik link pertama dari blog gratisan tanpa nama penulis yang menulis bahwa komodo bisa terbang. Sementara itu, Nisa membuka portal resmi Taman Nasional Komodo di situs pemerintah (.go.id) yang dilengkapi foto dan data habitat asli. Menurutmu, mengapa informasi yang didapat Rizky dan Nisa sangat berbeda, dan apa yang harus dilakukan agar kita tidak salah memilih informasi?',
      triggerQuestions: [
        'Apakah semua tulisan dan gambar yang ada di internet itu pasti benar?',
        'Mengapa kita tidak boleh langsung percaya pada informasi dari blog atau status media sosial tanpa nama pembuatnya?',
        'Bagaimana cara membedakan situs web resmi sekolah/pemerintah dengan situs web buatan orang sembarangan?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Apa yang dimaksud dengan informasi digital secara sederhana?',
        options: [
          { label: 'A', text: 'Informasi berbentuk teks, gambar, suara, atau video yang dibuat dan diakses lewat perangkat elektronik' },
          { label: 'B', text: 'Buku cetak tebal yang disimpan di lemari perpustakaan' },
          { label: 'C', text: 'Surat kabar koran yang dicetak menggunakan kertas' },
          { label: 'D', text: 'Papan tulis hitam yang ditulis memakai kapur' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Pengertian Informasi Digital',
        recommendation: 'Informasi digital disimpan dalam bentuk file elektronik (0 dan 1) di HP atau komputer.'
      },
      {
        id: 2,
        question: 'Salah satu manfaat utama informasi digital bagi siswa SMP kelas 7 adalah...',
        options: [
          { label: 'A', text: 'Mempermudah mencari materi belajar dan wawasan ilmu kapan saja dan di mana saja' },
          { label: 'B', text: 'Membuat kita tidak perlu lagi belajar dan mengerjakan tugas' },
          { label: 'C', text: 'Menghabiskan waktu untuk bermain game online seharian' },
          { label: 'D', text: 'Membuat baterai HP cepat habis' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Manfaat Informasi Digital',
        recommendation: 'Informasi digital membuka akses ilmu pengetahuan luas secara cepat dan praktis.'
      },
      {
        id: 3,
        question: 'File rekaman suara guru yang menjelaskan materi pelajaran termasuk ke dalam jenis informasi digital berupa...',
        options: [
          { label: 'A', text: 'Audio digital' },
          { label: 'B', text: 'Teks digital' },
          { label: 'C', text: 'Gambar diam' },
          { label: 'D', text: 'Kertas cetak' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Jenis Informasi Digital',
        recommendation: 'Suara/rekaman adalah audio, tulisan adalah teks, foto adalah gambar, dan video adalah gambar bergerak.'
      },
      {
        id: 4,
        question: 'Saat mencari informasi tentang "Tata Surya" di Google, langkah pertama yang paling tepat adalah...',
        options: [
          { label: 'A', text: 'Mengetikkan kata kunci (keywords) yang jelas dan sesuai topik yang dicari' },
          { label: 'B', text: 'Mengetikkan seluruh isi buku pelajaran ke kolom pencarian' },
          { label: 'C', text: 'Menutup browser dan menunggu informasi datang sendiri' },
          { label: 'D', text: 'Mengeklik iklan belanja yang muncul di layar' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Cara Mencari Informasi Digital',
        recommendation: 'Gunakan kata kunci ringkas dan tepat agar mesin pencari menampilkan hasil yang relevan.'
      },
      {
        id: 5,
        question: 'Sebuah artikel di internet disebut kredibel (dapat dipercaya) jika...',
        options: [
          { label: 'A', text: 'Ditulis oleh penulis/lembaga yang jelas, faktanya benar, dan bukan sekadar gosip' },
          { label: 'B', text: 'Memiliki judul yang sangat heboh dan membuat kaget pembaca' },
          { label: 'C', text: 'Dikirim oleh orang tidak dikenal lewat pesan berantai WhatsApp' },
          { label: 'D', text: 'Banyak memuat gambar kartun yang bergerak-gerak' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Kredibilitas Sumber Informasi',
        recommendation: 'Kredibel artinya dapat dipertanggungjawabkan kebenarannya dan berasal dari sumber terpercaya.'
      }
    ],
    materi: {
      overview: 'Di era digital sekarang, kita bisa menemukan jutaan informasi hanya dalam satu detik melalui smartphone atau laptop! Tapi tahukah kamu, tidak semua informasi di internet itu benar lho. Yuk, kita pelajari 5 hal penting: pengertian informasi digital, manfaatnya, jenis-jenisnya, cara mencarinya, dan cara memilih sumber yang terpercaya!',
      keyConcepts: [
        {
          title: '1. Pengertian Informasi Digital',
          explanation: 'Informasi digital adalah data atau kabar berita yang telah diolah dan disimpan dalam bentuk format elektronik (digital), sehingga dapat dibuat, dibaca, dan dibagikan menggunakan perangkat seperti komputer, laptop, tablet, atau smartphone.',
          bulletPoints: [
            'Bentuknya bukan kertas fisik, melainkan file digital yang disimpan di memori HP, komputer, atau di awan (internet).',
            'Sangat mudah disalin, dikirim ke teman, dan diperbarui kapan saja dalam hitungan detik.',
            'Contoh sehari-hari: pesan WhatsApp, modul PDF Informatika, video YouTube edukasi, dan situs berita online.'
          ],
          iconName: 'Cpu'
        },
        {
          title: '2. Manfaat Informasi Digital',
          explanation: 'Kehadiran informasi digital membawa banyak sekali kemudahan luar biasa bagi pelajar SMP:',
          bulletPoints: [
            'Cepat & Praktis: Membantu kita menemukan jawaban tugas sekolah tanpa harus membuka lemari buku perpustakaan berjam-jam.',
            'Belajar Kapan Saja & Di Mana Saja: Materi pelajaran bisa dibaca dari rumah, sekolah, maupun saat bepergian.',
            'Variasi Media Menarik: Belajar jadi lebih asyik karena ada perpaduan warna, animasi, infografis, dan video penjelasan.',
            'Memudahkan Berbagi & Diskusi: Tugas kelompok dapat dikerjakan bersama lewat internet tanpa harus selalu bertemu fisik.'
          ],
          iconName: 'Award'
        },
        {
          title: '3. Jenis-Jenis Informasi Digital',
          explanation: 'Informasi digital terbagi menjadi 4 kelompok utama berdasarkan bentuknya:',
          bulletPoints: [
            'Teks Digital: Tulisan elektronik seperti artikel web, e-book buku paket, catatan di HP, dan dokumen PDF/Word.',
            'Gambar & Infografis Digital: Foto hasil jepretan kamera HP, diagram alur, gambar kartun, atau poster panduan belajar (format JPG, PNG).',
            'Audio Digital: Informasi dalam bentuk gelombang suara, seperti rekaman suara guru, podcast edukasi, dan musik instrumen belajar (format MP3, WAV).',
            'Video Digital: Gabungan gambar bergerak dan suara, seperti animasi sains, tutorial coding di YouTube, dan video rekaman praktikum (format MP4).'
          ],
          iconName: 'Bookmark'
        },
        {
          title: '4. Cara Mencari Informasi Digital yang Tepat',
          explanation: 'Agar cepat menemukan bahan tugas sekolah yang pas di mesin pencari (seperti Google):',
          bulletPoints: [
            'Tentukan Kata Kunci (Keywords) Spesifik: Misalnya ketik "ciri-ciri tumbuhan lumut kelas 7", jangan hanya mengetik "lumut".',
            'Gunakan Tanda Petik (" ") untuk Frasa Persis: Contoh: "SMP Negeri 5 Kroya" agar Google mencari rangkaian kata itu secara utuh.',
            'Pilih Sumber Resmi dan Aman: Cari yang memiliki alamat aman (awalan https:// dengan simbol gembok terkunci).',
            'Jangan Hanya Klik Hasil Pertama: Baca sekilas 2 atau 3 tautan teratas untuk membandingkan isinya.'
          ],
          iconName: 'Search'
        },
        {
          title: '5. Kredibilitas Sumber Informasi Digital',
          explanation: 'Kredibel artinya "dapat dipercaya dan diakui kebenarannya". Karena siapa saja bisa mengunggah tulisan ke internet, kita harus pintar memilih sumber:',
          bulletPoints: [
            'Periksa Siapa Penulisnya: Ada nama guru, pakar, atau lembaga resmi yang bertanggung jawab (bukan anonim/tanpa nama).',
            'Perhatikan Domain Alamat Web: Situs .go.id (pemerintah), .sch.id (sekolah resmi), .ac.id (universitas), dan kemdikbud.go.id jauh lebih terpercaya daripada blog gratisan.',
            'Periksa Tanggal Terbit: Pastikan infonya tidak basi atau kedaluwarsa, terutama untuk info jadwal dan aturan sekolah.',
            'Waspadai Judul Heboh (Clickbait): Hindari artikel yang memakai judul bombastis seperti "HEBOH! Kaget Semua Orang!", karena biasanya isinya hoaks atau bohong.',
            'Bandingkan dengan Sumber Lain: Bila sebuah info penting, cocokkan dengan buku paket resmi atau tanyakan kepada Guru Informatika!'
          ],
          iconName: 'ShieldCheck'
        }
      ],
      comparisonTable: {
        title: 'Tabel Cepat: Ciri Sumber Terpercaya vs Sumber Meragukan untuk Anak SMP',
        headers: ['Ciri-Ciri', 'Sumber Terpercaya (Kredibel) 👍', 'Sumber Meragukan (Waspada!) ⚠️'],
        rows: [
          ['Nama Penulis', 'Jelas (Guru, Peneliti, atau Dokter resmi)', 'Tidak ada nama penulis (anonim/admin tanpa identitas)'],
          ['Alamat Web (Domain)', '.sch.id, .go.id, .ac.id, portal resmi terdaftar', 'Blog gratisan (.blogspot, .wordpress tanpa nama pemilik)'],
          ['Gaya Bahasa', 'Sopan, jelas, ilmiah, dan mudah dimengerti', 'Banyak huruf kapital, heboh, menakut-nakuti, atau memancing amarah'],
          ['Iklan', 'Bersih dan fokus pada materi edukasi', 'Penuh iklan obat, judi, atau pop-up yang menutupi layar'],
          ['Tujuan Tulisan', 'Membagi ilmu dan mendidik siswa', 'Hanya mencari klik iklan (clickbait) atau menjual barang']
        ]
      },
      dailyLifeExamples: [
        'Membuka aplikasi Kamus Besar Bahasa Indonesia (KBBI) online di HP untuk mencari arti kata sulit pada tugas Bahasa Indonesia.',
        'Membaca informasi jadwal libur semester ganjil di website resmi SMP Negeri 5 Kroya daripada percaya kabar burung di grup chat.'
      ],
      schoolExamples: [
        'Siswa kelas 7 SMPN 5 Kroya menggunakan kata kunci "komponen penyusun komputer kelas 7" untuk membuat tugas presentasi di Google Slides.',
        'Menuliskan nama website dan judul artikel pada lembar tugas sekolah sebagai bentuk kejujuran belajar.'
      ],
      tahukahKamu: 'Di seluruh dunia, ada lebih dari 5 miliar orang yang menggunakan internet setiap hari, dan jutaan artikel baru diunggah setiap menitnya! Itulah mengapa kemampuan memilih info yang benar adalah "senjata super" bagi siswa zaman sekarang!',
      faktaMenarik: 'Domain web ".sch.id" hanya boleh dimiliki oleh sekolah resmi di Indonesia yang memiliki surat izin dari dinas pendidikan. Jadi jika ada info dari domain .sch.id, itu pasti dari sekolah resmi!',
      infoPenting: 'Jika kamu menemukan informasi yang mencurigakan atau menakut-nakuti di internet, jangan langsung dibagikan (share) ke teman atau grup! Tanyakan terlebih dahulu kepada bapak/ibu guru atau orang tua di rumah.',
      commonMistakes: [
        'Hanya menulis "Sumber: Google" pada tugas sekolah (Google itu seperti kantor pos atau pencari jalan, bukan yang menulis artikelnya!).',
        'Langsung percaya 100% pada pesan berantai di WhatsApp yang diawali kata "VIRALKAN!".',
        'Mengira semua foto di internet pasti asli, padahal sekarang foto bisa diedit atau dibuat dengan komputer.'
      ],
      summary: [
        'Informasi digital adalah informasi dalam format elektronik (teks, gambar, audio, video).',
        'Manfaatnya sangat besar untuk mempercepat belajar, menambah wawasan, dan mengerjakan tugas sekolah.',
        'Mencari informasi yang tepat dimulai dari kata kunci (keywords) yang jelas dan spesifik.',
        'Sumber yang kredibel memiliki penulis jelas, domain resmi (.go.id, .sch.id, .ac.id), fakta terbukti, dan bukan hoaks.'
      ],
      formativeCheck: [
        {
          question: 'Jika kamu ingin mencari tugas IPA tentang "Metamorfosis Kupu-Kupu", kata kunci pencarian manakah yang paling baik diketik di Google?',
          options: [
            'metamorfosis kupu-kupu materi ipa smp',
            'tolong beri saya info tentang kupu-kupu dong google',
            'kupu',
            'hewan terbang sayap warna warni'
          ],
          answerIndex: 0,
          explanation: 'Benar sekali! Kata kunci yang ringkas, jelas, dan spesifik akan memberikan hasil pencarian yang paling akurat untuk tugas sekolahmu.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Detektif Digital: Memilah Sumber Terpercaya vs Meragukan',
      scenario: 'Bantu siswa kelas 7 SMP Negeri 5 Kroya memilah 4 sumber bacaan tugas berikut ke dalam kelompok yang tepat!',
      instructions: 'Kelompokkan setiap sumber ke kotak "Sumber Terpercaya" atau "Sumber Meragukan".',
      data: {
        items: [
          { id: 'src-1', text: 'Artikel di situs resmi Kementerian Pendidikan (kemdikbud.go.id) lengkap dengan nama penulis dan tanggal 2026.', correctCategory: 'Sumber Terpercaya' },
          { id: 'src-2', text: 'Postingan blog gratisan tanpa nama penulis dengan judul heboh: "HEBOH! Makan Buah Ini Bikin Kamu Langsung Juara Kelas!".', correctCategory: 'Sumber Meragukan' },
          { id: 'src-3', text: 'Video edukasi animasi IPA dari kanal resmi Rumah Belajar Kemdikbud.', correctCategory: 'Sumber Terpercaya' },
          { id: 'src-4', text: 'Pesan berantai di WhatsApp dari nomor tak dikenal yang menyuruh menyebarkan pesan ke 10 grup.', correctCategory: 'Sumber Meragukan' }
        ],
        categories: ['Sumber Terpercaya', 'Sumber Meragukan']
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Tebak Kilat: Jenis & Ciri Informasi Digital',
      description: 'Uji kecepatan dan ketelitianmu mencocokkan istilah informasi digital dengan penjelasannya!',
      questions: [
        {
          id: 1,
          question: 'Contoh jenis informasi digital dalam bentuk "Audio" adalah...',
          options: ['Rekaman suara podcast penjelasan guru', 'Poster gambar foto berwarna', 'Dokumen ketikan Microsoft Word', 'Buku tulis bergaris'],
          correctIndex: 0,
          clue: 'Informasi yang didengar melalui telinga atau speaker.'
        },
        {
          id: 2,
          question: 'Ciri utama sumber informasi digital yang kredibel (dapat dipercaya) adalah...',
          options: ['Memiliki penulis atau lembaga resmi yang jelas', 'Judulnya heboh memakai huruf kapital semua', 'Banyak iklan pop-up yang menutupi layar', 'Penulisnya disembunyikan / anonim'],
          correctIndex: 0,
          clue: 'Ada pihak ahli yang bertanggung jawab atas isi tulisan.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Informasi digital adalah informasi yang disimpan dan diakses dalam bentuk...',
        options: [
          { label: 'A', text: 'File elektronik pada perangkat komputer atau smartphone' },
          { label: 'B', text: 'Kertas karton tebal' },
          { label: 'C', text: 'Batu prasasti kuno' },
          { label: 'D', text: 'Ukiran kayu di dinding' }
        ],
        correctAnswer: 'A',
        explanation: 'Informasi digital tersimpan secara elektronik dalam kode data komputer (0 dan 1).',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Manakah di bawah ini yang merupakan MANFAAT dari adanya informasi digital bagi siswa SMP?',
        options: [
          { label: 'A', text: 'Bisa mencari materi pelajaran dan referensi tugas secara cepat dan fleksibel' },
          { label: 'B', text: 'Membuat siswa tidak perlu membaca lagi selamanya' },
          { label: 'C', text: 'Memaksa siswa bermain game online setiap hari' },
          { label: 'D', text: 'Menggantikan peran teman dan keluarga di dunia nyata' }
        ],
        correctAnswer: 'A',
        explanation: 'Informasi digital mempermudah siswa belajar mandiri dan menemukan wawasan luas dengan cepat.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Video animasi tata surya di YouTube dan video praktikum sains merupakan jenis informasi digital berupa...',
        options: [
          { label: 'A', text: 'Video digital (gambar bergerak bersuara)' },
          { label: 'B', text: 'Teks tertulis saja' },
          { label: 'C', text: 'Koran cetak' },
          { label: 'D', text: 'Foto diam tanpa suara' }
        ],
        correctAnswer: 'A',
        explanation: 'Video menggabungkan elemen visual bergerak dan audio.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 4,
        question: 'Podcast edukasi yang didengarkan melalui headphone di HP termasuk jenis informasi digital berkategori...',
        options: [
          { label: 'A', text: 'Audio digital' },
          { label: 'B', text: 'Gambar digital' },
          { label: 'C', text: 'Teks cetak' },
          { label: 'D', text: 'Hardware komputer' }
        ],
        correctAnswer: 'A',
        explanation: 'Podcast adalah rekaman suara atau audio digital.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 5,
        question: 'Ketika mencari materi tugas tentang "Sistem Pernapasan Manusia", tindakan pencarian yang paling tepat adalah...',
        options: [
          { label: 'A', text: 'Menggunakan kata kunci (keywords) yang jelas: "sistem pernapasan manusia materi ipa smp"' },
          { label: 'B', text: 'Mengetik "halo google apa kabar hari ini"' },
          { label: 'C', text: 'Hanya mengetik huruf "P" di kolom pencarian' },
          { label: 'D', text: 'Mengeklik iklan acak yang lewat' }
        ],
        correctAnswer: 'A',
        explanation: 'Kata kunci spesifik dan tepat membuat mesin pencari memberikan hasil yang paling akurat.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 6,
        question: 'Apa fungsi dari penggunaan tanda petik dua (" ") saat mencari kata di Google, misalnya "SMP Negeri 5 Kroya"?',
        options: [
          { label: 'A', text: 'Mencari halaman web yang memuat susunan kata persis seperti di dalam tanda petik' },
          { label: 'B', text: 'Membuat layar komputer menjadi lebih terang' },
          { label: 'C', text: 'Menghapus riwayat pencarian Google' },
          { label: 'D', text: 'Mematikan koneksi internet' }
        ],
        correctAnswer: 'A',
        explanation: 'Tanda petik berguna untuk pencarian frasa persis (exact phrase search).',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 7,
        question: 'Domain alamat situs web resmi untuk sekolah-sekolah di Indonesia biasanya berakhiran...',
        options: [
          { label: 'A', text: '.sch.id (School Indonesia)' },
          { label: 'B', text: '.xyz' },
          { label: 'C', text: '.fun' },
          { label: 'D', text: '.game' }
        ],
        correctAnswer: 'A',
        explanation: '.sch.id adalah domain resmi khusus lembaga sekolah formal di Indonesia.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 8,
        question: 'Ciri-ciri berita atau artikel yang KURANG DAPAT DIPERCAYA (meragukan) adalah...',
        options: [
          { label: 'A', text: 'Judulnya sangat heboh dan bombastis (clickbait) serta tidak ada nama penulisnya' },
          { label: 'B', text: 'Diterbitkan di situs resmi Kementerian Kesehatan' },
          { label: 'C', text: 'Mencantumkan nama guru dan buku referensi yang jelas' },
          { label: 'D', text: 'Menggunakan bahasa yang sopan dan teratur' }
        ],
        correctAnswer: 'A',
        explanation: 'Artikel clickbait tanpa penulis sering kali berisi kabar bohong (hoaks) yang tidak dapat dipercaya.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 9,
        question: 'Mengapa menuliskan "Sumber: Google" pada lembar tugas sekolah dianggap kurang tepat oleh guru?',
        options: [
          { label: 'A', text: 'Karena Google adalah mesin pencari penemu web, bukan pembuat atau penulis artikel aslinya' },
          { label: 'B', text: 'Karena Google tidak boleh digunakan oleh anak sekolah' },
          { label: 'C', text: 'Karena Google hanya berisi gambar permainan' },
          { label: 'D', text: 'Karena Google tidak ada di internet' }
        ],
        correctAnswer: 'A',
        explanation: 'Yang harus dicantumkan adalah nama website dan penulis asli artikel yang kamu baca, bukan mesin pencarinya.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Sikap yang bijak saat menerima kabar heboh yang belum pasti kebenarannya di grup chat adalah...',
        options: [
          { label: 'A', text: 'Menahan diri untuk tidak membagikannya, lalu memverifikasi kebenarannya ke situs resmi atau bertanya ke guru' },
          { label: 'B', text: 'Langsung menyebarkannya ke seluruh teman sekelas' },
          { label: 'C', text: 'Menambahi cerita agar semakin seru' },
          { label: 'D', text: 'Memarahi orang tua di rumah' }
        ],
        correctAnswer: 'A',
        explanation: 'Saring sebelum sharing! Memverifikasi kebenaran info adalah ciri pelajar cerdas yang berkarakter.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Informasi dalam bentuk teks, suara, gambar, atau video yang disimpan dan diproses secara elektronik dinamakan...',
        options: [
          { label: 'A', text: 'Informasi Digital' },
          { label: 'B', text: 'Surat Kabar Cetak' },
          { label: 'C', text: 'Buku Catatan Kertas' },
          { label: 'D', text: 'Papan Pengumuman Kayu' }
        ],
        correctAnswer: 'A',
        explanation: 'Informasi digital adalah data yang dikemas dalam bentuk kode elektronik komputer.',
        points: 10
      },
      {
        id: 2,
        question: 'Salah satu manfaat utama informasi digital bagi kemudahan belajar siswa adalah...',
        options: [
          { label: 'A', text: 'Mempercepat pencarian materi dan mempermudah belajar kapan pun dibutuhkan' },
          { label: 'B', text: 'Membuat siswa tidak perlu membaca buku lagi' },
          { label: 'C', text: 'Mengurangi waktu tidur' },
          { label: 'D', text: 'Membuat tugas sekolah selesai dengan sendirinya tanpa dipelajari' }
        ],
        correctAnswer: 'A',
        explanation: 'Informasi digital memfasilitasi pembelajaran fleksibel, cepat, dan mudah diakses.',
        points: 10
      },
      {
        id: 3,
        question: 'Modul materi pelajaran dalam format PDF dan artikel ensiklopedia di internet tergolong ke dalam jenis...',
        options: [
          { label: 'A', text: 'Teks digital' },
          { label: 'B', text: 'Audio digital murni' },
          { label: 'C', text: 'Siaran radio FM' },
          { label: 'D', text: 'Kabel jaringan' }
        ],
        correctAnswer: 'A',
        explanation: 'Dokumen PDF dan artikel web berupa tulisan adalah teks digital.',
        points: 10
      },
      {
        id: 4,
        question: 'Gambar berformat JPG atau PNG yang menampilkan alur daur air untuk tugas IPA merupakan contoh dari...',
        options: [
          { label: 'A', text: 'Gambar & Infografis digital' },
          { label: 'B', text: 'Rekaman suara musik' },
          { label: 'C', text: 'File audio podcast' },
          { label: 'D', text: 'Baterai laptop' }
        ],
        correctAnswer: 'A',
        explanation: 'Diagram dan poster digital tergolong dalam jenis gambar/infografis digital.',
        points: 10
      },
      {
        id: 5,
        question: 'Kata kunci (keywords) yang baik untuk mencari materi tentang "Dampak Positif dan Negatif Internet untuk Remaja" adalah...',
        options: [
          { label: 'A', text: 'dampak positif dan negatif internet untuk remaja' },
          { label: 'B', text: 'tolong carikan tugas saya di internet dong sekarang' },
          { label: 'C', text: 'internet' },
          { label: 'D', text: 'remaja masa kini' }
        ],
        correctAnswer: 'A',
        explanation: 'Kata kunci yang mencantumkan inti topik secara spesifik akan menghasilkan referensi yang relevan.',
        points: 10
      },
      {
        id: 6,
        question: 'Apa arti kata "Kredibilitas" pada sumber informasi digital?',
        options: [
          { label: 'A', text: 'Tingkat kepercayaan, kejujuran, dan keakuratan suatu sumber informasi' },
          { label: 'B', text: 'Berapa harga kuota internet untuk membuka halaman tersebut' },
          { label: 'C', text: 'Berapa megabyte ukuran file yang diunduh' },
          { label: 'D', text: 'Warna latar belakang dari website' }
        ],
        correctAnswer: 'A',
        explanation: 'Kredibilitas berarti keandalan dan kelayakan suatu sumber untuk dipercaya kebenarannya.',
        points: 10
      },
      {
        id: 7,
        question: 'Situs web beralamat akhiran ".go.id" menandakan bahwa situs tersebut dikelola oleh lembaga...',
        options: [
          { label: 'A', text: 'Pemerintah Republik Indonesia (Government of Indonesia)' },
          { label: 'B', text: 'Toko baju online swasta' },
          { label: 'C', text: 'Penyedia game online luar negeri' },
          { label: 'D', text: 'Pabrik makanan ringan' }
        ],
        correctAnswer: 'A',
        explanation: '.go.id adalah kode resmi lembaga pemerintahan Indonesia sehingga sangat terpercaya.',
        points: 10
      },
      {
        id: 8,
        question: 'Mengapa kita harus memeriksa tanggal pembaruan (waktu terbit) pada sebuah informasi di internet?',
        options: [
          { label: 'A', text: 'Agar memastikan bahwa data atau aturan yang kita gunakan masih baru dan belum kedaluwarsa' },
          { label: 'B', text: 'Agar tahu tanggal ulang tahun pemilik website' },
          { label: 'C', text: 'Agar jam di laptop menjadi cocok' },
          { label: 'D', text: 'Tidak ada gunanya sama sekali' }
        ],
        correctAnswer: 'A',
        explanation: 'Banyak informasi berubah seiring waktu (misal aturan ujian, jadwal sekolah), sehingga tanggal penting diperiksa.',
        points: 10
      },
      {
        id: 9,
        question: 'Jika kamu menemukan tulisan di blog gratisan yang isinya hanya menjelek-jelekkan orang lain tanpa bukti data, langkahmu adalah...',
        options: [
          { label: 'A', text: 'Mengabaikannya dan tidak menggunakannya sebagai rujukan karena tidak kredibel dan tidak beretika' },
          { label: 'B', text: 'Menjadikannya referensi utama tugas sekolah' },
          { label: 'C', text: 'Membagikannya ke semua grup kelas' },
          { label: 'D', text: 'Mengakui tulisan tersebut sebagai buatan sendiri' }
        ],
        correctAnswer: 'A',
        explanation: 'Tulisan tanpa bukti dan bermaksud memojokkan orang lain bukan sumber yang sehat dan kredibel.',
        points: 10
      },
      {
        id: 10,
        question: 'Cara menuliskan sumber informasi yang benar dan jujur saat mengutip dari internet adalah...',
        options: [
          { label: 'A', text: 'Mencantumkan nama penulis/lembaga, judul artikel, nama website, dan tanggal akses' },
          { label: 'B', text: 'Hanya menulis "Dari Internet"' },
          { label: 'C', text: 'Tidak mencantumkan apa pun agar dikira hasil pemikiran sendiri' },
          { label: 'D', text: 'Menuliskan alamat rumah kepala sekolah' }
        ],
        correctAnswer: 'A',
        explanation: 'Menyebutkan sumber secara lengkap adalah bukti etika dan kejujuran ilmiah seorang pelajar.',
        points: 10
      }
    ]
  },

  // KELAS 8 - Koneksi Perangkat Digital
  {
    id: 'k8-koneksi',
    grade: 8,
    title: 'Koneksi Perangkat Digital',
    category: 'Jaringan & Komunikasi Data',
    shortDesc: 'Menghubungkan perangkat digital nirkabel dan berkabel: Wi-Fi, Bluetooth, Tethering Hotspot, enkripsi sinyal, dan bahaya jaringan publik.',
    learningObjectives: [
      'Menjelaskan berbagai metode koneksi: Wi-Fi, Bluetooth, Kabel USB, dan Tethering.',
      'Memahami mekanisme kerja Hotspot seluler dan pembagian kuota data.',
      'Menganalisis protokol keamanan nirkabel: WEP, WPA2, dan WPA3.',
      'Menerapkan langkah proteksi keamanan saat terhubung ke Wi-Fi publik (Hotspot gratisan).'
    ],
    apersepsi: {
      imagePromptDesc: 'Smartphone melakukan tethering memancarkan gelombang sinyal hotspot nirkabel ke laptop dan tablet di sekitarnya.',
      videoTitle: 'Kayak Gimana Bentuk Internet Sebenernya? - Kok Bisa?',
      videoDuration: '04:18',
      videoThumbnail: 'https://i.ytimg.com/vi/_fl7wWbV604/hqdefault.jpg',
      videoDescription: 'Menemukan cara kerja jaringan fisik dan nirkabel yang menghubungkan perangkat kita ke seluruh dunia.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=_fl7wWbV604',
      realLifeStory: 'Saat kegiatan perkemahan Pramuka di pinggir hutan Kroya, laptop panitia membutuhkan koneksi internet untuk menginput laporan nilai. Karena tidak ada kabel telepon di sana, Doni mengaktifkan fitur "Hotspot Pribadi / Tethering" di ponselnya. Seketika 3 laptop panitia bisa berselancar di internet menggunakan kuota data ponsel Doni. Bagaimana ponsel sekecil itu bisa berfungsi sebagai pemancar Wi-Fi mandiri?',
      triggerQuestions: [
        'Apa yang membedakan koneksi nirkabel Bluetooth dengan Wi-Fi dalam hal jangkauan dan kecepatan transfer data?',
        'Mengapa menggunakan Wi-Fi publik tanpa kata sandi di kafe sangat berisiko bagi keamanan data m-banking kita?',
        'Bagaimana cara membatasi siapa saja yang boleh tersambung ke Hotspot tethering ponsel kita?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Teknologi nirkabel jarak pendek (umumnya maksimal 10 meter) yang biasa digunakan untuk menghubungkan headset tanpa kabel atau keyboard ke laptop adalah...',
        options: [
          { label: 'A', text: 'Bluetooth' },
          { label: 'B', text: 'Satelit GPS' },
          { label: 'C', text: 'Kabel PLN' },
          { label: 'D', text: 'Gelombang FM Radio' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Bluetooth',
        recommendation: 'Bluetooth dirancang untuk WPAN (Personal Area Network) jarak dekat hemat daya.'
      },
      {
        id: 2,
        question: 'Fitur pada smartphone yang memungkinkan ponsel bertindak sebagai router nirkabel untuk membagikan koneksi internet selulernya ke perangkat lain disebut...',
        options: [
          { label: 'A', text: 'Tethering / Hotspot Seluler' },
          { label: 'B', text: 'Airplane Mode' },
          { label: 'C', text: 'Screen Mirroring' },
          { label: 'D', text: 'Dark Mode' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Tethering Hotspot',
        recommendation: 'Tethering membagikan koneksi data seluler lewat Wi-Fi, Bluetooth, atau USB.'
      },
      {
        id: 3,
        question: 'Standar enkripsi keamanan Wi-Fi yang paling modern, kuat, dan aman saat ini untuk melindungi jaringan nirkabel dari pembobolan adalah...',
        options: [
          { label: 'A', text: 'WPA3' },
          { label: 'B', text: 'WEP (Kuno & Rawan)' },
          { label: 'C', text: 'Tanpa Password' },
          { label: 'D', text: 'Open System' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Protokol Keamanan Wi-Fi',
        recommendation: 'WPA3 adalah standar enkripsi nirkabel terkuat saat ini.'
      },
      {
        id: 4,
        question: 'Nama pengenal jaringan Wi-Fi yang muncul saat kita memindai sinyal nirkabel di smartphone (misal "Lab_Informatika_SMPN5") disebut...',
        options: [
          { label: 'A', text: 'SSID (Service Set Identifier)' },
          { label: 'B', text: 'MAC Address' },
          { label: 'C', text: 'IP Address' },
          { label: 'D', text: 'PIN Kartu SIM' }
        ],
        correctAnswer: 'A',
        conceptTag: 'SSID Wi-Fi',
        recommendation: 'SSID adalah nama siaran nirkabel yang dipancarkan access point.'
      },
      {
        id: 5,
        question: 'Risiko terbesar saat kita tersambung ke jaringan Wi-Fi publik gratisan yang tidak memiliki kata sandi di tempat umum adalah...',
        options: [
          { label: 'A', text: 'Data komunikasi dan kata sandi kita dapat disadap oleh peretas yang berada di jaringan yang sama' },
          { label: 'B', text: 'Layar smartphone menjadi pecah' },
          { label: 'C', text: 'Kamera smartphone mati' },
          { label: 'D', text: 'Baterai otomatis terisi 100%' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Bahaya Wi-Fi Publik',
        recommendation: 'Jaringan Wi-Fi publik tanpa enkripsi rawan serangan sniffing dan penyadapan. Gunakan VPN dan hindari membuka data sensitif di Wi-Fi publik.'
      }
    ],
    materi: {
      overview: 'Koneksi perangkat digital menghubungkan ekosistem gawai kita (ponsel, laptop, printer, smartwatch) melalui media kabel dan nirkabel. Memahami cara kerja dan keamanan koneksi adalah kunci menjaga privasi dan keutuhan data kita.',
      keyConcepts: [
        {
          title: '1. Ragam Teknologi Nirkabel: Wi-Fi vs Bluetooth',
          explanation: 'Dua pilar komunikasi nirkabel dengan karakteristik berbeda.',
          bulletPoints: [
            'Wi-Fi: Berkecepatan tinggi (ratusan Mbps), jangkauan hingga 50-100m, konsumsi daya sedang-tinggi.',
            'Bluetooth: Jarak pendek (1-10m), konsumsi daya sangat hemat (Bluetooth Low Energy), ideal untuk periferal.'
          ],
          iconName: 'Wifi'
        },
        {
          title: '2. Cara Kerja Hotspot Tethering',
          explanation: 'Menjadikan ponsel sebagai gateway internet bagi perangkat lain.',
          bulletPoints: [
            'Ponsel menerima paket data internet dari BTS seluler 4G/5G.',
            'Chip Wi-Fi ponsel memancarkan sinyal access point lokal.',
            'Laptop tersambung ke SSID ponsel dan berbagi alokasi kuota data yang sama.'
          ],
          iconName: 'Smartphone'
        },
        {
          title: '3. Keamanan Koneksi Nirkabel & Wi-Fi Publik',
          explanation: 'Melindungi perangkat dari penyadapan lalu lintas data.',
          bulletPoints: [
            'Tingkatan Enkripsi: WEP (Sangat lemah, sudah ditinggalkan) -> WPA2 (Umum) -> WPA3 (Paling Aman).',
            'Bahaya Rogue AP: Hotspot palsu yang dibuat peretas menyerupai nama kafe resmi.',
            'Tips Aman: Jangan lakukan login perbankan di Wi-Fi publik; aktifkan Virtual Private Network (VPN).'
          ],
          iconName: 'Shield'
        }
      ],
      comparisonTable: {
        title: 'Komparasi Media Koneksi: Wi-Fi, Bluetooth, dan USB',
        headers: ['Parameter', 'Wi-Fi', 'Bluetooth', 'Kabel USB (Type-C)'],
        rows: [
          ['Media Transmisi', 'Gelombang Radio 2.4 GHz / 5 GHz', 'Gelombang Radio 2.4 GHz pita pendek', 'Kabel tembaga fisik'],
          ['Jangkauan Maksimal', '30 - 100 meter', '10 meter', '1 - 3 meter'],
          ['Kecepatan Transfer', 'Sangat Cepat (100 - 1000+ Mbps)', 'Sedang (1 - 3 Mbps)', 'Sangat Cepat & Stabil (480 Mbps - 10 Gbps)'],
          ['Tingkat Keamanan', 'Tergantung enkripsi WPA2/WPA3', 'Relatif aman karena jarak dekat & pairing PIN', 'Paling aman dari penyadapan udara']
        ]
      },
      dailyLifeExamples: [
        'Menghubungkan speaker bluetooth portabel ke smartphone untuk memutar lagu di jam istirahat sekolah.',
        'Mentransfer foto kegiatan OSIS dari kamera digital ke laptop menggunakan kabel USB Type-C.'
      ],
      schoolExamples: [
        'Menyambungkan laptop guru ke proyektor nirkabel (Wireless Display Miracast) di ruang kelas 8 SMPN 5 Kroya.'
      ],
      tahukahKamu: 'Nama "Bluetooth" diambil dari nama raja Viking Skandinavia abad ke-10, yaitu Raja Harald Bluetooth, yang terkenal karena berhasil menyatukan suku-suku yang terpecah belah, persis seperti teknologi Bluetooth yang menyatukan berbagai perangkat berbeda!',
      faktaMenarik: 'Wi-Fi generasi ke-6 (Wi-Fi 6 / 802.11ax) mampu melayani puluhan perangkat sekaligus di dalam satu ruangan kelas padat tanpa mengalami penurunan kecepatan!',
      infoPenting: 'Selalu matikan fitur Wi-Fi dan Bluetooth jika sedang tidak digunakan saat berada di luar rumah untuk menghemat baterai ponsel sekaligus mencegah perangkat dari pemindaian pelacakan otomatis.',
      commonMistakes: [
        'Mengaktifkan Hotspot Tethering di smartphone tanpa memberi kata sandi sehingga kuota data tersedot habis oleh orang di sekitar.',
        'Melakukan transaksi perbankan atau pembayaran online melalui Wi-Fi publik gratisan yang tidak memiliki sandi.'
      ],
      summary: [
        'Wi-Fi untuk internet cepat; Bluetooth untuk periferal jarak dekat.',
        'Kunci Hotspot tethering dengan sandi WPA2/WPA3 yang kuat.',
        'Hindari membuka akun sensitif pada jaringan Wi-Fi publik gratis.'
      ],
      formativeCheck: [
        {
          question: 'Manakah tindakan paling aman saat hendak mengaktifkan Hotspot Tethering di smartphone kamu?',
          options: [
            'Mengatur kata sandi pengaman dengan enkripsi WPA2-Personal minimal 8 karakter acak',
            'Membiarkan hotspot terbuka (Open) tanpa kata sandi agar semua orang bisa memakai',
            'Mematikan layar HP',
            'Menghapus nama hotspot'
          ],
          answerIndex: 0,
          explanation: 'Benar! Memasang sandi WPA2/WPA3 melindungi kuota datamu dari penggunaan tidak sah pihak lain.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Interaktif: Pemilahan Teknologi Koneksi Digital',
      scenario: 'Pilih teknologi koneksi yang paling ideal untuk 4 kebutuhan perangkat di bawah ini!',
      instructions: 'Cocokkan setiap skenario dengan teknologi koneksi terbaik: Bluetooth, Wi-Fi, atau Kabel USB.',
      data: {
        items: [
          { id: 'con-1', text: 'Menghubungkan earphone TWS nirkabel ke smartphone saat joging pagi.', correctCategory: 'Bluetooth' },
          { id: 'con-2', text: 'Menghubungkan 30 komputer lab sekolah ke internet berkecepatan tinggi.', correctCategory: 'Wi-Fi / LAN' },
          { id: 'con-3', text: 'Mentransfer file video 10 Gigabyte dari smartphone ke laptop dengan kecepatan paling stabil.', correctCategory: 'Kabel USB' },
          { id: 'con-4', text: 'Menghubungkan smartwatch gelang pintar ke aplikasi kesehatan ponsel.', correctCategory: 'Bluetooth' }
        ],
        categories: ['Bluetooth', 'Wi-Fi / LAN', 'Kabel USB']
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Kuis Kilat Koneksi Cerdas',
      description: 'Uji reflekmu seputar istilah koneksi perangkat!',
      questions: [
        {
          id: 1,
          question: 'Kepanjangan dari SSID pada pemancar Wi-Fi adalah...',
          options: ['Service Set Identifier', 'System Security Internet Data', 'Standard Simple Interface Device', 'School Server Internal Domain'],
          correctIndex: 0,
          clue: 'Nama siaran pengenal jaringan nirkabel.'
        },
        {
          id: 2,
          question: 'Fitur untuk mengamankan data internet saat berada di Wi-Fi publik dengan membuat terowongan enkripsi privat adalah...',
          options: ['Virtual Private Network (VPN)', 'MP3 Player', 'Hard Disk', 'Calculator'],
          correctIndex: 0,
          clue: 'VPN = Virtual Private Network.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Perbedaan utama antara frekuensi Wi-Fi 2.4 GHz dan frekuensi Wi-Fi 5 GHz adalah...',
        options: [
          { label: 'A', text: '2.4 GHz memiliki jangkauan sinyal lebih jauh menembus dinding namun kecepatan lebih rendah, sedangkan 5 GHz lebih cepat namun jangkauan lebih pendek' },
          { label: 'B', text: '2.4 GHz hanya untuk HP, 5 GHz hanya untuk TV' },
          { label: 'C', text: '2.4 GHz berbayar, 5 GHz selalu gratis' },
          { label: 'D', text: 'Keduanya persis sama tanpa beda' }
        ],
        correctAnswer: 'A',
        explanation: 'Karakteristik fisika gelombang: frekuensi lebih tinggi (5GHz) mentransfer data lebih cepat tetapi lebih mudah teredam halangan dinding.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 2,
        question: 'Proses memasangkan dua perangkat Bluetooth untuk pertama kali dengan konfirmasi kode PIN keamanan disebut...',
        options: [
          { label: 'A', text: 'Pairing (Penyandingan)' },
          { label: 'B', text: 'Formatting' },
          { label: 'C', text: 'Shutting down' },
          { label: 'D', text: 'Deleting' }
        ],
        correctAnswer: 'A',
        explanation: 'Pairing adalah proses autentikasi awal antara dua perangkat Bluetooth.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Mengapa enkripsi Wi-Fi jenis WEP (Wired Equivalent Privacy) sudah dilarang dan tidak lagi direkomendasikan?',
        options: [
          { label: 'A', text: 'Karena memiliki celah algoritma yang sangat rapuh dan dapat dibobol hacker dalam hitungan menit' },
          { label: 'B', text: 'Karena membuat baterai meledak' },
          { label: 'C', text: 'Karena hanya ada di luar negeri' },
          { label: 'D', text: 'Karena harganya sangat mahal' }
        ],
        correctAnswer: 'A',
        explanation: 'Protokol WEP memiliki cacat kriptografi fatal sehingga telah usang dan digantikan WPA2/WPA3.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 4,
        question: 'Tindakan yang paling bijak saat smartphone tersambung ke jaringan Wi-Fi gratis di stasiun kereta api adalah...',
        options: [
          { label: 'A', text: 'Menggunakan VPN, tidak membuka aplikasi perbankan sensitif, dan mematikan auto-connect' },
          { label: 'B', text: 'Melakukan transfer uang dalam jumlah besar' },
          { label: 'C', text: 'Membagikan kata sandi email ke semua orang' },
          { label: 'D', text: 'Mematikan sistem operasi' }
        ],
        correctAnswer: 'A',
        explanation: 'Kewaspadaan di jaringan publik mencegah intersepsi data berharga.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Kabel USB Type-C modern memiliki keunggulan fisik yang sangat disukai pengguna dibandingkan micro-USB lama, yaitu...',
        options: [
          { label: 'A', text: 'Konektornya simetris (dapat dicolok bolak-balik tanpa khawatir terbalik posisinya)' },
          { label: 'B', text: 'Terbuat dari tali tambang' },
          { label: 'C', text: 'Tidak bisa menghantarkan listrik' },
          { label: 'D', text: 'Bisa mengeluarkan suara lagu' }
        ],
        correctAnswer: 'A',
        explanation: 'USB Type-C bersifat reversible (dapat ditancapkan dua arah secara simetris).',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 6,
        question: 'Fitur "USB Tethering" pada smartphone memungkinkan smartphone membagikan koneksi internet ke laptop melalui...',
        options: [
          { label: 'A', text: 'Kabel data USB yang dicolokkan ke port USB laptop' },
          { label: 'B', text: 'Gelombang suara ultrasonic' },
          { label: 'C', text: 'Sinar inframerah remote TV' },
          { label: 'D', text: 'Cahaya senter HP' }
        ],
        correctAnswer: 'A',
        explanation: 'USB Tethering mentransmisikan paket data internet melalui jalur fisik kabel USB.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Istilah "Evil Twin Attack" dalam kejahatan jaringan nirkabel merujuk pada...',
        options: [
          { label: 'A', text: 'Peretas yang membuat access point palsu dengan nama SSID yang persis sama dengan Wi-Fi resmi untuk memancing korban login' },
          { label: 'B', text: 'Dua orang hacker kembar yang meretas bank' },
          { label: 'C', text: 'Virus yang menggandakan file word menjadi dua' },
          { label: 'D', text: 'Komputer yang memiliki dua layar' }
        ],
        correctAnswer: 'A',
        explanation: 'Evil Twin adalah titik akses Wi-Fi tiruan yang menjebak korban untuk mencuri data kredensial.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Jika kamu mematikan tombol "Visibility / Discoverability" pada pengaturan Bluetooth smartphone-mu, dampaknya adalah...',
        options: [
          { label: 'A', text: 'Perangkat asing di sekitarmu tidak dapat memindai atau melihat keberadaan perangkat Bluetooth-mu' },
          { label: 'B', text: 'Layar HP menjadi gelap gulita' },
          { label: 'C', text: 'Semua kontak telepon hilang' },
          { label: 'D', text: 'Koneksi telepon terputus' }
        ],
        correctAnswer: 'A',
        explanation: 'Menyembunyikan visibilitas Bluetooth mencegah serangan spamming dan pemindaian tak dikenal.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 9,
        question: 'Keuntungan koneksi menggunakan kabel Ethernet LAN dibandingkan Wi-Fi nirkabel untuk pertandingan e-sport atau ujian ANBK adalah...',
        options: [
          { label: 'A', text: 'Koneksi kabel jauh lebih stabil, minim latensi (ping rendah), dan bebas dari interferensi gelombang udara' },
          { label: 'B', text: 'Kabel tidak memerlukan listrik' },
          { label: 'C', text: 'Kabel bisa berjalan sendiri' },
          { label: 'D', text: 'Harga kabel selalu gratis' }
        ],
        correctAnswer: 'A',
        explanation: 'Kabel Ethernet menawarkan kestabilan bebas interferensi gelombang radio.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Mengapa mematikan fitur "Connect Automatically" (Sambungkan Otomatis) ke jaringan Wi-Fi terbuka sangat disarankan?',
        options: [
          { label: 'A', text: 'Mencegah smartphone otomatis tersambung ke jaringan Wi-Fi jahat atau palsu tanpa persetujuan sadar kita saat berjalan di tempat umum' },
          { label: 'B', text: 'Supaya baterai HP tidak pernah habis' },
          { label: 'C', text: 'Supaya kuota menjadi tak terbatas' },
          { label: 'D', text: 'Agar HP tidak bisa dinyalakan' }
        ],
        correctAnswer: 'A',
        explanation: 'Auto-connect yang aktif membuat perangkat rentan terjebak jaringan jebakan peretas tanpa disadari.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Teknologi nirkabel dengan jangkauan personal sekitar 10 meter yang berdaya rendah adalah...',
        options: [
          { label: 'A', text: 'Bluetooth' },
          { label: 'B', text: 'Satelit Palapa' },
          { label: 'C', text: 'Fiber Optik' },
          { label: 'D', text: 'Tower BTS' }
        ],
        correctAnswer: 'A',
        explanation: 'Bluetooth dirancang untuk komunikasi WPAN jarak dekat hemat energi.',
        points: 10
      },
      {
        id: 2,
        question: 'Fitur membagikan koneksi internet ponsel pintar ke perangkat lain dinamakan...',
        options: [
          { label: 'A', text: 'Tethering / Hotspot' },
          { label: 'B', text: 'Screen Recorder' },
          { label: 'C', text: 'NFC' },
          { label: 'D', text: 'GPS' }
        ],
        correctAnswer: 'A',
        explanation: 'Tethering membagikan akses data ponsel ke perangkat lain.',
        points: 10
      },
      {
        id: 3,
        question: 'Nama pengenal jaringan Wi-Fi nirkabel disebut...',
        options: [
          { label: 'A', text: 'SSID' },
          { label: 'B', text: 'RAM' },
          { label: 'C', text: 'BIOS' },
          { label: 'D', text: 'USB' }
        ],
        correctAnswer: 'A',
        explanation: 'SSID (Service Set Identifier) adalah nama siaran jaringan Wi-Fi.',
        points: 10
      },
      {
        id: 4,
        question: 'Enkripsi Wi-Fi yang paling aman dan mutakhir saat ini adalah...',
        options: [
          { label: 'A', text: 'WPA3' },
          { label: 'B', text: 'WEP' },
          { label: 'C', text: 'Open System' },
          { label: 'D', text: 'Unsecured' }
        ],
        correctAnswer: 'A',
        explanation: 'WPA3 adalah standar keamanan nirkabel generasi terkini.',
        points: 10
      },
      {
        id: 5,
        question: 'Untuk mentransfer data jarak dekat hanya dengan mendekatkan atau menempelkan bodi dua perangkat (seperti mengecek saldo kartu e-toll) menggunakan teknologi...',
        options: [
          { label: 'A', text: 'NFC (Near Field Communication)' },
          { label: 'B', text: 'Kabel LAN 50 meter' },
          { label: 'C', text: 'Satelit Cuaca' },
          { label: 'D', text: 'Proyektor' }
        ],
        correctAnswer: 'A',
        explanation: 'NFC mentransfer data pada jarak sangat dekat (< 4 cm).',
        points: 10
      },
      {
        id: 6,
        question: 'Risiko terbesar saat terhubung ke Wi-Fi publik tanpa proteksi di kafe adalah...',
        options: [
          { label: 'A', text: 'Penyadapan data pribadi dan kata sandi oleh pihak jahat di jaringan yang sama' },
          { label: 'B', text: 'HP tidak bisa dimatikan' },
          { label: 'C', text: 'Layar menjadi retak' },
          { label: 'D', text: 'Baterai bocor' }
        ],
        correctAnswer: 'A',
        explanation: 'Jaringan terbuka rawan intersepsi paket data sniffing.',
        points: 10
      },
      {
        id: 7,
        question: 'Protokol yang mengenkripsi seluruh lalu lintas data perangkat kita melalui terowongan aman saat menggunakan internet publik adalah...',
        options: [
          { label: 'A', text: 'VPN (Virtual Private Network)' },
          { label: 'B', text: 'VGA' },
          { label: 'C', text: 'HDMI' },
          { label: 'D', text: 'MP4' }
        ],
        correctAnswer: 'A',
        explanation: 'VPN mengenkripsi transmisi data end-to-end.',
        points: 10
      },
      {
        id: 8,
        question: 'Berapa frekuensi ganda (Dual Band) yang umum didukung oleh router Wi-Fi modern?',
        options: [
          { label: 'A', text: '2.4 GHz dan 5 GHz' },
          { label: 'B', text: '100 Hz dan 200 Hz' },
          { label: 'C', text: '1 Volt dan 2 Volt' },
          { label: 'D', text: '50 Mbps dan 100 Mbps' }
        ],
        correctAnswer: 'A',
        explanation: 'Dual-band router beroperasi pada spektrum 2.4 GHz dan 5 GHz.',
        points: 10
      },
      {
        id: 9,
        question: 'Tindakan yang tepat setelah selesai menggunakan Bluetooth di tempat umum adalah...',
        options: [
          { label: 'A', text: 'Mematikan fitur Bluetooth untuk mencegah pemindaian pelacakan dan menghemat baterai' },
          { label: 'B', text: 'Menyalakan Bluetooth selama 24 jam' },
          { label: 'C', text: 'Menjual smartphone' },
          { label: 'D', text: 'Menghapus lagu di galeri' }
        ],
        correctAnswer: 'A',
        explanation: 'Mematikan Bluetooth saat tidak aktif menjaga keamanan dan daya baterai.',
        points: 10
      },
      {
        id: 10,
        question: 'Keuntungan utama menggunakan kabel USB Type-C dibandingkan kabel USB generasi terdahulu adalah...',
        options: [
          { label: 'A', text: 'Transfer data lebih cepat, pengisian daya lebih bertenaga, dan ujung colokan simetris (bisa dibolak-balik)' },
          { label: 'B', text: 'Bisa dimakan' },
          { label: 'C', text: 'Tidak ada kabel di dalamnya' },
          { label: 'D', text: 'Hanya bisa digunakan sekali pakai' }
        ],
        correctAnswer: 'A',
        explanation: 'USB-C menawarkan kecepatan tinggi, daya pengisian besar, dan desain colokan simetris.',
        points: 10
      }
    ]
  },

  // KELAS 9 - Ekosistem Media Pers Digital
  {
    id: 'k9-pers-digital',
    grade: 9,
    title: 'Ekosistem Media Pers Digital',
    category: 'Masyarakat Digital & Jurnalistik',
    shortDesc: 'Menjelajahi peran jurnalisme online, kode etik pers, verifikasi redaksional, hak cipta karya berita, dan tanggung jawab produsen konten.',
    learningObjectives: [
      'Memahami fungsi pers dan jurnalisme di era masyarakat informasi digital.',
      'Membedakan media pers profesional dengan media sosial atau blog pribadi.',
      'Menerapkan prinsip Kode Etik Jurnalistik (keberimbangan, verifikasi, praduga tak bersalah).',
      'Menganalisis fenomena jurnalisme warga (Citizen Journalism) dan etika produksi berita sekolah.'
    ],
    apersepsi: {
      imagePromptDesc: 'Redaksi majalah dinding digital SMP dengan siswa yang bertindak sebagai wartawan muda, fotografer, dan editor berita.',
      videoTitle: 'Bagaimana Meja Redaksi Berita Memverifikasi Kebenaran Suatu Peristiwa Sebelum Diterbitkan?',
      videoDuration: '04:25',
      videoThumbnail: 'https://i.ytimg.com/vi/uDre4OLDHh4/hqdefault.jpg',
      videoDescription: 'Mengintip ruang kerja redaksi pers profesional: bagaimana editor menyaring fakta, memverifikasi saksi, dan mencegah berita fitnah di era digital.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=uDre4OLDHh4',
      realLifeStory: 'Klub Jurnalistik SMPN 5 Kroya sedang meliput kemenangan regu basket sekolah di turnamen antarsekolah. Ada desas-desus bahwa wasit berbuat curang di detik-detik akhir. Wartawan muda sekolah tidak langsung menulis artikel provokatif di website sekolah. Mereka mewawancarai kedua kapten tim, meminta keterangan panitia, dan memeriksa rekaman video pertandingan. Mengapa verifikasi ketat seperti ini wajib dilakukan sebuah media pers?',
      triggerQuestions: [
        'Apa perbedaan mendasar antara postingan gosip di akun media sosial pribadi dengan artikel produk jurnalistik resmi?',
        'Mengapa seorang wartawan wajib melakukan "Cover Both Sides" (meminta konfirmasi dari kedua belah pihak yang bersengketa)?',
        'Bagaimana kode etik jurnalistik melindungi hak privasi anak-anak dan korban peristiwa?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Lembaga independen di Indonesia yang bertugas mengawasi penegakan Kode Etik Jurnalistik dan melindungi kemerdekaan pers adalah...',
        options: [
          { label: 'A', text: 'Dewan Pers' },
          { label: 'B', text: 'Dinas Kehutanan' },
          { label: 'C', text: 'Bank Indonesia' },
          { label: 'D', text: 'Kementerian Perhubungan' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Dewan Pers',
        recommendation: 'Dewan Pers adalah regulator independen ekosistem pers di Indonesia.'
      },
      {
        id: 2,
        question: 'Prinsip jurnalistik yang mewajibkan wartawan meliput dan memuat pandangan dari kedua belah pihak secara berimbang disebut...',
        options: [
          { label: 'A', text: 'Cover Both Sides' },
          { label: 'B', text: 'Clickbait' },
          { label: 'C', text: 'Deepfake' },
          { label: 'D', text: 'Copy Paste' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Cover Both Sides',
        recommendation: 'Cover both sides menjamin keadilan informasi bagi semua pihak.'
      },
      {
        id: 3,
        question: 'Kegiatan pengumpulan, penulisan, dan penyebaran informasi peristiwa oleh masyarakat biasa tanpa latar belakang wartawan profesional disebut...',
        options: [
          { label: 'A', text: 'Citizen Journalism (Jurnalisme Warga)' },
          { label: 'B', text: 'Hacking' },
          { label: 'C', text: 'Cyberbullying' },
          { label: 'D', text: 'Phishing' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Citizen Journalism',
        recommendation: 'Citizen journalism memberdayakan masyarakat melaporkan kejadian sekitar secara faktual.'
      },
      {
        id: 4,
        question: 'Hak seseorang untuk mengoreksi atau meralat informasi yang salah dan merugikan nama baiknya yang telah dimuat oleh media pers disebut...',
        options: [
          { label: 'A', text: 'Hak Jawab dan Hak Koreksi' },
          { label: 'B', text: 'Hak Cipta' },
          { label: 'C', text: 'Hak Paten' },
          { label: 'D', text: 'Hak Merek' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Hak Jawab',
        recommendation: 'UU Pers mewajibkan media melayani hak jawab pihak yang dirugikan berita keliru.'
      },
      {
        id: 5,
        question: 'Dalam kode etik jurnalistik, identitas anak di bawah umur yang menjadi korban atau saksi suatu peristiwa hukum...',
        options: [
          { label: 'A', text: 'Wajib dirahasiakan dan disamarkan (inisial)' },
          { label: 'B', text: 'Harus dipajang foto jelasnya' },
          { label: 'C', text: 'Disebutkan nomor telepon rumahnya' },
          { label: 'D', text: 'Disebutkan alamat lengkap rumahnya' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Perlindungan Identitas Anak',
        recommendation: 'Anak di bawah umur dilindungi secara ketat agar tidak mengalami stigma sosial.'
      }
    ],
    materi: {
      overview: 'Pers adalah pilar keempat demokrasi yang bertindak sebagai penyampai kebenaran, sarana pendidikan, dan pengawas kekuasaan publik. Di era digital, memahami ekosistem pers melatih siswa menjadi konsumen informasi yang bijak dan produsen berita sekolah yang bertanggung jawab.',
      keyConcepts: [
        {
          title: '1. Peran dan Fungsi Pers Digital',
          explanation: 'Membedakan media pers resmi dengan konten media sosial tak bertuan.',
          bulletPoints: [
            'Fungsi Pers: Menginformasikan (to inform), Mendidik (to educate), Mengoreksi (social control), dan Menghibur (to entertain).',
            'Badan Hukum Jelas: Media pers resmi memiliki penanggung jawab redaksi dan alamat kantor nyata.'
          ],
          iconName: 'Newspaper'
        },
        {
          title: '2. Kode Etik Jurnalistik (KEJ)',
          explanation: 'Pedoman moral dan etika profesi wartawan Indonesia.',
          bulletPoints: [
            'Wartawan Indonesia selalu menguji informasi dan memberitakan secara berimbang (Cover both sides).',
            'Tidak mencampurkan fakta dan opini yang menghakimi.',
            'Menerapkan asas praduga tak bersalah (presumption of innocence).',
            'Merahasiakan identitas korban kejahatan asusila dan anak di bawah umur.'
          ],
          iconName: 'Scale'
        },
        {
          title: '3. Jurnalisme Warga & Majalah Dinding Digital Sekolah',
          explanation: 'Menerapkan kaidah jurnalistik pada karya siswa di sekolah.',
          bulletPoints: [
            'Prinsip 5W+1H dalam menulis berita sekolah yang bernas dan padat.',
            'Verifikasi narasumber sebelum mengunggah pengumuman ke web majalah dinding sekolah.'
          ],
          iconName: 'Edit3'
        }
      ],
      comparisonTable: {
        title: 'Komparasi Media Pers Profesional vs Media Sosial Biasa',
        headers: ['Aspek', 'Media Pers Profesional', 'Media Sosial Pribadi / Akun Gosip'],
        rows: [
          ['Proses Penyaringan', 'Melewati meja redaksi (Editor, Redaktur Pelaksana, Pemred)', 'Diunggah langsung oleh pemilik akun tanpa verifikasi pihak kedua'],
          ['Tanggung Jawab Hukum', 'Tunduk pada UU No. 40 Tahun 1999 tentang Pers & Dewan Pers', 'Tunduk langsung pada hukum UU ITE pidana pribadi'],
          ['Penyelesaian Sengketa', 'Menggunakan mekanisme Hak Jawab dan klarifikasi Dewan Pers', 'Sering berujung saling lapor polisi atau pencemaran nama baik'],
          ['Tujuan Konten', 'Kepentingan publik dan kebenaran faktual teruji', 'Popularitas pribadi, viralitas, atau keuntungan endorsement']
        ]
      },
      dailyLifeExamples: [
        'Membaca berita pilkada serentak di situs berita terverifikasi Dewan Pers untuk mengetahui rekam jejak calon bupati.',
        'Siswa membuat laporan wawancara dengan penjaga kantin tentang pengelolaan makanan sehat di sekolah.'
      ],
      schoolExamples: [
        'Tim Redaksi Mading Digital SMPN 5 Kroya menerbitkan artikel profil prestasi siswa yang menjuarai olimpiade sains tingkat kabupaten.'
      ],
      tahukahKamu: 'Undang-Undang Pers di Indonesia (UU No. 40 Tahun 1999) menegaskan bahwa kemerdekaan pers dijamin sebagai hak asasi warga negara dan terhadap pers nasional TIDAK DIKENAKAN penyensoran, pembredelan, atau pelarangan penyiaran!',
      faktaMenarik: 'Istilah "Jurnalisme Kuning" (Yellow Journalism) lahir pada abad ke-19 untuk menyebut koran-koran yang menjual berita sensasional palsu dan skandal demi meraup oplah penjualan tinggi.',
      infoPenting: 'Jika sebuah media memberitakan hal yang salah tentang dirimu atau sekolahmu, kamu berhak meminta Hak Jawab dan media tersebut WAJIB memuat klarifikasimu di tempat yang sama!',
      commonMistakes: [
        'Menganggap semua informasi yang beredar di akun gosip media sosial adalah produk jurnalistik resmi.',
        'Mencampurkan opini pribadi penulis yang menghakimi ke dalam teks berita lempang (straight news).'
      ],
      summary: [
        'Pers profesional memiliki redaksi, kode etik, dan badan hukum terdaftar di Dewan Pers.',
        'Prinsip Cover Both Sides dan uji fakta wajib ditaati.',
        'Hak Jawab menjamin perlindungan bagi pihak yang dirugikan berita keliru.'
      ],
      formativeCheck: [
        {
          question: 'Jika seorang wartawan sekolah menulis berita tentang perselisihan dua regu pramuka, tindakan apa yang wajib ia lakukan agar beritanya adil dan berimbang?',
          options: [
            'Mewawancarai kedua ketua regu pramuka yang terlibat untuk memaparkan keterangan kedua belah pihak secara seimbang',
            'Hanya mewawancarai sahabat karibnya saja dan menyalahkan regu yang lain',
            'Menebak-nebak cerita tanpa mewawancarai siapa pun',
            'Menulis berita fiksi'
          ],
          answerIndex: 0,
          explanation: 'Benar! Prinsip keberimbangan (Cover Both Sides) menuntut penyajian keterangan dari kedua pihak yang bersangkutan.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Redaksi: Pemeriksa Kode Etik Jurnalistik',
      scenario: 'Pilah 4 tindakan reporter sekolah berikut ke dalam: "Mematuhi Kode Etik" atau "Melanggar Kode Etik"!',
      instructions: 'Kelompokkan setiap tindakan sesuai kepatuhan etika pers.',
      data: {
        items: [
          { id: 'et-1', text: 'Menyamarkan identitas dan wajah anak di bawah umur yang menjadi korban kecelakaan.', correctCategory: 'Mematuhi Kode Etik' },
          { id: 'et-2', text: 'Menulis berita dengan judul heboh fitnah tanpa meminta konfirmasi narasumber terkait.', correctCategory: 'Melanggar Kode Etik' },
          { id: 'et-3', text: 'Memuat Hak Jawab dari pihak yang merasa dirugikan oleh berita sebelumnya dengan porsi seimbang.', correctCategory: 'Mematuhi Kode Etik' },
          { id: 'et-4', text: 'Menerima amplop uang sogokan agar tidak memberitakan kasus pelanggaran aturan sekolah.', correctCategory: 'Melanggar Kode Etik' }
        ],
        categories: ['Mematuhi Kode Etik', 'Melanggar Kode Etik']
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Kuis Kilat Jurnalisme Digital',
      description: 'Cocokkan istilah pers dengan definisinya!',
      questions: [
        {
          id: 1,
          question: 'Kaidah penyusunan berita yang memuat Apa, Siapa, Di mana, Kapan, Mengapa, dan Bagaimana adalah...',
          options: ['Unsur 5W + 1H', 'Sistem Operasi', 'Kabel LAN', 'Rumus VLOOKUP'],
          correctIndex: 0,
          clue: 'What, Who, Where, When, Why, How.'
        },
        {
          id: 2,
          question: 'Bagian teratas berita yang memuat rangkuman inti peristiwa paling penting disebut...',
          options: ['Lead / Teras Berita', 'Footer', 'Komentar', 'Iklan Baris'],
          correctIndex: 0,
          clue: 'Teras berita pembuka.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Empat pilar utama fungsi pers dalam masyarakat demokratis adalah...',
        options: [
          { label: 'A', text: 'Media informasi, pendidikan, hiburan, dan kontrol sosial' },
          { label: 'B', text: 'Menjual koran, mencari keuntungan, memeras pejabat, dan menyebar rumor' },
          { label: 'C', text: 'Hanya untuk memasang iklan komersial' },
          { label: 'D', text: 'Menghibur pejabat negara' }
        ],
        correctAnswer: 'A',
        explanation: 'Fungsi pers nasional menurut UU No. 40/1999: informasi, edukasi, rekreasi, dan kontrol sosial.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Struktur penulisan berita piramida terbalik (Inverted Pyramid) menempatkan informasi paling penting di bagian...',
        options: [
          { label: 'A', text: 'Paling atas (Judul dan Teras Berita / Lead)' },
          { label: 'B', text: 'Paling bawah di kalimat penutup' },
          { label: 'C', text: 'Terselubung di tengah tabel' },
          { label: 'D', text: 'Di luar dokumen' }
        ],
        correctAnswer: 'A',
        explanation: 'Piramida terbalik menyajikan fakta inti paling krusial di awal agar pembaca langsung memahami inti peristiwa.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Apa akibat hukumnya jika sebuah media pers menerbitkan berita keliru dan menolak melayani Hak Jawab dari pihak yang dirugikan?',
        options: [
          { label: 'A', text: 'Dapat dikenai sanksi pidana denda hingga Rp 500 juta berdasarkan UU Pers No. 40 Tahun 1999' },
          { label: 'B', text: 'Tidak ada konsekuensi sama sekali' },
          { label: 'C', text: 'Wartawannya otomatis naik pangkat' },
          { label: 'D', text: 'Situsnya otomatis berubah warna' }
        ],
        correctAnswer: 'A',
        explanation: 'Pasal 18 ayat (2) UU Pers mengatur denda pidana maksimal Rp 500.000.000 jika media menolak melayani hak jawab.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 4,
        question: 'Prinsip "Praduga Tak Bersalah" (Presumption of Innocence) dalam pemberitaan perkara hukum menuntut wartawan untuk...',
        options: [
          { label: 'A', text: 'Tidak menghakimi seseorang sebagai penjahat sebelum ada putusan pengadilan yang berkekuatan hukum tetap' },
          { label: 'B', text: 'Membela pelaku kejahatan agar bebas' },
          { label: 'C', text: 'Menghukum tersangka secara langsung' },
          { label: 'D', text: 'Tidak boleh meliput persidangan' }
        ],
        correctAnswer: 'A',
        explanation: 'Asas praduga tak bersalah menjamin hak setiap warga negara diperlakukan adil sebelum vonis pengadilan resmi.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 5,
        question: 'Mengapa jurnalisme warga (Citizen Journalism) sangat pesat berkembang di era smartphone berkamera?',
        options: [
          { label: 'A', text: 'Masyarakat di lokasi kejadian dapat mendokumentasikan dan membagikan peristiwa penting secara real-time sebelum wartawan profesional tiba di lokasi' },
          { label: 'B', text: 'Karena wartawan profesional sudah ditiadakan' },
          { label: 'C', text: 'Karena kamera HP harganya gratis' },
          { label: 'D', text: 'Supaya tidak perlu ada sekolah lagi' }
        ],
        correctAnswer: 'A',
        explanation: 'Kehadiran smartphone di tangan warga mempercepat diseminasi kabar peristiwa langsung dari akar rumput.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Seorang wartawan yang menerima suap atau fasilitas tertentu dari narasumber agar berita negatif tidak dimuat telah melanggar prinsip Kode Etik Jurnalistik, yaitu...',
        options: [
          { label: 'A', text: 'Independensi dan larangan menyalahgunakan profesi serta menerima suap' },
          { label: 'B', text: 'Keterampilan mengetik cepat' },
          { label: 'C', text: 'Koneksi jaringan wifi' },
          { label: 'D', text: 'Ukuran resolusi kamera' }
        ],
        correctAnswer: 'A',
        explanation: 'Pasal 6 KEJ menegaskan wartawan tidak menyalahgunakan profesi dan tidak menerima suap.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Tindakan menyalin berita dari kantor berita lain tanpa menyebutkan sumber aslinya melanggar hak kekayaan intelektual...',
        options: [
          { label: 'A', text: 'Hak Cipta (Copyright)' },
          { label: 'B', text: 'Hak Merek Dagang' },
          { label: 'C', text: 'Hak Paten Mesin' },
          { label: 'D', text: 'Hak Desain Industri' }
        ],
        correctAnswer: 'A',
        explanation: 'Karya jurnalistik dilindungi oleh undang-undang hak cipta.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 8,
        question: 'Peran "Editor" atau "Redaktur" dalam struktur media pers digital adalah...',
        options: [
          { label: 'A', text: 'Memeriksa akurasi fakta, memperbaiki tata bahasa, menguji etika, dan memutuskan apakah naskah reporter layak diterbitkan' },
          { label: 'B', text: 'Hanya mencetak koran di percetakan' },
          { label: 'C', text: 'Mengantar surat kabar ke rumah pelanggan' },
          { label: 'D', text: 'Menjual komputer kantor' }
        ],
        correctAnswer: 'A',
        explanation: 'Editor adalah penjaga gerbang (gatekeeper) kualitas dan kepatuhan etika naskah berita.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 9,
        question: 'Mengapa judul berita yang bersifat "Clickbait Bombastis" yang isinya tidak sesuai dengan kenyataan merugikan reputasi media pers?',
        options: [
          { label: 'A', text: 'Menurunkan kepercayaan publik (trust) terhadap integritas dan kredibilitas media tersebut' },
          { label: 'B', text: 'Membuat tinta cetak cepat habis' },
          { label: 'C', text: 'Membuat kabel server terputus' },
          { label: 'D', text: 'Hanya masalah selera tanpa kerugian' }
        ],
        correctAnswer: 'A',
        explanation: 'Kepercayaan masyarakat adalah aset paling berharga sebuah institusi pers.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Tindakan yang paling tepat jika kamu menemukan artikel majalah sekolah memuat kekeliruan tanggal acara adalah...',
        options: [
          { label: 'A', text: 'Mengirimkan ralat atau surat koreksi kepada tim redaksi majalah sekolah secara santun' },
          { label: 'B', text: 'Merobek mading sekolah di lorong kelas' },
          { label: 'C', text: 'Memaki tim redaksi di media sosial' },
          { label: 'D', text: 'Memboikot seluruh kegiatan sekolah' }
        ],
        correctAnswer: 'A',
        explanation: 'Mengajukan koreksi melalui mekanisme redaksi mencerminkan budaya literasi yang matang.',
        competencyLevel: 'Penerapan (MOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Lembaga independen yang mengawasi pelaksanaan Kode Etik Jurnalistik di Indonesia adalah...',
        options: [
          { label: 'A', text: 'Dewan Pers' },
          { label: 'B', text: 'KPK' },
          { label: 'C', text: 'KPU' },
          { label: 'D', text: 'Bawaslu' }
        ],
        correctAnswer: 'A',
        explanation: 'Dewan Pers mengawasi penegakan kode etik jurnalistik nasional.',
        points: 10
      },
      {
        id: 2,
        question: 'Prinsip peliputan berimbang dari dua sisi narasumber yang bersengketa dikenal sebagai...',
        options: [
          { label: 'A', text: 'Cover Both Sides' },
          { label: 'B', text: 'Clickbait' },
          { label: 'C', text: 'Broadcast' },
          { label: 'D', text: 'Single Source' }
        ],
        correctAnswer: 'A',
        explanation: 'Cover both sides menjamin keadilan pemaparan fakta.',
        points: 10
      },
      {
        id: 3,
        question: 'Hak seseorang untuk meluruskan pemberitaan yang tidak benar dan merugikan nama baiknya disebut...',
        options: [
          { label: 'A', text: 'Hak Jawab' },
          { label: 'B', text: 'Hak Tolak' },
          { label: 'C', text: 'Hak Veto' },
          { label: 'D', text: 'Hak Pilih' }
        ],
        correctAnswer: 'A',
        explanation: 'Hak Jawab adalah hak meluruskan kekeliruan fakta dalam pemberitaan.',
        points: 10
      },
      {
        id: 4,
        question: 'Hak wartawan untuk menolak mengungkapkan identitas narasumber rahasia demi keselamatan narasumber di depan hukum disebut...',
        options: [
          { label: 'A', text: 'Hak Tolak' },
          { label: 'B', text: 'Hak Jawab' },
          { label: 'C', text: 'Hak Paten' },
          { label: 'D', text: 'Hak Banding' }
        ],
        correctAnswer: 'A',
        explanation: 'Hak Tolak melindungi kerahasiaan narasumber terpercaya.',
        points: 10
      },
      {
        id: 5,
        question: 'Struktur penulisan berita piramida terbalik menempatkan informasi paling krusial di bagian...',
        options: [
          { label: 'A', text: 'Awal (Lead / Teras Berita)' },
          { label: 'B', text: 'Paling akhir' },
          { label: 'C', text: 'Tengah' },
          { label: 'D', text: 'Lampiran' }
        ],
        correctAnswer: 'A',
        explanation: 'Lead di awal memuat fakta 5W+1H esensial.',
        points: 10
      },
      {
        id: 6,
        question: 'Identitas anak yang menjadi korban atau pelaku tindak pidana dalam berita pers...',
        options: [
          { label: 'A', text: 'Wajib dirahasiakan dan disamarkan (inisial)' },
          { label: 'B', text: 'Boleh disebarkan jika ada izin teman' },
          { label: 'C', text: 'Harus dipajang foto wajahnya' },
          { label: 'D', text: 'Disebutkan nomor induk siswanya' }
        ],
        correctAnswer: 'A',
        explanation: 'Undang-undang melindungi masa depan dan privasi anak.',
        points: 10
      },
      {
        id: 7,
        question: 'Undang-undang yang menjadi payung hukum kemerdekaan pers di Indonesia adalah...',
        options: [
          { label: 'A', text: 'UU No. 40 Tahun 1999 tentang Pers' },
          { label: 'B', text: 'UU Jalan Tol' },
          { label: 'C', text: 'UU Perkeretaapian' },
          { label: 'D', text: 'UU Pertambangan' }
        ],
        correctAnswer: 'A',
        explanation: 'UU No. 40 Tahun 1999 adalah payung hukum pers nasional.',
        points: 10
      },
      {
        id: 8,
        question: 'Orang yang memimpin redaksi dan bertanggung jawab penuh secara hukum atas seluruh isi materi penerbitan pers adalah...',
        options: [
          { label: 'A', text: 'Pemimpin Redaksi (Pemred)' },
          { label: 'B', text: 'Sopir kantor' },
          { label: 'C', text: 'Penjual koran keliling' },
          { label: 'D', text: 'Tukang cetak' }
        ],
        correctAnswer: 'A',
        explanation: 'Pemimpin Redaksi memikul tanggung jawab editorial tertinggi.',
        points: 10
      },
      {
        id: 9,
        question: 'Pemberitaan yang hanya menyalin kabar angin tanpa verifikasi dan membumbuinya dengan kebohongan demi sensasi disebut...',
        options: [
          { label: 'A', text: 'Jurnalisme Kuning (Sensasionalisme)' },
          { label: 'B', text: 'Jurnalisme Investigasi' },
          { label: 'C', text: 'Jurnalisme Data' },
          { label: 'D', text: 'Jurnalisme Presisi' }
        ],
        correctAnswer: 'A',
        explanation: 'Jurnalisme kuning mengeksploitasi sensasi tanpa kepatuhan etika verifikasi.',
        points: 10
      },
      {
        id: 10,
        question: 'Manfaat mendirikan klub pers dan mading digital bagi peserta didik di SMPN 5 Kroya adalah...',
        options: [
          { label: 'A', text: 'Melatih keterampilan literasi kritis, komunikasi efektif, keberanian bertanya, dan tanggung jawab etika publik' },
          { label: 'B', text: 'Belajar menyebarkan gosip teman' },
          { label: 'C', text: 'Mendapatkan nilai tanpa ujian' },
          { label: 'D', text: 'Menghindari pelajaran sekolah' }
        ],
        correctAnswer: 'A',
        explanation: 'Klub jurnalistik sekolah menumbuhkan kematangan berpikir kritis dan integritas komunikasi.',
        points: 10
      }
    ]
  }
];
