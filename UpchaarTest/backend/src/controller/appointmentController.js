import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.models.js"
import { User } from "../models/userSchema.models.js"

const postAppointment = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, appointmentDate, appointmentTime,  department, doctor_firstName, doctor_lastName, hasVisited, address, hospital } = req.body

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointmentDate || !appointmentTime || !department || !doctor_firstName || !doctor_lastName || !address || !hospital) {
        return next(new ErrorHandler("All fields must required", 400))
    }

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    });

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 404))
    }

    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctor Conflict! Please contact through Email Or Phone !", 404))
    }

    const doctorId = isConflict[0]._id;
    console.log("DoctorId", doctorId)
    const patientId = req.user?._id;
    console.log("patientId", patientId);
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointmentDate,
        appointmentTime,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId
    })

    return res
    .status(200)
    .json({
        success: true,
        message: "Appointment send successfully",
        appointment
    })


})

const getAllAppointment = asyncHandler( async (req, res) => {
    let appointment = await Appointment.find();

    return res
    .status(200)
    .json({
        success: true,
        message: "getting all appointment",
        appointment
    })
})

const getAllAppointmentOfHospital = asyncHandler( async( req, res, next) => {
    const username = req.user;

    const first_name = username.firstName;
    const last_name = username.lastName;

    const appointment = await Appointment.find({
        firstName: first_name,
        lastName: last_name
    })
    
})

const getAllAppointmentOfDoctor = asyncHandler( async(req, res, next) => {

    const username = req.user
    console.log("username is", username);

    const doctor_Id = username._id;

    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];

    const appointment = await Appointment.find({
        doctorId: doctor_Id,
        status: "Accepted",
        appointmentDate: formattedDate

    });

    if(!appointment){
        return next(new ErrorHandler("appointment not found", 404))
    }

    return res 
    .status(200)
    .json({
        success: true,
        message: "Getting Appointment of a Doctor",
        appointment
    })
})

const updateAppointmentStatus = asyncHandler( async (req, res, next) => {
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found", 404))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    return res
    .status(200)
    .json({
        success: true,
        message: "Appointment Status Updated",
        appointment
    });
})

const deleteAppointment = asyncHandler( async(req, res, next) => {
    const {id} = req.params

    const remove = await Appointment.findByIdAndDelete(id)

    if(!remove){
        return next(new ErrorHandler("Appointment Not Found",404))
    }

    return res
    .status(200)
    .json({
        success: true,
        message: "Appointment deleted successfully"
    })
})

const findAppointmentUser = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, email} = req.body

    if(!(firstName && lastName && email)){
        return next(new ErrorHandler("All fields are Requored", 400))
    }

    const detail = await Appointment.findOne({
        firstName,
        lastName, 
        email
    }) 

    if(!detail){
        return next(new ErrorHandler("Appointment not found", 400))
    }
    
    return res
    .status(200)
    .json({
        success: true,
        message: "Appointment found successfully ",
        detail
    })
})




export {postAppointment, getAllAppointment, updateAppointmentStatus, deleteAppointment, findAppointmentUser, getAllAppointmentOfDoctor}