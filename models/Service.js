const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String, // Can be in hours or minutes, or a specific format like "2 hours"
      required: false
    },
    availability: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {timestamps:true})



module.exports=mongoose.model("Service",serviceSchema)