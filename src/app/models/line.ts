// NOTE: when creating Lines you should start from the left-most point,
//       and if both points start at the same X then you should start
//       from the top-most point.
//
//       (If both points also have the same Y you're doing lines wrong).

import { Point } from "./point";

export class Line {

  static fromJsonArray(jsonArray: Array<any>): Array<Line> {
    if (jsonArray) {
      return jsonArray.map( json => {
        return Line.fromJson(json);
      });
    } else {
      return [];
    }
  }

  static fromJson(json: any): Line {
    if (json) {
      return new Line(
        Point.fromJson(json["point1"]),
        Point.fromJson(json["point2"])
      );
    } else {
      return undefined;
    }
  }

  constructor(public point1: Point,
              public point2: Point) { }

}
