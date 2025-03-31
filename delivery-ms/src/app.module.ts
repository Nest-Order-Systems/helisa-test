import { Module } from '@nestjs/common';
import { DeliverysModule } from './deliverys/deliverys.module';


@Module({
  imports: [DeliverysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
