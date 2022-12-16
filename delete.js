const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const User = require("./model/User");

console.log(User);

async function main() {
  const db_url = "mongodb://localhost:27017/mongoose_test";

  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(db_url);

    // Delete listing by name
    await deleteListingByName("Jen");

    // Delete listing by name and return deleted listing
    await deleteListingByName_ReturnDeletedListing("Jen");

    // Delete listing by age less then input
    await deleteListingByAgeLessThen(27);

    // Delete listing by age greater then input
    await deleteListingByAgeGreaterThen(27);

    // Show all listing
    await findAllListing();
  } catch (error) {
    console.log(error);
  }
}

main();

async function deleteListingByName(nameOfListing) {
  const result = await User.deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingByName_ReturnDeletedListing(nameOfListing) {
  const result = await User.findOneAndDelete({ name: nameOfListing });
  console.log(result);
}

async function deleteListingByAgeLessThen(age) {
  const result = await User.deleteMany({ age: { $lt: age } });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingByAgeGreaterThen(age) {
  const result = await User.deleteMany({ age: { $gt: age } });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function findAllListing() {
  const results = await User.find();
  console.log(results);
}
