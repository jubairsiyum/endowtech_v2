const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'public', 'images', 'projects');

const fintechSvg = `
<svg width="1280" height="800" viewBox="0 0 1280 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#451a03" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#1c1917" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0a0a0b" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="amberGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1280" height="800" fill="url(#bgGlow)"/>

  <!-- Cybernetic Grid Floor -->
  <g opacity="0.15" stroke="#f59e0b" stroke-width="1">
    <line x1="0" y1="450" x2="1280" y2="450"/>
    <line x1="0" y1="520" x2="1280" y2="520"/>
    <line x1="0" y1="600" x2="1280" y2="600"/>
    <line x1="0" y1="700" x2="1280" y2="700"/>
    <line x1="200" y1="800" x2="500" y2="400"/>
    <line x1="400" y1="800" x2="600" y2="400"/>
    <line x1="640" y1="800" x2="640" y2="400"/>
    <line x1="880" y1="800" x2="680" y2="400"/>
    <line x1="1080" y1="800" x2="780" y2="400"/>
  </g>

  <!-- Ambient Light Orbs -->
  <circle cx="640" cy="380" r="220" fill="#f59e0b" opacity="0.18" filter="url(#glow)"/>
  <circle cx="340" cy="300" r="140" fill="#d97706" opacity="0.15" filter="url(#glow)"/>
  <circle cx="940" cy="420" r="160" fill="#fbbf24" opacity="0.12" filter="url(#glow)"/>

  <!-- 3D Isometric Floating FinTech Cards -->
  <!-- Center Main Terminal -->
  <g transform="translate(360, 160)">
    <rect width="560" height="360" rx="24" fill="url(#cardGrad)" stroke="#f59e0b" stroke-opacity="0.4" stroke-width="1.5"/>
    <rect x="20" y="20" width="520" height="60" rx="12" fill="#000000" fill-opacity="0.4"/>
    <text x="44" y="56" fill="#fbbf24" font-family="system-ui, sans-serif" font-weight="700" font-size="16" letter-spacing="1.5">ENDOW FINTECH // CROSS-BORDER SETTLEMENT</text>
    <circle cx="510" cy="50" r="6" fill="#10b981"/>
    
    <!-- Balance & Transaction Metrics -->
    <text x="44" y="130" fill="#a8a29e" font-family="system-ui, sans-serif" font-size="13" font-weight="600">AGGREGATE SETTLED VOLUME</text>
    <text x="44" y="175" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="38">$3,248,920.00</text>
    <text x="340" y="170" fill="#10b981" font-family="system-ui, sans-serif" font-weight="700" font-size="16">▲ 100% RECONCILED</text>

    <!-- Chart line -->
    <path d="M 44 280 Q 120 220 180 250 T 300 210 T 420 180 T 516 160" fill="none" stroke="url(#amberGold)" stroke-width="4" stroke-linecap="round"/>
    <path d="M 44 280 Q 120 220 180 250 T 300 210 T 420 180 T 516 160 L 516 310 L 44 310 Z" fill="url(#amberGold)" fill-opacity="0.08"/>
  </g>

  <!-- Left Floating Holographic Currency Tokens -->
  <g transform="translate(180, 260)">
    <rect width="220" height="240" rx="20" fill="url(#cardGrad)" stroke="#fbbf24" stroke-opacity="0.3" stroke-width="1.5"/>
    <circle cx="70" cy="70" r="32" fill="url(#amberGold)"/>
    <text x="58" y="80" fill="#000000" font-family="system-ui, sans-serif" font-weight="900" font-size="28">₩</text>
    <text x="120" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="16">KRW Won</text>
    <text x="120" y="85" fill="#a8a29e" font-family="system-ui, sans-serif" font-size="12">Seoul Clearing</text>

    <line x1="24" y1="130" x2="196" y2="130" stroke="#ffffff" stroke-opacity="0.1"/>

    <circle cx="70" cy="180" r="32" fill="url(#amberGold)"/>
    <text x="60" y="190" fill="#000000" font-family="system-ui, sans-serif" font-weight="900" font-size="28">€</text>
    <text x="120" y="175" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="16">EUR Euro</text>
    <text x="120" y="195" fill="#a8a29e" font-family="system-ui, sans-serif" font-size="12">Helsinki SEPA</text>
  </g>

  <!-- Right Floating Security & Escrow Card -->
  <g transform="translate(880, 240)">
    <rect width="240" height="260" rx="20" fill="url(#cardGrad)" stroke="#fbbf24" stroke-opacity="0.3" stroke-width="1.5"/>
    <rect x="24" y="24" width="48" height="48" rx="12" fill="#f59e0b" fill-opacity="0.2"/>
    <path d="M 48 38 L 48 54 M 40 46 L 56 46" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
    <text x="84" y="46" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="15">ESCROW VAULT</text>
    <text x="84" y="64" fill="#a8a29e" font-family="system-ui, sans-serif" font-size="12">Immutable Audit</text>

    <rect x="24" y="100" width="192" height="44" rx="10" fill="#000000" fill-opacity="0.4"/>
    <text x="38" y="126" fill="#fbbf24" font-family="monospace" font-size="12">SWIFT: ENDWKRSE</text>

    <rect x="24" y="160" width="192" height="64" rx="10" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.3"/>
    <text x="38" y="186" fill="#10b981" font-family="system-ui, sans-serif" font-weight="700" font-size="13">LOCKED FX GUARANTEE</text>
    <text x="38" y="206" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Zero mid-transaction slippage</text>
  </g>

  <!-- Bottom Vignette -->
  <rect y="700" width="1280" height="100" fill="url(#bgGlow)" opacity="0.6"/>
</svg>
`;

const connectbridgeSvg = `
<svg width="1280" height="800" viewBox="0 0 1280 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="apiGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#4c0519" stop-opacity="0.85"/>
      <stop offset="55%" stop-color="#18040a" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#050103" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="rubyGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e11d48"/>
      <stop offset="50%" stop-color="#f43f5e"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </linearGradient>
    <linearGradient id="fiberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#e11d48" stop-opacity="0.04"/>
    </linearGradient>
    <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="35" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1280" height="800" fill="url(#apiGlow)"/>

  <!-- High-Speed Fiber Optic Data Rails -->
  <g opacity="0.25">
    <path d="M 0 200 C 400 200, 500 400, 1280 400" stroke="#f43f5e" stroke-width="2" fill="none"/>
    <path d="M 0 260 C 420 260, 520 440, 1280 440" stroke="#e11d48" stroke-width="3" fill="none"/>
    <path d="M 0 320 C 440 320, 540 480, 1280 480" stroke="#fb7185" stroke-width="1.5" fill="none"/>
    <path d="M 0 600 C 600 600, 700 350, 1280 350" stroke="#f43f5e" stroke-width="2" fill="none"/>
    <path d="M 0 660 C 620 660, 720 390, 1280 390" stroke="#e11d48" stroke-width="2.5" fill="none"/>
  </g>

  <!-- Glowing Core Nexus -->
  <circle cx="640" cy="400" r="240" fill="#e11d48" opacity="0.2" filter="url(#redGlow)"/>
  <circle cx="300" cy="320" r="160" fill="#f43f5e" opacity="0.15" filter="url(#redGlow)"/>
  <circle cx="980" cy="450" r="180" fill="#be123c" opacity="0.18" filter="url(#redGlow)"/>

  <!-- Central API Gateway Server Rack Node -->
  <g transform="translate(360, 150)">
    <rect width="560" height="380" rx="24" fill="url(#fiberGlow)" stroke="#f43f5e" stroke-opacity="0.45" stroke-width="1.5"/>
    
    <rect x="24" y="24" width="512" height="64" rx="14" fill="#000000" fill-opacity="0.5"/>
    <text x="48" y="62" fill="#fb7185" font-family="monospace" font-weight="700" font-size="15" letter-spacing="2">CONNECTBRIDGE // REGISTRAR API GATEWAY</text>
    <circle cx="504" cy="56" r="6" fill="#10b981"/>

    <!-- Latency & Throughput Counter -->
    <g transform="translate(48, 120)">
      <text x="0" y="20" fill="#fda4af" font-family="system-ui, sans-serif" font-size="13" font-weight="600">P99 MEDIATION LATENCY</text>
      <text x="0" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="42">&lt; 45ms</text>

      <text x="280" y="20" fill="#fda4af" font-family="system-ui, sans-serif" font-size="13" font-weight="600">MONTHLY REQUESTS</text>
      <text x="280" y="65" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="42">1.2M+</text>
    </g>

    <!-- Circuit Server Nodes -->
    <g transform="translate(48, 230)">
      <rect width="144" height="96" rx="14" fill="#000000" fill-opacity="0.4" stroke="#f43f5e" stroke-opacity="0.3"/>
      <text x="20" y="38" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="14">Seoul SIS</text>
      <text x="20" y="64" fill="#10b981" font-family="monospace" font-size="12">● 200 OK</text>
      <text x="20" y="80" fill="#9ca3af" font-family="monospace" font-size="11">18ms sync</text>

      <rect x="164" width="144" height="96" rx="14" fill="#000000" fill-opacity="0.4" stroke="#f43f5e" stroke-opacity="0.3"/>
      <text x="184" y="38" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="14">Nordic Desk</text>
      <text x="184" y="64" fill="#10b981" font-family="monospace" font-size="12">● 200 OK</text>
      <text x="184" y="80" fill="#9ca3af" font-family="monospace" font-size="11">24ms sync</text>

      <rect x="328" width="144" height="96" rx="14" fill="#000000" fill-opacity="0.4" stroke="#f43f5e" stroke-opacity="0.3"/>
      <text x="348" y="38" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="14">Apostille API</text>
      <text x="348" y="64" fill="#10b981" font-family="monospace" font-size="12">● 200 OK</text>
      <text x="348" y="80" fill="#9ca3af" font-family="monospace" font-size="11">32ms verify</text>
    </g>
  </g>

  <!-- Left / Right Geometric Flanking Node Modules -->
  <g transform="translate(140, 240)">
    <rect width="180" height="260" rx="20" fill="url(#fiberGlow)" stroke="#f43f5e" stroke-opacity="0.35" stroke-width="1.5"/>
    <text x="24" y="44" fill="#fb7185" font-family="monospace" font-weight="700" font-size="13">PROTOCOL MESH</text>
    <rect x="24" y="65" width="132" height="34" rx="8" fill="#000000" fill-opacity="0.5"/>
    <text x="38" y="87" fill="#ffffff" font-family="monospace" font-size="12">GraphQL v2</text>
    <rect x="24" y="110" width="132" height="34" rx="8" fill="#000000" fill-opacity="0.5"/>
    <text x="38" y="132" fill="#ffffff" font-family="monospace" font-size="12">gRPC Event</text>
    <rect x="24" y="155" width="132" height="34" rx="8" fill="#000000" fill-opacity="0.5"/>
    <text x="38" y="177" fill="#ffffff" font-family="monospace" font-size="12">Kafka Queue</text>
    <rect x="24" y="200" width="132" height="34" rx="8" fill="#000000" fill-opacity="0.5"/>
    <text x="38" y="222" fill="#ffffff" font-family="monospace" font-size="12">OpenAPI 3.1</text>
  </g>

  <g transform="translate(960, 220)">
    <rect width="200" height="280" rx="20" fill="url(#fiberGlow)" stroke="#f43f5e" stroke-opacity="0.35" stroke-width="1.5"/>
    <text x="24" y="44" fill="#fb7185" font-family="monospace" font-weight="700" font-size="13">CIRCUIT RESILIENCE</text>
    <rect x="24" y="65" width="152" height="70" rx="10" fill="#000000" fill-opacity="0.4"/>
    <text x="38" y="92" fill="#10b981" font-family="system-ui, sans-serif" font-weight="700" font-size="14">Zero Rate Overflows</text>
    <text x="38" y="112" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="11">Adaptive Token Bucket</text>

    <rect x="24" y="150" width="152" height="96" rx="10" fill="#000000" fill-opacity="0.4"/>
    <text x="38" y="178" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="13">Biometric Vault</text>
    <text x="38" y="198" fill="#fb7185" font-family="monospace" font-size="11">SHA-256 Checksum</text>
    <text x="38" y="220" fill="#10b981" font-family="monospace" font-size="11">100% Verified</text>
  </g>
</svg>
`;

const launchmetricsSvg = `
<svg width="1280" height="800" viewBox="0 0 1280 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="biGlow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#3b0764" stop-opacity="0.85"/>
      <stop offset="55%" stop-color="#140224" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#05000a" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="violetCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="50%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="cockpitCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0.03"/>
    </linearGradient>
    <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="35" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1280" height="800" fill="url(#biGlow)"/>

  <!-- Radial Flight Trajectory Arcs on Dark Globe -->
  <g opacity="0.28" stroke="#a855f7" stroke-width="1.5" fill="none">
    <ellipse cx="640" cy="520" rx="420" ry="240"/>
    <ellipse cx="640" cy="520" rx="300" ry="170"/>
    <ellipse cx="640" cy="520" rx="180" ry="100"/>
    <path d="M 320 500 Q 640 220 960 500" stroke="#06b6d4" stroke-width="2.5" stroke-dasharray="6 6"/>
    <path d="M 400 520 Q 640 280 880 520" stroke="#c084fc" stroke-width="2"/>
  </g>

  <!-- Ambient Glowing Orbs -->
  <circle cx="640" cy="360" r="240" fill="#7c3aed" opacity="0.22" filter="url(#purpleGlow)"/>
  <circle cx="920" cy="300" r="160" fill="#06b6d4" opacity="0.16" filter="url(#purpleGlow)"/>

  <!-- Main Cockpit Console -->
  <g transform="translate(340, 140)">
    <rect width="600" height="400" rx="26" fill="url(#cockpitCard)" stroke="#a855f7" stroke-opacity="0.45" stroke-width="1.5"/>
    
    <rect x="24" y="24" width="552" height="64" rx="14" fill="#000000" fill-opacity="0.5"/>
    <text x="48" y="62" fill="#c084fc" font-family="monospace" font-weight="700" font-size="15" letter-spacing="2">LAUNCHMETRICS // EXECUTIVE ADMISSIONS BI</text>
    <circle cx="544" cy="56" r="6" fill="#06b6d4"/>

    <!-- Key Metrics Ribbon inside console -->
    <g transform="translate(48, 120)">
      <rect width="240" height="90" rx="14" fill="#000000" fill-opacity="0.4" stroke="#a855f7" stroke-opacity="0.25"/>
      <text x="20" y="32" fill="#d8b4fe" font-family="system-ui, sans-serif" font-size="12" font-weight="600">PREDICTIVE INTAKE YIELD</text>
      <text x="20" y="70" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="34">+32.4%</text>

      <rect x="264" width="240" height="90" rx="14" fill="#000000" fill-opacity="0.4" stroke="#06b6d4" stroke-opacity="0.25"/>
      <text x="284" y="32" fill="#67e8f9" font-family="system-ui, sans-serif" font-size="12" font-weight="600">REAL-TIME PIPELINE FRESHNESS</text>
      <text x="284" y="70" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="34">&lt; 30s</text>
    </g>

    <!-- Interactive Funnel Visualization -->
    <g transform="translate(48, 240)">
      <!-- Step 1 -->
      <rect width="110" height="110" rx="12" fill="#7c3aed" fill-opacity="0.2" stroke="#a855f7" stroke-opacity="0.4"/>
      <text x="16" y="36" fill="#c084fc" font-family="monospace" font-size="11">INQUIRIES</text>
      <text x="16" y="68" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="20">100K+</text>
      <text x="16" y="92" fill="#10b981" font-family="system-ui, sans-serif" font-size="11">100% Ingested</text>

      <!-- Step 2 -->
      <rect x="130" width="110" height="110" rx="12" fill="#7c3aed" fill-opacity="0.25" stroke="#a855f7" stroke-opacity="0.45"/>
      <text x="146" y="36" fill="#c084fc" font-family="monospace" font-size="11">QUALIFIED</text>
      <text x="146" y="68" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="20">34.2K</text>
      <text x="146" y="92" fill="#06b6d4" font-family="system-ui, sans-serif" font-size="11">UniMatch AI</text>

      <!-- Step 3 -->
      <rect x="260" width="110" height="110" rx="12" fill="#7c3aed" fill-opacity="0.3" stroke="#a855f7" stroke-opacity="0.5"/>
      <text x="276" y="36" fill="#c084fc" font-family="monospace" font-size="11">OFFER LETTERS</text>
      <text x="276" y="68" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="20">12.8K</text>
      <text x="276" y="92" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11">42% Higher</text>

      <!-- Step 4 -->
      <rect x="390" width="114" height="110" rx="12" fill="#06b6d4" fill-opacity="0.25" stroke="#06b6d4" stroke-opacity="0.6"/>
      <text x="406" y="36" fill="#67e8f9" font-family="monospace" font-size="11">VISA CLEARED</text>
      <text x="406" y="68" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="20">5,000+</text>
      <text x="406" y="92" fill="#10b981" font-family="system-ui, sans-serif" font-size="11">99.98% SLA</text>
    </g>
  </g>

  <!-- Left / Right Holographic Floating Cards -->
  <g transform="translate(130, 220)">
    <rect width="180" height="260" rx="20" fill="url(#cockpitCard)" stroke="#a855f7" stroke-opacity="0.35" stroke-width="1.5"/>
    <text x="24" y="44" fill="#c084fc" font-family="monospace" font-weight="700" font-size="13">TERRITORIES</text>
    <rect x="24" y="65" width="132" height="36" rx="8" fill="#000000" fill-opacity="0.4"/>
    <text x="38" y="88" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12">🇰🇷 Seoul HQ</text>
    <rect x="24" y="110" width="132" height="36" rx="8" fill="#000000" fill-opacity="0.4"/>
    <text x="38" y="133" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12">🇫🇮 Helsinki Desk</text>
    <rect x="24" y="155" width="132" height="36" rx="8" fill="#000000" fill-opacity="0.4"/>
    <text x="38" y="178" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12">🇧🇩 Dhaka Ops</text>
    <rect x="24" y="200" width="132" height="36" rx="8" fill="#000000" fill-opacity="0.4"/>
    <text x="38" y="223" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12">🇪🇺 EU Clearing</text>
  </g>

  <g transform="translate(970, 230)">
    <rect width="190" height="260" rx="20" fill="url(#cockpitCard)" stroke="#06b6d4" stroke-opacity="0.35" stroke-width="1.5"/>
    <text x="24" y="44" fill="#67e8f9" font-family="monospace" font-weight="700" font-size="13">EXECUTIVE BRIEF</text>
    <rect x="24" y="65" width="142" height="74" rx="10" fill="#000000" fill-opacity="0.4"/>
    <text x="36" y="92" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="13">Auto-PDF Dispatch</text>
    <text x="36" y="112" fill="#c084fc" font-family="system-ui, sans-serif" font-size="11">Every Mon 08:00 KST</text>

    <rect x="24" y="150" width="142" height="80" rx="10" fill="#000000" fill-opacity="0.4"/>
    <text x="36" y="176" fill="#06b6d4" font-family="system-ui, sans-serif" font-weight="700" font-size="13">C-Suite Rating</text>
    <text x="36" y="202" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="22">4.8 / 5.0</text>
  </g>
</svg>
`;

async function renderImages() {
  await sharp(Buffer.from(fintechSvg))
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'fintech-gateway.png'));
  console.log('Generated fintech-gateway.png');

  await sharp(Buffer.from(connectbridgeSvg))
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'connectbridge-api.png'));
  console.log('Generated connectbridge-api.png');

  await sharp(Buffer.from(launchmetricsSvg))
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'launchmetrics-bi.png'));
  console.log('Generated launchmetrics-bi.png');
}

renderImages().catch(err => {
  console.error(err);
  process.exit(1);
});
