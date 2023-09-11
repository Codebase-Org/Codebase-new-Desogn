import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {Iaccount} from "../../../interfaces/iaccount";
import {Iloginhistory} from "../../../interfaces/iloginhistory";
import {AuthService} from "../../../services/auth.service";
import {IsActiveService} from "../../../services/is-ative.service";
import {TimeService} from "../../../services/time.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  accounts: Iaccount[] = [];
  totalAccounts: number = 0;
  histories: Iloginhistory[] = [];
  history: Iloginhistory = {};
  totalTime: number = 0;
  onlinetime: Iloginhistory = {};

  constructor(private api: ApiService, private router: Router, private auth: AuthService, private ts: TimeService) {
  }

  ngOnInit() {
    this.countAccounts();
    this.countTotalOnlineTime();
  }

  countAccounts() {
    this.api.countAccounts().subscribe(ac => {
      this.totalAccounts = ac;
    });
  }

  countTotalOnlineTime() {
    this.history = {
      account_id: this.auth.id
    }
    this.api.getOnlineTime(this.history).subscribe(data => {
      this.histories = data;
      let times = [];
      for(let i = 0; i < this.histories.length; i++) {

        times.push(this.ts.toSeconds(this.histories[i].online_time));
      }
      //times.forEach(a=> this.totalTime += a);
      //console.log(times);

      this.totalTime = times.reduce(function(a, b){return a + b; });
      //console.log(this.totalTime);

      let time = this.ts.calculateSumOfElements(this.totalTime)

      this.onlinetime = {
        weeks: time.weeks,
        days: time.days,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds
      };

      //console.log(this.onlinetime);
    });
  }
}
