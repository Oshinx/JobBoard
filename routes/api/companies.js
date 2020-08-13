const express = require('express');
const router = express.Router();


router.get(('/'), (req,res) =>{
    res.send('get');
})



router.post(('/'), (req,res) =>{
    res.send('post');
})



router.put(('/'), (req,res) =>{
    res.send('put');
})



router.delete(('/'), (req,res) =>{
    res.send('delete');
})


module.exports = router;