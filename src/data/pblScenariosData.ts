/**
 * Database Skenario Problem-Based Learning (PBL) SMPN 5 Kroya
 * Bahasa Sederhana, Seru, dan 100% Nyata Sesuai Kehidupan Anak SMP Zaman Sekarang!
 * 
 * 5 Langkah Belajar Berbasis Masalah (Kurikulum Merdeka):
 * 1. Pahami Masalahnya (Kasus Nyata di Sekitar Kita)
 * 2. Bagi Tugas Kelompok (Tentukan Peran & Cek Fakta Awal)
 * 3. Buka Petunjuk & Bukti (Selidiki Penyebab Sebenarnya)
 * 4. Buat Solusi Nyata (Rancang Langkah & Karya Solutif)
 * 5. Cek Hasil & Nilai (Evaluasi Karya & Refleksi Karakter)
 */

export interface PblInvestigationClue {
  id: string;
  source: string;
  type: 'log' | 'interview' | 'document' | 'metric';
  title: string;
  content: string;
  highlight: string;
}

export interface PblPotentialCause {
  id: string;
  text: string;
  category: string;
  isRootCause: boolean;
  explanation: string;
}

export interface PblSolutionAction {
  id: string;
  title: string;
  category: 'Langkah Praktis' | 'Aturan & Kesepakatan Sekolah' | 'Edukasi & Kebiasaan Baik';
  desc: string;
  impactScore: number;
}

export interface PblScenario {
  topicId: string;
  title: string;
  headline: string;
  contextStory: string;
  location: string;
  urgencyLevel: 'Biasa' | 'Penting' | 'Mendesak';
  drivingQuestion: string;
  whatWeKnow: string[];
  whatWeNeedToLearn: string[];
  clues: PblInvestigationClue[];
  potentialCauses: PblPotentialCause[];
  recommendedActions: PblSolutionAction[];
  deliverableName: string;
  reflectionPrompt: string;
}

export const DEDICATED_PBL_SCENARIOS: Record<string, PblScenario> = {
  // ==========================================
  // 1. KELAS 7: INFORMASI DIGITAL & KREDIBILITAS
  // ==========================================
  'k7-idk': {
    topicId: 'k7-idk',
    title: 'Gara-Gara Video Hoaks TikTok di Grup WhatsApp Kelas 7',
    headline: 'Heboh Kabar "Mulai Besok PR Dihapus dan Libur Sebulan": Ternyata Dari Akun Palsu!',
    contextStory:
      'Hari Minggu malam pukul 21.00, suasana grup WhatsApp kelas 7 mendadak gaduh. Seorang teman mengirim video TikTok yang berisi tulisan: "Kabar gembira! Menteri resmi melarang PR dan besok sekolah libur sebulan!". Banyak teman langsung bersorak dan menutup buku tanpa mengerjakan tugas sekolah. Keesokan paginya, guru memeriksa tugas dan kaget karena separuh kelas tidak mengumpulkan tugas. Setelah ditelusuri, video tersebut ternyata dibuat oleh akun palsu yang hanya mencari likes dan followers.',
    location: 'Grup WhatsApp Kelas 7 & Ruang Kelas',
    urgencyLevel: 'Mendesak',
    drivingQuestion:
      'Bagaimana cara kita membiasakan diri mengecek keaslian berita di internet agar tidak gampang tertipu kabar bohong (hoaks) buatan akun pencari sensasi?',
    whatWeKnow: [
      'Ada teman yang langsung membagikan video heboh ke grup kelas tanpa mengecek kebenarannya terlebih dahulu.',
      'Banyak siswa percaya begitu saja karena judul videonya meyakinkan dan memakai logo mirip instansi resmi.',
      'Siswa yang percaya hoaks akhirnya terkena teguran guru karena tugas sekolahnya tidak selesai.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Apa saja ciri-ciri akun palsu dan judul berita jebakan (clickbait) di media sosial?',
      'Kisi-kisi 2: Bagaimana cara mengecek kebenaran pengumuman sekolah di situs resmi pemerintah (.go.id / .sch.id)?',
      'Kisi-kisi 3: Langkah kebiasaan apa yang harus dilakukan sebelum meneruskan (share) video viral ke grup kelas?'
    ],
    clues: [
      {
        id: 'idk-c1',
        source: 'Pemeriksaan Profil Akun Pembuat Video',
        type: 'log',
        title: 'Biodata Akun Penyebar Video di TikTok',
        content: 'Nama akun pengunggah adalah @info_heboh_viral99, tidak memiliki centang biru resmi, dan seluruh videonya berisi potongan video orang lain yang ditempeli teks heboh.',
        highlight: 'Bukan Sumber Resmi: Akun Anonim Pemburu Followers'
      },
      {
        id: 'idk-c2',
        source: 'Situs Resmi Kemendikbudristek',
        type: 'document',
        title: 'Cek Pengumuman di Web Resmi (.go.id)',
        content: 'Pada halaman web resmi kemdikbud.go.id, tidak ada sama sekali berita tentang penghapusan PR atau libur dadakan. Jadwal sekolah tetap berjalan normal sesuai kalender akademik.',
        highlight: 'Fakta Nyata: Tidak Ada Aturan Libur Dadakan'
      },
      {
        id: 'idk-c3',
        source: 'Curhatan Siswa yang Tidak Buat Tugas',
        type: 'interview',
        title: 'Alasan Mengapa Langsung Percaya',
        content: '"Videonya muncul di FYP TikTok saya dan banyak yang komentar senang, jadi saya kira beneran. Saya kapok tidak kroscek dulu."',
        highlight: 'Komentar Ramai Belum Tentu Berarti Berita Benar'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-idk1',
        text: 'Kebiasaan langsung percaya pada video viral tanpa melihat siapa nama akun dan sumber aslinya',
        category: 'Kebiasaan Cepat Percaya',
        isRootCause: true,
        explanation: 'Banyak anak mudah tergiur kabar yang menyenangkan atau heboh tanpa mau meluangkan 1 menit untuk mengecek fakta.'
      },
      {
        id: 'cau-idk2',
        text: 'Belum tahu cara membedakan situs berita resmi dengan akun palsu',
        category: 'Kurang Literasi Digital',
        isRootCause: true,
        explanation: 'Siswa belum terbiasa memeriksa akhiran domain web seperti .go.id atau mencari konfirmasi berita di Google Berita.'
      },
      {
        id: 'cau-idk3',
        text: 'HP teman kehabisan baterai saat membaca berita',
        category: 'Bukan Penyebab',
        isRootCause: false,
        explanation: 'Baterai HP tidak ada hubungannya dengan kebenaran isi berita.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-idk1',
        title: 'Terapkan Aturan "Tahan Jarimu 1 Menit" (Saring Sebelum Sharing)',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Jika menemukan berita heboh di medsos, jangan langsung kirim ke grup. Tanyakan dulu: siapa yang membuat dan adakah di berita televisi/web resmi?',
        impactScore: 40
      },
      {
        id: 'act-idk2',
        title: 'Buat Poster "Tips Jadi Detektif Anti-Hoaks" di Dinding Kelas',
        category: 'Langkah Praktis',
        desc: 'Tempelkan panduan 3 langkah mudah: Cek Pembuat Akun, Cek di Google, dan Tanya Guru/Orang Tua sebelum percaya.',
        impactScore: 35
      },
      {
        id: 'act-idk3',
        title: 'Kesepakatan Grup WhatsApp Kelas: Dilarang Sebar Kabar Tanpa Sumber Jelas',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Pengurus kelas berhak mengingatkan atau menegur dengan sopan jika ada anggota grup yang membagikan link mencurigakan.',
        impactScore: 25
      }
    ],
    deliverableName: 'Panduan Sederhana: 3 Langkah Cepat Membedakan Berita Asli vs Hoaks',
    reflectionPrompt: 'Apa yang akan kamu lakukan jika besok ada teman mengirimkan kabar viral yang mencurigakan di grup obrolanmu?'
  },

  // ==========================================
  // 2. KELAS 8: KONEKSI PERANGKAT DIGITAL
  // ==========================================
  'k8-koneksi': {
    topicId: 'k8-koneksi',
    title: 'Trik Mengirim Video Tugas 1 GB Tanpa Kuota Internet',
    headline: 'Video Tugas 1 GB Harus Dikumpul 15 Menit Lagi: Kuota Habis dan Bluetooth Butuh Waktu 2 Jam!',
    contextStory:
      'Kelompok 3 kelas 8 baru saja selesai merekam video drama bahasa Indonesia menggunakan kamera HP. Ukuran filenya ternyata sangat besar, mencapai 1.2 GB! Guru meminta video tersebut harus sudah dipindahkan ke laptop guru dalam 15 menit sebelum bel istirahat. Masalahnya: kuota internet semua anggota kelompok habis, Wi-Fi sekolah sedang mati lampu, dan saat mencoba kirim lewat Bluetooth tertulis estimasi waktu: "Selesai dalam 2 jam 15 menit!". Kelompok ini panik dan butuh cara cepat menyambungkan HP ke laptop.',
    location: 'Ruang Kelas 8 & Meja Guru',
    urgencyLevel: 'Mendesak',
    drivingQuestion:
      'Bagaimana cara menghubungkan HP ke laptop secara offline (tanpa kuota) agar file video raksasa bisa terkirim hanya dalam hitungan detik?',
    whatWeKnow: [
      'Ukuran file video sangat besar (1.2 GB) sehingga tidak bisa dikirim lewat chat WhatsApp biasa.',
      'Koneksi Bluetooth memiliki kecepatan transfer sangat lambat untuk file bergiga-giga.',
      'Tidak ada koneksi internet (kuota habis dan Wi-Fi sekolah sedang padam).'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Mengapa saat HP dicolok kabel ke laptop sering hanya mengisi baterai, dan pengaturan apa yang harus dipilih di layar HP?',
      'Kisi-kisi 2: Alat atau fitur koneksi tanpa kuota apa saja yang jauh lebih cepat daripada Bluetooth untuk memindahkan file besar?',
      'Kisi-kisi 3: Persiapan alat sederhana apa yang sebaiknya dibawa kelompok saat ada tugas pengumpulan file besar di sekolah?'
    ],
    clues: [
      {
        id: 'kon-c1',
        source: 'Hasil Uji Kecepatan Bluetooth',
        type: 'metric',
        title: 'Kecepatan Bluetooth vs Kabel Data',
        content: 'Bluetooth mentransfer data dengan kecepatan sekitar 0.2 MB/detik. Sementara kabel data USB 3.0 mentransfer data dengan kecepatan 40 MB/detik.',
        highlight: 'Kabel USB 200x Lebih Cepat Dibandingkan Bluetooth'
      },
      {
        id: 'kon-c2',
        source: 'Notifikasi Layar HP Saat Dicolok Kabel',
        type: 'log',
        title: 'Mode Pengisian Daya vs Transfer File',
        content: 'Saat HP dicolokkan ke laptop dengan kabel, HP hanya berstatus "Mengisi Daya". Laptop belum bisa melihat file video karena pengaturan HP belum diubah ke "Transfer File (MTP)".',
        highlight: 'Harus Mengubah Opsi USB di HP Menjadi Transfer File'
      },
      {
        id: 'kon-c3',
        source: 'Peralatan yang Tersedia di Tas Siswa',
        type: 'document',
        title: 'Alat Bawaan Siswa yang Bisa Dipakai',
        content: 'Ada kabel charger bawaan HP (kabel USB Type-C) dan satu buah flashdisk dual-drive (punya colokan USB biasa dan colokan Type-C untuk HP).',
        highlight: 'Solusi Fisik Sudah Ada, Tinggal Dipraktikkan dengan Benar'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-kon1',
        text: 'Mengandalkan Bluetooth untuk file raksasa padahal Bluetooth hanya cocok untuk file kecil seperti lagu atau foto selembar',
        category: 'Salah Pilih Jenis Koneksi',
        isRootCause: true,
        explanation: 'Bluetooth dirancang hemat energi untuk headset atau smartwatch, bukan untuk memindahkan video resolusi tinggi.'
      },
      {
        id: 'cau-kon2',
        text: 'Lupa menyentuh notifikasi di HP untuk mengizinkan laptop mengakses folder galeri video',
        category: 'Pengaturan Perangkat',
        isRootCause: true,
        explanation: 'Secara bawaan keamanan, HP mengunci file sampai pemilik menyentuh izin "Transfer File".'
      },
      {
        id: 'cau-kon3',
        text: 'Kabel charger warnanya tidak cocok dengan warna laptop',
        category: 'Bukan Penyebab',
        isRootCause: false,
        explanation: 'Warna kabel hanyalah tampilan fisik dan tidak mempengaruhi kecepatan aliran data.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-kon1',
        title: 'Gunakan Kabel Data USB Asli & Aktifkan Mode "Transfer File (MTP)"',
        category: 'Langkah Praktis',
        desc: 'Colokkan kabel dari HP ke port USB laptop guru, buka layar kunci HP, sentuh notifikasi USB, lalu pilih "Transfer File". Buka folder DCIM/Camera dan salin video dalam 30 detik.',
        impactScore: 40
      },
      {
        id: 'act-kon2',
        title: 'Manfaatkan Fitur Kirim Cepat Nirkabel Offline (Quick Share / Wi-Fi Direct)',
        category: 'Langkah Praktis',
        desc: 'Nyalakan Wi-Fi dan Bluetooth di kedua gawai tanpa perlu internet. Sambungkan lewat Quick Share untuk mengirim video dengan gelombang Wi-Fi lokal berkecepatan tinggi.',
        impactScore: 35
      },
      {
        id: 'act-kon3',
        title: 'Simpan Satu Flashdisk OTG di Tempat Pensil untuk Cadangan Tugas',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Membawa flashdisk OTG memudahkan siswa memindahkan file tugas dari HP ke laptop lab kapan saja tanpa pusing kuota.',
        impactScore: 25
      }
    ],
    deliverableName: 'Kartu Panduan: 3 Trik Kilat Memindahkan File Besar dari HP ke Laptop Tanpa Kuota',
    reflectionPrompt: 'Koneksi apa yang paling sering kamu pakai di rumah, dan cara mana yang paling cocok saat kuotamu sedang habis?'
  },

  // ==========================================
  // 3. KELAS 9: EKOSISTEM MEDIA PERS DIGITAL
  // ==========================================
  'k9-pers-digital': {
    topicId: 'k9-pers-digital',
    title: 'Akun Gosip Menfess Sekolah vs Mading Digital yang Keren & Beretika',
    headline: 'Foto Teman Diunggah Tanpa Izin dengan Judul Memalukan: Saatnya Belajar Jurnalisme Digital Beradab!',
    contextStory:
      'Sebuah akun anonim sekolah (menfess) di Instagram mengunggah foto seorang siswa kelas 9 yang tidak sengaja menjatuhkan piring di kantin. Foto itu diberi judul heboh: "Anak ini bikin ribut di kantin sampai piring pecah semua!". Unggahan itu ramai dibicarakan dan korban merasa sangat malu untuk masuk sekolah. Tim Mading Digital OSIS SMPN 5 Kroya diminta turun tangan menyelidiki kejadian sebenarnya dan menyusun aturan berita sekolah yang baik!',
    location: 'Ruang OSIS & Media Sosial SMPN 5 Kroya',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara tim mading digital menyajikan informasi sekolah yang seru dan viral, tapi tetap menjunjung tinggi kejujuran dan etika jurnalisme?',
    whatWeKnow: [
      'Ada akun anonim sekolah yang suka mengunggah kejadian di sekolah demi mencari viewers dan komentar heboh.',
      'Unggahan sepihak tanpa bertanya dulu pada yang bersangkutan membuat korban merasa malu dan dirugikan.',
      'Siswa perlu memahami perbedaan antara akun gosip liar dengan media berita/mading sekolah yang beretika.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Mengapa pembuat berita wajib bertanya ke kedua belah pihak / saksi mata sebelum menyebarkan kabar?',
      'Kisi-kisi 2: Mengapa memotret teman diam-diam saat mengalami musibah lalu mengunggahnya ke medsos melanggar etika?',
      'Kisi-kisi 3: Konten positif apa saja yang bisa diangkat Mading Digital Sekolah agar seru dibaca tanpa menyakiti siapa pun?'
    ],
    clues: [
      {
        id: 'prs-c1',
        source: 'Keterangan Saksi Ibu Penjaga Kantin',
        type: 'interview',
        title: 'Fakta Sebenarnya di Kantin',
        content: '"Anak itu tidak sengaja tersenggol siswa lain yang berlari. Dia langsung meminta maaf dan bahkan membantu saya membersihkan lantai dengan sopan. Berita di Instagram itu fitnah besar."',
        highlight: 'Fakta Nyata: Kejadian Tidak Sengaja dan Siswa Berperilaku Sopan'
      },
      {
        id: 'prs-c2',
        source: 'Kode Etik Jurnalistik Remaja',
        type: 'document',
        title: 'Aturan Menampilkan Foto Orang Lain',
        content: 'Dalam etika pers, mengunggah foto seseorang yang sedang mengalami musibah atau situasi memalukan tanpa izin dilarang keras karena melanggar hak privasi.',
        highlight: 'Wajib Izin dan Tidak Boleh Menghakimi Orang Lain'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-prs1',
        text: 'Pengelola akun hanya mengejar jumlah likes dan komentar heboh tanpa mempedulikan perasaan korban',
        category: 'Perilaku Demi Konten',
        isRootCause: true,
        explanation: 'Haus perhatian di medsos sering membuat orang mengabaikan kejujuran dan kebaikan hati.'
      },
      {
        id: 'cau-prs2',
        text: 'Tidak melakukan konfirmasi atau tanya langsung kepada orang yang ada di dalam foto',
        category: 'Ketiadaan Konfirmasi',
        isRootCause: true,
        explanation: 'Jurnalisme yang baik selalu menanyakan "apa yang sebenarnya terjadi" sebelum menulis berita.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-prs1',
        title: 'Terapkan Prinsip "Tanya Dua Belah Pihak" Sebelum Mengunggah Berita',
        category: 'Langkah Praktis',
        desc: 'Jika ada kejadian menarik di sekolah, wawancarai orang yang bersangkutan dan saksi mata agar berita yang ditulis adil dan benar.',
        impactScore: 40
      },
      {
        id: 'act-prs2',
        title: 'Bikin Rubrik "Kabar Kebaikan & Prestasi" di Mading Digital Sekolah',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Ubah mading daring sekolah menjadi wadah mengangkat karya teman, prestasi ekskul, dan tips belajar seru agar tidak ada ruang untuk akun gosip jahat.',
        impactScore: 35
      },
      {
        id: 'act-prs3',
        title: 'Aturan Bersama: Dilarang Memfoto Teman Diam-Diam untuk Konten Ejekan',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Tegaskan sanksi sosial dan teguran bagi siapa saja yang menggunakan foto candid teman untuk bahan lelucon di media sosial.',
        impactScore: 25
      }
    ],
    deliverableName: 'Pedoman Jurnalis Cilik: 5 Aturan Emas Menulis Berita Sekolah yang Keren dan Beretika',
    reflectionPrompt: 'Mengapa membuat berita yang jujur dan menginspirasi jauh lebih membanggakan daripada menyebarkan gosip viral yang menyakiti teman?'
  },

  // ==========================================
  // 4. KELAS 7: BERPIKIR KOMPUTASIONAL
  // ==========================================
  'k7-bk': {
    topicId: 'k7-bk',
    title: 'Bazar Sekolah Macet Total: Bereskan dengan 4 Pilar Berpikir Komputasional!',
    headline: 'Pembeli Menumpuk 30 Menit di Stan Makanan: Bagaimana Cara Berpikir Komputasional Membereskannya?',
    contextStory:
      'Saat acara Bazar Dies Natalis SMPN 5 Kroya, stan makanan kelas 7 sangat laris manis menjual es teh buah dan roti bakar. Tapi suasananya kacau balau: antrean pembeli mengular panjang hingga menutupi pintu kelas sebelah, pembeli harus menunggu 30 menit, koki roti kewalahan, dan kasir pusing mencari uang kembalian receh. Banyak pembeli akhirnya membatalkan pesanan karena kelaparan. Wali kelas menantang kelompokmu menyelidiki masalah ini dan menata ulang stan bazar menggunakan 4 pilar Berpikir Komputasional!',
    location: 'Area Stan Bazar Makanan SMPN 5 Kroya',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara memecah masalah antrean yang rumit menjadi langkah-langkah mudah dan tertib menggunakan Dekomposisi, Pola, Abstraksi, dan Algoritma?',
    whatWeKnow: [
      'Pembeli menumpuk di depan meja stan tanpa jalur antrean yang jelas.',
      'Anggota stan kewalahan karena belum ada pembagian tugas khusus antara yang memasak, mencatat, dan menerima uang.',
      'Kasir sering kehabisan waktu hanya untuk mencari uang receh kembalian.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1 (Dekomposisi): Bagaimana cara memecah pekerjaan di stan bazar menjadi beberapa tugas kecil untuk tiap anggota?',
      'Kisi-kisi 2 (Pola & Abstraksi): Bagaimana cara menyederhanakan daftar menu dan harga agar pembeli cepat memilih dan tidak butuh uang kembalian receh?',
      'Kisi-kisi 3 (Algoritma): Bagaimana urutan langkah antrean dari pembeli datang sampai menerima makanan agar tidak berdesakan?'
    ],
    clues: [
      {
        id: 'bk-c1',
        source: 'Catatan Waktu Pelayanan Stan',
        type: 'metric',
        title: 'Di Mana Waktu Paling Banyak Terbuang?',
        content: 'Dari 10 menit waktu tunggu: 5 menit terbuang saat kasir menghitung uang kembalian ganjil (Rp 3.500) dan 3 menit pembeli bingung memilih menu di depan meja.',
        highlight: 'Titik Lambat: Pembayaran Uang Ganjil dan Menu Terlalu Banyak Pilihan'
      },
      {
        id: 'bk-c2',
        source: 'Wawancara Pembeli yang Kecewa',
        type: 'interview',
        title: 'Keluhan Pembeli di Barisan Antrean',
        content: '"Kami berdesak-desakan karena orang yang baru datang langsung maju ke meja tanpa barisan antrean yang jelas."',
        highlight: 'Tidak Ada Alur Antrean: Butuh Tali Barisan Satu Arah'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-bk1',
        text: 'Semua anggota stan mengerjakan hal yang sama tanpa pembagian tugas yang jelas (Kurang Dekomposisi)',
        category: 'Organisasi Kerja',
        isRootCause: true,
        explanation: 'Jika koki ikut menghitung uang, masakan gosong dan pesanan terhenti.'
      },
      {
        id: 'cau-bk2',
        text: 'Harga makanan memakai angka ganjil yang merepotkan uang kembalian',
        category: 'Kurang Abstraksi',
        isRootCause: true,
        explanation: 'Harga ganjil membuat waktu kasir habis hanya untuk mencari koin kembalian Rp 500.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-bk1',
        title: 'Dekomposisi Tugas: Bagi Tim Menjadi 3 Pos Khusus',
        category: 'Langkah Praktis',
        desc: 'Bagi tim secara tegas: 1 orang penerima pesanan/tiket, 1 orang kasir uang, 2 orang koki masak, dan 1 orang penyerah makanan siap saji.',
        impactScore: 35
      },
      {
        id: 'act-bk2',
        title: 'Abstraksi & Pola: Buat Menu Paket dengan Harga Bulat',
        category: 'Langkah Praktis',
        desc: 'Sederhanakan menu menjadi 2 Paket Hemat Rp 10.000 (Roti + Es Teh) agar kasir tidak pusing uang kembalian dan pembeli cepat memilih.',
        impactScore: 35
      },
      {
        id: 'act-bk3',
        title: 'Algoritma Alur Antrean Satu Arah dengan Tali Rafia & Nomor Antrean',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Pasang jalur masuk di sisi kiri dan jalur keluar di sisi kanan. Pembeli yang sudah bayar menunggu nomor antreannya dipanggil tanpa berdesakan.',
        impactScore: 30
      }
    ],
    deliverableName: 'Diagram Alur Cerdas: Manajemen Stan Bazar Menggunakan 4 Pilar Berpikir Komputasional',
    reflectionPrompt: 'Bagaimana cara berpikir komputasional membantumu mengatur jadwal belajar dan kegiatan sehari-hari di rumah?'
  },

  // ==========================================
  // 5. KELAS 7: HIMPUNAN DATA
  // ==========================================
  'k7-hd': {
    topicId: 'k7-hd',
    title: 'Pendaftaran Ekskul Futsal, Tari, & Robotik 240 Siswa Baru yang Kacau Balau',
    headline: 'Buku Catatan Pendaftaran Sobek dan Bertumpuk: Pengurus OSIS Pusing Cari 1 Nama Teman!',
    contextStory:
      'Menjelang pembagian ekstrakurikuler di SMPN 5 Kroya, panitia OSIS membuka stan pendaftaran untuk 240 siswa kelas 7 baru. Karena antrean sangat ramai, panitia mencatat biodata di satu buku tulis bergaris tanpa tabel: nama lengkap, nama panggilan, nomor kelas, nomor HP orang tua, hobi, dan pilihan ekskul ditulis bertumpuk dalam satu kalimat panjang. Parahnya, ada 3 siswa yang sama-sama bernama "Rizky". Saat pembina futsal meminta daftar nama anggota tim, panitia panik membalik 50 lembar halaman buku dan salah memasukkan nama Rizky yang sebenarnya ingin ikut robotik! Kelompokmu ditantang mencari tahu penyebab kekacauan data ini dan merancang solusinya!',
    location: 'Ruang Sekretariat OSIS SMPN 5 Kroya',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara menata data 240 pendaftar ekskul yang bertumpuk menjadi tabel himpunan data yang rapi dan mudah disaring dalam hitungan detik?',
    whatWeKnow: [
      'Data 240 siswa baru dicatat memanjang seperti kalimat cerita di buku tulis tanpa garis kolom tabel.',
      'Ada 3 siswa bernama "Rizky" di kelas 7 yang tertukar jadwal ekskulnya.',
      'Mencari satu per satu nama siswa di buku kertas memakan waktu sangat lama dan sering terlewat.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Kolom informasi penting apa saja yang wajib ada di tabel pendaftaran ekskul, dan info mana yang tidak perlu dicatat?',
      'Kisi-kisi 2: Data nomor identitas unik apa yang dimiliki setiap siswa agar teman yang bernama sama tidak pernah tertukar?',
      'Kisi-kisi 3: Fitur apa di aplikasi tabel komputer yang bisa dipakai untuk mengurutkan abjad dan menyaring (filter) anggota tiap ekskul?'
    ],
    clues: [
      {
        id: 'hd-c1',
        source: 'Contoh Catatan Asli di Buku Bergaris OSIS',
        type: 'document',
        title: 'Bentuk Tulisan Paragraf Panjang yang Membingungkan',
        content: '"Muhammad Rizky Pratama kelas 7A panggilannya Rizky nomor HP 0812345678 ingin ikut futsal dan robotik tapi lebih suka futsal...", disusul 239 catatan serupa tanpa pembatas kolom.',
        highlight: 'Data Bertumpuk Menjadi Paragraf Panjang Tanpa Kategori Kolom'
      },
      {
        id: 'hd-c2',
        source: 'Kasus Tiga Siswa Bernama Kembar',
        type: 'interview',
        title: 'Pengakuan Siswa yang Ekskulnya Tertukar',
        content: '"Nama saya Rizky Aditya kelas 7C, saya mendaftar robotik. Tapi nama saya masuk ke daftar latihan futsal karena panitia mengira saya Rizky Pratama kelas 7A."',
        highlight: 'Wajib Memakai Nomor Induk Siswa (NISN) Sebagai Tanda Pengenal Unik'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-hd1',
        text: 'Data dicatat secara bebas seperti cerita dan tidak dibuatkan kolom kategori yang teratur',
        category: 'Penyusunan Data',
        isRootCause: true,
        explanation: 'Komputer dan manusia membutuhkan data berstruktur (tabel kolom) agar bisa mencari dan menyaring data dengan cepat.'
      },
      {
        id: 'cau-hd2',
        text: 'Tidak memakai nomor identitas unik (NISN) sehingga nama yang mirip sering tertukar',
        category: 'Identifikasi Data',
        isRootCause: true,
        explanation: 'Nama manusia bisa ada yang kembar, tetapi nomor induk NISN selalu berbeda untuk setiap pelajar di Indonesia.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-hd1',
        title: 'Pilah Data Menjadi 4 Kolom Utama: NISN, Nama Lengkap, Kelas, dan Pilihan Ekskul',
        category: 'Langkah Praktis',
        desc: 'Hapus data yang tidak berhubungan dengan kegiatan ekskul (seperti makanan kesukaan) agar tabel ringkas, rapi, dan mudah dibaca.',
        impactScore: 40
      },
      {
        id: 'act-hd2',
        title: 'Urutkan Himpunan Data Berdasarkan Kelas (7A sampai 7H) dan Abjad Nama Siswa',
        category: 'Langkah Praktis',
        desc: 'Pengurutan data membuat pencarian nama siswa dari 240 data hanya butuh waktu kurang dari 3 detik.',
        impactScore: 35
      },
      {
        id: 'act-hd3',
        title: 'Gunakan Fitur Saring (Filter) untuk Membagi Siswa ke Tiap Pembina Ekskul',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Dengan 1 klik tombol filter "Futsal", komputer langsung menampilkan daftar khusus atlet futsal yang siap dicetak untuk pembina.',
        impactScore: 25
      }
    ],
    deliverableName: 'Tabel Master Himpunan Data Pendaftaran Ekskul Siswa Baru yang Rapi & Terstruktur',
    reflectionPrompt: 'Mengapa merapikan dan mengelompokkan data sejak awal jauh lebih menghemat waktu daripada mencatat asal-asalan lalu bingung di kemudian hari?'
  },

  // ==========================================
  // 6. KELAS 7: KOMPONEN, FUNGSI, CARA KERJA KOMPUTER
  // ==========================================
  'k7-komputer': {
    topicId: 'k7-komputer',
    title: 'Mati Lampu Saat Ngetik Tugas di Lab: Naskah 4 Halaman Hilang Tanpa Jejak!',
    headline: 'Listrik Lab Padam Sesaat: Mengapa Ketikan 4 Halaman Hilang & PC Sebelah Mendadak Mati?',
    contextStory:
      'Faris sedang asyik mengetik naskah laporan tugas Informatika sepanjang 4 halaman di laboratorium komputer SMPN 5 Kroya selama 45 menit tanpa henti. Saat jari Faris mengetik paragraf penutup, tiba-tiba listrik sekolah padam sesaat (jeglek). Ketika komputer dinyalakan kembali, ketikan 4 halaman tersebut hilang total! Sementara itu, di meja sebelah, komputer teman lainnya bersuara kipas menderu keras seperti helikopter lalu mendadak mati sendiri padahal listriknya sudah menyala normal. Kelompokmu ditantang menyelidiki bukti lapangan untuk mencari tahu penyebabnya dan menyusun solusinya!',
    location: 'Laboratorium Komputer SMPN 5 Kroya',
    urgencyLevel: 'Mendesak',
    drivingQuestion:
      'Mengapa ketikan tugas di komputer bisa hilang saat listrik mati mendadak, dan bagaimana cara merawat komputer lab agar tidak cepat panas atau mati sendiri?',
    whatWeKnow: [
      'Faris sudah mengetik laporan 4 halaman selama 45 menit, namun saat listrik padam sesaat dan komputer nyala lagi, naskahnya hilang.',
      'Komputer di meja sebelah mengeluarkan suara kipas yang sangat bising lalu tiba-tiba mati sendiri.',
      'Siswa perlu memeriksa bukti di komputer untuk mengetahui apa yang terjadi pada penyimpanan data dan suhu alat.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Apa bedanya tempat penyimpanan sementara saat mengetik (RAM) dengan tempat penyimpanan permanen (SSD/Harddisk)?',
      'Kisi-kisi 2: Tombol pintas (shortcut) apa di keyboard yang harus rutin ditekan agar ketikan tugas aman meski mati lampu?',
      'Kisi-kisi 3: Mengapa bagian dalam komputer (Processor) bisa kepanasan dan bagaimana cara merawat kipas pendinginnya?'
    ],
    clues: [
      {
        id: 'kom-c1',
        source: 'Pemeriksaan Isi Harddisk/SSD PC Faris',
        type: 'log',
        title: 'Status File Dokumen Faris di Penyimpanan',
        content: 'Folder Documents diperiksa: file laporan Faris masih berukuran 0 KB karena tombol "Save (Simpan)" belum pernah ditekan sama sekali selama 45 menit Faris mengetik.',
        highlight: 'Data Masih Tertinggal di RAM yang Kosong Saat Listrik Padam'
      },
      {
        id: 'kom-c2',
        source: 'Pemeriksaan Suhu PC Meja Sebelah',
        type: 'metric',
        title: 'Suhu Processor Mencapai Batas Kritis',
        content: 'Suhu CPU melonjak hingga 98°C karena lubang angin kipas tersumbat gumpalan debu ruang kelas. Sensor pengaman otomatis mematikan PC agar tidak terbakar.',
        highlight: 'Thermal Shutdown: Mekanisme Komputer Menyelamatkan Diri dari Kepanasan'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-kom1',
        text: 'Mengira teks yang terlihat di layar monitor sudah otomatis tersimpan permanen di dalam harddisk/SSD tanpa menekan Save',
        category: 'Kesalahpahaman Konsep',
        isRootCause: true,
        explanation: 'Layar monitor hanyalah penampil keluaran (output), data sebenarnya masih berada di RAM sementara sebelum ditekan tombol Simpan.'
      },
      {
        id: 'cau-kom2',
        text: 'Debu tebal di kipas processor menghambat aliran udara dingin sehingga komputer kepanasan',
        category: 'Kebersihan Perangkat',
        isRootCause: true,
        explanation: 'Processor menghasilkan panas tinggi saat bekerja, debu bertindak seperti selimut tebal yang menahan panas.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-kom1',
        title: 'Biasakan Menekan Ctrl + S Setiap Kali Mengetik 1 Paragraf Baru',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Dengan menekan Ctrl + S, data di RAM langsung disalin ke sel memori SSD yang tidak takut mati lampu.',
        impactScore: 40
      },
      {
        id: 'act-kom2',
        title: 'Jadwal Bersih-Bersih Debu Kipas Komputer Lab Bersama Guru',
        category: 'Langkah Praktis',
        desc: 'Gunakan kuas kecil dan blower untuk meniup debu di bilah kipas heatsink setiap 2 bulan sekali agar komputer selalu adem.',
        impactScore: 35
      },
      {
        id: 'act-kom3',
        title: 'Tempelkan Stiker Pengingat "Sudahkah Kamu Tekan Ctrl+S?" di Meja Komputer',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Stiker visual di sudut monitor mengingatkan siswa agar tidak kehilangan naskah tugas berharganya.',
        impactScore: 25
      }
    ],
    deliverableName: 'Panduan Praktis Siswa: Menjaga Naskah Tugas Aman & Merawat Komputer Sekolah',
    reflectionPrompt: 'Setelah tahu sifat RAM yang gampang lupa saat mati lampu, apa kebiasaan barumu saat mengetik tugas di laptop atau komputer?'
  },

  // ==========================================
  // 7. KELAS 8: MEMBEDAKAN FAKTA, OPINI, DAN HOAKS
  // ==========================================
  'k8-fakta-hoaks': {
    topicId: 'k8-fakta-hoaks',
    title: 'Kabar Viral "Jajanan Makanan Sekolah Mengandung Plastik Berbahaya"',
    headline: 'Video Bakar Kerupuk Bikin Panik Satu Sekolah: Benaran Plastik atau Cuma Fakta Sains Alami?',
    contextStory:
      'Sebuah video di TikTok beredar cepat di grup WhatsApp siswa kelas 8. Video tersebut memperlihatkan seseorang membakar kerupuk dan boba minuman dengan korek api hingga menyala hitam, disertai tulisan menakut-nakuti: "Awas! Jajanan di sekitar kita terbukti mengandung plastik lilin berbahaya!". Banyak siswa ketakutan, menolak makan siang, dan pedagang kantin sekolah merugi. Kelompokmu ditantang menjadi detektif sains dan literasi digital untuk memeriksa bukti dan mencari tahu kebenarannya!',
    location: 'Kantin Sehat SMPN 5 Kroya & Ruang Lab IPA',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara kita membedakan fakta ilmiah yang terbukti dengan opini menyesatkan dan hoaks yang menakut-nakuti masyarakat?',
    whatWeKnow: [
      'Ada video viral yang menunjukkan kerupuk menyala saat dibakar dengan korek api.',
      'Pembuat video menuduh makanan tersebut mengandung plastik berbahaya tanpa bukti uji laboratorium.',
      'Banyak teman langsung ketakutan dan pedagang kantin sekolah ikut merugi karena sepi pembeli.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Secara pelajaran IPA, mengapa makanan kering yang digoreng minyak bisa ikut menyala jika dibakar api?',
      'Kisi-kisi 2: Bagaimana cara mengecek kebenaran kabar makanan menggunakan situs Cek Fakta resmi atau penjelasan BPOM?',
      'Kisi-kisi 3: Apa perbedaan antara Fakta (bisa dibuktikan lewat uji lab) dan Opini/Tuduhan pribadi di media sosial?'
    ],
    clues: [
      {
        id: 'foh-c1',
        source: 'Penjelasan Resmi Ahli Pangan BPOM',
        type: 'document',
        title: 'Rilis Resmi Badan Pengawas Obat dan Makanan',
        content: 'BPOM menjelaskan bahwa kerupuk dan makanan kering mengandung rantai karbon, lemak, dan minyak goreng yang memang mudah menyala saat terkena api. Menyala saat dibakar BUKAN bukti adanya plastik.',
        highlight: 'Fakta Sains: Makanan Mengandung Minyak Memang Alami Terbakar'
      },
      {
        id: 'foh-c2',
        source: 'Uji Coba di Laboratorium IPA Bersama Guru',
        type: 'metric',
        title: 'Perbandingan Membakar Plastik Asli vs Kerupuk',
        content: 'Saat plastik dibakar, plastik meleleh menjadi cairan lengket berbau kimia menyengat. Saat kerupuk dibakar, kerupuk menjadi abu rapuh beraroma makanan gosong.',
        highlight: 'Hasil Bakaran Sangat Berbeda: Terbukti Kerupuk Bukan Plastik'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-foh1',
        text: 'Mengambil kesimpulan terburu-buru hanya dari apa yang terlihat mata tanpa mengecek hukum sains',
        category: 'Kesimpulan Dangkal',
        isRootCause: true,
        explanation: 'Melihat sesuatu terbakar langsung dituduh plastik karena tidak tahu bahwa minyak goreng juga bahan bakar alami.'
      },
      {
        id: 'cau-foh2',
        text: 'Menyebarkan video rasa takut ke grup teman sebelum ada penjelasan dari dokter atau ahli',
        category: 'Penyebaran Kepanikan',
        isRootCause: true,
        explanation: 'Rasa panik membuat orang ingin segera memperingatkan orang lain, padahal peringatannya salah.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-foh1',
        title: 'Buat Video Singkat "Klarifikasi Cek Fakta" Bersama Guru IPA di Kantin',
        category: 'Langkah Praktis',
        desc: 'Rekam video penjelasan ramah anak yang menerangkan mengapa kerupuk bisa terbakar dan tunjukkan surat izin edar BPOM makanan kantin sekolah.',
        impactScore: 40
      },
      {
        id: 'act-foh2',
        title: 'Ajari Teman Cara Menggunakan Google Cek Fakta & TurnBackHoax',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Jika ada kabar makanan aneh, ketikkan kata kunci ditambah kata "Cek Fakta" di Google untuk membaca rilis ilmuwan.',
        impactScore: 35
      },
      {
        id: 'act-foh3',
        title: 'Bikin Kotak Informasi "Fakta vs Mitos" di Papan Pengumuman Kantin',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Tuliskan daftar mitos makanan yang sering salah dipahami agar siswa tenang dan jajan dengan sehat.',
        impactScore: 25
      }
    ],
    deliverableName: 'Infografis Edukatif: Membedakan Fakta Ilmiah vs Hoaks Makanan di Sekitar Kita',
    reflectionPrompt: 'Mengapa kita harus lebih mempercayai bukti uji laboratorium daripada video heboh 15 detik di media sosial?'
  },

  // ==========================================
  // 8. KELAS 8: KONSEP DASAR JARINGAN KOMPUTER
  // ==========================================
  'k8-jaringan': {
    topicId: 'k8-jaringan',
    title: 'Misteri 5 Komputer Meja Belakang yang Tiba-Tiba "No Internet" Saat Ujian',
    headline: 'Ujian Tinggal 20 Menit Lagi: Komputer Meja Depan Lancar, Kenapa Meja Belakang Mendadak Putus?',
    contextStory:
      'Saat Asesmen Sekolah Berbasis Komputer berlangsung di lab komputer SMPN 5 Kroya, suasana hening mendadak panik. Lima orang siswa di deretan meja paling belakang berteriak: "Pak, komputer kami muncul gambar dinosaurus, internetnya mati!". Padahal 25 komputer di meja depan tetap lancar tanpa gangguan. Waktu ujian tersisa tinggal 20 menit lagi. Kelompokmu ditugaskan membantu guru memeriksa bukti di lab untuk menemukan penyebabnya dan menyusun langkah perbaikannya!',
    location: 'Laboratorium Jaringan Komputer Sekolah',
    urgencyLevel: 'Mendesak',
    drivingQuestion:
      'Langkah mudah apa yang harus kita periksa secara urut saat sebagian komputer di lab mendadak tidak bisa tersambung ke jaringan?',
    whatWeKnow: [
      'Hanya 5 komputer di deretan meja belakang yang putus internet, sedangkan 25 komputer di meja depan tetap lancar.',
      'Layanan Wi-Fi dan internet utama sekolah dalam kondisi normal.',
      'Kelima komputer meja belakang dihubungkan menggunakan kabel jaringan (kabel LAN) ke satu kotak pembagi (Switch).'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Apa tanda lampu indikator pada colokan kabel LAN di belakang komputer jika sambungannya normal vs terputus?',
      'Kisi-kisi 2: Apa fungsi alat Switch pembagi jaringan di laboratorium komputer?',
      'Kisi-kisi 3: Bagaimana cara menata kabel di bawah meja siswa agar tidak mudah terlepas saat ujian berlangsung?'
    ],
    clues: [
      {
        id: 'jar-c1',
        source: 'Pemeriksaan Lampu Indikator Port LAN',
        type: 'metric',
        title: 'Lampu di Belakang Casing PC Meja Belakang Mati',
        content: 'Di belakang 5 komputer yang bermasalah, lampu hijau kecil di dekat colokan kabel LAN mati total. Di komputer depan, lampu tersebut berkedip lincah.',
        highlight: 'Tidak Ada Aliran Sinyal Fisik: Masalah Terjadi pada Sambungan Kabel'
      },
      {
        id: 'jar-c2',
        source: 'Pemeriksaan Kolong Meja Lab',
        type: 'document',
        title: 'Temuan Fisik di Bawah Meja Siswa',
        content: 'Kabel utama yang menghubungkan switch meja belakang ke switch utama di depan tampak tertarik kencang dan kepala colokan RJ45-nya lepas setengah karena tersenggol kaki siswa.',
        highlight: 'Kabel Penghubung Switch Meja Belakang Terlepas dari Colokan'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-jar1',
        text: 'Kabel LAN penghubung switch meja belakang terlepas dari soketnya karena tersenggol kaki siswa',
        category: 'Kabel Fisik Terlepas',
        isRootCause: true,
        explanation: 'Jaringan kabel membutuhkan colokan yang menancap rapat hingga bunyi KLIK pengunci plastik terkunci.'
      },
      {
        id: 'cau-jar2',
        text: 'Menyalahkan server pusat internet sekolah padahal masalahnya hanya colokan lokal meja belakang',
        category: 'Salah Diagnosis',
        isRootCause: false,
        explanation: 'Jika server pusat mati, maka seluruh 30 komputer akan mati bersamaan, bukan hanya 5 komputer belakang.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-jar1',
        title: 'Tancapkan Kembali Kabel LAN ke Switch Hingga Berbunyi "KLIK"',
        category: 'Langkah Praktis',
        desc: 'Ambil kepala kabel RJ45, tekan tuas pengunci plastiknya, dan dorong masuk ke port switch sampai bunyi klik dan lampu hijau menyala kembali.',
        impactScore: 40
      },
      {
        id: 'act-jar2',
        title: 'Rapikan Jalur Kabel Jaringan Menggunakan Lakban / Spiral Pelindung',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Rekatkan kabel jaringan ke sudut dinding atau kaki meja agar tidak menjuntai di lantai dan tidak bisa tersenggol kaki siswa lagi.',
        impactScore: 35
      },
      {
        id: 'act-jar3',
        title: 'Buat Aturan: Dilarang Menggoyang Meja Lab atau Menarik Kabel di Kolong Meja',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Edukasi seluruh siswa agar duduk tenang saat ujian dan tidak menyenggol peralatan jaringan di lantai.',
        impactScore: 25
      }
    ],
    deliverableName: 'Lembar Ceklis Cepat: 3 Langkah Mengatasi Komputer Lab yang Mendadak Putus Jaringan',
    reflectionPrompt: 'Mengapa hal sekecil kabel yang tersenggol kaki bisa menghentikan ujian online satu deret meja komputer?'
  },

  // ==========================================
  // 9. KELAS 9: DASAR PEMROGRAMAN
  // ==========================================
  'k9-pemrograman': {
    topicId: 'k9-pemrograman',
    title: 'Membantu Kasir Koperasi Sekolah Bebas Salah Hitung Diskon Hari Jumat',
    headline: 'Penjaga Koperasi Kewalahan Hitung Diskon Manual: Siswa Kelas 9 Bikin Program Kasir Otomatis!',
    contextStory:
      'Setiap hari Jumat, Koperasi Siswa SMPN 5 Kroya memberikan promo spesial: "Beli alat tulis di atas Rp 20.000 dapat diskon 10%!". Namun, penjaga koperasi sering pusing menghitung manual dengan kalkulator tangan saat puluhan siswa mengantre membeli pulpen dan buku. Sering terjadi salah hitung kembalian dan pembeli mengeluh antreannya lambat. Kelompokmu ditantang menyelidiki masalah ini dan merancang logika program kasir sederhana agar hitungan belanja cepat dan bebas salah!',
    location: 'Koperasi Siswa SMPN 5 Kroya',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara menyusun langkah logika berpikir (algoritma & percabangan IF-ELSE) untuk program kasir agar komputer bisa menghitung diskon dan kembalian belanja secara otomatis?',
    whatWeKnow: [
      'Harga barang di koperasi: Buku tulis Rp 5.000, Pulpen Rp 3.000, Penggaris Rp 2.000.',
      'Ada aturan promo: belanja di atas Rp 20.000 mendapat potongan harga (diskon) 10%.',
      'Menghitung satu per satu dengan kalkulator tangan memakan waktu lama dan sering keliru saat antrean ramai.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Data angka apa saja (Variabel) yang harus dimasukkan ke dalam program kasir?',
      'Kisi-kisi 2: Bagaimana bunyi aturan logika "JIKA ... MAKA ... JIKA TIDAK ..." (IF-ELSE) untuk menentukan siapa yang dapat diskon 10%?',
      'Kisi-kisi 3: Bagaimana urutan langkah (Algoritma) dari mulai menghitung total barang hingga menampilkan uang kembalian?'
    ],
    clues: [
      {
        id: 'pem-c1',
        source: 'Catatan Selisih Uang Koperasi Pekan Lalu',
        type: 'metric',
        title: 'Kerugian Akibat Salah Hitung Manual',
        content: 'Dalam satu hari Jumat, terdapat selisih rugi kas Rp 18.500 karena kasir keliru memencet tombol persen di kalkulator saat suasana toko sedang bising.',
        highlight: 'Manusia Bisa Lelah dan Keliru, Komputer Selalu Tepat dan Konsisten'
      },
      {
        id: 'pem-c2',
        source: 'Contoh Alur Belanja Siswa',
        type: 'document',
        title: 'Contoh Kasus Belanja Nyata',
        content: 'Budi membeli 4 buku tulis (Rp 20.000) dan 2 pulpen (Rp 6.000). Total kotor = Rp 26.000. Karena > 20.000, Budi dapat diskon Rp 2.600. Total bayar bersih = Rp 23.400.',
        highlight: 'Logika Hitung: Hitung Total -> Cek Syarat Diskon -> Kurangi Diskon -> Hitung Kembalian'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-pem1',
        text: 'Mengandalkan ingatan dan kalkulator manual saat melayani puluhan pembeli yang terburu-buru',
        category: 'Proses Manual Lambat',
        isRootCause: true,
        explanation: 'Saat jam istirahat yang sempit (15 menit), kasir mudah panik dan salah memencet tombol kalkulator.'
      },
      {
        id: 'cau-pem2',
        text: 'Belum adanya program otomatis yang langsung menampilkan struk hitungan yang jelas',
        category: 'Belum Ada Otomasi',
        isRootCause: true,
        explanation: 'Program sederhana bisa menyelesaikan kalkulasi rumit dalam waktu kurang dari 0.01 detik.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-pem1',
        title: 'Tuliskan Pseudocode Runtut dengan Struktur IF-ELSE Diskon',
        category: 'Langkah Praktis',
        desc: 'Tulis logika: INPUT total_belanja; JIKA total_belanja >= 20000 MAKA diskon = total * 0.10, LAINNYA diskon = 0; bayar = total - diskon; OUTPUT bayar.',
        impactScore: 40
      },
      {
        id: 'act-pem2',
        title: 'Uji Coba Kode Program di Komputer Kasir Koperasi Sekolah',
        category: 'Langkah Praktis',
        desc: 'Buat prototipe program sederhana dengan tampilan ramah anak agar penjaga koperasi tinggal memasukkan angka belanjaan.',
        impactScore: 35
      },
      {
        id: 'act-pem3',
        title: 'Bikin Daftar Harga Paket Promo di Dinding Kasir',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Daftar harga membantu siswa menyiapkan uang pas sebelum sampai di depan meja kasir.',
        impactScore: 25
      }
    ],
    deliverableName: 'Rancangan Logika Program Kasir Otomatis Koperasi Siswa SMPN 5 Kroya',
    reflectionPrompt: 'Bagaimana belajar logika pemrograman melatih pikiran kita untuk terbiasa berpikir runtut, rapi, dan solutif?'
  },

  // ==========================================
  // 10. KELAS 9: KEAMANAN DIGITAL
  // ==========================================
  'k9-keamanan-digital': {
    topicId: 'k9-keamanan-digital',
    title: 'Terjebak File Undangan .APK Palsu di WhatsApp: Pulsa Terkuras & Akun Dibajak!',
    headline: 'Penasaran Klik File "Foto_Nilai_Ujian.apk" dari Nomor Asing: HP Tiba-Tiba Kirim Pesan Sendiri!',
    contextStory:
      'Seorang siswa kelas 9 menerima pesan WhatsApp dari nomor asing: "Halo dek, ini bocoran foto nilai ujian sekolahmu, silakan buka file Foto_Nilai.apk ini ya". Karena penasaran dan takut nilainya jelek, siswa tersebut langsung mengklik dan menginstal file itu. Sejam kemudian, HP-nya terasa panas, baterai cepat habis, dan tiba-tiba akun WhatsApp-nya mengirim pesan pinjaman uang palsu ke seluruh kontak teman dan guru! Kelompokmu ditantang menyelidiki bukti kasus ini dan merancang langkah penyelamatannya!',
    location: 'Grup WhatsApp Sekolah & Rumah Siswa',
    urgencyLevel: 'Mendesak',
    drivingQuestion:
      'Mengapa file dengan akhiran .apk dari orang asing sangat berbahaya, dan langkah darurat apa yang harus segera dilakukan saat akun HP kita dibajak?',
    whatWeKnow: [
      'Siswa menerima file bernama "Foto_Nilai.apk" dari nomor WhatsApp yang tidak dikenal.',
      'Setelah file tersebut diklik dan dipasang, HP menjadi panas dan akun WhatsApp mengirim pesan penipuan sendiri.',
      'Teman-teman di grup kelas hampir tertipu mentransfer uang karena mengira pesan itu asli dari temannya.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Apa bedanya akhiran nama file foto asli (.jpg / .png) dengan file aplikasi mentah (.apk)?',
      'Kisi-kisi 2: Mengapa aplikasi asing dari luar Play Store berbahaya bagi kode rahasia SMS (OTP) di HP kita?',
      'Kisi-kisi 3: Tindakan darurat apa yang harus dilakukan pada HP yang terinfeksi, dan fitur keamanan apa di WhatsApp yang wajib diaktifkan?'
    ],
    clues: [
      {
        id: 'sec-c1',
        source: 'Pemeriksaan Izin Aplikasi di Pengaturan HP',
        type: 'log',
        title: 'Izin Berbahaya yang Diminta File .APK',
        content: 'Aplikasi mencurigakan tersebut meminta izin: "Membaca SMS", "Mengirim SMS", dan "Membaca Kontak Telepon". Foto asli tidak pernah membutuhkan izin membaca SMS rahasia.',
        highlight: 'Modus Pencuri OTP: Aplikasi Menyamar untuk Membaca Kode Rahasia SMS'
      },
      {
        id: 'sec-c2',
        source: 'Peringatan Resmi BSSN (Badan Siber & Sandi Negara)',
        type: 'document',
        title: 'Surat Edaran Bahaya Malware Sniffer',
        content: 'BSSN memperingatkan modus kejahatan siber pengiriman file .apk berkedok kurir paket, surat undangan, atau daftar nilai palsu yang bertujuan membajak akun.',
        highlight: 'Jangan Pernah Klik File .APK dari Nomor yang Tidak Dikenal'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-sec1',
        text: 'Rasa penasaran yang berlebihan dan tidak mengecek ekstensi nama file (file foto harusnya .jpg/.png, bukan .apk)',
        category: 'Kurang Waspada',
        isRootCause: true,
        explanation: 'Penipu sengaja memberi nama file yang memancing rasa penasaran agar korban lalai mengklik tombol instal.'
      },
      {
        id: 'cau-sec2',
        text: 'Belum mengaktifkan PIN pengaman tambahan (Verifikasi 2 Langkah) di WhatsApp',
        category: 'Keamanan Akun Lemah',
        isRootCause: true,
        explanation: 'Tanpa PIN 2FA, peretas yang mendapatkan SMS OTP bisa langsung mengambil alih akunmu dalam 5 detik.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-sec1',
        title: 'Langkah Darurat: Matikan Internet (Mode Pesawat) & Hapus Aplikasi Jahat',
        category: 'Langkah Praktis',
        desc: 'Segera nyalakan Mode Pesawat (Airplane Mode), buka Pengaturan -> Aplikasi, cari aplikasi mencurigakan, paksa berhenti, dan hapus instalan.',
        impactScore: 40
      },
      {
        id: 'act-sec2',
        title: 'Aktifkan Verifikasi 2 Langkah (2FA) di WhatsApp dan Akun Google Belajar',
        category: 'Langkah Praktis',
        desc: 'Buka Pengaturan WhatsApp -> Akun -> Verifikasi Dua Langkah -> Buat 6 angka PIN rahasia yang tidak boleh diberitahukan ke siapa pun.',
        impactScore: 35
      },
      {
        id: 'act-sec3',
        title: 'Bikin Peringatan Cepat di Media Sosial: Beritahu Teman Bahwa Akunmu Dibajak',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Minta tolong teman atau orang tua untuk memposting bahwa nomor HP-mu sedang dibajak agar tidak ada korban transfer uang.',
        impactScore: 25
      }
    ],
    deliverableName: 'Peta Langkah Darurat: Mengamankan Gawai & Akun dari Ancaman Kejahatan Siber',
    reflectionPrompt: 'Mengapa kode OTP diibaratkan seperti kunci brankas rumah yang tidak boleh diberikan kepada siapa pun di dunia?'
  },

  // ==========================================
  // 11. KELAS 7: BROWSER & SEARCH ENGINE
  // ==========================================
  'k7-bse': {
    topicId: 'k7-bse',
    title: 'Trik Jitu Menemukan Sumber Tugas di Google Tanpa Tersesat Iklan',
    headline: 'Cari Materi "Candi Borobudur" di Google Malah Ketemu Iklan Hotel dan Blog Pribadi!',
    contextStory:
      'Siswa kelas 7 mendapat tugas membuat laporan IPS tentang "Struktur Arsitektur Candi Borobudur". Saat mengetik kata di Google, hasil pencarian halaman pertama dipenuhi iklan travel tiket pesawat, promo hotel, dan artikel blog pribadi yang tidak jelas penulisnya. Akibatnya, siswa menghabiskan waktu 1 jam membuka puluhan link tanpa menemukan materi yang valid. Siswa ditantang mempraktikkan "Jurus Rahasia Pencarian Cerdas": memakai kata kunci spesifik, tanda kutip, dan filter situs resmi pendidikan agar bahan tugas langsung ketemu dalam 5 detik!',
    location: 'Laboratorium Komputer SMPN 5 Kroya',
    urgencyLevel: 'Biasa',
    drivingQuestion:
      'Bagaimana cara menggunakan mesin pencari Google seperti seorang peneliti andal agar kita langsung menemukan artikel ilmiah asli tanpa tersesat iklan?',
    whatWeKnow: [
      'Mengetik kata kunci terlalu umum (seperti hanya mengetik "Borobudur") memunculkan jutaan hasil bisnis/wisata, bukan materi tugas sekolah.',
      'Hasil teratas di Google seringkali merupakan iklan berbayar (bertanda "Sponsor" atau "Ad").',
      'Guru meminta sumber rujukan dari buku atau portal resmi penelitian, bukan blog opini pribadi.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Bagaimana cara mengetik kata kunci di Google agar kalimat yang dicari persis dan tidak terpecah?',
      'Kisi-kisi 2: Perintah khusus apa yang bisa ditambahkan agar hasil pencarian hanya berasal dari situs resmi pendidikan (.go.id) atau berformat dokumen (.pdf)?',
      'Kisi-kisi 3: Mengapa kita perlu memperhatikan tulisan "Sponsor / Ad" pada urutan paling atas hasil pencarian Google?'
    ],
    clues: [
      {
        id: 'bse-c1',
        source: 'Hasil Perbandingan Kata Kunci di Google',
        type: 'metric',
        title: 'Jumlah Hasil Pencarian Kata Kunci Biasa vs Spesifik',
        content: 'Mengetik "Borobudur" memunculkan 85.000.000 hasil (kebanyakan iklan travel). Mengetik "arsitektur borobudur" site:kemdikbud.go.id memunculkan 120 hasil yang semuanya artikel ilmiah kurikulum.',
        highlight: 'Operator Pencarian Memangkas 99% Hasil Iklan yang Mengganggu'
      },
      {
        id: 'bse-c2',
        source: 'Wawancara dengan Guru Pembimbing',
        type: 'interview',
        title: 'Kriteria Sumber Tugas yang Diberi Nilai A',
        content: '"Guru akan memberi nilai tinggi jika daftar pustaka berasal dari dokumen resmi perpustakaan nasional atau web kebudayaan resmi, bukan dari blogspot anonim."',
        highlight: 'Kualitas Nilai Tugas Bergantung pada Kredibilitas Sumber yang Ditemukan'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-bse1',
        text: 'Mengetik kata kunci yang terlalu pendek dan umum sehingga mesin pencari bingung maksud tujuan kita',
        category: 'Kata Kunci Kurang Tepat',
        isRootCause: true,
        explanation: 'Google menampilkan apa yang paling populer dicari turis jika kita tidak memberikan kata kunci spesifik pelajaran.'
      },
      {
        id: 'cau-bse2',
        text: 'Langsung mengklik link nomor 1 tanpa membaca keterangan bahwa link tersebut adalah iklan bersponsor',
        category: 'Kurang Teliti',
        isRootCause: true,
        explanation: 'Iklan berbayar selalu ditempatkan paling atas untuk menarik pembeli, bukan pembaca tugas.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-bse1',
        title: 'Gunakan Jurus Filter: site:.kemdikbud.go.id dan filetype:pdf',
        category: 'Langkah Praktis',
        desc: 'Ketikkan di kotak pencarian: "arsitektur relief candi borobudur" site:kemdikbud.go.id filetype:pdf untuk langsung mendapatkan naskah dokumen resmi.',
        impactScore: 40
      },
      {
        id: 'act-bse2',
        title: 'Lewati 3 Link Teratas yang Bertuliskan "Sponsor / Ad"',
        category: 'Langkah Praktis',
        desc: 'Scroll sedikit ke bawah untuk menemukan hasil pencarian murni yang bukan iklan jualan tiket wisata.',
        impactScore: 35
      },
      {
        id: 'act-bse3',
        title: 'Simpan Halaman Bagus Menggunakan Fitur Bookmark Bintang (Ctrl + D)',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Beri tanda bintang pada web terpercaya agar mudah dibuka kembali saat mengetik daftar pustaka laporan.',
        impactScore: 25
      }
    ],
    deliverableName: 'Cheat Sheet Cerdas: 5 Jurus Kilat Menemukan Materi Tugas di Google Search',
    reflectionPrompt: 'Bagaimana keterampilan mencari informasi yang tepat di internet akan membantumu saat kuliah dan bekerja nanti?'
  },

  // ==========================================
  // 12. KELAS 7: APLIKASI LEMBAR KERJA GOOGLE SHEETS
  // ==========================================
  'k7-gsheet': {
    topicId: 'k7-gsheet',
    title: 'Buku Kas Kelas Basah Kena Air: Saatnya Beralih ke Google Sheets!',
    headline: 'Uang Kas Selisih Rp 30.000 Gara-Gara Catatan Sobek: Bendahara Pusing Tujuh Keliling!',
    contextStory:
      'Bendahara kelas 7 masih mencatat iuran kas mingguan di buku tulis bersampul kertas tipis. Saat kerja kelompok, botol minum teman tersenggol dan membasahi buku kas hingga tulisan angka buram. Saat dihitung ulang, uang di dompet kas selisih Rp 30.000 dari catatan karena ada angka yang luntur. Seluruh teman sekelas bingung siapa yang sudah bayar dan siapa yang belum. Kelompokmu ditantang menyelidiki masalah ini dan merancang buku kas digital menggunakan Google Sheets!',
    location: 'Ruang Kelas 7 SMPN 5 Kroya',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara membuat tabel kas digital di Google Sheets yang bisa menghitung otomatis, rapi, dan tidak takut hilang atau basah?',
    whatWeKnow: [
      'Buku tulis kertas mudah sobek, basah terkena air, dan rawan salah hitung saat menjumlahkan uang puluhan siswa.',
      'Teman sekelas sering bingung mengecek catatan pembayaran karena buku hanya dipegang bendahara.',
      'Aplikasi Google Sheets dapat dibuka dari HP atau komputer dan tersimpan di akun Google.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Kolom apa saja yang harus dibuat di tabel Google Sheets agar catatan kas mingguan rapi?',
      'Kisi-kisi 2: Rumus fungsi apa di Google Sheets yang dipakai untuk menjumlahkan seluruh uang kas secara otomatis tanpa kalkulator?',
      'Kisi-kisi 3: Pengaturan izin bagikan (Share) apa yang aman dipilih agar teman sekelas bisa melihat kas tanpa sengaja menghapus angkanya?'
    ],
    clues: [
      {
        id: 'gsh-c1',
        source: 'Kondisi Buku Kas Fisik',
        type: 'document',
        title: 'Halaman Buku yang Rusak Terkena Air',
        content: 'Tinta pulpen luntur menjadi noda biru besar pada baris nomor 15 sampai 22. Angka nominal Rp 5.000 berubah menjadi coretan tak terbaca.',
        highlight: 'Catatan Fisik Rentan Terhadap Kerusakan dan Tumpahan Cairan'
      },
      {
        id: 'gsh-c2',
        source: 'Hasil Uji Coba Rumus Google Sheets',
        type: 'metric',
        title: 'Kecepatan Menghitung Saldo Otomatis',
        content: 'Dengan mengetikkan rumus =SUM(C2:C33), total kas kelas langsung muncul dalam 0.1 detik. Jika ada siswa yang baru membayar, angka saldo bertambah sendiri secara otomatis.',
        highlight: 'Otomatis Menghitung Tanpa Perlu Bantuan Kalkulator Tangan'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-gsh1',
        text: 'Masih bertahan memakai buku kertas padahal setiap siswa memiliki akun belajar digital',
        category: 'Kebiasaan Lama',
        isRootCause: true,
        explanation: 'Buku fisik mudah tercecer, basah, dan membutuhkan kalkulator manual yang rawan salah pencet.'
      },
      {
        id: 'cau-gsh2',
        text: 'Tidak ada cadangan (backup) catatan sehingga saat buku rusak, data uang kas hilang total',
        category: 'Ketiadaan Cadangan Data',
        isRootCause: true,
        explanation: 'Google Sheets menyimpan riwayat revisi otomatis di cloud setiap kali ada perubahan angka.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-gsh1',
        title: 'Rancang Template Kas Kelas Digital dengan Rumus =SUM() Otomatis',
        category: 'Langkah Praktis',
        desc: 'Buat kolom Nomor, Nama, Minggu 1 s.d 4, dan Total. Di baris paling bawah, pasang rumus =SUM() agar saldo kas selalu terhitung otomatis.',
        impactScore: 40
      },
      {
        id: 'act-gsh2',
        title: 'Bagikan Link Google Sheets ke Grup WhatsApp Kelas Mode "Viewer"',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Seluruh teman sekelas dan wali kelas bisa mengecek transparansi uang kas kapan saja dari HP mereka sendiri.',
        impactScore: 35
      },
      {
        id: 'act-gsh3',
        title: 'Beri Warna Hijau untuk Siswa yang Lunas dengan Conditional Formatting',
        category: 'Langkah Praktis',
        desc: 'Warna visual memudahkan bendahara melihat sekilas siapa yang sudah membayar tanpa pusing membaca deretan angka.',
        impactScore: 25
      }
    ],
    deliverableName: 'Buku Kas Digital Kelas 7 Berbasis Google Sheets dengan Rumus Otomatis',
    reflectionPrompt: 'Bagaimana keterbukaan data kas di Google Sheets bisa meningkatkan rasa percaya dan kekompakan di dalam kelas?'
  },

  // ==========================================
  // 13. KELAS 7: APLIKASI PENGOLAH DOKUMEN GOOGLE DOCS
  // ==========================================
  'k7-gdoc': {
    topicId: 'k7-gdoc',
    title: 'Makalah Kelompok yang Font dan Spasinya Belang-Belang',
    headline: '5 Orang Ngetik Sendiri-Sendiri di Flashdisk: Saat Digabung Formatnya Hancur Total!',
    contextStory:
      'Kelompok 2 kelas 7 mengumpulkan tugas makalah Bahasa Indonesia. Saat dicetak guru, tampilannya sangat berantakan: halaman 1 memakai huruf Comic Sans ukuran 14 warna biru, halaman 2 Arial spasi rapat, halaman 3 Times New Roman ukuran 11, dan nomor halaman tidak urut. Ternyata setiap anggota mengetik di laptop berbeda menggunakan flashdisk, lalu digabung terburu-buru 5 menit sebelum bel masuk. Kelompokmu ditantang mencari tahu cara kerja kolaborasi di Google Docs agar makalah kelompok rapi dan cepat selesai!',
    location: 'Ruang Kelas 7 & Rumah Siswa',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara kerja kelompok mengetik naskah tugas bersama secara online di Google Docs agar formatnya seragam, rapi, dan selesai lebih cepat?',
    whatWeKnow: [
      'Mengetik tugas kelompok di file terpisah menyebabkan jenis huruf, ukuran, dan spasi berantakan saat digabung.',
      'Anggota kelompok kehabisan waktu hanya untuk menyalin-tempel (copy-paste) potongan file dari flashdisk.',
      'Google Docs memungkinkan seluruh anggota kelompok mengetik bersama di satu dokumen yang sama.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Aturan jenis huruf (font), ukuran huruf, spasi baris, dan perataan teks apa yang perlu disepakati kelompok sejak awal?',
      'Kisi-kisi 2: Bagaimana cara membagi bab/halaman kerja di satu dokumen Google Docs agar ketikan teman tidak saling bertabrakan?',
      'Kisi-kisi 3: Fitur apa di Google Docs yang bisa dipakai untuk memberi saran perbaikan tanpa langsung menghapus ketikan teman?'
    ],
    clues: [
      {
        id: 'gdc-c1',
        source: 'Hasil Cetakan Makalah Kelompok 2',
        type: 'document',
        title: 'Catatan Merah Guru di Makalah',
        content: '"Format dokumen tidak rapi. Bab 1 margin 4 cm, Bab 2 margin 2 cm. Tulisan terlihat seperti dikerjakan asal tempel tanpa koordinasi tim."',
        highlight: 'Ketidaksamaan Format Menurunkan Nilai Kerapian Tugas'
      },
      {
        id: 'gdc-c2',
        source: 'Riwayat Versi di Google Docs',
        type: 'log',
        title: 'Fitur Version History Google Docs',
        content: 'Google Docs mencatat siapa yang mengetik kalimat mana dengan warna kursor berbeda. Jika ada anggota yang tidak sengaja menghapus teks, teks bisa dikembalikan dalam 1 klik.',
        highlight: 'Aman dari Salah Hapus dan Terlihat Siapa yang Benar-Benar Bekerja'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-gdc1',
        text: 'Membagi tugas dengan cara kuno: menyuruh tiap orang mengetik file terpisah di flashdisk tanpa template baku',
        category: 'Metode Kerja Kelompok Kuno',
        isRootCause: true,
        explanation: 'Setiap laptop memiliki pengaturan font bawaan yang berbeda sehingga saat digabung selalu berantakan.'
      },
      {
        id: 'cau-gdc2',
        text: 'Tidak ada ketua kelompok yang bertugas mengunci format gaya huruf sejak awal',
        category: 'Koordinasi Tim',
        isRootCause: true,
        explanation: 'Template naskah bersama harus dibuat di awal sebelum semua orang mulai mengetik isi materi.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-gdc1',
        title: 'Bikin 1 File Google Docs Bersama dan Kunci Format Baku Sejak Awal',
        category: 'Langkah Praktis',
        desc: 'Tentukan aturan: Font Times New Roman 12, spasi 1.5, margin normal. Bagikan link dokumen dengan izin "Editor" ke seluruh anggota tim.',
        impactScore: 40
      },
      {
        id: 'act-gdc2',
        title: 'Bagi Halaman Kerja dengan Memberi Nama Anggota di Judul Bab',
        category: 'Langkah Praktis',
        desc: 'Tuliskan: Bab 1 (Dikerjakan Siti), Bab 2 (Dikerjakan Budi) agar semua orang mengetik di bagiannya masing-masing tanpa tabrakan kursor.',
        impactScore: 35
      },
      {
        id: 'act-gdc3',
        title: 'Gunakan Fitur Komentar untuk Mengoreksi Ketikan Teman yang Typo',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Jangan langsung menghapus tulisan teman. Tandai kata yang keliru dan beri catatan saran perbaikan yang sopan.',
        impactScore: 25
      }
    ],
    deliverableName: 'Template Naskah Makalah Standar SMPN 5 Kroya Menggunakan Google Docs',
    reflectionPrompt: 'Mengapa bekerja bersama di satu dokumen daring melatih kita untuk menghargai karya teman dan saling melengkapi?'
  },

  // ==========================================
  // 14. KELAS 8: PENGOLAH DATA MICROSOFT EXCEL
  // ==========================================
  'k8-excel': {
    topicId: 'k8-excel',
    title: 'Membantu Guru Merekap Nilai Ujian 32 Siswa Tanpa Pusing Kalkulator',
    headline: 'Guru Menghitung Rata-Rata Manual 3 Jam: Siswa Bikin Rumus Logika Excel 5 Detik!',
    contextStory:
      'Wali kelas 8 sedang duduk kelelahan di ruang guru. Beliau harus merekapitulasi nilai tugas 1, tugas 2, dan ujian akhir dari 32 siswa untuk menentukan siapa yang "Tuntas" (nilai minimal 75) dan siapa yang harus ikut "Remedial". Menghitung satu per satu dengan kalkulator tangan memakan waktu lebih dari 3 jam dan sering keliru. Kelompokmu ditantang menyelidiki cara mengotomatiskan rekap nilai ini menggunakan rumus di Microsoft Excel!',
    location: 'Ruang Guru & Lab Komputer SMPN 5 Kroya',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara memanfaatkan rumus di Microsoft Excel agar rekapitulasi nilai rata-rata dan status kelulusan puluhan siswa selesai dalam hitungan detik?',
    whatWeKnow: [
      'Menghitung rata-rata dan menentukan kelulusan 32 siswa dengan kalkulator manual sangat lama dan rawan salah pencet.',
      'Syarat tuntas belajar: jika nilai rata-rata >= 75 maka "TUNTAS", jika di bawah 75 maka "REMEDIAL".',
      'Microsoft Excel memiliki fitur rumus otomatis yang bisa ditarik ke bawah untuk seluruh baris siswa.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Rumus fungsi apa di Excel yang digunakan untuk menghitung nilai rata-rata dari beberapa kolom nilai?',
      'Kisi-kisi 2: Rumus fungsi logika apa di Excel yang bisa otomatis menuliskan kata "TUNTAS" atau "REMEDIAL" sesuai nilai KKM 75?',
      'Kisi-kisi 3: Fitur pewarnaan otomatis apa di Excel yang bisa memberi warna merah pada nilai di bawah 75 agar langsung terlihat?'
    ],
    clues: [
      {
        id: 'exc-c1',
        source: 'Hasil Uji Kecepatan Rumus vs Kalkulator',
        type: 'metric',
        title: 'Perbandingan Waktu Kerja Rekap Nilai',
        content: 'Menghitung 32 siswa pakai kalkulator = 45 menit (ada 3 salah hitung). Memakai rumus Excel lalu klik dua kali fill handle = 4 detik (akurasi 100%).',
        highlight: 'Excel 600 Kali Lebih Cepat dan Bebas Salah Hitung'
      },
      {
        id: 'exc-c2',
        source: 'Contoh Data Nilai Siswa',
        type: 'document',
        title: 'Tabel Nilai Siswa',
        content: 'Siswa bernama Dimas mendapat nilai 80, 70, 75. Rata-rata = 75. Dengan rumus IF, komputer otomatis menuliskan kata "TUNTAS" dengan latar warna hijau.',
        highlight: 'Logika Komputer Mengambil Keputusan Berdasarkan Syarat Angka'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-exc1',
        text: 'Belum terbiasa menggunakan rumus fungsi logika sehingga pekerjaan yang bisa diotomatisasi tetap dikerjakan manual',
        category: 'Kurang Keterampilan Excel',
        isRootCause: true,
        explanation: 'Banyak orang mengira Excel hanya sekadar buku kotak-kotak untuk mengetik tabel, bukan alat hitung cerdas.'
      },
      {
        id: 'cau-exc2',
        text: 'Takut salah memasukkan simbol koma (,) atau titik koma (;) pada penulisan rumus',
        category: 'Hambatan Sintaks Rumus',
        isRootCause: true,
        explanation: 'Rumus Excel butuh ketelitian pada tanda baca pemisah argumen sesuai pengaturan komputer.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-exc1',
        title: 'Pasang Rumus =AVERAGE() di Kolom Rata-Rata dan =IF() di Kolom Keterangan',
        category: 'Langkah Praktis',
        desc: 'Ketik =AVERAGE(C2:E2) di sel F2, lalu ketik =IF(F2>=75; "TUNTAS"; "REMEDIAL") di sel G2. Tarik kotak kecil di pojok sel ke bawah untuk seluruh 32 siswa.',
        impactScore: 40
      },
      {
        id: 'act-exc2',
        title: 'Aktifkan Conditional Formatting Warna Merah untuk Nilai Kurang dari 75',
        category: 'Langkah Praktis',
        desc: 'Blok kolom nilai, pilih Highlight Cells Rules -> Less Than -> 75 -> Light Red Fill. Nilai yang butuh remedial langsung menyala merah terang.',
        impactScore: 35
      },
      {
        id: 'act-exc3',
        title: 'Simpan Template Rekap Nilai sebagai Master File untuk Dipakai Setiap Ulangan',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Guru tinggal mengganti angka nilai di pertemuan berikutnya dan seluruh keterangan kelulusan akan langsung diperbarui otomatis.',
        impactScore: 25
      }
    ],
    deliverableName: 'Buku Rekap Nilai Otomatis Excel dengan Fungsi Logika IF dan Rata-Rata',
    reflectionPrompt: 'Bagaimana rumus Excel bisa membantu kita mengelola tabungan harian atau anggaran belanja kegiatan sekolah?'
  },

  // ==========================================
  // 15. KELAS 7: APLIKASI PRESENTASI GOOGLE SLIDES
  // ==========================================
  'k7-gslide': {
    topicId: 'k7-gslide',
    title: 'Menyelamatkan Presentasi Kelas yang Bikin Penonton Mengantuk',
    headline: 'Slide Penuh Tumpukan Paragraf Wikipedia: Teman Sekelas Menguap dan Guru Menggelengkan Kepala!',
    contextStory:
      'Saat giliran kelompok 1 maju ke depan kelas untuk mempresentasikan materi "Ekosistem Hutan Mangrove" di layar sentuh IFP, suasana kelas menjadi sangat membosankan. Slide yang ditampilkan dipenuhi teks hitam panjang hasil copy-paste dari Wikipedia tanpa gambar pendukung. Hurufnya sangat kecil sehingga siswa di baris belakang tidak bisa membaca. Penyaji hanya berdiri membaca teks di layar sambil membelakangi teman-temannya. Kelompokmu ditantang mencari tahu cara merombak slide ini agar menarik dan mudah dipahami!',
    location: 'Ruang Kelas 7 (Depan Layar Sentuh IFP)',
    urgencyLevel: 'Biasa',
    drivingQuestion:
      'Bagaimana cara mendesain slide presentasi di Google Slides yang ringkas, penuh visual menarik, dan membuat teman sekelas betah mendengarkan penjelasan kita?',
    whatWeKnow: [
      'Menempel seluruh paragraf panjang ke slide presentasi membuat penonton di kelas bosan dan sulit membaca.',
      'Teman di meja baris belakang mengeluh ukuran huruf terlalu kecil dan rapat.',
      'Layar kelas sangat cocok menampilkan poin-poin singkat yang didukung foto atau diagram jelas.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Berapa jumlah baris dan kata maksimal yang ideal dalam 1 halaman slide agar tulisan tetap besar dan terbaca dari belakang kelas?',
      'Kisi-kisi 2: Bagaimana perbandingan komposisi antara poin tulisan dan gambar ilustrasi di dalam sebuah slide presentasi?',
      'Kisi-kisi 3: Bagaimana sikap tubuh dan pandangan mata yang baik saat menjelaskan slide di depan teman-teman sekelas?'
    ],
    clues: [
      {
        id: 'gsl-c1',
        source: 'Umpan Balik dari Teman Sekelas Baris Belakang',
        type: 'interview',
        title: 'Keluhan Teman di Kursi Belakang',
        content: '"Kami tidak bisa membaca tulisannya karena terlalu kecil dan rapat. Presenternya juga hanya membaca slide membelakangi kami."',
        highlight: 'Ukuran Huruf Terlalu Kecil (< 18pt) dan Paragraf Terlalu Padat'
      },
      {
        id: 'gsl-c2',
        source: 'Hasil Riset Daya Ingat Visual Manusia',
        type: 'metric',
        title: 'Manusia Mengingat 80% dari Gambar dan 20% dari Teks',
        content: 'Penonton mengingat 80% informasi yang disajikan dalam bentuk gambar dan poin kunci, dibandingkan teks panjang yang hanya dibaca sekilas.',
        highlight: 'Ganti Paragraf Panjang dengan 1 Gambar Keren dan 3 Poin Penting'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-gsl1',
        text: 'Mengira presentasi yang bagus adalah presentasi yang menuliskan semua isi makalah ke layar',
        category: 'Kesalahpahaman Konsep',
        isRootCause: true,
        explanation: 'Slide adalah pemantik visual untuk presenter berbicara, bukan lembaran dokumen cetak.'
      },
      {
        id: 'cau-gsl2',
        text: 'Malas mencari gambar ilustrasi yang sesuai dan hanya menempel teks mentah dari internet',
        category: 'Kurang Desain Visual',
        isRootCause: true,
        explanation: 'Mencari gambar yang tepat membutuhkan sedikit usaha tapi hasilnya membuat penonton terpukau.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-gsl1',
        title: 'Terapkan Jurus 6x6: Ringkas Kalimat Panjang Menjadi Poin-Poin Kata Kunci',
        category: 'Langkah Praktis',
        desc: 'Hapus paragraf panjang. Ganti dengan judul berukuran 32pt dan maksimal 3-4 butir poin penting berukuran 24pt.',
        impactScore: 40
      },
      {
        id: 'act-gsl2',
        title: 'Pasang Foto Asli Hutan Mangrove yang Tajam Memenuhi Separuh Slide',
        category: 'Langkah Praktis',
        desc: 'Gunakan fitur "Sisipkan Gambar dari Web" di Google Slides untuk mencari foto beresolusi jernih yang memperjelas materi.',
        impactScore: 35
      },
      {
        id: 'act-gsl3',
        title: 'Latihan Presentasi: Tatap Mata Teman, Bukan Membelakangi Menatap Layar',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Gunakan slide sebagai pengingat topik, lalu jelaskan dengan gaya bahasamu sendiri secara santai dan percaya diri.',
        impactScore: 25
      }
    ],
    deliverableName: 'Slide Presentasi Interaktif Ramah Mata: 5 Slide Pukau Materi Ekosistem Hutan Mangrove',
    reflectionPrompt: 'Mengapa kemampuan mendesain slide yang memikat akan sangat berguna untuk presentasi tugasmu di masa depan?'
  },

  // ==========================================
  // 16. KELAS 8: KOMUNIKASI & KOLABORASI DI RUANG DIGITAL
  // ==========================================
  'k8-digital-etika': {
    topicId: 'k8-digital-etika',
    title: 'Teguran Guru Gara-Gara Kirim Pesan "P, Tugasnya Apa Ya?" Malam Hari',
    headline: 'Maksud Hati Menanyakan PR, Malah Ditegur di Depan Kelas: Belajar Tata Krama Chatting!',
    contextStory:
      'Seorang siswa kelas 8 mengirim pesan WhatsApp ke guru mata pelajaran pada pukul 22.45 malam. Pesannya sangat singkat: "P, bsk ada pr g?". Guru baru membacanya pagi hari dan menegur di kelas bahwa cara berkirim pesan seperti itu kurang sopan karena tidak ada salam pembuka, nama siswa, kelas, dan dikirim pada jam istirahat malam. Siswa tersebut merasa malu karena belum tahu cara yang benar. Kelompokmu ditantang menyusun panduan sopan santun berkirim pesan (Netiket) untuk seluruh siswa!',
    location: 'Grup WhatsApp Kelas 8 & Ruang Belajar',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana format dan etika berkirim pesan digital yang sopan kepada guru dan teman agar tidak menyinggung perasaan dan pesan kita dibalas dengan senang hati?',
    whatWeKnow: [
      'Ada siswa yang mengirim huruf "P" dan singkatan tidak jelas ke nomor WhatsApp guru pada jam 22.45 malam.',
      'Guru memiliki ratusan siswa sehingga sering tidak hafal nomor HP siswa jika tidak menyebutkan nama dan kelas.',
      'Mengirim pesan di larut malam dapat mengganggu waktu istirahat guru dan keluarganya.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Apa saja urutan bagian kalimat yang wajib ada saat mengirim pesan WhatsApp pertama kali kepada guru?',
      'Kisi-kisi 2: Pukul berapa batas waktu yang sopan untuk menghubungi guru terkait urusan sekolah/tugas?',
      'Kisi-kisi 3: Kata sapaan apa yang sebaiknya digunakan untuk menggantikan kebiasaan mengetik huruf "P"?'
    ],
    clues: [
      {
        id: 'eti-c1',
        source: 'Contoh Pesan Asli yang Dikirim ke Guru',
        type: 'document',
        title: 'Tangkapan Layar Chat Siswa Pukul 22.45',
        content: '"P\nP\nBsk pr nya apa y bu?"',
        highlight: 'Tidak Ada Salam, Tidak Ada Nama, Menggunakan Singkatan Kasar dan Dikirim Malam Hari'
      },
      {
        id: 'eti-c2',
        source: 'Nasihat dari Wali Kelas 8',
        type: 'interview',
        title: 'Bagaimana Chat yang Bikin Guru Senang Membalas',
        content: '"Guru memiliki ratusan murid dan nomornya sering belum tersimpan. Selalu tulis: Assalamu\'alaikum Ibu, maaf mengganggu waktunya, saya Budi kelas 8B, izin bertanya..."',
        highlight: 'Format Sopan Menunjukkan Akhlak Mulia dan Profil Lulusan Kemendikdasmen'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-eti1',
        text: 'Menyamakan cara berkirim chat ke guru seperti mengirim chat santai ke teman sebaya saat main game online',
        category: 'Kurang Paham Konteks',
        isRootCause: true,
        explanation: 'Komunikasi resmi dengan orang tua atau guru memiliki norma sopan santun yang berbeda dengan obrolan game.'
      },
      {
        id: 'cau-eti2',
        text: 'Menganggap tombol "P" adalah hal wajar tanpa tahu artinya bagi penerima pesan',
        category: 'Kebiasaan Buruk',
        isRootCause: true,
        explanation: 'Huruf P berulang-ulang berkesan menuntut dan memaksa orang lain segera membalas.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-eti1',
        title: 'Terapkan Rumus 5 Bagian Chat Baku: Salam, Maaf, Nama, Keperluan, Terima Kasih',
        category: 'Langkah Praktis',
        desc: 'Contoh: "Selamat sore Pak Guru, mohon maaf mengganggu waktunya. Saya Rizky kelas 8A. Izin bertanya untuk tugas IPA nomor 4 apakah dikerjakan di buku tulis? Terima kasih banyak Pak."',
        impactScore: 40
      },
      {
        id: 'act-eti2',
        title: 'Patuhi Jam Tenang: Jangan Kirim Pesan Terkait Tugas di Atas Pukul 20.00 Malam',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Jika ada hal darurat di malam hari, catat dulu pertanyaannya dan kirimkan besok pagi pukul 07.00 saat guru sudah siap bertugas.',
        impactScore: 35
      },
      {
        id: 'act-eti3',
        title: 'Hapus Kebiasaan Mengetik "P" di Semua Aplikasi Pesan',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Awali selalu pesan dengan sapaan ramah seperti "Halo", "Selamat Pagi", atau "Permisi".',
        impactScore: 25
      }
    ],
    deliverableName: 'Stiker Panduan & Piagam Sopan Santun Chatting (Netiket) Kelas 8 SMPN 5 Kroya',
    reflectionPrompt: 'Bagaimana perasaanmu jika orang lain mengirim pesan kepadamu dengan sopan dan menghargai waktumu?'
  },

  // ==========================================
  // 17. KELAS 9: RUANG PUBLIK VIRTUAL
  // ==========================================
  'k9-ruang-publik-virtual': {
    topicId: 'k9-ruang-publik-virtual',
    title: 'Perang Komentar Medsos Pemilihan Ketua OSIS: Lupa Bahwa Jejak Digital Itu Abadi!',
    headline: 'Saling Sindir dan Bikin Stiker Ejekan di Kolom Komentar: Saatnya Sadar Bahaya Jejak Digital!',
    contextStory:
      'Menjelang pemilihan Ketua OSIS baru di SMPN 5 Kroya, panitia mengunggah video visi-misi kedua pasangan calon di akun Instagram sekolah. Di kolom komentar, suasana persaingan berubah menjadi panas. Beberapa akun pendukung mulai saling menyindir kelemahan fisik calon lain, memakai kata-kata kasar, dan bahkan membuat stiker meme mengejek di grup WhatsApp angkatan. Suasana pertemanan di kelas 9 menjadi dingin dan terpecah. Kelompokmu ditantang menyelidiki dampak kasus ini dan merancang solusi agar ruang medsos sekolah kembali damai!',
    location: 'Akun Instagram Sekolah & Forum Diskusi Siswa',
    urgencyLevel: 'Penting',
    drivingQuestion:
      'Bagaimana cara kita menjaga sikap bijak dan toleran saat berbeda pilihan di media sosial agar tidak merusak pertemanan dan masa depan kita?',
    whatWeKnow: [
      'Perbedaan dukungan calon ketua OSIS memicu komentar sindiran dan pembuatan stiker ejekan di grup siswa.',
      'Banyak siswa merasa bebas mengetik kalimat kasar karena berada di balik layar HP.',
      'Semua komentar dan tangkapan layar (screenshot) di internet dapat tersimpan selamanya sebagai jejak digital.'
    ],
    whatWeNeedToLearn: [
      'Kisi-kisi 1: Pertanyaan saringan apa saja yang harus kita pikirkan sebelum memencet tombol "Kirim" pada kolom komentar medsos?',
      'Kisi-kisi 2: Tindakan nyata apa yang harus dilakukan kedua kubu pendukung agar suasana pemilihan OSIS kembali rukun?',
      'Kisi-kisi 3: Apa yang harus dilakukan siswa jika melihat komentar atau stiker yang merendahkan teman di grup kelas?'
    ],
    clues: [
      {
        id: 'rpv-c1',
        source: 'Tangkapan Layar Komentar Instagram Sekolah',
        type: 'document',
        title: 'Komentar Menyerang Pribadi di Video Visi Misi',
        content: '"Calon nomor 2 penakut dan bicaranya gagap, jangan dipilih!". Komentar tersebut mendapat balasan saling balas ejekan sebanyak 40 komentar penuh emosi.',
        highlight: 'Menyerang Fisik dan Karakter Bukan Menilai Visi Misi'
      },
      {
        id: 'rpv-c2',
        source: 'Hasil Wawancara Konseling Siswa',
        type: 'interview',
        title: 'Perasaan Siswa yang Jadi Korban Stiker Ejekan',
        content: '"Saya sedih melihat stiker foto saya dijadikan bahan tertawaan di grup angkatan. Padahal kita semua teman sekelas."',
        highlight: 'Candaan yang Menyakiti Hati Orang Lain Bukan Lagi Lelucon, Tapi Bullying'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-rpv1',
        text: 'Mengira dunia maya adalah tempat bebas tanpa aturan di mana kita boleh mengetik apa saja tanpa tanggung jawab',
        category: 'Ilusi Kebebasan Daring',
        isRootCause: true,
        explanation: 'Di balik setiap akun media sosial ada manusia sungguhan yang punya hati dan perasaan.'
      },
      {
        id: 'cau-rpv2',
        text: 'Ikut-ikutan tren menghujat agar dianggap gaul oleh kelompok teman sebaya',
        category: 'Pengaruh Teman Sebaya',
        isRootCause: true,
        explanation: 'Tekanan pergaulan sering membuat siswa lupa memfilter kata-kata baik.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-rpv1',
        title: 'Terapkan Saringan T-H-I-N-K Sebelum Mengirim Komentar di Media Sosial',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Tanyakan pada diri sendiri: Apakah kata-kataku ini Benar, Membantu, Menginspirasi, Perlu, dan Santun? Jika tidak, hapus dan jangan dikirim.',
        impactScore: 40
      },
      {
        id: 'act-rpv2',
        title: 'Deklarasi Damai Pemilihan OSIS: Hapus Stiker Ejekan & Bersalaman Antarpendukung',
        category: 'Langkah Praktis',
        desc: 'Kedua pasangan calon membuat video bersama mengajak seluruh pendukung untuk berkampanye secara damai dan adu gagasan positif.',
        impactScore: 35
      },
      {
        id: 'act-rpv3',
        title: 'Laporkan (Report) & Tegur Santun Komentar Kasar yang Merugikan Teman',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Jangan ikut memberikan like atau menertawakan perundungan siber. Berani bersuara membela teman yang diejek.',
        impactScore: 25
      }
    ],
    deliverableName: 'Deklarasi Pelajar Keren: 5 Komitmen Menjaga Ruang Publik Virtual yang Aman & Menyenangkan',
    reflectionPrompt: 'Jejak digital seperti apa yang ingin kamu tinggalkan di internet agar kelak bisa dibanggakan oleh orang tua dan dirimu sendiri?'
  },

  // ==========================================
  // KELAS 8: REKAM JEJAK DIGITAL, TOLERANSI & EMPATI, DAN PERUNDUNGAN DI DUNIA DIGITAL
  // ==========================================
  'k8-rekam-jejak-digital': {
    topicId: 'k8-rekam-jejak-digital',
    title: 'Rekam Jejak Digital, Toleransi & Empati, dan Perundungan di Dunia Digital',
    headline: 'Jejak Digital Masa Lalu & Perselisihan di Grup Media Sosial Pelajar',
    contextStory: 'Seorang siswa berprestasi di kelas 8 tiba-tiba murung dan enggan berangkat sekolah. Setelah ditelusuri oleh tim detektif siber sekolah, beredar tangkapan layar (screenshot) komentar bernada ejekan dari akun anonim di media sosial yang mengejek fisik dan menyebarkan foto aib masa lalunya. Hal ini memicu aksi cyberbullying berantai di grup obrolan. Tim penyelidik siswa ditugaskan mencari akar penyebab, membongkar bahaya jejak digital pasif/aktif, dan merumuskan langkah perlindungan serta piagam perdamaian digital.',
    location: 'Laboratorium Informatika & Ruang OSIS SMPN 5 Kroya',
    urgencyLevel: 'Mendesak',
    drivingQuestion: 'Bagaimana cara kita melindungi diri dari perundungan siber (cyberbullying), menjaga rekam jejak digital tetap positif, serta membudayakan empati dan toleransi di dunia maya?',
    whatWeKnow: [
      'Rekam jejak digital di internet bersifat permanen dan sangat sulit dihapus sepenuhnya.',
      'Perundungan digital (cyberbullying) menimbulkan dampak psikologis berat bagi korban hingga enggan bersekolah.',
      'Banyak pelajar belum menyadari bahwa membuat akun palsu untuk mengejek orang lain melanggar hukum siber (UU ITE).',
      'Etika netiket dan saringan T.H.I.N.K. mampu memfilter emosi sebelum memposting komentar di media sosial.'
    ],
    whatWeNeedToLearn: [
      'Perbedaan rekam jejak digital aktif (postingan, komentar) vs pasif (IP, cookies, riwayat sistem).',
      'Berbagai bentuk cyberbullying: flaming, harassment, denigration, impersonation, outing, dan exclusion.',
      'Sikap toleransi digital dan cara melatih empati digital sebelum menekan tombol kirim pesan.',
      'Langkah taktis saat menjadi korban atau saksi perundungan: screenshot bukti, blokir, report, dan lapor ke guru BK.'
    ],
    clues: [
      {
        id: 'clue-rjd1',
        source: 'Tangkapan Layar Pesan Grup Chat',
        type: 'document',
        title: 'Arsip Gambar Ejekan & Komentar Kasar',
        content: 'Ditemukan tangkapan layar percakapan grup di mana beberapa akun mengirim stiker wajah teman yang diedit merendahkan dan kata-kata kasar dengan huruf kapital semua.',
        highlight: 'Ejekan berulang kali menggunakan stiker foto teman tanpa izin dan huruf kapital bernada memaki.'
      },
      {
        id: 'clue-rjd2',
        source: 'Wawancara dengan Teman Sekelas',
        type: 'interview',
        title: 'Kesaksian Rekan yang Melihat Kejadian',
        content: '"Sebenarnya awalnya cuma bercanda di jam istirahat, tapi ada yang memasukkannya ke medsos. Banyak yang ikut-ikutan tertawa karena takut dianggap sok suci kalau membela korban."',
        highlight: 'Bystander effect: Siswa lain ikut menertawakan karena takut dikucilkan jika bersuara membela.'
      },
      {
        id: 'clue-rjd3',
        source: 'Catatan Riwayat Rekam Jejak Akun',
        type: 'log',
        title: 'Jejak Waktu & Pembuatan Akun Samaran',
        content: 'Pemeriksaan log akun menunjukkan bahwa pelaku membuat akun palsu memakai nama samaran baru kemarin malam menggunakan jaringan internet lokal yang sama.',
        highlight: 'Pelaku mengira dengan menggunakan akun anonim, identitasnya tidak akan pernah bisa dilacak.'
      },
      {
        id: 'clue-rjd4',
        source: 'Buku Pedoman Tata Tertib & Bimbingan Konseling',
        type: 'metric',
        title: 'Ketentuan Penanganan Kasus Perundungan Siber',
        content: 'Tata tertib sekolah Pasal 12 menegaskan perlindungan martabat siswa dari segala bentuk cyberbullying dan kewajiban mengamankan bukti digital otentik sebelum sanksi diterapkan.',
        highlight: 'Bukti tangkapan layar asli dan saksi digital menjadi dasar penegakan aturan dan bimbingan psikologis.'
      }
    ],
    potentialCauses: [
      {
        id: 'cau-rjd1',
        text: 'Menganggap ejekan fisik dan foto aib di media sosial hanya lelucon biasa tanpa memikirkan perasaan korban',
        category: 'Kurangnya Empati Digital',
        isRootCause: true,
        explanation: 'Ketiadaan empati membuat seseorang tidak menyadari dampak kehancuran mental yang dialami korban perundungan.'
      },
      {
        id: 'cau-rjd2',
        text: 'Kurangnya pemahaman bahwa jejak digital bersifat abadi dan akun palsu tetap dapat dilacak',
        category: 'Literasi Rekam Jejak Digital',
        isRootCause: true,
        explanation: 'Banyak remaja mengira aktivitas di dunia maya bisa dihapus begitu saja tanpa konsekuensi masa depan.'
      },
      {
        id: 'cau-rjd3',
        text: 'Kecepatan internet laboratorium komputer sekolah sedang menurun',
        category: 'Teknis Jaringan',
        isRootCause: false,
        explanation: 'Kecepatan internet tidak menjadi penyebab munculnya perilaku perundungan dan ketidaksantunan.'
      },
      {
        id: 'cau-rjd4',
        text: 'Siswa lain memilih diam (bystander) dan tidak berani menegur atau melaporkan perundungan yang terjadi',
        category: 'Budaya Sosial Teman Sebaya',
        isRootCause: true,
        explanation: 'Sikap acuh tak acuh membiarkan pelaku merasa tindakannya diterima oleh kelompok.'
      }
    ],
    recommendedActions: [
      {
        id: 'act-rjd1',
        title: 'Terapkan Standar T.H.I.N.K. (True, Helpful, Inspiring, Necessary, Kind) Sebelum Memposting',
        category: 'Edukasi & Kebiasaan Baik',
        desc: 'Melatih setiap siswa untuk memeriksa kata-katanya apakah benar, bermanfaat, menginspirasi, perlu, dan santun sebelum mengirimkan komentar.',
        impactScore: 40
      },
      {
        id: 'act-rjd2',
        title: 'Prosedur Cepat Tanggap 4L (Laporkan, Lampirkan Bukti, Lepaskan Diri, Lindungi Teman)',
        category: 'Langkah Praktis',
        desc: 'Ambil tangkapan layar bukti siber, blokir akun perundung, jangan membalas dengan makian, dan segera laporkan kepada guru BK atau orang tua.',
        impactScore: 35
      },
      {
        id: 'act-rjd3',
        title: 'Deklarasi Damai & Piagam Komitmen Jejak Digital Bersih Pelajar Kelas VIII',
        category: 'Aturan & Kesepakatan Sekolah',
        desc: 'Menyusun kesepakatan bersama seluruh kelas untuk tidak membuat stiker ejekan wajah teman dan saling menguatkan di ruang siber.',
        impactScore: 25
      }
    ],
    deliverableName: 'Piagam Pelajar Beradab: 5 Komitmen Menjaga Rekam Jejak Positif & Bebas Perundungan Digital',
    reflectionPrompt: 'Jejak digital seperti apa yang ingin kamu tinggalkan di internet agar 10 tahun mendatang kelak bisa kamu banggakan di hadapan keluarga dan orang lain?'
  }
};

/**
 * Accessor function ensuring every topic gets its rich, SMP-tailored scenario
 */
export function getTopicPblScenario(
  topicId: string,
  topicTitle: string,
  grade: number,
  category: string
): PblScenario {
  if (DEDICATED_PBL_SCENARIOS[topicId]) {
    return DEDICATED_PBL_SCENARIOS[topicId];
  }

  // Fallback for safety
  return DEDICATED_PBL_SCENARIOS['k7-komputer'];
}
