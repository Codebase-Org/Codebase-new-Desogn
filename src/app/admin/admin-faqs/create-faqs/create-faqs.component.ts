import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {Ifaq} from "../../../interfaces/ifaq";

@Component({
  selector: 'app-create-faqs',
  templateUrl: './create-faqs.component.html',
  styleUrls: ['./create-faqs.component.css']
})
export class CreateFaqsComponent implements OnInit{

  faqForm = new FormGroup({
    faq_title: new FormControl(),
    faq_content: new FormControl()
  });

  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit() {

  }

  createFaq(formObj: any) {
    let faq: Ifaq = {
      faq_title: formObj.faq_title,
      faq_content: formObj.faq_content
    };
    this.api.createFaq(faq).subscribe(data => {
      //console.log(data);
      this.router.navigate(['./home/faq_admin']);
    })
    //console.log(faq);
  }

}
