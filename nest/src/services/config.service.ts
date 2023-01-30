import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';


export class ConfigService {
    private readonly logger = new Logger(ConfigService.name);
    nodeEnv: string
    constructor() {
        this.logger.debug('=== PUBLIC ENV LIST START ===')
        this.nodeEnv = process.env.NODE_ENV || 'local';
        this.logger.debug(`NEST APP ENV: ${this.nodeEnv}`)
        dotenv.config({
            path: `.env.${this.nodeEnv}`,
        });
        
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
            if (this.publicEnvs.includes(envName)) this.logger.debug(`${envName}: ${process.env[envName] }`)
        }
        this.logger.debug('=== PUBLIC ENV LIST END ===')
    }

    get publicEnvs() {
        return [
            'NEST_INTERNAL_PORT',
            'NEST_EXTERNAL_PORT',
            'NEST_FILE_SERVICE',   
        ]
    }

    get file_service(): string {
        return process.env.NEST_FILE_SERVICE?? 'local'
    }

    get jwtSecretKey(): string {
        return process.env.JWT_SECRET_KEY?? 'nest-jwt-secret'
    }

    get port(): number {
        const port = Number(process.env.NEST_INTERNAL_PORT?? 16000)
        this.logger.debug(`NEST APP PORT: ${port}`)
        return port
    }

    get awsCredentials() {
        const result = {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            bucketName: process.env.S3_BUCKET_NAME,
        }
        Object.keys(result).forEach((key: string) => {
            if (result[key] === undefined) {
                throw new ReferenceError(`AWS credentials ${key} is missing`)
            }
        })
        return result;
    }
}
