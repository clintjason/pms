const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const models = require("../models");
const User = models.User;
const Session = models.Session;
const Op = models.Sequelize.Op;

/**
  * Reset Password
  * @param {*} req request object
  * @param {*} res response object
  * @returns {*} returns an error Object {error: [error]}  with status code 401
  * or response object with status code 200 and of the form
  * {
  *   message: string,
  * }
  * consisting of user id and the jsonweb authentification token.
  */
exports.resetPassword = async (req, res) => {
  try {
    //const userId = res.locals.userId;
    const userId = req.params.userId;

    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateAvatar = async (req, res) => {
  try {
    //const userId = res.locals.userId;
    const userId = req.params.userId;
    if (!req.file) {
      return res.status(400).json({ error: 'Avatar file is required' });
    }
    const avatarUrl =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    console.log(`avatar url: ${avatarUrl}`)
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.avatar = avatarUrl;
    await user.save();

    res.status(200).json({ message: 'Avatar updated successfully', avatar: avatarUrl });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Gets a single user result from the database by its Id
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} returns an error message with status code 500/404 and {error: [error]}  
 * object or, the user object resource with status code 200
 */
exports.getUser = async (req, res) => {
  try {
    const id = req.query.userId;
    const userId = id ? id : res.locals.userId;
    
    const user = await User.findByPk(userId, {
      include: [
        {model: models.Doctor},
        {model: models.Patient}
      ]
    });

    if(!user) {
      return res.status(404).json({error: "User not Found"});
    }

    return res.status(200).json({ message: 'User fetched successfully', user });

  } catch (error) {
    console.log("getOneUser Error: ", error);
    return res.status(500).json({error: error.message});
  }
}

 /**
 * Gets all users from the database or Get users by username
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} returns an error message with status code 500 and {error: [error]}  
 * object or, an array of all the users in the database corresponding to
 * the query username or not with status code 200
 * 
 */
exports.getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let whereClause = {};
    if(search) {
      whereClause = {
        [Op.or]: [
          { username: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { role: { [Op.like]: `%${search}%` } },
          { '$Patient.fullname$': { [Op.like]: `%${search}%` } },
          { '$Patient.age$': { [Op.like]: `%${search}%` } },
          { '$Patient.gender$': { [Op.like]: `%${search}%` } },
          { '$Patient.phone_number$': { [Op.like]: `%${search}%` } },
          { '$Patient.address$': { [Op.like]: `%${search}%` } },
          { '$Doctor.fullname$': { [Op.like]: `%${search}%` } },
          { '$Doctor.specialization$': { [Op.like]: `%${search}%` } },
          { '$Doctor.phone_number$': { [Op.like]: `%${search}%` } },
        ]
      };
    }

    console.log(" where clause : ", whereClause);
    const users = await User.findAll({
      where: whereClause,
      include: [
        {
          model: models.Patient,
          as: 'Patient',
          attributes: ['fullname', 'age', 'gender', 'phone_number', 'address']
        },
        {
          model: models.Doctor,
          as: 'Doctor',
          attributes: ['fullname', 'specialization', 'phone_number', 'address']
        }
      ]
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error('getAllUsers Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Updates an existing user email and/or username in the database
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} returns an error message with status code 400/404/500 and {error: [error]}   
 * object or, a success message with status code 200 and {message: [message]}
 * 
 */
exports.updateEmailUsername = async (req, res) => {
  try {
    //const userId = res.locals.userId;
    const { email, username } = req.body;
    const userId = req.params.userId;
    console.log("userId: " + userId);

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email) {
      user.email = email;
    }
    if (username) {
      user.username = username;
    }

    await user.save();

    res.status(200).json({ message: 'Email/Username updated successfully' });
  } catch (error) {
    console.error('Error updating email/username:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Deletes an existing user from the database
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} returns an error message with status code 400/404/500 and {error: [error]}  
 * object or, a success message with status code 200 and { message: [message]}
 * 
 */
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findByPk(id);
    if(!user) {
      return res.status(404).json({error: "Unknown Id - User not Found"});
    }
    const filename = user.avatar.split('/images/')[1];
    if(filename !== "default.png") {
      fs.unlink(`images/${filename}`, async (err) => {
        if(err) { throw err;}
        let num = await User.destroy({ where: { id: id }});
        if (num == 1) {
          return res.status(200).json({message: "User was deleted successfully."});
        }
        return res.status(400).json({error: `Cannot delete User with id=${id}.`});
      });
    }
    let num = await User.destroy({ where: { id: id }});
    if (num == 1) {
      return res.status(200).json({message: "User was deleted successfully."});
    }
    return res.status(400).json({error: `Cannot delete User with id=${id}.`});
  } catch(error) {
    res.status(500).json({ error: !parseInt(error) ? "Error Deleting User with id=" + id : error });
  }
};

/**
 * Deletes all Users from the database
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} returns an error message with status code 500 and {error: [error]}  
 * object or, a success message with status code 200 and { message: [message]}
 * 
 */
exports.deleteAll = (req, res) => {
  User.destroy({where: {}})
  .then(nums => {
    if(num === 0) {
      return res.status(200).json({ message: `User table is already empty` });
    }
    res.status(200).json({ message: `${nums} Users were deleted successfully!` });
  })
  .catch(error => {
    res.status(500).json({ error: !parseInt(error) ? "Some error occurred while removing all Users." : error});
  });
};

exports.getStats = async (req, res) => {
  try {
    console.log("method called");
    const userCount = await User.count();
    const doctorCount = await models.Doctor.count();
    const patientCount = await models.Patient.count();
    const vitalSignCount = await models.VitalSign.count();

    res.status(200).json({
      users: userCount,
      doctors: doctorCount,
      patients: patientCount,
      vitalSigns: vitalSignCount
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCompletedSessions = async (req, res) => {
  try {
    const completedSessions = await models.MonitoringSession.findAll({
      where: {
        end_time: { [Op.ne]: null }  // assuming end_time being not null indicates completion
      },
      include: [
        {
          model: Session,
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'email', 'role']
            }
          ]
        },
      ],
      order: [['end_time', 'DESC']]
    });

    res.status(200).json(completedSessions);
  } catch (error) {
    console.error('Error fetching completed sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};