import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Iaccount} from "../interfaces/iaccount";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  setup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    firstname: new FormControl(),
    secondname: new FormControl(),
    lastname: new FormControl(),
    created_date: new FormControl()
  });

  owner: Iaccount = {};
  dateToday: string = new Date().toLocaleString();

  constructor(private api: ApiService, private router: Router) {

  }

  ngOnInit() {

  }

  createHandler(account: Iaccount) {
    this.owner = {
      username: account.username,
      password: account.password,
      email: account.email,
      firstname: account.firstname,
      secondname: account.secondname,
      lastname: account.lastname,
      role_id: 1,
      created_date: account.created_date
    }

    this.api.createAccount(this.owner).subscribe(data => {
      //console.log(data);
      this.router.navigate(['./login']);
    });
  }

}
