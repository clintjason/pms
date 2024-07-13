const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require("../models");
const User = models.User;
const Session = models.Session;
const MonitoringSession = models.MonitoringSession;
const Patient = models.Patient;
const Doctor = models.Doctor;
/**
  * SignUp a User
  * @swagger
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error object: {error: [error]}  with status code 500
  *  and error object or response object of user created
  * with status code 201
  *  
  */
exports.signUp = async (req, res) => {
  try {
    console.log('signUp Request: ', req.body);
    const { username, email, password, role } = req.body;
    let hash = await bcrypt.hash(password, 10)
    // Create a User
    const user = {
      username: username,
      email: email,
      password: hash,
      role: role,
      avatar: `${req.protocol}://${req.get('host')}/images/default.png`
    };

    // Save User in the database
    const userResult = await User.create(user);

    if(role === 'patient') {
      const patient = await Patient.create({patient_id: userResult.id});
    }
    if(role === 'doctor') {
      const doctor = await Doctor.create({ doctor_id: userResult.id});
    }
    return res.status(201).json({ message: 'User created successfully', userResult });
  } catch(error) {
    console.log("Error during signup", error);
    return res.status(500).json({error: error.message});
  }    
};

/**
  * Login a User
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error Object {error: [error]}  with status code 401
  * or response object with status code 200 and of the form
  * {
  *   userId: [userId],
  *   token: [token]
  * }
  * consisting of user id and the jsonweb authentification token.
  */
exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    let user = await User.findOne({where: {email: email}});
    if(!user) {
      return res.status(404).json({error: `Invalid email or password`});
    }

    // Compare password
    let valid = await bcrypt.compare(password, user.password);
    if(!valid) {return res.status(401).json({error: `Invalid email or password`});}
    
    const token = jwt.sign({userId: user.id}, process.env.SECRET_TOKEN, {expiresIn: '24h'})
    
    // Create session
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + (rememberMe ? 720 : 1)); // 720 hours = 30 days

    // create a new session
    const session = await Session.create({
      user_id: user.id,
      token,
      expires_at: expiresAt,
    });

    console.log("Session: ", session);
    // Create a new monitoring session
    const monitoringSession = await MonitoringSession.create({
      session_id: session.id,
    });

    res.status(200).json({ message: 'Login successful', user, token, session, monitoringSessionId: monitoringSession.id });
  } catch (error) {
    console.error("Error during login", error)
    res.status(401).json({error: error.message});
   }
}

exports.signOut = async (req, res) => {
  const userId = res.locals.userId;

  try {
    // Find the latest active monitoring session for the user
    const monitoringSession = await MonitoringSession.findOne({
      where: { patient_id: userId, end_time: null },
      order: [['start_time', 'DESC']],
    });

    if (monitoringSession) {
      // Update the end_time to stop the monitoring session
      monitoringSession.end_time = new Date();
      await monitoringSession.save();
    }

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
  * Reset Password
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error Object {error: [error]}  with status code 401
  * or response object with status code 200 and of the form
  * {
  *   userId: [userId],
  *   token: [token]
  * }
  * consisting of user id and the jsonweb authentification token.
  */
exports.resetPassword = async (req, res) => {
  try {
    console.log('reset password');
    console.log(req.userId);
    let user = await User.findByPk(req.userId);
    if(!user) {
      return res.status(404).json({error: "Unknown Id - User not Found"});
    }
    
    console.log("Pwd: ", req.body.password)
    let hash = await bcrypt.hash(req.body.password, 10)
    let result = await User.update({password: hash}, { where: {id: req.userId }} )
    console.log("result: ", result);
    if(result[0] == 1) {
      res.status(200).json(result);
    } else {
      throw new Error("Password reset failed")
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};