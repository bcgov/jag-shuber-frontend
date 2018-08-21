const http = require('http');
const httpProxy = require('http-proxy');
const request = require('request');
const chalk = require('chalk');
const paths = require('../config/paths');

const DEFAULT_PORT = 8000;

const webEndpoints = [
    paths.servedPath,
    '/sockjs-node'
]

function getSMHeaders(headers = {}) {
    // Use Environment variables if available other wise default
    // allow override from options
    return {
        SMGOV_USERGUID: process.env.SMGOV_USERGUID || 'SOMEGUIDGOESHERE',
        SMGOV_USERDISPLAYNAME: process.env.SMGOV_USERDISPLAYNAME || 'Name, Your',
        SMGOV_USERTYPE: process.env.SMGOV_USERTYPE || 'user',
        SMGOV_USERIDENTIFIER: process.env.SMGOV_USERIDENTIFIER || 'yname',
        ...headers,
    }
}

function createFakeMinder(options = {}) {
    const {
        target = 'http://localhost:3000',
        headers = {},
    } = options;

    const proxy = httpProxy.createProxy({
        target,
        autoRewrite: true,
        headers: getSMHeaders(headers)
    });

    proxy.on('proxyReq', (proxyReq, req, res, options) => {
        // Remove the servedPath from the proxied requests
        // proxyReq.url = req.url.replace(paths.servedPath, '');
        // console.log(proxyReq.url);
    });

    const server = http.createServer((req, res) => {
        if (webEndpoints.some(ep => req.url.indexOf(ep) == 0)) {
            return proxy.web(req, res);
        } else {
            console.warn(`404 ${req.url}`)
            res.statusCode = 404;
            res.end();
        }
    });

    // Listen to the upgrade event and proxy websocket requests
    // This is used by webpack dev server hot reload
    server.on('upgrade', (req, socket, head) => {
        proxy.ws(req, socket, head);
    })

    return server;
}

function startFakeMinder(port = DEFAULT_PORT, options = {}) {
    const server = createFakeMinder(options);
    server.listen(port)
    const url = `http://localhost:${port}${paths.servedPath}`;
    console.log(chalk.cyan(`FakeMinder listening at ${url}`));
    return {
        server,
        url
    };
}

module.exports = {
    createFakeMinder,
    startFakeMinder,
    defaultPort: DEFAULT_PORT
}