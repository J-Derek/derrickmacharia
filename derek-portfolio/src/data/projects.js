import logoKiuFresh from '../assets/logos/logo_kiu_fresh.webp';
import logoStudyFlow from '../assets/logos/logo_studyflow.webp';
import logoExamTimetable from '../assets/logos/logo_exam_timetable.webp';
import logoPickd from '../assets/logos/pickd_logo_enhanced.webp';
import logoMinnieMiss from '../assets/logos/logo_minnie_miss.webp';
import logoAutoBite from '../assets/logos/logo_autobite.webp';

import screenshotStudyFlow from '../assets/screenshots/screenshot_studyflow.webp';
import screenshotExamTimetable from '../assets/screenshots/screenshot_examtimetable.webp';
import screenshotPickd from '../assets/screenshots/screenshot_pickd.webp';
import screenshotMinnieMiss from '../assets/screenshots/screenshot_minniemiss.webp';

// Every stack item and feature listed here exists in the project's code.
// Status words: Live (public URL), Shipped (released build), Pilot, Prototype.
export const projects = [
  {
    id: "kiu-fresh",
    number: "01",
    name: "Kiu Fresh",
    logo: logoKiuFresh,
    tagline: "Campus water-delivery platform for Daystar University hostels",
    problem: "A local water distribution business near Daystar University handled customer orders through phone calls and paper books. Delivery delays, missed addresses and unrecorded payments held the business back.",
    solution: "Built Kiu Fresh as four connected apps: a customer app for ordering refills by hostel and room, a rider app for deliveries, an admin console for dispatch, and a Next.js API on PostgreSQL. Customers sign in with a phone OTP, and M-Pesa payments are recorded and reconciled by an admin. Currently in pilot.",
    stack: ["Flutter", "Dart", "Next.js", "Prisma", "PostgreSQL", "React"],
    features: [
      "Customer and rider apps built in Flutter, with phone-OTP sign-in",
      "Hostel and room based ordering, rider assignment and order tracking",
      "Admin console for dispatch, catalogue pricing and M-Pesa payment reconciliation",
      "Automated test suites across the customer, rider and admin apps"
    ],
    github: null,
    live: null,
    screenshot: null,
    status: "Pilot · 2026"
  },
  {
    id: "studyflow",
    number: "02",
    name: "StudyFlow",
    logo: logoStudyFlow,
    tagline: "Study planner for university students",
    problem: "Coursework deadlines, class timetables, focus time and grade targets usually live in separate apps and notebooks, so students lose track of what is due and where they stand.",
    solution: "Built StudyFlow as one workspace: assignments with subtasks, a weekly timetable that exports to calendar apps, a Pomodoro focus timer and a GPA what-if calculator. It works offline as an installable app and syncs through Firebase, with per-user security rules.",
    stack: ["React", "TypeScript", "Firebase Auth", "Firestore", "Zustand", "Vitest", "Playwright"],
    features: [
      "Assignments with subtasks and deadlines",
      "Weekly timetable with .ics calendar export",
      "Pomodoro focus timer and a GPA what-if calculator",
      "Offline-capable PWA with per-user Firestore security rules",
      "Automated unit, security-rule and end-to-end accessibility tests"
    ],
    github: "https://github.com/J-Derek/studyflow",
    live: "https://app-beta-lilac-23.vercel.app",
    screenshot: screenshotStudyFlow,
    status: "Live · 2026"
  },
  {
    id: "examtimetable",
    number: "03",
    name: "Exam Timetable",
    logo: logoExamTimetable,
    tagline: "Searchable exam timetable for Daystar University students",
    problem: "Daystar exam schedules were published as dense campus-wide spreadsheets. Students struggled to find their own units among thousands of rows on a phone, which led to venue confusion and exam-day stress.",
    solution: "Built a searchable exam hub from the parsed university timetable (2,500+ sessions). Students search by course code or venue, pin their units, and see dates, venues and clashes at a glance.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    features: [
      "Search by course code or venue across 2,500+ exam sessions",
      "Pinned units, saved on the device",
      "Clash detection between pinned exams",
      "Installable, offline-capable PWA"
    ],
    github: "https://github.com/J-Derek/examtimetable",
    live: "https://examtimetable.vercel.app/",
    screenshot: screenshotExamTimetable,
    status: "Live · 2026"
  },
  {
    id: "pickd",
    number: "04",
    name: "Pickd",
    logo: logoPickd,
    tagline: "A mood-driven movie and TV discovery app with swipe curation",
    problem: "Endless scrolling on streaming platforms causes choice paralysis. People spend more time searching catalogues than watching something that fits their mood.",
    solution: "Built Pickd, a Flutter mobile app that turns discovery into a quick gesture game. Users pick a mood and swipe through curated decks powered by the TMDB API. Version 1 keeps the profile and swipe history on the device with Hive; Supabase sign-in and cross-device sync are built into the current source and planned for v1.2.",
    stack: ["Flutter", "Dart", "Supabase", "Hive", "TMDB API"],
    features: [
      "Mood-based discovery: curated movie and TV decks for the selected mood",
      "Swipe mechanics: right to save to the watchlist, left to pass, up to mark as watched",
      "Cross-device sync with Supabase (in the current source, planned for v1.2)",
      "Local persistence: Hive stores the profile and swipe history on the device"
    ],
    github: "https://github.com/J-Derek/Pickd",
    live: null,
    screenshot: screenshotPickd,
    screenshotPortrait: true,
    status: "Shipped · 2026"
  },
  {
    id: "minnie-miss",
    number: "05",
    name: "Minnie Miss",
    logo: logoMinnieMiss,
    tagline: "Marketing and appointment-request site for a child-friendly salon in Nairobi",
    problem: "Parents had no place online to see the salon's services or ask for an appointment.",
    solution: "Built a responsive React site where parents browse services with durations and age guidance, then send an appointment request or reach the salon on WhatsApp.",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    features: [
      "Service catalogue with durations and age guidance",
      "Appointment request form with service, date and time",
      "WhatsApp contact for confirmation",
      "Responsive, animated interface"
    ],
    github: "https://github.com/J-Derek/thesalon",
    live: "https://minnie-miss.vercel.app/",
    screenshot: screenshotMinnieMiss,
    status: "Live · 2026"
  },
  {
    id: "autobite",
    number: "06",
    name: "AutoBite",
    logo: logoAutoBite,
    tagline: "Cafeteria meal-verification system with QR passes",
    problem: "Cafeteria meal entitlements were handled with paper slips and manual ledgers, which meant long queues, lost tickets and no reliable record of who had been served.",
    solution: "Built AutoBite as a Flutter app for diners and kitchen staff, a React admin console and a Node.js API on Supabase. Each diner gets a signed QR pass for the day, and the kitchen scanner accepts it once.",
    stack: ["Flutter", "React", "Node.js", "Express", "Supabase"],
    features: [
      "Daily signed QR meal passes that expire",
      "Kitchen scanner app for verifying passes",
      "Double-redemption protection: a pass cannot be scanned twice",
      "Admin console for menus, users and reports"
    ],
    github: null,
    live: null,
    screenshot: null,
    status: "Prototype · 2025"
  }
];

/** Display metadata derived from a project: status word, year and primary category. */
export function getMeta(project) {
  const [state, year = ''] = project.status.split('·').map((part) => part.trim());
  const category = project.stack?.[0] ?? 'Project';
  return { state, year, category };
}
