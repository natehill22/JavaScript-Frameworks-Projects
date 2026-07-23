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

        //Sets a sort config to use descending alphabetical order on the name field
        const nameSort = { name: -1 }

        //Find returns the cursor object (instead of the document) matching query criteria and gives success message
        const result = await collection.find().sort(nameSort).toArray();
        if (result.length > 0) {
            console.log(`Success! Returned ${result.length} sorted documentaries`);

            //Loops through results and prints out every name
            result.forEach((doc, index) => {
                console.log(`${index + 1}. ${doc.name}`);
            });
        } else {
            console.log('No documents matched the query criteria')
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