//need: express for express.Router
//user schema: for database information
//jwt: for creating tokens
const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//user signup

authRouter.post('/signup', (req, res, next) => {
    //check if user already exists
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(500)
            return next(new Error("That username already exists"))
        }
    //if not, add user to database
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }

    //create token
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET) //-----> (payload, secret)
        return res.status(201).send({success: true, user: savedUser.withoutPassword(), token})
        })
    })
})

authRouter.post('/login', (req, res, next) => {
    //find the user
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }

        //check the password

        // if( !user || user.password !== req.body.password){
        //     res.status(500)
        //     return next(new Error("Email or password are incorrect"))
        // }

        if(!user){
            res.status(500)
            return next(new Error("username or password are incorrect"))
        }

        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(401)
                return next(err)
            }
            if(!isMatch){
                res.status(401)
                return next(new Error("Username or password are incorrect"))
            }
        })

        //give token after authentication
        const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
        return res.status(200).send({token: token, user: user.withoutPassword(), success: true})
    })
})

module.exports = authRouter