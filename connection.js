const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// console.log(Admin);
async function main() {
  const db_url = "mongodb://localhost:27017";

  try {
    // Connect to the MongoDB cluster
    const con = await mongoose.connect(db_url);

    // Make the appropriate DB calls
    await listDatabases(con.connection.db);
  } catch (error) {
    console.log(error);
  }
}

main();

async function listDatabases(db_client) {
  try {
    const Admin = mongoose.mongo.Admin;
    const databasesList = await new Admin(db_client).listDatabases();

    console.log("Databases :");
    databasesList.databases.forEach((db) => {
      console.log(` - ${db.name}`);
    });
  } catch (error) {
    console.log(error);
  }
}
