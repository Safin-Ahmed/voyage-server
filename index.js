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
        const database = client.db("tourismWebsite");
        const packageCollection = database.collection("packages");

        // GET METHOD FOR LOADING DATA
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const packages = await cursor.toArray();
            res.send(packages);
            console.log("hitted packages");
        })

        // POST METHOD FOR SENDING DATA TO DB
        app.post('/packages', async (req, res) => {
            const data = req.body;
            const result = await packageCollection.insertOne(data);
            res.json(result);
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