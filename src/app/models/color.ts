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
        json["hexCode"],
        json["name"],
        json["printCode"]
      );
    } else {
      return undefined;
    }
  }

  static emptyInstance(): Color {
    return new Color("", "", "");
  }

  static defaultInvitationColor(): Color {
    return new Color("#685b5d", "Dark Grey", "tbd");
  }

  constructor(public hexCode: string,
              public name: string,
              public printCode: string) { }

}
