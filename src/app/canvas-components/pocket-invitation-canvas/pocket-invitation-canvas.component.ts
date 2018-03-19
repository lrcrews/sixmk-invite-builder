import { Component, ElementRef, Input, ViewChild } from "@angular/core";

import { FoldLine } from "../../models/fold-line";
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

  foldStyles(foldLine: FoldLine): {} {
    if (this.pocketInvitation === undefined) {
      return {};
    } else {
      const length = this._lineLength(foldLine.point1, foldLine.point2);
      const angle = this._lineAngle(foldLine.point1, foldLine.point2);
      return {
        left: `${foldLine.point1.x}%`,
        top: `${foldLine.point1.y}%`,
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
    return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
  }

  private _actualPointValues(relativePoint: Point): { x: number, y: number} {
    const actualHeight = this.containerDiv.nativeElement.offsetHeight;
    const actualWidth = this.containerDiv.nativeElement.offsetWidth;
    return { x: (relativePoint.x / 100) * actualWidth, y: (relativePoint.y / 100) * actualHeight };
  }

}
