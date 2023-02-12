const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
//Importing verifyToken function
const verifyToken = require('../functions/verifyToken');



/*Make a route in the root with the get method*/
router.post('/get-admins',verifyToken.verify,(req,res)=>{
/*If the role of the given user isnt 'Admin' will not be able to execute the query*/
    if(req.data.role == 'admin'){
/*Specifies the mysql query*/
        mysqlConnection.query('select * from admins;', (error, rows, fields)=>{
/*If there isnt an error the route replies with the resulting rows, otherwise logs on console the specified error*/
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    })
    }else{
        res.json('You dont have enough permissions');
    }
});

module.exports = router;

