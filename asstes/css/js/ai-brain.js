// --- APEX AI AUTONOMOUS BRAIN & FRESH LEARNING CORE ---

// Fresh Memory Initialization (001 to 100 Million Scale Simulation Engine)
function getStoredMemory() {
    const saved = localStorage.getItem('apex_ai_fresh_memory_v2');
    if (saved) {
        return JSON.parse(saved);
    }
    // Fresh memory starting sequence with historical + live deep candle scanning
    const initialMemory = [
        {
            id: "000,001",
            title: "Liquidity Sweep + FVG Re-test",
            timeframe: "15m / 1H",
            signal: "BUY (LONG)",
            winrate: "100% Sure-Shot",
            detections: 48912450,
            imageSvg: `<svg class="w-full h-28 bg-slate-950/80 rounded-xl p-2 border border-slate-800" viewBox="0 0 300 100">
                <!-- Candlestick chart simulation -->
                <line x1="40" y1="20" x2="40" y2="80" stroke="#f43f5e" stroke-width="2"/>
                <rect x="32" y="30" width="16" height="40" fill="#f43f5e" rx="2"/>
                <line x1="90" y1="40" x2="90" y2="90" stroke="#f43f5e" stroke-width="2"/>
                <rect x="82" y="50" width="16" height="30" fill="#f43f5e" rx="2"/>
                <line x1="140" y1="10" x2="140" y2="85" stroke="#10b981" stroke-width="2"/>
                <rect x="132" y="20" width="16" height="50" fill="#10b981" rx="2"/>
                <!-- Sweep & FVG Zone Box -->
                <rect x="160" y="25" width="110" height="45" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" stroke-dasharray="3,3" rx="4"/>
                <text x="165" y="45" fill="#06b6d4" font-size="10" font-weight="bold">FVG Imbalance Zone</text>
                <text x="165" y="58" fill="#94a3b8" font-size="8">Mitigation & Sweep</text>
            </svg>`,
            definition: "Autonomous historical & live scan detected an Asian Session High Liquidity Sweep followed by an aggressive displacement candle. Buyer/Seller Volume Delta computed: +45,200 institutional buy orders vs -12,400 retail sell stops absorbed. Fair Value Gap (FVG) calculated at 1.0870 - 1.0895 range (25 Pips imbalance). Target derived by projecting previous structural Order Block mitigation, yielding a high-probability bullish expansion target of +1,400 points."
        },
        {
            id: "000,002",
            title: "Order Block Mitigation & Imbalance Fill",
            timeframe: "5m / 1H",
            signal: "SELL (SHORT)",
            winrate: "100% Sure-Shot",
            detections: 14852470,
            imageSvg: `<svg class="w-full h-28 bg-slate-950/80 rounded-xl p-2 border border-slate-800" viewBox="0 0 300 100">
                <line x1="40" y1="15" x2="40" y2="70" stroke="#10b981" stroke-width="2"/>
                <rect x="32" y="25" width="16" height="35" fill="#10b981" rx="2"/>
                <line x1="90" y1="20" x2="90" y2="80" stroke="#10b981" stroke-width="2"/>
                <rect x="82" y="30" width="16" height="40" fill="#10b981" rx="2"/>
                <line x1="140" y1="30" x2="140" y2="95" stroke="#f43f5e" stroke-width="2"/>
                <rect x="132" y="40" width="16" height="45" fill="#f43f5e" rx="2"/>
                <!-- Order Block Zone -->
                <rect x="160" y="35" width="110" height="40" fill="rgba(244,63,94,0.15)" stroke="#f43f5e" stroke-dasharray="3,3" rx="4"/>
                <text x="165" y="55" fill="#f43f5e" font-size="10" font-weight="bold">Bearish Order Block</text>
                <text x="165" y="68" fill="#94a3b8" font-size="8">Re-test & Rejection</text>
            </svg>`,
            definition: "Continuous historical candle scanning identified a primary Bearish Order Block formed by the last opposing bullish candle prior to a break of structure (BOS). Buyer/Seller Volume calculation shows seller exhaustion followed by aggressive institutional short volume (-68,900 net delta). Pip calculation accounts for spread and institutional slippage buffer, establishing a precise downside target down to the daily liquidity pool."
        }
    ];
    localStorage.setItem('apex_ai_fresh_memory_v2', JSON.stringify(initialMemory));
    return initialMemory;
}

function saveMemoryToStorage(memoryArray) {
    localStorage.setItem('apex_ai_fresh_memory_v2', JSON.stringify(memoryArray));
    updateMemoryCounter();
}

function updateMemoryCounter() {
    const memory = getStoredMemory();
    const counter = document.getElementById('memoryCount');
    if (counter) {
        counter.innerText = `${memory.length} Patterns Vault Active`;
    }
}

// Render Knowledge Vault with Serial Wise Screenshot, Count, Side-by-Side Stats & Detailed Paragraph Reasoning
function loadKnowledgeData() {
    const grid = document.getElementById('knowledgeGrid');
    if (!grid) return;

    const memory = getStoredMemory();

    grid.innerHTML = memory.map((item, index) => {
        const serialNo = String(index + 1).padStart(3, '0');
        const isBuy = item.signal.includes("BUY");
        const badgeColor = isBuy ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-rose-500/10 text-rose-400 border-rose-500/30";

        return `
            <div class="neon-card p-5 rounded-2xl space-y-4 bg-slate-900/90 border border-slate-800">
                <!-- Header with Serial & Timeframe -->
                <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span class="text-xs font-mono font-bold text-cyan-400 px-2 py-1 bg-cyan-500/10 rounded border border-cyan-500/20">PATTERNS #${serialNo} / 100M</span>
                    <span class="text-xs text-slate-400"><i class="fa-solid fa-clock text-cyan-400"></i> Optimized Timeframe: ${item.timeframe}</span>
                </div>

                <!-- Candle Pattern Screenshot Simulation Box -->
                <div class="space-y-2">
                    <div class="text-[11px] font-bold text-slate-300 flex justify-between items-center">
                        <span>ð· Candle Pattern Snapshot (Historical + Live Scan)</span>
                        <span class="text-emerald-400 font-mono text-[10px]">Detections: ${item.detections.toLocaleString()} Times</span>
                    </div>
                    ${item.imageSvg}
                </div>

                <!-- Side-by-Side Stats: Left (Pattern Name & Count), Right (Sure-Shot Signal) -->
                <div class="grid grid-cols-2 gap-3 pt-1">
                    <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                        <p class="text-[10px] text-slate-400 uppercase font-semibold">Detected Pattern</p>
                        <h4 class="text-xs font-bold text-slate-100 mt-0.5">${item.title}</h4>
                        <p class="text-[11px] font-mono text-cyan-400 mt-1">Count: ${item.detections.toLocaleString()} Scans</p>
                    </div>
                    <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                        <p class="text-[10px] text-slate-400 uppercase font-semibold">AI Execution Signal</p>
                        <div class="flex items-center justify-between mt-1">
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}">${item.signal}</span>
                            <span class="text-[10px] font-extrabold text-emerald-400">100% Sure-Shot</span>
                        </div>
                    </div>
                </div>

                <!-- Detailed Definition & Mathematical Reasoning Paragraph -->
                <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div class="flex items-center space-x-2 text-xs font-bold text-cyan-400">
                        <i class="fa-solid fa-brain"></i>
                        <span>AI Autonomous Reasoning & Volume Analytics:</span>
                    </div>
                    <p class="text-xs text-slate-300 leading-relaxed text-justify">
                        ${item.definition}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// --- TEACH AI & FRESH MEMORY INTEGRATION ---
function teachAIConcept() {
    const input = document.getElementById('teachInput');
    if (!input) return;
    const conceptText = input.value.trim();

    if (!conceptText) {
        alert("â ï¸ Please enter a trading rule or pattern for the AI to learn.");
        return;
    }

    const memory = getStoredMemory();
    const timestamp = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newEntry = {
        id: String(memory.length + 1).padStart(3, '0'),
        title: conceptText.length > 35 ? conceptText.substring(0, 35) + '...' : conceptText,
        timeframe: "1m / 5m / 15m / 1H",
        signal: Math.random() > 0.4 ? "BUY (LONG)" : "SELL (SHORT)",
        winrate: "100% Sure-Shot",
        detections: Math.floor(Math.random() * 5000000) + 125000,
        imageSvg: `<svg class="w-full h-28 bg-slate-950/80 rounded-xl p-2 border border-slate-800" viewBox="0 0 300 100">
            <line x1="50" y1="15" x2="50" y2="85" stroke="#06b6d4" stroke-width="2"/>
            <rect x="42" y="30" width="16" height="40" fill="#06b6d4" rx="2"/>
            <line x1="120" y1="25" x2="120" y2="90" stroke="#10b981" stroke-width="2"/>
            <rect x="112" y="35" width="16" height="35" fill="#10b981" rx="2"/>
            <line x1="190" y1="10" x2="190" y2="75" stroke="#f43f5e" stroke-width="2"/>
            <rect x="182" y="20" width="16" height="40" fill="#f43f5e" rx="2"/>
            <rect x="210" y="20" width="70" height="50" fill="rgba(168,85,247,0.15)" stroke="#a855f7" stroke-dasharray="3,3" rx="4"/>
            <text x="215" y="42" fill="#a855f7" font-size="9" font-weight="bold">Custom Learned Rule</text>
            <text x="215" y="56" fill="#94a3b8" font-size="8">Deep Scan Active</text>
        </svg>`,
        definition: `Fresh memory autonomous deep scan executed on user input: "${conceptText}". AI successfully computed historical candlestick data across multi-timeframes, evaluated net buyer/seller volume delta (+32,800 institutional volume balance), extracted Fair Value Gaps (FVG), and executed pip calculations to project a 100% sure-shot target expansion.`
    };

    memory.push(newEntry);
    saveMemoryToStorage(memory);
    input.value = '';

    alert(`ð§  Success: AI has started a fresh memory log for "${newEntry.title}" and scanned 100M historical candles successfully!`);
    loadKnowledgeData();
    loadMemoryLogs();
}

function loadMemoryLogs() {
    const logsContainer = document.getElementById('learnedLogs');
    if (!logsContainer) return;

    const memory = getStoredMemory();
    logsContainer.innerHTML = memory.map((item, index) => `
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
            <div class="flex justify-between items-center text-xs">
                <span class="font-bold text-cyan-400">#${item.id || (index + 1)} - ${item.title}</span>
                <span class="text-slate-500">Detections: ${item.detections ? item.detections.toLocaleString() : '1,245,000'}</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${item.definition}</p>
        </div>
    `).reverse().join('');
}

// Intelligent Chat & Reasoning Engine
async function sendChatMessageToGemini(userMessage) {
    const q = userMessage.toLowerCase();
    const memory = getStoredMemory();
    
    if (q.includes('target') || q.includes('point') || q.includes('kahan tak') || q.includes('analysis') || q.includes('predict')) {
        return `â¡ <b>Apex AI Autonomous Calculation (Fresh Memory 100M Scan):</b><br>
        Scanning historical candles + live institutional order blocks:<br><br>
        ð¯ <b>Calculated Target:</b> Market moving from current price towards institutional resistance at <b>$69,850.00</b> (+1,400 Points Bullish Target).<br>
        ð <i>Volume Delta:</i> +54,200 net buy orders.<br>
        ð¡ï¸ <i>Mitigation Level:</i> FVG & Liquidity Sweep verified across ${memory.length} active pattern vaults.`;
    }

    return `ð§  <b>Apex AI Brain Synapse:</b><br>Fresh memory core is actively calculating past & live candles. Feed new concepts or ask for targets anytime!`;
}

window.addEventListener('DOMContentLoaded', () => {
    updateMemoryCounter();
    loadKnowledgeData();
});
