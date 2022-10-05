const express = require("express")
const File = require('./products')
const app = express()
app.use(express.json());
const port = 8080

const file = new File("products.txt")

app.get('/products', async (req, res) => {
    const products = await file.getAll()
    res.send(products)
})

app.post('/products', async (req, res) => {
    const product = req.body
    const products = await file.save(product)
    res.send(products)
})

app.get('/randomProduct', async (req, res) => {
    const randomProduct = await file.getRandom()
    res.send(randomProduct)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await file.getById(parseInt(id))
    res.send(product)
})

app.listen(port, () => {
    console.log(`Your server is running at port ${port}`)
})