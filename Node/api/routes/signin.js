const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

//Importing JSonWebToken
const jwt = require('jsonwebtoken');

/*Make a route with the post method called singin*/
router.post('/', (req,res) => {
/*Saves de parameters 'Mail' and 'Password' from the request body*/
    const {mail, password} = req.body;
/*Specifies the query and send the body arguments as parameters*/    
    mysqlConnection.query('select mail, role from admins where mail = ? and password = ?',
    [mail,password],
     (error,rows,fields) => {
/*Verify if and error is present, if no procceds*/
        if(!error){
/*If the content of the rows is greater than 0 save the results on 'data', otherwise send a reply with 'Invalid data'*/            
            if(rows.length > 0){
                console.log(JSON.stringify(rows[0]));
                let data = JSON.stringify(rows[0]);
/*Encrypts the stored data on a variable called token with a secret word*/
                const token = jwt.sign(data,'Testing');
/*Send a reply with the encrypted token*/
                res.json({token});
            }else{
                res.json('Invalid data');
                console.log(rows);
            }
        }else{
            console.log(error);
        }
    });
});

module.exports = router;

