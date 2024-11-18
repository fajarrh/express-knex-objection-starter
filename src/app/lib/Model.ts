import db from "@config/db";
import { Model as M } from "objection";
import CQueryBuilder from "./CQueryBuilder";

M.knex(db);

export default class Model extends M {
  declare QueryBuilderType: CQueryBuilder<this>;
  static QueryBuilder = CQueryBuilder;
}
