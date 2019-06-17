// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');

import { Schema, model } from 'mongoose';
import { genSalt, hash as _hash, compare } from 'bcrypt';


var UserSchema = new mongoose.Schema({
  email: {type: String, required: true, index:{ unique: true }},  
  username: {type: String, required: true, index:{ unique: true }}, 
  name: String,
  password: {type: String, required: true},
  sessionToken: {type: String, required: false},
},{
  timestamps: true
});

UserSchema.pre('save',function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10,function(err, salt){
		if(err) return next(err);

		bcrypt.hash(user.password,salt,function(err, hash){
		  if(err) return next(err);
		  user.password = hash;
		  next();
		})
	});
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
 

module.exports = mongoose.model('User', UserSchema);