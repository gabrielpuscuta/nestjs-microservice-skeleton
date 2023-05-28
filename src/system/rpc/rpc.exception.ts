import { Catch, RpcExceptionFilter, ArgumentsHost,ValidationError, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ErrorManager } from '../validation/error-manager.service';
import { RpcResponse } from './rpc.response';
import * as util from 'util';

@Catch(RpcException)
export class RcpExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => {
        const manager = new ErrorManager({
            validationErrors: exception.getError() as ValidationError[]
        });
        
        const response = new RpcResponse({
          statusCode: 401,
          status: "error",
          data: null,
          errors: manager.getErrors()
        }).getResponse()

        console.log(util.inspect(response, false, null, true ))
        return response;
    });
  }
}

export const useRpcExceptionFilter = () => {
    return new RcpExceptionFilter();
}