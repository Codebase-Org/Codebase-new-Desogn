import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Icategory} from "../../../interfaces/icategory";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  createForm = new FormGroup({
    catname: new FormControl(),
    picture: new FormControl()
  });

  selectedFile: any = '';
  file_data: any = '';
  file: File | null = null;
  previewUrl: any = null;

  category: Icategory = {};

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let f: Icategory = {
        category_id: params['category_id']
      }

      this.getSingleCategory(f);
    });
  }

  getSingleCategory(data: Icategory) {
    this.api.getSingleCategory(data).subscribe(cat => {
      this.category = cat;

      this.createForm.patchValue({
        catname: this.category.catname
      })
    })
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

  updateCategory(formObj: any) {
    if(this.file_data) {
      let formData = new FormData();
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('category_id', this.category.category_id);
      formData.append('catname', formObj.catname);
      formData.append('picture', this.file_data.name);

      this.selectedFile = formData;

      console.log(this.selectedFile);

      this.api.updateCategory(this.selectedFile).subscribe(data => {
        this.router.navigate(['admin/'])
      });
    }
  }

}
