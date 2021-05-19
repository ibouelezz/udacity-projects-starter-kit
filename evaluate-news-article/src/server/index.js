// TODO: Configure the environment variables

const mockAPIResponse = require('./mockAPI.js')

const PORT = 8081

// TODO add Configuration to be able to use env variables
const dotenv = require('dotenv')
dotenv.config()

// TODO: Create an instance for the server
var path = require('path')
const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()
// TODO: Configure cors to avoid cors-origin issue
app.use(cors())
// TODO: Configure express to use body-parser as middle-ware.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// TODO: Configure express static directory.
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
/* TODO:
    1. GET the url from the request body
    2. Build the URL it should be something like `${BASE_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${req.body.url}&lang=en`
    3. Fetch Data from API
    4. Send it to the client
    5. REMOVE THIS TODO AFTER DOING IT 😎😎
    server sends only specified data to the client with below codes
     const sample = {
       text: '',
       score_tag : '',
       agreement : '',
       subjectivity : '',
       confidence : '',
       irony : ''
     }
*/

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

// TODO: export app to use it in the unit testing
