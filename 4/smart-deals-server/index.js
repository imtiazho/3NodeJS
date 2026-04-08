const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const dns = require("dns");
require('dotenv').config()

// Middleware
app.use(cors());
app.use(express.json());

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ab3rgue.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Smart server is running");
});

async function run() {
  try {
    await client.connect();

    const db = client.db("smart_db");
    const productsCollections = db.collection("products");
    const bidsCollections = db.collection("bids");
    const usersCollections = db.collection("users");

    // Users API
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const email = req.body.email;
      const query = { email: email };
      const existingUser = await usersCollections.findOne(query);
      if (existingUser) {
        res.send({ message: "User already exist. No need to insert again" });
      } else {
        const result = await usersCollections.insertOne(newUser);
        res.send(result);
      }
    });

    // Products API
    app.get('/latest-products', async (req, res) => {
      const cursor = productsCollections.find().sort({created_at: -1}).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    })
    app.get("/products", async (req, res) => {
      //   const projectsField = {
      //     _id: 0,
      //     title: 1,
      //     price_min: 1,
      //     price_max: 1,
      //     image: 1,
      //   };
      //   const cursor = productsCollections
      //     .find()
      //     .sort({ price_min: 1 })
      //     .skip(2)
      //     .limit(5)
      //     .project(projectsField); // Sort for ascending order and skip for skip the products among the products and limit for quantity of Data and project for only specify the field which i only want
      // const cursor = productsCollections.find().sort({price_min : -1}); // For descending order
      const query = {};
      if (req.query.email) {
        query.email = req.query.email;
      }
      const cursor = productsCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // app.get('/products/bids/:productID', (req, res) = )

    app.get("/products/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await productsCollections.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productsCollections.insertOne(newProduct);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const updatedProduct = req.body;
      const query = { _id: new ObjectId(req.params.id) };
      const update = {
        $set: updatedProduct,
      };
      const options = {};
      const result = await productsCollections.updateOne(
        query,
        update,
        options,
      );
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await productsCollections.deleteOne(query);
      res.send(result);
    });

    // Bids related APIs
    app.get("/bids", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.buyer_email = email;
      }

      const cursor = bidsCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    
    app.get('/bids/byProduct/:id', async (req, res) => {
      const query = {product : req.params.id};
      const cursor = bidsCollections.find(query).sort({bid_price: -1});
      const result = await cursor.toArray();
      res.send(result);
    })


    app.post("/bids", async (req, res) => {
      const newBid = req.body;
      const result = await bidsCollections.insertOne(newBid);
      res.send(result);
    });

    app.delete('/bids/:id', async (req, res)=> {
      const result = await bidsCollections.deleteOne({_id: new ObjectId(req.params.id)});
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Smart server is running on ${port}`);
});

// Another way to connect
// client
//   .connect()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Smart server is running on ${port}`);
//     });
//   })
//   .catch(console.dir);
