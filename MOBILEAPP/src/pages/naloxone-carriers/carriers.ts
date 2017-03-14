import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';

@Component({
    selector: 'carrier',
    templateUrl: 'carriers.html'
})
export class Carriers {

  carrierSetting = {
      onDuty: true,
      hasNaloxone: true
  };

  opioidData = {
      opioid : {
          total: 8,
          radius: 0.9
      },
      naloxone : {
          total: 23,
          radius: 1.5
      }
  };



  constructor(public navCtrl: NavController) {

  }

  open(url){
    this.navCtrl.push(url);
  }

}
