const express = require('express');
const axios = require("axios")
const request = require('request')
const cheerio = require("cheerio")
const xpath = require("xpath-html");
const puppeteer = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');

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
    res.status(200).json({status: 200, websites: urls})
})

//   const datu = await page.evaluate(() => {
//       console.log('i know')
//     const title = document.querySelector(".fxgdke").innerText
//     // This object will be stored in the data variable 
//     console.log(title)
//    })
//    await browser.close();
// })

app.post('/us', async (req, res) => {
    const b = 'https://www.google.com/search?tbs=sbi:AMhZZiuFvgb4Id6xkaRg4GpJ3sHwz4C1GGELik5QcCXTuSk7UPuEHeQuZq_190xq7_1cgaIz_1lFmOfaaeg71eq2TLhA8MxRDp1PkA5xdBKx-62aOkBa7dVXRHcYUctejKL2Z6yAhq3YtuakKSqasSQFTBQk5oIrS8URskmCP46xgYgnJbdvpV1ZPG9x8KR1cDSe65PBg_1_1qXPamM8v7tn9BIxZvVsvltP22rKUHHVJAILZCtx3FzI2WNTQ9HCc6MpJ7zI5iJqO1McFtiNjKZXYYK7aOPvu2-LESNH6tt8oGuYjy6it3F-3i4vtOdKIHk02zrw9rg1f3cjwxOY3GcrID0yqxNmmo8EnwQ&hl=en-NG'


    console.log('u hit')
    const browser = await puppeteer.launch({headless: false});
   
  const page = await browser.newPage();

//   await page.setRequestInterception(true)
//   await page.on('request', (req) => {
//       if (!req.isNavigationRequest()) {
//           req.continue()
//           return
//       }

//       const headers = req.headers()
//       headers['Access-Control-Allow-Origins'] = '*'
//       headers['Accept'] = 'application/json'
//       headers['Accept-Encoding'] = 'gzip, br'
//       headers['Content-Type'] = 'application/json'
//       headers['Cache-Control'] = 'no-cache'
//       headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4469.0 Safari/537.36'

//       req.continue({ ...headers })
//   })
  const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4469.0 Safari/537.36'
//   browser.on('targetcreated', async (target) => {
//       let page = await target.page()
//       await page.setUserAgent(fakeUserAgent)
//   })

 await page.setUserAgent(fakeUserAgent)
//   await page.setExtraHTTPHeaders({
//     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4469.0 Safari/537.36',
//     'accept-encoding': 'gzip, deflate, br'
//   })

//   await page.setExtraHTTPHeaders({
//     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
//     'upgrade-insecure-requests': '1',
//     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
//     'accept-encoding': 'gzip, deflate, br',
//     'accept-language': 'en-US,en;q=0.9,en;q=0.8'
// })
  //await page.emulateNetworkConditions(slow3G);

  const cookies = [
    {
        "name": 'NID',
        "value":'215=Y7MDpj_p9SrTKdsvxP_Ly9wsXnHty4XUxHy_kLRiLM0vdw_2UhuOoczXsvjh-Lrd3VJk0u5zgmL5aqxjYK0ZbxKSF8VCUKqD9QaWl1HT-YmwurqX3lJv65cPa1p3jlENKP8nGHIikPRQbKFwwqfIGdJ8VawYAONZodl5ziUTXRM',
        "domain": '.google.com'
    },
    {
        "name":'CONSENT',
        "value": 'YES+srp.gws-20210426-0-RC1.en+FX+293',
        "domain": '.google.com'
    }
  ];
  
  
  await page.setCookie(...cookies);
  console.log('set')
  await page.goto(b);
 
//    await page.waitForNavigation({
//      waitUntil: 'networkidle0',
//    });
  console.log('went')

  //await page.click('#zV9nZe')

  await page.waitForSelector('.main', { visible: true });
  console.log('i know')

  let urls = await page.$$eval('.r5a77d', links => {
   console.log('lets go')
    // Extract the links from the data
    links = links.map(el => el.querySelector('a.fKDtNb').innerText)
    return links;
    });
    console.log(urls);
    const place = req.body
    const Nigeria = 'Nigeria'
    const V = `https://www.google.com/search?q=${urls[0]}+sold+in+${Nigeria}`
    console.log(V)
    await page.goto(V)

    await page.waitForSelector('.GyAeWb', { visible: true });
  console.log('i know')

  let urbs= await page.$$eval('.yuRUbf', links => {
   console.log('lets go')
    // Extract the links from the data
    links = links.map(el => el.querySelector('a').getAttribute('href'))
    return links;
    });
    console.log(urbs);
    res.status(200).json({status: 200, image_name: urbs})
})

app.post('/no', async (req, res) => {
    
console.log('started')
    const lo = 'https://www.google.com/searchbyimage?&image_url=https://assets.burberry.com/is/image/Burberryltd/59083e8f56fac88fa3284ad03a4e557a89980dc7.jpg?$BBY_V2_SL_1x1$&wid=2500&hei=2500'
    //puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
    puppeteer.use(StealthPlugin());
    // puppeteer.use(require('puppeteer-extra-plugin-anonymize-ua')())
    // puppeteer.use(require('puppeteer-extra-plugin-user-preferences')({userPrefs: {
    //   webkit: {
    //     webprefs: {
    //       default_font_size: 16
    //     }
    //   }
    // }}))
    console.log('next')
    const browser = await puppeteer.launch({
      headless:false,
    })
console.log('wat')
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  //await page.goto("https://stackoverflow.com/users/login");

  await page.goto('https://accounts.google.com/')

  const navigationPromise = page.waitForNavigation();

//   await page.waitForSelector("button.s-btn__google");
//   await page.click("button.s-btn__google");
console.log('1')
  await navigationPromise;
  await page.waitForSelector('input[type="email"]');
  console.log('2')
  await page.click('input[type="email"]')
  await page.type('input[type="email"]', 'raphaelogbonnaya@gmail.com');
  
  await page.waitForSelector('#identifierNext')
  console.log('3')
  await page.click('#identifierNext')

  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', 'Iheanyichukwu0');

  await page.waitForSelector("#passwordNext", { visible: true });
  await page.click("#passwordNext");

  await navigationPromise;

  await page.goto(lo, {waitUntil: 'networkidle0'});

  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });
 console.log('went')

 await page.waitForSelector('.main');
 console.log('i know')

 let urls = await page.$$eval('.r5a77d', links => {
  console.log('lets go')
   // Extract the links from the data
   links = links.map(el => el.querySelector('a.fKDtNb').innerText)
   return links;
   });
   console.log(urls);
   res.status(200).json({status: 200, image_name: urls[0]})

  await browser.close();

})

//set port
const PORT = 5000;

//start server
const server  = app.listen(PORT, () => console.log('test server has started'));