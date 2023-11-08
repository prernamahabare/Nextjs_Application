import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter the Name"],
    },
    username: {
        type: String,
        required: [true, "Enter the username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Enter the username"],
        unique:  true,
    },
    password: {
        type: String,
        required: [true, "Enter the username"],
        unique: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotpasswordToken: String,
    forgotpasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const user = mongoose.models.users|| mongoose.model("users", userSchema);

export default user;

