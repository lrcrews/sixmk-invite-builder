import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app-component/app.component";

import { CanvasContainerComponent } from "./canvas-components/canvas-container/canvas-container.component";
import { FooterComponent } from "./footer-component/footer.component";
import { HeaderComponent } from "./header-component/header.component";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    CanvasContainerComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})

export class AppModule { }
