import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options:{
        servers: envs.natsServers
      }
    }
  );

  /*app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove all not incluide in the DTOs
      forbidNonWhitelisted: true, // return bad request if has properties in the object not required
    })
  );*/
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        // Imprime los errores detalladamente en consola
        console.error(
          '❌ Error de validación:',
          JSON.stringify(errors, null, 2)
        );
  
        // Retorna un error claro para depuración
        return new BadRequestException(errors);
      },
    })
  );


  await app.listen();
  logger.log(`Delivery Microservices running on port ${envs.port}`)
}
bootstrap();
