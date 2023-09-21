import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {Icategory} from "../../../interfaces/icategory";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories: Icategory[] = [];
  logoPath: string = "http://91.101.23.138/codebase/assets/img/logo/";
  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.api.getCategoryList().subscribe(data => {
      this.categories = data;
    })
  }
}
