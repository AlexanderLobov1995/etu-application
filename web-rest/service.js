const database = require('./user-database');
const todos = require('./todo-database');
const fs = require("fs");


function login(username, password) {
  return database.find((user) => user.username === username && user.password === password);
}

function getTodos(id) {
  return todos && todos.filter((todo)=> todo.userId === id) || []
}

function createTodo(id, todoName) {
  todos.push({
    "id": generateId(),
    "name": todoName,
    "status": "in progress",
    "userId": id
  });
  fs.writeFile('./todo-database.json', JSON.stringify(todos), ()=> {});
  return todos.filter((todo)=> todo.userId === id)
}

function updateTodo(id, updateTodo) {
  let todo = todos.find((t)=> t.id === +updateTodo.id);
  todo.name = updateTodo.name;
  todo.status = updateTodo.status;
  fs.writeFile('./todo-database.json', JSON.stringify(todos), ()=> {});
  return todos.filter((todo)=> todo.userId === id)
}

function deleteTodo(ids) {
  let newTodos = todos;
  ids.forEach((id)=> {
    newTodos = newTodos.filter(todo => todo.id !== id)
  });
  fs.writeFile('./todo-database.json', JSON.stringify(newTodos), ()=> {});
  return newTodos;
}

function generateId() {
  return Date.now();
}

module.exports.login = login;
module.exports.getTodos = getTodos;
module.exports.createTodo = createTodo;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
