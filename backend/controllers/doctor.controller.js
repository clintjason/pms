const models = require("../models");
const Doctor = models.Doctor;
const Patient = models.Patient;

/**
  * Update Doctor information
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error object: {error: [error]}  with status code 500
  *  and error object or response object of user created
  * with status code 201
  *  
  */
exports.updateDoctor = async (req, res) => {
  try {
    const { fullname, specialization, phone_number, address } = req.body;
    const userId = res.locals.userId;
    
    let doctor = await Doctor.findOne({ where: { doctor_id: userId}});

    console.log('userId: ', userId);
    console.log('doctor before: ', doctor);

    doctor.fullname = fullname;
    doctor.specialization = specialization;
    doctor.phone_number = phone_number;
    doctor.address = address;

    console.log('doctor after: ', doctor);

    await doctor.save();

    return res.status(201).json({ message: 'Doctor updated successfully', doctor });
  } catch(error) {
    console.log("updatePatient Error: ", error);
    return res.status(500).json({error: error.message});
  }    
};

/**
  * Fetch Doctor information
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error object: {error: [error]}  with status code 500
  *  and error object or response object of user created
  * with status code 201
  *  
  */
exports.getDoctor = async (req, res) => {
  try {
    const userId = res.locals.userId;
    
    let doctor = await Doctor.findOne({ where: { doctor_id: userId}});

    if(!doctor) {
      return res.status(404).json({error: "Doctor not Found"});
    }

    console.log('userId: ', userId);    
    return res.status(201).json({ message: 'Doctor fetch successfully', doctor });
  } catch(error) {
    console.log("getDoctor Error: ", error);
    return res.status(500).json({error: error.message});
  }    
};

/**
  * Fetch All Patient information
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error object: {error: [error]}  with status code 500
  *  and error object or response object of user created
  * with status code 201
  *  
  */
exports.getAllPatients = async (req, res) => {
  try {
    const userId = res.locals.userId;
    
    let doctor = await Doctor.findOne({ where: { doctor_id: userId}});

    if(!doctor) {
      return res.status(404).json({error: "Doctor not Found"});
    }

    console.log('userId: ', userId);    
    return res.status(201).json({ message: 'Doctor fetch successfully', doctor });
  } catch(error) {
    console.log("getDoctor Error: ", error);
    return res.status(500).json({error: error.message});
  }    
};