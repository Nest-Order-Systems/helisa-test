import { OrderStatus } from "@prisma/client";

export const OrderStatusList = [
    OrderStatus.PENDING,
    OrderStatus.INVENTORY_APPROVED,
    OrderStatus.INVENTORY_REJECTED,
    OrderStatus.DELIVERY_CREATED,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,

]