import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-collection-settings",
  styleUrls: [ "./collection-settings.component.scss" ],
  templateUrl: "./collection-settings.component.html"
})

export class CollectionSettingsComponent {
  @Output() onHideClicked = new EventEmitter<null>();

  hide(): void {
    this.onHideClicked.emit();
  }
}
