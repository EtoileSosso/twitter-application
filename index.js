const {server, wsServer} = require("./server");
const stream = require("./twitter");
const {tweetExtractor, stringify, counter} = require("./transforms");
const SocketStream = require("./SocketStream");

const clients = [];

const transformedStream = stream.pipe(tweetExtractor)
                                .pipe(counter)
                                .pipe(stringify);

wsServer.on("connection", ws => {

  clients.push(ws);

  ws.on("message", message => {
    console.log("message from client: ", message);
    let search = null;
    search = stream.track(message);
  });

  const socketStr = new SocketStream(ws);
  transformedStream.pipe(socketStr);
});
