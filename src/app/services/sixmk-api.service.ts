import { Injectable } from "@angular/core";

import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";

import { Color } from "../models/color";
import { Invitation } from "../models/invitation";
import { InvitationType } from "../models/invitation-type";

@Injectable()
export class SixmkApiService {

  constructor(private http: Http) { }

  colors(): Observable<Array<Color>> {
    const url = this._mockColorsJsonPath();
    return this.http.get(url).map(this._onColorsResponse);
  }

  invitations(): Observable<Array<Invitation>> {
    const url = this._mockInvitationsJsonPath();
    return this.http.get(url).map(this._onInvitationsResponse);
  }

  invitationTypes(): Observable<Array<InvitationType>> {
    const url = this._mockInvitationTypesJsonPath();
    return this.http.get(url).map(this._onInvitationTypesResponse);
  }

  private _mockColorsJsonPath(): string {
    return "../../assets/colors-response.json";
  }

  private _mockInvitationsJsonPath(): string {
    return "../../assets/invitations-response.json";
  }

  private _mockInvitationTypesJsonPath(): string {
    return "../../assets/invitation-types-response.json";
  }

  private _onColorsResponse(response: Response): Array<Color> {
    const json = response.json();
    if (json) {
      return Color.fromJsonArray(json["colors"]);
    } else {
      return [];
    }
  }

  private _onInvitationsResponse(response: Response): Array<Invitation> {
    const json = response.json();
    if (json) {
      return Invitation.fromJsonArray(json["invitations"]);
    } else {
      return [];
    }
  }

  private _onInvitationTypesResponse(response: Response): Array<InvitationType> {
    const json = response.json();
    if (json) {
      return InvitationType.fromJsonArray(json["invitationTypes"]);
    } else {
      return [];
    }
  }

}
