import mongoose from "mongoose";
import authRoles from "../utils/authRoles";
const { schema } = mongoose;

const userSchema = new schema(
    {
        name: {
            type: String,
            required: [
                true,
                "Please enter the name"
            ],
            trim: true,
            maxLength: [
                20,
                "User Name length should not be more than 120 characters",
            ]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [8, "Password must be of length 8"],
            select: false
        },
        role:
        {
            type: String,
            enum: Object.values(authRoles),
            default: authRoles.USER
        },
        forgotPasswordToke: String,
        forgotPasswordExpiry: Date
    },
    {
        timestamps: true
    }
)

export default mongoose.model("User", userSchema);