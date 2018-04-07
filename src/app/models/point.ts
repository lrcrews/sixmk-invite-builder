// The values are relative point values as a perctage, so the point:
//
//    new Point(8, 50)
//
// represents a point that is 8% right of the left edge of some container,
// and 50% above the bottom edge of some container.

export class Point {

  static fromJsonArray(jsonArray: Array<any>): Array<Point> {
    if (jsonArray) {
      return jsonArray.map( json => {
        return Point.fromJson(json);
      });
    } else {
      return [];
    }
  }

  static fromJson(json: any): Point {
    if (json) {
      return new Point(
        json["xPercent"],
        json["yPercent"]
      );
    } else {
      return undefined;
    }
  }

  constructor(public x: number,
              public y: number) { }

}
