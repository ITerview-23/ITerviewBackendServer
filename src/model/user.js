import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
}, { collection: 'user' });

const User = mongoose.model('user', UserSchema);

export default User;