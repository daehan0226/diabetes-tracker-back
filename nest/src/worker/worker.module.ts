import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { WorkerEmailProcessor } from './worker.email.processor';
import { WorkerFileProcessor } from './worker.file.processor';
import { WorkerService } from './worker.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6369,
      },
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
    BullModule.registerQueue({
      name: 'file',
    }),
  ],
  controllers: [],
  providers: [WorkerEmailProcessor, WorkerFileProcessor, WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
