import "knex";

declare module "knex" {
  namespace Knex {
    interface QueryBuilder {
      paginate(
        page: number,
        perPage: number
      ): [[{ count: string }], result: Array];
      when(
        value: any,
        cb: (query: Knex.QueryBuilder, value) => void,
        next?: (query: Knex.QueryBuilder) => void
      ): Knex.QueryBuilder;
    }
  }
}
