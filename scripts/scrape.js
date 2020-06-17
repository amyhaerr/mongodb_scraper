// Require request and cheerio, making our scrapes possible
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

var scrape = function (cb) {
     request("https://www.bbc.com/news", function(err,res, body){
        var $ = cheerio.load(body);
        var articles = [];
        $(".gs-c-promo").each(function(i, element) {
            console.log(element)
            var head = $(this).find(".gs-c-promo-heading")[0];
            head = $(head).text().trim();
            console.log("headline: " + head);
            var url = $(this).find("a")[0];
            url = $(url).text().trim();
            console.log("url: " + url)
            var sum = $(this).find(".gs-c-promo-summary")[0];
            sum = $(sum).text().trim();
            console.log("summary: " + sum)
            
            if(head && url && sum)
            
            var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            
            var dataToAdd = {
                headline: headNeat,
                summary: sumNeat,
                url: "https://www.bbc.com/news" + url
            };
            articles.push(dataToAdd)
        });
        cb(articles);
    });
};
module.exports = scrape;