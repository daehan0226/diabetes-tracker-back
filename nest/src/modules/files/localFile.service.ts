import { Injectable } from '@nestjs/common';
import IFileService from './interfaces/IFileService.interface';

@Injectable()
export class LocalFileService implements IFileService {

    async upload() {
        
    }

    async getUploadUrl(): Promise<string> {
        return 'local url'
    }

    async delete() {
        
    }
}
