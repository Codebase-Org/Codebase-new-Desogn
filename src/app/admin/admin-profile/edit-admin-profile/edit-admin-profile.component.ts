import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Ieducation} from "../../../interfaces/ieducation";
import {Iaccount} from "../../../interfaces/iaccount";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css']
})
export class EditAdminProfileComponent implements OnInit {

  education: Ieducation[] = [];
  profile: Iaccount ={};

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

  selectedFile: any = '';
  file_data: any = '';
  file: File | null = null;
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let profil: Iaccount = {
        'account_id': params['account_id']
      };

      this.getProfile(profil);

    });
    this.getEducations();
  }

  getEducations() {
    this.api.getEducations().subscribe(data => {
      this.education = data;
    })
  }

  getProfile(data: Iaccount) {
    this.api.getProfileData(data).subscribe(pro => {
      this.profile = pro;
      //console.log(this.profile);
      this.profileForm.patchValue({
        firstname: this.profile.firstname,
        secondname: this.profile.secondname,
        lastname: this.profile.lastname,
        worktitle: this.profile.worktitle,
        location: this.profile.location,
        birthday: this.profile.birthday,
        internship: this.profile.internship,
        education: this.profile.education,
        information: this.profile.information
      });
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
        account_id: this.auth.id,
        profile_id: this.profile.profile_id
      }
      let formData = new FormData();
      formData.append('file', this.file_data, this.file_data.name);
      formData.append('account_id', profil.account_id);
      formData.append('profile_id', profil.profile_id);
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

      //console.log(this.selectedFile);

      this.api.updateProfile(this.selectedFile).subscribe(data => {
        this.router.navigate(['admin/admin-profile', profil.account_id], {state: {data: profil}});
      });
    }
  }
}
