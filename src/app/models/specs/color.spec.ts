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
      const color = Color.fromJson({
        availableForBellyBand: true,
        availableForEnvelope: true,
        availableForInsert: true,
        availableForInvitation: true,
        hexCode: "#dc0062",
        id: "1",
        isMetallic: false,
        name: "hotness",
        printCode: "foobar"
      });
      expect(color.availableForBellyBand).toBeTruthy();
      expect(color.availableForEnvelope).toBeTruthy();
      expect(color.availableForInsert).toBeTruthy();
      expect(color.availableForInvitation).toBeTruthy();
      expect(color.hexCode).toEqual("#dc0062");
      expect(color.id).toEqual("1");
      expect(color.isMetallic).toBeFalsy();
      expect(color.name).toEqual("hotness");
      expect(color.printCode).toEqual("foobar");
    });

  });

  describe("emptyInstance", () => {

    it("should return a Color instance with empty values", () => {
      const color = Color.emptyInstance();
      expect(color.availableForBellyBand).toBeFalsy();
      expect(color.availableForEnvelope).toBeFalsy();
      expect(color.availableForInsert).toBeFalsy();
      expect(color.availableForInvitation).toBeFalsy();
      expect(color.hexCode).toEqual("");
      expect(color.id).toEqual("");
      expect(color.isMetallic).toBeFalsy();
      expect(color.name).toEqual("");
      expect(color.printCode).toEqual("");
    });

  });

  describe("defaultInvitationColor", () => {

    it("should return a Color instance with the default color values", () => {
      const color = Color.defaultInvitationColor();
      expect(color.availableForBellyBand).toBeTruthy();
      expect(color.availableForEnvelope).toBeTruthy();
      expect(color.availableForInsert).toBeTruthy();
      expect(color.availableForInvitation).toBeTruthy();
      expect(color.hexCode).toEqual("#685b5d");
      expect(color.id).toEqual("tbd");
      expect(color.isMetallic).toBeFalsy();
      expect(color.name).toEqual("Dark Grey");
      expect(color.printCode).toEqual("C:67 M:55 Y:44 K:20");
    });

  });

});
