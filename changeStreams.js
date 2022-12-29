const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function main() {
  // const db_url = "mongodb://localhost:27017/mongoose_test";

  // Mongo Db Theater
  const db_url =
    "mongodb+srv://node:node1234@test.7ydnwmm.mongodb.net/node_auth?retryWrites=true&w=majority";
  try {
    // Connect to the MongoDB cluster
    const db = (await mongoose.connect(db_url)).connection;

    // Change stream without aggreation pipeline
    db.collection("users")
      .watch()
      .on("change", async (data) => {
        console.log(await db.collection("users").find().toArray());
        console.log(data);
      });
  } catch (error) {
    console.log(error);
  }
}

main();
