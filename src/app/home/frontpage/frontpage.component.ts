import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {Ilogin} from "../../interfaces/ilogin";
import {Imessage} from "../../interfaces/imessage";
import {Iaccount} from "../../interfaces/iaccount";
import {count} from "rxjs";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  isStatusActive: boolean = false;
  status: Imessage = {};
  profile: Iaccount = {};

  constructor(private auth: AuthService, private router: Router, private api: ApiService) {
  }

  ngOnInit() {
    if(!this.auth.authenticated) {
      this.router.navigate(['./login']);
    } else {
      this.profile = {
        account_id: this.auth.id
      }
      this.api.checkProfile(this.profile).subscribe(data => {
          this.isStatusActive = true;
          this.status = data;
          if(this.status.status != false) {
            this.isStatusActive = true;
          } else {
            this.isStatusActive = false;
          }
      });
    }
  }

  logoutHandler() {
    this.auth.logout();
  }

  closeBox() {
    this.isStatusActive = false;
  }


}
