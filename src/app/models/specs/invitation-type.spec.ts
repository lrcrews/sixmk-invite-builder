import { TestBed } from "@angular/core/testing";

import { InvitationType } from "../invitation-type";

describe("InvitationType", () => {

  describe("fromJsonArray", () => {

    it("should return an empty array if no json is given", () => {
      expect(InvitationType.fromJsonArray(undefined)).toEqual([]);
      expect(InvitationType.fromJsonArray(null)).toEqual([]);
    });

    it("should call 'fromJson' for each element in the jsonArray", () => {
      spyOn(InvitationType, "fromJson");
      InvitationType.fromJsonArray([{}, {}]);
      expect(InvitationType.fromJson).toHaveBeenCalledTimes(2);
    });

  });

  describe("fromJson", () => {

    it("should return undefined if no json is given", () => {
      expect(InvitationType.fromJson(undefined)).toEqual(undefined);
      expect(InvitationType.fromJson(null)).toEqual(undefined);
    });

    it("should return an InvitationType instance for the given json", () => {
      const invitationType = InvitationType.fromJson({ id: "id1", name: "name1"});
      expect(invitationType.id).toEqual("id1");
      expect(invitationType.name).toEqual("name1");
    });

  });

  describe("emptyInstance", () => {

    it("should return an InvitationType instance with empty values", () => {
      const invitationType = InvitationType.emptyInstance();
      expect(invitationType.id).toEqual("");
      expect(invitationType.name).toEqual("");
    });

  });

});
