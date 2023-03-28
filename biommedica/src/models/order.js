import {Schema, model, models} from 'mongoose';

const orderSchema = new Schema({
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

export default model('Order', orderSchema)