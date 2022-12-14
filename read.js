const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const User = require("./model/User");

console.log(User);

async function main() {
  const db_url = "mongodb://localhost:27017/mongoose_test";

  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(db_url);

    // Find the listing by name
    await findOneListingByName("Jen");

    // Find listings by city name
    await findListingByCity("California");

    // Find all the listings in between range of age
    await findListingByAge(20, 30);
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
  const results = await User.find({ city: nameOfListing });
  if (results) {
    console.log(results);
  } else {
    console.log(`No listings found with the city '${nameOfListing}'`);
  }
}

async function findListingByAge(lowerlimit, upperLimit) {
  const results = await User.find({
    age: { $gte: lowerlimit, $lte: upperLimit },
  });
  if (results.length > 0) {
    console.log(results);
    results.forEach((result, i) => {
      console.log(`
        ${i + 1}.  _id: ${result._id}
           Name: ${result.name}
           City: ${result.city}
            Age: ${result.age}
      `);
    });
  } else {
    console.log(
      `No listings found within age ${lowerlimit} and age ${upperLimit}.`
    );
  }
}
