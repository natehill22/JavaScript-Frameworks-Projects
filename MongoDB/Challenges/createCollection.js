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

        const newDoc = {
            name: "The World at War",
            episodes: 26,
            runningTime:  "22 hours 32 minutes",
            releaseDate: "October 31, 1973"
        };

        //Inserts the object above as a database document and gives success message
        const result = await collection.insertOne(newDoc);
        console.log(`Success! Inserted documentary with _id: ${result.insertedId}`);

    } catch (err) {
        console.error("An error occured:", err);

    } finally {
        //Closes the connection so the script exits
        await client.close();
        console.log('Connection closed.');
    }
}

main();