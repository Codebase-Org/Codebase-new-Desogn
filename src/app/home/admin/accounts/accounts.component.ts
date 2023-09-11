import {Component, OnInit} from '@angular/core';
import {Iaccount} from "../../../interfaces/iaccount";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  profiles: Iaccount[] = [];
  profile: Iaccount = {};

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.getProfiles();
  }

  getProfiles() {
    this.api.getAllProfiles().subscribe(data => {
      /*for(let i = 0; i < data.length; i++) {
        let account: Iaccount = {
          account_id: data[i].account_id,
          username: data[i].username,
          email: data[i].email,
          role: data[i].role,
          status: data[i].profile.status,
          profile_id: data[i].profile.profile_id
        }
        console.log(account);
      }*/
      this.profiles = data;
      //console.log(this.profiles);
    });
  }

  newAccount() {
    this.router.navigate(['./home/createAccount']);
  }

  viewProfile(event: any) {
    //console.log(event.getAttribute('id'));
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }

    this.router.navigate(['./home/viewprofile', profil.account_id], {state: {data: profil}});
  }

  deleteAccount(event: any) {
    //console.log(event)
    //console.log(event.getAttribute('id'));
    let account: Iaccount = {
      account_id: event.getAttribute('id')
    };

    let accountIndex = -1;

    for (let i = 0; i < this.profiles.length; i++) {
      if(this.profiles[i].account_id === account.account_id) {
        accountIndex = i;
      }
    }

    this.api.deleteAccount(account).subscribe(data => {
      this.profiles.splice(accountIndex, 1);
      console.log(data);
    });

  }

}
