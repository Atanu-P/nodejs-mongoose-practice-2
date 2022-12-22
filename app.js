const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Dummy = require("./model/Staff");

console.log(Dummy);

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
