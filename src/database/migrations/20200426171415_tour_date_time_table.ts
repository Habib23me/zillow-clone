import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema
    .createTable("tourDateTime", (table) => {
      table.increments();
      table.string("time");
    })
    .then(() => {
      return knex("tourDateTime").insert([
        { time: "MORNING" },
        { time: "AFTERNOON" },
        { time: "EVENING" },
      ]);
    });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("tourDateTime");
}
