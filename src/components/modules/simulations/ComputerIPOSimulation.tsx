import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import confetti from 'canvas-confetti';
import {
  Cpu,
  Monitor,
  Keyboard,
  HardDrive,
  Power,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Play,
  Layers,
  ArrowRight,
  Wrench,
  Zap,
  Gauge,
  Flame,
  Volume2,
  Sliders,
  Check,
  AlertTriangle,
  Lightbulb,
  MousePointer,
  HelpCircle,
  FileText,
  Printer
} from 'lucide-react';

type SimSubMode = 'rakit-pc' | 'siklus-bus' | 'blackout-test' | 'cpu-cycle' | 'troubleshoot';

export const ComputerIPOSimulation: React.FC = () => {
  const { playClick, playSuccess, playError, playFanfare } = useTheme();

  // Active sub-simulation tab
  const [activeMode, setActiveMode] = useState<SimSubMode>('rakit-pc');

  // =========================================================================
  // 1. STATE: LAB RAKIT PC INTERAKTIF
  // =========================================================================
  interface PcPart {
    id: string;
    slot: string;
    name: string;
    desc: string;
    spec: string;
    order: number;
    hint: string;
  }

  const PC_PARTS: PcPart[] = [
    {
      id: 'p-mobo',
      slot: 'Motherboard',
      name: 'Motherboard ATX B550',
      desc: 'Papan sirkuit utama tempat menancapnya seluruh komponen dan jalur komunikasi bus sistem.',
      spec: 'PCIe 4.0, 4x DDR4 DIMM, Socket AM4/LGA',
      order: 1,
      hint: 'Langkah 1: Pasang motherboard ke dalam casing komputer sebagai landasan utama!'
    },
    {
      id: 'p-cpu',
      slot: 'Processor',
      name: 'Processor CPU Core i5 (6-Core 4.2GHz)',
      desc: 'Otak utama yang mengeksekusi instruksi program, perhitungan matematika (ALU), dan kontrol sistem (CU).',
      spec: '6 Core 12 Threads, 65W TDP, 32MB Cache',
      order: 2,
      hint: 'Langkah 2: Tancapkan processor ke socket CPU dengan mencocokkan segitiga emas di sudut chip!'
    },
    {
      id: 'p-paste',
      slot: 'Pasta Termal',
      name: 'Pasta Termal Silikon (Thermal Paste)',
      desc: 'Cairan penghantar panas pengisi celah mikroskopis antara permukaan atas CPU dan plat heatsink fan.',
      spec: 'Konduktivitas panas 8.5 W/mK',
      order: 3,
      hint: 'Langkah 3: Oleskan pasta termal sebesar biji jagung di tengah chip CPU sebelum memasang heatsink!'
    },
    {
      id: 'p-cooler',
      slot: 'Kipas CPU',
      name: 'Heatsink Fan Pendingin CPU',
      desc: 'Bilah aluminium penyerap panas dengan kipas pendingin aktif pencegah panas berlebih (overheating).',
      spec: 'Aluminium Fin Stack, 120mm PWM Fan',
      order: 4,
      hint: 'Langkah 4: Kencangkan heatsink fan di atas processor untuk mendisipasi panas saat komputasi berat!'
    },
    {
      id: 'p-ram',
      slot: 'Memori RAM',
      name: 'RAM 16GB DDR4 (2x8GB Dual Channel)',
      desc: 'Memori kerja berkecepatan tinggi yang menampung data aplikasi yang sedang aktif berjalan (Volatile).',
      spec: 'DDR4 3200MHz, Dual Channel Kit',
      order: 5,
      hint: 'Langkah 5: Pasang modul RAM di slot DIMM 2 & 4 hingga tuas pengunci berbunyi "KLIK"!'
    },
    {
      id: 'p-gpu',
      slot: 'Kartu Grafis',
      name: 'Kartu Grafis Dedicated GPU 6GB',
      desc: 'Unit pemroses grafis khusus yang merender jutaan piksel visual ke monitor secara mulus.',
      spec: 'GDDR6, PCIe x16, 2x Cooling Fan',
      order: 6,
      hint: 'Langkah 6: Tancapkan kartu grafis di slot PCIe x16 pertama dekat processor!'
    },
    {
      id: 'p-ssd',
      slot: 'Media SSD',
      name: 'SSD M.2 NVMe PCIe 512GB',
      desc: 'Penyimpanan data permanen non-volatile berkecepatan tinggi untuk sistem operasi dan file tugas.',
      spec: 'Read 3500 MB/s, Non-Volatile Flash',
      order: 7,
      hint: 'Langkah 7: Tancapkan SSD M.2 pada slot motherboard dan kunci dengan sekrup kecil!'
    },
    {
      id: 'p-psu',
      slot: 'Power Supply',
      name: 'Power Supply Unit (PSU) 550W 80+',
      desc: 'Penyuplai daya listrik arus searah (DC) stabil untuk mengaliri listrik seluruh komponen komputer.',
      spec: '80 Plus Bronze, Kabel 24-Pin ATX & 8-Pin CPU',
      order: 8,
      hint: 'Langkah 8: Hubungkan konektor kabel daya 24-pin dan nyalakan saklar switch di belakang PSU!'
    }
  ];

  const [installedParts, setInstalledParts] = useState<string[]>([]);
  const [activePartId, setActivePartId] = useState<string | null>(null);
  const [isPcPoweredOn, setIsPcPoweredOn] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(false);

  const handleInstallPart = (part: PcPart) => {
    playClick();
    if (installedParts.includes(part.id)) {
      // Remove
      setInstalledParts((prev) => prev.filter((id) => id !== part.id));
      setIsPcPoweredOn(false);
      setBootLog([]);
    } else {
      // Install
      setInstalledParts((prev) => [...prev, part.id]);
      playSuccess();
    }
  };

  const handlePowerOnPc = async () => {
    playClick();
    if (installedParts.length < PC_PARTS.length) {
      playError();
      alert(`Komponen PC belum lengkap! Terpasang ${installedParts.length} dari ${PC_PARTS.length} komponen. Pasang seluruh komponen termasuk pasta termal dan PSU terlebih dahulu!`);
      return;
    }

    setIsBooting(true);
    setBootLog(['[BIOS POST] Memulai Power-On Self Test...']);
    playSuccess();

    await new Promise((r) => setTimeout(r, 600));
    setBootLog((prev) => [...prev, '>> [OK] Power Supply 550W menyuplai tegangan stabil 12V, 5V, 3.3V']);

    await new Promise((r) => setTimeout(r, 600));
    setBootLog((prev) => [...prev, '>> [OK] Processor CPU Core i5 (6-Core @ 4.2GHz) terdeteksi normal']);

    await new Promise((r) => setTimeout(r, 600));
    setBootLog((prev) => [...prev, '>> [OK] Memori RAM 16384 MB DDR4 Dual-Channel lolos uji bit']);

    await new Promise((r) => setTimeout(r, 600));
    setBootLog((prev) => [...prev, '>> [OK] Kartu Grafis GPU Dedicated 6GB siap merender sinyal display']);

    await new Promise((r) => setTimeout(r, 600));
    setBootLog((prev) => [...prev, '>> [OK] Media Penyimpanan SSD M.2 NVMe 512GB aktif (Sistem Operasi Siap Boot)']);

    await new Promise((r) => setTimeout(r, 700));
    setBootLog((prev) => [
      ...prev,
      '>> [POST SUCCESSFUL] Seluruh perangkat keras sinkron!',
      '>> SELAMAT DATANG DI SISTEM KOMPUTER SMPN 5 KROYA - DESKTOP SIAP DIGUNAKAN!'
    ]);
    setIsBooting(false);
    setIsPcPoweredOn(true);
    playFanfare();
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  };

  const handleResetPc = () => {
    playClick();
    setInstalledParts([]);
    setActivePartId(null);
    setIsPcPoweredOn(false);
    setBootLog([]);
    setIsBooting(false);
  };

  // =========================================================================
  // 2. STATE: SIMULASI ALUR SIKLUS IPO & BUS DATA REAL-TIME
  // =========================================================================
  const IPO_COMMANDS = [
    {
      id: 'cmd-teks',
      title: 'Mengetik Dokumen Makalah',
      input: 'Keyboard: "Informatika SMPN 5 Kroya"',
      process: 'CPU CU & ALU menerjemahkan huruf ke kode ASCII biner (01001001...)',
      output: 'Monitor menampilkan deretan huruf pada lembar kerja pengolah kata',
      storage: 'Menyimpan naskah ke file dokumen di SSD NVMe',
      bytes: '01001001 01001110 01000110'
    },
    {
      id: 'cmd-hitung',
      title: 'Kalkulasi Aritmatika Cepat',
      input: 'Kalkulator: Menghitung operasi "125 x 4"',
      process: 'ALU CPU melakukan perkalian biner di akumulator (125 * 4 = 500)',
      output: 'Layar monitor memunculkan angka "500" dalam 0.0001 detik',
      storage: 'Menyimpan riwayat perhitungan ke log memori',
      bytes: '00000000 00000001 11110100'
    },
    {
      id: 'cmd-foto',
      title: 'Mengambil Foto Dokumen via Webcam',
      input: 'Kamera Webcam: Menangkap cahaya menjadi sinyal piksel digital',
      process: 'Processor & GPU memproses resolusi warna RGB pada jutaan piksel',
      output: 'Layar menampilkan foto tajam dokumen portofolio',
      storage: 'Menyimpan foto format JPEG berukuran 2 MB ke disk penyimpanan',
      bytes: '11111111 11011000 11111110'
    },
    {
      id: 'cmd-cetak',
      title: 'Mencetak Naskah Tugas ke Kertas',
      input: 'Mouse: Mengklik tombol "Print / Cetak Dokumen"',
      process: 'Sistem Operasi & Driver Printer mengonversi teks ke data raster dot',
      output: 'Printer fisik mencetak tinta warna ke lembaran kertas fisik',
      storage: 'Dokumen asli tetap tersimpan aman di SSD',
      bytes: '00011011 01000000 00011011'
    }
  ];

  const [selectedIpoCmd, setSelectedIpoCmd] = useState(IPO_COMMANDS[0]);
  const [ipoStep, setIpoStep] = useState<number>(0); // 0: Idle, 1: Input, 2: RAM/Bus, 3: CPU Process, 4: Output, 5: Storage
  const [isIpoStreaming, setIsIpoStreaming] = useState(false);

  const handleRunIpoCycle = async () => {
    if (isIpoStreaming) return;
    playClick();
    setIsIpoStreaming(true);

    for (let s = 1; s <= 5; s++) {
      setIpoStep(s);
      playSuccess();
      await new Promise((r) => setTimeout(r, 900));
    }

    playFanfare();
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    setIsIpoStreaming(false);
  };

  // =========================================================================
  // 3. STATE: EKSPERIMEN BLACKOUT LISTRIK (RAM VOLATILE VS SSD)
  // =========================================================================
  interface WorkItem {
    id: string;
    name: string;
    location: 'RAM' | 'SSD';
    isSaved: boolean;
    type: string;
  }

  const [blackoutItems, setBlackoutItems] = useState<WorkItem[]>([
    { id: 'b1', name: 'Naskah Makalah TIK (1.500 kata)', location: 'RAM', isSaved: false, type: 'Dokumen' },
    { id: 'b2', name: '15 Tab Google Chrome Riset', location: 'RAM', isSaved: false, type: 'Browser' },
    { id: 'b3', name: 'Game Edukasi 3D Sedang Berjalan', location: 'RAM', isSaved: false, type: 'Aplikasi' },
    { id: 'b4', name: 'Slide Presentasi Kelompok 4', location: 'SSD', isSaved: true, type: 'Presentasi' },
    { id: 'b5', name: 'Video Animasi Tugas Sekolah', location: 'SSD', isSaved: true, type: 'Video' }
  ]);
  const [isBlackoutTriggered, setIsBlackoutTriggered] = useState(false);
  const [hasBlackoutRun, setHasBlackoutRun] = useState(false);

  const handleSaveDocToSsd = (id: string) => {
    playClick();
    setBlackoutItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isSaved: true, location: 'SSD' } : item))
    );
    playSuccess();
  };

  const handleTriggerBlackout = async () => {
    playClick();
    setIsBlackoutTriggered(true);
    playError();

    await new Promise((r) => setTimeout(r, 1200));

    // After blackout, all unsaved items in RAM vanish!
    setBlackoutItems((prev) => prev.filter((item) => item.isSaved));
    setIsBlackoutTriggered(false);
    setHasBlackoutRun(true);
    playSuccess();
  };

  const handleResetBlackout = () => {
    playClick();
    setBlackoutItems([
      { id: 'b1', name: 'Naskah Makalah TIK (1.500 kata)', location: 'RAM', isSaved: false, type: 'Dokumen' },
      { id: 'b2', name: '15 Tab Google Chrome Riset', location: 'RAM', isSaved: false, type: 'Browser' },
      { id: 'b3', name: 'Game Edukasi 3D Sedang Berjalan', location: 'RAM', isSaved: false, type: 'Aplikasi' },
      { id: 'b4', name: 'Slide Presentasi Kelompok 4', location: 'SSD', isSaved: true, type: 'Presentasi' },
      { id: 'b5', name: 'Video Animasi Tugas Sekolah', location: 'SSD', isSaved: true, type: 'Video' }
    ]);
    setHasBlackoutRun(false);
  };

  // =========================================================================
  // 4. STATE: SIKLUS MESIN CPU (FETCH - DECODE - EXECUTE)
  // =========================================================================
  const [cpuClockSpeed, setCpuClockSpeed] = useState<'slow' | 'normal' | 'turbo'>('normal');
  const [cpuCyclePhase, setCpuCyclePhase] = useState<'Fetch' | 'Decode' | 'Execute' | 'Writeback' | 'Idle'>('Idle');
  const [programCounter, setProgramCounter] = useState(101);
  const [accValue, setAccValue] = useState(0);
  const [aluExpression, setAluExpression] = useState('7 + 8');
  const [isCpuRunning, setIsCpuRunning] = useState(false);

  const handleStepCpuCycle = async () => {
    if (isCpuRunning) return;
    playClick();
    setIsCpuRunning(true);

    const delay = cpuClockSpeed === 'slow' ? 1000 : cpuClockSpeed === 'normal' ? 600 : 250;

    // 1. Fetch
    setCpuCyclePhase('Fetch');
    playSuccess();
    await new Promise((r) => setTimeout(r, delay));

    // 2. Decode
    setCpuCyclePhase('Decode');
    playSuccess();
    await new Promise((r) => setTimeout(r, delay));

    // 3. Execute
    setCpuCyclePhase('Execute');
    playSuccess();
    await new Promise((r) => setTimeout(r, delay));

    // 4. Writeback
    setCpuCyclePhase('Writeback');
    setAccValue(15);
    setProgramCounter((prev) => prev + 1);
    playSuccess();
    await new Promise((r) => setTimeout(r, delay));

    setCpuCyclePhase('Idle');
    setIsCpuRunning(false);
    playFanfare();
  };

  // =========================================================================
  // 5. STATE: KLINIK TEKNISI LAB KOMPUTER (TROUBLESHOOTING HARDWARE)
  // =========================================================================
  interface TroubleshootingCase {
    id: number;
    title: string;
    symptom: string;
    diagnosis: string;
    options: {
      tool: string;
      action: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  }

  const TROUBLESHOOT_CASES: TroubleshootingCase[] = [
    {
      id: 1,
      title: 'Kasus 1: PC Berbunyi Bip 3 Kali & Layar Monitor Tetap Gelap',
      symptom: 'Saat tombol power ditekan, kipas menyala namun terdengar bunyi alarm motherboard "BIP... BIP... BIP..." dan tidak ada tampilan apapun di monitor.',
      diagnosis: 'Pin emas pada modul RAM kotor oleh debu lab atau kendur dari slot motherboard.',
      options: [
        {
          tool: 'Penghapus Karet Pensil & Kain Bersih',
          action: 'Lepas RAM, gosok lembut pin tembaga emas dengan penghapus pensil, tiup debu slot, lalu tancapkan kembali hingga berbunyi KLIK',
          isCorrect: true,
          feedback: 'Sangat Tepat! Oksidasi dan debu pada pin RAM adalah penyebab utama bunyi bip memori. Setelah dibersihkan, koneksi listrik kembali sempurna dan PC boot normal!'
        },
        {
          tool: 'Obeng Listrik',
          action: 'Membongkar casing monitor dan memotong kabel panel kaca',
          isCorrect: false,
          feedback: 'Salah! Masalah berada pada modul RAM di unit PC, bukan di dalam panel monitor.'
        },
        {
          tool: 'Semprotan Air Sabun',
          action: 'Menyemprotkan air sabun langsung ke soket listrik motherboard',
          isCorrect: false,
          feedback: 'Sangat Berbahaya! Cairan pada komponen elektronik menyebabkan korsleting fatal dan kerusakan total.'
        }
      ]
    },
    {
      id: 2,
      title: 'Kasus 2: Komputer Sering Mati Sendiri Setelah 15 Menit Dipakai',
      symptom: 'Komputer berjalan normal saat dinyalakan, namun setelah 15 menit siswa mengedit video, komputer mendadak mati dengan sendirinya dan bodi casing sangat panas.',
      diagnosis: 'Processor CPU mengalami kepanasan ekstrem (Thermal Throttling / Overheating) karena pasta termal kering membatu dan kipas heatsink tersumbat debu.',
      options: [
        {
          tool: 'Thermal Paste Baru & Kuas Pembersih Debu',
          action: 'Lepas heatsink, bersihkan debu kipas, bersihkan pasta kering lama dengan alkohol, lalu oleskan pasta termal silikon baru sebesar biji jagung',
          isCorrect: true,
          feedback: 'Pintar Sekali! Pasta termal baru mentransfer panas dari CPU ke heatsink secara maksimal, menjaga suhu CPU tetap dingin di bawah 60°C!'
        },
        {
          tool: 'Kipas Angin Dinding',
          action: 'Mengarahkan kipas angin ruang kelas ke arah kabel stop kontak',
          isCorrect: false,
          feedback: 'Tidak efektif! Udara luar tidak dapat menembus heat spreader CPU yang pasta dalamnya sudah kering membatu.'
        },
        {
          tool: 'Kabel VGA Bekas',
          action: 'Mengikat heatsink menggunakan tali kabel VGA',
          isCorrect: false,
          feedback: 'Tidak ada hubungannya dengan transfer panas pada chip processor.'
        }
      ]
    },
    {
      id: 3,
      title: 'Kasus 3: Windows Lambat Sekali Saat Booting (Butuh Waktu 6 Menit)',
      symptom: 'Siswa harus menunggu lebih dari 5-6 menit setiap menyalakan komputer dan aplikasi sering macet dengan status 100% disk usage.',
      diagnosis: 'Komputer masih menggunakan Harddisk Drive (HDD) mekanik lama dengan piringan putar yang kecepatan baca-tulisnya sangat lambat.',
      options: [
        {
          tool: 'Solid State Drive (SSD NVMe M.2)',
          action: 'Melakukan kloning sistem operasi dan mengganti HDD lama ke SSD NVMe berkecepatan 3.500 MB/s',
          isCorrect: true,
          feedback: 'Luar Biasa! SSD berbasis chip flash elektronik tanpa piringan mekanik berputar, membuat booting Windows hanya butuh waktu 8 detik!'
        },
        {
          tool: 'Mousepad Baru',
          action: 'Mengganti alas mousepad yang lebih licin',
          isCorrect: false,
          feedback: 'Mousepad hanya membantu gerak mouse, tidak mempengaruhi kecepatan baca media penyimpanan komputer.'
        },
        {
          tool: 'Stiker Lampu',
          action: 'Menempelkan stiker di casing komputer',
          isCorrect: false,
          feedback: 'Stiker tidak meningkatkan performa transfer data media penyimpanan.'
        }
      ]
    },
    {
      id: 4,
      title: 'Kasus 4: Monitor "No Signal" Padahal Lampu PC Menyala Normal',
      symptom: 'PC baru di lab memiliki kartu grafis terpisah (Dedicated GPU). Kipas CPU menyala, namun layar monitor menampilkan tulisan kotak melayang "No Signal / Check Video Cable".',
      diagnosis: 'Kabel monitor dicolokkan ke port motherboard onboard di bagian atas, padahal sistem grafis telah otomatis beralih ke port kartu grafis GPU di bagian bawah.',
      options: [
        {
          tool: 'Kabel HDMI / DisplayPort ke Port GPU',
          action: 'Pindahkan colokan kabel monitor dari port motherboard di atas ke port display kartu grafis (Dedicated GPU) di slot bagian bawah',
          isCorrect: true,
          feedback: 'Hebat! Ketika GPU dedicated terpasang, display onboard secara otomatis dimatikan oleh BIOS. Kabel monitor wajib dicolokkan ke port GPU agar sinyal visual tampil!'
        },
        {
          tool: 'Gunting Kabel',
          action: 'Memotong kabel monitor agar sinyalnya keluar',
          isCorrect: false,
          feedback: 'Tindakan merusak peralatan sekolah! Kabel yang dipotong akan rusak total.'
        },
        {
          tool: 'Reset Tombol Keyboard',
          action: 'Menekan tombol Esc 50 kali',
          isCorrect: false,
          feedback: 'Tidak ada pengaruhnya terhadap jalur transmisi kabel display ke monitor.'
        }
      ]
    },
    {
      id: 5,
      title: 'Kasus 5: Komputer Mati Total dan Tidak Ada Respon Sama Sekali',
      symptom: 'Saat tombol power di depan casing ditekan oleh siswa, tidak ada lampu yang menyala dan tidak ada suara kipas berputar sama sekali.',
      diagnosis: 'Saklar daya di belakang Power Supply Unit (PSU) masih dalam posisi OFF (0) atau kabel power AC belum tertancap rapat ke stop kontak listrik.',
      options: [
        {
          tool: 'Pengecekan Saklar Rocker PSU (I/O) & Kabel Daya',
          action: 'Tekan saklar rocker di belakang casing ke posisi ON (tanda garis I) dan pastikan kabel power tertancap rapat ke sumber listrik 220V',
          isCorrect: true,
          feedback: 'Tepat Sekali! Seringkali masalah komputer mati total hanyalah saklar PSU yang masih di posisi 0 (OFF). Begitu ditekan ke I, listrik langsung mengalir normal!'
        },
        {
          tool: 'Palu Besi',
          action: 'Memukul casing komputer dengan palu',
          isCorrect: false,
          feedback: 'Sangat dilarang! Memukul komputer akan merusak komponen fisik di dalam casing.'
        },
        {
          tool: 'Format Harddisk',
          action: 'Mencoba memformat harddisk saat komputer tidak menyala',
          isCorrect: false,
          feedback: 'Mustahil memformat harddisk jika motherboard belum mendapatkan aliran daya listrik.'
        }
      ]
    }
  ];

  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [selectedCaseOption, setSelectedCaseOption] = useState<number | null>(null);
  const [troubleshootScores, setTroubleshootScores] = useState<Record<number, boolean>>({});

  const handleSelectCaseOption = (optIdx: number) => {
    if (selectedCaseOption !== null) return;
    playClick();
    setSelectedCaseOption(optIdx);

    const isCorrect = TROUBLESHOOT_CASES[activeCaseIdx].options[optIdx].isCorrect;
    if (isCorrect) {
      playSuccess();
      setTroubleshootScores((prev) => ({ ...prev, [activeCaseIdx]: true }));
    } else {
      playError();
      setTroubleshootScores((prev) => ({ ...prev, [activeCaseIdx]: false }));
    }
  };

  const handleNextCase = () => {
    playClick();
    setSelectedCaseOption(null);
    setActiveCaseIdx((prev) => Math.min(TROUBLESHOOT_CASES.length - 1, prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Laboratorium Super Lengkap */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200">
            <Cpu className="w-4 h-4" />
            <span>Laboratorium Eksplorasi Dunia Komputer Multi-Simulasi</span>
          </div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[11px] font-black text-white">
            5 Mode Simulasi Interaktif
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black">
          Laboratorium Interaktif: Komponen, Fungsi, & Cara Kerja Komputer
        </h2>
        <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">
          Jelajahi arsitektur komputer dari perakitan perangkat keras, aliran denyut siklus bus data IPO, eksperimen listrik padam (RAM volatile vs SSD), siklus mesin CPU, hingga klinik teknisi komputer lab sekolah!
        </p>

        {/* 5 SUB-MODE NAVIGATOR BUTTONS */}
        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={() => {
              playClick();
              setActiveMode('rakit-pc');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'rakit-pc'
                ? 'bg-white text-blue-900 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>1. Rakit PC Desktop</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveMode('siklus-bus');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'siklus-bus'
                ? 'bg-white text-blue-900 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>2. Siklus Bus Data IPO</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveMode('blackout-test');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'blackout-test'
                ? 'bg-white text-blue-900 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>3. Uji Listrik Padam (RAM vs SSD)</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveMode('cpu-cycle');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'cpu-cycle'
                ? 'bg-white text-blue-900 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>4. Siklus Mesin CPU</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveMode('troubleshoot');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeMode === 'troubleshoot'
                ? 'bg-white text-blue-900 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>5. Klinik Teknisi Lab</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: LAB RAKIT PC INTERAKTIF                                           */}
      {/* ========================================================================= */}
      {activeMode === 'rakit-pc' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Tahap Perakitan Komponen Komputer
                </span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  Terpasang: {installedParts.length} dari {PC_PARTS.length} Bagian
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetPc}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Bongkar Ulang</span>
                </button>

                <button
                  onClick={handlePowerOnPc}
                  disabled={isBooting}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5"
                >
                  <Power className="w-4 h-4" />
                  <span>{isBooting ? 'Memeriksa BIOS...' : '⚡ Nyalakan PC (Power-On Test)'}</span>
                </button>
              </div>
            </div>

            {/* Motherboard / Casing Visual Container */}
            <div className="p-4 rounded-3xl bg-slate-950 border-4 border-slate-800 text-white relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-2 font-bold">
                  <span className={`w-2.5 h-2.5 rounded-full ${isPcPoweredOn ? 'bg-emerald-500 animate-ping' : 'bg-slate-600'}`} />
                  CHASSIS VIEW · ATX MID-TOWER SMPN 5 KROYA
                </span>
                <span className="text-slate-400">
                  {isPcPoweredOn ? 'STATUS: ONLINE (POWER ON)' : 'STATUS: STANDBY (POWER OFF)'}
                </span>
              </div>

              {/* Internal Casing & Components Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
                {PC_PARTS.map((part) => {
                  const isInstalled = installedParts.includes(part.id);
                  return (
                    <div
                      key={part.id}
                      onClick={() => handleInstallPart(part)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                        isInstalled
                          ? isPcPoweredOn
                            ? 'border-emerald-500 bg-emerald-950/60 ring-2 ring-emerald-500/50'
                            : 'border-blue-500 bg-blue-950/60'
                          : 'border-dashed border-slate-700 bg-slate-900/50 hover:border-slate-500 opacity-70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>Slot: {part.slot}</span>
                          {isInstalled && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="text-xs font-bold text-white mt-1">
                          {isInstalled ? part.name : `[Kosong] ${part.slot}`}
                        </div>
                      </div>

                      <div className="pt-2 text-[10px] text-slate-400">
                        {isInstalled ? (
                          <span className="text-emerald-400 font-bold">✓ Terpasang Rapat</span>
                        ) : (
                          <span className="text-blue-400 font-bold">+ Ketuk untuk Pasang</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Monitor Screen Live POST Display */}
              {bootLog.length > 0 && (
                <div className="mt-3 p-4 rounded-2xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 space-y-1 max-h-48 overflow-y-auto">
                  <div className="text-[10px] text-slate-500 pb-1 border-b border-slate-900 flex justify-between">
                    <span>BIOS UEFI VERSION 2.8 · POST BOOT CONSOLE</span>
                    <span>100% HARDWARE CHECK</span>
                  </div>
                  {bootLog.map((log, idx) => (
                    <div key={idx} className="animate-in fade-in leading-relaxed">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Component Inventory & Explanations */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Daftar Komponen Hardware (Sentuh Komponen untuk Pasang / Lepas):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PC_PARTS.map((part) => {
                  const isInstalled = installedParts.includes(part.id);
                  return (
                    <div
                      key={part.id}
                      onClick={() => handleInstallPart(part)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                        isInstalled
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 font-bold text-xs ${isInstalled ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                        {part.order}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            {part.name}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isInstalled ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                            {isInstalled ? 'Terpasang' : 'Belum'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                          {part.desc}
                        </p>
                        <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                          Spesifikasi: {part.spec}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: SIMULASI ALUR SIKLUS IPO & BUS DATA REAL-TIME                     */}
      {/* ========================================================================= */}
      {activeMode === 'siklus-bus' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Siklus IPO (Input - Process - Output - Storage)
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Pilih Skenario Tugas & Alirkan Denyut Data Digital
                </h3>
              </div>

              <button
                onClick={handleRunIpoCycle}
                disabled={isIpoStreaming}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-md flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isIpoStreaming ? 'Mengalirkan Data...' : '⚡ Jalankan Alur Siklus Data'}</span>
              </button>
            </div>

            {/* Skenario Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {IPO_COMMANDS.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    playClick();
                    setSelectedIpoCmd(cmd);
                    setIpoStep(0);
                  }}
                  className={`p-3 rounded-2xl text-left border-2 transition-all ${
                    selectedIpoCmd.id === cmd.id
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {cmd.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {cmd.input}
                  </div>
                </button>
              ))}
            </div>

            {/* 4 STATIONS OF IPO BUS DIAGRAM */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              {/* STASIUN 1: INPUT */}
              <div className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between ${ipoStep === 1 ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/70 ring-4 ring-sky-500/40 shadow-lg scale-102' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">
                      TAHAP 1: INPUT
                    </span>
                    <Keyboard className="w-4 h-4 text-sky-600" />
                  </div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    Perangkat Masukan
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {selectedIpoCmd.input}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500">
                  Mengonversi data fisik ke biner
                </div>
              </div>

              {/* STASIUN 2: MEMORI & PROSES (CPU) */}
              <div className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between ${ipoStep === 2 || ipoStep === 3 ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/70 ring-4 ring-purple-500/40 shadow-lg scale-102' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400">
                      TAHAP 2: PROSES
                    </span>
                    <Cpu className="w-4 h-4 text-purple-600" />
                  </div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    Processor (CU & ALU) & RAM
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {selectedIpoCmd.process}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-purple-600 dark:text-purple-400">
                  Biner: {selectedIpoCmd.bytes}
                </div>
              </div>

              {/* STASIUN 3: OUTPUT */}
              <div className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between ${ipoStep === 4 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 ring-4 ring-emerald-500/40 shadow-lg scale-102' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      TAHAP 3: OUTPUT
                    </span>
                    <Monitor className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    Perangkat Keluaran
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {selectedIpoCmd.output}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500">
                  Menyajikan informasi ke pengguna
                </div>
              </div>

              {/* STASIUN 4: STORAGE */}
              <div className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between ${ipoStep === 5 ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/70 ring-4 ring-amber-500/40 shadow-lg scale-102' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                      TAHAP 4: STORAGE
                    </span>
                    <HardDrive className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    Penyimpanan Non-Volatile
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {selectedIpoCmd.storage}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-amber-600 dark:text-amber-400">
                  Data tersimpan permanen
                </div>
              </div>
            </div>

            {/* Penjelasan Interaktif Tahap Aktif */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white block mb-0.5 font-bold">
                Penjelasan Alur Sistem Komputer:
              </strong>
              {ipoStep === 0 && 'Tekan tombol "Jalankan Alur Siklus Data" untuk melihat bagaimana keyboard mengirim data ke CPU, diolah di RAM, ditampilkan ke monitor, dan disimpan di SSD!'}
              {ipoStep === 1 && '1. Sinyal Listrik Input: Tuts keyboard / klik mouse ditekan, chip controller periferal mengonversi tekanan fisik menjadi deretan sinyal biner 0 dan 1.'}
              {ipoStep === 2 && '2. Jalur Bus Sistem & RAM: Data biner dialirkan melalui bus data motherboard menuju memori kerja RAM untuk menanti giliran dieksekusi processor.'}
              {ipoStep === 3 && '3. Pemrosesan CPU: Unit Kontrol (CU) mengambil instruksi dan ALU (Arithmetic Logic Unit) menghitung biner serta menghasilkan informasi baru.'}
              {ipoStep === 4 && '4. Tampilan Output: Hasil kalkulasi dikirimkan ke Kartu Grafis / Monitor / Speaker untuk diproyeksikan langsung ke panca indra manusia.'}
              {ipoStep === 5 && '5. Penyimpanan Permanen: Data yang telah selesai ditulis secara magnetik/elektronik ke sel chip SSD sehingga tidak hilang saat listrik dimatikan.'}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: EKSPERIMEN BLACKOUT LISTRIK (RAM VOLATILE VS SSD)                 */}
      {/* ========================================================================= */}
      {activeMode === 'blackout-test' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                  Eksperimen Karakteristik Memori: Volatile vs Non-Volatile
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Uji Pemadaman Listrik Lab Komputer SMPN 5 Kroya
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetBlackout}
                  className="px-3 py-1.5 rounded-xl border text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Reset Uji Coba
                </button>

                <button
                  onClick={handleTriggerBlackout}
                  disabled={isBlackoutTriggered}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 animate-pulse"
                >
                  <Flame className="w-4 h-4" />
                  <span>⚡ Simulasikan Listrik Padam Tiba-Tiba!</span>
                </button>
              </div>
            </div>

            {/* Blackout Flash Screen Indicator */}
            {isBlackoutTriggered && (
              <div className="p-8 rounded-3xl bg-black text-center text-white space-y-2 animate-in fade-in duration-100">
                <div className="text-2xl font-black text-rose-500">⚡ LISTRIK PADAM SEKETIKA!</div>
                <p className="text-xs text-slate-400">
                  Aliran daya listrik ke komputer terputus... Memori RAM kehilangan muatan elektron!
                </p>
              </div>
            )}

            {/* Two Columns: RAM (Volatile) vs SSD (Non-Volatile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* RAM Box */}
              <div className="p-5 rounded-3xl border-2 border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      RAM (Random Access Memory)
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
                    Sifat: VOLATILE
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  Data hanya bertahan selama dialiri listrik. Jika listrik terputus, seluruh data di RAM lenyap seketika!
                </p>

                <div className="space-y-2 pt-2">
                  {blackoutItems.filter((i) => i.location === 'RAM').length === 0 ? (
                    <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900 text-center text-xs text-rose-600 font-bold border border-rose-200 dark:border-rose-900">
                      {hasBlackoutRun
                        ? '💥 SELURUH DATA DI RAM MUSNAH HILANG KARENA LISTRIK PADAM!'
                        : 'Semua file telah disimpan ke SSD'}
                    </div>
                  ) : (
                    blackoutItems
                      .filter((i) => i.location === 'RAM')
                      .map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                              {item.name}
                            </div>
                            <span className="text-[10px] text-rose-500 font-bold">
                              ⚠️ Belum disimpan ke SSD (Bahaya!)
                            </span>
                          </div>
                          <button
                            onClick={() => handleSaveDocToSsd(item.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold shadow-xs"
                          >
                            Simpan ke SSD
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* SSD Box */}
              <div className="p-5 rounded-3xl border-2 border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      SSD / Harddisk (Penyimpanan Tetap)
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                    Sifat: NON-VOLATILE
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  Data tersimpan secara permanen pada chip flash. Tetap aman tersimpan meski komputer dimatikan berbulan-bulan!
                </p>

                <div className="space-y-2 pt-2">
                  {blackoutItems
                    .filter((i) => i.location === 'SSD')
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 shadow-xs flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {item.name}
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold">
                            ✓ Tersimpan Aman di SSD (Non-Volatile)
                          </span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Kesimpulan Eksperimen */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-white block mb-0.5 font-bold">
                Pelajaran Krusial untuk Siswa:
              </strong>
              Saat sedang mengetik naskah atau mengerjakan tugas, selalu biasakan menekan pintasan <strong>Ctrl + S (Simpan)</strong> atau aktifkan fitur <em>Autosave</em> cloud, agar ketikanmu langsung dipindahkan dari RAM yang rapuh ke media penyimpanan non-volatile (SSD/Harddisk)!
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: SIKLUS MESIN CPU (FETCH - DECODE - EXECUTE)                       */}
      {/* ========================================================================= */}
      {activeMode === 'cpu-cycle' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">
                  Arsitektur Von Neumann & Denyut Clock CPU
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Siklus Mesin Processor: Fetch - Decode - Execute - Writeback
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-[10px] font-bold">
                  <span>Kecepatan:</span>
                  {(['slow', 'normal', 'turbo'] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setCpuClockSpeed(spd)}
                      className={`px-2 py-0.5 rounded-lg capitalize ${cpuClockSpeed === spd ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleStepCpuCycle}
                  disabled={isCpuRunning}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isCpuRunning ? 'Mengeksekusi...' : '⚡ Jalankan 1 Siklus Clock'}</span>
                </button>
              </div>
            </div>

            {/* 4 Phases of CPU Machine Cycle */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: '1. FETCH', phase: 'Fetch', desc: 'Mengambil instruksi program dari alamat RAM ke register IR' },
                { name: '2. DECODE', phase: 'Decode', desc: 'Unit Kontrol (CU) menerjemahkan kode biner menjadi sinyal perintah' },
                { name: '3. EXECUTE', phase: 'Execute', desc: 'ALU melakukan kalkulasi aritmatika matematika di sirkuit' },
                { name: '4. WRITEBACK', phase: 'Writeback', desc: 'Menuliskan hasil akhir ke Akumulator / Register Memori' }
              ].map((p) => {
                const isActive = cpuCyclePhase === p.phase;
                return (
                  <div
                    key={p.phase}
                    className={`p-4 rounded-3xl border-2 transition-all ${
                      isActive
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/70 ring-4 ring-purple-500/40 shadow-lg scale-102'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50'
                    }`}
                  >
                    <div className="text-xs font-black text-purple-600 dark:text-purple-400">
                      {p.name}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                      {p.desc}
                    </p>
                    {isActive && (
                      <div className="mt-2 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>SEDANG BERJALAN</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Micro-Architecture Register Board */}
            <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 text-white font-mono space-y-3">
              <div className="text-xs font-bold text-purple-400 pb-2 border-b border-slate-800 flex justify-between">
                <span>INSIDE THE SILICON DIE: REGISTERS & LOGIC BLOCKS</span>
                <span>CLOCK FREQUENCY: 4.2 GHz</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">PROGRAM COUNTER (PC)</span>
                  <span className="text-emerald-400 font-bold">0x000{programCounter}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">INSTRUCTION REGISTER</span>
                  <span className="text-sky-400 font-bold">ADD R1, R2</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">CONTROL UNIT (CU)</span>
                  <span className="text-purple-400 font-bold">{cpuCyclePhase}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">ACCUMULATOR (ACC)</span>
                  <span className="text-amber-400 font-bold">{accValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 5: KLINIK TEKNISI LAB KOMPUTER (TROUBLESHOOTING HARDWARE)            */}
      {/* ========================================================================= */}
      {activeMode === 'troubleshoot' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  Klinik Teknisi Perangkat Keras SMPN 5 Kroya
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Diagnosis Kerusakan Nyata Komputer Lab ({activeCaseIdx + 1} dari {TROUBLESHOOT_CASES.length})
                </h3>
              </div>

              {/* Case Navigation Tabs */}
              <div className="flex items-center gap-1.5">
                {TROUBLESHOOT_CASES.map((c, idx) => {
                  const isDone = troubleshootScores[idx] !== undefined;
                  const isPass = troubleshootScores[idx] === true;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        playClick();
                        setActiveCaseIdx(idx);
                        setSelectedCaseOption(null);
                      }}
                      className={`w-7 h-7 rounded-xl text-xs font-black transition-all ${
                        activeCaseIdx === idx
                          ? 'bg-amber-600 text-white shadow-md'
                          : isDone
                          ? isPass
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Case Details */}
            {(() => {
              const currentCase = TROUBLESHOOT_CASES[activeCaseIdx];
              return (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{currentCase.title}</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong>Gejala Kerusakan:</strong> {currentCase.symptom}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                      <strong>Dugaan Penyebab:</strong> {currentCase.diagnosis}
                    </div>
                  </div>

                  {/* Actions / Tools to choose */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Pilih Tindakan / Alat Teknisi yang Tepat untuk Memperbaiki:
                    </span>

                    {currentCase.options.map((opt, optIdx) => {
                      const isSelected = selectedCaseOption === optIdx;
                      return (
                        <button
                          key={optIdx}
                          disabled={selectedCaseOption !== null}
                          onClick={() => handleSelectCaseOption(optIdx)}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                            selectedCaseOption !== null
                              ? opt.isCorrect
                                ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/50'
                                : isSelected
                                ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/50'
                                : 'border-slate-200 dark:border-slate-800 opacity-50'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-400'
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 font-bold text-xs ${opt.isCorrect && selectedCaseOption !== null ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                              Alat: {opt.tool}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                              {opt.action}
                            </p>
                            {selectedCaseOption !== null && isSelected && (
                              <div className={`pt-2 text-xs font-bold ${opt.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {opt.feedback}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Case Button */}
                  {selectedCaseOption !== null && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleNextCase}
                        disabled={activeCaseIdx === TROUBLESHOOT_CASES.length - 1}
                        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white text-xs font-extrabold shadow-md flex items-center gap-2"
                      >
                        <span>Kasus Teknisi Berikutnya</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
