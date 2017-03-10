import { Component, Input } from '@angular/core';

@Component({
  selector: 'carrier-settings',
  templateUrl: 'carrier-settings.html'
})

export class CarrierSettingsModel {
  @Input()
  carrierSetting: CarrierSettings;
};

export class CarrierSettings {
  onDuty: boolean;
  hasNaloxone: boolean;
}
