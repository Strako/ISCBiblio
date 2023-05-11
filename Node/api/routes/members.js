const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken');
const mysqlConnection = require('../connection/connection');
const { rawListeners } = require('../connection/connection');
const notPerms = require('./messages');

router.post('/get-member', verifyToken.verify, (req, res) => {
    const { member_id } = req.body;
    if (req.data.role == 'admin' || req.data.role == 'user') {
        mysqlConnection.query('select * from members where member_id = ?',
            [member_id],
            (error, rows, fields) => {
                if (!error) {
                    res.json(rows);
                } else {
                    console.log(error);
                }
            })
    } else {
        res.json(notPerms);
    }
});

router.get('/get-members', verifyToken.verify, (req, res) => {
    if (req.data.role == 'admin' || req.data.role == 'user') {
        mysqlConnection.query('select * from members',
            (error, rows, fields) => {
                if (!error) {
                    res.json(rows);
                } else {
                    console.log(error);
                }
            })
    } else {
        res.json(notPerms);
    }
});

router.post('/insert-member', verifyToken.verify, (req, res) => {
    const {name,address,phone } = req.body;
    if (req.data.role == 'admin' || req.data.role == 'user') {
        mysqlConnection.query('insert into members (name, address, phone) values (?,?,?)',
            [name, address, phone],
            (error, rows, fields) => {
                if (!error) {
                    res.json(rows);
                } else {
                    res.status(401).json('Malformed JSON');
                    console.log(error);
                }
            })
    } else {
        res.json(notPerms);
    }
});

router.put('/update-member',verifyToken.verify,(req,res)=>{
    const {member_id,name,address,phone} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('UPDATE members SET name = ?, address = ?, phone = ? WHERE member_id=?',
        [name,address,phone,member_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json('succesfully updated member');
            }else{
                res.status(401).json('Malformed JSON or book_id wont exit');
                console.log(error);
            }
        })
    }else{
        res.json(notPerms);
    }
});

router.delete('/delete-member',verifyToken.verify,(req,res)=>{
    const {member_id} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('delete from members where member_id = ?',
        [member_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json('succesfully deleted member');
                console.log()
            }else{
                res.status(401).json('Malformed JSON or book_id wont exist');
                console.log(error);
            }
        })
    }else{
        res.json(notPerms);
    }
});

module.exports = router;