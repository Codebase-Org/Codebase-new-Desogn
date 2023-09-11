import { RouterModule, Routes} from "@angular/router";
import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login/login.component";
import {HomeComponent} from "./home/home.component";
import {FrontpageComponent} from "./home/frontpage/frontpage.component";
import {SetupComponent} from "./setup/setup.component";
import {DashboardComponent} from "./home/admin/dashboard/dashboard.component";
import {LoginhistoryComponent} from "./home/admin/loginhistory/loginhistory.component";
import {CreateprofileComponent} from "./home/profile/createprofile/createprofile.component";
import {ProfileComponent} from "./home/profile/profile.component";
import {AccountsComponent} from "./home/admin/accounts/accounts.component";
import {CreateAccountComponent} from "./home/admin/accounts/create-account/create-account.component";
import {ViewComponent} from "./home/profile/view/view.component";
import {CategoriesComponent} from "./home/forum/categories/categories.component";
import {ForumComponent} from "./home/forum/forum.component";
import {ArticleComponent} from "./home/article/article.component";
import {ArticalCategoriesComponent} from "./home/article/artical-categories/artical-categories.component";
import {CategoryComponent} from "./home/forum/category/category.component";
import {FaqAdminComponent} from "./home/admin/faq-admin/faq-admin.component";
import {CreateFaqComponent} from "./home/admin/faq-admin/create-faq/create-faq.component";
import {FaqComponent} from "./home/faq/faq.component";
import {AdminCategoriesComponent} from "./home/admin/admin-categories/admin-categories.component";
import {EditCategoryComponent} from "./home/admin/admin-categories/edit-category/edit-category.component";
import {CreateCategoryComponent} from "./home/admin/admin-categories/create-category/create-category.component";
import {MessagesComponent} from "./home/messages/messages.component";
import {ReadComponent} from "./home/messages/read/read.component";


const routes: Routes = [

  {path: '', pathMatch:'full', redirectTo:'login'},
  {path: 'login', component: LoginComponent},
  {path: 'setup', component: SetupComponent},
  {path: 'home', component: HomeComponent, children: [
      {path: 'frontpage', component: FrontpageComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'loginhistory', component: LoginhistoryComponent},
      {path: 'createprofile', component: CreateprofileComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'createAccount', component: CreateAccountComponent},
      {path: 'viewprofile/:id', component: ViewComponent},
      {path: 'forum/:id', component: ForumComponent},
      {path: 'forum_categories/:type_id', component: CategoriesComponent},
      {path: 'category/:type_id', component: CategoryComponent},
      {path: 'aticle/:id', component: ArticleComponent},
      {path: 'article_categories/:type_id', component: ArticalCategoriesComponent},
      {path: 'faq_admin', component: FaqAdminComponent},
      {path: 'create_faq', component: CreateFaqComponent},
      {path: 'faqs', component: FaqComponent},
      {path: 'admin_categories', component: AdminCategoriesComponent},
      {path: 'edit_category/:id', component: EditCategoryComponent},
      {path: 'create_category', component: CreateCategoryComponent},
      {path: 'messages', component: MessagesComponent, children: [
          {path: 'read/:message_id', component: ReadComponent},
        ]},
  ]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
