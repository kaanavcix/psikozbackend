import { Router } from "express";
import { MaterialController } from "../controller/material.controller";
import { upload } from '../middleware/image.middleware';
import{verifyDoctor} from "../middleware/auth.middleware";
export const materialRoute = Router();

const materialController: MaterialController = new MaterialController();

//TODO: GET
materialRoute.get("/api/books",materialController.getbooks);
materialRoute.get("/api/articles",materialController.getarticles);
materialRoute.get("/api/musics",materialController.getmusic);
materialRoute.get("/api/podcasts",materialController.getpodcast);
materialRoute.get("/api/materials",materialController.getMaterial);

//TODO: POST
materialRoute.post("/api/book",upload.single("image"),materialController.addbooks);
materialRoute.post("/api/article",upload.single("image"),verifyDoctor,materialController.addArticle);
materialRoute.post("/api/music",upload.single("podcast"),materialController.uploadMusic);


