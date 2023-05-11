const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken');
const mysqlConnection = require('../connection/connection');
const { rawListeners } = require('../connection/connection');
const notPerms = require('./messages'); 

router.post('/get-borrow', verifyToken.verify, (req, res) => {
    const { borrow_id } = req.body;
    if (req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('select * from borrows where borrow_id = ?',
        [borrow_id],
        (error, rows, fields) =>{
            if (!error){
                res.json(rows);
            }else {
                console.log(error);
            }
        })
    }else {
        res.json(notPerms);
    }
});

router.get('/get-borrows', verifyToken.verify, (req, res) => {
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('select * from borrows',
        (error, rows, fields) => {
            if (!error){
                res.json(rows);
            } else {
                console.log(error);
            }
        })
    }else {
        res.json(notPerms);
    }
});

router.post('/insert-borrow', verifyToken.verify, (req, res) => {
    const {admin_id, borrow_date, return_date, book_id, member_id} = req.body;
    console.log(return_date);
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('insert into borrows (admin_id, borrow_date, return_date, book_id, member_id) values (?,?,?,?,?)',
        [admin_id, borrow_date, return_date, book_id, member_id],
        (error, rows, fields) => {
            if (!error){
                res.json(rows);
            } else {
                console.log(error);
            }
        })
    }else {
        res.json(notPerms);
    }
});

router.put('/update-borrow',verifyToken.verify,(req,res)=>{
    const {admin_id, borrow_date, return_date, book_id, member_id, borrow_id} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('UPDATE borrows SET admin_id = ?, borrow_date = ?, return_date = ?, book_id = ?, member_id = ? WHERE borrow_id = ?',
        [admin_id, borrow_date, return_date, book_id, member_id, borrow_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json('succesfully updated a borrow');
            }else{
                res.status(401).json('Malformed JSON or book_id wont exit');
                console.log(error);
            }
        })
    }else{
        res.json(notPerms);
    }
});

router.delete('/delete-borrow',verifyToken.verify,(req,res)=>{
    const {borrow_id} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('delete from borrows where borrow_id = ?',
        [borrow_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json('succesfully deleted a borrow');
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