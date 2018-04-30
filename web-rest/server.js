const jwt = require('jsonwebtoken');
const http = require('http');
const service = require('./service');
const parseFormdata = require('parse-formdata');

http.createServer((req, res) => {
  switch (req.url) {
    case '/auth': {
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': 'http://localhost:8080'
      };
      parseFormdata(req, (err, data) => {
        const user = service.login(data.fields.username, data.fields.password);
        if (user) {
          const token = jwt.sign({firstname: user.firstName, lastname: user.lastName}, 'etu', {
            audience: user.audience || 'guest',
            header: {typ: 'JWT'},
            expiresIn: 10
          });
          res.writeHead(200, headers);
          res.end(token);
        } else {
          res.writeHead(404, headers);
          res.end('Credentials is invalid');
        }
      });
      break;
    }
    default: {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Server is worked')
    }
  }
}).listen(8081, () => console.log('Сервер работает!'));