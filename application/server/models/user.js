var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: {type: String, required: true, index:{ unique: true }},  
  username: {type: String, required: true, index:{ unique: true }}, 
  name: String,
  password: {type: String, required: true},
  sessionToken: {type: String, required: false},

  groceryLists:[{
	  type: Schema.Types.ObjectId,
	  ref: 'GroceryList', 
  }],

  mealLists:[{
	  type: Schema.Types.ObjectId,
	  ref: 'MealList',
  }],

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