import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Color } from "../../models/color";
import { Option } from "../../models/option";

@Component({
  selector: "app-collection-settings",
  styleUrls: [ "./collection-settings.component.scss" ],
  templateUrl: "./collection-settings.component.html"
})

export class CollectionSettingsComponent {
  @Input() availableColors: Array<Color>;
  @Input() selectedColor: Color;

  @Output() onColorUpdated = new EventEmitter<Color>();
  @Output() onHideClicked = new EventEmitter<null>();

  private _colorOptions: Array<Option>;

  hide(): void {
    this.onHideClicked.emit();
  }

  colorOptions(): Array<Option> {
    if (this.availableColors === undefined) {
      return [];
    } else {
      if (this._colorOptions === undefined) {
        this._colorOptions = this.availableColors.map( color => {
          return new Option(color.name, color);
        });
      }
      return this._colorOptions;
    }
  }

  selectedColorOption(): Option {
    if (this.selectedColor === undefined ||
        this.availableColors === undefined ||
        this._colorOptions === undefined) {
      return undefined;
    } else {
      return this._colorOptions.find( option => {
        return option.value === this.selectedColor;
      });
    }
  }

  colorOptionChanged(color: Color): void {
    this.selectedColor = color;
    this.onColorUpdated.emit(this.selectedColor);
  }

}
