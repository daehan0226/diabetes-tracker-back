import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('email')
export class WorkerEmailProcessor {
  private readonly logger = new Logger(WorkerEmailProcessor.name);

  @Process()
  handleTask(job: Job) {
    console.log(job);
    this.logger.debug(`Start job on`);
    const time = performance.now();
    let count = 0;
    while (count < 100) {
      count++;
    }
    this.logger.debug(`job completed: ${performance.now() - time}`);
  }
}
