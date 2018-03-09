import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "../header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("launchSixmk", () => {

    it("should open the sixmk website in a new tab/window", () => {
      spyOn(window, "open");
      component.launchSixmk();
      expect(window.open).toHaveBeenCalledWith("http://www.sixmk.com", "_blank");
    });

  });

});
