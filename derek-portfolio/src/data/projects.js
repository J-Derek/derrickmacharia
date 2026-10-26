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
import logoPickd from '../assets/logos/pickd_logo_enhanced.jpg';

// Live project screenshots
import screenshotPickd from '../assets/screenshots/screenshot_pickd.png';
import screenshotCrochetHub from '../assets/screenshots/screenshot_crochethub.png';
import screenshotMinnieMiss from '../assets/screenshots/screenshot_minniemiss.png';
import screenshotExamTimetable from '../assets/screenshots/screenshot_examtimetable.png';
import screenshotRememberTodo from '../assets/screenshots/screenshot_remembertodo.png';
import screenshotStayEasy from '../assets/screenshots/screenshot_stayeasy.png';
import screenshotRideCare from '../assets/screenshots/screenshot_ridecare.png';

export const projects = [
  {
    id: "pickd",
    number: "00",
    name: "Pickd",
    logo: logoPickd,
    tagline: "A mood-driven movie and TV discovery app with Tinder-style swipe curation",
    problem: "Endless scrolling on streaming platforms causes choice paralysis. Users spend more time searching catalogs across fragmented services than actually watching films that match their current mood.",
    solution: "Built Pickd — a cinematic Flutter mobile application that turns movie discovery into a split-second gesture game. Users select their current vibe (Chill, Hyped, Spooky, etc.) and swipe through curated film decks powered by the TMDB API, with cross-device watchlist synchronization powered by Supabase and zero-latency offline caching via Hive.",
    stack: ["Flutter", "Dart", "Supabase", "Hive", "TMDB API"],
    features: [
      "Mood-based discovery engine: selects and presents curated movie decks matching instant emotional vibes",
      "Tinder-style swipe mechanics: swipe right to save to watchlist, left to pass, up to mark as watched",
      "Cross-device sync: powered by Supabase auth and real-time database across all devices",
      "Offline caching: blazing-fast local caching with Hive for instant app launch on any network"
    ],
    github: "https://github.com/J-Derek/Pickd",
    live: null,
    screenshot: screenshotPickd,
    color: "#ff3366",
    status: "Shipped · 2026"
  },
  {
    id: "crochethub",
    number: "01",
    name: "CrochetHub",
    logo: logoCrochetHub,
    tagline: "Unified social marketplace bringing Kenya's crochet community off WhatsApp",
    problem: "Kenya's crochet community — artisans, buyers, and enthusiasts — was scattered across WhatsApp groups, Instagram pages, and Facebook communities with no central home. Artisans had no professional storefront to list products, buyers had no reliable discovery channel, and conversations were buried in group chats.",
    solution: "Built CrochetHub — a dedicated web platform and marketplace combining a social feed and artisan storefronts in a single unified space. Artisans create profiles, list handmade items with pricing, and post to the community feed, while buyers browse and connect directly.",
    stack: ["React", "Firebase", "TypeScript"],
    features: [
      "Product marketplace: artisans list items with photos, descriptions, and pricing",
      "Community feed: public posts, creator updates, and community interaction in a single scrollable timeline",
      "Creator profiles: dedicated storefront profiles showcasing portfolio, listings, and follower counts",
      "Single platform: replaces scattered WhatsApp and Instagram DMs with a focused destination"
    ],
    github: null,
    live: "https://crotchethub.netlify.app/",
    screenshot: screenshotCrochetHub,
    color: "#ff84eb",
    status: "Shipped · 2024"
  },
  {
    id: "minnie-miss",
    number: "02",
    name: "Minnie Miss",
    logo: logoMinnieMiss,
    tagline: "Appointment booking platform moving salons from unpredictable walk-ins to structured scheduling",
    problem: "Most salons in Nairobi operate on a pure walk-in basis — customers arrive, join unpredictable queues, and wait with zero visibility into schedule availability. Stylists face erratic workloads with no advance notice.",
    solution: "Built Minnie Miss — a modern booking web platform that streamlines client scheduling. Customers browse services, select their preferred stylist, and reserve specific time slots, while salon managers get a centralized dashboard to track daily appointments and reduce idle chair time.",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    features: [
      "Service catalog with transparent pricing: browse treatments, durations, and rates upfront",
      "Real-time slot reservation: calendar-based appointment booking eliminating phone-tag scheduling",
      "Stylist selection: pair customers with their preferred professional",
      "Manager overview: full schedule visibility for salon operators"
    ],
    github: "https://github.com/J-Derek/thesalon",
    live: "https://minnie-miss.vercel.app/",
    screenshot: screenshotMinnieMiss,
    color: "#e88024",
    status: "Shipped · 2025"
  },
  {
    id: "examtimetable",
    number: "03",
    name: "Exam Timetable",
    logo: logoExamTimetable,
    tagline: "Searchable digital portal for university-wide exam schedules",
    problem: "University examination periods at Daystar were managed via dense campus-wide PDF spreadsheets. Students struggled to locate their specific units among thousands of rows on mobile devices, leading to venue confusion and unnecessary exam-day stress.",
    solution: "Developed a digital exam hub that ingests complex timetable data and presents it through a lightning-fast, filterable interface. Students search by course code or unit title and instantly view their personalized exam schedule, venue location, and invigilator details.",
    stack: ["TypeScript", "Node.js", "React", "Tailwind CSS"],
    features: [
      "Instant search & filtering: locate any exam by course code, unit name, or room venue in real-time",
      "Departmental views: explore schedules categorized by academic departments",
      "Mobile-first responsive design: optimized for students checking venues on the go between campuses",
      "High-availability architecture: resilient client-side caching to ensure uptime during peak exam weeks"
    ],
    github: "https://github.com/J-Derek/examtimetable",
    live: "https://examtimetable.vercel.app/",
    screenshot: screenshotExamTimetable,
    color: "#a355ff",
    status: "Shipped · 2024"
  },
  {
    id: "remember-todo",
    number: "04",
    name: "Remember To-Do",
    logo: logoRememberTodo,
    tagline: "Friction-free task capture and daily agenda builder",
    problem: "Most task managers either overwhelm users with enterprise project management complexity or lack the smart prioritization needed to focus on what actually moves the needle each day.",
    solution: "Built Remember To-Do as a focused, lightweight productivity tool. Prioritizes frictionless input, clean visual hierarchy, and local-first persistence so users spend their time executing tasks rather than managing them.",
    stack: ["Flutter", "Dart", "Hive"],
    features: [
      "Instant task capture: minimal clicks from thought to saved agenda item",
      "Local-first persistence: zero network latency with Hive offline storage",
      "Priority triage: categorizes items into immediate actions vs. backlog",
      "Distraction-free interface: designed strictly for personal focus and completion velocity"
    ],
    github: null,
    live: "https://remember-to-do.vercel.app/",
    screenshot: screenshotRememberTodo,
    color: "#2ed573",
    status: "Shipped · 2024"
  },
  {
    id: "stayeasy-daystar",
    number: "05",
    name: "StayEasy Daystar Homes",
    logo: logoStayEasy,
    tagline: "Verified accommodation marketplace for Athi River and Nairobi student housing",
    problem: "Daystar students seeking off-campus housing were forced to rely on unverified word-of-mouth or physical posters on noticeboards. This lack of a central directory led to wasted visits to unavailable properties and security concerns.",
    solution: "Engineered StayEasy as a trusted student housing directory. The platform provides a curated catalog of verified hostels and private rentals, complete with confirmed amenities, transparent pricing, distance indicators, and direct channels to property managers.",
    stack: ["TypeScript", "React", "Tailwind CSS", "Supabase"],
    features: [
      "Verified hostel listings: detailed property cards with high-fidelity imagery and confirmed amenities (Wi-Fi, Water, Security)",
      "Smart campus filtering: filter listings by campus distance, room type, and student budget",
      "Direct manager connection: seamless communication channel connecting students with property caretakers",
      "Landlord listing portal: property owners can manage room availability and vacancy status"
    ],
    github: "https://github.com/J-Derek/stayeasy-daystar-homes",
    live: "https://stayeasy-delta.vercel.app/",
    screenshot: screenshotStayEasy,
    color: "#00d2d3",
    status: "Shipped · 2025"
  },
  {
    id: "ridecare-access",
    number: "06",
    name: "RideCare Access Now",
    logo: logoRideCare,
    tagline: "Accessible ride-hailing for passengers with specialized mobility requirements",
    problem: "Mainstream ride-sharing applications rarely cater to passengers with mobility challenges. Lack of wheelchair-accessible vehicle filters and unassisted driver training leaves a vital demographic underserved.",
    solution: "Initiated RideCare to bridge the accessible transit gap. The platform focuses on accessibility-first vehicle matching, ensuring passengers requiring specialized assistance are paired with equipped fleets and certified drivers.",
    stack: ["React", "TypeScript", "Firebase", "Google Maps SDK"],
    features: [
      "Accessibility-first filtering: filter rides by ramp access, wheelchair capacity, and assisted care needs",
      "Certified driver matching: connects passengers with trained assisted transit operators",
      "Clear vehicle specs: upfront visibility into vehicle dimensions and boarding capabilities",
      "Direct dispatch: transparent booking flow built for passenger safety and reliability"
    ],
    github: null,
    live: "https://ridecare-iota.vercel.app/",
    screenshot: screenshotRideCare,
    color: "#3742fa",
    status: "Shipped · 2025"
  },
  {
    id: "autobite",
    number: "07",
    name: "AutoBite",
    logo: logoAutoBite,
    tagline: "Digital meal voucher system and cafeteria queue automation",
    problem: "University cafeteria meal voucher management was handled with paper slips and manual ledgers, resulting in long lunch queues, lost tickets, and frequent balance reconciliation disputes.",
    solution: "Designed AutoBite — a digital meal account management system with QR verification. Students and staff access digital meal balances, while cafeteria cashiers scan unique dynamic QR codes to process meals instantly without paper friction.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    features: [
      "Dynamic QR verification: fast point-of-sale scanning replacing paper tickets",
      "Real-time balance ledger: instant tracking of meal allowances with automated audit trails",
      "Double-redemption protection: backend prevents duplicate voucher redemption in single meal windows",
      "Administrative dashboard: cafeteria management reports, balance allocations, and cashier logs"
    ],
    github: null,
    live: null,
    screenshot: null,
    color: "#00FF87",
    status: "Shipped · 2025"
  },
  {
    id: "kiu-fresh",
    number: "08",
    name: "Kiu Fresh",
    logo: logoKiuFresh,
    tagline: "On-demand clean water delivery platform with M-Pesa automated dispatch",
    problem: "A local water distribution business near Daystar University handled all customer orders through phone calls and manual paper books. Delivery delays, missed addresses, and unrecorded cash payments prevented business growth.",
    solution: "Built Kiu Fresh from the ground up to automate ordering and logistics. Customers order water refills by hostel and room location, paying instantly through M-Pesa STK Push. Orders automatically dispatch to the delivery team's live queue.",
    stack: ["Flutter", "Dart", "Firebase", "M-Pesa API"],
    features: [
      "M-Pesa STK Push integration: automated mobile payments with instant transaction verification",
      "Hostel-based delivery routing: addresses categorized by campus halls for fast courier distribution",
      "Live order status: real-time updates from order confirmation through doorstep delivery",
      "Admin order manager: centralized dispatch console for business inventory and sales metrics"
    ],
    github: null,
    live: null,
    screenshot: null,
    color: "#00a2ff",
    status: "Shipped · 2025"
  },
  {
    id: "accesspro",
    number: "09",
    name: "AccessPro Daystar",
    logo: logoAccessPro,
    tagline: "Digital seat reservation for intercampus university bus transit",
    problem: "Daystar University operates commuter buses between its Athi River and Nairobi campuses, but seat allocation was purely walk-up or phone call based. Students arrived at terminals without knowing if seats were available.",
    solution: "Built AccessPro — a mobile application dedicated to intercampus transit booking. Students view departure schedules, check live seat availability, and reserve seats in advance, while transport operators manage bus capacity without paper registers.",
    stack: ["Flutter", "Dart", "Firebase"],
    features: [
      "Live departure schedules: up-to-date route schedules for Athi River and Nairobi campuses",
      "Interactive seat reservation: pick available seats with instant booking confirmation",
      "Role-based views: dedicated interface for transport operators to monitor manifest numbers",
      "Eliminates terminal queues: replaces manual sign-in sheets with digital check-in"
    ],
    github: null,
    live: null,
    screenshot: null,
    color: "#ff3e3e",
    status: "Shipped · 2024"
  },
  {
    id: "streamvault",
    number: "10",
    name: "StreamVault",
    logo: logoOnyx,
    tagline: "High-performance desktop media player engineered with Tauri and Rust",
    problem: "Modern web-based media players frequently consume excessive memory and introduce UI latency when managing large media libraries. Native desktop speed requires lightweight system-level architecture.",
    solution: "Engineered StreamVault — a native desktop media player built with Tauri and Rust. Delivers zero-bloat audio and video playback with native OS integration, combining a sleek React/TypeScript interface with a high-throughput Rust backend core.",
    stack: ["Tauri", "Rust", "TypeScript", "React"],
    features: [
      "Native desktop performance: memory-efficient Rust core running with minimal CPU overhead",
      "Unified media playback: seamless support for video and audio playback in a custom dark interface",
      "Cross-platform architecture: compiled desktop application for Windows, macOS, and Linux",
      "Custom UI: built from scratch with React and Tailwind CSS without third-party template bloat"
    ],
    github: "https://github.com/J-Derek/streamvault",
    live: null,
    screenshot: null,
    color: "#8e8e93",
    status: "Shipped · 2025"
  },
  {
    id: "itax-harmony-hub",
    number: "11",
    name: "iTax Harmony Hub",
    logo: logoItax,
    tagline: "A user-centric reimagining of Kenya Revenue Authority tax compliance",
    problem: "The official KRA tax filing portal suffers from confusing table-heavy layouts, complex navigation, and lack of visual progress feedback, making tax obligations intimidating for young professionals and freelancers.",
    solution: "Designed and prototyped Harmony Hub as a modern tax filing concept. Focuses on 'Dashboards over Databases' — converting dense tax schedules into guided, conversational step-by-step submission wizards with visual deadline trackers.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Simplified compliance dashboard: color-coded overview of filing statuses and tax deadlines",
      "Conversational return wizard: breaks complex return forms into simple, guided steps",
      "Mobile-optimized workflow: accessible filing experience designed for mobile viewports",
      "Visual revenue metrics: interactive charts for personal income tracking and deduction summaries"
    ],
    github: null,
    live: null,
    screenshot: null,
    color: "#1de9b6",
    status: "In Development"
  }
];
