const mongoose = require('mongoose');

const { Schema } = mongoose;

const FormSchema = new Schema({
    user:{type:mongoose.Schema.Types.ObjectId,},
    comp_name: { type: String},
    Fname: { type: String},
    email: { type: String },
    gender: { type: String },
    address: { type: String },
    phone: { type: Number },
    bank: { type: String },
    c_type: { type:  String},
    territory: { type: String }
},{
    timestamps: true
})

module.exports = mongoose.model('Formdata',FormSchema);