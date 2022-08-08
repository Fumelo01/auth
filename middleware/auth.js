require ('dotenv').config();
const { SECRET } = process.env
const jwt = require("jsonwebtoken");
const User = require('../models/users.js')


//check to see if there is a token and header



exports.authUser = (req, res, next) => {
  //Get token from header
  //const token = req.headers.authorization;

  //Check if token doesn't exist
  if (!req.headers.authorization)  {
    return res
      .status(401)
      .json({
        statusCode: 401,
        message: 'No token, authorization denied'
      });
  }
  ;
  //else... token exists

  try {
    let splitHeader = req.headers.authorization.split(' ')
    if (splitHeader[0] !== 'Bearer') {
      res.status(401).json({message: 'Authorization format is Bearer <token>'})
    }
    let token = splitHeader[1]
    const decoded = (jwt.verify(token, SECRET))
    console.log({here: decoded})
   // const user = User.findOne({_id: decoded.user.id})
    let id = {_id : decoded.user.id}
    User.findOne(id, (err, found)=> {
      if (err) throw err;
      console.log({success: `User has successfully been found`, foundUser: found.access})
      console.log(found.access)
      if (found.access == false) {
         return res.status(401).json({ message: 'Login to gain access'});
      }
      next()
    })
  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      message: "Token is not valid!"
    });
  }

}




exports.authStaff = (req, res, next) => {
  //Get token from header
  //const token = req.headers.authorization;

  //Check if token doesn't exist
  if (!req.headers.authorization)  {
    return res
      .status(401)
      .json({
        statusCode: 401,
        message: 'No token, authorization denied'
      });
  }
  ;
  //else... token exists

  try {
    let splitHeader = req.headers.authorization.split(' ')
    if (splitHeader[0] !== 'Bearer') {
      res.status(401).json({message: 'Authorization format is Bearer <token>'})
    }
    let token = splitHeader[1]
    const decoded = (jwt.verify(token, SECRET))
   // const user = User.findOne({_id: decoded.user.id})
    let id = {_id : decoded.user.id}
    User.findOne(id, (err, found)=> {
      if (err) throw err;
      console.log({success: `User has successfully been found`, foundUser: found.access})
      console.log(found.access)
      if (found.access == false) {
         return res.status(401).json({ message: 'Login to gain access'});
      }
      console.log(found.isStaff)
      if (found.isStaff == false) {
         return res.status(401).json({ message: 'Must be Staff to gain access'});
      }
      next()
    })
  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      message: "Token is not valid!"
    });
  }

}




exports.authManager = (req, res, next) => {
  //Get token from header
  //const token = req.headers.authorization;

  //Check if token doesn't exist
  if (!req.headers.authorization)  {
    return res
      .status(401)
      .json({
        statusCode: 401,
        message: 'No token, authorization denied'
      });
  }
  ;
  //else... token exists

  try {
    let splitHeader = req.headers.authorization.split(' ')
    if (splitHeader[0] !== 'Bearer') {
      res.status(401).json({message: 'Authorization format is Bearer <token>'})
    }
    let token = splitHeader[1]
    const decoded = (jwt.verify(token, SECRET))
   // const user = User.findOne({_id: decoded.user.id})
    let id = {_id : decoded.user.id}
    User.findOne(id, (err, found)=> {
      if (err) throw err;
      console.log({success: `User has successfully been found`, foundUser: found.access})
      console.log(found.access)
      if (found.access == false) {
         return res.status(401).json({ message: 'Login to gain access'});
      }
      console.log(found.isManager)
      if (found.isManager == false) {
         return res.status(401).json({ message: 'Must be Manager to gain access'});
      }
      next()
    })
  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      message: "Token is not valid!"
    });
  }

}





exports.authAdmin = (req, res, next) => {
  //Get token from header
  //const token = req.headers.authorization;

  //Check if token doesn't exist
  if (!req.headers.authorization)  {
    return res
      .status(401)
      .json({
        statusCode: 401,
        message: 'No token, authorization denied'
      });
  }
  ;
  //else... token exists

  try {
    let splitHeader = req.headers.authorization.split(' ')
    if (splitHeader[0] !== 'Bearer') {
      res.status(401).json({message: 'Authorization format is Bearer <token>'})
    }
    let token = splitHeader[1]
    const decoded = (jwt.verify(token, SECRET))
   // const user = User.findOne({_id: decoded.user.id})
    let id = {_id : decoded.user.id}
    User.findOne(id, (err, found)=> {
      if (err) throw err;
      console.log({success: `User has successfully been found`, foundUser: found.access})
      console.log(found.access)
      if (found.access == false) {
         return res.status(401).json({ message: 'Login to gain access'});
      }
      console.log(found.isAdmin)
      if (found.isAdmin == false) {
         return res.status(401).json({ message: 'Must be Admin to gain access'});
      }
      next()
    })
  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      message: "Token is not valid!"
    });
  }

}


/*
exports.authRat = (req, res, next) => {
  //Get token from header
  //const token = req.headers.authorization;

  //Check if token doesn't exist
  if (!req.headers.authorization)  {
    return res
      .status(401)
      .json({
        statusCode: 401,
        message: 'No token, authorization denied'
      });
  }
  //else... token exists

  try {
    let splitHeader = req.headers.authorization.split(' ')
    if (splitHeader[0] !== 'Bearer') {
      res.status(401).json({message: 'Authorization format is Bearer <token>'})
    }
    console.log(`here: \n\n gggfffg \n\n`)
    let token = splitHeader[1]
    console.log('\n\n\n' + token + '\n\n\n')



    const decoded = (jwt.verify(token, SECRET))
    console.log({here: decoded})
   // const user = User.findOne({_id: decoded.user.id})
    let id = {_id : decoded.user.id}



   // const user = User.findOne({_id: decoded.user.id})
//    let id = {_id : decoded.user.id}
    console.log(`here: \n\n ${decoded} \n\n`)


    if (decoded.user.reset !== true) {
      return res.status(401).json({ message: 'Input the reset token sent to your mail to gain access'});
    }



    next()

  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      message: "Tokyen is not valid!"
    });
  }

}


*/



exports.authRat = (req, res, next) => {
  //Get token from header
  //const token = req.headers.authorization;

  //Check if token doesn't exist
  if (!req.headers.authorization)  {
    return res
      .status(401)
      .json({
        statusCode: 401,
        message: 'No token, authorization denied'
      });
  }
  ;
  //else... token exists

  try {
    let splitHeader = req.headers.authorization.split(' ')
    if (splitHeader[0] !== 'Bearer') {
      res.status(401).json({message: 'Authorization format is Bearer <token>'})
    }
    let token = splitHeader[1]
    const decode = (jwt.verify(token, SECRET))
    console.log({here: decode})
    if (decode.reset !== true) {
      return res.status(401).json({ message: 'Input the reset token sent to your mail to gain access'});
    }
   // const user = User.findOne({_id: decoded.user.id})
    let id = {_id : decode.id}
/*
    User.findOne(id, (err, found)=> {
      if (err) throw err;
      console.log({success: `User has successfully been found`, foundUser: found.access})
      console.log(found.access)
   //   if (found.access == false) {
     //    return res.status(401).json({ message: 'Login to gain access'});
    //  }
      next()
    })
*/
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({
    //  statusCode: 401,
      //message: "Token is not valid!"
      message: err
    });
  }

}



