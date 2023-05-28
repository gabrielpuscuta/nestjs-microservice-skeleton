import { NatsOptions, Transport } from '@nestjs/microservices';
export const useNatsTransporter = (): NatsOptions => {
  return {
    transport: Transport.NATS,
    options: {
      servers: [
        process.env.NATS_HOST
      ],
      queue: process.env.NATS_QUEUE_GROUP
    },
  }
}