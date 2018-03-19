import { Component, ElementRef, Input, ViewChild } from "@angular/core";

import { Line } from "../../models/line";
import { PocketInvitation } from "../../models/pocket-invitation";
import { Point } from "../../models/point";

@Component({
  selector: "app-pocket-invitation-canvas",
  styleUrls: [ "./pocket-invitation-canvas.component.scss" ],
  templateUrl: "./pocket-invitation-canvas.component.html"
})

export class PocketInvitationCanvasComponent {

  @Input() pocketInvitation: PocketInvitation;

  @ViewChild("containerDiv") containerDiv: ElementRef;

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

  lineStyles(line: Line): {} {
    if (this.pocketInvitation === undefined) {
      return {};
    } else {
      const angle = this._lineAngle(line.point1, line.point2);
      const length = this._lineLength(line.point1, line.point2);
      const top = 100 - line.point1.y;
      return {
        left: `${line.point1.x}%`,
        top: `${top}%`,
        transform: `rotate(${angle}deg)`,
        width: `${length}px`
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

  private _lineLength(relativePoint1: Point, relativePoint2: Point): number {
    const point1 = this._actualPointValues(relativePoint1);
    const point2 = this._actualPointValues(relativePoint2);
    return Math.sqrt(
      (point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y)
    );
  }

  private _lineAngle(relativePoint1: Point, relativePoint2: Point): number {
    const point1 = this._actualPointValues(relativePoint1);
    const point2 = this._actualPointValues(relativePoint2);
    return (Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI) * -1;
  }

  private _actualPointValues(relativePoint: Point): { x: number, y: number} {
    const actualHeight = this.containerDiv.nativeElement.offsetHeight;
    const actualWidth = this.containerDiv.nativeElement.offsetWidth;
    return { x: (relativePoint.x / 100) * actualWidth, y: (relativePoint.y / 100) * actualHeight };
  }

}
