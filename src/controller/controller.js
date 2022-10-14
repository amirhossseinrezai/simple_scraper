const cherrio = require('cheerio');
const axios = require('axios');
const winston = require('winston');
const j2cv = require("json2csv").Parser;
const fs = require("fs");


const url = "https://www.theguardian.com/uk";

function scrap(){
    axios(url)
    .then(res=>{
        const news = {date: String, data: []};
        const html = res.data;
        const $ = cherrio.load(html);

        $(".fc-container__header__title .fc-today", html).each(function(){
            const date = $(this).text().replace("/\r?\n?/g", "").trim();
            news.date = date;
        });
        $(".fc-container__inner", html).each(function(){
            const headline = $(this).find("h2").text();
            const title = $(this).find("h3").text().replace("/\r?\n?/g", "").trim();
            const content = $(this).find(".fc-item__standfirst").text().replace("/\r?\n?/g", "").trim();

            if(title && content){
                news.data.push({headline: headline, title: title, content: content})
            }

        });
    console.log(news);
    const parser = new j2cv();
    const csv = parser.parse(news);
    fs.writeFileSync("../news.csv", csv);

    }).catch(err=>{
        winston.log("error", ""+ new Error(err));
    });
}
module.exports.Scrap = scrap;


