const express=require("express")
const app = require('express')()
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require("dotenv")
const mongoose = require('mongoose')
const formRoutes = require("./routes/formRoutes")
const monetaryformData = require("./models/monetaryformData")

dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_B90lljB8Ek0EBm',
	key_secret: 'FSeQ9DnuMhtFnQzQCFBaPxbH'
})

app.get("/", (req, res) => {
	res.send("Xcitedu foundations backend is working.")
})
app.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/razorpay', async (req, res) => {
	console.log("BODY::::::",req.body);
	const payment_capture = 1
	const currency = 'INR'
	
	const submitedData = await monetaryformData.find({email:req.body.email})
	
	const amount = submitedData[0].amount
	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		// console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})


const DATABASE = process.env.DATABASE

mongoose.connect(DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log("DATABASE CONNECTED")).catch((error) => console.log(error.message))

app.use("/",formRoutes)


app.listen(8000, () => {
	console.log('Listening on 8000')
})

