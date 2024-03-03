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
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().required().min(8).example('Password').description('Password of the user'),
                    mail: Joi.string().required().email().example('john@doe.com').description('Mail of the user'),
                    username: Joi.string().required().min(3).example('JohnDoe').description('Username of the user')
                })
            },
            auth: false
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('Film ID')
                })
            },
            auth:
                {
                    scope: ['user','admin']
                }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            return userService.get(request.params.id);
        }
    },
    {
        method: 'get',
        path: '/users',
        options: {
            tags: ['api'],
            auth:
                {
                    scope: ['user','admin']
                }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

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
            auth:
                {
                    scope: 'admin'
                }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { userService } = request.services();

            userService.delete(request.params.id);

            return '';
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('User ID')
                }),
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().required().min(8).example('Password').description('Password of the user'),
                    mail: Joi.string().required().email().example('john@doe.com').description('Mail of the user'),
                    username: Joi.string().required().min(3).example('JohnDoe').description('Username of the user'),
                    scope: Joi.string().valid('user', 'admin').example('user').description('Scope of the user')
                })
            },
            auth:
                {
                    scope: ['admin']
                }
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            userService.update(request.params.id, request.payload);

            return '';
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    password: Joi.string().required().min(8).example('Password').description('Password of the user'),
                    mail: Joi.string().required().email().example('john@doe.com').description('Mail of the user')
                })
            },
            auth: false
        },
        handler: async (request, h) => {

            const { userService } = request.services();

            const token = await userService.login(request.payload);

            if (!token) {
                return h.response('Unauthorized').code(401);
            }

            return { login: 'successful', token: `Bearer ${token}` };
        }
    }
];
