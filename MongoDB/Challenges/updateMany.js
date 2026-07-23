const { MongoClient } = require('mongodb');
//Create a database named "grampadb"
const url = "mongodb://localhost:27017";
const dbName = 'grampadb';

async function main() {
    const client = new MongoClient(url);

    try {
        //Connects to the MongoDB server using promise
        await client.connect();
        console.log('Connected successfully to the server');

        //Accesses the database
        const db = client.db(dbName);

        //Creates collection automatically by inserting data
        const collection = db.collection('WW2Documentaries');

        //Updates every document in the collection
        const filter = {};

        //Defines what is to be updated
        const updateGenre = {
            $set: { 
                genre: "Documentary" //Adding a documentary genre to all files
            },
        };

        //Updates all documents in the collection and gives success message
        const result = await collection.updateMany(filter, updateGenre);
        console.log(`Success! Matched ${result.matchedCount} documents`);
        console.log(`Successfully updated ${result.modifiedCount} documents`);

    } catch (err) {
        console.error("An error occured:", err);

    } finally {
        //Closes the connection so the script exits
        await client.close();
        console.log('Connection closed.');
    }
}

main();