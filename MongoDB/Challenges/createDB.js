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

        //Inserts dummy document to test db and sends message
        await db.collection('test').insertOne({ created:true });
        console.log(`Database "${dbName}" and "test" collection created!`);

    } catch (err) {
        console.error("An error occured:", err);

    } finally {
        //Closes the connection so the script exits
        await client.close();
        console.log('Connection closed.');
    }
}

main();