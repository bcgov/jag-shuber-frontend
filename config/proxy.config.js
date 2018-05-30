'use strict';


const proxyConfig = {
  "/api/v1/": {
    "target": process.env.API_URL,
    "changeOrigin": true,
    "ignorePath": false,
    "secure": false
  }
}

module.exports = proxyConfig;
