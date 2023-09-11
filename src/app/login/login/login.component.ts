import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ApiService} from "../../services/api.service";
import {Ilogin} from "../../interfaces/ilogin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    rememeber: new FormControl()
  });

  ownerStatus: boolean = false;

  constructor(private router: Router, private auth: AuthService, private api: ApiService) {
    this.auth.OnLoginSuccessful.subscribe(next => {
      if(this.auth.authenticated) router.navigate(['home/frontpage']);
    })
  }

  ngOnInit() {
    this.checkOwner();


  }

  loginHandler(loginObj: Ilogin) {
    this.auth.login(loginObj);
  }

  checkOwner(): void {
    this.api.checkOwner().subscribe(s => {
      //console.log(s);
      if(!s) {
        //console.log('Sending user to setup page');
        this.router.navigate(['./setup']);
      }
    });
  }
}
