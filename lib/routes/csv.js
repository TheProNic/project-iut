'use strict';

const Amqp = require('amqplib');


module.exports = [
    {
        method: 'get',
        path: '/generate-csv',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            }
        },
        handler: async (request, h) => {

            const connection = await Amqp.connect('amqp://localhost');
            const channel = await connection.createChannel();
            const queue = 'csv_generator';

            await channel.assertQueue(queue, {
                durable: true
            });

            await channel.sendToQueue(queue, Buffer.from(request.auth.credentials.email));
            return '';
        }
    }
];
