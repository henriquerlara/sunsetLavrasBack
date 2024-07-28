import { Router, Request, Response } from "express";
import { createUser, getUsers, usuarioValidation } from "../controllers/usuarioController";
import { authenticateUser } from "../shared/middleware/auth";

declare global {
  namespace Express {
    interface Request {
      logout(): void;
      flash(type: string, message: string): void;
    }
  }
}

const router = Router();

router.post("/users", usuarioValidation, createUser);
router.get("/users", getUsers);
router.get("/users/logout", (req: Request, res: Response) => {
  req.logout();
  req.flash("success_msg", "Deslogado com sucesso!");
  res.redirect("/");
});

export default router;
