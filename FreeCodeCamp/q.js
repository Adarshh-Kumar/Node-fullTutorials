const express = require('express');

const app = express();

// Middleware to track request time
app.use((req, res, next) => {
    req.startTime = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - req.startTime;
        const requestLog = {
            method: req.method,
            url: req.url,
            duration: duration + 'ms',
            timestamp: new Date().toISOString()
        };
        
        // Store in global array
        if (!global.requestLogs) {
            global.requestLogs = [];
        }
        global.requestLogs.push(requestLog);
    });
    
    next();
});

// Route to display all tracked requests
app.get('/stats', (req, res) => {
    const logs = global.requestLogs || [];
    let html = '<h1>Request Statistics</h1><table border="1" style="border-collapse:collapse; padding:10px;">';
    html += '<tr><th>Method</th><th>URL</th><th>Duration</th><th>Timestamp</th></tr>';
    
    logs.forEach(log => {
        html += `<tr><td>${log.method}</td><td>${log.url}</td><td>${log.duration}</td><td>${log.timestamp}</td></tr>`;
    });
    
    html += '</table><br><a href="/">Back</a>';
    res.send(html);
});

// Sample route
app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><a href="/stats">View Statistics</a>');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});