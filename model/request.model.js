const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    name:{
        type:String,
    },
    idPic:{
        type:String
    },
    phone:{
        type:String,
    }
    ,
    address:{
        type:String,

    },
    status:{
        type:String,
        enum:['pending','approved','rejected','posted'],
        default:'pending'
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true
})

const Request = mongoose.model("Request", requestSchema)

module.exports = Request;
