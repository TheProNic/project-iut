'use strict';

const { Service } = require('@hapipal/schmervice');
const Amqp = require("amqplib");

module.exports = class FilmService extends Service {

    constructor(server) {
        super(server);
        this.server = server;
    }

    list() {

        const { Film } = this.server.models();

        return Film.query().select();
    }

    get(id) {

        const { Film } = this.server.models();

        return Film.query().findById(id);
    }

    async create(film) {

        const { Film } = this.server.models();
        const { mailService } = this.server.services();

        const filmAdded = await Film.query().insertAndFetch(film);
        const connection = await Amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'new_film';

        await channel.assertQueue(queue, {
            durable: true
        });

        await channel.sendToQueue(queue, Buffer.from(filmAdded.id.toString()));

        // mailService.sendNewFilm(filmAdded.id);
        return filmAdded;
    }

    async update(id, film) {

        const { Film } = this.server.models();
        const filmUpdated = await Film.query().patchAndFetchById(id, film).catch((err) => {
            console.log(err);
            return err;
        });

        const connection = await Amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'update_film';

        await channel.assertQueue(queue, {
            durable: true
        });

        console.log(filmUpdated);
        await channel.sendToQueue(queue, Buffer.from(filmUpdated.id.toString()));

        return filmUpdated;
    }

    delete(id) {

        const { Film } = this.server.models();

        return Film.query().deleteById(id).catch((err) => {
            console.log(err);
            return err;
        });
    }
};
