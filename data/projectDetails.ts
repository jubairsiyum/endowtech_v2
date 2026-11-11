import { caseStudiesTechLogos } from "@/data/caseStudiesPage";
import { featuredProjects, type FeaturedProject } from "@/data/featuredProjects";

export interface ProjectEngineeringDecision {
  title: string;
  tag: string;
  summary: string;
  iconKey: "shield" | "zap" | "layers" | "database" | "server";
}

export interface ProjectDeliveryStage {
  step: string;
  shortLabel: string;
  title: string;
  focus: string;
  deliverables: string[];
}

export interface ProjectSystemStandard {
  label: string;
  value: string;
  iconKey: "shield" | "zap" | "layers" | "database" | "check" | "server";
}

export interface ProjectDetailExtension {
  id: string;
  challengePoints: string[];
  solutionPoints: string[];
  impactHeadline: string;
  impactSummary: string;
  engineeringDecisions: ProjectEngineeringDecision[];
  deliveryStages: ProjectDeliveryStage[];
  systemStandards: ProjectSystemStandard[];
  transformationTitle: string;
  transformationBody: string;
  transformationOutcomes: string[];
  defaultServiceOption: string;
}

export const projectDetailExtensions: Record<string, ProjectDetailExtension> = {
  "endow-connect": {
    id: "endow-connect",
    challengePoints: [
      "Student inquiries fragmented across branch spreadsheets and chat threads",
      "No real-time handoff visibility between intake staff and counselors",
      "Inconsistent stage tracking across multi-campus university pipelines",
      "Manual leadership reporting delays delaying admissions forecasting",
    ],
    solutionPoints: [
      "Centralized CRM consolidating leads from first touch through enrollment",
      "Automated counselor assignment with milestone task accountability",
      "Strict Sanctum token authentication and role-based data boundaries",
      "Redis-cached analytics funnels giving branches instant conversion clarity",
    ],
    impactHeadline: "Engineered for zero inquiry slippage at multi-campus scale.",
    impactSummary:
      "Every counseling action, document checkpoint, and branch KPI flows through one audited CRM core built to carry high-volume admissions cycles without spreadsheet overhead.",
    engineeringDecisions: [
      {
        title: "Granular Role & Campus Data Isolation",
        tag: "Security · RBAC",
        summary:
          "Enforced Laravel Sanctum session tokens and campus-scoped RBAC policies so counselors, branch heads, and executives see only verified student records.",
        iconKey: "shield",
      },
      {
        title: "Reactive Livewire + Vue Funnel Cockpits",
        tag: "Frontend · UX",
        summary:
          "Combined Laravel Livewire workflows with targeted Vue.js interactive views for rapid inline filtering, task reassignment, and zero-reload stage transitions.",
        iconKey: "zap",
      },
      {
        title: "Normalized Relational Intake Schemas",
        tag: "Data Integrity",
        summary:
          "Structured MySQL schemas link candidates, documents, university intakes, and counselor audit logs under strict foreign-key constraints.",
        iconKey: "database",
      },
      {
        title: "Redis-Backed Reporting & Container Parity",
        tag: "Reliability",
        summary:
          "Hot dashboard aggregates sit in Redis while Docker containerization keeps staging and production environments predictable across enrollment peaks.",
        iconKey: "server",
      },
    ],
    deliveryStages: [
      {
        step: "01",
        shortLabel: "Discovery",
        title: "Enrollment Funnel & Role Mapping",
        focus:
          "Audited inquiry sources, counselor workflows, document verification gates, and regional campus reporting requirements across Endow Global Education.",
        deliverables: [
          "Branch-by-branch intake workflow audit",
          "Counselor & leadership RBAC permission matrix",
          "Program & university cycle entity model",
          "Migration blueprint from legacy spreadsheets",
        ],
      },
      {
        step: "02",
        shortLabel: "Architecture",
        title: "Multi-Branch CRM Core Design",
        focus:
          "Designed normalized MySQL lead pipelines, audit trails, and Sanctum security layers to keep thousands of concurrent student profiles clean and traceable.",
        deliverables: [
          "Normalized MySQL admissions schema",
          "Laravel 11 & Livewire state architecture",
          "Redis query caching topology",
          "Containerized Docker local-to-prod spec",
        ],
      },
      {
        step: "03",
        shortLabel: "Sprint Build",
        title: "Counselor & Leadership Interfaces",
        focus:
          "Shipped iterative staging releases covering intake queues, automated counselor bridging, branch activity feeds, and executive funnel dashboards.",
        deliverables: [
          "Unified student lead & profile workspace",
          "Task routing & follow-up reminder engine",
          "Multi-program & multi-campus filters",
          "Executive yield & conversion telemetry",
        ],
      },
      {
        step: "04",
        shortLabel: "QA & Security",
        title: "Permission & Load Hardening",
        focus:
          "Validated cross-branch authorization boundaries, indexed heavy funnel queries, and stress-tested peak admissions intake bursts before rollout.",
        deliverables: [
          "Role boundary & Sanctum penetration audit",
          "MySQL query indexing & N+1 elimination",
          "Cross-device responsive UI validation",
          "Automated backup & recovery rehearsal",
        ],
      },
      {
        step: "05",
        shortLabel: "Launch",
        title: "Production Rollout & SLA Care",
        focus:
          "Rolled out across active admissions branches with zero inquiry downtime, backed by telemetry monitoring and continuous intake-season support.",
        deliverables: [
          "Zero-downtime multi-branch cutover",
          "99.9% platform uptime SLA monitoring",
          "Counselor onboarding documentation",
          "Ongoing intake cycle feature velocity",
        ],
      },
    ],
    systemStandards: [
      { label: "RBAC Isolation", value: "Branch & Role Scoped", iconKey: "shield" },
      { label: "Dashboard Load", value: "Sub-Second Cache", iconKey: "zap" },
      { label: "Data Model", value: "100% Unified Funnel", iconKey: "database" },
      { label: "UI Architecture", value: "Laravel + Vue.js", iconKey: "layers" },
      { label: "Audit Trail", value: "Full Action History", iconKey: "check" },
      { label: "Availability", value: "99.9% Uptime SLA", iconKey: "server" },
    ],
    transformationTitle:
      "From fragmented branch spreadsheets to unified enrollment execution.",
    transformationBody:
      "Instead of piecing together admissions updates across separate files and chat messages, leadership and counselors work from one shared source of truth built around real education operations.",
    transformationOutcomes: [
      "Complete visibility from initial inquiry through final enrollment milestone",
      "Accountable counselor ownership preventing qualified student leads from going cold",
      "Real-time conversion metrics across programs, branches, and recruitment drives",
      "Zero manual spreadsheet consolidation at weekly leadership reviews",
      "Scalable foundation ready for expanding university partnerships and intakes",
    ],
    defaultServiceOption: "Student & Academic Portals",
  },
  "endow-cuisine": {
    id: "endow-cuisine",
    challengePoints: [
      "Generic bookkeeping apps ignore shift-level cash and split terminal flows",
      "Managers spend hours reconciling daily sales against supplier invoices",
      "Inventory-linked ingredient expenses distort monthly margin visibility",
      "Editable ledger entries create financial audit gaps across floor shifts",
    ],
    solutionPoints: [
      "Accounting structure built directly around restaurant shifts and daily sales",
      "Direct raw-material expense logging tied to supplier balances and food cost",
      "Immutable PostgreSQL double-entry ledger preventing silent record edits",
      "On-demand P&L views delivering shift and branch profitability instantly",
    ],
    impactHeadline: "Built for the daily financial pulse of food-service operations.",
    impactSummary:
      "Endow Cuisine aligns bookkeeping directly with kitchen prep, shift turnovers, cash drawers, and vendor settlements—turning nightly reconciliation from a chore into an automated checkpoint.",
    engineeringDecisions: [
      {
        title: "Immutable Double-Entry PgSQL Ledger",
        tag: "ACID Financial Core",
        summary:
          "Engineered strict PostgreSQL transactional bookkeeping where corrections post compensating entries rather than overwriting historical shift logs.",
        iconKey: "database",
      },
      {
        title: "Shift-First Closing & Cash Reconciliation",
        tag: "Domain Workflow",
        summary:
          "Structured Laravel & Livewire closing workflows around cash drawers, card batch totals, and split payments to eliminate end-of-shift discrepancies.",
        iconKey: "shield",
      },
      {
        title: "Ultra-Light Alpine.js Terminal Reactivity",
        tag: "Performance · UI",
        summary:
          "Kept floor manager dashboards fast even on modest kitchen-office hardware using lightweight Alpine.js bindings and Redis shift-state caching.",
        iconKey: "zap",
      },
      {
        title: "Automated P&L & Vendor Balance Rollups",
        tag: "Analytics · Reliability",
        summary:
          "Real-time aggregation links supplier receipts directly to food-cost percentages so owners inspect true margins without waiting for month-end accounting.",
        iconKey: "server",
      },
    ],
    deliveryStages: [
      {
        step: "01",
        shortLabel: "Discovery",
        title: "Kitchen & Shift Finance Mapping",
        focus:
          "Studied restaurant daily cash drawers, terminal settlements, supplier payment terms, and floor manager closeout habits.",
        deliverables: [
          "Shift handover & cash-drawer workflow spec",
          "Supplier invoice & raw-cost taxonomy",
          "Double-entry food-service chart of accounts",
          "Profit & loss reporting requirements",
        ],
      },
      {
        step: "02",
        shortLabel: "Architecture",
        title: "ACID Financial Ledger Blueprint",
        focus:
          "Architected PostgreSQL append-only transaction tables paired with Laravel accounting services and Redis shift caching.",
        deliverables: [
          "PostgreSQL double-entry schema design",
          "Shift state lock & verification rules",
          "Vendor payable balance engine",
          "Role-guarded manager adjustment permissions",
        ],
      },
      {
        step: "03",
        shortLabel: "Sprint Build",
        title: "Daily Sales & Vendor Workflows",
        focus:
          "Built fast Livewire + Alpine.js forms for logging shift sales, card batch splits, vendor payouts, and live financial health views.",
        deliverables: [
          "Shift opening & automated closing screen",
          "Supplier invoice & inventory expense capture",
          "On-demand P&L breakdown dashboard",
          "Discrepancy flagging & variance breakdown",
        ],
      },
      {
        step: "04",
        shortLabel: "QA & Security",
        title: "Accounting Precision & Audit Verification",
        focus:
          "Tested edge-case split tenders, partial supplier settlements, and concurrent shift closes under database transaction isolation.",
        deliverables: [
          "Ledger balance invariant automated tests",
          "Concurrent shift close lock verification",
          "Decimal currency precision validation",
          "Manager approval audit log verification",
        ],
      },
      {
        step: "05",
        shortLabel: "Launch",
        title: "Floor Deployment & Accounting Sync",
        focus:
          "Transitioned live restaurant operations onto structured daily reconciliations, cutting manual closeout work across managers.",
        deliverables: [
          "85% manual reconciliation time reduction",
          "100% shift-based audit consistency",
          "Real-time owner P&L visibility",
          "Scheduled PostgreSQL off-site backups",
        ],
      },
    ],
    systemStandards: [
      { label: "Ledger Engine", value: "ACID Double-Entry", iconKey: "database" },
      { label: "UI Weight", value: "Alpine.js + Livewire", iconKey: "zap" },
      { label: "Audit Match", value: "100% Shift Verified", iconKey: "shield" },
      { label: "Recon Savings", value: "85% Time Saved", iconKey: "check" },
      { label: "Stack Core", value: "Laravel + PgSQL", iconKey: "layers" },
      { label: "Availability", value: "Real-Time Finance", iconKey: "server" },
    ],
    transformationTitle:
      "From generic spreadsheet workarounds to purpose-built restaurant control.",
    transformationBody:
      "Instead of forcing food-service teams into slow corporate accounting forms, Endow Cuisine mirrors the exact cadence of shifts, suppliers, and daily registers.",
    transformationOutcomes: [
      "85% reduction in manual end-of-day bookkeeping and register balancing",
      "Real-time clarity on daily revenue, food costs, and active vendor payables",
      "Zero silent ledger edits with immutable shift audit history in PostgreSQL",
      "Fast floor-manager workflows requiring minimal accounting training",
      "Always-ready profit/loss snapshots across shifts and reporting periods",
    ],
    defaultServiceOption: "SaaS & Multi-Tenant Platforms",
  },
  "endow-cloud": {
    id: "endow-cloud",
    challengePoints: [
      "Confidential business files exposed to third-party public cloud hosting",
      "Unreliable WAN internet disrupting shared document access on-site",
      "Escalating recurring per-user storage fees across expanding teams",
      "Clunky network shares driving employees toward unsanctioned file apps",
    ],
    solutionPoints: [
      "Google Drive-style web workspace hosted directly on owned local hardware",
      "Memory-safe Rust + FUSE kernel filesystem delivering native LAN throughput",
      "Instant Linux inotify watcher syncing metadata into embedded SQLite",
      "Departmental permissions, local backups, and $0 recurring SaaS cloud bills",
    ],
    impactHeadline: "Cloud usability running strictly on company-owned iron.",
    impactSummary:
      "Endow Cloud eliminates external cloud custody and bandwidth bottlenecks simultaneously—giving teams modern browser collaboration at full gigabit local network speeds.",
    engineeringDecisions: [
      {
        title: "Rust & FUSE Userspace Filesystem Core",
        tag: "Systems Kernel",
        summary:
          "Built the storage bridge in Rust using FUSE so files remain native, memory-safe, and readable directly at operating-system level.",
        iconKey: "server",
      },
      {
        title: "Kernel-Level Linux inotify + SQLite Indexing",
        tag: "Zero-Lag Sync",
        summary:
          "Subscribed directly to filesystem events via inotify to update SQLite metadata indexes within milliseconds—bypassing expensive full-disk scans.",
        iconKey: "database",
      },
      {
        title: "Full Gigabit LAN Chunked Streaming",
        tag: "Performance · 10x",
        summary:
          "Configured Nginx HTTP chunked streaming for large uploads and instant browser previews up to 10x faster than congested remote WAN uploads.",
        iconKey: "zap",
      },
      {
        title: "100% Air-Gapped Data Sovereignty",
        tag: "On-Prem Security",
        summary:
          "Keeps internal departmental folders, permission rules, and local backup mirrors completely inside the organization's physical network perimeter.",
        iconKey: "shield",
      },
    ],
    deliveryStages: [
      {
        step: "01",
        shortLabel: "Discovery",
        title: "Local Network & Sovereignty Audit",
        focus:
          "Evaluated sensitive file flows, local LAN hardware constraints, departmental access boundaries, and offline resilience needs.",
        deliverables: [
          "On-premise hardware & disk layout spec",
          "Department permission & sharing matrix",
          "Zero-WAN operational continuity plan",
          "TCO comparison vs SaaS cloud seats",
        ],
      },
      {
        step: "02",
        shortLabel: "Architecture",
        title: "Rust + FUSE + SQLite Core",
        focus:
          "Architected a lightweight systems daemon bridging virtualized Drive-style workspaces over native server disks without database bloat.",
        deliverables: [
          "Rust FUSE virtual filesystem architecture",
          "inotify real-time watcher daemon",
          "WAL-mode SQLite file metadata index",
          "Nginx local TLS & chunked gateway config",
        ],
      },
      {
        step: "03",
        shortLabel: "Sprint Build",
        title: "Drive-Style Browser Experience",
        focus:
          "Delivered drag-and-drop directory navigation, instant file search, preview pipelines, and internal department share controls.",
        deliverables: [
          "Familiar Drive-like folder & search UI",
          "Internal departmental permissions & links",
          "Multi-gigabyte LAN chunked file transfers",
          "Local redundant mirror synchronization",
        ],
      },
      {
        step: "04",
        shortLabel: "QA & Security",
        title: "Crash-Safety & Concurrent I/O Testing",
        focus:
          "Stress-tested concurrent writes, power-loss SQLite WAL recovery, and large binary transfer stability across LAN client machines.",
        deliverables: [
          "Concurrent multi-user file lock tests",
          "inotify burst event queue stress test",
          "Power-cycle & WAL snapshot recovery audit",
          "LAN throughput & memory footprint profiling",
        ],
      },
      {
        step: "05",
        shortLabel: "Launch",
        title: "On-Premise Appliance Deployment",
        focus:
          "Deployed directly onto local company servers with zero third-party cloud accounts, delivering instant internal access even offline.",
        deliverables: [
          "100% sovereign on-premise file custody",
          "10x local transfer speed gains",
          "$0 recurring monthly cloud storage fees",
          "Automated local mirror health checks",
        ],
      },
    ],
    systemStandards: [
      { label: "Data Custody", value: "100% On-Premise", iconKey: "shield" },
      { label: "Transfer Speed", value: "10x Gigabit LAN", iconKey: "zap" },
      { label: "Systems Core", value: "Rust + FUSE + inotify", iconKey: "layers" },
      { label: "Metadata Index", value: "SQLite Zero-Lag", iconKey: "database" },
      { label: "Offline Ready", value: "ISP Independent", iconKey: "check" },
      { label: "SaaS Cost", value: "$0 / Month", iconKey: "server" },
    ],
    transformationTitle:
      "From recurring cloud exposure to fast, sovereign local infrastructure.",
    transformationBody:
      "Teams stop choosing between data privacy and everyday convenience—getting cloud-grade organization running cleanly on hardware they own.",
    transformationOutcomes: [
      "Zero confidential business files uploaded to external third-party clouds",
      "Full LAN gigabit speeds for large design, finance, and operational documents",
      "Continuous team file access even when external internet connections drop",
      "Familiar Drive-style web navigation requiring zero staff retraining",
      "Eliminated recurring per-seat cloud storage subscription overhead",
    ],
    defaultServiceOption: "Cloud DevOps & Site Reliability",
  },
  "endow-desk": {
    id: "endow-desk",
    challengePoints: [
      "Customer requests scattered across emails, chat windows, and manual notes",
      "Delayed initial responses due to manual ticket sorting and routing",
      "Support agents repeatedly typing answers to common troubleshooting issues",
      "Customers lacking a structured self-service knowledge base for quick fixes",
    ],
    solutionPoints: [
      "Unified support hub pairing SLA ticket routing with live WebSocket chat",
      "Automated inquiry classification dispatching tickets to the right agent",
      "Context-aware AI drafting layer surfacing verified resolution replies",
      "Searchable public & internal knowledge base cutting repetitive agent load",
    ],
    impactHeadline: "Combining real-time chat, structured tickets, and AI assistance.",
    impactSummary:
      "Endow Desk compresses resolution cycles without sacrificing accuracy—routing every request automatically while equipping agents with AI-drafted answers backed by verified documentation.",
    engineeringDecisions: [
      {
        title: "Lightweight Svelte Embeddable Chat Widget",
        tag: "Zero-Bloat Client",
        summary:
          "Built the visitor chat widget in Svelte + WebSockets so customer sites stay fast while maintaining real-time bidirectional agent synchronization.",
        iconKey: "zap",
      },
      {
        title: "AI Suggestion & Knowledge Grounding Layer",
        tag: "AI Workflows",
        summary:
          "Surfaces context-matched resolution drafts and internal KB articles inside the agent cockpit, cutting repetitive manual drafting by 70%.",
        iconKey: "server",
      },
      {
        title: "Multi-Pane Vue.js Support Agent Cockpit",
        tag: "Agent Productivity",
        summary:
          "Unified ticket timeline, live chat replies, SLA timers, and AI response suggestions into one zero-tab-switching workspace via Vue.js & Vite.",
        iconKey: "layers",
      },
      {
        title: "Prisma & Laravel State-Machine Triage",
        tag: "Audit & SLAs",
        summary:
          "Guarantees every ticket follows clean lifecycle transitions from intake to closure with transparent response-time telemetry.",
        iconKey: "database",
      },
    ],
    deliveryStages: [
      {
        step: "01",
        shortLabel: "Discovery",
        title: "Support Queue & SLA Flow Audit",
        focus:
          "Mapped incoming customer channels, repetitive troubleshooting themes, escalation paths, and agent response bottlenecks.",
        deliverables: [
          "Ticket lifecycle & SLA threshold definition",
          "Support taxonomy & auto-routing matrix",
          "Knowledge base taxonomy structure",
          "AI reply guardrails & human-in-loop spec",
        ],
      },
      {
        step: "02",
        shortLabel: "Architecture",
        title: "Hybrid Laravel + Prisma + WebSocket Core",
        focus:
          "Separated lightweight Svelte widget ingestion from the high-density Vue.js support console and backend AI triage orchestration.",
        deliverables: [
          "WebSocket real-time messaging broker",
          "Ticket state machine & routing rules",
          "AI draft retrieval & KB indexing pipeline",
          "Typed Prisma + Laravel data contract",
        ],
      },
      {
        step: "03",
        shortLabel: "Sprint Build",
        title: "Agent Cockpit & Knowledge Portal",
        focus:
          "Shipped unified ticket views, live chat handoffs, one-click AI draft insertion, and self-service article publishing tools.",
        deliverables: [
          "Split-pane Vue.js agent resolution desk",
          "Svelte real-time customer live chat widget",
          "Context-aware AI suggestion drawer",
          "Self-service searchable FAQ & KB portal",
        ],
      },
      {
        step: "04",
        shortLabel: "QA & Security",
        title: "Latency & AI Response Verification",
        focus:
          "Tested WebSocket reconnection stability, concurrent agent locking, and strict knowledge-base grounding for AI reply suggestions.",
        deliverables: [
          "Sub-2-minute first-reply SLA simulations",
          "Agent collision-detection locks on tickets",
          "Embeddable script size & CSP audit",
          "Permission checks across customer tenants",
        ],
      },
      {
        step: "05",
        shortLabel: "Launch",
        title: "Live Support Operations Rollout",
        focus:
          "Unified live chat, ticketing, and AI triage into production, giving teams full lifecycle visibility from initial ping to resolution.",
        deliverables: [
          "< 2 min average first response time",
          "70% reduction in repetitive manual typing",
          "100% contact-to-resolution visibility",
          "24/7 self-service customer answers",
        ],
      },
    ],
    systemStandards: [
      { label: "First Reply", value: "< 2 Min Target", iconKey: "zap" },
      { label: "Manual Work", value: "70% Reduced", iconKey: "check" },
      { label: "Chat Widget", value: "Svelte + WS", iconKey: "layers" },
      { label: "Ticket Trace", value: "100% Lifecycle", iconKey: "shield" },
      { label: "Data Layer", value: "Laravel + Prisma", iconKey: "database" },
      { label: "Self-Service", value: "24/7 KB Layer", iconKey: "server" },
    ],
    transformationTitle:
      "From overloaded support inboxes to AI-assisted resolution velocity.",
    transformationBody:
      "Support specialists no longer waste time routing inquiries manually or rewriting routine explanations—focusing directly on resolving complex customer needs fast.",
    transformationOutcomes: [
      "Under 2-minute first response velocity assisted by context-aware AI drafts",
      "Seamless escalation between real-time visitor chat and tracked SLA tickets",
      "70% less repetitive agent effort through suggested answers and self-service articles",
      "Full audit visibility into inquiry ownership, wait times, and resolution quality",
      "Ultra-lightweight embeddable widget keeping client websites fast",
    ],
    defaultServiceOption: "AI Workflows & Matching Engines",
  },
  zendos: {
    id: "zendos",
    challengePoints: [
      "Front desk, housekeeping, and maintenance operating in disconnected tools",
      "Manual shift handovers delaying room readiness during peak check-in windows",
      "Limited live visibility into property occupancy and room turnover state",
      "Legacy hotel software resisting modern API, tablet, and POS integrations",
    ],
    solutionPoints: [
      "Unified Hospitality OS connecting bookings, folios, and property workflows",
      "Instant Svelte tablet housekeeping updates streamed straight to reception",
      "Automated daily shift checklists, maintenance dispatches, and turn triggers",
      "Extensible Laravel + Prisma core architected for multi-property expansion",
    ],
    impactHeadline: "Synchronizing every department around the real rhythm of hospitality.",
    impactSummary:
      "ZendOS replaces fragmented hotel utilities with one connected property operating system—eliminating handover blind spots between reception desks, room attendants, and management.",
    engineeringDecisions: [
      {
        title: "Real-Time Tablet-to-Reception Housekeeping Sync",
        tag: "Svelte · WebSockets",
        summary:
          "Pushes live room cleaning states, inspection completions, and urgent maintenance alerts from mobile Svelte tablets straight to the front desk.",
        iconKey: "zap",
      },
      {
        title: "Transaction-Isolated Booking & Folio Engine",
        tag: "Booking Integrity",
        summary:
          "Guards room availability calendars and guest ledger balances against double-bookings using isolated Laravel & Prisma database transactions.",
        iconKey: "database",
      },
      {
        title: "Keyboard-First Front Desk Command UI",
        tag: "Hospitality UX",
        summary:
          "Engineered high-contrast Vue.js reception screens optimized for rapid check-ins, stay extensions, and fast department switching under lobby peaks.",
        iconKey: "layers",
      },
      {
        title: "Modular Multi-Property & POS Ready Core",
        tag: "Extensible OS",
        summary:
          "Clean module boundaries prepare the property core for external channel managers, F&B POS terminals, and expanding hotel portfolios.",
        iconKey: "server",
      },
    ],
    deliveryStages: [
      {
        step: "01",
        shortLabel: "Discovery",
        title: "Hotel Floor & Shift Rhythm Study",
        focus:
          "Mapped check-in spikes, housekeeping room turnover signals, maintenance escalations, and daily shift handover workflows.",
        deliverables: [
          "Front-desk & concierge operational blueprint",
          "Housekeeping mobile room-status state chart",
          "Folio billing & stay ledger model",
          "Department role & shift handoff spec",
        ],
      },
      {
        step: "02",
        shortLabel: "Architecture",
        title: "Modular Property OS Foundation",
        focus:
          "Structured Laravel + Prisma booking integrity services alongside high-speed WebSocket event broadcast channels.",
        deliverables: [
          "Availability matrix & reservation locking",
          "Real-time WebSocket property telemetry bus",
          "Multi-department permission architecture",
          "Channel manager & POS extension hooks",
        ],
      },
      {
        step: "03",
        shortLabel: "Sprint Build",
        title: "Front Desk & Mobile Housekeeping Consoles",
        focus:
          "Delivered unified calendar views, guest folio workflows, automated turnover triggers, and mobile housekeeping tablets.",
        deliverables: [
          "Keyboard-fast reservation & check-in console",
          "Mobile Svelte housekeeping turnover app",
          "Maintenance ticket & checklist dispatch",
          "Live occupancy & shift status board",
        ],
      },
      {
        step: "04",
        shortLabel: "QA & Security",
        title: "Concurrency & Offline Resilience Checks",
        focus:
          "Validated overlapping booking attempts, mobile Wi-Fi drop recovery for housekeeping tablets, and shift-change data handoffs.",
        deliverables: [
          "Booking concurrency & double-book prevention",
          "Tablet WebSocket reconnect & queue tests",
          "Guest billing accuracy & audit verification",
          "High-contrast desk accessibility checks",
        ],
      },
      {
        step: "05",
        shortLabel: "Launch",
        title: "Connected Property Operations Launch",
        focus:
          "Brought front desk, housekeeping, and leadership onto one unified digital rhythm—cutting check-in bottlenecks across shifts.",
        deliverables: [
          "45% faster check-in & shift turnover",
          "Zero inter-department radio/paper gaps",
          "24/7 live property room status telemetry",
          "Modular foundation ready for new properties",
        ],
      },
    ],
    systemStandards: [
      { label: "Operations Hub", value: "100% Unified OS", iconKey: "layers" },
      { label: "Shift Speed", value: "45% Faster Check-In", iconKey: "zap" },
      { label: "Room Sync", value: "Live WebSockets", iconKey: "server" },
      { label: "Booking Core", value: "Transaction Safe", iconKey: "database" },
      { label: "Dept Alignment", value: "Zero Handover Gap", iconKey: "check" },
      { label: "Security", value: "Role-Scoped Access", iconKey: "shield" },
    ],
    transformationTitle:
      "From siloed property workflows to one synchronized hospitality operating system.",
    transformationBody:
      "Reception desks, housekeeping teams, and property managers stay continuously aligned—turning chaotic shift changes into predictable, responsive guest operations.",
    transformationOutcomes: [
      "Real-time room readiness pushed instantly from housekeeping tablets to reception",
      "45% acceleration across front-desk check-in and daily shift transitions",
      "Zero lost maintenance requests or miscommunicated turnover priorities",
      "Unified visibility into reservations, guest folios, and property occupancy",
      "Modular architecture prepared for multi-property growth and POS integrations",
    ],
    defaultServiceOption: "SaaS & Multi-Tenant Platforms",
  },
};

export interface TechBadgeVisual {
  name: string;
  iconUrl?: string;
  categoryLabel: string;
}

const TECH_ICON_MAP: Record<string, { slug?: string; categoryLabel: string }> = {
  Laravel: { slug: "laravel", categoryLabel: "Backend Framework" },
  "Vue.js": { slug: "vuedotjs", categoryLabel: "Reactive UI" },
  Blade: { slug: "laravel", categoryLabel: "Server Templates" },
  MySQL: { slug: "mysql", categoryLabel: "Relational DB" },
  PgSQL: { slug: "postgresql", categoryLabel: "ACID Ledger DB" },
  Livewire: { slug: "livewire", categoryLabel: "Full-Stack Flows" },
  Redis: { slug: "redis", categoryLabel: "Memory Cache" },
  Docker: { slug: "docker", categoryLabel: "Containers" },
  RBAC: { categoryLabel: "Access Security" },
  Sanctum: { slug: "laravel", categoryLabel: "Token Auth" },
  "Alpine.js": { slug: "alpinedotjs", categoryLabel: "Light UI" },
  Rust: { slug: "rust", categoryLabel: "Systems Core" },
  SQLite: { slug: "sqlite", categoryLabel: "Embedded Index" },
  inotify: { slug: "linux", categoryLabel: "Kernel Watcher" },
  FUSE: { slug: "linux", categoryLabel: "Virtual FS" },
  Nginx: { slug: "nginx", categoryLabel: "LAN Gateway" },
  Vite: { slug: "vite", categoryLabel: "Build Tooling" },
  Svelte: { slug: "svelte", categoryLabel: "Fast Runtime UI" },
  Tailwind: { slug: "tailwindcss", categoryLabel: "Design System" },
  Prisma: { slug: "prisma", categoryLabel: "Type-Safe ORM" },
};

export function resolveTechVisuals(techStack: string[]): TechBadgeVisual[] {
  return techStack.map((tech) => {
    const mapped = TECH_ICON_MAP[tech];
    if (mapped?.slug) {
      return {
        name: tech,
        iconUrl: `https://cdn.simpleicons.org/${mapped.slug}`,
        categoryLabel: mapped.categoryLabel,
      };
    }

    const fromCaseStudyLoop = caseStudiesTechLogos.find(
      (item) => item.name.toLowerCase() === tech.toLowerCase(),
    );

    return {
      name: tech,
      iconUrl: fromCaseStudyLoop?.icon,
      categoryLabel: mapped?.categoryLabel ?? "Core Module",
    };
  });
}

export function getRelatedProjects(currentId: string): FeaturedProject[] {
  const idx = featuredProjects.findIndex((p) => p.id === currentId);
  if (idx === -1) return featuredProjects.slice(0, 2);

  const related: FeaturedProject[] = [];
  for (let offset = 1; offset <= 2; offset++) {
    related.push(featuredProjects[(idx + offset) % featuredProjects.length]);
  }
  return related;
}
