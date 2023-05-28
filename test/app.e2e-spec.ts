import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { ClientProxy, MicroserviceOptions} from '@nestjs/microservices';
import { AppModule } from '@app/app.module';
import { NATSTransporterModule } from '@system/transporters/nats.module';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { RpcResponseInterface } from '@system/rpc/rpc.response';

describe('App (e2e)', () => {
  let app: INestMicroservice;
  let client: ClientProxy;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        NATSTransporterModule
      ]
    }).compile();

    app = module.createNestMicroservice<MicroserviceOptions>({});

    client = await app.get("NATS");

    await app.init();
  });

  afterAll(async () => {
    await client.close();
    await app.close();
  });

  it('should have NATS client defined', async () => {
    expect(client).toBeDefined();
  })

  it('should NOT create a new user when no data is specified', async () => {
    let response: RpcResponseInterface;

    await lastValueFrom(
      client.send("@users:user.create", {})
    )
    .then((res: RpcResponseInterface) => {
      response = res;
    })
    .catch((catched: RpcResponseInterface) => {
      response = catched;
    })

    expect(response.statusCode).toEqual(401);
    expect(response).toStrictEqual({
      statusCode: 401,
      status: 'error',
      data: null,
      errors: [
        {
          property: 'id',
          code: 'id.isNotEmpty',
          message: 'id should not be empty'
        },
        {
          property: 'realm',
          code: 'realm.isNotEmpty',
          message: 'realm should not be empty'
        },
        {
          property: 'clientId',
          code: 'clientId.isNotEmpty',
          message: 'clientId should not be empty'
        }
      ]
    })
  });
});
