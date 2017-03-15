import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';
import {Geolocation} from "ionic-native";
import {EmergenecyService} from "../../shared/services/emergency.service";
import {Emergency} from "../../shared/models/emergency.model";


@Component({
    selector: 'carrier',
    templateUrl: 'carriers.html'
})

export class Carriers {
  @Input() emergencies:Array<Emergency> = new Array<Emergency>();
  carrierSetting = {
      onDuty: true,
      hasNaloxone: true
  };


  constructor(public emergencyService:EmergenecyService, public navCtrl: NavController) {

  }

  open(url){
    this.navCtrl.push(url);
  }

}
