const functions = require("firebase-functions");
const routes = require('./routes.js')
const express = require('express')
const cors = require('cors')

// Setup CORS
const corsConfig = {
    methods: ['GET'], // Allowed request methods
    origin: true // Allow all origins
}

// Setup Express app
const app = express()
    .use('/', routes)
    .use(cors(corsConfig))

// Return app from function on '/api' endpoint
exports.api = functions
    .https.onRequest((request, response) => {
        return app(request, response)
    })
