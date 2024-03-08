const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 4000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
};
app.use(allowCrossDomain)
app.get('/', (req, res) => {
    console.log('asdasd')
    res.json({ message: "updated" })
})
app.post('/create-category', (req, res) => {
    const { name } = req.body
    res.json({ id: 1, name })
})

app.post('/categories/:id', (req, res) => {
    const { name } = req.body
    const {id} = req.params
    res.json( { id, name } )
})

app.post('/get-categories', (req, res) => {
    res.json([{
        id: 1, name: "asdfhusahdf"
    }])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})