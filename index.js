const express = require("express")
const productsRouter = require("./routes/products.router")

const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter)

const port = 8080

app.listen(port, () => {
    console.log(`Your server is running at port ${port}`)
})