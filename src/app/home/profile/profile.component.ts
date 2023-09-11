import {Component, OnInit} from '@angular/core';
import {Iaccount} from "../../interfaces/iaccount";
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Iaccount = {}

  constructor(private api: ApiService, private auth: AuthService) {
  }

  ngOnInit() {
    this.getprofile(this.auth.id)
  }

  getprofile(id: any) {
    let profil: Iaccount = {
      account_id: id
    };

    this.api.getProfileData(profil).subscribe(data => {
      this.profile = data;
      //console.log(this.profile);
    });
  }


}
