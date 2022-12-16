import { Router, Request, Response, NextFunction } from "express";
import { PostController } from "../controller/posts/posts.controller";
import { LoginController } from "../controller/users/login.controller";
import { RegisterController } from "../controller/users/register.controller";

const router: Router = Router();


const _loginController: LoginController = new LoginController();

router.get("/", (req: Request, res: Response, next: NextFunction) => {

  res.send("Psikoz 1.0.1 version API");

});

router.get('/psikoexpa', (req: Request, res: Response, next: NextFunction) => {

  res.send("Kodun son safeine geldiniz teşekkür ederim");


});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  if (req.body != null) { new LoginController().login(req, res, next); }
  else { res.send("napıyon gardaş"); }
});


router.post('/post/:postId', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.postId);
  new PostController().allPost(req, res,next);
  res.status(200).send({
    sucess: true,
    message: "Data saved!"
  });});


router.post('/register', );

router.get("/posts", (req: Request, res: Response, next: NextFunction)=>{

   
  new PostController().allPost(req, res,next);
  res.status(200).send({
    sucess: true,
    message: "Data return!"
  });});


export default router;