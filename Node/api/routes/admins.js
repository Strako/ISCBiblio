const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
//Importing verifyToken function
const verifyToken = require('../functions/verifyToken');
const messages = require('./messages');

router.post('/get-admin', verifyToken.verify,(req,res)=>{
    const {admin_id} = req.body;
    if(req.data.role == 'admin'){
        mysqlConnection.query('select * from admins where admin_id = ?',
        [admin_id],
        (error, rows)=>{
            if(!error){
                res.json(rows);
            }else{
                console.log(error);
            }
        })
    }else{
        res.json(messages.notPerms);
    }
});

/*Make a route in the root with the get method*/
router.get('/get-admins',verifyToken.verify,(req,res)=>{
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
        res.json(messages.notPerms);
    }
});

router.post('/insert-admin', verifyToken.verify, (req,res)=>{
    const {mail , password, role} = req.body;
    if(req.data.role == 'admin'){
        mysqlConnection.query('insert into admins (mail,password,role) values (?,?,?)',
        [mail, password, role],
        (error, rows)=>{
            if(!error){
                console.log("Succesfully added an admin");
                res.json(rows);
            }else{
                res.status(401).json(messages.badJson);
                console.log(error);
            }
        })
    }else{
        res.json(messages.notPerms);
    }
});

router.put('/update-admin', verifyToken.verify, (req,res)=>{
    const {admin_id, mail, password, role} = req.body;
    if(req.data.role == 'admin'){
        mysqlConnection.query('update admins set mail = ?, password = ?, role = ? where admin_id = ?',
        [mail, password, role, admin_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                console.log('Succesfully updated an admin');
                res.json(result);
            }else{
                res.status(401).json(messages.badJson);
                console.log(error);
            }
        })
    }else{
        res.json(messages.notPerms);
    }
});

router.delete('/delete-admin', verifyToken.verify,(req,res)=>{
    const {admin_id} = req.body;
    console.log(admin_id);
    if(req.data.role == 'admin'){
        mysqlConnection.query('delete from admins where admin_id = ?',
        [admin_id],
        (error, result)=>{
            if(!error&& result.affectedRows > 0){
                console.log('Succesfully deleted an admin');
                res.json(result);
            }else{
                console.log(error);
                res.status(401).json(messages.badJson);
            }
        })
    }else{
        res.json(messages.notPerms);
    }
});

module.exports = router;

