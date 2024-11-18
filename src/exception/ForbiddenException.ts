export default class ForbiddenException extends Error {
  constructor() {
    super("Forbidden");
  }
}
