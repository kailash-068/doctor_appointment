const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: String,
  age: Number,
  disease: String,
  date: String,
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
