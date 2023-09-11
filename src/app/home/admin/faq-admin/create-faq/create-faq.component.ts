import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {Ifaq} from "../../../../interfaces/ifaq";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.css']
})
export class CreateFaqComponent implements OnInit {



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
