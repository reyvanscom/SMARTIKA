import { ScenarioItem } from '../utils/questionRandomizer';

export interface TopicSimulationMetadata {
  bannerColor: string;
  badgeText: string;
  badgeTextColor: string;
  title: string;
  description: string;
  scenarios: ScenarioItem[];
}

export const TOPIC_SIMULATION_SCENARIOS: Record<string, TopicSimulationMetadata> = {
  // ==========================================
  // KELAS 7
  // ==========================================
  'k7-idk': {
    bannerColor: 'bg-linear-to-r from-sky-600 via-blue-600 to-indigo-700',
    badgeText: 'Simulasi Informasi Digital & Kredibilitas Sumber',
    badgeTextColor: 'text-sky-200',
    title: 'Tantangan Verifikasi Informasi Digital Siswa Kelas 7',
    description: 'Pecahkan 4 kasus nyata seputar mencari tugas di internet, pesan berantai WhatsApp, mencantumkan sitasi pustaka, dan mengecek pengumuman resmi sekolah.',
    scenarios: [
      {
        id: 1,
        category: 'Kredibilitas Sumber Makalah',
        title: 'Tugas Makalah IPA Daur Hidup Kupu-Kupu di Perpustakaan',
        story: 'Rizky sedang mencari materi tentang "Daur Hidup Kupu-Kupu". Hasil pencarian nomor satu di Google berasal dari blog gratisan tanpa nama penulis, sedangkan hasil nomor tiga berasal dari portal Rumah Belajar Kemdikbud.',
        question: 'Langkah paling bijak manakah yang harus diambil Rizky agar tugasnya mendapat nilai terbaik?',
        options: [
          { text: 'Memilih rujukan dari Rumah Belajar Kemdikbud karena disusun oleh ahli pendidikan dan terpercaya', isCorrect: true, reason: 'Tepat sekali! Portal pendidikan resmi menjamin keakuratan ilmiah materi pelajaran.' },
          { text: 'Langsung menyalin artikel blog gratisan anonim hanya karena berada di urutan pencarian teratas', isCorrect: false, reason: 'Urutan teratas tidak menjamin kebenaran materi, bisa saja karena trik kata kunci SEO.' },
          { text: 'Menyerah dan tidak mengumpulkan tugas IPA', isCorrect: false, reason: 'Selalu ada solusi literasi digital yang bisa dipelajari dengan mudah.' }
        ]
      },
      {
        id: 2,
        category: 'Pesan Berantai WhatsApp',
        title: 'Pesan Berantai Link Pulsa 100 Ribu di Grup Kelas',
        story: 'Di grup chat kelas 7 SMPN 5 Kroya, seorang teman mengirim tautan: "Klaim pulsa gratis 100 ribu dari pemerintah di link-pulsa-kaget.xyz". Tautan meminta nomor HP dan tanggal lahir.',
        question: 'Sikap apa yang mencerminkan literasi digital siswa yang cerdas dan berkarakter?',
        options: [
          { text: 'Mengingatkan teman sekelas agar tidak mengklik link tersebut karena berpotensi penipuan (phishing)', isCorrect: true, reason: 'Luar biasa! Melindungi teman dari jebakan phishing adalah sikap kepedulian digital terpuji.' },
          { text: 'Ikut membagikan tautan tersebut ke keluarga agar semua mendapat pulsa', isCorrect: false, reason: 'Menyebarkan link palsu dapat membahayakan data pribadi keluarga dan teman.' },
          { text: 'Memasukkan nomor rekening orang tua agar pulsa segera dikirim', isCorrect: false, reason: 'Sangat berbahaya dan dapat memicu pencurian data rahasia perbankan.' }
        ]
      },
      {
        id: 3,
        category: 'Etika Sitasi Karya',
        title: 'Menuliskan Daftar Pustaka pada Laporan Informatika',
        story: 'Nisa selesai mengetik laporan Informatika dari berbagai artikel web. Temannya menyarankan untuk hanya menulis "Sumber: Google" pada daftar pustaka tugasnya.',
        question: 'Bagaimana tanggapan yang benar sesuai kaidah etika digital?',
        options: [
          { text: 'Google adalah mesin pencari, kita harus mencantumkan nama penulis dan alamat web situs aslinya', isCorrect: true, reason: 'Benar! Google hanya perantara pencarian, bukan pemilik atau pembuat konten materi.' },
          { text: 'Menyetujui saran teman karena menulis alamat situs asli terlalu panjang', isCorrect: false, reason: 'Tidak mencantumkan sumber asli melanggar kejujuran akademik dan hak cipta karya orang lain.' },
          { text: 'Menghapus daftar pustaka sama sekali agar tidak repot', isCorrect: false, reason: 'Setiap karya rujukan wajib dicantumkan sumbernya secara jujur dan transparan.' }
        ]
      },
      {
        id: 4,
        category: 'Verifikasi Domain Resmi',
        title: 'Kabar Libur Dadakan Bencana di Media Sosial',
        story: 'Beredar postingan video TikTok berlatar suara dramatis yang menyatakan SMPN 5 Kroya meliburkan siswa selama 3 hari karena cuaca ekstrem.',
        question: 'Bagaimana prosedur verifikasi tercepat dan paling akurat yang harus dilakukan siswa?',
        options: [
          { text: 'Mengecek pengumuman resmi di situs web sekolah berdomain resmi .sch.id atau menanyakan ke wali kelas', isCorrect: true, reason: 'Pintar! Pengumuman libur sekolah resmi hanya diterbitkan melalui kanal resmi sekolah berdomain .sch.id.' },
          { text: 'Langsung tidak berangkat sekolah tanpa izin siapa pun', isCorrect: false, reason: 'Tindakan gegabah yang melanggar tata tertib sekolah hanya karena video medsos tanpa sumber.' },
          { text: 'Membuat video tandingan yang lebih heboh di TikTok', isCorrect: false, reason: 'Memperkeruh suasana dan berisiko menyebarkan disinformasi baru.' }
        ]
      }
    ]
  },

  'k7-bk': {
    bannerColor: 'bg-linear-to-r from-emerald-600 via-teal-600 to-sky-700',
    badgeText: 'Simulasi Berpikir Komputasional (4 Pilar)',
    badgeTextColor: 'text-emerald-200',
    title: 'Tantangan Nalar 4 Pilar Berpikir Komputasional Siswa',
    description: 'Pecahkan 4 kasus nyata: pembagian tugas piket (Dekomposisi), jadwal jam istirahat kantin (Pola), denah rute sepeda (Abstraksi), dan urutan menyalakan PC lab (Algoritma).',
    scenarios: [
      {
        id: 1,
        category: '1. Dekomposisi',
        title: 'Membagi Tugas Piket Kebersihan Kelas 7-A',
        story: 'Ruang kelas 7-A sangat kotor setelah kegiatan pentas seni. Regu piket yang beranggotakan 4 orang kebingungan harus mulai dari mana karena ruangan begitu berantakan.',
        question: 'Bagaimana penerapan pilar Dekomposisi yang paling tepat untuk menyelesaikan masalah ini?',
        options: [
          { text: 'Memecah pekerjaan besar menjadi bagian kecil: 1 siswa menyapu, 1 mengepel, 1 membersihkan kaca, dan 1 merapikan meja', isCorrect: true, reason: 'Tepat sekali! Dekomposisi memecah masalah besar menjadi tugas-tugas terfokus yang mudah dikerjakan.' },
          { text: 'Membiarkan satu orang teman piket bekerja sendirian sementara anggota lain pulang', isCorrect: false, reason: 'Tidak adil dan bertentangan dengan semangat gotong royong serta kerja tim.' },
          { text: 'Menunggu sampai bel sekolah berbunyi besok pagi baru mulai membersihkan', isCorrect: false, reason: 'Menunda pekerjaan membuat masalah semakin menumpuk dan ruang kelas tetap kotor.' }
        ]
      },
      {
        id: 2,
        category: '2. Pengenalan Pola',
        title: 'Mengenali Jam Antrean Padat di Kantin Sekolah',
        story: 'Andi mengamati bahwa kantin sekolah selalu penuh sesak berdesakan pada 10 menit pertama jam istirahat, namun menjadi lengang pada 10 menit terakhir sebelum bel masuk.',
        question: 'Bagaimana penerapan Pengenalan Pola untuk mengatur waktu jajan yang efisien?',
        options: [
          { text: 'Memanfaatkan pola waktu tersebut dengan salat Dhuha terlebih dahulu di 10 menit awal, lalu membeli makanan di 10 menit akhir saat antrean sepi', isCorrect: true, reason: 'Luar biasa! Mengenali pola perulangan waktu membantu kita mengambil keputusan yang jauh lebih efisien.' },
          { text: 'Ikut berdesak-desakan dan menyerobot antrean siswa lain di 10 menit pertama', isCorrect: false, reason: 'Melanggar tata tertib dan mengabaikan pola waktu yang sudah teramati.' },
          { text: 'Tidak pernah jajan dan mengurung diri di kelas', isCorrect: false, reason: 'Solusi berlebihan yang tidak memanfaatkan analisis pola secara produktif.' }
        ]
      },
      {
        id: 3,
        category: '3. Abstraksi',
        title: 'Membuat Denah Rute Gowes Sepeda ke Pantai Sodong',
        story: 'Klub sepeda SMPN 5 Kroya ingin membuat gambar peta rute perjalanan menuju Pantai Sodong agar anggota baru tidak tersesat di jalan simpang desa.',
        question: 'Bagaimana penerapan Abstraksi saat menggambar denah rute perjalanan?',
        options: [
          { text: 'Hanya menggambar jalan utama, nama persimpangan belokan, dan patokan gedung penting, serta mengabaikan pohon dan gang buntu', isCorrect: true, reason: 'Benar sekali! Abstraksi menyaring hanya informasi penting yang relevan dan membuang detail yang tidak perlu.' },
          { text: 'Menggambar semua bentuk pohon kelapa, pagar rumah warga, dan jenis aspal jalan secara mendetail', isCorrect: false, reason: 'Terlalu banyak detail tidak penting yang justru membuat denah sulit dibaca dan membingungkan.' },
          { text: 'Tidak menggambar jalan apa pun selain gambar laut', isCorrect: false, reason: 'Informasi rute jalan utama adalah kunci dari denah, tidak boleh dihilangkan.' }
        ]
      },
      {
        id: 4,
        category: '4. Algoritma',
        title: 'Urutan Menyalakan Perangkat Komputer Laboratorium',
        story: 'Siswa kelas 7 baru pertama kali masuk ke lab komputer sekolah. Guru meminta siswa menyalakan komputer dengan aman dan berurutan.',
        question: 'Urutan langkah algoritma manakah yang paling benar dan aman bagi kelistrikan komputer?',
        options: [
          { text: '1. Pastikan steker listrik tertancap rapat &rarr; 2. Nyalakan stabilizer &rarr; 3. Tekan tombol Power CPU &rarr; 4. Nyalakan layar monitor', isCorrect: true, reason: 'Sangat tepat! Algoritma adalah langkah logis bertahap yang menjamin perangkat dialiri daya secara aman dan stabil.' },
          { text: '1. Tekan tombol monitor berkali-kali &rarr; 2. Cabut kabel listrik &rarr; 3. Tekan tombol CPU', isCorrect: false, reason: 'Urutan terbalik dan berbahaya bagi kestabilan komponen perangkat keras komputer.' },
          { text: 'Langsung memukul casing CPU sampai lampu menyala', isCorrect: false, reason: 'Tindakan kasar yang dapat merusak harddisk dan sirkuit elektronik motherboard.' }
        ]
      }
    ]
  },

  'k7-hd': {
    bannerColor: 'bg-linear-to-r from-blue-600 via-indigo-600 to-violet-700',
    badgeText: 'Simulasi Himpunan Data & Analisis Data',
    badgeTextColor: 'text-blue-200',
    title: 'Tantangan Mengolah Data Pendaftaran Siswa Baru',
    description: 'Pecahkan 4 kasus pengolahan data mentah: merapikan formulir pendaftaran ekskul sobek, menangani data ganda (duplikat), menyaring data kosong, dan membuat grafik visual.',
    scenarios: [
      {
        id: 1,
        category: 'Sortir & Pengurutan Data',
        title: 'Merapikan Catatan Pendaftaran Ekskul 240 Siswa Baru',
        story: 'Pengurus OSIS menerima lembaran kertas pendaftaran 240 siswa baru yang memilih ekskul Futsal, Tari, dan Robotik. Nama siswa tercampur baur acak sehingga menyulitkan pembagian jadwal lapangan.',
        question: 'Langkah pengolahan data pertama apa yang paling efisien dilakukan di aplikasi spreadsheet?',
        options: [
          { text: 'Memasukkan data ke tabel spreadsheet lalu melakukan Sortir (pengurutan) berdasarkan kolom Nama Ekskul dan Kelas', isCorrect: true, reason: 'Tepat sekali! Fitur Sortir otomatis mengelompokkan siswa sesuai ekskul yang sama secara instan.' },
          { text: 'Membaca ulang satu per satu secara manual selama 3 hari berturut-turut', isCorrect: false, reason: 'Sangat memakan waktu lama dan rentan terjadi kesalahan manusia (human error).' },
          { text: 'Mengundi nama siswa dengan kertas kocokan arisan', isCorrect: false, reason: 'Mengabaikan pilihan asli siswa dan merusak tujuan pendaftaran ekskul.' }
        ]
      },
      {
        id: 2,
        category: 'Pembersihan Data (Data Cleaning)',
        title: 'Menangani Data Ganda (Duplikat) Nama Siswa',
        story: 'Saat merekap pendaftaran ekskul Futsal, sekretaris OSIS menemukan bahwa nama "Dimas Saputra 7-B" tercatat sebanyak 3 kali karena ia mengisi formulir berulang kali karena takut tidak diterima.',
        question: 'Bagaimana tindakan pembersihan data (data cleaning) yang benar?',
        options: [
          { text: 'Menghapus 2 baris data duplikat dan menyisakan 1 baris pendaftaran pertama yang valid', isCorrect: true, reason: 'Hebat! Pembersihan duplikasi data memastikan kuota ekskul terhitung secara akurat.' },
          { text: 'Memasukkan Dimas ke 3 kelompok tim futsal sekaligus agar bermain 3 kali', isCorrect: false, reason: 'Satu siswa tidak mungkin bermain di 3 jadwal yang bersamaan dan merebut kuota siswa lain.' },
          { text: 'Mencoret nama Dimas dari sekolah', isCorrect: false, reason: 'Sanksi yang berlebihan dan tidak proporsional untuk masalah duplikasi data formulir.' }
        ]
      },
      {
        id: 3,
        category: 'Penyaringan Data (Filter)',
        title: 'Menemukan Siswa yang Belum Memilih Ekstrakurikuler',
        story: 'Wali kelas ingin mengetahui siapa saja siswa di kelas 7 yang kolom pilihannya masih kosong (belum mendaftar ekskul apa pun) agar dapat diarahkan guru BK.',
        question: 'Fitur spreadsheet manakah yang paling cepat menampilkan data kosong tersebut?',
        options: [
          { text: 'Mengaktifkan fitur Filter pada baris judul kolom, lalu mencentang kriteria (Blanks / Kosong)', isCorrect: true, reason: 'Pintar! Filter Blanks langsung menyaring dan menampilkan siswa yang kolom pilihannya belum terisi.' },
          { text: 'Menghapus seluruh kolom nama siswa di tabel', isCorrect: false, reason: 'Tindakan salah yang menghilangkan data seluruh kelas.' },
          { text: 'Mengetik ulang seluruh nama 240 siswa di kertas polio', isCorrect: false, reason: 'Tidak memanfaatkan keunggulan komputer pengolah data.' }
        ]
      },
      {
        id: 4,
        category: 'Visualisasi Data',
        title: 'Laporan Persentase Peminat Ekskul untuk Kepala Sekolah',
        story: 'Kepala Sekolah SMPN 5 Kroya meminta laporan ringkas tentang ekskul mana yang paling diminati oleh siswa baru tahun ajaran ini.',
        question: 'Bentuk visualisasi data manakah yang paling komunikatif dan mudah dipahami dalam sekali lihat?',
        options: [
          { text: 'Diagram Lingkaran (Pie Chart) atau Diagram Batang berwarna yang menunjukkan persentase peminat tiap ekskul', isCorrect: true, reason: 'Sangat komunikatif! Visualisasi grafik memudahkan pimpinan sekolah membaca porsi peminat secara cepat.' },
          { text: 'Kumpulan teks 20 halaman berisi nama lengkap siswa tanpa angka ringkasan', isCorrect: false, reason: 'Bentuk laporan mentah yang melelahkan dan sulit dianalisis perbandingannya.' },
          { text: 'Kertas kosong dengan tulisan tangan angka perkiraan', isCorrect: false, reason: 'Laporan resmi harus berbasis data riil yang disajikan secara sistematis.' }
        ]
      }
    ]
  },

  'k7-komputer': {
    bannerColor: 'bg-linear-to-r from-sky-600 via-indigo-600 to-purple-700',
    badgeText: 'Simulasi Perangkat Keras & Troubleshooting Lab',
    badgeTextColor: 'text-sky-200',
    title: 'Tantangan Dokter Komputer: Kasus Nyata Hardware Lab',
    description: 'Pecahkan 5 kasus nyata komputer sekolah: mati lampu saat ketik tugas (RAM volatile), laptop lemot saat buka banyak tab, CPU panas mendadak mati, monitor No Signal pada GPU, dan spesifikasi PC multimedia.',
    scenarios: [
      {
        id: 1,
        category: 'RAM Volatile vs Storage Non-Volatile',
        title: 'Mati Lampu Saat Mengetik Tugas 4 Halaman di Lab Komputer',
        story: 'Faris sedang mengetik naskah laporan Informatika di lab komputer sekolah. Tiba-tiba aliran listrik padam sesaat. Ketika PC dinyalakan kembali, ketikan 4 halaman hilang total karena Faris belum sempat menekan tombol Simpan (Save).',
        question: 'Berdasarkan karakteristik memori, mengapa data yang belum disimpan langsung lenyap saat listrik mati?',
        options: [
          { text: 'Karena teks yang sedang diketik masih berada di RAM yang bersifat volatile (membutuhkan daya listrik untuk menyimpan data)', isCorrect: true, reason: 'Tepat sekali! RAM bersifat volatile. Data baru aman tersimpan permanen tanpa listrik jika sudah disimpan ke SSD/Harddisk.' },
          { text: 'Karena kabel keyboard Faris putus sehingga huruf tidak terkirim', isCorrect: false, reason: 'Keyboard hanya alat input; hilangnya data saat listrik mati disebabkan sifat memori kerja RAM.' },
          { text: 'Karena monitor komputer sengaja menghapus teks saat mendeteksi ketiadaan daya', isCorrect: false, reason: 'Monitor hanyalah perangkat output penampil gambar, bukan tempat penyimpanan memori.' }
        ]
      },
      {
        id: 2,
        category: 'Beban Kerja RAM (Bottleneck)',
        title: 'Laptop Lemot Patah-Patah Saat Buka 20 Tab & Game',
        story: 'Rina membuka 20 tab Google Chrome, memutar Spotify, membuka Canva, dan membiarkan game berjalan di latar belakang pada laptop RAM 4GB. Tiba-tiba kursor patah-patah dan aplikasi berstatus Not Responding.',
        question: 'Komponen manakah yang mengalami kelebihan beban dan apa tindakan solusinya?',
        options: [
          { text: 'Kapasitas RAM terisi penuh 100%; solusinya adalah menutup tab dan program yang tidak terpakai agar memori lega', isCorrect: true, reason: 'Luar biasa! RAM adalah ruang kerja aktif. Membuka terlalu banyak aplikasi membuat RAM penuh dan laptop menjadi lambat.' },
          { text: 'Membeli mouse baru yang memiliki lampu RGB warna-warni', isCorrect: false, reason: 'Mouse tidak mempengaruhi kapasitas pemrosesan dan beban memori kerja laptop.' },
          { text: 'Menghapus file foto lama di flashdisk', isCorrect: false, reason: 'File di flashdisk berada di media eksternal, bukan beban di RAM yang sedang aktif.' }
        ]
      },
      {
        id: 3,
        category: 'Pendinginan CPU & Thermal Protection',
        title: 'Kipas CPU Bersuara Keras & Komputer Mendadak Mati Sendiri',
        story: 'Komputer nomor 3 lab sekolah sering mengeluarkan suara menderu dari kipasnya. Ketika dipakai siswa selama 15 menit mengedit video, komputer tersebut mendadak mati sendiri dan casingnya terasa sangat panas.',
        question: 'Mengapa komputer mendadak mati sendiri dan apa tindakan perbaikannya?',
        options: [
          { text: 'Processor (CPU) mengalami overheating sehingga fitur keamanan otomatis mematikan daya; bersihkan debu kipas dan ganti pasta termal CPU', isCorrect: true, reason: 'Pintar sekali! Jika pasta termal kering atau kipas berdebu, CPU menembus batas panas aman dan sistem mati otomatis mencegah kebakaran sirkuit.' },
          { text: 'Menyiram motherboard dengan air es dingin saat komputer menyala', isCorrect: false, reason: 'Sangat berbahaya! Air pada perangkat beraliran listrik akan memicu korsleting fatal.' },
          { text: 'Mengganti kabel monitor dengan kabel yang lebih pendek', isCorrect: false, reason: 'Kabel display tidak ada hubungannya dengan disipasi panas processor.' }
        ]
      },
      {
        id: 4,
        category: 'Port Display: Onboard vs Dedicated GPU',
        title: 'Monitor Menampilkan "No Signal" Padahal Lampu PC Menyala Normal',
        story: 'Lab komputer baru saja memasang kartu grafis tambahan (Dedicated GPU). Saat dinyalakan, kipas menyala normal, namun layar monitor menampilkan pesan kotak melayang: "No Signal" dan layar tetap gelap.',
        question: 'Berdasarkan jalur pengolahan grafis, kesalahan apa yang kemungkinan besar terjadi?',
        options: [
          { text: 'Kabel monitor dicolokkan ke port motherboard onboard di atas, padahal seharusnya dicolokkan ke port kartu grafis GPU di bagian bawah', isCorrect: true, reason: 'Sangat tepat! Saat kartu grafis terpasang, port display bawaan motherboard otomatis mati. Kabel monitor wajib dicolok ke port kartu grafis.' },
          { text: 'Siswa lupa menekan tombol spasi pada keyboard 10 kali', isCorrect: false, reason: 'Tombol spasi tidak mempengaruhi transmisi sinyal video ke monitor.' },
          { text: 'Kabel listrik PLN terbalik antara kutub positif dan negatif', isCorrect: false, reason: 'Colokan AC tidak terpengaruh kutub dan komputer sudah menyala normal.' }
        ]
      },
      {
        id: 5,
        category: 'Pemilihan Spesifikasi Komputer',
        title: 'Pemilihan Spesifikasi PC Multimedia & Desain Sekolah',
        story: 'OSIS SMPN 5 Kroya berencana membeli 1 unit PC untuk editing video tugas dan desain canva/photoshop. Pilihan: PC X (HDD 2TB besar tapi RAM 4GB) vs PC Y (SSD NVMe 512GB cepat, RAM 16GB, dan Kartu Grafis dedicated).',
        question: 'Komputer manakah yang paling sesuai agar proses editing video berjalan lancar tanpa macet?',
        options: [
          { text: 'PC Y, karena editing video membutuhkan kecepatan baca-tulis SSD, RAM besar untuk timeline video, dan GPU khusus rendering', isCorrect: true, reason: 'Hebat! Kapasitas HDD besar pada PC X tidak berguna jika kecepatan lambat dan RAM kecil, rendering video akan sering gagal (crash).' },
          { text: 'PC X, karena semakin besar angka Harddisk 2TB, otomatis processor jadi 10 kali lebih pintar', isCorrect: false, reason: 'Kapasitas harddisk hanya menampung jumlah berkas, bukan kecepatan kerja pemrosesan grafis.' },
          { text: 'Membeli mesin ketik manual', isCorrect: false, reason: 'Mesin ketik manual tidak bisa digunakan untuk mengolah grafis dan video digital.' }
        ]
      }
    ]
  },

  'k7-bse': {
    bannerColor: 'bg-linear-to-r from-teal-600 via-cyan-600 to-blue-700',
    badgeText: 'Simulasi Buku Sekolah Elektronik (BSE)',
    badgeTextColor: 'text-teal-200',
    title: 'Tantangan Belajar Mandiri dengan Sumber Belajar Digital',
    description: 'Pecahkan 4 kasus pemanfaatan e-book: buku cetak ketinggalan saat ulangan, pencarian cepat rumus via Ctrl+F, bookmark digital, dan hemat memori HP.',
    scenarios: [
      {
        id: 1,
        category: 'Akses Sumber Belajar Legal',
        title: 'Buku Paket Fisik Ketinggalan di Rumah Menjelang Ulangan',
        story: 'Budi lupa membawa buku paket Informatika fisik ke sekolah, padahal 30 menit lagi ada penilaian harian di kelas. Di perpustakaan sekolah stok buku cadangan sudah habis dipinjam.',
        question: 'Langkah digital cerdas apa yang dapat dilakukan Budi menggunakan HP pintarnya?',
        options: [
          { text: 'Membuka portal resmi Kemendikbudristek (SIBI / Rumah Belajar) dan mengunduh berkas e-book BSE Informatika kelas 7 secara resmi dan gratis', isCorrect: true, reason: 'Tepat sekali! Buku Sekolah Elektronik (BSE) resmi disediakan pemerintah gratis dalam format PDF untuk diakses siswa kapan saja.' },
          { text: 'Menangis di pojok kantin dan pasrah mendapat nilai nol', isCorrect: false, reason: 'Siswa melek digital mampu memanfaatkan alternatif teknologi sumber belajar.' },
          { text: 'Meminjam buku teman lalu menyembunyikannya di tas sendiri', isCorrect: false, reason: 'Tindakan tidak terpuji yang merugikan teman sekelas.' }
        ]
      },
      {
        id: 2,
        category: 'Pintasan Pencarian Cepat (Ctrl+F)',
        title: 'Mencari Istilah "Algoritma" di Dokumen Buku Tebal 200 Halaman',
        story: 'Saat belajar kelompok, Siti diminta mencari arti istilah "Algoritma" di dalam berkas e-book PDF tebal 200 halaman. Waktu pengerjaan tugas hanya tersisa 5 menit.',
        question: 'Metode pencarian tercepat manakah yang mencerminkan kecakapan literasi digital?',
        options: [
          { text: 'Menggunakan fitur pencarian kata (Search / tombol pintasan Ctrl + F) lalu mengetik kata kunci "Algoritma"', isCorrect: true, reason: 'Sangat cepat! Pintasan Ctrl+F seketika melompat langsung ke halaman dan kalimat yang memuat kata kunci tersebut.' },
          { text: 'Menggeser layar halaman satu per satu dari halaman 1 sampai 200 secara manual', isCorrect: false, reason: 'Sangat lambat, melelahkan mata, dan berisiko terlewat tanpa disadari.' },
          { text: 'Menutup aplikasi PDF dan menebak-nebak artinya secara asal', isCorrect: false, reason: 'Menghindari pemanfaatan fitur pencarian digital yang sudah tersedia.' }
        ]
      },
      {
        id: 3,
        category: 'Anotasi & Penanda Halaman Digital',
        title: 'Menandai Rumus Penting Tanpa Merusak Buku',
        story: 'Dewi menemukan rangkuman penting di e-book BSE. Temannya menyarankan untuk memotret layar (screenshot) puluhan kali sampai memori galeri ponselnya penuh.',
        question: 'Fitur aplikasi pembaca PDF manakah yang lebih rapi dan efektif digunakan?',
        options: [
          { text: 'Menggunakan fitur Highlight (stabilo digital warna) dan Bookmark (pembatas buku digital) pada aplikasi PDF', isCorrect: true, reason: 'Rapi dan teratur! Highlight dan bookmark tersimpan langsung di dalam dokumen tanpa membebani memori foto ponsel.' },
          { text: 'Mencoret-coret layar kaca HP menggunakan spidol permanen', isCorrect: false, reason: 'Sangat fatal! Spidol permanen akan merusak lapisan kaca layar sentuh ponsel.' },
          { text: 'Menghafalkan seluruh 200 halaman tanpa mencatat poin penting', isCorrect: false, reason: 'Daya ingat manusia terbatas, anotasi digital mempermudah mengingat kembali poin penting.' }
        ]
      },
      {
        id: 4,
        category: 'Efisiensi Penyimpanan Ponsel',
        title: 'Ukuran Berkas PDF E-Book Memenuhi Memori HP yang Terbatas',
        story: 'Memori internal ponsel Rian hampir penuh (tersisa 100 MB), sedangkan ia perlu menyimpan beberapa buku paket mata pelajaran untuk bahan belajar di rumah.',
        question: 'Strategi pengelolaan berkas digital manakah yang paling efisien?',
        options: [
          { text: 'Menyimpan berkas di Google Drive pribadi atau mengunduh versi per-bab yang ukurannya hanya beberapa megabyte', isCorrect: true, reason: 'Sangat cerdas! Cloud storage menghemat memori fisik ponsel dan tetap bisa dibaca saat dibutuhkan.' },
          { text: 'Menghapus aplikasi WhatsApp sekolah agar muat file buku besar', isCorrect: false, reason: 'Menghapus aplikasi komunikasi penting akan membuat siswa ketinggalan informasi kelas.' },
          { text: 'Membanting ponsel dan meminta dibelikan ponsel baru', isCorrect: false, reason: 'Bukan sikap siswa yang bijak dalam mengelola keterbatasan perangkat teknologi.' }
        ]
      }
    ]
  },

  'k7-gdoc': {
    bannerColor: 'bg-linear-to-r from-blue-700 via-sky-600 to-indigo-800',
    badgeText: 'Simulasi Aplikasi Pengolah Dokumen (Google Docs)',
    badgeTextColor: 'text-sky-200',
    title: 'Tantangan Kolaborasi Dokumen Bersama Google Docs',
    description: 'Pecahkan 4 kasus penyusunan naskah: kekacauan file revisi proposal, kolaborasi mengetik real-time, mode saran revisi, dan memulihkan tulisan terhapus lewat riwayat versi.',
    scenarios: [
      {
        id: 1,
        category: 'Manajemen Dokumen Tunggal (Cloud)',
        title: 'Kekacauan File Naskah Proposal Kemah Pramuka Regu Rajawali',
        story: 'Anggota regu Pramuka saling berkirim naskah proposal lewat WhatsApp. Hasilnya ada 5 file berbeda di grup: "Proposal_Final.docx", "Proposal_Revisi2.docx", "Proposal_Fix_Banget.docx". Mereka bingung mana yang paling baru.',
        question: 'Bagaimana solusi terbaik berbasis Google Docs agar tidak terjadi kekacauan versi berkas?',
        options: [
          { text: 'Membuat satu dokumen Google Docs di cloud, lalu membagikan tautan izin edit kepada seluruh anggota regu', isCorrect: true, reason: 'Tepat sekali! Google Docs bekerja pada satu berkas tunggal yang tersinkronisasi otomatis bagi seluruh anggota tim.' },
          { text: 'Membuat 10 file baru lagi dengan nama "Proposal_Paling_Baru_10.docx"', isCorrect: false, reason: 'Semakin memperparah kebingungan dan memperbanyak duplikasi data yang tidak sinkron.' },
          { text: 'Membatalkan kegiatan kemah Pramuka', isCorrect: false, reason: 'Solusi yang tidak relevan dengan pemecahan masalah dokumen digital.' }
        ]
      },
      {
        id: 2,
        category: 'Kolaborasi Real-Time Beretika',
        title: 'Dua Siswa Mengetik di Bagian Paragraf yang Sama Sekaligus',
        story: 'Saat mengerjakan tugas makalah sejarah komputer di Google Docs, kursor kawan satu kelompok bergerak menimpa kalimat yang sedang diketik Nando, sehingga ketikannya terganggu.',
        question: 'Bagaimana etika kerja kelompok digital yang baik di Google Docs?',
        options: [
          { text: 'Menyepakati pembagian bab tugas (misal: Nando mengetik Bab 1, kawan mengetik Bab 2) dan berkomunikasi lewat fitur Komentar', isCorrect: true, reason: 'Sangat tertib! Pembagian bab yang jelas mencegah tabrakan kursor dan mempercepat penyelesaian tugas.' },
          { text: 'Saling berebut menghapus ketikan teman agar kursornya menjauh', isCorrect: false, reason: 'Memicu pertengkaran antaranggota kelompok dan merusak naskah yang sudah dibuat.' },
          { text: 'Mengubah izin akses teman menjadi "Viewer" secara sepihak', isCorrect: false, reason: 'Tindakan egois yang bertentangan dengan prinsip kerja sama kelompok.' }
        ]
      },
      {
        id: 3,
        category: 'Fitur Mode Saran (Suggesting Mode)',
        title: 'Mengoreksi Kesalahan Ejaan Tugas Teman Tanpa Menyinggung',
        story: 'Farah membaca paragraf yang diketik temannya di Google Docs dan menemukan beberapa kata tidak baku serta kalimat yang kurang pas susunannya.',
        question: 'Fitur manakah di Google Docs yang paling tepat digunakan untuk mengusulkan perbaikan dengan sopan?',
        options: [
          { text: 'Mengaktifkan Mode Saran (Suggesting Mode) sehingga usulan revisi muncul sebagai coretan hijau yang dapat disetujui teman', isCorrect: true, reason: 'Hebat! Mode Saran memungkinkan rekan tim meninjau dan menerima perbaikan tanpa kehilangan ketikan aslinya.' },
          { text: 'Langsung menghapus seluruh ketikan teman dan menulis kalimat versi sendiri tanpa bicara', isCorrect: false, reason: 'Menyinggung perasaan teman dan tidak menghargai kontribusi anggota kelompok.' },
          { text: 'Menuliskan komentar bernada ejekan di media sosial', isCorrect: false, reason: 'Melanggar etika dan berpotensi menjadi perundungan siber (cyberbullying).' }
        ]
      },
      {
        id: 4,
        category: 'Riwayat Versi (Version History)',
        title: 'Tulisan Laporan Terhapus Tidak Sengaja Menjelang Dikumpulkan',
        story: 'Adik salah satu anggota kelompok tidak sengaja memencet tombol Backspace lama pada laptop kakaknya sehingga 2 bab laporan terhapus dan dokumen otomatis tersimpan ke cloud.',
        question: 'Bagaimana cara mengembalikan tulisan yang terhapus tersebut tanpa harus mengetik ulang dari awal?',
        options: [
          { text: 'Membuka menu Berkas &rarr; Riwayat Versi &rarr; Lihat Riwayat Versi, lalu memulihkan versi naskah 15 menit sebelumnya', isCorrect: true, reason: 'Penyelamat tugas! Google Docs merekam setiap detik perubahan dokumen, sehingga versi sebelumnya dapat dipulihkan kapan saja.' },
          { text: 'Mengetik ulang dari ingatan semalaman suntuk', isCorrect: false, reason: 'Melelahkan dan tidak memanfaatkan fitur keselamatan riwayat versi cloud.' },
          { text: 'Menyalahkan adik dan menolak mengumpulkan tugas', isCorrect: false, reason: 'Bukan sikap tanggung jawab seorang pelajar cerdas.' }
        ]
      }
    ]
  },

  'k7-gsheet': {
    bannerColor: 'bg-linear-to-r from-emerald-600 via-green-600 to-teal-700',
    badgeText: 'Simulasi Lembar Kerja Dasar (Google Spreadsheet)',
    badgeTextColor: 'text-emerald-200',
    title: 'Tantangan Kasir Cerdas: Spreadsheet Dasar Koperasi Sekolah',
    description: 'Pecahkan 4 kasus pengolahan lembar kerja: menghitung belanja ATK dengan =SUM(), mengatasi error #VALUE!, rumus menghitung absensi =COUNTA(), dan membetulkan teks terpotong ####.',
    scenarios: [
      {
        id: 1,
        category: 'Formula Penjumlahan Otomatis =SUM()',
        title: 'Menghitung Total Belanja ATK Kelas Menggunakan Spreadsheet',
        story: 'Bendahara kelas 7-B mencatat 15 item belanja perlengkapan mading di Google Sheets: kertas karton, spidol, lem, gunting, dll. Ia berniat menghitung total rupiah dengan kalkulator HP satu per satu.',
        question: 'Formula spreadsheet manakah yang paling cepat dan anti-salah untuk menghitung total belanja di sel D2 sampai D16?',
        options: [
          { text: 'Mengetik rumus =SUM(D2:D16) pada sel total', isCorrect: true, reason: 'Tepat sekali! Formula =SUM otomatis menjumlahkan seluruh rentang sel secara akurat dalam sekejap.' },
          { text: 'Mengetik manual =D2+D3+D4+D5... sampai D16 satu per satu dengan jari', isCorrect: false, reason: 'Kurang efisien dan sangat rentan terlewat salah satu nomor sel.' },
          { text: 'Menghitung dengan jari tangan lalu mengetik angka tebakan', isCorrect: false, reason: 'Bukan cara kerja pengolahan angka spreadsheet dan rawan kesalahan hitung.' }
        ]
      },
      {
        id: 2,
        category: 'Penyebab dan Solusi Error #VALUE!',
        title: 'Muncul Kode Error #VALUE! di Kolom Total Harga',
        story: 'Saat menghitung total harga di spreadsheet, sel tiba-tiba menampilkan tulisan merah error "#VALUE!". Setelah dicek, di dalam sel C5 tertulis "10 buah" (ada huruf di dalam angka kuantitas).',
        question: 'Mengapa error #VALUE! tersebut terjadi dan bagaimana cara membetulkannya?',
        options: [
          { text: 'Rumus matematika tidak bisa mengalikan teks dengan angka; ubah isi sel C5 menjadi angka murni "10" tanpa kata "buah"', isCorrect: true, reason: 'Pintar! Komputer spreadsheet hanya dapat melakukan operasi aritmatika pada sel berformat angka murni.' },
          { text: 'Mengganti layar monitor dengan monitor baru', isCorrect: false, reason: 'Monitor hanya menampilkan gambar, tidak berkaitan dengan logika tipe data angka spreadsheet.' },
          { text: 'Menghapus rumus dan tidak usah menghitung harga', isCorrect: false, reason: 'Menyerah tanpa memperbaiki akar kesalahan tipe data.' }
        ]
      },
      {
        id: 3,
        category: 'Formula Penghitung Siswa =COUNTA()',
        title: 'Mengetahui Jumlah Anggota Ekskul yang Hadir Pertemuan Pertama',
        story: 'Pembina ekskul memiliki daftar presensi di kolom C. Siswa yang hadir diberi tanda "HADIR", sedangkan yang absen dikosongkan. Pembina ingin tahu berapa total siswa yang datang hari itu.',
        question: 'Formula spreadsheet manakah yang tepat untuk menghitung sel yang terisi teks di rentang C2:C40?',
        options: [
          { text: '=COUNTA(C2:C40) untuk menghitung sel yang berisi teks atau data apa pun', isCorrect: true, reason: 'Luar biasa! COUNTA (Count All) berfungsi menghitung jumlah sel yang tidak kosong terisi teks.' },
          { text: '=SUM(C2:C40)', isCorrect: false, reason: 'SUM hanya untuk menjumlahkan angka numerik, bukan menghitung data teks hadir.' },
          { text: '=TODAY()', isCorrect: false, reason: 'TODAY() berfungsi menampilkan tanggal hari ini, bukan menghitung kehadiran.' }
        ]
      },
      {
        id: 4,
        category: 'Tampilan Kolom Tanda Pagar (#####)',
        title: 'Angka Rupiah di Kolom Neraca Berubah Menjadi Simbol "#####"',
        story: 'Setelah memasukkan angka kas kelas sebesar Rp15.000.000, sel di spreadsheet mendadak berubah menampilkan tanda pagar berderet "########" dan angkanya tidak terbaca.',
        question: 'Apa arti simbol tanda pagar tersebut dan bagaimana cara memunculkan kembali angkanya?',
        options: [
          { text: 'Lebar kolom kurang luas untuk menampilkan digit angka yang panjang; klik ganda (double-click) pada batas kanan huruf kolom untuk memperlebar', isCorrect: true, reason: 'Tepat sekali! Tanda ##### bukan kesalahan rumus, melainkan peringatan visual bahwa kolom terlalu sempit untuk memuat digit angka.' },
          { text: 'Komputer terkena virus dan file spreadsheet harus segera dihapus', isCorrect: false, reason: 'Bukan virus, itu murni masalah tampilan lebar kolom antarmuka.' },
          { text: 'Uang kas kelas hilang dicuri peretas', isCorrect: false, reason: 'Kesimpulan yang salah dan memicu kepanikan tanpa dasar.' }
        ]
      }
    ]
  },

  'k7-gslide': {
    bannerColor: 'bg-linear-to-r from-amber-600 via-orange-600 to-red-700',
    badgeText: 'Simulasi Presentasi Interaktif (Google Slides)',
    badgeTextColor: 'text-amber-200',
    title: 'Tantangan Desainer Slide: Presentasi Kelas yang Memukau',
    description: 'Pecahkan 4 kasus presentasi: slide mirip koran penuh teks (aturan 6x6), teks gelap di latar gelap (kontras), animasi berlebihan yang bikin pusing, dan manajemen durasi 10 menit.',
    scenarios: [
      {
        id: 1,
        category: 'Prinsip Desain Aturan 6x6',
        title: 'Slide Presentasi Kelompok IPS yang Isinya Tulisan Mirip Koran',
        story: 'Kelompok 1 membuat slide presentasi sejarah dengan menyalin 3 halaman buku paket utuh ke dalam 1 slide menggunakan font ukuran 10 poin. Saat ditampilkan di proyektor, tulisan sangat kecil dan kelas mengeluh tidak bisa membaca.',
        question: 'Bagaimana perbaikan desain terbaik sesuai aturan emas presentasi 6x6?',
        options: [
          { text: 'Meringkas materi menjadi poin-poin utama: maksimal 6 baris per slide dan 6 kata per baris dengan ukuran font besar (minimal 28 pt)', isCorrect: true, reason: 'Tepat sekali! Slide presentasi adalah alat bantu visual penonton untuk menangkap intisari, bukan naskah bacaan utuh.' },
          { text: 'Mengecilkan font menjadi 6 pt agar muat 5 halaman buku sekaligus', isCorrect: false, reason: 'Semakin tidak terbaca oleh siswa di barisan belakang kelas.' },
          { text: 'Mematikan proyektor dan tidak jadi presentasi', isCorrect: false, reason: 'Bukan solusi membangun untuk meningkatkan keterampilan komunikasi publik.' }
        ]
      },
      {
        id: 2,
        category: 'Kontras Warna Visual',
        title: 'Warna Tulisan Biru Tua di Atas Latar Belakang Hitam Gelap',
        story: 'Doni memilih tema slide bernuansa gelap (background hitam pekat), namun ia menggunakan warna tulisan biru tua dan abu-abu gelap. Guru di meja belakang kesulitan membaca judul slide.',
        question: 'Prinsip keterbacaan visual manakah yang dilanggar oleh Doni?',
        options: [
          { text: 'Prinsip Kontras Warna; teks gelap wajib menggunakan latar belakang terang (putih/kuning muda), atau sebaliknya teks putih di atas latar gelap', isCorrect: true, reason: 'Benar! Kontras tinggi antara teks dan latar belakang menjamin materi terbaca jelas dari sudut ruang kelas mana pun.' },
          { text: 'Doni melanggar aturan tata surya', isCorrect: false, reason: 'Tidak ada hubungannya dengan tata surya, ini murni prinsip desain grafis visual.' },
          { text: 'Warna gelap membuat komputer menjadi lebih hemat listrik 99%', isCorrect: false, reason: 'Meskipun hemat pada layar OLED, keterbacaan materi presentasi tetap prioritas utama.' }
        ]
      },
      {
        id: 3,
        category: 'Penggunaan Animasi & Efek Transisi',
        title: 'Animasi Teks Berputar-Putar dan Suara Tepuk Tangan di Tiap Kata',
        story: 'Siswa memasang efek animasi "Fly In", "Spin 360", dan suara kencang pada setiap huruf kalimat di slidenya. Saat presentasi, penonton tertawa karena pusing menunggu teks berhenti berputar.',
        question: 'Bagaimana etika penggunaan animasi slide presentasi yang profesional?',
        options: [
          { text: 'Gunakan animasi sederhana (seperti Fade / Muncul Halus) secara konsisten hanya pada poin penting tanpa efek suara berlebihan', isCorrect: true, reason: 'Hebat! Animasi bertujuan mengarahkan fokus perhatian penonton, bukan mendistraksi konsentrasi dari isi pesan.' },
          { text: 'Menambah 10 animasi ledakan petasan lagi agar semakin ramai', isCorrect: false, reason: 'Akan semakin mengacaukan konsentrasi penonton dan terkesan tidak profesional.' },
          { text: 'Menghilangkan semua gambar dan menggantinya dengan video musik', isCorrect: false, reason: 'Mengalihkan esensi tugas presentasi ilmiah.' }
        ]
      },
      {
        id: 4,
        category: 'Manajemen Waktu Presentasi Tim',
        title: 'Waktu Presentasi 10 Menit untuk 4 Anggota Kelompok',
        story: 'Guru memberi batas waktu maksimal 10 menit untuk tiap kelompok mempresentasikan tugas di depan kelas. Pembicara pertama berbicara terlalu lama menghabiskan 8 menit pertama.',
        question: 'Strategi pembagian waktu manakah yang menjamin presentasi adil dan tuntas tepat waktu?',
        options: [
          { text: 'Menyepakati alokasi waktu: 2 menit per anggota kelompok untuk bagian masing-masing dan 2 menit terakhir untuk sesi tanya jawab', isCorrect: true, reason: 'Sangat terencana! Pembagian waktu yang proporsional melatih kerja sama tim dan kedisiplinan durasi panggung.' },
          { text: 'Membiarkan anggota terakhir tidak berbicara sama sekali', isCorrect: false, reason: 'Tidak adil bagi anggota lain yang juga ingin dinilai kemampuan berbicaranya oleh guru.' },
          { text: 'Berbicara secepat kilat seperti bernyanyi rap tanpa ada jeda napas', isCorrect: false, reason: 'Penonton tidak akan memahami isi penjelasan karena tempo berbicara terlalu cepat.' }
        ]
      }
    ]
  },

  // ==========================================
  // KELAS 8
  // ==========================================
  'k8-koneksi': {
    bannerColor: 'bg-linear-to-r from-blue-600 via-sky-600 to-cyan-700',
    badgeText: 'Simulasi Koneksi Nirkabel (Bluetooth & Wi-Fi)',
    badgeTextColor: 'text-sky-200',
    title: 'Tantangan Arsitek Koneksi Nirkabel & Kabel Sekolah',
    description: 'Pecahkan 4 kasus koneksi nirkabel: mengirim file video 1,5 GB (Bluetooth vs USB-C), interferensi sinyal TWS 2.4 GHz di lab, screen mirroring nirkabel ke IFP, dan tethering hotspot hemat kuota.',
    scenarios: [
      {
        id: 1,
        category: 'Pemilihan Media Transmisi Data',
        title: 'Kirim Video Tugas Seni Budaya 1,5 GB di Pojok Kantin Sekolah',
        story: 'Kelompok tari ingin memindahkan berkas rekaman video berukuran 1,5 GB dari ponsel Rian ke laptop kelompok. Seseorang menyarankan untuk mengirimnya via Bluetooth.',
        question: 'Mengapa menggunakan Bluetooth untuk mengirim berkas 1,5 GB adalah keputusan yang kurang tepat, dan apa solusi terbaiknya?',
        options: [
          { text: 'Kecepatan Bluetooth sangat lambat (~2 Mbps) sehingga memakan waktu berjam-jam; gunakan kabel data USB-C atau Wi-Fi Direct / Google Drive', isCorrect: true, reason: 'Tepat sekali! Bluetooth dirancang untuk transmisi data kecil berdaya rendah, bukan untuk memindahkan file raksasa gigabyte.' },
          { text: 'Bluetooth hanya bisa mengirim berkas foto hitam putih saja', isCorrect: false, reason: 'Bluetooth bisa mengirim berbagai jenis file, namun batasannya ada pada kecepatan transfernya.' },
          { text: 'Memotong video menjadi 1000 potongan kecil', isCorrect: false, reason: 'Sangat merepotkan dan merusak keutuhan file video tugas.' }
        ]
      },
      {
        id: 2,
        category: 'Interferensi Frekuensi 2.4 GHz',
        title: 'Earphone TWS Bluetooth Putus-Putus Saat Masuk ke Lab Komputer',
        story: 'Faris mendengarkan instruksi audio lewat earphone Bluetooth (TWS). Begitu masuk ke lab komputer yang dipenuhi 32 PC aktif dan router Wi-Fi, suaranya mendadak putus-putus dan tersendat.',
        question: 'Fenomena jaringan apakah yang sedang dialami oleh perangkat Bluetooth Faris?',
        options: [
          { text: 'Interferensi sinyal frekuensi radio; Bluetooth dan Wi-Fi sama-sama beroperasi di frekuensi 2.4 GHz yang padat di ruangan tertutup', isCorrect: true, reason: 'Luar biasa! Frekuensi 2.4 GHz yang dipakai puluhan perangkat sekaligus akan saling bertubrukan (interferensi) dan menurunkan kualitas sinyal.' },
          { text: 'Baterai earphone meledak secara kasat mata', isCorrect: false, reason: 'Jika baterai meledak perangkat akan mati permanen, bukan sekadar putus-putus sesaat.' },
          { text: 'Monitor komputer menyedot gelombang suara menjadi gambar', isCorrect: false, reason: 'Penjelasan yang tidak ilmiah dan bertentangan dengan prinsip transmisi gelombang radio.' }
        ]
      },
      {
        id: 3,
        category: 'Proyeksi Nirkabel (Screen Mirroring)',
        title: 'Presentasi Proyek dari Layar Ponsel ke Layar Sentuh IFP Tanpa Kabel',
        story: 'Siswa kelas 8 ingin menampilkan simulasi aplikasi di layar ponselnya agar dapat dilihat seluruh teman sekelas di Layar Sentuh Interaktif (IFP) tanpa mencolok kabel HDMI.',
        question: 'Teknologi koneksi nirkabel manakah yang memungkinkan proyeksi layar secara mulus?',
        options: [
          { text: 'Menghubungkan ponsel dan IFP ke jaringan Wi-Fi lokal yang sama lalu mengaktifkan fitur Screen Mirroring (Transmisikan Layar)', isCorrect: true, reason: 'Sangat praktis! Screen Mirroring berbasis Wi-Fi mentransmisikan audio dan video berkecepatan tinggi tanpa hambatan kabel.' },
          { text: 'Mendekatkan layar HP ke kaca IFP dan menggosoknya', isCorrect: false, reason: 'Tindakan konyol yang tidak mentransmisikan data digital apa pun.' },
          { text: 'Menggunakan kabel benang jahit', isCorrect: false, reason: 'Benang bukan konduktor sinyal digital.' }
        ]
      },
      {
        id: 4,
        category: 'Keamanan Tethering Hotspot',
        title: 'Tethering Hotspot Ponsel di Kelas Cepat Panas dan Kuota Habis',
        story: 'Aldi menyalakan Hotspot Pribadi di ponselnya tanpa kata sandi (Open Network) untuk membantu satu temannya. Lima menit kemudian ponselnya sangat panas dan kuota 2 GB ludes seketika.',
        question: 'Kesalahan konfigurasi apa yang dilakukan Aldi dan bagaimana pencegahannya?',
        options: [
          { text: 'Menyalakan hotspot tanpa password sehingga puluhan siswa lain di sekitar otomatis ikut tersambung dan mengunduh video; pasang password WPA2/WPA3 dan batasi maksimal perangkat tersambung', isCorrect: true, reason: 'Pintar! Jaringan nirkabel tanpa enkripsi sandi akan diserbu perangkat sekitar dan menguras kuota dalam sekejap.' },
          { text: 'Lupa merendam ponsel ke dalam mangkok air saat menyalakan hotspot', isCorrect: false, reason: 'Merendam ponsel ke air akan memicu korsleting komponen elektronik internal.' },
          { text: 'Provider internet sengaja mengambil kuota tanpa sebab', isCorrect: false, reason: 'Penyebab utamanya adalah kelalaian pengguna membiarkan jaringan terbuka tanpa proteksi sandi.' }
        ]
      }
    ]
  },

  'k8-fakta-hoaks': {
    bannerColor: 'bg-linear-to-r from-rose-600 via-red-600 to-amber-700',
    badgeText: 'Simulasi Analisis Fakta vs Hoaks',
    badgeTextColor: 'text-rose-200',
    title: 'Tantangan Detektif Fakta: Cek Fakta vs Hoaks Media Sosial',
    description: 'Pecahkan 4 kasus misinformasi: rekaman suara WhatsApp bencana alam tanpa sumber, foto banjir palsu verifikasi Google Lens, membedakan fakta vs opini, dan saring sebelum sharing.',
    scenarios: [
      {
        id: 1,
        category: 'Cek Sumber Suara Berantai',
        title: 'Pesan Suara WhatsApp "Gempa Susulan Dahsyat Nanti Malam"',
        story: 'Beredar rekaman suara seorang pria panik di grup WhatsApp keluarga: "Tolong sebarkan! BMKG memprediksi nanti malam pukul 23.00 akan terjadi gempa berkekuatan 9 SR di Cilacap, semua warga harus keluar rumah!".',
        question: 'Bagaimana analisis detektif fakta yang tepat terhadap pesan suara tersebut?',
        options: [
          { text: 'Hoaks berbahaya; BMKG resmi telah menegaskan bahwa gempa bumi sampai saat ini TIDAK PERNAH bisa diprediksi secara pasti hari, jam, dan menitnya oleh teknologi mana pun di dunia', isCorrect: true, reason: 'Tepat sekali! Setiap pesan yang mengklaim gempa bisa diprediksi jamnya secara akurat dipastikan 100% hoaks.' },
          { text: 'Segera menyewa tenda dan mengungsi ke atas bukit sekarang juga', isCorrect: false, reason: 'Kepanikan tanpa konfirmasi ilmiah yang merugikan aktivitas keluarga.' },
          { text: 'Meneruskan rekaman suara ke 50 grup WhatsApp lainnya', isCorrect: false, reason: 'Ikut menjadi penyebar kepanikan palsu dan melanggar etika bermasyarakat.' }
        ]
      },
      {
        id: 2,
        category: 'Verifikasi Gambar Terbalik (Reverse Image Search)',
        title: 'Foto Banjir Bandang Viral yang Mengklaim Terjadi di Kroya',
        story: 'Sebuah akun Instagram memposting foto mobil hanyut tersapu banjir bandang dengan narasi: "Kroya tenggelam hari ini!". Padahal di luar jendela kelas cuaca sedang cerah berawan.',
        question: 'Teknik investigasi digital manakah yang dapat membongkar asal-usul asli foto tersebut?',
        options: [
          { text: 'Mengunggah foto tersebut ke Google Lens / Reverse Image Search untuk melacak tanggal dan lokasi pertama kali foto tersebut diunggah di internet', isCorrect: true, reason: 'Luar biasa! Pencarian gambar terbalik akan mengungkap bahwa foto tersebut adalah peristiwa banjir di luar negeri tahun 2018 yang dipakai kembali.' },
          { text: 'Membeli ban renang dan memakainya di dalam kelas', isCorrect: false, reason: 'Reaksi berlebihan yang tidak memeriksa fakta di lapangan.' },
          { text: 'Memberikan komentar kemarahan tanpa mengecek kebenaran', isCorrect: false, reason: 'Tidak menyelesaikan masalah dan memperkeruh ruang publik virtual.' }
        ]
      },
      {
        id: 3,
        category: 'Membedakan Fakta Objektif vs Opini Subjektif',
        title: 'Menganalisis Review Gadget dari Influencer Media Sosial',
        story: 'Siswa membaca dua kalimat berikut: Kalimat A: "Laptop ini memiliki RAM 8GB dan baterai 5000 mAh." Kalimat B: "Laptop ini adalah laptop paling keren dan terbaik di seluruh dunia sepanjang masa."',
        question: 'Klasifikasi yang benar untuk kedua kalimat di atas adalah...',
        options: [
          { text: 'Kalimat A adalah Fakta Objektif (dapat diukur dan dibuktikan kebenarannya), sedangkan Kalimat B adalah Opini Subjektif (pendapat pribadi yang relatif)', isCorrect: true, reason: 'Pintar! Fakta memuat data angka spesifik yang dapat diverifikasi, sementara opini memuat kata sifat subjektif seperti paling keren/terbaik.' },
          { text: 'Kedua kalimat adalah hoaks yang dibuat oleh pabrik laptop', isCorrect: false, reason: 'Spesifikasi teknis pada kalimat A adalah data resmi yang nyata.' },
          { text: 'Kalimat B adalah hukum alam yang tidak terbantahkan', isCorrect: false, reason: 'Selera desain dan anggapan paling keren bersifat relatif bagi tiap orang.' }
        ]
      },
      {
        id: 4,
        category: 'Prinsip Saring Sebelum Sharing',
        title: 'Langkah Awal Saat Menerima Informasi Menghebohkan',
        story: 'Tio menerima kabar heboh yang membuatnya kaget dan cemas. Jari telunjuknya sudah berada di atas tombol "Forward / Teruskan".',
        question: 'Prosedur etika digital apakah yang wajib dilakukan Tio sebelum menekan tombol bagikan?',
        options: [
          { text: 'Berhenti sejenak, tenangkan emosi, cek kebenaran sumber ke situs resmi atau CekFakta.com, dan pikirkan apakah bermanfaat (Saring Sebelum Sharing)', isCorrect: true, reason: 'Sangat bijak! Pengendalian diri sebelum membagikan informasi memutus mata rantai peredaran kabar palsu di masyarakat.' },
          { text: 'Langsung membagikan secepat mungkin agar menjadi orang pertama yang viral di grup', isCorrect: false, reason: 'Mengejar kecepatan tanpa mempedulikan kebenaran adalah pintu utama tersebarnya fitnah dan hoaks.' },
          { text: 'Menghapus aplikasi perpesanan selamanya', isCorrect: false, reason: 'Solusi ekstrem yang menghentikan komunikasi yang produktif.' }
        ]
      }
    ]
  },

  'k8-jaringan': {
    bannerColor: 'bg-linear-to-r from-indigo-700 via-blue-600 to-sky-700',
    badgeText: 'Simulasi Jaringan Komputer & Topologi Star',
    badgeTextColor: 'text-indigo-200',
    title: 'Tantangan Teknisi Jaringan: Troubleshooting Lab Komputer',
    description: 'Pecahkan 4 kasus jaringan komputer lab: PC Siswa 05 gagal ujian ANBK (kabel RJ45), printer bersama tidak terdeteksi, kabel putus pada topologi Star, dan uji PING terminal.',
    scenarios: [
      {
        id: 1,
        category: 'Troubleshooting Fisik Kabel UTP & Konektor RJ45',
        title: 'Komputer Siswa 05 Tidak Bisa ANBK Padahal 29 PC Lain Lancar',
        story: 'Saat gladi bersih Asesmen Nasional (ANBK) di lab komputer, PC Siswa 05 mendadak bertanda silang merah pada ikon jaringannya dan tidak dapat memuat halaman soal, sementara 29 komputer lainnya normal.',
        question: 'Pemeriksaan fisik pertama manakah yang paling tepat dilakukan teknisi lab sesuai konsep jaringan kabel?',
        options: [
          { text: 'Memeriksa apakah klip konektor RJ45 kabel LAN di belakang casing PC Siswa 05 tertancap kencang dan lampu indikator hijau/oranye menyala berkedip', isCorrect: true, reason: 'Tepat sekali! Pada topologi Star kabel dedicated, masalah pada 1 komputer hampir selalu disebabkan kabel lokal yang kendor atau terlepas.' },
          { text: 'Mematikan gardu listrik PLN seluruh kecamatan Kroya', isCorrect: false, reason: 'Tindakan salah fatal yang merugikan masyarakat dan tidak berkaitan dengan kabel PC 05.' },
          { text: 'Membongkar switch konsentrator pusat', isCorrect: false, reason: 'Switch utama berfungsi normal karena 29 komputer lain tetap lancar berinternet.' }
        ]
      },
      {
        id: 2,
        category: 'Konfigurasi Jaringan & Sharing Printer',
        title: 'Printer Bersama di Lab Tidak Bisa Diakses oleh PC Siswa',
        story: 'Laboratorium komputer memiliki 1 printer warna yang terhubung ke PC Server (IP: 192.168.1.20). Siswa dari PC 10 ingin mencetak tugas portofolio tetapi printer tidak muncul di pilihan cetak.',
        question: 'Langkah konfigurasi jaringan manakah yang harus dipastikan aktif?',
        options: [
          { text: 'Memastikan fitur File & Printer Sharing aktif di PC Server dan PC 10 berada dalam satu subnet jaringan lokal (192.168.1.x)', isCorrect: true, reason: 'Luar biasa! Berbagi pakai printer membutuhkan izin sharing aktif dan alamat IP berada dalam kelompok subnet yang sama.' },
          { text: 'Mengangkat printer dan mengikatnya ke atas atap laboratorium', isCorrect: false, reason: 'Bukan tindakan teknis dan membahayakan keselamatan printer dari jatuh.' },
          { text: 'Memotong kabel printer menggunakan gunting', isCorrect: false, reason: 'Merusak fasilitas sekolah dan menyebabkan printer rusak total.' }
        ]
      },
      {
        id: 3,
        category: 'Karakteristik Topologi Star (Bintang)',
        title: 'Kabel LAN PC Nomor 8 Putus Terinjak Kursi Roda',
        story: 'Kabel UTP yang menghubungkan PC nomor 8 ke Switch pusat terkelupas dan putus akibat terjepit roda kursi lab. Siswa di meja sebelah panik mengira komputernya akan ikut mati.',
        question: 'Berdasarkan keunggulan arsitektur Topologi Star, apa yang sebenarnya terjadi pada komputer siswa lainnya?',
        options: [
          { text: 'Komputer lain tetap menyala dan terhubung ke internet dengan normal, karena setiap komputer memiliki jalur kabel independen ke switch pusat', isCorrect: true, reason: 'Pintar! Keunggulan utama topologi Star adalah isolasi kesalahan: kerusakan pada satu kabel node tidak mempengaruhi komputer lain.' },
          { text: 'Seluruh 32 komputer seketika meledak bersamaan', isCorrect: false, reason: 'Kabel LAN bervoltase rendah (~2 volt), tidak akan meledakkan sistem komputer.' },
          { text: 'Semua file tugas di seluruh komputer otomatis terhapus', isCorrect: false, reason: 'File tersimpan di media penyimpanan lokal/server, tidak terhapus oleh putusnya kabel jaringan.' }
        ]
      },
      {
        id: 4,
        category: 'Uji Konektivitas Utilitas PING',
        title: 'Menguji Sinyal Gateway Menggunakan Perintah PING di Terminal',
        story: 'Teknisi lab membuka Command Prompt (CMD) lalu mengetik perintah "ping 192.168.1.1" (alamat router sekolah) dan muncul balasan: "Reply from 192.168.1.1: bytes=32 time=2ms TTL=64".',
        question: 'Arti dari hasil balasan perintah PING tersebut adalah...',
        options: [
          { text: 'Koneksi antara komputer siswa ke router gateway terhubung sangat baik dan cepat (waktu respons hanya 2 milidetik tanpa data hilang)', isCorrect: true, reason: 'Sangat tepat! Status "Reply from" menandakan paket data berhasil terkirim dan dibalas balik oleh router dengan latensi sangat rendah.' },
          { text: 'Router dalam keadaan mati dan menolak berbicara dengan komputer', isCorrect: false, reason: 'Jika router mati, balasannya adalah "Request timed out" atau "Destination host unreachable".' },
          { text: 'Komputer sedang mengirim 64 virus ke internet', isCorrect: false, reason: 'TTL (Time to Live) 64 adalah batas lompatan paket data IP, bukan jumlah virus.' }
        ]
      }
    ]
  },

  'k8-excel': {
    bannerColor: 'bg-linear-to-r from-emerald-700 via-teal-600 to-green-700',
    badgeText: 'Simulasi Formula Spreadsheet Lanjutan',
    badgeTextColor: 'text-emerald-200',
    title: 'Tantangan Formula Master: Pengolah Rapor & Keuangan Sekolah',
    description: 'Pecahkan 4 kasus rumus lanjutan: menentukan kelulusan KKM dengan =IF(), pencarian otomatis identitas dengan =VLOOKUP(), kunci absolut sel pajak $C$1, dan statistik =MAX() & =MIN().',
    scenarios: [
      {
        id: 1,
        category: 'Logika Percabangan =IF()',
        title: 'Otomatisasi Penentuan Kelulusan Siswa Berdasarkan KKM 75',
        story: 'Guru wali kelas ingin agar kolom Status pada lembar penilaian rapor otomatis menuliskan "LULUS" jika nilai siswa di sel E2 mencapai 75 atau lebih, dan "REMIDI" jika di bawah 75.',
        question: 'Penulisan rumus formula logika manakah yang paling tepat?',
        options: [
          { text: '=IF(E2>=75; "LULUS"; "REMIDI")', isCorrect: true, reason: 'Tepat sekali! Struktur IF memeriksa kondisi logika: jika benar mengembalikan "LULUS", jika salah mengembalikan "REMIDI".' },
          { text: '=IF(E2=LULUS; 75; REMIDI)', isCorrect: false, reason: 'Sintaksis terbalik dan teks string wajib diapit oleh tanda petik ganda.' },
          { text: '=SUM(E2; 75)', isCorrect: false, reason: 'SUM adalah rumus penjumlahan angka, bukan pengambil keputusan logika bersyarat.' }
        ]
      },
      {
        id: 2,
        category: 'Pencarian Vertikal =VLOOKUP()',
        title: 'Menarik Nama Lengkap Siswa Otomatis Berdasarkan NISN',
        story: 'Petugas tata usaha memiliki tabel induk siswa berisi ribuan data di sheet "Database". Saat mengetik NISN siswa di sel A2, petugas ingin nama siswa di sel B2 muncul secara otomatis.',
        question: 'Formula pencarian vertikal manakah yang wajib digunakan?',
        options: [
          { text: '=VLOOKUP(A2; Database!A2:D500; 2; FALSE)', isCorrect: true, reason: 'Luar biasa! VLOOKUP mencari nilai kunci di kolom pertama tabel lalu mengambil data nama di kolom ke-2 secara presisi (FALSE).' },
          { text: '=AVERAGE(A2:D500)', isCorrect: false, reason: 'AVERAGE untuk mencari rata-rata nilai, bukan mencari data nama berdasarkan kode unik.' },
          { text: '=LOOKUP_GURU_DATANG()', isCorrect: false, reason: 'Bukan nama fungsi standar di aplikasi spreadsheet mana pun.' }
        ]
      },
      {
        id: 3,
        category: 'Penguncian Alamat Sel Absolut ($)',
        title: 'Mengunci Sel Persentase Potongan Belanja ($C$1) Saat Rumus Dicopy',
        story: 'Siswa menghitung potongan diskon koperasi sekolah. Sel C1 berisi angka diskon 10%. Saat rumus di sel D2 disalin (copy-paste) ke bawah sampai D20, hasil perhitungannya menjadi nol dan error.',
        question: 'Mengapa rumus tersebut menjadi error saat disalin ke bawah dan apa perbaikannya?',
        options: [
          { text: 'Alamat sel C1 ikut bergeser menjadi C2, C3, dst; kunci sel tersebut menggunakan tanda dollar ($C$1) agar posisinya tetap absolut saat disalin', isCorrect: true, reason: 'Pintar sekali! Kunci referensi absolut ($) mencegah sel berubah saat rumus didrag/disalin ke baris lain.' },
          { text: 'Diskon 10% dilarang oleh aturan matematika', isCorrect: false, reason: 'Bukan masalah matematika, melainkan konsep referensi relatif vs absolut sel.' },
          { text: 'Komputer kehabisan tinta printer', isCorrect: false, reason: 'Tinta printer tidak mempengaruhi logika kalkulasi sel spreadsheet.' }
        ]
      },
      {
        id: 4,
        category: 'Statistik Deskriptif =MAX() dan =MIN()',
        title: 'Mencari Nilai Tertinggi dan Terendah Ujian Informatika Satu Angkatan',
        story: 'Guru ingin mengetahui berapa nilai tertinggi yang diraih siswa dan berapa nilai terendah di kelas dari daftar 32 siswa di rentang nilai sel G2 sampai G33.',
        question: 'Pasangan formula statistik manakah yang paling tepat digunakan?',
        options: [
          { text: '=MAX(G2:G33) untuk nilai tertinggi dan =MIN(G2:G33) untuk nilai terendah', isCorrect: true, reason: 'Sangat tepat! MAX mengambil nilai numerik maksimum, sedangkan MIN mengambil nilai terkecil dari suatu rentang sel.' },
          { text: '=TOP() dan =BOTTOM()', isCorrect: false, reason: 'Nama fungsi tersebut bukan formula baku spreadsheet.' },
          { text: '=COUNT() dan =COUNTA()', isCorrect: false, reason: 'Fungsi tersebut untuk menghitung jumlah banyak sel terisi, bukan mencari nilai ekstrim.' }
        ]
      }
    ]
  },

  'k8-digital-etika': {
    bannerColor: 'bg-linear-to-r from-purple-700 via-indigo-600 to-sky-700',
    badgeText: 'Simulasi Etika Komunikasi Digital (Netiket)',
    badgeTextColor: 'text-purple-200',
    title: 'Tantangan Netiket Remaja: Berkomunikasi Santun di Era Medsos',
    description: 'Pecahkan 4 kasus etika komunikasi: mengirim chat "P" larut malam ke guru, membuat stiker meme ejekan teman tidur, mengetik HURUF KAPITAL SEMUA di grup kelas, dan menyelesaikan konflik chat.',
    scenarios: [
      {
        id: 1,
        category: 'Etika Menghubungi Guru & Jam Istirahat',
        title: 'Mengirim Chat "P" Sepuluh Kali Jam 23.00 ke Wali Kelas',
        story: 'Irfan panik belum mengetahui kelompok tugasnya. Pukul 23.00 malam, ia mengirimkan pesan huruf "P" sepuluh kali berturut-turut ke nomor WhatsApp pribadi ibu wali kelasnya.',
        question: 'Berdasarkan etika netiket komunikasi dengan guru, apa kesalahan Irfan dan bagaimana perbaikannya?',
        options: [
          { text: 'Sangat tidak sopan; hubungi guru pada jam kerja wajar (pagi-sore), awali dengan salam santun, sebutkan nama dan kelas, lalu sampaikan pertanyaan dengan bahasa yang baik', isCorrect: true, reason: 'Tepat sekali! Menghubungi guru larut malam tanpa salam mengganggu waktu istirahat dan melanggar sopan santun peserta didik.' },
          { text: 'Irfan sudah benar karena huruf P berarti Penting', isCorrect: false, reason: 'Huruf "P" dianggap tidak beretika, tidak sopan, dan mencerminkan ketidaksabaran kasar.' },
          { text: 'Sebaiknya Irfan menelepon guru berkali-kali sampai diangkat jam 02.00 dini hari', isCorrect: false, reason: 'Semakin melanggar privasi dan waktu istirahat pendidik.' }
        ]
      },
      {
        id: 2,
        category: 'Privasi & Hak Potret Teman',
        title: 'Membuat Stiker Meme Wajah Teman yang Tertidur di Kelas',
        story: 'Secara diam-diam, seorang siswa memotret temannya yang sedang mengantuk dan menganga di meja kelas. Ia lalu menjadikannya stiker WhatsApp lucu dan disebarkan ke grup angkatan sampai temannya menangis malu.',
        question: 'Bagaimana tinjauan etika digital dan hukum privasi terhadap tindakan tersebut?',
        options: [
          { text: 'Pelanggaran etika dan privasi serius (mengarah ke perundungan siber); dilarang memotret dan menyebarkan foto orang lain tanpa izin tertulis yang bersangkutan', isCorrect: true, reason: 'Luar biasa! Menjadikan aib fisik teman sebagai bahan tertawaan publik dapat merusak mental korban dan melanggar UU ITE / PDP.' },
          { text: 'Boleh dilakukan asalkan stikernya diberi tulisan teks lucu', isCorrect: false, reason: 'Teks lucu tidak menghapus fakta bahwa foto tersebut diambil tanpa izin dan mempermalukan teman.' },
          { text: 'Salah teman sendiri mengapa ia tertidur di kelas', isCorrect: false, reason: 'Menyalahkan korban (victim blaming) adalah pola pikir keliru dalam etika bermasyarakat.' }
        ]
      },
      {
        id: 3,
        category: 'Nada Bicara Teks (Tone of Voice)',
        title: 'Mengetik Chat dengan HURUF KAPITAL SEMUA di Grup Kelas',
        story: 'Saat berdiskusi tentang tugas kelompok, Doni mengetik pesan: "KENAPA SEMUA TIDAK MAU MENGERJAKAN TUGAS INI SAMA-SAMA!". Teman-teman di grup merasa tersinggung dan suasana menjadi tegang.',
        question: 'Dalam konvensi etika digital (netiket), apa arti psikologis dari penggunaan huruf kapital semua?',
        options: [
          { text: 'Huruf kapital semua diartikan sebagai ekspresi membentak, berteriak dengan emosi marah, atau nada bicara kasar; gunakan huruf kapital hanya di awal kalimat', isCorrect: true, reason: 'Pintar! Tanpa tatap muka langsung, huruf kapital penuh dipersepsikan sebagai teriakan kemarahan yang memicu pertikaian.' },
          { text: 'Huruf kapital semua berarti pengirim pesan sedang bernyanyi gembira', isCorrect: false, reason: 'Konvensi netiket internasional menyepakati all-caps sebagai indikasi teriakan atau amarah.' },
          { text: 'Huruf kapital membuat baterai ponsel teman cepat habis', isCorrect: false, reason: 'Ukuran huruf tidak berpengaruh pada daya konsumsi baterai ponsel penerima.' }
        ]
      },
      {
        id: 4,
        category: 'Penyelesaian Konflik Komunikasi',
        title: 'Sindir-Sindiran Status di Media Sosial Antarteman Sekelas',
        story: 'Terjadi salah paham antara Rani dan Siti saat latihan pentas seni. Malam harinya, keduanya saling menyindir menggunakan kalimat pedas di Status WhatsApp dan Instagram Story yang bisa dibaca seluruh sekolah.',
        question: 'Bagaimana solusi bijak untuk menyelesaikan perselisihan komunikasi tersebut?',
        options: [
          { text: 'Hentikan membuat status sindiran di ruang publik, lalu bicarakan dan selesaikan masalah secara dewasa melalui komunikasi pribadi langsung atau bantuan guru BK/wali kelas', isCorrect: true, reason: 'Sangat dewasa! Mengumbar perselisihan di ruang publik hanya mempermalukan diri sendiri dan memperkeruh suasana kelas.' },
          { text: 'Membuat siaran langsung (live streaming) perkelahian di TikTok', isCorrect: false, reason: 'Tindakan memalukan yang merusak nama baik sekolah dan berpotensi sanksi disiplin berat.' },
          { text: 'Mengajak geng teman sekelas untuk ikut memusuhi salah satu pihak', isCorrect: false, reason: 'Menciptakan kubu perpecahan dan merusak kekompakan lingkungan belajar.' }
        ]
      }
    ]
  },

  // ==========================================
  // KELAS 9
  // ==========================================
  'k9-pemrograman': {
    bannerColor: 'bg-linear-to-r from-indigo-700 via-purple-600 to-pink-700',
    badgeText: 'Simulasi Pemrograman Visual & Algoritma',
    badgeTextColor: 'text-indigo-200',
    title: 'Tantangan Programmer Muda: Logika Labirin & Robot Sekolah',
    description: 'Pecahkan 4 kasus pemrograman: robot labirin nabrak tembok (sekuensial terbalik), lampu penyeberangan jalan (percabangan IF-ELSE), menyapu lapangan (looping FOR), dan mengatasi infinite loop.',
    scenarios: [
      {
        id: 1,
        category: 'Struktur Logika Sekuensial (Urutan)',
        title: 'Robot Labirin Menabrak Tembok Karena Urutan Instruksi Terbalik',
        story: 'Siswa memprogram robot labirin di Blockly/Scratch. Di depannya ada jurang lalu belokan kanan. Siswa menyusun balok: 1. Belok Kanan &rarr; 2. Maju 3 Langkah. Akibatnya robot langsung menabrak dinding sebelum belokan.',
        question: 'Mengapa kesalahan eksekusi program tersebut terjadi?',
        options: [
          { text: 'Program komputer berjalan sekuensial (baris per baris dari atas ke bawah); urutan yang benar adalah Maju 3 Langkah terlebih dahulu, baru Belok Kanan', isCorrect: true, reason: 'Tepat sekali! Komputer tidak bisa menebak niat manusia; instruksi harus disusun runut sesuai kronologi fisik gerakan.' },
          { text: 'Robot sengaja memberontak karena lelah belajar coding', isCorrect: false, reason: 'Robot dan program hanyalah mesin eksekutor kode tanpa kehendak bebas.' },
          { text: 'Layar monitor dipasang terbalik oleh teknisi', isCorrect: false, reason: 'Kesalahan murni pada logika urutan kode pemrograman yang disusun siswa.' }
        ]
      },
      {
        id: 2,
        category: 'Struktur Logika Percabangan (IF-ELSE)',
        title: 'Pemrograman Lampu Penyeberangan Jalan Otomatis Depan Sekolah',
        story: 'OSIS merancang simulasi lampu penyeberangan zebra cross pintar untuk keselamatan siswa SMPN 5 Kroya yang menyeberang jalan raya.',
        question: 'Bagaimana struktur logika percabangan IF-ELSE yang benar untuk lampu penyeberangan tersebut?',
        options: [
          { text: 'JIKA tombol ditekan pejalan kaki MAKA ubah lampu kendaraan menjadi MERAH dan lampu pejalan kaki HIJAU; JIKA TIDAK MAKA lampu kendaraan tetap HIJAU', isCorrect: true, reason: 'Luar biasa! Percabangan IF-ELSE mengevaluasi kondisi sensor/tombol untuk menentukan aksi keamanan yang tepat.' },
          { text: 'JIKA hari hujan MAKA matikan semua lampu listrik di jalan raya', isCorrect: false, reason: 'Mematikan lampu saat hujan lebat justru membahayakan penyeberang jalan.' },
          { text: 'Selalu menyalakan lampu merah dan hijau secara bersamaan sepanjang hari', isCorrect: false, reason: 'Menimbulkan kebingungan fatal bagi pengemudi kendaraan.' }
        ]
      },
      {
        id: 3,
        category: 'Struktur Perulangan (Looping FOR/WHILE)',
        title: 'Robot Pembersih Lantai Menyapu Lapangan Upacara Sepanjang 50 Meter',
        story: 'Siswa ingin membuat robot pembersih bergerak maju 1 meter lalu menyapu, berulang kali sebanyak 50 kali di lapangan sekolah. Seorang teman menyarankan mengetik balok "Maju dan Sapu" sebanyak 50 balok bertumpuk ke bawah.',
        question: 'Metode pemrograman cerdas manakah yang paling ringkas dan efisien?',
        options: [
          { text: 'Menggunakan blok perulangan Loop: "ULANGI 50 KALI: [Maju 1 meter &rarr; Sapu lantai]" yang hanya membutuhkan 3 baris kode', isCorrect: true, reason: 'Pintar sekali! Perulangan (looping) menghemat ratusan baris kode dan mencegah kelelahan menyalin perintah yang sama.' },
          { text: 'Mengetik salin-tempel 500 balok sampai aplikasi scratch macet', isCorrect: false, reason: 'Sangat tidak efisien, membuang memori, dan menyulitkan proses koreksi jika ada perubahan.' },
          { text: 'Mendorong robot secara manual dengan tangan', isCorrect: false, reason: 'Mengabaikan prinsip otomatisasi pemrograman komputer.' }
        ]
      },
      {
        id: 4,
        category: 'Pelacakan Kesalahan (Debugging) & Infinite Loop',
        title: 'Program Game Macet Total Karena Perulangan Tanpa Henti (Infinite Loop)',
        story: 'Saat membuat game labirin, aplikasi Scratch tiba-tiba membeku (hang) dan kursor tidak bergerak. Setelah diperiksa, ada blok perulangan "ULANGI SELAMA skor < 100" tetapi siswa lupa menambahkan balok penambah nilai skor.',
        question: 'Fenomena error apakah yang terjadi dan bagaimana cara memperbaikinya?',
        options: [
          { text: 'Terjadi Infinite Loop (perulangan abadi tanpa henti karena syarat berhenti tidak pernah terpenuhi); tambahkan balok penambah skor di dalam perulangan', isCorrect: true, reason: 'Hebat! Infinite loop menyedot 100% daya prosesor CPU karena kondisi berhenti tidak pernah tercapai, membekukan aplikasi.' },
          { text: 'Laptop harus dibawa ke tukang servis las listrik', isCorrect: false, reason: 'Bukan kerusakan fisik bodi laptop, melainkan kesalahan logika kode (bug software).' },
          { text: 'Menghapus sistem operasi Windows', isCorrect: false, reason: 'Tindakan destruktif yang tidak menyelesaikan kesalahan balok kode Scratch.' }
        ]
      }
    ]
  },

  'k9-keamanan-digital': {
    bannerColor: 'bg-linear-to-r from-red-600 via-rose-600 to-indigo-800',
    badgeText: 'Simulasi Keamanan Digital & Kejahatan Siber',
    badgeTextColor: 'text-rose-200',
    title: 'Tantangan Detektif Keamanan Siber: Lindungi Privasi',
    description: 'Pecahkan 5 kasus nyata kejahatan siber: file .APK kurir palsu, email phishing akun belajar, pencurian password lab, kebocoran NIK/KK di medsos, dan peretasan OTP SMS.',
    scenarios: [
      {
        id: 1,
        category: 'Malware & Trojan WhatsApp',
        title: 'Kasus Kiriman File "Lihat_Foto_Resi.apk" di WhatsApp',
        story: 'Fajar menerima pesan WhatsApp dari nomor asing mengaku kurir paket: "Paket Anda tertahan di kantor pos, silakan pasang aplikasi ini untuk melacak resi" disertai file bernama "Foto_Paket.apk".',
        question: 'Apa tindakan paling bijak dan aman yang harus diambil Fajar sesuai prinsip Keamanan Siber?',
        options: [
          { text: 'Segera blokir nomor pengirim dan hapus file tersebut tanpa pernah mengeklik atau memasangnya', isCorrect: true, reason: 'Tepat sekali! File .APK dari sumber tak resmi adalah malware pencuri SMS/OTP yang mampu membobol akun perbankan dan medsos.' },
          { text: 'Mengunduh dan memasang aplikasi karena penasaran paket apa yang datang', isCorrect: false, reason: 'Sangat berbahaya! Menginstal file .apk liar akan memberikan izin akses penuh bagi peretas untuk membaca SMS dan kontakmu.' },
          { text: 'Meneruskan file tersebut ke grup kelas agar teman-teman ikut mencoba', isCorrect: false, reason: 'Menyebarkan file malware akan membahayakan perangkat seluruh teman di grup kelas.' }
        ]
      },
      {
        id: 2,
        category: 'Phishing Akun Belajar',
        title: 'Kasus Email Verifikasi Akun Belajar Palsu (.xyz)',
        story: 'Dinda menerima email mengatasnamakan Admin Sekolah: "Akun Google Belajar Anda Akan Ditutup! Segera Login Verifikasi". Email menyertakan tautan login ke "smpn5kroya-login.free-domain.xyz".',
        question: 'Bagaimana analisis Dinda untuk memastikan keaslian email dan menjaga keamanan akun belajarnya?',
        options: [
          { text: 'Waspadai domain tiruan (.xyz), jangan masukkan password, dan laporkan email mencurigakan ini ke guru Informatika/Admin sekolah', isCorrect: true, reason: 'Luar biasa! Ini adalah modus Phishing. Sekolah resmi menggunakan domain resmi (.sch.id), bukan domain gratisan (.xyz).' },
          { text: 'Segera memasukkan username dan password agar akun belajarnya tidak dinonaktifkan', isCorrect: false, reason: 'Bencana siber! Memasukkan kredensial pada situs tiruan akan langsung mengirimkan kata sandimu ke tangan peretas.' },
          { text: 'Mengganti password akun belajar dengan angka 123456', isCorrect: false, reason: 'Menggunakan password yang terlalu lemah mempermudah hacker membobol akunmu.' }
        ]
      },
      {
        id: 3,
        category: 'Sesi Akun Komputer Bersama',
        title: 'Kasus Menggunakan Komputer Bersama di Laboratorium / Warnet',
        story: 'Setelah selesai mengerjakan tugas kelompok Informatika di PC Laboratorium Sekolah, bel istirahat berbunyi. Teman-temannya terburu-buru keluar ruangan menuju kantin.',
        question: 'Prosedur keamanan digital apa yang WAJIB diselesaikan sebelum meninggalkan komputer lab?',
        options: [
          { text: 'Melakukan tombol "Log Out / Keluar" dari semua akun, menghapus centang simpan password, serta menutup jendela browser', isCorrect: true, reason: 'Sangat tepat! Jika tidak logout, siswa kelas berikutnya bisa langsung mengakses email, drive tugas, hingga akun medsosmu.' },
          { text: 'Cukup mematikan layar monitor saja sementara akun Google masih dalam posisi login', isCorrect: false, reason: 'Salah besar! Mematikan monitor tidak mengeluarkan sesi akun. Siapa pun yang menyalakan monitor bisa membuka akunmu.' },
          { text: 'Menyimpan password di browser (klik "Save Password") agar mudah dipakai lagi besok', isCorrect: false, reason: 'Sangat fatal! Menyimpan kata sandi di komputer umum membuka akses bagi siapa saja untuk menggunakan akunmu.' }
        ]
      },
      {
        id: 4,
        category: 'Perlindungan Data Pribadi (UU PDP)',
        title: 'Kasus Mengunggah Foto Kartu Keluarga (KK) ke Media Sosial',
        story: 'Seorang teman merasa bangga baru saja menerima Kartu Keluarga (KK) baru. Ia berniat memotret dokumen tersebut secara jelas lalu menjadikannya status WhatsApp dan postingan Instagram Story.',
        question: 'Mengapa tindakan tersebut sangat berbahaya dan bertentangan dengan UU Perlindungan Data Pribadi?',
        options: [
          { text: 'NIK, nomor KK, dan nama ibu kandung adalah data pribadi spesifik yang bisa disalahgunakan untuk pinjaman online ilegal atau pemalsuan identitas', isCorrect: true, reason: 'Pintar sekali! Sesuai UU PDP, data spesifik seperti NIK dan nama ibu kandung bersifat rahasia dan wajib dilindungi dari ruang publik.' },
          { text: 'Boleh diunggah asalkan menggunakan filter warna estetik', isCorrect: false, reason: 'Filter visual tidak menyamarkan nomor NIK dan data sensitif yang bisa dibaca sindikat kejahatan siber.' },
          { text: 'Tidak berbahaya sama sekali karena semua orang di internet adalah teman baik', isCorrect: false, reason: 'Dunia internet dipenuhi peretas dan pihak jahat yang mengincar kebocoran data untuk kejahatan finansial.' }
        ]
      },
      {
        id: 5,
        category: 'Rekayasa Sosial & Kerahasiaan OTP',
        title: 'Kasus Panggilan Telepon Berkedok Petugas Hadiah (Social Engineering)',
        story: 'Ponsel berdering dari nomor asing ramah: "Selamat Anda dapat hadiah pulsa 1 juta! Kami sudah kirimkan kode 6 digit verifikasi ke SMS adik, tolong sebutkan angkanya sekarang ya agar uang cair".',
        question: 'Bagaimana respon cerdas seorang siswa yang memiliki literasi keamanan digital tinggi?',
        options: [
          { text: 'Menolak dengan tegas, segera memutus panggilan, dan tidak pernah memberikan kode OTP SMS kepada siapapun', isCorrect: true, reason: 'Hebat! Kode OTP (One-Time Password) adalah kunci otentikasi rahasia. Pihak resmi mana pun TIDAK PERNAH meminta kode OTP kepada pengguna.' },
          { text: 'Segera menyebutkan 6 angka tersebut karena penelpon terdengar sangat ramah dan sopan', isCorrect: false, reason: 'Tertipu rekayasa sosial! Kode OTP tersebut adalah kode verifikasi untuk meretas akun WhatsApp atau dompet digitalmu.' },
          { text: 'Menuliskan kode tersebut di buku catatan sekolah', isCorrect: false, reason: 'Solusi yang tidak relevan dan tetap mengabaikan bahaya peretasan yang sedang terjadi.' }
        ]
      }
    ]
  },

  'k9-pers-digital': {
    bannerColor: 'bg-linear-to-r from-cyan-600 via-sky-600 to-indigo-700',
    badgeText: 'Simulasi Perspektif Digital & Kolaborasi Global',
    badgeTextColor: 'text-cyan-200',
    title: 'Tantangan Masa Depan: Eksplorasi VR, AR, & Cloud Computing',
    description: 'Pecahkan 4 kasus teknologi masa depan: praktikum anatomi via Augmented Reality, tur virtual 360° museum via VR, penyimpanan portofolio di Cloud Drive, dan peluang karier digital.',
    scenarios: [
      {
        id: 1,
        category: 'Augmented Reality (AR)',
        title: 'Praktikum Organ Jantung Manusia 3D di Layar Ponsel',
        story: 'Pada pelajaran IPA Biologi, siswa kelas 9 mengarahkan kamera ponsel ke gambar buku paket, lalu seketika muncul model 3D organ jantung berdetak yang melayang di atas meja dan dapat diputar 360 derajat.',
        question: 'Teknologi visual digital manakah yang sedang dipraktikkan oleh siswa tersebut?',
        options: [
          { text: 'Augmented Reality (AR), yaitu teknologi yang menggabungkan dan memproyeksikan objek maya 3D ke dalam lingkungan dunia nyata secara langsung', isCorrect: true, reason: 'Tepat sekali! AR menambahkan lapisan objek digital interaktif di atas pemandangan dunia nyata melalui kamera.' },
          { text: 'Kamera foto rontgen sinar-X rumah sakit', isCorrect: false, reason: 'Ponsel tidak memancarkan radiasi sinar-X untuk memindai organ tubuh manusia.' },
          { text: 'Sulap ilusi optik kertas gambar', isCorrect: false, reason: 'Ini murni aplikasi pemrosesan citra komputer berbasis teknologi AR modern.' }
        ]
      },
      {
        id: 2,
        category: 'Virtual Reality (VR)',
        title: 'Kunjungan Belajar Virtual 360° ke Candi Borobudur dan Museum',
        story: 'Siswa memakai kacamata headset tertutup (VR Headset). Seluruh pandangan matanya kini berada di pelataran puncak Candi Borobudur dan ia bisa menoleh ke atas, bawah, kiri, dan kanan seolah-olah berada di lokasi asli.',
        question: 'Ciri utama dari pengalaman teknologi Virtual Reality (VR) adalah...',
        options: [
          { text: 'Imersif total, di mana pengguna merasa tenggelam dan hadir secara fisik di dalam lingkungan simulasi komputer 3D 360 derajat', isCorrect: true, reason: 'Luar biasa! VR mengisolasi penglihatan dari dunia luar untuk membawa pengguna seutuhnya ke dalam simulasi buatan.' },
          { text: 'Melihat televisi biasa dari jarak 1 meter', isCorrect: false, reason: 'Televisi biasa bersifat 2 dimensi dan tidak memberikan respons gerak kepala 360 derajat.' },
          { text: 'Kacamata hitam pelindung sinar matahari', isCorrect: false, reason: 'Kacamata hitam hanya meredupkan cahaya, bukan perangkat komputasi simulasi virtual.' }
        ]
      },
      {
        id: 3,
        category: 'Komputasi Awan (Cloud Computing)',
        title: 'Menyimpan Berkas Portofolio Tugas Kelulusan SMP di Cloud',
        story: 'Dodi ingin agar seluruh tugas portofolio Informatika selama 3 tahun di SMP tidak hilang jika sewaktu-waktu laptopnya rusak atau flashdisknya tertinggal.',
        question: 'Solusi penyimpanan manakah yang paling aman dan dapat diakses dari mana saja?',
        options: [
          { text: 'Menyimpannya di Cloud Storage (seperti Google Drive Akun Belajar.id) yang aman dari kerusakan fisik perangkat dan tersinkronisasi otomatis', isCorrect: true, reason: 'Pintar! Cloud computing menyimpan data di server internet berkeamanan tinggi sehingga file tetap utuh meski laptop rusak.' },
          { text: 'Menyalin file ke 50 keping kaset pita jadul', isCorrect: false, reason: 'Kaset pita media usang berpita magnetik yang mudah berjamur dan tidak praktis.' },
          { text: 'Mencetak jutaan baris kode ke kertas lalu membakarnya', isCorrect: false, reason: 'Tindakan salah yang menghancurkan karya digital siswa.' }
        ]
      },
      {
        id: 4,
        category: 'Peluang Karier Abad 21',
        title: 'Mempersiapkan Keterampilan Digital Menuju Jenjang SMA/SMK',
        story: 'Menjelang kelulusan SMP, guru menanyakan cita-cita siswa di era transformasi digital. Banyak lapangan pekerjaan baru yang belum pernah ada 10 tahun lalu.',
        question: 'Pilihan profesi manakah yang lahir berkat perkembangan teknologi digital dan informatika modern?',
        options: [
          { text: 'Pengembang Aplikasi / Software Engineer, Analis Keamanan Siber, Spesialis Data Sains, dan Kreator Konten Edukatif', isCorrect: true, reason: 'Sangat prospektif! Penguasaan informatika sejak bangku SMP membuka pintu emas menuju karier teknologi terdepan masa depan.' },
          { text: 'Tukang pos surat berperangko tempel manual', isCorrect: false, reason: 'Surat kertas manual telah banyak tergantikan oleh email dan pesan digital instan.' },
          { text: 'Pengetik mesin ketik manual pita karbon', isCorrect: false, reason: 'Profesi tersebut telah digantikan sepenuhnya oleh pengolah dokumen komputer.' }
        ]
      }
    ]
  },

  'k9-ruang-publik-virtual': {
    bannerColor: 'bg-linear-to-r from-purple-700 via-indigo-600 to-sky-700',
    badgeText: 'Simulasi Ruang Publik Virtual & Jejak Digital',
    badgeTextColor: 'text-purple-200',
    title: 'Tantangan Interaksi & Kolaborasi Digital Siswa Kelas 9',
    description: 'Pecahkan 4 skenario nyata di dunia maya: menghadapi kabar heboh di grup chat, menyikapi perbedaan pendapat dengan toleransi & empati, etika berkirim pesan kepada guru, serta kolaborasi tugas kelompok di cloud!',
    scenarios: [
      {
        id: 1,
        category: 'Mindfulness & Berpikir Sebelum Posting',
        title: 'Menerima Informasi Menghebohkan di Grup Chat Kelas 9',
        story: 'Di grup chat kelas 9, seorang teman membagikan kabar dramatis tanpa sumber resmi: "Mulai besok jam masuk sekolah dimajukan ke pukul 05.00 pagi oleh dinas!". Pesan tersebut disertai ajakan untuk memprotes di media sosial.',
        question: 'Bagaimana penerapan mindfulness digital yang paling tepat?',
        options: [
          { text: 'Berpikir kritis (Think Before You Post), menenangkan teman sekelas, dan memvalidasi kebenaran informasi ke wali kelas atau situs resmi sekolah', isCorrect: true, reason: 'Tepat sekali! Mindfulness digital melatih kita untuk tidak langsung bereaksi emosional terhadap kabar yang belum jelas kebenarannya.' },
          { text: 'Langsung membagikan ulang pesan tersebut ke semua akun media sosial dengan kata-kata provokatif', isCorrect: false, reason: 'Tindakan gegabah yang dapat memicu kepanikan massal dan menyebarkan hoaks.' },
          { text: 'Mengetik komentar kasar dengan huruf kapital di status WhatsApp', isCorrect: false, reason: 'Penggunaan huruf kapital berlebihan dianggap berteriak dengan emosi tidak sopan.' }
        ]
      },
      {
        id: 2,
        category: 'Toleransi & Empati Digital',
        title: 'Menyikapi Perbedaan Pendapat di Kolom Diskusi',
        story: 'Dalam forum diskusi tugas online, seorang teman menyampaikan sudut pandang yang berbeda tentang topik proyek. Teman lain mulai mencemooh dan melontarkan lelucon yang mengarah ke perundungan siber (cyberbullying).',
        question: 'Sikap apa yang mencerminkan empati dan toleransi digital siswa berkarakter?',
        options: [
          { text: 'Mengingatkan teman-teman dengan santun untuk menghargai perbedaan pendapat dan memberikan dukungan positif kepada teman yang dicemooh', isCorrect: true, reason: 'Luar biasa! Empati digital membuat kita peka terhadap perasaan orang lain dan berani membela teman dari perundungan siber.' },
          { text: 'Ikut menertawakan dan menambahkan komentar ejekan agar terlihat akrab dengan teman lain', isCorrect: false, reason: 'Sikap tidak terpuji yang melanggar etika digital dan menyakiti perasaan teman.' },
          { text: 'Langsung mematikan laptop dan tidak peduli dengan situasi yang terjadi', isCorrect: false, reason: 'Sikap apatis tidak membantu menciptakan lingkungan ruang publik virtual yang aman.' }
        ]
      },
      {
        id: 3,
        category: 'Etika Berkomunikasi dengan Guru',
        title: 'Konfirmasi Pengumpulan Tugas Kelompok kepada Guru',
        story: 'Bagas ingin menanyakan batas waktu pengumpulan tugas Informatika kepada Bapak Guru melalui aplikasi pesan singkat di ponselnya.',
        question: 'Format pesan manakah yang paling mencerminkan tata krama etika digital yang baik?',
        options: [
          { text: 'Mengawali dengan salam hormat, memperkenalkan nama dan kelas, menyampaikan pertanyaan dengan bahasa sopan pada jam kerja wajar, lalu berterima kasih', isCorrect: true, reason: 'Sangat santun! Etika netiket mengharuskan salam, kejelasan identitas siswa, serta bahasa hormat saat menghubungi pendidik.' },
          { text: 'Mengirimkan pesan "P" sepuluh kali berturut-turut pada jam 11 malam', isCorrect: false, reason: 'Sangat tidak sopan dan mengganggu waktu istirahat guru.' },
          { text: 'Langsung bertanya tanpa salam dengan singkatan gaul yang sulit dipahami', isCorrect: false, reason: 'Kurang menghargai guru dan berpotensi menimbulkan kesalahpahaman komunikasi.' }
        ]
      },
      {
        id: 4,
        category: 'Sifat Abadi Jejak Digital',
        title: 'Dampak Jangka Panjang Unggahan di Media Sosial',
        story: 'Seorang siswa berniat menghapus postingan komentar marahnya di akun publik sekolah, namun temannya mengingatkan bahwa beberapa orang sudah sempat mengambil tangkapan layar (screenshot).',
        question: 'Pelajaran penting apa yang harus dipahami tentang sifat jejak digital di internet?',
        options: [
          { text: 'Jejak digital bersifat abadi dan mudah disebarkan kembali; sekali diunggah ke internet, data sulit dihapus seutuhnya dan dapat mempengaruhi reputasi masa depan', isCorrect: true, reason: 'Pintar sekali! Menghapus postingan tidak menghapus jejak di server atau screenshot orang lain. Saring sebelum sharing!' },
          { text: 'Tombol hapus di medsos otomatis menghapus memori di otak seluruh orang di dunia', isCorrect: false, reason: 'Tombol hapus hanya menghapus tampilan kiriman di beranda akunmu, bukan screenshot orang lain.' },
          { text: 'Jejak digital akan hilang sendiri jika kita tidur siang', isCorrect: false, reason: 'Pernyataan keliru yang mengabaikan sifat permanensi data internet.' }
        ]
      }
    ]
  },
  'k8-rekam-jejak-digital': {
    bannerColor: 'bg-linear-to-r from-purple-600 via-indigo-600 to-rose-600',
    badgeText: 'Simulasi Rekam Jejak Digital, Empati, & Anti-Cyberbullying',
    badgeTextColor: 'text-purple-200',
    title: 'Tantangan Investigasi Jejak Digital & Tameng Anti-Cyberbullying Kelas 8',
    description: 'Selesaikan 4 studi kasus nyata siswa SMP seputar mengelola rekam jejak digital aktif/pasif, menerapkan saringan T.H.I.N.K., melatih empati digital, dan menolong teman dari perundungan siber.',
    scenarios: [
      {
        id: 1,
        category: 'Rekam Jejak Digital Aktif & Reputasi',
        title: 'Seleksi Beasiswa & Pengecekan Akun Media Sosial',
        story: 'Arka mendaftar program beasiswa pelajar berprestasi tingkat kabupaten. Panitia melakukan penelusuran rekam jejak digital calon penerima. Di akun media sosialnya, Arka pernah mengunggah video candaan yang menghina teman dengan kata-kata kasar dua tahun lalu.',
        question: 'Dampak nyata apa yang paling mungkin terjadi akibat kelalaian menjaga rekam jejak digital tersebut?',
        options: [
          { text: 'Peluang lolos beasiswa bisa gugur karena jejak digital mencerminkan etika dan karakter nyata seseorang', isCorrect: true, reason: 'Tepat sekali! Rekam jejak digital bersifat permanen dan menjadi pertimbangan penting kredibilitas seseorang di masa depan.' },
          { text: 'Panitia beasiswa akan otomatis memuji video tersebut karena dianggap lucu dan menghibur', isCorrect: false, reason: 'Ujaran kasar dan hinaan tidak pernah dianggap lucu dalam penilaian karakter beradab.' },
          { text: 'Akun media sosial Arka otomatis mendapatkan centang biru verifikasi resmi', isCorrect: false, reason: 'Tidak ada hubungannya, verifikasi akun memerlukan syarat kepatuhan dan integritas.' }
        ]
      },
      {
        id: 2,
        category: 'Empati Digital & Saringan T.H.I.N.K.',
        title: 'Merespons Perbedaan Pendapat di Grup WhatsApp Kelas',
        story: 'Dalam diskusi kelompok daring tugas IPA, Budi mengusulkan ide proyek daur ulang sampah plastik, sedangkan Dodi menginginkan proyek hidroponik. Dodi merasa kesal dan hendak mengetik: "Ide Budi kuno dan bodoh banget!".',
        question: 'Tindakan empati digital terbaik manakah yang seharusnya diambil Dodi sebelum menekan tombol kirim?',
        options: [
          { text: 'Menggunakan saringan T.H.I.N.K., menahan emosi, dan menyampaikan tanggapan santun: "Usul Budi bagus, tapi bagaimana kalau kita padukan dengan hidroponik?"', isCorrect: true, reason: 'Luar biasa! Empati digital mengajarkan kita menghargai pendapat orang lain tanpa melukai perasaan dan martabatnya.' },
          { text: 'Mengirimkan pesan ejekan tersebut menggunakan huruf kapital semua agar Budi merasa malu', isCorrect: false, reason: 'Mengetik huruf kapital dan merendahkan teman memicu perselisihan dan melanggar netiket.' },
          { text: 'Mengeluarkan Budi dari grup WhatsApp kelas secara sepihak', isCorrect: false, reason: 'Tindakan ini tergolong exclusion (pengucilan digital) yang menyakiti korban.' }
        ]
      },
      {
        id: 3,
        category: 'Pencegahan Cyberbullying (Upstander)',
        title: 'Aksi Solidaritas Membela Teman yang Dirundung di Grup Chat',
        story: 'Seseorang membuat stiker wajah teman sekelas yang diedit lucu berlebihan dan menyebarkannya berulang kali di grup obrolan hingga korban merasa malu dan menangis.',
        question: 'Sebagai siswa berkarakter Profil Lulusan Kemendikdasmen, sikap apa yang paling berani dan benar untuk kamu ambil?',
        options: [
          { text: 'Menjadi pembela (upstander) dengan menegur pembuat stiker secara sopan, tidak ikut tertawa/membagikan, dan melaporkan ke guru BK', isCorrect: true, reason: 'Pemberani dan mulia! Jangan menjadi penonton pasif (bystander) yang membiarkan kejahatan siber merajalela.' },
          { text: 'Ikut membagikan stiker tersebut ke grup lain agar suasana semakin ramai dan viral', isCorrect: false, reason: 'Ikut menyebarkan stiker ejekan menjadikan kita bagian dari pelaku perundungan siber.' },
          { text: 'Diam saja dan pura-pura tidak tahu karena takut dijauhi oleh teman-teman populer', isCorrect: false, reason: 'Mendiamkan perundungan membuat korban merasa terisolasi dan putus asa.' }
        ]
      },
      {
        id: 4,
        category: 'Privasi & Rekam Jejak Pasif',
        title: 'Penggunaan Internet di Wi-Fi Publik Warung Kopi',
        story: 'Rina menyambungkan laptopnya ke Wi-Fi gratis tanpa kata sandi di tempat umum, lalu melakukan login akun media sosial dan perbankan tanpa memeriksa keamanannya.',
        question: 'Langkah pencegahan apakah yang harus dilakukan Rina untuk mengamankan rekam jejak pasif dan datanya?',
        options: [
          { text: 'Menghindari transaksi sensitif di Wi-Fi publik terbuka, mengaktifkan autentikasi dua faktor (2FA), dan menghapus riwayat penjelajahan setelah selesai', isCorrect: true, reason: 'Sangat cerdas! Wi-Fi publik rentan penyadapan paket data dan pencatatan jejak pasif tanpa izin.' },
          { text: 'Menyimpan kata sandi di peramban publik agar saat datang lagi tidak perlu mengetik ulang', isCorrect: false, reason: 'Sangat berbahaya karena orang berikutnya dapat langsung masuk ke akun pribadimu.' },
          { text: 'Mematikan layar laptop tanpa melakukan logout dari akun media sosial', isCorrect: false, reason: 'Sesi login yang tertinggal bisa disalahgunakan oleh pihak yang berniat jahat.' }
        ]
      }
    ]
  }
};

/**
 * Helper to get simulation scenarios for any topic.
 * Guaranteed 100% match to the topicId, with smart fallback to category matching.
 */
export function getTopicSimulationData(topicId: string, topicTitle: string = ''): TopicSimulationMetadata {
  if (TOPIC_SIMULATION_SCENARIOS[topicId]) {
    return TOPIC_SIMULATION_SCENARIOS[topicId];
  }

  const t = topicTitle.toLowerCase();

  if (t.includes('dokumen') || t.includes('docs')) {
    return TOPIC_SIMULATION_SCENARIOS['k7-gdoc'];
  }
  if (t.includes('excel') || t.includes('vlookup') || t.includes('if')) {
    return TOPIC_SIMULATION_SCENARIOS['k8-excel'];
  }
  if (t.includes('sheet') || t.includes('lembar kerja')) {
    return TOPIC_SIMULATION_SCENARIOS['k7-gsheet'];
  }
  if (t.includes('slide') || t.includes('presentasi')) {
    return TOPIC_SIMULATION_SCENARIOS['k7-gslide'];
  }
  if (t.includes('buku sekolah') || t.includes('bse')) {
    return TOPIC_SIMULATION_SCENARIOS['k7-bse'];
  }
  if (t.includes('data') || t.includes('himpunan')) {
    return TOPIC_SIMULATION_SCENARIOS['k7-hd'];
  }
  if (t.includes('komputasional') || t.includes('dekomposisi')) {
    return TOPIC_SIMULATION_SCENARIOS['k7-bk'];
  }
  if (t.includes('jaringan') || t.includes('topologi')) {
    return TOPIC_SIMULATION_SCENARIOS['k8-jaringan'];
  }
  if (t.includes('koneksi') || t.includes('bluetooth') || t.includes('nirkabel')) {
    return TOPIC_SIMULATION_SCENARIOS['k8-koneksi'];
  }
  if (t.includes('hoaks') || t.includes('fakta') || t.includes('kredibilitas')) {
    return TOPIC_SIMULATION_SCENARIOS['k8-fakta-hoaks'];
  }
  if (t.includes('etika') || t.includes('netiket')) {
    return TOPIC_SIMULATION_SCENARIOS['k8-digital-etika'];
  }
  if (t.includes('pemrograman') || t.includes('algoritma') || t.includes('scratch') || t.includes('blockly')) {
    return TOPIC_SIMULATION_SCENARIOS['k9-pemrograman'];
  }
  if (t.includes('keamanan') || t.includes('siber') || t.includes('phishing') || t.includes('password')) {
    return TOPIC_SIMULATION_SCENARIOS['k9-keamanan-digital'];
  }
  if (t.includes('perspektif') || t.includes('vr') || t.includes('ar') || t.includes('cloud')) {
    return TOPIC_SIMULATION_SCENARIOS['k9-pers-digital'];
  }
  if (t.includes('ruang publik') || t.includes('jejak digital')) {
    return TOPIC_SIMULATION_SCENARIOS['k9-ruang-publik-virtual'];
  }
  if (t.includes('komputer') || t.includes('hardware') || t.includes('perangkat keras')) {
    return TOPIC_SIMULATION_SCENARIOS['k7-komputer'];
  }

  // Fallback to k7-idk
  return TOPIC_SIMULATION_SCENARIOS['k7-idk'];
}
