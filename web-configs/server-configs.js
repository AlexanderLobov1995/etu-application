const http = require('http');
const configs = require('./configs');

http.createServer((req, res) => {
  switch (req.url) {
    case '/configs': {
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': 'http://localhost:8080'
      };
      res.writeHead(200, headers);
      res.end(JSON.stringify(configs));
      break;
    }
    default: {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Server is worked')
    }
  }
}).listen(3000, () => console.log('Сервер-конфиг работает!'));