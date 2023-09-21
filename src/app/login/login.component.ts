import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Ilogin} from "../interfaces/ilogin";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  urlPath: any = "http://localhost/codebase/assets/img/";
  //urlPath: any = "http://192.168.22.31/codebase/assets/img/";

  login = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  ownerStatus: boolean = false;

  constructor(private router: Router, private auth: AuthService, private api: ApiService) {
    this.auth.OnLoginSuccessful.subscribe( next => {
      //console.log(this.auth.role);
      if(this.auth.role != 'Student') {
        //console.log('Admin, Instructor or Owner')
        if(this.auth.authenticated) router.navigate(['admin/dashboard']);
      } else {
        //console.log('Student');
        if(this.auth.authenticated) router.navigate(['home/frontpage']);
      }
    });
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
