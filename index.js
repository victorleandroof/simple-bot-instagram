const ig = require('./instagram');
const user = require('./user');
const schedule = require('node-schedule');

(async()=>{
    tarefas();
})();

async function tarefas(){
    try{
        await ig.initialize();
        await ig.login(user.USERNAME,user.PASSWORD);
        //await ig.likeTagsProcess(['likeforlike']);
        await ig.followProcess([ 'likeforlike']);
        await ig.close();
    }catch(err){
        console.log('falhou motivo',err)
    }
}

schedule.scheduleJob('42 * * * *', function(){
    tarefas();
    console.log("tarefa executada");
});