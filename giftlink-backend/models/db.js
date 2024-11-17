// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      

    // Task 1: Connect to MongoDB
   try{

    await client.connect()
     // Task 2: Connect to database giftDB and store in variable dbInstance
    dbInstance = client.db(dbName);
    console.log("La conexión con mongodb ha sido exitosa");
     // Task 3: Return database instance
    return dbInstance;
   }catch(err){
    console.error("No se ha podido establecer la conexión con la base de datos"+ err);
   }

     /*
    await client.connect();
    dbInstance = client.db(dbName);
    return dbInstance;
     */
}

module.exports = connectToDatabase;
