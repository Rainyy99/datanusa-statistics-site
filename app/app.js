// DataNusa — app.js
// Router hash + render tiap halaman. Semua halaman dirender dari DATA
// (data.js); tidak ada angka yang ditulis langsung di markup halaman.

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function srcLine(source) {
  return '<p class="src">Sumber: ' + esc(source) + '</p>';
}

function factCard(f) {
  return '<article class="fact"><p class="fact-label">' + esc(f.label) + '</p>'
    + '<p class="fact-value">' + esc(f.value) + '</p>'
    + (f.note ? '<p class="fact-note">' + esc(f.note) + '</p>' : '')
    + srcLine(f.source) + '</article>';
}

function legend(items) {
  return '<ul class="legend">' + items.map(function (it) {
    return '<li><span class="swatch" style="background:' + it.color + '"></span>' + esc(it.name) + '</li>';
  }).join("") + "</ul>";
}

function renderHome() {
  const k = DATA.kpi;
  let h = '<section class="hero"><h1>Indonesia dalam angka</h1>'
    + '<p class="lede">Tujuh indikator utama, lima bidang, satu sumber yang bisa dicek: '
    + 'semua angka di situs ini berasal dari BPS dan World Bank, lengkap dengan tahun dan sumbernya.</p>'
    + '<p class="verified">' + esc(DATA.meta.verifiedNote) + '</p></section>';
  h += '<section aria-label="Indikator utama"><div class="kpi-grid">';
  h += k.map(function (c) {
    return '<a class="kpi" href="' + c.route + '"><span class="kpi-label">' + esc(c.label) + '</span>'
      + '<span class="kpi-value">' + esc(c.value) + '</span>'
      + '<span class="kpi-sub">' + esc(c.sub) + '</span>'
      + '<span class="kpi-src">Sumber: ' + esc(c.source) + '</span></a>';
  }).join("");
  h += '</div></section>';
  h += '<section class="areas"><h2>Jelajahi per bidang</h2><div class="area-grid">';
  h += '<a class="area" href="#/penduduk"><h3>Penduduk</h3><p>284,67 juta jiwa, pertumbuhan melambat, Jawa menampung 55,65% penduduk.</p><span>Lihat demografi →</span></a>';
  h += '<a class="area" href="#/ekonomi"><h3>Ekonomi</h3><p>PDB Rp23.821,1 triliun, tumbuh 5,11%, inflasi 2,92% pada 2025.</p><span>Lihat ekonomi →</span></a>';
  h += '<a class="area" href="#/kerja"><h3>Ketenagakerjaan</h3><p>TPT 4,85% — terendah lima tahun terakhir; angkatan kerja 154 juta orang.</p><span>Lihat ketenagakerjaan →</span></a>';
  h += '<a class="area" href="#/sosial"><h3>Sosial</h3><p>Kemiskinan 8,25%, IPM 75,90 — tapi kesenjangan antarprovinsi masih lebar.</p><span>Lihat sosial →</span></a>';
  h += '</div></section>';
  h += '<section class="releases"><h2>Rilis terbaru yang dipakai</h2><ul>'
    + '<li><strong>SUPAS 2025</strong> — jumlah penduduk 284,67 juta jiwa.</li>'
    + '<li><strong>Pertumbuhan Ekonomi 2025</strong> — PDB Rp23.821,1 triliun, tumbuh 5,11%.</li>'
    + '<li><strong>Sakernas Agustus 2025</strong> — TPT 4,85%, upah rata-rata Rp3,33 jt/bln.</li>'
    + '<li><strong>Profil Kemiskinan September 2025</strong> — kemiskinan 8,25%.</li>'
    + '<li><strong>IPM 2025</strong> — skor 75,90; DKI Jakarta tertinggi (85,0).</li>'
    + '</ul>' + srcLine("BPS, 2025") + '</section>';
  return h;
}

function renderPenduduk() {
  const p = DATA.penduduk;
  let h = '<section><h1>' + esc(p.title) + '</h1><p class="lede">' + esc(p.intro) + '</p></section>';
  h += '<section class="chart-block"><h2>' + esc(p.trend.label) + '</h2>'
    + barChart({ labels: p.trend.years, values: p.trend.values, color: "#0E7C7B", digits: 2, unit: "juta jiwa", source: p.trend.source, label: p.trend.label })
    + srcLine(p.trend.source) + '</section>';
  h += '<section><h2>Laju pertumbuhan penduduk</h2><div class="fact-grid">'
    + p.growth.map(function (g) {
      return '<article class="fact"><p class="fact-label">' + esc(g.period) + '</p><p class="fact-value">' + esc(g.value) + '</p><p class="fact-note">' + esc(g.note) + '</p>' + srcLine("BPS, SUPAS 2025") + '</article>';
    }).join("") + '</div></section>';
  h += '<section class="chart-block"><h2>' + esc(p.generations.label) + '</h2>'
    + hbarChart({ bars: p.generations.bars, color: "#E8A33D", digits: 2, unit: "%", source: p.generations.source, label: p.generations.label })
    + '<p class="callout">' + esc(p.generations.combined) + '</p>' + srcLine(p.generations.source) + '</section>';
  h += '<section><h2>Fakta demografi</h2><div class="fact-grid">'
    + p.facts.map(factCard).join("") + '</div></section>';
  return h;
}

function renderEkonomi() {
  const e = DATA.ekonomi;
  let h = '<section><h1>' + esc(e.title) + '</h1><p class="lede">' + esc(e.intro) + '</p></section>';
  h += '<section class="chart-block"><h2>' + esc(e.growthVsInflation.label) + '</h2>'
    + legend([{ name: "Pertumbuhan ekonomi", color: "#0E7C7B" }, { name: "Inflasi", color: "#C4552D" }])
    + lineChart({
      labels: e.growthVsInflation.years,
      series: [
        { name: "Pertumbuhan", values: e.growthVsInflation.growth, color: "#0E7C7B" },
        { name: "Inflasi", values: e.growthVsInflation.inflation, color: "#C4552D", dash: "6 4" },
      ],
      digits: 2, unit: "%", source: e.growthVsInflation.source, label: e.growthVsInflation.label,
    })
    + srcLine(e.growthVsInflation.source) + '</section>';
  h += '<section><h2>PDB &amp; PDB per kapita</h2>'
    + '<label class="picker">Tahun: <select id="year-pick" aria-label="Pilih tahun PDB"><option value="2025" selected>2025</option><option value="2024">2024</option></select></label>'
    + '<table class="data-table"><thead><tr><th>Indikator</th><th id="pdb-year-head">2025</th></tr></thead><tbody>'
    + '<tr><td>PDB harga berlaku</td><td id="cell-pdb"></td></tr>'
    + '<tr><td>PDB per kapita (Rp)</td><td id="cell-pkrp"></td></tr>'
    + '<tr><td>PDB per kapita (US$)</td><td id="cell-pkusd"></td></tr>'
    + '</tbody></table>' + srcLine("BPS, Pertumbuhan Ekonomi 2025") + '</section>';
  h += '<section><h2>' + esc(e.worldBank.label) + '</h2><table class="data-table"><tbody>'
    + e.worldBank.rows.map(function (r) { return "<tr><td>" + esc(r.label) + "</td><td>" + esc(r.value) + "</td></tr>"; }).join("")
    + '</tbody></table>' + srcLine(e.worldBank.source) + '</section>';
  h += '<section><h2>Catatan</h2><div class="fact-grid">' + e.notes.map(factCard).join("") + '</div></section>';
  return h;
}

function fillPdbYear(year) {
  const row = DATA.ekonomi.pdbByYear[year];
  if (!row) return;
  document.getElementById("cell-pdb").textContent = row.pdb;
  document.getElementById("cell-pkrp").textContent = row.perKapitaRp;
  document.getElementById("cell-pkusd").textContent = row.perKapitaUsd;
  document.getElementById("pdb-year-head").textContent = year;
}

function renderKerja() {
  const k = DATA.kerja;
  let h = '<section><h1>' + esc(k.title) + '</h1><p class="lede">' + esc(k.intro) + '</p></section>';
  h += '<section class="chart-block"><h2>' + esc(k.tpt.label) + '</h2>'
    + lineChart({ labels: k.tpt.years, series: [{ name: "TPT", values: k.tpt.values, color: "#0E7C7B" }], digits: 2, unit: "%", source: k.tpt.source, label: k.tpt.label })
    + srcLine(k.tpt.source) + '</section>';
  h += '<section><h2>Angka kunci</h2><div class="fact-grid">' + k.facts.map(factCard).join("") + '</div></section>';
  h += '<section class="explain"><h2>Cara membaca TPT</h2><p>TPT (tingkat pengangguran terbuka) adalah pangsa angkatan kerja yang tidak bekerja dan sedang mencari pekerjaan. '
    + 'TPT Agustus 2025 sebesar 4,85% berarti dari setiap 100 orang angkatan kerja, sekitar 5 orang menganggur. '
    + 'Angka ini turun dari 4,91% pada Agustus 2024.</p>' + srcLine("BPS, Sakernas Agustus 2025") + '</section>';
  return h;
}

function renderSosial() {
  const s = DATA.sosial;
  let h = '<section><h1>' + esc(s.title) + '</h1><p class="lede">' + esc(s.intro) + '</p></section>';
  h += '<section class="chart-block"><h2>' + esc(s.poverty.label) + '</h2>'
    + lineChart({ labels: s.poverty.years, series: [{ name: "Kemiskinan", values: s.poverty.values, color: "#0E7C7B" }], digits: 2, unit: "%", source: s.poverty.source, label: s.poverty.label })
    + srcLine(s.poverty.source) + '</section>';
  h += '<section><h2>' + esc(s.povertySplit.label) + '</h2><table class="data-table"><tbody>'
    + s.povertySplit.rows.map(function (r) { return "<tr><td>" + esc(r.label) + "</td><td>" + esc(r.value) + "</td></tr>"; }).join("")
    + '</tbody></table>' + srcLine(s.povertySplit.source) + '</section>';
  h += '<section class="chart-block"><h2>' + esc(s.ipm.label) + '</h2>'
    + lineChart({ labels: s.ipm.years, series: [{ name: "IPM", values: s.ipm.values, color: "#E8A33D" }], digits: 2, unit: "", source: s.ipm.source, label: s.ipm.label })
    + srcLine(s.ipm.source) + '</section>';
  h += '<section><h2>Penyusun IPM 2025</h2><div class="fact-grid">' + s.ipmParts.map(factCard).join("") + '</div></section>';
  h += '<section><h2>' + esc(s.provinces.label) + '</h2><table class="data-table"><thead><tr><th>Provinsi</th><th>IPM</th><th>Kelompok</th></tr></thead><tbody>'
    + s.provinces.highest.map(function (p) { return "<tr><td>" + esc(p.name) + "</td><td>" + fmtNum(p.value, 1) + "</td><td>Tertinggi</td></tr>"; }).join("")
    + s.provinces.lowest.map(function (p) { return "<tr><td>" + esc(p.name) + "</td><td>" + fmtNum(p.value, 1) + "</td><td>Terendah</td></tr>"; }).join("")
    + '</tbody></table>' + srcLine(s.provinces.source) + '</section>';
  h += '<section><div class="fact-grid">' + factCard({ label: s.gini.label, value: s.gini.value, source: s.gini.source }) + '</div></section>';
  return h;
}

function renderSumber() {
  let h = '<section><h1>Sumber data &amp; metodologi</h1>'
    + '<p class="lede">Setiap angka di DataNusa berasal dari rilis resmi di bawah ini. '
    + 'Tidak ada angka estimasi pihak ketiga; angka World Bank dikutip dari World Bank WDI.</p>'
    + '<p class="verified">' + esc(DATA.meta.verifiedNote) + '</p></section>';
  h += '<section><ol class="source-list">'
    + DATA.sources.map(function (s) { return "<li><strong>" + esc(s.name) + "</strong><br>" + esc(s.detail) + "</li>"; }).join("")
    + '</ol>' + srcLine("BPS — SUPAS 2025, Pertumbuhan Ekonomi, Sakernas, Profil Kemiskinan, IPM; World Bank WDI") + '</section>';
  h += '<section class="explain"><h2>Cara membaca tiap indikator</h2>'
    + '<ul><li><strong>PDB harga berlaku</strong> — nilai seluruh barang dan jasa akhir yang dihasilkan dalam setahun, pada harga tahun berjalan.</li>'
    + '<li><strong>Pertumbuhan ekonomi</strong> — perubahan PDB harga konstan terhadap tahun sebelumnya (yoy).</li>'
    + '<li><strong>Inflasi</strong> — perubahan Indeks Harga Konsumen tahunan (yoy).</li>'
    + '<li><strong>TPT</strong> — pangsa angkatan kerja yang menganggur (Sakernas, Agustus).</li>'
    + '<li><strong>IPM</strong> — skor 0–100 dari umur harapan hidup, harapan lama sekolah, dan rata-rata lama sekolah, plus pengeluaran per kapita.</li>'
    + '<li><strong>Rasio gini</strong> — 0 berarti pemerataan sempurna, 1 berarti ketimpangan sempurna.</li></ul></section>';
  return h;
}

const ROUTES = {
  "/": { title: "Beranda", render: renderHome },
  "/penduduk": { title: "Penduduk", render: renderPenduduk },
  "/ekonomi": { title: "Ekonomi", render: renderEkonomi },
  "/kerja": { title: "Ketenagakerjaan", render: renderKerja },
  "/sosial": { title: "Sosial", render: renderSosial },
  "/sumber": { title: "Sumber Data", render: renderSumber },
};

function currentRoute() {
  const hash = window.location.hash || "#/";
  const path = hash.slice(1) || "/";
  return ROUTES[path] ? path : "/";
}

function render() {
  const path = currentRoute();
  const main = document.getElementById("app");
  main.innerHTML = ROUTES[path].render();
  document.querySelectorAll(".nav a").forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#" + path);
    if (a.getAttribute("href") === "#" + path) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = "DataNusa — " + ROUTES[path].title + " | Statistik Indonesia";
  const pick = document.getElementById("year-pick");
  if (pick) {
    fillPdbYear(pick.value);
    pick.addEventListener("change", function () { fillPdbYear(pick.value); });
  }
  activateTips(main);
  window.scrollTo(0, 0);
}

// Self-test (?selftest=1): asersi di DOM supaya bisa dibaca headless.
function selftest() {
  const results = [];
  function check(name, ok) { results.push((ok ? "PASS" : "FAIL") + " " + name); }
  const main = document.getElementById("app");
  const paths = Object.keys(ROUTES);
  const savedHash = window.location.hash;
  paths.forEach(function (p) {
    window.location.hash = "#" + p;
    render();
    const hasH1 = !!main.querySelector("h1");
    const hasSrc = main.querySelectorAll(".src").length > 0;
    check("route " + p + " renders h1", hasH1);
    check("route " + p + " has source label", hasSrc);
  });
  window.location.hash = savedHash;
  render();
  check("kpi cards = 7", document.querySelectorAll(".kpi").length === 7);
  const svgs = main.querySelectorAll("svg");
  check("home has no empty placeholder text", !/placeholder|lorem/i.test(main.textContent));
  window.location.hash = "#/penduduk";
  render();
  check("penduduk chart points >= 4", document.querySelectorAll("#app svg .bar").length >= 4);
  window.location.hash = "#/ekonomi";
  render();
  check("ekonomi chart dots >= 5", document.querySelectorAll("#app svg .dot").length >= 5);
  const pick = document.getElementById("year-pick");
  pick.value = "2024";
  pick.dispatchEvent(new Event("change"));
  check("year picker switches to 2024", document.getElementById("cell-pdb").textContent.indexOf("22.139") !== -1);
  pick.value = "2025";
  pick.dispatchEvent(new Event("change"));
  check("year picker switches back to 2025", document.getElementById("cell-pdb").textContent.indexOf("23.821") !== -1);
  window.location.hash = "#/sosial";
  render();
  check("sosial chart dots >= 12", document.querySelectorAll("#app svg .dot").length >= 12);
  window.location.hash = savedHash || "#/";
  render();
  const pre = document.createElement("pre");
  pre.id = "selftest-result";
  pre.textContent = results.join("\n");
  document.body.appendChild(pre);
  document.title = "SELFTEST " + (results.some(function (r) { return r.indexOf("FAIL") === 0; }) ? "FAIL" : "PASS");
  return results;
}

window.addEventListener("hashchange", render);
document.addEventListener("DOMContentLoaded", function () {
  render();
  if (window.location.search.indexOf("selftest=1") !== -1) selftest();
});
