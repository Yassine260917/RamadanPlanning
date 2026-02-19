/* Ramadan Planner — full plan embedded (no PDF needed)
   Source: your uploaded PDF (RAMADAN SCHEDULE GYM DIET STUDY MASTER PLANNING.pdf)
*/

const PLAN_YEAR = 2026;
const PLAN_START = new Date(`${PLAN_YEAR}-02-19T00:00:00`); // Day 1
const PLAN_END = new Date(`${PLAN_YEAR}-03-19T23:59:59`);   // Day 29

const STORAGE = {
  checks: (dayId) => `rp:checks:${dayId}`,
  notes: (dayId) => `rp:notes:${dayId}`,
  constants: `rp:constants:v1`,
  lastDayId: `rp:lastDayId:v1`,
};

const DEFAULT_CONSTANTS = {
  calories: "1800 kcal",
  protein: "150–165 g/day",
  creatine: "5 g after iftar",
  water: "3–3.5 L (iftar→imsak)",
  steps: "15,000",
  gymClosed: "Mon + Fri",
  gymCloses: "22:00",
};

const DAILY_TASKS = [
  { id: "sahur", label: "Sahur completed" },
  { id: "iftar", label: "Iftar completed" },
  { id: "creatine", label: "Creatine 5g" },
  { id: "protein", label: "Protein target hit" },
  { id: "water", label: "Water ≥ 3L" },
  { id: "steps", label: "15k steps done" },
  { id: "abs", label: "Abs challenge done" },
  { id: "gym", label: "Gym session done (if open)" },
  { id: "treadmill", label: "Treadmill done (if planned)" },
  { id: "study1", label: "Study block 1 done" },
  { id: "study2", label: "Study block 2 done" },
  { id: "shower", label: "Shower done" },
];

const DAYS = [
  {
    id: "day-1",
    dayNum: 1,
    title: "DAY 1 — Thursday 19 Feb",
    meta: "Imsak 06:22 • Iftar 18:49 • Meat STEAK",
    imsak: "06:22",
    iftar: "18:49",
    meat: "STEAK",
    text: `🗓 DAY 1 — Thursday 19 Feb
Imsak 06:22
Iftar 18:49
Meat: STEAK
Gym Day (Upper Body)
05:30 Wake
05:30–06:10 Sahur
• 5 boiled eggs
• 350g yogurt
• 40g oats
• 10g chia
• 40g whole wheat bread
• 750ml water
06:10 Stop eating
06:22 Fajr
07:15 Leave home
14:00 Home
14:30–15:15 Nap
16:00–17:30 Study block
18:49 Iftar
• 1 briouat
• 200g steak
• 80g rice
• 150g yogurt
• 5g creatine
• 1L water
19:30 Leave for gym
19:35–20:35 Lift (Chest/Shoulders/Back/Triceps)
20:35–21:00 Abs circuit
21:00–21:45 Treadmill incline
21:50 Home
22:00 Shower
22:15–23:00 Light review
23:15 Sleep
────────────────────────────────────
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: ______
Iftar: ______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-2",
    dayNum: 2,
    title: "DAY 2 — Friday 20 Feb",
    meta: "Imsak 06:20 • Iftar 18:51 • Meat CHICKEN",
    imsak: "06:20",
    iftar: "18:51",
    meat: "CHICKEN",
    text: `🗓 DAY 2 — Friday 20 Feb
Imsak 06:20
Iftar 18:51
Meat: CHICKEN
No Gym
Late sleep allowed
05:30 Wake
05:30–06:08 Sahur
• 5 boiled eggs
• 350g yogurt
• 40g oats
• 10g chia
• 750ml water
07:15 Leave
14:00 Home
16:00–17:30 Study
18:51 Iftar
• 1 briouat
• 280g chicken thighs
• 80g rice
• 150g yogurt
• 5g creatine
19:45–21:15 Outdoor walking (to reach 15k steps)
21:15–21:55 Abs challenge at home
22:15 Shower
23:45 Sleep (later because Saturday wake is later)
────────────────────────────────────
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: ______
Iftar: ______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-3",
    dayNum: 3,
    title: "DAY 3 — Saturday 21 Feb",
    meta: "Imsak 06:19 • Iftar 18:52 • Meat MINCED",
    imsak: "06:19",
    iftar: "18:52",
    meat: "MINCED",
    text: `🗓 DAY 3 — Saturday 21 Feb
Imsak 06:19
Iftar 18:52
Meat: MINCED
Gym Day (Legs/Biceps)
10:00 Wake
(No Sahur needed — fasting already began before wake)
10:30–12:30 Study block 1
13:00–14:00 Light review
15:00–17:30 Study block 2
18:52 Iftar
• 1 briouat
• 260g minced meat
• 80g pasta
• 150g yogurt
• 5g creatine
19:40 Leave gym
19:45–20:45 Lift (Legs, Biceps, Abs)
20:45–21:10 Abs
21:10–21:50 Treadmill
21:55 Home
22:10 Shower
23:45 Sleep
────────────────────────────────────`
  },

  {
    id: "day-4",
    dayNum: 4,
    title: "DAY 4 — Sunday 22 Feb",
    meta: "Imsak 06:18 • Iftar 18:53 • Meat FISH",
    imsak: "06:18",
    iftar: "18:53",
    meat: "FISH",
    text: `🗓 DAY 4 — Sunday 22 Feb
Imsak 06:18
Iftar 18:53
Meat: FISH
Gym Day (Chest/Back/Shoulders)
10:00 Wake
10:30–12:30 Study
13:00–14:00 Light review
15:00–17:30 Study
18:53 Iftar
• 1 briouat
• 320g fish
• 80g rice
• 200g yogurt
• 5g creatine
Gym same structure
23:45 Sleep
────────────────────────────────────
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: ______
Iftar: ______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-5",
    dayNum: 5,
    title: "DAY 5 — Monday 23 Feb",
    meta: "Imsak 06:16 • Iftar 18:54 • Meat STEAK",
    imsak: "06:16",
    iftar: "18:54",
    meat: "STEAK",
    text: `🗓 DAY 5 — Monday 23 Feb
Imsak 06:16
Iftar 18:54
Meat: STEAK
No Gym
05:25 Wake
05:25–06:05 Sahur
• 5 boiled eggs
• 350g yogurt
• 40g oats
• 10g chia
• 40g bread
• 750ml water
06:05 Stop eating
06:16 Fajr
07:15 Leave
09:00–12:00 Uni
14:00 Home
14:30–15:15 Nap
16:00–17:30 Study block
17:30–18:30 Relax
18:54 Iftar
• 1 briouat
• 200g steak
• 80g rice
• 150g yogurt
• 5g creatine
• 1L water
19:30–21:00 Outdoor walk (hit 15k steps)
21:00–21:40 Abs challenge at home
22:00 Shower
22:30 Light review
23:15 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: ______
Iftar: ______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-6",
    dayNum: 6,
    title: "DAY 6 — Tuesday 24 Feb",
    meta: "Imsak 06:15 • Iftar 18:55 • Meat CHICKEN",
    imsak: "06:15",
    iftar: "18:55",
    meat: "CHICKEN",
    text: `🗓 DAY 6 — Tuesday 24 Feb
Imsak 06:15
Iftar 18:55
Meat: CHICKEN
Gym: Chest/Triceps
05:25 Wake
05:25–06:05 Sahur
• 5 eggs
• 350g yogurt
• 40g oats
• 10g chia
• 750ml water
07:15 Leave
09:00–12:00 Uni
14:00 Home
14:30–15:15 Nap
16:00–17:30 Study
17:30–18:30 Relax
18:55 Iftar
• 1 briouat
• 280g chicken
• 80g rice
• 150g yogurt
• 5g creatine
19:30 Leave gym
19:35–20:35 Lift (Chest/Triceps)
20:35–21:00 Abs
21:00–21:45 Treadmill
21:50 Home
22:00 Shower
22:30 Review
23:15 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: ______
Iftar: ______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-7",
    dayNum: 7,
    title: "DAY 7 — Wednesday 25 Feb",
    meta: "Imsak 06:13 • Iftar 18:56 • Meat MINCED",
    imsak: "06:13",
    iftar: "18:56",
    meat: "MINCED",
    text: `🗓 DAY 7 — Wednesday 25 Feb
Imsak 06:13
Iftar 18:56
Meat: MINCED
Gym: Legs/Biceps
05:20 Wake
05:20–05:58 Sahur
• 4 eggs
• 400g yogurt
• 40g oats
• 10g chia
07:15 Leave
09:00–12:00 Uni
14:00 Home
14:30–15:15 Nap
16:00–17:30 Study
18:56 Iftar
• 1 briouat
• 260g minced
• 80g pasta
• 150g yogurt
• creatine
19:30–21:45 Gym session (Legs, Biceps, Abs)
22:00 Shower
23:15 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: ______
Iftar: ______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-8",
    dayNum: 8,
    title: "DAY 8 — Thursday 26 Feb",
    meta: "Imsak 06:12 • Iftar 18:58 • Meat FISH",
    imsak: "06:12",
    iftar: "18:58",
    meat: "FISH",
    text: `🗓 DAY 8 — Thursday 26 Feb
Imsak 06:12
Iftar 18:58
Meat: FISH
Gym Day
Long Uni (9–17)
05:20 Wake
05:20–05:55 Sahur
• 5 eggs
• 400g yogurt
• 40g oats
• 10g chia
07:15 Leave
09:00–17:00 Uni
18:30–18:45 Arrive home
18:58 Iftar immediately
• 1 briouat
• 320g fish
• 80g rice
• 200g yogurt
• creatine
19:40 Leave gym (Chest, Shoulder, back, triceps)
19:45–20:35 Lift
20:35–21:00 Abs
21:00–21:45 Treadmill
21:50 Home
22:00 Shower
23:15 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },
];
// Continue DAYS array (Day 9 → Day 20)
DAYS.push(
  {
    id: "day-9",
    dayNum: 9,
    title: "DAY 9 — Friday 27 Feb",
    meta: "Imsak 06:11 • Iftar 18:59 • Meat STEAK",
    imsak: "06:11",
    iftar: "18:59",
    meat: "STEAK",
    text: `🗓 DAY 9 — Friday 27 Feb
Imsak 06:11
Iftar 18:59
Meat: STEAK
No Gym
Long Uni
05:20 Wake
05:20–05:55 Sahur
• 5 eggs
• 350g yogurt
• 40g oats
• 10g chia
07:15 Leave
09:00–17:00 Uni
18:45 Home
18:59 Iftar
• 1 briouat
• 200g steak
• 80g rice
• 150g yogurt
• creatine
19:45–21:15 Walk
21:15–21:55 Abs
22:15 Shower
23:45 Sleep (Saturday wake late)
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-10",
    dayNum: 10,
    title: "DAY 10 — Saturday 28 Feb",
    meta: "Imsak 06:09 • Iftar 19:00 • Meat CHICKEN",
    imsak: "06:09",
    iftar: "19:00",
    meat: "CHICKEN",
    text: `🗓 DAY 10 — Saturday 28 Feb
Imsak 06:09
Iftar 19:00
Meat: CHICKEN
Gym Day
Weekend Wake Late
10:00 Wake
10:30–12:30 Study block
13:00–14:00 Review
15:00–17:30 Study block
19:00 Iftar
• 1 briouat
• 280g chicken
• 80g rice
• 150g yogurt
• creatine
19:40 Leave gym
19:45–20:45 Lift
20:45–21:10 Abs
21:10–21:50 Treadmill
21:55 Home
22:10 Shower
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-11",
    dayNum: 11,
    title: "DAY 11 — Sunday 1 March",
    meta: "Imsak 06:08 • Iftar 19:01 • Meat MINCED",
    imsak: "06:08",
    iftar: "19:01",
    meat: "MINCED",
    text: `🗓 DAY 11 — Sunday 1 March
Imsak 06:08
Iftar 19:01
Meat: MINCED
Gym Day
10:00 Wake
10:30–12:30 Study block 1
13:00–14:00 Review
15:00–17:30 Study block 2
19:01 Iftar
• 1 briouat
• 260g minced
• 80g pasta
• 150g yogurt
• 5g creatine
• 1L water
19:45 Leave gym
19:50–20:40 Lift (Chest/Back/Shoulders)
20:40–21:05 Abs
21:05–21:50 Treadmill
21:55 Home
22:10 Shower
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-12",
    dayNum: 12,
    title: "DAY 12 — Monday 2 March",
    meta: "Imsak 06:06 • Iftar 19:02 • Meat FISH",
    imsak: "06:06",
    iftar: "19:02",
    meat: "FISH",
    text: `🗓 DAY 12 — Monday 2 March
Imsak 06:06
Iftar 19:02
Meat: FISH
No Gym
Revision Heavy
10:00 Wake
10:30–13:00 Study block 1
14:00–16:00 Study block 2
16:30–17:45 Light review
19:02 Iftar
• 1 briouat
• 320g fish
• 80g rice
• 200g yogurt
• creatine
19:45–21:15 Outdoor walk (hit 15k steps)
21:15–21:55 Abs challenge
22:15 Shower
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-13",
    dayNum: 13,
    title: "DAY 13 — Tuesday 3 March",
    meta: "Imsak 06:05 • Iftar 19:03 • Meat STEAK",
    imsak: "06:05",
    iftar: "19:03",
    meat: "STEAK",
    text: `🗓 DAY 13 — Tuesday 3 March
Imsak 06:05
Iftar 19:03
Meat: STEAK
Gym Day
10:00 Wake
10:30–12:30 Study
13:00–14:00 Review
15:00–17:30 Study
19:03 Iftar
• 1 briouat
• 200g steak
• 80g rice
• 150g yogurt
• creatine
19:45 Gym
Lift 50 min
Abs 25 min
Treadmill 40–45 min
22:00 Shower
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-14",
    dayNum: 14,
    title: "DAY 14 — Wednesday 4 March",
    meta: "Imsak 06:03 • Iftar 19:05 • Meat CHICKEN",
    imsak: "06:03",
    iftar: "19:05",
    meat: "CHICKEN",
    text: `🗓 DAY 14 — Wednesday 4 March
Imsak 06:03
Iftar 19:05
Meat: CHICKEN
Gym Day
10:00 Wake
10:30–13:00 Study
14:00–16:00 Study
16:30–17:45 Review
19:05 Iftar
• 1 briouat
• 280g chicken
• 80g rice
• 150g yogurt
• creatine
Gym same structure
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-15",
    dayNum: 15,
    title: "DAY 15 — Thursday 5 March",
    meta: "Imsak 06:01 • Iftar 19:06 • Meat MINCED",
    imsak: "06:01",
    iftar: "19:06",
    meat: "MINCED",
    text: `🗓 DAY 15 — Thursday 5 March
Imsak 06:01
Iftar 19:06
Meat: MINCED
Gym Day
09:30 Wake
09:45–12:30 Study block
14:00–16:30 Study block
17:00–17:45 Light review
19:06 Iftar
• 1 briouat
• 260g minced
• 80g pasta
• 150g yogurt
• creatine
Gym 19:50–21:55
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-16",
    dayNum: 16,
    title: "DAY 16 — Friday 6 March",
    meta: "Imsak 06:00 • Iftar 19:07 • Meat FISH",
    imsak: "06:00",
    iftar: "19:07",
    meat: "FISH",
    text: `🗓 DAY 16 — Friday 6 March
Imsak 06:00
Iftar 19:07
Meat: FISH
Exam Day
No Gym
05:15 Wake
05:15–05:45 Sahur
• 5 eggs
• 400g yogurt
• 40g oats
• 10g chia
07:15 Leave for exam
After exam: light rest
19:07 Iftar
• 1 briouat
• 320g fish
• 80g rice
• 200g yogurt
• creatine
20:00–21:15 Walk
21:15–21:45 Abs
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-17",
    dayNum: 17,
    title: "DAY 17 — Saturday 7 March",
    meta: "Imsak 05:58 • Iftar 19:08 • Meat STEAK",
    imsak: "05:58",
    iftar: "19:08",
    meat: "STEAK",
    text: `🗓 DAY 17 — Saturday 7 March
Imsak 05:58
Iftar 19:08
Meat: STEAK
Gym Day
10:00 Wake
10:30–13:00 Study
14:30–16:30 Study
17:00–17:45 Review
19:08 Iftar
• 1 briouat
• 200g steak
• 80g rice
• 150g yogurt
• creatine
Gym session
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-18",
    dayNum: 18,
    title: "DAY 18 — Sunday 8 March",
    meta: "Imsak 05:57 • Iftar 19:09 • Meat CHICKEN",
    imsak: "05:57",
    iftar: "19:09",
    meat: "CHICKEN",
    text: `🗓 DAY 18 — Sunday 8 March
Imsak 05:57
Iftar 19:09
Meat: CHICKEN
Gym Day
10:00 Wake
10:30–12:30 Study
13:30–15:30 Study
16:00–17:30 Review
19:09 Iftar
• 1 briouat
• 280g chicken
• 80g rice
• 150g yogurt
• creatine
Gym
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-19",
    dayNum: 19,
    title: "DAY 19 — Monday 9 March",
    meta: "Imsak 05:55 • Iftar 19:10 • Meat MINCED",
    imsak: "05:55",
    iftar: "19:10",
    meat: "MINCED",
    text: `🗓 DAY 19 — Monday 9 March
Imsak 05:55
Iftar 19:10
Meat: MINCED
No Gym
05:05 Wake
05:05–05:40 Sahur
• 4 boiled eggs
• 400g yogurt
• 40g oats
• 10g chia
• 750ml water
05:55 Fajr
Morning light rest until 07:00
10:00–12:00 Study
14:00–16:00 Study
16:30–17:30 Review
19:10 Iftar
• 1 briouat
• 260g minced
• 80g pasta
• 150g yogurt
• 5g creatine
• 1L water
19:50–21:20 Outdoor walk (reach 15k steps)
21:20–22:00 Abs challenge
22:15 Shower
23:15 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-20",
    dayNum: 20,
    title: "DAY 20 — Tuesday 10 March",
    meta: "Imsak 05:53 • Iftar 19:11 • Meat FISH",
    imsak: "05:53",
    iftar: "19:11",
    meat: "FISH",
    text: `🗓 DAY 20 — Tuesday 10 March
Imsak 05:53
Iftar 19:11
Meat: FISH
Gym Day (Chest/Triceps)
05:00 Wake
05:00–05:35 Sahur
• 5 eggs
• 400g yogurt
• 40g oats
• 10g chia
07:15 Leave
14:00 Home
14:30–15:00 Nap
16:00–17:30 Study
19:11 Iftar
• 1 briouat
• 320g fish
• 80g rice
• 200g yogurt
• creatine
19:45–21:50 Gym (lift + abs + treadmill)
22:00 Shower
23:10 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  }
);
// Finish DAYS array (Day 21 → Day 29)
DAYS.push(
  {
    id: "day-21",
    dayNum: 21,
    title: "DAY 21 — Wednesday 11 March",
    meta: "Imsak 05:52 • Iftar 19:12 • Meat STEAK",
    imsak: "05:52",
    iftar: "19:12",
    meat: "STEAK",
    text: `🗓 DAY 21 — Wednesday 11 March
Imsak 05:52
Iftar 19:12
Meat: STEAK
Gym Day (Legs/Biceps)
05:00 Wake
Sahur steak version
• 5 eggs
• 350g yogurt
• 40g oats
• 10g chia
Uni
Nap
Study
19:12 Iftar
• 1 briouat
• 200g steak
• 80g rice
• 150g yogurt
• creatine
Gym 19:50–21:55
23:10 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-22",
    dayNum: 22,
    title: "DAY 22 — Thursday 12 March",
    meta: "Imsak 05:50 • Iftar 19:14 • Meat CHICKEN",
    imsak: "05:50",
    iftar: "19:14",
    meat: "CHICKEN",
    text: `🗓 DAY 22 — Thursday 12 March
Imsak 05:50
Iftar 19:14
Meat: CHICKEN
Gym Day (Upper Body)
04:55 Wake
04:55–05:30 Sahur
• 5 eggs
• 350g yogurt
• 40g oats
• 10g chia
07:15 Leave
Study afternoon
19:14 Iftar
• 1 briouat
• 280g chicken
• 80g rice
• 150g yogurt
• creatine
Gym 19:55–21:55
23:10 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-23",
    dayNum: 23,
    title: "DAY 23 — Friday 13 March",
    meta: "Imsak 05:48 • Iftar 19:15 • Meat MINCED",
    imsak: "05:48",
    iftar: "19:15",
    meat: "MINCED",
    text: `🗓 DAY 23 — Friday 13 March
Imsak 05:48
Iftar 19:15
Meat: MINCED
No Gym
Late sleep allowed
04:55 Wake
Sahur minced version
Uni
19:15 Iftar
• 1 briouat
• 260g minced
• 80g pasta
• 150g yogurt
• creatine
19:45–21:15 Walk
21:15–21:55 Abs
22:15 Shower
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-24",
    dayNum: 24,
    title: "DAY 24 — Saturday 14 March",
    meta: "Imsak 05:47 • Iftar 19:16 • Meat FISH",
    imsak: "05:47",
    iftar: "19:16",
    meat: "FISH",
    text: `🗓 DAY 24 — Saturday 14 March
Imsak 05:47
Iftar 19:16
Meat: FISH
Gym Day
Wake Late
10:00 Wake
10:30–13:00 Study
14:30–16:30 Study
17:00–17:45 Review
19:16 Iftar
• 1 briouat
• 320g fish
• 80g rice
• 200g yogurt
• creatine
Gym 19:55–21:55
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-25",
    dayNum: 25,
    title: "DAY 25 — Sunday 15 March",
    meta: "Imsak 05:45 • Iftar 19:17 • Meat STEAK",
    imsak: "05:45",
    iftar: "19:17",
    meat: "STEAK",
    text: `🗓 DAY 25 — Sunday 15 March
Imsak 05:45
Iftar 19:17
Meat: STEAK
Gym Day
Wake Late
10:00 Wake
10:30–12:30 Study
13:30–15:30 Study
16:00–17:30 Review
19:17 Iftar
• 1 briouat
• 200g steak
• 80g rice
• 150g yogurt
• creatine
Gym
23:45 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-26",
    dayNum: 26,
    title: "DAY 26 — Monday 16 March",
    meta: "Imsak 05:43 • Iftar 19:18 • Meat CHICKEN",
    imsak: "05:43",
    iftar: "19:18",
    meat: "CHICKEN",
    text: `🗓 DAY 26 — Monday 16 March
Imsak 05:43
Iftar 19:18
Meat: CHICKEN
No Gym
04:50 Wake
04:50–05:25 Sahur
• 5 eggs
• 350g yogurt
• 40g oats
• 10g chia
Day structured like Monday 19
Iftar chicken version
Steps + Abs
23:15 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-27",
    dayNum: 27,
    title: "DAY 27 — Tuesday 17 March",
    meta: "Imsak 05:41 • Iftar 19:19 • Meat MINCED",
    imsak: "05:41",
    iftar: "19:19",
    meat: "MINCED",
    text: `🗓 DAY 27 — Tuesday 17 March
Imsak 05:41
Iftar 19:19
Meat: MINCED
Gym Day
04:50 Wake
Sahur minced
Uni
19:19 Iftar
• 1 briouat
• 260g minced
• 80g pasta
• 150g yogurt
• creatine
Gym 19:55–21:55
23:10 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  },

  {
    id: "day-28",
    dayNum: 28,
    title: "DAY 28 — Wednesday 18 March",
    meta: "Imsak 05:40 • Iftar 19:20 • Meat FISH",
    imsak: "05:40",
    iftar: "19:20",
    meat: "FISH",
    text: `🗓 DAY 28 — Wednesday 18 March
Imsak 05:40
Iftar 19:20
Meat: FISH
Gym Day
04:50 Wake
Sahur fish
Study afternoon
19:20 Iftar
• 1 briouat
• 320g fish
• 80g rice
• 200g yogurt
• creatine
Gym
23:10 Sleep`
  },

  {
    id: "day-29",
    dayNum: 29,
    title: "DAY 29 — Thursday 19 March",
    meta: "Imsak 05:38 • Iftar 19:21 • Meat STEAK",
    imsak: "05:38",
    iftar: "19:21",
    meat: "STEAK",
    text: `🗓 DAY 29 — Thursday 19 March
Imsak 05:38
Iftar 19:21
Meat: STEAK
Gym Day
04:45 Wake
04:45–05:20 Sahur
• 5 eggs
• 350g yogurt
• 40g oats
• 10g chia
Day structured similar to other Thursday
19:21 Iftar
• 1 briouat
• 200g steak
• 80g rice
• 150g yogurt
• creatine
Gym 20:00–21:55
23:10 Sleep
DAILY CHECK SECTION (Copy for Each Day)
DATE: _______
Prayer Times:
Imsak: _______
Iftar: _______
Meals:
□ Sahur completed
□ Iftar completed
□ 5g creatine
□ 150g protein
Training:
□ Gym / or □ Abs only
□ 15k steps
□ Treadmill
Study:
□ Block 1
□ Block 2
Recovery:
□ Shower
□ 3L water
□ Sleep 6h+`
  }
);

// ---------- UI helpers ----------
const $ = (sel) => document.querySelector(sel);

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) { return fallback; }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function dayIndexFromDate(d) {
  if (!(d instanceof Date)) return 0;
  if (d < PLAN_START || d > PLAN_END) return 0;
  const diffDays = Math.floor((d - PLAN_START) / (24 * 60 * 60 * 1000));
  return clamp(diffDays, 0, DAYS.length - 1);
}

function setHeader(day) {
  const titleEl = $("#dayTitle");
  const metaEl = $("#dayMeta");
  if (titleEl) titleEl.textContent = day.title;
  if (metaEl) metaEl.textContent = `Imsak ${day.imsak} • Iftar ${day.iftar} • Meat ${day.meat}`;
}

function renderPlanText(day) {
  const planEl = $("#planText");
  if (!planEl) return;
  planEl.textContent = day.text || "";
}

function renderDayList(activeId, filterText = "") {
  const listEl = $("#dayList");
  const badgeEl = $("#daysCount");
  if (!listEl) return;

  const q = (filterText || "").trim().toLowerCase();
  const filtered = DAYS.filter((d) => {
    if (!q) return true;
    const hay = `${d.dayNum} ${d.title} ${d.meta} ${d.meat}`.toLowerCase();
    return hay.includes(q);
  });

  if (badgeEl) badgeEl.textContent = `Days: ${filtered.length}`;

  listEl.innerHTML = "";
  filtered.forEach((day) => {
    const btn = document.createElement("button");
    btn.className = "dayItem" + (day.id === activeId ? " active" : "");
    btn.type = "button";
    btn.innerHTML = `
      <div class="dayItemTop">
        <div class="dayItemTitle">${day.title}</div>
        <div class="dayItemPct" id="pct-${day.id}">0%</div>
      </div>
      <div class="dayItemMeta">${day.meta}</div>
    `;
    btn.addEventListener("click", () => selectDay(day.id, true));
    listEl.appendChild(btn);

    // set % right away
    const pct = calcCompletion(day.id);
    const pctEl = document.getElementById(`pct-${day.id}`);
    if (pctEl) pctEl.textContent = `${pct}%`;
  });
}

function calcCompletion(dayId) {
  const checks = loadJSON(STORAGE.checks(dayId), {});
  const total = DAILY_TASKS.length;
  const done = DAILY_TASKS.reduce((acc, t) => acc + (checks[t.id] ? 1 : 0), 0);
  return Math.round((done / total) * 100);
}

function renderProgress(dayId) {
  const pct = calcCompletion(dayId);
  const bar = $("#progressBar");
  const pctText = $("#progressPct");
  if (bar) bar.style.width = `${pct}%`;
  if (pctText) pctText.textContent = `${pct}%`;
}

function renderChecks(dayId) {
  const wrap = $("#checkContainer");
  if (!wrap) return;

  const checks = loadJSON(STORAGE.checks(dayId), {});
  wrap.innerHTML = "";

  DAILY_TASKS.forEach((t) => {
    const row = document.createElement("label");
    row.className = "checkRow";
    row.innerHTML = `
      <input type="checkbox" data-task="${t.id}">
      <span>${t.label}</span>
    `;
    const cb = row.querySelector("input");
    cb.checked = !!checks[t.id];
    cb.addEventListener("change", () => {
      const next = loadJSON(STORAGE.checks(dayId), {});
      next[t.id] = cb.checked;
      saveJSON(STORAGE.checks(dayId), next);
      renderProgress(dayId);
      // update sidebar % for this day (if visible)
      const pctEl = document.getElementById(`pct-${dayId}`);
      if (pctEl) pctEl.textContent = `${calcCompletion(dayId)}%`;
    });
    wrap.appendChild(row);
  });

  renderProgress(dayId);
}

function renderNotes(dayId) {
  const ta = $("#notesInput");
  if (!ta) return;
  ta.value = localStorage.getItem(STORAGE.notes(dayId)) || "";
}

function saveNotes(dayId) {
  const ta = $("#notesInput");
  if (!ta) return;
  localStorage.setItem(STORAGE.notes(dayId), ta.value || "");
}

function loadConstants() {
  return { ...DEFAULT_CONSTANTS, ...loadJSON(STORAGE.constants, {}) };
}
function renderConstants() {
  const c = loadConstants();
  const map = [
    ["constCalories", "calories"],
    ["constProtein", "protein"],
    ["constCreatine", "creatine"],
    ["constWater", "water"],
    ["constSteps", "steps"],
    ["constGymClosed", "gymClosed"],
    ["constGymCloses", "gymCloses"],
  ];
  map.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.value = c[key] || "";
  });
}
function saveConstants() {
  const current = loadConstants();
  const map = [
    ["constCalories", "calories"],
    ["constProtein", "protein"],
    ["constCreatine", "creatine"],
    ["constWater", "water"],
    ["constSteps", "steps"],
    ["constGymClosed", "gymClosed"],
    ["constGymCloses", "gymCloses"],
  ];
  map.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) current[key] = el.value || "";
  });
  saveJSON(STORAGE.constants, current);
}

let ACTIVE_DAY_ID = null;

function selectDay(dayId, remember = false) {
  const day = DAYS.find((d) => d.id === dayId) || DAYS[0];
  ACTIVE_DAY_ID = day.id;

  if (remember) localStorage.setItem(STORAGE.lastDayId, day.id);

  // Header + content
  setHeader(day);
  renderPlanText(day);
  renderChecks(day.id);
  renderNotes(day.id);

  // Re-render list to update active styles
  const q = ($("#searchInput")?.value || "");
  renderDayList(day.id, q);
  renderProgress(day.id);

  // Update URL (nice)
  const url = new URL(window.location.href);
  url.searchParams.set("day", String(day.dayNum));
  history.replaceState({}, "", url.toString());
}

function bindButtons() {
  $("#btnToday")?.addEventListener("click", () => {
    const idx = dayIndexFromDate(new Date());
    selectDay(DAYS[idx].id, true);
  });

  $("#btnResetDay")?.addEventListener("click", () => {
    if (!ACTIVE_DAY_ID) return;
    saveJSON(STORAGE.checks(ACTIVE_DAY_ID), {});
    renderChecks(ACTIVE_DAY_ID);
    renderProgress(ACTIVE_DAY_ID);
    const pctEl = document.getElementById(`pct-${ACTIVE_DAY_ID}`);
    if (pctEl) pctEl.textContent = "0%";
  });

  $("#btnReload")?.addEventListener("click", () => window.location.reload());

  $("#btnSaveNotes")?.addEventListener("click", () => {
    if (!ACTIVE_DAY_ID) return;
    saveNotes(ACTIVE_DAY_ID);
  });

  $("#btnSaveConstants")?.addEventListener("click", () => {
    saveConstants();
  });

  $("#btnCheckAll")?.addEventListener("click", () => {
    if (!ACTIVE_DAY_ID) return;
    const all = {};
    DAILY_TASKS.forEach((t) => (all[t.id] = true));
    saveJSON(STORAGE.checks(ACTIVE_DAY_ID), all);
    renderChecks(ACTIVE_DAY_ID);
  });

  $("#btnUncheckAll")?.addEventListener("click", () => {
    if (!ACTIVE_DAY_ID) return;
    saveJSON(STORAGE.checks(ACTIVE_DAY_ID), {});
    renderChecks(ACTIVE_DAY_ID);
  });

  $("#searchInput")?.addEventListener("input", (e) => {
    const q = e.target.value || "";
    renderDayList(ACTIVE_DAY_ID, q);
  });
}

function init() {
  // Status pill (optional)
  $("#planStatus") && ($("#planStatus").textContent = "Loaded ✓ (29-day plan inside app.js)");

  // Load constants UI
  renderConstants();

  bindButtons();

  // pick initial day:
  // 1) URL ?day=#
  // 2) last opened day
  // 3) today if inside range
  // 4) day 1
  const url = new URL(window.location.href);
  const dayParam = parseInt(url.searchParams.get("day") || "", 10);
  if (!Number.isNaN(dayParam) && dayParam >= 1 && dayParam <= DAYS.length) {
    selectDay(`day-${dayParam}`, true);
    return;
  }

  const last = localStorage.getItem(STORAGE.lastDayId);
  if (last && DAYS.some((d) => d.id === last)) {
    selectDay(last, false);
    return;
  }

  const idx = dayIndexFromDate(new Date());
  selectDay(DAYS[idx].id, true);
}

document.addEventListener("DOMContentLoaded", init);
