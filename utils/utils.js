const bcrypt = require('bcrypt');


module.exports.hashedPassword =  async (password) =>{
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  return  hashedPassword;
}

module.exports.verifyPassword = async (password) => {
  
}