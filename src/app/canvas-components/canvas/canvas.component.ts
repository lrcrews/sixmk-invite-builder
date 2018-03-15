import { Component, Input } from "@angular/core";

import { PocketInvitation } from "../../models/pocket-invitation";

@Component({
  selector: "app-canvas",
  styleUrls: [ "./canvas.component.scss" ],
  templateUrl: "./canvas.component.html"
})

export class CanvasComponent {

  @Input() pocketInvitation: PocketInvitation;

  containerStyles(): {} {
    if (this.pocketInvitation === undefined) {
      return {};
    } else {
      return {
        height: this._relativePocketInvitationHeight()
      };
    }
  }

  outlineStyles(): {} {
    if (this.pocketInvitation === undefined) {
      return {};
    } else {
      const polygonString = this._drawShape();
      return {
        "-webkit-clip-path": polygonString,
        "background-color": this.pocketInvitation.color.hexCode,
        "clip-path": polygonString,
        "shape-outside": polygonString
      };
    }
  }

  private _relativePocketInvitationHeight(): string {
    let relativeValue = (this.pocketInvitation.height / this.pocketInvitation.width) * 100;
    relativeValue = Math.round(relativeValue * 100) / 100;
    return `${relativeValue}%`;
  }

  private _drawShape(): string {
    let polygonString = "polygon(";
    this.pocketInvitation.outline.forEach( point => {
      polygonString += `${point.x}% ${point.y}%, `;
    });
    polygonString = polygonString.slice(0, -2);
    polygonString += ")";
    return polygonString;
  }

}
