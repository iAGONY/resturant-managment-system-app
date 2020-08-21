export class CreateOrderDto {
    orderName: string;
    itemName: Array<OrderItemDto> = [];
}

export class OrderItemDto {
    itemName: string;
    price: number;
}