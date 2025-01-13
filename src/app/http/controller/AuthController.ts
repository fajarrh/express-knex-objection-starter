import { Controller, Post } from "@lib/Decorators";
import { NextFunction, Request, Response } from "express";
import User from "@model/User";
import jwt from "jsonwebtoken";

@Controller("/auth") // Prefix path for this controller
export class AuthController {
  @Post("/login") // POST route for '/auth/login'
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let user = await User.query().where("email", req.body.email).first();
      if (!user) {
        user = await User.query().insertGraphAndFetch({
          name: req.body.name,
          email: req.body.email,
          googleId: req.body.googleId,
          tokenNotification: req.body.tokenNotification,
        });
      }

      const secret = process.env.JWT_SECRET as string;
      const jwtPayload = {
        id: (user as any).id,
        username: user.name,
      };

      const token = jwt.sign(jwtPayload, secret);
      res.json({ token: user });
    } catch (error) {
      next(error);
    }
  }
}
