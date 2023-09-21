import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {AuthService} from "../../../services/auth.service";
import {Itypes} from "../../../interfaces/itypes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  urlPath: any = "http://localhost/codebase/assets/img/";
  //urlPath: any = "http://192.168.22.31/codebase/assets/img/";

  types: Itypes[] = [];

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.getTypes()
  }

  logoutHandler() {
    this.auth.logout();
  }

  getTypes() {
    this.api.getPostTypes().subscribe(data => {
      this.types = data;
    })
  }

  openForum(event: any) {
    let type: Itypes = {
      post_type_id: event.getAttribute('id')
    }
    //console.log('Type ID: ' +type.post_type_id);
    if(event.getAttribute('id') == 1) {
      //console.log('Forum Categories');
      this.router.navigate(['./home/category', type.post_type_id], {state: {data: type}});
    } else if(event.getAttribute('id') == 2) {
      //console.log('Article Categories');
      this.router.navigate(['./home/category', type.post_type_id], {state: {data: type}});
    } else if(event.getAttribute('id') == 3) {
      this.router.navigate(['./home/category', type.post_type_id], {state: {data: type}});
      //console.log('Personal Notes');
      //console.log('Nothing here yet.');
    }
  }
}
