import { OrderStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, Min, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";
import { OrderStatusList } from "./enum/order.enum";

export class CreateOrderDto {


    @IsEnum(OrderStatusList, {
        message: `Possible status values are ${OrderStatusList}`
    })
    status: OrderStatus = OrderStatus.PENDING;

    @IsOptional()
    @IsDateString()
    deliveryAt?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}
