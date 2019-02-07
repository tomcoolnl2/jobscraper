
const axios = require('axios')
const express = require('express')
const app = express()
const expressip = require('express-ip')
const PORT = process.env.PORT || 5000
const path = require('path')

const handlebars = require('express-handlebars')
const title = 'Find Jobs for 晶兰 史'

app.engine('.hbs', handlebars({ extname: '.hbs' }))

app.set('PORT', PORT)

app.use(expressip().getIpInfoMiddleware)

app.use(express.static(path.join(__dirname, 'assets')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
    res.render('index', { title })
})

app.get('/search', (req, res) => {
    queries = req.query;
    let url = `https://indreed.herokuapp.com/api/jobs`
    if (queries) {
        axios.get(url, {
            params: queries
        })
        .then(response => {
            res.render('search', { title, jobs: response.data})
        })
        .catch(console.error)
    }
    else {
        res.render('search', { title })
    }
})

app.listen(app.get('PORT'), () => {
    console.log('Express started on http://localhost:' + app.get('PORT') + '; press Ctrl-C to terminate.');
})
