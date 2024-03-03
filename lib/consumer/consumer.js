'use strict';

const Amqp = require('amqplib');
const MailService  = require('../services/mail');
const FilmService = require('../services/film');

async function startAllConsumers() {
    await startMailWelcomeConsumer();
    // await startMailNewFilmConsumer();
    // await startMailUpdateFilmConsumer();
}
// eslint-disable-next-line func-style,require-await,@hapi/hapi/scope-start
async function startMailWelcomeConsumer() {
    const connection = await Amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    console.log('Queue welcome mail started');

    const queue = 'welcome';
    await channel.assertQueue(queue, {
        durable: true
    });

    const mailService = new MailService();
    await channel.consume(queue, (msg) => {
        mailService.sendWelcome(msg.content.toString());
        console.log(' [x] Received %s', msg.content.toString());
    }, {
        noAck: true
    });
}

async function startMailNewFilmConsumer() {
    const connection = await Amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    console.log('Queue new film mail started');

    const queue = 'new_film';
    await channel.assertQueue(queue, {
        durable: true
    });

    const mailService = new MailService();
    await channel.consume(queue, (msg) => {
        mailService.sendNewFilm(msg.content.toString());
        console.log(' [x] Received %s', msg.content.toString());
    }, {
        noAck: true
    });
}

async function startMailUpdateFilmConsumer() {
    const connection = await Amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    console.log('Queue update film mail started');

    const queue = 'update_film';
    await channel.assertQueue(queue, {
        durable: true
    });

    const mailService = new MailService();
    await channel.consume(queue, (msg) => {

        mailService.sendUpdateFilm(msg.content.toString());
        console.log(' [x] Received %s', msg.content.toString());
    }, {
        noAck: true
    });
}

module.exports = startAllConsumers;
