const https = require('https');
const fs = require('fs');
const httpProxy = require('http-proxy');
const urlObj = require('url');
const modifyResponse = require('http-proxy-response-rewrite');

const options = {
    key: fs.readFileSync('../ssl/server.key', 'utf-8'),
    cert: fs.readFileSync('../ssl/server.crt', 'utf-8'),
};

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Origin': 'https://localhost'
};

let cacheToken = new Map();

const proxy = new httpProxy.createProxyServer();
proxy.on('proxyRes', function (proxyRes, req, res) {
    modifyResponse(res, proxyRes.headers['content-encoding'], function (body) {
        res.writeHead(res.statusCode, headers);
        if ((req.url.startsWith('/auth/login') || req.url.startsWith('/auth/signup') || req.url.startsWith('/auth/answer')) && res.statusCode === 200) {
            const resBody = body && JSON.parse(body) || {errorMessage: 'something wrong'};
            cacheToken.set(resBody.sessionToken, resBody.jwtToken);
            return JSON.stringify({
                user: resBody.user,
                token: resBody.sessionToken
            });
        }
        return body;
    });
});

https.createServer(options, (req, res) => {
    try {
        if (req.method === 'OPTIONS') {
            optionsHandle(req, res);
            return;
        }
        if(req.url.startsWith('/auth')) {
            authHandle(req, res);
            return;
        }
        if (req.url.startsWith('/todos')) {
            todoHandle(req, res);
            return;
        }
        res.writeHead(200, headers);
        res.end('Server is worked');
    }catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({errorMessage: 'Server does not work'}));
    }


}).listen(8081, () => console.log('Сервер работает!'));


function authHandle(req, res) {
     try {
        if(req.url.endsWith('/logout')) {
            const reqToken = (req.headers.authorization || '').replace('Bearer ', '');
            if(reqToken) {
                cacheToken.delete(reqToken);
                res.writeHead(200, headers);
                res.end(JSON.stringify('Ok'));
            }else {
                res.writeHead(400, headers);
                res.end(JSON.stringify({error: "no session"}));
            }
            return;
        }
        if(req.url.endsWith('/user')) {
            const reqToken = (req.headers.authorization || '').replace('Bearer ', '');
            const jwtToken = cacheToken.get(reqToken);
            if(jwtToken){
                req.headers.authorization = `Bearer ${jwtToken}`
            }
            const urlPathName = urlObj.parse(req.url, true).pathname;
            proxy.web(req, res, {
                target: getTarget(urlPathName),
                changeOrigin: true,
                secure: false
            });
            return;
        }
        if(req.url.endsWith('/login') || req.url.endsWith('/signup') || req.url.endsWith('/answer') || req.url.endsWith('/jwt-token')) {
            const urlPathName = urlObj.parse(req.url, true).pathname;
            proxy.web(req, res, {
                target: getTarget(urlPathName),
                changeOrigin: true,
                secure: false
            });
        }
     } catch (err) {
         res.writeHead(500);
         res.end(JSON.stringify({errorMessage: 'Server does not work. Cause: Auth server'}));
     }


}

function optionsHandle(req, res) {
    try {
        res.writeHead(200, headers);
        res.end('Server is worked');
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({errorMessage: 'Server does not work. Cause: Options'}));
    }
}

function todoHandle(req, res) {
    try {
        const reqToken = (req.headers.authorization || '').replace('Bearer ', '');
        const jwtToken = cacheToken.get(reqToken);
        if(jwtToken){
            req.headers.authorization = `Bearer ${jwtToken}`
        }
        const urlPathName = urlObj.parse(req.url, true).pathname;
        proxy.web(req, res, {
            target: getTarget(urlPathName),
            changeOrigin: true,
            secure: false
        });
    }catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({errorMessage: 'Server does not work. Cause: Resource server'}));
    }
}


function getTarget(url) {
    if(url.startsWith('/auth')) {
        return `https://localhost:8082${url}`;
    }
    if(url.startsWith('/todos')) {
        return `https://localhost:8083${url}`;
    }
    return '';
}