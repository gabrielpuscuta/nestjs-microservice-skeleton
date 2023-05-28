import { ValidationError } from '@nestjs/common';

export type CustomErrorItem = {
  property: string;
  code: string;
  message: string;
}

export class ErrorManager{
  private validationErrors: ValidationError[];
  private errors: CustomErrorItem[];

  constructor({validationErrors, errors}: {validationErrors?: ValidationError[], errors?: CustomErrorItem[]}){
    this.validationErrors = validationErrors || [];
    this.errors = errors || [];
  }

  public addError(property: string,code: string,message: string){
    const error: CustomErrorItem = {property,code,message};
    this.errors.push(error);
  }

  public setValidationErrors(errors: ValidationError[]){
    this.validationErrors = errors;
  }

  public parseError(name: string, err: ValidationError,parent?: string){
    return {
      property: `${parent ? parent+'.' : ''}${err.property}`,
      code: `${parent ? parent+'.' : ''}${err.property}.${name}`,
      message: err.constraints[name]
    }
  }

  public parseErrors(errors: any[], parent?: string){
    for(const i in errors){
      const err = errors[i];

      if(err.constraints !== undefined){
        const constraints = Object.keys(err.constraints);
        for(const j in constraints){
          const name = constraints[j];
          const error: CustomErrorItem = this.parseError(
            name,
            err,
            parent,
          );
          this.errors.push(error);
        }
      }

      if(err.children !== undefined && err.children.length > 0){
        if(parent){
          parent = parent+'.'+err.property;
        }
        else{
          parent = err.property;
        }
        
        this.parseErrors(err.children,parent);
      }

    }
  }

  public getErrors(){
    this.parseErrors(this.validationErrors);
    return this.errors;
  }
}
