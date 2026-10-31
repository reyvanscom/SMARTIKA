import { Topic } from '../types/curriculum';

export const TOPICS: Topic[] = [
  // ==========================================
  // KELAS 7 - INFORMATIKA
  // ==========================================
  {
    id: 'k7-bk',
    grade: 7,
    title: 'Berpikir Komputasional',
    category: 'Fondasi Berpikir Komputasi',
    shortDesc: 'Menyelesaikan masalah kompleks dengan metode dekomposisi, pengenalan pola, abstraksi, dan perancangan algoritma.',
    learningObjectives: [
      'Menjelaskan 4 pilar utama Berpikir Komputasional (BK).',
      'Menerapkan dekomposisi untuk memecahkan masalah sehari-hari.',
      'Mengidentifikasi pola dan melakukan abstraksi dari sekumpulan informasi.',
      'Menyusun langkah-langkah terurut (algoritma) yang logis dan efisien.'
    ],
    apersepsi: {
      imagePromptDesc: 'Robot edukasi sedang membantu siswa memilah barang-barang daur ulang berdasarkan kategori bentuk dan warna.',
      videoTitle: 'Pengenalan Computational Thinking (Berpikir Komputasional)',
      videoDuration: '04:15',
      videoThumbnail: 'https://i.ytimg.com/vi/jCb9fpPrxLc/hqdefault.jpg',
      videoDescription: 'Video pemantik yang menjelaskan 4 pilar berpikir komputasional dalam memecahkan masalah sehari-hari dengan cara yang cerdas dan logis.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=jCb9fpPrxLc',
      realLifeStory: 'Setiap pagi, kantin SMP Negeri 5 Kroya dipadati puluhan siswa yang ingin membeli sarapan dalam waktu 15 menit istirahat. Terkadang antrean menjadi kacau, sebagian siswa kehabisan waktu, sementara penjual kesulitan mencatat pesanan. Jika kamu ditugaskan menjadi konsultan logistik kantin, bagaimana kamu menguraikan masalah ini menjadi bagian-bagian kecil tanpa langsung menyalahkan pihak tertentu?',
      triggerQuestions: [
        'Mengapa membagi masalah besar menjadi bagian-bagian kecil membuat solusi lebih mudah ditemukan?',
        'Dapatkah kamu menemukan kesamaan pola antara antrean kantin dan lampu lalu lintas di perempatan Kroya?',
        'Informasi apa saja yang tidak penting dan bisa kita abaikan saat merancang sistem pemesanan makanan cepat?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Ketika kamu membedah tugas membuat majalah dinding sekolah menjadi pembagian tim: penulisan artikel, fotografer, dan desainer tata letak, pilar BK yang sedang kamu gunakan adalah...',
        options: [
          { label: 'A', text: 'Dekomposisi' },
          { label: 'B', text: 'Pengenalan Pola' },
          { label: 'C', text: 'Abstraksi' },
          { label: 'D', text: 'Algoritma' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Dekomposisi',
        recommendation: 'Pelajari kembali bagaimana dekomposisi membantu memecah masalah besar menjadi sub-masalah mandiri.'
      },
      {
        id: 2,
        question: 'Seorang dokter mendiagnosis penyakit pasien dengan mencocokkan gejala demam dan bintik merah dengan catatan medis pasien sebelumnya. Hal ini merupakan contoh penerapan...',
        options: [
          { label: 'A', text: 'Abstraksi' },
          { label: 'B', text: 'Pengenalan Pola' },
          { label: 'C', text: 'Algoritma' },
          { label: 'D', text: 'Optimasi Memori' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Pengenalan Pola',
        recommendation: 'Kenali bagaimana pola keteraturan membantu kita memprediksi solusi yang tepat.'
      },
      {
        id: 3,
        question: 'Pada peta rute Bus Sekolah, jalur yang ditampilkan hanya jalan-jalan utama dan halte pemberhentian, sementara pohon dan warna pagar rumah diabaikan. Proses menyaring detail tidak relevan ini disebut...',
        options: [
          { label: 'A', text: 'Dekomposisi' },
          { label: 'B', text: 'Abstraksi' },
          { label: 'C', text: 'Pengurutan (Sorting)' },
          { label: 'D', text: 'Kompilasi' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Abstraksi',
        recommendation: 'Fokus pada konsep Abstraksi: menyimpan informasi inti dan mengabaikan detail yang membingungkan.'
      },
      {
        id: 4,
        question: 'Petunjuk langkah demi langkah yang jelas, terurut, dan tidak ambigu untuk merakit meja belajar disebut...',
        options: [
          { label: 'A', text: 'Algoritma' },
          { label: 'B', text: 'Abstraksi' },
          { label: 'C', text: 'Pengenalan Pola' },
          { label: 'D', text: 'Dekomposisi' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Algoritma',
        recommendation: 'Algoritma harus runtut, tidak boleh melompati urutan logis.'
      },
      {
        id: 5,
        question: 'Manakah di bawah ini yang BUKAN merupakan karakteristik berpikir komputasional?',
        options: [
          { label: 'A', text: 'Melihat masalah dari berbagai sudut pandang logis' },
          { label: 'B', text: 'Harus selalu menggunakan perangkat komputer atau laptop mahal' },
          { label: 'C', text: 'Dapat diterapkan dalam memasak, belajar, dan olahraga' },
          { label: 'D', text: 'Menghasilkan solusi yang dapat dijalankan manusia maupun mesin' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Hakikat BK',
        recommendation: 'Ingat bahwa berpikir komputasional adalah proses berpikir manusia, bukan sekadar memakai komputer.'
      }
    ],
    materi: {
      overview: 'Berpikir Komputasional (Computational Thinking) adalah proses berpikir untuk merumuskan persoalan beserta solusinya secara efektif, efisien, dan optimal, sehingga solusinya dapat dijalankan oleh manusia maupun komputer.',
      keyConcepts: [
        {
          title: '1. Dekomposisi (Decomposition)',
          explanation: 'Kemampuan memecah masalah yang rumit atau besar menjadi bagian-bagian yang lebih kecil, teratur, dan mudah dikelola secara mandiri.',
          bulletPoints: [
            'Mengidentifikasi bagian utama masalah.',
            'Menetapkan prioritas penyelesaian tiap bagian.',
            'Contoh: Merencanakan pentas seni dengan membaginya ke seksi acara, konsumsi, dan panggung.'
          ],
          iconName: 'Puzzle'
        },
        {
          title: '2. Pengenalan Pola (Pattern Recognition)',
          explanation: 'Kemampuan mengamati kesamaan keteraturan, tren, atau karakteristik berulang dari data dan pengalaman sebelumnya.',
          bulletPoints: [
            'Membantu memprediksi tren masa depan.',
            'Menggunakan solusi yang terbukti berhasil pada masalah serupa.',
            'Contoh: Mengetahui bahwa jam 06.45 gerbang sekolah selalu padat, sehingga berangkat 15 menit lebih awal.'
          ],
          iconName: 'Layers'
        },
        {
          title: '3. Abstraksi (Abstraction)',
          explanation: 'Menyaring informasi penting yang dibutuhkan dan menyingkirkan detail-detail rumit yang tidak relevan dengan tujuan pemecahan masalah.',
          bulletPoints: [
            'Menjaga fokus pada inti permasalahan.',
            'Mengurangi kebingungan akibat data yang berlebihan.',
            'Contoh: Peta rute Trans Jateng hanya menampilkan stasiun dan halte pemberhentian.'
          ],
          iconName: 'Filter'
        },
        {
          title: '4. Algoritma (Algorithm Design)',
          explanation: 'Merancang langkah-langkah terurut, logis, dan terperinci untuk menyelesaikan masalah atau mencapai tujuan tertentu secara berulang tanpa salah.',
          bulletPoints: [
            'Harus memiliki titik mulai dan titik selesai yang jelas.',
            'Setiap langkah tidak boleh bermakna ganda (tidak ambigu).',
            'Contoh: Prosedur cuci tangan 6 langkah WHO atau resep kue bolu.'
          ],
          iconName: 'ListOrdered'
        }
      ],
      comparisonTable: {
        title: 'Tabel Komparasi 4 Pilar Berpikir Komputasional',
        headers: ['Pilar BK', 'Tujuan Utama', 'Contoh Masalah Nyata', 'Hasil yang Didapat'],
        rows: [
          ['Dekomposisi', 'Menyederhanakan kompleksitas', 'Membuat video profil sekolah', 'Rincian tugas: naskah, syuting, editing'],
          ['Pengenalan Pola', 'Menemukan keteraturan & tren', 'Menganalisis hasil nilai ulangan', 'Mengetahui materi tersulit yang perlu diulang'],
          ['Abstraksi', 'Menyaring informasi esensial', 'Membuat jadwal piket kelas', 'Hanya mencatat nama hari dan nama siswa'],
          ['Algoritma', 'Menghasilkan panduan eksekusi', 'Panduan login akun Google Workspace', 'Urutan klik & input kata sandi yang sukses']
        ]
      },
      flowDiagram: {
        title: 'Alur Penerapan Berpikir Komputasional',
        steps: [
          { step: 1, title: 'Masalah Kompleks', desc: 'Hadapi persoalan besar yang membingungkan.' },
          { step: 2, title: 'Dekomposisi', desc: 'Pecah menjadi sub-masalah kecil yang jelas.' },
          { step: 3, title: 'Analisis Pola', desc: 'Cari kesamaan dengan masalah yang pernah dihadapi.' },
          { step: 4, title: 'Abstraksi', desc: 'Buang detail yang tidak penting, fokus pada data kunci.' },
          { step: 5, title: 'Susun Algoritma', desc: 'Rancang instruksi terurut yang dapat dieksekusi siapa saja.' }
        ]
      },
      dailyLifeExamples: [
        'Merapikan kamar tidur: Memisahkan pakaian kotor, buku sekolah, dan mainan (Dekomposisi).',
        'Menebak cuaca sore: Melihat langit mendung kelabu seperti kemarin lalu sedia payung (Pengenalan Pola).',
        'Membuat denah lokasi rumah untuk undangan ulang tahun: Hanya menggambarkan nama jalan besar tanpa menggambar setiap pohon (Abstraksi).'
      ],
      schoolExamples: [
        'Mengerjakan soal cerita Matematika: Menguraikan yang diketahui, ditanya, dan rumus yang relevan.',
        'Mengikuti kegiatan Upacara Bendera: Menjalankan protokol upacara secara tertib dan runtut dari awal hingga akhir.'
      ],
      tahukahKamu: 'Istilah "Computational Thinking" pertama kali dipopulerkan oleh Prof. Jeannette Wing dari Carnegie Mellon University pada tahun 2006. Beliau menegaskan bahwa berpikir komputasional adalah keterampilan dasar yang harus dimiliki setiap anak, sama pentingnya seperti membaca, menulis, dan berhitung!',
      faktaMenarik: 'Komputer tercanggih di dunia seperti superkomputer Frontier tidak bisa berpikir sendiri. Mesin hanya menjalankan algoritma yang dirancang oleh pikiran manusia melalui 4 pilar berpikir komputasional!',
      infoPenting: 'Urutan dalam algoritma sangat menentukan hasil akhir. Menukar langkah sebelum dan sesudah (misalnya memakai sepatu sebelum kaus kaki) akan merusak seluruh proses kerja.',
      commonMistakes: [
        'Mengira bahwa berpikir komputasional harus selalu duduk di depan komputer dan mengetik kode program.',
        'Terlalu banyak memasukkan detail yang tidak perlu dalam algoritma sehingga langkah menjadi rumit dan membingungkan (kurang abstraksi).',
        'Menyelesaikan masalah secara terburu-buru tanpa memecahnya terlebih dahulu (melewatkan dekomposisi).'
      ],
      summary: [
        'Berpikir Komputasional terdiri dari Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma.',
        'BK dapat dipraktikkan tanpa komputer (unplugged) dalam kehidupan sehari-hari.',
        'BK melatih kita menjadi pemecah masalah (problem solver) yang tangguh dan analitis.'
      ],
      formativeCheck: [
        {
          question: 'Ketika kamu menyusun jadwal kegiatan harian dari bangun tidur hingga tidur kembali secara runut per jam, pilar apakah yang paling dominan?',
          options: ['Abstraksi', 'Algoritma', 'Dekomposisi', 'Enkripsi'],
          answerIndex: 1,
          explanation: 'Benar! Jadwal kegiatan harian yang terurut per jam merupakan instruksi langkah demi langkah (Algoritma).'
        },
        {
          question: 'Memilih bahan kain seragam hanya berdasarkan daya serap keringat dan kenyamanan tanpa memusingkan proses penenunan serat di pabrik adalah wujud...',
          options: ['Abstraksi', 'Dekomposisi', 'Algoritma', 'Pengenalan Pola'],
          answerIndex: 0,
          explanation: 'Tepat! Abstraksi adalah memusatkan perhatian pada sifat penting (daya serap & nyaman) dan mengabaikan detail produksi yang tidak relevan.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Interaktif: Pemilahan Pilar Berpikir Komputasional',
      scenario: 'Bantu tim robotika SMPN 5 Kroya mengelompokkan 6 aktivitas berikut ke dalam pilar Berpikir Komputasional yang tepat: Dekomposisi, Pola, Abstraksi, atau Algoritma!',
      instructions: 'Pilih kategori pilar yang benar untuk setiap kartu skenario kehidupan nyata di bawah ini.',
      data: {
        items: [
          { id: 'item-1', text: 'Membagi pembuatan vlog sekolah menjadi riset, syuting, dan editing video.', correctCategory: 'Dekomposisi' },
          { id: 'item-2', text: 'Mengetahui bahwa jam 06.40 jalanan depan pasar selalu macet berdasarkan pengamatan tiap hari.', correctCategory: 'Pengenalan Pola' },
          { id: 'item-3', text: 'Menggambar sketsa denah kelas tanpa menggambarkan setiap serat kayu di meja murid.', correctCategory: 'Abstraksi' },
          { id: 'item-4', text: 'Menyusun resep memasak nasi goreng lezat langkah demi langkah dari menyalakan kompor.', correctCategory: 'Algoritma' },
          { id: 'item-5', text: 'Membedah buku paket 200 halaman menjadi 6 bab yang dibaca 1 bab per minggu.', correctCategory: 'Dekomposisi' },
          { id: 'item-6', text: 'Melihat pola grafik suhu harian Kroya selalu naik drastis antara jam 12.00 hingga 14.00.', correctCategory: 'Pengenalan Pola' }
        ],
        categories: ['Dekomposisi', 'Pengenalan Pola', 'Abstraksi', 'Algoritma']
      }
    },
    miniGame: {
      type: 'detective',
      title: 'Misi Detektif: Kasus Berpikir Komputasional',
      description: 'Jawab tantangan studi kasus secepat mungkin untuk memecahkan misteri efisiensi di SMP Negeri 5 Kroya!',
      questions: [
        {
          id: 1,
          question: 'Detektif ingin mengurai masalah hilangnya buku di perpustakaan. Langkah pertama yang tepat adalah memeriksa buku berdasarkan rak, hari peminjaman, dan petugas piket. Ini merupakan pilar...',
          options: ['Dekomposisi', 'Abstraksi', 'Pseudocode', 'Kompilasi'],
          correctIndex: 0,
          clue: 'Membedah masalah menjadi bagian yang lebih terkelola.'
        },
        {
          id: 2,
          question: 'Detektif menyadari setiap kali pencuri beraksi, alarm selalu berbunyi tepat pukul 18.15 di hari Jumat. Tindakan mengenali kesamaan waktu ini disebut...',
          options: ['Abstraksi', 'Pengenalan Pola', 'Algoritma', 'Dekomposisi'],
          correctIndex: 1,
          clue: 'Mencari kesamaan berulang dalam peristiwa.'
        },
        {
          id: 3,
          question: 'Untuk menyebarkan pengumuman tersangka, detektif hanya mencatat ciri fisik utama (tinggi 165 cm, jaket biru) dan tidak mencantumkan warna tali sepatu. Ini adalah contoh...',
          options: ['Pengenalan Pola', 'Algoritma', 'Abstraksi', 'Dekomposisi'],
          correctIndex: 2,
          clue: 'Menghilangkan rincian yang tidak terlalu penting.'
        },
        {
          id: 4,
          question: 'Detektif membuat panduan patroli satpam: 1) Cek pintu gerbang, 2) Periksa jendela lab, 3) Kunci ruang guru. Ini merupakan penerapan...',
          options: ['Algoritma', 'Abstraksi', 'Dekomposisi', 'Debugging'],
          correctIndex: 0,
          clue: 'Instruksi terurut dari awal sampai akhir.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Empat fondasi berpikir komputasional yang benar secara berurutan konsep adalah...',
        options: [
          { label: 'A', text: 'Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma' },
          { label: 'B', text: 'Hardware, Software, Brainware, Network' },
          { label: 'C', text: 'Input, Process, Output, Storage' },
          { label: 'D', text: 'Coding, Testing, Debugging, Deploying' }
        ],
        correctAnswer: 'A',
        explanation: 'Empat pilar utama BK adalah Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Ketika kamu ingin membersihkan rumah secara menyeluruh, kamu membaginya menjadi membersihkan ruang tamu, kamar mandi, dan halaman. Teknik ini mencerminkan...',
        options: [
          { label: 'A', text: 'Abstraksi' },
          { label: 'B', text: 'Dekomposisi' },
          { label: 'C', text: 'Algoritma' },
          { label: 'D', text: 'Pengenalan Pola' }
        ],
        correctAnswer: 'B',
        explanation: 'Dekomposisi adalah teknik memecah masalah besar menjadi komponen-komponen yang lebih kecil dan mudah dikerjakan.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 3,
        question: 'Mengapa abstraksi sangat krusial dalam pembuatan aplikasi navigasi seperti Google Maps?',
        options: [
          { label: 'A', text: 'Agar ukuran file aplikasi menjadi sangat besar' },
          { label: 'B', text: 'Supaya pengguna tidak bingung oleh rincian yang tidak relevan seperti jenis genteng dan pagar rumah' },
          { label: 'C', text: 'Agar komputer tidak perlu memakai jaringan internet' },
          { label: 'D', text: 'Supaya warna jalanan selalu diubah setiap jam' }
        ],
        correctAnswer: 'B',
        explanation: 'Abstraksi membuang detail yang tidak esensial sehingga pengemudi hanya melihat jalan, arah belokan, dan kepadatan lalu lintas.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 4,
        question: 'Perhatikan langkah berikut: [1] Masukkan air ke panci, [2] Nyalakan kompor, [3] Masukkan mi instan setelah mendidih, [4] Tuang bumbu ke mangkuk. Urutan logis ini merupakan wujud nyata...',
        options: [
          { label: 'A', text: 'Algoritma' },
          { label: 'B', text: 'Abstraksi' },
          { label: 'C', text: 'Pengenalan Pola' },
          { label: 'D', text: 'Dekomposisi' }
        ],
        correctAnswer: 'A',
        explanation: 'Instruksi bertahap yang runut dan jelas untuk mencapai hasil akhir adalah definisi dari algoritma.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 5,
        question: 'Jika suatu algoritma menghasilkan keluaran yang salah padahal komputer tidak mengalami kerusakan fisik, kemungkinan terbesar kesalahannya terletak pada...',
        options: [
          { label: 'A', text: 'Layar monitor terlalu redup' },
          { label: 'B', text: 'Logika urutan langkah yang dirancang manusia belum tepat' },
          { label: 'C', text: 'Stopkontak listrik terlalu panas' },
          { label: 'D', text: 'Keyboard berdebu' }
        ],
        correctAnswer: 'B',
        explanation: 'Komputer hanya menjalankan instruksi yang diberikan. Kesalahan logika pada algoritma (logical error) menghasilkan output yang salah.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Seorang petani mengamati bahwa padi yang ditanam pada bulan Oktober selalu menghasilkan panen lebih baik dibanding bulan Juli selama 5 tahun terakhir. Petani tersebut menerapkan...',
        options: [
          { label: 'A', text: 'Abstraksi' },
          { label: 'B', text: 'Pengenalan Pola' },
          { label: 'C', text: 'Enkripsi Data' },
          { label: 'D', text: 'Dekomposisi' }
        ],
        correctAnswer: 'B',
        explanation: 'Melihat keteraturan berulang dari data masa lalu adalah konsep Pengenalan Pola.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 7,
        question: 'Pernyataan mana yang paling tepat mengenai kaitan berpikir komputasional dengan mata pelajaran lain di SMP?',
        options: [
          { label: 'A', text: 'Hanya berguna untuk mata pelajaran Informatika dan TIK saja' },
          { label: 'B', text: 'Membantu siswa berpikir analitis dalam IPA, Matematika, IPS, maupun Bahasa' },
          { label: 'C', text: 'Tidak dapat dipelajari kecuali siswa mahir merakit komputer' },
          { label: 'D', text: 'Mengharuskan siswa menghafal kode biner setiap hari' }
        ],
        correctAnswer: 'B',
        explanation: 'BK adalah kemampuan kognitif universal yang bermanfaat dalam menganalisis fenomena IPA, menyusun esai Bahasa, dan memecahkan soal IPS.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Apa akibatnya jika sebuah instruksi dalam algoritma bersifat ambigu (memiliki makna ganda)?',
        options: [
          { label: 'A', text: 'Program akan berjalan jauh lebih cepat' },
          { label: 'B', text: 'Pelaksana instruksi dapat melakukan langkah yang keliru atau tidak terduga' },
          { label: 'C', text: 'Komputer akan otomatis mematikan daya' },
          { label: 'D', text: 'Nilai ujian otomatis menjadi 100' }
        ],
        correctAnswer: 'B',
        explanation: 'Algoritma harus presisi dan tidak ambigu agar dieksekusi dengan hasil yang sama persis oleh siapapun.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 9,
        question: 'Dalam menyusun katalog perpustakaan, staf hanya mencatat: Judul, Pengarang, Penerbit, dan Nomor Rak, tanpa mencatat berat buku dalam gram. Ini adalah contoh...',
        options: [
          { label: 'A', text: 'Abstraksi' },
          { label: 'B', text: 'Dekomposisi' },
          { label: 'C', text: 'Algoritma' },
          { label: 'D', text: 'Debugging' }
        ],
        correctAnswer: 'A',
        explanation: 'Mengabaikan atribut yang tidak esensial (seperti berat buku) demi fokus pada data pencarian adalah Abstraksi.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 10,
        question: 'Jika kamu diminta merancang rute terpendek pengiriman paket ke 5 desa di Kecamatan Kroya, pendekatan berpikir komputasional yang paling optimal adalah...',
        options: [
          { label: 'A', text: 'Memilih desa secara acak tanpa mencatat jarak' },
          { label: 'B', text: 'Menguraikan jarak antar-desa (dekomposisi), mencari pola rute lingkaran (pola), menyaring jalan buntu (abstraksi), dan menyusun urutan kunjungan (algoritma)' },
          { label: 'C', text: 'Menunggu paket diantar orang lain' },
          { label: 'D', text: 'Hanya mengunjungi satu desa lalu pulang' }
        ],
        correctAnswer: 'B',
        explanation: 'Mengintegrasikan keempat pilar BK secara sistematis menghasilkan rute pengiriman yang paling efisien dan hemat waktu.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Dua orang siswa membagi tugas proyek membuat simulasi tata surya: siswa A membuat model planet, siswa B membuat teks deskripsi. Pendekatan ini menunjukkan pilar...',
        options: [
          { label: 'A', text: 'Dekomposisi' },
          { label: 'B', text: 'Abstraksi' },
          { label: 'C', text: 'Pengenalan Pola' },
          { label: 'D', text: 'Algoritma' }
        ],
        correctAnswer: 'A',
        explanation: 'Membagi proyek besar menjadi dua tugas yang lebih kecil adalah dekomposisi.',
        points: 10
      },
      {
        id: 2,
        question: 'Seorang teknisi jaringan melihat bahwa koneksi Wi-Fi lab selalu melambat setiap kali jam istirahat kedua dimulai. Kemampuan melihat kesamaan ini disebut...',
        options: [
          { label: 'A', text: 'Pengenalan Pola' },
          { label: 'B', text: 'Abstraksi' },
          { label: 'C', text: 'Dekomposisi' },
          { label: 'D', text: 'Algoritma' }
        ],
        correctAnswer: 'A',
        explanation: 'Mengenali keteraturan waktu dan kejadian yang berulang adalah pengenalan pola.',
        points: 10
      },
      {
        id: 3,
        question: 'Ketika kita melihat ikon keranjang belanja di toko online, kita langsung mengerti fungsinya untuk menampung barang tanpa perlu tahu kode pemrograman di baliknya. Ini adalah prinsip...',
        options: [
          { label: 'A', text: 'Abstraksi' },
          { label: 'B', text: 'Dekomposisi' },
          { label: 'C', text: 'Pengenalan Pola' },
          { label: 'D', text: 'Algoritma' }
        ],
        correctAnswer: 'A',
        explanation: 'Abstraksi menyembunyikan detail teknis yang rumit di balik representasi antarmuka yang sederhana dan bermakna.',
        points: 10
      },
      {
        id: 4,
        question: 'Langkah-langkah mencuci tangan 6 langkah menurut standar medis yang harus dilakukan berurutan adalah contoh dari...',
        options: [
          { label: 'A', text: 'Algoritma' },
          { label: 'B', text: 'Dekomposisi' },
          { label: 'C', text: 'Abstraksi' },
          { label: 'D', text: 'Variabel' }
        ],
        correctAnswer: 'A',
        explanation: 'Urutan instruksi langkah demi langkah adalah algoritma.',
        points: 10
      },
      {
        id: 5,
        question: 'Manakah keuntungan utama dari penerapan dekomposisi pada suatu masalah kompleks?',
        options: [
          { label: 'A', text: 'Masalah menjadi lebih mudah dipahami dan dapat dikerjakan secara paralel oleh beberapa orang' },
          { label: 'B', text: 'Menghilangkan kebutuhan akan algoritma sama sekali' },
          { label: 'C', text: 'Membuat masalah menjadi 10 kali lipat lebih rumit' },
          { label: 'D', text: 'Mengharuskan penggunaan komputer super' }
        ],
        correctAnswer: 'A',
        explanation: 'Dekomposisi membuat bagian-bagian masalah dapat diselesaikan secara fokus dan terbagi.',
        points: 10
      },
      {
        id: 6,
        question: 'Jika seorang siswa mengabaikan warna sepatu peserta lari dan hanya mencatat nomor dada serta catatan waktu finish, siswa tersebut melakukan...',
        options: [
          { label: 'A', text: 'Abstraksi' },
          { label: 'B', text: 'Algoritma' },
          { label: 'C', text: 'Pengenalan Pola' },
          { label: 'D', text: 'Debugging' }
        ],
        correctAnswer: 'A',
        explanation: 'Menyaring informasi esensial dan mengabaikan atribut yang tidak mempengaruhi hasil lomba.',
        points: 10
      },
      {
        id: 7,
        question: 'Algoritma pencarian (Search Algorithm) yang membagi daftar terurut menjadi dua bagian secara berulang-ulang memanfaatkan pilar...',
        options: [
          { label: 'A', text: 'Pengenalan Pola dan Dekomposisi' },
          { label: 'B', text: 'Hanya keberuntungan semata' },
          { label: 'C', text: 'Pencetakan acak' },
          { label: 'D', text: 'Abstraksi warna layar' }
        ],
        correctAnswer: 'A',
        explanation: 'Binary search membagi ruang masalah (dekomposisi) dan mengeksploitasi pola keterurutan (pola).',
        points: 10
      },
      {
        id: 8,
        question: 'Apa yang membedakan instruksi dalam resep masakan dengan algoritma pemrograman komputer?',
        options: [
          { label: 'A', text: 'Prinsip dasarnya sama yaitu serangkaian langkah terurut, tetapi komputer menuntut kepastian mutlak tanpa multitafsir' },
          { label: 'B', text: 'Resep masakan tidak memiliki titik selesai' },
          { label: 'C', text: 'Komputer tidak bisa membaca angka' },
          { label: 'D', text: 'Resep masakan hanya dibuat oleh robot' }
        ],
        correctAnswer: 'A',
        explanation: 'Manusia bisa menerka "secukupnya", sedangkan komputer memerlukan parameter terukur yang pasti.',
        points: 10
      },
      {
        id: 9,
        question: 'Mengapa peserta didik perlu menguasai 4 pilar berpikir komputasional di era kecerdasan buatan (AI)?',
        options: [
          { label: 'A', text: 'Agar mampu berpikir kritis, mengevaluasi output AI, dan merumuskan solusi orisinal' },
          { label: 'B', text: 'Supaya bisa menghafal seluruh data internet' },
          { label: 'C', text: 'Supaya tidak perlu belajar di sekolah lagi' },
          { label: 'D', text: 'Hanya agar mendapatkan nilai rapor tinggi' }
        ],
        correctAnswer: 'A',
        explanation: 'BK membentuk pemikiran kritis yang menjadi kompas dalam memanfaatkan teknologi kecerdasan buatan.',
        points: 10
      },
      {
        id: 10,
        question: 'Dalam menyelesaikan masalah sampah di lingkungan sekolah, langkah dekomposisi yang tepat adalah...',
        options: [
          { label: 'A', text: 'Memilah sampah berdasarkan jenisnya: organik, anorganik, dan B3' },
          { label: 'B', text: 'Membakar seluruh sampah sekaligus di lapangan' },
          { label: 'C', text: 'Menutup mata dari tumpukan sampah' },
          { label: 'D', text: 'Menunggu petugas dinas kebersihan datang tahun depan' }
        ],
        correctAnswer: 'A',
        explanation: 'Memilah sampah menurut jenisnya adalah cara memecah masalah pengelolaan limbah agar mudah didaur ulang.',
        points: 10
      }
    ]
  },

  // 2. KELAS 7 - Himpunan Data
  {
    id: 'k7-hd',
    grade: 7,
    title: 'Himpunan Data',
    category: 'Analisis Data & Struktur',
    shortDesc: 'Memahami konsep pengelompokan data, representasi himpunan, filter data, dan penyajian data terstruktur.',
    learningObjectives: [
      'Memahami definisi data, informasi, dan himpunan data.',
      'Mengelompokkan data berdasarkan atribut dan kriteria tertentu.',
      'Membaca dan membuat diagram Venn representasi himpunan data.',
      'Melakukan penyaringan (filtering) dan pengurutan (sorting) data sederhana.'
    ],
    apersepsi: {
      imagePromptDesc: 'Grafik data interaktif menampilkan visualisasi data siswa, diagram lingkaran hobi, dan tabel rapi.',
      videoTitle: 'Inilah Harga Mengejutkan Data Pribadi Kita - Kok Bisa?',
      videoDuration: '04:10',
      videoThumbnail: 'https://i.ytimg.com/vi/mSPINwb2HgY/hqdefault.jpg',
      videoDescription: 'Mengapa data digital begitu berharga dan bagaimana data dikumpulkan, diolah, dan dikelompokkan oleh platform digital modern.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=mSPINwb2HgY',
      realLifeStory: 'Perpustakaan SMPN 5 Kroya baru saja menerima sumbangan 500 buku baru dalam 10 kardus besar tanpa label. Para siswa kesulitan mencari buku yang mereka minati karena buku novel, atlas geografi, dan kamus bahasa Inggris bercampur baur. Bagaimana cara sistematis untuk mengatur buku-buku tersebut agar setiap buku dapat ditemukan dalam waktu kurang dari 30 detik?',
      triggerQuestions: [
        'Kriteria apa saja yang paling efektif digunakan untuk membagi 500 buku ke rak-rak perpustakaan?',
        'Apa yang terjadi jika satu buku masuk dalam dua kategori sekaligus, misalnya novel sejarah?',
        'Bagaimana mesin pencari seperti Google menyaring jutaan data dalam sekejap?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Kumpulan fakta mentah berupa angka, teks, atau gambar yang belum diolah dan belum memiliki arti bagi pengguna disebut...',
        options: [
          { label: 'A', text: 'Data' },
          { label: 'B', text: 'Informasi' },
          { label: 'C', text: 'Pengetahuan' },
          { label: 'D', text: 'Kebijakan' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Definisi Data',
        recommendation: 'Pelajari perbedaan antara data mentah dengan informasi yang telah diproses.'
      },
      {
        id: 2,
        question: 'Data yang telah diproses, diorganisasikan, dan memiliki makna atau kegunaan bagi pengambil keputusan disebut...',
        options: [
          { label: 'A', text: 'Data mentah' },
          { label: 'B', text: 'Informasi' },
          { label: 'C', text: 'Kabel jaringan' },
          { label: 'D', text: 'Sensor' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Definisi Informasi',
        recommendation: 'Pahami hubungan data diproses menjadi informasi.'
      },
      {
        id: 3,
        question: 'Jika Himpunan A adalah {siswa gemar basket} dan Himpunan B adalah {siswa gemar musik}, daerah irisan (A ∩ B) pada diagram Venn menunjukkan...',
        options: [
          { label: 'A', text: 'Siswa yang hanya gemar basket saja' },
          { label: 'B', text: 'Siswa yang gemar basket sekaligus gemar musik' },
          { label: 'C', text: 'Siswa yang tidak gemar keduanya' },
          { label: 'D', text: 'Siswa yang tidak masuk sekolah' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Irisan Himpunan',
        recommendation: 'Pelajari konsep irisan (intersection) pada himpunan data.'
      },
      {
        id: 4,
        question: 'Proses menampilkan data dengan syarat tertentu saja (misal hanya menampilkan nilai di atas 85) disebut proses...',
        options: [
          { label: 'A', text: 'Sorting (Pengurutan)' },
          { label: 'B', text: 'Filtering (Penyaringan)' },
          { label: 'C', text: 'Deleting (Penghapusan)' },
          { label: 'D', text: 'Enkripsi' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Filter Data',
        recommendation: 'Bedakan antara Sorting (mengurutkan) dengan Filtering (menyaring).'
      },
      {
        id: 5,
        question: 'Tipe data yang hanya bernilai Benar (True) atau Salah (False) disebut...',
        options: [
          { label: 'A', text: 'Integer' },
          { label: 'B', text: 'Boolean' },
          { label: 'C', text: 'String' },
          { label: 'D', text: 'Float' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Tipe Data',
        recommendation: 'Pahami tipe data dasar: teks (string), angka bulat (integer), dan kebenaran (boolean).'
      }
    ],
    materi: {
      overview: 'Data adalah kumpulan fakta mentah, sedangkan himpunan data adalah kumpulan objek atau elemen data yang terdefinisi dengan jelas dan memiliki atribut kesamaan.',
      keyConcepts: [
        {
          title: '1. Data vs Informasi',
          explanation: 'Data merupakan fakta mentah yang berdiri sendiri, sedangkan informasi adalah hasil pengolahan data yang memiliki konteks dan makna.',
          bulletPoints: [
            'Data: Angka 38, 39, 40.',
            'Informasi: "Rata-rata suhu tubuh siswa di kelas 7A adalah 36.8°C (dalam kondisi sehat)."'
          ],
          iconName: 'Database'
        },
        {
          title: '2. Atribut dan Nilai Data',
          explanation: 'Setiap elemen dalam himpunan data memiliki atribut (karakteristik) dan nilai (isi spesifik atribut tersebut).',
          bulletPoints: [
            'Atribut: Nama, Tanggal Lahir, Golongan Darah.',
            'Nilai: "Ahmad", "12 Mei 2011", "O".'
          ],
          iconName: 'Table'
        },
        {
          title: '3. Operasi Himpunan (Irisan, Gabungan, Selisih)',
          explanation: 'Dalam analisis data, operasi himpunan digunakan untuk menyeleksi kelompok data yang memenuhi beberapa kriteria sekaligus.',
          bulletPoints: [
            'Irisan (AND / ∩): Memenuhi semua kriteria.',
            'Gabungan (OR / ∪): Memenuhi salah satu kriteria.',
            'Komplemen / Selisih (NOT): Menyingkirkan data tertentu.'
          ],
          iconName: 'Layers'
        }
      ],
      comparisonTable: {
        title: 'Perbandingan Jenis Tipe Data Dasar',
        headers: ['Tipe Data', 'Karakteristik', 'Contoh Nilai', 'Penggunaan di Sekolah'],
        rows: [
          ['Teks (String)', 'Karakter huruf, simbol, angka tanpa operasi hitung', '"SMP Negeri 5 Kroya"', 'Nama siswa, alamat, kelas'],
          ['Bilangan Bulat (Integer)', 'Angka bulat tanpa pecahan', '15, 85, 100', 'Nomor absen, jumlah siswa, umur'],
          ['Bilangan Desimal (Float)', 'Angka dengan nilai pecahan', '87.5, 3.14, 162.3', 'Tinggi badan, rata-rata nilai'],
          ['Logika (Boolean)', 'Dua keadaan eksklusif: True atau False', 'True / False', 'Status kehadiran (Hadir/Absen)']
        ]
      },
      dailyLifeExamples: [
        'Daftar kontak telepon di smartphone dikelompokkan berdasarkan abjad (A-Z) dan label (Keluarga, Teman Sekolah).',
        'Struk belanja minimarket mencatat nama barang, kuantitas, harga satuan, dan total belanja.'
      ],
      schoolExamples: [
        'Buku induk siswa yang mencatat NISN, nama lengkap, tempat tanggal lahir, dan nama orang tua.',
        'Data absensi harian kelas 7B yang diolah menjadi rekapitulasi persentase kehadiran bulanan.'
      ],
      tahukahKamu: 'Di era Big Data saat ini, diperkirakan lebih dari 328 juta terabyte data baru diciptakan oleh umat manusia setiap harinya di seluruh dunia!',
      faktaMenarik: 'Istilah "Database" pertama kali digunakan pada tahun 1962 oleh para peneliti di perusahaan System Development Corporation.',
      infoPenting: 'Kualitas informasi sangat bergantung pada validitas data mentah. Pepatah komputasi berbunyi: "Garbage In, Garbage Out" (Jika data yang dimasukkan sampah, hasilnya pun sampah).',
      commonMistakes: [
        'Menganggap angka selalu bertipe numerik (misal NISN atau No HP sebaiknya bertipe teks karena tidak dijumlahkan).',
        'Mencampuradukkan konsep Sorting (urutan) dengan Filtering (penyaringan).'
      ],
      summary: [
        'Data adalah fakta mentah, informasi adalah data bermakna.',
        'Himpunan data memudahkan pencarian dan pengelompokan.',
        'Filter dan urutan adalah alat utama mengolah himpunan data.'
      ],
      formativeCheck: [
        {
          question: 'Manakah atribut berikut yang paling tepat disimpan sebagai tipe data teks (string)?',
          options: ['Nomor Induk Siswa Nasional (NISN)', 'Nilai Rata-rata Rapor', 'Jumlah Kursi Kelas', 'Tinggi Badan Siswa'],
          answerIndex: 0,
          explanation: 'Tepat! NISN tidak digunakan untuk operasi matematika penjumlahan, sehingga disimpan sebagai tipe data string.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Interaktif: Filter & Klasifikasi Data Siswa',
      scenario: 'Kelompokkan data siswa berikut ke dalam dua kelompok: "Klub Robotika" dan "Klub Desain Grafis" berdasarkan minat bakatnya.',
      instructions: 'Pilih klub yang sesuai untuk masing-masing profil siswa di bawah ini.',
      data: {
        items: [
          { id: 'it-1', text: 'Budi: Tertarik logika pemrograman C++ dan sensor Arduino.', correctCategory: 'Klub Robotika' },
          { id: 'it-2', text: 'Citra: Gemar membuat poster digital di Canva dan ilustrasi vektor.', correctCategory: 'Klub Desain Grafis' },
          { id: 'it-3', text: 'Dimas: Tertarik merakit drone mini dan motor servo.', correctCategory: 'Klub Robotika' },
          { id: 'it-4', text: 'Eka: Hobi fotografi dan editing thumbnail video majalah dinding.', correctCategory: 'Klub Desain Grafis' }
        ],
        categories: ['Klub Robotika', 'Klub Desain Grafis']
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Tebak Tipe Data Kilat',
      description: 'Cocokkan contoh data dengan tipe data yang benar secepat mungkin!',
      questions: [
        {
          id: 1,
          question: 'Contoh data: "3.14159" (Nilai Pi lingkaran). Tipe data yang paling tepat adalah...',
          options: ['Float / Desimal', 'Boolean', 'Integer', 'Char'],
          correctIndex: 0,
          clue: 'Memiliki koma desimal.'
        },
        {
          id: 2,
          question: 'Contoh data: Status siswa "LULUS" atau "TIDAK LULUS" (Hanya dua kemungkinan). Tipe data logika adalah...',
          options: ['Integer', 'Boolean', 'Float', 'Array'],
          correctIndex: 1,
          clue: 'Hanya bernilai Benar/Salah.'
        },
        {
          id: 3,
          question: 'Contoh data: Jumlah buku di rak = 42. Tipe data angka bulat adalah...',
          options: ['String', 'Integer', 'Boolean', 'Float'],
          correctIndex: 1,
          clue: 'Angka bulat tanpa desimal.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Pengertian data mentah yang paling tepat adalah...',
        options: [
          { label: 'A', text: 'Fakta atau catatan yang belum dianalisis dan belum memiliki arti utuh' },
          { label: 'B', text: 'Laporan tahunan yang siap dicetak kepala sekolah' },
          { label: 'C', text: 'Grafik warna-warni di majalah sains' },
          { label: 'D', text: 'Kesimpulan dari suatu eksperimen' }
        ],
        correctAnswer: 'A',
        explanation: 'Data mentah adalah fakta belum diproses.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Dalam sebuah tabel spreadsheet, bagian vertikal yang ditandai dengan huruf (A, B, C) disebut...',
        options: [
          { label: 'A', text: 'Baris (Row)' },
          { label: 'B', text: 'Kolom (Column)' },
          { label: 'C', text: 'Sel (Cell)' },
          { label: 'D', text: 'Range' }
        ],
        correctAnswer: 'B',
        explanation: 'Kolom ditandai dengan huruf alfabet secara vertikal.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Jika kamu ingin mencari data siswa yang berasal dari desa Kroya DAN memiliki nilai matematika lebih dari 80, operasi logika yang digunakan adalah...',
        options: [
          { label: 'A', text: 'OR' },
          { label: 'B', text: 'AND' },
          { label: 'C', text: 'NOT' },
          { label: 'D', text: 'XOR' }
        ],
        correctAnswer: 'B',
        explanation: 'Operasi AND mensyaratkan kedua kondisi harus terpenuhi bersamaan.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 4,
        question: 'Apa perbedaan mendasar antara pengurutan (Sorting) dan penyaringan (Filtering)?',
        options: [
          { label: 'A', text: 'Sorting menyembunyikan data, filtering memutarbalikkan data' },
          { label: 'B', text: 'Sorting mengatur urutan data tanpa menghilangkan data, sedangkan filtering menampilkan data yang memenuhi kriteria saja' },
          { label: 'C', text: 'Sorting hanya untuk angka, filtering hanya untuk gambar' },
          { label: 'D', text: 'Keduanya persis sama tanpa perbedaan' }
        ],
        correctAnswer: 'B',
        explanation: 'Sorting menyusun urutan (A-Z, besar-kecil), filtering memilah data yang ditampilkan.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 5,
        question: 'Manakah dari kumpulan berikut yang merupakan himpunan data yang terdefinisi dengan jelas?',
        options: [
          { label: 'A', text: 'Kumpulan siswa yang sangat pintar di kelas 7' },
          { label: 'B', text: 'Kumpulan siswa kelas 7 dengan tinggi badan lebih dari 150 cm' },
          { label: 'C', text: 'Kumpulan lukisan yang sangat indah' },
          { label: 'D', text: 'Kumpulan makanan yang sangat lezat di kantin' }
        ],
        correctAnswer: 'B',
        explanation: 'Pilihan B terukur secara objektif (tinggi > 150 cm), sedangkan pintar, indah, dan lezat bersifat subjektif.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Pada himpunan A = {1, 2, 3, 4} dan B = {3, 4, 5, 6}, maka gabungan (A ∪ B) adalah...',
        options: [
          { label: 'A', text: '{3, 4}' },
          { label: 'B', text: '{1, 2, 3, 4, 5, 6}' },
          { label: 'C', text: '{1, 2, 5, 6}' },
          { label: 'D', text: '{ }' }
        ],
        correctAnswer: 'B',
        explanation: 'Gabungan menyatukan seluruh elemen tanpa duplikasi.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 7,
        question: 'Mengapa nomor telepon atau NIK tidak tepat disimpan dalam tipe data integer?',
        options: [
          { label: 'A', text: 'Karena angka 0 di depan akan hilang dan tidak ada operasi penjumlahan pada nomor identitas' },
          { label: 'B', text: 'Karena nomor telepon tidak bisa ditulis' },
          { label: 'C', text: 'Karena komputer akan meledak' },
          { label: 'D', text: 'Karena nomor telepon berupa desimal' }
        ],
        correctAnswer: 'A',
        explanation: 'Integer membuang angka 0 di depan (0812 menjadi 812), dan NIK tidak pernah dihitung secara matematis.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Visualisasi data dalam bentuk diagram lingkaran (pie chart) paling efektif digunakan untuk memperlihatkan...',
        options: [
          { label: 'A', text: 'Perubahan nilai saham dari detik ke detik' },
          { label: 'B', text: 'Proporsi atau persentase bagian terhadap keseluruhan (total 100%)' },
          { label: 'C', text: 'Rute perjalanan kereta api' },
          { label: 'D', text: 'Urutan alfabet nama murid' }
        ],
        correctAnswer: 'B',
        explanation: 'Pie chart menampilkan proporsi bagian terhadap satu kesatuan utuh 100%.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 9,
        question: 'Prinsip "Garbage In, Garbage Out" (GIGO) dalam dunia data bermakna...',
        options: [
          { label: 'A', text: 'Komputer harus rajin dibersihkan dari debu' },
          { label: 'B', text: 'Jika input data salah atau tidak valid, maka informasi yang dihasilkan juga pasti salah' },
          { label: 'C', text: 'Sampah elektronik harus dibuang pada tempatnya' },
          { label: 'D', text: 'Semua data di internet adalah sampah' }
        ],
        correctAnswer: 'B',
        explanation: 'Kualitas hasil pengolahan data sangat ditentukan oleh kevalidan input data.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Ketika sebuah aplikasi e-commerce merekomendasikan sepatu olahraga kepada seseorang yang baru saja membeli raket bulu tangkis, aplikasi tersebut memanfaatkan konsep...',
        options: [
          { label: 'A', text: 'Himpunan irisan data dan keterkaitan pola pembelian pelanggan' },
          { label: 'B', text: 'Tebakan acak tanpa logika' },
          { label: 'C', text: 'Pencurian sinyal telepon' },
          { label: 'D', text: 'Menghapus riwayat transaksi' }
        ],
        correctAnswer: 'A',
        explanation: 'Sistem rekomendasi bekerja dengan menganalisis keterkaitan pola dalam himpunan data belanja konsumen.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Kumpulan fakta berupa tinggi badan siswa kelas 7: [145, 150, 152, 148] merupakan representasi dari...',
        options: [
          { label: 'A', text: 'Data' },
          { label: 'B', text: 'Program' },
          { label: 'C', text: 'Sistem Operasi' },
          { label: 'D', text: 'Perangkat Keras' }
        ],
        correctAnswer: 'A',
        explanation: 'Angka-angka tersebut adalah data mentah.',
        points: 10
      },
      {
        id: 2,
        question: 'Informasi "Sebanyak 75% siswa kelas 7B telah tuntas ujian informatika" diperoleh dari hasil...',
        options: [
          { label: 'A', text: 'Pengolahan dan analisis himpunan data nilai' },
          { label: 'B', text: 'Menghapus seluruh file nilai' },
          { label: 'C', text: 'Menebak tanpa melihat ujian' },
          { label: 'D', text: 'Mematikan komputer' }
        ],
        correctAnswer: 'A',
        explanation: 'Informasi dihasilkan dari pemrosesan kumpulan data nilai siswa.',
        points: 10
      },
      {
        id: 3,
        question: 'Tipe data yang hanya dapat bernilai True atau False disebut...',
        options: [
          { label: 'A', text: 'Boolean' },
          { label: 'B', text: 'Float' },
          { label: 'C', text: 'String' },
          { label: 'D', text: 'Integer' }
        ],
        correctAnswer: 'A',
        explanation: 'Boolean hanya bernilai benar atau salah.',
        points: 10
      },
      {
        id: 4,
        question: 'Simbol irisan (∩) dalam diagram Venn merepresentasikan operasi logika...',
        options: [
          { label: 'A', text: 'AND' },
          { label: 'B', text: 'OR' },
          { label: 'C', text: 'NOT' },
          { label: 'D', text: 'NOR' }
        ],
        correctAnswer: 'A',
        explanation: 'Irisan berarti memenuhi kriteria himpunan pertama DAN himpunan kedua (AND).',
        points: 10
      },
      {
        id: 5,
        question: 'Operasi pengurutan data dari nilai terkecil ke terbesar disebut...',
        options: [
          { label: 'A', text: 'Ascending' },
          { label: 'B', text: 'Descending' },
          { label: 'C', text: 'Filtering' },
          { label: 'D', text: 'Deleting' }
        ],
        correctAnswer: 'A',
        explanation: 'Ascending berarti naik (terkecil ke terbesar / A ke Z).',
        points: 10
      },
      {
        id: 6,
        question: 'Operasi pengurutan data dari Z ke A atau nilai terbesar ke terkecil disebut...',
        options: [
          { label: 'A', text: 'Descending' },
          { label: 'B', text: 'Ascending' },
          { label: 'C', text: 'Encrypting' },
          { label: 'D', text: 'Formatting' }
        ],
        correctAnswer: 'A',
        explanation: 'Descending berarti turun (terbesar ke terkecil).',
        points: 10
      },
      {
        id: 7,
        question: 'Dalam basis data, kolom yang nilainya unik dan menjadi pembeda antar setiap baris data disebut...',
        options: [
          { label: 'A', text: 'Primary Key (Kunci Utama)' },
          { label: 'B', text: 'Cell' },
          { label: 'C', text: 'Folder' },
          { label: 'D', text: 'Icon' }
        ],
        correctAnswer: 'A',
        explanation: 'Primary key unik untuk setiap entitas, misal NISN siswa.',
        points: 10
      },
      {
        id: 8,
        question: 'Manakah diagram yang paling tepat digunakan untuk memvisualisasikan tren kenaikan suhu rata-rata Kroya dari bulan Januari hingga Desember?',
        options: [
          { label: 'A', text: 'Diagram Garis (Line Chart)' },
          { label: 'B', text: 'Diagram Lingkaran (Pie Chart)' },
          { label: 'C', text: 'Teks acak' },
          { label: 'D', text: 'QR Code' }
        ],
        correctAnswer: 'A',
        explanation: 'Line chart sangat tepat untuk menampilkan perkembangan tren data sepanjang waktu kontinu.',
        points: 10
      },
      {
        id: 9,
        question: 'Jika data absensi menunjukkan seorang murid hadir 18 hari dari total 20 hari efektif sekolah, persentase kehadirannya adalah...',
        options: [
          { label: 'A', text: '90%' },
          { label: 'B', text: '80%' },
          { label: 'C', text: '85%' },
          { label: 'D', text: '95%' }
        ],
        correctAnswer: 'A',
        explanation: '(18 / 20) * 100% = 90%.',
        points: 10
      },
      {
        id: 10,
        question: 'Tujuan utama dari pengelompokan himpunan data adalah...',
        options: [
          { label: 'A', text: 'Mempermudah pencarian, analisis, dan pengambilan keputusan' },
          { label: 'B', text: 'Membuat kapasitas hard disk cepat penuh' },
          { label: 'C', text: 'Mengunci data agar tidak pernah terbaca' },
          { label: 'D', text: 'Mengubah semua angka menjadi huruf' }
        ],
        correctAnswer: 'A',
        explanation: 'Organisasi data bertujuan memudahkan pengelolaan informasi.',
        points: 10
      }
    ]
  },

  // 3. KELAS 7 - Komponen, Fungsi, dan Cara Kerja Komputer
  {
    id: 'k7-komputer',
    grade: 7,
    title: 'Komponen, Fungsi, dan Cara Kerja Komputer',
    category: 'Sistem Komputer (SK)',
    shortDesc: 'Menjelajahi perangkat keras (hardware), perangkat lunak (software), pengguna (brainware), dan siklus siklus IPO (Input-Process-Output-Storage).',
    learningObjectives: [
      'Mengidentifikasi komponen perangkat keras komputer (Input, Processing, Output, Storage).',
      'Menjelaskan fungsi Sistem Operasi dan Perangkat Lunak Aplikasi.',
      'Memahami siklus kerja komputer: Input -> Process -> Output -> Storage.',
      'Menjelaskan peran Brainware dalam ekosistem sistem komputer.'
    ],
    apersepsi: {
      imagePromptDesc: 'Ilustrasi motherboard modern dengan komponen CPU bercahaya, slot RAM, dan kartu grafis dalam estetika edukatif bersih.',
      videoTitle: 'Bagaimana Komputer Mengubah Ketukan Keyboard Menjadi Huruf di Layar dalam 0.001 Detik?',
      videoDuration: '05:10',
      videoThumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      videoDescription: 'Mengintip perjalanan sinyal listrik dari tuts keyboard melalui CPU hingga diproyeksikan pada ribuan piksel monitor.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=AkFi90lZmXA',
      realLifeStory: 'Saat sedang asyik mengetik tugas di lab komputer SMPN 5 Kroya, tiba-tiba listrik padam sesaat. Komputer mati seketika. Ketika dinyalakan kembali, dokumen yang belum sempat disimpan hilang total, padahal teks tersebut jelas terlihat di layar sebelum mati. Mengapa komputer bisa "lupa" saat aliran listrik terputus, dan komponen mana yang sebenarnya bertanggung jawab?',
      triggerQuestions: [
        'Apa yang membedakan memori kerja sementara (RAM) dengan ruang penyimpanan permanen (SSD/Hard disk)?',
        'Mengapa CPU sering disebut sebagai "otak" komputer?',
        'Dapatkah komputer bekerja tanpa sistem operasi seperti Windows atau Linux?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Komponen perangkat keras yang bertindak sebagai "otak" komputer untuk memproses instruksi dan perhitungan adalah...',
        options: [
          { label: 'A', text: 'Central Processing Unit (CPU)' },
          { label: 'B', text: 'Monitor' },
          { label: 'C', text: 'Power Supply' },
          { label: 'D', text: 'Mouse' }
        ],
        correctAnswer: 'A',
        conceptTag: 'CPU',
        recommendation: 'Pelajari peran CPU sebagai pengendali utama instruksi komputer.'
      },
      {
        id: 2,
        question: 'Memori komputer yang bersifat volatile (datanya akan hilang saat listrik padam) adalah...',
        options: [
          { label: 'A', text: 'Hard Disk Drive (HDD)' },
          { label: 'B', text: 'Random Access Memory (RAM)' },
          { label: 'C', text: 'Flashdisk USB' },
          { label: 'D', text: 'Solid State Drive (SSD)' }
        ],
        correctAnswer: 'B',
        conceptTag: 'RAM vs Storage',
        recommendation: 'Pahami sifat volatile pada RAM dan non-volatile pada penyimpanan permanen.'
      },
      {
        id: 3,
        question: 'Perangkat berikut yang tergolong sebagai perangkat masukan (Input Device) adalah...',
        options: [
          { label: 'A', text: 'Speaker dan Monitor' },
          { label: 'B', text: 'Keyboard dan Pemindai (Scanner)' },
          { label: 'C', text: 'Proyektor dan Printer' },
          { label: 'D', text: 'Plotter dan Headphone' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Perangkat Input',
        recommendation: 'Kenali perangkat yang memasukkan data dari luar ke dalam sistem komputer.'
      },
      {
        id: 4,
        question: 'Perangkat lunak dasar yang bertugas mengelola sumber daya perangkat keras dan menyediakan antarmuka bagi pengguna adalah...',
        options: [
          { label: 'A', text: 'Sistem Operasi (Operating System)' },
          { label: 'B', text: 'Game Online' },
          { label: 'C', text: 'Web Browser' },
          { label: 'D', text: 'Aplikasi Kalkulator' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Sistem Operasi',
        recommendation: 'Pelajari fungsi vital sistem operasi seperti Windows, Linux, dan Android.'
      },
      {
        id: 5,
        question: 'Urutan siklus kerja komputer yang benar adalah...',
        options: [
          { label: 'A', text: 'Output -> Input -> Process -> Storage' },
          { label: 'B', text: 'Input -> Process -> Output -> Storage' },
          { label: 'C', text: 'Storage -> Output -> Input -> Process' },
          { label: 'D', text: 'Process -> Output -> Input -> Storage' }
        ],
        correctAnswer: 'B',
        conceptTag: 'Siklus IPO',
        recommendation: 'Pahami siklus dasar sistem komputer: Input, Process, Output, dan Storage.'
      }
    ],
    materi: {
      overview: 'Sistem Komputer adalah kesatuan elemen yang terdiri atas perangkat keras (hardware), perangkat lunak (software), dan manusia (brainware) yang saling bekerja sama untuk mengolah data menjadi informasi yang bermanfaat.',
      keyConcepts: [
        {
          title: '1. Perangkat Keras (Hardware)',
          explanation: 'Komponen fisik komputer yang dapat disentuh dan dilihat secara nyata.',
          bulletPoints: [
            'Input Device: Keyboard, Mouse, Scanner, Mikrofon, Kamera Web.',
            'Processing Device: CPU (ALU, CU, Register), Motherboard, GPU.',
            'Output Device: Monitor, Printer, Speaker, Proyektor / IFP.',
            'Storage Device: SSD, HDD, Flashdisk (Non-volatile).'
          ],
          iconName: 'Cpu'
        },
        {
          title: '2. Perangkat Lunak (Software)',
          explanation: 'Kumpulan instruksi elektronik atau program yang mengendalikan kerja perangkat keras.',
          bulletPoints: [
            'Sistem Operasi: Menjembatani hardware dan user (Windows, Android, Linux, macOS).',
            'Perangkat Lunak Aplikasi: Program spesifik tugas (Google Chrome, Microsoft Office, Canva).'
          ],
          iconName: 'Code'
        },
        {
          title: '3. Pengguna (Brainware)',
          explanation: 'Manusia yang mengoperasikan, memprogram, atau mengelola sistem komputer.',
          bulletPoints: [
            'Programmer: Pembuat kode dan algoritma software.',
            'Operator / User: Pengguna yang memakai aplikasi untuk kebutuhan belajar/kerja.',
            'Teknisi / Administrator: Menjaga stabilitas sistem dan jaringan.'
          ],
          iconName: 'Users'
        }
      ],
      comparisonTable: {
        title: 'Komparasi RAM vs SSD / Hard Disk',
        headers: ['Karakteristik', 'RAM (Random Access Memory)', 'SSD / Hard Disk (Storage)'],
        rows: [
          ['Sifat Memori', 'Volatile (Data hilang jika listrik mati)', 'Non-Volatile (Data tersimpan permanen)'],
          ['Kecepatan Akses', 'Sangat tinggi (GigaByte/detik)', 'Cepat (SSD) hingga Sedang (HDD)'],
          ['Fungsi Utama', 'Menampung data aplikasi yang sedang berjalan aktif', 'Menyimpan file, foto, dokumen jangka panjang'],
          ['Kapasitas Umum', '4 GB - 32 GB pada laptop SMP', '256 GB - 1 TB atau lebih']
        ]
      },
      dailyLifeExamples: [
        'Siklus IPO Foto Smartphone: Mengambil foto selfie dengan kamera (Input), chipset processor memproses filter pencahayaan (Process), hasil foto jernih tampil seketika di layar OLED (Output), lalu tersimpan permanen di memori internal UFS (Storage).',
        'Kasus Mengetik Tugas & Mati Lampu: Siswa yang rajin menekan Ctrl+S dokumennya tersimpan aman di SSD non-volatile, sedangkan siswa yang lupa menyimpan naskahnya kehilangan ketikan karena RAM kehilangan daya listrik.',
        'Mendengarkan Musik Streaming: Mengetuk judul lagu di layar sentuh (Input), processor mendekode data audio MP3 digital (Process), suara merdu mengalun dari speaker/headset (Output), dan lagu di-cache ke penyimpanan (Storage).'
      ],
      schoolExamples: [
        'Praktikum Lab Komputer SMPN 5 Kroya: Siswa menghubungkan kabel HDMI laptop ke Layar Sentuh Interaktif (IFP) 75 inci di kelas untuk menayangkan presentasi multimedia dan bereksperimen dengan simulator hardware.',
        'ANBK (Asesmen Nasional Berbasis Komputer): Siswa memakai keyboard dan mouse untuk menginput jawaban ujian pada PC client yang terhubung jaringan lokal ke server proktor sekolah.'
      ],
      tahukahKamu: 'CPU modern memiliki miliaran transistor mikroskopis di dalam keping silikon berukuran tidak lebih besar dari sebutir perangko pos!',
      faktaMenarik: 'Komputer elektronik pertama di dunia bernama ENIAC (1945) memiliki berat 30 ton dan memakan ruangan seluas 167 meter persegi!',
      infoPenting: 'Jangan pernah mematikan komputer dengan mencabut kabel daya secara paksa karena dapat merusak sistem operasi dan sektor penyimpanan data.',
      commonMistakes: [
        'Menyebut casing komputer sebagai CPU (casing adalah wadah, CPU adalah chip kecil di motherboard).',
        'Mengira RAM yang besar otomatis memperbesar ruang penyimpanan foto (RAM untuk kecepatan multi-tasking).'
      ],
      summary: [
        'Sistem komputer = Hardware + Software + Brainware.',
        'Siklus kerja komputer: Input -> Process -> Output -> Storage.',
        'RAM bersifat sementara, SSD/HDD menyimpan permanen.'
      ],
      formativeCheck: [
        {
          question: 'Manakah dari komponen berikut yang bertindak mengubah data digital menjadi cetakan fisik di kertas?',
          options: ['Printer', 'Scanner', 'Monitor', 'RAM'],
          answerIndex: 0,
          explanation: 'Printer adalah Output Device yang mencetak dokumen ke media fisik kertas.'
        }
      ]
    },
    simulasi: {
      type: 'categorize',
      title: 'Lab Perakitan Siklus Kerja Komputer (IPO)',
      scenario: 'Pilah 6 perangkat keras komputer berikut ke dalam kategori fungsi yang tepat: Input, Process, Output, atau Storage!',
      instructions: 'Kelompokkan setiap perangkat keras ke kotaknya masing-masing.',
      data: {
        items: [
          { id: 'hd-1', text: 'Keyboard Mekanikal', correctCategory: 'Input' },
          { id: 'hd-2', text: 'Processor Intel Core / AMD Ryzen', correctCategory: 'Process' },
          { id: 'hd-3', text: 'Monitor IPS 24 Inci', correctCategory: 'Output' },
          { id: 'hd-4', text: 'SSD NVMe 512 GB', correctCategory: 'Storage' },
          { id: 'hd-5', text: 'Mikrofon Headset Siswa', correctCategory: 'Input' },
          { id: 'hd-6', text: 'Speaker Aktif Lab Komputer', correctCategory: 'Output' }
        ],
        categories: ['Input', 'Process', 'Output', 'Storage']
      }
    },
    miniGame: {
      type: 'flash-quiz',
      title: 'Tebak Komponen Komputer',
      description: 'Uji reflekmu dalam menebak fungsi hardware dan software!',
      questions: [
        {
          id: 1,
          question: 'Komponen yang sering diibaratkan sebagai papan sirkuit utama tempat semua komponen saling terhubung adalah...',
          options: ['Motherboard', 'Hard Disk', 'Mousepad', 'Kabel LAN'],
          correctIndex: 0,
          clue: 'Papan induk sirkuit utama.'
        },
        {
          id: 2,
          question: 'Perangkat lunak yang memungkinkan kita berselancar di situs web seperti Google dan Wikipedia adalah...',
          options: ['Web Browser', 'Antivirus', 'Operating System', 'Media Player'],
          correctIndex: 0,
          clue: 'Contohnya Chrome, Firefox, Edge.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Tiga pilar utama sistem komputer yang saling melengkapi adalah...',
        options: [
          { label: 'A', text: 'Hardware, Software, dan Brainware' },
          { label: 'B', text: 'Monitor, Keyboard, dan Mouse' },
          { label: 'C', text: 'Windows, Linux, dan Android' },
          { label: 'D', text: 'Kabel, Listrik, dan Internet' }
        ],
        correctAnswer: 'A',
        explanation: 'Sistem komputer terdiri atas Hardware (perangkat keras), Software (perangkat lunak), dan Brainware (manusia pengoperasinya).',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Perangkat berikut yang memiliki fungsi ganda sebagai perangkat masukan (input) sekaligus keluaran (output) adalah...',
        options: [
          { label: 'A', text: 'Layar Sentuh (Touchscreen)' },
          { label: 'B', text: 'Keyboard' },
          { label: 'C', text: 'Speaker' },
          { label: 'D', text: 'Mouse optik' }
        ],
        correctAnswer: 'A',
        explanation: 'Touchscreen menerima input sentuhan jari sekaligus menampilkan output visual.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 3,
        question: 'Bagian CPU yang bertugas melakukan operasi perhitungan matematika (+, -, *, /) dan perbandingan logika (<, >, =) adalah...',
        options: [
          { label: 'A', text: 'Arithmetic Logic Unit (ALU)' },
          { label: 'B', text: 'Control Unit (CU)' },
          { label: 'C', text: 'Register' },
          { label: 'D', text: 'Heatsink Fan' }
        ],
        correctAnswer: 'A',
        explanation: 'ALU adalah unit di CPU yang memproses kalkulasi aritmetika dan logika.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 4,
        question: 'Mengapa Solid State Drive (SSD) jauh lebih cepat dan tahan guncangan dibandingkan Hard Disk Drive (HDD) konvensional?',
        options: [
          { label: 'A', text: 'SSD menggunakan piringan magnetik yang berputar sangat kencang' },
          { label: 'B', text: 'SSD menggunakan chip memori flash tanpa komponen mekanik yang bergerak' },
          { label: 'C', text: 'SSD tidak memerlukan aliran daya listrik' },
          { label: 'D', text: 'SSD hanya bisa dipasang di komputer berpendingin air' }
        ],
        correctAnswer: 'B',
        explanation: 'SSD berbasis flash memory elektronik tanpa piringan berputar, sehingga jauh lebih cepat dan tidak rentan rusak akibat goncangan.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 5,
        question: 'Ketika kamu membuka 10 tab di browser bersamaan dan laptop mulai melambat (lag), komponen yang kemungkinan besar kehabisan kapasitas adalah...',
        options: [
          { label: 'A', text: 'RAM (Random Access Memory)' },
          { label: 'B', text: 'Speaker' },
          { label: 'C', text: 'Power Supply' },
          { label: 'D', text: 'Kamera Web' }
        ],
        correctAnswer: 'A',
        explanation: 'Membuka banyak aplikasi/tab sekaligus memakan kapasitas RAM yang berfungsi menampung proses aktif.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Fungsi utama dari sistem operasi (Operating System) adalah...',
        options: [
          { label: 'A', text: 'Sebagai manajemen sumber daya perangkat keras dan penghubung antara user dan aplikasi' },
          { label: 'B', text: 'Hanya untuk memutar lagu dan video musik' },
          { label: 'C', text: 'Mendinginkan suhu processor agar tidak panas' },
          { label: 'D', text: 'Mencetak dokumen ke printer' }
        ],
        correctAnswer: 'A',
        explanation: 'OS mengontrol perangkat keras, alokasi memori, file system, dan menyediakan antarmuka bagi pengguna.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Manakah di bawah ini yang merupakan contoh sistem operasi open source (sumber terbuka)?',
        options: [
          { label: 'A', text: 'Linux' },
          { label: 'B', text: 'Microsoft Windows 11' },
          { label: 'C', text: 'Apple macOS' },
          { label: 'D', text: 'Apple iOS' }
        ],
        correctAnswer: 'A',
        explanation: 'Linux adalah sistem operasi open source yang kode sumbernya bebas dipelajari dan dikembangkan siapapun.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 8,
        question: 'Seorang siswa mengetik naskah cerpen di laptop. Saat laptop dimatikan, naskah tetap utuh ketika laptop dinyalakan kembali besok pagi. Hal ini membuktikan bahwa naskah telah disimpan di...',
        options: [
          { label: 'A', text: 'Media penyimpanan Non-Volatile (SSD/HDD)' },
          { label: 'B', text: 'Cache processor' },
          { label: 'C', text: 'RAM yang dimatikan' },
          { label: 'D', text: 'Kabel VGA' }
        ],
        correctAnswer: 'A',
        explanation: 'Media non-volatile mempertahankan data meskipun suplai listrik dimatikan.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 9,
        question: 'Peran programmer dalam pilar Brainware adalah...',
        options: [
          { label: 'A', text: 'Menulis dan merancang kode program yang memerintahkan komputer melakukan tugas tertentu' },
          { label: 'B', text: 'Hanya menyalakan stop kontak di lab' },
          { label: 'C', text: 'Membeli komputer di toko elektronik' },
          { label: 'D', text: 'Menjual casing bekas' }
        ],
        correctAnswer: 'A',
        explanation: 'Programmer merancang dan menulis kode software.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 10,
        question: 'Mengapa perangkat komputer membutuhkan kipas pendingin (Heatsink Fan) pada processor-nya?',
        options: [
          { label: 'A', text: 'Karena miliaran transistor yang bekerja menghasilkan panas tinggi yang dapat merusak chip jika tidak didinginkan' },
          { label: 'B', text: 'Agar menghasilkan suara bising saat bermain game' },
          { label: 'C', text: 'Supaya debu di luar ruangan tersedot ke dalam' },
          { label: 'D', text: 'Untuk menghemat konsumsi kuota internet' }
        ],
        correctAnswer: 'A',
        explanation: 'Aktivitas komputasi intensif memicu disipasi panas tinggi pada CPU yang memerlukan pendinginan aktif.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Perangkat keras yang berfungsi mengubah sinyal analog pengguna (seperti suara) menjadi sinyal digital komputer adalah...',
        options: [
          { label: 'A', text: 'Mikrofon' },
          { label: 'B', text: 'Monitor' },
          { label: 'C', text: 'Printer' },
          { label: 'D', text: 'Proyektor' }
        ],
        correctAnswer: 'A',
        explanation: 'Mikrofon menangkap gelombang suara analog dan mengubahnya menjadi sinyal digital (input).',
        points: 10
      },
      {
        id: 2,
        question: 'Penyimpanan utama yang bersifat volatile pada komputer adalah...',
        options: [
          { label: 'A', text: 'RAM' },
          { label: 'B', text: 'ROM' },
          { label: 'C', text: 'SSD' },
          { label: 'D', text: 'Flashdisk' }
        ],
        correctAnswer: 'A',
        explanation: 'RAM bersifat volatile (sementara).',
        points: 10
      },
      {
        id: 3,
        question: 'Papan sirkuit utama tempat menancapnya CPU, RAM, kartu grafis, dan media penyimpanan dinamakan...',
        options: [
          { label: 'A', text: 'Motherboard / Mainboard' },
          { label: 'B', text: 'Hard Disk' },
          { label: 'C', text: 'Power Supply' },
          { label: 'D', text: 'Kabel SATA' }
        ],
        correctAnswer: 'A',
        explanation: 'Motherboard adalah papan sirkuit utama.',
        points: 10
      },
      {
        id: 4,
        question: 'Siklus pengolahan data komputer yang benar adalah...',
        options: [
          { label: 'A', text: 'Input -> Process -> Output -> Storage' },
          { label: 'B', text: 'Output -> Input -> Process -> Storage' },
          { label: 'C', text: 'Process -> Input -> Storage -> Output' },
          { label: 'D', text: 'Storage -> Output -> Process -> Input' }
        ],
        correctAnswer: 'A',
        explanation: 'Siklus standar komputasi adalah IPO (Input, Process, Output, Storage).',
        points: 10
      },
      {
        id: 5,
        question: 'Manakah dari perangkat lunak berikut yang merupakan Sistem Operasi perangkat mobile smartphone?',
        options: [
          { label: 'A', text: 'Android' },
          { label: 'B', text: 'Microsoft Excel' },
          { label: 'C', text: 'Adobe Photoshop' },
          { label: 'D', text: 'Google Docs' }
        ],
        correctAnswer: 'A',
        explanation: 'Android adalah sistem operasi mobile terpopuler di dunia.',
        points: 10
      },
      {
        id: 6,
        question: 'Seseorang yang bertanggung jawab mengelola, merawat, dan mengamankan jaringan komputer di sekolah disebut...',
        options: [
          { label: 'A', text: 'Network Administrator' },
          { label: 'B', text: 'Graphic Designer' },
          { label: 'C', text: 'Data Entry' },
          { label: 'D', text: 'Gamer' }
        ],
        correctAnswer: 'A',
        explanation: 'Network Administrator mengelola infrastruktur jaringan.',
        points: 10
      },
      {
        id: 7,
        question: 'Satuan kecepatan clock processor komputer modern diukur dalam satuan...',
        options: [
          { label: 'A', text: 'GigaHertz (GHz)' },
          { label: 'B', text: 'GigaByte (GB)' },
          { label: 'C', text: 'Pixel (px)' },
          { label: 'D', text: 'Watt (W)' }
        ],
        correctAnswer: 'A',
        explanation: 'Kecepatan frekuensi clock CPU diukur dalam GHz (miliaran siklus per detik).',
        points: 10
      },
      {
        id: 8,
        question: 'Apa fungsi utama kartu grafis (GPU - Graphics Processing Unit)?',
        options: [
          { label: 'A', text: 'Memproses dan merender data visual agar ditampilkan ke layar monitor secara lancar' },
          { label: 'B', text: 'Menyimpan lagu MP3' },
          { label: 'C', text: 'Mengatur ketukan keyboard' },
          { label: 'D', text: 'Mengeluarkan kertas cetak' }
        ],
        correctAnswer: 'A',
        explanation: 'GPU dikhususkan untuk komputasi grafis dan rendering visual.',
        points: 10
      },
      {
        id: 9,
        question: 'Perangkat berikut yang TIDAK menyimpan data saat tidak ada tegangan listrik adalah...',
        options: [
          { label: 'A', text: 'DRAM (Dynamic RAM)' },
          { label: 'B', text: 'MicroSD Card' },
          { label: 'C', text: 'Flashdisk USB' },
          { label: 'D', text: 'Optical Disc (DVD-R)' }
        ],
        correctAnswer: 'A',
        explanation: 'DRAM adalah memori volatile yang membutuhkan refresh daya listrik konstan.',
        points: 10
      },
      {
        id: 10,
        question: 'Mengapa komputer memerlukan perangkat lunak pengemudi (Driver)?',
        options: [
          { label: 'A', text: 'Agar sistem operasi dapat mengenali dan berkomunikasi dengan perangkat keras tertentu (misal printer/VGA)' },
          { label: 'B', text: 'Agar komputer bisa menyetir mobil' },
          { label: 'C', text: 'Supaya monitor menjadi layar sentuh secara ajaib' },
          { label: 'D', text: 'Untuk menurunkan resolusi layar' }
        ],
        correctAnswer: 'A',
        explanation: 'Device Driver berfungsi sebagai penerjemah komunikasi antara sistem operasi dan hardware spesifik.',
        points: 10
      }
    ]
  },

  // ==========================================
  // KELAS 8 - INFORMATIKA
  // ==========================================
  {
    id: 'k8-fakta-hoaks',
    grade: 8,
    title: 'Membedakan Fakta, Opini, dan Hoaks',
    category: 'Literasi Digital & Etika',
    shortDesc: 'Mengasah kemampuan berpikir kritis dalam mengidentifikasi fakta teruji, opini subjektif, dan disinformasi/hoaks di ruang digital.',
    learningObjectives: [
      'Membedakan ciri-ciri kalimat fakta obyektif dan kalimat opini subyektif.',
      'Mengidentifikasi motif, ciri khas, dan bahaya penyebaran hoaks di media sosial.',
      'Menerapkan metode verifikasi informasi 5W+1H dan pengecekan fakta (Fact-Checking).',
      'Menggunakan perangkat pencarian gambar terbalik (Reverse Image Search) untuk mendeteksi manipulasi foto.'
    ],
    apersepsi: {
      imagePromptDesc: 'Detektif digital siswa mengamati postingan viral di smartphone dengan kaca pembesar yang menyorot stempel FAKTA atau HOAKS.',
      videoTitle: 'Mengapa Informasi Palsu (Hoaks) Menyebar 6 Kali Lebih Cepat daripada Fakta?',
      videoDuration: '04:30',
      videoThumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
      videoDescription: 'Eksperimen sosial tentang bagaimana judul sensasional (clickbait) memicu emosi amarah atau ketakutan sehingga mudah dibagikan tanpa dibaca tuntas.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=cSKGa_7XJkg',
      realLifeStory: 'Suatu malam, grup WhatsApp warga desa Kroya gempar dengan pesan berantai: "Waspada! Besok pagi jaringan internet seluruh Jawa Tengah akan dimatikan total selama seminggu karena pemeliharaan satelit. Sebarkan ke seluruh kontakmu sekarang juga!". Banyak warga panik dan membagikannya ke puluhan grup lain. Setelah dikonfirmasi ke Kominfo, berita tersebut 100% palsu. Mengapa pesan seperti ini begitu mudah dipercayai dan disebarkan?',
      triggerQuestions: [
        'Mengapa pembuat hoaks sering menggunakan kalimat "Sebarkan ke semua orang sekarang juga!"?',
        'Bagaimana emosi (takut, panik, senang berlebihan) dimanfaatkan untuk menipu logika kita?',
        'Apa langkah pertama yang harus kamu lakukan saat menerima pesan sensasional di grup keluarga?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Kalimat berikut yang merupakan FAKTA yang dapat diuji kebenarannya secara objektif adalah...',
        options: [
          { label: 'A', text: 'SMP Negeri 5 Kroya berlokasi di Kabupaten Cilacap, Jawa Tengah' },
          { label: 'B', text: 'Pelajaran Informatika adalah pelajaran yang paling menyenangkan di dunia' },
          { label: 'C', text: 'Semua siswa sebaiknya tidur jam 20.00 agar pintar' },
          { label: 'D', text: 'Warna biru adalah warna terbaik untuk seragam sekolah' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Fakta vs Opini',
        recommendation: 'Pelajari ciri fakta: dapat diverifikasi dengan data geografis/ilmiah riil.'
      },
      {
        id: 2,
        question: 'Pernyataan yang memuat kata sifat subjektif seperti "menurut saya", "sebaiknya", "sangat indah" tergolong sebagai...',
        options: [
          { label: 'A', text: 'Opini' },
          { label: 'B', text: 'Fakta Ilmiah' },
          { label: 'C', text: 'Hukum Alam' },
          { label: 'D', text: 'Undang-Undang' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Ciri Opini',
        recommendation: 'Kenali kata penanda opini subjektif yang mencerminkan sudut pandang pribadi.'
      },
      {
        id: 3,
        question: 'Informasi salah yang sengaja dibuat dan disebarkan dengan tujuan menipu, memicu kepanikan, atau keuntungan finansial disebut...',
        options: [
          { label: 'A', text: 'Disinformasi / Hoaks' },
          { label: 'B', text: 'Opini Konstruktif' },
          { label: 'C', text: 'Ensiklopedia' },
          { label: 'D', text: 'Jurnal Ilmiah' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Definisi Hoaks',
        recommendation: 'Pahami definisi hoaks dan disinformasi (informasi salah yang disengaja).'
      },
      {
        id: 4,
        question: 'Judul berita online yang berlebihan dan menggoda rasa penasaran demi mendapatkan klik pembaca (misal: "Bikin Merinding! Jangan Sampai Menyesal...") disebut...',
        options: [
          { label: 'A', text: 'Clickbait' },
          { label: 'B', text: 'Peer Review' },
          { label: 'C', text: 'Metodologi' },
          { label: 'D', text: 'Copyright' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Clickbait',
        recommendation: 'Kenali taktik clickbait yang sering digunakan situs tidak kredibel.'
      },
      {
        id: 5,
        question: 'Situs resmi lembaga pemerintah Indonesia selalu menggunakan domain tingkat atas (Top Level Domain)...',
        options: [
          { label: 'A', text: '.go.id' },
          { label: 'B', text: '.blogspot.com' },
          { label: 'C', text: '.xyz' },
          { label: 'D', text: '.free.net' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Domain Kredibel',
        recommendation: 'Pahami domain resmi terpercaya: .go.id (pemerintah), .sch.id (sekolah), .ac.id (kampus).'
      }
    ],
    materi: {
      overview: 'Di era banjir informasi digital, kemampuan memilah antara fakta yang terverifikasi, opini subjektif, dan hoaks yang menyesatkan merupakan keterampilan bertahan hidup (digital survival skill) yang wajib dimiliki pelajar cerdas.',
      keyConcepts: [
        {
          title: '1. Karakteristik Fakta',
          explanation: 'Keadaan atau peristiwa yang benar-benar terjadi, didukung bukti empiris, data kuantitatif, dan dapat diverifikasi secara ilmiah.',
          bulletPoints: [
            'Dapat diuji kebenarannya oleh siapa saja.',
            'Bebas dari pengaruh emosi pribadi.',
            'Contoh: "Jarak Kroya ke Cilacap sekitar 30 kilometer."'
          ],
          iconName: 'CheckCircle'
        },
        {
          title: '2. Karakteristik Opini',
          explanation: 'Pendapat, tanggapan, gagasan, atau keyakinan seseorang mengenai suatu hal yang belum tentu disepakati semua orang.',
          bulletPoints: [
            'Menggunakan kata dugaan: "mungkin", "sebaiknya", "tampaknya", "menurut saya".',
            'Bersifat relatif dan bergantung sudut pandang.',
            'Contoh: "Perjalanan naik kereta api jauh lebih menyenangkan dibanding bus."'
          ],
          iconName: 'MessageSquare'
        },
        {
          title: '3. Karakteristik Hoaks dan Disinformasi',
          explanation: 'Informasi palsu yang dirancang sedemikian rupa untuk menyerupai berita asli guna memanipulasi emosi, memecah belah, atau meraup keuntungan iklan.',
          bulletPoints: [
            'Judul provokatif atau heboh (Clickbait).',
            'Tidak mencantumkan sumber nama penulis atau institusi resmi.',
            'Sering meminta untuk "segera dibagikan sebelum dihapus".',
            'Menggunakan foto lama dari peristiwa lain yang disalahartikan.'
          ],
          iconName: 'AlertTriangle'
        }
      ],
      comparisonTable: {
        title: 'Tabel Pembeda: Fakta vs Opini vs Hoaks',
        headers: ['Aspek', 'Fakta', 'Opini', 'Hoaks / Fake News'],
        rows: [
          ['Sumber Bukti', 'Data teruji, riset, dokumen otentik', 'Pemikiran atau pengalaman pribadi', 'Fiktif, karangan, atau rekayasa manipulatif'],
          ['Sifat Kebenaran', 'Objektif dan universal', 'Subjektif dan variatif', 'Palsu (dibuat seolah-olah benar)'],
          ['Tujuan', 'Mengabarkan peristiwa nyata apa adanya', 'Menyampaikan saran atau apresiasi', 'Menyesatkan opini, memicu kepanikan/kebencian'],
          ['Tindakan Kita', 'Diterima sebagai referensi pengetahuan', 'Dihargai sebagai sudut pandang', 'Diverifikasi, jangan disebarkan, laporkan (report)']
        ]
      },
      dailyLifeExamples: [
        'Menerima pesan berhadiah ratusan juta dari nomor WhatsApp asing tanpa identitas -> Ciri khas hoaks phishing.',
        'Melihat ulasan makanan di media sosial: "Baksonya gurih dan kuahnya mantap" -> Opini penikmat kuliner.'
      ],
      schoolExamples: [
        'Pengumuman libur semester yang ditandatangani Kepala Sekolah dengan stempel resmi di website sekolah -> Fakta resmi.',
        'Kabar angin di kelas bahwa ulangan Informatika besok ditiadakan padahal guru belum mengumumkan -> Rumor yang perlu diverifikasi ke ketua kelas.'
      ],
      tahukahKamu: 'Kementerian Komunikasi dan Digital RI (Komdigi) memiliki portal khusus turnbackhoax.id dan cekfakta.com yang dikelola bersama media terverifikasi untuk meluruskan berita-berita palsu yang beredar di masyarakat!',
      faktaMenarik: 'Teknologi kecerdasan buatan sekarang mampu menghasilkan Deepfake (video wajah dan suara seseorang yang direkayasa sangat mirip aslinya). Oleh karena itu, bukti visual digital masa kini memerlukan verifikasi ganda!',
      infoPenting: 'Prinsip S-A-R-I-N-G Sebelum S-H-A-R-I-N-G: Periksa Sumbernya, Amati Apakah ada fakta pendukung, Rasakan Apakah memicu amarah berlebih, Ingat Jangan buru-buru membagikan!',
      commonMistakes: [
        'Langsung membagikan berita hanya karena yang mengirim adalah orang tua atau guru di grup WA (mereka pun bisa menjadi korban penyebaran hoaks).',
        'Mengira berita viral dengan ribuan "likes" pasti merupakan fakta yang benar.'
      ],
      summary: [
        'Fakta berpijak pada bukti obyektif, opini berpijak pada sudut pandang subjektif.',
        'Hoaks memanfaatkan ketakutan dan rasa penasaran untuk menyebar cepat.',
        'Terapkan cek fakta ke portal kredibel sebelum menekan tombol bagikan.'
      ],
      formativeCheck: [
        {
          question: 'Manakah tindakan pertama yang paling cerdas saat membaca berita bombastis di media sosial?',
          options: [
            'Langsung membagikannya ke 10 grup WhatsApp kelas',
            'Menelusuri judul berita tersebut di mesin pencari untuk melihat apakah media nasional kredibel memberitakannya',
            'Mengabaikannya dan membiarkan orang lain tertipu',
            'Marah-marah di kolom komentar'
          ],
          answerIndex: 1,
          explanation: 'Benar! Memeriksa apakah media terpercaya lain memberitakan hal yang sama adalah teknik triangulasi verifikasi informasi.'
        }
      ]
    },
    simulasi: {
      type: 'fact-checker',
      title: 'Lab Analisis Cek Fakta Digital',
      scenario: 'Terdapat 4 pesan yang beredar di media sosial. Tugasmu adalah memeriksa dan memberi label: FAKTA, OPINI, atau HOAKS!',
      instructions: 'Pilih label yang paling tepat untuk masing-masing klaim di bawah ini.',
      data: {
        items: [
          { id: 'fc-1', text: 'SMP Negeri 5 Kroya didirikan di bawah naungan Dinas Pendidikan Kabupaten Cilacap.', correctCategory: 'Fakta' },
          { id: 'fc-2', text: 'Makan cokelat saat belajar matematika membuat nilai ulangan pasti 100.', correctCategory: 'Hoaks' },
          { id: 'fc-3', text: 'Desain website sekolah ini terlihat sangat rapi dan enak dipandang mata.', correctCategory: 'Opini' },
          { id: 'fc-4', text: 'Segera bagikan pesan ini ke 20 orang agar kuota internet 50GB gratis otomatis masuk!', correctCategory: 'Hoaks' }
        ],
        categories: ['Fakta', 'Opini', 'Hoaks']
      }
    },
    miniGame: {
      type: 'fact-or-hoax',
      title: 'Tantangan: Benar atau Hoaks?',
      description: 'Cepat dan cermat! Tentukan apakah pernyataan berikut adalah Fakta Valid atau Hoaks!',
      questions: [
        {
          id: 1,
          question: '"Mengisi daya smartphone hingga 100% semalaman pada baterai modern lithium-ion sudah dilengkapi pemutus arus otomatis." Apakah ini Fakta atau Hoaks?',
          options: ['Fakta Valid', 'Hoaks'],
          correctIndex: 0,
          clue: 'Smartphone modern memiliki chip manajemen daya protektif.'
        },
        {
          id: 2,
          question: '"Mengetik kode rahasia #31# di keyboard HP bisa mengubah pulsa menjadi saldo uang tunai 1 juta rupiah." Apakah ini Fakta atau Hoaks?',
          options: ['Hoaks', 'Fakta Valid'],
          correctIndex: 0,
          clue: 'Pesan tipuan klasik yang sering beredar di SMS.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Kalimat berikut yang merupakan pernyataan FAKTA adalah...',
        options: [
          { label: 'A', text: 'Air mendidih pada suhu 100 derajat Celsius pada tekanan udara standar 1 atmosfer' },
          { label: 'B', text: 'Kopi hitam lebih enak dinikmati saat hujan gerimis' },
          { label: 'C', text: 'Masa depan Indonesia pasti cerah jika kita rajin menyanyi' },
          { label: 'D', text: 'Bahasa pemrograman Python adalah bahasa terbaik di alam semesta' }
        ],
        correctAnswer: 'A',
        explanation: 'Titik didih air 100°C adalah fakta fisika yang dapat dibuktikan secara empiris terukur.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Ciri utama yang membedakan opini dari fakta adalah...',
        options: [
          { label: 'A', text: 'Opini selalu ditulis dengan tinta merah' },
          { label: 'B', text: 'Opini memuat pertimbangan nilai, perasaan, atau interpretasi subjektif yang bisa diperdebatkan' },
          { label: 'C', text: 'Opini selalu memiliki bukti laboratorium' },
          { label: 'D', text: 'Opini tidak boleh dibaca orang lain' }
        ],
        correctAnswer: 'B',
        explanation: 'Opini adalah penilaian subjektif yang bervariasi antar individu.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Mengapa penyebar hoaks sering kali memanfaatkan isu-isu sensitif seperti kesehatan, bencana alam, atau keagamaan?',
        options: [
          { label: 'A', text: 'Karena isu tersebut membangkitkan emosi intens (takut, iba, marah) yang membuat akal sehat mengabaikan verifikasi' },
          { label: 'B', text: 'Karena isu tersebut tidak boleh ditulis di internet' },
          { label: 'C', text: 'Karena undang-undang membebaskan hoaks di bidang tersebut' },
          { label: 'D', text: 'Hanya kebetulan tanpa tujuan' }
        ],
        correctAnswer: 'A',
        explanation: 'Emosi yang terpicu secara ekstrem menurunkan kewaspadaan kritis seseorang.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 4,
        question: 'Trik verifikasi gambar untuk memastikan apakah foto sebuah peristiwa bencana adalah foto asli terkini atau foto lama yang dipakai ulang adalah dengan...',
        options: [
          { label: 'A', text: 'Menggunakan fitur Google Reverse Image Search (Pencarian Gambar Terbalik)' },
          { label: 'B', text: 'Memperbesar gambar hingga pecah' },
          { label: 'C', text: 'Mengubah format gambar menjadi PDF' },
          { label: 'D', text: 'Menghapus gambar dari galeri HP' }
        ],
        correctAnswer: 'A',
        explanation: 'Reverse Image Search mencari kemunculan awal foto di web untuk mendeteksi konteks manipulatif.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Manakah dari tautan website berikut yang paling kredibel untuk dijadikan sumber rujukan data kependudukan Indonesia?',
        options: [
          { label: 'A', text: 'https://bps.go.id' },
          { label: 'B', text: 'https://berita-kepo-terkini.blogspot.com' },
          { label: 'C', text: 'http://data-gratis-indonesia.xyz' },
          { label: 'D', text: 'https://forum-bebas-gosip.net' }
        ],
        correctAnswer: 'A',
        explanation: 'Domain .go.id milik Badan Pusat Statistik (BPS) resmi dari pemerintah.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 6,
        question: 'Apa bahaya yang ditimbulkan jika seseorang dengan sengaja menyebarkan berita bohong yang memicu keonaran di media sosial berdasarkan UU ITE di Indonesia?',
        options: [
          { label: 'A', text: 'Dapat dikenai sanksi pidana penjara dan denda denda ratusan juta rupiah' },
          { label: 'B', text: 'Hanya disuruh meminta maaf lewat status' },
          { label: 'C', text: 'Tidak ada konsekuensi hukum apa pun' },
          { label: 'D', text: 'Mendapatkan piagam penghargaan dari polisi' }
        ],
        correctAnswer: 'A',
        explanation: 'Penyebaran hoaks yang menimbulkan kericuhan atau fitnah diatur ketat dalam pasal UU ITE dengan ancaman pidana nyata.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Sebuah pesan di media sosial menyebutkan: "Semua obat kimia adalah racun mematikan, beralihlah ke tanaman X yang bisa menyembuhkan semua penyakit!". Pesan ini sangat mencurigakan karena...',
        options: [
          { label: 'A', text: 'Membuat klaim absolut tanpa uji klinis ilmiah dan mendiskreditkan sains kedokteran untuk motif jualan' },
          { label: 'B', text: 'Tidak ditulis dalam bahasa Inggris' },
          { label: 'C', text: 'Hanya bisa dibaca di laptop' },
          { label: 'D', text: 'Terlalu banyak huruf vokal' }
        ],
        correctAnswer: 'A',
        explanation: 'Klaim mujarab menyembuhkan segala penyakit ("panacea") adalah tanda klasik hoaks pseudosains / quackery.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Metode membaca "Lateral Reading" yang dipraktikkan para pemeriksa fakta profesional berarti...',
        options: [
          { label: 'A', text: 'Membuka tab baru untuk mencari tahu kredibilitas situs sumber dari pihak luar yang independen' },
          { label: 'B', text: 'Membaca artikel dari bawah ke atas secara terbalik' },
          { label: 'C', text: 'Membaca sambil memiringkan kepala ke samping' },
          { label: 'D', text: 'Menghafal setiap kata artikel' }
        ],
        correctAnswer: 'A',
        explanation: 'Lateral reading memverifikasi reputasi sumber dengan membuka tab pencarian independen pembanding.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 9,
        question: 'Kalimat berikut yang merupakan bentuk OPINI yang santun dalam diskusi kelas adalah...',
        options: [
          { label: 'A', text: 'Menurut pendapat saya, alternatif solusi kedua lebih hemat biaya dan efisien diterapkan di sekolah kita' },
          { label: 'B', text: 'Pendapatmu konyol dan tidak ada gunanya' },
          { label: 'C', text: 'Pasti kamu salah karena kamu tidak pintar' },
          { label: 'D', text: 'Jangan dengarkan dia, dengarkan saya saja' }
        ],
        correctAnswer: 'A',
        explanation: 'Kalimat ini menyampaikan opini konstruktif dengan dasar alasan yang logis dan bahasa santun.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 10,
        question: 'Langkah yang paling bijak saat menemukan postingan teman sekelas yang mengandung unsur hoaks dan fitnah adalah...',
        options: [
          { label: 'A', text: 'Mengingatkannya secara pribadi (japri) dengan menyertakan bukti tautan cek fakta terpercaya' },
          { label: 'B', text: 'Membalas dengan memaki di kolom komentar publik' },
          { label: 'C', text: 'Membantu menyebarkannya agar teman-teman lain ikut membaca' },
          { label: 'D', text: 'Mengunduh foto lalu membuat meme ejekan' }
        ],
        correctAnswer: 'A',
        explanation: 'Menegur secara santun di jalur pribadi dengan bukti kredibel adalah wujud netiket cerdas.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Klaim "Candi Borobudur dibangun pada abad ke-8 Masehi pada masa Wangsa Syailendra" tergolong sebagai...',
        options: [
          { label: 'A', text: 'Fakta Sejarah' },
          { label: 'B', text: 'Opini Pribadi' },
          { label: 'C', text: 'Hoaks Medsos' },
          { label: 'D', text: 'Clickbait' }
        ],
        correctAnswer: 'A',
        explanation: 'Fakta sejarah terbukti melalui prasasti dan catatan arkeologis.',
        points: 10
      },
      {
        id: 2,
        question: 'Pernyataan "Menurut pandangan kami, film dokumenter ini sangat inspiratif" tergolong sebagai...',
        options: [
          { label: 'A', text: 'Opini' },
          { label: 'B', text: 'Fakta Matematis' },
          { label: 'C', text: 'Disinformasi' },
          { label: 'D', text: 'Malware' }
        ],
        correctAnswer: 'A',
        explanation: 'Pernyataan evaluasi estetika atau inspirasi adalah opini subjektif.',
        points: 10
      },
      {
        id: 3,
        question: 'Domain resmi untuk instansi sekolah dasar dan menengah di Indonesia adalah...',
        options: [
          { label: 'A', text: '.sch.id' },
          { label: 'B', text: '.ac.id' },
          { label: 'C', text: '.co.id' },
          { label: 'D', text: '.mil.id' }
        ],
        correctAnswer: 'A',
        explanation: '.sch.id khusus untuk School Indonesia.',
        points: 10
      },
      {
        id: 4,
        question: 'Salah satu tanda visual umum dari sebuah video rekayasa Deepfake adalah...',
        options: [
          { label: 'A', text: 'Gerakan kedipan mata yang tidak wajar atau distorsi aneh di sekitar bibir dan rahang' },
          { label: 'B', text: 'Video selalu hitam putih' },
          { label: 'C', text: 'Durasi video selalu tepat 1 menit' },
          { label: 'D', text: 'Resolusi layar 4K tanpa cacat' }
        ],
        correctAnswer: 'A',
        explanation: 'Deepfake awal sering memiliki kejanggalan mikro ekspresi kedipan dan batas wajah.',
        points: 10
      },
      {
        id: 5,
        question: 'Tujuan utama portal cekfakta.com dan turnbackhoax.id adalah...',
        options: [
          { label: 'A', text: 'Melakukan klarifikasi dan pengecekan fakta atas isu-isu viral yang beredar di masyarakat' },
          { label: 'B', text: 'Menjual barang elektronik murah' },
          { label: 'C', text: 'Memblokir semua media sosial' },
          { label: 'D', text: 'Menghapus akun yang tidak aktif' }
        ],
        correctAnswer: 'A',
        explanation: 'Portal cek fakta bertujuan mengedukasi dan meluruskan disinformasi di masyarakat.',
        points: 10
      },
      {
        id: 6,
        question: 'Apa bahaya terbesar dari fenomena "Echo Chamber" (Ruang Gema Informasi) di media sosial?',
        options: [
          { label: 'A', text: 'Pengguna hanya terpapar pada opini yang sesuai dengan keyakinannya sendiri sehingga menjadi tertutup dari fakta berbeda' },
          { label: 'B', text: 'Suara speaker HP menjadi bergema saat telepon' },
          { label: 'C', text: 'Baterai smartphone cepat panas' },
          { label: 'D', text: 'Layar HP sering berkedip' }
        ],
        correctAnswer: 'A',
        explanation: 'Echo chamber mengisolasi pengguna dari sudut pandang obyektif pembanding.',
        points: 10
      },
      {
        id: 7,
        question: 'Jika sebuah berita menyebutkan "Menurut para ilmuwan...", tetapi tidak menyebutkan nama satu pun ilmuwan maupun nama jurnal penelitiannya, maka berita tersebut memiliki kelemahan pada aspek...',
        options: [
          { label: 'A', text: 'Akuntabilitas dan verifikasi sumber' },
          { label: 'B', text: 'Ukuran font tulisan' },
          { label: 'C', text: 'Jumlah karakter judul' },
          { label: 'D', text: 'Warna latar belakang' }
        ],
        correctAnswer: 'A',
        explanation: 'Ketiadaan rujukan lembaga/nama spesifik ("nameless experts") adalah ciri berita meragukan.',
        points: 10
      },
      {
        id: 8,
        question: 'Manakah singkatan 5W+1H yang benar dalam kaidah verifikasi kelengkapan informasi berita?',
        options: [
          { label: 'A', text: 'What, Who, Where, When, Why, How' },
          { label: 'B', text: 'Wifi, Windows, Word, Web, Watch, Harddisk' },
          { label: 'C', text: 'Work, Write, Warn, Win, Wait, Hope' },
          { label: 'D', text: 'Water, Wind, World, War, Wall, Heat' }
        ],
        correctAnswer: 'A',
        explanation: '5W+1H: Apa, Siapa, Di mana, Kapan, Mengapa, dan Bagaimana.',
        points: 10
      },
      {
        id: 9,
        question: 'Mengapa kita tidak boleh sembarangan menuduh seseorang sebagai "penyebar hoaks" tanpa menyertakan bukti konfirmasi yang jelas?',
        options: [
          { label: 'A', text: 'Karena tuduhan tanpa bukti dapat berbalik menjadi fitnah dan mencoreng nama baik orang lain' },
          { label: 'B', text: 'Karena polisi akan menyita semua HP di sekolah' },
          { label: 'C', text: 'Karena akun media sosial kita akan hilang otomatis' },
          { label: 'D', text: 'Karena semua orang di internet selalu benar' }
        ],
        correctAnswer: 'A',
        explanation: 'Tuduhan sepihak tanpa bukti melanggar etika dan berisiko hukum.',
        points: 10
      },
      {
        id: 10,
        question: 'Sikap literasi digital yang paling tepat saat menerima kiriman pesan berantai yang menjanjikan hadiah mobil adalah...',
        options: [
          { label: 'A', text: 'Bersikap kritis, jangan klik tautan mencurigakan, dan hapus pesan tersebut' },
          { label: 'B', text: 'Mengisi formulir data nomor rekening dan nomor KTP orang tua' },
          { label: 'C', text: 'Meneruskan pesan ke 100 teman agar hadiah berlipat ganda' },
          { label: 'D', text: 'Mengunggah screenshot ke story Instagram dengan bangga' }
        ],
        correctAnswer: 'A',
        explanation: 'Tautan hadiah palsu adalah modus umum penipuan / pencurian identitas.',
        points: 10
      }
    ]
  },

  // 4. KELAS 8 - Jaringan Komputer & Koneksi
  {
    id: 'k8-jaringan',
    grade: 8,
    title: 'Konsep Dasar Jaringan Komputer',
    category: 'Jaringan Komputer dan Internet (JKI)',
    shortDesc: 'Memahami cara komputer saling bertukar data melalui topologi jaringan, IP address, router, switch, dan protokol internet.',
    learningObjectives: [
      'Menjelaskan pengertian dan manfaat Jaringan Komputer.',
      'Membedakan cakupan jaringan: LAN, MAN, dan WAN.',
      'Menganalisis karakteristik topologi jaringan (Star, Bus, Ring, Mesh).',
      'Memahami fungsi perangkat jaringan: Router, Switch, Modem, dan Kabel UTP.'
    ],
    apersepsi: {
      imagePromptDesc: 'Diagram jaringan komputer sekolah menunjukkan router pusat, switch lab komputer, laptop siswa, dan akses poin nirkabel.',
      videoTitle: 'Bagaimana Pesan WhatsApp dari Kroya Bisa Sampai ke Temanmu di Jakarta dalam 0.3 Detik?',
      videoDuration: '04:50',
      videoThumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
      videoDescription: 'Melacak rute paket data melintasi gelombang nirkabel, router sekolah, kabel fiber optik bawah tanah hingga server cloud.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=7_LPdttKXPc',
      realLifeStory: 'Di Lab Komputer SMP Negeri 5 Kroya, terdapat 30 unit komputer desktop yang dapat mencetak dokumen ke satu mesin printer yang sama tanpa harus mencabut pasang kabel USB. Ketika guru membagikan soal ujian, semua komputer siswa menerimanya secara serentak dalam hitungan detik. Keajaiban apa yang menghubungkan puluhan mesin ini sehingga dapat saling berbagi printer, file, dan internet?',
      triggerQuestions: [
        'Apa yang terjadi jika kabel penghubung di satu komputer lab terputus, apakah komputer lain ikut mati?',
        'Mengapa setiap perangkat di jaringan harus memiliki nomor unik yang disebut Alamat IP (IP Address)?',
        'Apa perbedaan peran antara Switch di dalam ruangan lab dengan Router yang menghubungkan ke luar sekolah?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Jaringan komputer yang menghubungkan perangkat dalam area geografis terbatas seperti ruangan lab komputer atau satu gedung sekolah disebut...',
        options: [
          { label: 'A', text: 'Local Area Network (LAN)' },
          { label: 'B', text: 'Wide Area Network (WAN)' },
          { label: 'C', text: 'Metropolitan Area Network (MAN)' },
          { label: 'D', text: 'Global Network' }
        ],
        correctAnswer: 'A',
        conceptTag: 'LAN',
        recommendation: 'Pelajari perbedaan skala jaringan: LAN (lokal), MAN (kota), WAN (dunia).'
      },
      {
        id: 2,
        question: 'Topologi jaringan di mana semua komputer terhubung ke satu perangkat konsentrator pusat (Switch/Hub) berbentuk menyerupai bintang disebut...',
        options: [
          { label: 'A', text: 'Topologi Star' },
          { label: 'B', text: 'Topologi Bus' },
          { label: 'C', text: 'Topologi Ring' },
          { label: 'D', text: 'Topologi Mesh' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Topologi Star',
        recommendation: 'Kenali keunggulan topologi Star: jika 1 kabel putus, komputer lain tetap bekerja normal.'
      },
      {
        id: 3,
        question: 'Perangkat jaringan yang bertugas meneruskan paket data antar-jaringan yang berbeda segmen (misal dari LAN sekolah ke Internet dunia) adalah...',
        options: [
          { label: 'A', text: 'Router' },
          { label: 'B', text: 'Mouse' },
          { label: 'C', text: 'Kabel VGA' },
          { label: 'D', text: 'Speaker' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Router',
        recommendation: 'Router bertugas mencari rute terbaik (routing) antar jaringan yang berbeda.'
      },
      {
        id: 4,
        question: 'Nomor identitas unik yang dimiliki setiap perangkat untuk dapat berkomunikasi di jaringan internet (misal: 192.168.1.1) disebut...',
        options: [
          { label: 'A', text: 'IP Address' },
          { label: 'B', text: 'Barcode' },
          { label: 'C', text: 'Serial Number CPU' },
          { label: 'D', text: 'PIN ATM' }
        ],
        correctAnswer: 'A',
        conceptTag: 'IP Address',
        recommendation: 'Pahami fungsi vital IP Address sebagai alamat pengiriman paket data.'
      },
      {
        id: 5,
        question: 'Kabel jaringan yang paling umum digunakan untuk menghubungkan komputer ke switch di lab sekolah menggunakan konektor RJ-45 adalah kabel...',
        options: [
          { label: 'A', text: 'UTP (Unshielded Twisted Pair)' },
          { label: 'B', text: 'Kabel Listrik Tembaga PLN' },
          { label: 'C', text: 'Kabel Audio Jack 3.5mm' },
          { label: 'D', text: 'Kabel Antena TV Coaxial' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Kabel Jaringan',
        recommendation: 'Kenali kabel UTP Cat5e/Cat6 dengan konektor modular RJ-45.'
      }
    ],
    materi: {
      overview: 'Jaringan Komputer adalah sistem yang menghubungkan dua atau lebih komputer dan perangkat lainnya menggunakan media transmisi kabel atau nirkabel, sehingga dapat saling berbagi data, sumber daya (resource sharing), dan koneksi internet.',
      keyConcepts: [
        {
          title: '1. Klasifikasi Jaringan Berdasarkan Geografis',
          explanation: 'Jangkauan wilayah menentukan tipe infrastruktur dan teknologi yang digunakan.',
          bulletPoints: [
            'LAN (Local Area Network): Jangkauan ruangan, gedung, atau kampus sekolah (10m - 1km).',
            'MAN (Metropolitan Area Network): Jangkauan antargaris kota atau kabupaten (10km - 50km).',
            'WAN (Wide Area Network): Jangkauan antarnegara atau benua, seperti jaringan global Internet.'
          ],
          iconName: 'Globe'
        },
        {
          title: '2. Topologi Jaringan',
          explanation: 'Bentuk geometris susunan fisik atau logis bagaimana perangkat-perangkat dihubungkan dalam satu jaringan.',
          bulletPoints: [
            'Star: Semua client terhubung ke konsentrator switch pusat (Paling populer & andal).',
            'Bus: Menggunakan satu kabel utama tunggal (backbone) dengan terminator di kedua ujung.',
            'Ring: Setiap komputer terhubung ke dua komputer tetangga membentuk lingkaran tertutup.',
            'Mesh: Setiap perangkat terhubung langsung ke setiap perangkat lain (Redundansi tinggi).'
          ],
          iconName: 'Share2'
        },
        {
          title: '3. Perangkat Keras Jaringan Vital',
          explanation: 'Alat-alat yang mengatur lalu lintas transmisi data.',
          bulletPoints: [
            'Switch: Menghubungkan banyak perangkat dalam satu LAN lokal dan mengirim data tepat sasaran.',
            'Router: Menghubungkan jaringan lokal ke jaringan eksternal/internet dengan pemilihan jalur tercepat.',
            'Modem: Mengubah sinyal modulasi analog dari penyedia ISP menjadi sinyal digital komputer.'
          ],
          iconName: 'HardDrive'
        }
      ],
      comparisonTable: {
        title: 'Komparasi Topologi Jaringan Populer',
        headers: ['Topologi', 'Kelebihan Utama', 'Kelemahan', 'Penggunaan Ideal'],
        rows: [
          ['Star (Bintang)', 'Jika 1 kabel putus, komputer lain tidak terganggu; mudah dikelola', 'Jika switch pusat rusak, seluruh jaringan lumpuh', 'Lab Komputer SMPN 5 Kroya, kantor'],
          ['Bus', 'Hemat kabel dan biaya instalasi murah', 'Satu kabel utama putus, seluruh jaringan mati; rawan tabrakan data', 'Jaringan skala kecil zaman dulu'],
          ['Ring (Cincin)', 'Aliran data terarah satu arah', 'Kerusakan pada satu komputer melumpuhkan seluruh cincin', 'Jaringan backbone token-ring'],
          ['Mesh (Jala)', 'Sangat toleran terhadap kerusakan jalur karena punya rute cadangan', 'Sangat boros kabel dan biaya instalasi sangat mahal', 'Pusat data militer, server cloud inti']
        ]
      },
      dailyLifeExamples: [
        'Menghubungkan smartphone ke Wi-Fi rumah untuk streaming video YouTube di Smart TV.',
        'Mengirim foto antar-smartphone tanpa internet menggunakan koneksi Bluetooth atau Wi-Fi Direct.'
      ],
      schoolExamples: [
        'Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) di lab komputer yang tersambung ke server sekolah melalui kabel LAN.'
      ],
      tahukahKamu: 'Lebih dari 95% lalu lintas data internet internasional antar benua dihantarkan melalui kabel serat optik raksasa yang dibentangkan di dasar samudra laut dalam, bukan lewat satelit angkasa!',
      faktaMenarik: 'Sistem pengalamatan IPv4 memiliki kombinasi sekitar 4,3 miliar alamat unik. Karena jumlah perangkat pintar di dunia sudah melampaui angka tersebut, kini dunia mulai beralih ke IPv6 yang mampu menampung miliaran triliun alamat unik!',
      infoPenting: 'Hindari menekuk kabel UTP secara tajam (patah sudut) karena dapat merusak kawat tembaga halus di dalamnya dan menyebabkan gangguan transmisi data.',
      commonMistakes: [
        'Mengira Wi-Fi dan Internet adalah hal yang persis sama (Wi-Fi adalah media transmisi nirkabel lokal, Internet adalah jaringan global yang dialirkan melaluinya).',
        'Mengira Switch dan Hub bekerja persis sama (Switch cerdas hanya mengirim data ke alamat tujuan, sedangkan Hub menyiarkan/broadcast ke semua port).'
      ],
      summary: [
        'LAN menjangkau area lokal, WAN menjangkau dunia (Internet).',
        'Topologi Star paling banyak digunakan karena keandalannya.',
        'Router menghubungkan antarjaringan, switch menghubungkan antarperangkat lokal.'
      ],
      formativeCheck: [
        {
          question: 'Jika salah satu komputer di Lab tiba-tiba tidak bisa tersambung ke jaringan padahal komputer sebelahnya lancar, topologi apakah yang kemungkinan besar digunakan di lab tersebut?',
          options: ['Topologi Star', 'Topologi Bus', 'Topologi Ring', 'Topologi Tunggal'],
          answerIndex: 0,
          explanation: 'Benar! Pada topologi Star, gangguan pada satu kabel client tidak mengganggu komunikasi client lainnya.'
        }
      ]
    },
    simulasi: {
      type: 'network-connector',
      title: 'Lab Interaktif: Simulator Topologi Star Lab Komputer',
      scenario: 'Hubungkan 3 Komputer Client dan 1 Printer Jaringan ke Switch Pusat, lalu uji transmisi paket data!',
      instructions: 'Aktifkan kabel koneksi untuk setiap perangkat client ke switch untuk melihat status koneksi LAN aktif.',
      data: {
        devices: [
          { id: 'pc-1', name: 'PC Siswa 01', ip: '192.168.1.10', status: 'connected' },
          { id: 'pc-2', name: 'PC Siswa 02', ip: '192.168.1.11', status: 'connected' },
          { id: 'pc-3', name: 'PC Siswa 03', ip: '192.168.1.12', status: 'connected' },
          { id: 'pr-1', name: 'Printer Bersama Lab', ip: '192.168.1.20', status: 'connected' }
        ],
        switchIp: '192.168.1.1'
      }
    },
    miniGame: {
      type: 'speed-match',
      title: 'Kuis Kilat Jaringan Komputer',
      description: 'Cocokkan singkatan istilah jaringan dengan kepanjangannya yang tepat!',
      questions: [
        {
          id: 1,
          question: 'Kepanjangan dari LAN adalah...',
          options: ['Local Area Network', 'Large Access Node', 'Logical Audio Network', 'Line Area Network'],
          correctIndex: 0,
          clue: 'Jaringan wilayah lokal.'
        },
        {
          id: 2,
          question: 'Kepanjangan dari IP dalam istilah IP Address adalah...',
          options: ['Internet Protocol', 'Internal Processor', 'Information Provider', 'Input Port'],
          correctIndex: 0,
          clue: 'Protokol dasar komunikasi internet.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Jaringan internet yang kita nikmati saat ini merupakan contoh nyata dari jaringan berskala...',
        options: [
          { label: 'A', text: 'Wide Area Network (WAN)' },
          { label: 'B', text: 'Local Area Network (LAN)' },
          { label: 'C', text: 'Personal Area Network (PAN)' },
          { label: 'D', text: 'Campus Area Network (CAN)' }
        ],
        correctAnswer: 'A',
        explanation: 'Internet adalah jaringan WAN terbesar yang mencakup seluruh belahan dunia.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Kelebihan utama topologi Star dibandingkan topologi Bus adalah...',
        options: [
          { label: 'A', text: 'Jika satu kabel komputer client terputus, jaringan komputer lain tidak akan terganggu' },
          { label: 'B', text: 'Tidak memerlukan kabel sama sekali' },
          { label: 'C', text: 'Harganya selalu gratis' },
          { label: 'D', text: 'Kecepatan internet otomatis naik 100 kali lipat' }
        ],
        correctAnswer: 'A',
        explanation: 'Keterpisahan kabel tiap node ke switch pusat mencegah kegagalan massal.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 3,
        question: 'Perangkat jaringan yang berfungsi membagi koneksi kabel menjadi gelombang sinyal nirkabel (wireless) di ruangan adalah...',
        options: [
          { label: 'A', text: 'Wireless Access Point (WAP)' },
          { label: 'B', text: 'Monitor CRT' },
          { label: 'C', text: 'Hard Disk Eksternal' },
          { label: 'D', text: 'Sound Card' }
        ],
        correctAnswer: 'A',
        explanation: 'Access Point memancarkan sinyal Wi-Fi untuk koneksi perangkat nirkabel.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 4,
        question: 'Format penulisan alamat IPv4 yang valid adalah...',
        options: [
          { label: 'A', text: '192.168.1.100' },
          { label: 'B', text: '999.888.777.666' },
          { label: 'C', text: 'www.smpn5kroya.sch.id' },
          { label: 'D', text: 'user@gmail.com' }
        ],
        correctAnswer: 'A',
        explanation: 'IPv4 terdiri dari 4 oktet angka dari 0 sampai 255 yang dipisahkan titik.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Apa fungsi utama perintah "ping" (Packet Internet Gopher) pada antarmuka Command Prompt (CMD)?',
        options: [
          { label: 'A', text: 'Menguji apakah ada koneksi aktif antara komputermu dengan alamat host tujuan serta mengukur waktu responsnya' },
          { label: 'B', text: 'Membuat suara dering alarm' },
          { label: 'C', text: 'Mengunduh film dengan resolusi tinggi' },
          { label: 'D', text: 'Menghapus virus di hard disk' }
        ],
        correctAnswer: 'A',
        explanation: 'Perintah ping mengirimkan paket ICMP echo request untuk mengecek konektivitas dan latensi.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Media transmisi data yang menggunakan serat kaca sangat tipis dan mentransmisikan data dalam bentuk pulsa cahaya adalah...',
        options: [
          { label: 'A', text: 'Fiber Optic (Serat Optik)' },
          { label: 'B', text: 'Kabel UTP' },
          { label: 'C', text: 'Kabel Coaxial' },
          { label: 'D', text: 'Kabel Tembaga Telkom' }
        ],
        correctAnswer: 'A',
        explanation: 'Fiber Optic mentransmisikan data berkecepatan tinggi menggunakan pulsa cahaya melalui serat kaca silika.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Dalam sebuah jaringan sekolah, mengapa printer bersama (Shared Printer) menghemat anggaran sekolah?',
        options: [
          { label: 'A', text: 'Karena satu mesin printer dapat digunakan bersama oleh seluruh komputer di lab tanpa harus membeli 30 printer' },
          { label: 'B', text: 'Karena printer tidak memerlukan tinta' },
          { label: 'C', text: 'Karena kertasnya bisa dipakai berulang kali' },
          { label: 'D', text: 'Karena listriknya gratis' }
        ],
        correctAnswer: 'A',
        explanation: 'Resource sharing adalah salah satu keunggulan ekonomis terbesar jaringan komputer.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Konektor standar yang dipasang di ujung kabel UTP untuk ditancapkan ke port Ethernet komputer adalah...',
        options: [
          { label: 'A', text: 'RJ-45' },
          { label: 'B', text: 'RJ-11' },
          { label: 'C', text: 'USB Type-C' },
          { label: 'D', text: 'HDMI' }
        ],
        correctAnswer: 'A',
        explanation: 'RJ-45 (Registered Jack 45) adalah konektor 8-pin standar kabel Ethernet LAN.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 9,
        question: 'Ketika kamu mengetikkan "google.com" di browser, sistem yang bertugas menerjemahkan nama domain tersebut menjadi alamat IP numerik server adalah...',
        options: [
          { label: 'A', text: 'Domain Name System (DNS)' },
          { label: 'B', text: 'Hard Disk Drive' },
          { label: 'C', text: 'Mouse Driver' },
          { label: 'D', text: 'Bluetooth Adapter' }
        ],
        correctAnswer: 'A',
        explanation: 'DNS berfungsi seperti buku telepon internet yang memetakan nama domain ke IP Address server.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Apa yang dimaksud dengan "Bandwidth" dalam koneksi jaringan internet?',
        options: [
          { label: 'A', text: 'Kapasitas maksimum volume transfer data yang dapat dilewatkan melalui koneksi jaringan dalam satuan waktu (misal Mbps)' },
          { label: 'B', text: 'Panjang kabel jaringan yang diukur dengan meteran' },
          { label: 'C', text: 'Lebar casing komputer lab' },
          { label: 'D', text: 'Jumlah tombol yang ada pada keyboard' }
        ],
        correctAnswer: 'A',
        explanation: 'Bandwidth mengukur kapasitas lebar pita lalu lintas data per detik (Megabit per second).',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Jaringan yang menghubungkan beberapa kantor cabang bank di satu wilayah kota disebut...',
        options: [
          { label: 'A', text: 'MAN (Metropolitan Area Network)' },
          { label: 'B', text: 'LAN' },
          { label: 'C', text: 'PAN' },
          { label: 'D', text: 'SAN' }
        ],
        correctAnswer: 'A',
        explanation: 'MAN melayani jangkauan antargaris dalam satu kota.',
        points: 10
      },
      {
        id: 2,
        question: 'Pada topologi Bus, perangkat di kedua ujung kabel utama yang berfungsi menyerap sinyal pantulan adalah...',
        options: [
          { label: 'A', text: 'Terminator' },
          { label: 'B', text: 'Router' },
          { label: 'C', text: 'Proyektor' },
          { label: 'D', text: 'Scanner' }
        ],
        correctAnswer: 'A',
        explanation: 'Terminator mencegah tabrakan sinyal pantul di ujung bus.',
        points: 10
      },
      {
        id: 3,
        question: 'Perangkat konsentrator yang memiliki kemampuan meneruskan data secara selektif hanya ke port tujuan berdasarkan MAC Address adalah...',
        options: [
          { label: 'A', text: 'Switch' },
          { label: 'B', text: 'Hub Pasif' },
          { label: 'C', text: 'Kabel Listrik' },
          { label: 'D', text: 'Monitor' }
        ],
        correctAnswer: 'A',
        explanation: 'Switch bekerja di layer Data Link membaca tabel MAC address.',
        points: 10
      },
      {
        id: 4,
        question: 'Berapa jumlah oktet angka pada alamat IPv4 standar?',
        options: [
          { label: 'A', text: '4 oktet (total 32 bit)' },
          { label: 'B', text: '8 oktet' },
          { label: 'C', text: '2 oktet' },
          { label: 'D', text: '16 oktet' }
        ],
        correctAnswer: 'A',
        explanation: 'IPv4 terdiri dari 4 bagian oktet 8-bit (total 32 bit).',
        points: 10
      },
      {
        id: 5,
        question: 'Protokol aman yang digunakan untuk mengakses situs web perbankan dan transaksi digital dengan enkripsi SSL/TLS adalah...',
        options: [
          { label: 'A', text: 'HTTPS' },
          { label: 'B', text: 'HTTP biasa' },
          { label: 'C', text: 'FTP' },
          { label: 'D', text: 'Telnet' }
        ],
        correctAnswer: 'A',
        explanation: 'HTTPS (Hypertext Transfer Protocol Secure) mengenkripsi lalu lintas web.',
        points: 10
      },
      {
        id: 6,
        question: 'Jaringan nirkabel pribadi jarak dekat (Personal Area Network) yang biasa menghubungkan earphone TWS ke smartphone menggunakan teknologi...',
        options: [
          { label: 'A', text: 'Bluetooth' },
          { label: 'B', text: 'Kabel Fiber Optik' },
          { label: 'C', text: 'Satelit Geostasioner' },
          { label: 'D', text: 'Kabel Koaksial' }
        ],
        correctAnswer: 'A',
        explanation: 'Bluetooth adalah standar komunikasi nirkabel jarak pendek WPAN.',
        points: 10
      },
      {
        id: 7,
        question: 'Apa kepanjangan dari ISP?',
        options: [
          { label: 'A', text: 'Internet Service Provider' },
          { label: 'B', text: 'Internal System Program' },
          { label: 'C', text: 'International School Protocol' },
          { label: 'D', text: 'Input Serial Port' }
        ],
        correctAnswer: 'A',
        explanation: 'ISP adalah perusahaan penyedia jasa layanan koneksi internet.',
        points: 10
      },
      {
        id: 8,
        question: 'Jika kamu melakukan download file sebesar 100 MegaByte dengan kecepatan rata-rata 10 MegaByte per detik, waktu yang dibutuhkan adalah...',
        options: [
          { label: 'A', text: '10 detik' },
          { label: 'B', text: '100 detik' },
          { label: 'C', text: '1 menit' },
          { label: 'D', text: '1000 detik' }
        ],
        correctAnswer: 'A',
        explanation: '100 MB / 10 MBps = 10 detik.',
        points: 10
      },
      {
        id: 9,
        question: 'Alamat fisik unik 12 digit heksadesimal yang tertanam permanen pada kartu jaringan (NIC) perangkat sejak dari pabrik disebut...',
        options: [
          { label: 'A', text: 'MAC Address (Media Access Control)' },
          { label: 'B', text: 'Nomor WhatsApp' },
          { label: 'C', text: 'Nomor Kartu Keluarga' },
          { label: 'D', text: 'Nama Wi-Fi SSID' }
        ],
        correctAnswer: 'A',
        explanation: 'MAC Address adalah identifier fisik kartu jaringan.',
        points: 10
      },
      {
        id: 10,
        question: 'Tindakan mengamankan hotspot Wi-Fi rumah agar tidak sembarangan dibobol orang asing adalah dengan...',
        options: [
          { label: 'A', text: 'Mengaktifkan enkripsi keamanan WPA2/WPA3 Personal dengan kata sandi kuat' },
          { label: 'B', text: 'Membiarkan jaringan terbuka tanpa kata sandi' },
          { label: 'C', text: 'Menempelkan password Wi-Fi di tiang listrik depan rumah' },
          { label: 'D', text: 'Mematikan layar HP' }
        ],
        correctAnswer: 'A',
        explanation: 'Protokol WPA2/WPA3 mengamankan pertukaran kunci nirkabel dari penyadapan.',
        points: 10
      }
    ]
  },

  // ==========================================
  // KELAS 9 - INFORMATIKA
  // ==========================================
  {
    id: 'k9-pemrograman',
    grade: 9,
    title: 'Dasar Pemrograman',
    category: 'Algoritma dan Pemrograman (AP)',
    shortDesc: 'Memahami logika kreasi solusi tertulis, instruksi prosedural, pemrograman visual (Scratch/Blockly), dan penulisan pseudocode.',
    learningObjectives: [
      'Menuliskan instruksi prosedural yang runtut untuk menyelesaikan persoalan komputasi.',
      'Memahami konsep variabel, percabangan (IF-THEN-ELSE), dan perulangan (LOOP).',
      'Merancang visual programming menggunakan susunan blok logika interaktif.',
      'Menerjemahkan ide solusi ke dalam notasi pseudocode dan diagram alir (flowchart).'
    ],
    apersepsi: {
      imagePromptDesc: 'Karakter sprite kucing robot edukasi melompati rintangan dipandu susunan blok visual coding berwarna-warni.',
      videoTitle: 'Bagaimana Game Minecraft Dibuat dari Baris-Baris Kode Instruksi Logika?',
      videoDuration: '05:00',
      videoThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      videoDescription: 'Menjelajahi rahasia di balik game populer: bagaimana logika perulangan dan kondisi menentukan pergerakan karakter dan kecerdasan musuh.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=nKIu9yen5nc',
      realLifeStory: 'Bayangkan kamu memiliki sebuah robot pelayan di lab komputer SMPN 5 Kroya. Robot ini sangat patuh tetapi tidak memiliki akal sehat sendiri. Jika kamu berkata "Tolong ambilkan buku di meja", robot akan diam karena tidak tahu meja yang mana, cara berjalan menghindari kursi, dan kapan harus berhenti. Bagaimana cara menuliskan rangkaian instruksi mikro yang sangat terperinci agar robot dapat bergerak tepat sasaran?',
      triggerQuestions: [
        'Mengapa komputer tidak bisa "mengira-ngira" seperti manusia ketika membaca perintah?',
        'Kapan kita perlu menggunakan instruksi pengulangan (loop) daripada menulis perintah yang sama 100 kali?',
        'Apa bedanya logika "JIKA lapar MAKA makan" dengan "ULANGI lari SAMPAI 5 putaran"?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Wadah dalam program komputer yang digunakan untuk menyimpan nilai data yang dapat berubah selama eksekusi program disebut...',
        options: [
          { label: 'A', text: 'Variabel' },
          { label: 'B', text: 'Konstanta mati' },
          { label: 'C', text: 'Monitor' },
          { label: 'D', text: 'Keyboard' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Variabel',
        recommendation: 'Pelajari konsep variabel sebagai kotak penyimpan data dinamis dalam pemrograman.'
      },
      {
        id: 2,
        question: 'Struktur logika dalam pemrograman yang digunakan untuk mengambil keputusan berdasarkan suatu kondisi tertentu adalah...',
        options: [
          { label: 'A', text: 'Percabangan (IF - THEN - ELSE)' },
          { label: 'B', text: 'Perulangan tak hingga' },
          { label: 'C', text: 'Komentar kode' },
          { label: 'D', text: 'Header file' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Percabangan',
        recommendation: 'Kenali struktur kontrol IF-ELSE untuk percabangan alur logika program.'
      },
      {
        id: 3,
        question: 'Instruksi yang memerintahkan komputer untuk mengeksekusi suatu blok perintah berkali-kali hingga syarat tertentu terpenuhi disebut...',
        options: [
          { label: 'A', text: 'Perulangan (Looping / Iterasi)' },
          { label: 'B', text: 'Shutdown' },
          { label: 'C', text: 'Formatting' },
          { label: 'D', text: 'Abstraksi' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Perulangan (Loop)',
        recommendation: 'Pahami efisiensi perulangan (FOR / WHILE) untuk pekerjaan repetitif.'
      },
      {
        id: 4,
        question: 'Deskripsi informal langkah-langkah algoritma pemrograman tingkat tinggi yang ditulis menyerupai bahasa manusia agar mudah dibaca disebut...',
        options: [
          { label: 'A', text: 'Pseudocode' },
          { label: 'B', text: 'Kode Biner 0 dan 1' },
          { label: 'C', text: 'Bahasa Mesin Mikro' },
          { label: 'D', text: 'Sinyal Listrik' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Pseudocode',
        recommendation: 'Pelajari cara menulis pseudocode yang rapi dan mudah dipahami.'
      },
      {
        id: 5,
        question: 'Lingkungan pemrograman visual berbasis blok yang sangat populer bagi siswa SMP untuk membuat animasi dan game interaktif adalah...',
        options: [
          { label: 'A', text: 'Scratch / Blockly' },
          { label: 'B', text: 'Notepad biasa' },
          { label: 'C', text: 'Kalkulator Windows' },
          { label: 'D', text: 'Paint' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Visual Programming',
        recommendation: 'Kenali antarmuka pemrograman visual blok seperti Scratch karya MIT.'
      }
    ],
    materi: {
      overview: 'Pemrograman adalah proses merancang, menulis, menguji, dan memelihara instruksi-instruksi (kode) yang dimengerti oleh komputer. Sebelum diketik ke bahasa pemrograman asli seperti Python atau disusun menjadi blok Scratch, algoritma dirancang menggunakan Pseudocode (Judul, Deklarasi, Implementasi) dan Diagram Alir (Flowchart).',
      keyConcepts: [
        {
          title: '1. Struktur Penulisan Pseudocode & Perhitungan Sekuensial',
          explanation: 'Pseudocode ditulis dalam 3 bagian terstruktur: Judul (nama program tanpa spasi), Deklarasi (daftar variabel & tipe data), serta Implementasi (langkah algoritma berurutan).',
          bulletPoints: [
            'Judul: Program Hitung_Luas_Segitiga',
            'Deklarasi: var alas, tinggi, luas : float;',
            'Implementasi Sekuensial: INPUT (alas) -> INPUT (tinggi) -> luas = 0.5 * alas * tinggi -> PRINT (luas).'
          ],
          iconName: 'FileText'
        },
        {
          title: '2. Struktur Pengkondisian (IF - THEN - ELSE - ENDIF)',
          explanation: 'Digunakan ketika program harus memilih satu tindakan berdasarkan suatu syarat kondisi bernilai Benar (True) atau Salah (False).',
          bulletPoints: [
            'Kasus Buku (Program Cek_Syarat_KTP): Deklarasi var usia : integer; dan INPUT (usia).',
            'IF usia >= 17 THEN PRINT ("Wajib memiliki KTP") ELSE PRINT ("Belum wajib memiliki KTP") ENDIF.',
            'Dalam Python ditulis menggunakan blok if usia >= 17: dan else: dengan indentasi.'
          ],
          iconName: 'GitBranch'
        },
        {
          title: '3. Struktur Perulangan / Looping (FOR - TO - DO - ENDFOR)',
          explanation: 'Digunakan untuk menjalankan perintah berulang kali secara otomatis tanpa mengetik baris yang sama berkali-kali.',
          bulletPoints: [
            'Kasus Buku (Program Perulangan_Teks): Deklarasi var i : integer;',
            'FOR i = 1 TO 10 DO -> PRINT ("Saya belajar Informatika") -> ENDFOR.',
            'Variabel penghitung i berjalan otomatis dari 1 hingga 10 (dalam Python: for i in range(1, 11):).'
          ],
          iconName: 'Repeat'
        },
        {
          title: '4. Pemrograman Unplugged (Robot Manusia) & Visual (Scratch Si Kucing)',
          explanation: 'Penerapan pseudocode melalui simulasi fisik tanpa komputer (Unplugged) maupun blok visual Scratch.',
          bulletPoints: [
            'Proyek Mini Robot Manusia (Program Ambil_Buku_Meja): Peran Programmer, Robot, dan Analyst (teriak "BUG!" & Debugging) dengan kosa kata MAJU(n), HADAP_KIRI, HADAP_KANAN, AMBIL(Buku), SIMPAN.',
            'Proyek Mini Scratch (Program Petualangan_Sprite): Sprite Si Kucing berjalan 10 langkah mengambil energi dan berbalik 180 derajat sebanyak 3 kali menggunakan perulangan bersarang (FOR i = 1 TO 3 DO dan REPEAT 10 TIMES).'
          ],
          iconName: 'Terminal'
        }
      ],
      comparisonTable: {
        title: 'Transformasi Algoritma: Pseudocode Buku vs Flowchart vs Bahasa Python Asli',
        headers: ['Struktur Logika', 'Notasi Pseudocode (Buku)', 'Simbol Flowchart', 'Bahasa Pemrograman Python'],
        rows: [
          ['Deklarasi Variabel', 'var alas, tinggi, luas : float;', 'Segi Enam (Preparation)', 'alas, tinggi, luas = 0.0, 0.0, 0.0'],
          ['Input & Output', 'INPUT (alas) / PRINT (luas)', 'Jajar Genjang (Input/Output)', 'alas = float(input()) / print(luas)'],
          ['Proses Sekuensial', 'luas = 0.5 * alas * tinggi', 'Persegi Panjang (Process)', 'luas = 0.5 * alas * tinggi'],
          ['Pengkondisian (IF)', 'IF usia >= 17 THEN ... ELSE ... ENDIF', 'Belah Ketupat (Decision)', 'if usia >= 17:\\n    print(...)\\nelse:\\n    print(...)'],
          ['Perulangan (LOOP)', 'FOR i = 1 TO 10 DO ... ENDFOR', 'Belah Ketupat + Panah Balik', 'for i in range(1, 11):\\n    print("Saya belajar Informatika")']
        ]
      },
      dailyLifeExamples: [
        'Lampu lalu lintas otomatis: JIKA waktu = 60 detik MAKA ubah lampu hijau menjadi kuning lalu merah (Kombinasi Looping dan Percabangan).',
        'Mesin ATM: JIKA PIN benar MAKA izinkan tarik tunai, JIKA salah 3 kali MAKA blokir kartu.'
      ],
      schoolExamples: [
        'Membuat aplikasi kuis matematika interaktif di kelas 9 yang menghitung skor otomatis setiap siswa menjawab benar.'
      ],
      tahukahKamu: 'Bahasa pemrograman pertama di dunia diciptakan oleh seorang ilmuwan perempuan bernama Ada Lovelace pada tahun 1843 untuk mesin mekanik Analytical Engine karya Charles Babbage!',
      faktaMenarik: 'Istilah "Bug" (kesalahan kode) berawal dari peristiwa nyata tahun 1947 ketika ilmuwan Grace Hopper menemukan seekor ngengat (serangga/bug) yang tersangkut di dalam relai tabung komputer Harvard Mark II!',
      infoPenting: 'Dalam pemrograman, tanda sama dengan tunggal (=) umumnya berarti "memasukkan nilai ke dalam variabel" (assignment), sedangkan perbandingan kesamaan nilai menggunakan tanda sama dengan ganda (==).',
      commonMistakes: [
        'Terjebak dalam perulangan tanpa henti (Infinite Loop) karena lupa menambahkan perintah yang mengubah kondisi pemberhenti.',
        'Mengabaikan tahapan perencanaan solusi di kertas/pseudocode sebelum langsung mengetik kode program.'
      ],
      summary: [
        'Variabel menampung nilai yang berubah.',
        'Percabangan (IF) mengambil keputusan kondisi.',
        'Perulangan (Loop) mengotomatisasi pekerjaan berulang secara efisien.'
      ],
      formativeCheck: [
        {
          question: 'Jika variabel "nyawa" bernilai 3, lalu dieksekusi instruksi: "nyawa = nyawa - 1", berapakah nilai akhir variabel nyawa?',
          options: ['2', '3', '1', '0'],
          answerIndex: 0,
          explanation: 'Tepat! 3 - 1 = 2. Nilai variabel baru menggantikan nilai sebelumnya di memori.'
        }
      ]
    },
    simulasi: {
      type: 'code-builder',
      title: 'Lab Interaktif: Menyusun Logika Algoritma Game',
      scenario: 'Susun urutan pseudocode berikut agar karakter robot berhasil mengambil bintang dan finish!',
      instructions: 'Urutkan 4 instruksi prosedural di bawah ini ke urutan yang logis dan benar.',
      data: {
        steps: [
          { id: 'cd-1', code: 'MULAI program dan inisialisasi skor = 0', order: 1 },
          { id: 'cd-2', code: 'MAJU 3 langkah ke arah depan', order: 2 },
          { id: 'cd-3', code: 'JIKA menyentuh Bintang MAKA tambah skor = skor + 50', order: 3 },
          { id: 'cd-4', code: 'TAMPILKAN "Selamat Misi Berhasil!" dan SELESAI', order: 4 }
        ]
      }
    },
    miniGame: {
      type: 'code-challenge',
      title: 'Tantangan Logika Coding Kilat',
      description: 'Pecahkan teka-teki logika pemrograman berikut!',
      questions: [
        {
          id: 1,
          question: 'Perhatikan pseudocode berikut:\nx = 5\ny = 3\nx = x + y\nBerapakah nilai akhir x?',
          options: ['8', '5', '3', '15'],
          correctIndex: 0,
          clue: 'Hitung x = 5 + 3.'
        },
        {
          id: 2,
          question: 'Berapa kali kata "SPENMAKRO" dicetak pada perulangan: UNTUK i = 1 SAMPAI 4 LAKUKAN cetak("SPENMAKRO")?',
          options: ['4 kali', '1 kali', '3 kali', '5 kali'],
          correctIndex: 0,
          clue: 'Iterasi berjalan dari 1, 2, 3, hingga 4.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Tiga struktur dasar algoritma pemrograman yang menjadi fondasi setiap bahasa pemrograman adalah...',
        options: [
          { label: 'A', text: 'Runtunan (Sequence), Pemilihan (Selection/IF), dan Pengulangan (Iteration/Loop)' },
          { label: 'B', text: 'Input, Output, dan Keyboard' },
          { label: 'C', text: 'Hardware, Software, dan Brainware' },
          { label: 'D', text: 'Browser, Server, dan Client' }
        ],
        correctAnswer: 'A',
        explanation: 'Tiga pilar algoritma adalah urutan teratur (sequence), seleksi kondisi (selection), dan iterasi (looping).',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Jika kita ingin menampilkan angka 1 sampai 100 di layar tanpa menulis 100 baris perintah cetak, struktur yang paling efisien digunakan adalah...',
        options: [
          { label: 'A', text: 'Perulangan (Loop)' },
          { label: 'B', text: 'Percabangan (IF)' },
          { label: 'C', text: 'Komentar kode' },
          { label: 'D', text: 'Menghapus program' }
        ],
        correctAnswer: 'A',
        explanation: 'Perulangan mengotomatisasi penulisan instruksi berulang dalam 2 baris kode.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 3,
        question: 'Perhatikan kondisi logika berikut:\nJIKA (umur >= 17) MAKA status = "Boleh Buat KTP"\nSELAIN ITU status = "Belum Cukup Umur"\nJika variabel umur diisi angka 15, maka nilai status adalah...',
        options: [
          { label: 'A', text: 'Belum Cukup Umur' },
          { label: 'B', text: 'Boleh Buat KTP' },
          { label: 'C', text: 'Error' },
          { label: 'D', text: 'Kosong' }
        ],
        correctAnswer: 'A',
        explanation: 'Karena 15 tidak memenuhi syarat >= 17, alur program melompat ke blok ELSE (Belum Cukup Umur).',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 4,
        question: 'Dalam penulisan flowchart (diagram alir), simbol berbentuk belah ketupat (diamond) melambangkan...',
        options: [
          { label: 'A', text: 'Titik keputusan / percabangan kondisi (Decision)' },
          { label: 'B', text: 'Titik mulai dan selesai (Terminal)' },
          { label: 'C', text: 'Proses perhitungan aritmetika' },
          { label: 'D', text: 'Input atau output data' }
        ],
        correctAnswer: 'A',
        explanation: 'Belah ketupat adalah simbol Decision yang memiliki dua cabang keluaran (Ya/Tidak).',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 5,
        question: 'Apa akibatnya jika sebuah perulangan WHILE memiliki kondisi yang SELALU bernilai Benar dan tidak pernah menjadi Salah?',
        options: [
          { label: 'A', text: 'Terjadi Infinite Loop (perulangan abadi tak berujung) yang dapat membekukan program' },
          { label: 'B', text: 'Program akan langsung selesai dalam 1 detik' },
          { label: 'C', text: 'Komputer otomatis memutar musik' },
          { label: 'D', text: 'Hasil perhitungan menjadi 0' }
        ],
        correctAnswer: 'A',
        explanation: 'Infinite loop terjadi saat kondisi pemberhenti (terminating condition) tidak pernah tercapai.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 6,
        question: 'Proses mencari dan memperbaiki kesalahan atau kesalahan logika dalam kode program disebut...',
        options: [
          { label: 'A', text: 'Debugging' },
          { label: 'B', text: 'Formatting' },
          { label: 'C', text: 'Copying' },
          { label: 'D', text: 'Typing' }
        ],
        correctAnswer: 'A',
        explanation: 'Debugging adalah proses melacak bug dan memperbaikinya.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Perhatikan potongan kode pseudocode ini:\ntotal = 0\nUNTUK i = 1 SAMPAI 3 LAKUKAN:\n    total = total + i\nBerapakah nilai akhir total?',
        options: [
          { label: 'A', text: '6' },
          { label: 'B', text: '3' },
          { label: 'C', text: '9' },
          { label: 'D', text: '0' }
        ],
        correctAnswer: 'A',
        explanation: 'Iterasi 1: total = 0 + 1 = 1; Iterasi 2: total = 1 + 2 = 3; Iterasi 3: total = 3 + 3 = 6.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Mengapa gaya pemrograman visual (Visual Programming) sangat efektif diajarkan kepada pemula?',
        options: [
          { label: 'A', text: 'Karena menghilangkan kendala frustrasi akibat salah ketik tanda titik koma (syntax error) dan berfokus pada logika murni' },
          { label: 'B', text: 'Karena tidak membutuhkan pemikiran sama sekali' },
          { label: 'C', text: 'Karena otomatis menjadi hacker profesional' },
          { label: 'D', text: 'Karena hanya bisa dibuka di televisi' }
        ],
        correctAnswer: 'A',
        explanation: 'Blok visual melatih konstruksi berpikir logis tanpa terhambat kesalahan pengetikan sintaks.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 9,
        question: 'Fungsi dari baris "Komentar" (Comment) dalam kode program adalah...',
        options: [
          { label: 'A', text: 'Memberikan catatan penjelasan bagi pembaca program dan diabaikan oleh komputer saat dieksekusi' },
          { label: 'B', text: 'Mempercepat jalannya program 10 kali lipat' },
          { label: 'C', text: 'Menghapus variabel otomatis' },
          { label: 'D', text: 'Mengunci layar laptop' }
        ],
        correctAnswer: 'A',
        explanation: 'Komentar kode dokumentasi tidak dieksekusi oleh mesin compiler/interpreter.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 10,
        question: 'Jika kamu diminta membuat algoritma verifikasi kata sandi di aplikasi sekolah, langkah yang paling aman adalah...',
        options: [
          { label: 'A', text: 'Membatasi percobaan salah maksimal 3 atau 5 kali sebelum akun terkunci sementara' },
          { label: 'B', text: 'Mengizinkan percobaan salah 1 juta kali tanpa batas' },
          { label: 'C', text: 'Menampilkan kata sandi langsung di layar terbuka' },
          { label: 'D', text: 'Menghapus akun seketika pada kesalahan pertama' }
        ],
        correctAnswer: 'A',
        explanation: 'Rate limiting dan penguncian sementara mencegah serangan pembobolan tebak kata sandi (brute force attack).',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Operasi assignment a = 10 berarti...',
        options: [
          { label: 'A', text: 'Menyimpan nilai angka 10 ke dalam variabel bernama a' },
          { label: 'B', text: 'Memeriksa apakah a sama dengan 10' },
          { label: 'C', text: 'Menghapus variabel a' },
          { label: 'D', text: 'Menutup program' }
        ],
        correctAnswer: 'A',
        explanation: 'Tanda sama dengan tunggal menyimpan nilai ke dalam variabel.',
        points: 10
      },
      {
        id: 2,
        question: 'Perintah IF selalu membutuhkan ekspresi yang menghasilkan nilai...',
        options: [
          { label: 'A', text: 'Boolean (True atau False)' },
          { label: 'B', text: 'Angka desimal' },
          { label: 'C', text: 'Huruf vokal' },
          { label: 'D', text: 'Gambar JPEG' }
        ],
        correctAnswer: 'A',
        explanation: 'Kondisi percabangan dievaluasi menjadi Benar atau Salah.',
        points: 10
      },
      {
        id: 3,
        question: 'Struktur perulangan yang memeriksa kondisi di awal sebelum menjalankan instruksi adalah perulangan...',
        options: [
          { label: 'A', text: 'WHILE' },
          { label: 'B', text: 'DO-WHILE' },
          { label: 'C', text: 'IF-ELSE' },
          { label: 'D', text: 'SWITCH-CASE' }
        ],
        correctAnswer: 'A',
        explanation: 'While loop mengevaluasi syarat di awal.',
        points: 10
      },
      {
        id: 4,
        question: 'Pada Scratch, blok berwarna oranye yang memuat perintah "repeat 10" dan "if then" termasuk dalam kelompok...',
        options: [
          { label: 'A', text: 'Control' },
          { label: 'B', text: 'Motion' },
          { label: 'C', text: 'Looks' },
          { label: 'D', text: 'Sound' }
        ],
        correctAnswer: 'A',
        explanation: 'Kategori Control berisi kendali alur eksekusi.',
        points: 10
      },
      {
        id: 5,
        question: 'Perhatikan pseudocode:\npanjang = 10\nlebar = 5\nluas = panjang * lebar\nNilai luas adalah...',
        options: [
          { label: 'A', text: '50' },
          { label: 'B', text: '15' },
          { label: 'C', text: '25' },
          { label: 'D', text: '105' }
        ],
        correctAnswer: 'A',
        explanation: '10 * 5 = 50.',
        points: 10
      },
      {
        id: 6,
        question: 'Sebuah sub-program mandiri yang menerima masukan, memprosesnya, dan dapat mengembalikan suatu nilai hasil disebut...',
        options: [
          { label: 'A', text: 'Fungsi (Function / Prosedur)' },
          { label: 'B', text: 'Kabel data' },
          { label: 'C', text: 'Sirkuit listrik' },
          { label: 'D', text: 'Layar monitor' }
        ],
        correctAnswer: 'A',
        explanation: 'Fungsi memfasilitasi modularitas dan penggunaan ulang kode.',
        points: 10
      },
      {
        id: 7,
        question: 'Manakah nama variabel berikut yang valid dan mematuhi konvensi penamaan standar?',
        options: [
          { label: 'A', text: 'totalNilaiSiswa' },
          { label: 'B', text: '123nama' },
          { label: 'C', text: 'total nilai siswa' },
          { label: 'D', text: 'skor#akhir' }
        ],
        correctAnswer: 'A',
        explanation: 'Format variabel totalNilaiSiswa menggunakan aturan camelCase yang valid tanpa spasi atau karakter terlarang.',
        points: 10
      },
      {
        id: 8,
        question: 'Penerjemah kode program yang menerjemahkan seluruh baris kode sumber secara utuh menjadi file biner siap eksekusi (.exe) disebut...',
        options: [
          { label: 'A', text: 'Compiler' },
          { label: 'B', text: 'Interpreter' },
          { label: 'C', text: 'Text Editor' },
          { label: 'D', text: 'Browser' }
        ],
        correctAnswer: 'A',
        explanation: 'Compiler mengompilasi kode program menjadi file biner mandiri.',
        points: 10
      },
      {
        id: 9,
        question: 'Operator logika yang menghasilkan nilai TRUE hanya jika KEDUA syarat bernilai TRUE adalah operator...',
        options: [
          { label: 'A', text: 'AND' },
          { label: 'B', text: 'OR' },
          { label: 'C', text: 'NOT' },
          { label: 'D', text: 'XOR' }
        ],
        correctAnswer: 'A',
        explanation: 'Operator AND mensyaratkan kedua operand bernilai benar.',
        points: 10
      },
      {
        id: 10,
        question: 'Tujuan utama mempelajari dasar pemrograman bagi siswa SMP adalah...',
        options: [
          { label: 'A', text: 'Mengembangkan logika pemecahan masalah sistematis dan daya kreasi cipta inovasi digital' },
          { label: 'B', text: 'Menghabiskan waktu bermain game seharian' },
          { label: 'C', text: 'Membongkar komputer sampai rusak' },
          { label: 'D', text: 'Menghafal rumus yang tidak dipahami' }
        ],
        correctAnswer: 'A',
        explanation: 'Pemrograman melatih penalaran analitis, persistensi, dan kreasi solusi digital.',
        points: 10
      }
    ]
  },

  // 5. KELAS 9 - Keamanan Digital
  {
    id: 'k9-keamanan-digital',
    grade: 9,
    title: 'Keamanan Digital',
    category: 'Keamanan Informasi & Privasi',
    shortDesc: 'Melindungi diri di dunia siber: kata sandi kuat, autentikasi 2FA, pencegahan malware & phishing, serta perlindungan data pribadi.',
    learningObjectives: [
      'Merancang kata sandi yang aman dan menerapkan Autentikasi Dua Faktor (2FA).',
      'Mengidentifikasi jenis-jenis ancaman malware (Virus, Ransomware, Trojan, Spyware).',
      'Membedakan informasi publik dan informasi pribadi rahasia (Privat).',
      'Menerapkan prinsip perlindungan data pribadi sesuai undang-undang dan etika digital.'
    ],
    apersepsi: {
      imagePromptDesc: 'Gembok digital bercahaya dengan perisai keamanan siber melindungi data identitas dan kunci kriptografi.',
      videoTitle: 'Gimana Cara Hacker Ngebajak Komputer? - Kok Bisa?',
      videoDuration: '04:40',
      videoThumbnail: 'https://i.ytimg.com/vi/ah-uZS0dyP8/hqdefault.jpg',
      videoDescription: 'Edukasi keamanan siber: bagaimana peretas mengeksploitasi celah keamanan komputer, kata sandi lemah, dan cara melindungi diri kita.',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=ah-uZS0dyP8',
      realLifeStory: 'Suatu hari, akun media sosial seorang siswa kelas 9 di Kroya tiba-tiba mengirimkan pesan pinjaman uang ke seluruh kontaknya. Siswa tersebut tidak bisa login karena kata sandinya telah diganti oleh orang tak dikenal. Setelah diselidiki, ia pernah login di warung internet dan tidak pernah mengganti kata sandinya yang hanya berupa tanggal lahir "10102010". Mengapa kebiasaan kecil seperti ini bisa berujung pada bencana privasi digital?',
      triggerQuestions: [
        'Mengapa menggunakan tanggal lahir dan nama hewan peliharaan sebagai kata sandi sangat berbahaya?',
        'Apa yang terjadi jika kamu menggunakan kata sandi yang persis sama untuk seluruh akunmu (Instagram, Game, Email Sekolah)?',
        'Informasi apa saja di KTP atau KK keluargamu yang pantang sekali difoto dan diunggah ke internet?'
      ]
    },
    asesmenAwal: [
      {
        id: 1,
        question: 'Manakah dari kata sandi berikut yang paling kuat dan tahan terhadap serangan pembobolan otomatis?',
        options: [
          { label: 'A', text: 'kroya123' },
          { label: 'B', text: '12345678' },
          { label: 'C', text: 'Sp3nm@kr0#2026!Jaya' },
          { label: 'D', text: 'passwordku' }
        ],
        correctAnswer: 'C',
        conceptTag: 'Kekuatan Password',
        recommendation: 'Gunakan kombinasi minimal 12 karakter: huruf besar, kecil, angka, dan simbol unik.'
      },
      {
        id: 2,
        question: 'Fitur keamanan yang meminta kode verifikasi tambahan (misal melalui SMS atau Google Authenticator) setelah memasukkan kata sandi disebut...',
        options: [
          { label: 'A', text: 'Two-Factor Authentication (2FA)' },
          { label: 'B', text: 'Caps Lock' },
          { label: 'C', text: 'Autocorrect' },
          { label: 'D', text: 'Bluetooth Pairing' }
        ],
        correctAnswer: 'A',
        conceptTag: '2FA',
        recommendation: 'Aktifkan 2FA di setiap akun vital agar akun tetap aman meski password bocor.'
      },
      {
        id: 3,
        question: 'Program jahat yang mengunci (mengenkripsi) seluruh file di komputer korban dan meminta tebusan uang untuk membukanya adalah...',
        options: [
          { label: 'A', text: 'Ransomware' },
          { label: 'B', text: 'Antivirus' },
          { label: 'C', text: 'Sistem Operasi' },
          { label: 'D', text: 'Calculator' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Ransomware',
        recommendation: 'Waspadai Ransomware yang sering menyusup melalui file bajakan atau lampiran email mencurigakan.'
      },
      {
        id: 4,
        question: 'Teknik penipuan siber dengan memancing korban agar memasukkan username dan password di situs web palsu yang sangat mirip situs aslinya disebut...',
        options: [
          { label: 'A', text: 'Phishing' },
          { label: 'B', text: 'Surfing' },
          { label: 'C', text: 'Browsing' },
          { label: 'D', text: 'Streaming' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Phishing',
        recommendation: 'Periksa URL bilah alamat secara teliti sebelum login di situs mana pun.'
      },
      {
        id: 5,
        question: 'Data berikut yang tergolong data pribadi yang SANGAT PRIVAT dan tidak boleh disebarluaskan ke ruang publik adalah...',
        options: [
          { label: 'A', text: 'Nomor Kartu Keluarga (KK), NIK, dan Nama Ibu Kandung' },
          { label: 'B', text: 'Nama sekolah tempat belajar' },
          { label: 'C', text: 'Nama kota domisili' },
          { label: 'D', text: 'Judul buku pelajaran favorit' }
        ],
        correctAnswer: 'A',
        conceptTag: 'Data Pribadi Spesifik',
        recommendation: 'Lindungi NIK dan data sensitif dari penyalahgunaan pinjaman online ilegal atau pemalsuan identitas.'
      }
    ],
    materi: {
      overview: 'Keamanan Digital (Cyber Security) adalah upaya melindungi perangkat, jaringan, program, dan data pribadi dari serangan, kerusakan, atau akses tidak sah dari pihak luar yang berniat jahat.',
      keyConcepts: [
        {
          title: '1. Manajemen Kata Sandi dan Autentikasi Ganda (2FA)',
          explanation: 'Garis pertahanan pertama akun digitalmu.',
          bulletPoints: [
            'Panjang minimal 12 karakter kombinasi huruf besar, kecil, angka, simbol.',
            'Jangan gunakan data pribadi (nama, tanggal lahir, nama sekolah).',
            'Gunakan kata sandi unik untuk setiap akun berbeda.',
            'Aktifkan 2FA (Two-Factor Authentication).'
          ],
          iconName: 'Key'
        },
        {
          title: '2. Ragam Malware (Malicious Software)',
          explanation: 'Perangkat lunak berbahaya yang dirancang untuk merusak, memata-matai, atau mencuri data.',
          bulletPoints: [
            'Virus: Menggandakan diri dengan menempel pada file lain dan merusak sistem.',
            'Trojan: Menyamar sebagai program bermanfaat (game bajakan) padahal membuka pintu belakang (backdoor).',
            'Ransomware: Mengenkripsi dokumen dan memeras uang tebusan.',
            'Spyware: Memata-matai ketikan keyboard (keylogger) dan aktivitas layar.'
          ],
          iconName: 'ShieldAlert'
        },
        {
          title: '3. Data Publik vs Data Privat & UU PDP',
          explanation: 'Klasifikasi data pribadi berdasarkan tingkat kerahasiaan dan perlindungan hukum.',
          bulletPoints: [
            'Data Publik: Nama lengkap, foto seragam, hobi, sekolah.',
            'Data Pribadi Spesifik: NIK, data biometrik, rekam medis, nomor rekening/keuangan.',
            'UU Perlindungan Data Pribadi (UU PDP) menjamin hak warga negara atas keamanan datanya.'
          ],
          iconName: 'Lock'
        }
      ],
      comparisonTable: {
        title: 'Komparasi Jenis-Jenis Serangan Siber',
        headers: ['Jenis Ancaman', 'Metode Serangan', 'Tujuan Pelaku', 'Cara Pencegahan Efektif'],
        rows: [
          ['Phishing', 'Mengirim email/link tiruan yang mirip bank atau akun medsos', 'Mencuri kredensial username dan password', 'Periksa keaslian URL domain; jangan klik tautan dari sumber tak dikenal'],
          ['Ransomware', 'Menyusup lewat file attachment email atau aplikasi bajakan', 'Mengunci seluruh data dan memeras korban', 'Rutin mencadangkan data (backup) ke hard disk terpisah; jangan install aplikasi bajakan'],
          ['Social Engineering', 'Memanipulasi psikologis korban lewat telepon/chat ramah', 'Meminta kode OTP atau nomor rekening', 'Jangan pernah membagikan kode OTP kepada siapa pun termasuk pihak yang mengaku petugas'],
          ['Man-in-the-Middle', 'Menyadap komunikasi pada jaringan Wi-Fi publik gratisan', 'Merekam lalu lintas data transaksi dan password', 'Gunakan VPN dan hindari membuka m-banking di Wi-Fi publik tanpa proteksi']
        ]
      },
      dailyLifeExamples: [
        'Menerima file undangan pernikahan digital berformat .APK di WhatsApp dari nomor tak dikenal -> Waspada Trojan pencuri SMS OTP perbankan!',
        'Menggunakan pola sidik jari (fingerprint) dan PIN 6 angka di ponsel pintar untuk membuka kunci layar.'
      ],
      schoolExamples: [
        'Siswa selalu melakukan tombol "Log Out" setelah selesai menggunakan komputer di lab sekolah agar akun Google Classroom tidak disalahgunakan siswa kelas lain.'
      ],
      tahukahKamu: 'Sebagian besar kasus kebocoran data di dunia tidak disebabkan oleh hacker yang meretas server tercanggih, melainkan akibat kelalaian manusia (human error) seperti mengklik tautan phishing atau menggunakan kata sandi yang terlalu lemah!',
      faktaMenarik: 'Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) di Indonesia mengancam denda hingga miliaran rupiah dan pidana penjara bagi siapa saja yang secara melawan hukum membocorkan atau memperjualbelikan data pribadi orang lain!',
      infoPenting: 'Kode OTP (One-Time Password) adalah rahasia pribadi yang sama seperti kunci rumahmu. Pihak bank atau pengelola aplikasi TIDAK PERNAH meminta kode OTP kepada pengguna.',
      commonMistakes: [
        'Menyimpan catatan kata sandi di buku catatan yang terbuka di atas meja kelas.',
        'Mengklik tombol "Ingat Saya" (Remember Me) saat login di komputer umum warnet atau perpustakaan.'
      ],
      summary: [
        'Kata sandi kuat + 2FA adalah perisai utama akun digital.',
        'Waspadai link phishing dan file .APK mencurigakan.',
        'Lindungi NIK dan data pribadi privat keluarga.'
      ],
      formativeCheck: [
        {
          question: 'Jika seseorang yang mengaku pegawai layanan pelanggan menghubungi kamu dan meminta kode 6 digit OTP yang baru saja masuk ke SMS-mu, tindakan yang benar adalah...',
          options: [
            'Menolaknya dengan tegas dan tidak memberikan kode tersebut kepada siapa pun',
            'Segera memberikan kodenya karena dia mengaku petugas resmi',
            'Meminta imbalan uang terlebih dahulu',
            'Mengunggah kode OTP tersebut ke status media sosial'
          ],
          answerIndex: 0,
          explanation: 'Benar! Kode OTP tidak boleh dibagikan kepada siapapun tanpa pengecualian.'
        }
      ]
    },
    simulasi: {
      type: 'cyber-security',
      title: 'Lab Interaktif: Penguji Ketahanan Kata Sandi & Firewall',
      scenario: 'Uji tingkat keamanan kata sandi dan analisis skenario keamanan digital di bawah ini!',
      instructions: 'Pilih tindakan yang paling aman untuk menghadapi skenario ancaman siber berikut.',
      data: {
        scenarios: [
          {
            id: 'sc-1',
            text: 'Menerima file kiriman "undangan.apk" dari nomor asing di WhatsApp yang mengaku kurir paket.',
            correctAction: 'Hapus dan blokir nomor segera'
          },
          {
            id: 'sc-2',
            text: 'Ingin login akun belajar di laptop teman sekelas.',
            correctAction: 'Gunakan mode Incognito/Tamu dan jangan centang simpan sandi'
          },
          {
            id: 'sc-3',
            text: 'Mengamankan akun Google belajar sekolah dari pencurian sandi.',
            correctAction: 'Aktifkan verifikasi 2 langkah (2FA)'
          }
        ]
      }
    },
    miniGame: {
      type: 'detective',
      title: 'Perisai Siber Detektif',
      description: 'Selamatkan data rahasia sekolah dari penyusup siber!',
      questions: [
        {
          id: 1,
          question: 'Penyusup mengirim email mengatasnamakan Kepala Sekolah dengan link "smp5kroya-login.free-web.xyz" meminta ganti kata sandi. Serangan ini adalah...',
          options: ['Phishing', 'DDoS', 'Adware', 'Fragmentasi'],
          correctIndex: 0,
          clue: 'Domain tiruan untuk mencuri password.'
        },
        {
          id: 2,
          question: 'Langkah pertama terbaik jika smartphone-mu terlanjur mengunduh aplikasi mencurigakan adalah...',
          options: ['Putuskan koneksi internet (Airplane mode), copot pemasangan aplikasi, dan scan antivirus', 'Membeli HP baru', 'Menyalakan senter HP', 'Menghapus foto selfie'],
          correctIndex: 0,
          clue: 'Isolasi koneksi agar data tidak terkirim ke server pelaku.'
        }
      ]
    },
    kuis: [
      {
        id: 1,
        question: 'Metode pengamanan Autentikasi Dua Faktor (2FA) melindungi akun kita dengan cara...',
        options: [
          { label: 'A', text: 'Meminta bukti identitas kedua (seperti kode OTP dari aplikasi autentikator) selain kata sandi utama' },
          { label: 'B', text: 'Membuat kita harus mengetik kata sandi sebanyak dua kali berturut-turut' },
          { label: 'C', text: 'Mengganti kata sandi setiap 5 menit secara otomatis' },
          { label: 'D', text: 'Mengharuskan login dengan dua laptop sekaligus' }
        ],
        correctAnswer: 'A',
        explanation: '2FA menambahkan lapisan keamanan kedua sehingga sandi saja tidak cukup untuk membobol akun.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 2,
        question: 'Program berbahaya yang mencatat setiap ketukan tuts keyboard pengguna untuk mencuri username dan kata sandi disebut...',
        options: [
          { label: 'A', text: 'Keylogger (bagian dari Spyware)' },
          { label: 'B', text: 'Adware' },
          { label: 'C', text: 'Firmware' },
          { label: 'D', text: 'Shareware' }
        ],
        correctAnswer: 'A',
        explanation: 'Keylogger merekam ketikan tombol keyboard tanpa sepengetahuan korban.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 3,
        question: 'Mengapa kita sangat disarankan untuk tidak menghubungkan transaksi finansial (m-banking) saat menggunakan Wi-Fi publik gratis tanpa enkripsi?',
        options: [
          { label: 'A', text: 'Karena penyerang di jaringan yang sama dapat mencegat dan menyadap paket data yang tidak terenkripsi (Man-in-the-Middle)' },
          { label: 'B', text: 'Karena saldo uang otomatis terpotong untuk bayar listrik kafe' },
          { label: 'C', text: 'Karena Wi-Fi publik hanya bisa membuka aplikasi game' },
          { label: 'D', text: 'Karena kuota HP kita otomatis habis' }
        ],
        correctAnswer: 'A',
        explanation: 'Jaringan Wi-Fi publik tanpa proteksi rawan serangan penyadapan Man-in-the-Middle.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 4,
        question: 'Tindakan berikut yang merupakan praktik aman dalam pengelolaan kata sandi adalah...',
        options: [
          { label: 'A', text: 'Menggunakan Password Manager terpercaya dan membuat kata sandi yang berbeda untuk tiap akun penting' },
          { label: 'B', text: 'Menuliskan seluruh kata sandi pada selembar kertas yang ditempel di layar monitor' },
          { label: 'C', text: 'Membagikan kata sandi kepada sahabat karib agar tidak lupa' },
          { label: 'D', text: 'Menggunakan kata sandi "123456" untuk semua akun' }
        ],
        correctAnswer: 'A',
        explanation: 'Password Manager membantu mengelola kata sandi unik dan kompleks tanpa perlu menghafal satu per satu.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 5,
        question: 'Jika kamu menerima email pemberitahuan bahwa akun media sosialmu baru saja login dari negara Rusia padahal kamu sedang di Kroya, langkah pertama yang harus segera dilakukan adalah...',
        options: [
          { label: 'A', text: 'Segera login melalui aplikasi resmi, pilih "Logout dari semua perangkat", dan ubah kata sandi' },
          { label: 'B', text: 'Membalas email tersebut dengan kata-kata marah' },
          { label: 'C', text: 'Mengabaikannya karena mengira itu hanya lelucon' },
          { label: 'D', text: 'Mematikan laptop dan tidak belajar lagi' }
        ],
        correctAnswer: 'A',
        explanation: 'Memutuskan sesi aktif dan mengganti kata sandi menghentikan akses peretas seketika.',
        competencyLevel: 'Penerapan (MOTS)'
      },
      {
        id: 6,
        question: 'Data berikut yang BUKAN merupakan data pribadi sensitif adalah...',
        options: [
          { label: 'A', text: 'Judul film animasi favorit' },
          { label: 'B', text: 'Nomor Induk Kependudukan (NIK)' },
          { label: 'C', text: 'Nomor Kartu Keluarga' },
          { label: 'D', text: 'Data Rekam Medis Penyakit' }
        ],
        correctAnswer: 'A',
        explanation: 'Hobi atau film favorit adalah preferensi umum, bukan data pribadi sensitif.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 7,
        question: 'Salah satu dampak buruk dari kebiasaan "Oversharing" (membagikan terlalu banyak detail kehidupan pribadi di media sosial) adalah...',
        options: [
          { label: 'A', text: 'Memudahkan pelaku kejahatan menyusun profil rekayasa sosial (Social Engineering) untuk menipu korban' },
          { label: 'B', text: 'Membuat follower media sosial bertambah jutaan orang' },
          { label: 'C', text: 'Koneksi internet menjadi lebih cepat' },
          { label: 'D', text: 'Foto menjadi beresolusi tinggi' }
        ],
        correctAnswer: 'A',
        explanation: 'Oversharing memberi amunisi data bagi penipu untuk menyamar atau memeras korban.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 8,
        question: 'Perangkat lunak yang bertugas memantau lalu lintas data masuk dan keluar serta memblokir paket mencurigakan sesuai aturan keamanan disebut...',
        options: [
          { label: 'A', text: 'Firewall' },
          { label: 'B', text: 'Mouse Pad' },
          { label: 'C', text: 'Monitor' },
          { label: 'D', text: 'Printer' }
        ],
        correctAnswer: 'A',
        explanation: 'Firewall bertindak sebagai dinding pertahanan penyaring lalu lintas jaringan.',
        competencyLevel: 'Pemahaman (LOTS)'
      },
      {
        id: 9,
        question: 'Mengapa memperbarui (update) sistem operasi dan aplikasi secara berkala sangat krusial bagi keamanan siber?',
        options: [
          { label: 'A', text: 'Karena pembaruan berisi tambalan keamanan (security patch) untuk menutup celah kerentanan yang baru ditemukan' },
          { label: 'B', text: 'Hanya untuk mengubah tampilan warna tombol' },
          { label: 'C', text: 'Agar memori komputer cepat penuh' },
          { label: 'D', text: 'Agar laptop tidak bisa dipakai' }
        ],
        correctAnswer: 'A',
        explanation: 'Pembaruan menutup lubang keamanan (vulnerability) sebelum dimanfaatkan penyerang.',
        competencyLevel: 'Penalaran (HOTS)'
      },
      {
        id: 10,
        question: 'Prinsip perlindungan data "Hak untuk Dilupakan" (Right to be Forgotten) dalam hukum privasi digital memberikan hak kepada warga untuk...',
        options: [
          { label: 'A', text: 'Meminta penghapusan data pribadinya yang sudah tidak relevan lagi dari sistem basis data publik/mesin pencari' },
          { label: 'B', text: 'Lupa mengerjakan tugas sekolah tanpa dihukum' },
          { label: 'C', text: 'Menghapus ingatan teman sekelas' },
          { label: 'D', text: 'Tidak perlu membayar tagihan internet' }
        ],
        correctAnswer: 'A',
        explanation: 'Right to be forgotten melindungi hak privasi individu dari jejak masa lalu yang tidak relevan secara hukum.',
        competencyLevel: 'Penalaran (HOTS)'
      }
    ],
    asesmenAkhir: [
      {
        id: 1,
        question: 'Program berbahaya yang sengaja disamarkan di dalam game bajakan gratis disebut...',
        options: [
          { label: 'A', text: 'Trojan Horse' },
          { label: 'B', text: 'Antivirus' },
          { label: 'C', text: 'Firewall' },
          { label: 'D', text: 'Spreadsheet' }
        ],
        correctAnswer: 'A',
        explanation: 'Trojan menyamar sebagai program tidak berbahaya untuk menyusup.',
        points: 10
      },
      {
        id: 2,
        question: 'Singkatan dari 2FA dalam keamanan akun adalah...',
        options: [
          { label: 'A', text: 'Two-Factor Authentication' },
          { label: 'B', text: 'Two-File Algorithm' },
          { label: 'C', text: 'Total File Access' },
          { label: 'D', text: 'Top Final Assessment' }
        ],
        correctAnswer: 'A',
        explanation: 'Two-Factor Authentication = Autentikasi Dua Faktor.',
        points: 10
      },
      {
        id: 3,
        question: 'Undang-undang di Indonesia yang khusus mengatur hak dan kewajiban atas pengelolaan data pribadi adalah...',
        options: [
          { label: 'A', text: 'UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)' },
          { label: 'B', text: 'UU Lalu Lintas Angkutan Jalan' },
          { label: 'C', text: 'UU Kelautan Nasional' },
          { label: 'D', text: 'UU Kehutanan' }
        ],
        correctAnswer: 'A',
        explanation: 'UU No. 27 Tahun 2022 adalah payung hukum perlindungan data pribadi di Indonesia.',
        points: 10
      },
      {
        id: 4,
        question: 'Metode manipulasi psikologis manusia untuk memperoleh informasi rahasia tanpa meretas sistem komputer disebut...',
        options: [
          { label: 'A', text: 'Social Engineering (Rekayasa Sosial)' },
          { label: 'B', text: 'Hardware Upgrade' },
          { label: 'C', text: 'Software Testing' },
          { label: 'D', text: 'Network Routing' }
        ],
        correctAnswer: 'A',
        explanation: 'Social Engineering memperdaya kelemahan manusiawi (percaya, panik, kasihan).',
        points: 10
      },
      {
        id: 5,
        question: 'Tindakan yang tepat saat selesai menggunakan akun email di komputer perpustakaan sekolah adalah...',
        options: [
          { label: 'A', text: 'Klik Log Out dan hapus riwayat penjelajahan (cache/cookies)' },
          { label: 'B', text: 'Cukup menutup jendela browser' },
          { label: 'C', text: 'Mematikan monitor saja' },
          { label: 'D', text: 'Meninggalkan komputer dalam keadaan terbuka' }
        ],
        correctAnswer: 'A',
        explanation: 'Logout dan hapus cache menjamin sesi akun tidak tertinggal untuk pengguna berikutnya.',
        points: 10
      },
      {
        id: 6,
        question: 'Mengapa mencadangkan (backup) data secara teratur ke penyimpanan eksternal atau cloud sangat penting?',
        options: [
          { label: 'A', text: 'Agar data berharga tetap dapat dipulihkan jika perangkat terkena malware ransomware atau rusak fisik' },
          { label: 'B', text: 'Agar komputer bekerja lebih berat' },
          { label: 'C', text: 'Agar file hilang selamanya' },
          { label: 'D', text: 'Hanya untuk membuang waktu luang' }
        ],
        correctAnswer: 'A',
        explanation: 'Backup adalah tameng utama melawan ransomware dan kerusakan storage.',
        points: 10
      },
      {
        id: 7,
        question: 'Tanda gembok terkunci pada bilah alamat web (browser address bar) menandakan bahwa...',
        options: [
          { label: 'A', text: 'Komunikasi data antara browser dan server telah dienkripsi dengan protokol aman HTTPS' },
          { label: 'B', text: 'Website tersebut tidak boleh dibuka anak sekolah' },
          { label: 'C', text: 'Laptop kita terkunci' },
          { label: 'D', text: 'Pemilik website adalah polisi' }
        ],
        correctAnswer: 'A',
        explanation: 'Simbol gembok menandakan koneksi SSL/TLS terenkripsi.',
        points: 10
      },
      {
        id: 8,
        question: 'Kombinasi kata sandi berikut yang paling lemah dan rentan dibobol adalah...',
        options: [
          { label: 'A', text: '123456' },
          { label: 'B', text: 'R1f@n1#Sm4rt2026' },
          { label: 'C', text: 'Kroya*MajudanAman#99' },
          { label: 'D', text: 'Belajar_Koding$2026' }
        ],
        correctAnswer: 'A',
        explanation: '123456 adalah kata sandi paling umum dan mudah ditebak di dunia.',
        points: 10
      },
      {
        id: 9,
        question: 'Informasi apa yang pantang dibagikan ke media sosial saat mengunggah foto kartu tiket penerbangan atau kereta api?',
        options: [
          { label: 'A', text: 'Kode Barcode / QR Code dan Kode Booking (PNR)' },
          { label: 'B', text: 'Nama kota tujuan wisata' },
          { label: 'C', text: 'Foto pemandangan awan dari jendela' },
          { label: 'D', text: 'Warna tas koper' }
        ],
        correctAnswer: 'A',
        explanation: 'Barcode dan kode booking tiket memuat data penumpang pribadi yang bisa disalahgunakan.',
        points: 10
      },
      {
        id: 10,
        question: 'Sikap mental "Zero Trust" dalam keamanan siber mengajarkan kita untuk...',
        options: [
          { label: 'A', text: 'Selalu memverifikasi setiap akses, tautan, dan permintaan data secara ketat tanpa berasumsi aman secara buta' },
          { label: 'B', text: 'Tidak mau berteman dengan siapa pun' },
          { label: 'C', text: 'Tidak mau menggunakan teknologi sama sekali' },
          { label: 'D', text: 'Membenci semua orang di internet' }
        ],
        correctAnswer: 'A',
        explanation: 'Prinsip Zero Trust: "Never trust, always verify" merupakan standar industri keamanan modern.',
        points: 10
      }
    ]
  }
];

export const TOPIC_MAP: Record<string, Topic> = TOPICS.reduce((acc, topic) => {
  acc[topic.id] = topic;
  return acc;
}, {} as Record<string, Topic>);
