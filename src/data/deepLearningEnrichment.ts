import { Topic, KeyConcept } from '../types/curriculum';

export interface DimensiProfilLulusan {
  id: string;
  nama: string;
  singkat: string;
  deskripsi: string;
  iconName: string;
  color: string;
  badgeClass: string;
}

export const DELAPAN_DIMENSI_PROFIL_LULUSAN: DimensiProfilLulusan[] = [
  {
    id: 'keimanan-ketaqwaan',
    nama: 'Keimanan dan Ketaqwaan terhadap Tuhan YME',
    singkat: 'Keimanan & Ketaqwaan',
    deskripsi: 'Menumbuhkan karakter religius, akhlak mulia, dan spiritualitas.',
    iconName: 'Heart',
    color: 'text-amber-600 dark:text-amber-400',
    badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
  },
  {
    id: 'kewargaan',
    nama: 'Kewargaan',
    singkat: 'Kewargaan',
    deskripsi: 'Mencakup cinta tanah air, taat aturan, tanggung jawab sosial, serta komitmen keberlanjutan dan nilai-nilai Pancasila.',
    iconName: 'ShieldCheck',
    color: 'text-rose-600 dark:text-rose-400',
    badgeClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'
  },
  {
    id: 'penalaran-kritis',
    nama: 'Penalaran Kritis',
    singkat: 'Penalaran Kritis',
    deskripsi: 'Kemampuan berpikir logis, analitis, dan reflektif.',
    iconName: 'Brain',
    color: 'text-indigo-600 dark:text-indigo-400',
    badgeClass: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
  },
  {
    id: 'kreativitas',
    nama: 'Kreativitas',
    singkat: 'Kreativitas',
    deskripsi: 'Sikap yang inovatif, fleksibel, dan orisinal.',
    iconName: 'Sparkles',
    color: 'text-purple-600 dark:text-purple-400',
    badgeClass: 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
  },
  {
    id: 'kolaborasi',
    nama: 'Kolaborasi',
    singkat: 'Kolaborasi',
    deskripsi: 'Semangat gotong royong dan kemampuan berbagi peran dalam mencapai tujuan bersama.',
    iconName: 'Users',
    color: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  },
  {
    id: 'kemandirian',
    nama: 'Kemandirian',
    singkat: 'Kemandirian',
    deskripsi: 'Memiliki inisiatif tinggi dan tidak terlalu bergantung pada orang lain.',
    iconName: 'UserCheck',
    color: 'text-emerald-600 dark:text-emerald-400',
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
  },
  {
    id: 'kesehatan',
    nama: 'Kesehatan',
    singkat: 'Kesehatan',
    deskripsi: 'Menjaga kebugaran fisik serta keseimbangan antara fisik dan mental.',
    iconName: 'Activity',
    color: 'text-teal-600 dark:text-teal-400',
    badgeClass: 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800'
  },
  {
    id: 'komunikasi',
    nama: 'Komunikasi',
    singkat: 'Komunikasi',
    deskripsi: 'Keterampilan komunikasi intrapribadi dan antarpribadi baik secara lisan maupun tulisan.',
    iconName: 'MessageCircle',
    color: 'text-sky-600 dark:text-sky-400',
    badgeClass: 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800'
  }
];

export interface ConceptDeepLearningData {
  deepQuestion: string; // Pertanyaan pemantik bernalar kritis (HOTS)
  realLifeConnection: string; // Hubungan nyata dengan kehidupan siswa SMP
  analogy: string; // Analogi ramah anak untuk pemahaman mendalam
  profilLulusanDimension: string; // 8 Dimensi Profil Lulusan Kemendikdasmen
  profilLulusanDesc: string; // Deskripsi resmi profil lulusan Kemendikdasmen
  pancasilaValue: string; // Alias kompatibilitas
  thoughtExperiment: string; // Uji penalaran / eksperimen pikiran
}

export interface TopicDeepLearningOverview {
  mindOnGoal: string; // Kognitif & Nalar
  handsOnGoal: string; // Praktik & Tindakan
  heartOnGoal: string; // Karakter & Nilai Etika
  essentialBigQuestion: string; // Pertanyaan Pemantik Utama
  metacognitivePrompts: {
    prompt: string;
    guidingInsight: string;
  }[];
}

// Data kurasi khusus pembelajaran mendalam per topik
export const TOPIC_DEEP_LEARNING_DATA: Record<string, TopicDeepLearningOverview> = {
  'k7-bk': {
    mindOnGoal: 'Menalar cara memecah masalah rumit menjadi bagian-bagian kecil (dekomposisi) dan merumuskan pola yang teratur.',
    handsOnGoal: 'Menyusun langkah terurut algoritma dan memilah data esensial dari data pengganggu melalui abstraksi.',
    heartOnGoal: 'Mengasah ketekunan, kejujuran berpikir logis, dan tanggung jawab dalam merancang solusi yang adil bagi sesama.',
    essentialBigQuestion: 'Mengapa manusia yang menguasai cara berpikir komputasional tidak mudah panik saat menghadapi masalah besar yang belum pernah ditemui sebelumnya?',
    metacognitivePrompts: [
      {
        prompt: 'Strategi berpikir apa yang paling membantuku saat membedah masalah yang tampak membingungkan?',
        guidingInsight: 'Dekomposisi membantu menurunkan beban mental karena kita hanya fokus menyelesaikan satu bagian kecil pada satu waktu.'
      },
      {
        prompt: 'Bagaimana cara saya membedakan informasi yang benar-benar penting (abstraksi) dari detail pengganggu?',
        guidingInsight: 'Tanyakan: "Jika detail ini saya hilangkan, apakah solusi utama masih tetap bisa bekerja?" Jika ya, maka abaikan detail tersebut.'
      },
      {
        prompt: 'Di kegiatan apa di rumah atau sekolah saya bisa langsung menerapkan 4 pilar BK hari ini?',
        guidingInsight: 'Bisa diterapkan saat merapikan kamar, mengatur waktu belajar ujian, hingga memasak resep baru.'
      }
    ]
  },
  'k7-komputer': {
    mindOnGoal: 'Memahami siklus hidup data: bagaimana ketukan tombol fisik diubah menjadi bit biner 0 & 1 hingga menjadi gambar di layar.',
    handsOnGoal: 'Mampu mengidentifikasi spesifikasi perangkat keras, merakit alur sistem bus, dan mendiagnosis masalah komputer secara mandiri.',
    heartOnGoal: 'Merawat peralatan teknologi sekolah dengan penuh tanggung jawab dan menghargai jerih payah inovator teknologi.',
    essentialBigQuestion: 'Bagaimana miliaran transistor mikroskopis di dalam CPU bisa bekerja sama tanpa pernah bertabrakan saat kita bermain game atau belajar?',
    metacognitivePrompts: [
      {
        prompt: 'Mengapa komputer memerlukan memori sementara (RAM) selain media penyimpanan permanen (SSD/Harddisk)?',
        guidingInsight: 'RAM bekerja secepat kilat untuk menyuapi CPU data yang sedang aktif, sedangkan SSD menyimpan berkas agar tidak hilang saat listrik padam.'
      },
      {
        prompt: 'Apa yang terjadi jika salah satu jalur bus sistem pada motherboard terputus?',
        guidingInsight: 'Komunikasi antar komponen macet total, seperti jalan tol utama yang runtuh sehingga pasokan data terhenti.'
      },
      {
        prompt: 'Bagaimana sikap saya ketika perangkat komputer di lab sekolah mengalami gangguan?',
        guidingInsight: 'Melakukan diagnosis awal dengan tenang tanpa memukul perangkat, lalu melaporkan kepada guru piket.'
      }
    ]
  },
  'k7-gdoc': {
    mindOnGoal: 'Memahami struktur hierarki dokumen (Heading, Paragraf, Tabel) agar tulisan mudah dibaca dan dipahami orang lain.',
    handsOnGoal: 'Mampu memformat naskah secara profesional, menyisipkan elemen visual, dan berkolaborasi secara serentak di cloud.',
    heartOnGoal: 'Menumbuhkan budaya gotong royong, menghargai suntingan teman dalam dokumen bersama, dan tidak menghapus karya orang lain tanpa izin.',
    essentialBigQuestion: 'Mengapa dokumen yang diformat rapi dengan hierarki Heading jauh lebih dihargai dan dipercaya dibanding tulisan dengan font warna-warni yang acak-acakan?',
    metacognitivePrompts: [
      {
        prompt: 'Kapan sebaiknya saya menggunakan tabel dibanding sekadar daftar poin berbutir?',
        guidingInsight: 'Tabel digunakan saat kita perlu membandingkan dua dimensi data (seperti waktu, kegiatan, dan penanggung jawab) secara berdampingan.'
      },
      {
        prompt: 'Bagaimana fitur Riwayat Versi (Version History) melindungiku dari rasa takut berbuat salah saat menulis?',
        guidingInsight: 'Setiap ketukan tersimpan aman di cloud. Jika ada yang terhapus secara tidak sengaja, kita selalu bisa kembali ke versi sebelumnya dengan satu klik.'
      },
      {
        prompt: 'Etika apa yang wajib dijaga saat mengedit dokumen bersama teman sekelompok?',
        guidingInsight: 'Menggunakan fitur Komentar atau Mode Saran untuk memberi masukan daripada langsung menimpa tulisan teman.'
      }
    ]
  },
  'k8-rekam-jejak-digital': {
    mindOnGoal: 'Menganalisis dampak jangka panjang dari data yang pernah diunggah, dicari, dan dibagikan di internet.',
    handsOnGoal: 'Mampu melakukan audit privasi, mematikan pelacakan lokasi geotag, mengaktifkan 2FA, dan membersihkan jejak digital berisiko.',
    heartOnGoal: 'Membangun integritas moral digital, menjaga martabat diri sendiri, dan tidak menyebarkan jejak memalukan teman (cyber-bullying/doxing).',
    essentialBigQuestion: 'Jika internet tidak pernah benar-benar melupakan apa yang pernah kita posting, masa depan seperti apa yang sedang kita bangun lewat status medsos hari ini?',
    metacognitivePrompts: [
      {
        prompt: 'Sebelum membagikan foto atau cerita di media sosial, pertanyaan apa yang harus saya ajukan pada diri sendiri?',
        guidingInsight: 'Tanyakan: "Apakah saya bangga jika postingan ini dibaca oleh orang tua, guru, atau calon atasan kerja saya 10 tahun mendatang?"'
      },
      {
        prompt: 'Mengapa nomor HP dan tanggal lahir di kartu pelajar tergolong data pribadi yang sangat berbahaya jika diunggah?',
        guidingInsight: 'Data tersebut adalah kunci autentikasi perbankan dan akun medsos yang sering digunakan penipu siber untuk pembajakan identitas.'
      },
      {
        prompt: 'Apa komitmen nyata saya untuk melindungi teman yang fotonya disebarluaskan tanpa izin?',
        guidingInsight: 'Menolak meneruskan konten tersebut, mengingatkan pengunggah secara santun, dan membela hak privasi teman.'
      }
    ]
  },
  'k9-ruang-publik-virtual': {
    mindOnGoal: 'Mengevaluasi dinamika interaksi online, membedakan ruang privat vs publik, serta dampak algoritma media sosial.',
    handsOnGoal: 'Mampu memoderasi diskusi, menangkal ujaran kebencian, memverifikasi tautan mencurigakan, dan mengedukasi netiket.',
    heartOnGoal: 'Menjadi agen pembawa damai di ruang siber, mengedepankan empati, toleransi perbedaan pendapat, dan kesantunan berbahasa.',
    essentialBigQuestion: 'Bagaimana cara kita menjaga kehangatan kemanusiaan dan sopan santun ketika berkomunikasi lewat layar kaca tanpa bertatap muka langsung?',
    metacognitivePrompts: [
      {
        prompt: 'Mengapa orang di internet terkadang lebih mudah berkata kasar dibanding saat bertemu langsung di dunia nyata?',
        guidingInsight: 'Fenomena efek disinhibisi daring (merasa anonim dan tidak melihat ekspresi wajah lawan bicara) sering membuat orang lupa bahwa di balik layar ada manusia nyata yang memiliki perasaan.'
      },
      {
        prompt: 'Langkah apa yang saya ambil saat melihat perdebatan sengit yang mulai mengarah ke penghinaan fisik di grup kelas?',
        guidingInsight: 'Mengalihkan fokus ke topik yang sehat, mengingatkan kesepakatan bersama kelas, atau melapor secara privat kepada wali kelas.'
      },
      {
        prompt: 'Bagaimana jejak kesantunan saya di internet mencerminkan nilai-nilai luhur Pancasila?',
        guidingInsight: 'Kesantunan digital adalah wujud nyata Kemanusiaan yang Adil dan Beradab di era modern.'
      }
    ]
  }
};

/**
 * Mendapatkan pengayaan Pembelajaran Mendalam (Deep Learning)
 * untuk setiap konsep materi secara cerdas dan adaptif
 */
export function getConceptDeepLearningEnrichment(
  topic: Topic,
  concept: KeyConcept,
  index: number
): ConceptDeepLearningData {
  const t = topic.title.toLowerCase();
  const cTitle = concept.title.toLowerCase();

  // 1. Komputer / Hardware
  if (t.includes('komputer') || t.includes('hardware') || t.includes('perangkat keras')) {
    if (cTitle.includes('input') || cTitle.includes('masukan') || index === 0) {
      return {
        deepQuestion: 'Mengapa manusia membutuhkan perantara perangkat input untuk memerintah komputer?',
        realLifeConnection: 'Saat mengetik pesan di WhatsApp atau menekan tombol gamepad, perangkat masukan menerjemahkan niat pikiran kita menjadi denyut sinyal listrik.',
        analogy: 'Perangkat input ibarat panca indra (mata, telinga, sentuhan) yang menangkap rangsangan luar untuk dikirim ke otak.',
        profilLulusanDimension: 'Penalaran Kritis & Kemandirian',
        profilLulusanDesc: 'Kemampuan berpikir logis serta inisiatif tinggi dalam mengoperasikan perangkat secara bertanggung jawab.',
        pancasilaValue: 'Penalaran Kritis & Kemandirian',
        thoughtExperiment: 'Bayangkan jika mouse dan keyboard tidak pernah diciptakan, bagaimana cara kamu memberitahu komputer untuk membuka folder tugas?'
      };
    }
    if (cTitle.includes('proses') || cTitle.includes('cpu') || index === 1) {
      return {
        deepQuestion: 'Apa yang membedakan cara berpikir otak manusia dengan cara kalkulasi prosesor (CPU)?',
        realLifeConnection: 'CPU memproses miliaran hitungan matematika murni per detik, tetapi tetap membutuhkan instruksi manusia untuk tahu apa yang harus dihitung.',
        analogy: 'CPU ibarat koki ahli di dapur restoran: ia mampu memotong dan memasak secepat kilat sesuai resep yang diberikan pelanggan.',
        profilLulusanDimension: 'Penalaran Kritis & Kreativitas',
        profilLulusanDesc: 'Kemampuan berpikir analitis membedah alur instruksi serta sikap inovatif memahami mekanisme mikroprosesor.',
        pancasilaValue: 'Penalaran Kritis & Kreativitas',
        thoughtExperiment: 'Mengapa CPU yang bekerja terlalu keras menjadi sangat panas dan memerlukan kipas pendingin (heatsink)?'
      };
    }
    if (cTitle.includes('output') || cTitle.includes('keluaran') || index === 2) {
      return {
        deepQuestion: 'Mengapa format keluaran (output) harus disesuaikan dengan kebutuhan pengguna manusia?',
        realLifeConnection: 'Komputer menghasilkan output visual di monitor untuk dibaca mata, audio di speaker untuk didengar telinga, dan cetakan kertas untuk diarsipkan.',
        analogy: 'Perangkat output ibarat mulut atau tangan koki yang menyajikan masakan lezat ke atas piring saji meja makan.',
        profilLulusanDimension: 'Komunikasi & Kesehatan',
        profilLulusanDesc: 'Keterampilan menyampaikan informasi multimedia secara efektif serta menjaga kebugaran mata dan fisik saat menatap layar.',
        pancasilaValue: 'Komunikasi & Kesehatan',
        thoughtExperiment: 'Bagaimana para tunanetra menerima output dari komputer tanpa layar visual? (Jawabannya: melalui screen reader audio atau display huruf braille).'
      };
    }
    if (cTitle.includes('penyimpanan') || cTitle.includes('storage') || index === 3) {
      return {
        deepQuestion: 'Mengapa kita membutuhkan dua jenis penyimpanan: memori sementara (RAM) dan penyimpanan permanen (SSD/HDD)?',
        realLifeConnection: 'Saat kamu mengetik tugas sekolah sebelum sempat menekan Ctrl+S, tulisan masih berada di RAM. Jika listrik padam mendadak, data di RAM hilang.',
        analogy: 'RAM adalah meja belajar tempat kita membuka buku yang sedang dibaca, sedangkan SSD/HDD adalah lemari rak buku tempat menyimpan buku rapi selamanya.',
        profilLulusanDimension: 'Penalaran Kritis & Kemandirian',
        profilLulusanDesc: 'Kemampuan berpikir logis dalam manajemen berkas dan kebiasaan mandiri membuat cadangan data (backup).',
        pancasilaValue: 'Penalaran Kritis & Kemandirian',
        thoughtExperiment: 'Mengapa kecepatan SSD membuat laptop menyala (booting) hanya dalam hitungan detik dibanding harddisk piringan magnetik kuno?'
      };
    }
    return {
      deepQuestion: 'Bagaimana seluruh komponen komputer berkomunikasi secara sinkron tanpa terjadi tabrakan data?',
      realLifeConnection: 'Motherboard menyediakan jalur bus sistem dan chip pengatur lalu lintas data sehingga semua komponen bekerja kompak.',
      analogy: 'Motherboard adalah sistem jalan raya kota dengan rambu lalu lintas cerdas yang menghubungkan rumah, pabrik, dan kantor.',
      profilLulusanDimension: 'Kolaborasi & Penalaran Kritis',
      profilLulusanDesc: 'Semangat berbagi peran harmonis antarkomponen serta kemampuan analisis logis arsitektur sistem.',
      pancasilaValue: 'Kolaborasi & Penalaran Kritis',
      thoughtExperiment: 'Jika ada satu komponen rusak, bagaimana langkah berpikir terstrukturmu untuk mencari tahu komponen mana yang bermasalah?'
    };
  }

  // 2. Berpikir Komputasional (BK)
  if (t.includes('berpikir komputasional') || t.includes('computational thinking') || topic.id === 'k7-bk') {
    if (cTitle.includes('dekomposisi') || index === 0) {
      return {
        deepQuestion: 'Mengapa membagi masalah besar menjadi bagian kecil membuat kita tidak mudah stres dan lebih percaya diri?',
        realLifeConnection: 'Saat ditugasi membuat acara pentas seni kelas, membaginya ke seksi panggung, konsumsi, dan tata suara membuat pekerjaan selesai tepat waktu.',
        analogy: 'Makan kue tar raksasa tidak bisa langsung ditelan sekaligus, harus dipotong kecil-kecil per suapan agar nyaman dinikmati.',
        profilLulusanDimension: 'Kolaborasi & Kemandirian',
        profilLulusanDesc: 'Semangat gotong royong membagi tugas dan inisiatif tinggi menyelesaikan bagian masing-masing.',
        pancasilaValue: 'Kolaborasi & Kemandirian',
        thoughtExperiment: 'Uraikan tugas membersihkan seluruh rumah menjadi 4 sub-tugas kecil yang bisa dikerjakan bersama adik dan kakak!'
      };
    }
    if (cTitle.includes('pola') || index === 1) {
      return {
        deepQuestion: 'Bagaimana kemampuan membaca pola di masa lalu membantu kita memprediksi kejadian masa depan?',
        realLifeConnection: 'Jika kamu tahu setiap hari Senin gerbang sekolah selalu macet pukul 06.45, kamu berangkat lebih awal pukul 06.25.',
        analogy: 'Dokter mengenali pola gejala demam dan bintik merah untuk mendiagnosis penyakit tanpa harus menebak-nebak.',
        profilLulusanDimension: 'Penalaran Kritis & Kreativitas',
        profilLulusanDesc: 'Kemampuan berpikir analitis mencari keteraturan data dan fleksibel merancang solusi baru.',
        pancasilaValue: 'Penalaran Kritis & Kreativitas',
        thoughtExperiment: 'Pola apa yang sering berulang dalam rutinitas belajarmu yang membuat nilai tugasmu memuaskan?'
      };
    }
    if (cTitle.includes('abstraksi') || index === 2) {
      return {
        deepQuestion: 'Mengapa membuang detail yang tidak penting (abstraksi) justru membuat solusi kita menjadi lebih cerdas?',
        realLifeConnection: 'Peta rute bus Trans atau Google Maps hanya menampilkan jalur jalan dan halte penting, tanpa menggambar warna pagar rumah atau pohon.',
        analogy: 'Menyaring air teh menggunakan saringan: kita hanya mengambil cairan teh yang segar dan membuang ampas daunnya.',
        profilLulusanDimension: 'Penalaran Kritis & Kemandirian',
        profilLulusanDesc: 'Kemampuan berpikir reflektif memilah intisari masalah tanpa bergantung pada detail pengganggu.',
        pancasilaValue: 'Penalaran Kritis & Kemandirian',
        thoughtExperiment: 'Jika kamu membuat kartu identitas perpustakaan, informasi apa yang sama sekali tidak boleh dimasukkan karena tidak relevan?'
      };
    }
    return {
      deepQuestion: 'Mengapa sebuah algoritma harus memiliki urutan yang tepat dan tidak boleh ambigu bagi yang menjalankannya?',
      realLifeConnection: 'Resep membuat mie instan harus runtut: merebus air dulu baru memasukkan mie, bukan memasukkan bumbu mentah lalu memakan mie yang keras.',
      analogy: 'Algoritma adalah peta harta karun langkah-demi-langkah: satu langkah salah belok, kita tidak akan sampai ke tujuan.',
      profilLulusanDimension: 'Komunikasi & Penalaran Kritis',
      profilLulusanDesc: 'Keterampilan merumuskan instruksi terstruktur yang jelas serta penalaran logis yang akurat.',
      pancasilaValue: 'Komunikasi & Penalaran Kritis',
      thoughtExperiment: 'Susun algoritma 5 langkah paling logis untuk mencuci tangan sebelum makan agar kuman mati sempurna!'
    };
  }

  // 3. Rekam Jejak Digital & Keamanan Siber
  if (t.includes('rekam jejak') || t.includes('keamanan') || t.includes('privasi')) {
    return {
      deepQuestion: `Mengapa perlindungan data pada konsep "${concept.title}" berkaitan erat dengan keselamatan fisik dan psikologis kita di dunia nyata?`,
      realLifeConnection: 'Informasi sekolah, lokasi rumah, dan nomor kontak yang tersebar dapat dimanfaatkan pihak tidak bertanggung jawab untuk penipuan atau pemerasan.',
      analogy: 'Data pribadimu ibarat kunci pintu rumah: jangan pernah membagikan fotokopi kuncinya kepada orang asing di pinggir jalan.',
      profilLulusanDimension: 'Kewargaan & Keimanan dan Ketaqwaan terhadap Tuhan YME',
      profilLulusanDesc: 'Taat aturan privasi, menjaga kehormatan diri dan sesama, serta berakhlak mulia di ruang digital.',
      pancasilaValue: 'Kewargaan & Keimanan dan Ketaqwaan terhadap Tuhan YME',
      thoughtExperiment: 'Jika ada aplikasi game gratis meminta izin membaca kontak dan lokasi GPS padahal tidak berhubungan dengan permainannya, apa tindakan bijakmu?'
    };
  }

  // 4. Default Universal Deep Learning Enrichment
  return {
    deepQuestion: `Mengapa konsep "${concept.title}" menjadi fondasi penting yang harus kita kuasai di era kecerdasan artifisial (AI) saat ini?`,
    realLifeConnection: 'Konsep ini bukan sekadar bahan ujian, tetapi alat berpikir sehari-hari saat menggunakan smartphone, laptop, dan internet secara cerdas.',
    analogy: 'Konsep ini ibarat fondasi beton sebuah gedung: semakin kokoh fondasi pemahamanmu, semakin tinggi prestasi yang bisa kamu bangun di masa depan.',
    profilLulusanDimension: 'Penalaran Kritis & Komunikasi',
    profilLulusanDesc: 'Mampu menelaah informasi secara objektif dan mengomunikasikannya dengan santun dan berfaedah.',
    pancasilaValue: 'Penalaran Kritis & Komunikasi',
    thoughtExperiment: 'Bagaimana kamu bisa menjelaskan konsep ini kepada teman sebangkumu dengan bahasa yang paling sederhana dan mudah dipahami?'
  };
}
