import {Component, OnInit} from '@angular/core';
import {Iposts} from "../../../interfaces/iposts";
import {Icategory} from "../../../interfaces/icategory";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {IpostTypes} from "../../../interfaces/ipost-types";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  categories: Icategory[] = [];
  category: Icategory = {}
  types: IpostTypes = {};
  type: IpostTypes = {};
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(params  => {
      let data = params['type_id'];
      this.category = {
        post_type_id: data
      }
      this.types = {
        post_type_id: data
      }
      this.getCategories(this.category);
      this.getTypeName(this.types)
    })
    const stateDate = history.state.data;
    //console.log(this.category);

  }

  getCategories(data: Icategory) {
    this.api.getCategories(data.post_type_id).subscribe(data=>{
      this.categories = data;
      //console.log(this.categories);
    });
  }

  getTypeName(data: IpostTypes) {
    this.api.getSingleType(data).subscribe( data => {
      //console.log(data);
      this.type = data;
      //console.log(this.type);
    })
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
