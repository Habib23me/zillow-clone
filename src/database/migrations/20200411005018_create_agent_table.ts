import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("agent", (table) => {
    table
      .integer("userId")
      .unsigned()
      .index()
      .references("id")
      .inTable("user")
      .primary();
    table.string("phone");
    table.string("brokerageName");
    table.string("brokerageAddress");
    table.string("city");
    table.string("state");
    table.string("zipCode");
    table.decimal("lat", 14, 10);
    table.decimal("lng", 14, 10);
    table.string("licenseNumber");
    table.string("licenceExpirationDate");
    table.string("website");
    table.string("blog");
    table.string("facebook");
    table.string("twitter");
    table.string("linkedId");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("agent");
}
