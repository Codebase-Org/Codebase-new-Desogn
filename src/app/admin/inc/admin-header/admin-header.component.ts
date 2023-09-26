import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Iaccount} from "../../../interfaces/iaccount";
import {ApiService} from "../../../services/api.service";
import {Imassage} from "../../../interfaces/imassage";
import {logCumulativeDurations} from "@angular-devkit/build-angular/src/tools/esbuild/profiling";
import {Isearch} from "../../../interfaces/isearch";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Input() isProfileExists: boolean = false;

  urlPath: any = "http://91.101.23.138/codebase/assets/";
  //urlPath: any = "http://192.168.22.31/codebase/assets/img/";

  isFullscreen: boolean = false;
  isUserInfoActive: boolean = false;
  isSerchbarActive: boolean = false;

  fullname: string | undefined = "";
  email: string | undefined = "";
  onlineStatus: number | undefined = 0;
  picture: string | undefined = "";
  status: Imassage = {};
  profile: Iaccount = {};
  accountId: any = null;

  searchForm = new FormGroup({
    keyword: new FormControl()
  });



  constructor(private router: Router, private el: ElementRef, private auth: AuthService, private api: ApiService) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F11') {
      this.toggleFullscreen();
    }
  }
  ngOnInit() {
    this.getUser();
    this.profile = {
      account_id: this.auth.id
    }
    this.accountId = this.auth.id;
    this.api.checkProfile(this.profile.account_id).subscribe(data => {
      //console.log(data);
      this.isProfileExists = true;
      this.status = data;
      //console.log(this.status);
      if(this.status.status != false) {
        this.isProfileExists = true;
      } else {
        this.isProfileExists = false;
      }
      //console.log(this.isProfileExists);
    });
  }

  getUser() {
    let data: Iaccount = {
      account_id: this.auth.id
    }

this.api.getProfileData(data).subscribe(usr => {
  //console.log(usr);
  if(usr != null || usr != undefined) {
    this.fullname = usr.firstname + ' ' + usr.secondname + ' ' + usr.lastname;
    this.email = usr.email;
    this.onlineStatus = usr.onlineStatus;
    this.picture = usr.picture;

  }
})
  }

  toggleUserInfoMenu() {
    this.isUserInfoActive = !this.isUserInfoActive;
  }

  toggleFullscreen() {
    let element = this.el.nativeElement;

    if(!this.isFullscreen) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (element.exitFullscreen) {
        element.exitFullscreen();
      } else if (element.mozExitFullscreen) {
        element.mozExitFullscreen();
      } else if (element.webkitExitFullscreen) {
        element.webkitExitFullscreen();
      } else if (element.msExitFullscreen) {
        element.msExitFullscreen();
      }
    }

    this.isFullscreen = !this.isFullscreen;
  }

  createProfile() {
    this.router.navigate(['admin/add-profile']);
  }

  showProfile(event: any) {
    let profil: Iaccount = {
      account_id: event.getAttribute('id')
    }
    console.log('Profil Id: ' + profil.account_id);
    this.router.navigate(['admin/admin-profile', profil.account_id], {state: {data: profil}});
  }

  logoutHandler() {
    this.auth.logout();
  }

  showSearchbar() {
    this.isSerchbarActive = !this.isSerchbarActive;
  }

  searchHandler(searchObj: any) {
    this.isSerchbarActive = !this.isSerchbarActive;
    let search: Isearch = {
      keyword: searchObj.keyword
    };
    this.router.navigate(['admin/admin-search',search.keyword], {state: {data: search}});
  }

}
