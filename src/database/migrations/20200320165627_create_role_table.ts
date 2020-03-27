import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("role", table => {
      table.increments();
      table.string("role");
    })
    .then(() => {
      return knex("role").insert([{ role: "REGISTERED" }, { role: "AGENT" }]);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("role");
}
