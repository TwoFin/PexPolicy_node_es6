//app.js
import * as http from "http"
import * as url from "url"
import PexPolicy from "./pexpolicy.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

    const pathname = url.parse(req.url).pathname;
    const query = url.parse(req.url, true).query;
    console.log("Path: ", pathname);

    // Check there is query params
    if (Object.keys(query).length === 0) {
        console.log("No request params, returning 400");
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "No query params" }));
    }
    
    else {
        // policy service/configuration request
        if (pathname === "/policy/v1/service/configuration" && req.method === "GET"){
            const pol_response = await new PexPolicy().service_config(query)
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(pol_response));
        }
        // policy participant/properties
        else if (pathname === "/policy/v1/participant/properties"){
            const pol_response = await new PexPolicy().participant_prop(query)
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(pol_response));
        }        
        // Invalid path
        else {
            console.log("Invalid path: " + pathname);
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Not found" }));
        }
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});