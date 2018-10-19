const http = require("http");
const { Transform } = require("stream");
const WebSocket = require("ws");
const fs = require("fs");

const server = http.createServer();
const wsServer = new WebSocket.Server( { server } );

server.on("request", (request, response) => {
  const fileSrc = fs.createReadStream("./index.html");
  fileSrc.pipe(response);
});

server.listen(5000);

module.exports = {
  server,
  wsServer,
};
