'use strict';
const paths = require('./paths');

// Need to strip off the served path from requests to the api
const appUrlRewrite = `^${paths.servedPath}`;
const pathRewrite = {};
pathRewrite[appUrlRewrite]='';
const proxyConfig = {
  "/api/v1/": {
    "target": process.env.API_URL,
    "changeOrigin": true,
    "ignorePath": false,
    "secure": false,
    pathRewrite
  }
}

module.exports = proxyConfig;
