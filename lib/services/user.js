'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@thepronic/iut-encypt');
const Jwt = require('@hapi/jwt');
const Amqp = require('amqplib');

module.exports = class UserService extends Service {

    async create(user) {

        const { User } = this.server.models();
        const { mailService } = this.server.services();

        user.password = Encrypt.sha1(user.password);
        const connection = await Amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'welcome';
        await channel.assertQueue(queue, {
            durable: true
        });

        await User.query().insertAndFetch(user);
        channel.sendToQueue(queue, Buffer.from(user.mail));

        return user;
    }

    list() {

        const { User } = this.server.models();

        return User.query().select();
    }

    get(id) {
        const { User } = this.server.models();

        return User.query().findById(id);
    }

    delete(id) {

        const { User } = this.server.models();

        return User.query().deleteById(id).catch((err) => {
            console.log(err);
            return err;
        });
    }

    update(id, user) {

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        return User.query().patchAndFetchById(id, user).catch((err) => {
            console.log(err);
            return err;
        });
    }

    async login(user) {

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        try {
            const userFound = await User.query().throwIfNotFound().findOne({ mail: user.mail, password: user.password });

            return Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    id: userFound.id,
                    firstName: userFound.firstName,
                    lastName: userFound.lastName,
                    email: userFound.mail,
                    scope: userFound.scope
                },
                {
                    key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );
        } catch (e) {
            return false;
        }
    }
};
