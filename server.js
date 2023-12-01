const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.get("/", (req, res) => {
  res.send("Hello elitjohns");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog my name is Victor");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
//update a product

app.put("/products:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findIdAndUpdate(id, req.body);
    //cannot find any product to update
    if (!product) {
      return res
        .status(404)
        .json({ message: "cannot find any product with ID ${id}" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(upadatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//delete a product

app.delete("/products:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "cannot find any product with ID ${id}" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://victor:0a0b0c0d@victor.upfru4v.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app
      .listen(3000, () => {
        console.log("NODE API is running on port 3000");
      })
      
  }).catch((error) => {
    console.log(error);
  });
