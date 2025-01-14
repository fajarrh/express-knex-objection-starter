export default class Utils {
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
