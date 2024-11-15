const express = require('express');
const router = express.Router();
var User = require('../models/user');
const { generateSessionToken } = require('../utils/users')

router.get('/authUser', (req, res) => {
  User.findOne({ 
    email: req.headers.sessionemail
  },function(err, user){
    if(err){
      console.log(err);
      return;
     }

     if(user){ 
      res.status(200).json({
        isValid: req.headers.sessiontoken == user.sessionToken
      }); 
     }

     else{ 
      res.status(200).json({
        isValid: false
      });
     }
  });
 
});

router.post('/login', (req, res) => {

  User.findOne({ 
    email: req.body.email 
  },function(err, user){
     
     if(err){
      console.log(err);
      return;
     }
     
     if(user){      
        user.comparePassword(req.body.password, function(err, isMatch) {

          if(isMatch == true){        
           //need to return oAuth token and client will save it in localstorage          
            let userSessionToken = generateSessionToken(15,user.id)
            user.set('sessionToken', userSessionToken);          
            user.save().then(() => res.status(200)
                .json({ token: userSessionToken}));
            
          }else {
           res.status(404).json({token: null});
          }
        });
     }
     else{
      res.status(401).json({error: 'failed'});
     }
  });
});

module.exports = router;