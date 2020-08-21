import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [

  {
    path : '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path: '', canActivate:[AuthGuard], children: [
      {
        path : 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'createOrder',
        component : CreateOrderComponent
      },
      {
        path: 'order',
        component : OrderReportComponent
      },
      {
        path: 'payment',
        component : PaymentComponent
      },
      {
        path: 'detail',
        component : OrderDetailComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
