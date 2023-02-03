import Router from "express";
import { verifyDoctor, verifyUser } from "../middleware/auth.middleware";
import AppointmentController from "../controller/appoinment.controller";
import { Post } from "../models/post.model";

export const appointmentRouter = Router();

const appointmentController = new AppointmentController();

appointmentRouter.post(
  "/appointments",
  verifyUser,
  appointmentController.getDays
);
appointmentRouter.post(
  "/appointment/getAppointment",
  verifyUser,
  appointmentController.appointmentIsTaking
);
appointmentRouter.post(
  "/appointment/doctorAcceptedAppointment",
  verifyDoctor,
  appointmentController.appointmentNeededAsign
); //TODO:Doktor randevu alabilir güncelleme
