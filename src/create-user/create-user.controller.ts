import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/sendMail-producer.service';
import { CreateUserDto } from './create-user-dto';

@Controller('create-user')
export class CreateUserController {

    constructor(private sendMailService: SendMailProducerService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        this.sendMailService.sendMail(createUserDto);
        return createUserDto
    }
}
