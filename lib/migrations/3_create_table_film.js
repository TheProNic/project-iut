'use strict';

// eslint-disable-next-line @hapi/hapi/scope-start
exports.up = async (knex) => {
    await knex.schema.createTable('film', (table) => {

        table.increments('id').primary();
        table.string('title').notNull();
        table.text('description').notNull();
        table.date('releaseDate').notNull();
        table.string('producer').notNull();

        table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
    });
};

// eslint-disable-next-line @hapi/hapi/scope-start
exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('user');
};
