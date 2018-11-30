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
    try {
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
                            service.getTodos(decoded.userId)
                                .then((todos)=> {
                                    res.writeHead(200);
                                    res.end(JSON.stringify(todos));
                                })
                                .catch(()=>{
                                    res.writeHead(500);
                                    res.end(JSON.stringify({errorMessage: 'Data center is broken'}));
                                });
                        } else {
                            res.writeHead(401);
                            res.end(JSON.stringify({errorMessage: 'Unauthorized'}));
                        }
                    });
                    break;
                }
                case 'POST': {
                    jwt.verify(token, 'etu', (err, decoded) => {
                        if (decoded) {
                            parseFormdata(req, (err, data) => {
                                service.createTodo(decoded.userId, data.fields.todoName)
                                    .then((todos)=> {
                                        res.writeHead(200);
                                        res.end(JSON.stringify(todos));
                                    })
                                    .catch(()=> {
                                        res.writeHead(500);
                                        res.end(JSON.stringify({errorMessage: 'Data center is broken'}));
                                    });
                            });
                        } else {
                            res.writeHead(401);
                            res.end(JSON.stringify({errorMessage: 'Unauthorized'}));
                        }
                    });
                    break;
                }
                case 'PUT': {
                    jwt.verify(token, 'etu', (err, decoded) => {
                        if (decoded) {
                            parseFormdata(req, (err, data) => {
                                service.updateTodo(decoded.userId, data.fields)
                                    .then((todos)=> {
                                        res.writeHead(200);
                                        res.end(JSON.stringify(todos));
                                    })
                                    .catch(()=> {
                                        res.writeHead(500);
                                        res.end(JSON.stringify({errorMessage: 'Data center is broken'}));
                                    });
                            });
                        } else {
                            res.writeHead(401);
                            res.end(JSON.stringify({errorMessage: 'Unauthorized'}));
                        }
                    });
                    break;
                }
                case 'DELETE': {
                    jwt.verify(token, 'etu', (err, decoded) => {
                        if (decoded) {
                            parseFormdata(req, (err, data) => {
                                const ids = url.parse(req.url, true).query.ids.split(',');
                                service.deleteTodo(decoded.userId, ids)
                                    .then((todos)=>{
                                        res.writeHead(200);
                                        res.end(JSON.stringify(todos));
                                    }).catch(()=>{
                                    res.writeHead(500);
                                    res.end(JSON.stringify({errorMessage: 'Data center is broken'}));
                                });
                            });
                        } else {
                            res.writeHead(401);
                            res.end(JSON.stringify({errorMessage: 'Unauthorized'}));
                        }
                    });
                    break;
                }
            }
            return;
        }
        res.writeHead(200);
        res.end('Resource server works')
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({errorMessage: 'Auth server does not work'}));
    }
}).listen(8083, () => console.log('Ресурс сервер работает!'));