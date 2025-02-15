const mongoose = require("mongoose")
const dotenv = require("dotenv")
const connectDB = async ()=>{
    require('dotenv').config();  // To load the environment variables from a .env file

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Connected to the database"))
      .catch((error) => console.log("Error connecting to the database:", error));
    
}

module.exports=connectDB