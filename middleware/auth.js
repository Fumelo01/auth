require ('dotenv').config();
const { SECRET } = process.env
const jwt = require("jsonwebtoken");


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
    // Check if user has access
    if (decoded.user.access == 0) {
      return res.status(401).json({ message: 'Invalid token'});
    }


    next();
  } catch (err) {
    res.status(401).json({
      statusCode: 401,
      message: "Token is not valid!"
    });
  }

}
