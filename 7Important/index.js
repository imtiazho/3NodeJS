const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const dns = require("dns");
require("dotenv").config();
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

const serviceAccount = require("./firebase-admin-sdk.json");
const { Verify } = require("crypto");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware
app.use(cors());
app.use(express.json());

const logger = (req, res, next) => {
  console.log("Logging info");
  next();
};

const verifyFirebaseToken = async (req, res, next) => {
  // console.log("In the verify middleware");
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorize access forbidden" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorize access forbidden" });
  }

  // Verify Token
  try {
    const userInfo = await admin.auth().verifyIdToken(token);
    // console.log("After token validation", userInfo);
    req.token_email = userInfo.email;
    next();
  } catch {
    return res.status(401).send({ message: "Unauthorize access forbidden" });
  }
};

const verifyJWTToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "Unauthorize access forbidden" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorize access forbidden" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorize access forbidden" });
    }
    req.token_email = decoded.email;

    next();
  });
};

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

    // JWT related APIs
    app.post("/getToken", (req, res) => {
      const loggedUser = req.body;
      const token = jwt.sign(loggedUser, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token: token });
    });

    // Users API
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const email = req.body.email;
      const query = { email: email };
      const existingUser = await usersCollections.findOne(query);
      if (existingUser) {
        res.send({
          message: "This USER already exist. No need to insert again",
        });
      } else {
        const result = await usersCollections.insertOne(newUser);
        res.send(result);
      }
    });

    // Products API
    app.get("/latest-products", async (req, res) => {
      const cursor = productsCollections
        .find()
        .sort({ created_at: -1 })
        .limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });
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

    // Bids related APIs with firebase token verify
    // app.get("/bids", logger, verifyFirebaseToken, async (req, res) => {
    //   // console.log(req.headers.authorization);
    //   const email = req.query.email;
    //   const query = {};

    //   if (email) {
    //     if (email !== req.token_email) {
    //       return res.status(403).send({ message: "Forbidden Access" });
    //     }
    //     query.buyer_email = email;
    //   }

    //   const cursor = bidsCollections.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    // Verify with jwt token
    app.get("/bids", verifyJWTToken, async (req, res) => {
      console.log(req.headers.authorization);
      const email = req.query.email;
      const query = {};
      if (email) {
        query.buyer_email = email;
      }

      // Verify user have access to see this data
      if (email !== req.token_email) {
        return res.status(403).send({ message: "Forbidden Access" });
      }

      const cursor = bidsCollections.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/bids/byProduct/:id", verifyFirebaseToken, async (req, res) => {
      const query = { product: req.params.id };
      const cursor = bidsCollections.find(query).sort({ bid_price: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/bids", async (req, res) => {
      const newBid = req.body;
      const result = await bidsCollections.insertOne(newBid);
      res.send(result);
    });

    app.delete("/bids/:id", async (req, res) => {
      const result = await bidsCollections.deleteOne({
        _id: new ObjectId(req.params.id),
      });
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
