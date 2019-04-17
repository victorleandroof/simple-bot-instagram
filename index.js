const ig = require('./instagram');
const user = require('./user');
const schedule = require('node-schedule');

async function tarefas(){

    await ig.initialize();

    await ig.login(user.USERNAME,user.PASSWORD);

    await ig.likeTagsProcess(['ibm','developer','datascience','java','nerd','geek']);

    await ig.close();
}

schedule.scheduleJob('42 * * * *', function(){
    await tarefas();
});