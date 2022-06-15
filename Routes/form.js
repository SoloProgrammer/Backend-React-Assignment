const express = require('express');

const router = express.Router();

const fetchuser = require('../middleware/fetchuser');

const Formdata = require('../models/Formdata');

const User = require('../models/User');

router.post('/addformdata',fetchuser,async (req,res)=>{

    try {
        // console.log(req.body)
        const formdata = new Formdata({...req.body,user:req.user.id}) // adding form data to the mongo server
    
        formdata.save();
    
        res.json({"status":"filled","msg":"Here is your Saved Form !",formdata})
        
    } catch (error) {
        res.status(500).json({"Error":"Internal server error","Reason":error.message})
    }

})

router.put('/updateformdata/:id',async (req,res)=>{

    try {

        // console.log(req.body)

        updatedfromdata = await Formdata.findByIdAndUpdate(req.params.id,{ $set:{...req.body} }) // updating form data of the logged in user
    
        res.json(updatedfromdata)
        
    } catch (error) {
        res.status(500).json({"Error":"Internal server error","Reason":error.message}) 
    }

    
})

router.get('/getformdata',fetchuser,async (req,res)=>{
    try {
        let formdata = await Formdata.findOne({user:req.user.id})
    
        if(!formdata){ return res.status(500).json({"status":"unfilled","msg":"Filled the Form details and Save to store it in cloud"}) }

    
        res.json({"status":"filled",formdata,"msg":"Here is your Saved Form."})
    } catch (error) {
        res.status(500).json({"Error":"Internal server error","Reason":error.message})
    }
})


module.exports = router;