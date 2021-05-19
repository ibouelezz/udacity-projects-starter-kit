const mockAPIResponse = require('./mockAPI.js')

const PORT = 8081

const dotenv = require('dotenv')
dotenv.config()

var path = require('path')
const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    // Use this when testing development
    res.sendFile(path.resolve('src/client/views/index.html'))

    // Use this for production
    // res.sendFile(path.resolve('dist/index.html'))
})
// a route that handling post request for new URL that coming from the frontend
app.post('/articles', async function (req, res) {
    console.log(req.body.url)
    const response = await fetch(
        `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&url=${req.body.url}&lang=en`
    )
    const jsond = await response.json()
    const sample = {
        score_tag: jsond.score_tag,
        agreement: jsond.agreement,
        subjectivity: jsond.subjectivity,
        confidence: jsond.confidence,
        irony: jsond.irony
    }
    return res.send(sample)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})
