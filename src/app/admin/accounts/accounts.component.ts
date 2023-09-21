import {Component, OnInit} from '@angular/core';
import {Iaccount} from "../../interfaces/iaccount";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter} from "rxjs";
import {Irole} from "../../interfaces/irole";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Iaccount[] = [];
  accountsFiltered: Iaccount[] = [];
  roles: Irole[] = [];
  default: Irole = {role_name: 'All'}
  isDropdownActive: boolean = false;
  filter: any;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    //this.getAccounts();
    this.getRoles();
    this.route.params.subscribe(params => {
      let role = params['role'];
      //console.log(role);
      this.filterAccounts(role);
    })
  }

  getRoles() {
    this.api.getRoles().subscribe(data => {
      this.roles = data;
      //console.log(this.roles);
    })
  }

  showDropdown() {
    this.isDropdownActive = !this.isDropdownActive;
  }

  getAccounts() {
    this.api.getAccounts().subscribe(data => {
      this.accounts = data;
      this.accountsFiltered = data;
      //console.log(this.accounts);
    })
  };

  filterAccounts(event: any) {
    if(event.id === undefined) {
      this.getAccounts();
    } else {
      let filterArg: Irole = {
        role_name: event.id
      }
      this.filter = filterArg.role_name;
      if(event.id === 'Owner') {
        let acc = this.accounts.filter(account => account.role === filterArg.role_name);
        this.accountsFiltered = acc;
        //console.log(acc);
      } else if (event.id === 'Admin') {
        let acc = this.accounts.filter(account => account.role === filterArg.role_name);
        this.accountsFiltered = acc;
        //console.log(acc);
      } else if (event.id === 'Instructor') {
        let acc = this.accounts.filter(account => account.role === filterArg.role_name);
        this.accountsFiltered = acc;
        //console.log(acc);
      } else if (event.id === 'Student') {
        let acc = this.accounts.filter(account => account.role === filterArg.role_name);
        this.accountsFiltered = acc;
        //console.log(acc);
      } else if (event.id === 'All') {
        this.getAccounts();
      }
    }
  }

  newAccount() {
    this.router.navigate(['admin/new-account'])
  }

  viewAccount(event: any) {
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }

    this.router.navigate(['admin/admin-profile', profil.account_id], {state: {data: profil}});
  }

  editAccount(event: any) {
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }

    this.router.navigate(['admin/edit-account', profil.account_id], {state: {data: profil}});
  }

  deleteAccount(event: any) {
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }

    let accountIndex = -1;

    for (let i = 0; i < this.accounts.length; i++) {
      if(this.accounts[i].account_id === profil.account_id) {
        accountIndex = i;
      }
    }

    this.api.deleteAccount(profil).subscribe(data => {
      this.accounts.splice(accountIndex, 1);
      console.log(data);
    });
  }

}
