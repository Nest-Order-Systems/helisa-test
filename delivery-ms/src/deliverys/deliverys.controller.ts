import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeliverysService } from './deliverys.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class DeliverysController {
  constructor(private readonly deliverysService: DeliverysService) { }

  @MessagePattern({ cmd: 'createDelivery' })
  create(@Payload() createDeliveryDto: CreateDeliveryDto) {
    console.log('📦 Payload recibido:', JSON.stringify(createDeliveryDto, null, 2));
    return this.deliverysService.create(createDeliveryDto);
  }

  @MessagePattern({ cmd: 'findAllDeliverys' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.deliverysService.findAll(paginationDto);
  }

  /*@MessagePattern('findOneDelivery')
  findOne(@Payload() id: number) {
    return this.deliverysService.findOne(id);
  }

  @MessagePattern('updateDelivery')
  update(@Payload() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliverysService.update(updateDeliveryDto.id, updateDeliveryDto);
  }

  @MessagePattern('removeDelivery')
  remove(@Payload() id: number) {
    return this.deliverysService.remove(id);
  }*/
}
