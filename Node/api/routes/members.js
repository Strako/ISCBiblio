const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken');
const mysqlConnection = require('../connection/connection');
const { rawListeners } = require('../connection/connection');
const messages = require('./messages');

router.post('/get-member', verifyToken.verify, (req, res) => {
    const { member_id } = req.body;
    if (req.data.role == 'admin' || req.data.role == 'user') {
        mysqlConnection.query('select * from members where member_id = ?',
            [member_id],
            (error, rows) => {
                if (!error) {
                    res.json(rows);
                } else {
                    console.log(error);
                }
            })
    } else {
        res.json(messages.notPerms);
    }
});

router.get('/get-members', verifyToken.verify, (req, res) => {
    if (req.data.role == 'admin' || req.data.role == 'user') {
        mysqlConnection.query('select * from members',
            (error, rows) => {
                if (!error) {
                    res.json(rows);
                } else {
                    console.log(error);
                }
            })
    } else {
        res.json(messages.notPerms);
    }
});

router.post('/insert-member', verifyToken.verify, (req, res) => {
    const {name,address,phone } = req.body;
    if (req.data.role == 'admin' || req.data.role == 'user') {
        mysqlConnection.query('insert into members (name, address, phone) values (?,?,?)',
            [name, address, phone],
            (error, rows) => {
                if (!error) {
                    res.json(rows);
                    console.log('Succesfully inserted a member');
                } else {
                    res.status(401).json('Malformed JSON');
                    console.log(error);
                }
            })
    } else {
        res.json(messages.notPerms);
    }
});

router.put('/update-member',verifyToken.verify,(req,res)=>{
    const {member_id,name,address,phone} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('UPDATE members SET name = ?, address = ?, phone = ? WHERE member_id=?',
        [name,address,phone,member_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json(result);
                console.log('succesfully updated member');
            }else{
                res.status(401).json('Malformed JSON or member_id wont exit');
                console.log(error);
            }
        })
    }else{
        res.json(messages.notPerms);
    }
});

router.delete('/delete-member',verifyToken.verify,(req,res)=>{
    const {member_id} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('delete from members where member_id = ?',
        [member_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json(result);
                console.log('succesfully deleted member')
            }else{
                res.status(401).json('Malformed JSON or book_id wont exist');
                console.log(error);
            }
        })
    }else{
        res.json(messages.notPerms);
    }
});

module.exports = router;