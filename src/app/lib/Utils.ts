import fs from "fs";
import path from "path";

export default class Utils {
  static uniqueNumber(value = "") {
    return Date.now() + "" + Math.round(Math.random() * 1e9) + "" + value;
  }

  static logError(err, location) {
    fs.createWriteStream(
      path.join(process.cwd(), "/src/storage/logs/error.log"),
      {
        flags: "a",
      }
    ).write(
      [new Date().toString(), location, JSON.stringify(err), "\r\n"].join(" ")
    );
  }

  static DB_SCHEMA(text?: string) {
    if (text) {
      return `${process.env.DB_SCHEMA}.${text}`;
    }
    return `${process.env.DB_SCHEMA}`;
  }

  static ADDR(text?: string) {
    if (text) {
      return `${process.env.ADDR}${text}`;
    }
    return `${process.env.ADDR}`;
  }
}
