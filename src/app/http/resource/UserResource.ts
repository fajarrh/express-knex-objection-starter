import Resource from "frexp/lib/Resource";

export default class UserResource extends Resource {
  toArray() {
    return {
      id: this.id,
      name: this.name,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      email: this.email,
      activeAt: this.activeAt,
      photo: this.photo,
      googleId: this.googleId,
      tokenNotification: this.tokenNotification,
    };
  }
}
