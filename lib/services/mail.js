// eslint-disable-next-line strict
const NodeMailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

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

    async send(to, subject, text) {

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to,
            subject,
            text
        };

        return this.transporter.sendMail(mailOptions);
    }

    async sendWelcome(to) {
        return this.send(to, 'Welcome', 'Welcome to the API');
    }

    async sendUpdateFilm(to, film) {
        return this.send(to, 'Update Film', 'The film' + film.title + '  has been updated');
    }

    async sendNewFilm(film) {
        const { userService } = this.server.services();
        const users = await userService.list();

        users.forEach((user) => this.send(user.mail, 'New Film', 'The film ' + film.title + ' has been added'));
        return Promise.resolve();
    }

};
