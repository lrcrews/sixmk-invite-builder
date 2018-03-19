import { TestBed } from "@angular/core/testing";

import { Color } from "../color";

describe("Color", () => {

  describe("fromJsonArray", () => {

    it("should return an empty array if no json is given", () => {
      expect(Color.fromJsonArray(undefined)).toEqual([]);
      expect(Color.fromJsonArray(null)).toEqual([]);
    });

    it("should call 'fromJson' for each element in the jsonArray", () => {
      spyOn(Color, "fromJson");
      Color.fromJsonArray([{}, {}]);
      expect(Color.fromJson).toHaveBeenCalledTimes(2);
    });

  });

  describe("fromJson", () => {

    it("should return undefined if no json is given", () => {
      expect(Color.fromJson(undefined)).toEqual(undefined);
      expect(Color.fromJson(null)).toEqual(undefined);
    });

    it("should return a Color instance for the given json", () => {
      const color = Color.fromJson({hexCode: "#dc0062", name: "hotness", printCode: "foobar"});
      expect(color.hexCode).toEqual("#dc0062");
      expect(color.name).toEqual("hotness");
      expect(color.printCode).toEqual("foobar");
    });

  });

  describe("emptyInstance", () => {

    it("should return a Color instance with empty values", () => {
      const color = Color.emptyInstance();
      expect(color.hexCode).toEqual("");
      expect(color.name).toEqual("");
      expect(color.printCode).toEqual("");
    });

  });

  describe("defaultInvitationColor", () => {

    it("should return a Color instance with the default color values", () => {
      const color = Color.defaultInvitationColor();
      expect(color.hexCode).toEqual("#685b5d");
      expect(color.name).toEqual("Dark Grey");
      expect(color.printCode).toEqual("tbd");
    });

  });

});
