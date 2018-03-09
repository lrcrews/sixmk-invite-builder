import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

import { FooterComponent } from "./footer-component/footer.component";
import { HeaderComponent } from "./header-component/header.component";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})

export class AppModule { }
