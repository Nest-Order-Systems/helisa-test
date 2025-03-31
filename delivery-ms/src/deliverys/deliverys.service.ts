import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class DeliverysService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('InventoryService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected')
  }

  create(createDeliveryDto: CreateDeliveryDto) {
    const { orderId, deliveryAt, items } = createDeliveryDto;

    console.log('📦 Payload recibido en delivery service:', createDeliveryDto);

    return this.delivery.create({
      data: {
        orderId,
        deliveryAt: new Date(deliveryAt),
        status: 'PENDING',
        items: {
          createMany: {
            data: items.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              quantity: item.quantity,
            })),
          },
        },
      },
      include: {
        items: true,
      },
    });

  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPage = await this.delivery.count()
    const lastPage = Math.ceil(totalPage / limit);


    return {
      data: await this.delivery.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalPage,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  /*findOne(id: number) {
    return `This action returns a #${id} delivery`;
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }*/
}
