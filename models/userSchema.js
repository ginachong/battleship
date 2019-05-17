const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

//user model methods

// hook - pre-save() ---> encrpts user password before saving to database

userSchema.pre('save', function(next){
    const user = this
    if(!user.isModified("password")) return next()  //----> saying to only hash the password if the password has been changed
    bcrypt.hash(user.password, 10, (err, hashed) => {
        if(err) return next(err)
        user.password = hashed
        next()
    })
})
//*remember you must use function instead of fat arrow so that you have access to the "this" keyword


// methods:

//  checkPassword ---> checks user's password attempt against the encrypted password

userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        callback(null, isMatch)
    })
}

//  withoutPassword ---> removes encrypted password from user object before sending user response

userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('User', userSchema)