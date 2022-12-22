const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Dummy = require("./model/Staff");

console.log(Dummy);

async function main() {
  const db_url = "mongodb://localhost:27017/mongoose_test";

  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(db_url);

    await fliterByCountry("Senior Cost Accountant", "Female");
  } catch (error) {
    console.log(error);
  }
}

main();

async function fliterByCountry(designation, gender) {
  const pipeline = [
    {
      $match: {
        designation: designation,
        gender: gender,
      },
    },
    {
      $sort: {
        first_name: 1,
      },
    },
  ];

  const listings = await Dummy.aggregate(pipeline);
  console.log(listings);
}
