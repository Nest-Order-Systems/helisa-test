import { Type } from "class-transformer";
import { IsArray, IsDateString, IsString, ValidateNested } from "class-validator";
import { CreateDeliveryItemDto } from "./create-delivery-items.dto";

export class CreateDeliveryDto {

    @IsString()
    orderId: string;

    @IsDateString()
    deliveryAt: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDeliveryItemDto)
    items: CreateDeliveryItemDto[];
}
