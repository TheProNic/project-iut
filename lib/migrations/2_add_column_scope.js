'use strict';

// eslint-disable-next-line @hapi/hapi/scope-start
exports.up = async (knex) => {
    await knex.schema.alterTable('user', (table) => {
        table.string('scope').default('user');
    });
};

// eslint-disable-next-line @hapi/hapi/scope-start
exports.down = async (knex) => {
    await knex.schema.alterTable('user', (table) => {
        table.dropColumn('scope');
    });
};
