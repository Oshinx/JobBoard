const mongoose  = require('mongoose');

const jobSchema =  new mongoose.Schema({
    job_id:{
        type:String
    },
    job_title:{
        type:String
    },
    job_type:{
      type:String
    },
    job_expiration_date:{
        type:Boolean
    },
    job_relocation:{
        type:Boolean
    },
    job_visasponsorship:{
        type:Boolean
    },
    job_skill_tag:{
        type:[String]
    },
    about_company:{
        type:String
    },
    application_submission_Link:{
        type:String
    },
    job_remote:{
        type:Boolean
    },
    job_salary:{
        currency: String,
        min_salary:String,
        max_salary:String
    },
    company_id:{
        type:String
    }

},
{ 
    timestamps: 
     {
         createdAt: 'created_at'
         
     }
     }
)

let Job = mongoose.model('jobs',jobSchema);

exports.Job = Job;