import { Module } from '@nestjs/common';
import { InventorysController } from './inventorys.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [InventorysController],
  providers: [],
  imports: [NatsModule]
})
export class InventorysModule { }
