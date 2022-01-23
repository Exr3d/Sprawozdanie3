const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url2 = 'https://rykoszet.info/category/wot'
const url1 = 'https://www.theguardian.com/uk'

function theguardianScrap(){
axios(url1)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const titles = []

        $('.fc-item__title', html).each(function() {
            const title = $(this).find('a').text()
            const url = $(this).find('a').attr('href')
            titles.push({
                title,
                url
            })
        })
        console.log(titles)
    }).catch(err => console.log(err))
}
function RykoszetScrap(){
    axios(url2)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const headers = []
    
            $('.post-content', html).each(function() {
                const title = $(this).find('a').text()
                const url = $(this).find('a').attr('href')
                headers.push({
                    title,
                    url
                })
            })
            console.log(headers)
        }).catch(err => console.log(err))
        
    }
theguardianScrap()
RykoszetScrap()


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))