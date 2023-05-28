import {
    IsNotEmpty,
    IsOptional
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class PaginationDto{
  
    @Type(() => Number)
    @IsNotEmpty()
    perPage: number;
    
    @Type(() => Number)
    @IsNotEmpty()
    page: number;
    
    @IsOptional()
    order?: string[];
  }
  