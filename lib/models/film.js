'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {

        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Star Wars').description('Title of the film'),
            description: Joi.string().min(3).example('A long time ago in a galaxy far, far away...').description('Description of the film'),
            releaseDate: Joi.date().example('1977-05-25').description('Release date of the film'),
            producer: Joi.string().min(3).example('George Lucas').description('Producer of the film'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};