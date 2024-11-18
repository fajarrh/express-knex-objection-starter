import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.bigIncrements("id", { primaryKey: true }).unsigned();
    table.string("name").index("user_name").nullable().defaultTo(null);
    table
      .enum("gender", ["male", "female"])
      .index("user_gender")
      .nullable()
      .defaultTo(null);
    table
      .string("phone_number", 16)
      .index("user_phone_number")
      .nullable()
      .defaultTo(null);
    table.string("email", 64).index("user_email").nullable().defaultTo(null);
    table.timestamp("active_at").nullable().defaultTo(null);
    table.string("photo").nullable().defaultTo(null);
    table
      .string("google_id", 255)
      .index("user_google")
      .nullable()
      .defaultTo(null);
    table.string("token_notification", 255).nullable().defaultTo(null);
    table.uuid("owner_uuid").nullable().defaultTo(null);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
