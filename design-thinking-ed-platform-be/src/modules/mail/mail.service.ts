import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class MailService {
    constructor(private readonly mailService: MailerService) { }

    sendMail(email: string) {
        const message = "chegou o email -- link para entrar"
        this.mailService.sendMail({
            from: 'Giovanni Moreton <giovannimoreton@gmail.com>',
            to: email,
            subject: 'Primeiro acesso',
            text: message
        })
    }
}
