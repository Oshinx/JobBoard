const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const Job = require("../model/job");
const { Company } = require("../model/company");

/**
 * 
 * job_id:{
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
 */
module.exports.get_job = async (req, res) => {
  // get jobs by id
};

module.exports.get_jobs = async (req, res) => {
  // get all jobs
};

module.exports.create_job = async (req, res) => {
  //create jobs
  const {
    job_title,
    job_type,
    job_expiration_date,
    job_relocation,
    job_visasponsorship,
    job_skill_tag,
    application_submission_Link,
    job_remote,
    job_salary,
    company_id,
  } = req.body;

  let newJob = {
    job_id: uuidv4(),
    job_title,
    job_type,
    job_expiration_date,
    job_relocation,
    job_visasponsorship,
    job_skill_tag,
    application_submission_Link,
    job_remote,
    job_salary,
    company_id,
  };

  let jobFound = await Job.find().and([
    { job_title: job_title },
    { company_id: company_id },
  ]);
  let companyFound = await Company.find({ company_id: company_id });

  if (jobFound.length > 0 || companyFound.length > 0) {
    res.status(404).json({
      message: "Job already exist",
    });
  } else {
    let job = new Job(newJob);

    let result = await job.save();

    res.status(201).json(result);
  }
};

module.exports.edit_job = async (req, res) => {
  //edit jobs
  const {
    id,
    job_title,
    job_type,
    job_expiration_date,
    job_relocation,
    job_visasponsorship,
    job_skill_tag,
    application_submission_Link,
    job_remote,
    job_salary,
  } = req.body;

  let updateJob = {
    job_title,
    job_type,
    job_expiration_date,
    job_relocation,
    job_visasponsorship,
    job_skill_tag,
    application_submission_Link,
    job_remote,
    job_salary,
  };

  let jobFound = await Job.find({ job_id: id });
  if (jobFound.length > 0) {
    try {
      let updateResult = Job.update(
        { job_id: id },
        {
          $set: {
            job_title,
            job_type,
            job_expiration_date,
            job_relocation,
            job_visasponsorship,
            job_skill_tag,
            application_submission_Link,
            job_remote,
            job_salary,
          },
        }
      );

      res.status(201).json({
        result: updateJob,
      });
    } catch (e) {
      res.status(500).json({
        message: "server error",
      });
    }
 
  } else {
    res.status(404).json({
      message: "job not found",
    });
  }
};

module.exports.delete_job = async (req, res) => {
  //  delete job
};
