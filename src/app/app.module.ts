import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HeaderComponent } from './header/header.component';
import { DataComponent } from './home-user/data/data.component';
import { ChangeEmailComponent } from './home-user/change-email/change-email.component';
import { ChangePasswordComponent } from './home-user/change-password/change-password.component';
import { AddShopComponent } from './home-user/add-shop/add-shop.component';
import { ChangeShopComponent } from './home-user/change-shop/change-shop.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { UsersComponent } from './home-admin/users/users.component';
import { CategoriesComponent } from './home-admin/categories/categories.component';
import { ShopsComponent } from './home-admin/shops/shops.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeUserComponent,
    HomeAdminComponent,
    HeaderComponent,
    DataComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    AddShopComponent,
    ChangeShopComponent,
    HeaderAdminComponent,
    UsersComponent,
    CategoriesComponent,
    ShopsComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
