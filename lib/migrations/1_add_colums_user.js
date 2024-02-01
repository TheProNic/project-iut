'use strict';

// eslint-disable-next-line @hapi/hapi/scope-start
exports.up = async (knex) => {
    await knex.schema.alterTable('user', (table) => {
        table.string('password');
        table.string('mail');
        table.string('username');
    });
};

// eslint-disable-next-line @hapi/hapi/scope-start
exports.down = async (knex) => {
    await knex.schema.alterTable('user', (table) => {
        table.dropColumn('password');
        table.dropColumn('mail');
        table.dropColumn('username');
    });
};
