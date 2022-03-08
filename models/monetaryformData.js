const mongoose= require("mongoose");

const monetaryformDataSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: Number, required: true, unique: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true },
        razorpay_payment_id:{type: String},
        razorpay_order_id:{type: String},
        razorpay_signature:{type: String},
    },
    { timestamps: true }
);

module.exports = mongoose.model("MonetaryformData", monetaryformDataSchema);