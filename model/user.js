const mongoose  = require('mongoose');

const jobSchema =  new mongoose.Schema({
    user_id:String,
    username:{
        type:String
    },
    password:{
        type:String
    },
     user_type :String,
     name:String,
     email:String,
},
{ 
    timestamps: 
     {
         createdAt: 'created_at'
         
     }
     }
)

const User  = mongoose.model('user',jobSchema);

exports.User = User;
