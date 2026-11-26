// DataNusa — data.js
// Semua angka di bawah bersumber dari Badan Pusat Statistik (BPS) dan
// World Bank WDI, diakses dan diverifikasi pada 26 November 2026.
// Setiap angka yang tampil di situs selalu disertai sumber dan tahunnya.

const DATA = {
  meta: {
    siteName: "DataNusa",
    tagline: "Statistik Indonesia, dalam satu halaman",
    verifiedNote: "Angka diakses dan diverifikasi 26 November 2026.",
    currency: "Rp",
  },

  kpi: [
    { id: "penduduk", label: "Penduduk 2025", value: "284,67 jt", sub: "jiwa (SUPAS 2025)", source: "BPS, SUPAS 2025", route: "#/penduduk" },
    { id: "pdb", label: "PDB 2025", value: "Rp23.821,1 T", sub: "harga berlaku", source: "BPS, Pertumbuhan Ekonomi 2025", route: "#/ekonomi" },
    { id: "tumbuh", label: "Pertumbuhan ekonomi 2025", value: "5,11%", sub: "yoy, Q3-2025: 5,04%", source: "BPS, Pertumbuhan Ekonomi 2025", route: "#/ekonomi" },
    { id: "inflasi", label: "Inflasi 2025", value: "2,92%", sub: "tahunan (yoy)", source: "BPS, Inflasi 2025", route: "#/ekonomi" },
    { id: "tpt", label: "Tingkat pengangguran (TPT)", value: "4,85%", sub: "Agustus 2025 · 7,46 jt orang", source: "BPS, Sakernas Agustus 2025", route: "#/kerja" },
    { id: "miskin", label: "Tingkat kemiskinan", value: "8,25%", sub: "September 2025", source: "BPS, Profil Kemiskinan 2025", route: "#/sosial" },
    { id: "ipm", label: "Indeks Pembangunan Manusia", value: "75,90", sub: "tahun 2025", source: "BPS, IPM 2025", route: "#/sosial" },
  ],

  penduduk: {
    title: "Penduduk & Demografi",
    intro: "Indonesia dihuni 284,67 juta jiwa pada 2025. Pertumbuhannya melambat — dari 1,43% per tahun pada 2010–2015 menjadi 1,08% pada 2020–2025 — sementara lebih dari separuh penduduk tinggal di Pulau Jawa.",
    trend: {
      label: "Jumlah penduduk (juta jiwa)",
      years: ["2010", "2015", "2020", "2025"],
      values: [237.64, 255.18, 270.20, 284.67],
      source: "BPS, SUPAS 2025",
    },
    growth: [
      { period: "2010–2015", value: "1,43%", note: "per tahun" },
      { period: "2015–2020", value: "1,10%", note: "per tahun" },
      { period: "2020–2025", value: "1,08%", note: "per tahun" },
    ],
    generations: {
      label: "Pangsa generasi (2025)",
      bars: [
        { name: "Gen Z", value: 24.93 },
        { name: "Milenial", value: 24.34 },
      ],
      combined: "Milenial + Gen Z + Post Gen Z: 68,92% penduduk",
      source: "BPS, SUPAS 2025",
    },
    facts: [
      { label: "Total fertility rate (TFR) 2025", value: "2,13", note: "turun dari 2,18 pada SP2020", source: "BPS, SUPAS 2025" },
      { label: "Rasio ketergantungan 2025", value: "45,05", note: "per 100 usia produktif menanggung 45 nonproduktif", source: "BPS, SUPAS 2025" },
      { label: "Usia produktif (15–64 tahun)", value: "68,94%", note: "dari total penduduk", source: "BPS, SUPAS 2025" },
      { label: "Lansia (60 tahun ke atas)", value: "11,97%", note: "dari total penduduk", source: "BPS, SUPAS 2025" },
      { label: "Pulau Jawa", value: "158,41 jt", note: "55,65% dari total penduduk", source: "BPS, SUPAS 2025" },
    ],
  },

  ekonomi: {
    title: "Ekonomi",
    intro: "Perekonomian Indonesia tumbuh 5,11% pada 2025 dengan PDB Rp23.821,1 triliun. Inflasi tahunan 2,92% — kembali ke dalam kisaran yang rendah setelah sempat 5,51% pada 2022.",
    growthVsInflation: {
      label: "Pertumbuhan ekonomi vs inflasi (% per tahun)",
      years: ["2021", "2022", "2023", "2024", "2025"],
      growth: [3.70, 5.31, 5.05, 5.03, 5.11],
      inflation: [1.87, 5.51, 2.61, 1.57, 2.92],
      source: "BPS, Pertumbuhan Ekonomi & Inflasi",
    },
    pdbByYear: {
      2024: { pdb: "Rp22.139 triliun", perKapitaRp: "Rp78,6 jt", perKapitaUsd: "US$4.960,3" },
      2025: { pdb: "Rp23.821,1 triliun", perKapitaRp: "Rp83,7 jt", perKapitaUsd: "US$5.083,4" },
    },
    worldBank: {
      label: "World Bank (2024)",
      rows: [
        { label: "PDB", value: "US$1,40 triliun" },
        { label: "PDB per kapita", value: "US$4.942" },
        { label: "PDB PPP", value: "US$4,67 triliun" },
        { label: "PDB per kapita PPP", value: "US$16.515" },
      ],
      source: "World Bank WDI",
    },
    notes: [
      { label: "Pertumbuhan Q3-2025", value: "5,04% yoy", source: "BPS, Pertumbuhan Ekonomi 2025" },
      { label: "Pertumbuhan 2020", value: "−2,07%", note: "kontraksi tahun pandemi", source: "BPS, Pertumbuhan Ekonomi" },
    ],
  },

  kerja: {
    title: "Ketenagakerjaan",
    intro: "Tingkat pengangguran terbuka (TPT) turun ke 4,85% pada Agustus 2025 — terendah dalam lima tahun terakhir. Angkatan kerja mencapai 154 juta orang dengan TPAK 70,59%.",
    tpt: {
      label: "TPT Agustus (% per tahun)",
      years: ["2021", "2022", "2023", "2024", "2025"],
      values: [6.49, 5.86, 5.32, 4.91, 4.85],
      source: "BPS, Sakernas Agustus 2025",
    },
    facts: [
      { label: "Penduduk usia kerja", value: "218,17 jt", note: "Agustus 2025", source: "BPS, Sakernas Agustus 2025" },
      { label: "Angkatan kerja", value: "154 jt", note: "TPAK 70,59%", source: "BPS, Sakernas Agustus 2025" },
      { label: "Penduduk bekerja", value: "146,54 jt", note: "orang", source: "BPS, Sakernas Agustus 2025" },
      { label: "Setengah penganggur", value: "7,91%", note: "dari penduduk bekerja", source: "BPS, Sakernas Agustus 2025" },
      { label: "Upah rata-rata buruh", value: "Rp3,33 jt/bln", note: "Agustus 2025", source: "BPS, Sakernas Agustus 2025" },
      { label: "Penganggur", value: "7,46 jt", note: "TPT 4,85%, turun dari 4,91% (Agustus 2024)", source: "BPS, Sakernas Agustus 2025" },
    ],
  },

  sosial: {
    title: "Sosial & Pembangunan Manusia",
    intro: "Kemiskinan turun ke 8,25% pada September 2025, level terendah yang tercatat. IPM naik ke 75,90 — naik dari 66,5 pada 2010 — meski kesenjangan antarprovinsi masih lebar.",
    poverty: {
      label: "Tingkat kemiskinan (% penduduk)",
      years: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "Mar", "Sep"],
      values: [11.13, 10.70, 10.12, 9.82, 9.22, 9.78, 9.71, 9.57, 9.36, 8.57, 8.47, 8.25],
      source: "BPS, Profil Kemiskinan (Susenas)",
    },
    povertySplit: {
      label: "Kemiskinan Maret 2025",
      rows: [
        { label: "Perkotaan", value: "6,73%" },
        { label: "Perdesaan", value: "11,03%" },
        { label: "Kemiskinan ekstrem", value: "0,85%" },
        { label: "Jumlah penduduk miskin", value: "23,85 jt jiwa" },
      ],
      source: "BPS, Profil Kemiskinan Maret 2025",
    },
    ipm: {
      label: "IPM (skor)",
      years: ["2010", "2023", "2024", "2025"],
      values: [66.50, 74.39, 75.02, 75.90],
      source: "BPS, Indeks Pembangunan Manusia",
    },
    ipmParts: [
      { label: "Umur harapan hidup", value: "74,47 tahun", source: "BPS, IPM 2025" },
      { label: "Harapan lama sekolah", value: "13,30 tahun", source: "BPS, IPM 2025" },
      { label: "Rata-rata lama sekolah", value: "9,07 tahun", source: "BPS, IPM 2025" },
    ],
    provinces: {
      label: "IPM provinsi 2025",
      highest: [
        { name: "DKI Jakarta", value: 85.0 },
        { name: "DI Yogyakarta", value: 82.5 },
        { name: "Kepulauan Riau", value: 80.5 },
      ],
      lowest: [
        { name: "Papua Pegunungan", value: 54.9 },
        { name: "Papua Tengah", value: 60.6 },
      ],
      source: "BPS, IPM 2025",
    },
    gini: { label: "Rasio gini 2024", value: "0,381", source: "BPS" },
  },

  sources: [
    { name: "BPS — Hasil SUPAS 2025", detail: "BRS No. 51/05/Th. XXIX: penduduk, TFR, rasio ketergantungan, generasi, sebaran pulau." },
    { name: "BPS — Pertumbuhan Ekonomi Indonesia 2024 & 2025", detail: "Rilis 5 Februari 2025 dan 5 Februari 2026: PDB, PDB per kapita, pertumbuhan, Q3-2025." },
    { name: "BPS — Keadaan Ketenagakerjaan Agustus 2025", detail: "Rilis 5 November 2025: TPT, angkatan kerja, TPAK, upah rata-rata." },
    { name: "BPS — Profil Kemiskinan Maret & September 2025", detail: "Susenas: tingkat kemiskinan, perkotaan/perdesaan, kemiskinan ekstrem." },
    { name: "BPS — Indeks Pembangunan Manusia 2024 & 2025", detail: "IPM nasional dan provinsi, umur harapan hidup, lama sekolah." },
    { name: "World Bank WDI", detail: "PDB dan PDB per kapita 2024 (nominal dan PPP)." },
  ],
};
