const { Transform } = require("stream");

const tweetExtractor = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const newChunk = chunk.text;
    this.push(newChunk);
    callback();
  }
});

const stringify = new Transform({
  writableObjectMode: true,

  transform(chunk, _, callback) {
    const newChunk = JSON.stringify(chunk) + "\n";
    this.push(newChunk);
    callback();
  }
});

let count = 0;
const counter = new Transform({
  writableObjectMode: true,
  readableObjectMode: true,

  transform(chunk, _, callback) {
    count += 1;
    this.push({
      tweet: chunk,
      count
    });
    callback();
  }
});

module.exports = {
  tweetExtractor,
  stringify,
  counter
};
