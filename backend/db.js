const mongoose = require('mongoose');   
const mongoURI = "mongodb://localhost:27017/uploadImage";
const connectToMongo = () => {
    mongoose.connect(mongoURI);
    console.log("Connected to mongoDB!");
}

module.exports = connectToMongo; //we export it anywhere in our project




