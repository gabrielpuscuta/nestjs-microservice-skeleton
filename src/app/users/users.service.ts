import { Injectable } from '@nestjs/common';
import { transformAndValidate } from "class-transformer-validator";
import { CreateUserDto, FindOneUserDto } from './dto';
import { User } from '@db/models/user.model';
import { UserResponseObject } from './responseObjects/user.responseObject';

@Injectable()
export class UsersService {

    getResponseObject(user: User){
        return transformAndValidate(UserResponseObject, user);
    }

    create(dto: CreateUserDto){
        return User.create({...dto});
    }
    
    findOne(dto: FindOneUserDto){
        return User.findOne({
            where: {...dto}
        });
    }

    async findOrCreate(dto: FindOneUserDto){
        let user = await this.findOne(dto);

        if(!user){
            user = await User.create({...dto});
        }

        return user;
    }
}
