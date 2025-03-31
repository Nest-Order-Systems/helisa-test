import { OrderStatus } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class ChangeOrderStatusDto{
    @IsString()
    orderId: string;

    @IsEnum(OrderStatus)
    newStatus: OrderStatus
}