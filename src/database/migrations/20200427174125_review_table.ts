import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("review", (table) => {
    table.increments();
    table.string("review").notNullable();
    table.integer("rating").notNullable();
    table
      .integer("agentId")
      .unsigned()
      .index()
      .references("userId")
      .inTable("agent");
    table.integer("userId").unsigned().index().references("id").inTable("user");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("review");
}
