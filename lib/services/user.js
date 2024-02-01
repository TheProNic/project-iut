'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@thepronic/iut-encypt');

module.exports = class UserService extends Service {

    create(user) {

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        return User.query().insertAndFetch(user);
    }

    list() {

        const { User } = this.server.models();

        return User.query().select('firstName', 'lastName', 'id');
    }

    delete(id) {

        const { User } = this.server.models();

        return User.query().deleteById(id);
    }

    update(id, user) {

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        return User.query().patchAndFetchById(id, user);
    }

    async login(user) {

        const { User } = this.server.models();

        user.password = Encrypt.sha1(user.password);

        const userFound = await User.query().select('firstName', 'lastName', 'id').where('mail', user.mail).andWhere('password', user.password);
        return !userFound.length;
    }
};
