import {Schema, model, models} from 'mongoose';

const reportSchema = new Schema({
  name:  {
    type: String,
    trim: true
  },
  zone: {
    type: String,
    trim: true
  },
  machine: {
    type: Object,
    trim: true
  },
  startDate: {
    type: String,
    trim: true
  },
  endDate: {
    type: String,
    trim: true
  },
  consumed: {
    type: String,
    trim: true
  },
}, {
    timestamps: true,
    versionKey: false
})

export default models.Reports || model('Reports', reportSchema);