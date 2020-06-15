var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.bbc.com/news", function(err, res, body) {
        var $ = cheerio.load(body);

        var articles = [];

        $(".gs-c-promo").each(function(i, element) {
            var head = $(this).find(".gs-c-promo-heading")[0];
            head = $(head).text().trim();
            var summary = $(this).find(".gs-c-promo-summary")[0];
            summary = $(summary).text().trim();

            if (head && summary) {
                var headNeat = head.replace(/(\r\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

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