const { Company } = require("../model/company");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");

module.exports.get_company = async (req, res) => {};

module.exports.create_company = async (req, res) => {
  let {
    company_name,
    company_industry,
    company_website,
    company_address,
    company_contact_email,
    company_contact_phone_number,
    company_logo_url,
    user_id
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
    res.status(400).json({
      message: "company already  exist",
    });
  } else {
    let newCompany = {
      company_id: uuidv4(),
      company_name: company_name,
      company_industry: company_industry,
      company_website: company_website,
      company_address: company_address,
      company_contact_email: company_contact_email,
      company_contact_phone_number: company_contact_phone_number,
      company_logo_url: company_logo_url,
      user_id
    };

    let company = new Company(newCompany);

    try {
      let companyResult = await company.save();

      response.result = _.pick(companyResult, [
        'company_id',
        'company_name',
        'company_industry',
        'company_website',
        'company_address',
        'company_contact_email',
        'company_contact_phone_number',
        'company_logo_url',
        'user_id',
      ]);
      console.log(response.result);

      return res.send(response);
    } catch (e) {
      response.error = true;
      res.status(500).json(response);
    }
  }
};

module.exports.edit_company = async (req, res) => {
  let {
    company_id,
    company_name,
    company_industry,
    company_website,
    company_address,
    company_contact_email,
    company_contact_phone_number,
    company_logo_url,
    user_id,
  } = req.body;

  if (!company_id) {
    //handles error
    return res.status(400).json({
      message: "id cannot be empty",
    });
  } else {
    let response = {
      error: false,
      result: "",
    };

    let companyFound = await Company.find()
                                    .and([{ company_id: company_id },{ user_id: user_id }]);

    if (companyFound.length > 0) {
      try {
        let result = await Company.updateOne(
          { company_id: company_id },
          {
            $set: {
              company_name: company_name,
              company_industry: company_industry,
              company_website: company_website,
              company_address: company_address,
              company_contact_email: company_contact_email,
              company_contact_phone_number: company_contact_phone_number,
              company_logo_url: company_logo_url,
              user_id
            },
          }
        );
        response.result = {
          message: "successfully updated",
        };
        res.status(200).json(response);
      } catch (e) {
        res.status(500).json({
          message: "server error",
        });
      }
    } else {
      res.status(404).json({
        message: "company does not exist",
      });
    }
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
     
        res.status(200).json({
          message: "Delete was successful",
        });
      } else {
        res.status(404).json({
          message: " company does not exist",
        });
      }
    }
  } catch (e) {
    res.status(500).json({
      message: "server error",
    });
 
  }
};
