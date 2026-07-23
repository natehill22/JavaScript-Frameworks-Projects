const { MongoClient } = require('mongodb');
const { pipeline } = require('node:stream');
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

        const pipeline = [
            {
                $lookup: {
                    from: "Directors", //The collection to join with
                    let: { docDirectorId: "$directorId" }, //Stores the directorId string as a variable
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    //Converts string to an ObjectId to match Directors._id
                                    $eq: ["$_id", {$toObjectId: "$$docDirectorId" }]
                                }
                            }
                        }
                    ],
                    as: "directorDetails" //Output array name                    
                }
            },
            {
                //Flattens the directorDetails array into a single object
                $unwind: {
                    path: "$directorDetails",
                    preserveNullAndEmptyArrays: true //Keeps documentary even if no director is found
                }
            }
        ];

        //Combines the collections by putting Directors array into WW2Documentaries database and gives success message
        const result = await collection.aggregate(pipeline).toArray();
        console.log("Joined results:", JSON.stringify(result, null, 2));

    } catch (err) {
        console.error("An error occured:", err);

    } finally {
        //Closes the connection so the script exits
        await client.close();
        console.log('Connection closed.');
    }
}

main();