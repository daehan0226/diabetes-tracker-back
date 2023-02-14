import { Injectable } from '@nestjs/common';
import { WorkerService } from 'src/worker/worker.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly _workerService: WorkerService) {}
  async create(dto: CreateReportDto) {
    const result = await this._workerService.sendEmail(dto);
  }
}
