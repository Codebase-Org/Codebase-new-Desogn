import {Component, OnInit} from '@angular/core';
import {Icategory} from "../../../../interfaces/icategory";
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category: Icategory = {};
  categories: Icategory = {};
  file: File | null = null;
  file_data: any = '';
  selectedFile: any = '';
  previewUrl: any = null;

  updateForm = new FormGroup({
    category_id: new FormControl(),
    catname: new FormControl(),
    picture: new FormControl()
  });

  verifyForm = new FormGroup({
    catname: new FormControl(),
    picture: new FormControl(),
  })
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('id');
    const stateDate = history.state.data;
    this.categories = {
      category_id: data
    }
    this.api.getSingleCategory(this.categories).subscribe(catdata => {
      this.category = catdata;
      //this.updateForm.patchValue({catname: catdata.catname});
      //console.log(catdata);
    })
  }

  onSelectedFile(event: any) {
    const fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      if(this.file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrl = e.target.result;
        };
        reader.readAsDataURL(this.file);

        if((this.file.size/1048576)<=4) {
          this.file_data = this.file;
        }
      }
    }
  }

  updateCategory(formObj: any) {
    if(this.file_data) {
      let formData = new FormData();
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('catname', formObj.catname);
      formData.append('picture', this.file_data.name);
      formData.append('category_id', this.category.category_id);

      this.selectedFile = formData;

      //console.log(this.selectedFile);

      this.api.updateCategory(this.selectedFile).subscribe(data => {
        //console.log(data);
        this.router.navigate(['./home/admin_categories']);
      });
    }
  }

}
