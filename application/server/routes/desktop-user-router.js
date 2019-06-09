const express = require('express');
const router = express.Router();
var User = require('../models/user');

const { generateSessionToken }= require('../utils/users')

router.post('/login', (req, res) => {

  User.findOne({ email: req.body.email },function(err, user){
     
     if(err){
      console.log(err);
      return;
     }
     
     if(user){      
        user.comparePassword(req.body.password, function(err, isMatch) {
          console.log(isMatch);
          if(isMatch == true){  

          //need to return oAuth token and client will save it in localstorage          
            let userSessionToken = generateSessionToken()
            user.set('sessionToken', userSessionToken);          
            user.save().then(() => res.status(200)
                .json({ token: userSessionToken}));
            
          }else {
           res.status(400).json({error: 'failed'});
          }
        });
     }
     else{
      console.log("user not found");
      res.status(401).json({error: 'failed'});
     }
  });
});

module.exports = router;