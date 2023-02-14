import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateReportDto } from '../modules/report/dto/create-report.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    @InjectQueue('file') private fileQueue: Queue,
  ) {}
  async sendEmail(dto: CreateReportDto) {
    await this.emailQueue.add(dto);
  }

  async uploadFile(path: string, file: File) {
    console.log('?');
    await this.fileQueue.add({
      path,
      file,
    });
  }
}
