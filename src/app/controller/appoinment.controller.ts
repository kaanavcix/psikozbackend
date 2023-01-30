import { Appointment, AppointmentModel } from "../models/appointment.model";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import moment from "moment";

export class AppointmentController {
  appointmentControl: any = async (req: Request, res: Response) => {
    const {
      user_username,
      is_received,
      doctor_username,
      date,
      hours,
      is_appointment,
    }: AppointmentModel = req.body;

    const user_control = await User.findOne({
      where: {
        username: user_username,
      },
    });

    const doctor_control = await User.findOne({
      where: {
        username: doctor_username,
      },
    });

    if (user_control === null || doctor_control === null) {
      return res.status(201).send({
        status: false,
        message: "danışan yada danışman bulunamadı ...",
      });
    }

    const appointment = await Appointment.findAll({
      where: {
        doctor_id: doctor_control,
        day: date,
        hours: hours,
      },
    });

    if (appointment.length !== 0) {
      let isWhich = appointment[0];

      return res.status(201).send({
        status: false,
        message: isWhich.is_appointment
          ? "Bu randevuya dair istek oluşturulmuştur"
          : isWhich.is_received
          ? "Bu randevu daha önce alınmıştır"
          : "Randevu şuanda müsait durumdadır",
      });
    }

    await Appointment.create({
      doctor_id: doctor_control.id,
      user_id: user_control.id,
      date: date,
      hours: hours,
      is_appointment: is_appointment,
      is_received: is_received,
    });

    return res.status(200).send({
      status: true,
      message: "Randevu başarıyla oluşturuldu",
    });
  };

  getDays = async (req: Request, res: Response) => {
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

    return res.status(200).send({
      status: true,
      data: result,
    });
  };
}
