import { Injectable } from '@nestjs/common';
import { WorkerService } from '@root/worker/worker.service';
import IFileService from './interfaces/IFileService.interface';

@Injectable()
export class LocalFileService implements IFileService {
  constructor(private readonly _workerService: WorkerService) {}
  async upload() {
    const result = await this._workerService.uploadFile('', null);
  }

  async getUploadUrl(): Promise<string> {
    return 'local url';
  }

  async delete() {}
}
