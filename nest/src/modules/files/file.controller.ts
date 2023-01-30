import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import IFileService from './interfaces/IFileService.interface';

@Controller('file')
export class FileController {
  constructor(
    @Inject('FileService') 
    private readonly _fileService: IFileService
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  async getUploadUrl(): Promise<string> {
    return await this._fileService.getUploadUrl()
  }
}
