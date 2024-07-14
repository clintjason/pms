const models = require("../models");
const VitalSign = models.VitalSign;

/*
  Oral temperature: 35.5°C to 37.5°C
  Axillary temperature: 34.7°C to 37.0°C
  Rectal temperature: 36.6°C to 38.0°C
  Tympanic temperature: 35.8°C to 37.8°C
  Temporal temperature: 35.0°C to 37.2°C
*/
exports.generateTemperature = (req, res) => {
  const temperatureType = req.query.type;
  const temperature = getTemperature(temperatureType);

  res.json({
    temperatureType: temperatureType,
    temperature: temperature
  });
};

/**
 * Custom Temperature Type sensor
 * @param {*} type 
 * @returns 
 */
function getTemperature(type) {
  let temperature;
  switch (type) {
    case 'Oral':
      temperature = getRandomValue(35.5, 37.5);
      break;
    case 'Axillary':
      temperature = getRandomValue(34.7, 37.0);
      break;
    case 'Rectal':
      temperature = getRandomValue(36.6, 38.0);
      break;
    case 'Tympanic':
      temperature = getRandomValue(35.8, 37.8);
      break;
    case 'Temporal':
      temperature = getRandomValue(35.0, 37.2);
      break;
    default:
      temperature = 0;
  }
  return temperature.toFixed(1);
}

/*
  Resting: 60 to 100 bpm
  Exercise: 100 to 180 bpm
  Athlete: 40 to 60 bpm
  Child: 80 to 140 bpm
  Elderly: 50 to 90 bpm
*/
exports.generateHeartRate = (req, res) => {
  const heartRateType = req.query.type;
  const heartRate = getHeartRate(heartRateType);

  res.json({
    heartRateType: heartRateType,
    heartRate: heartRate
  });
};

const getHeartRate = (type) => {
  let heartRate;
  switch (type) {
    case 'Resting':
      heartRate = getRandomValue(60, 100);
      break;
    case 'Exercise':
      heartRate = getRandomValue(100, 180);
      break;
    case 'Athlete':
      heartRate = getRandomValue(40, 60);
      break;
    case 'Child':
      heartRate = getRandomValue(80, 140);
      break;
    case 'Elderly':
      heartRate = getRandomValue(50, 90);
      break;
    default:
      heartRate = 0;
  }
  return Math.round(heartRate);
};


/*
  Resting: 12 to 20 breaths per minute
  Exercise: 20 to 40 breaths per minute
  Infant: 30 to 60 breaths per minute
  Child: 20 to 30 breaths per minute
  Elderly: 12 to 25 breaths per minute
*/
exports.generateRespiratoryRate = (req, res) => {
  const respiratoryRateType = req.query.type;
  const respiratoryRate = getRespiratoryRate(respiratoryRateType);

  res.json({
    respiratoryRateType: respiratoryRateType,
    respiratoryRate: respiratoryRate
  });
};

const getRespiratoryRate = (type) => {
  let respiratoryRate;
  switch (type) {
    case 'Resting':
      respiratoryRate = getRandomValue(12, 20);
      break;
    case 'Exercise':
      respiratoryRate = getRandomValue(20, 40);
      break;
    case 'Infant':
      respiratoryRate = getRandomValue(30, 60);
      break;
    case 'Child':
      respiratoryRate = getRandomValue(20, 30);
      break;
    case 'Elderly':
      respiratoryRate = getRandomValue(12, 25);
      break;
    default:
      respiratoryRate = 0;
  }
  return Math.round(respiratoryRate);
};

const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

const roundToTwoDecimalPlaces = (num) => {
  return Math.round(num * 100) / 100;
};

exports.generateVitalSigns = async (req, res) => {
  try {
    console.log(req.body)
    const temperatureType = req.body.temperatureType;
    const symptoms = req.body.symptoms;
    const feedback = req.body.feedback;
    const condition_before_taking_vital_signs = req.body.condition_before_taking_vital_signs;
    
    const data = {
      temperature: +getTemperature(temperatureType),
      heart_rate: roundToTwoDecimalPlaces(getRandomValue(40, 180)),
      respiration_rate: roundToTwoDecimalPlaces(getRandomValue(12,60)),
      monitoring_session_id: res.locals.monitoringSessionId,
      patient_id: res.locals.userId,
      temperature_type: temperatureType,
      symptoms: symptoms.join(', '),
      feedback: feedback,
      condition_before_taking_vital_signs: condition_before_taking_vital_signs.join(', '),
    }
    
    const vitals = await VitalSign.create(data);
    res.status(200).json({ message: "Vital Signs Simulation Successful", vitals })
  } catch (error) {
    console.error("VSG Error: ", error);
    res.status(500).json({error: error.message});
  }
}

exports.getAllVitalSigns = async (req, res) => {
  try {
    const vitals = await VitalSign.findAll({order: [['createdAt', 'DESC']]});
    res.status(200).json({ message: "Fetch All Vital Signs Successful", vitals })
  } catch (error) {
    console.error("FetchVitalSigns: ", error);
    res.status(500).json({error: error.message});
  }
}