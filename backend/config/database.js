const mongoose = require ("mongoose");

const connectDatabase = () =>{
    mongoose.connect("mongodb+srv://sneka:eGzSgZ8N3bnuqbNg@cluster0.5evyr.mongodb.net/SnekaEcommerce?retryWrites=true&w=majority").then((data)=>{
    console.log("db got connected")
});

}

module.exports = connectDatabase