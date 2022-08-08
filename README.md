# **ROLE BASED AUTHENTICATION PROJECT**




---
 
> ##### This is a very basic use-case/scenerio of Role-Based Authentication.
 
---
> ##### This is a work in progress. Hence, I'll continue to update it, as I intend to make it a complete flight booking application. However, I just had to drop this now. Enjoy 💕
>>  ###### *Hugs* and *Kisses*, 💜🤗***Adenuga Oluwafunmilayo***😘💜
---
> ##### With what we have here, you can signup as a user(alone), a staff, a manager, and an admin. These roles rank from the lowest to the highest respectively. I'd explain briefly below.
>> Every registered account is a user.
>> Every staff can perform user and staff duties, but cannot perform manager or admin duties.
>> Every Manager can perform user, staff and Manager duties, but cannot perform Admin duties.
>> Any Admin can perform any duty. Only the admin has Complete access to all routes.

---
---
## **ROUTES** 
---

> ##### I demonstrated the routing with some tests, which you will see below 👇.
---
#### Public Access Routes
> ##### Signup or Register Route http://localhost:3000/signup/
      This is to register an account in the application. Required fields are email, password, first name and last name.
![mine](models/images/signup.jpg) 
> ##### Login Route http://localhost:3000/login/
      This is to login to an account in the application. Required fields are email and password. Upon login, you will receive a token which grants you access according to your user role.
![mine](models/images/login.jpg) 
> ##### Get Reset Token Route http://localhost:3000/reset/
      This is to apply for a password reset token in an account in the application. Required field is email. Upon success, a token will be sent to the provided email address which can be used to reset the password.
![mine](models/images/rat.jpg) 
![mine](models/images/mail.jpg) 
      I later changed the reset password token validation time to 15mins, as it took a while for me to receive my mail.
---
#### Generally Protected Routes
> ##### Reset Password Route http://localhost:3000/reset/
      This is to reset an account's password in the application. Required header is Authorization: Bearer <resettoken>, Required field is Password
![mine](models/images/resetPassword.jpg) 
![mine](models/images/confirmPassword.jpg) 
> ##### Get own details Route http://localhost:3000/me/
      This is to register an account in the application. Required header is Authorization: Bearer <logintoken>
![mine](models/images/gpr.jpg) 
> ##### Logout Route http://localhost:3000/logout/
      This is to logout of an account in the application. Required header is Authorization: Bearer <logintoken>
![mine](models/images/logout.jpg)
![mine](models/images/confirmLogout.jpg)
---
#### Role Based Authentication
> ##### Fetch all accounts Route http://localhost:3000/accounts/
      This route fetches an array of accounts in the application. It is only accessible to Admin accounts. Required header is Authorization: Bearer <logintoken>
![mine](models/images/rba.jpg) 
---
---
## **GETTING THE AUTHENTICATION PROGRAM TO WORK IN THREE EASY STEPS** 🪜🪜🪜
---
---
> #### STEP 1 🪜
> ##### To begin, run the following code in your terminal.
> ##### ``git clone https://github.com/Fumelo01/auth``
 
---

 > ##### Dependencies
  >> ###### *Required*
     - bcryptjs
     - express
     - express-validator
     - jsonwebtoken
     - mongoose
     - nodemailer
  >> ###### *Optional*
     - nodemon (I highly recommend)
     - dotenv
---
> #### STEP 2 🪜
> ##### Once the dependencies are installed, set the authentication details and save. 
 
---
> #### STEP 3 🪜
> ##### From the root folder 'auth', If you are using nodemon, run ```npm start```, else run ```node index.js``` . 
     
---
---
> ###### Voila! There you have it.
>> ###### If you performed all 3 steps correctly, You can now test the functionality of the routes.
     
---
  



