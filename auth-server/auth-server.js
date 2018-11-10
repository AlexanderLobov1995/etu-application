const https = require('https');
const fs = require('fs');

const parseFormdata = require('parse-formdata');
const jwt = require('jsonwebtoken');

const service = require('./auth-service');

const options = {
    key: fs.readFileSync('../ssl/server.key', 'utf-8'),
    cert: fs.readFileSync('../ssl/server.crt', 'utf-8')
};

https.createServer(options, (req, res) => {
    if(req.url.startsWith('/auth')) {
        parseFormdata(req, (err, data) => {
            const {fields} = data || {};
            const username = fields && fields.username || '';
            const password = fields && fields.password || '';
            const userResponse = service.login(username, password);
            if (userResponse) {
                const firstname = userResponse.firstName || '';
                const lastname = userResponse.lastName || '';
                const role = userResponse.audience || 'guest';
                const id = userResponse.id;
                const audience = userResponse.audience || 'guest';
                const user = {firstname, lastname, role, rights: ['get', 'create', 'delete', 'update']};
                const jwtToken = jwt.sign({id, user}, 'etu', {
                    audience,
                    header: {typ: 'JWT'},
                    expiresIn: 3600
                });
                res.writeHead(200);
                const authResponse = {
                    user,
                    jwtToken,
                    sessionToken: (new Date().getTime()).toString()
                };
                res.end(JSON.stringify(authResponse));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({"error":"Credentials are invalid"}));
            }
        });
        return;
    }

    res.writeHead(200);
    res.end('Auth server is worked')
}).listen(8082, () => console.log('Авторизационный сервер работает!'));