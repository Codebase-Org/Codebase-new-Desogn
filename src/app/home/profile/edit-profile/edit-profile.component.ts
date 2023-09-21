import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Ieducation} from "../../../interfaces/ieducation";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Iaccount} from "../../../interfaces/iaccount";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

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
  profile: Iaccount = {};
  profil: Iaccount = {};

  selectedFile: any = '';
  file_data: any = '';
  file: File | null = null;

  constructor(private api: ApiService, private router: Router, private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profil = {
        account_id: params['account_id']
      }

      this.getProfileData(this.profil);
    })
    this.getEducations();
  }

  getProfileData(data: Iaccount) {
    this.api.getProfileData(data).subscribe(pro => {
      this.profile = pro;

      this.profileForm.patchValue({
        firstname: this.profile.firstname,
        secondname: this.profile.secondname,
        lastname: this.profile.lastname,
        birthday: this.profile.birthday,
        education: this.profile.education,
        worktitle: this.profile.worktitle,
        internship: this.profile.internship,
        location: this.profile.location,
        information: this.profile.information
      })
      //console.log(this.profile);
    })
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

  editHandler(formObj: any) {
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
      formData.append('profile_id', this.profile.profile_id);

      this.selectedFile = formData;

      this.api.updateProfile(this.selectedFile).subscribe(data => {
        this.router.navigate(['home']);
      });
    }
  }
}
