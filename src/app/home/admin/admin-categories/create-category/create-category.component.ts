import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  createForm = new FormGroup({
    catname: new FormControl(''),
    picture: new FormControl('')
  });

  selectedFile: any = '';
  file_data: any = '';
  file: File | null = null;
  previewUrl: any = null;

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
  }

  onSelectedFile(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];

      if (this.file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.file);

        if ((this.file.size / 1048576) <= 4) {
          this.file_data = this.file;
        }
      }
    }
  }

  createCategory(formObj: any) {
    if(this.file_data) {
      let formData = new FormData();
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('catname', formObj.catname);
      formData.append('picture', this.file_data.name);

      this.selectedFile = formData;
    }
  }
}
