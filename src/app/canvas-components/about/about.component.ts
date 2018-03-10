import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-about",
  styleUrls: [ "./about.component.scss" ],
  templateUrl: "./about.component.html"
})

export class AboutComponent {
  @Output() onHideClicked = new EventEmitter<null>();

  hide(): void {
    this.onHideClicked.emit();
  }
}
