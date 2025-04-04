import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
    controllers: [],
    providers: [],
    imports: [NatsModule],
    exports: [ClientsModule],
})

export class DeliveryModule { }