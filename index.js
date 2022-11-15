const http = require("http");
const fs = require("fs");

let args = require("minimist")(process.argv.slice(2), {
    alias: {
        p: "port"
    },
    default: {
        port: 5000,
    },
});

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let scriptjsContent = "";
let stylecssContent = "";

fs.readFile("home.html", (err, home) => {
    if (err) {
        throw err;
    }
    homeContent = home;
});

fs.readFile("project.html", (err, project) => {
    if (err) {
        throw err;
    }
    projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (err) {
        throw err;
    }
    registrationContent = registration;
});

fs.readFile("script.js", (err, scriptjs) => {
    if (err) {
        throw err;
    }
    scriptjsContent = scriptjs;
});

fs.readFile("style.css", (err, stylecss) => {
    if (err) {
        throw err;

    }
    stylecssContent = stylecss;
});


http
    .createServer((request, response) => {
        let url = request.url;
        response.writeHeader(200, { "Content-Type": "text/html" });
        switch (url) {
            case "/project":
                response.write(projectContent);
                response.end();
                break;
            case "/registration":
                response.write(registrationContent);
                response.end();
                break;
            case "/script.js":
                response.writeHeader(200, { "Content-Type": "text/javascript" });
                response.write(scriptjsContent);
                response.end();
                break;
            case "/style.css":
                response.writeHeader(200, { "Content-Type": "text/css" });
                response.write(stylecssContent);
                response.end();
                break;
            case "/profile.png":
                response.writeHeader(200, { "Content-Type": "image/png" });
                response.write(fs.readFileSync("profile.png"));
                response.end();
                break;
            default:
                response.write(homeContent);
                response.end();
                break;
        }
    })
    .listen(parseInt(args.port));
