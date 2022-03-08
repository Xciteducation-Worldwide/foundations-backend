const mongoose= require("mongoose");

const formDataSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: Number, required: true, unique: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        device: { type: String, required: true },
        devicedesc: { type: String, required: true },
        devicepic: { type: String, required: true },
        zip: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("FormData", formDataSchema);