const express = require('express');
const router = express.Router();
const verifyToken = require('../functions/verifyToken');
const mysqlConnection = require('../connection/connection');
const { rawListeners } = require('../connection/connection');
const messages = require('./messages');

router.get('/get-logs', verifyToken.verify, (req, res)=>{
    if(req.data.role == 'admin' || req.data.role == 'user'){
        mysqlConnection.query('select * from logs',
        (error, rows) => {
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

module.exports = router;