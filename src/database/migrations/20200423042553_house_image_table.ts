import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("houseImage", (table) => {
    table
      .bigInteger("houseId")
      .unsigned()
      .index()
      .references("id")
      .inTable("house");

    table
      .bigInteger("imageId")
      .unsigned()
      .index()
      .references("id")
      .inTable("image");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("houseImage");
}
