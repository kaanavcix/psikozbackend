import { Router, Request, Response, NextFunction } from "express";
import { PostController } from "../controller/posts/posts.controller";
import { LoginController } from "../controller/users/login.contoller";
import { RegisterController } from "../controller/users/register.controller";

//import loginController from "./controller/login.contoller";
const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {

  res.send("Psikoz 1.0.0 version API");

});

router.get('/psikoexpa', (req: Request, res: Response, next: NextFunction) => {

  res.send("Kodun son safeine geldiniz teşekkür ederim");


});

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  if (req.body != null) { new LoginController().login(req, res); }
  else { res.send("napıyon gardaş"); }
});


router.post('/post/:postId', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.postId);
  new PostController().post(req, res);
  res.status(200).send({
    sucess: true,
    message: "Data saved!"
  });});


router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  if (req.body != null) { new RegisterController().registerUser(req, res); }

  else {
    res.send("napıyon gardaş");

  }

});


export default router;