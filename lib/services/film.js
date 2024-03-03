'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FilmService extends Service {

    list() {

        const { Film } = this.server.models();

        return Film.query().select();
    }

    get(id) {

        const { Film } = this.server.models();

        return Film.query().findById(id);
    }

    create(film) {

        const { Film } = this.server.models();
        const { mailService } = this.server.services();

        return Film.query().insertAndFetch(film).then((film) => {
            mailService.sendNewFilm(film);
        });
    }

    update(id, film) {

        const { Film } = this.server.models();
        const { favoriteFilms, userService, mailService } = this.server.services();

        return Film.query().patchAndFetchById(id, film).catch((err) => {
            console.log(err);
            return err;
        }).then(async (film) => {
            mailService.sendUpdateFilm(favoriteFilms.getUsers(film.id), film);
            return film;
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
