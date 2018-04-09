import { Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";

import { Color } from "../../models/color";
import { Invitation } from "../../models/invitation";
import { Line } from "../../models/line";
import { Point } from "../../models/point";

@Component({
  selector: "app-invitation-canvas",
  styleUrls: [ "./invitation-canvas.component.scss" ],
  templateUrl: "./invitation-canvas.component.html"
})

export class InvitationCanvasComponent {

  @Input() invitation: Invitation;

  @ViewChild("containerDiv") containerDiv: ElementRef;

  containerStyles(): {} {
    if (this.invitation === undefined) {
      return {};
    } else {
      return {
        height: this._relativeInvitationHeight()
      };
    }
  }

  outlineStyles(): {} {
    if (this.invitation === undefined) {
      return {};
    } else {
      const polygonString = this._drawShape();
      return {
        "-webkit-clip-path": polygonString,
        "background-color": this._invitationColorHexCode(),
        "clip-path": polygonString,
        "shape-outside": polygonString
      };
    }
  }

  lineStyles(line: Line): {} {
    if (this.invitation === undefined || line === undefined) {
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

  folds(): Array<Line> {
    if (this.invitation === undefined) {
      return [];
    } else {
      return this.invitation.folds;
    }
  }

  pocketLines(): Array<Line> {
    if (this.invitation === undefined) {
      return [];
    } else {
      return this.invitation.pocketLines;
    }
  }

  @HostListener("window:resize", ["$event"])
  updateLineStyles(): void {
    this.invitation.folds.forEach(fold => {
      this.lineStyles(fold);
    });
    this.invitation.pocketLines.forEach(pocketLine => {
      this.lineStyles(pocketLine);
    });
  }

  private _invitationColorHexCode(): string {
    return `#${this._invitationColor().hexCode}`;
  }

  private _invitationColor(): Color {
    if (this.invitation.color === undefined) {
      return Color.defaultInvitationColor();
    } else {
      return this.invitation.color;
    }
  }

  private _relativeInvitationHeight(): string {
    let relativeValue = (this.invitation.height / this.invitation.width) * 100;
    relativeValue = Math.round(relativeValue * 100) / 100;
    return `${relativeValue}%`;
  }

  private _drawShape(): string {
    let polygonString = "polygon(";
    this.invitation.outline.forEach( point => {
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
