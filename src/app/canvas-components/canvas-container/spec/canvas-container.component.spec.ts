import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CanvasContainerComponent } from "../canvas-container.component";

describe("CanvasContainerComponent", () => {
  let component: CanvasContainerComponent;
  let fixture: ComponentFixture<CanvasContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CanvasContainerComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasContainerComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

});
