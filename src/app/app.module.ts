import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { BrowserModule } from "@angular/platform-browser";

import { InviteBuilderRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app-component/app.component";

import { AboutComponent } from "./canvas-components/about/about.component";
import { CanvasContainerComponent } from "./canvas-components/canvas-container/canvas-container.component";
import { CollectionSettingsComponent } from "./canvas-components/collection-settings/collection-settings.component";
import { FooterComponent } from "./footer-component/footer.component";
import { HeaderComponent } from "./header-component/header.component";
import { InvitationCanvasComponent } from "./canvas-components/invitation-canvas/invitation-canvas.component";
import { OffScreenTabComponent } from "./canvas-components/off-screen-tab/off-screen-tab.component";
import { SelectInputComponent } from "./select-input-component/select-input.component";

import { SixmkApiService } from "./services/sixmk-api.service";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AboutComponent,
    AppComponent,
    CanvasContainerComponent,
    CollectionSettingsComponent,
    FooterComponent,
    HeaderComponent,
    InvitationCanvasComponent,
    OffScreenTabComponent,
    SelectInputComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InviteBuilderRoutingModule
  ],
  providers: [
    SixmkApiService
  ]
})

export class AppModule { }
