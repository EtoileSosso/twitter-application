const { Transform } = require("stream");

const tweetExtractor = new Transform ({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const username = chunk.user.name;
    const profilePic = chunk.user.profile_image_url_https;
    const tweetContent = chunk.text;
    this.push({username, tweetContent, profilePic});
    callback();
  }
});

const stringify = new Transform ({
  writableObjectMode: true,

  transform(chunk, _, callback) {
    const newChunk = JSON.stringify(chunk) + "\n";
    this.push(newChunk);
    callback();
  }
});

let count = 0;
const counter = new Transform ({
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

const excludeRetweets = new Transform ({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    const username = chunk.user.name;
    const profilePic = chunk.user.profile_image_url_https;
    const tweetContent = chunk.text;
    const tweetsArray = chunk.text.split(" ");
    if (tweetsArray[0] !== "RT") {
      this.push({username, tweetContent, profilePic});
    }
    callback();
  }
});

module.exports = {
  tweetExtractor,
  stringify,
  counter,
  excludeRetweets
};
