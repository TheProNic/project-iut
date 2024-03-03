'use strict';

// eslint-disable-next-line @hapi/hapi/scope-start
exports.up = async (knex) => {
    await knex.schema.createTable('favorite_films', (table) => {

        table.increments('id').primary();
        table.integer('filmId').unsigned().notNull();
        table.integer('userId').unsigned().notNull();

        table.foreign('filmId').references('id').inTable('film');
        table.foreign('userId').references('id').inTable('user');

        table.unique(['filmId', 'userId']);

        table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
    });
};

// eslint-disable-next-line @hapi/hapi/scope-start
exports.down = async (knex) => {
    await knex.schema.drop('favorite_films');
};