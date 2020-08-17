const { Company } = require("../model/company");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");

module.exports.get_company = async (req, res) => {};

module.exports.create_company = async (req, res) => {
  let {
    id,
    company_name,
    company_industry,
    company_website,
    company_address,
    company_contact_email,
    company_contact_phone_number,
    company_logo_url,
  } = req.body;

  let response = {
    error: false,
    result: "",
  };

  let companyFound = await Company.find().or([
    { company_address: company_address },
    { company_name: company_name },
  ]);
  if (companyFound.length > 0) {
    let newCompany = {
      company_id: uuidv4(),
      company_name: company_name,
      company_industry: company_industry,
      company_website: company_website,
      company_address: company_address,
      company_contact_email: company_contact_email,
      company_contact_phone_number: company_contact_phone_number,
      company_logo_url: company_logo_url,
      user_id: id,
    };

    let company = new Company(newCompany);

    try {
      let companyResult = await company.save();
      console.log(companyResult);
      response.result = _.pick(result, [
        "company_id",
        "company_name",
        "company_industry",
        "company_website",
        "company_address",
        "company_contact_email",
        "company_contact_phone_number",
        "company_logo_url",
        "user_id",
      ]);
      console.log(response.result);

      return res.send(response);
    } catch (e) {
      response.error = true;
      res.status(500).json(response);
    }
  } else {
    res.status(400).json({
      message: "user does not exist",
    });
  }
};

module.exports.edit_company = async (req, res) => {
  let {
    id,
    company_name,
    company_industry,
    company_website,
    company_address,
    company_contact_email,
    company_contact_phone_number,
    company_logo_url,
  } = req.body;

  try {
    if (!id) {
      //handles error
      return res.status(400).json({
        message: "id cannot be empty",
      });
    } else {
      let response = {
        error: false,
        result: "",
      };

      l;
      let companyFound = await Company.find({ company_id: id });

      if (companyFound.length > 0) {
        if (companyFound.company_name === company_name) {
          res.status(400).json({
            message: "company already exist",
          });
        } else {
          let result = await Company.update(
            { company_id: id },
            {
              $set: {
                company_name:company_name,
                company_industry:company_industry,
                company_website:company_website,
                company_address:company_address,
                company_contact_email:company_contact_email,
                company_contact_phone_number: company_contact_phone_number,
                company_logo_url:company_logo_url,
              },
            }
          );
          response.result = {
            message: 'successfully updated'
          }
          res.status(200).json(response);
        }
      } else {
        res.status(404).json({
          message: "user does not exist",
        });
      }
    }
  } catch (e) {
    res.status(500).json({
      message: "server error",
    });
    console.log(e);
  }
};


module.exports.delete_company = async (req, res) => {

  try {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "invalid id",
      });
    } else {
      let companyFound = await Company.find({ company_id: id });

      if (companyFound.length > 0) {
        let result = await Company.deleteOne({ company_id: id });
        console.log(result);
        res.status(200).json({
          message: "Delete was successful",
        });
      } else {
        res.status(404).json({
          message: " account does not exist",
        });
      }
    }
  } catch (e) {
    res.status(500).json({
      message: "server error",
    });
    console.log(e);
  }
   
};
