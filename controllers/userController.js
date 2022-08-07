const User = require('../models/users.js')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
require('dotenv').config();
const { SECRET } = process.env
const nodemailer = require('nodemailer')









let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});



// Fetch own data
exports.me = (req, res) => {
  try {
    let splitHeader = req.headers.authorization.split(' ')
    let token = splitHeader[1]
    const decode = jwt.verify(token, SECRET)
    User.findOne({_id: decode.user.id}, {access: 0,password: 0, isStaff: 0, isManager: 0, isAdmin: 0}, (err, me) => {
      if (err) throw err;
      res.json({myDetails: me})
    })
  } catch (err) {
      res.json({error: err});
  }
}



//Get all User Accounts
exports.allAccounts = async (req, res) => {
 // fetch all users
  // send the user array as response to the client
  // destructure page and limit and set default values
  const { page = 1, limit = 5 } = req.query;
  try {
    // execute query with page and limit values
    const posts = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await User.countDocuments();
    // return response with posts, total pages, and current page
    console.log({posts})
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
}


//Get all users
exports.allUsers = async (req, res) => {
 // fetch all users
  // send the user array as response to the client
  // destructure page and limit and set default values
  const { page = 1, limit = 5 } = req.query;
  try {
    // execute query with page and limit values
    const posts = await User.find({userRole: 'user'})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await User.countDocuments();
    // return response with posts, total pages, and current page
    console.log({posts})
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
}


//Get all staff
exports.allStaff = async (req, res) => {
 // fetch all users
  // send the user array as response to the client
  // destructure page and limit and set default values
  const { page = 1, limit = 5 } = req.query;
  try {
    // execute query with page and limit values
    const posts = await User.find({userRole: 'staff'})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await User.countDocuments();
    // return response with posts, total pages, and current page
    console.log({posts})
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
}


//Get all Managers
exports.allManagers = async (req, res) => {
 // fetch all users
  // send the user array as response to the client
  // destructure page and limit and set default values
  const { page = 1, limit = 5 } = req.query;
  try {
    // execute query with page and limit values
    const posts = await User.find({userRole: 'manager'})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await User.countDocuments();
    // return response with posts, total pages, and current page
    console.log({posts})
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
}


//Get all Admins
exports.allAdmins = async (req, res) => {
 // fetch all users
  // send the user array as response to the client
  // destructure page and limit and set default values
  const { page = 1, limit = 5 } = req.query;
  try {
    // execute query with page and limit values
    const posts = await User.find({userRole: 'admin'})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await User.countDocuments();
    // return response with posts, total pages, and current page
    console.log({posts})
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
}



// Find user by id
exports.userById = (req, res) => {
  try {
    let id = {_id : req.params.id}
    User.findOne(id, (err, found)=> {
      if (err) throw err;
      if (!found) {
        console.log({Error: `Oops! User with _id: ${req.params.id} does not exist `})
        console.error({Error: `Oops! _id: ${req.params.id} does not exist `})
      }
      console.log({success: `User has successfully been found`, foundUser: found})
    })
  } catch (err) {
    res.json({error: err});
  }
}




// update own data
exports.editUser = async (req, res) => {
  try {
    let splitHeader = req.headers.authorization.split(' ')
    let token = splitHeader[1]
    const decode = jwt.verify(token, SECRET)
    const id = {_id : decode.user.id}
    let edit = await {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
    let update = await User.findOneAndUpdate(id, edit, {new: true})
    console.log({success: `Your data has successfully been updated`})
    res.send({success:`Your data has successfully been updated`, Update: update})
  } catch {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}



// Logout
exports.logoutUser = async (req, res) => {
  try {
    let splitHeader = req.headers.authorization.split(' ')
    let token = splitHeader[1]
    const decode = jwt.verify(token, SECRET)
    const id = {_id : decode.user.id}
    let edit = await {
      access: false
    }
    let update = await User.findOneAndUpdate(id, edit, {new: true})
    console.log({success: `You have successfully logged out`})
    res.send({success:`You have successfully logged out`})
  } catch {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}


// Get reset token
exports.resetToken = async (req, res) => {
  // Get email from request body
  console.log(req.body.email)
  let email = { email: req.body.email }
  // Check if email is registered
  User.findOne(email, (err, found)=> {
    if (err) throw err;
    if (!found) {
      console.error({Error: `Oops! email: ${req.body.email} does not exist `})
      return res.status(404).json({Error: `Oops! User with email: ${req.body.email} does not exist `})
    }
    console.log({success: `The ${found.userRole}, ${found.lastName} ${found.firstName} has successfully been found`})
//    console.log({foundUser: found}, {password: 0, isStaff: 0, isManager: 0, isAdmin: 0})
    // Get id for User with email
    // Create jwt with password reset access
    const payload = {
      email: req.body.email,
      id: found._id,
      reset: true
    }
    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: 300
      },
      (err, token) => {
        if (err) throw err;
        // Send token to email
        let mailOptions = {
          from: process.env.MAIL_USERNAME,
          to: req.body.email,
          subject: 'Password Reset Token',
          text: 'Use the token below to reset your password\n\n' + token + '\n\nToken is only valid for 5 minutes'
        }
        transporter.sendMail(mailOptions, (err, data)=> {
          if (err) {
            console.log(err);
          } else {
            console.log({message: 'Email sent sucessfully, more info below'});
            console.log(data);
           return  res.json({ message: 'A password reset token has been sent to your Email'})
          }
        });
      }
    )
  });

}


// Reset password
exports.resetPassword = async (req, res) => {
  try {
    let splitHeader = req.headers.authorization.split(' ')
    let token = splitHeader[1]
    const decode = jwt.verify(token, SECRET)
    const id = {_id : decode.user.id}
      // Hash user's password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({err});
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({err})
          }
          // Save password to db
          let edit = {password: hashedPassword};
          let update =  User.findOneAndUpdate(id, edit, {new: true})
          console.log({success: `Your password has successfully been updated`})
          res.send({success:`Your password has successfully been updated`})
        })
      })
  } catch {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}



// Delete user
exports.delUser = async (req, res) => {
  try {
    let id = {_id : req.params.id}
    User.findOne(id, (err, found)=> {
      if (err) throw err;
      if (!found) {
        console.log({Error: `Oops! User with _id: ${req.params.id} does not exist `})
        console.error({Error: `Oops! _id: ${req.params.id} does not exist `})
      }
      console.log({success: `User has successfully been found`})
    });
    let deleted = await User.findOneAndDelete(id)
    if (deleted) {
      console.log({success: `User with _id: ${req.params.id} has been successfully deleted`})
      res.json({success: `User with _id: ${req.params.id} has been successfully deleted`})
    }
  } catch (err) {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}



// Signup
exports.registerNewUser = (req, res) => {
  // Fetch user details from request body
  // Check if user with email exists
  User.findOne({email: req.body.email}, (err, existingUser) => {
    if (err) {
      return res.status(500).json({err})
    }
    if (existingUser) {
      console.error('email exists')
      return res.status(400).json({message: 'A user with this email already exists'})
    }
    // Create New User
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }, (err, newUser) => {
      if (err) {
        return res.status(500).json({err})
      }
      // Hash user's password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({err});
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({err})
          }
          // Save password to db
          newUser.password = hashedPassword;
          newUser.save((err, savedUser) => {
            if (err) {
              return res.status(500).json({err})
            }
            // Create jwt for user
            const payload = {
              user: {
                id: user.id,
                access: user.access,
                userRole: user.userRole
              }
            };

            jwt.sign(
              payload,
              SECRET,
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) {
                  return res.status(500).json({err})
                }
                // Send token to user
                return res.status(200).json(
                  {
                    message: 'user registeration complete',
                    token
                  })
              }
            )
          })
        })
      })
    })
  })
}


// update own data
exports.editUser = async (req, res) => {
  try {
    let splitHeader = req.headers.authorization.split(' ')
    let token = splitHeader[1]
    const decode = jwt.verify(token, SECRET)
    const id = {_id : decode.user.id}
    let edit = await {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
    let update = await User.findOneAndUpdate(id, edit, {new: true})
    console.log({success: `Your data has successfully been updated`})
    res.send({success:`Your data has successfully been updated`, Update: update})
  } catch {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}

// Login User
exports.loginUser = async (req, res) => {
  //check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array()});

  //else destructure request body
  const { email, password } = req.body;

  try {
    //Initialize user
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({
          statusCode: 400,
          message: "Invalid email"
        });
    //else...
    //Check the password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
      return res
        .status(400)
        .json({
          statusCode: 400,
          message: 'Incorrect password'
        })

    // else
    // there is a match, set access to true
    const id = {_id : user.id}
    let edit = await {
      access: true
    }
    let update = await User.findOneAndUpdate(id, edit, {new: true})
    // send token
    // send payload and signed token.

    const payload = {
      user: {
        id: user.id,
        access: user.access,
        userRole: user.userRole
      }
    };

    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        console.log(`\nLogin Token\n\n${token}\n`)
        res.json({
          statusCode: 200,
          message: "User Logged in sucessfully",
          token
        })
      }
    )

  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
}
