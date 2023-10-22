
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Temp_user:fZDD6FWq1JKyDjTl6Q9zho@personalprojectshub.n6wrsgv.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Provide the name of the database and collection you want to use.
// If the database and/or collection do not exist, the driver and Atlas
// will create them automatically when you first write data.
const dbName = "Nespresso";
const collectionName = "Vertuo";

// Create references to the database and collection in order to run
// operations on them.
const database = client.db(dbName);
const collection = database.collection(collectionName);
let foundItems = [];

async function run(callback) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const cursor = await collection.find({in_stock: true}).sort({ name: 1 });
        await cursor.forEach(recipe => {
            console.log(recipe);
            foundItems.push(recipe);
        });
        console.log('All found items:', foundItems);
        console.log('a:', foundItems[0].name);
        callback(foundItems);
    }catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
//run().catch(console.dir);

module.exports = run;
