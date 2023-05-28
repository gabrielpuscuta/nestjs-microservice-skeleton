import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    realm: string;
    
    @IsNotEmpty()
    clientId: string;
}
