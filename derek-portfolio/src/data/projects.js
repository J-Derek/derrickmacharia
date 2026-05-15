import logoAutoBite from '../assets/logos/logo_autobite.png';
import logoKiuFresh from '../assets/logos/logo_kiu_fresh.png';
import logoAccessPro from '../assets/logos/logo_accesspro.png';
import logoCrochetHub from '../assets/logos/logo_crochethub.png';
import logoMinnieMiss from '../assets/logos/logo_minnie_miss.png';
import logoOnyx from '../assets/logos/logo_onyx.png';
import logoExamTimetable from '../assets/logos/logo_exam_timetable.png';
import logoRememberTodo from '../assets/logos/logo_remember_todo.png';
import logoStayEasy from '../assets/logos/logo_stayeasy.png';
import logoRideCare from '../assets/logos/logo_ridecare.png';
import logoItax from '../assets/logos/logo_itax.png';

export const projects = [
  {
    id: "autobite",
    number: "01",
    name: "AutoBite",
    logo: logoAutoBite,
    tagline: "Replacing paper meal cards with a live QR system across an enterprise cafeteria",
    problem: "Kenya Power's Training School in Nairobi was running its entire staff cafeteria on a manual paper-based meal card system. Cards were lost regularly, duplicate redemptions went undetected, and management had no visibility into daily usage or remaining balances. There was no audit trail, no real-time data, and no way to scale the system as the facility grew.",
    solution: "Designed and shipped a full-stack digital meal card platform during my industrial attachment at KPLC. The system replaced every physical card with a QR code, giving each staff member a scannable digital identity tied to their meal balance. Built the Flutter client for staff, a Node.js backend handling authentication and transaction logic, a Supabase database tracking every scan in real time, and a React/Vite dashboard giving administrators complete visibility into usage, balances, and reports.",
    stack: ["Flutter", "Node.js", "Supabase", "React", "JWT", "QR Code"],
    features: [
      "QR generation and scanning: every staff member gets a unique QR, scanned at point of service — eliminates lost cards entirely",
      "Real-time balance tracking: admins see live meal usage across all accounts with zero manual reconciliation",
      "Deduplication logic: backend prevents the same QR from being scanned twice in a single meal window — closes the double-redemption loophole",
      "JWT role-based auth: staff, cashier, and admin roles with separate access levels",
      "Admin dashboard: full account management, balance top-up, usage exports, and daily reports in one React interface"
    ],
    github: "https://github.com/J-Derek/autobite",
    live: null,
    color: "#00FF87",
    status: "Shipped · 2025"
  },
  {
    id: "kiu-fresh",
    number: "02",
    name: "Kiu Fresh",
    logo: logoKiuFresh,
    tagline: "End-to-end water delivery platform with M-Pesa payment and live order tracking",
    problem: "A water delivery business operating near Daystar University was managing every order by phone — customers called in, staff wrote orders on paper, payments were collected on delivery, and there was no way to track what was where at any point. Missed deliveries, delayed payments, and zero operational visibility were routine. The business was growing but the system couldn't scale with it.",
    solution: "Identified the gap, pitched the solution to the business owner, and built Kiu Fresh from the ground up. The app gives customers a clean mobile interface to register, place orders by hostel or location, select quantity, and pay via M-Pesa — all without a phone call. On the backend, M-Pesa STK Push handles automated payment confirmation and triggers order status updates in real time. The business owner gets a full admin dashboard to manage incoming orders and track deliveries live.",
    stack: ["Flutter", "Firebase", "M-Pesa API", "Dart"],
    features: [
      "M-Pesa STK Push integration: payment prompt goes directly to the customer's phone — no manual collection, no payment delays",
      "Location-based ordering: customers register by hostel or location, reducing delivery routing errors",
      "Real-time order tracking: both customer and admin see live order status from placement through delivery",
      "Admin dashboard: full order management, delivery assignment, and status control for the business owner",
      "Replaces phone-based ordering entirely: zero calls needed from placement to delivery"
    ],
    github: "https://github.com/J-Derek/kiu-fresh",
    live: null,
    color: "#00a2ff",
    status: "Shipped · 2025"
  },
  {
    id: "accesspro",
    number: "03",
    name: "AccessPro Daystar",
    logo: logoAccessPro,
    tagline: "Digital seat booking for university intercampus buses — from walk-up to tap-to-book",
    problem: "Daystar University runs official bus services between its Athi River and Nairobi campuses — but seat booking was entirely manual. Students either called the transport office or showed up and hoped for a seat. There was no schedule visibility, no way to confirm availability, and no system for transport administrators to manage bookings without a spreadsheet or paper register.",
    solution: "Built AccessPro — a Flutter mobile application purpose-built for Daystar's two-campus transport context. Students open the app, see the live schedule for both campuses, select a departure, choose a seat, and receive booking confirmation — entirely replacing the call-in process. Transport administrators get a separate role-based view to manage daily bookings, monitor seat availability, and handle scheduling without manual registers.",
    stack: ["Flutter", "Firebase", "Dart"],
    features: [
      "Live schedule display: both campus routes and departure times visible in-app, updated by administrators",
      "Seat selection and confirmation: students pick their seat and receive instant booking confirmation",
      "Role-based access: student and transport admin interfaces are separate — each sees only what's relevant to their role",
      "Eliminates call-in dependency: the entire booking process moves from phone to app with no manual intervention"
    ],
    github: "https://github.com/J-Derek/accesspro",
    live: null,
    color: "#ff3e3e",
    status: "Shipped · 2024"
  },
  {
    id: "crochethub",
    number: "04",
    name: "CrochetHub",
    logo: logoCrochetHub,
    tagline: "Unified social marketplace bringing Kenya's crochet community off WhatsApp",
    problem: "Kenya's crochet community — artisans, buyers, and enthusiasts — was scattered across WhatsApp groups, Instagram pages, and Facebook communities with no central home. Artisans had no professional way to list products, buyers had no reliable discovery channel, and community conversation was buried in group chats that new members couldn't access. The niche was underserved and fragmented with no platform designed specifically for it.",
    solution: "Built CrochetHub — a Flutter application that combines a social feed and a marketplace in a single platform, designed specifically for the crochet community. Artisans create profiles, list products with photos and pricing, and post to the community feed. Buyers browse listings, follow creators, and connect directly. The platform brings together functions that previously required three or four different apps into one focused, purpose-built space.",
    stack: ["Flutter", "Firebase", "Dart"],
    features: [
      "Product marketplace: artisans list items with photos, descriptions, and pricing — a professional storefront that WhatsApp cannot offer",
      "Community feed: public posts, creator updates, and community interaction in a single scrollable timeline",
      "Creator profiles: each artisan gets a dedicated profile showcasing their work, listings, and follower count — builds credibility and repeat buyers",
      "Single platform: replaces WhatsApp groups, Instagram pages, and scattered DMs with one focused community destination"
    ],
    github: "https://github.com/J-Derek/crochethub",
    live: null,
    color: "#ff84eb",
    status: "Shipped · 2024"
  },
  {
    id: "minnie-miss",
    number: "05",
    name: "Minnie Miss",
    logo: logoMinnieMiss,
    tagline: "Appointment booking platform that moves salons from walk-ins to structured scheduling",
    problem: "Most salons in Nairobi operate on a pure walk-in basis — customers arrive, join an unpredictable queue, and wait with no visibility into how long it will take. Staff have no way to forecast their day, allocate time per stylist, or reduce the idle-or-overwhelmed cycle that walk-in-only businesses face. There was no affordable, mobile-first booking tool built for local salon operations.",
    solution: "Built Minnie Miss (formerly TheSalon) — a Flutter booking application that brings structured scheduling to salons without requiring expensive point-of-sale systems or enterprise software. Customers browse available services, select a stylist, and book a specific time slot from their phone. Staff get a clean management view showing the day's confirmed appointments, assigned stylists, and time allocations — replacing guesswork with a structured daily schedule.",
    stack: ["Flutter", "Firebase", "Dart"],
    features: [
      "Service browsing: customers see all available services with descriptions before booking — sets expectations and reduces chair-time disputes",
      "Stylist selection and time slot booking: customers pick who they want and when, giving them control while giving the salon predictability",
      "Staff schedule view: stylists and managers see the full day's appointments at a glance — no paper registers, no verbal handoffs",
      "Reduces no-shows and idle time: confirmed digital bookings create accountability on both sides of the appointment"
    ],
    github: "https://github.com/J-Derek/thesalon",
    live: null,
    color: "#ffb43e",
    status: "Shipped · 2024"
  },
  {
    id: "onyx",
    number: "06",
    name: "Onyx",
    logo: logoOnyx,
    tagline: "A personal multimedia player built from scratch because nothing else felt right",
    problem: "Most media player apps are either cluttered with features built for the masses or stripped down to the point of being unusable for someone with a specific vision of how their media experience should feel. This project wasn't commissioned by a client — it was built out of personal dissatisfaction with the available options and a desire to ship a complete, polished application entirely on personal initiative.",
    solution: "Designed and built Onyx — a personal Flutter multimedia player for music, movies, and media content from a unified interface. The entire scope was self-defined: no client brief, no external requirements, no deadline other than a personal one. The project demonstrates the ability to identify a personal problem, make every product decision independently, and ship a finished application without external accountability or direction.",
    stack: ["Flutter", "Dart"],
    features: [
      "Unified playback: music and video from a single interface — no switching between apps",
      "Clean, intentional UI: designed from scratch to feel exactly right, not adapted from a template",
      "Fully self-directed: every decision — scope, design, architecture, features — was made and executed independently",
      "Demonstrates initiative: most portfolio projects have a client or a course requirement behind them. This one has neither."
    ],
    github: "https://github.com/J-Derek/onyx",
    live: null,
    color: "#8e8e93",
    status: "Shipped · 2025"
  },
  {
    id: "exam-timetable",
    number: "07",
    name: "Exam Timetable",
    logo: logoExamTimetable,
    tagline: "Searchable digital portal for university-wide exam schedules",
    problem: "University examination periods at Daystar were managed via dense campus-wide PDF spreadsheets. Students struggled to find their specific units among thousands of entries on mobile devices, leading to venue confusion and unnecessary stress during the most critical weeks of the semester.",
    solution: "Developed a digital exam hub that ingests complex timetable data and presents it through a searchable, filterable interface. Students enter their course codes and instantly get their personalized schedule, venue details, and invigilator info — transforming a 20-page document into a 2-second search experience.",
    stack: ["TypeScript", "Node.js", "React", "Vercel", "Tailwind CSS"],
    features: [
      "Instant search & filtering: find any exam by course code, unit name, or venue in real-time",
      "Department-wise views: explore schedules by academic department to see broader venue allocations",
      "Mobile-optimized: designed specifically for students checking their next venue while on the move between campuses",
      "Vercel deployment: high-availability hosting ensuring the portal stays up during peak traffic periods"
    ],
    github: "https://github.com/J-Derek/examtimetable",
    live: "https://examtimetable.vercel.app",
    color: "#a355ff",
    status: "In Development"
  },
  {
    id: "remember-todo",
    number: "08",
    name: "Remember To-Do",
    logo: logoRememberTodo,
    tagline: "Minimalist, high-performance task management application",
    problem: "Most task managers are weighed down by enterprise features that create friction for simple daily organization. Users need a way to capture thoughts at the speed of thought, without navigating complex hierarchies or slow cloud synchronization lag.",
    solution: "Built Remember To-Do as a 'velocity-first' productivity tool. By prioritizing a clean, distraction-free UI and local-first persistence, the app ensures that managing a day's priorities feels like a natural extension of the user's workflow rather than a chore.",
    stack: ["Flutter", "Dart", "Hive", "Provider"],
    features: [
      "Zero-friction entry: optimized for one-tap task creation and quick-swipe completion",
      "Local-first architecture: uses Hive for ultra-fast data persistence with near-zero latency",
      "Contextual themes: dynamic UI that adapts to the user's focus and priority levels",
      "Minimalist design language: removes every non-essential element to focus entirely on the tasks at hand"
    ],
    github: "https://github.com/J-Derek/remembertodo",
    live: null,
    color: "#ffc83e",
    status: "In Development"
  },
  {
    id: "stayeasy-daystar",
    number: "09",
    name: "StayEasy Daystar Homes",
    logo: logoStayEasy,
    tagline: "Verified accommodation marketplace for Athi River and Nairobi campuses",
    problem: "Daystar students seeking off-campus housing are often forced to rely on unverified word-of-mouth or physical posters. This lack of a central directory leads to wasted time visiting unavailable properties and potential security risks in unverified hostel environments.",
    solution: "Designed StayEasy as a trusted housing bridge. Built with a modern tech stack via Lovable, the platform provides a curated directory of hostels and private rentals, complete with verified amenities, pricing transparency, and direct routes to property managers.",
    stack: ["TypeScript", "React", "Vite", "Tailwind CSS", "shadcn-ui", "Supabase"],
    features: [
      "Verified listings: every property includes high-quality imagery and confirmed amenity lists (Wi-Fi, Security, Water)",
      "Smart filtering: search by distance from campus, budget, or specific student-centric needs",
      "Direct inquiry routing: connects students to property managers instantly through integrated contact hooks",
      "Property management dashboard: landlords can update vacancies and manage listings in real-time"
    ],
    github: "https://github.com/J-Derek/stayeasy-daystar-homes",
    live: "https://stayeasy-daystar.lovable.app",
    color: "#00d2d3",
    status: "In Development"
  },
  {
    id: "ridecare-access",
    number: "10",
    name: "RideCare Access Now",
    logo: logoRideCare,
    tagline: "Accessible ride-hailing for users with specialized mobility needs",
    problem: "Mainstream ride-sharing apps rarely account for the specific needs of passengers with mobility challenges. Whether it's a lack of wheelchair-accessible vehicles or drivers who aren't trained for assisted transit, a significant demographic is left behind by current urban mobility solutions.",
    solution: "Conceptualized and initiated RideCare to fill the accessibility gap. The platform focuses on 'Specialized Matching' — ensuring that users who need specific vehicle types or assisted care are paired only with drivers and fleets equipped to provide them.",
    stack: ["Flutter", "Dart", "Firebase", "Google Maps SDK"],
    features: [
      "Accessibility-first matching: users specify their exact needs (ramp, lift, extra legroom) as a primary booking filter",
      "Trained driver network: platform prioritizes drivers with certifications in assisted passenger transit",
      "Real-time safety telemetry: enhanced live tracking with automated emergency check-ins for vulnerable passengers",
      "Inclusive UI: designed with high-contrast modes and screen-reader optimizations from the ground up"
    ],
    github: "https://github.com/J-Derek/ridecare-access-now",
    live: null,
    color: "#00e676",
    status: "In Development"
  },
  {
    id: "itax-harmony-hub",
    number: "11",
    name: "iTax Harmony Hub",
    logo: logoItax,
    tagline: "A user-centric reimagining of the Kenya Revenue Authority portal",
    problem: "The official KRA iTax portal is a case study in UI friction — dated tables, confusing navigation, and a lack of visual feedback make tax compliance an intimidating and error-prone process for the average citizen.",
    solution: "Took on the personal challenge of redesigning the iTax experience for the modern web. Harmony Hub focuses on 'Dashboards over Databases,' translating complex tax obligations into a clean, guided journey that prioritizes user comprehension and ease of use.",
    stack: ["Flutter", "Dart", "Framer Motion", "Material 3"],
    features: [
      "Simplified compliance tracking: a clear, color-coded dashboard showing filing status and upcoming deadlines",
      "Guided filing wizards: breaks down complex returns into simple, step-by-step conversational forms",
      "Mobile-first architecture: brings the entire tax portal experience to a high-fidelity mobile application",
      "Visual reform: replaces legacy tables with modern data visualizations for personal revenue tracking"
    ],
    github: "https://github.com/J-Derek/itax-harmony-hub",
    live: null,
    color: "#1de9b6",
    status: "In Development"
  }
];
