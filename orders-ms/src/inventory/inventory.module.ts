import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [],
  providers: [],
  imports:[NatsModule],
  exports: [ClientsModule],
})

export class InventoryModule {}
