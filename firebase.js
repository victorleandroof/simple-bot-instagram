const firebase = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://instagram-bot-14207.firebaseio.com"
});

const db = firebase.database();
const database = {
    saveFallows: async (user)=>{
        const ref = db.ref("instagram/instagram_fallow");
        const usersRef = ref.child("users");
        await ref.once("value", function(snapshot) {
            let arrayUsers = snapshot.val().users || [];
            arrayUsers.push(user);
            usersRef.set(arrayUsers);
        });
    },
    getUsers: async()=>{
        const ref = db.ref("instagram/instagram_fallow");
        const usersRef = ref.child("users");
        await ref.once("value", function(snapshot) {
            console.log(snapshot.val());
        });
    }
}

module.exports = database;