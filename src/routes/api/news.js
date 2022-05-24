const express = require('express');

const axios = require('axios');
const Cheerio = require('cheerio');

const newspapers = require('../../data/newspapers')

const routes = express.Router()

async function getArticles(newspaperId = null) {
    const articles = []
    try {
        const targetNewsPapers = newspaperId
            ? newspapers.filter(({ source }) => source === newspaperId)
            : newspapers
        for (const newspaper of targetNewsPapers) {
            const { source, url, base } = newspaper

            const response = await axios.get(url)
            const html = response.data;
            const $ = Cheerio.load(html)
            $('a:contains("coronavirus"),a:contains("Coronavirus"),a:contains("covid"),a:contains("COVID")').each(function () {
                const articlesTitle = $(this).text().trim()
                const articlesUrl = $(this).attr('href')


                articles.push({
                    title: articlesTitle,
                    url: `${base}${articlesUrl}`,
                    source,
                })
            })
        }
        return articles

    } catch (error) {
        console.log(error.message);
    }
}

routes.get('/', async (req, res) => {
    try {
        const articles = await getArticles()
        res.json({
            data: articles,
            message: 'Successfully 🚀',
        })

    } catch (error) {
        console.log(error.message);
    }

})


routes.get('/:newspaperId', async (req, res) => {
    try {
        const { newspaperId } = req.params
        console.log(newspaperId);
        const articles = await getArticles(newspaperId)
        res.json({
            data: articles,
            message: 'Successfully 🚀',
        })

    } catch (error) {
        console.log(error.message);
    }

})


module.exports = routes