import prisma from "@config/db";
import AuthorizationException from "@exception/AuthorizationException";
import RedisUtils from "@lib/RedisUtils";
import StringUtils from "@lib/StringUtils";
import { LoginSchema, RegisterSchema } from "@validation/AuthValidation";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import User from "@model/User";

export const login = async (payload: LoginSchema) => {
  const user = await User.query().where("email", payload.email).first();

  if (!user) {
    throw new AuthorizationException();
  }

  const { id, password, ...other } = user;
  const passVerify = await StringUtils.verifyPassword(
    payload.password,
    password
  );
  if (!passVerify) {
    throw new AuthorizationException();
  }

  const jwtPayload = {
    id: id,
    uuid: v4(),
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string);
  await RedisUtils.setSession(0, String(id), jwtPayload);
  return {
    token: token,
    user: other,
  };
};

export const handleRegister = async (payload: RegisterSchema) => {
  payload.password = await StringUtils.hashPassword(payload.password);
  return User.query().insertGraph(payload);
};
