import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FooterComponent } from "../footer.component";

describe("FooterComponent", () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("launchGithub", () => {

    it("should open the github of this code in a new tab/window", () => {
      spyOn(window, "open");
      component.launchGithub();
      expect(window.open).toHaveBeenCalledWith("https://github.com/lrcrews/sixmk-invite-builder", "_blank");
    });

  });

});
