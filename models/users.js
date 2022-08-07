const mongoose = require('mongoose');

const userSchema = mongoose.Schema (
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    userRole: {
      type: String,
      enum: ['user', 'staff', 'manager', 'admin'],
      default: 'user'
    },
    isStaff: {
      type: Boolean,
      default: 0
    },
    isManager: {
      type: Boolean,
      default: 0
    },
    isAdmin: {
      type: Boolean,
      default: 0
    },
    access: {
      type: Boolean,
      default: 0
    }
  },
  {
    timestamp: true
  }
);


module.exports = mongoose.model('accountsData', userSchema);
