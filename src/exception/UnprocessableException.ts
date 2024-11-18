export default class UnprocessableException extends Error {
  constructor(error: any = "") {
    super(JSON.stringify(error));
  }
}
