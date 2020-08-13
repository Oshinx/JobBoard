const { User } = require("../model/user");
const { Company } = require("../model/company");
const _ = require('lodash')
const { v4: uuidv4 } = require("uuid");

/*
 
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
 */

module.exports.registration = async  (req, res) => {
  let { username, password, firstname, lastname, user_type, email } = req.body;

  let {
    company_name,
    company_industry,
    company_website,
    company_address,
    company_contact_email,
    company_contact_phone_number,
    company_logo_url,
  } = req.body;

  let newUser = {
    user_id: uuidv4(),
    username: username,
    password: password,
    name: `${firstname}  ${lastname}`,
    user_type: user_type,
    email: email,
  };


  let newCompany = {
    company_id: uuidv4(),
    company_name: company_name,
    company_industry: company_industry,
    company_website: company_website,
    company_address: company_address,
    company_contact_email: company_contact_email,
    company_contact_phone_number: company_contact_phone_number,
    company_logo_url: company_logo_url,
    user_id:newUser.user_id
  };

  let response = {
    error: false,
    result: "",
  };
    //object  validation




  if (!newCompany.company_address) {
    // normal user
    let user = new User(newUser);

    try {
      let result = await user.save();
      response.result = _.pick(result, ['user_id', 'username', 'name','user_type','email']);
      return res.status(201).json(response.result);
    } catch (e) {
      response.error = true;
    }
  } else {

    let user = new User(newUser);
    let company = new Company(newCompany);


    try {
      let result = await user.save();
      let companyResult = await company.save();
      console.log(companyResult);
      response.result = result
      console.log(response.result);
      response.companyResult = true;
  
      
     return res.send('text') ;
    } catch (e) {
      response.error = true;
    }
  }
};
