import { Injectable } from "@angular/core";

import { Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";

import { PocketInvitation } from "../models/pocket-invitation";

@Injectable()
export class SixmkApiService {

  constructor(private http: Http) { }

  pocketInvitations(): Observable<Array<PocketInvitation>> {
    const url = this._mockPocketInvitationsJsonPath();
    return this.http.get(url).map(this._onPocketInvitationResponse);
  }

  private _mockPocketInvitationsJsonPath(): string {
    return "../../assets/pocket-invitations-response.json";
  }

  private _onPocketInvitationResponse(response: Response): Array<PocketInvitation> {
    const json = response.json();
    if (json) {
      return PocketInvitation.fromJsonArray(json["invitations"]);
    } else {
      return [];
    }
  }

}
