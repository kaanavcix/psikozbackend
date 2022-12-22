import { Router } from "express";
import { MaterialController } from '../controller/material.controller';



export const materialRoute = Router();

const materialController: MaterialController = new MaterialController();



materialRoute.get("/api/books",materialController.getbooks);
materialRoute.post("/api/book",materialController.addbooks);
materialRoute.get("/api/articles",materialController.getarticles);
materialRoute.get("/api/musics",materialController.getmusic);
materialRoute.get("/api/podcasts",materialController.getpodcast);

