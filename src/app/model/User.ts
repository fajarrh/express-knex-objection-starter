import Model from "@lib/Model";
import { snakeCaseMappers } from "objection";

class User extends Model {
  public id: number;
  public email: string;
  public name: string;
  public phoneNumber: string;
  public googleId: string;
  public photo: string;
  public tokenNotification: string;
  public platform: string;
  public ownerUuid: string;

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

export default User;
