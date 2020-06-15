var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.bbc.com/news", function(err, res, body) {
        var $ = cheerio.load(body);

        var articles = [];

        $(".gs-c-promo").each(function(i, element) {
            var head = $(this).children(".gs-c-promo-heading").text().trim();
            console.log(head);
            var sum = $(this).children(".gs-c-promo-summary").text().trim();

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat, 
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;