const http = require('http');
const port = 3000;
const app = require('../Blog API/app');

const server = http.createServer(app);

server.listen(port, () => {console.log('App is running on port: ', port)})
