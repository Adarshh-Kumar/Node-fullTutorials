const http = require('http'); //lets node act as a web server
const fs = require('fs');  //file system module to read and write with files
const url=require('url');  //Parses URLs into pathname + query parameters

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
             return res.end();
        }
        const log = `${Date.now()}: ${req.url}: New Request \n`;
        const myUrl = url.parse(req.url, true);
        console.log(myUrl);

       fs.appendFile("log.txt", log, (err) => {
    if (err) {
        console.log("Error writing log:", err);
    }

        switch(myUrl.pathname){
            case '/': res.end("Home Page");
            break;
            case '/about': 
            const username=myUrl.query.myname;
            res.end(`hi,my name is ${username}`);
            break;
            case '/search': 
            const search=myUrl.query.search_query;
            res.end(`You searched for ${search}`);
            break;
            default: res.end("404 Not Found");
        }
            
        });
});


server.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
