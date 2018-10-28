const {server, wsServer} = require("./server");
const stream = require("./twitter");
const {tweetExtractor, stringify, counter, excludeRetweets} = require("./transforms");
const SocketStream = require("./SocketStream");

const clients = [];

const transformedStream = stream.pipe(excludeRetweets).pipe(counter).pipe(stringify);

wsServer.on("connection", ws => {

  clients.push(ws);

  ws.on("message", message => {

    console.log("message from client: ", message);
    stream.track(message);

  });

  const socketStr = new SocketStream(ws);
  transformedStream.pipe(socketStr);
});
