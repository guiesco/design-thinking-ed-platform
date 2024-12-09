import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailService: MailerService) { }

    sendMail(email: string) {
        this.mailService.sendMail({
            from: 'Giovanni Moreton <giovannimoreton@gmail.com>',
            to: email,
            subject: 'Primeiro acesso',
            text: `http://localhost:4200/register`
        })
    }
}
