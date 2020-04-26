import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("tourDate", (table) => {
    table.increments();
    table.date("date");
    table
      .integer("time")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tourDateTime")
      .onDelete("RESTRICT");
    table
      .integer("tourId")
      .unsigned()
      .index()
      .references("id")
      .inTable("tourForm");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("tourDate");
}
