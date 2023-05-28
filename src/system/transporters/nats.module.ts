import { Module, Global } from '@nestjs/common';
import { useNatsTransporter } from './nats.provider';
import { ClientsModule } from '@nestjs/microservices';

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
              name: "NATS",
              ...useNatsTransporter()
            }
        ])
    ],
})
export class NATSTransporterModule { }
