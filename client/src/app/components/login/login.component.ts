import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    './../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]
})
export class LoginComponent implements OnInit {
  logged = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  async onSubmit() {
    await this.loginService.execute(this.f.email.value, this.f.password.value).toPromise().then(
      (result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('kid', result.kid);
        this.logged = true;
      },
      error => {
        console.log(`Error: ${error}`);
      }
    );
  }

}
