export const projects = [
  {
    id: "autobite",
    number: "01",
    name: "AutoBite",
    tagline: "Digital meal card system for enterprise cafeterias",
    problem: "KPLC Training School ran its staff cafeteria on paper meal cards — cards got lost, admins had zero real-time visibility into usage.",
    solution: "Built a full QR-based digital meal card system: Flutter app for staff, Node.js backend with JWT auth, Supabase database, and a React/Vite admin dashboard.",
    stack: ["Flutter", "Node.js", "Supabase", "React", "JWT", "QR Code"],
    features: [
      "QR code generation and scanning for meal redemption",
      "Real-time meal balance tracking per staff member",
      "Admin dashboard with usage reports and account management",
      "JWT authentication with role-based access",
      "Scan log deduplication to prevent double-redemption"
    ],
    github: "https://github.com/J-Derek/autobite",
    live: null,
    color: "#00FF87",
    year: "2025"
  },
  {
    id: "kiu-fresh",
    number: "02",
    name: "Kiu Fresh",
    tagline: "Water delivery tracking and management platform",
    problem: "Local water delivery businesses struggle with tracking orders manually, leading to missed deliveries and delayed payments.",
    solution: "Developed Kiu Fresh, a mobile application that digitizes order tracking, manages delivery routes, and processes payments via M-Pesa.",
    stack: ["Flutter", "Firebase", "M-Pesa API", "Dart"],
    features: [
      "Customer ordering interface",
      "Driver route management",
      "M-Pesa API integration for seamless payments",
      "Real-time order status updates"
    ],
    github: "https://github.com/J-Derek/kiu-fresh",
    live: null,
    color: "#00a2ff",
    year: "2024"
  },
  {
    id: "accesspro",
    number: "03",
    name: "AccessPro Daystar",
    tagline: "Campus gate pass and security application",
    problem: "University security relied on paper logbooks, making it difficult to verify active students and track campus entry/exit events.",
    solution: "Built a digital gate pass system that allows students to generate temporary QR passes and security personnel to quickly scan and verify them.",
    stack: ["Flutter", "Firebase", "Dart", "QR Code"],
    features: [
      "Digital student ID integration",
      "QR code pass generation",
      "Scanner interface for security guards",
      "Entry/exit log management"
    ],
    github: "https://github.com/J-Derek/accesspro",
    live: null,
    color: "#ff3e3e",
    year: "2024"
  },
  {
    id: "crochethub",
    number: "04",
    name: "CrochetHub",
    tagline: "Marketplace for custom crochet creations",
    problem: "Independent crochet artists lacked a dedicated platform to showcase their work, manage custom commissions, and handle orders.",
    solution: "Created a mobile marketplace tailored for crochet artists to upload their catalogs and for buyers to place custom orders.",
    stack: ["Flutter", "Firebase", "Dart", "Stripe"],
    features: [
      "Artist portfolios and catalogs",
      "Custom commission request forms",
      "In-app messaging between buyers and artists",
      "Order status tracking"
    ],
    github: "https://github.com/J-Derek/crochethub",
    live: null,
    color: "#ff84eb",
    year: "2024"
  },
  {
    id: "thesalon",
    number: "05",
    name: "TheSalon",
    tagline: "Booking and management system for salons",
    problem: "A local salon faced double-bookings and lost revenue due to manual appointment tracking via phone calls and notebooks.",
    solution: "Delivered a booking application that allows clients to schedule appointments, view services, and gives the owner a management dashboard.",
    stack: ["Flutter", "Firebase", "Dart"],
    features: [
      "Client appointment booking",
      "Service and pricing catalog",
      "Staff schedule management",
      "Automated booking reminders"
    ],
    github: "https://github.com/J-Derek/thesalon",
    live: null,
    color: "#ffb43e",
    year: "2024"
  }
];
