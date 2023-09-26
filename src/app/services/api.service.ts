import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ilogin} from "../interfaces/ilogin";
import {Observable} from "rxjs";
import {Itoken} from "../interfaces/itoken";
import {Imassage} from "../interfaces/imassage";
import {Iaccount} from "../interfaces/iaccount";
import {Iposts} from "../interfaces/iposts";
import {Itypes} from "../interfaces/itypes";
import {Icategory} from "../interfaces/icategory";
import {Irole} from "../interfaces/irole";
import {Ieducation} from "../interfaces/ieducation";
import {Icounter} from "../interfaces/icounter";
import {Ifaq} from "../interfaces/ifaq";
import {Imessage} from "../interfaces/imessage";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseURL = "http://192.168.22.31/codebase/api/";
  //baseURL = "http://91.101.23.138/codebase/api/";
  //baseURLCapi = "";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  /*
  The Login and Logout api call will be shown here.
   */
  login(login:Ilogin): Observable<Itoken> {
    return this.http.get<Itoken>(this.baseURL + 'login/login.php?email='+login.email+'&password='+login.password);
  }

  logout(data:Ilogin): Observable<Imassage> {
    let body = JSON.stringify(data);
    return this.http.put<Imassage>(this.baseURL + 'login/logout.php', body, {headers: this.headers});
  }

  checkOwner(): Observable<any> {
    return this.http.get(this.baseURL + 'account/check.php');
  }

  /*
  All accounts and profile api call will be coming down below.
   */
  createAccount(account: Iaccount): Observable<Imassage> {
    const body = JSON.stringify(account);
    return this.http.post<Imassage>(this.baseURL + 'account/insert.php', body, {headers: this.headers});
  }

  getProfileData(data: Iaccount): Observable<Iaccount> {
    //console.log('ApiService: ', data);
    return this.http.get<Iaccount>(this.baseURL + 'profile/single.php?id=' +data.account_id);
  }

  getTeam(data: Iaccount): Observable<Iaccount[]> {
    return this.http.get<Iaccount[]>(this.baseURL + 'profile/teams.php?id='+data.instructor_id+'&role_id='+data.role_id);
  }

  getAccounts(): Observable<Iaccount[]> {
    return this.http.get<Iaccount[]>(this.baseURL + 'profile/profiles.php');
  }

  studentCounter(data: Iaccount): Observable<any> {
    return this.http.get(this.baseURL + 'account/studentCounter.php?role_id='+data.role_id);
  }

  getSpecificRoleAccounts(data: any): Observable<Iaccount[]> {
    return this.http.get<Iaccount[]>(this.baseURL + 'profile/selectAll.php?role_id='+data);
  }

  getRoles(): Observable<Irole[]> {
    return this.http.get<Irole[]>(this.baseURL + 'roles/roles.php');
  }

  getSpecificRoles(data: any): Observable<Irole[]> {
    return this.http.get<Irole[]>(this.baseURL + 'roles/selectAll.php?role_id='+data);
  }

  checkProfile(data: any): Observable<Imassage> {
    return this.http.get<Imassage>(this.baseURL + 'profile/check.php?id=' + data);
  }

  getEducations(): Observable<Ieducation[]> {
    return this.http.get<Ieducation[]>(this.baseURL + 'profile/educations.php');
  }

  createProfile(data: any) {
    return this.http.post(this.baseURL + 'profile/insert.php', data);
  }

  updateProfile(data: any) {
    return this.http.post(this.baseURL + 'profile/update.php', data);
  }

  getSingleAccount(data: Iaccount): Observable<Iaccount> {
    return this.http.get<Iaccount>(this.baseURL + 'account/single.php?id='+data.account_id);
  }

  updateAccount(data: Iaccount): Observable<any> {
    let body = JSON.stringify(data);
    return this.http.put(this.baseURL + 'account/update.php', body, {headers: this.headers});
  }

  deleteAccount(data: Iaccount): Observable<any> {
    return this.http.delete(this.baseURL + 'account/destroy.php?account_id='+data.account_id);
  }

  getOnlineNumber(): Observable<Icounter> {
    return this.http.get<Icounter>(this.baseURL + 'account/getOnline.php');
  }

  /*
  Posts and Articles goes here with all api calls
   */
  counter(data: Iposts): Observable<any> {
    return this.http.get(this.baseURL + 'forum/counter.php?type_id='+data.post_type_id);
  }

  getPostTypes(): Observable<Itypes[]> {
    return this.http.get<Itypes[]>(this.baseURL + 'forum/post_types.php');
  }

  getCategoryList(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.baseURL + 'categories/category_list.php');
  }

  getCategories(post_type_id: any): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.baseURL + 'categories/categories.php?type_id='+post_type_id);
  }

  getSingleType(id: Itypes):Observable<Itypes> {
    return this.http.get<Itypes>(this.baseURL + 'types/single.php?type_id='+id.post_type_id);
  }

  getSingleCategory(id: Icategory): Observable<Icategory> {
    return this.http.get<Icategory>(this.baseURL + 'categories/single.php?id=' + id.category_id);
  }

  getForumPosts(id: Iposts): Observable<Iposts[]> {
    return this.http.get<Iposts[]>(this.baseURL + 'forum/posts.php?id='+id.category_id);
  }

  /*
  All api calls for FAQ section will be going here.
   */
  getAllFaqs(): Observable<Ifaq[]> {
    return this.http.get<Ifaq[]>(this.baseURL + 'faq/faqs.php');
  }

  deleteFaq(id: Ifaq): Observable<Imessage> {
    return this.http.delete<Imessage>(this.baseURL + 'faq/destroy.php?id='+id.faq_id);
  }

  createFaq(faq: Ifaq): Observable<Imessage> {
    const body = JSON.stringify(faq);
    return this.http.post<Imessage>(this.baseURL + 'faq/insert.php', body, {headers: this.headers});
  }

  getSingleFaq(faq: Ifaq): Observable<Ifaq> {
    return this.http.get<Ifaq>(this.baseURL + 'faq/single.php?id=' + faq.faq_id);
  }

  updateFaq(faq: Ifaq): Observable<Ifaq> {
    let body = JSON.stringify(faq);
    return this.http.put<Ifaq>(this.baseURL + 'faq/update.php', body, {headers: this.headers});
  }
}
