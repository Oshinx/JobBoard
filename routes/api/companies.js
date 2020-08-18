const express = require('express');
const router = express.Router();
const companycontroller = require('../../controllers/companycontroller');


router.get(('/'), (req,res) =>{
    res.send('get');
})


// create company
router.post(('/'), companycontroller.create_company)


// update company company
router.put(('/'), companycontroller.edit_company)


//delete company
router.delete(('/:id'), companycontroller.delete_company)


module.exports = router;