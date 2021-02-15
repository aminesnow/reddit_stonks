import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loginErr: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });

  }

  get f() { return this.loginForm.controls; }


  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }    

    this.usersService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        async data => {
          if (data && data["token"]) {
            this.usersService.storeToken(data["token"]);
            this.router.navigate(['/']);
          }
          else {
            this.loginErr = true;
          }
        },
        err => {
          this.loginErr = true;
          console.error('error login ', err.error.error);
        }
      );
  }

}
