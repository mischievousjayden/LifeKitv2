import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';
import {BluetoothSerial} from "ionic-native";
import {Devices} from "../devices/devices";

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
      this.startBluetoothService();
    }
    open(url){
      this.navCtrl.push(url);
    }

    startBluetoothService(){
      var id = setInterval(function (){
            BluetoothSerial.subscribe('\n').subscribe(data=>{
              document.getElementById('hello').innerHTML = data;
              clearInterval(id);
            });
      },1000);
    }
}

