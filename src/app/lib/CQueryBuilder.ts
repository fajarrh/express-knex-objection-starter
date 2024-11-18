import { Model, QueryBuilder } from "objection";

export default class CQueryBuilderMyQueryBuilder<
  M extends Model,
  R = M[]
> extends QueryBuilder<M, R> {
  when(value: any, cb: (builder: this, value: any) => void) {
    if (value !== undefined) {
      if (value !== null) {
        cb(this, value);
      }
    }
    return this;
  }
}
