import { Topic } from '../types/curriculum';

export const COMPREHENSIVE_TOPICS: Topic[] = [
  // ------------------------------------------
  // KELAS 7 - APLIKASI PRESENTASI - GOOGLE SLIDES
  // ------------------------------------------
  {
    id: 'k7-gslide',
    grade: 7,
    title: 'Aplikasi Presentasi – Google Slides',
    category: 'Teknologi Informasi dan Komunikasi (TIK)',
    shortDesc: 'Merancang presentasi visual yang memikat: prinsip desain slide, aturan 10-20-30, transisi bermakna, dan kolaborasi paparan daring.',
    learningObjectives: [
      'Memahami fungsi Google Slides untuk komunikasi visual efektif.',
      'Menerapkan prinsip desain slide: kontras, keterbacaan, dan hierarki visual.',
      'Menyisipkan multimedia (gambar, video, grafik) secara proporsional.',
      'Mempraktikkan teknik presentasi daring dan mode presenter (Presenter View).'
    ],
    apersepsi: {
      imagePromptDesc: 'Siswa SMP sedang percaya diri mempresentasikan slide proyek informatika di depan proyektor kelas.',
      videoTitle: 'Rahasia Presentasi Menarik: Mengapa Terlalu Banyak Teks Membuat Audiens Tertidur?',
      videoDuration: '04:20',
      videoThumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
      videoDescription: 'Tips praktis mengubah slide penuh teks membosankan menjadi presentasi visual yang memikat perhatian penonton.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=V8eLdbKXGzk',
      realLifeStory: 'Dua kelompok siswa mempresentasikan tugas informatika di lab SMPN 5 Kroya. Kelompok A membuat 15 slide yang penuh dengan paragraf teks panjang berukuran kecil yang dibacakan kata demi kata. Audiens tampak mengantuk. Kelompok B hanya membuat 6 slide dengan gambar berkualitas tinggi, kata kunci singkat, dan diagram alur yang jelas. Seluruh kelas menyimak antusias. Apa yang membuat slide kelompok B jauh lebih berhasil?',
      triggerQuestions: [
        'Mengapa slide presentasi tidak boleh diperlakukan seperti lembar buku cetak yang disalin utuh?',
        'Berapa jumlah warna dan font ideal dalam satu tema presentasi?',
        'Kapan animasi slide bermanfaat, dan kapan animasi justru mengganggu audiens?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Prinsip utama pembuatan slide presentasi yang efektif adalah...',
        options: [
          { label: 'A', text: 'Slide berisi poin-poin kunci dan visual pendukung, bukan menyalin seluruh paragraf teks' },
          { label: 'B', text: 'Menuliskan sebanyak mungkin kalimat agar terlihat pintar' },
          { label: 'C', text: 'Menggunakan 10 warna berbeda di setiap kata' },
          { label: 'D', text: 'Memberi animasi berputar pada semua huruf' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Prinsip Presentasi',
        recommendation: 'Slide adalah alat bantu visual penyampai pesan, bukan naskah bacaan.'
      },
      {
        id: 2,
        question: 'Aturan presentasi terkenal "10-20-30" dari Guy Kawasaki menyarankan agar ukuran font minimal yang digunakan adalah...',
        options: [
          { label: 'A', text: '30 poin' },
          { label: 'B', text: '10 poin' },
          { label: 'C', text: '8 poin' },
          { label: 'D', text: '100 poin' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Ukuran Font Slide',
        recommendation: 'Font minimal 28-30pt menjamin slide dapat terbaca jelas dari baris belakang kelas.'
      },
      {
        id: 3,
        question: 'Efek perpindahan visual dari satu slide ke slide berikutnya saat presentasi berganti disebut...',
        options: [
          { label: 'A', text: 'Transisi (Transition)' },
          { label: 'B', text: 'Animasi Objek' },
          { label: 'C', text: 'Hyperlink' },
          { label: 'D', text: 'Formatting' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Transisi Slide',
        recommendation: 'Transisi mengatur perpindahan antarslide, animasi mengatur pergerakan objek di dalam slide.'
      },
      {
        id: 4,
        question: 'Fitur pada Google Slides yang memungkinkan presenter melihat catatan pembicara (speaker notes) dan pengatur waktu di layar laptop tanpa terlihat oleh penonton di proyektor adalah...',
        options: [
          { label: 'A', text: 'Presenter View (Tampilan Penyaji)' },
          { label: 'B', text: 'Full Screen Biasa' },
          { label: 'C', text: 'Thumbnail View' },
          { label: 'D', text: 'Grid View' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Presenter View',
        recommendation: 'Presenter View memandu pembicara tetap fokus tanpa diketahui penonton proyektor.'
      },
      {
        id: 5,
        question: 'Template induk yang mengatur tata letak, font default, dan logo di semua slide secara serempak dinamakan...',
        options: [
          { label: 'A', text: 'Slide Master (Edit Tema)' },
          { label: 'B', text: 'Clip Art' },
          { label: 'C', text: 'WordArt' },
          { label: 'D', text: 'Drawing Pad' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Slide Master',
        recommendation: 'Slide Master menyeragamkan format identitas slide.'
      }
    ],
    materi: {
      overview: 'Google Slides adalah platform presentasi kolaboratif berbasis cloud yang memungkinkan perancangan materi paparan visual interaktif dengan dukungan media, transisi elegan, dan kerja sama tim secara real-time.',
      keyConcepts: [
        {
          title: '1. Desain Visual dan Prinsip Keterbacaan',
          explanation: 'Membuat slide yang memikat dan mudah dipahami dalam 3 detik pertama.',
          bulletPoints: [
            'Kontras Warna: Teks gelap di atas latar terang, atau teks terang di atas latar gelap.',
            'Kombinasi Font: Maksimal 2 jenis font (1 font judul + 1 font isi).',
            'Ruang Bernapas (White Space): Berikan ruang kosong yang cukup di sekitar objek.'
          ],
          iconName: 'Layout'
        },
        {
          title: '2. Kaidah Konten: Aturan 10/20/30 dan 6x6',
          explanation: 'Pedoman proporsional materi agar tidak membebani kognisi audiens.',
          bulletPoints: [
            'Aturan 10-20-30: 10 slide, 20 menit durasi, ukuran font minimal 30pt.',
            'Aturan 6x6: Maksimal 6 butir per slide, maksimal 6 kata per butir.'
          ],
          iconName: 'Sliders'
        },
        {
          title: '3. Multimedia dan Mode Penyaji (Presenter View)',
          explanation: 'Memaksimalkan fitur interaktif saat tampil di depan kelas.',
          bulletPoints: [
            'Sematkan video YouTube langsung di slide dengan penentuan waktu mulai otomatis.',
            'Manfaatkan Speaker Notes untuk menulis poin pengingat pidato.'
          ],
          iconName: 'Video'
        }
      ],
      comparisonTable: {
        title: 'Komparasi Slide Efektif vs Slide Tidak Efektif',
        headers: ['Kriteria', 'Slide Efektif (Juara)', 'Slide Tidak Efektif (Membosankan)'],
        rows: [
          ['Kerapatan Teks', 'Kata kunci esensial + poin singkat (6x6)', 'Menyalin seluruh bab buku menjadi dinding teks'],
          ['Gambar', 'Foto beresolusi tinggi yang relevan dan bermakna', 'Gambar pecah/buram atau clip art tidak nyambung'],
          ['Animasi', 'Subtle dan konsisten (Fade halus)', 'Animasi berputar-putar liar yang memusingkan mata'],
          ['Peran Presenter', 'Bercerita dan menjelaskan makna di balik gambar', 'Membelakangi penonton dan membaca tulisan di layar']
        ]
      },
      dailyLifeExamples: [
        'Membuat slide portofolio karya seni untuk pameran sekolah.',
        'Mempresentasikan ide kampanye pemilihan ketua OSIS dengan visual menarik.'
      ],
      schoolExamples: [
        'Siswa kelas 7 mempresentasikan hasil observasi Berpikir Komputasional di hadapan guru dan teman-teman menggunakan Google Slides di Interactive Flat Panel (IFP).'
      ],
      tahukahKamu: 'Audiens memproses informasi visual gambar 60.000 kali lebih cepat daripada teks tertulis! Itulah alasan mengapa sebuah gambar berkualitas bernilai ribuan kata dalam slide presentasi.',
      faktaMenarik: 'Google Slides mendukung sesi Q&A (Tanya Jawab) interaktif di mana penonton di kelas bisa mengirim pertanyaan secara langsung dari smartphone mereka ke layar proyektor.',
      infoPenting: 'Jangan pernah membaca slide kata demi kata di hadapan penonton. Pandanglah mata audiens (eye contact) dan jadikan slide sebagai pengingat visual alur cerita.',
      commonMistakes: [
        'Menggunakan warna font abu-abu muda di atas latar putih sehingga teks tidak terbaca saat disorot lampu proyektor lab.',
        'Menumpuk terlalu banyak animasi gerak pada setiap kalimat.'
      ],
      summary: [
        'Slide adalah alat bantu visual, bukan naskah pidato.',
        'Patuhi aturan keterbacaan kontras dan ukuran font minimal 30pt.',
        'Gunakan Presenter View untuk memandu penampilan percaya diri.'
      ],
      formativeCheck: [
        {
          question: 'Berapakah jumlah jenis font maksimal yang direkomendasikan dalam satu presentasi yang rapi dan profesional?',
          options: ['Maksimal 2 jenis font', 'Minimal 8 jenis font', 'Bebas setiap baris berbeda font', 'Hanya 10 font'],
          answerIndex: 0,
          explanation: 'Benar! Membatasi maksimal 2 jenis font menjaga konsistensi dan estetika profesional presentasi.'
        }
      ]
    },
    simulasi: {
      type: 'sequence',
      title: 'Lab Interaktif: Menyusun Struktur Slide Presentasi Juara',
      scenario: 'Urutkan 4 tahapan alur presentasi berikut agar tersusun menjadi pemaparan yang logis dan memikat!',
      instructions: 'Susun urutan presentasi dari pembuka hingga penutup.',
      data: {
        steps: [
          { id: 'sl-1', code: '1. Slide Judul & Pengait Perhatian (Hook masalah menarik)', order: 1 },
          { id: 'sl-2', code: '2. Penjelasan Inti Solusi & Bukti Data Grafis', order: 2 },
          { id: 'sl-3', code: '3. Contoh Penerapan Nyata di Sekolah', order: 3 },
          { id: 'sl-4', code: '4. Kesimpulan & Ajakan Bertindak (Call to Action)', order: 4 }
        ]
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Kuis Kilat Presentasi Keren',
      description: 'Uji wawasanmu seputar tips presentasi modern!',
      questions: [
        {
          id: 1,
          question: 'Kombinasi warna teks dan latar belakang yang paling mudah terbaca dari kejauhan proyektor adalah...',
          options: ['Teks Gelap di Latar Terang (Kontras Tinggi)', 'Teks Kuning di Latar Putih', 'Teks Merah di Latar Biru Tua', 'Teks Abu-abu di Latar Hitam'],
          correctIndex: 0,
          clue: 'Kontras tinggi memudahkan mata.'
        },
        {
          id: 2,
          question: 'Tombol keyboard untuk memulai peragaan slide (Start Slideshow) dari awal adalah...',
          options: ['F5 / Ctrl + F5', 'Esc', 'Space', 'Backspace'],
          correctIndex: 0,
          clue: 'F5 adalah tombol standar slideshow.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Kaidah "6x6" dalam perancangan slide presentasi bermakna...',
        options: [
          { label: 'A', text: 'Maksimal 6 butir per slide dan maksimal 6 kata per butir teks' },
          { label: 'B', text: 'Ukuran layar harus 6 meter kali 6 meter' },
          { label: 'C', text: 'Presentasi hanya boleh diadakan jam 6 pagi dan 6 sore' },
          { label: 'D', text: 'Jumlah slide wajib 36 slide' }
        ],
        correctAnswer: 'A',
        explanation: 'Aturan 6x6 mencegah kepenuhan teks dalam satu lembar slide.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Perbedaan utama antara Efek Transisi dan Efek Animasi pada Google Slides adalah...',
        options: [
          { label: 'A', text: 'Transisi terjadi pada perpindahan antarslide, sedangkan animasi diterapkan pada elemen objek di dalam slide' },
          { label: 'B', text: 'Transisi bersuara, animasi bisu' },
          { label: 'C', text: 'Animasi hanya untuk video' },
          { label: 'D', text: 'Keduanya persis sama tanpa perbedaan' }
        ],
        correctAnswer: 'A',
        explanation: 'Transisi bekerja di tingkat slide, animasi bekerja di tingkat objek (teks/gambar/bentuk).',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Saat proyektor kelas menyala, mengapa latar belakang putih bersih sering kali lebih disukai dibanding latar hitam legam pada ruang kelas yang terang benderang?',
        options: [
          { label: 'A', text: 'Karena di ruang kelas dengan banyak jendela cahaya, latar terang dengan teks gelap menghasilkan kontras yang lebih tajam dan tidak pudar' },
          { label: 'B', text: 'Karena proyektor tidak punya warna hitam' },
          { label: 'C', text: 'Agar laptop hemat baterai' },
          { label: 'D', text: 'Supaya proyektor dingin' }
        ],
        correctAnswer: 'A',
        explanation: 'Kondisi pencahayaan ruangan kelas mempengaruhi keterbacaan proyeksi.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 4,
        question: 'Pintasan keyboard untuk menduplikasi slide yang dipilih secara cepat di Google Slides adalah...',
        options: [
          { label: 'A', text: 'Ctrl + D' },
          { label: 'B', text: 'Ctrl + P' },
          { label: 'C', text: 'Ctrl + Z' },
          { label: 'D', text: 'Ctrl + M' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + D menduplikasi slide atau objek yang dipilih.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Tindakan yang paling tepat saat berbicara di depan kelas menggunakan slide presentasi adalah...',
        options: [
          { label: 'A', text: 'Melakukan kontak mata dengan penonton dan menggunakan slide hanya sebagai acuan visual' },
          { label: 'B', text: 'Menatap layar laptop terus-menerus tanpa menoleh ke teman-teman' },
          { label: 'C', text: 'Membaca setiap kata persis seperti yang tertulis di slide' },
          { label: 'D', text: 'Berbicara dengan suara sangat pelan sambil membungkuk' }
        ],
        correctAnswer: 'A',
        explanation: 'Kontak mata dan komunikasi dua arah adalah inti presentasi yang hidup.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 6,
        question: 'Fitur "Speaker Notes" (Catatan Pembicara) berfungsi untuk...',
        options: [
          { label: 'A', text: 'Mencatat pengingat materi penting yang hanya terlihat oleh penyaji di laptopnya' },
          { label: 'B', text: 'Menambah volume speaker' },
          { label: 'C', text: 'Merekam suara guru' },
          { label: 'D', text: 'Mengunggah tugas ke drive' }
        ],
        correctAnswer: 'A',
        explanation: 'Speaker notes membantu presenter mengingat detail penting tanpa memenuhi tampilan slide.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Jika ingin menyisipkan grafik yang datanya dapat diperbarui otomatis saat tabel angka diubah, kita dapat menautkan Google Slides dengan...',
        options: [
          { label: 'A', text: 'Google Sheets' },
          { label: 'B', text: 'Google Maps' },
          { label: 'C', text: 'Google Translate' },
          { label: 'D', text: 'Google Earth' }
        ],
        correctAnswer: 'A',
        explanation: 'Grafik dari Google Sheets dapat ditautkan (linked) ke Google Slides secara dinamis.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Mengapa menyertakan terlalu banyak animasi berlebihan (seperti teks memantul atau berputar spiral) justru memperburuk presentasi?',
        options: [
          { label: 'A', text: 'Mengalihkan fokus audiens dari pesan inti dan membuang waktu tunggu pemaparan' },
          { label: 'B', text: 'Membuat proyektor meledak' },
          { label: 'C', text: 'Menghapus teks' },
          { label: 'D', text: 'Mengubah format file' }
        ],
        correctAnswer: 'A',
        explanation: 'Animasi berlebihan mengganggu pemrosesan informasi (cognitive overload).',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 9,
        question: 'Format rasio aspek (Aspect Ratio) standar yang paling sesuai untuk proyektor dan layar monitor modern saat ini adalah...',
        options: [
          { label: 'A', text: '16:9 (Layar Lebar / Widescreen)' },
          { label: 'B', text: '4:3 (Kotak Kuno)' },
          { label: 'C', text: '1:1 (Persegi)' },
          { label: 'D', text: '9:16 (Vertikal)' }
        ],
        correctAnswer: 'A',
        explanation: '16:9 adalah standar layar lebar TV, proyektor HDMI, dan monitor laptop modern.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 10,
        question: 'Bagaimana cara membagikan presentasi Google Slides kepada kelompok lain agar mereka hanya bisa melihat tanpa mengubah isi desain kita?',
        options: [
          { label: 'A', text: 'Bagikan link dengan hak akses "Viewer" (Pengakses Lihat-Saja)' },
          { label: 'B', text: 'Bagikan sebagai Editor' },
          { label: 'C', text: 'Kirim kata sandi akun email pribadi' },
          { label: 'D', text: 'Hapus file tersebut' }
        ],
        correctAnswer: 'A',
        explanation: 'Hak akses Viewer melindungi slide dari pengubahan tak sengaja pihak luar.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Format rasio layar lebar modern yang menjadi standar Google Slides adalah...',
        options: [
          { label: 'A', text: '16:9' },
          { label: 'B', text: '4:3' },
          { label: 'C', text: '3:2' },
          { label: 'D', text: '1:1' }
        ],
        correctAnswer: 'A',
        explanation: '16:9 adalah rasio aspek widescreen standar.',
        points: 10
      },
      {
        id: 2,
        question: 'Ukuran font minimal yang dianjurkan untuk teks isi slide agar terbaca dari baris belakang adalah...',
        options: [
          { label: 'A', text: '28-30 poin' },
          { label: 'B', text: '10 poin' },
          { label: 'C', text: '12 poin' },
          { label: 'D', text: '8 poin' }
        ],
        correctAnswer: 'A',
        explanation: 'Font minimal 28-30pt menjamin keterbacaan optimal.',
        points: 10
      },
      {
        id: 3,
        question: 'Pintasan untuk keluar dari mode peragaan slide (Slideshow) adalah menekan tombol...',
        options: [
          { label: 'A', text: 'Esc (Escape)' },
          { label: 'B', text: 'Enter' },
          { label: 'C', text: 'Space' },
          { label: 'D', text: 'Tab' }
        ],
        correctAnswer: 'A',
        explanation: 'Tombol Esc menghentikan peragaan tayangan presentasi.',
        points: 10
      },
      {
        id: 4,
        question: 'Efek visual gerak pada objek teks atau gambar di dalam satu lembar slide disebut...',
        options: [
          { label: 'A', text: 'Animasi (Animation)' },
          { label: 'B', text: 'Transisi (Transition)' },
          { label: 'C', text: 'Layout' },
          { label: 'D', text: 'Theme' }
        ],
        correctAnswer: 'A',
        explanation: 'Animasi mengatur perilaku objek di dalam slide.',
        points: 10
      },
      {
        id: 5,
        question: 'Ekstensi file presentasi standar Microsoft PowerPoint yang kompatibel dengan Google Slides adalah...',
        options: [
          { label: 'A', text: '.pptx' },
          { label: 'B', text: '.docx' },
          { label: 'C', text: '.xlsx' },
          { label: 'D', text: '.txt' }
        ],
        correctAnswer: 'A',
        explanation: '.pptx adalah format file PowerPoint.',
        points: 10
      },
      {
        id: 6,
        question: 'Pengaturan latar belakang slide yang paling aman untuk proyektor adalah kontras tinggi, artinya...',
        options: [
          { label: 'A', text: 'Warna teks sangat kontras berbeda dengan warna latar (misal teks hitam di atas latar putih)' },
          { label: 'B', text: 'Teks dan latar sama-sama kuning' },
          { label: 'C', text: 'Semua elemen transparan' },
          { label: 'D', text: 'Latar selalu berkedip' }
        ],
        correctAnswer: 'A',
        explanation: 'Kontras tinggi menjaga teks terbaca di segala pencahayaan proyektor.',
        points: 10
      },
      {
        id: 7,
        question: 'Fitur "Explore" (Pelajari) di Google Slides memberikan rekomendasi otomatis tentang...',
        options: [
          { label: 'A', text: 'Tata letak desain slide yang rapi dan estetis secara instan' },
          { label: 'B', text: 'Harga tiket pesawat' },
          { label: 'C', text: 'Resep masakan' },
          { label: 'D', text: 'Nomor telepon teman' }
        ],
        correctAnswer: 'A',
        explanation: 'Explore menyarankan layout cerdas berdasarkan elemen yang ada di slide.',
        points: 10
      },
      {
        id: 8,
        question: 'Saat presentasi daring via Google Meet, mode yang sebaiknya dibagikan agar slide tampil mulus adalah...',
        options: [
          { label: 'A', text: 'Bagikan Tab (A Tab) khusus Google Slides' },
          { label: 'B', text: 'Mematikan kamera' },
          { label: 'C', text: 'Mematikan mikrofon selamanya' },
          { label: 'D', text: 'Membagikan file sampah' }
        ],
        correctAnswer: 'A',
        explanation: 'Mode Bagikan Tab mengoptimalkan transmisi video dan animasi audio.',
        points: 10
      },
      {
        id: 9,
        question: 'Kombinasi tombol pintasan untuk menambah slide baru (New Slide) adalah...',
        options: [
          { label: 'A', text: 'Ctrl + M' },
          { label: 'B', text: 'Ctrl + N' },
          { label: 'C', text: 'Ctrl + O' },
          { label: 'D', text: 'Ctrl + K' }
        ],
        correctAnswer: 'A',
        explanation: 'Ctrl + M menyisipkan slide baru.',
        points: 10
      },
      {
        id: 10,
        question: 'Tujuan utama dari pembuatan slide presentasi di sekolah adalah...',
        options: [
          { label: 'A', text: 'Mengomunikasikan gagasan dan hasil belajar secara jelas, persuasif, dan memikat kepada audiens' },
          { label: 'B', text: 'Menghabiskan kuota internet' },
          { label: 'C', text: 'Menghindari berbicara di depan orang banyak' },
          { label: 'D', text: 'Menyalin artikel Wikipedia tanpa dibaca' }
        ],
        correctAnswer: 'A',
        explanation: 'Presentasi melatih keterampilan komunikasi ilmiah dan public speaking.',
        points: 10
      }
    ]
  },

  // KELAS 8 - Komunikasi dan Kolaborasi di Ruang Digital
  {
    id: 'k8-digital-etika',
    grade: 8,
    title: 'Komunikasi dan Kolaborasi di Ruang Digital',
    category: 'Etika Digital & Karakter Siber',
    shortDesc: 'Menjelajahi etika berinternet (netiket), rekam jejak digital abadi, toleransi empati siber, pencegahan cyberbullying, dan kreasi konten positif.',
    learningObjectives: [
      'Menerapkan tata krama dan etika komunikasi digital (Netiket).',
      'Memahami sifat permanen rekam jejak digital (Digital Footprint).',
      'Menumbuhkan empati dan toleransi di tengah keberagaman ruang digital.',
      'Mencegah dan mengatasi perundungan siber (Cyberbullying) serta memproduksi konten edukatif positif.'
    ],
    apersepsi: {
      imagePromptDesc: 'Siswa SMP saling menyemangati secara online dengan pesan positif, menolak komentar jahat dan perundungan siber.',
      videoTitle: 'Etika Bermedia Sosial (Netiquette / Netiket Digital)',
      videoDuration: '04:35',
      videoThumbnail: 'https://i.ytimg.com/vi/uXuYeAXr0wc/hqdefault.jpg',
      videoDescription: 'Panduan netiket: cara berkomunikasi yang santun, menghindari perundungan siber, dan menjaga jejak digital yang positif.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=uXuYeAXr0wc',
      realLifeStory: 'Di sebuah grup percakapan kelas 8 SMPN 5 Kroya, seorang siswa secara sengaja mengirim foto teman sekelasnya yang sedang menguap lucu lalu menambahkan tulisan mengejek. Beberapa teman tertawa, namun siswa yang fotonya diedit merasa malu, menangis, dan tidak mau masuk sekolah keesokan harinya. Pelaku beralasan "Saya cuma bercanda, tidak ada niat jahat!". Di mana batas antara lelucon dan perundungan di dunia maya?',
      triggerQuestions: [
        'Mengapa orang sering kali merasa lebih berani berbicara kasar di media sosial dibanding saat bertatap muka langsung?',
        'Dapatkah sebuah postingan yang sudah dihapus tetap tersimpan dan terlacak oleh orang lain?',
        'Apa langkah nyata yang harus kamu ambil jika melihat temanmu menjadi korban perundungan siber?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Tata krama atau aturan sopan santun dalam berkomunikasi melalui media digital dan internet disebut...',
        options: [
          { label: 'A', text: 'Netiket (Network Etiquette)' },
          { label: 'B', text: 'Algorithm' },
          { label: 'C', text: 'Firewall' },
          { label: 'D', text: 'Database' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Netiket',
        recommendation: 'Netiket adalah etika berinteraksi di ruang siber.'
      },
      {
        id: 2,
        question: 'Jejak data yang kita tinggalkan saat beraktivitas di internet (seperti riwayat pencarian, komentar, foto, dan lokasi) disebut...',
        options: [
          { label: 'A', text: 'Rekam Jejak Digital (Digital Footprint)' },
          { label: 'B', text: 'Password Manager' },
          { label: 'C', text: 'Bookmark' },
          { label: 'D', text: 'Cache Memory' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Jejak Digital',
        recommendation: 'Jejak digital bersifat permanen dan sulit dihapus sepenuhnya.'
      },
      {
        id: 3,
        question: 'Tindakan mengirimkan komentar jahat, mengancam, mempermalukan, atau mengucilkan seseorang berulang kali di media sosial dinamakan...',
        options: [
          { label: 'A', text: 'Perundungan Siber (Cyberbullying)' },
          { label: 'B', text: 'Kolaborasi Digital' },
          { label: 'C', text: 'Sharing Informasi' },
          { label: 'D', text: 'Debugging' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Cyberbullying',
        recommendation: 'Pahami bahaya psikologis perundungan siber.'
      },
      {
        id: 4,
        question: 'Menulis pesan dengan SEMUA HURUF BESAR (KAPITAL) di ruang obrolan digital diartikan sebagai...',
        options: [
          { label: 'A', text: 'Membentak, berteriak, atau bernada marah' },
          { label: 'B', text: 'Pesan yang sangat sopan' },
          { label: 'C', text: 'Pesan rahasia' },
          { label: 'D', text: 'Lelucon lucu' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Etika Penulisan Pesan',
        recommendation: 'Hindari penggunaan huruf kapital semua dalam komunikasi daring.'
      },
      {
        id: 5,
        question: 'Peran orang yang menyaksikan perundungan siber lalu berani membela korban atau melaporkannya ke guru/pihak berwenang disebut...',
        options: [
          { label: 'A', text: 'Upstander' },
          { label: 'B', text: 'Bystander Pasif' },
          { label: 'C', text: 'Hacker' },
          { label: 'D', text: 'Troll' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Upstander',
        recommendation: 'Jadilah Upstander yang berani menghentikan perundungan.'
      }
    ],
    materi: {
      overview: 'Ruang digital adalah perluasan dari kehidupan sosial nyata. Etika, empati, penghormatan atas martabat sesama, dan tanggung jawab rekam jejak digital merupakan pondasi karakter 8 Dimensi Profil Lulusan Kemendikdasmen yang unggul.',
      keyConcepts: [
        {
          title: '1. Netiket (Etika Digital)',
          explanation: 'Prinsip dasar bertata krama di ruang siber.',
          bulletPoints: [
            'Ingat bahwa di balik layar ada manusia nyata yang memiliki perasaan.',
            'Gunakan salam pembuka, bahasa santun, dan perhatikan waktu pengiriman pesan.',
            'Hindari penggunaan huruf kapital semua (SHOUTING) dan kata-kata bernada sarkasme berlebihan.'
          ],
          iconName: 'Smile'
        },
        {
          title: '2. Rekam Jejak Digital Pasif dan Aktif',
          explanation: 'Segala jejak yang tertinggal di internet bersifat abadi dan dapat ditelusuri kembali.',
          bulletPoints: [
            'Jejak Aktif: Komentar yang kita ketik, foto yang kita unggah, status yang kita buat.',
            'Jejak Pasif: Alamat IP, riwayat klik, data pencarian, lokasi koordinat GPS.',
            'Prinsip "Think Before You Post": Apakah ini benar, bermanfaat, dan tidak menyakiti orang lain?'
          ],
          iconName: 'Footprints'
        },
        {
          title: '3. Melawan Cyberbullying & Membangun Konten Positif',
          explanation: 'Menciptakan lingkungan digital sekolah yang aman, suportif, dan kreatif.',
          bulletPoints: [
            'Kenali bentuk cyberbullying: Flaming (menghina), Harassment (meneror), Doxxing (menyebar data pribadi).',
            'Langkah korban: Jangan membalas, simpan tangkapan layar (screenshot), blokir pelaku, laporkan ke guru BK/orang tua.',
            'Gunakan teknologi untuk menyebarkan karya kreatif, video edukasi, dan inspirasi kebaikan.'
          ],
          iconName: 'ShieldCheck'
        }
      ],
      comparisonTable: {
        title: 'Komparasi Komunikasi Positif vs Negatif di Ruang Digital',
        headers: ['Situasi', 'Tindakan Beretika (Cerdas)', 'Tindakan Melanggar Etika (Toksik)'],
        rows: [
          ['Berbeda Pendapat', 'Menyampaikan argumen dengan data santun dan menghargai pandangan orang lain', 'Menyerang fisik, memaki, atau melontarkan kata-kata rasis'],
          ['Melihat Foto Aib Teman', 'Tidak ikut menyebarkan dan mengingatkan teman lain untuk menghapusnya', 'Menjadikannya bahan meme viral untuk ditertawakan bersama'],
          ['Mengirim Chat ke Guru', '"Selamat siang Bapak Rifani, mohon maaf mengganggu. Saya Budi kelas 8A ingin menanyakan tugas..."', '"Pak kumpul tugas kpn?" (tanpa salam, tanpa nama, dikirim jam 23.00 malam)'],
          ['Menanggapi Komentar Negatif', 'Menanggapi dengan tenang atau mengabaikan jika berupa provokasi kosong', 'Membalas dengan sumpah serapah yang memperpanjang keributan online']
        ]
      },
      dailyLifeExamples: [
        'Mengucapkan terima kasih di grup WhatsApp setelah teman kelompok membagikan materi rangkuman.',
        'Membuat video tutorial pembuatan animasi Scratch untuk membantu adik kelas.'
      ],
      schoolExamples: [
        'Deklarasi anti-cyberbullying bersama OSIS SMP Negeri 5 Kroya dengan menandatangani komitmen internet sehat di mading sekolah.'
      ],
      tahukahKamu: 'Banyak universitas ternama dan perusahaan multinasional kini memeriksa riwayat akun media sosial calon mahasiswa atau karyawannya sebelum menerima mereka!',
      faktaMenarik: 'Menyebarkan informasi pribadi orang lain tanpa izin (seperti nomor telepon rumah atau foto aib keluarga) dikenal dengan istilah Doxxing dan dapat dituntut secara pidana!',
      infoPenting: 'Jika kamu merasa tertekan atau menjadi korban perundungan siber, jangan dipendam sendirian. Bicaralah kepada guru BK, wali kelas, atau orang tua. Kamu berhak merasa aman di dunia maya.',
      commonMistakes: [
        'Menganggap komentar kasar sebagai "cuma candaan" tanpa memikirkan dampaknya bagi kesehatan mental korban.',
        'Membagikan tangkapan layar chat pribadi teman ke grup publik tanpa izin.'
      ],
      summary: [
        'Netiket adalah etika sopan santun berkomunikasi digital.',
        'Jejak digital bersifat permanen dan mempengaruhi masa depan.',
        'Jadilah Upstander yang berani menghentikan cyberbullying.'
      ],
      formativeCheck: [
        {
          question: 'Manakah waktu yang paling sopan dan tepat jika siswa ingin mengirimkan pesan WhatsApp menanyakan materi kepada guru mata pelajaran?',
          options: [
            'Pada hari dan jam kerja/sekolah (antara pukul 07.00 hingga 16.00 WIB)',
            'Pukul 23.30 malam saat guru sedang istirahat',
            'Pukul 02.00 dini hari',
            'Kapan saja bebas tanpa batas'
          ],
          answerIndex: 0,
          explanation: 'Benar! Menghargai waktu istirahat guru adalah bagian penting dari etika komunikasi daring.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Interaktif: Detektor Netiket & Respon Bijak',
      scenario: 'Pilah 4 tindakan berikut ke dalam kategori yang tepat: "Praktik Netiket Terpuji" atau "Pelanggaran Netiket"!',
      instructions: 'Kelompokkan setiap tindakan ke wadah yang sesuai.',
      data: {
        items: [
          { id: 'net-1', text: 'Mengirim chat ke guru diawali salam, identitas nama lengkap, dan bahasa santun.', correctCategory: 'Praktik Netiket Terpuji' },
          { id: 'net-2', text: 'Menyebarkan rekaman suara curhat rahasia sahabat ke grup WhatsApp tanpa izin.', correctCategory: 'Pelanggaran Netiket' },
          { id: 'net-3', text: 'Membela teman yang diejek di kolom komentar dan mengajak teman lain berhenti merundung.', correctCategory: 'Praktik Netiket Terpuji' },
          { id: 'net-4', text: 'Menggunakan huruf kapital semua disertai kata-kata makian saat kalah main game online.', correctCategory: 'Pelanggaran Netiket' }
        ],
        categories: ['Praktik Netiket Terpuji', 'Pelanggaran Netiket']
      }
    },
    miniGame: {
      type: 'detective',
      title: 'Detektif Netiket & Empati Digital',
      description: 'Pilih respon paling bijak dalam skenario ruang digital!',
      questions: [
        {
          id: 1,
          question: 'Temanmu membuat kesalahan presentasi di kelas dan ada yang mengunggah videonya ke TikTok untuk diejek. Sikap terbaikmu adalah...',
          options: [
            'Meminta pengunggah menghapus video tersebut, melaporkannya ke guru, dan memberi dukungan moral kepada korban',
            'Ikut menertawakan dan membagikan videonya ke teman lain',
            'Membuat video tandingan yang lebih kasar',
            'Pura-pura tidak tahu'
          ],
          correctIndex: 0,
          clue: 'Upstander bertindak melindungi korban.'
        },
        {
          id: 2,
          question: 'Sebelum mengunggah sebuah postingan di media sosial, pertanyaan filter "THINK" yang tepat adalah...',
          options: [
            'Apakah postingan ini True (Benar), Helpful (Membantu), Inspiring (Menginspirasi), Necessary (Perlu), dan Kind (Baik)?',
            'Apakah postingan ini bisa membuat banyak orang marah?',
            'Berapa banyak uang yang saya dapatkan?',
            'Apakah warnanya merah?'
          ],
          correctIndex: 0,
          clue: 'THINK: True, Helpful, Inspiring, Necessary, Kind.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Mengapa rekam jejak digital (Digital Footprint) sering dikatakan "abadi"?',
        options: [
          { label: 'A', text: 'Karena meskipun kita telah menghapus postingan, orang lain bisa saja telah mengambil tangkapan layar (screenshot) atau data telah diarsip server' },
          { label: 'B', text: 'Karena internet tidak bisa dimatikan' },
          { label: 'C', text: 'Karena kabel internet tahan api' },
          { label: 'D', text: 'Karena semua komputer terbuat dari batu' }
        ],
        correctAnswer: 'A',
        explanation: 'Data digital mudah diduplikasi, disimpan pihak ketiga, dan diindeks mesin pencari sebelum sempat dihapus.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 2,
        question: 'Tindakan menyebarkan informasi identitas pribadi orang lain (seperti alamat rumah, nomor KTP, atau rahasia pribadi) ke publik tanpa izin demi mempermalukan korban disebut...',
        options: [
          { label: 'A', text: 'Doxxing' },
          { label: 'B', text: 'Phishing' },
          { label: 'C', text: 'Spamming' },
          { label: 'D', text: 'Blogging' }
        ],
        correctAnswer: 'A',
        explanation: 'Doxxing adalah penyebaran informasi pribadi target untuk intimidasi publik.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Perbedaan mendasar antara "Bystander" dan "Upstander" saat menyaksikan perundungan siber adalah...',
        options: [
          { label: 'A', text: 'Bystander hanya diam membiarkan perundungan terjadi, sedangkan Upstander aktif bertindak membela korban dan menghentikan pelaku' },
          { label: 'B', text: 'Bystander adalah korban, Upstander adalah pelaku' },
          { label: 'C', text: 'Bystander selalu menggunakan laptop' },
          { label: 'D', text: 'Tidak ada perbedaan' }
        ],
        correctAnswer: 'A',
        explanation: 'Upstander mengambil inisiatif moral membela korban dan melaporkan ke pihak berwenang.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 4,
        question: 'Saat berkomunikasi secara daring, kita tidak bisa melihat ekspresi wajah dan intonasi suara lawan bicara secara langsung. Oleh karena itu, cara mencegah kesalahpahaman adalah...',
        options: [
          { label: 'A', text: 'Menggunakan kata-kata yang jelas, santun, dan emotikon wajar yang sesuai' },
          { label: 'B', text: 'Menggunakan kalimat sindiran yang tajam' },
          { label: 'C', text: 'Mengetik dengan semua huruf besar' },
          { label: 'D', text: 'Tidak pernah membalas pesan' }
        ],
        correctAnswer: 'A',
        explanation: 'Pilihan kata yang jernih dan santun meminimalkan bias interpretasi pesan teks.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Dampak psikologis jangka panjang yang sering dialami oleh korban perundungan siber (Cyberbullying) adalah...',
        options: [
          { label: 'A', text: 'Rasa cemas berlebihan, stres, penurunan prestasi belajar, dan hilangnya rasa percaya diri' },
          { label: 'B', text: 'Menjadi semakin pintar matematika' },
          { label: 'C', text: 'Koneksi internet menjadi lebih kencang' },
          { label: 'D', text: 'Mendapatkan hadiah pulsa gratis' }
        ],
        correctAnswer: 'A',
        explanation: 'Perundungan siber menimbulkan trauma emosional mendalam bagi kesehatan mental korban.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Manakah contoh pemanfaatan teknologi digital untuk produksi konten positif yang bermanfaat bagi masyarakat?',
        options: [
          { label: 'A', text: 'Membuat video tutorial pembelajaran sains sederhana dan membagikannya di kanal edukasi sekolah' },
          { label: 'B', text: 'Membuat akun palsu untuk menyerang akun guru' },
          { label: 'C', text: 'Menyebarkan foto aib orang lain demi menambah follower' },
          { label: 'D', text: 'Menyalin artikel orang lain tanpa menyebut sumbernya' }
        ],
        correctAnswer: 'A',
        explanation: 'Konten edukatif positif memberi nilai tambah wawasan bagi komunitas belajar.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 7,
        question: 'Undang-undang di Indonesia yang memuat sanksi pidana terhadap perbuatan penghinaan, pencemaran nama baik, dan ujaran kebencian di media sosial adalah...',
        options: [
          { label: 'A', text: 'UU Informasi dan Transaksi Elektronik (UU ITE)' },
          { label: 'B', text: 'UU Kesehatan Hewan' },
          { label: 'C', text: 'UU Lalu Lintas Kereta Api' },
          { label: 'D', text: 'UU Tata Kota' }
        ],
        correctAnswer: 'A',
        explanation: 'UU ITE mengatur kepatutan dan konsekuensi hukum aktivitas di dunia siber.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 8,
        question: 'Tindakan yang tepat saat kamu tidak sengaja menerima foto pribadi teman yang bersifat privat dari orang lain adalah...',
        options: [
          { label: 'A', text: 'Menghapus foto tersebut segera dan menegur pengirimnya agar tidak menyebarkannya lagi' },
          { label: 'B', text: 'Meneruskannya ke semua grup kelas' },
          { label: 'C', text: 'Menjadikannya foto profil WhatsApp' },
          { label: 'D', text: 'Mencetaknya dan menempel di mading sekolah' }
        ],
        correctAnswer: 'A',
        explanation: 'Memutus rantai penyebaran melindungi privasi dan martabat korban.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 9,
        question: 'Mengapa empati di ruang digital sangat krusial dimiliki oleh setiap remaja?',
        options: [
          { label: 'A', text: 'Agar mampu merasakan dampak dari kata-kata yang kita ketik terhadap perasaan orang lain sebelum mengirimkannya' },
          { label: 'B', text: 'Supaya baterai smartphone tidak cepat habis' },
          { label: 'C', text: 'Supaya bisa meretas akun teman' },
          { label: 'D', text: 'Agar tidak perlu belajar lagi' }
        ],
        correctAnswer: 'A',
        explanation: 'Empati digital adalah kompas moral dalam berinteraksi di dunia maya.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Istilah "Flaming" dalam komunikasi online merujuk pada...',
        options: [
          { label: 'A', text: 'Pertengkaran online yang dipenuhi kata-kata emosi, hinaan panas, dan kemarahan yang membakar suasana' },
          { label: 'B', text: 'Memasak kue bolu di dapur' },
          { label: 'C', text: 'Menyalakan kompor listrik' },
          { label: 'D', text: 'Mencadangkan file ke flashdisk' }
        ],
        correctAnswer: 'A',
        explanation: 'Flaming adalah perang kata-kata agresif di ruang daring.',
        competencyLevel: 'Pemahaman (LOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Kaidah sopan santun dalam berinteraksi di dunia internet dikenal dengan istilah...',
        options: [
          { label: 'A', text: 'Netiket' },
          { label: 'B', text: 'Internet Protokol' },
          { label: 'C', text: 'Router' },
          { label: 'D', text: 'Algoritma' }
        ],
        correctAnswer: 'A',
        explanation: 'Netiket (Network Etiquette) adalah aturan tata krama berinternet.',
        points: 10
      },
      {
        id: 2,
        question: 'Jejak data yang dihasilkan saat pengguna secara sadar mengunggah foto, video, atau status disebut rekam jejak...',
        options: [
          { label: 'A', text: 'Jejak Digital Aktif' },
          { label: 'B', text: 'Jejak Digital Pasif' },
          { label: 'C', text: 'Jejak Alami' },
          { label: 'D', text: 'Jejak Fisik' }
        ],
        correctAnswer: 'A',
        explanation: 'Aktivitas yang diunggah secara sadar adalah jejak aktif.',
        points: 10
      },
      {
        id: 3,
        question: 'Mengetik seluruh pesan chat dengan huruf kapital (Caps Lock on) melanggar netiket karena...',
        options: [
          { label: 'A', text: 'Dipersepsikan sebagai teriakan atau kemarahan kepada lawan bicara' },
          { label: 'B', text: 'Merusak keyboard laptop' },
          { label: 'C', text: 'Membuat kuota data habis' },
          { label: 'D', text: 'Layar monitor menjadi redup' }
        ],
        correctAnswer: 'A',
        explanation: 'Huruf kapital semua diasosiasikan dengan bentakan suara keras.',
        points: 10
      },
      {
        id: 4,
        question: 'Perbuatan membagikan foto aib teman secara online berulang kali hingga korban merasa tertekan tergolong sebagai...',
        options: [
          { label: 'A', text: 'Cyberbullying' },
          { label: 'B', text: 'Diskusi Kelompok' },
          { label: 'C', text: 'Cek Fakta' },
          { label: 'D', text: 'Kolaborasi' }
        ],
        correctAnswer: 'A',
        explanation: 'Perilaku mempermalukan berulang adalah bentuk cyberbullying.',
        points: 10
      },
      {
        id: 5,
        question: 'Langkah pertama yang harus diambil jika kamu menjadi korban teror pesan jahat di media sosial adalah...',
        options: [
          { label: 'A', text: 'Mengambil tangkapan layar (screenshot) sebagai barang bukti, jangan membalas dengan amarah, dan lapor ke orang tua/guru' },
          { label: 'B', text: 'Membalas dengan kata-kata yang lebih kotor' },
          { label: 'C', text: 'Menghancurkan smartphone' },
          { label: 'D', text: 'Menutup diri dan tidak mau makan' }
        ],
        correctAnswer: 'A',
        explanation: 'Bukti tangkapan layar penting untuk pelaporan penanganan resmi.',
        points: 10
      },
      {
        id: 6,
        question: 'Istilah "Troll" di media sosial merujuk pada individu yang...',
        options: [
          { label: 'A', text: 'Sengaja membuat komentar provokatif, menyebalkan, dan menghasut demi memancing kemarahan warganet' },
          { label: 'B', text: 'Suka membagikan ebook gratis' },
          { label: 'C', text: 'Mengajar pemrograman di sekolah' },
          { label: 'D', text: 'Memperbaiki jaringan kabel' }
        ],
        correctAnswer: 'A',
        explanation: 'Troll daring mencari kepuasan dengan memicu keributan emosional di kolom komentar.',
        points: 10
      },
      {
        id: 7,
        question: 'Sikap toleransi di ruang digital diwujudkan dengan cara...',
        options: [
          { label: 'A', text: 'Menghargai keberagaman suku, agama, dan pendapat budaya tanpa melontarkan ujaran kebencian' },
          { label: 'B', text: 'Memaksa semua orang memiliki pendapat yang persis sama' },
          { label: 'C', text: 'Memblokir orang yang berbeda suku' },
          { label: 'D', text: 'Mengunggah video ejekan suku lain' }
        ],
        correctAnswer: 'A',
        explanation: 'Toleransi digital menghargai kebinekaan dalam bingkai persatuan.',
        points: 10
      },
      {
        id: 8,
        question: 'Mengapa kita harus memikirkan dampak masa depan sebelum mengunggah sesuatu ke internet?',
        options: [
          { label: 'A', text: 'Karena rekam jejak digital dapat mempengaruhi reputasi diri, seleksi sekolah lanjutan, beasiswa, dan karier di masa depan' },
          { label: 'B', text: 'Agar laptop tidak overheat' },
          { label: 'C', text: 'Karena hard disk internet akan penuh' },
          { label: 'D', text: 'Hanya anjuran tanpa pengaruh nyata' }
        ],
        correctAnswer: 'A',
        explanation: 'Jejak digital membentuk reputasi digital jangka panjang.',
        points: 10
      },
      {
        id: 9,
        question: 'Istilah "Cyber Harassment" berarti...',
        options: [
          { label: 'A', text: 'Pengiriman pesan ancaman atau pelecehan secara terus-menerus kepada korban di ruang siber' },
          { label: 'B', text: 'Pemasangan kabel internet' },
          { label: 'C', text: 'Pembersihan virus komputer' },
          { label: 'D', text: 'Pembuatan presentasi' }
        ],
        correctAnswer: 'A',
        explanation: 'Harassment adalah pelecehan/teror digital berulang.',
        points: 10
      },
      {
        id: 10,
        question: 'Salah satu wujud 8 Dimensi Profil Lulusan (Kemendikdasmen) di ruang digital adalah siswa yang...',
        options: [
          { label: 'A', text: 'Memiliki penalaran kritis dalam memfilter informasi, menjunjung kewargaan, berkolaborasi, dan berakhlak mulia' },
          { label: 'B', text: 'Gemar menyebarkan hoaks setiap hari' },
          { label: 'C', text: 'Menggunakan internet hanya untuk mengejek orang lain' },
          { label: 'D', text: 'Takut menggunakan teknologi' }
        ],
        correctAnswer: 'A',
        explanation: 'Profil Lulusan Kemendikdasmen berakhlak mulia, bernalar kritis, mandiri, kolaboratif, komunikatif, dan menjunjung kewargaan.',
        points: 10
      }
    ]
  }
];
