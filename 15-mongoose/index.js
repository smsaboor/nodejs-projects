const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/e-comm");

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    age: { type: Number, required: true, min: 0, max: 60 },
  });
  const User = mongoose.model("User", userSchema);
  const user = new User({
    name: "Ajay Kumar",
    email: "ajay@gmail.com",
    age: 66,
  });

  let result = await user.save();
  console.log(result);
};

main();

// const express = require("express");
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/user");

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Database connection
// mongoose.connect("mongodb://localhost:27017/testdb");

// // Routes
// app.use("/api/users", userRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
