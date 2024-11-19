import User from "@model/User";
import LoginResource from "@resource/LoginResource";
import express from "express";
import jwt from "jsonwebtoken";

const AuthController = express.Router();

AuthController.post("/login", async (req, res, next) => {
  try {
    await req.validation((yup) =>
      yup.object().shape({
        email: yup.string().email().required().label("email"),
        name: yup.string().required().label("name"),
      })
    );

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
      username: user.name
    };

    const token = jwt.sign(jwtPayload, secret);
    res.json(new LoginResource({ token, user }));
  } catch (error) {
    next(error);
  }
});

export default AuthController;
