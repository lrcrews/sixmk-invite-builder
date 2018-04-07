import { async, ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";

import { Option } from "../../models/option";
import { SelectInputComponent } from "../select-input.component";

describe("SelectInputComponent", () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectInputComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(Math, "random").and.returnValue(1337);
    fixture = TestBed.createComponent(SelectInputComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  describe("optionIdForIndex", () => {

    it("should add the given index to the random number generated during creation and return it as a string", () => {
      expect(component.optionIdForIndex(4)).toEqual("13374");
    });

  });

  describe("showOptions", () => {

    it("should do nothing if optionsVisible is true", () => {
      component.optionsVisible = true;
      component.showOptions();
      expect(component.optionsVisible).toBeTruthy();
    });

    // it("should set optionsVisible to true if it's false", fakeAsync(() => {
    //   component.optionsVisible = false;
    //   component.showOptions();
    //   tick(100);
    //   expect(component.optionsVisible).toBeTruthy();
    // }));

  });

  // describe("toggleOptions", () => {

  //   it("should flip the value of optionsVisible", fakeAsync(() => {
  //     component.optionsVisible = true;
  //     component.toggleOptions();
  //     expect(component.optionsVisible).toBeFalsy();
  //     component.toggleOptions();
  //     tick(100);
  //     expect(component.optionsVisible).toBeTruthy();
  //   }));

  // });

  describe("selectOption", () => {

    it("should set optionsVisible to false, set model to the option value, and selectedOption to the option", () => {
      const option = new Option("Ima Option", "any value");
      component.optionsVisible = true;
      component.model = undefined;
      component.selectedOption = undefined;
      component.selectOption(option);
      expect(component.optionsVisible).toBeFalsy();
      expect(component.model).toEqual("any value");
      expect(component.selectedOption).toEqual(option);
    });

  });

  describe("optionSelected", () => {

    it("should return true if the given option is the selectedOption", () => {
      const option = new Option("Ima Option", "any value");
      component.selectedOption = option;
      expect(component.optionSelected(option)).toBeTruthy();
    });

    it("should return false if the given option is not the selectedOption", () => {
      const option = new Option("Ima Option", "any value");
      component.selectedOption = new Option("Not the same one", "another value");
      expect(component.optionSelected(option)).toBeFalsy();
    });

  });

  describe("selectedOptionDisplayText", () => {

    it("should return an empty string if there is no selected option", () => {
      component.selectedOption = undefined;
      expect(component.selectedOptionDisplayText()).toEqual("");
    });

    it("should return the selectedOption's name", () => {
      const option = new Option("Ima Option", "any value");
      component.selectedOption = option;
      expect(component.selectedOptionDisplayText()).toEqual("Ima Option");
    });

  });

});
