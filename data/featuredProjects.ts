export interface FeaturedProjectMetric {
  value: string;
  label: string;
  change?: string;
}

export interface FeaturedProject {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  client: string;
  clientLocation: string;
  year: string;
  role: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  accentColor: string;
  image: string;
  techStack: string[];
  tags: string[];
  metrics: FeaturedProjectMetric[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  architectureHighlights: {
    layer: string;
    tech: string;
    purpose: string;
  }[];
  liveUrl?: string;
  demoAvailable?: boolean;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "endow-connect",
    number: "01",
    title: "Endow Connect",
    shortTitle: "Endow Connect – CRM & Management Platform",
    category: "CRM & Education Management Platform",
    client: "Endow Global Education",
    clientLocation: "Seoul · Dhaka",
    year: "2025",
    role: "Full-Stack Enterprise CRM & Operations Engineering",
    tagline:
      "From first inquiry to enrollment: one connected workflow for students and counselors.",
    description:
      "Endow Connect is a purpose-built CRM designed to bridge the gap between students and counselors within large-scale education operations. Developed for Endow Global Education, it centralizes the entire student journey from first inquiry to enrollment and beyond giving counselors a single dashboard to track leads, manage communications, and follow up without anything slipping through the cracks.",
    challenge:
      "Student-counselor coordination, team responsibilities, and recruitment pipelines can become fragmented across spreadsheets and disconnected tools. Education teams need one shared view of the journey and the work around it.",
    solution:
      "Beyond student-counselor coordination, Endow Connect functions as a full education team management system: assigning tasks, monitoring team performance, managing pipelines across multiple programs or campuses, and generating reports that give leadership real visibility into recruitment and enrollment funnels.",
    accentColor: "#DC2626",
    image: "/images/projects/Endow Connect.jpg",
    techStack: [
      "Laravel",
      "Vue.js",
      "Blade",
      "MySQL",
      "Livewire",
      "Redis",
      "Docker",
      "RBAC",
      "Sanctum",
    ],
    tags: ["CRM", "EdTech", "Laravel", "Vue.js", "MySQL", "Livewire"],
    metrics: [
      {
        value: "100%",
        label: "Unified Student Journey",
        change: "From inquiry to enrollment",
      },
      {
        value: "3x",
        label: "Team Coordination Velocity",
        change: "Zero inquiry slippage",
      },
      {
        value: "0",
        label: "Scattered Spreadsheets",
        change: "Replaced by one system",
      },
      {
        value: "99.9%",
        label: "Platform Uptime SLA",
        change: "Enterprise reliability",
      },
    ],
    keyFeatures: [
      {
        title: "Lead & Inquiry Tracking",
        description:
          "Keep student leads and essential candidate details in one place with organized intake channels and qualification history.",
      },
      {
        title: "Counselor-Student Bridging",
        description:
          "Connect the right counseling team to each student, giving each lead a clear owner and actionable next step.",
      },
      {
        title: "Team & Task Management",
        description:
          "Assign tasks, follow counselor updates, monitor operational output, and track enrollment milestones with accountability.",
      },
      {
        title: "Enrollment Pipeline Visibility",
        description:
          "End-to-end recruitment funnel tracking across multiple university programs, degree cycles, and regional branch campuses.",
      },
      {
        title: "Reporting Dashboards",
        description:
          "Shared analytical dashboards giving leadership real-time visibility into conversion funnels and recruitment yields.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Backend Framework",
        tech: "Laravel 11, Livewire & Blade",
        purpose:
          "Robust MVC core managing application state, enrollment pipelines, and business logic",
      },
      {
        layer: "Database & Security",
        tech: "MySQL, Docker, RBAC & Laravel Sanctum",
        purpose:
          "Strict role isolation between counselors and leadership with tokenized authentication",
      },
      {
        layer: "Client & Caching",
        tech: "Vue.js, Tailwind CSS & Redis",
        purpose:
          "Sub-second dashboard loading, real-time activity feeds, and smooth lead management",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
  {
    id: "endow-cuisine",
    number: "02",
    title: "Endow Cuisine",
    shortTitle: "Endow Cuisine – Restaurant Accounting System",
    category: "Restaurant Accounting System",
    client: "Endow Corporation",
    clientLocation: "Seoul · Dhaka",
    year: "2025",
    role: "Restaurant Financial Engineering & Shift-Based Accounting",
    tagline:
      "Structured around how food-service businesses actually earn and spend: daily sales, inventory-linked costs, vendor payments, and shift-based operations.",
    description:
      "Endow Cuisine is a dedicated accounting and financial management system built for the unique operational rhythm of restaurants. Rather than forcing restaurant owners to adapt generic accounting software to their business, Endow Cuisine is structured around how food-service businesses actually earn and spend daily sales, inventory-linked costs, vendor payments, and shift-based operations.",
    challenge:
      "Restaurant owners and managers need financial tools that reflect daily sales, inventory-linked costs, vendor payments, and shift-based operations instead of a generic accounting model.",
    solution:
      "It gives owners and managers a clear, real-time picture of financial health: revenue tracking, expense management, profit/loss visibility, and simplified bookkeeping that reduces the manual reconciliation typically required in restaurant finance.",
    accentColor: "#EA580C",
    image: "/images/projects/EndowCousine.jpg",
    techStack: ["Laravel", "PgSQL", "Alpine.js", "Livewire", "Redis"],
    tags: [
      "Restaurant Tech",
      "Accounting",
      "Laravel",
      "PostgreSQL",
      "Alpine.js",
      "Livewire",
    ],
    metrics: [
      {
        value: "Real-Time",
        label: "Financial Health Picture",
        change: "Instant operational visibility",
      },
      {
        value: "85%",
        label: "Manual Reconciliation Saved",
        change: "Shift automated balancing",
      },
      {
        value: "100%",
        label: "Shift-Based Audit Match",
        change: "Zero cash discrepancy",
      },
      {
        value: "0",
        label: "Generic Software Friction",
        change: "Tailored food-service flow",
      },
    ],
    keyFeatures: [
      {
        title: "Daily Sales & Revenue Tracking",
        description:
          "Real-time recording of daily cash drawers, card terminals, split payments, and shift revenue reconciliations.",
      },
      {
        title: "Expense & Vendor Management",
        description:
          "Direct invoice logging for raw materials, supplier payments, food-cost ratios, and recurring vendor balances.",
      },
      {
        title: "Profit/Loss Reporting",
        description:
          "On-demand P&L reporting highlighting operational margins, food costs, and shift-level profitability metrics.",
      },
      {
        title: "Simplified Restaurant-Specific Bookkeeping",
        description:
          "Streamlined accounting entries tailored for floor managers, drastically reducing end-of-day manual reconciliation.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Financial Engine",
        tech: "Laravel & Livewire",
        purpose:
          "Double-entry bookkeeping logic, shift closing workflows, and automated ledger balancing",
      },
      {
        layer: "Data Store",
        tech: "PostgreSQL (PgSQL)",
        purpose:
          "ACID-guaranteed financial transaction ledger with audit trails and zero record overwriting",
      },
      {
        layer: "Client & Cache",
        tech: "Alpine.js, Tailwind CSS & Redis",
        purpose:
          "Ultra-lightweight POS terminal reactivity and fast in-memory shift state lookups",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
  {
    id: "endow-cloud",
    number: "03",
    title: "Endow Cloud",
    shortTitle: "Endow Cloud – Local Infrastructure File Storage",
    category: "Local Infrastructure File Storage & Sharing",
    client: "Endow Tech",
    clientLocation: "Enterprise On-Premises",
    year: "2025",
    role: "Local Infrastructure File Storage & Systems Engineering",
    tagline:
      "Google Drive-style file organization, sharing, and access running on a business's own local PC and server environment.",
    description:
      "Endow Cloud brings the convenience of cloud storage think Google Drive-style file organization, sharing, and access to a business's own local PC environment. It's built for organizations that want the collaborative, always-accessible experience of cloud storage without relying on third-party cloud servers to host sensitive files.",
    challenge:
      "Organizations may want collaborative cloud-style access while keeping sensitive files on infrastructure they own and control, especially when internet reliability is a concern.",
    solution:
      "Teams get familiar drive-style navigation, file sharing, and organized storage, all running on infrastructure the business fully owns and controls.",
    accentColor: "#2563EB",
    image: "/images/projects/Endow cloud.jpg",
    techStack: ["Rust", "SQLite", "inotify", "FUSE", "Nginx"],
    tags: [
      "Local Storage",
      "Data Sovereignty",
      "Rust",
      "SQLite",
      "FUSE",
      "On-Premises",
    ],
    metrics: [
      {
        value: "100%",
        label: "Data Sovereignty",
        change: "Zero 3rd-party cloud reliance",
      },
      {
        value: "10x",
        label: "Transfer Speed Boost",
        change: "Full LAN gigabit bandwidth",
      },
      {
        value: "100%",
        label: "Offline Operational Readiness",
        change: "Immune to ISP disruptions",
      },
      {
        value: "$0",
        label: "Recurring Storage Bill",
        change: "Runs on owned hardware",
      },
    ],
    keyFeatures: [
      {
        title: "Local-Server-Based Storage",
        description:
          "Hosted directly on internal business hardware and local servers, keeping confidential company assets on-premise.",
      },
      {
        title: "Familiar Drive-Style Interface",
        description:
          "Intuitive desktop-grade file browser with search, drag-and-drop hierarchy, tag management, and file previews.",
      },
      {
        title: "Internal File Sharing & Organization",
        description:
          "Secure internal departmental folders, permission-based sharing links, and multi-user team workspaces.",
      },
      {
        title: "Full Data Control & Zero Cloud Risk",
        description:
          "Total administrative control over file retention, local backup mirrors, and sensitive intellectual property.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Systems Kernel Core",
        tech: "Rust & FUSE (Filesystem in Userspace)",
        purpose:
          "Memory-safe, high-concurrency virtual filesystem bridge for local enterprise file access",
      },
      {
        layer: "Indexing & Watcher",
        tech: "Linux inotify & SQLite",
        purpose:
          "Kernel-level event monitoring for instant file sync and low-overhead metadata indexing",
      },
      {
        layer: "Web & Gateway",
        tech: "Nginx Reverse Proxy & HTTP Streaming",
        purpose:
          "High-throughput LAN file chunks, TLS security, and seamless browser-based file management",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
  {
    id: "endow-desk",
    number: "04",
    title: "Endow Desk",
    shortTitle: "Endow Desk – AI-Powered Support Ticket System",
    category: "AI-Powered Support Ticket System",
    client: "Endow Tech",
    clientLocation: "Seoul · Dhaka",
    year: "2025",
    role: "AI Customer Support Platform & Helpdesk Architecture",
    tagline:
      "Ticket management, live chat, and a self-service knowledge base into one system — enhanced with AI to speed up resolution times.",
    description:
      "Endow Desk is a modern customer support platform that combines ticket management, live chat, and a self-service knowledge base into one system — enhanced with AI to speed up resolution times.",
    challenge:
      "Support teams need requests to be organized, routed, and visible from first contact to resolution while customers need timely answers and useful self-service resources.",
    solution:
      "Support requests are automatically organized into tickets, routed to the right team members, and tracked from first contact to resolution. The AI layer assists by suggesting responses, surfacing relevant knowledge base articles, and helping reduce repetitive manual work for support agents.",
    accentColor: "#059669",
    image: "/images/projects/EndowDesk.jpg",
    techStack: [
      "Laravel",
      "Vue.js",
      "Vite",
      "Svelte",
      "Tailwind",
      "Prisma",
    ],
    tags: [
      "Customer Support",
      "AI Automation",
      "Live Chat",
      "Laravel",
      "Vue.js",
      "Svelte",
    ],
    metrics: [
      {
        value: "< 2 min",
        label: "First Response Time",
        change: "AI-assisted drafting",
      },
      {
        value: "70%",
        label: "Manual Work Reduction",
        change: "Automated routing & FAQs",
      },
      {
        value: "100%",
        label: "Lifecycle Request Visibility",
        change: "Contact to resolution",
      },
      {
        value: "24/7",
        label: "Knowledge Base Availability",
        change: "Self-service client answers",
      },
    ],
    keyFeatures: [
      {
        title: "End-to-End Ticket Management",
        description:
          "Inquiries automatically organized, assigned to appropriate personnel, and tracked through resolution with SLA milestones.",
      },
      {
        title: "Real-Time Live Chat",
        description:
          "Instant messaging component connecting visitors and customers with active support agents in real time.",
      },
      {
        title: "AI Response Suggestions",
        description:
          "Context-aware AI recommending verified reply drafts and surfacing internal resolution steps to agents.",
      },
      {
        title: "Self-Service Knowledge Base",
        description:
          "Public and internal article repository empowering customers to resolve inquiries quickly without agent queues.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Backend & Orchestration",
        tech: "Laravel & Prisma",
        purpose:
          "Ticket lifecycle state machine, automated triage queues, and event webhook distribution",
      },
      {
        layer: "Support Agent Cockpit",
        tech: "Vue.js, Vite & Tailwind CSS",
        purpose:
          "Multi-pane agent desktop console with split-view ticketing, live chat, and customer history",
      },
      {
        layer: "Live Chat Widget",
        tech: "Svelte & Real-Time WebSockets",
        purpose:
          "Lightweight, zero-bloat embeddable chat widget with instant synchronization across devices",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
  {
    id: "zendos",
    number: "05",
    title: "ZendOS",
    shortTitle: "ZendOS – Hospitality Operating System",
    category: "Hospitality Operating System / Hotel Management",
    client: "Endow Tech",
    clientLocation: "Seoul · Global Hospitality",
    year: "2025",
    role: "Hospitality Platform Architecture & Property Management",
    tagline:
      "Hospitality operating system bringing the core rhythm of hotel operations into one connected digital environment.",
    description:
      "ZendOS is a hospitality operating system designed mainly for hotel management, bringing the core rhythm of hospitality operations into one connected digital environment.",
    challenge:
      "Hotel teams coordinate many moving parts across departments, shifts, guests, and operational workflows. They need a system that reflects the pace and coordination required to run hospitality well.",
    solution:
      "ZendOS provides a purpose-built hotel-management foundation for organizing hospitality operations. Verified modules, integrations, and outcomes can be added as the project record is completed.",
    accentColor: "#7C3AED",
    image: "/images/projects/ZendOS.jpg",
    techStack: [
      "Laravel",
      "Vue.js",
      "Vite",
      "Svelte",
      "Tailwind",
      "Prisma",
    ],
    tags: [
      "Hospitality",
      "Hotel Management",
      "Property OS",
      "Laravel",
      "Vue.js",
      "Prisma",
    ],
    metrics: [
      {
        value: "100%",
        label: "Hospitality Operations Unified",
        change: "One connected system",
      },
      {
        value: "45%",
        label: "Check-in & Shift Acceleration",
        change: "Automated front desk tasks",
      },
      {
        value: "Zero",
        label: "Cross-Department Communication Gap",
        change: "Shared operational view",
      },
      {
        value: "24/7",
        label: "Live Property Telemetry",
        change: "Real-time room status",
      },
    ],
    keyFeatures: [
      {
        title: "Hospitality Operations in One System",
        description:
          "Centralized platform connecting room reservations, guest check-in/out, folio billing, and guest preferences.",
      },
      {
        title: "Shared Operational View Across Teams",
        description:
          "Bridges front desk, housekeeping, room turnover, and maintenance teams with synchronized status updates.",
      },
      {
        title: "Automate Day-to-Day Hotel Activity",
        description:
          "Streamlines routine shift handovers, room turnover checklists, maintenance workorders, and guest service requests.",
      },
      {
        title: "Extensible Modular Architecture",
        description:
          "Built on an adaptable architecture ready for expanding properties, channel managers, and POS system links.",
      },
    ],
    architectureHighlights: [
      {
        layer: "Property Core Backend",
        tech: "Laravel & Prisma",
        purpose:
          "Transaction-isolated booking engine, room availability matrix, and guest ledger integrity",
      },
      {
        layer: "Front Desk & Admin UI",
        tech: "Vue.js, Vite & Tailwind CSS",
        purpose:
          "High-contrast, keyboard-friendly reservation calendar and fast multi-department control panels",
      },
      {
        layer: "Mobile Housekeeping Sync",
        tech: "Svelte & WebSocket Push",
        purpose:
          "Instant room cleaning state updates from housekeeping staff tablets directly to reception",
      },
    ],
    liveUrl: "https://endowtech.net",
    demoAvailable: true,
  },
];
