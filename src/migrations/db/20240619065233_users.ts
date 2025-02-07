import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.bigIncrements("id", { primaryKey: true }).unsigned();
    table.string("name").nullable().defaultTo(null);
    table.string("phone_number", 16).nullable().defaultTo(null);
    table.string("email", 64).nullable().defaultTo(null);
    table.string("password").nullable().defaultTo(null);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
