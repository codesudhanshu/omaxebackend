const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name :{
        type: String,
        required :true,
    },
    email:{
        type :String,
        required :true,
    },
    phoneNumber:{
        type : Number,
        required :true,
    },
    date:{
        type: String,
        default: new Date()
    }
})

const User = mongoose.model('User',UserSchema)
module.exports = User