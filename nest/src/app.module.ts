import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchService } from './batch/batch.service';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/files/file.module';

@Module({
  imports: [ ConfigModule.forRoot(), forwardRef(() => FileModule), AuthModule ],
  controllers: [AppController],
  providers: [AppService, BatchService],
})
export class AppModule {}
