import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { CanvasContainerComponent } from "../canvas-container.component";

describe("CanvasContainerComponent", () => {
  let component: CanvasContainerComponent;
  let fixture: ComponentFixture<CanvasContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CanvasContainerComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasContainerComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("hideTile", () => {

    it("should set the collection settings visibility varible to 'false' for the given key", () => {
      component.tileVisibilities = { about: true, collectionSettings: true };
      component.hideTile("about");
      expect(component.tileVisibilities.about).toBeFalsy();
      expect(component.tileVisibilities.collectionSettings).toBeTruthy();
      component.hideTile("collectionSettings");
      expect(component.tileVisibilities.collectionSettings).toBeFalsy();
    });

  });

  describe("showTile", () => {

    it("should set the collection settings visibility varible to 'true'", () => {
      component.tileVisibilities = { about: false, collectionSettings: false };
      component.showTile("about");
      expect(component.tileVisibilities.about).toBeTruthy();
      expect(component.tileVisibilities.collectionSettings).toBeFalsy();
      component.showTile("collectionSettings");
      expect(component.tileVisibilities.collectionSettings).toBeTruthy();
    });

  });

  describe("tileVisible", () => {

    it("should return 'true' for a given key if that key's value is 'true', false otherwise", () => {
      component.tileVisibilities = { about: true, collectionSettings: false };
      expect(component.tileVisible("about")).toBeTruthy();
      expect(component.tileVisible("collectionSettings")).toBeFalsy();
    });

  });

});