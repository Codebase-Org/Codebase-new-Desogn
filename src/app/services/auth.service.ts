import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Ilogin} from "../interfaces/ilogin";
import {Itokenpayload} from "../interfaces/itokenpayload";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = "";
  login_id: number = 0;

  @Output() OnLoginSuccessful: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnLogoutSuccessful: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private jwt: JwtHelperService, private api: ApiService) {
    let token = localStorage.getItem("token");

    if(token) {
      this.token = token;
      this.OnLoginSuccessful.emit();
    }
  }

  login(login: Ilogin): void {
    try {
      this.api.login(login).subscribe(data => {
        //console.log(data);
        this.token = data.token;
        this.login_id = data.login_id;
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginSessionId", data.login_id.toLocaleString());
        //console.log(this.token);
        this.OnLoginSuccessful.emit();
      });
    } catch (error) {
      console.log(error);
    }
  }

  logout(): void {
    let data: Ilogin = {
      loginID: localStorage.getItem("loginSessionId")
    }
    //console.log(data);
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("loginSessionId");
    this.OnLogoutSuccessful.emit();
    this.api.logout(data).subscribe(obj => {
      let log = obj.message;
      this.router.navigate(['./login']);
    });
    // this.router.navigate(['']);
  }

  private get package(): Itokenpayload | null {
    return this.jwt.decodeToken<Itokenpayload>(this.token);
  }

  get authenticated(): boolean {
    if(!this.package) return false;
    let current: Date = new Date();
    let exp: Date | undefined = this.package?.exp ? new Date(this.package?.exp * 1000) : undefined;
    let nbf: Date | undefined = this.package?.nbf ? new Date(this.package?.nbf * 1000) : undefined;
    if(exp && current > exp) return false;
    if(nbf && current < nbf) return false;

    return true;
  }

  get id(): number | null {
    //console.log(this.package);
    return this.package && this.package.account_id ? this.package.account_id : null;
  }

  get role(): string | null {
    return this.package && this.package.role ? this.package.role : null;
  }

}
