import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';

async function bootstrap() {

  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers
      }
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove all not incluide in the DTOs
      forbidNonWhitelisted: true, // return bad request if has properties in the object not required
    })
  );
  await app.listen();
  logger.log(`Orders Microservices running on port ${envs.port}`)
}
bootstrap();
