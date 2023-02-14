import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@root/services/config.service';
import { WorkerEmailProcessor } from './worker.email.processor';
import { WorkerFileProcessor } from './worker.file.processor';
import { WorkerService } from './worker.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
    BullModule.registerQueue({
      name: 'file',
    }),
  ],
  controllers: [],
  providers: [WorkerService, WorkerEmailProcessor, WorkerFileProcessor],
  exports: [WorkerService],
})
export class WorkerModule {}
