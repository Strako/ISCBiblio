//Importing JSonWebToken
const jwt = require('jsonwebtoken');
const verifyToken = {
 /*This funciton decripts the given token and retrive self content*/
verify(req,res, next){
    /*Verify if the 'Authorization' header is present on the request*/    
        if(!req.headers.authorization){
            res.status(401).json('Unauthorized');
        }else{
    /*If the 'Authorization' header is present porcceds to store the token inside a constant*/ 
            const token = req.headers.authorization.substr(7);
    /*Verify if the token isnt empty*/
            if(token!==''){
    /*Decrypts the content of the token making use of the secret word and send the content in a req for the next method*/              
                const content = jwt.verify(token,'Testing');
                req.data = content;
                next();
            }else{
    /*if the given token is empty reply with 'Empty Token'*/
                res.json('Empty Token');
            }
        }
    }
}

    module.exports = verifyToken;