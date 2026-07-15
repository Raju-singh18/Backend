
const http = require("http");
const path = require("path");
const server = http.createServer((req, res)=>{
    if(req.url==="/"){
        res.setHeader('Content-Type',"text/html");
        res.write("<h1>Welcome to nodejs learning</h1>");
        res.end();
    }
    if(req.url === "/about"){
     res.setHeader('Content-Type',"text/html");
     res.write("<h2>i am a web Develpoer<h2/>")
     res.end();   
    }
    
});
const url = path.join(__dirname,"app.js");
console.log(url);
const port = 5000;
server.listen(port,()=>{
    console.log(`Server is listening at port: ${port}`);
})

