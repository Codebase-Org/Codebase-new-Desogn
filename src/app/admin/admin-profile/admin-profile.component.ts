import {Component, OnInit} from '@angular/core';
import {Iaccount} from "../../interfaces/iaccount";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DateService} from "../../services/date.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements  OnInit {

  profilId: Iaccount = {};
  profil: Iaccount = {};
  profileOwner: boolean = true;
  newBirthday: string | null = "";
  picturePath: string = "http://91.101.23.138/codebase/assets/";

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private date: DateService, private auth: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let data = params['account_id'];
      this.profilId = {
        account_id: data
      }
      this.getProfileData();
      this.checkProfilOwner();
    });
  }

  getProfileData() {
    this.api.getProfileData(this.profilId).subscribe(data => {
      this.profil = data;
      this.newBirthday = this.date.rewriteDate(data.birthday);
    });
  }

  checkProfilOwner() {
    if(this.profilId.account_id == this.auth.id) {
      this.profileOwner = true;
    } else {
      this.profileOwner = false;
    }
    console.log(this.profileOwner);
  }

  editProfile(event: any) {
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }
    this.router.navigate(['admin/edit-profile', profil.account_id], {state: {data: profil}});
    //console.log('Profil Id: ', profil.account_id);
  }
}
