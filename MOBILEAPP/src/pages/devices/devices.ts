import {Component} from "@angular/core";
import { BluetoothSerial } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Component({
    templateUrl: 'devices.html'
})
export class Devices {

    constructor(public platform: Platform) {
		if(this.platform.is('android')){
			alert("I am android!");
			//Call get list of connectable devices
			console.log(BluetoothSerial.discoverUnpaired());
		}
    }
}
