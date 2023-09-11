import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {Iaccount} from "../../interfaces/iaccount";
import {Imessage} from "../../interfaces/imessage";
import {Itypes} from "../../interfaces/itypes";
import {IpostTypes} from "../../interfaces/ipost-types";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isStatusActive: boolean = false;

  fullname: string | null = "";
  role: string | null = "";
  isToggler: boolean = false;
  profile: Iaccount = {};
  status: Imessage = {};
  types: IpostTypes[] = [];

  constructor(private router: Router, private api: ApiService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.getName();
    this.getTypes();
    this.role = this.auth.role;
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

  getName() :void {
    let data: Iaccount = {
      account_id: this.auth.id
    }

    //console.log(data);

    this.api.getProfileData(data).subscribe(a => {
      //console.log(a);
      this.fullname = a.firstname + ' ' + a.secondname + ' ' + a.lastname;
    });
  }

  getTypes() {
    this.api.getPostTypes().subscribe(data => {
      this.types = data;
      //console.log(this.types);
    })
  }

  logoutHandler(): void {
    this.auth.logout();
  }

  openForum(event: any) {
    let type: IpostTypes = {
      post_type_id: event.getAttribute('id')
    }
    //console.log('Type ID: ' +type.post_type_id);
    if(event.getAttribute('id') == 1) {
      //console.log('Forum Categories');
      this.router.navigate(['./home/category', type.post_type_id], {state: {data: type}});
    } else if(event.getAttribute('id') == 2) {
      //console.log('Article Categories');
      this.router.navigate(['./home/category', type.post_type_id], {state: {data: type}});
    } else if(event.getAttribute('id') == 3) {
      this.router.navigate(['./home/category', type.post_type_id], {state: {data: type}});
      //console.log('Personal Notes');
      //console.log('Nothing here yet.');
    }
  }

  toggleSidebar() {
    this.isToggler = !this.isToggler;
    //console.log(this.isToggler);
  }
}
