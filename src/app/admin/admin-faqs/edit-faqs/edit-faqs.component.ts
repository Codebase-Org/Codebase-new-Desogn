import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {Ifaq} from "../../../interfaces/ifaq";

@Component({
  selector: 'app-edit-faqs',
  templateUrl: './edit-faqs.component.html',
  styleUrls: ['./edit-faqs.component.css']
})
export class EditFaqsComponent implements OnInit {

  faqForm = new FormGroup({
    faq_title: new FormControl(),
    faq_content: new FormControl()
  });

  faq: Ifaq = {};

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) {
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

      this.faqForm.patchValue({
        faq_title: this.faq.faq_title,
        faq_content: this.faq.faq_content
      })
    })
  }

  editHandler(formObj: any) {
    let f: Ifaq = {
      faq_id: this.faq.faq_id,
      faq_title: formObj.faq_title,
      faq_content: formObj.faq_content
    }

    this.api.updateFaq(f).subscribe(data => {
      this.router.navigate(['admin/admin-faqs']);
    })
  }
}
