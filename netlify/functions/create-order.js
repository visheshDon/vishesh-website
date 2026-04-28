const Razorpay = require("razorpay");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const body = JSON.parse(event.body);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    const order = await razorpay.orders.create({
      amount: body.amount,
      currency: "INR",
      receipt: "rcpt_" + Date.now()
    });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Order creation failed" })
    };
  }
};
