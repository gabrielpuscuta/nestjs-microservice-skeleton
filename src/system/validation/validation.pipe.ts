import { ValidationError, ValidationPipe } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const validationOptions = {
    forbidUnknownValues: true,
    stopAtFirstError: true,
    forbidNonWhitelisted: true,
    enableDebugMessages: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      throw new RpcException(errors);
    }
}

export const useValidationPipe = () => {
    return new ValidationPipe(validationOptions)
}