import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpModule } from "@angular/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/observable/of";

import { CanvasContainerComponent } from "../canvas-container.component";
import { PocketInvitation } from "../../../models/pocket-invitation";
import { SixmkApiService } from "../../../services/sixmk-api.service";

// api is tested in its own spec, so mock it out here.
class MockApiService {
  pocketInvitations(): Observable<Array<PocketInvitation>> {
    return Observable.of([PocketInvitation.emptyInstance()]);
  }
}

describe("CanvasContainerComponent", () => {
  let component: CanvasContainerComponent;
  let fixture: ComponentFixture<CanvasContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CanvasContainerComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        { provide: SixmkApiService, useClass: MockApiService }
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

  describe("onInit", () => {

    it("should load the pocket invitations data", async(() => {
      component.ngOnInit();
      expect(component.pocketInvitations).toBeDefined();
      expect(component.selectedPocketInvitation).toBeDefined();
    }));

  });

  describe("hideTile", () => {

    it("should set the collection settings visibility varible to 'false' for the given key", () => {
      component.tileVisibilities = { about: true, collectionSettings: true, layerSettings: true };
      component.hideTile("about");
      expect(component.tileVisibilities.about).toBeFalsy();
      expect(component.tileVisibilities.collectionSettings).toBeTruthy();
      component.hideTile("collectionSettings");
      expect(component.tileVisibilities.collectionSettings).toBeFalsy();
    });

  });

  describe("showTile", () => {

    it("should set the collection settings visibility varible to 'true'", () => {
      component.tileVisibilities = { about: false, collectionSettings: false, layerSettings: true };
      component.showTile("about");
      expect(component.tileVisibilities.about).toBeTruthy();
      expect(component.tileVisibilities.collectionSettings).toBeFalsy();
      component.showTile("collectionSettings");
      expect(component.tileVisibilities.collectionSettings).toBeTruthy();
    });

  });

  describe("tileVisible", () => {

    it("should return 'true' for a given key if that key's value is 'true', false otherwise", () => {
      component.tileVisibilities = { about: true, collectionSettings: false, layerSettings: true };
      expect(component.tileVisible("about")).toBeTruthy();
      expect(component.tileVisible("collectionSettings")).toBeFalsy();
    });

  });

});
