const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { authUser } = require('../middleware/auth');
const userController = require('../controllers/userController.js');




//Registeration route
router.post('/signup', userController.registerNewUser);
//Login user route
router.post('/login',
  [
    check("email", "Please enter a valid mailing address").isEmail(),
    check("password", " A valid password is required").exists()
  ],
  userController.loginUser
);
router.post('/logout', userController.logoutUser);
//Get logged-in user
//router.get('/', authUser, userController.getLoggedInUser);
router.get('/me', authUser, userController.me);
router.get('/accounts', userController.allAccounts);
router.get('/accounts/users', userController.allUsers);
router.get('/accounts/staff', userController.allStaff);
router.get('/accounts/managers', userController.allManagers);
//router.post('/accounts/admin', userController.allAdmin);
router.get('/accounts/id:', userController.userById);
//router.patch('/me', userController.editMe);
router.patch('/reset', userController.resetPassword);
router.delete('/accounts/id:', userController.delUser);









module.exports = router;

