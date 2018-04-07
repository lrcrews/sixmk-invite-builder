import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { CollectionSettingsComponent } from "../collection-settings.component";
import { Color } from "../../../models/color";
import { Option } from "../../../models/option";

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

});
