const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {

        const log = `${Date.now()}: New Request \n`;

        fs.appendFile("log.txt", log, (err,data) => {
            console.log("Request Received");
            res.end('Hello From Server');
            
        });

    } else {
        res.end('404 Not Found');
    }
});

server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
