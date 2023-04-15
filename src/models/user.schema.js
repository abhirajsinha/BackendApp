import mongoose from "mongoose";
import authRoles from "../utils/authRoles";
import bcrypt from "bcryptjs"

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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods = {
    //compare password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.comparePassword(enteredPassword, this.password);
    }
}

export default mongoose.model("User", userSchema);