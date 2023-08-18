const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017"
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = async () => {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,})
    .then( () =>  console.log("Connected to MongoDB successfully"))
    .catch( (error) => {
        console.log("Issuse in DB Connection");
        console.error(error.message);
        process.exit(1);
    })
       
    
}

module.exports = connectToMongo;

