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
public emergencies:Array<Emergency> = new Array<Emergency>();

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

  constructor(public emergencyService:EmergenecyService, public navCtrl: NavController) {
    this.pageReportOnDuty();

  }

  pageReportOnDuty(){
    console.log('reporting on duty!');
    Geolocation.getCurrentPosition().then(resp=>{
      this.emergencyService.reportOnDuty(resp.coords.latitude,resp.coords.longitude).subscribe(res=>{
        console.log(res);
        this.emergencies = res;
        setTimeout(this.pageReportOnDuty(),10000);
      });
    });
  }

  open(url){
    this.navCtrl.push(url);
  }

}
