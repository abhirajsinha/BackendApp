import mongoose from "mongoose";
import authRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config";

const { schema } = mongoose;

const productSchema = new schema(
    {
        name: {
            type: String,
            required: [
                true,
                "Please Enter Product Name"
            ],
            trim: true,
            maxLength: [
                50,
                "Product name should not be greater than 50 chars"
            ]
        },
        price: {
            type: Number,
            required: [
                true,
                "Please Enter Prodcut Price"
            ],
            maxLength: [
                5,
                "Product Price should not be greater than 5"
            ]
        },
        description: {
            type: String
        },
        ratings: {
            type: Number
        },
        photos: [
            {
                secure_url: {
                    type: String,
                    required: [
                        true,
                    ]
                }
            }
        ],
        stock: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        collectionId:{
            ref:"Collection"
        }
    },
    {
        timestapms: true
    }
)

export default mongoose.model("Product", productSchema);