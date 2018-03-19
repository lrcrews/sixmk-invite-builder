import { Component, OnInit } from "@angular/core";

import { Color } from "../../models/color";
import { Line } from "../../models/line";
import { PocketInvitation } from "../../models/pocket-invitation";
import { Point } from "../../models/point";
import { SixmkApiService } from "../../services/sixmk-api.service";

@Component({
  selector: "app-canvas-container",
  styleUrls: [ "./canvas-container.component.scss" ],
  templateUrl: "./canvas-container.component.html"
})

export class CanvasContainerComponent implements OnInit {

  pocketInvitations: Array<PocketInvitation>;
  selectedPocketInvitation = PocketInvitation.emptyInstance();

  tileVisibilities = {
    about: false,
    collectionSettings: true,
    layerSettings: true
  };

  constructor(private _sixmkApiService: SixmkApiService) { }

  ngOnInit(): void {
    this._loadPocketInvitations();
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

  private _loadPocketInvitations(): void {
    this._sixmkApiService.pocketInvitations().subscribe( invitations => {
      this.pocketInvitations = invitations;
      // TODO: read url params to select the desired invitation, but for now
      this.selectedPocketInvitation = this.pocketInvitations[0];
      if (this.selectedPocketInvitation.color === undefined) {
        this.selectedPocketInvitation.color = Color.defaultInvitationColor();
      }
    });
  }

}
