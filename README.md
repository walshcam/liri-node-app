**Created By:** Cameron Walsh

**Turned In As Homework On:** April 23rd, 2018


**What is this product**

This project was completed to show mastery of basic api requests using node.js. This file uses the following npm packages:

   - [Twitter](https://www.npmjs.com/package/twitter)
   
   - [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   
   - [Request](https://www.npmjs.com/package/request)

   - [DotEnv](https://www.npmjs.com/package/dotenv)

   - fs (a global package)

**What this product does**

Utilizing the packages above, the application does the following.

- Displays the last 20 tweets of [@MilkIsSpicy](https://twitter.com/MilkIsSpicy) using the command: 
```node liri.js my-tweets```

- Finds music information using the spotify api with:

    ```
    node liri.js spotify-this-song <song title>
    ```

    - Finds movie information using the OMBD api with:

    ```
    node liri.js movie-this <movie title>
    ```

    - Do a random action from the random.txt text file with:

    ```
    node liri.js do-what-it-says
    ```

**How users can get started with the project**

Download the files, download the npm packages, and utilize the terminal to work this project.

```
npm i
```

**Who maintains and contributes to the project**

Cameron Walsh currently maintains this project.