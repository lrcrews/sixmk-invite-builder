import { TestBed } from "@angular/core/testing";

import { Color } from "../color";
import { Invitation } from "../invitation";
import { InvitationType } from "../invitation-type";
import { Line } from "../line";
import { Point } from "../point";

describe("Invitation", () => {

  describe("fromJsonArray", () => {

    it("should return an empty array if no json is given", () => {
      expect(Invitation.fromJsonArray(undefined)).toEqual([]);
      expect(Invitation.fromJsonArray(null)).toEqual([]);
    });

    it("should call 'fromJson' for each element in the jsonArray", () => {
      spyOn(Invitation, "fromJson");
      Invitation.fromJsonArray([{}, {}]);
      expect(Invitation.fromJson).toHaveBeenCalledTimes(2);
    });

  });

  describe("fromJson", () => {

    it("should return undefined if no json is given", () => {
      expect(Invitation.fromJson(undefined)).toEqual(undefined);
      expect(Invitation.fromJson(null)).toEqual(undefined);
    });

    it("should return an Invitation instance for the given json", () => {
      const json = {
        foldLines: [
          {
            point1: {
              xPercent: 21.76,
              yPercent: 100
            },
            point2: {
              xPercent: 21.76,
              yPercent: 0
            }
          },
          {
            point1: {
              xPercent: 65.27,
              yPercent: 100
            },
            point2: {
              xPercent: 65.27,
              yPercent: 0
            }
          }
        ],
        heightInInches: 7,
        id: "1",
        invitationType: {
          id: "1",
          name: "Pocket Invitation"
        },
        name: "Signature",
        outlinePoints: [
          {
            xPercent: 0,
            yPercent: 50
          },
          {
            xPercent: 8.7,
            yPercent: 100
          },
          {
            xPercent: 100,
            yPercent: 100
          },
          {
            xPercent: 100,
            yPercent: 0
          },
          {
            xPercent: 8.7,
            yPercent: 0
          }
        ],
        pocketLines: [
          {
            point1: {
              xPercent: 65.27,
              yPercent: 42.86
            },
            point2: {
              xPercent: 82.25,
              yPercent: 35.71
            }
          },
          {
            point1: {
              xPercent: 82.25,
              yPercent: 35.71
            },
            point2: {
              xPercent: 100,
              yPercent: 42.86
            }
          }
        ],
        widthInInches: 11.49
      };
      const invitation = Invitation.fromJson(json);
      expect(invitation.color).toBeUndefined();
      expect(invitation.folds.length).toEqual(2);
      expect(invitation.height).toEqual(7);
      expect(invitation.id).toEqual("1");
      expect(invitation.invitationType.id).toEqual("1");
      expect(invitation.name).toEqual("Signature");
      expect(invitation.outline.length).toEqual(5);
      expect(invitation.pocketLines.length).toEqual(2);
      expect(invitation.width).toEqual(11.49);
    });

  });

  describe("emptyInstance", () => {

    it("should return an Invitation instance with empty values", () => {
      const invitation = Invitation.emptyInstance();
      expect(invitation.color).toEqual(Color.emptyInstance());
      expect(invitation.folds).toEqual([]);
      expect(invitation.height).toEqual(0);
      expect(invitation.id).toEqual("");
      expect(invitation.invitationType).toEqual(InvitationType.emptyInstance());
      expect(invitation.name).toEqual("");
      expect(invitation.outline).toEqual([]);
      expect(invitation.pocketLines).toEqual([]);
      expect(invitation.width).toEqual(0);
    });

  });

});
