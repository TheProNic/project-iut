'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/favoriteFilm',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    filmId: Joi.number().integer().positive().required().description('ID of the film')
                })
            },
            auth: {
                scope: ['user']
            }
        },
        handler: async (request, h) => {

            const { favoriteFilms } = request.services();

            return await favoriteFilms.add(request.payload.filmId, request.auth.credentials.id).catch((err) => {
                return 'Film already in your list !';
            });
        }
    },
    {
        method: 'delete',
        path: '/favoriteFilm',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    filmId: Joi.number().integer().positive().required().description('Film ID')
                })
            },
            auth:
                {
                    scope: ['user']
                }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { favoriteFilms } = request.services();

            await favoriteFilms.remove(request.payload.filmId, request.auth.credentials.id);

            return '';
        }
    },
    {
        method: 'get',
        path: '/favoriteFilm/{userId}',
        options: {
            tags: ['api'],
            auth:
                {
                    scope: ['user']
                }
        },
        handler: async (request, h) => {

            const { favoriteFilms } = request.services();

            return favoriteFilms.list(request.auth.credentials.id);
        }
    }
];
