import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Psikoz 1.0.1 version API");
});

router.get("/psikoexpa", (req: Request, res: Response) => {
    res.send("Kodun son safeine geldiniz teşekkür ederim");
});

export default router;
