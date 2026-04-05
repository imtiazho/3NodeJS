const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const dns = require("dns");

// Middleware
app.use(cors());
app.use(express.json());

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri =
  "mongodb+srv://simpleDbUser:xoTdIamyidcBXmNR@cluster0.ab3rgue.mongodb.net/?appName=Cluster0";

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

    console.log("Successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
