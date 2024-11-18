import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware: RequestHandler = (req, res, next) => {
  let authorization = req.header("authorization");
  let code = 401;

  if (authorization) {
    if (!authorization.includes("Bearer")) {
      code = 401;
    }

    const [_, token] = authorization?.split(" ");
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decode) => {
      if (!err) {
        code = 200;
        Object.assign(req, {
          user: decode,
        });
      }
    });
  }

  if (code < 400) {
    next();
  } else {
    return res.status(code).json({ message: "Authorization" });
  }
};

export default AuthMiddleware;
