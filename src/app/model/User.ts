import Model from "@lib/Model";
import { snakeCaseMappers } from "objection";

export default class User extends Model {
  public id: number;
  public name: string;
  public gender: string;
  public phoneNumber: string;
  public email: string;
  public activeAt: Date;
  public photo: string;
  public googleId: string;
  public tokenNotification: string;
  public createdAt: Date;
  public updatedAt: Date;

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    return {};
  }
}
