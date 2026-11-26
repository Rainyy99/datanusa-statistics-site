# DataNusa — Statistik Indonesia

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Rainyy99/datanusa-statistics-site/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Rainyy99/datanusa-statistics-site/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

DataNusa adalah situs statistik nasional Indonesia: penduduk, ekonomi,
ketenagakerjaan, dan pembangunan manusia dalam satu halaman. Semua angka
bersumber dari BPS dan World Bank WDI, lengkap dengan tahun dan sumbernya,
diakses dan diverifikasi 26 November 2026.

## Isi

- **Beranda** — tujuh indikator utama (penduduk 284,67 jt; PDB Rp23.821,1 T;
  tumbuh 5,11%; inflasi 2,92%; TPT 4,85%; kemiskinan 8,25%; IPM 75,90).
- **Penduduk** — tren 2010–2025, laju pertumbuhan, komposisi generasi,
  sebaran pulau, TFR, rasio ketergantungan.
- **Ekonomi** — pertumbuhan vs inflasi 2021–2025, PDB dan PDB per kapita
  (pemilih tahun 2024/2025), angka World Bank.
- **Ketenagakerjaan** — TPT 2021–2025, angkatan kerja, TPAK, upah rata-rata.
- **Sosial** — kemiskinan 2015–2025, kota vs desa, IPM 2010–2025 dan provinsi.
- **Sumber Data** — daftar rilis BPS dan cara membaca tiap indikator.

Semua grafik digambar tangan sebagai SVG oleh JavaScript situs sendiri, tanpa
library dan tanpa jaringan. Situs ini file statis di bawah `app/`.

## Menjalankan lokal

```sh
cd app && python3 -m http.server 8080
```

Buka `http://localhost:8080/` di Chrome desktop atau ponsel. Uji mandiri:
`http://localhost:8080/?selftest=1` — semua asersi harus PASS.

Entri ini dibuat untuk kompetisi
[Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539)
di make.fun.
