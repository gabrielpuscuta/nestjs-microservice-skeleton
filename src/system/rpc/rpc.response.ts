import { HttpStatus } from '@nestjs/common';
import { CustomErrorItem } from '../validation/error-manager.service';

export type RpcStatusType = "error" | "success";

export interface RpcResponseInterface {
  statusCode: HttpStatus | null;
  status: RpcStatusType | null;
  data: any | null;
  errors: CustomErrorItem[];
}

export class RpcResponse {

    private response: RpcResponseInterface;

    constructor(response?: RpcResponseInterface){
        this.response = Object.assign({
            statusCode: null,
            status: null,
            data: null,
            errors: []
        }, {...response})
    }

    public setStatusCode(statusCode: HttpStatus){
        this.response.statusCode = statusCode;
        this.response.status = statusCode === 200 ? "success" : "error";
        return this;
    }

    public setData(data: any | null){
        this.response.data = data;
        return this;
    }

    public addError(error: CustomErrorItem){
        this.response.errors.push(error);
        return this;
    }

    public addErrors(errors: CustomErrorItem[]){
        this.response.errors = this.response.errors.concat(errors);
        return this;
    }

    public setErrors(errors: CustomErrorItem[]){
        this.response.errors = errors;
        return this;
    }

    public getStatusCode(){
        return this.response.statusCode;
    }

    public getStatus(){
        return this.response.status;
    }

    public getResponse(){
        return this.response;
    }

    static success(data: any | null){
        const response = (new RpcResponse()).setStatusCode(200).setData(data).getResponse();
        console.log(response);
        return response;
    }
}