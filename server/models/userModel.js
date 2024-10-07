const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\d{8,10}@swave\.smu\.ac\.za$/, 'Please use your SMU provided email address'],
    },
    password:{
        type: String,
        required: true,
    },
    profileCompleted:{
        type: Boolean,
        default: false
    },
    otp:{
        type: Number,
        
    },
    expiresAt: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    name:{
        type: String,
    },
    age:{
        type: Number,
    },
    residence:{
        type: String,
    },
    courseOfStudy:{
        type: String,
    },
    levelOfStudy:{
        type: String,
    },
    interests:{
        type: String
    },
    relationshipGoals:{
        type: String,
    
    },
    bio: {
        type: String
    },
    role:{
        type: String
        },
    profilePicture: {
        type: String,
        default: '',
      },
      
})

const User = mongoose.model('User', userSchema)
module.exports = User;