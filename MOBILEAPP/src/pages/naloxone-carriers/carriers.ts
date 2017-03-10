import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';

@Component({
    templateUrl: 'carriers.html'
})
export class Carriers {

  carrierSetting = {
      onDuty: true,
      hasNaloxone: true
  };

  opiodData = {
      opiod : {
          total: 8,
          radius: 0.9
      },
      naloxone : {
          total: 23,
          radius: 1.5
      }
  };



  constructor(public navCtrl:NavController) {

  }
}
