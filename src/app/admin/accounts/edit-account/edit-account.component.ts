import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Irole} from "../../../interfaces/irole";
import {Iaccount} from "../../../interfaces/iaccount";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

    roles: Irole[] = [];
    trimmedRoles: Irole[] = [];
    accounts: Iaccount[] = [];
    account: Iaccount = {};
    profil: Iaccount = {};

    accountForm = new FormGroup({
        instructor_id: new FormControl(),
        role_id: new FormControl(),
        end_date: new FormControl(),
    });

  constructor(private api: ApiService, private router: Router, private auth: AuthService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.getRoles();
    this.getSpecificAccounts();
    this.route.params.subscribe(params => {
      let profil: Iaccount = {
        account_id: params['account_id']
      }
      this.profil = {
        account_id: params['account_id']
      }
      this.getAccount(profil);
    })
  }

    getRoles() {
        this.api.getSpecificRoles(this.auth.role_id).subscribe(data => {
            this.roles = data;
        });
    }

    getAccount(data: Iaccount) {
      this.api.getSingleAccount(data).subscribe(acc => {
        this.account = acc;
          console.log(this.account);
        this.accountForm.patchValue({
            instructor_id: this.account.instructor_id,
            role_id: this.account.role_id,
            end_date: this.account.end_date
        });
      });
    }

    getSpecificAccounts() {
        this.api.getSpecificRoleAccounts(this.auth.role_id).subscribe(data => {
            this.accounts = data;
            //console.log(this.accounts);
        })
    }

  editHandler(formObj: any) {
    let account: Iaccount = {
      account_id: this.profil.account_id,
      instructor_id: formObj.instructor_id,
      end_date: formObj.end_date,
      role_id: formObj.role_id
    }

    this.api.updateAccount(account).subscribe(data => {
        console.log(data);
        this.router.navigate(['admin/accounts/All']);
    });
  }

}
