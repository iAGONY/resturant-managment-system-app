import { Component, OnInit } from '@angular/core';
import { OrderService } from '../create-order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {

  allOrders: any = {};

  constructor(private orderService: OrderService,
    public router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.orderService.getAll().
    subscribe(response => {
      
      this.allOrders = response;
    },
      errorResponse => {
      });
  }

  perfomPayment(order) {
    this.router.navigateByUrl('/payment',  { state: {data: order} });
  }

  viewDetail(order) {
    this.router.navigateByUrl('/detail',  { state: {data: order} });
  }



}
