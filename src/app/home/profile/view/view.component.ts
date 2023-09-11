import {Component, Input, OnInit} from '@angular/core';
import {Iaccount} from "../../../interfaces/iaccount";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  profile: Iaccount = {};

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('id');
    const stateDate = history.state.data;
    this.getprofile(data);
  }

  getprofile(id: any) {
    let profil: Iaccount = {
      account_id: id
    }
    this.api.getProfileData(profil).subscribe(data => {
      this.profile = data;
      //console.log(this.profile);
    });
  }
}
