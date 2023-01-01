import { RequestHandler, Response, Request } from 'express';
import { User, TokenModel } from '../models/user.model';

export class UserController {
  getUserData: RequestHandler = async (req: Request, res: Response) => {
    const token: TokenModel = req.body.token;
    if (!token) {
      return res.status(400).json({
        status: false,
      });
    }

    let user = await User.findOne({
      where: {
        token: token,
      },
    });

    res.status(200).send({
      success: true,
      data: {
        id: user?.id,
        name: user?.name,
        username: user?.username,
        is_patient: user?.is_patient,
        age: user?.age,
        gender: user?.gender,
        description: user?.description
      }
    });
  }



  updateImage: RequestHandler = async (req: Request, res: Response) => {

    var mode = await User.findOne({
      where: {
        "id": req.params.id,
      },

    }).then((user) => {

      if (user != null) {
        user.avatar = req.file?.path;

        return user.save();

      }


    });

    if (mode !== null) {
      return res.status(200).send({ success: true, message: "Fotoğraf başarıyla değiştirildi" });
    }

    else {
      return res.sendStatus(404).send({

        success: false,
        message: "Kullanıcı bulunamadı"
      });
    }



  }



  usernameController: RequestHandler = async (req: Request, res: Response) => {

    const username = req.params.username;

    var mode = await User.findAll({
      where: {
        username: username
      }
    });

    if (mode.length === 0) {
      return res.status(200).send({
        success: true
      })
    }
    else {
      return res.status(201).send({
        success: false,
        message: "Bu kullanıcı adı mevcuttur"
      });
    }
  }

}
