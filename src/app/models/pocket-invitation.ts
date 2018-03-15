import { Color } from "./color";
import { Point } from "./point";

export class PocketInvitation {

  constructor(public color: Color,
              public height: number,
              public id: string,
              public name: string,
              public outline: Array<Point>,
              public width: number) { }

}
