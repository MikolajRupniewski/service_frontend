import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { DataComponent } from './home-user/data/data.component';
import { ChangeEmailComponent } from './home-user/change-email/change-email.component';
import { ChangePasswordComponent } from './home-user/change-password/change-password.component';
import { AddShopComponent } from './home-user/add-shop/add-shop.component';
import { UsersComponent } from './home-admin/users/users.component';
import { CategoriesComponent } from './home-admin/categories/categories.component';
import { ShopsComponent } from './home-admin/shops/shops.component';


const appRoutes: Routes = [
  { path: 'home-user', component: HomeUserComponent },
  { path: 'home-user/data', component: DataComponent },
  { path: 'home-user/change-email', component: ChangeEmailComponent },
  { path: 'home-user/change-password', component: ChangePasswordComponent },
  { path: 'home-user/add-shop', component: AddShopComponent },
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'home-admin/users', component: UsersComponent},
  { path: 'home-admin/categories', component: CategoriesComponent},
  { path: 'home-admin/shops', component: ShopsComponent},
  { path: '', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
