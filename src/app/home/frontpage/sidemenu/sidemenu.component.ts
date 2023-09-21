import {Component, Input, OnInit} from '@angular/core';
import {Iaccount} from "../../../interfaces/iaccount";
import {Imassage} from "../../../interfaces/imassage";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  @Input() isProfileExists: boolean = false;

  picturePath: string = "http://91.101.23.138/codebase/assets/";

  profile: Iaccount = {};
  status: Imassage = {};
  profil: Iaccount = {};

  constructor(private api: ApiService, private router: Router, private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkProfileExists();
    this.getProfile();
  }

  getProfile() {
    let profil: Iaccount = {
      account_id: this.auth.id
    }

    this.profil = {
      account_id: this.auth.id
    }

    this.api.getProfileData(profil).subscribe(data => {
      this.profile = data;
      //console.log(this.profile);
    })
  }

  checkProfileExists() {
    this.api.checkProfile(this.auth.id).subscribe(data => {
      let message: Imassage = data;
      this.isProfileExists = true;
      this.status = data;
      //console.log(this.status);
      if(this.status.status != false) {
        this.isProfileExists = true;
      } else {
        this.isProfileExists = false;
      }
    })
  }

  createProfile(event: any) {
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }

    this.router.navigate(['home/create-profile', profil.account_id], {state: {data: profil}});
    //console.log('Account Id: ', profil.account_id);
  }

  editProfile(event:any) {
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }

    this.router.navigate(['home/edit-profile', profil.account_id], {state: {data: profil}});
  }

  viewProfile(event:any) {
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }

    this.router.navigate(['home/view-profile', profil.account_id], {state: {data: profil}});
  }
}
