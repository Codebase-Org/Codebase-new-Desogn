import {Component, OnInit} from '@angular/core';
import {Iloginhistory} from "../../../interfaces/iloginhistory";
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-loginhistory',
  templateUrl: './loginhistory.component.html',
  styleUrls: ['./loginhistory.component.css']
})
export class LoginhistoryComponent implements OnInit{

  histories: Iloginhistory[] = [];
  history: Iloginhistory = {};
  startPage: number = 1;

  constructor(private auth: AuthService, private api: ApiService) {
  }
  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.history = {
      account_id: this.auth.id,
      page: this.startPage
    };

    //console.log(this.history);

    this.api.getLoginHistory(this.history).subscribe(data => {
      //console.log(data);
      this.histories = data;
    });
  }

}
