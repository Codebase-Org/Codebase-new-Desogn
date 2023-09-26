import {Component, OnInit} from '@angular/core';
import {Isearch} from "../../interfaces/isearch";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {

  search: Isearch = {};

  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(params);
      this.search = {
        keyword: params['keyword']
      }
    });
  }
}
