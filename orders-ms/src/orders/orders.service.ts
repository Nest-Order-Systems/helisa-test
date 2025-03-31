import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus, PrismaClient } from '@prisma/client';
import { DELIVERY_SERVICE, INVENTORY_SERVICE, NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { OrderPaginationDto } from './dto/order-pagination.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    
  ) {
    super();
  }

  private readonly logger = new Logger('OrdersService')


  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto

    let totalAmount = 0;
    let totalItems = 0;

    const updatedItems = []

    for (const item of items) {
      const product = await firstValueFrom(
        this.client.send(
          { cmd: 'find_one_inventory' },
          { id: +item.productId }
        ).pipe(
          catchError(err => { throw new RpcException(err) })
        ))

      if (!product) {
        throw new RpcException({
          message: `Product with id #${item.productId} not found`,
          status: HttpStatus.BAD_REQUEST
        });
      }

      const price = product.price;
      const quantity = item.quantity;

      if (item.quantity > product.quantity) {
        throw new RpcException({
          message: `Product with id #${item.productId} exceeds the units in stock`,
          status: HttpStatus.BAD_REQUEST
        });
      }

      const subtotal = price * quantity

      totalAmount += subtotal;
      totalItems += quantity;

      updatedItems.push({
        productId: item.productId,
        productName: product.name,
        quantity,
        price,
        subtotal,
      });
    }


    const order = await this.order.create({
      data: {
        totalAmount,
        totalItems,
        status: 'PENDING',
        items: {
          createMany: {
            data: updatedItems,
          },
        },
      },
      include: {
        items: true,
      },
    });

    const updatedOrder = await this.order.update({
      where: { id: order.id },
      data: { status: 'INVENTORY_APPROVED', deliveryAt: new Date() },
      include: { items: true }
    });

    const deliveryResult = await firstValueFrom(
      this.client.send(
        { cmd: 'createDelivery' },
        {
          orderId: updatedOrder.id,
          items: updatedOrder.items.map(item => ({
            productId: Number(item.productId),
            productName: item.productName,
            quantity: item.quantity,
          })),
          deliveryAt: new Date().toISOString(),
        }
      ).pipe(
        catchError(err => {
          throw new RpcException({
            message: 'Failed to create delivery',
            status: HttpStatus.BAD_REQUEST
          });
        })
      )
    );

    return this.order.update({
      where: { id: updatedOrder.id },
      data: { status: 'DELIVERY_CREATED' },
      include: { items: true },
    });
  };

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const totalPages = await this.order.count({
      where: {
        status: orderPaginationDto.status,
      },
    });

    const currentPage = orderPaginationDto.page;
    const perPage = orderPaginationDto.limit;

    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status,
        },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async changeStatus(data: { orderId: string; newStatus: string }) {
    const existing = await this.order.findUnique({
      where: { id: data.orderId },
    });

    if (!existing) {
      throw new RpcException({
        message: `Order with id ${data.orderId} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return this.order.update({
      where: { id: data.orderId },
      data: { status: data.newStatus as OrderStatus },
      include: { items: true },
    });
  }
}
