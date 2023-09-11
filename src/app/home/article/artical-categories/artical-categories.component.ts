import {Component, OnInit} from '@angular/core';
import {Icategory} from "../../../interfaces/icategory";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-artical-categories',
  templateUrl: './artical-categories.component.html',
  styleUrls: ['./artical-categories.component.css']
})
export class ArticalCategoriesComponent implements OnInit{

  categories: Icategory[] = [];
  category: Icategory = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {

  }

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('type_id');
    const stateDate = history.state.data;
    this.category = {
      post_type_id: data
    }
    this.getCategories(this.category);
    console.log(this.category);
  }

  getCategories(data: Icategory) {
    this.api.getCategories(data.post_type_id).subscribe(data=>{
      this.categories = data;
      console.log(this.categories);
    });
  }
}
