const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let clientDB;

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    console.log("Connected successfully to server");
    clientDB = client;
});

function getTodos(userId) {
    return new Promise ((resolve)=> {
        const dbName = 'todos';
        const db = clientDB.db(dbName);
        const collection = db.collection('todos');
        resolve(collection.find({userId}).toArray());
    });
}

function createTodo(userId, todoName) {
    const dbName = 'todos';
    const db = clientDB.db(dbName);
    const collection = db.collection('todos');
    return collection.insertOne({
        name: todoName,
        status: "in progress",
        userId
    }).then(()=> collection.find({userId}).toArray());
}

function updateTodo(userId, updateTodo) {
    const dbName = 'todos';
    const db = clientDB.db(dbName);
    const collection = db.collection('todos');
    return collection.updateOne(
            {_id: ObjectId(updateTodo._id)},
            {$set: {name: updateTodo.name, status: updateTodo.status}}
    ).then(()=> collection.find({userId}).toArray());
}

function deleteTodo(userId, todoIds) {
    const ids = todoIds.map((id)=> {
        try {
          return  ObjectId(id)
        }catch (e) {
          return id;
        }
    });
    const dbName = 'todos';
    const db = clientDB.db(dbName);
    const collection = db.collection('todos');
    const promise = collection.deleteMany({_id:{$in: ids}});
    return promise.then(()=> collection.find({userId}).toArray());
}

module.exports.getTodos = getTodos;
module.exports.createTodo = createTodo;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
