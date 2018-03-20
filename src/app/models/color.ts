export class Color {

  static fromJsonArray(jsonArray: Array<any>): Array<Color> {
    const colors: Array<Color> = [];
    if (jsonArray) {
      for (const colorJson of jsonArray) {
        colors.push(Color.fromJson(colorJson));
      }
    }
    return colors;
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
        json["name"],
        json["printCode"]
      );
    } else {
      return undefined;
    }
  }

  static emptyInstance(): Color {
    return new Color(false, false, false, false, 0, 0, "", "", false, "", "");
  }

  static defaultInvitationColor(): Color {
    return new Color(true, true, true, true, 100, 270, "#685b5d", "tbd", false, "Dark Grey", "C:67 M:55 Y:44 K:20");
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
              public name: string,
              public printCode: string) { }

}
