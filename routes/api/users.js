const express = require('express');
const router = express.Router();
///const registrationcontroller = require('../../controllers/registration-controller');
const usercontroller = require('../../controllers/usercontroller');


router.get(('/'), (req,res) =>{
    res.send('<h1>get</h1> ');
})

router.post(('/'), usercontroller.create_user);
router.put('/changepassword',usercontroller.change_password);
router.put(('/'), usercontroller.update_user);
router.delete(('/:id'), usercontroller.delete_user);





module.exports = router;