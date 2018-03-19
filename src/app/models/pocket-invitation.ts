import { Color } from "./color";
import { Line } from "./line";
import { Point } from "./point";

export class PocketInvitation {

  static fromJsonArray(jsonArray: Array<any>): Array<PocketInvitation> {
    const invitations: Array<PocketInvitation> = [];
    if (jsonArray) {
      for (const invitationJson of jsonArray) {
        invitations.push(PocketInvitation.fromJson(invitationJson));
      }
    }
    return invitations;
  }

  static fromJson(json: any): PocketInvitation {
    if (json) {
      return new PocketInvitation(
        undefined,
        Line.fromJsonArray(json["foldLines"]),
        json["heightInInches"],
        json["id"],
        json["name"],
        Point.fromJsonArray(json["outlinePoints"]),
        Line.fromJsonArray(json["pocketLines"]),
        json["widthInInches"]
      );
    } else {
      return undefined;
    }
  }

  static emptyInstance(): PocketInvitation {
    return new PocketInvitation(Color.emptyInstance(), [], 0, "", "", [], [], 0);
  }

  constructor(public color: Color,
              public folds: Array<Line>,
              public height: number,
              public id: string,
              public name: string,
              public outline: Array<Point>,
              public pocketLines: Array<Line>,
              public width: number) { }

}
