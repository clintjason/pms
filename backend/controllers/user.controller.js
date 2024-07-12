const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const models = require("../models");
const User = models.User;
const Session = models.Session;
const Op = models.Sequelize.Op;

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

    await Session.create({
      user_id: user.id,
      token,
      expires_at: expiresAt,
    });

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error("Error during login", error)
    res.status(401).json({error: error.message});
   }
}

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

/**
 * Gets a single user result from the database by its Id
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} returns an error message with status code 500/404 and {error: [error]}  
 * object or, the user object resource with status code 200
 */
exports.getOneUser = (req, res) => {
  User.findByPk(req.params.id, { attributes: { exclude: ['password']}})
  .then(user => {
    if(!user) {
      return res.status(404).json({error: "Unknown Id - User not Found"});
    }
    res.status(200).json(user);
  })
  .catch(error => {
    res.status(500).json({error: "Unknown Server error while retrieving ID"});
  });
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
 * Updates an existing user in the database
 * @param {*} req request object
 * @param {*} res response object
 * @returns {*} returns an error message with status code 400/404/500 and {error: [error]}   
 * object or, a success message with status code 200 and {message: [message]}
 * 
 */
 exports.updateUser = async (req, res) => {
  console.log("in updateUser");
   const id = req.params.id;
 
   try {
      // 1. Get User Data
      const userData = req.file ? 
      {
        ...JSON.parse(req.body.user),
        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : {
        ...req.body,
        //avatar: `${req.protocol}://${req.get('host')}/images/default.png`
      }
      console.log(`user is : `);
      console.log(userData);
      // 2. Test to see if modification includes a file or not
      if(req.file) {
        console.log("in file if loop");
        let user = await User.findByPk(req.params.id)
        if(!user) {
          return res.status(404).json({error: "Unknown Id - User not Found"});
        }
        // If the there is no default user profile pic
        /* if(!user.profilePic) {
          User.update(userData, {where: { id: id }})
          .then(num => {
            if (num == 1) {
              return res.status(200).json({message: "User Updated successfully"});
            }
            return res.status(400).json({error: `Cannot update User with id=${id}.`});
          }).catch(error => {
            return res.status(500).json({ error: !parseInt(error) ? "Error updating User with id=" + id : error});
          });
        } */

        // Get the User image Url to delete the file
        const filename = user.avatar.split('/images/')[1];
        console.log(`filename is : ${filename}`);
        if(filename !== "default.png") {
          fs.unlink(`images/${filename}`, async (err) => {
            if(err) { throw err;}
            let num = await User.update(userData, {where: { id: id }})
            if (num == 1) {
              return res.status(200).json({message: "User Updated successfully."});
            } else {
              let error = new Error(`Cannot update User with id=${id}.`)
              error.status = 400;
              throw error;
            }
          });
        } else {
          let num = await User.update(userData, {where: { id: id }})
            if (num == 1) {
              return res.status(200).json({message: "User Updated successfully."});
            } else {
              let error = new Error(`Cannot update User with id=${id}.`)
              error.status = 400;
              throw error;
            }
        }
     } else {
        // When there is no file present
        let num = await User.update(userData, {where: { id: id }})
        if (num == 1) {
          return res.status(200).json({message: "User Updated successfully."});
        } else {
          let error = new Error(`Cannot update User with id=${id}.`)
          error.status = 400;
          throw error;
        }
     }
   } catch (error) {
    res.status(error.status ? error.status : 500).json({ error: error});
   }
}

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