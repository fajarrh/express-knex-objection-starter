import fs from "fs";
import path from "path";

export default class Utils {
  static uniqueNumber(value = "") {
    return Date.now() + "" + Math.round(Math.random() * 1e9) + "" + value;
  }

  static rupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
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

  static snackCaseToWord = (text: string) => {
    return (text || "")
      .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
      .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_
  };

  static ucwords = (text: string) => {
    return (text || "").toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return (letter || "").toUpperCase();
    });
  };
}
