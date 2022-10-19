const express = require("express")
const { create } = require("express-handlebars")
const File = require("./services/products.service")
const file = new File("products.txt")
const hbs = create({})
const app = express()

app.engine("handlebars", hbs.engine)

app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));


app.get("/products", async (req, res) => {
    const products = await file.getAll()
    res.render("view/products", { products })
})

app.post("/products", async (req, res) => {
    const product = {
        title: req.body.title,
        price: parseInt(req.body.price),
        image: req.body.image
    }
    const products = await file.save(product)
    res.send(products)
})

app.put("/products", async (req, res) => {
    const product = {
        title: req.body.title,
        price: parseInt(req.body.price),
        image: req.body.image,
        id: parseInt(req.body.id)
    }
    const replacedProduct = await file.replaceById(product)
    res.send(replacedProduct)
})

app.get("/products/randomProduct", async (req, res) => {
    const randomProduct = await file.getRandom()
    res.send(randomProduct)
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params
    const product = await file.getById(parseInt(id))
    res.send(product)
})

app.delete("/products/:id", async (req, res)=> {
    const { id } = req.params
    const product = await file.deleteById(parseInt(id))
    res.send(product)
})


const port = 8080

app.listen(port, () => {
    console.log(`Your server is running at port ${port}`)
})