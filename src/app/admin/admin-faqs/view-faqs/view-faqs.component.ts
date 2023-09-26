import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {Ifaq} from "../../../interfaces/ifaq";

@Component({
  selector: 'app-view-faqs',
  templateUrl: './view-faqs.component.html',
  styleUrls: ['./view-faqs.component.css']
})
export class ViewFaqsComponent implements OnInit {

  faq: Ifaq = {};
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      let f: Ifaq = {
        faq_id: params['faq_id']
      }

      this.getFaq(f);
    })
  }

  getFaq(faq: Ifaq) {
    this.api.getSingleFaq(faq).subscribe(data => {
      this.faq = data;
      console.log(this.faq);
    })
  }
}
