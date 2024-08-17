// 1- Install Mongoose (npm install mongoose)

// 2- Require Mongoose in your application:

const mongoose = require("mongoose");

// 3- Define a Schema:
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  age: { type: Number, required: true, min: 18, max: 60 },
});

// 4- Create and Export the Model
const User = mongoose.model("User", userSchema);
// module.exports = User;

// 5- Using the Model
const user = new User({
  name: "Salman Khan",
  email: "slman@gmail.com",
  age: "59",
});

const createUser = async () => {
  try {
    let result = await user.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    let result = await User.findByIdAndDelete(id);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/demo27");
  await deleteUser("66af35772655af2d8adf6545");
};

main();
