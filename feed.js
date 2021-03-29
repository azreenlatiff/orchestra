/**
 * Caches blog and twitter feeds. Updates at regular intervals.
 * 
 * Notes:
 * 
 * The Twitter API Key comes from the QuickSchools Twitter account.
 * 
 */



var FeedParser = require('feedparser');

var feedParser = new FeedParser();

var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function pad(input) {
    input = "" + input;
    return input.length == 1 ? "0" + input : input;
}

var templates;
var timerId;

module.exports = {
    
    start: function(incomingTemplates) {
        templates = incomingTemplates;
        templates.blogItems = [];
        templates.latestTweet = [];
        
        if(timerId != null) clearInterval(timerId);
        
        // Set timer, but also check right away
        // timerId = setInterval(checkFeed, 60000 * 15);
        // checkFeed();
    }
    
}
