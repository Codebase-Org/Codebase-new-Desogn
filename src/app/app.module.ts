import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { FrontpageComponent } from './home/frontpage/frontpage.component';
import { HeaderComponent } from './inc/header/header.component';
import { SetupComponent } from './setup/setup.component';
import { DashboardComponent } from './home/admin/dashboard/dashboard.component';
import { LoginhistoryComponent } from './home/admin/loginhistory/loginhistory.component';
import { CreateprofileComponent } from './home/profile/createprofile/createprofile.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AccountsComponent } from './home/admin/accounts/accounts.component';
import { CreateAccountComponent } from './home/admin/accounts/create-account/create-account.component';
import { ViewComponent } from './home/profile/view/view.component';
import { ForumComponent } from './home/forum/forum.component';
import { CategoriesComponent } from './home/forum/categories/categories.component';
import { ArticleComponent } from './home/article/article.component';
import { ArticalCategoriesComponent } from './home/article/artical-categories/artical-categories.component';
import { CategoryComponent } from './home/forum/category/category.component';
import { FaqAdminComponent } from './home/admin/faq-admin/faq-admin.component';
import { CreateFaqComponent } from './home/admin/faq-admin/create-faq/create-faq.component';
import { FaqComponent } from './home/faq/faq.component';
import { AdminCategoriesComponent } from './home/admin/admin-categories/admin-categories.component';
import { EditCategoryComponent } from './home/admin/admin-categories/edit-category/edit-category.component';
import { CreateCategoryComponent } from './home/admin/admin-categories/create-category/create-category.component';
import { MessagesComponent} from "./home/messages/messages.component";
import { ReadComponent } from './home/messages/read/read.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FrontpageComponent,
    HeaderComponent,
    SetupComponent,
    DashboardComponent,
    LoginhistoryComponent,
    CreateprofileComponent,
    ProfileComponent,
    AccountsComponent,
    CreateAccountComponent,
    ViewComponent,
    ForumComponent,
    CategoriesComponent,
    ArticleComponent,
    ArticalCategoriesComponent,
    CategoryComponent,
    FaqAdminComponent,
    CreateFaqComponent,
    FaqComponent,
    AdminCategoriesComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    MessagesComponent,
    ReadComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem("token"),
          allowedDomains: [window.location.host]
        }
      }),
      ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
