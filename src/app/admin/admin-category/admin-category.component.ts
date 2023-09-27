import {Component, OnInit} from '@angular/core';
import {Icategory} from "../../interfaces/icategory";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

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
    this.router.navigate(['admin/admin-edit-category', category.category_id], {state: {data: category}});
  }

}
