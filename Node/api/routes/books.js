const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken');
const mysqlConnection = require('../connection/connection');
const { rawListeners } = require('../connection/connection');
const messages = require('./messages');


router.post('/get-book',verifyToken.verify,(req,res)=>{
    const {book_id} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('select * from books where book_id = ?',
        [book_id],
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

router.get('/get-books',verifyToken.verify,(req,res)=>{
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('select * from books',
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

router.post('/insert-book',verifyToken.verify,(req,res)=>{
    const {title,author,quantity} = req.body;
    console.log(req.data.role);
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('insert into books (title,author,quantity) values (?,?,?)',
        [title,author,quantity],
        (error, result)=>{
            if(!error){
                console.log(messages.addedBook);
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

router.put('/update-book',verifyToken.verify,(req,res)=>{
    const {book_id,title,author,quantity} = req.body;
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('UPDATE books SET title = ?, author = ?, quantity = ? WHERE book_id=?',
        [title,author,quantity,book_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json(messages.updBook);
            }else{
                res.status(401).json(messages.badJson + ' or book_id wont exit');
                console.log(error);
            }
        })
    }else{
        res.json(messages.notPerms);
    }
});

router.delete('/delete-book',verifyToken.verify,(req,res)=>{
    const {book_id} = req.body;
    console.log(req.data.role);
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('delete from books where book_id = ?',
        [book_id],
        (error, result)=>{
            if(!error && result.affectedRows > 0){
                res.json(messages.delBook);
                console.log()
            }else{
                res.status(401).json(messages.badJson +' or book_id wont exist');
                console.log(error);
            }
        })
    }else{
        res.json(messages.notPerms);
    }
});


module.exports = router;
