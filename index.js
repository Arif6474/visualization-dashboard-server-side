const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running my node server");
});

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@cluster0.hombkqk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
      await client.connect();
      console.log("mongodb connected");
    const dataCollection = client.db("visualization-dashboard").collection("data")
    
    // get all data

    app.get('/data', async (req, res) =>{
      const query ={}
      const cursor = dataCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
      })
      //get data details
    app.get('/data/:id' , async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const results= await dataCollection.findOne(query);
      res.send(results);

    })   
    } finally {
      
    }
  }
  run().catch(console.dir);

app.listen(port, () => {
  console.log("server is running ");
});