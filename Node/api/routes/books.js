const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken');
const mysqlConnection = require('../connection/connection');
const { rawListeners } = require('../connection/connection');
const notPerms = require('./messages');


router.post('/get-book',verifyToken.verify,(req,res)=>{
    const {book_id} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('select * from books where book_id = ?',
        [book_id],
        (error, rows, fields)=>{
            if(!error){
                res.json(rows);
            }else{
                console.log(error);
            }
        })
    }else{
        res.json(notPerms);
    }
});

router.get('/get-books',verifyToken.verify,(req,res)=>{
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('select * from books',
        (error, rows, fields)=>{
            if(!error){
                res.json(rows);
            }else{
                console.log(error);
            }
        })
    }else{
        res.json('You dont have enogh permisions');
    }
});

router.post('/insert-book',verifyToken.verify,(req,res)=>{
    const {title,author,quantity} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('insert into books (title,author,quantity) values (?,?,?)',
        [title,author,quantity],
        (error, result)=>{
            if(!error){
                res.json('succesfully added book');
            }else{
                res.status(401).json('Malformed JSON');
                console.log(error);
            }
        })
    }else{
        res.json(notPerms);
    }
});

router.put('/update-book',verifyToken.verify,(req,res)=>{
    const {book_id,title,author,quantity} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('UPDATE books SET title = ?, author = ?, quantity = ? WHERE book_id=?',
        [title,author,quantity,book_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json('succesfully updated book');
            }else{
                res.status(401).json('Malformed JSON or book_id wont exit');
                console.log(error);
            }
        })
    }else{
        res.json('You dont have enogh permisions');
    }
});

router.delete('/delete-book',verifyToken.verify,(req,res)=>{
    const {book_id} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('delete from books where book_id = ?',
        [book_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json('succesfully deleted book');
                console.log()
            }else{
                res.status(401).json('Malformed JSON or book_id wont exist');
                console.log(error);
            }
        })
    }else{
        res.json('You dont have enogh permisions');
    }
});


module.exports = router;
