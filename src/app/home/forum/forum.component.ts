import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {Iposts} from "../../interfaces/iposts";
import {Icategory} from "../../interfaces/icategory";
import {FormControl, FormGroup} from "@angular/forms";
import {Iaccount} from "../../interfaces/iaccount";
import {AuthService} from "../../services/auth.service";
import {IpostTypes} from "../../interfaces/ipost-types";
import {Imessage} from "../../interfaces/imessage";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  category: Icategory = {};
  categories: Icategory[] = [];
  postTypes: IpostTypes[] = [];
  posts: Iposts[] = [];
  showModal: boolean = false;
  account: Iaccount = {};
  message: Imessage[] = [];

  postForm = new FormGroup({
    post_headline: new FormControl(),
    post_type_id: new FormControl(),
    category_id: new FormControl(),
    post_content: new FormControl()
      });

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

  toggleModal() {
    this.showModal = !this.showModal;
    //console.log(this.showModal);
    this.api.getCategoryList().subscribe(data=> {
      this.categories = data;
      //console.log(this.categories);
    });
    this.api.getPostTypes().subscribe(typesData=> {
      this.postTypes = typesData;
      //console.log(this.postTypes);
    });
  }

  createPost(formObj: any) {
    let post: Iposts = {
      account_id: this.auth.id,
      post_headline: formObj.post_headline,
      post_type_id: formObj.post_type_id,
      category_id: formObj.category_id,
      post_content: formObj.post_content
    }
    //console.log(post);
    this.api.createPost(post).subscribe( data => {
      //console.log(data);
      this.showModal = !this.showModal;
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
