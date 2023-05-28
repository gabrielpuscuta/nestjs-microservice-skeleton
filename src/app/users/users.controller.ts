import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcResponse } from '@system/rpc/rpc.response';
import { CreateUserDto } from './dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('@users:user.create')
  async create(
    @Payload() payload: CreateUserDto
  ) {
    const user = await this.usersService.create({
      id: payload.id,
      realm: payload.realm,
      clientId: payload.clientId
    });
    
    return RpcResponse.success(
      await this.usersService.getResponseObject(user)
    );
  }
}
