import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("rentForm", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.date("desiredMoveInDate");
    table.float("grossHouseholdIncome");
    table.integer("desiredDuration");

    table.string("shortMessage").defaultTo("");

    table.boolean("isRead").defaultTo(false);
    table
      .integer("houseId")
      .unsigned()
      .index()
      .references("id")
      .inTable("house");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("rentForm");
}
