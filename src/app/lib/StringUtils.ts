import bcrypt from "bcryptjs";
export default class StringUtils {
  static snackCaseToWord = (text: string) => {
    return (text || "")
      .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
  };

  static ucwords = (text: string) => {
    return (text || "").toLowerCase().replace(/\b[a-z]/g, function (letter) {
      return (letter || "").toUpperCase();
    });
  };

  static async hashPassword(password?: any) {
    if (!password) return "";
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async verifyPassword(password: any, hashed: any) {
    if (!password || !hashed) return false;
    return await bcrypt.compare(password, hashed);
  }
}
