const express = require("express");
const cors = require("cors");
const dns = require("dns");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ab3rgue.mongodb.net/?appName=Cluster0`;

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

    const db = client.db("smart_db");
    const productCollections = db.collection("products");
    const userCollection = db.collection("users");
    const bidsCollections = db.collection("bids");

    // All API will be written here
    // Products API
    // Latest Product
    app.get("/latest-products", async (req, res) => {
      const cursor = productCollections
        .find()
        .sort({ created_at: -1 })
        .limit(9);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/all-products", async (req, res) => {
      const query = {};
      if (req.query.email) {
        query.email = req.query.email;
      }

      const cursor = productCollections.find(query).sort({ created_at: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await productCollections.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollections.insertOne(newProduct);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await productCollections.deleteOne(query);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const updatedProduct = req.body;
      const query = { _id: new ObjectId(req.params.id) };
      const update = {
        $set: updatedProduct,
      };
      const options = {};
      const result = await productCollections.updateOne(query, update, options);
      res.send(result);
    });

    app.patch("/products/:id/status", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const update = {
        $set: { status: "sold" },
      };
      const options = {};
      const result = await productCollections.updateOne(query, update, options);
      res.send(result);
    });
    

    // All users API will be written here
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const email = req.body.email;
      const query = { email: email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        res.send({
          message: "Users already existed. No need to insert again!",
        });
      } else {
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      }
    });

    // Bids Related API will be written here
    app.get("/bids", async (req, res) => {
      const query = {};

      if (req.query.email) {
        query.buyer_email = req.query.email;
      }

      const cursor = bidsCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/bids/by-product/:id", async (req, res) => {
      const query = { product: req.params.id };
      const cursor = bidsCollections.find(query).sort({ bid_price: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/bids", async (req, res) => {
      const newBids = req.body;
      const result = await bidsCollections.insertOne(newBids);
      res.send(result);
    });

    app.delete("/bids/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await bidsCollections.deleteOne(query);
      res.send(result);
    });

    app.patch("/bids/:id/status", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const update = {
        $set: { status: "confirmed" },
      };
      const options = {};
      const result = await bidsCollections.updateOne(query, update, options);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`Hello from server. Smart server is running on ${port}`);
});

app.listen(port, () => {
  console.log(`Smart server is running on ${port}`);
});
