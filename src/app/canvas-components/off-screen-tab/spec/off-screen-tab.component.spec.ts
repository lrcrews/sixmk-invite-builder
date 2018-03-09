import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OffScreenTabComponent } from "../off-screen-tab.component";

describe("OffScreenTabComponent", () => {
  let component: OffScreenTabComponent;
  let fixture: ComponentFixture<OffScreenTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OffScreenTabComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffScreenTabComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("show", () => {

    it("should emit the 'onShowClick' Output", () => {
      spyOn(component.onShowClicked, "emit");
      component.show();
      expect(component.onShowClicked.emit).toHaveBeenCalled();
    });

  });

});
