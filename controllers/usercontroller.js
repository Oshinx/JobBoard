const { User } = require("../model/user");
const { Company } = require("../model/company");
const _ = require('lodash');
const { v4: uuidv4 } = require("uuid");
const utils = require('../utils/utils');

module.exports.create_user = async (req, res) => {
  let { username, password, firstname, lastname, user_type, email } = req.body;

  let newUser = {
    user_id: uuidv4(),
    username: username,
    password:  password,
    name: `${firstname}  ${lastname}`,
    user_type: user_type,
    email: email,
  };
    
  // hashing password
  newUser.password = await utils.hashedPassword(newUser.password); 
    console.log(newUser.password);
  let response = {
    error: false,
    result: "",
  };
  // check if the username is unique
  let userFound = await User.find().or([{ username: username }, { email: email }]);
  if (userFound.length > 0) {
      console.log('found');
    res.status(400).json({
      message: "email or username exist",
    });
  } else {
    let user = new User(newUser);

    try {
      let result = await user.save();
      response.result = _.pick(result, [
        "user_id",
        "username",
        "name",
        "user_type",
        "email",
      ]);
      return res.status(201).json(response);
    } catch (e) {
      response.error = true;
      return res.status(500).json({
        message: 'server error'
      })
    }
  }
};

module.exports.update_user = async (req, res) => {
  let {id, firstname, lastname, email } = req.body;

  try {
  
    if ( !id ) {
      //handles error 
      return res.status(400).json({
        message: "id cannot be empty",
      });
    } 
    else {
      
      let newUser = {
        name: `${firstname}  ${lastname}`,
        email: email,
      };
       let userFound = await User.find({user_id:id});

       if(userFound.length > 0){
         
        let result = await User.update(
          { user_id: id },
          {
            $set: {
              name: newUser.name,
              email:newUser.email
            },
          }
        );
        console.log(result);
        res.status(200).json(newUser);

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

module.exports.delete_user = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "invalid id",
      });
    } else {
      let userFound = await User.find({ user_id: id });

      if (userFound.length > 0) {
        let result = await User.deleteOne({ user_id: id });
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

module.exports.change_password = async (req, res) => {
  try {
    let { id, newpassword } = req.body;

    if (!id || !password) {
      return res.status(400).json({
        message: "id or password  cannot be empty",
      });
    } else {
        let hashedPassword = utils.hashedPassword(newpassword);
        let result = await User.update(
          { user_id: id },
          {
            $set: {
              password:hashedPassword,
            },
          }
        );
        console.log(result);
        res.status(204).json(newPost);

      }
    }
   catch (e) {
    res.status(500).json({
      message: "server error",
    });
    console.log(e);
  }
};

async function updateUser(user_id) {}

async function deleteUser(user_id) {
  // delete user
}
