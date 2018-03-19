import { TestBed } from "@angular/core/testing";

import { Point } from "../point";

describe("Point", () => {

  describe("fromJsonArray", () => {

    it("should return an empty array if no json is given", () => {
      expect(Point.fromJsonArray(undefined)).toEqual([]);
      expect(Point.fromJsonArray(null)).toEqual([]);
    });

    it("should call 'fromJson' for each element in the jsonArray", () => {
      spyOn(Point, "fromJson");
      Point.fromJsonArray([{}, {}]);
      expect(Point.fromJson).toHaveBeenCalledTimes(2);
    });

  });

  describe("fromJson", () => {

    it("should return undefined if no json is given", () => {
      expect(Point.fromJson(undefined)).toEqual(undefined);
      expect(Point.fromJson(null)).toEqual(undefined);
    });

    it("should return a Point instance for the given json", () => {
      const point = Point.fromJson({xPercent: 50, yPercent: 60});
      expect(point.x).toEqual(50);
      expect(point.y).toEqual(60);
    });

  });

});
