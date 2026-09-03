import mongoose from "mongoose"

const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId, //one who is subscribing
            ref: "User"
        },
        channel: {
            type: mongoose.Types.ObjectId, // one to whom subscriber is subscrbing
        }
    },
    {
        timestamps: true
    }
)



export const Subscription = mongoose.model("Subscription", subscriptionSchema)