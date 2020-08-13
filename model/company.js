const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    company_id: {
      type: String,
    },
    
    company_name: {
      type: String,
    },
    company_industry: {
      type: String,
    },
    company_website: {
      type: String,
    },
    company_address: {
      type: String,
    },
    company_contact_email: {
      type: String,
    },
    company_contact_phone_number: {
      type: String,
    },
    company_logo_url: {
      type: String,
    },
    user_id:String
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);



const Company = mongoose.model('companies',companySchema);


exports.Company = Company;