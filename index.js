const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jjl8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("carMechanic");
        const mechanicCollection = database.collection("services");

        // GET METHOD FOR LOADING DATA
        app.get('/mechanics', async (req, res) => {
            const cursor = mechanicCollection.find({});
            const mechanics = await cursor.toArray();
            res.send(mechanics);
            console.log("hitted mechanics");
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Hello There!");
})

app.listen(port, () => {
    console.log("Listening to Port", port);
})