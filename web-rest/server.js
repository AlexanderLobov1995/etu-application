const https = require('https');
const fs = require('fs');
const httpProxy = require('http-proxy');
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
        const resBody = body && JSON.parse(body) || {error: 'something wrong'};
        res.writeHead(res.statusCode, headers);
        if (req.url.startsWith('/auth') && !resBody.error ) {
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
    if(req.url.startsWith('/auth') || req.url.startsWith('/todos')){
        const reqToken = (req.headers.authorization || '').replace('Bearer ', '');
        const jwtToken = cacheToken.get(reqToken);
        if(jwtToken){
            req.headers.authorization = `Bearer ${jwtToken}`
        }
        proxy.web(req, res, {
            target: getTarget(req.url),
            changeOrigin: true,
            secure: false
        });
        return;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Server is worked');

}).listen(8081, () => console.log('Сервер работает!'));

function getTarget(url) {
    if(url.startsWith('/auth')){
        return 'https://localhost:8082/auth'
    }
    if(url.startsWith('/todos')){
        return 'https://localhost:8083/todos'
    }
    return '';
}