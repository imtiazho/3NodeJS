const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const dns = require("dns");

// Middleware
app.use(cors());
app.use(express.json());

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri =
  "mongodb+srv://smartDealDb:1s6QnQnAQB8M9Wsi@cluster0.ab3rgue.mongodb.net/?appName=Cluster0";

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

    app.get("/products", async (req, res) => {
      const projectsField = {
        _id: 0,
        title: 1,
        price_min: 1,
        price_max: 1,
        image: 1,
      };
      const cursor = productsCollections
        .find()
        .sort({ price_min: 1 })
        .skip(2)
        .limit(5)
        .project(projectsField); // Sort for ascending order and skip for skip the products among the products and limit for quantity of Data and project for only specify the field which i only want
      // const cursor = productsCollections.find().sort({price_min : -1}); // For descending order
      const result = await cursor.toArray();
      res.send(result);
    });

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
