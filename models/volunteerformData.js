const mongoose= require("mongoose");

const volunteerformDataSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: Number, required: true, unique: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("VolunteerformData", volunteerformDataSchema);