function switchTab(tabId) {
    document.getElementById('tabQuotes').classList.add('hidden');
    document.getElementById('tabCharts').classList.add('hidden');
    document.getElementById('tabKnowledge').classList.add('hidden');
    document.getElementById('tabTeach').classList.add('hidden');

    // Reset styles for desktop & mobile
    ['Quotes', 'Charts', 'Knowledge', 'Teach'].forEach(name => {
        const deskBtn = document.getElementById(`nav${name}Desk`);
        const mobBtn = document.getElementById(`nav${name}Mob`);
        if (deskBtn) {
            deskBtn.classList.remove('bg-cyan-500/10', 'text-cyan-400');
            deskBtn.classList.add('text-slate-400', 'hover:bg-slate-800/50', 'hover:text-slate-200');
        }
        if (mobBtn) {
            mobBtn.classList.remove('text-cyan-400');
            mobBtn.classList.add('text-slate-400');
        }
    });

    // Activate selected tab
    document.getElementById(`tab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`).classList.remove('hidden');
    
    const activeDesk = document.getElementById(`nav${tabId.charAt(0).toUpperCase() + tabId.slice(1)}Desk`);
    const activeMob = document.getElementById(`nav${tabId.charAt(0).toUpperCase() + tabId.slice(1)}Mob`);
    
    if (activeDesk) {
        activeDesk.classList.remove('text-slate-400', 'hover:bg-slate-800/50', 'hover:text-slate-200');
        activeDesk.classList.add('bg-cyan-500/10', 'text-cyan-400');
    }
    if (activeMob) {
        activeMob.classList.remove('text-slate-400');
        activeMob.classList.add('text-cyan-400');
    }

    if (tabId === 'charts') {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    } else if (tabId === 'knowledge') {
        if (typeof loadKnowledgeData === 'function') loadKnowledgeData();
    } else if (tabId === 'teach') {
        if (typeof loadMemoryLogs === 'function') loadMemoryLogs();
    }
}

const marketAssets = [
    { symbol: "BINANCE:BTCUSDT", name: "Bitcoin", type: "Crypto", price: "$68,450.00", change: "+3.45%", bullish: true },
    { symbol: "BINANCE:ETHUSDT", name: "Ethereum", type: "Crypto", price: "$3,520.10", change: "+2.12%", bullish: true },
    { symbol: "BINANCE:SOLUSDT", name: "Solana", type: "Crypto", price: "$145.80", change: "-0.85%", bullish: false },
    { symbol: "FX:EURUSD", name: "EUR/USD", type: "Forex", price: "1.0872", change: "+0.15%", bullish: true },
    { symbol: "FX:GBPUSD", name: "GBP/USD", type: "Forex", price: "1.2740", change: "-0.22%", bullish: false },
    { symbol: "FX:USDJPY", name: "USD/JPY", type: "Forex", price: "155.60", change: "+0.40%", bullish: true }
];

function renderQuotes() {
    const grid = document.getElementById('assetGrid');
    if (!grid) return;
    
    grid.innerHTML = marketAssets.map(asset => `
        <div class="neon-card p-4 rounded-2xl flex flex-col justify-between space-y-3 cursor-pointer bg-slate-900/80 border border-slate-800" onclick="openAssetChart('${asset.symbol}', '${asset.name}')">
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">${asset.type}</span>
                    <h3 class="text-sm font-bold text-slate-100 mt-1">${asset.name}</h3>
                    <p class="text-[10px] text-slate-400">${asset.symbol}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs font-bold text-slate-100">${asset.price}</p>
                    <p class="text-[10px] font-semibold ${asset.bullish ? 'text-emerald-400' : 'text-rose-400'}">${asset.change}</p>
                </div>
            </div>
            <button class="w-full py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg text-[11px] font-bold">
                Open Chart & AI Analysis
            </button>
        </div>
    `).join('');
}

function openAssetChart(symbol, name) {
    switchTab('charts');
    document.getElementById('currentChartTitle').innerText = `${name} (${symbol})`;
    if (typeof loadTradingViewWidget === 'function') {
        loadTradingViewWidget(symbol);
    }
}

function initFlameCanvas() {
    const canvas = document.getElementById('flameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let step = 0;
    function drawWaves() {
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1.5;
        for (let j = 0; j < 3; j++) {
            ctx.beginPath();
            ctx.strokeStyle = j === 0 ? 'rgba(6, 182, 212, 0.25)' : (j === 1 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(168, 85, 247, 0.15)');
            for (let x = 0; x < width; x += 10) {
                let y = height * 0.5 + Math.sin((x + step + j * 100) * 0.005) * 60 + Math.cos((x - step) * 0.01) * 30;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        step += 1.5;
        requestAnimationFrame(drawWaves);
    }
    drawWaves();
}

window.addEventListener('DOMContentLoaded', () => {
    renderQuotes();
    initFlameCanvas();
});
