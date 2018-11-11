const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let clientDB;

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    console.log("Connected successfully to server");
    clientDB = client;
});

function login(username, password) {
    const dbName = 'users';
    const db = clientDB.db(dbName);
    const collection = db.collection('users');
    return collection.findOne({username, password});
}

function signUp(firstName, lastName, phoneNumber, email, username, password, secretQuestion, secretAnswer) {
    const dbName = 'users';
    const db = clientDB.db(dbName);
    const collection = db.collection('users');
    return collection.insertOne({
        firstName,
        lastName,
        phoneNumber,
        email,
        username,
        password,
        secretQuestion,
        secretAnswer
    }).then(()=> collection.findOne({username, password}));
}

function answer(userId, question, answer) {
    const dbName = 'users';
    const db = clientDB.db(dbName);
    const collection = db.collection('users');
    return collection.findOne({question, answer});
}

module.exports.login = login;
module.exports.signUp = signUp;
module.exports.answer = answer;
