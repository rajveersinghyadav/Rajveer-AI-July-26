// --- AI AUTONOMOUS BRAIN & MEMORY CORE ---

const defaultKnowledge = [
    { title: "Accumulation, Manipulation & Distribution (AMD)", timeframe: "15m / 1H", winrate: "94.5%", desc: "Identifies smart money trap before expansion. Look for Asian range sweep followed by true institutional push." },
    { title: "Bullish / Bearish Order Block (OB)", timeframe: "5m / 15m / 1H", winrate: "91.2%", desc: "Last opposing candle before a strong impulsive move. High probability re-test zone." },
    { title: "Fair Value Gap (FVG) / Imbalance", timeframe: "1m / 5m / 15m", winrate: "89.8%", desc: "Inefficiency in price delivery where price tends to return to fill the gap before continuation." },
    { title: "Morning Star / Evening Star Reversal", timeframe: "1H / 4H", winrate: "88.4%", desc: "Three-candle high probability reversal pattern signaling trend exhaustion and directional shift." }
];

function loadKnowledgeData() {
    const grid = document.getElementById('knowledgeGrid');
    if (!grid) return;

    grid.innerHTML = defaultKnowledge.map(k => `
        <div class="neon-card p-5 rounded-2xl space-y-3">
            <div class="flex justify-between items-start">
                <h3 class="font-bold text-slate-100 text-base">${k.title}</h3>
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">${k.winrate} Winrate</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">${k.desc}</p>
            <div class="flex items-center space-x-2 pt-2 border-t border-slate-800/80 text-xs text-cyan-400 font-medium">
                <i class="fa-solid fa-clock"></i>
                <span>Optimized Timeframe: ${k.timeframe}</span>
            </div>
        </div>
    `).join('');
}

// --- GEMINI SERVER-CONNECTED CHAT & BRAIN ---
async function sendChatMessageToGemini(userMessage) {
    try {
        const response = await fetch('/api/trading-brain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userMessage })
        });
        const data = await response.json();
        if (data.success) {
            return data.reply;
        } else {
            return "Error from Brain Server: " + data.error;
        }
    } catch (err) {
        return "Network Error: Unable to connect to iPhone Server.";
    }
}

function getStoredMemory() {
    const saved = localStorage.getItem('apex_ai_custom_memory');
    return saved ? JSON.parse(saved) : [
        { topic: "Initial Core Setup", date: "System Genesis", content: "Prioritize strict risk management and high-probability market structure breaks." }
    ];
}

function saveMemoryToStorage(memoryArray) {
    localStorage.setItem('apex_ai_custom_memory', JSON.stringify(memoryArray));
    updateMemoryCounter();
}

function updateMemoryCounter() {
    const memory = getStoredMemory();
    const counter = document.getElementById('memoryCount');
    if (counter) {
        counter.innerText = `${memory.length} Rules Saved`;
    }
}

function loadMemoryLogs() {
    const logsContainer = document.getElementById('learnedLogs');
    if (!logsContainer) return;

    const memory = getStoredMemory();
    logsContainer.innerHTML = memory.map((item, index) => `
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
            <div class="flex justify-between items-center text-xs">
                <span class="font-bold text-cyan-400">#${index + 1} - ${item.topic}</span>
                <span class="text-slate-500">${item.date}</span>
            </div>
            <p class="text-xs text-slate-300">${item.content}</p>
        </div>
    `).reverse().join('');
}

function exportMemoryJSON() {
    const memory = getStoredMemory();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(memory, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "apex_ai_brain_memory_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

window.addEventListener('DOMContentLoaded', () => {
    updateMemoryCounter();
});
