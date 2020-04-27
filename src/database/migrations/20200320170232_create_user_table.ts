import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("user", (table) => {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("firstName");
    table.string("lastName");
    table.boolean("isVerified").defaultTo(false);
    table.string("username").notNullable();
    table.string("image").defaultTo("zillow/user-images/default");
    table
      .integer("role")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("role")
      .onDelete("RESTRICT");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("user");
}
