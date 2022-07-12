const mongoose = require ("mongoose");


const connectDatabase = () =>{
    console.log("db code")
mongoose.connect("mongodb+srv://sneka:eGzSgZ8N3bnuqbNg@cluster0.5evyr.mongodb.net/SnekaEcommerce?retryWrites=true&w=majority").then((data)=>{
    // console.log(`Mongodb connected with server :${data.connection.host}`);   
    console.log("db got connected")
});

}

module.exports = connectDatabase