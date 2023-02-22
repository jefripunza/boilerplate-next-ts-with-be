/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("todos", (table) => {
    table.increments("id");
    table.string("text").notNullable();
    table.boolean("done").notNullable();
  });

  await knex("todos").insert([
    { text: "Buy milk", done: true },
    { text: "Wash car", done: false },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw("DROP TABLE todos CASCADE");
};
