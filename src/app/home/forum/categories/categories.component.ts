import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Icategory} from "../../../interfaces/icategory";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements  OnInit{

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
      //console.log(this.categories);
    });
  }

  showForum(event: any) {
    //console.log(event.getAttribute('id'));
    let category: Icategory = {
      category_id: event.getAttribute('id')
    }
    //console.log(category);
    this.router.navigate(['./home/forum', category.category_id], {state: {data: category}});
  }
}
