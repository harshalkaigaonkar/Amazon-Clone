const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HelJdDH66TwfyoL97qTeADIjLDh4m6rgPkE7CUmzke5Xrwy5IdglLnlmvmbzILLUnYwb0vHcJ50d5wbr4LCQFP200gBmc8J1G');

//App config
const app = express();


//middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//Api routes
app.get('/', (req, res) => res.status(200).send('Hello ,World'));
app.post('/payments/create', async (req, res) => {

    const total = req.query.total;

    console.log('payment Req Received !! ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,

    })
})

//Listen 
exports.api = functions.https.onRequest(app);