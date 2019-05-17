const express = require('express')
const scoreRouter = express.Router()
const Score = require('../models/scoreSchema')

scoreRouter.get('/', (req, res, next) => {
    Score.find({user: req.user._id}, (err, score) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!score.length){
            return res.send([{wins: 0, losses: 0}])
        }
        return res.send(score)
    })
})

scoreRouter.post('/', (req, res, next) => {
    const score = new Score(req.body)

    score.user = req.user._id
    score.save((err, newScore) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newScore)
    })
})

scoreRouter.put('/', (req, res, next) => {
    Score.findOneAndUpdate(
        {user: req.user._id},
        req.body,
        {new: true},
        (err, newScore) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(201).send(newScore)
        })
})

scoreRouter.delete('/', (req, res, next) => {
    Score.findOneAndRemove({_id: req.params.scoreId, user: req.user._id}, (err, score) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.send(score)
    })
})

module.exports = scoreRouter