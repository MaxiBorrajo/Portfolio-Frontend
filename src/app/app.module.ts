import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { authinterceptorProviders } from './services/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcercaDeModule } from './components/acerca-de/acerca-de.module';
import { ProjectosModule } from './components/projectos/projectos.module';
import { LoginModule } from './components/login/login.module';
import { ContactoModule } from './components/contacto/contacto.module';
import { AdminModule } from './admin/admin.module';
import { HeaderModule } from './components/header/header.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AcercaDeModule,
    ProjectosModule,
    LoginModule,
    ContactoModule,
    AdminModule,
    HeaderModule,
    NavbarModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [authinterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
