const models = require("../models");
const Patient = models.Patient;
const Op = models.Sequelize.Op;

/**
  * Update Patient information
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error object: {error: [error]}  with status code 500
  *  and error object or response object of user created
  * with status code 201
  *  
  */
exports.updatePatient = async (req, res) => {
  try {
    const { fullname, age, gender, phone_number, address } = req.body;
    const userId = req.params.userId;
    
    let patient = await Patient.findOne({ where: { patient_id: userId}});

    // Save User in the database
    patient.fullname = fullname;
    patient.age = age;
    patient.gender = gender;
    patient.phone_number = phone_number;
    patient.address = address;

    await patient.save();

    
    return res.status(201).json({ message: 'Patient updated successfully', patient });
  } catch(error) {
    console.log("updatePatient Error: ", error);
    return res.status(500).json({error: error.message});
  }    
};

/**
  * Fetch Patient information
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error object: {error: [error]}  with status code 500
  *  and error object or response object of user created
  * with status code 201
  *  
  */
exports.getPatient = async (req, res) => {
  try {
    console.log('patient Request: ', req.body);
    const userId = res.locals.userId;
    
    let patient = await Patient.findOne({ where: { patient_id: userId}});

    if(!patient) {
      return res.status(404).json({error: "patient not Found"});
    }

    console.log('userId: ', userId);    
    return res.status(201).json({ message: 'Patient fetch successfully', patient });
  } catch(error) {
    console.log("getPatient Error: ", error);
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
    const { search } = req.query;
    console.log("req.query ", req.query);
    let whereClause = {};
    if(search) {
      whereClause = {
        [Op.or]: [
          { fullname: { [Op.like]: `%${search}%` } },
          { age: { [Op.like]: `%${search}%` } },
          { gender: { [Op.like]: `%${search}%` } },
          { phone_number: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const patients = await Patient.findAll({ where: whereClause });

    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};