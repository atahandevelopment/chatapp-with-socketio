import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    users: Array,
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

export default mongoose.model('Message', messageSchema);