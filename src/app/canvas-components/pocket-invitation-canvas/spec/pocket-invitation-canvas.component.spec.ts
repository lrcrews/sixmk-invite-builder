import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Color } from "../../../models/color";
import { Line } from "../../../models/line";
import { PocketInvitation } from "../../../models/pocket-invitation";
import { PocketInvitationCanvasComponent } from "../pocket-invitation-canvas.component";
import { Point } from "../../../models/point";

describe("PocketInvitationCanvasComponent", () => {
  let component: PocketInvitationCanvasComponent;
  let fixture: ComponentFixture<PocketInvitationCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PocketInvitationCanvasComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketInvitationCanvasComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("containerStyles", () => {

    it("should return an empty hash if the pocketInvitation is undefined", () => {
      component.pocketInvitation = undefined;
      expect(component.containerStyles()).toEqual({});
    });

    it("should return a hash with 'height' property that is the relative heigt percentage", () => {
      component.pocketInvitation = new PocketInvitation(undefined, [], 7, "id1", "name1", [], [], 11.49);
      // x = (height / width) * 100
      // x = (7 / 11.49) * 100
      // x = (0.60922) * 100
      // x = 60.922
      // Use "Math.round(x * 100) / 100" hack for "good enough" rounding, so...
      expect(component.containerStyles()).toEqual({ height: "60.92%" });
    });

  });

  describe("outlineStyles", () => {

    it("should return an empty hash if the pocketInvitation is undefined", () => {
      component.pocketInvitation = undefined;
      expect(component.outlineStyles()).toEqual({});
    });

    it("should return a hash with 'background-color', 'clip-path', and 'shape-outside'" +
       "values set based on pocketInvitation", () => {
      component.pocketInvitation = new PocketInvitation(
        new Color(true, true, true, true, 100, 100, "#dc0062", "id1", false, "hotness", "foobar"),
        [
          new Line( new Point(21.76, 100), new Point(21.76, 0) ),
          new Line( new Point(65.27, 100), new Point(65.27, 0) )
        ],
        7,
        "1",
        "Signature",
        [
          new Point(0, 50),
          new Point(8.7, 100),
          new Point(100, 100),
          new Point(100, 0),
          new Point(8.7, 0)
        ],
        [],
        11.49
      );
      expect(component.outlineStyles()).toEqual({
        "-webkit-clip-path": "polygon(0% 50%, 8.7% 100%, 100% 100%, 100% 0%, 8.7% 0%)",
        "background-color": "#dc0062",
        "clip-path": "polygon(0% 50%, 8.7% 100%, 100% 100%, 100% 0%, 8.7% 0%)",
        "shape-outside": "polygon(0% 50%, 8.7% 100%, 100% 100%, 100% 0%, 8.7% 0%)"
      });
    });

  });

  describe("lineStyles", () => {

    it("should return an empty hash if the pocketInvitation is undefined", () => {
      component.pocketInvitation = undefined;
      expect(component.lineStyles(new Line( new Point(21.76, 100), new Point(21.76, 0) ))).toEqual({});
    });

    it("should return a hash with 'left', 'top', 'transform', and 'width'" +
       "values set based on pocketInvitation and ElementRef's native element's size", () => {
      component.pocketInvitation = new PocketInvitation(
        new Color(true, true, true, true, 100, 100, "#dc0062", "id1", false, "hotness", "foobar"),
        [
          new Line( new Point(21.76, 100), new Point(21.76, 0) ),
          new Line( new Point(65.27, 100), new Point(65.27, 0) )
        ],
        7,
        "1",
        "Signature",
        [
          new Point(0, 50),
          new Point(8.7, 100),
          new Point(100, 100),
          new Point(100, 0),
          new Point(8.7, 0)
        ],
        [],
        11.49
      );
      spyOnProperty(component.containerDiv.nativeElement, "offsetHeight", "get").and.returnValue(609);
      spyOnProperty(component.containerDiv.nativeElement, "offsetWidth", "get").and.returnValue(1000);
      // width:
      //
      // w = sqrt( sq(x1 - x2) + sq(y1 - y2) )
      // where x1 = (point_1_percent_width / 100) * actual_width
      //       x1 = (21.76 / 100) * 1000
      //       x1 = (0.2176) * 1000
      //       x1 = 217.6
      // after doing the same for the others...
      // w = sqrt( sq(217.6 - 217.6) + sq(609 - 0) )
      // w = sqrt( sq(0) + sq(609) )
      // w = sqrt( 370881 )
      // w = 609
      expect(component.lineStyles(component.pocketInvitation.folds[0])).toEqual({
        left: "21.76%",
        top: "0%",
        transform: "rotate(90deg)",
        width: "609px"
      });
    });

  });

  describe("updateLineStyles", () => {

    it("should call 'lineStyles' for each line in the 'folds' and 'pocketLines' arrays", () => {
      component.pocketInvitation = new PocketInvitation(
        new Color(true, true, true, true, 100, 100, "#dc0062", "id1", false, "hotness", "foobar"),
        [
          new Line( new Point(21.76, 100), new Point(21.76, 0) ),
          new Line( new Point(65.27, 100), new Point(65.27, 0) )
        ],
        7,
        "1",
        "Signature",
        [
          new Point(0, 50),
          new Point(8.7, 100),
          new Point(100, 100),
          new Point(100, 0),
          new Point(8.7, 0)
        ],
        [
          new Line( new Point(65.27, 42.86), new Point(82.25, 35.71) ),
          new Line( new Point(82.25, 35.71), new Point(100, 42.86) )
        ],
        11.49
      );
      spyOn(component, "lineStyles");
      component.updateLineStyles();
      expect(component.lineStyles).toHaveBeenCalledTimes(4);
    });

  });

});
