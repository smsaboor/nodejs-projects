const mongoose = require("mongoose");
const express = require("express");
const { connectDB, closeDB } = require("./connect");

const app = express();
app.use(express.json());

app.post("/contact", async (req, res) => {
  try {
    await connectDB();
    console.log("mongodb connection start ");
    const contactSchema = {
      email: String,
      query: String,
    };
    const Contact = mongoose.model("Contact", contactSchema);
    const contact = new Contact({
      email: req.body.email,
      query: req.body.query,
    });
    await contact
      .save()
      .then((savedEmployee) => {
        res.status(200).send({ message: "data saved!", data: savedEmployee });
      })
      .catch((err) => {
        res.status(500).send({ mesaage: "data not saved!", error: err });
      });
  } catch (error) {
    res.status(500).send({ mesaage: "something wrong!", error: error });
  } finally {
    closeDB();
    console.log("mongodb connection close ");
  }
});

app.listen(2300, () => {
  console.log("Server running on port : 2300");
});
