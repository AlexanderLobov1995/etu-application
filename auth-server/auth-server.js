const https = require('https');
const fs = require('fs');

const parseFormdata = require('parse-formdata');
const jwt = require('jsonwebtoken');

const service = require('./auth-service');

const options = {
    key: fs.readFileSync('../ssl/server.key', 'utf-8'),
    cert: fs.readFileSync('../ssl/server.crt', 'utf-8'),
};

https.createServer(options, (req, res) => {
    if(req.url.endsWith('/login')) {
        parseFormdata(req, (err, data) => {
            const {fields} = data || {};
            const username = fields && fields.username || '';
            const password = fields && fields.password || '';
            service.login(username, password)
                .then((userResponse)=> {
                    if (userResponse) {
                        const firstname = userResponse.firstName || '';
                        const lastname = userResponse.lastName || '';
                        const role = userResponse.audience || 'user';
                        const _id = userResponse._id;
                        const audience = userResponse.audience || 'user';
                        const user = {firstname, lastname, role, rights: ['get', 'create', 'delete', 'update']};
                        const jwtToken = jwt.sign({_id, user}, 'etu', {
                            audience,
                            header: {typ: 'JWT'},
                            expiresIn: 3600
                        });
                        const authResponse = {
                            user,
                            jwtToken,
                            sessionToken: (new Date().getTime()).toString()
                        };
                        res.writeHead(200);
                        res.end(JSON.stringify(authResponse));
                    } else {
                        res.writeHead(401);
                        res.end(JSON.stringify({"error":"Credentials are invalid"}));
                    }
                })
                .catch(()=> {
                    res.writeHead(500);
                    res.end(JSON.stringify({error: 'data center is broken'}));
                });
        });
        return;
    }
    if(req.url.endsWith('/signup')) {
        parseFormdata(req, (err, data) => {
            const {fields} = data || {};
            const firstName = fields && fields.firstName || '';
            const lastName = fields && fields.lastName || '';
            const phoneNumber = fields && fields.phoneNumber || '';
            const email = fields && fields.email || '';
            const username = fields && fields.username || '';
            const password = fields && fields.password || '';
            const secretQuestion = fields && fields.secretQuestion || '';
            const secretAnswer = fields && fields.secretAnswer || '';
            service.signUp(firstName, lastName, phoneNumber, email, username, password, secretQuestion, secretAnswer)
                .then((userResponse)=> {
                    if (userResponse) {
                        const firstname = userResponse.firstName || '';
                        const lastname = userResponse.lastName || '';
                        const role = userResponse.audience || 'guest';
                        const _id = userResponse._id;
                        const audience = userResponse.audience || 'guest';
                        const user = {firstname, lastname, role, rights: ['get', 'create', 'delete', 'update']};
                        const jwtToken = jwt.sign({_id, user}, 'etu', {
                            audience,
                            header: {typ: 'JWT'},
                            expiresIn: 3600
                        });
                        const authResponse = {
                            user,
                            jwtToken,
                            sessionToken: (new Date().getTime()).toString()
                        };
                        res.writeHead(200);
                        res.end(JSON.stringify(authResponse));
                    } else {
                        res.writeHead(500);
                        res.end(JSON.stringify({error:"data center incorrect works"}));
                    }
                })
                .catch(()=> {
                    res.writeHead(500);
                    res.end(JSON.stringify({error: 'data center is broken'}));
                });
        });
        return;
    }
    if(req.url.endsWith('/jwt-token')) {
        console.log('ddedada')
        parseFormdata(req, (err, data) => {
            try {
                const {fields} = data || {};
                const header = fields && fields.header || '';
                const headerObj = JSON.parse(header);
                const payload = fields && fields.payload || '';
                const payloadObj = JSON.parse(payload)
                const key = fields && fields.key || 'jwt-key';

                const jwtToken = jwt.sign(payloadObj, key, {
                    noTimestamp: true,
                    header: headerObj
                });
                console.log(headerObj)
                console.log(payloadObj)
                res.writeHead(200);
                res.end(JSON.stringify(jwtToken));
            } catch (e) {
                console.log(e)
                res.writeHead(400);
                res.end(JSON.stringify({error: 'incorrect'}));
            }
        });
        return;
    }

    res.writeHead(200);
    res.end('Auth server is worked')
}).listen(8082, () => console.log('Авторизационный сервер работает!'));