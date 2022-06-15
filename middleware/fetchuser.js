const jwt = require('jsonwebtoken');

require('dotenv').config();

const fetchuser = (req,res,next) =>{

    // getting the user to jwt token and adding to req object.
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send("plz authenticate with a valid token..")
    }

    try {

        const data = jwt.verify(token,process.env.jwt_secret);

        req.user = data.user;

        next()
    } catch (error) {
        res.status(401).send({error:"plz authenticate with a valid token.."})
        
    }  
}

module.exports = fetchuser