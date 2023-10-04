const connectDB = require("../config/db");
connectDB();

const doctorData = require("./doctorSeed");
const patientData = require("./patientSeed");

const Doctor = require("../models/DoctorModel");
const Patient = require("../models/PatientModel");

const importData = async () => {
  try {
    await Doctor.collection.deleteMany({});
    await Patient.collection.deleteMany({});

    await Doctor.insertMany(doctorData);
    await Patient.insertMany(patientData);

    console.log("Seeder data imported successfully");
    process.exit();
    return;
  } catch (err) {
    console.error("Error while Processing Seeder data", err);
    process.exit(1);
  }
};

importData();
