import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {IsActiveService} from "../services/is-ative.service";
import {ApiService} from "../services/api.service";
import {Iaccount} from "../interfaces/iaccount";
import {Imessage} from "../interfaces/imessage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  profil: Iaccount = {};

  constructor(private auth: AuthService, private router: Router, private isActiveService: IsActiveService, private api: ApiService) {
  }
  ngOnInit() {
    if(!this.auth.authenticated) {
      this.router.navigate(['./login']);
    }
  }

}
