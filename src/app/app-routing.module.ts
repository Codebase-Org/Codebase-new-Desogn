import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SetupComponent} from "./setup/setup.component";
import {HomeComponent} from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {FrontpageComponent} from "./home/frontpage/frontpage.component";
import {AccountsComponent} from "./admin/accounts/accounts.component";
import {CategoryComponent} from "./home/category/category.component";
import {ForumComponent} from "./home/forum/forum.component";
import {CreateAccountComponent} from "./admin/accounts/create-account/create-account.component";
import {CreateAdminProfileComponent} from "./admin/admin-profile/create-admin-profile/create-admin-profile.component";
import {EditAdminProfileComponent} from "./admin/admin-profile/edit-admin-profile/edit-admin-profile.component";
import {AdminProfileComponent} from "./admin/admin-profile/admin-profile.component";
import {EditAccountComponent} from "./admin/accounts/edit-account/edit-account.component";

/*
  All routes for codebase, will be going here. But two of the routes are parents
  for many other routes, so home and admin does both, has children which means
  that, they will have a lot of routes in them.
 */
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'setup', component: SetupComponent},
  {path: 'home', pathMatch: 'full', redirectTo: 'home/frontpage'},
  {path: 'home', component: HomeComponent, children: [
    /*
    Routes for home will be going in here.
     */
      {path: 'frontpage', component: FrontpageComponent},
      {path: 'category/:type_id', component: CategoryComponent},
      {path: 'forum/:id', component: ForumComponent}
    ]},
  {path: 'admin', pathMatch: 'full', redirectTo: 'admin/dashboard'},
  {path: 'admin', component: AdminComponent, children: [
    /*
    Routes for admin will be going in here.
     */
      {path: 'dashboard', component: DashboardComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'accounts/:role', component: AccountsComponent},
      {path: 'new-account', component: CreateAccountComponent},
      {path: 'edit-account/:account_id', component: EditAccountComponent},
      {path: 'admin-profile/:account_id', component: AdminProfileComponent},
      {path: 'add-profile', component: CreateAdminProfileComponent},
      {path: 'edit-profile/:account_id', component: EditAdminProfileComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
