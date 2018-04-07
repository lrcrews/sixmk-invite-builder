export class InvitationType {

  static fromJsonArray(jsonArray: Array<any>): Array<InvitationType> {
    if (jsonArray) {
      return jsonArray.map( json => {
        return InvitationType.fromJson(json);
      });
    } else {
      return [];
    }
  }

  static fromJson(json: any): InvitationType {
    if (json) {
      return new InvitationType(
        json["id"],
        json["name"]
      );
    } else {
      return undefined;
    }
  }

  static emptyInstance(): InvitationType {
    return new InvitationType("", "");
  }

  constructor(public id: string,
              public name: string) { }

}
