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

  describe("hideCollectionSettings", () => {

    it("should set the collection settings visibility varible to 'false'", () => {
      component.collectionSettingsVisible = true;
      component.hideCollectionSettings();
      expect(component.collectionSettingsVisible).toBeFalsy();
    });

  });

  describe("showCollectionSettings", () => {

    it("should set the collection settings visibility varible to 'true'", () => {
      component.collectionSettingsVisible = false;
      component.showCollectionSettings();
      expect(component.collectionSettingsVisible).toBeTruthy();
    });

  });

});
