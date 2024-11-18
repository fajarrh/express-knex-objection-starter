export default class AuthorizationException extends Error {
  constructor() {
    super("Authorization");
  }
}
