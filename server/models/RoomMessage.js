// Sohbet Odaları Mesaj şeması

import mongoose from 'mongoose';

const roomMessageSchema = new mongoose.Schema({
  direction: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    text: {
        type: String,
        required: true,
    },
},
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('RoomMessage', roomMessageSchema);
