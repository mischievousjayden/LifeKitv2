import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';
import {BluetoothSerial} from "ionic-native";
import {Devices} from "../devices/devices";
import {BluetoothService} from "../../shared/services/bluetooth.service";

@Component({
    templateUrl: 'opioidusers.html'
})
export class OpioidUsers {
bluetoothData = "";
    carrierSetting = {
        onDuty: false,
        hasNaloxone: false
    };


    constructor(public navCtrl:NavController) {
      //this.startBluetoothService();
      BluetoothService.bluetoothData.subscribe(data=>{
        document.getElementById('hello').innerHTML = data.toString();
      });
    }
    open(url){
      this.navCtrl.push(url);
    }
}

