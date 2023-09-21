import {Component, OnInit} from '@angular/core';
import {Icategory} from "../../interfaces/icategory";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Iaccount} from "../../interfaces/iaccount";
import {Iposts} from "../../interfaces/iposts";
import {Imassage} from "../../interfaces/imassage";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  category: Icategory = {};
  account: Iaccount = {};
  posts: Iposts[] = [];
  message: Imassage[] = [];
  constructor(private api: ApiService, private route: ActivatedRoute, private auth: AuthService) {

  }

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('id');
    const stateDate = history.state.data;
    //console.log(data);
    this.category = {
      category_id: data
    }
    this.getCategoryName(data);
    this.getPosts(data);
    //console.log('Category ID: ' + this.category.category_id);
    this.account = {
      account_id: this.auth.id
    }
  }

  getCategoryName(id: any) {
    let cat: Icategory = {
      category_id: id
    }

    //console.log('Category: ' + cat.category_id);

    this.api.getSingleCategory(cat).subscribe(data => {
      //console.log(data)
      this.category = data;
    });
  }

  getPosts(id:any) {
    let post: Iposts = {
      'category_id': id
    }

    this.api.getForumPosts(post).subscribe(data => {
      if(data[0] !== undefined) {
        this.posts = data;
        //console.log(this.posts)
      } else {
        this.message = data;
        //console.log(this.message);
      }
      //
    });
  }
}
