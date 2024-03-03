'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

class FavoriteFilms extends Model {
    static get tableName() {
        return 'favorite_films';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            filmId: Joi.number().integer().greater(0).example(1).description('ID of the film'),
            userId: Joi.number().integer().greater(0).example(1).description('ID of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get relationMappings() {
        const Film = require('./Film');
        const User = require('./User');

        return {
            film: {
                relation: Model.BelongsToOneRelation,
                modelClass: Film,
                join: {
                    from: 'favorite_films.filmId',
                    to: 'film.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'favorite_films.userId',
                    to: 'user.id'
                }
            }
        };
    }

    $beforeInsert(queryContext) {
        const now = new Date();
        this.createdAt = now;
        this.updatedAt = now;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
}

module.exports = FavoriteFilms;
