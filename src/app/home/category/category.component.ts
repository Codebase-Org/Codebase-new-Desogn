import {Component, OnInit} from '@angular/core';
import {Icategory} from "../../interfaces/icategory";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Itypes} from "../../interfaces/itypes";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //picturePath: string = "http://192.168.22.31/codebase/assets/img/logo/";
  picturePath: string = "http://91.101.23.138/codebase/assets/img/logo/";

  categories: Icategory[] = [];
  category: Icategory = {};
  types: Itypes = {};
  type: Itypes = {};

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let data = params['type_id'];
      this.category = {
        post_type_id: data
      }
      this.types = {
        post_type_id: data
      }
      //console.log('Type id: ', data);
      this.getCategories(this.category);
      this.getTypeName(this.types);
    });
    const stateDate = history.state.data;
  }

  getCategories(data: Icategory) {
    this.api.getCategories(data.post_type_id).subscribe(data => {
      this.categories = data;
      //console.log(this.categories);
    });
  }

  getTypeName(data: Itypes) {
    this.api.getSingleType(data).subscribe(data => {
      this.type = data;
      //console.log(this.type);
    })
  }

  showForum(event: any) {
    let category: Icategory = {
      category_id: event.getAttribute('id')
    }

    this.router.navigate(['./home/forum', category.category_id], {state: {data: category}});
  }
}
