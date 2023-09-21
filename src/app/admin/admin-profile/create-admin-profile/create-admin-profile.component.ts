import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {Iaccount} from "../../../interfaces/iaccount";
import {AuthService} from "../../../services/auth.service";
import {Ieducation} from "../../../interfaces/ieducation";

@Component({
  selector: 'app-create-admin-profile',
  templateUrl: './create-admin-profile.component.html',
  styleUrls: ['./create-admin-profile.component.css']
})
export class CreateAdminProfileComponent implements OnInit {

  profileForm = new FormGroup({
    firstname: new FormControl(),
    secondname: new FormControl(),
    lastname: new FormControl(),
    picture: new FormControl(),
    education: new FormControl(),
    worktitle: new FormControl(),
    information: new FormControl(),
    internship: new FormControl(),
    location: new FormControl(),
    birthday: new FormControl()
  });

  education: Ieducation[] = [];

  selectedFile: any = '';
  file_data: any = '';
  file: File | null = null;

  constructor(private api: ApiService, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.getEducations();
  }

  getEducations() {
    this.api.getEducations().subscribe(data => {
      this.education = data;
    })
  }

  onSelectedFile(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      if((this.file.size / 1048576) <= 4) {
        this.file_data = this.file;
      }
    }
  }

  createHandler(formObj: any) {
    if(this.file_data) {
      let profil: Iaccount = {
        account_id: this.auth.id
      }
      let formData = new FormData();
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('account_id', profil.account_id);
      formData.append('firstname', formObj.firstname);
      formData.append('secondname', formObj.secondname);
      formData.append('lastname', formObj.lastname);
      formData.append('picture', this.file_data.name);
      formData.append('education', formObj.education);
      formData.append('worktitle', formObj.worktitle);
      formData.append('internship', formObj.internship);
      formData.append('information', formObj.information);
      formData.append('location', formObj.location);
      formData.append('birthday', formObj.birthday);

      this.selectedFile = formData;

      this.api.createProfile(this.selectedFile).subscribe(data => {
        this.router.navigate(['admin/admin-profile', profil.account_id], {state: {data: profil}});
      });
    } else {
      let profil: Iaccount = {
        account_id: this.auth.id
      }
      let formData = new FormData();
      formData.append('account_id', profil.account_id);
      formData.append('firstname', formObj.firstname);
      formData.append('secondname', formObj.secondname);
      formData.append('lastname', formObj.lastname);
      formData.append('education', formObj.education);
      formData.append('worktitle', formObj.worktitle);
      formData.append('internship', formObj.internship);
      formData.append('information', formObj.information);
      formData.append('location', formObj.location);
      formData.append('birthday', formObj.birthday);

      this.api.createProfile(this.selectedFile).subscribe(data => {
        this.router.navigate(['admin/admin-profile', profil.account_id], {state: {data: profil}});
      });
    }
  }

}
