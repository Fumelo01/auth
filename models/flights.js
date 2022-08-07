const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    from: {
      type: String,
      required:true
    },
    to: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    time: {
      type: String
    },
    date: {
      type: String
    },
    tickets: {
      type: Array
    }
  },
  { timestamps: true}
);

module.exports = mongoose.model('schedule', postSchema);
