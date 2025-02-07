import Model from "@lib/Model";
import { snakeCaseMappers } from "objection";

export default class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public phoneNumber: string;
  public password: string;
  public createdAt: any;
  public updatedAt: any;

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
