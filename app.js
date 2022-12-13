const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const User = require("./model/User");

console.log(User);

async function main() {
  const db_url = "mongodb://localhost:27017/mongoose_test";

  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(db_url);

    // await findOneListingByName("Jen");
    // await findListingByCity("California");
    await findListingByAge(10, 20);
  } catch (error) {
    console.log(error);
  }
}

main();

async function findOneListingByName(nameOfListing) {
  const result = await User.findOne({ name: nameOfListing });
  if (result) {
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
  }
}

async function findListingByCity(nameOfListing) {
  const result = await User.find({ city: nameOfListing });
  if (result.length > 0) {
    console.log(result);
  } else {
    console.log(`No listings found with the city '${nameOfListing}'`);
  }
}

async function findListingByAge(lowerlimit, upperLimit) {
  const result = await User.find({
    age: { $gte: lowerlimit, $lte: upperLimit },
  });
  if (result) {
    console.log(result);
  } else {
    console.log(
      `No listings found within age ${lowerlimit} and age ${upperLimit}.`
    );
  }
}
