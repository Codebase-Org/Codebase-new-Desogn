import {Component, OnInit} from '@angular/core';
import {Irole} from "../../../interfaces/irole";
import {Iaccount} from "../../../interfaces/iaccount";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  roles: Irole[] = [];
  trimmedRoles: Irole[] = [];
  accounts: Iaccount[] = [];
  account: Iaccount = {};

  accountForm = new FormGroup({
    email: new FormControl(),
    pass1: new FormControl(),
    pass2: new FormControl(),
    username: new FormControl(),
    instructor_id: new FormControl(),
    role_id: new FormControl()
  });

  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.getRoles();
    this.getSpecificAccounts();
  }

  getRoles() {
    this.api.getSpecificRoles(this.auth.role_id).subscribe(data => {
      this.roles = data;
    });
  }

  getSpecificAccounts() {
    this.api.getSpecificRoleAccounts(this.auth.role_id).subscribe(data => {
      this.accounts = data;
      //console.log(this.accounts);
    })
  }

  createHandler(formObj: any) {
    if(formObj.pass1 != formObj.pass2) {

    } else {
      let account: Iaccount = {
        email: formObj.email,
        password: formObj.pass1,
        username: formObj.username,
        instructor_id: formObj.instructor_id,
        role_id: formObj.role_id
      }

      this.api.createAccount(account).subscribe(data => {
        this.router.navigate(['admin/accounts/All']);
      });
    }

  }
}
