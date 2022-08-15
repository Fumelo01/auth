const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { authUser } = require('../middleware/auth');
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth');



// Registeration route          √
// Public
router.post('/signup', userController.registerNewUser);


// Login user route             √
// Public
router.post('/login',
  [
    check("email", "Please enter a valid mailing address").isEmail(),
    check("password", " A valid password is required").exists()
  ],
  userController.loginUser
);


// Logout user                  √
//Generally protected
router.patch('/logout', auth.authUser, userController.logoutUser);



// Fetches own data             √
// Generally protected 
router.get('/me', auth.authUser, userController.me);


// Get all userAccounts         √
// Admin
router.get('/accounts', auth.authAdmin, userController.allAccounts);


// Get all Users
// Staff
router.get('/accounts/users', auth.authStaff, userController.allUsers);


// Get all Staff
// Managers
router.get('/accounts/staff', auth.authManager, userController.allStaff);


// Get all Managers             √
// Managers
router.get('/accounts/managers', auth.authManager, userController.allManagers);


// Get all Admin
// Admin
router.get('/accounts/admin', auth.authAdmin, userController.allAdmins);


// Get userAccount by id
// Admin
router.get('/accounts/id:', auth.authAdmin, userController.userById);


// Modify own data
// Generally protected
router.patch('/me', userController.editMe);


// Get reset token              √
// public
router.post('/reset', userController.resetToken);

// Reset Password               √
// RAT
router.patch('/reset', auth.authRat, userController.resetPassword);


// Delete user by id
// Admin
router.delete('/accounts/id:', auth.authAdmin, userController.delUser);









module.exports = router;

