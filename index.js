const ig = require('./instagram');
const user = require('./user')

(async() =>{

    await ig.initialize();
    
    await ig.login(user.USERNAME,user.PASSWORD);
  
})()