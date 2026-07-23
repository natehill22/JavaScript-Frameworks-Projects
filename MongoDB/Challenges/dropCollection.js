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

        //Sets variable to be the name of the collection to be deleted
        const collectionName = 'WW2Documentariesh';

        //Sets a variable to be a the promise of the dropped collection
        const toDrop = await db.collection(collectionName).drop();

        //Finds the document matching query criteria and gives success message
        if (toDrop) {
            console.log(`Success! Deleted collection ${collectionName}`);
        } else {
            console.log(`Collection ${collectionName} could not be dropped`);
        }

    } catch (err) {
        console.error("An error occured:", err);

    } finally {
        //Closes the connection so the script exits
        await client.close();
        console.log('Connection closed.');
    }
}

main();