import { Schema, model, models } from 'mongoose';

const machineSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  serial_number: {
    type: String,
    trim: true
  },
  inv_number: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  freq_mant: {
    type: String,
    trim: true
  },
}, {
  timestamps: true,
  versionKey: false
})

export default models.Machines || model('Machines', machineSchema);