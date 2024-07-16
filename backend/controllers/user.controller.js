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
    const userId = res.locals.userId;

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
    const userId = res.locals.userId;

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
    const userId = res.locals.userId;
    
    const user = await User.findByPk(userId, {
      include: [
        {model: models.Doctor},
        {model: models.Patient}
      ]
    });

    if(!user) {
      return res.status(404).json({error: "User not Found"});
    }

    return res.status(201).json({ message: 'User fetched successfully', user });

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
exports.getUsers = (req, res) => {
  const username = req.query.username;
  let condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  //User.findAll({ where: condition, include: ["Comments","Posts"], attributes: { exclude: ['password'] }, order: [['createdAt', 'DESC']] })
  User.findAll({ where: condition, attributes: { exclude: ['password'] }, order: [['createdAt', 'DESC']] })
    .then(user => {res.status(200).json(user);})
    .catch(error => {res.status(500).json({error: !parseInt(error) ? "Error while retrieving User." : error});});
}

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
    const userId = res.locals.userId;
    const { email, username } = req.body;

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