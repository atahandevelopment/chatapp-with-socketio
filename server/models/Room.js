// Sohbet Odaları Şeması
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoomMessage',
    },
  ],
  timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Room', roomSchema);
