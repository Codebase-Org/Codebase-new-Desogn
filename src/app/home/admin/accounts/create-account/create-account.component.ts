import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {Irole} from "../../../../interfaces/irole";
import {Iaccount} from "../../../../interfaces/iaccount";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  accountForm = new FormGroup({
    email: new FormControl(),
    pass: new FormControl(),
    pass1: new FormControl(),
    username: new FormControl(),
    role_id: new FormControl()
  });

  roles: Irole[] = [];

  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.api.getAllRoles().subscribe(data => {
      this.roles = data;
      //console.log(this.roles);
    })
  }

  createHandler(formObj: any) {
    if(formObj.pass != formObj.pass1) {
      //console.log('Password does not match');
    } else {
      let account : Iaccount = {
        username: formObj.username,
        email: formObj.email,
        password: formObj.pass,
        role_id: formObj.role_id
      };
      //console.log(account);
      this.api.createAccount(account).subscribe(data => {
        //console.log(data);
        this.router.navigate(['./home/accounts'])
      });

    }
  }
}
