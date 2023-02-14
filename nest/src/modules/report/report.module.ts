import { forwardRef, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { WorkerModule } from 'src/worker/worker.module';

@Module({
  imports: [forwardRef(() => WorkerModule)],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
