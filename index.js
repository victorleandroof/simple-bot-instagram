const ig = require('./instagram');
const user = require('./user');

(async() =>{

    await ig.initialize();

    await ig.login(user.USERNAME,user.PASSWORD);

    await ig.likeTagsProcess(['ibm','developer','datascience','java','nerd','geek']);

    await ig.close();
})()