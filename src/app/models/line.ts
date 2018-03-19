// NOTE: when creating Lines you should start from the left-most point,
//       and if both points start at the same X then you should start
//       from the top-most point.
//
//       (If both points also have the same Y you're doing lines wrong).

import { Point } from "./point";

export class Line {

  constructor(public point1: Point,
              public point2: Point) { }

}
