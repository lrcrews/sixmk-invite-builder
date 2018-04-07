import { Color } from "./color";
import { InvitationType } from "./invitation-type";
import { Line } from "./line";
import { Point } from "./point";

export class Invitation {

  static fromJsonArray(jsonArray: Array<any>): Array<Invitation> {
    if (jsonArray) {
      return jsonArray.map( json => {
        return Invitation.fromJson(json);
      });
    } else {
      return [];
    }
  }

  static fromJson(json: any): Invitation {
    if (json) {
      return new Invitation(
        undefined,
        Line.fromJsonArray(json["foldLines"]),
        json["heightInInches"],
        json["id"],
        InvitationType.fromJson(json["invitationType"]),
        json["name"],
        Point.fromJsonArray(json["outlinePoints"]),
        Line.fromJsonArray(json["pocketLines"]),
        json["widthInInches"]
      );
    } else {
      return undefined;
    }
  }

  static emptyInstance(): Invitation {
    return new Invitation(Color.emptyInstance(), [], 0, "", InvitationType.emptyInstance(), "", [], [], 0);
  }

  constructor(public color: Color,
              public folds: Array<Line>,
              public height: number,
              public id: string,
              public invitationType: InvitationType,
              public name: string,
              public outline: Array<Point>,
              public pocketLines: Array<Line>,
              public width: number) { }

}
