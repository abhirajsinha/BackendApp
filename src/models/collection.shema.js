import mongoose from "mongoose";
const { schema } = mongoose;

const collectionSchema = new schema(
    {
        name: {
            type: String,
            required: [
                true,
                "Please Provide a Collection Name",
            ],
            trim: true,
            maxLength: [
                120,
                "Collection length should not be more than 120 characters"
            ]
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Collection", collectionSchema);