/**
 * This file specifies all the pages that have moved, and need a 301: Permanently Moved http header.
 * It also specifies the explicit pages that should result in 404: Page not found.
 * 
 */
 var cache = require("./cache");

module.exports = {
    
    setRedirects: function(app) {
        app.get("/thank-you.html", redirect("/thank-you"));
        app.get("/thankyou", redirect("/thank-you")); // Not sure where this comes from
        app.get("/more", redirect("/clients/support/faqs"));
        app.get("/clients/partneringschools", redirect("/quickschools/stories"));
        app.get("/quickschools/help", redirect("/clients/support/faqs"));
        app.get("/monthly-updates.html", redirect("/about"));

        app.get("/lp/General/generalschool", redirect("/"));
        app.get("/lp/Music/MusicSchool", redirect("/"));

        app.get("/clients/support/faqs", redirect("/company/faqs"));
        app.get("/clients/success-stories", redirect("/quickschools/stories"));
        app.get("/clients/faith-based-schools", redirect("/quickschools/stories/faith-based-schools"));
        app.get("/clients/student-information-software-for-Vietnam", redirect("/quickschools/stories/student-information-software-for-Vietnam"));
        app.get("/clients/student-information-system-christian-schools", redirect("/quickschools/stories/student-information-system-christian-schools"));
        app.get("/clients/student-information-system-elementary-schools", redirect("/quickschools/stories/student-information-system-elementary-schools"));
        app.get("/clients/student-information-system-faith-based-schools", redirect("/quickschools/stories/student-information-system-faith-based-schools"));
        app.get("/clients/student-information-system-for-catholic-schools", redirect("/quickschools/stories/student-information-system-for-catholic-schools"));
        app.get("/clients/student-information-system-lapaz-school", redirect("/quickschools/stories/student-information-system-lapaz-school"));
        app.get("/clients/student-information-system-online-schools", redirect("/quickschools/stories/student-information-system-online-schools"));
        app.get("/clients/student-information-system-origins-school", redirect("/quickschools/stories/student-information-system-origins-school"));
        app.get("/clients/student-information-system-religious-schools", redirect("/quickschools/stories/student-information-system-religious-schools"));

        app.get("/about", redirect("/company/about"));
        app.get("/company", redirect("/company/about"));
        app.get("/terms.html", redirect("/company/legal/terms"));
        app.get("/privacy-policy", redirect("/company/legal/privacy"));
        app.get("/privacy", redirect("/company/legal/privacy"));
        app.get("/referralprogram", redirect("/company/referralprogram"));

        app.get("/pr/pr-cloud", redirect("/company/press/pr-cloud"));

        app.get("/reports/reports-showcase", redirect("/quickschools/features/report-cards-template"));
        
        app.get("/adulteducation", redirect("/segments/adult-education"));
        app.get("/adulteducation/faqs", redirect("/"));
        app.get("/adulteducation/quick-tour", redirect("/segments/adult-education/ae-quick-tour"));
        app.get("/adulteducation/features", redirect("/segments/adult-education/ae-features"));
        app.get("/adulteducation/pricing", redirect("/segments/adult-education/ae-pricing"));
        app.get("/adulteducation/free-trial", redirect("/segments/adult-education/ae-free-trial"));

        app.get("/quickschools/features/student-information", redirect("/quickschools/features/student-information-system"));
        app.get("/quickschools/features/gradebook", redirect("/quickschools/features/online-gradebook"));
        app.get("/quickschools/features/transcripts", redirect("/quickschools/features/online-transcripts"));
        app.get("/exp-index-vid-v100", redirect("/"));
        
        
        // These pages need attention!
        //app.get("/unsubscribe_survey", redirect("/")); // Do schools that get cancelled go to this link?
    },
    
    set404s: function(app) {
        
        // No pages can end with .html
        app.get("(*.html)", function(req, res, next) {
            res.statusCode = 404;
            console.log("Known 404 (block *.html files):" + req.params[0]);
            cache.get404Page(req, res);
        });
        
        // No directories are allowed (i.e. nothing can end with /) except root
        app.get(/\/$/, function(req, res, next) {
            if(req.url == "/") {
                next();
                return;
            }
            
            if(req.url.substring(1, 2) == "?") { // Root path with query
                next();
                return;
            }
            
            res.statusCode = 404;
            console.log("Known 404 (block directories):" + req.url);
            cache.get404Page(req, res);
        });
    }
};

function redirect(target) {
    return function(req, res) {
        res.redirect(target, 301);
    }
}