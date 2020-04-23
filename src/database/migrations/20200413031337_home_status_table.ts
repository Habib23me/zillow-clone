import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("homeStatus", (table) => {
      table.increments();
      table.string("status");
    })
    .then(() => {
      return knex("homeStatus").insert([
        { status: "FOR SALE" },
        { status: "FOR RENT" },
        { status: "SOLD" },
      ]);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("homeStatus");
}
