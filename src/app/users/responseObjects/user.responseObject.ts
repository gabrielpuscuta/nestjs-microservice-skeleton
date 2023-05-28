import { Expose, Exclude, Type, Transform } from 'class-transformer';

@Exclude()
export class UserResponseObject {
    @Expose()
    id: string;

    @Expose()
    realm: string;

    @Expose()
    clientId: string;
}