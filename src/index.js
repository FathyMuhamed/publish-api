const express = require('express')
const morgan = require('morgan');
const config = require('./config')

const routes = require('./routes')

const app = express()

const PORT = config.port || 3000

app.use(morgan('dev'))

app.use('/api', routes)

app.get('/', (req, res) => {
    res.json({
        message: 'I am Live 🚀.',
    })
})

app.listen(PORT, () => {
    console.log(`alive server on ${PORT}`);
})


