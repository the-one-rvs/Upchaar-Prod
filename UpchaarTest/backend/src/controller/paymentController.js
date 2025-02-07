import { instance } from "../server.js";
import crypto from "crypto"
import {Payment} from "../models/paymentSchema.models.js"

export const checkout = async (req, res) => {

    const options = {
        amount: 55000,
        currency: "INR",
    };
    const order = await instance.orders.create(options)

    console.log(order);

    return res
        .status(200)
        .json({
            success: true,
            message: "Checkout created successfully",
            order
        })
};

export const paymentVerification = async (req, res) => {

    const {razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_SECRET_KEY)
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })

        res.redirect(
            `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else{
        res.status(400)
        .json({
            success: false,
        })
    }

    return res
        .status(200)
        .json({
            success: true,
        })
};