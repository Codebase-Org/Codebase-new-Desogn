import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {Iaccount} from "../../interfaces/iaccount";
import {Iposts} from "../../interfaces/iposts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  team: Iaccount[] = [];
  message: any = {};
  studentCount: any = {};
  articleCount: any = {};
  forumCount: any = {};
  constructor(private api: ApiService, private auth: AuthService) {
  }

  ngOnInit() {
    this.getTeam();
    this.studentCounter();
    this.countForum();
    this.countArticle();
    //console.log(this.auth.role_id);
  }

  getTeam() {
    let inst: Iaccount = {
      role_id: "4",
      instructor_id: this.auth.id
    }

    console.log(inst);

    this.api.getTeam(inst).subscribe(data => {
        if(data[0] !== undefined) {
          this.team = data;
          console.log(this.team);
        } else {
          this.message = data;
        }
      });
  }

  studentCounter() {
    let stu:Iaccount = {
      role_id: 4
    }

    this.api.studentCounter(stu).subscribe(data => {
      this.studentCount = data;
    })
  }

  countForum() {
    let post: Iposts = {
      post_type_id: 1
    }

    this.api.counter(post).subscribe(data => {
      this.forumCount = data;
    })
  }

  countArticle() {
    let post: Iposts = {
      post_type_id: 2
    }

    this.api.counter(post).subscribe(data => {
      this.articleCount = data;
    })
  }

}
