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
        
        await instagram.page.goto(BASE_URI,{ waitUntil: 'networkidle2' });

        let loginButton = await instagram.page.$x('//a[contains(text(),"Conecte-se")]');
        

        /* click no botao login */
        await loginButton[0].click();

        await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

        await instagram.page.waitFor(1000);

        /* escrevendo username e o password*/
        await instagram.page.type('input[name="username"]',username,{delay: 50})
        await instagram.page.type('input[name="password"]',password,{delay: 50})
        
        await instagram.page.evaluate(() => { document.getElementsByClassName('_0mzm-')[1].click(); });
        
        await instagram.page.waitFor(10000);
        await instagram.page.waitFor('a > span[aria-label="Perfil"]');

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
                await instagram.page.waitFor('span[id="react-root"][aria-hidden="true"]');
                await instagram.page.waitFor(1000);

                let isLikable = await instagram.page.$('span[aria-label="Curtir"');

                if(isLikable){
                    await instagram.page.click('span[aria-label="Curtir"');
                }
                
                await instagram.page.waitFor(1000);

                /* fecha o modal  */
                let closeModalButton = await instagram.page.$x('//button[contains(text(),"Fechar")]');
                await closeModalButton[0].click('//button[contains(text(),"Fechar")]');

                await instagram.page.waitFor(1000);

            }

            await instagram.page.waitFor(60000);
                

        }

    },

    close: async () =>{
        await instagram.browser.close();
        instagram.browser = null;
    }

}

module.exports = instagram;