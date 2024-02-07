'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@thepronic/iut-encypt');
const Jwt = require('@hapi/jwt');

module.exports = class FilmService extends Service {

    list() {

        const { Film } = this.server.models();

        return Film.query().select();
    }

    create(film) {

        const { Film } = this.server.models();

        return Film.query().insertAndFetch(film);
    }

    update(id, film) {

        const { Film } = this.server.models();

        return Film.query().patchAndFetchById(id, film).catch((err) => {
            console.log(err);
            return err;
        });
    }

    delete(id) {

        const { Film } = this.server.models();

        return Film.query().deleteById(id).catch((err) => {
            console.log(err);
            return err;
        });
    }
};
