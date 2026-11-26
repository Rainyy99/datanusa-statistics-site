// DataNusa — charts.js
// Semua grafik digambar tangan sebagai SVG oleh fungsi-fungsi di file ini.
// Tidak ada library grafik. Setiap titik data membawa tooltip (hover) yang
// menampilkan nilai persisnya beserta tahun dan sumbernya.

function fmtNum(v, digits) {
  const d = digits === undefined ? 2 : digits;
  return v.toFixed(d).replace(".", ",");
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Tooltip bersama: satu elemen melayang yang dipakai semua grafik.
let tipEl = null;
function getTip() {
  if (!tipEl) {
    tipEl = document.createElement("div");
    tipEl.className = "chart-tip";
    tipEl.setAttribute("role", "status");
    document.body.appendChild(tipEl);
  }
  return tipEl;
}
function showTip(text, x, y) {
  const tip = getTip();
  tip.textContent = text;
  tip.style.display = "block";
  const w = tip.offsetWidth;
  const h = tip.offsetHeight;
  let left = x + 14;
  let top = y - h - 10;
  if (left + w > window.innerWidth - 8) left = x - w - 14;
  if (top < 8) top = y + 16;
  tip.style.left = left + "px";
  tip.style.top = top + "px";
}
function hideTip() {
  if (tipEl) tipEl.style.display = "none";
}
function bindTip(el, text) {
  el.addEventListener("mousemove", function (e) { showTip(text, e.clientX, e.clientY); });
  el.addEventListener("mouseleave", hideTip);
  el.addEventListener("focus", function () {
    const r = el.getBoundingClientRect();
    showTip(text, r.left + r.width / 2, r.top);
  });
  el.addEventListener("blur", hideTip);
}

function svgOpen(w, h, label) {
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" role="img" aria-label="' + esc(label) + '" preserveAspectRatio="xMidYMid meet">';
}

function niceTicks(min, max, count) {
  if (max === min) max = min + 1;
  const span = max - min;
  const stepRaw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
  const norm = stepRaw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const ticks = [];
  for (let v = lo; v <= max + 1e-9; v += step) ticks.push(v);
  return { ticks: ticks, step: step };
}

// Grafik batang vertikal. opts: {labels, values, color, digits, unit, source}
function barChart(opts) {
  const W = 640, H = 300, L = 56, R = 14, T = 16, B = 34;
  const iw = W - L - R, ih = H - T - B;
  const max = Math.max.apply(null, opts.values) * 1.08;
  const tk = niceTicks(0, max, 4);
  const n = opts.values.length;
  const slot = iw / n;
  const bw = Math.min(64, slot * 0.62);
  let s = svgOpen(W, H, opts.label || "Grafik batang");
  tk.ticks.forEach(function (t) {
    const y = T + ih - (t / max) * ih;
    s += '<line x1="' + L + '" y1="' + y.toFixed(1) + '" x2="' + (W - R) + '" y2="' + y.toFixed(1) + '" class="grid"/>';
    s += '<text x="' + (L - 8) + '" y="' + (y + 4).toFixed(1) + '" class="tick" text-anchor="end">' + esc(fmtNum(t, opts.digits === undefined ? 0 : opts.digits)) + '</text>';
  });
  opts.values.forEach(function (v, i) {
    const h = (v / max) * ih;
    const x = L + i * slot + (slot - bw) / 2;
    const y = T + ih - h;
    const tip = opts.labels[i] + ": " + fmtNum(v, opts.digits === undefined ? 2 : opts.digits) + (opts.unit ? " " + opts.unit : "") + " — " + (opts.source || "");
    s += '<g class="bar" tabindex="0" data-tip="' + esc(tip) + '"><rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="3" fill="' + (opts.color || "#0E7C7B") + '"/><text x="' + (x + bw / 2).toFixed(1) + '" y="' + (y - 6).toFixed(1) + '" class="barval" text-anchor="middle">' + esc(fmtNum(v, opts.digits === undefined ? 2 : opts.digits)) + '</text><text x="' + (x + bw / 2).toFixed(1) + '" y="' + (H - 10) + '" class="tick" text-anchor="middle">' + esc(opts.labels[i]) + '</text></g>';
  });
  s += "</svg>";
  return s;
}

// Grafik garis. opts: {labels, series:[{name, values, color, dash}], digits, unit, source}
function lineChart(opts) {
  const W = 640, H = 300, L = 56, R = 14, T = 20, B = 34;
  const iw = W - L - R, ih = H - T - B;
  let all = [];
  opts.series.forEach(function (sr) { all = all.concat(sr.values); });
  let min = Math.min.apply(null, all);
  let max = Math.max.apply(null, all);
  const pad = (max - min) * 0.15 + 0.5;
  min -= pad; max += pad;
  const tk = niceTicks(min, max, 4);
  const n = opts.labels.length;
  const xAt = function (i) { return L + (n === 1 ? iw / 2 : (i / (n - 1)) * iw); };
  const yAt = function (v) { return T + ih - ((v - min) / (max - min)) * ih; };
  let s = svgOpen(W, H, opts.label || "Grafik garis");
  tk.ticks.forEach(function (t) {
    const y = yAt(t);
    // Garis + label sumbu yang jatuh terlalu dekat ke baris label tahun
    // dilewati supaya tidak menumpuk dengan label tahun pertama/terakhir.
    if (y > H - 28) return;
    s += '<line x1="' + L + '" y1="' + y.toFixed(1) + '" x2="' + (W - R) + '" y2="' + y.toFixed(1) + '" class="grid"/>';
    s += '<text x="' + (L - 8) + '" y="' + (y + 4).toFixed(1) + '" class="tick" text-anchor="end">' + esc(fmtNum(t, opts.digits === undefined ? 1 : opts.digits)) + '</text>';
  });
  opts.labels.forEach(function (lb, i) {
    // Label tahun pertama/terakhir dijangkar ke dalam supaya tidak terpotong
    // di tepi SVG.
    const anchor = i === 0 ? "start" : (i === opts.labels.length - 1 ? "end" : "middle");
    s += '<text x="' + xAt(i).toFixed(1) + '" y="' + (H - 10) + '" class="tick" text-anchor="' + anchor + '">' + esc(lb) + '</text>';
  });
  opts.series.forEach(function (sr, si) {
    let d = "";
    sr.values.forEach(function (v, i) {
      d += (i === 0 ? "M" : "L") + xAt(i).toFixed(1) + "," + yAt(v).toFixed(1) + " ";
    });
    s += '<path d="' + d.trim() + '" fill="none" stroke="' + sr.color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"' + (sr.dash ? ' stroke-dasharray="' + sr.dash + '"' : "") + '/>';
    sr.values.forEach(function (v, i) {
      const tip = sr.name + " " + opts.labels[i] + ": " + fmtNum(v, opts.digits === undefined ? 2 : opts.digits) + (opts.unit ? " " + opts.unit : "") + " — " + (opts.source || "");
      // Seri pertama labelnya di atas titik, seri berikutnya di bawah titik,
      // supaya dua garis yang berdekatan tidak saling menutup angkanya.
      // Titik ujung dijangkar ke dalam agar tidak menabrak label sumbu-y.
      // Pada grafik satu seri yang rapat, label diselang-seling atas-bawah
      // per titik supaya label bersebelahan tidak bertumpuk.
      // Titik pertama grafik dua seri labelnya di bawah titik, supaya tidak
      // menempel pada label sumbu-y di sebelah kirinya.
      const above = opts.series.length === 1 ? (i % 2 === 0) : (si === 0 && i !== 0);
      const ly = above ? yAt(v) - 10 : yAt(v) + 20;
      const anchor = i === 0 ? "start" : (i === opts.labels.length - 1 ? "end" : "middle");
      const lx = i === 0 ? xAt(i) + 6 : (i === opts.labels.length - 1 ? xAt(i) - 6 : xAt(i));
      s += '<g class="dot" tabindex="0" data-tip="' + esc(tip) + '"><circle cx="' + xAt(i).toFixed(1) + '" cy="' + yAt(v).toFixed(1) + '" r="5" fill="' + sr.color + '" stroke="#fff" stroke-width="1.5"/><circle cx="' + xAt(i).toFixed(1) + '" cy="' + yAt(v).toFixed(1) + '" r="11" fill="transparent"/><text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" class="barval" text-anchor="' + anchor + '">' + esc(fmtNum(v, opts.digits === undefined ? 2 : opts.digits)) + '</text></g>';
    });
  });
  s += "</svg>";
  return s;
}

// Grafik batang horizontal. opts: {bars:[{name, value}], max, color, digits, unit, source}
function hbarChart(opts) {
  const rowH = 44, T = 8, B = 10, L = 130, R = 70;
  const W = 640, H = T + B + opts.bars.length * rowH;
  const iw = W - L - R;
  const max = (opts.max || Math.max.apply(null, opts.bars.map(function (b) { return b.value; }))) * 1.08;
  let s = svgOpen(W, H, opts.label || "Grafik batang horizontal");
  opts.bars.forEach(function (b, i) {
    const y = T + i * rowH;
    const w = (b.value / max) * iw;
    const tip = b.name + ": " + fmtNum(b.value, opts.digits === undefined ? 2 : opts.digits) + (opts.unit ? " " + opts.unit : "") + " — " + (opts.source || "");
    s += '<g class="bar" tabindex="0" data-tip="' + esc(tip) + '"><text x="' + (L - 10) + '" y="' + (y + 22) + '" class="tick" text-anchor="end">' + esc(b.name) + '</text><rect x="' + L + '" y="' + (y + 8) + '" width="' + w.toFixed(1) + '" height="20" rx="3" fill="' + (opts.color || "#0E7C7B") + '"/><text x="' + (L + w + 8).toFixed(1) + '" y="' + (y + 23) + '" class="barval">' + esc(fmtNum(b.value, opts.digits === undefined ? 2 : opts.digits)) + (opts.unit ? "%" : "") + '</text></g>';
  });
  s += "</svg>";
  return s;
}

// Setelah sebuah halaman dirender, aktifkan tooltip pada semua [data-tip].
function activateTips(root) {
  const nodes = (root || document).querySelectorAll("[data-tip]");
  nodes.forEach(function (el) { bindTip(el, el.getAttribute("data-tip")); });
}
