import { MailerService } from "@nestjs-modules/mailer";
import { OnQueueActive, OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreateUserDto } from "src/create-user/create-user-dto";

@Processor('sendMail-queue')
export class SendMailConsumer{

    constructor(private emailService: MailerService){}

    @Process('sendMail-job')
    async sendMailJob(job: Job<CreateUserDto>){
        const { data } = job;
        await this.emailService.sendMail({
            to: data.email,
            from: 'Teste <teste@teste.com>',
            subject: "teste email final",
            text: `Olá ${data.name}, seja bem vindo ao teste!`
        });
    }
}