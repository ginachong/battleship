const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoreSchema = new Schema({    
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})



module.exports = mongoose.model('Score', scoreSchema)