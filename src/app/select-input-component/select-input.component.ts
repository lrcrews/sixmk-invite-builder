import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Option } from "../models/option";

@Component({
  selector: "app-select-input",
  styleUrls: ["./select-input.component.scss"],
  templateUrl: "./select-input.component.html"
})

export class SelectInputComponent {
  @Input() label: string;
  @Input() options: Array<Option>;
  @Input() selectedOption: Option;

  optionsVisible = false;

  private _componentId = Math.random(); // so multiple select inputs with the same options may exist on a single page

  // "2-way" binding Input/Output for the actual value

  modelValue: any;

  @Input()
  get model(): any {
    return this.modelValue;
  }

  set model(value: any) {
    this.modelValue = value;
    this.modelChange.emit(this.modelValue);
  }

  @Output() modelChange = new EventEmitter<any>();

  // end "2-way" binding

  optionIdForIndex(index: number): string {
    return `${this._componentId}${index}`;
  }

  showOptions(): void {
    if (!this.optionsVisible) {
      this.optionsVisible = true;
      this._scrollToSelectedOptionAfterOpened();
    }
  }

  toggleOptions(): void {
    this.optionsVisible = !this.optionsVisible;
    if (this.optionsVisible) {
      this._scrollToSelectedOptionAfterOpened();
    }
  }

  focusOption(index: number): void {
    if (index >= 0 && index < this.options.length) {
      const element = document.getElementById(this.optionIdForIndex(index));
      element.focus();
    }
  }

  selectOption(option: Option): void {
    this.optionsVisible = false;
    this.model = option.value;
    this.selectedOption = option;
  }

  optionSelected(option: Option): boolean {
    return this.selectedOption === option;
  }

  selectedOptionDisplayText(): string {
    return this.selectedOption ? this.selectedOption.displayName : "";
  }

  private _scrollToSelectedOptionAfterOpened(): void {
    setTimeout(() => {
      this._focusSelectedOption();
    }, 100);
  }

  private _focusSelectedOption(): void {
    if (this.selectedOption) {
      const selectedOptionIndex = this.options.findIndex( option => {
        return option === this.selectedOption;
      });
      (selectedOptionIndex === -1) ? this.focusOption(0) : this.focusOption(selectedOptionIndex);
    } else {
      this.focusOption(0);
    }
  }
}
