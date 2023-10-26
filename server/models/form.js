const mongoose = require("mongoose")

// user schema / model / table
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    questionData: Array
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Form = mongoose.model("from", schema)
module.exports = Form 