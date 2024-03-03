'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/mail',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    to: Joi.string().email().required().example('rajoyef2003+test@gmail.com').description('Mail of the recipient'),
                    subject: Joi.string().required().min(3).example('Hello').description('Subject of the mail'),
                    text: Joi.string().required().min(3).example('Hello World').description('Text of the mail')
                })
            }
        },
        handler: async (request, h) => {

            const { mailService } = request.services();

            await mailService.send(request.payload.to, request.payload.subject, request.payload.text);

            return '';
        }
    }
];