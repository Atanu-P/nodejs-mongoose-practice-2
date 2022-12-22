const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  designation: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Dummy = mongoose.model("dummys", staffSchema);

module.exports = Dummy;
