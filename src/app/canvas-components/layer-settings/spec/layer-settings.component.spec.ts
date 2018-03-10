import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LayerSettingsComponent } from "../layer-settings.component";

describe("LayerSettingsComponent", () => {
  let component: LayerSettingsComponent;
  let fixture: ComponentFixture<LayerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayerSettingsComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerSettingsComponent);
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
