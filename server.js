const express = require("express");
const app = express();
const Doctor = require("./models/DoctorModel");
const Patient = require("./models/PatientModel");

const connectDB = require("./config/db");
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to Our Home Page");
});

app.get("/doctors", async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (err) {
    next(err);
  }
});

app.get("/doctors/:id", async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    res.json(doctor);
  } catch (err) {
    next(err);
  }
});

app.post("/patient", async (req, res, next) => {
  try {
    const { name, age, disease, date } = req.body;
    if (!(name && age && disease && date)) {
      res.status(400).send("All inputs are required!!");
    }

    const patientExists = await Patient.findOne({ name });
    if (patientExists) {
      res.status(400).send("Patient already Exists");
    } else {
      const patient = await Patient.create({
        name,
        age,
        disease,
        date,
      });
      res.json({
        success: "Patient registered Successfully!",
        registeredPatient: {
          _id: patient._id,
          name: patient.name,
          disease: patient.disease,
          date: patient.date,
        },
      });
    }
  } catch (err) {
    next(err);
  }
});

//Error Handler
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
