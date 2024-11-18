import Resource from "frexp/lib/Resource";
export default class UserResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      name: this.name,
      email: this.email,
    };
  }
}
