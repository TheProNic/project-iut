'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/film',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('Star Wars').description('Title of the film'),
                    description: Joi.string().required().min(3).example('A long time ago in a galaxy far, far away...').description('Description of the film'),
                    releaseDate: Joi.date().required().example('1977-05-25').description('Release date of the film'),
                    producer: Joi.string().required().min(3).example('George Lucas').description('Producer of the film')
                })
            },
            auth: {
                scope: ['admin']
            }
        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            return filmService.create(request.payload);
        }
    },
    {
        method: 'patch',
        path: '/film/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('Film ID')
                }),
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('Star Wars').description('Title of the film'),
                    description: Joi.string().required().min(3).example('A long time ago in a galaxy far, far away...').description('Description of the film'),
                    releaseDate: Joi.date().required().example('1977-05-25').description('Release date of the film'),
                    producer: Joi.string().required().min(3).example('George Lucas').description('Producer of the film')
                })
            },
            auth:
                {
                    scope: ['admin']
                }
        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            filmService.update(request.params.id, request.payload);

            return '';
        }
    },
    {
        method: 'delete',
        path: '/film/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('Film ID')
                })
            },
            auth:
                {
                    scope: 'admin'
                }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { filmService } = request.services();

            filmService.delete(request.params.id);

            return '';
        }
    },
    {
        method: 'get',
        path: '/films',
        options: {
            tags: ['api'],
            auth:
                {
                    scope: ['user','admin']
                }
        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            return filmService.list();
        }
    },
    {
        method: 'get',
        path: '/film/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('User ID')
                })
            },
            auth:
                {
                    scope: ['user','admin']
                }
        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            return filmService.get(request.params.id);
        }
    }
];
