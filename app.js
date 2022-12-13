const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const User = require("./model/User");

console.log(User);

async function main() {
  const db_url = "mongodb://localhost:27017/mongoose_test";

  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(db_url);
  } catch (error) {
    console.log(error);
  }
}

main();
