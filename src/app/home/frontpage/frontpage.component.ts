import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Iaccount} from "../../interfaces/iaccount";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Imassage} from "../../interfaces/imassage";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {



  picturePath: string = "http://91.101.23.138/codebase/assets/";

  searchForm = new FormGroup({
    search: new FormControl()
  })

  constructor(private api: ApiService, private router: Router, private auth: AuthService, private route: ActivatedRoute) {
  }
  ngOnInit() {

  }


}
