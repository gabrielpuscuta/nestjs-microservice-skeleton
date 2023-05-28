import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class FindOneUserDto {
    @IsUUID(4)
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    clientId: string;

    @IsNotEmpty()
    realm: string;
}
