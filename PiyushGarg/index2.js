const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    

        const log = `${Date.now()}: ${req.url}: New Request \n`;

        fs.appendFile("log.txt", log, (err,data) => {
        switch(req.url){
            case '/': res.end("Home Page");
            break;
            case '/about': res.end("About Page");
            break;
            default: res.end("404 Not Found");
        }
            
        });
});

server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
