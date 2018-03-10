import { Component } from "@angular/core";

@Component({
  selector: "app-canvas-container",
  styleUrls: [ "./canvas-container.component.scss" ],
  templateUrl: "./canvas-container.component.html"
})

export class CanvasContainerComponent {

  tileVisibilities = {
    about: false,
    collectionSettings: true,
    layerSettings: true
  };

  hideTile(key: string): void {
    this.tileVisibilities[key] = false;
  }

  showTile(key: string): void {
    this.tileVisibilities[key] = true;
  }

  tileVisible(key: string): boolean {
    return this.tileVisibilities[key] === true;
  }

}
