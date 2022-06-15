const fetchuser = require('../middleware/fetchuser')

const express = require('express')

const router = express.Router();

const User = require('../models/User')

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

require('dotenv').config();

// creating user with post method on /createuser endpoint...............

router.post('/createuser', async (req, res) => {

    const {email, password } = req.body;

    const user = await User.findOne({email:email})

    //if user alredy exists withh the same email entered by the user so it return with json of status:false and an error msg......

    if(user){return res.status(500).json({"status":false,"msg":"Plz use Unique Email,The user with this Email already Sign-up"})}

    // password length shiuld minimum 5 characters long to preceed for the sign-up........

    if (password.length < 5) { return res.status(500).json({"status":false,"msg":"Password must contains at least 5 characters"}) }

    const salt = await bcrypt.genSalt()

    const Secpass = await bcrypt.hash(password, salt)

    newuser = new User({ ...req.body, password: Secpass })

    newuser.save();

    res.send(newuser);
})

router.post('/authenticate_user', async (req, res) => {

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email })

        if (!user) { return res.status(500).json({ "status": false, "msg": "Invalid credentials" }) }

        const pass = user.password

        const passwordCompare = await bcrypt.compare(password, pass)

        if (!passwordCompare) { return res.status(500).json({ "status": false, "msg": "Invalid credentials" }) }

        const payload = {          //// Data which is to be store while creating authtoken in that authtoken
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, process.env.jwt_secret)

        res.json({ "status": true, "msg": "Authentication success","token":authToken })

    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get('/getuser',fetchuser,async (req,res)=>{
    try {

        const user = await User.findById(req.user.id).select("-password")
        
        res.json(user)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router;

