const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

// Middle Ware
app.use(cors());
app.use(express.json());

// simpleDbUser
// lSmot0yqr5d09T6T

const uri =
  "mongodb+srv://simpleDbUser:lSmot0yqr5d09T6T@cluster0.ab3rgue.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // No need to write here yet
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Simple CRUD running");
});

app.listen(port, () => {
  console.log(`Simple CRUD is running on port ${port}`);
});
