import { Component, OnDestroy, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import "rxjs/add/observable/forkJoin";

import { Color } from "../../models/color";
import { Invitation } from "../../models/invitation";
import { InvitationType } from "../../models/invitation-type";
import { Line } from "../../models/line";
import { Point } from "../../models/point";
import { SixmkApiService } from "../../services/sixmk-api.service";

@Component({
  styleUrls: [ "./canvas-container.component.scss" ],
  templateUrl: "./canvas-container.component.html"
})

export class CanvasContainerComponent implements OnDestroy, OnInit {
  static PARAM_INVITATION_COLOR_ID = "icid";
  static PARAM_INVITATION_ID = "iid";
  static PARAM_INVITATION_TYPE_ID = "itid";

  colors: Array<Color>;
  invitations: Array<Invitation>;
  invitationTypes: Array<InvitationType>;

  selectedInvitation: Invitation;
  selectedInvitationColor = Color.defaultInvitationColor();
  selectedInvitationType: InvitationType;

  tileVisibilities = {
    about: false,
    collectionSettings: true,
    layerSettings: true
  };

  private _queryParams;
  private _routeSubscription: Subscription = null;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
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

  invitationsForType(invitationType: InvitationType): Array<Invitation> {
    if (this.invitations) {
      return this.invitations.filter( invitation => {
        return invitation.invitationType.id === invitationType.id;
      });
    } else {
      return [];
    }
  }

  updateSelectedColor(color: Color): void {
    if (this._queryParams !== undefined) {
      this._updateParamKeyWithValue(CanvasContainerComponent.PARAM_INVITATION_COLOR_ID, color.id);
    }
  }

  updateSelectedInvitation(invitation: Invitation): void {
    if (this._queryParams !== undefined) {
      this._updateParamKeyWithValue(CanvasContainerComponent.PARAM_INVITATION_ID, invitation.id);
    }
  }

  updateSelectedInvitationType(invitationType: InvitationType): void {
    if (this._queryParams !== undefined) {
      this._updateParamKeyWithValue(CanvasContainerComponent.PARAM_INVITATION_TYPE_ID, invitationType.id);
      const invitations = this.invitationsForType(invitationType);
      this.updateSelectedInvitation(invitations[0]);
    }
  }

  private _updateParamKeyWithValue(key: string, value: string): void {
    this._queryParams[key] = value;
    this._router.navigate([], { relativeTo: this._route, queryParams: this._queryParams });
  }

  private _unsubscribeFromSubscription(subscription: Subscription): void {
    if (subscription !== null) {
      subscription.unsubscribe();
    }
  }

  private _loadData(): void {
    Observable.forkJoin(
      this._sixmkApiService.colors(),
      this._sixmkApiService.invitationTypes(),
      this._sixmkApiService.invitations()
    ).subscribe( ([ colors, invitationTypes, invitations ]) => {
      this.colors = colors;
      this.invitationTypes = invitationTypes;
      this.invitations = invitations;
      this._watchRouteParams();
    });
  }

  private _watchRouteParams(): void {
    this._routeSubscription = this._route.queryParams.subscribe( params => {
      this._queryParams = Object.assign({}, params);
      this._updateSelectedInvitationTypeById(
        `${params[ CanvasContainerComponent.PARAM_INVITATION_TYPE_ID ]}`
      );
      this._updateSelectedInvitationById(
        `${params[ CanvasContainerComponent.PARAM_INVITATION_ID ]}`
      );
      this._updateSelectedInvitationColorById(
        `${params[ CanvasContainerComponent.PARAM_INVITATION_COLOR_ID ]}`
      );
    });
  }

  private _updateSelectedInvitationById(id: string): void {
    this.selectedInvitation = this.invitations.find( invitation => {
      return invitation.id === id;
    });
    if (this.selectedInvitation === undefined) {
      this.selectedInvitation = this.invitationsForType(this.selectedInvitationType)[0];
    }
    this.selectedInvitation.color = this.selectedInvitationColor;
  }

  private _updateSelectedInvitationColorById(id: string): void {
    this.selectedInvitationColor = this.colors.find( color => {
      return color.id === id;
    });
    if (this.selectedInvitationColor === undefined) {
      this.selectedInvitationColor = Color.defaultInvitationColor();
    }
    this.selectedInvitation.color = this.selectedInvitationColor;
  }

  private _updateSelectedInvitationTypeById(id: string): void {
    this.selectedInvitationType = this.invitationTypes.find( invitationType => {
      return invitationType.id === id;
    });
    if (this.selectedInvitationType === undefined) {
      this.selectedInvitationType = this.invitationTypes[0];
    }
  }

}
