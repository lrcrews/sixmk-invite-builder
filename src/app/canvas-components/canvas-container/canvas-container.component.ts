import { Component, OnInit } from "@angular/core";

import { Color } from "../../models/color";
import { Line } from "../../models/line";
import { PocketInvitation } from "../../models/pocket-invitation";
import { Point } from "../../models/point";

@Component({
  selector: "app-canvas-container",
  styleUrls: [ "./canvas-container.component.scss" ],
  templateUrl: "./canvas-container.component.html"
})

export class CanvasContainerComponent implements OnInit {

  pocketInvitation: PocketInvitation;

  tileVisibilities = {
    about: false,
    collectionSettings: true,
    layerSettings: true
  };

  ngOnInit(): void {
    this.pocketInvitation = new PocketInvitation(
      new Color("#dc0062", "hotness", "foobar"),
      [
        new Line( new Point(21.76, 100), new Point(21.76, 0) ),
        new Line( new Point(65.27, 100), new Point(65.27, 0) )
      ],
      7,
      "1",
      "Signature",
      [
        new Point(0, 50),
        new Point(8.7, 100),
        new Point(100, 100),
        new Point(100, 0),
        new Point(8.7, 0)
      ],
      [
        new Line( new Point(65.27, 42.86), new Point(82.25, 35.71) ),
        new Line( new Point(82.25, 35.71), new Point(100, 42.86) )
      ],
      11.49
    );
  }

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
