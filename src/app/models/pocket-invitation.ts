import { Color } from "./color";
import { Line } from "./line";
import { Point } from "./point";

export class PocketInvitation {

  constructor(public color: Color,
              public folds: Array<Line>,
              public height: number,
              public id: string,
              public name: string,
              public outline: Array<Point>,
              public pocketLines: Array<Line>,
              public width: number) { }

}
