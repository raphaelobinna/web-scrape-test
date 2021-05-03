const express = require('express');
const axios = require("axios")
const request = require('request')
const cheerio = require("cheerio")
const xpath = require("xpath-html");
const puppeteer = require('puppeteer');

//init app
const app = express();

async function fetchHTML(url) {
    const { data } = await axios.get(url)
    return cheerio.load(data)
  }
 
//index route
app.get('/', (req, res) => {
    res.render('index')
});

//catch form input
app.post('/me', async (req, res) => {
    console.log('was hit')
    const $ = await fetchHTML(" https://www.google.com/search?q=https://assets.burberry.com/is/image/Burberryltd/59083e8f56fac88fa3284ad03a4e557a89980dc7.jpg%3F%24BBY_V2_SL_1x1%24%26wid%3D2500%26hei%3D2500&hl=en&sxsrf=ALeKk02t_t-QoXmvLcXvyxLi5_7Q3q4mqQ:1619507378588&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj80IuQ753wAhVyA2MBHT6WC9kQ_AUoAXoECAEQAw&biw=1326&bih=697")
//    const $ =  await fetchHTML("https://www.google.com/search?q=https://assets.burberry.com/is/image/Burberryltd/59083e8f56fac88fa3284ad03a4e557a89980dc7.jpg%3F%24BBY_V2_SL_1x1%24%26wid%3D2500%26hei%3D2500&hl=en&sxsrf=ALeKk02t_t-QoXmvLcXvyxLi5_7Q3q4mqQ:1619507378588&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj80IuQ753wAhVyA2MBHT6WC9kQ_AUoAXoECAEQAw&biw=1326&bih=697")
//     console.log('went well')
//     console.log($)
//     $('.fxgdke').each((i, el) => {
//         console.log(el)
//         const t = $(el)
//             .find('.jjPwL')
//             .text()
//             console.log(t)
//     })
   


//   await request('https://www.google.com/search?q=https://assets.burberry.com/is/image/Burberryltd/59083e8f56fac88fa3284ad03a4e557a89980dc7.jpg%3F%24BBY_V2_SL_1x1%24%26wid%3D2500%26hei%3D2500&hl=en&sxsrf=ALeKk02t_t-QoXmvLcXvyxLi5_7Q3q4mqQ:1619507378588&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj80IuQ753wAhVyA2MBHT6WC9kQ_AUoAXoECAEQAw&biw=1326&bih=697', 
//     (error, response, html) => {
//         if(!error && response.statusCode == 200) {
//             console.log(html)
//                 const $ = cheerio.load(html);
//             console.log('all good')
//             //console.log($('.VFACy-kGQAp-sMi44c-lNHeqe-WGvvNb a'))

//             //document.querySelector("#islrg > div.islrc > div:nth-child(4) > a.VFACy.kGQAp.sMi44c.lNHeqe.WGvvNb")
//             // const siteHeading = $('.TbwUpd-NJjxre')
//             // console.log(siteHeading)
//             // const output = siteHeading.children('cite').text()
//             // console.log(output)
//         } else {
//             console.log('all bad')
//             console.log(error)
//         }
//     })
    //https://www.google.com/searchbyimage?&image_url=https://assets.burberry.com/is/image/Burberryltd/59083e8f56fac88fa3284ad03a4e557a89980dc7.jpg?$BBY_V2_SL_1x1$&wid=2500&hei=2500

    //https://www.google.com/search?q=https://assets.burberry.com/is/image/Burberryltd/59083e8f56fac88fa3284ad03a4e557a89980dc7.jpg%3F%24BBY_V2_SL_1x1%24%26wid%3D2500%26hei%3D2500&hl=en&sxsrf=ALeKk02t_t-QoXmvLcXvyxLi5_7Q3q4mqQ:1619507378588&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj80IuQ753wAhVyA2MBHT6WC9kQ_AUoAXoECAEQAw&biw=1326&bih=697
    // Print the full HTML
    const htmlPage = $.html()
    console.log(htmlPage)
    //*[@id="rso"]/div[2]/div[3]/div/div/div[1]

    const group = xpath.fromPageSource(htmlPage).findElement("//*[@id='islrg']/div[1]/div[2]/a[2]/div");
    console.log(group)
    //const node = xpath.fromNode(group).findElement("//a[@href='/aliexpress']");
     
    //console.log(group.toString());
})

app.post('/you', async (req, res) => {
    const u = 'https://www.google.com/search?q=https://assets.burberry.com/is/image/Burberryltd/59083e8f56fac88fa3284ad03a4e557a89980dc7.jpg%3F%24BBY_V2_SL_1x1%24%26wid%3D2500%26hei%3D2500&hl=en&sxsrf=ALeKk02t_t-QoXmvLcXvyxLi5_7Q3q4mqQ:1619507378588&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj80IuQ753wAhVyA2MBHT6WC9kQ_AUoAXoECAEQAw&biw=1326&bih=697'
    console.log('u hit')
    const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  //await page.emulateNetworkConditions(slow3G);
  await page.goto(u);
  console.log('went')

  await page.waitForSelector('.islrc');
  console.log('i know')

  let urls = await page.$$eval('a.VFACy.kGQAp.sMi44c.lNHeqe.WGvvNb', links => {
   console.log('lets go')
    // Extract the links from the data
    links = links.map(el => el.querySelector('div').innerText)
    return links;
    });
    console.log(urls);
})

//   const datu = await page.evaluate(() => {
//       console.log('i know')
//     const title = document.querySelector(".fxgdke").innerText
//     // This object will be stored in the data variable 
//     console.log(title)
//    })
//    await browser.close();
// })

//set port
const PORT = 3000;

//start server
const server  = app.listen(PORT, () => console.log('test server has started'));