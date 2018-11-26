const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let clientDB;

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    console.log("Connected successfully to server");
    clientDB = client;
});

function login(username, password) {
    console.log('sds')
    console.log(username, password);
    const dbName = 'users';
    const db = clientDB.db(dbName);
    const collection = db.collection('users');
    return collection.findOne({username, password});
}

function signUp(firstName, lastName, phoneNumber, email, username, password, secretQuestion, secretAnswer, audience) {
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
        secretAnswer,
        audience
    }).then(()=> collection.findOne({username, password}));
}

function answer(userId, secretQuestion, secretAnswer) {
    const dbName = 'users';
    const db = clientDB.db(dbName);
    const collection = db.collection('users');
    return collection.findOne({_id: ObjectId(userId), secretQuestion, secretAnswer});
}

function generateRights (role = 'user') {
    const level_one = ['get', 'update'];
    const level_two = level_one.concat(['create', 'delete']);
    switch (role) {
        case 'user':  return level_one;
        case 'admin': return level_two;
    }
}

module.exports.login = login;
module.exports.signUp = signUp;
module.exports.answer = answer;
module.exports.generateRights = generateRights;
