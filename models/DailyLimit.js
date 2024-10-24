const mongoose = require('mongoose');


const DailyLimitSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: 100,
        maxLength: 20,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('DailyLimit', DailyLimitSchema)