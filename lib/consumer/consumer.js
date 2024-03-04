'use strict';

const Amqp = require('amqplib');
const MailService  = require('../services/mail');

async function startAllConsumers(server) {
    console.log('Starting all consumers');
    console.log('Starting welcome mail consumer...');
    await startMailWelcomeConsumer(server);
    console.log('Starting new film mail consumer...');
    await startMailNewFilmConsumer(server);
    console.log('Starting update film mail consumer...');
    await startMailUpdateFilmConsumer(server);
    console.log('Starting csv generator consumer...');
    await startCSVGeneratorConsumer(server);
}

// eslint-disable-next-line func-style,require-await,@hapi/hapi/scope-start
async function startMailWelcomeConsumer(server) {
    const connection = await Amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    console.log('Queue welcome mail started');

    const queue = 'welcome';
    await channel.assertQueue(queue, {
        durable: true
    });

    const mailService = new MailService(server);
    await channel.consume(queue, (msg) => {
        mailService.sendWelcome(msg.content.toString());
        console.log(' [x] Received %s', msg.content.toString());
    }, {
        noAck: true
    });
}

async function startMailNewFilmConsumer(server) {
    const connection = await Amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    console.log('Queue new film mail started');

    const queue = 'new_film';
    await channel.assertQueue(queue, {
        durable: true
    });

    const mailService = new MailService(server);
    await channel.consume(queue, (msg) => {
        mailService.sendNewFilm(msg.content.toString());
        console.log(' [x] Received %s', msg.content.toString());
    }, {
        noAck: true
    });
}

async function startMailUpdateFilmConsumer(server) {
    const connection = await Amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    console.log('Queue update film mail started');

    const queue = 'update_film';
    await channel.assertQueue(queue, {
        durable: true
    });

    const mailService = new MailService(server);
    await channel.consume(queue, (msg) => {
        mailService.sendUpdateFilm(msg.content.toString());
        console.log(' [x] Received %s', msg.content.toString());
    }, {
        noAck: true
    });
}

async function startCSVGeneratorConsumer(server) {
    const connection = await Amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    console.log('Queue csv generator started');

    const queue = 'csv_generator';
    await channel.assertQueue(queue, {
        durable: true
    });

    const mailService = new MailService(server);
    await channel.consume(queue, (msg) => {
        mailService.sendCsv(msg.content.toString());
        console.log(' [x] Received %s', msg.content.toString());
    }, {
        noAck: true
    });
}

module.exports = startAllConsumers;
