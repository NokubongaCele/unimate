const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['inprogress', 'interview scheduled', 'accepted', 'rejected'],
    default: 'inprogress'
  },
  interview: {
    interviewdate: { type: Date }, 
    link: { type: String }, 
  }
});

const dateSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  age: { 
    type: String, 
    required: true 
  },
  residence: { 
    type: [String], 
    required: true 
  },
  courses: { 
    type: [String], 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  level: { 
    type: [String], 
    required: true 
  },
  interests: { 
    type: String 
  },
  goal: { 
    type: String, 
    required: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
  hasCreatedDate: {
    type: Boolean,
    default: false 
  },
  applicants: [applicantSchema] ,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});

const DatingSchema = mongoose.model('Date', dateSchema);

module.exports = DatingSchema;
