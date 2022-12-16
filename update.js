const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const User = require("./model/User");

console.log(User);

async function main() {
  const db_url = "mongodb://localhost:27017/mongoose_test";

  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(db_url);

    // UPDATE
    await updateListingByName("Jennny", { name: "Jen" });
    await findOneListingByName("Jen");

    // UPSERT
    await upsertListingByName("Jenny", { name: "Jen" });
    await findOneListingByName("Jenny");

    // UPDATE MANY
    await updateAllListingsToHavePropertyType();
    await findAllListing();
  } catch (error) {
    console.log(error);
  }
}

main();

async function updateListingByName(nameOfListing, updatedListing) {
  const result = await User.updateOne(
    { name: nameOfListing },
    { $set: updatedListing }
  );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function upsertListingByName(nameOfListing, updatedListing) {
  const result = await User.updateOne(
    { name: nameOfListing },
    { $set: updatedListing },
    { upsert: true }
  );

  if (result.upsertedCount > 0) {
    console.log(`One document was inserted with the id ${result.upsertedId}`);
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}

async function updateAllListingsToHavePropertyType() {
  const result = await User.updateMany(
    {
      tel_no: { $exists: false },
    },
    {
      $set: { tel_no: "" },
    },
    {
      strict: false,
    }
  );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function findAllListing() {
  const results = await User.find();
  console.log(results);
}

async function findOneListingByName(nameOfListing) {
  const result = await User.findOne({ name: nameOfListing });
  if (result) {
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
  }
}
