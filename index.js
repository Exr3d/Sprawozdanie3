const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

//const url = 'https://www.twitch.tv/directory'
const url = 'https://www.theguardian.com/uk'


axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const games = []

        $('.fc-item__title', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            games.push({
                title,
                url
            })
        })
        console.log(games)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))