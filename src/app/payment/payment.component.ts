import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { OrderService } from '../create-order/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  order: any;
  items: any;
  totalPrice: number;
  constructor(private orderService: OrderService,
    public activatedRoute: ActivatedRoute,
    private router: Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.order = this.router.getCurrentNavigation().extras.state.data;
      this.items = this.order.items;
      } else {
        this.router.navigateByUrl('/order');
      }
   }

  ngOnInit(): void {
    this.getSum();
  }

  getSum()  {
    let sum = 0;
    for(let i = 0; i < this.items.length; i++) {
      sum += this.items[i].price;
    }
    this.totalPrice = sum;
  }

  perfomPayment() {
    this.orderService.performPayment(this.order.id).
    subscribe(response => {
      console.log("response =>> " , response)
      this.router.navigateByUrl('/order');
    },
      errorResponse => {
        console.log("errorResponse =>> " , errorResponse)
      });
  }

}
