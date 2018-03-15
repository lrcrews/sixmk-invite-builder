import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CanvasComponent } from "../canvas.component";
import { Color } from "../../../models/color";
import { PocketInvitation } from "../../../models/pocket-invitation";
import { Point } from "../../../models/point";

describe("CanvasComponent", () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CanvasComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
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
      component.pocketInvitation = new PocketInvitation(undefined, 7, "id1", "name1", [], 12.49);
      // x = (height / width) * 100
      // x = (7 / 12.49) * 100
      // x = (0.56044) * 100
      // x = 56.0444
      // Use "Math.round(x * 100) / 100" hack for "good enough" rounding, so...
      expect(component.containerStyles()).toEqual({ height: "56.04%" });
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
        new Color("#dc0062", "hotness", "foobar"),
        7,
        "1",
        "Signature",
        [
          new Point(0, 50),
          new Point(8, 100),
          new Point(100, 100),
          new Point(100, 0),
          new Point(8, 0)
        ],
        12.49
      );
      expect(component.outlineStyles()).toEqual({
        "background-color": "#dc0062",
        "clip-path": "polygon(0% 50%, 8% 100%, 100% 100%, 100% 0%, 8% 0%)",
        "shape-outside": "polygon(0% 50%, 8% 100%, 100% 100%, 100% 0%, 8% 0%)"
      });
    });

  });

});
