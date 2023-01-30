import { Injectable } from '@nestjs/common';
import IFileService from './interfaces/IFileService.interface';
import { AwsService } from '../../services/aws/aws.service'

@Injectable()
export class AwsFileService extends AwsService implements IFileService {

    async upload() {
        
    }

    async getUploadUrl(): Promise<string> {
        return this.getPresignedUrl("kkkk")
    }

    async delete() {
        
    }
}
