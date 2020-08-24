const puppeteer = require("puppeteer");

const BASE_URI =  'https://instagram.com';
const TAG_URL = (tag)=>`https://www.instagram.com/explore/tags/${tag}`;

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
        await instagram.page.goto(BASE_URI);
        
        await instagram.page.waitFor('input[name="username"]');
        await instagram.page.waitFor('input[name="password"]');

        await instagram.page.type('input[name="username"]',username);
        await instagram.page.type('input[name="password"]',password);

        await instagram.page.evaluate(() => { document.getElementsByClassName('sqdOP  ')[1].click(); });
        
        await instagram.page.waitFor('.Fifk5');

    },

    likeTagsProcess: async (tags = []) =>{

        for(tag of tags){

            /* abrir pagina tag */
            await  instagram.page.goto(TAG_URL(tag),{ waitUntil: 'networkidle2' });
            await  instagram.page.waitFor(1000);

            let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');

            for(let i = 0; i < 6; i ++){
                 
                let post = posts[i];

                /* click no post */
                await post.click();

                /* esperar o modal */
                await instagram.page.waitFor('._97aPb ');

                let isLikable = await instagram.page.$('svg[aria-label="Curtir"]');

                if(isLikable){
                    await instagram.page.click('svg[aria-label="Curtir"]');
                    instagram.page.waitFor('svg[aria-label="Descurtir"]')                
                }
                await instagram.page.waitFor(6000);
                /* fecha o modal  */
                await instagram.page.click('svg[aria-label="Fechar"]');

            }

            await instagram.page.waitFor(6000);
                

        }

    },

    close: async () =>{
        await instagram.browser.close();
        instagram.browser = null;
    }

}

module.exports = instagram;