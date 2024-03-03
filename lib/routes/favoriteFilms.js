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
                    filmId: Joi.number().integer().positive().required().description('ID of the film'),
                    userId: Joi.number().integer().positive().required().description('ID of the user')
                })
            },
            auth: {
                scope: ['user']
            }
        },
        handler: async (request, h) => {

            const { favoriteFilms } = request.services();

            return await favoriteFilms.add(request.payload.filmId, request.payload.userId).catch((err) => {
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
                    filmId: Joi.number().integer().positive().required().description('Film ID'),
                    userId: Joi.number().integer().positive().required().description('User ID')
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

            await favoriteFilms.remove(request.payload.filmId, request.payload.userId);

            return '';
        }
    },
    {
        method: 'get',
        path: '/favoriteFilm/{userId}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().positive().required().description('User ID')
                })
            },
            auth:
                {
                    scope: ['user']
                }
        },
        handler: async (request, h) => {

            const { favoriteFilms } = request.services();

            return favoriteFilms.list(request.params.userId);
        }
    }
];
