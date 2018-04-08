import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Color } from "../../models/color";
import { Invitation } from "../../models/invitation";
import { InvitationType } from "../../models/invitation-type";
import { Option } from "../../models/option";

@Component({
  selector: "app-collection-settings",
  styleUrls: [ "./collection-settings.component.scss" ],
  templateUrl: "./collection-settings.component.html"
})

export class CollectionSettingsComponent {
  @Input() availableColors: Array<Color>;
  @Input() selectedColor: Color;

  @Input() availableInvitations: Array<Invitation>;
  @Input() selectedInvitation: Invitation;

  @Input() availableInvitationTypes: Array<InvitationType>;
  @Input() selectedInvitationType: InvitationType;

  @Output() onColorUpdated = new EventEmitter<Color>();
  @Output() onInvitationUpdated = new EventEmitter<Invitation>();
  @Output() onInvitationTypeUpdated = new EventEmitter<InvitationType>();

  @Output() onHideClicked = new EventEmitter<null>();

  private _colorOptions: Array<Option>;
  private _invitationOptions: Array<Option>;
  private _invitationTypeOptions: Array<Option>;

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

  invitationOptions(): Array<Option> {
    if (this.availableInvitations === undefined) {
      return [];
    } else {
      if (this._invitationOptions === undefined || this._invitationOptions.length === 0) {
        this._invitationOptions = this.availableInvitations.map( invitation => {
          return new Option(invitation.name, invitation);
        });
      }
      return this._invitationOptions;
    }
  }

  selectedInvitationOption(): Option {
    if (this.selectedInvitation === undefined ||
        this.availableInvitations === undefined ||
        this._invitationOptions === undefined) {
      return undefined;
    } else {
      return this._invitationOptions.find( option => {
        return option.value === this.selectedInvitation;
      });
    }
  }

  invitationOptionChanged(invitation: Invitation): void {
    this.selectedInvitation = invitation;
    this.onInvitationUpdated.emit(this.selectedInvitation);
  }

  invitationTypeOptions(): Array<Option> {
    if (this.availableInvitationTypes === undefined) {
      return [];
    } else {
      if (this._invitationTypeOptions === undefined) {
        this._invitationTypeOptions = this.availableInvitationTypes.map( invitationType => {
          return new Option(invitationType.name, invitationType);
        });
      }
      return this._invitationTypeOptions;
    }
  }

  selectedInvitationTypeOption(): Option {
    if (this.selectedInvitationType === undefined ||
        this.availableInvitationTypes === undefined ||
        this._invitationTypeOptions === undefined) {
      return undefined;
    } else {
      return this._invitationTypeOptions.find( option => {
        return option.value === this.selectedInvitationType;
      });
    }
  }

  invitationTypeOptionChanged(invitationType: InvitationType): void {
    this._invitationOptions = undefined;
    this.selectedInvitationType = invitationType;
    this.onInvitationTypeUpdated.emit(this.selectedInvitationType);
  }

}
