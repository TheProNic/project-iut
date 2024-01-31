'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user){

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }

    async list(){

        const { User } = this.server.models();

        return User.query().select('firstName', 'lastName', 'id');
    }

    async delete(id){

        const { User } = this.server.models();

        return User.query().deleteById(id);
    }
}
