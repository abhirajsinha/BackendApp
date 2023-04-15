import mongoose from "mongoose";
import authRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config";

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
        forgotPasswordToken: String,
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
    },

    getJWTtoken: async function () {
        JWT.sign({
            _id: this._id
        }, config.JWT_SECRET_TOKEN, {
            expiresIn: config.JWT_EXPIRY_TOKEN
        })
    },

    //generate forgotten password
    generateForgotPasswordToken: function () {
        const forgotToken = crypto.ranomBytes(20).toString("hex");
        this.forgotPasswordToken = crypto.createHash("sha256").update(forgotToken).digest("hex")

        //time for token to expire
        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
        return forgotToken;
    }
}

export default mongoose.model("User", userSchema);