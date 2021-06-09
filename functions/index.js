const functions = require('firebase-functions');
const express=require('express');
const cors=require('cors');
const stripe=require('stripe')
("sk_test_51I9bu7HeoDE2yL4xlyA0iMT3FWDvvcLjG0MfwkHoxg9KS2Z7TBfKGZB3LX2Uhzm0oGV6m0Y0lst7psIIpiDxzATp00AKdYCcnw")

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// endpoint
// http://localhost:5001/clone-75b23/us-central1/api
