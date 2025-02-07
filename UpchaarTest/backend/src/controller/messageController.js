import mongoose from "mongoose"
import {Message} from "../models/messageSchema.models.js"
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

const sendMessage = asyncHandler(async(req, res, next) => {
    const {firstName, lastName, email, phone, message} = req.body
    if(!(firstName && lastName && email && phone && message)){
       return next(new ErrorHandler("Please Fill Full Form", 400))
    }
    const messages = await Message.create({firstName, lastName, email, phone, message});
    return res.status(200).json({
        success: true,
        message: "Message Send Successfully",
        messages
    });
});

const getAllMessages = asyncHandler( async(req, res, next) => {
    const message = await Message.find()

    return res
    .status(200)
    .json({
        success: true,
        message
    })
})

export {sendMessage, getAllMessages}