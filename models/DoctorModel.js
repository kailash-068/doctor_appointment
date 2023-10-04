const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: String,
  designation: String,
  speciality: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
