import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("savedHouse", (table) => {
    table
      .integer("houseId")
      .unsigned()
      .index()
      .references("id")
      .inTable("house");

    table.integer("userId").unsigned().index().references("id").inTable("user");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("savedHouse");
}
