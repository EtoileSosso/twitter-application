const {server, wsServer} = require("./server");
const stream = require("./twitter");
const {tweetExtractor, stringify} = require("./transforms");
const SocketStream = require("./SocketStream");


wsServer.on("connection", ws => {
  ws.on("message", message => {
    console.log("message from client: ", message);
  });

  const socketStr = new SocketStream(ws);
  stream.pipe(tweetExtractor)
        .pipe(stringify)
        .pipe(process.stdout);
});
