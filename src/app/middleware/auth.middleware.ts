import jws from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models/user.model";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token;

  if (token === null) {
    res.status(404).send({
      success: false,
      message: "user not found",
    });
  }

  if (token !== null) {
    const tokenVerify = await User.findAll({
      where: {
        token: token,
      },
    });

    if (tokenVerify.length > 0) {
      next();
    }
  }
};

const verifyToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;

  if (token !== null) {
    User.findOne({
      where: {
        token: token,
      },
    });
  }

  next((err: Error) => {
    return res.status(404).send({
      message: err.message,
      status: false,
    });
  });
};

const verifyDoctor: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token;
  console.log(token);
  if (token === null || token === undefined) {
    return res.status(404).send({
      message: "error",
    });
  }

  var data = await User.findOne({
    where: {
      token: token,
    },
  });
  if (data === null) {
    return res.status(404).send({
      message: "error message",
    });
  }
  if (data?.is_patient == false) {
    next();
  }

  if (data.is_patient == true) {
    return res.status(404).send({
      message: "user is patient",
      sucess: false,
    });
  }
};

export { verifyDoctor, verifyToken,verifyUser };
