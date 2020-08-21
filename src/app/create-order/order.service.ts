import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CreateOrderDto } from 'src/app/create-order/createOrderDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(createOrder: CreateOrderDto) {
    return this.http.post<any>(environment.ENDPOINT + "order/create" , createOrder);
  }

  getAll() {
    return this.http.get(environment.ENDPOINT + "order/getAll");
  }

  performPayment(id: number) {
    return this.http.post<any>(environment.ENDPOINT + "/perfomPayment/" + id, {});
  }
}
