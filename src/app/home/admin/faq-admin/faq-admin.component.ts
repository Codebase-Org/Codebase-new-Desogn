import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {Ifaq} from "../../../interfaces/ifaq";

@Component({
  selector: 'app-faq-admin',
  templateUrl: './faq-admin.component.html',
  styleUrls: ['./faq-admin.component.css']
})
export class FaqAdminComponent implements OnInit {

  faqs: Ifaq[] = [];
  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit() {
    this.getAllFaqs();
  }

  addFaq() {
    this.router.navigate(['./home/create_faq']);
  }

  getAllFaqs() {
    this.api.getAllFaqs().subscribe(data => {
      if(data[0] !== undefined) {
        this.faqs = data;
      } else {
        console.log(data);
      }
    });
  }

  deleteFaq(data: any) {
    let faq: Ifaq = {
      faq_id: data.getAttribute('id')
    }

    let accountIndex = -1;

    for (let i = 0; i < this.faqs.length; i++) {
      if(this.faqs[i].faq_id === faq.faq_id) {
        accountIndex = i;
      }
    }

    this.api.deleteFaq(faq).subscribe(data => {
      this.faqs.splice(accountIndex, 1)
      console.log(data)
    });
  }
}
