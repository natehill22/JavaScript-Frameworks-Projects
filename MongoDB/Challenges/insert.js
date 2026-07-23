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
            name: "The Sorrow and the Pity",
            episodes: 2,
            runningTime:  "251 minutes",
            releaseDate: "September 18, 1969"
        };

        const manyDoc = [
            { name: "The War", episodes: 7, runningTime:  "14 hours", releaseDate: "September 23, 2007" },
            { name: "The Nazis: A Warning from History", episodes: 6, runningTime:  "50 minutes", releaseDate: "October 15, 1997" }
        ];

        //Inserts the singular object above as a database document and gives success message
        //const result = await collection.insertOne(newDoc);
        //Inserts the manyDoc array (full of objects) as database documents and gives success message
        const result = await collection.insertMany(manyDoc);
        console.log(`Success! Inserted documentaries with _id: ${result.insertedId}`);

    } catch (err) {
        console.error("An error occured:", err);

    } finally {
        //Closes the connection so the script exits
        await client.close();
        console.log('Connection closed.');
    }
}

main();