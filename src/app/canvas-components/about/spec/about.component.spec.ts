import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AboutComponent } from "../about.component";

describe("AboutComponent", () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
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
