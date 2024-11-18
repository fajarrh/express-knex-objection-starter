import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  const pass = "P@ssw0rd";
  const hashPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(pass, +process.env.BCRYPT_SALT!, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  // Inserts seed entries
  await knex
    .withSchema(process.env.DB_SCHEMA!)
    .table("users")
    .insert([
      {
        name: "Admin",
        email: "admin@email.com",
        password: hashPassword,
      },
    ]);
}
