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

  it('should pass because nothing is defined', async () => {
    expect(client).toBeDefined();
  })
});
