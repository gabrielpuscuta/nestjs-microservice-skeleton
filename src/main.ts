import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { useNatsTransporter } from '@system/transporters/nats.provider';
import { useValidationPipe } from '@system/validation/validation.pipe';
import { useRpcExceptionFilter } from '@system/rpc/rpc.exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    useNatsTransporter()
  );

  app.useGlobalPipes(useValidationPipe());
  app.useGlobalFilters(useRpcExceptionFilter());
  
  await app.listen();
}
bootstrap();
