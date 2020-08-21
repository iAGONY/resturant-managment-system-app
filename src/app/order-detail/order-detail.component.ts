import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: any;
  totalPrice: number;

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.order = this.router.getCurrentNavigation().extras.state.data;
    } else {
      this.router.navigateByUrl('/order');
    }

  }

  ngOnInit(): void {
    this.getSum();
  }

  getSum()  {
    let sum = 0;
    for(let i = 0; i < this.order.items.length; i++) {
      sum += this.order.items[i].price;
    }
    this.totalPrice = sum;
  }

}
