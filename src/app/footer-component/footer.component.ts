import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  styleUrls: [ "./footer.component.scss" ],
  templateUrl: "./footer.component.html"
})

export class FooterComponent {

  launchGithub(): void {
    window.open("https://github.com/lrcrews/sixmk-invite-builder", "_blank");
  }

}
