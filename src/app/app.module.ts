import { LOCALE_ID, NgModule } from '@angular/core'; // Para exibicao de coisas em portugues o locale_id
import localePt from '@angular/common/locales/pt'; // Para exibicao de coisas em portugues
import { registerLocaleData } from '@angular/common'; // Para exibicao de coisas em portugues
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxPaginationModule } from 'ngx-pagination'; // Para criar paginacao
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { MyAccountComponent } from './shared/pages/my-account/my-account.component';
import { SigninComponent } from './shared/pages/signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { AdItemComponent } from './shared/components/ad-item/ad-item.component';
import { SignupComponent } from './shared/pages/signup/signup.component';
import { AdPageComponent } from './shared/pages/ad-page/ad-page.component';
import { AddAdComponent } from './shared/pages/add-ad/add-ad.component';
import { AdsComponent } from './shared/pages/ads/ads.component';
import { EditpageComponent } from './shared/pages/editpage/editpage.component';

registerLocaleData(localePt); // Para exibicao de coisas em portugues

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    MyAccountComponent,
    SigninComponent,
    AdItemComponent,
    SignupComponent,
    AdPageComponent,
    AddAdComponent,
    AdsComponent,
    EditpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    CarouselModule.forRoot()
  ],
  providers: [
    {
      provide:  LOCALE_ID,
      useValue: 'pt-BR'
    } // Para exibicao de coisas em portugues
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
