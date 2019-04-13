const puppeteer = require("puppeteer")

const BASE_URI =  "https://instagram.com"
const instagram = {
    browser:null,
    page:null,

    initialize: async () =>{
        instagram.browser = await puppeteer.launch({
                headless: false
        });

        instagram.page = await instagram.browser.newPage();

    },

    login: async (username,password) =>{
        
        await instagram.page.goto(BASE_URI,{ waitUntil:"networkidle2" });

        let loginButton = await instagram.page.$x('//a[contains(text(),"Conecte-se")]');
        

        /* click no botao login */
        await loginButton[0].click();

        await instagram.page.waitForNavigation({ waitUntil:"networkidle2" });

        await instagram.page.waitFor(1000);

        /* escrevendo username e o password*/
        await instagram.page.type('input[name="username"]',username,{delay: 50})
        await instagram.page.type('input[name="password"]',password,{delay: 50})
        
        await instagram.page.evaluate(() => { document.getElementsByClassName('_0mzm-')[1].click(); });
    

    }
}

module.exports = instagram;