import {
  Appointment,
  AppointmentModel,
  AppointmentIsNeed,
  AppointmentNeedModel,
} from "../models/appointment.model";
import { Request, Response, RequestHandler, NextFunction } from "express";
import { User } from "../models/user.model";
import {
  ErrorMessage,
  MessageReturn,
  SucessMessage,
} from "../helpers/res.variable";
import { AppUtility } from "../utility/app.constant";


export default class AppointmentController {
  appointmentIsTaking: RequestHandler = async (req: Request, res: Response) => {
    const {
      user_username,
      is_received,
      doctor_username,
      date,
      hours,
      is_appointment,
      post_id,
    }: AppointmentModel = req.body;

    if (user_username || doctor_username || date || hours === null)
      ErrorMessage(res, AppUtility.appointment_request_error_message);

    const user_control = await User.findAll({
      where: {
        username: user_username,
      },
    });

    const doctor_control = await User.findAll({
      where: {
        username: doctor_username,
      },
    });

    if (user_control.length === 0 || doctor_control.length === 0)
      MessageReturn(res, AppUtility.appointment_doctor_user_not_found_message);

    const user_appointnment_is_needed = await AppointmentIsNeed.findOne({
      where: {
        user_id: user_control[0].id,
        doctor_id: doctor_control[0].id,
        post_id: post_id,
      },
    });

    if (user_appointnment_is_needed === null || false) {
      MessageReturn(res, AppUtility.appointment_verifyMessage);
    }

    const appointment = await Appointment.findAll({
      where: {
        doctor_id: doctor_control[0].id,
        day: date,
        hours: hours,
        post_id: post_id,
        user_id: user_control[0].id,
      },
    });

    if (appointment.length !== 0) {
      let isWhich = appointment[0];

      return res.status(201).send({
        status: false,
        message: isWhich.is_received
          ? "Bu randevu daha önce alınmıştır"
          : "Randevu şuanda müsait durumdadır",
      });
    }

    await Appointment.create({
      doctor_id: doctor_control[0].id,
      user_id: user_control[0].id,
      post_id: post_id,
      date: date,
      hours: hours,
      is_received: is_received,
    });

    SucessMessage(res, AppUtility.appointment_is_taking_verify_message);
  };

  getDays: RequestHandler = async (req: Request, res: Response) => {
    const { doctor_username, date } = req.body;

    const doctor_control = await User.findOne({
      where: {
        username: doctor_username,
      },
    });

    const result = await Appointment.findAll({
      where: {
        doctor_id: doctor_control?.id,
        date: date,
      },
    });
    
    if (result.length === 0)  SucessMessage(res,AppUtility.appointment_all_free_message)
  
    SucessMessage(res,result);
  };

  controlAppointment: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { user_id, doctor_id, post_id }: AppointmentNeedModel = req.body;

    const appointment_need_control = await AppointmentIsNeed.findOne({
      where: {
        user_id: user_id,
        doctor_id: doctor_id,
        post_id: post_id,
      },
    });
    if (appointment_need_control?.isNeeded) {
      next();
    } else {
      MessageReturn(res, AppUtility.appointment_not_taken_message);
    }
  };

  appointmentNeededAsign: RequestHandler = async (
    //TODO:Bu komutu DOKTOR karar vericek
    req: Request,
    res: Response
  ) => {
    const { user_id, doctor_id, post_id, isNeeded }: AppointmentNeedModel =
      req.body;
    if (user_id || post_id || doctor_id === null) {
      MessageReturn(res, AppUtility.appointment_doctor_user_not_found_message);
    }

    await AppointmentIsNeed.create({
      user_id: user_id,
      doctor_id: doctor_id,
      isNeeded: isNeeded || true,
      post_id: post_id,
    });

    SucessMessage(res, AppUtility.appointment_is_needing_verify_message);
  };
}
