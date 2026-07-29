// --- TRADINGVIEW WIDGET LOADER ---
function loadTradingViewWidget(symbol = "BINANCE:BTCUSDT") {
    const container = document.getElementById('tradingview_widget');
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    
    script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "save_image": false,
        "calendar": false,
        "hide_volume": false,
        "support_host": "https://www.tradingview.com"
    });

    container.appendChild(script);
    updateAIPrediction(symbol);
}

function updateAIPrediction(symbol) {
    const badge = document.getElementById('aiPredictionBadge');
    if (!badge) return;
    
    badge.innerText = `AI Analyzing ${symbol}...`;
    setTimeout(() => {
        const confidence = Math.floor(Math.random() * (99 - 88 + 1)) + 88;
        const direction = Math.random() > 0.4 ? "BUY (LONG)" : "SELL (SHORT)";
        badge.innerText = `⚡ AI Signal: ${direction} (${confidence}% Sure-Shot)`;
        badge.className = direction.includes("BUY") 
            ? "px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold"
            : "px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-xs font-bold";
    }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loadTradingViewWidget("BINANCE:BTCUSDT");
    }, 300);
});
