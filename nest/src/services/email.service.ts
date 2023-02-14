import { Injectable } from '@nestjs/common';
import IEmailService from 'src/interfaces/IEmailService.interface';

@Injectable()
export class EmailService implements IEmailService {
  async send(email: string, subject: string, content: string) {}
}
