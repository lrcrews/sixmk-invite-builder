import { Component, OnDestroy, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import "rxjs/add/observable/forkJoin";

import { Color } from "../../models/color";
import { Line } from "../../models/line";
import { PocketInvitation } from "../../models/pocket-invitation";
import { Point } from "../../models/point";
import { SixmkApiService } from "../../services/sixmk-api.service";

@Component({
  styleUrls: [ "./canvas-container.component.scss" ],
  templateUrl: "./canvas-container.component.html"
})

export class CanvasContainerComponent implements OnDestroy, OnInit {
  static PARAM_INVITATION_COLOR_ID = "icid";
  static PARAM_INVITATION_ID = "iid";

  colors: Array<Color>;
  pocketInvitations: Array<PocketInvitation>;

  selectedInvitation = undefined;
  selectedInvitationColor = Color.defaultInvitationColor();

  tileVisibilities = {
    about: false,
    collectionSettings: true,
    layerSettings: true
  };

  private _routeSubscription: Subscription = null;

  constructor(private _route: ActivatedRoute,
              private _sixmkApiService: SixmkApiService) { }

  ngOnInit(): void {
    this._loadData();
  }

  ngOnDestroy(): void {
    this._unsubscribeFromSubscription(this._routeSubscription);
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

  updateSelectedInvitation(id: string): void {
    this.selectedInvitation = this.pocketInvitations.find( invitation => {
      return invitation.id === id;
    });
    if (this.selectedInvitation === undefined) {
      this.selectedInvitation = this.pocketInvitations[0];
    }
    this.selectedInvitation.color = this.selectedInvitationColor;
  }

  updateSelectedInvitationColor(id: string): void {
    this.selectedInvitationColor = this.colors.find( color => {
      return color.id === id;
    });
    if (this.selectedInvitationColor === undefined) {
      this.selectedInvitationColor = Color.defaultInvitationColor();
    }
    this.selectedInvitation.color = this.selectedInvitationColor;
  }

  private _loadData(): void {
    Observable.forkJoin(
      this._sixmkApiService.colors(),
      this._sixmkApiService.pocketInvitations()
    ).subscribe( ([ colors, invitations ]) => {
      this.colors = colors;
      this.pocketInvitations = invitations;
      this._watchRouteParams();
    });
  }

  private _watchRouteParams(): void {
    this._routeSubscription = this._route.queryParams.subscribe( params => {
      const selectedInvitationId = params[ CanvasContainerComponent.PARAM_INVITATION_ID ];
      const selectedInvitationColorId = params[ CanvasContainerComponent.PARAM_INVITATION_COLOR_ID ];
      this.updateSelectedInvitation(`${selectedInvitationId}`);
      this.updateSelectedInvitationColor(`${selectedInvitationColorId}`);
    });
  }

  private _unsubscribeFromSubscription(subscription: Subscription): void {
    if (subscription !== null) {
      subscription.unsubscribe();
    }
  }

}
