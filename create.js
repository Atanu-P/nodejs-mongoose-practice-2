const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const User = require("./model/User");

console.log(User);

async function main() {
  const db_url = "mongodb://localhost:27017/mongoose_test";

  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(db_url);

    // Create a single new listing
    await createListing({
      name: "Atanu pal",
      city: "Torrento",
      age: 27,
    });

    // Create 3 new listings
    await createMultipleListing([
      {
        name: "Jen",
        city: "Quebac",
        age: 22,
      },
      {
        name: "Alex",
        city: "Bramphton",
        age: 26,
      },
      {
        name: "Ray",
        city: "California",
        age: 24,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

main();

async function createListing(newListing) {
  const result = await User.create(newListing);
  console.log(result);
}

async function createMultipleListing(newListings) {
  const result = await User.insertMany(newListings);
  console.log(result);
}
