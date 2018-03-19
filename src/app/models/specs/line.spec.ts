import { TestBed } from "@angular/core/testing";

import { Line } from "../line";
import { Point } from "../point";

describe("Line", () => {

  describe("fromJsonArray", () => {

    it("should return an empty array if no json is given", () => {
      expect(Line.fromJsonArray(undefined)).toEqual([]);
      expect(Line.fromJsonArray(null)).toEqual([]);
    });

    it("should call 'fromJson' for each element in the jsonArray", () => {
      spyOn(Line, "fromJson");
      Line.fromJsonArray([{}, {}]);
      expect(Line.fromJson).toHaveBeenCalledTimes(2);
    });

  });

  describe("fromJson", () => {

    it("should return undefined if no json is given", () => {
      expect(Line.fromJson(undefined)).toEqual(undefined);
      expect(Line.fromJson(null)).toEqual(undefined);
    });

    it("should return a Line instance for the given json", () => {
      const line = Line.fromJson({point1: {xPercent: 50, yPercent: 60}, point2: {xPercent: 99, yPercent: 100}});
      expect(line.point1.x).toEqual(50);
      expect(line.point1.y).toEqual(60);
      expect(line.point2.x).toEqual(99);
      expect(line.point2.y).toEqual(100);
    });

  });

});
