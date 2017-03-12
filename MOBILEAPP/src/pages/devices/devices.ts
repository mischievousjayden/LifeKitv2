import {Component, ChangeDetectorRef} from "@angular/core";
import {BluetoothSerial} from 'ionic-native';
import {Platform, App} from 'ionic-angular';
import {BluetoothService} from "../../shared/services/bluetooth.service";
import {Observable} from "rxjs";
@Component({
    templateUrl: 'devices.html'
})
export class Devices {
public discoveredBluetoothDevices: any;
public bluetoothData: any;

    constructor(public app:App,public platform: Platform, public ref: ChangeDetectorRef) {
		if(this.platform.is('android')){
			//alert("I am android!")
			//Call get list of connectable devices
      BluetoothService.bluetoothStart();
      BluetoothService.discoveredBluetoothDevices.subscribe(list =>{
        this.discoveredBluetoothDevices = list;
      });
		}
    }

    connectDevice(device){
      BluetoothService.connectDevice(device);
    }




}
