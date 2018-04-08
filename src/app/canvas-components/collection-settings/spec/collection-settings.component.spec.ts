import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { CollectionSettingsComponent } from "../collection-settings.component";
import { Color } from "../../../models/color";
import { Option } from "../../../models/option";
import { Invitation } from "../../../models/invitation";
import { InvitationType } from "../../../models/invitation-type";

describe("CollectionSettingsComponent", () => {
  let component: CollectionSettingsComponent;
  let fixture: ComponentFixture<CollectionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectionSettingsComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSettingsComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("hide", () => {

    it("should emit the 'onHideClick' Output", () => {
      spyOn(component.onHideClicked, "emit");
      component.hide();
      expect(component.onHideClicked.emit).toHaveBeenCalled();
    });

  });

  describe("colorOptions", () => {

    it("should return an empty array if availableColors is undefined", () => {
      component.availableColors = undefined;
      expect(component.colorOptions()).toEqual([]);
    });

    it("should return an array of Option(s) based on the availableColors", () => {
      const color1 = Color.emptyInstance();
      color1.id = "123";
      color1.name = "Color One";
      const color2 = Color.emptyInstance();
      color2.id = "abc";
      color2.name = "Color Two";
      component.availableColors = [ color1, color2 ];
      expect(component.colorOptions()).toEqual([
        new Option("Color One", color1),
        new Option("Color Two", color2)
      ]);
      // ...and it should load the same results from the cached version after the first pass
      expect(component.colorOptions()).toEqual([
        new Option("Color One", color1),
        new Option("Color Two", color2)
      ]);
    });

  });

  describe("selectedColorOption", () => {

    it("should return undefined if selectedColor is undefined", () => {
      component.selectedColor = undefined;
      expect(component.selectedColorOption()).toBeUndefined();
    });

    it("should return undefined is selectedColor is present but availableColors is undefined", () => {
      component.selectedColor = Color.defaultInvitationColor();
      component.availableColors = undefined;
      expect(component.selectedColorOption()).toBeUndefined();
    });

    it("should return undefined is selectedColor and availableColors are present, but color options isn't", () => {
      component.selectedColor = Color.defaultInvitationColor();
      component.availableColors = [];
      expect(component.selectedColorOption()).toBeUndefined();
    });

    it("should return undefined if selectedColor is not found", () => {
      component.selectedColor = Color.defaultInvitationColor();
      component.availableColors = [];
      component.colorOptions();
      expect(component.selectedColorOption()).toBeUndefined();
    });

    it("should return the Option corresponding to the selectedColor", () => {
      const color1 = Color.emptyInstance();
      color1.id = "123";
      color1.name = "Color One";
      const color2 = Color.emptyInstance();
      color2.id = "abc";
      color2.name = "Color Two";
      component.selectedColor = color2;
      component.availableColors = [ color1, color2 ];
      component.colorOptions();
      expect(component.selectedColorOption()).toEqual(new Option("Color Two", color2));
    });

  });

  describe("colorOptionChanged", () => {

    it("should set selectedColor to the given color and emit onColorUpdated", () => {
      this.selectedColor = Color.defaultInvitationColor();
      spyOn(component.onColorUpdated, "emit");
      const color1 = Color.emptyInstance();
      color1.id = "123";
      color1.name = "Color One";
      component.colorOptionChanged(color1);
      expect(component.selectedColor).toEqual(color1);
      expect(component.onColorUpdated.emit).toHaveBeenCalledWith(color1);
    });

  });

  describe("invitationOptions", () => {

    it("should return an empty array if availableInvitations is undefined", () => {
      component.availableInvitations = undefined;
      expect(component.invitationOptions()).toEqual([]);
    });

    it("should return an array of Option(s) based on the availableInvitations", () => {
      const invitation1 = Invitation.emptyInstance();
      invitation1.id = "123";
      invitation1.name = "Invitation One";
      const invitation2 = Invitation.emptyInstance();
      invitation2.id = "abc";
      invitation2.name = "Invitation Two";
      component.availableInvitations = [ invitation1, invitation2 ];
      expect(component.invitationOptions()).toEqual([
        new Option("Invitation One", invitation1),
        new Option("Invitation Two", invitation2)
      ]);
      // ...and it should load the same results from the cached version after the first pass
      expect(component.invitationOptions()).toEqual([
        new Option("Invitation One", invitation1),
        new Option("Invitation Two", invitation2)
      ]);
    });

  });

  describe("selectedInvitationOption", () => {

    it("should return undefined if selectedInvitation is undefined", () => {
      component.selectedInvitation = undefined;
      expect(component.selectedInvitationOption()).toBeUndefined();
    });

    it("should return undefined is selectedInvitation is present but availableInvitations is undefined", () => {
      component.selectedInvitation = Invitation.emptyInstance();
      component.availableInvitations = undefined;
      expect(component.selectedInvitationOption()).toBeUndefined();
    });

    it("should return undefined is selectedInvitation and availableInvitations are present," +
       "but invitation options isn't", () => {
      component.selectedInvitation = Invitation.emptyInstance();
      component.availableInvitations = [];
      expect(component.selectedInvitationOption()).toBeUndefined();
    });

    it("should return undefined if selectedInvitation is not found", () => {
      component.selectedInvitation = Invitation.emptyInstance();
      component.availableInvitations = [];
      component.invitationOptions();
      expect(component.selectedInvitationOption()).toBeUndefined();
    });

    it("should return the Option corresponding to the selectedInvitation", () => {
      const invitation1 = Invitation.emptyInstance();
      invitation1.id = "123";
      invitation1.name = "Invitation One";
      const invitation2 = Invitation.emptyInstance();
      invitation2.id = "abc";
      invitation2.name = "Invitation Two";
      component.selectedInvitation = invitation2;
      component.availableInvitations = [ invitation1, invitation2 ];
      component.invitationOptions();
      expect(component.selectedInvitationOption()).toEqual(new Option("Invitation Two", invitation2));
    });

  });

  describe("invitationOptionChanged", () => {

    it("should set selectedInvitations to the given invitation and emit onInvitationUpdated", () => {
      this.selectedInvitation = Invitation.emptyInstance();
      spyOn(component.onInvitationUpdated, "emit");
      const invitation1 = Invitation.emptyInstance();
      invitation1.id = "123";
      invitation1.name = "Invitation One";
      component.invitationOptionChanged(invitation1);
      expect(component.selectedInvitation).toEqual(invitation1);
      expect(component.onInvitationUpdated.emit).toHaveBeenCalledWith(invitation1);
    });

  });

  describe("invitationTypeOptions", () => {

    it("should return an empty array if availableInvitationTypes is undefined", () => {
      component.availableInvitationTypes = undefined;
      expect(component.invitationTypeOptions()).toEqual([]);
    });

    it("should return an array of Option(s) based on the availableInvitationTypes", () => {
      const invitationType1 = InvitationType.emptyInstance();
      invitationType1.id = "123";
      invitationType1.name = "Invitation Type One";
      const invitationType2 = InvitationType.emptyInstance();
      invitationType2.id = "abc";
      invitationType2.name = "Invitation Type Two";
      component.availableInvitationTypes = [ invitationType1, invitationType2 ];
      expect(component.invitationTypeOptions()).toEqual([
        new Option("Invitation Type One", invitationType1),
        new Option("Invitation Type Two", invitationType2)
      ]);
      // ...and it should load the same results from the cached version after the first pass
      expect(component.invitationTypeOptions()).toEqual([
        new Option("Invitation Type One", invitationType1),
        new Option("Invitation Type Two", invitationType2)
      ]);
    });

  });

  describe("selectedInvitationTypeOption", () => {

    it("should return undefined if selectedInvitationType is undefined", () => {
      component.selectedInvitationType = undefined;
      expect(component.selectedInvitationTypeOption()).toBeUndefined();
    });

    it("should return undefined is selectedInvitationType is present but availableInvitationTypes is undefined", () => {
      component.selectedInvitationType = InvitationType.emptyInstance();
      component.availableInvitationTypes = undefined;
      expect(component.selectedInvitationTypeOption()).toBeUndefined();
    });

    it("should return undefined is selectedInvitationType and availableInvitationTypes are present," +
       "but invitation options isn't", () => {
      component.selectedInvitationType = InvitationType.emptyInstance();
      component.availableInvitationTypes = [];
      expect(component.selectedInvitationTypeOption()).toBeUndefined();
    });

    it("should return undefined if selectedInvitationType is not found", () => {
      component.selectedInvitationType = InvitationType.emptyInstance();
      component.availableInvitationTypes = [];
      component.invitationTypeOptions();
      expect(component.selectedInvitationTypeOption()).toBeUndefined();
    });

    it("should return the Option corresponding to the selectedInvitationType", () => {
      const invitationType1 = InvitationType.emptyInstance();
      invitationType1.id = "123";
      invitationType1.name = "Invitation Type One";
      const invitationType2 = InvitationType.emptyInstance();
      invitationType2.id = "abc";
      invitationType2.name = "Invitation Type Two";
      component.selectedInvitationType = invitationType2;
      component.availableInvitationTypes = [ invitationType1, invitationType2 ];
      component.invitationTypeOptions();
      expect(component.selectedInvitationTypeOption()).toEqual(new Option("Invitation Type Two", invitationType2));
    });

  });

  describe("invitationTypeOptionChanged", () => {

    it("should set selectedInvitationTypes to the given invitation and emit onInvitationTypeUpdated", () => {
      this.selectedInvitationType = InvitationType.emptyInstance();
      spyOn(component.onInvitationTypeUpdated, "emit");
      const invitationType1 = InvitationType.emptyInstance();
      invitationType1.id = "123";
      invitationType1.name = "Invitation Type One";
      component.invitationTypeOptionChanged(invitationType1);
      expect(component.selectedInvitationType).toEqual(invitationType1);
      expect(component.onInvitationTypeUpdated.emit).toHaveBeenCalledWith(invitationType1);
    });

  });

});
