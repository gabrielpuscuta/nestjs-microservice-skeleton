import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@db/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { User } from '@db/models';
import { RpcResponseInterface } from '@system/rpc/rpc.response';

describe('UsersController', () => {
  let controller: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(done => {
    done();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create and remove one user', async () => {
    //create
    const created: RpcResponseInterface = await controller.create({
      id: uuidv4(),
      clientId: uuidv4(),
      realm: uuidv4()
    });
    const exp = expect(created)

    expect(exp && typeof exp === 'object').toBe(true);
    exp.toHaveProperty("data");
    exp.toHaveProperty("status","success");
    exp.toHaveProperty("statusCode",200);
    exp.toHaveProperty("errors",[]);

    expect(moment(created.data.createdAt).isValid()).toBe(true);

    //remove user
    expect(
      await User.destroy({where: {id: created.data.id}})
    ).toBeTruthy();
    
  })
});
