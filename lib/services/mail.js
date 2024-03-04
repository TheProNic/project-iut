// eslint-disable-next-line strict
const NodeMailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');
const converter = require('json-2-csv');

module.exports = class MailService extends Service {
    constructor(server) {

        super(server);
        this.transporter = NodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }

    async send(to, subject, text, attachement = null) {

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to,
            subject,
            text,
            attachments: attachement ? [{ filename: 'film.csv', content: attachement }] : []
        };

        return this.transporter.sendMail(mailOptions);
    }

    async sendWelcome(to) {
        return this.send(to, 'Welcome', 'Welcome to the API');
    }

    async sendUpdateFilm(film) {
        console.log(this.server);
        const { userService, filmService, favoriteFilms } = this.server.services();
        const filmUpdated = await filmService.get(film);
        const to = await favoriteFilms.getUsers(film);
        const userIds = await to;
        for (const userId of userIds) {
            const user = await userService.get(userId);
            await this.send(user.mail, 'Update Film', `The film ${filmUpdated.title} has been updated`);
        }
    }


    async sendNewFilm(film) {
        const { userService, filmService } = this.server.services();
        const users = await userService.list();

        const filmAdded = await filmService.get(film);
        await users.forEach((user) => this.send(user.mail, 'New Film', 'The film ' + filmAdded.title + ' has been added'));
        return Promise.resolve();
    }

    async sendCsv(to) {
        const { filmService } = this.server.services();
        const films = await filmService.list();
        const csv = converter.json2csv(films, (err, csv) => {
            console.log(csv);
            if (err) {
                throw err;
            }

            return csv;
        });
        return this.send(to, 'Film data', 'You will have as attachment the data of the BDD.', csv);
    }

};
