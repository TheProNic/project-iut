'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            // Objection retourne des promeses, il ne faut pas oublier des les await.
            return userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/user',
        options: {
            tags: ['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            // Objection retourne des promeses, il ne faut pas oublier des les await.
            return userService.list();
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('User ID')
                })
            },
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            userService.delete(request.params.id);

            return '';
        }
    }
];
