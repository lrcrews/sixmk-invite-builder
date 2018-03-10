import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-layer-settings",
  styleUrls: [ "./layer-settings.component.scss" ],
  templateUrl: "./layer-settings.component.html"
})

export class LayerSettingsComponent {
  @Output() onHideClicked = new EventEmitter<null>();

  hide(): void {
    this.onHideClicked.emit();
  }
}
