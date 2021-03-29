// Webserver v1
var express = require('express');
var fs = require("fs");
var specialPages = require("./special_pages_301_and_404");
var cache = require("./cache");

var doT = require("dot");
var app = express.createServer(); // Can put in express.logger("tiny") or express.logger() if you want debugging

app.set("view engine", "html");
app.register('.html', doT);
app.set('views', __dirname + '/views');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

app.use(function(req, res, next) {
    try {
        var originalHost = req.headers.host;
        
        if(originalHost != null) {
            var namePart = originalHost.split(":", 1)[0].toLowerCase();
            
            if(namePart == "quickschools.com") {
                var url = req.protocol + "://www.quickschools.com" + req.url;
                console.log("Redirecting: " + url);
                
                res.header('Location', url); 
                return res.send(301);
            }
            if(namePart == "smartschoolcentral.com") {
                var url = req.protocol + "://www.smartschoolcentral.com" + req.url;
                console.log("Redirecting: " + url);
                
                res.header('Location', url); 
                return res.send(301);
            }
        }
    } catch(err) {
        console.log("Got error: " + err);
    }
    next(); 
});

app.use(express.bodyParser());

//Fonts - Firefox/Chrome requires Access-Control-Allow-Origin: *
app.get(/^(.+)\.(ttf|otf|eot|woff|woff2)$/, function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//Favicon
app.get("/favicon.ico", express.favicon(__dirname + "/public/favicon.ico"));

// 301 Permanent redirects
specialPages.setRedirects(app);

// 404 Page not found
specialPages.set404s(app);

// All paths with no extension are either:
//  1) Are files with .html extension
//  2) Are index.html files in that folder.
var mappedPath = new Object();

app.get(/^([^\.]+)$/, function(req, res, next) {
    var filePath = req.params[0];
    
    var go = function() {
        if(mappedPath[filePath] == null) {
            console.log("Going with no mapping: " + filePath);
            _getPage(filePath, req, res, next);
        } else {
            
            console.log("Original path: " + filePath);
            console.log("Internally mapped to:" + mappedPath[filePath]);
        
            _getPage(mappedPath[filePath], req, res, next);
        }
    }
    
    if(mappedPath[filePath] == null) {
        fs.lstat(__dirname + "/public" + filePath + ".html", function(err, stats) {
            if(!err && stats.isFile()) {
                mappedPath[filePath] = filePath + ".html";
                go();
            } else {
                var nameWithIndex = filePath + "/index.html";
                if(filePath.endsWith("/")) nameWithIndex = filePath + "index.html";
                
                console.log("nameWithIndex is " + nameWithIndex);
                
                fs.lstat(__dirname + "/public" + nameWithIndex, function(err, stats) {
                    if(!err && stats.isFile()) {
                        mappedPath[filePath] = nameWithIndex;
                        go();
                    } else {
                        go();
                    }
                });
            }
        });
    } else {
        go();
    }
});

// Static files in public. Directories NOT allowed (i.e. this is set by redirect:false)
// If you want to inject static in the middle of a GET, look here: http://stackoverflow.com/questions/11473399/using-express-static-middleware-in-an-authorized-route
app.get("/*", express.static(__dirname + "/public", {redirect:false, maxAge: 600000}));

// 404 Page not found. Last route.
app.get(/^(.+)$/, function(req, res) {
    res.statusCode = 404;
    console.log("Fallthrough 404:" + req.params[0]);
    
    cache.get404Page(req, res);
});


function _getPage(filePath, req, res, next) {
    
    cache.getPage(filePath, function(contents, notFound) {
        if(notFound) {
            next();
        }
        else {
            res.setHeader('Cache-Control', 'public, max-age=600'); // 600 seconds
            res.send(contents);
        }
    });
}


// Routes all set. Start the server!
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Server started. Listening on " + port);
});