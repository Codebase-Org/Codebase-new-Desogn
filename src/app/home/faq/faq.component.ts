import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Ifaq} from "../../interfaces/ifaq";
import {Imessage} from "../../interfaces/imessage";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs: Ifaq[] = [];
  message: Imessage = {};
  constructor(private api: ApiService) {
  }
  ngOnInit() {
    this.getAllFaqs();
  }

  getAllFaqs() {
    this.api.getAllFaqs().subscribe(data => {
      if(data[0] !== undefined) {
        this.faqs = data;
      } else {
        console.log()
      }
    });
  }
}
