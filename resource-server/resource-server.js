const https = require('https');
const fs = require('fs');
const url = require('url');

const parseFormdata = require('parse-formdata');
const jwt = require('jsonwebtoken');

const service = require('./resource-service');

const options = {
    key: fs.readFileSync('../ssl/server.key', 'utf-8'),
    cert: fs.readFileSync('../ssl/server.crt', 'utf-8')
};

https.createServer(options, (req, res) => {
    if (req.url.startsWith('/todos')) {
        const token = (req.headers.authorization || '').replace('Bearer ', '');
        switch (req.method) {
            case 'OPTIONS': {
                res.writeHead(200);
                res.end('');
                break;
            }
            case 'GET': {
                jwt.verify(token, 'etu', (err, decoded) => {
                    if (decoded) {
                        service.getTodos(decoded.id)
                            .then((todos)=> {
                                res.writeHead(200);
                                res.end(JSON.stringify(todos));
                            })
                            .catch(()=>{
                                res.writeHead(500);
                                res.end(JSON.stringify({error: 'data center is broken'}));
                            });
                    } else {
                        res.writeHead(401);
                        res.end(JSON.stringify('Unauthorized'));
                    }
                });
                break;
            }
            case 'POST': {
                jwt.verify(token, 'etu', (err, decoded) => {
                    if (decoded) {
                        parseFormdata(req, (err, data) => {
                            service.createTodo(decoded.id, data.fields.todoName)
                                .then((mongoTodos)=> {
                                    res.writeHead(200);
                                    res.end(JSON.stringify(mongoTodos));
                                })
                                .catch(()=> {
                                    res.writeHead(500);
                                    res.end(JSON.stringify({error: 'data center is broken'}));
                                });
                        });
                    } else {
                        res.writeHead(401);
                        res.end(JSON.stringify('Unauthorized'));
                    }
                });
                break;
            }
            case 'PUT': {
                jwt.verify(token, 'etu', (err, decoded) => {
                    if (decoded) {
                        parseFormdata(req, (err, data) => {
                            service.updateTodo(decoded.id, data.fields)
                                .then((todos)=> {
                                    res.writeHead(200);
                                    res.end(JSON.stringify(todos));
                                })
                                .catch(()=> {
                                    res.writeHead(500);
                                    res.end(JSON.stringify({error: 'data center is broken'}));
                                });
                        });
                    } else {
                        res.writeHead(401);
                        res.end(JSON.stringify('Unauthorized'));
                    }
                });
                break;
            }
            case 'DELETE': {
                jwt.verify(token, 'etu', (err, decoded) => {
                    if (decoded) {
                        parseFormdata(req, (err, data) => {
                            const ids = url.parse(req.url, true).query.ids.split(',');
                            service.deleteTodo(decoded.id, ids)
                                .then((todos)=>{
                                    console.log(todos)
                                    res.writeHead(200);
                                    res.end(JSON.stringify(todos));
                                }).catch(()=>{
                                    res.writeHead(500);
                                    res.end(JSON.stringify({error: 'data center is broken'}));
                                });
                        });
                    } else {
                        res.writeHead(401);
                        res.end(JSON.stringify('Unauthorized'));
                    }
                });
                break;
            }
        }
        return;
    }
    res.writeHead(200);
    res.end('Resource server is worked')
}).listen(8083, () => console.log('Ресурс сервер работает!'));