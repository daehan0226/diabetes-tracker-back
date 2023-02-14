import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchService } from './batch/batch.service';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/files/file.module';
import { ReportModule } from './modules/report/report.module';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => FileModule),
    WorkerModule,
    AuthModule,
    ReportModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, BatchService],
})
export class AppModule {}
