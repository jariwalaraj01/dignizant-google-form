const mongoose = require("mongoose")

// user schema / model / table
const schema = mongoose.Schema({
    name: {
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

const UserForm = mongoose.model("userForm", schema)
module.exports = UserForm