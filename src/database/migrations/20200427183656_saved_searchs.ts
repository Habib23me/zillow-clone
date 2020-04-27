import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("savedSearch", (table) => {
    table.increments();
    table.string("name");
    table.json("searchQuery");
    table.integer("userId").unsigned().index().references("id").inTable("user");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("savedSearch");
}
