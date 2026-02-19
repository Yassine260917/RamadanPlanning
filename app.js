/* Ramadan Planner — PDF-driven day parser + localStorage tracking */

const STORAGE_KEY = "ramadanPlanner:v1";

const DEFAULT_CONSTANTS = [
  { key: "Calories", value: "1750–1850 kcal" },
  { key: "Protein", value: "150–165 g" },
  { key: "Creatine", value: "5 g after Iftar" },
  { key: "Water", value: "3–3.5 L (Iftar→Imsak)" },
  { key: "Steps", value: "15,000" },
  { key: "Gym closed", value: "Mon + Fri" },
  { key: "Gym closes", value: "22:00" },
];

const CHECK_ITEMS = [
  "Sahur completed",
  "Iftar completed",
  "5g creatine",
  "150g protein",
  "Gym OR Abs completed",
  "15k steps",
  "Treadmill (if gym day)",
  "Study block 1",
  "Study block 2",
  "Shower",
  "3L+ water",
  "Sleep 6h+",
];

const els = {
  pdfStatus: document.getElementById("pdfStatus"),
  dayCount: document.getElementById("dayCount"),
  dayList: document.getElementById("dayList"),
  daySearch: document.getElementById("daySearch"),
  dayHeaderTitle: document.getElementById("dayHeaderTitle"),
  dayHeaderMeta: document.getElementById("dayHeaderMeta"),
  dayText: document.getElementById("dayText"),
  checklist: document.getElementById("checklist"),
  notes: document.getElementById("notes"),
  completionPct: document.getElementById("completionPct"),
  progressFill: document.getElementById("progressFill"),
  constants: document.getElementById("constants"),
  btnSaveConstants: document.getElementById("btnSaveConstants"),
  btnSaveNotes: document.getElementById("btnSaveNotes"),
  btnCheckAll: document.getElementById("btnCheckAll"),
  btnUncheckAll: document.getElementById("btnUncheckAll"),
  btnResetDay: document.getElementById("btnResetDay"),
  btnToday: document.getElementById("btnToday"),
  btnReloadPdf: document.getElementById("btnReloadPdf"),
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { constants: DEFAULT_CONSTANTS, checks: {}, notes: {}, lastDayId: null };
    const parsed = JSON.parse(raw);
    return {
      constants: parsed.constants?.length ? parsed.constants : DEFAULT_CONSTANTS,
      checks: parsed.checks || {},
      notes: parsed.notes || {},
      lastDayId: parsed.lastDayId || null,
    };
  } catch {
    return { constants: DEFAULT_CONSTANTS, checks: {}, notes: {}, lastDayId: null };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();
let days = []; // {id, title, meta, rawText, dateStr?}
let currentDayId = null;

function setStatus(text, ok = true) {
  els.pdfStatus.textContent = text;
  els.pdfStatus.style.borderColor = ok ? "rgba(31,185,128,.28)" : "rgba(255,77,77,.35)";
  els.pdfStatus.style.background = ok ? "rgba(31,185,128,.14)" : "rgba(255,77,77,.12)";
}

function normalizeSpaces(s) {
  return s.replace(/\s+/g, " ").trim();
}

/**
 * Parse your PDF text by splitting on "🗓 DAY"
 * This matches your planner format.
 */
function parseDaysFromText(fullText) {
  const marker = "🗓 DAY";
  const parts = fullText.split(marker).map(p => p.trim()).filter(Boolean);
  const out = [];

  for (const part of parts) {
    // part begins like: "1 — Thursday 19 Feb Imsak 06:22 Iftar 18:49 ..."
    const firstLine = part.split("\n")[0] || part.slice(0, 120);
    const idMatch = firstLine.match(/^(\d+)/);
    const dayNum = idMatch ? parseInt(idMatch[1], 10) : out.length + 1;
    const id = `day-${dayNum}`;

    // title + meta
    // try to capture date and key bits from the first few lines
    const firstChunk = part.split("\n").slice(0, 6).join(" | ");
    const metaClean = normalizeSpaces(firstChunk)
      .replace(/\|/g, " • ")
      .slice(0, 220);

    const title = `Day ${dayNum}`;
    out.push({
      id,
      dayNum,
      title,
      meta: metaClean,
      rawText: `${marker} ${part}`.trim(),
      // Optional: attempt date extraction (for "Today" button).
      dateGuess: guessDateFromHeader(part),
    });
  }

  // sort by day number
  out.sort((a,b) => a.dayNum - b.dayNum);
  return out;
}

function guessDateFromHeader(part) {
  // Example: "1 — Thursday 19 Feb"
  // We'll parse "19 Feb" and assume year 2026.
  const m = part.match(/—\s*[A-Za-z]+\s+(\d{1,2})\s+([A-Za-z]{3,})/);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const monStr = m[2].toLowerCase();
  const months = {
    jan:0, january:0,
    feb:1, february:1,
    mar:2, march:2,
    apr:3, april:3,
    may:4,
    jun:5, june:5,
    jul:6, july:6,
    aug:7, august:7,
    sep:8, sept:8, september:8,
    oct:9, october:9,
    nov:10, november:10,
    dec:11, december:11,
  };
  const key = Object.keys(months).find(k => monStr.startsWith(k));
  if (!key) return null;
  const d = new Date(2026, months[key], day);
  return isNaN(d.getTime()) ? null : d;
}

async function loadPdfText(url = "plan.pdf") {
  // PDF.js global
  const pdfjsLib = window["pdfjs-dist/build/pdf"];
  if (!pdfjsLib) throw new Error("PDF.js not loaded");

  // Worker
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.js";

  const loadingTask = pdfjsLib.getDocument(url);
  const pdf = await loadingTask.promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(it => it.str);
    fullText += strings.join("\n") + "\n\n";
  }
  return fullText;
}

function renderDayList(filter = "") {
  const f = filter.trim().toLowerCase();
  els.dayList.innerHTML = "";

  const filtered = days.filter(d => {
    if (!f) return true;
    return (
      d.title.toLowerCase().includes(f) ||
      d.meta.toLowerCase().includes(f) ||
      d.rawText.toLowerCase().includes(f)
    );
  });

  for (const d of filtered) {
    const div = document.createElement("div");
    div.className = "dayItem" + (d.id === currentDayId ? " active" : "");
    div.dataset.dayId = d.id;

    const left = document.createElement("div");
    left.className = "dayItemLeft";
    left.innerHTML = `
      <div class="dayNum">${d.title}</div>
      <div class="dayMeta">${d.meta}</div>
    `;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = `${calcCompletion(d.id)}%`;

    div.appendChild(left);
    div.appendChild(badge);

    div.addEventListener("click", () => selectDay(d.id));
    els.dayList.appendChild(div);
  }

  els.dayCount.textContent = `Days: ${days.length}`;
}

function renderConstants() {
  els.constants.innerHTML = "";
  state.constants.forEach((c, idx) => {
    const row = document.createElement("div");
    row.className = "constRow";
    row.innerHTML = `
      <div class="k">${c.key}</div>
      <input data-idx="${idx}" value="${c.value}" />
    `;
    els.constants.appendChild(row);
  });
}

function saveConstantsFromUI() {
  const inputs = els.constants.querySelectorAll("input[data-idx]");
  const updated = [...inputs].map(inp => {
    const idx = parseInt(inp.dataset.idx, 10);
    return { key: state.constants[idx].key, value: inp.value.trim() };
  });
  state.constants = updated;
  saveState(state);
}

function getDayChecks(dayId) {
  return state.checks[dayId] || {};
}

function setDayCheck(dayId, item, value) {
  state.checks[dayId] = state.checks[dayId] || {};
  state.checks[dayId][item] = value;
  saveState(state);
}

function setDayNotes(dayId, text) {
  state.notes[dayId] = text;
  saveState(state);
}

function calcCompletion(dayId) {
  const checks = getDayChecks(dayId);
  const done = CHECK_ITEMS.reduce((acc, item) => acc + (checks[item] ? 1 : 0), 0);
  return Math.round((done / CHECK_ITEMS.length) * 100);
}

function renderChecklist(dayId) {
  els.checklist.innerHTML = "";
  const checks = getDayChecks(dayId);

  for (const item of CHECK_ITEMS) {
    const id = `${dayId}-${item}`.replace(/\s+/g, "-").toLowerCase();
    const row = document.createElement("div");
    row.className = "checkRow";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = id;
    cb.checked = !!checks[item];
    cb.addEventListener("change", () => {
      setDayCheck(dayId, item, cb.checked);
      updateCompletionUI(dayId);
      renderDayList(els.daySearch.value);
    });

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = item;

    row.appendChild(cb);
    row.appendChild(label);

    els.checklist.appendChild(row);
  }
}

function updateCompletionUI(dayId) {
  const pct = calcCompletion(dayId);
  els.completionPct.textContent = `${pct}%`;
  els.progressFill.style.width = `${pct}%`;
}

function selectDay(dayId) {
  const d = days.find(x => x.id === dayId);
  if (!d) return;

  currentDayId = dayId;
  state.lastDayId = dayId;
  saveState(state);

  els.dayHeaderTitle.textContent = `${d.title}`;
  els.dayHeaderMeta.textContent = d.meta;
  els.dayText.textContent = d.rawText;

  els.notes.value = state.notes[dayId] || "";
  renderChecklist(dayId);
  updateCompletionUI(dayId);
  renderDayList(els.daySearch.value);
}

function resetCurrentDay() {
  if (!currentDayId) return;
  state.checks[currentDayId] = {};
  state.notes[currentDayId] = "";
  saveState(state);
  selectDay(currentDayId);
}

function checkAllCurrentDay(value) {
  if (!currentDayId) return;
  state.checks[currentDayId] = state.checks[currentDayId] || {};
  for (const item of CHECK_ITEMS) state.checks[currentDayId][item] = value;
  saveState(state);
  selectDay(currentDayId);
}

function goToToday() {
  // If your plan dates are in 2026, this works.
  // If you're using it in another year, you can still use the day list.
  const now = new Date();
  const match = days.find(d => d.dateGuess && sameDay(d.dateGuess, now));
  if (match) selectDay(match.id);
  else alert("Couldn't match today's date to a day in the PDF. Use the day list.");
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

async function init() {
  renderConstants();
  setStatus("Loading PDF…", true);

  try {
    const text = await loadPdfText("plan.pdf");
    days = parseDaysFromText(text);

    if (!days.length) {
      setStatus("PDF loaded, but no '🗓 DAY' markers found.", false);
      els.dayHeaderTitle.textContent = "PDF parsed but no days detected";
      els.dayHeaderMeta.textContent = "Make sure your PDF includes '🗓 DAY X' headings.";
      return;
    }

    setStatus("PDF parsed ✓", true);

    // Choose day:
    const first = days[0].id;
    const initial = state.lastDayId && days.some(d => d.id === state.lastDayId)
      ? state.lastDayId
      : first;

    renderDayList();
    selectDay(initial);
  } catch (e) {
    console.error(e);
    setStatus("Failed to load plan.pdf", false);
    els.dayHeaderTitle.textContent = "Could not load plan.pdf";
    els.dayHeaderMeta.textContent = "Put your PDF in the repo root and name it plan.pdf";
  }
}

/* Events */
els.daySearch.addEventListener("input", (e) => renderDayList(e.target.value));

els.btnSaveNotes.addEventListener("click", () => {
  if (!currentDayId) return;
  setDayNotes(currentDayId, els.notes.value);
  alert("Notes saved.");
});

els.btnSaveConstants.addEventListener("click", () => {
  saveConstantsFromUI();
  alert("Constants saved.");
});

els.btnResetDay.addEventListener("click", () => {
  if (!currentDayId) return;
  if (confirm("Reset checkboxes + notes for this day?")) resetCurrentDay();
});

els.btnCheckAll.addEventListener("click", () => checkAllCurrentDay(true));
els.btnUncheckAll.addEventListener("click", () => checkAllCurrentDay(false));

els.btnToday.addEventListener("click", goToToday);

els.btnReloadPdf.addEventListener("click", async () => {
  setStatus("Reloading PDF…", true);
  await init();
});

init();
