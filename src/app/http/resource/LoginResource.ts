import Resource from "frexp/lib/Resource";
import UserResource from "./UserResource";

export default class LoginResource extends Resource {
  toArray() {
    return {
      token: this.token,
      user: new UserResource(this.user),
    };
  }
}
