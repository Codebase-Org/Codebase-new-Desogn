import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
import {Ilogin} from "../interfaces/ilogin";
import {Observable} from "rxjs";
import {Itoken} from "../interfaces/itoken";
import {Imessage} from "../interfaces/imessage";
import {Iaccount} from "../interfaces/iaccount";
import {Iloginhistory} from "../interfaces/iloginhistory";
import {Irole} from "../interfaces/irole";
import {Icategory} from "../interfaces/icategory";
import {IpostTypes} from "../interfaces/ipost-types";
import {Iposts} from "../interfaces/iposts";
import {Ifaq} from "../interfaces/ifaq";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://192.168.22.31/codebase/api/";

  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  createAccount(account: Iaccount): Observable<Imessage> {
    const body = JSON.stringify(account);
    return this.http.post<Imessage>(this.baseUrl + 'account/insert.php', body, {headers: this.headers});
  }

  createProfile(profile: Iaccount): Observable<Imessage> {
    const body = JSON.stringify(profile);
    return this.http.post<Imessage>(this.baseUrl + 'profile/insert.php', body, {headers: this.headers});
  }

  createPost(posts: Iposts): Observable<Imessage> {
    const body = JSON.stringify(posts);
    return this.http.post<Imessage>(this.baseUrl + 'forum/insert.php', body, {headers: this.headers})
  }

  createFaq(faq: Ifaq): Observable<Imessage> {
    const body = JSON.stringify(faq);
    return this.http.post<Imessage>(this.baseUrl + 'faq/insert.php', body, {headers: this.headers});
  }

  createCategory(data: any) {
    return this.http.post(this.baseUrl + 'categories/create.php', data);
  }

  login(login: Ilogin): Observable<Itoken> {
    return this.http.get<Itoken>(this.baseUrl + 'login/login.php?email=' + login.email + '&password=' + login.password);
  }

  logout(data:Ilogin): Observable<Imessage> {
    let body = JSON.stringify(data);
    //console.log(body);
    return this.http.put<Imessage>(this.baseUrl + 'login/logout.php', body, {headers: this.headers} );
  }

  getSingleAccount(data: Iaccount): Observable<Iaccount> {
    return this.http.get<Iaccount>(this.baseUrl + 'account/single.php?id=' +data.account_id);
  }

  getProfileData(data: Iaccount): Observable<Iaccount> {
    //console.log('ApiService: ', data);
    return this.http.get<Iaccount>(this.baseUrl + 'profile/single.php?id=' +data.account_id);
  }

  checkOwner(): Observable<any> {
    return this.http.get(this.baseUrl + 'account/check.php');
  }

  checkProfile(data: Iaccount): Observable<Imessage> {
    return this.http.get<Imessage>(this.baseUrl + 'profile/check.php?id=' + data.account_id);
  }

  getAllAccounts(): Observable<Iaccount[]> {
    return this.http.get<Iaccount[]>(this.baseUrl + 'account/accounts');
  }

  countAccounts(): Observable<any> {
    return this.http.get(this.baseUrl + 'account/counter.php');
  }

  getLoginHistory(data: Iloginhistory): Observable<Iloginhistory[]> {
    //console.log(data);
    return this.http.get<Iloginhistory[]>(this.baseUrl + 'login/history.php?id=' + data.account_id +'&page=' + data.page);
  }

  getOnlineTime(data: Iloginhistory): Observable<Iloginhistory[]> {
    return this.http.get<Iloginhistory[]>(this.baseUrl + 'login/onlineTime.php?id=' + data.account_id);
  }

  getAllProfiles(): Observable<Iaccount[]> {
    return this.http.get<Iaccount[]>(this.baseUrl + 'profile/profiles.php');
  }

  getAllRoles(): Observable<Irole[]> {
    return this.http.get<Irole[]>(this.baseUrl + 'roles/roles.php');
  }

  getCategories(post_type_id: any): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.baseUrl + 'categories/categories.php?type_id='+ post_type_id);
  }

  getCategoryList(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.baseUrl + 'categories/category_list.php');
  }

  getSingleCategory(id: Icategory): Observable<Icategory> {
    return this.http.get<Icategory>(this.baseUrl + 'categories/single.php?id=' + id.category_id);
  }

  getPostTypes(): Observable<IpostTypes[]> {
    return this.http.get<IpostTypes[]>(this.baseUrl + 'forum/post_types.php');
  }

  getSingleType(id: IpostTypes): Observable<IpostTypes> {
    return this.http.get<IpostTypes>(this.baseUrl + 'types/single.php?type_id='+id.post_type_id);
  }

  getForumPosts(id: Iposts): Observable<Iposts[]> {
    return this.http.get<Iposts[]>(this.baseUrl + 'forum/posts.php?id='+id.category_id);
  }

  getAllFaqs(): Observable<Ifaq[]> {
    return this.http.get<Ifaq[]>(this.baseUrl + 'faq/faqs.php');
  }

  updateCategory(data: any) {
    return this.http.post(this.baseUrl + 'categories/update.php', data);
  }

  deleteAccount(id: Iaccount): Observable<Imessage[]> {
    //console.log(id);
    return this.http.delete<Imessage[]>(this.baseUrl + 'account/destroy.php?account_id=' + id.account_id);
  }

  deleteFaq(id: Ifaq): Observable<Imessage> {
    return this.http.delete<Imessage>(this.baseUrl + 'faq/destroy.php?id='+id.faq_id);
  }

}
