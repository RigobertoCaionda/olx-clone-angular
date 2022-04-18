import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { AdPageComponent } from './shared/pages/ad-page/ad-page.component';
import { AddAdComponent } from './shared/pages/add-ad/add-ad.component';
import { AdsComponent } from './shared/pages/ads/ads.component';
import { EditpageComponent } from './shared/pages/editpage/editpage.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { MyAccountComponent } from './shared/pages/my-account/my-account.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { SigninComponent } from './shared/pages/signin/signin.component';
import { SignupComponent } from './shared/pages/signup/signup.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "my-account",
    component: MyAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "ad/:id",
    component: AdPageComponent
  },
  {
    path: "edit_profile/:id",
    component: EditpageComponent
  },
  {
    path: "ads",
    component: AdsComponent
  },
  {
    path: "post-an-ad",
    component: AddAdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: "full",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
