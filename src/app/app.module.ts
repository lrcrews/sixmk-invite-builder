import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app-component/app.component";

import { AboutComponent } from "./canvas-components/about/about.component";
import { CanvasContainerComponent } from "./canvas-components/canvas-container/canvas-container.component";
import { CanvasComponent } from "./canvas-components/canvas/canvas.component";
import { CollectionSettingsComponent } from "./canvas-components/collection-settings/collection-settings.component";
import { FooterComponent } from "./footer-component/footer.component";
import { HeaderComponent } from "./header-component/header.component";
import { LayerSettingsComponent } from "./canvas-components/layer-settings/layer-settings.component";
import { OffScreenTabComponent } from "./canvas-components/off-screen-tab/off-screen-tab.component";

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AboutComponent,
    AppComponent,
    CanvasComponent,
    CanvasContainerComponent,
    CollectionSettingsComponent,
    FooterComponent,
    HeaderComponent,
    LayerSettingsComponent,
    OffScreenTabComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})

export class AppModule { }
