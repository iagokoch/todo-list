import { Router } from "express";
import { register, login } from "../controllers/authController";
import { body } from "express-validator";

const router = Router();

// Validação para registro
const registerValidation = [
  body("name").notEmpty().withMessage("Nome é obrigatório"),
  body("email").isEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter no mínimo 6 caracteres"),
];

// Validação para login
const loginValidation = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("Senha é obrigatória"),
];

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;
