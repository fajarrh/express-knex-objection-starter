import { RequestHandler } from "express";
import Validation from "frexp/lib/Validation";

const RequestMiddleware: RequestHandler = (req, _, next) => {
  const date = new Date();
  if (req.header("tz")) {
    date.setUTCHours(date.getUTCHours() + Number(req.header("tz")));
  }

  Object.assign(req, {
    getQuery: (key: string, defaulValue?: any) => {
      return req.query[key] ?? defaulValue ?? null;
    },
    validation: Validation.body(req.body),
    now: () => date,
  });
  next();
};

export default RequestMiddleware;
