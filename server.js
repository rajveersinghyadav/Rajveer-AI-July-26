const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Apni Gemini API key yahan dalein ya Environment Variable set karein
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "APKI_GEMINI_API_KEY_YAHAN_DAALEIN";
const MEMORY_FILE = path.join(__dirname, 'trading_memory.json');

function loadMemory() {
    if (fs.existsSync(MEMORY_FILE)) {
        try { return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf8')); } catch(e) { return []; }
    }
    return [];
}

function saveMemory(memory) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    // Gemini API & Autonomous Trading Brain Endpoint
    if (req.url === '/api/trading-brain' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { prompt } = JSON.parse(body);
                let memory = loadMemory();

                const systemInstruction = "You are Rajveer's 24x7 Autonomous AI Trading Agent Brain. You deeply master Candlestick Patterns, Buyer/Seller Volume dynamics, Market Trends, Order Blocks, FVG, and AMD algorithms. Your ultimate goal is 100% precision targets. Always remember and build upon past learned concepts.";

                const contents = [
                    { role: "user", parts: [{ text: systemInstruction }] },
                    ...memory,
                    { role: "user", parts: [{ text: prompt }] }
                ];

                const postData = JSON.stringify({ contents });

                const options = {
                    hostname: 'generativelanguage.googleapis.com',
                    path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };

                const apiReq = https.request(options, (apiRes) => {
                    let responseData = '';
                    apiRes.on('data', chunk => responseData += chunk);
                    apiRes.on('end', () => {
                        try {
                            const result = JSON.parse(responseData);
                            const reply = result.candidates[0].content.parts[0].text;

                            memory.push({ role: "user", parts: [{ text: prompt }] });
                            memory.push({ role: "model", parts: [{ text: reply }] });
                            saveMemory(memory);

                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: true, reply }));
                        } catch(e) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, error: "Gemini API Parse Error" }));
                        }
                    });
                });

                apiReq.on('error', err => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: err.message }));
                });

                apiReq.write(postData);
                apiReq.end();
            } catch(e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: "Invalid Request Payload" }));
            }
        });
        return;
    }

    // Static Asset & Frontend File Serving (index.html, js, css)
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.js') contentType = 'text/javascript';
    else if (extname === '.css') contentType = 'text/css';
    else if (extname === '.json') contentType = 'application/json';
    else if (extname === '.png') contentType = 'image/png';
    else if (extname === '.jpg') contentType = 'image/jpeg';

    fs.readFile(filePath, (extErr, content) => {
        if (extErr) {
            fs.readFile(path.join(__dirname, 'index.html'), (homeErr, homeContent) => {
                if (homeErr) { res.writeHead(404); res.end('Not Found'); }
                else { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(homeContent); }
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(8080, () => {
    console.log('🚀 Apex AI Trading Server running on port 8080...');
});
