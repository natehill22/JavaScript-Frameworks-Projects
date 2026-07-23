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

        await collection.updateOne(
            { name: "The World at War" },
            { $set: { directorId: "6a613e8efec030abf59df133" } }
        );
        await collection.updateOne(
            { name: "The Sorrow and the Pity" },
            { $set: { directorId: "6a613e8efec030abf59df134" } }
        );
        await collection.updateOne(
            { name: "The War" },
            { $set: { directorId: "6a613e8efec030abf59df135" } }
        );
        await collection.updateOne(
            { name: "The Nazis: A Warning from History" },
            { $set: { directorId: "6a613e8efec030abf59df136" } }
        );

        //Inserts new field (with custom values) into each database document and gives success message
        console.log(`Success! Updated documentaries`);

    } catch (err) {
        console.error("An error occured:", err);

    } finally {
        //Closes the connection so the script exits
        await client.close();
        console.log('Connection closed.');
    }
}

main();