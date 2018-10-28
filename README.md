# twitter-application

### 1/ Project setup

```
npm run install
```

### 2/ Create a new .env file based on the .env.example and put your API cresidentials in it.

### 3/ Go to the projet folder via your command line and then put the following command

```
node index.js
```

### 4/ Copy/Paste this on your navigator

```
localhost:5000
```

### Explanations

I excluded the retweets from the tweets that were supposed to be retrieved and added on the front.
I also allowed the user to enter his own search terms. However, they can't do more than a research every 3 seconds. 

There is a problem regarding the research function, I haven't found out how to make only one query at a time so I decided to disable the searchbar once the first input has been made and ask the user to reload the server.
