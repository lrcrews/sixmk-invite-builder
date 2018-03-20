import { Injectable } from "@angular/core";

import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";

import { Color } from "../models/color";
import { PocketInvitation } from "../models/pocket-invitation";

@Injectable()
export class SixmkApiService {

  constructor(private http: Http) { }

  colors(): Observable<Array<Color>> {
    const url = this._mockColorsJsonPath();
    return this.http.get(url).map(this._onColorsResponse);
  }

  pocketInvitations(): Observable<Array<PocketInvitation>> {
    const url = this._mockPocketInvitationsJsonPath();
    return this.http.get(url).map(this._onPocketInvitationsResponse);
  }

  private _mockColorsJsonPath(): string {
    return "../../assets/colors-response.json";
  }

  private _mockPocketInvitationsJsonPath(): string {
    return "../../assets/pocket-invitations-response.json";
  }

  private _onColorsResponse(response: Response): Array<Color> {
    const json = response.json();
    if (json) {
      return Color.fromJsonArray(json["colors"]);
    } else {
      return [];
    }
  }

  private _onPocketInvitationsResponse(response: Response): Array<PocketInvitation> {
    const json = response.json();
    if (json) {
      return PocketInvitation.fromJsonArray(json["invitations"]);
    } else {
      return [];
    }
  }

}
