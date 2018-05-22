const jwt = require('jsonwebtoken');
const http = require('http');
const service = require('./service');
const url = require('url');
const parseFormdata = require('parse-formdata');

http.createServer((req, res) => {
  if (req.url.startsWith('/auth')) {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    };
    parseFormdata(req, (err, data) => {
      const user = service.login(data.fields.username, data.fields.password);
      if (user) {
        const token = jwt.sign({id: user.id, firstname: user.firstName, lastname: user.lastName}, 'etu', {
          audience: user.audience || 'guest',
          header: {typ: 'JWT'},
          expiresIn: 3600
        });
        res.writeHead(200, headers);
        res.end(token);
      } else {
        res.writeHead(404, headers);
        res.end('Credentials is invalid');
      }
    });
  }else if (req.url.startsWith('/todos')){
    handleTodo(req, res);
  }else{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Server is worked')
  }
}).listen(8081, () => console.log('Сервер работает!'));

const handleTodo = (req, res) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  };
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  switch (req.method) {
    case 'OPTIONS': {
      res.writeHead(200, headers);
      res.end('');
      break;
    }
    case 'GET': {
      jwt.verify(token, 'etu', (err, decoded) => {
        if (decoded) {
          const todos = service.getTodos(decoded.id);
          res.writeHead(200, headers);
          res.end(JSON.stringify(todos));
        }else{
          res.writeHead(401, headers);
          res.end(JSON.stringify('Unauthorized'));
        }
      });
      break;
    }
    case 'POST': {
      jwt.verify(token, 'etu', (err, decoded) => {
        if (decoded) {
          parseFormdata(req, (err, data) => {
            const todos = service.createTodo(decoded.id, data.fields.todoName);
            res.writeHead(200, headers);
            res.end(JSON.stringify(todos));
          });
        }else{
          res.writeHead(401, headers);
          res.end(JSON.stringify('Unauthorized'));
        }
      });
      break;
    }
    case 'PUT': {
      jwt.verify(token, 'etu', (err, decoded) => {
        if (decoded) {
          parseFormdata(req, (err, data) => {
            const todos = service.updateTodo(decoded.id, data.fields);
            res.writeHead(200, headers);
            res.end(JSON.stringify(todos));
          });
        }else{
          res.writeHead(401, headers);
          res.end(JSON.stringify('Unauthorized'));
        }
      });
      break;
    }
    case 'DELETE': {
      jwt.verify(token, 'etu', (err, decoded) => {
        if (decoded) {
          parseFormdata(req, (err, data) => {
            const ids = (url.parse(req.url, true)).query.ids.split(',').map((id)=> +id);
            const todos = service.deleteTodo(ids);
            res.writeHead(200, headers);
            res.end(JSON.stringify(todos));
          });
        }else{
          res.writeHead(401, headers);
          res.end(JSON.stringify('Unauthorized'));
        }
      });
      break;
    }
  }
};