import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config.service';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private readonly logger = new Logger(AwsService.name);
  public publicS3: AWS.S3;

  constructor(public configService: ConfigService) {
    const options: AWS.S3.Types.ClientConfiguration = {
      apiVersion: '2010-12-01',
      region: 'ap-northeast-2',
      credentials: configService.awsCredentials,
    };
    this.publicS3 = new AWS.S3(options);
  }

  async getPresignedUrl(
    key: string,
    expireTime: number = 60 * 5 * 20,
  ): Promise<string> {
    return this.publicS3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.awsCredentials.bucketName,
      Key: key,
      Expires: expireTime, // In seconds
    });
  }
}
