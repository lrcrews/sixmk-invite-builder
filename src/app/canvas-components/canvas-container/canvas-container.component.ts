import { Component } from "@angular/core";

@Component({
  selector: "app-canvas-container",
  styleUrls: [ "./canvas-container.component.scss" ],
  templateUrl: "./canvas-container.component.html"
})

export class CanvasContainerComponent {

  collectionSettingsVisible = true;

  hideCollectionSettings(): void {
    this.collectionSettingsVisible = false;
  }

  showCollectionSettings(): void {
    this.collectionSettingsVisible = true;
  }

}
