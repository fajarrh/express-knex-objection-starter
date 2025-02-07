import RedisUtils from "@lib/RedisUtils";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware: RequestHandler = async (req, res, next) => {
  let authorization = req.header("authorization");
  let code = 401;

  if (authorization) {
    if (!authorization.includes("Bearer")) {
      code = 401;
    }

    const [_, token] = authorization?.split(" ");
    await Promise.resolve(
      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        async (err, decode: any) => {
          if (!err && decode) {
            const value = await RedisUtils.getSession(0, decode.id);
            if (value) {
              if (value.uuid === decode.uuid) {
                code = 200;
                req.user = value;
              }
            }
          }
        }
      )
    );
  }

  if (code < 400) {
    next();
  } else {
    return res.status(code).json({ message: "Authorization" });
  }
};

export default AuthMiddleware;
