import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("homeType", (table) => {
      table.increments();
      table.string("type");
    })
    .then(() => {
      return knex("homeType").insert([
        { type: "HOUSES" },
        { type: "APARTMENT" },
        { type: "CONDOS" },
      ]);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("homeType");
}
