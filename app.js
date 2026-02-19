/* Ramadan Planner — Full 29-day plan (embedded) + checkmarks saved locally
   No PDF required. */

const STORAGE_KEY = "ramadanPlanner:embedded:v2";

const DEFAULT_CONSTANTS = [
  { key: "Calories", value: "1800 kcal" },
  { key: "Protein", value: "150–165 g/day" },
  { key: "Creatine", value: "5 g after Iftar" },
  { key: "Water", value: "3–3.5 L (Iftar→Imsak)" },
  { key: "Steps", value: "15,000 / day" },
  { key: "Gym closed", value: "Mon + Fri" },
  { key: "Gym closes", value: "22:00" },
];

const CHECK_ITEMS = [
  "Sahur completed",
  "Iftar completed",
  "Creatine 5g",
  "Protein target hit",
  "Gym / or Abs only",
  "15k steps",
  "Treadmill",
  "Abs challenge",
  "Study block 1",
  "Study block 2",
  "Shower",
  "Water 3L",
  "Sleep 6h+",
];

const DAYS = [{"id":"day-1","dayNum":1,"title":"DAY 1 — Thursday 19 Feb","meta":"Imsak 06:22 • Iftar 18:49 • Meat STEAK","imsak":"06:22","iftar":"18:49","meat":"STEAK","text":"🗓 DAY 1 — Thursday 19 Feb\nImsak 06:22\nIftar 18:49\nMeat: STEAK\nGym Day (Upper Body)\n05:30 Wake\n05:30–06:10 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n06:10 Stop eating\n06:22 Fajr\n07:15 Leave home\n14:00 Home\n14:30–15:15 Nap\n16:00–17:30 Study block\n18:49 Iftar\n• 1 briouat\n• 200g steak\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:30 Leave for gym\n19:35–20:35 Lift (Chest/Shoulders/Back/Triceps)\n20:35–21:00 Abs circuit\n21:00–21:45 Treadmill incline\n21:50 Home\n22:00 Shower\n22:15–23:00 Light review\n23:15 Sleep\n────────────────────────────────────\n\nDAILY CHECK SECTION (Copy for Each Day)\nDATE: _______\nPrayer Times:\nImsak: ______\nIftar: ______\nMeals:\n□ Sahur completed\n□ Iftar completed\n□ 5g creatine\n□ 150g protein\nTraining:\n□ Gym / or □ Abs only\n□ 15k steps\n□ Treadmill\nStudy:\n□ Block 1\n□ Block 2\nRecovery:\n□ Shower\n□ 3L water\n□ Sleep 6h+"},
{"id":"day-2","dayNum":2,"title":"DAY 2 — Friday 20 Feb","meta":"Imsak 06:20 • Iftar 18:51 • Meat CHICKEN","imsak":"06:20","iftar":"18:51","meat":"CHICKEN","text":"🗓 DAY 2 — Friday 20 Feb\nImsak 06:20\nIftar 18:51\nMeat: CHICKEN\nNo Gym\nLate sleep allowed\n05:30 Wake\n05:30–06:10 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n06:10 Stop eating\n06:20 Fajr\n07:15 Leave home\n14:00 Home\n14:30–15:15 Nap\n16:00–17:30 Study block\n18:51 Iftar\n• 1 briouat\n• 140g chicken thigh\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:30–20:30 Abs circuit\n20:30–21:15 Treadmill incline\n21:20 Shower\n21:40–22:30 Light review\n23:30 Sleep"},
{"id":"day-3","dayNum":3,"title":"DAY 3 — Saturday 21 Feb","meta":"Imsak 06:19 • Iftar 18:52 • Meat MINCED","imsak":"06:19","iftar":"18:52","meat":"MINCED","text":"🗓 DAY 3 — Saturday 21 Feb\nImsak 06:19\nIftar 18:52\nMeat: MINCED\nGym Day (Legs)\nLate sleep allowed\n09:30 Wake\n09:30–10:10 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n10:10 Stop eating\n06:19 Imsak\n10:30–12:30 Study block\n18:52 Iftar\n• 1 briouat\n• 260g minced meat\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:30 Leave for gym\n19:35–20:35 Lift (Legs + Biceps)\n20:35–21:00 Abs circuit\n21:00–21:45 Treadmill incline\n21:50 Home\n22:00 Shower\n22:15–23:15 Free time\n00:00 Sleep"},
{"id":"day-4","dayNum":4,"title":"DAY 4 — Sunday 22 Feb","meta":"Imsak 06:18 • Iftar 18:53 • Meat SOLE","imsak":"06:18","iftar":"18:53","meat":"SOLE","text":"🗓 DAY 4 — Sunday 22 Feb\nImsak 06:18\nIftar 18:53\nMeat: SOLE\nGym Day (Upper Body)\nLate sleep allowed\n09:30 Wake\n09:30–10:10 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n10:10 Stop eating\n06:18 Imsak\n10:30–12:30 Study block\n18:53 Iftar\n• 1 briouat\n• 160g sole\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:30 Leave for gym\n19:35–20:35 Lift (Chest/Back/Shoulders)\n20:35–21:00 Abs circuit\n21:00–21:45 Treadmill incline\n21:50 Home\n22:00 Shower\n22:15–23:15 Free time\n00:00 Sleep"},
{"id":"day-5","dayNum":5,"title":"DAY 5 — Monday 23 Feb","meta":"Imsak 06:16 • Iftar 18:54 • Meat MERLAN","imsak":"06:16","iftar":"18:54","meat":"MERLAN","text":"🗓 DAY 5 — Monday 23 Feb\nImsak 06:16\nIftar 18:54\nMeat: MERLAN\nNO GYM (Monday closed)\n05:30 Wake\n05:30–06:05 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n06:05 Stop eating\n06:16 Fajr\n07:15 Leave home\n14:00 Home\n15:30–17:30 Study block\n18:54 Iftar\n• 1 briouat\n• 130g merlan\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:30 Abs circuit\n20:15 Treadmill incline\n21:10 Shower\n22:00 Sleep"},
{"id":"day-6","dayNum":6,"title":"DAY 6 — Tuesday 24 Feb","meta":"Imsak 06:15 • Iftar 18:55 • Meat STEAK","imsak":"06:15","iftar":"18:55","meat":"STEAK","text":"🗓 DAY 6 — Tuesday 24 Feb\nImsak 06:15\nIftar 18:55\nMeat: STEAK\nGym Day (Chest/Triceps/Abs)\n05:30 Wake\n05:30–06:05 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n06:05 Stop eating\n06:15 Fajr\n07:15 Leave home\n14:00 Home\n15:00–17:30 Study block\n18:55 Iftar\n• 1 briouat\n• 200g steak\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:30 Gym\n19:35–20:35 Lift (Chest/Triceps)\n20:35–21:00 Abs\n21:00–21:45 Treadmill\n22:00 Shower\n23:15 Sleep"},
{"id":"day-7","dayNum":7,"title":"DAY 7 — Wednesday 25 Feb","meta":"Imsak 06:13 • Iftar 18:56 • Meat CHICKEN","imsak":"06:13","iftar":"18:56","meat":"CHICKEN","text":"🗓 DAY 7 — Wednesday 25 Feb\nImsak 06:13\nIftar 18:56\nMeat: CHICKEN\nGym Day (Legs/Biceps/Abs)\n05:30 Wake\n05:30–06:05 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n06:05 Stop eating\n06:13 Fajr\n07:15 Leave home\n14:00 Home\n15:00–17:30 Study block\n18:56 Iftar\n• 1 briouat\n• 140g chicken thigh\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:30 Gym\n19:35–20:35 Lift (Legs/Biceps)\n20:35–21:00 Abs\n21:00–21:45 Treadmill\n22:00 Shower\n23:15 Sleep"},
{"id":"day-8","dayNum":8,"title":"DAY 8 — Thursday 26 Feb","meta":"Imsak 06:12 • Iftar 18:58 • Meat MINCED","imsak":"06:12","iftar":"18:58","meat":"MINCED","text":"🗓 DAY 8 — Thursday 26 Feb\nImsak 06:12\nIftar 18:58\nMeat: MINCED\nUni 9–5 (back ~6/7)\nGym optional (tight)\n05:30 Wake\n05:30–06:00 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n06:00 Stop eating\n06:12 Fajr\n07:15 Leave home\n18:58 Iftar (as soon as home)\n• 1 briouat\n• 260g minced meat\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n20:00 Abs + Steps (treadmill)\n21:00 Shower\n22:30 Sleep"},
{"id":"day-9","dayNum":9,"title":"DAY 9 — Friday 27 Feb","meta":"Imsak 06:11 • Iftar 18:59 • Meat SOLE","imsak":"06:11","iftar":"18:59","meat":"SOLE","text":"🗓 DAY 9 — Friday 27 Feb\nImsak 06:11\nIftar 18:59\nMeat: SOLE\nNO GYM (Friday)\nUni 9–5 (back ~6/7)\n05:30 Wake\n05:30–06:00 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n06:00 Stop eating\n06:11 Fajr\n07:15 Leave home\n18:59 Iftar\n• 1 briouat\n• 160g sole\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n20:00 Abs\n20:45 Treadmill\n21:30 Shower\n22:30 Sleep"},
{"id":"day-10","dayNum":10,"title":"DAY 10 — Saturday 28 Feb","meta":"Imsak 06:09 • Iftar 19:00 • Meat MERLAN","imsak":"06:09","iftar":"19:00","meat":"MERLAN","text":"🗓 DAY 10 — Saturday 28 Feb\nImsak 06:09\nIftar 19:00\nMeat: MERLAN\nGym Day\nLate wake allowed\n09:30 Wake\n09:30–10:10 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n10:10 Stop eating\n19:00 Iftar\n• 1 briouat\n• 130g merlan\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:35 Gym\n20:35 Abs\n21:00 Treadmill\n22:00 Shower\n00:00 Sleep"},
{"id":"day-11","dayNum":11,"title":"DAY 11 — Sunday 1 March","meta":"Imsak 06:08 • Iftar 19:01 • Meat STEAK","imsak":"06:08","iftar":"19:01","meat":"STEAK","text":"🗓 DAY 11 — Sunday 01 March\nImsak 06:08\nIftar 19:01\nMeat: STEAK\nGym Day\nLate wake allowed\n09:30 Wake\n09:30–10:10 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n10:10 Stop eating\n19:01 Iftar\n• 1 briouat\n• 200g steak\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:35 Gym\n20:35 Abs\n21:00 Treadmill\n22:00 Shower\n00:00 Sleep"},
{"id":"day-12","dayNum":12,"title":"DAY 12 — Monday 2 March","meta":"Imsak 06:06 • Iftar 19:02 • Meat CHICKEN","imsak":"06:06","iftar":"19:02","meat":"CHICKEN","text":"🗓 DAY 12 — Monday 02 March\nImsak 06:06\nIftar 19:02\nMeat: CHICKEN\nREVISION WEEK\nNO GYM (Monday closed)\n06:00 Wake\n06:00–06:35 Sahur\n• 5 boiled eggs\n• 350g yogurt\n• 40g oats\n• 10g chia\n• 40g whole wheat bread\n• 750ml water\n06:35 Stop eating\nMorning: Study Block 1\nAfternoon: Study Block 2\n19:02 Iftar\n• 1 briouat\n• 140g chicken thigh\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n20:00 Abs\n20:45 Treadmill\n21:30 Shower\n23:30 Sleep"},
{"id":"day-13","dayNum":13,"title":"DAY 13 — Tuesday 3 March","meta":"Imsak 06:05 • Iftar 19:03 • Meat MINCED","imsak":"06:05","iftar":"19:03","meat":"MINCED","text":"🗓 DAY 13 — Tuesday 03 March\nImsak 06:05\nIftar 19:03\nMeat: MINCED\nREVISION WEEK\nGym Day\n06:00 Wake\n06:00–06:35 Sahur (same)\nMorning: Study Block 1\nAfternoon: Study Block 2\n19:03 Iftar\n• 1 briouat\n• 260g minced meat\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:35 Gym\n20:35 Abs\n21:00 Treadmill\n22:00 Shower\n00:00 Sleep"},
{"id":"day-14","dayNum":14,"title":"DAY 14 — Wednesday 4 March","meta":"Imsak 06:03 • Iftar 19:05 • Meat SOLE","imsak":"06:03","iftar":"19:05","meat":"SOLE","text":"🗓 DAY 14 — Wednesday 04 March\nImsak 06:03\nIftar 19:05\nMeat: SOLE\nREVISION WEEK\nGym Day\n06:00 Wake\nSahur (same)\nStudy block 1 + 2\n19:05 Iftar\n• 1 briouat\n• 160g sole\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:35 Gym\nAbs + Treadmill\nShower\nSleep"},
{"id":"day-15","dayNum":15,"title":"DAY 15 — Thursday 5 March","meta":"Imsak 06:01 • Iftar 19:06 • Meat MERLAN","imsak":"06:01","iftar":"19:06","meat":"MERLAN","text":"🗓 DAY 15 — Thursday 05 March\nImsak 06:01\nIftar 19:06\nMeat: MERLAN\nREVISION WEEK\nGym Day\n06:00 Wake\nSahur (same)\nStudy block 1 + 2\n19:06 Iftar\n• 1 briouat\n• 130g merlan\n• 80g rice\n• 150g yogurt\n• 5g creatine\n• 1L water\n19:35 Gym\nAbs + Treadmill\nShower\nSleep"},
{"id":"day-16","dayNum":16,"title":"DAY 16 — Friday 6 March","meta":"Imsak 06:00 • Iftar 19:07 • Meat STEAK","imsak":"06:00","iftar":"19:07","meat":"STEAK","text":"🗓 DAY 16 — Friday 06 March\nImsak 06:00\nIftar 19:07\nMeat: STEAK\nEXAM DAY\nNO GYM (Friday)\nSahur early\nStudy/revision + exam\nIftar as planned\nAbs + steps only\nSleep early"},
{"id":"day-17","dayNum":17,"title":"DAY 17 — Saturday 7 March","meta":"Imsak 05:58 • Iftar 19:08 • Meat CHICKEN","imsak":"05:58","iftar":"19:08","meat":"CHICKEN","text":"🗓 DAY 17 — Saturday 07 March\nImsak 05:58\nIftar 19:08\nMeat: CHICKEN\nWeekend\nLate wake allowed\nSahur (same)\nIftar (same)\nGym if wanted\nAbs + steps\nSleep later"},
{"id":"day-18","dayNum":18,"title":"DAY 18 — Sunday 8 March","meta":"Imsak 05:57 • Iftar 19:09 • Meat MINCED","imsak":"05:57","iftar":"19:09","meat":"MINCED","text":"🗓 DAY 18 — Sunday 08 March\nImsak 05:57\nIftar 19:09\nMeat: MINCED\nWeekend\nSahur (same)\nIftar (minced)\nGym\nAbs + steps\nSleep later"},
{"id":"day-19","dayNum":19,"title":"DAY 19 — Monday 9 March","meta":"Imsak 05:55 • Iftar 19:10 • Meat SOLE","imsak":"05:55","iftar":"19:10","meat":"SOLE","text":"🗓 DAY 19 — Monday 09 March\nImsak 05:55\nIftar 19:10\nMeat: SOLE\nNO GYM (Monday)\nSahur (same)\nIftar (sole)\nAbs + steps\nSleep"},
{"id":"day-20","dayNum":20,"title":"DAY 20 — Tuesday 10 March","meta":"Imsak 05:53 • Iftar 19:11 • Meat MERLAN","imsak":"05:53","iftar":"19:11","meat":"MERLAN","text":"🗓 DAY 20 — Tuesday 10 March\nImsak 05:53\nIftar 19:11\nMeat: MERLAN\nGym Day\nSahur (same)\nIftar (merlan)\nGym + abs + treadmill\nSleep"},
{"id":"day-21","dayNum":21,"title":"DAY 21 — Wednesday 11 March","meta":"Imsak 05:52 • Iftar 19:12 • Meat STEAK","imsak":"05:52","iftar":"19:12","meat":"STEAK","text":"🗓 DAY 21 — Wednesday 11 March\nImsak 05:52\nIftar 19:12\nMeat: STEAK\nGym Day\nSahur (same)\nIftar (steak)\nGym + abs + treadmill\nSleep"},
{"id":"day-22","dayNum":22,"title":"DAY 22 — Thursday 12 March","meta":"Imsak 05:50 • Iftar 19:14 • Meat CHICKEN","imsak":"05:50","iftar":"19:14","meat":"CHICKEN","text":"🗓 DAY 22 — Thursday 12 March\nImsak 05:50\nIftar 19:14\nMeat: CHICKEN\nGym Day\nSahur (same)\nIftar (chicken)\nGym + abs + treadmill\nSleep"},
{"id":"day-23","dayNum":23,"title":"DAY 23 — Friday 13 March","meta":"Imsak 05:48 • Iftar 19:15 • Meat MINCED","imsak":"05:48","iftar":"19:15","meat":"MINCED","text":"🗓 DAY 23 — Friday 13 March\nImsak 05:48\nIftar 19:15\nMeat: MINCED\nNO GYM (Friday)\nSahur (same)\nIftar (minced)\nAbs + steps\nSleep"},
{"id":"day-24","dayNum":24,"title":"DAY 24 — Saturday 14 March","meta":"Imsak 05:47 • Iftar 19:16 • Meat SOLE","imsak":"05:47","iftar":"19:16","meat":"SOLE","text":"🗓 DAY 24 — Saturday 14 March\nImsak 05:47\nIftar 19:16\nMeat: SOLE\nGym Day\nWeekend\nSahur (same)\nIftar (sole)\nGym + abs + treadmill\nSleep later"},
{"id":"day-25","dayNum":25,"title":"DAY 25 — Sunday 15 March","meta":"Imsak 05:45 • Iftar 19:17 • Meat MERLAN","imsak":"05:45","iftar":"19:17","meat":"MERLAN","text":"🗓 DAY 25 — Sunday 15 March\nImsak 05:45\nIftar 19:17\nMeat: MERLAN\nGym Day\nWeekend\nSahur (same)\nIftar (merlan)\nGym + abs + treadmill\nSleep later"},
{"id":"day-26","dayNum":26,"title":"DAY 26 — Monday 16 March","meta":"Imsak 05:43 • Iftar 19:18 • Meat STEAK","imsak":"05:43","iftar":"19:18","meat":"STEAK","text":"🗓 DAY 26 — Monday 16 March\nImsak 05:43\nIftar 19:18\nMeat: STEAK\nNO GYM (Monday)\nSahur (same)\nIftar (steak)\nAbs + steps\nSleep"},
{"id":"day-27","dayNum":27,"title":"DAY 27 — Tuesday 17 March","meta":"Imsak 05:41 • Iftar 19:19 • Meat CHICKEN","imsak":"05:41","iftar":"19:19","meat":"CHICKEN","text":"🗓 DAY 27 — Tuesday 17 March\nImsak 05:41\nIftar 19:19\nMeat: CHICKEN\nGym Day\nSahur (same)\nIftar (chicken)\nGym + abs + treadmill\nSleep"},
{"id":"day-28","dayNum":28,"title":"DAY 28 — Wednesday 18 March","meta":"Imsak 05:40 • Iftar 19:20 • Meat MINCED","imsak":"05:40","iftar":"19:20","meat":"MINCED","text":"🗓 DAY 28 — Wednesday 18 March\nImsak 05:40\nIftar 19:20\nMeat: MINCED\nGym Day\nSahur (same)\nIftar (minced)\nGym + abs + treadmill\nSleep"},
{"id":"day-29","dayNum":29,"title":"DAY 29 — Thursday 19 March","meta":"Imsak 05:38 • Iftar 19:21 • Meat STEAK","imsak":"05:38","iftar":"19:21","meat":"STEAK","text":"🗓 DAY 29 — Thursday 19 March\nImsak 05:38\nIftar 19:21\nMeat: STEAK\nGym Day\nSahur (same)\nIftar (steak)\nGym + abs + treadmill\nSleep"}];

function $(id){ return document.getElementById(id); }
const els = {
  status: $("statusPill") || $("pdfStatus"),
  dayCount: $("dayCount") || $("dayCountPill"),
  dayList: $("dayList"),
  daySearch: $("daySearch"),
  dayHeaderTitle: $("dayHeaderTitle"),
  dayHeaderMeta: $("dayHeaderMeta"),
  dayText: $("dayText"),
  checklist: $("checklist"),
  notes: $("notes"),
  completionPct: $("completionPct"),
  progressFill: $("progressFill"),
  constants: $("constants"),
  btnSaveConstants: $("btnSaveConstants"),
  btnSaveNotes: $("btnSaveNotes"),
  btnCheckAll: $("btnCheckAll"),
  btnUncheckAll: $("btnUncheckAll"),
  btnResetDay: $("btnResetDay"),
  btnToday: $("btnToday"),
  btnReload: $("btnReload") || $("btnReloadPdf"),
};

function safeOn(el, ev, fn){ if(el) el.addEventListener(ev, fn); }

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return { constants: DEFAULT_CONSTANTS, checks:{}, notes:{}, lastDayId:"day-1" };
    const p = JSON.parse(raw);
    return {
      constants: Array.isArray(p.constants) && p.constants.length ? p.constants : DEFAULT_CONSTANTS,
      checks: p.checks || {},
      notes: p.notes || {},
      lastDayId: p.lastDayId || "day-1",
    };
  }catch{
    return { constants: DEFAULT_CONSTANTS, checks:{}, notes:{}, lastDayId:"day-1" };
  }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
let state = loadState();
let currentDayId = state.lastDayId || "day-1";

function setStatus(text, ok=true){
  if(!els.status) return;
  els.status.textContent = text;
  els.status.style.borderColor = ok ? "rgba(31,185,128,.28)" : "rgba(255,77,77,.35)";
  els.status.style.background = ok ? "rgba(31,185,128,.14)" : "rgba(255,77,77,.12)";
}
function dayChecks(dayId){ return state.checks[dayId] || {}; }

function completion(dayId){
  const c = dayChecks(dayId);
  let done = 0;
  for(const item of CHECK_ITEMS) if(c[item]) done++;
  return Math.round((done / CHECK_ITEMS.length) * 100);
}
function updateCompletionUI(dayId){
  const pct = completion(dayId);
  if(els.completionPct) els.completionPct.textContent = pct + "%";
  if(els.progressFill) els.progressFill.style.width = pct + "%";
}

function renderConstants(){
  if(!els.constants) return;
  els.constants.innerHTML = "";
  state.constants.forEach((c, idx)=>{
    const row = document.createElement("div");
    row.className = "constRow";
    row.innerHTML = `<div class="k">${c.key}</div><input data-idx="${idx}" value="${c.value}" />`;
    els.constants.appendChild(row);
  });
}
function saveConstantsFromUI(){
  if(!els.constants) return;
  const inputs = els.constants.querySelectorAll("input[data-idx]");
  const updated = [...inputs].map(inp=>{
    const idx = parseInt(inp.dataset.idx,10);
    return { key: state.constants[idx].key, value: (inp.value||"").trim() };
  });
  state.constants = updated;
  saveState();
}

function renderChecklist(dayId){
  if(!els.checklist) return;
  els.checklist.innerHTML = "";
  const c = dayChecks(dayId);

  for(const item of CHECK_ITEMS){
    const id = `${dayId}-${item}`.replace(/\s+/g,"-").toLowerCase();
    const row = document.createElement("div");
    row.className = "checkRow";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = id;
    cb.checked = !!c[item];
    cb.addEventListener("change", ()=>{
      state.checks[dayId] = state.checks[dayId] || {};
      state.checks[dayId][item] = cb.checked;
      saveState();
      updateCompletionUI(dayId);
      renderDayList(els.daySearch ? els.daySearch.value : "");
    });

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = item;

    row.appendChild(cb);
    row.appendChild(label);
    els.checklist.appendChild(row);
  }
}

function renderDayList(filter=""){
  if(!els.dayList) return;
  const f = (filter||"").trim().toLowerCase();
  els.dayList.innerHTML = "";

  const list = DAYS.filter(d=>{
    if(!f) return true;
    return (d.title||"").toLowerCase().includes(f) || (d.meta||"").toLowerCase().includes(f) || (d.text||"").toLowerCase().includes(f);
  });

  for(const d of list){
    const item = document.createElement("div");
    item.className = "dayItem" + (d.id === currentDayId ? " active" : "");

    const left = document.createElement("div");
    left.className = "dayItemLeft";
    left.innerHTML = `<div class="dayNum">${d.title}</div><div class="dayMeta">${d.meta}</div>`;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = completion(d.id) + "%";

    item.appendChild(left);
    item.appendChild(badge);
    item.addEventListener("click", ()=>selectDay(d.id));
    els.dayList.appendChild(item);
  }

  if(els.dayCount) els.dayCount.textContent = "Days: " + DAYS.length;
}

function selectDay(dayId){
  const d = DAYS.find(x=>x.id===dayId);
  if(!d) return;

  currentDayId = dayId;
  state.lastDayId = dayId;
  saveState();

  if(els.dayHeaderTitle) els.dayHeaderTitle.textContent = d.title;
  if(els.dayHeaderMeta) els.dayHeaderMeta.textContent = d.meta;
  if(els.dayText) els.dayText.textContent = d.text;

  if(els.notes) els.notes.value = state.notes[dayId] || "";
  renderChecklist(dayId);
  updateCompletionUI(dayId);
  renderDayList(els.daySearch ? els.daySearch.value : "");
}

function resetDay(){
  if(!currentDayId) return;
  state.checks[currentDayId] = {};
  state.notes[currentDayId] = "";
  saveState();
  selectDay(currentDayId);
}
function setAllChecks(value){
  if(!currentDayId) return;
  state.checks[currentDayId] = state.checks[currentDayId] || {};
  for(const item of CHECK_ITEMS) state.checks[currentDayId][item] = value;
  saveState();
  selectDay(currentDayId);
}

function goToToday(){
  const start = new Date("2026-02-19T00:00:00+03:00").getTime();
  const now = Date.now();
  const diffDays = Math.floor((now - start) / (24*60*60*1000)) + 1;
  const id = "day-" + Math.min(Math.max(diffDays, 1), DAYS.length);
  selectDay(id);
}

function init(){
  setStatus("Loaded ✓ (embedded plan, no PDF)", true);
  renderConstants();
  renderDayList();
  const initial = DAYS.some(d=>d.id===currentDayId) ? currentDayId : "day-1";
  selectDay(initial);
}

safeOn(els.daySearch, "input", (e)=>renderDayList(e.target.value));
safeOn(els.btnSaveNotes, "click", ()=>{
  if(!currentDayId || !els.notes) return;
  state.notes[currentDayId] = els.notes.value;
  saveState();
  alert("Notes saved.");
});
safeOn(els.btnSaveConstants, "click", ()=>{
  saveConstantsFromUI();
  alert("Constants saved.");
});
safeOn(els.btnResetDay, "click", ()=>{
  if(confirm("Reset checkboxes + notes for this day?")) resetDay();
});
safeOn(els.btnCheckAll, "click", ()=>setAllChecks(true));
safeOn(els.btnUncheckAll, "click", ()=>setAllChecks(false));
safeOn(els.btnToday, "click", goToToday);
safeOn(els.btnReload, "click", init);

init();
