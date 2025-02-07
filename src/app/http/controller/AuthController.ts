import { Controller, Post } from "frexp/lib/Decorator";
import { NextFunction, Request, Response } from "express";
import { handleRegister, login } from "@service/AuthService";
import { loginSchema, registerSchema } from "@validation/AuthValidation";
@Controller("")
export class AuthController {
  @Post("/login")
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await req.validation(loginSchema);
      const result = await login(validated);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  @Post("/register")
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await req.validation(registerSchema);
      await handleRegister(validated);
      res.json({
        data: {
          message: "success",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
