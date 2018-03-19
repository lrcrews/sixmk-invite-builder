import { Color } from "./color";
import { FoldLine } from "./fold-line";
import { Point } from "./point";

export class PocketInvitation {

  constructor(public color: Color,
              public folds: Array<FoldLine>,
              public height: number,
              public id: string,
              public name: string,
              public outline: Array<Point>,
              public width: number) { }

}
