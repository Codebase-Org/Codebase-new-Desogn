import {Component, OnInit} from '@angular/core';
import {profileSync} from "@angular-devkit/build-angular/src/builders/browser-esbuild/profiling";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {Iaccount} from "../../../interfaces/iaccount";

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.css']
})
export class CreateprofileComponent implements OnInit {

  account_id:any = 0;

    profile = new FormGroup({
      account_id: new FormControl(),
      firstname: new FormControl(),
      secondname: new FormControl(),
      lastname: new FormControl(),
      worktitle: new FormControl(),
      information: new FormControl()
    });

  constructor(private auth: AuthService, private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.account_id = this.auth.id;
  }

  createHandler(profile: Iaccount) {
    let profil: Iaccount = {
      account_id: this.auth.id,
      firstname: profile.firstname,
      secondname: profile.secondname,
      lastname: profile.lastname,
      worktitle: profile.worktitle,
      information: profile.information
    }

    console.log(profil);

    this.api.createProfile(profil).subscribe(data => {
      console.log(data);
    });
  }
}
