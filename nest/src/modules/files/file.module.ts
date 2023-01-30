import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from 'src/services/config.service';
import { SharedModule } from 'src/services/shared.module';
import { AuthModule } from '../auth/auth.module';
import { AwsFileService } from './awsFile.service';
import { FileController } from './file.controller';
import { LocalFileService } from './localFile.service';


// 호출 방법
// @Inject('FileService') 
// private readonly _fileService: IFileService
const FileServiceProvider = {
  provide: 'FileService',
  useFactory: (
      configService: ConfigService,
      localFileService: LocalFileService,
      awsFileService: AwsFileService
  ) => {
      if (configService.file_service === 'local') {
          return localFileService
      }
      return awsFileService
  },
  inject: [ConfigService, LocalFileService, AwsFileService]
}


const providers = [
  ConfigService,
  AwsFileService,
  LocalFileService,
  FileServiceProvider,
]


@Module({
  imports: [ SharedModule, AuthModule ],
  controllers: [ FileController ],
  exports: [ ...providers ],
  providers,
})
export class FileModule {}
