import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {IsActiveService} from "../services/is-active.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private isActiveService: IsActiveService, private api:ApiService) {
  }
  ngOnInit() {
    if(!this.auth.authenticated) {
      this.router.navigate(['./login']);
    }
  }
}
