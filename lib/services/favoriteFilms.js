'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteFilms extends Service {

    list(userId) {

        const { FavoriteFilms } = this.server.models();

        return FavoriteFilms.query().where('userId', userId);
    }

    add(filmId, userId) {

        const { FavoriteFilms } = this.server.models();

        return FavoriteFilms.query().insertAndFetch({ filmId, userId });
    }

    remove(filmId, userId) {

        const { FavoriteFilms } = this.server.models();

        return FavoriteFilms.query().delete().where({ filmId, userId });
    }

    async getUsers(filmId) {
        const { FavoriteFilms } = this.server.models();
        const users = await FavoriteFilms.query()
            .where('filmId', filmId)
            .select('userId');
        return users.map(user => user.userId);
    }

};
