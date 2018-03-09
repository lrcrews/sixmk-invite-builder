import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-off-screen-tab",
  styleUrls: [ "./off-screen-tab.component.scss" ],
  templateUrl: "./off-screen-tab.component.html"
})

export class OffScreenTabComponent {
  @Input() iconName: string;

  @Output() onShowClicked = new EventEmitter<null>();

  show(): void {
    this.onShowClicked.emit();
  }
}
