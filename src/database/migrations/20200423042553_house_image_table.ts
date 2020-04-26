import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("houseImage", (table) => {
    table
      .integer("houseId")
      .unsigned()
      .index()
      .references("id")
      .inTable("house");

    table
      .integer("imageId")
      .unsigned()
      .index()
      .references("id")
      .inTable("image");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("houseImage");
}
