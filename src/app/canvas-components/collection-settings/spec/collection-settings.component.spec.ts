import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CollectionSettingsComponent } from "../collection-settings.component";

describe("CollectionSettingsComponent", () => {
  let component: CollectionSettingsComponent;
  let fixture: ComponentFixture<CollectionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectionSettingsComponent
      ],
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

});
