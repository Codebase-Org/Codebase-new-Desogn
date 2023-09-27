import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SetupComponent } from './setup/setup.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FrontpageComponent } from './home/frontpage/frontpage.component';
import { AdminHeaderComponent } from './admin/inc/admin-header/admin-header.component';
import { SidebarComponent } from './admin/inc/sidebar/sidebar.component';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { HeaderComponent } from './home/inc/header/header.component';
import { FooterComponent } from './home/inc/footer/footer.component';
import { CategoryComponent } from './home/category/category.component';
import { ForumComponent } from './home/forum/forum.component';
import { CreateAccountComponent } from './admin/accounts/create-account/create-account.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { EditAdminProfileComponent } from './admin/admin-profile/edit-admin-profile/edit-admin-profile.component';
import { CreateAdminProfileComponent } from './admin/admin-profile/create-admin-profile/create-admin-profile.component';
import { EditAccountComponent } from "./admin/accounts/edit-account/edit-account.component";
import { ProfileComponent } from './home/profile/profile.component';
import { CreateProfileComponent } from './home/profile/create-profile/create-profile.component';
import { SidemenuComponent } from './home/frontpage/sidemenu/sidemenu.component';
import { EditProfileComponent } from './home/profile/edit-profile/edit-profile.component';
import { AdminSearchComponent } from './admin/admin-search/admin-search.component';
import { AdminFaqsComponent } from './admin/admin-faqs/admin-faqs.component';
import { CreateFaqsComponent } from './admin/admin-faqs/create-faqs/create-faqs.component';
import { ViewFaqsComponent } from './admin/admin-faqs/view-faqs/view-faqs.component';
import { EditFaqsComponent } from './admin/admin-faqs/edit-faqs/edit-faqs.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { CreateCategoryComponent } from './admin/admin-category/create-category/create-category.component';
import { EditCategoryComponent } from './admin/admin-category/edit-category/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    SetupComponent,
    DashboardComponent,
    FrontpageComponent,
    AdminHeaderComponent,
    SidebarComponent,
    AccountsComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    ForumComponent,
    CreateAccountComponent,
    AdminProfileComponent,
    EditAdminProfileComponent,
    CreateAdminProfileComponent,
    EditAccountComponent,
    ProfileComponent,
    CreateProfileComponent,
    SidemenuComponent,
    EditProfileComponent,
    AdminSearchComponent,
    AdminFaqsComponent,
    CreateFaqsComponent,
    ViewFaqsComponent,
    EditFaqsComponent,
    AdminCategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("token"),
        allowedDomains: [window.location.host]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
