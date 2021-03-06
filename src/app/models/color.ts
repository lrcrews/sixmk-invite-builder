export class Color {

  static fromJsonArray(jsonArray: Array<any>): Array<Color> {
    if (jsonArray) {
      return jsonArray.map( json => {
        return Color.fromJson(json);
      });
    } else {
      return [];
    }
  }

  static fromJson(json: any): Color {
    if (json) {
      return new Color(
        json["availableForBellyBand"],
        json["availableForEnvelope"],
        json["availableForInsert"],
        json["availableForInvitation"],
        json["coverWeight"],
        json["gsmWeight"],
        json["hexCode"],
        json["id"],
        json["isMetallic"],
        json["isTextured"],
        json["name"],
        json["printCode"]
      );
    } else {
      return undefined;
    }
  }

  static emptyInstance(): Color {
    return new Color(false, false, false, false, 0, 0, "", "", false, false, "", "");
  }

  static defaultInvitationColor(): Color {
    return new Color(
      true, true, true, true, 100, 270, "685b5d", "75", false, false, "Dark Grey", "C:67 M:55 Y:44 K:20"
    );
  }

  constructor(public availableForBellyBand: boolean,
              public availableForEnvelope: boolean,
              public availableForInsert: boolean,
              public availableForInvitation: boolean,
              public coverWeight: number,
              public gsmWeight: number,
              public hexCode: string,
              public id: string,
              public isMetallic: boolean,
              public isTextured: boolean,
              public name: string,
              public printCode: string) { }

}
