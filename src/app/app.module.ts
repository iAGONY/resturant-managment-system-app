import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderReportComponent } from './order-report/order-report.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RequestInterceptorInterceptor } from './interceptor/request-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateOrderComponent,
    OrderReportComponent,
    PaymentComponent,
    OrderDetailComponent,
    LoginComponent,
  ],
  imports: [  
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
