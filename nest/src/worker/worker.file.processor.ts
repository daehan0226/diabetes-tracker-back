import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('file')
export class WorkerFileProcessor {
  private readonly logger = new Logger(WorkerFileProcessor.name);

  @Process()
  handleTask(job: Job) {
    console.log(job);
    const time = performance.now();
    let count = 0;
    while (count < 100) {
      count++;
    }
    this.logger.debug(`job completed: ${performance.now() - time}`);
  }
}
