const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const https = require("https");
const fs = require('fs');
(async () => {
    const browser = await puppeteer.launch({
        headless: true
        //false 會讓瀏覽器實際開啟
        //true 會再後台開啟
    });
    const page = await browser.newPage();
    await page.goto('https://wiki.biligame.com/dongsen/%E8%99%AB%E5%9B%BE%E9%89%B4');
    await page.waitForSelector('#firstHeading')
    let body = await page.content()
    let $ = await cheerio.load(body)
    let data=[]
    //我們把cheerio找到的資料轉成文字並存進data這個變數
   await $('#CardSelectTr tbody  div.center div.floatnone a img.img-kk').each((i,el)=>{
        let $2=cheerio.load($(el).html())
        let tmp={
            id:i,
            src:el.attribs.src
        }
        data.push(tmp)
    })
    const fs=require('fs')
    const content=JSON.stringify(data)
    fs.writeFile("insect.json",content,'utf8',function (err){
        if(err){
            return console.log(err)
        }
        console.log("The file was saved!");
    })

    await browser.close()
})();

