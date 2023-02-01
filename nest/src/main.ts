import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './services/config.service';
import { SharedModule } from './services/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.select(SharedModule).get(ConfigService);

  if (['development', 'local'].includes(configService.nodeEnv)) {
    // setupSwagger(app);
  }
  await app.listen(configService.port);
}
bootstrap();
