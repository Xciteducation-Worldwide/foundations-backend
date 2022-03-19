const express = require("express")
const FormData = require("../models/formData")
const MonetaryformData = require("../models/monetaryformData")
const VolunteerformData = require("../models/volunteerformData")
const router = express.Router()

router.post("/getFormData", async (req, res) => {

    try {

        const data = await FormData.create(req.body)
        res.status(200).json({
            data
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.post("/setVolunteerFormData", async (req, res) => {
    try {
        const data = await VolunteerformData.create(req.body)
        res.status(200).json({
            data
        })
        console.log(data);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        console.log(error);
    }
})

router.post("/getmonetaryformdata", async (req, res) => {

    try {

        const data = await MonetaryformData.create(req.body)
        res.status(200).json({
            data
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.put("/updatemonetaryformdata", async (req, res) => {

    try {
        const updatedData = await MonetaryformData.findByIdAndUpdate(req.body.userId, req.body)

        res.status(200).json({
            updatedData,

        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


router.get("/getdata", async (req, res) => {
    try {
        const getdata = await FormData.find()
        res.status(200).json({
            getdata
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.get("/getVolunteerformdata", async (req, res) => {
    try {
        const getdata = await VolunteerformData.find()
        res.status(200).json({
            getdata
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router