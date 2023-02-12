const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken');

/*redirects the given request to 'verifyToken' function and the recives a req from verifyToken function*/
router.get('/',verifyToken.verify,(req,res) => {
    if(req.data.role == 'admin'){
    res.json('Secret data');
    console.log(req.data);
    }else{
        res.json('You dont have enough permissions ');
    }
});

module.exports = router; 

//Example Post Request
/*
router.post('/singin', (req,res) =>{
    console.log(req.body.Mail);
    console.log(req.body.Password);
    mysqlConnection.query('select UserID from Users where Mail = \''
    + req.body.Mail+'\' and Password = \''+ req.body.Password+'\';',(error,rows,fields) =>{
        if(!error){
            res.json(rows);
        }else{
            res.json('An unexpected errror ocurred: '+error);
            console.log('An unexpected errror ocurred: '+error);
        }
    });
});
*/