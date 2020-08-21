import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  createOrderForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService,
    private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.createClientForm();
    
  }

  createClientForm() {
    this.createOrderForm = this.formBuilder.group({
      orderName: ['',Validators.required],
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
      itemName: ['',Validators.required],
      price: [0,[Validators.required, Validators.pattern('[0-9]{1,9}')]]
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
    this.orderService.create(this.createOrderForm.value).
    subscribe(response => {
      this.resetForm();
      this.toasterService.success("Successfuly created", '');
    },
      errorResponse => {
        this.toasterService.error("Failed to create Order", '');
      });
  }

 

  resetForm() {
    this.createOrderForm.reset();
    // const control = <FormArray>this.createOrderForm.controls['items'];
    // control.controls = [];
  }

}
