import {Schema, model, models} from 'mongoose';

const machineSchema = new Schema({
  name:  {
    type: String,
    trim: true
  },
  zone: {
    type: String,
    trim: true
  }
}, {
    timestamps: true,
    versionKey: false
})

export default models.Machines || model('Machines', machineSchema);