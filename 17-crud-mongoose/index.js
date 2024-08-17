const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/schema")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: { type: Number, required: true, min: 18, max: 60 },
});

const User = mongoose.model("User", userSchema);

const createUser = async () => {
  const user = new User({
    name: "demo",
    email: "demo@gmail.com",
    age: 23,
  });

  try {
    const result = await user.save();
    console.log("User Created:", result);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    console.log("All Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    console.log("User by ID:", user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
  }
};

const updateUser = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name: "Updated Name" },
      { new: true, runValidators: true }
    );
    console.log("Updated User:", user);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    console.log("Deleted User:", user);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Example calls
(async () => {
  await createUser();
  await getUsers();
  await getUserById("60c72b2f9b1d4c3b8c8f8a72"); // Replace with a valid ID
  await updateUser("60c72b2f9b1d4c3b8c8f8a72"); // Replace with a valid ID
  await deleteUser("60c72b2f9b1d4c3b8c8f8a72"); // Replace with a valid ID
})();
