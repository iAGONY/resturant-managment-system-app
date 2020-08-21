import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  createOrderForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.createClientForm();
    
  }

  createClientForm() {
    this.createOrderForm = this.formBuilder.group({
      orderName: [''],
      items: this.formBuilder.array([])
    });
    this.addNewItems();
  }

  addNewItems() {
    const control = <FormArray>this.createOrderForm.controls['items'];
    control.push(this.addItems());
  }

  addItems() {
    return this.formBuilder.group({
      itemName: [''],
      price: [0]
    });
  }

  getControls() {
    return this.createOrderForm.get('items')['controls'];
  }

  removeItems(i: number) {
    const control = <FormArray>this.createOrderForm.controls['items'];
    control.removeAt(i);
  }

  onSubmit() {
    // console.warn(this.createOrderForm.value);
    this.orderService.create(this.createOrderForm.value).
    subscribe(response => {
      console.log("response =>> " , response)
      this.resetForm();
    },
      errorResponse => {
        console.log("errorResponse =>> " , errorResponse)
      });
  }

 

  resetForm() {
    this.createOrderForm.reset();
    // const control = <FormArray>this.createOrderForm.controls['items'];
    // control.controls = [];
  }

}
