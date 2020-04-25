import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("image", (table) => {
    table.increments();
    table.string("imagePath");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("image");
}
