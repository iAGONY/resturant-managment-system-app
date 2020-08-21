import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'RESTURANT MANAGMENT SYSTEM';

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toasterService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }


  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value).
      subscribe( response => {
        this.showSuccess('Login Succesful', '');
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      }, errorResponse => {
          this.showError("Username/Password incorrect", '');
        });
  }

  showSuccess(message, title) {
    this.toasterService.success(message, title)
  }

  showError(message, title) {
    this.toasterService.error(message, title)
  }



}
