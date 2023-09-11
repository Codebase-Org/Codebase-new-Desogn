import {Component, OnInit} from '@angular/core';
import {Icategory} from "../../../interfaces/icategory";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Icategory[] = [];


  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllCategories()
  }

  getAllCategories() {
    this.api.getCategoryList().subscribe(data => {
      this.categories = data;
    })
  }

  editCategory(event: any) {
    //console.log(event);
    let category: Icategory = {
      category_id: event.getAttribute('id')
    };
    this.router.navigate(['./home/edit_category', category.category_id], {state: {data: category}});
  }

  createCategory() {
    this.router.navigate(['./home/create_category']);
  }
}
