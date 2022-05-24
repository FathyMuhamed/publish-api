const express = require('express');
const newsRoutes = require('./api/news');


const routes = express.Router()
routes.get('/', (req, res) => {
    res.json({
        message: 'from /api'
    })
})



routes.use('/news',newsRoutes)


module.exports = routes
