import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("house", (table) => {
    table.increments();
    table.string("streetAddress");
    table.string("city");
    table.string("state");
    table.string("zipCode");
    table.string("country");
    table.decimal("lat", 14, 10);
    table.decimal("lng", 14, 10);
    table.float("price").defaultTo(0);
    table.float("livingArea").defaultTo(0);
    table.date("dateSold");
    table.float("noOfBathrooms").defaultTo(0);
    table.integer("noOfBedrooms").defaultTo(0);
    table.integer("noOfParkingSpots").defaultTo(0);
    table.integer("yearBuilt");
    table.boolean("isOpenHouse").defaultTo(false);
    table.boolean("isPublished").defaultTo(false);
    table
      .integer("homeStatus")
      .unsigned()
      .index()
      .references("id")
      .inTable("homeStatus");

    table
      .integer("homeType")
      .unsigned()
      .index()
      .references("id")
      .inTable("homeType");

    table
      .integer("listerId")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("house");
}
