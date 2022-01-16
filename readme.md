
# Firebase Cloud Functions - Project Starter
In my experience, Firebase Cloud Functions are the easiest, fastest and most cost-effective (free) platform for deploying serverless projects–small or large. This project starter gives you a fresh Firebase Cloud Functions project with Express setup to receive requests and return responses.

Whatever you do between the request and response is up to you. Using this starter project I have built a functional web scraper with Cheerio, screenshot generator with Puppeteer and a PWA asset generator with Node. All without breaking a sweat.


# Install

Clone repo:
```bash
git clone https://github.com/heyharmon/firebase-functions-express-starter.git [project-name]
```

Open /functions:
```bash
cd [project-name]/functions
```

Install dependencies:
```bash
npm install
```

## Get the Firebase CLI

```bash
npm install -g firebase-tools
```
Documentation: [Firebase CLI Commands](https://firebaseopensource.com/projects/firebase/firebase-tools/)

## Serve Locally

```bash
npm run serve
```
This runs: *"firebase emulators:start --only functions"*

## Connect Firebase Project

Create a [Firebase Project](https://firebase.google.com/)

Then, authenticate with Firebase from the CLI:
```bash
firebase login
```

Documentation: [CLI Authentication](https://firebase.google.com/docs/cli#sign-in-test-cli)

## Deploy to Firebase

```bash
npm run deploy
```
This runs: *"firebase deploy --only functions"*

Documentation: [Function Deployment](https://firebase.google.com/docs/functions/manage-functions)


# Project Structure

### Default Structure

Below is the default structure. It's great for small projects with just a couple functions. With this setup you could write your business logic (what happens between receiving a request and returning a response) directly in the controller. You might even break out into multiple controllers and routes to separate different functions.

```bash
firebase-functions-express-starter
 +- .firebaserc      # Config for switching between projects
 |				     # using 'firebase use'
 |
 +- firebase.json    # Describes properties for your project
 |
 +- functions/       # Directory containing Cloud Functions
   |			     # or Express app in our case
   |
   +- controller.js  # Express controller where you will
   |				 # handle requests
   |
   +- index.js       # Main source file for your project where
   |			     # Express is hooked up to Firebase Functions
   |
   +- routes.js      # Where Express routes are setup
```

### Larger Projects

If you find yourself writing many endpoints, I recommend a more domain-oriented approach to organizing your project. Within "/functions", you would group related business logic into folders where each folder contains it's own controller(s), and routes. This setup scales nicely as more code is introduced, such as helpers and services.

```bash
firebase-functions-express-starter
 +- .firebaserc
 +- firebase.json
 +- functions/
   |
   +- index.js # Domain routes and controllers are imported here
   |
   +- domain-1/
	 +- helpers/
	 +- services/
     +- controller.js
     +- routes.js
   |
   +- domain-2/
     +- controller.js
     +- routes.js
```

## Separating Cloud Functions

By default, your Express app will be run on one Firebase Function. This function will be configured to use Node.js with 256MB of memory and a 60s timeout. That's great for a simple scraper project using Cheerio or jQuery. However, if you are running something more resource intensive such as Puppeteer, or doing image processing, then you will need more resources. You could specify a separate runtime just for Puppeteer and allocate 1GB of memory.

And, if you have other functionality which doesn't need so much memory, you can keep those functions on a smaller runtime. All of this is done within "/functions/index.js". Here's an example where each "domain" of my project has a dedicated runtime:

```js
functions/index.js

...

// Setup separate Express app instances
const function1 = express().use(cors(corsConfig)).use('/', function1Routes)
const function2 = express().use(cors(corsConfig)).use('/', function2Routes)

// Return function 1 from '.../region/function1'
// Firebase will configure this enpoint with defaults: 256MB, 60s timeout
exports.function1 = functions
    .https.onRequest((request, response) => {
        return function1(request, response)
    })

// Return function 2 from '.../region/function1'
// We specify 1GB of memory for this function
exports.function2 = functions
    .runWith({ memory: '1GB' })
    .https.onRequest((request, response) => {
        return function2(request, response)
    })
```
