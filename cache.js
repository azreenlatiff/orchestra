/**
 * Cache DoT templates and content files.
 */
var dot = require("dot");
dot.templateSettings.strip = false; // We don't need minification, and it introduces bugs with "//" comments when double interpolated.

var fs = require("fs");
var feed = require("./feed");
 
var isCacheOn = true;

if(__dirname.indexOf("stickshift") >= 0) { // Don't cache on cloud9
    isCacheOn = false;
}

if(__dirname.indexOf("workspace/QSWebsiteGears") >= 0) { // Don't cache on cloud9
    isCacheOn = false;
}

console.log("Cache status: " + isCacheOn + ", dirname: " + __dirname);

var templates = {};
feed.start(templates);

var pages = {};

var templateList = [
    {name: "header", file:"templates/template_header.html"},
    
];

if(isCacheOn == true) {
    loadTemplates();
    
    setInterval(clearCache, 60000 * 15);
}

module.exports = {
    
    /**
     * customTemplate: If your page is a DoT template, you can pass
     * in custom template values here.
     */
    getPage: function(filePath, callback) {
       
        if(isCacheOn && pages[filePath] != null)
        {
            callback(pages[filePath]);
            return;
        }
        else if(isCacheOn)
        {
            readPage(filePath, callback);
        }
        else if(!isCacheOn)
        {
            loadTemplates(function() {
                readPage(filePath, callback);
            });
        }
    },
    
    get404Page: function(req, res) {
        readPage("error_404.html", function(contents) {
            res.send(contents);
        }, {pageName: req.url});
    },
    
    getTemplatePage: function(map, filePath, callback) {
        readPage(filePath, callback, map);
    }
};

function readPage(filePath, callback, map) {
    readFile(filePath, function(contents, notFound) {
        
        if(notFound) {
            callback("Error", true);
        } else {
            
            var currMap = templates;
            if(map != null) {
                currMap = map;
                for(var attr in templates) {
                    currMap[attr] = templates[attr];
                }
            }
            
            var pageFn = dot.template(contents);
            var finishedPage = pageFn(currMap);
            
            // Do another layer of replacement, because some templates refer to other templates
            pageFn = dot.template(finishedPage);
            finishedPage = pageFn(currMap);
        
            pages[filePath] = finishedPage;
            callback(finishedPage);
        }
    });
}

function loadTemplates(callback) {
    if(isCacheOn && templates.header != null) {
        callback();
        return;
    }
    
    var index = 0;
    var onLoadFn = function(contents) {
        templates[templateList[index].name] = contents;
        index++;
        
        if(index < templateList.length) {
            readFile(templateList[index].file, onLoadFn);
        } else {
            if(callback != null) callback();
        }
    }
    
    readFile(templateList[index].file, onLoadFn);
}

function readFile(filePath, callback) {
    fs.readFile('./public/' + filePath, function (err, data) {
        if (err) {
            console.log("(E11) File not found:" + filePath);
            callback("Error", true);
            return;
        }
        callback(data.toString());
    });
}

function clearCache() {
    console.log("Periodic: clearCache()");
    pages = {};
}
