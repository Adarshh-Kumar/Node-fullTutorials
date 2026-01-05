const express = require('express');
const app = express();

app.use(express.static('public'));

// ⏱️ Time tracking middleware
app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${duration} ms`);
    });

    next();
});

// API for frontend
app.get('/time', (req, res) => {
    const start = Date.now();

    setTimeout(() => {
        const duration = Date.now() - start;
        res.json({ timeTaken: duration });
    }, 300); // simulate processing
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
