import { Injectable } from '@nestjs/common';
import IFileService from './interfaces/IFileService.interface';
import { AwsService } from '../../services/aws/aws.service';
import { WorkerService } from '@root/worker/worker.service';

@Injectable()
export class AwsFileService implements IFileService {
  constructor(
    private readonly _workerService: WorkerService,
    private readonly _awsService: AwsService,
  ) {}

  async upload() {
    const result = await this._workerService.uploadFile('', null);
  }

  async getUploadUrl(): Promise<string> {
    return this._awsService.getPresignedUrl('kkkk');
  }

  async delete() {}
}
