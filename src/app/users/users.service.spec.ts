import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { User } from '@db/models';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@db/database.module';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        DatabaseModule
      ],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create and remove one user', async () => {
    //create user
    const created = await usersService.findOrCreate({
      id: uuidv4(),
      clientId: uuidv4(),
      realm: uuidv4()
    });

    //test
    const exp = expect(created);
    expect(exp && typeof exp === 'object').toBe(true);
    exp.toHaveProperty("id", created.get("id"));
    exp.toHaveProperty("realm", created.get("realm"));
    exp.toHaveProperty("clientId", created.get("clientId"));
    exp.toHaveProperty("createdAt");
    exp.toHaveProperty("updatedAt");

    expect(moment(created.get("createdAt")).isValid()).toBe(true);

    //remove user
    
    expect(
      await User.destroy({where: {id: created.get("id")}})
    ).toBeTruthy();
  });
});
