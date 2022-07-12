const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect("mongodb+srv://sneka:eGzSgZ8N3bnuqbNg@cluster0.5evyr.mongodb.net/SnekaEcommerce?retryWrites=true&w=majority")
.then(() => {
    console.log("db got connected")
}).
then(() => {
    app.listen(7000,() => console.log("listening to 7000"))
})
.catch(err => console.log("error : ",err.message))
