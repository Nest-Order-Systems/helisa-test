import { IsInt, IsString, Min } from "class-validator";

export class CreateDeliveryItemDto {
  @IsInt()
  productId: number;

  @IsString()
  productName: string;

  @IsInt()
  @Min(1)
  quantity: number;
}